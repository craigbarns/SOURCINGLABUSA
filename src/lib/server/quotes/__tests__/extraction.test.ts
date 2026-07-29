import { describe, expect, it } from 'vitest';

import { compareQuotesDeterministically } from '@/lib/server/quotes/comparison';
import {
  extractQuoteDeterministically,
  parseLocalizedNumber,
} from '@/lib/server/quotes/extraction';
import type { OcrDocument } from '@/lib/server/quotes/ocr';

const OCR_DOCUMENT: OcrDocument = {
  fileName: 'supplier-a.pdf',
  pageCount: 1,
  averageConfidence: 0.96,
  markdown: `
# Shenzhen Reliable Products Co., Ltd.
Supplier: Shenzhen Reliable Products Co., Ltd.
Quotation No: Q-2026-081
Date: 2026-07-28
Currency: USD
Incoterm: FOB Shenzhen
Payment Terms: 30% deposit, 70% before shipment
Lead Time: 35 days

| Product | Qty | Unit | Unit Price | Amount |
| --- | ---: | --- | ---: | ---: |
| Travel backpack 35 L | 1000 | pcs | USD 4.00 | USD 4000.00 |
| Sample | 50 | pcs | USD 4.00 | USD 200.00 |

Grand Total: USD 4,200.00
`,
};

describe('structured quote extraction', () => {
  it('extracts only values evidenced by OCR text and tables', () => {
    const quote = extractQuoteDeterministically(OCR_DOCUMENT);

    expect(quote.supplierName).toBe('Shenzhen Reliable Products Co., Ltd.');
    expect(quote.quoteNumber).toBe('Q-2026-081');
    expect(quote.currency).toBe('USD');
    expect(quote.incoterm).toContain('FOB');
    expect(quote.paymentTerms).toContain('30% deposit');
    expect(quote.totalQuantity).toBe(1050);
    expect(quote.totals.total).toBe(4200);
    expect(quote.lineItems).toEqual([
      expect.objectContaining({
        description: 'Travel backpack 35 L',
        quantity: 1000,
        unitPrice: 4,
        total: 4000,
      }),
      expect.objectContaining({
        description: 'Sample',
        quantity: 50,
        unitPrice: 4,
        total: 200,
      }),
    ]);
    expect(quote.warnings).toEqual([]);
  });

  it('parses common US and European number formats deterministically', () => {
    expect(parseLocalizedNumber('USD 1,234.56')).toBe(1234.56);
    expect(parseLocalizedNumber('1.234,56 €')).toBe(1234.56);
    expect(parseLocalizedNumber('-10')).toBeNull();
    expect(parseLocalizedNumber('not a number')).toBeNull();
  });

  it('does not extract a total from the subtotal label', () => {
    const quote = extractQuoteDeterministically({
      ...OCR_DOCUMENT,
      markdown: `
Supplier: Shenzhen Reliable Products Co., Ltd.
Currency: USD
Subtotal: USD 100.00
Grand Total: USD 150.00
`,
    });

    expect(quote.totals.subtotal).toBe(100);
    expect(quote.totals.total).toBe(150);
  });

  it('runs mathematical checks and ranks only comparable quotes', () => {
    const first = extractQuoteDeterministically(OCR_DOCUMENT);
    const second = extractQuoteDeterministically({
      ...OCR_DOCUMENT,
      fileName: 'supplier-b.pdf',
      markdown: OCR_DOCUMENT.markdown
        .replace(
          'USD 4.00 | USD 4000.00',
          'USD 4.20 | USD 4200.00',
        )
        .replace('USD 4.00 | USD 200.00', 'USD 4.20 | USD 210.00')
        .replace('4,200.00', '4,410.00')
        .replace('Reliable', 'Alternative'),
    });
    const comparison = compareQuotesDeterministically([first, second]);

    expect(comparison.comparability).toBe('high');
    expect(comparison.recommendedQuoteFileName).toBe('supplier-a.pdf');
    expect(comparison.ranking[0].rank).toBe(1);
    expect(comparison.mathChecks.map((check) => check.status)).toEqual([
      'matched',
      'matched',
    ]);
  });

  it('does not rank quotes with different product identities', () => {
    const first = extractQuoteDeterministically(OCR_DOCUMENT);
    const second = extractQuoteDeterministically({
      ...OCR_DOCUMENT,
      fileName: 'supplier-b.pdf',
      markdown: OCR_DOCUMENT.markdown.replace(
        'Travel backpack 35 L',
        'Stainless steel bottle 1 L',
      ),
    });

    const comparison = compareQuotesDeterministically([first, second]);

    expect(comparison.comparability).toBe('limited');
    expect(comparison.ranking.map((item) => item.rank)).toEqual([null, null]);
    expect(comparison.vigilancePoints).toContain(
      'The extracted product descriptions differ, so the quotes may not cover equivalent products.',
    );
  });

  it('does not rank quotes with different total quantities', () => {
    const first = extractQuoteDeterministically(OCR_DOCUMENT);
    const second = {
      ...extractQuoteDeterministically({
        ...OCR_DOCUMENT,
        fileName: 'supplier-b.pdf',
      }),
      totalQuantity: 1_000,
    };

    const comparison = compareQuotesDeterministically([first, second]);

    expect(comparison.comparability).toBe('limited');
    expect(comparison.ranking.map((item) => item.rank)).toEqual([null, null]);
    expect(comparison.vigilancePoints).toContain(
      'The extracted total quantities differ, so volume pricing may not be directly equivalent.',
    );
  });

  it('treats duplicate file names as ambiguous and keeps checks positional', () => {
    const first = extractQuoteDeterministically(OCR_DOCUMENT);
    const second = extractQuoteDeterministically(OCR_DOCUMENT);
    second.totals.total = 4_500;

    const comparison = compareQuotesDeterministically([first, second]);

    expect(comparison.comparability).toBe('limited');
    expect(comparison.recommendedQuoteFileName).toBeNull();
    expect(comparison.ranking.map((item) => item.rank)).toEqual([null, null]);
    expect(comparison.mathChecks.map((check) => check.status)).toEqual([
      'matched',
      'mismatch',
    ]);
    expect(comparison.vigilancePoints).toContain(
      'Duplicate file names were detected. Rename each file so every quote can be tracked unambiguously.',
    );
  });

  it('reconciles a grand total with separately extracted charges', () => {
    const quote = extractQuoteDeterministically(OCR_DOCUMENT);
    quote.totals.subtotal = 4200;
    quote.totals.freight = 125;
    quote.totals.total = 4325;

    const comparison = compareQuotesDeterministically([quote]);

    expect(comparison.comparability).toBe('not_comparable');
    expect(comparison.mathChecks[0]).toEqual(
      expect.objectContaining({
        computedLinesTotal: 4200,
        computedExpectedTotal: 4325,
        difference: 0,
        calculationBasis: 'line_items_plus_adjustments',
        status: 'matched',
      }),
    );
  });
});
