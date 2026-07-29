import type {
  LandedComparisonResult,
  LandedComparisonRow,
  LandedComparisonSharedInput,
  LandedComparisonSupplierInput,
} from '@/lib/types';

const ESTIMATED_INSURANCE_RATES: Record<
  LandedComparisonSharedInput['shippingMode'],
  number
> = {
  sea_fcl: 0.003,
  sea_lcl: 0.004,
  air_freight: 0.0025,
  air_express: 0.002,
};

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundPercent(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

/**
 * Customs value rule, kept identical to calculateLandedCost:
 * US transaction value generally excludes international freight and
 * insurance; EU customs value generally includes transport to entry.
 */
function customsValueFor(
  destinationMarket: LandedComparisonSharedInput['destinationMarket'],
  factoryCostTotal: number,
  freightCostTotal: number,
  insuranceCostTotal: number,
): number {
  return destinationMarket === 'US'
    ? factoryCostTotal
    : factoryCostTotal + freightCostTotal + insuranceCostTotal;
}

/**
 * Ranks supplier quotes by true landed unit cost rather than factory price.
 *
 * Every figure is computed deterministically from the supplied inputs. Duty
 * rates are caller-provided (per origin country) and are never inferred here,
 * so a caller must surface where each rate came from.
 */
export function compareLandedCosts(
  suppliers: LandedComparisonSupplierInput[],
  shared: LandedComparisonSharedInput,
): LandedComparisonResult {
  const warnings: string[] = [];

  if (suppliers.length < 2) {
    return {
      rows: [],
      comparable: false,
      inverted: false,
      fobWinnerFileName: null,
      landedWinnerFileName: null,
      savingsPerUnit: null,
      savingsTotal: null,
      savingsPercent: null,
      warnings: ['At least two quotes are required to compare landed cost.'],
    };
  }

  if (!Number.isFinite(shared.quantity) || shared.quantity <= 0) {
    return {
      rows: [],
      comparable: false,
      inverted: false,
      fobWinnerFileName: null,
      landedWinnerFileName: null,
      savingsPerUnit: null,
      savingsTotal: null,
      savingsPercent: null,
      warnings: ['A positive total quantity is required to compare landed cost.'],
    };
  }

  const currencies = new Set(
    suppliers
      .map((supplier) => supplier.currency?.trim().toUpperCase())
      .filter((currency): currency is string => Boolean(currency)),
  );

  if (currencies.size > 1) {
    return {
      rows: [],
      comparable: false,
      inverted: false,
      fobWinnerFileName: null,
      landedWinnerFileName: null,
      savingsPerUnit: null,
      savingsTotal: null,
      savingsPercent: null,
      warnings: [
        'The quotes use multiple currencies. No automatic conversion is applied, so landed cost cannot be compared.',
      ],
    };
  }

  const insuranceWasEstimated = shared.insuranceCost === null;

  const computed = suppliers.map((supplier) => {
    const factoryCostTotal = supplier.unitPriceFob * shared.quantity;
    const insuranceCostTotal =
      shared.insuranceCost ??
      factoryCostTotal * ESTIMATED_INSURANCE_RATES[shared.shippingMode];
    const customsValue = customsValueFor(
      shared.destinationMarket,
      factoryCostTotal,
      shared.freightCostTotal,
      insuranceCostTotal,
    );
    const dutyTotal = customsValue * (supplier.dutyRatePercent / 100);
    const landedTotalCost =
      factoryCostTotal +
      shared.freightCostTotal +
      insuranceCostTotal +
      dutyTotal +
      shared.localPortCharges +
      shared.lastMileDelivery;

    return {
      supplier,
      dutyTotal,
      landedTotalCost,
      landedUnitCost: landedTotalCost / shared.quantity,
    };
  });

  // Rank by factory price and by landed cost. Ties keep input order so the
  // comparison stays stable and reproducible.
  const fobOrder = computed
    .map((entry, index) => ({ index, value: entry.supplier.unitPriceFob }))
    .sort((left, right) => left.value - right.value || left.index - right.index);
  const landedOrder = computed
    .map((entry, index) => ({ index, value: entry.landedUnitCost }))
    .sort((left, right) => left.value - right.value || left.index - right.index);

  const fobRankByIndex = new Map(
    fobOrder.map((entry, position) => [entry.index, position + 1]),
  );
  const landedRankByIndex = new Map(
    landedOrder.map((entry, position) => [entry.index, position + 1]),
  );

  const rows: LandedComparisonRow[] = computed.map((entry, index) => {
    const fobRank = fobRankByIndex.get(index) ?? index + 1;
    const landedRank = landedRankByIndex.get(index) ?? index + 1;

    return {
      fileName: entry.supplier.fileName,
      supplierName: entry.supplier.supplierName,
      currency: entry.supplier.currency,
      originCountry: entry.supplier.originCountry,
      dutyRatePercent: entry.supplier.dutyRatePercent,
      unitPriceFob: roundMoney(entry.supplier.unitPriceFob),
      dutyPerUnit: roundMoney(entry.dutyTotal / shared.quantity),
      landedUnitCost: roundMoney(entry.landedUnitCost),
      landedTotalCost: roundMoney(entry.landedTotalCost),
      fobRank,
      landedRank,
      // Positive means the supplier ranks better on landed cost than on
      // factory price alone.
      rankDelta: fobRank - landedRank,
    };
  });

  const sortedRows = [...rows].sort((left, right) => left.landedRank - right.landedRank);
  const fobWinner = rows.find((row) => row.fobRank === 1) ?? null;
  const landedWinner = sortedRows[0] ?? null;
  const landedWorst = sortedRows.at(-1) ?? null;

  const savingsPerUnit =
    landedWinner && landedWorst
      ? roundMoney(landedWorst.landedUnitCost - landedWinner.landedUnitCost)
      : null;
  const savingsTotal =
    landedWinner && landedWorst
      ? roundMoney(landedWorst.landedTotalCost - landedWinner.landedTotalCost)
      : null;
  const savingsPercent =
    landedWinner && landedWorst && landedWorst.landedUnitCost > 0
      ? roundPercent(
          ((landedWorst.landedUnitCost - landedWinner.landedUnitCost) /
            landedWorst.landedUnitCost) *
            100,
        )
      : null;

  const inverted =
    fobWinner !== null &&
    landedWinner !== null &&
    fobWinner.fileName !== landedWinner.fileName;

  warnings.push(
    'Duty rates are the values supplied for each origin country and are not read from a live tariff database. Verify them against current official tariff data before ordering.',
  );

  if (insuranceWasEstimated) {
    warnings.push(
      'Cargo insurance was estimated from the shipping mode; replace it with the forwarder actual amount when known.',
    );
  }

  warnings.push(
    shared.destinationMarket === 'US'
      ? 'MPF/HMF fees, antidumping duties, and product-specific surcharges are not included.'
      : 'Import VAT is not included; treatment depends on the country, tax status, and potential recovery.',
  );

  warnings.push(
    'Freight, insurance, and local charges are applied identically to every supplier. Enter lane-specific amounts when origins differ significantly.',
  );

  return {
    rows: sortedRows,
    comparable: true,
    inverted,
    fobWinnerFileName: fobWinner?.fileName ?? null,
    landedWinnerFileName: landedWinner?.fileName ?? null,
    savingsPerUnit,
    savingsTotal,
    savingsPercent,
    warnings,
  };
}
