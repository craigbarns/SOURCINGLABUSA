import { describe, expect, it } from 'vitest';

import { buildQuoteSummaryText } from '@/lib/quote-report-summary';
import type { QuoteAnalysisResponse } from '@/lib/types';

function buildResult(
  overrides: Partial<QuoteAnalysisResponse> = {},
): QuoteAnalysisResponse {
  return {
    mode: 'live',
    providers: { ocr: 'mistral', extraction: 'openai', analysis: 'openai' },
    quotes: [],
    comparison: {
      comparability: 'high',
      summary: 'Two comparable offers in USD; the third is missing a total.',
      recommendedQuoteFileName: 'a.pdf',
      priceSpreadPercent: 18,
      ranking: [
        {
          rank: 1,
          fileName: 'a.pdf',
          supplierName: 'Shenzhen Alpha',
          amount: 12000,
          currency: 'USD',
          basis: 'weighted_unit_price',
        },
        {
          rank: 2,
          fileName: 'b.pdf',
          supplierName: 'Ningbo Beta',
          amount: 14200,
          currency: 'USD',
          basis: 'weighted_unit_price',
        },
        {
          rank: null,
          fileName: 'c.pdf',
          supplierName: 'Gamma Trading',
          amount: null,
          currency: null,
          basis: 'insufficient_data',
        },
      ],
      mathChecks: [],
      vigilancePoints: ['Gamma Trading did not report a usable total.'],
      recommendations: ['Request a revised quote from Gamma Trading.'],
    },
    warning: null,
    ...overrides,
  };
}

describe('buildQuoteSummaryText', () => {
  it('summarizes the best value, ranking, and savings from the deterministic data', () => {
    const text = buildQuoteSummaryText(buildResult());

    expect(text).toContain('SUPPLIER QUOTE COMPARISON — SourcingLab USA');
    expect(text).toContain('Analysis mode: Live analysis');
    expect(text).toContain('Comparability: High (2 of 3 directly comparable)');
    expect(text).toContain('Price spread: 18%');
    expect(text).toContain('BEST COMPARABLE VALUE');
    expect(text).toContain('Shenzhen Alpha — $12,000.00 (weighted unit price)');
    expect(text).toContain('Potential savings vs highest quote: $2,200.00 (15%)');
    expect(text).toContain('#1  Shenzhen Alpha');
    expect(text).toContain('n/a  Gamma Trading — Not extracted (insufficient data)');
    expect(text).toContain('ITEMS TO VERIFY');
    expect(text).toContain('- Gamma Trading did not report a usable total.');
    expect(text).toContain('NEXT ACTIONS');
  });

  it('labels demo mode explicitly so a pasted summary is never mistaken for real analysis', () => {
    const text = buildQuoteSummaryText(buildResult({ mode: 'demo' }));

    expect(text).toContain('Analysis mode: Demo mode (no user files analyzed)');
  });

  it('omits the savings line when currencies are not directly comparable', () => {
    const text = buildQuoteSummaryText(
      buildResult({
        comparison: {
          ...buildResult().comparison,
          ranking: [
            {
              rank: 1,
              fileName: 'a.pdf',
              supplierName: 'Shenzhen Alpha',
              amount: 12000,
              currency: 'USD',
              basis: 'reported_total',
            },
            {
              rank: 2,
              fileName: 'b.pdf',
              supplierName: 'Ningbo Beta',
              amount: 14200,
              currency: 'EUR',
              basis: 'reported_total',
            },
          ],
        },
      }),
    );

    expect(text).not.toContain('Potential savings');
  });
});
