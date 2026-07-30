import { describe, expect, it } from 'vitest';

import {
  buildHsCodeSummaryText,
  buildLandedCostSummaryText,
  buildProductSpecSummaryText,
  buildSupplierEmailSummaryText,
} from '@/lib/report-summaries';
import type {
  EmailGeneratorResult,
  HsCodeAnalysisResult,
  LandedCostResult,
  ProductSpecResult,
} from '@/lib/types';

const productSpec: ProductSpecResult = {
  mode: 'live',
  sourceLabel: 'AI-generated specification',
  category: 'drinkware',
  productTitle: 'Insulated Stainless Steel Bottle 750ml',
  targetMarket: 'US',
  specsSummary: 'A double-wall vacuum bottle for the US retail market.',
  technicalSpecs: {
    materials: ['18/8 stainless steel', 'BPA-free lid'],
    dimensions: '7.5 x 27 cm',
    weight: '320 g',
    tolerances: '+/- 2 mm',
    keyFeatures: ['Vacuum insulation'],
  },
  certifications: {
    toVerify: ['FDA food-contact', 'Prop 65'],
    recommended: ['LFGB'],
    testingLabs: ['SGS', 'Intertek'],
    verificationNotice: 'Confirm applicability with a compliance specialist.',
  },
  moq: { recommended: 3000, sampleMoq: 5, unit: 'units', notes: '' },
  pricingTarget: {
    estimatedFob: '$4.20',
    targetLandCost: '$6.80',
    recommendedMSRP: '$24.99',
    marginPotential: '72%',
  },
  qualityControl: ['Pre-shipment inspection', 'Leak test'],
};

const landedCost: LandedCostResult = {
  factoryCostTotal: 13500,
  freightCostTotal: 1850,
  insuranceCostTotal: 150,
  customsDutyTotal: 0,
  totalLandedCost: 16150,
  unitLandedCost: 5.38,
  marginPerUnit: 19.61,
  marginPercent: 78,
  roiPercent: 364,
  breakdownPct: { factoryPct: 84, freightPct: 11, dutyPct: 0, localPct: 5 },
  calculationContext: {
    destinationMarket: 'US',
    shippingMode: 'sea_lcl',
    hsCode: '9617.00',
    customsDutyRate: 0,
    insuranceWasEstimated: true,
  },
  warnings: ['Import VAT is not included.'],
};

const hsCode: HsCodeAnalysisResult = {
  mode: 'live',
  sourceLabel: 'AI-generated tariff estimate',
  hsCode6Digit: '9617.00',
  hsCode10Digit: '9617.00.10.00',
  productDescription: 'Vacuum flasks',
  categoryName: 'Drinkware',
  destinationMarket: 'US',
  originCountry: 'China (CN)',
  dutyRates: {
    baseDutyPercent: 7.2,
    section301Percent: 25,
    additionalTaxesPercent: 0.3,
    effectiveDutyPercent: 32.5,
  },
  dutyBreakdownNotes: ['Base HTSUS rate applies.'],
  regulatoryWarnings: ['FDA food-contact requirements may apply.'],
  alternativeHsCodes: [
    { code: '7323.93', description: 'Stainless kitchenware', dutyRate: '2%' },
  ],
};

const email: EmailGeneratorResult = {
  subject: 'RFQ — 3,000 insulated bottles',
  body: 'Dear Sales Team,\n\nWe would like to request a quotation...',
  tips: ['Confirm the Incoterm.', 'Ask for the FOB port.'],
};

describe('report summaries', () => {
  it('builds a product specification summary and flags it as a draft', () => {
    const text = buildProductSpecSummaryText(productSpec);

    expect(text).toContain('PRODUCT SPECIFICATION — SourcingLab USA');
    expect(text).toContain('Product: Insulated Stainless Steel Bottle 750ml');
    expect(text).toContain('- Materials: 18/8 stainless steel, BPA-free lid');
    expect(text).toContain('- FDA food-contact');
    expect(text).toContain('- Recommended MOQ: 3000 units');
    expect(text).toContain('A draft specification');
  });

  it('labels demo product specs so a pasted draft is never mistaken for analysis', () => {
    const text = buildProductSpecSummaryText({ ...productSpec, mode: 'demo' });
    expect(text).toContain('Mode: Demo data — no AI analysis was performed.');
  });

  it('builds a landed cost summary with headline, totals, and breakdown', () => {
    const text = buildLandedCostSummaryText(landedCost);

    expect(text).toContain('LANDED COST ESTIMATE — SourcingLab USA');
    expect(text).toContain('Shipping mode: Sea freight (LCL)');
    expect(text).toContain('- Landed cost / unit: $5.38');
    expect(text).toContain('- Insurance (estimated): $150');
    expect(text).toContain('- Factory: 84%');
    expect(text).toContain('- Import VAT is not included.');
  });

  it('builds an HS code summary and keeps rates labeled as estimates', () => {
    const text = buildHsCodeSummaryText(hsCode);

    expect(text).toContain('HS CODE & DUTY RESEARCH — SourcingLab USA');
    expect(text).toContain('- 10-digit (HTS): 9617.00.10.00');
    expect(text).toContain('DUTY COMPONENTS (ESTIMATE)');
    expect(text).toContain('- Component total: 32.5%');
    expect(text).toContain('- 7323.93 — Stainless kitchenware (2%)');
    expect(text).toContain('starting points');
  });

  it('builds a supplier email summary with subject, body, and separated notes', () => {
    const text = buildSupplierEmailSummaryText(email);

    expect(text.startsWith('Subject: RFQ — 3,000 insulated bottles')).toBe(true);
    expect(text).toContain('We would like to request a quotation');
    expect(text).toContain('REVIEW NOTES (not part of the email)');
    expect(text).toContain('- Confirm the Incoterm.');
  });
});
