import { describe, expect, it } from 'vitest';

import { compareLandedCosts } from '@/lib/landed-comparison';
import { calculateLandedCost } from '@/lib/landed-cost';
import type {
  LandedComparisonSharedInput,
  LandedComparisonSupplierInput,
} from '@/lib/types';

const SHARED: LandedComparisonSharedInput = {
  quantity: 3_000,
  destinationMarket: 'US',
  shippingMode: 'sea_lcl',
  freightCostTotal: 1_850,
  insuranceCost: 150,
  localPortCharges: 350,
  lastMileDelivery: 450,
};

/** China is cheaper ex-works but carries a Section 301 remedy; Vietnam does not. */
const CHINA: LandedComparisonSupplierInput = {
  fileName: 'china.pdf',
  supplierName: 'Shenzhen Precision',
  unitPriceFob: 4.2,
  currency: 'USD',
  originCountry: 'CN',
  dutyRatePercent: 28.4,
};

const VIETNAM: LandedComparisonSupplierInput = {
  fileName: 'vietnam.pdf',
  supplierName: 'Hanoi Manufacturing',
  unitPriceFob: 4.5,
  currency: 'USD',
  originCountry: 'VN',
  dutyRatePercent: 3.4,
};

describe('landed-cost comparison', () => {
  it('surfaces a ranking inversion when duty outweighs the factory price gap', () => {
    const result = compareLandedCosts([CHINA, VIETNAM], SHARED);

    expect(result.comparable).toBe(true);
    // China wins on factory price...
    expect(result.fobWinnerFileName).toBe('china.pdf');
    // ...but Vietnam wins once duty is applied.
    expect(result.landedWinnerFileName).toBe('vietnam.pdf');
    expect(result.inverted).toBe(true);

    const vietnam = result.rows[0];
    expect(vietnam.landedRank).toBe(1);
    expect(vietnam.fobRank).toBe(2);
    expect(vietnam.rankDelta).toBe(1);
    expect(vietnam.landedUnitCost).toBeLessThan(result.rows[1].landedUnitCost);
  });

  it('reports no inversion when the cheapest factory price also lands cheapest', () => {
    const result = compareLandedCosts(
      [CHINA, { ...VIETNAM, dutyRatePercent: 28.4 }],
      SHARED,
    );

    expect(result.inverted).toBe(false);
    expect(result.fobWinnerFileName).toBe('china.pdf');
    expect(result.landedWinnerFileName).toBe('china.pdf');
  });

  it('computes savings between the best and worst landed cost', () => {
    const result = compareLandedCosts([CHINA, VIETNAM], SHARED);
    const best = result.rows[0];
    const worst = result.rows[result.rows.length - 1];

    expect(result.savingsPerUnit).toBeCloseTo(
      worst.landedUnitCost - best.landedUnitCost,
      2,
    );
    expect(result.savingsTotal).toBeCloseTo(
      worst.landedTotalCost - best.landedTotalCost,
      1,
    );
    expect(result.savingsPercent).toBeGreaterThan(0);
  });

  it('agrees with calculateLandedCost for an equivalent single input', () => {
    const result = compareLandedCosts([CHINA, VIETNAM], SHARED);
    const chinaRow = result.rows.find((row) => row.fileName === 'china.pdf');

    const reference = calculateLandedCost({
      unitPriceFob: CHINA.unitPriceFob,
      quantity: SHARED.quantity,
      shippingMode: SHARED.shippingMode,
      hsCode: '7323.93',
      destinationMarket: SHARED.destinationMarket,
      customsDutyRate: CHINA.dutyRatePercent,
      freightCostTotal: SHARED.freightCostTotal,
      insuranceCost: SHARED.insuranceCost,
      localPortCharges: SHARED.localPortCharges,
      lastMileDelivery: SHARED.lastMileDelivery,
      targetRetailPrice: 24.99,
    });

    expect(chinaRow?.landedUnitCost).toBeCloseTo(reference.unitLandedCost, 2);
    expect(chinaRow?.landedTotalCost).toBeCloseTo(reference.totalLandedCost, 1);
  });

  it('applies the EU customs-value rule, which includes freight and insurance', () => {
    const us = compareLandedCosts([CHINA, VIETNAM], SHARED);
    const eu = compareLandedCosts([CHINA, VIETNAM], {
      ...SHARED,
      destinationMarket: 'EU',
    });

    const usChina = us.rows.find((row) => row.fileName === 'china.pdf');
    const euChina = eu.rows.find((row) => row.fileName === 'china.pdf');

    // Same duty rate over a larger customs base must cost more.
    expect(euChina?.dutyPerUnit).toBeGreaterThan(usChina?.dutyPerUnit ?? 0);
  });

  it('refuses to compare across multiple currencies', () => {
    const result = compareLandedCosts(
      [CHINA, { ...VIETNAM, currency: 'EUR' }],
      SHARED,
    );

    expect(result.comparable).toBe(false);
    expect(result.rows).toHaveLength(0);
    expect(result.warnings[0]).toMatch(/multiple currencies/i);
  });

  it('requires at least two quotes and a positive quantity', () => {
    expect(compareLandedCosts([CHINA], SHARED).comparable).toBe(false);
    expect(
      compareLandedCosts([CHINA, VIETNAM], { ...SHARED, quantity: 0 })
        .comparable,
    ).toBe(false);
  });

  it('always discloses that duty rates are not from a live tariff database', () => {
    const result = compareLandedCosts([CHINA, VIETNAM], SHARED);

    expect(result.warnings.join(' ')).toMatch(/live tariff database/i);
  });
});
