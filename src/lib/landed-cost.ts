import type { LandedCostInput, LandedCostResult } from '@/lib/types';
import { landedCostInputSchema } from '@/lib/validation/landed-cost';

const ESTIMATED_INSURANCE_RATES: Record<
  LandedCostInput['shippingMode'],
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

function safeShare(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

export function calculateLandedCost(input: LandedCostInput): LandedCostResult {
  const validated = landedCostInputSchema.parse(input);
  const factoryCostTotal = validated.unitPriceFob * validated.quantity;
  const insuranceWasEstimated = validated.insuranceCost === null;
  const insuranceCostTotal =
    validated.insuranceCost ??
    factoryCostTotal * ESTIMATED_INSURANCE_RATES[validated.shippingMode];

  // Official valuation differs by destination:
  // - US transaction value generally excludes international freight and insurance.
  // - EU customs value generally includes transport/insurance to the point of entry.
  const customsValue =
    validated.destinationMarket === 'US'
      ? factoryCostTotal
      : factoryCostTotal + validated.freightCostTotal + insuranceCostTotal;
  const customsDutyTotal =
    customsValue * (validated.customsDutyRate / 100);
  const localCosts =
    validated.localPortCharges + validated.lastMileDelivery;
  const totalLandedCost =
    factoryCostTotal +
    validated.freightCostTotal +
    insuranceCostTotal +
    customsDutyTotal +
    localCosts;
  const unitLandedCost = totalLandedCost / validated.quantity;
  const marginPerUnit = validated.targetRetailPrice - unitLandedCost;
  const marginPercent =
    validated.targetRetailPrice > 0
      ? (marginPerUnit / validated.targetRetailPrice) * 100
      : 0;
  const roiPercent =
    unitLandedCost > 0 ? (marginPerUnit / unitLandedCost) * 100 : 0;
  const warnings = [
    `Le taux de ${validated.customsDutyRate}% est fourni par l’utilisateur pour le code HS ${validated.hsCode}; le calculateur ne consulte pas encore une base tarifaire officielle.`,
  ];

  if (insuranceWasEstimated) {
    warnings.push(
      `Assurance estimée selon le mode ${validated.shippingMode}; remplacez-la par le montant réel du transitaire dès qu’il est connu.`,
    );
  }

  if (validated.destinationMarket === 'EU') {
    warnings.push(
      "La TVA à l’importation n’est pas incluse : son traitement dépend du pays, du régime fiscal et de la récupération éventuelle.",
    );
  } else {
    warnings.push(
      'Les frais MPF/HMF et droits additionnels éventuels ne sont pas inclus.',
    );
  }

  return {
    factoryCostTotal: roundMoney(factoryCostTotal),
    freightCostTotal: roundMoney(validated.freightCostTotal),
    insuranceCostTotal: roundMoney(insuranceCostTotal),
    customsDutyTotal: roundMoney(customsDutyTotal),
    totalLandedCost: roundMoney(totalLandedCost),
    unitLandedCost: roundMoney(unitLandedCost),
    marginPerUnit: roundMoney(marginPerUnit),
    marginPercent: roundPercent(marginPercent),
    roiPercent: roundPercent(roiPercent),
    breakdownPct: {
      factoryPct: safeShare(factoryCostTotal, totalLandedCost),
      freightPct: safeShare(validated.freightCostTotal, totalLandedCost),
      dutyPct: safeShare(customsDutyTotal, totalLandedCost),
      localPct: safeShare(insuranceCostTotal + localCosts, totalLandedCost),
    },
    calculationContext: {
      destinationMarket: validated.destinationMarket,
      shippingMode: validated.shippingMode,
      hsCode: validated.hsCode,
      customsDutyRate: validated.customsDutyRate,
      insuranceWasEstimated,
    },
    warnings,
  };
}

