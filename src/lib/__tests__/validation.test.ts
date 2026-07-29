import { describe, expect, it } from 'vitest';

import { landedCostInputSchema } from '@/lib/validation/landed-cost';
import { structuredQuoteSchema } from '@/lib/validation/quote';
import { waitlistInputSchema } from '@/lib/validation/waitlist';

describe('validation partagée', () => {
  it('normalise une adresse de waitlist', () => {
    const result = waitlistInputSchema.parse({
      email: '  Buyer@Example.COM ',
      role: 'brand_owner_ecommerce',
    });

    expect(result.email).toBe('buyer@example.com');
  });

  it('rejette les nombres non finis et les quantités nulles', () => {
    const result = landedCostInputSchema.safeParse({
      unitPriceFob: Number.NaN,
      quantity: 0,
      shippingMode: 'sea_lcl',
      hsCode: '9617.00',
      destinationMarket: 'US',
      customsDutyRate: 5,
      freightCostTotal: 100,
      insuranceCost: null,
      localPortCharges: 0,
      lastMileDelivery: 0,
      targetRetailPrice: 10,
    });

    expect(result.success).toBe(false);
  });

  it.each(['7323.93.00.80', '7323930080'])(
    'accepts a valid 10-digit HTS code: %s',
    (hsCode) => {
      const result = landedCostInputSchema.safeParse({
        unitPriceFob: 4.5,
        quantity: 1_000,
        shippingMode: 'sea_lcl',
        hsCode,
        destinationMarket: 'US',
        customsDutyRate: 3.4,
        freightCostTotal: 1_200,
        insuranceCost: null,
        localPortCharges: 300,
        lastMileDelivery: 250,
        targetRetailPrice: 24,
      });

      expect(result.success).toBe(true);
    },
  );

  it('rejette une extraction structurée avec montant négatif', () => {
    const result = structuredQuoteSchema.safeParse({
      fileName: 'quote.pdf',
      supplierName: null,
      quoteNumber: null,
      quoteDate: null,
      currency: 'USD',
      incoterm: null,
      paymentTerms: null,
      leadTime: null,
      validity: null,
      moq: null,
      totalQuantity: null,
      totals: {
        subtotal: null,
        freight: null,
        tooling: null,
        tax: null,
        discount: null,
        total: -10,
      },
      lineItems: [],
      evidence: [],
      extractionConfidence: 0.5,
      warnings: [],
    });

    expect(result.success).toBe(false);
  });
});
