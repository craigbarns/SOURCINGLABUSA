import 'server-only';

import type { QuoteAnalysisResponse, StructuredQuote } from '@/lib/types';
import { compareQuotesDeterministically } from '@/lib/server/quotes/comparison';

const DEMO_QUOTES: StructuredQuote[] = [
  {
    fileName: 'DEMO_Alpha.pdf',
    supplierName: 'Demo Alpha Manufacturing',
    quoteNumber: 'DEMO-A-001',
    quoteDate: '2026-07-01',
    currency: 'USD',
    incoterm: 'FOB',
    paymentTerms: '30% deposit / 70% before shipment',
    leadTime: '35 days',
    validity: '30 days',
    moq: 1_000,
    totalQuantity: 1_000,
    totals: {
      subtotal: 4_400,
      freight: null,
      tooling: 500,
      tax: null,
      discount: null,
      total: 4_900,
    },
    lineItems: [
      {
        description: 'Demo product — specification A',
        sku: 'DEMO-A',
        quantity: 1_000,
        unit: 'pcs',
        unitPrice: 4.4,
        total: 4_400,
      },
      {
        description: 'Demo tooling',
        sku: null,
        quantity: 1,
        unit: 'lot',
        unitPrice: 500,
        total: 500,
      },
    ],
    evidence: [],
    extractionConfidence: 1,
    warnings: ['Demo data: no information was read from your file.'],
  },
  {
    fileName: 'DEMO_Beta.pdf',
    supplierName: 'Demo Beta Industrial',
    quoteNumber: 'DEMO-B-002',
    quoteDate: '2026-07-02',
    currency: 'USD',
    incoterm: 'FOB',
    paymentTerms: '50% deposit / 50% before shipment',
    leadTime: '28 days',
    validity: '14 days',
    moq: 1_000,
    totalQuantity: 1_000,
    totals: {
      subtotal: 4_150,
      freight: null,
      tooling: 650,
      tax: null,
      discount: null,
      total: 4_800,
    },
    lineItems: [
      {
        description: 'Demo product — specification A',
        sku: 'DEMO-B',
        quantity: 1_000,
        unit: 'pcs',
        unitPrice: 4.15,
        total: 4_150,
      },
      {
        description: 'Demo tooling',
        sku: null,
        quantity: 1,
        unit: 'lot',
        unitPrice: 650,
        total: 650,
      },
    ],
    evidence: [],
    extractionConfidence: 1,
    warnings: ['Demo data: no information was read from your file.'],
  },
  {
    fileName: 'DEMO_Gamma.pdf',
    supplierName: 'Demo Gamma Supply',
    quoteNumber: 'DEMO-C-003',
    quoteDate: '2026-07-03',
    currency: 'USD',
    incoterm: null,
    paymentTerms: null,
    leadTime: '42 days',
    validity: '30 days',
    moq: 1_000,
    totalQuantity: 1_000,
    totals: {
      subtotal: 4_650,
      freight: null,
      tooling: 0,
      tax: null,
      discount: null,
      total: 4_650,
    },
    lineItems: [
      {
        description: 'Demo product — specification A',
        sku: 'DEMO-C',
        quantity: 1_000,
        unit: 'pcs',
        unitPrice: 4.65,
        total: 4_650,
      },
    ],
    evidence: [],
    extractionConfidence: 1,
    warnings: ['Demo data: no information was read from your file.'],
  },
];

export function createDemoQuoteAnalysis(): QuoteAnalysisResponse {
  const comparison = compareQuotesDeterministically(DEMO_QUOTES);

  return {
    mode: 'demo',
    providers: {
      ocr: 'demo',
      extraction: 'demo',
      analysis: 'demo',
    },
    quotes: DEMO_QUOTES,
    comparison: {
      ...comparison,
      summary:
        'Demo using three SourcingLab sample quotes. Your files were not read because Mistral OCR is not configured.',
      recommendedQuoteFileName: null,
      recommendations: [
        'Configure MISTRAL_API_KEY to analyze actual document content.',
        'Configure OPENAI_API_KEY to add server-side qualitative analysis.',
      ],
    },
    warning:
      'DEMO MODE — Educational result generated from sample data. None of your file content was analyzed.',
  };
}
