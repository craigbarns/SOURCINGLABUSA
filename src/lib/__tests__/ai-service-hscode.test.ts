import { beforeEach, describe, expect, it, vi } from 'vitest';

import { analyzeHsCode } from '@/lib/ai-service';

const fetchMock = vi.fn();
const VALID_RESPONSE = {
  mode: 'live',
  sourceLabel: 'AI-generated tariff estimate',
  hsCode6Digit: '7323.93',
  hsCode10Digit: '7323.93.00.80',
  productDescription: 'Stainless steel household article',
  categoryName: 'Household articles',
  destinationMarket: 'US',
  originCountry: 'China (CN)',
  dutyRates: {
    baseDutyPercent: 3.4,
    section301Percent: 7.5,
    additionalTaxesPercent: 0.3464,
    effectiveDutyPercent: 1,
  },
  dutyBreakdownNotes: ['Verify each tariff component.'],
  regulatoryWarnings: ['Requirements depend on the final product.'],
  alternativeHsCodes: [],
};

describe('HS-code API client', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('strictly validates the response and recomputes its component total', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(VALID_RESPONSE),
    } as unknown as Response);

    const result = await analyzeHsCode({
      query: 'stainless steel bottle',
      destinationMarket: 'US',
      originCountry: 'CN',
    });

    expect(result.dutyRates.effectiveDutyPercent).toBe(11.2464);
  });

  it('rejects malformed successful responses', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        ...VALID_RESPONSE,
        unexpected: true,
      }),
    } as unknown as Response);

    await expect(
      analyzeHsCode({
        query: 'stainless steel bottle',
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        name: 'ClientApiError',
        message: 'The server returned an invalid HS-code response.',
      }),
    );
  });

  it('propagates a safe API error message', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        message: 'This request is not covered by the limited demo data.',
      }),
    } as unknown as Response);

    await expect(
      analyzeHsCode({
        query: 'wireless earbuds',
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        name: 'ClientApiError',
        message: 'This request is not covered by the limited demo data.',
      }),
    );
  });
});
