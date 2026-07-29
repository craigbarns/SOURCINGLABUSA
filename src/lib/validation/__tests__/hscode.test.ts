import { describe, expect, it } from 'vitest';

import {
  hsCodeAnalysisResultSchema,
  hsCodeInputSchema,
  normalizeHsCodeAnalysisResult,
} from '@/lib/validation/hscode';

const VALID_RESULT = {
  mode: 'live' as const,
  sourceLabel: 'AI-generated tariff estimate',
  hsCode6Digit: '7323.93',
  hsCode10Digit: '7323.93.0080',
  productDescription: 'Stainless steel household article',
  categoryName: 'Household articles',
  destinationMarket: 'US' as const,
  originCountry: 'China (CN)',
  dutyRates: {
    baseDutyPercent: 3.4,
    section301Percent: 7.5,
    additionalTaxesPercent: 0.3464,
    effectiveDutyPercent: 1,
  },
  dutyBreakdownNotes: ['Verify each tariff component.'],
  regulatoryWarnings: ['Requirements depend on the final product.'],
  alternativeHsCodes: [
    {
      code: '3924.10.40',
      description: 'Plastic household article',
      dutyRate: 'Rate to verify',
    },
  ],
};

describe('HS-code validation', () => {
  it('applies request defaults and rejects unknown input fields', () => {
    expect(
      hsCodeInputSchema.parse({
        query: '  stainless steel bottle  ',
      }),
    ).toEqual({
      query: 'stainless steel bottle',
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    expect(
      hsCodeInputSchema.safeParse({
        query: 'stainless steel bottle',
        unexpected: true,
      }).success,
    ).toBe(false);
  });

  it('accepts only supported origin codes', () => {
    expect(
      hsCodeInputSchema.safeParse({
        query: 'cotton shirt',
        originCountry: 'VN',
      }).success,
    ).toBe(true);
    expect(
      hsCodeInputSchema.safeParse({
        query: 'cotton shirt',
        originCountry: 'arbitrary origin',
      }).success,
    ).toBe(false);
  });

  it('strictly validates nested result fields and tariff codes', () => {
    expect(hsCodeAnalysisResultSchema.safeParse(VALID_RESULT).success).toBe(
      true,
    );
    expect(
      hsCodeAnalysisResultSchema.safeParse({
        ...VALID_RESULT,
        dutyRates: {
          ...VALID_RESULT.dutyRates,
          unexpected: 1,
        },
      }).success,
    ).toBe(false);
    expect(
      hsCodeAnalysisResultSchema.safeParse({
        ...VALID_RESULT,
        hsCode10Digit: 'not-a-code',
      }).success,
    ).toBe(false);
    expect(
      hsCodeAnalysisResultSchema.safeParse({
        ...VALID_RESULT,
        hsCode10Digit: '6109.10.0012',
      }).success,
    ).toBe(false);
  });

  it('recomputes the component total instead of trusting provider output', () => {
    const normalized = normalizeHsCodeAnalysisResult(VALID_RESULT);

    expect(normalized.dutyRates.effectiveDutyPercent).toBe(11.2464);
  });
});
