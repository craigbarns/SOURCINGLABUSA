import { describe, expect, it } from 'vitest';

import { calculateLandedCost } from '@/lib/landed-cost';
import type { LandedCostInput } from '@/lib/types';

const baseInput: LandedCostInput = {
  unitPriceFob: 10,
  quantity: 100,
  shippingMode: 'sea_fcl',
  hsCode: '9617.00',
  destinationMarket: 'US',
  customsDutyRate: 5,
  freightCostTotal: 200,
  insuranceCost: 20,
  localPortCharges: 50,
  lastMileDelivery: 30,
  targetRetailPrice: 20,
};

describe('calculateLandedCost', () => {
  it('utilise la valeur FOB comme base douanière aux États-Unis', () => {
    const result = calculateLandedCost(baseInput);

    expect(result.customsDutyTotal).toBe(50);
    expect(result.totalLandedCost).toBe(1_350);
    expect(result.unitLandedCost).toBe(13.5);
    expect(result.calculationContext.hsCode).toBe('9617.00');
  });

  it('inclut fret et assurance dans la base douanière UE', () => {
    const result = calculateLandedCost({
      ...baseInput,
      destinationMarket: 'EU',
    });

    expect(result.customsDutyTotal).toBe(61);
    expect(result.totalLandedCost).toBe(1_361);
  });

  it('estime une assurance différente selon le mode lorsque le champ est vide', () => {
    const seaLcl = calculateLandedCost({
      ...baseInput,
      shippingMode: 'sea_lcl',
      insuranceCost: null,
    });
    const express = calculateLandedCost({
      ...baseInput,
      shippingMode: 'air_express',
      insuranceCost: null,
    });

    expect(seaLcl.insuranceCostTotal).toBe(4);
    expect(express.insuranceCostTotal).toBe(2);
    expect(seaLcl.calculationContext.insuranceWasEstimated).toBe(true);
  });

  it('conserve une assurance explicitement saisie à zéro', () => {
    const result = calculateLandedCost({
      ...baseInput,
      insuranceCost: 0,
    });

    expect(result.insuranceCostTotal).toBe(0);
    expect(result.calculationContext.insuranceWasEstimated).toBe(false);
  });

  it('rejette les valeurs négatives et codes HS invalides', () => {
    expect(() =>
      calculateLandedCost({
        ...baseInput,
        freightCostTotal: -1,
      }),
    ).toThrow();

    expect(() =>
      calculateLandedCost({
        ...baseInput,
        hsCode: 'not-a-code',
      }),
    ).toThrow();
  });

  it('ne produit pas de NaN quand tous les coûts sont nuls', () => {
    const result = calculateLandedCost({
      ...baseInput,
      unitPriceFob: 0,
      freightCostTotal: 0,
      insuranceCost: 0,
      localPortCharges: 0,
      lastMileDelivery: 0,
      customsDutyRate: 0,
      targetRetailPrice: 0,
    });

    expect(result.totalLandedCost).toBe(0);
    expect(Object.values(result.breakdownPct)).toEqual([0, 0, 0, 0]);
    expect(Number.isNaN(result.roiPercent)).toBe(false);
  });
});

