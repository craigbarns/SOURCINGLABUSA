import { z } from 'zod';

export const MAX_QUOTE_FILES = 3;
export const MAX_QUOTE_FILE_BYTES = 12 * 1024 * 1024;
export const MAX_QUOTE_UPLOAD_BYTES = 25 * 1024 * 1024;

export const ACCEPTED_QUOTE_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

const nullableNonNegativeNumber = z.number().finite().nonnegative().nullable();
const nullableText = z.string().trim().min(1).nullable();

export const quoteLineItemSchema = z
  .object({
    description: z.string().trim().min(1).max(500),
    sku: nullableText,
    quantity: nullableNonNegativeNumber,
    unit: nullableText,
    unitPrice: nullableNonNegativeNumber,
    total: nullableNonNegativeNumber,
  })
  .strict();

export const quoteTotalsSchema = z
  .object({
    subtotal: nullableNonNegativeNumber,
    freight: nullableNonNegativeNumber,
    tooling: nullableNonNegativeNumber,
    tax: nullableNonNegativeNumber,
    discount: nullableNonNegativeNumber,
    total: nullableNonNegativeNumber,
  })
  .strict();

export const structuredQuoteSchema = z
  .object({
    fileName: z.string().trim().min(1).max(255),
    supplierName: nullableText,
    quoteNumber: nullableText,
    quoteDate: nullableText,
    currency: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}$/)
      .nullable(),
    incoterm: nullableText,
    paymentTerms: nullableText,
    leadTime: nullableText,
    validity: nullableText,
    moq: nullableNonNegativeNumber,
    totalQuantity: nullableNonNegativeNumber,
    totals: quoteTotalsSchema,
    lineItems: z.array(quoteLineItemSchema).max(250),
    evidence: z
      .array(
        z
          .object({
            field: z.string().trim().min(1).max(100),
            excerpt: z.string().trim().min(1).max(500),
          })
          .strict(),
      )
      .max(30),
    extractionConfidence: z.number().finite().min(0).max(1),
    warnings: z.array(z.string().trim().min(1).max(500)).max(30),
  })
  .strict();

export const quoteComparisonSchema = z
  .object({
    comparability: z.enum(['high', 'limited', 'not_comparable']),
    summary: z.string().trim().min(1).max(2_000),
    recommendedQuoteFileName: z.string().trim().min(1).max(255).nullable(),
    priceSpreadPercent: nullableNonNegativeNumber,
    ranking: z.array(
      z
        .object({
          rank: z.number().int().positive().nullable(),
          fileName: z.string().trim().min(1).max(255),
          supplierName: nullableText,
          amount: nullableNonNegativeNumber,
          currency: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/).nullable(),
          basis: z.enum([
            'reported_total',
            'reported_total_per_unit',
            'weighted_unit_price',
            'insufficient_data',
          ]),
        })
        .strict(),
    ),
    mathChecks: z.array(
      z
        .object({
          fileName: z.string().trim().min(1).max(255),
          reportedTotal: nullableNonNegativeNumber,
          computedLinesTotal: nullableNonNegativeNumber,
          computedExpectedTotal: nullableNonNegativeNumber,
          difference: z.number().finite().nullable(),
          calculationBasis: z.enum([
            'line_items',
            'line_items_plus_adjustments',
            'subtotal',
            'subtotal_plus_adjustments',
            'insufficient_data',
          ]),
          status: z.enum(['matched', 'mismatch', 'insufficient_data']),
        })
        .strict(),
    ),
    vigilancePoints: z.array(z.string().trim().min(1).max(500)).max(30),
    recommendations: z.array(z.string().trim().min(1).max(500)).max(30),
  })
  .strict();

export const aiQuoteNarrativeSchema = z
  .object({
    summary: z.string().trim().min(1).max(2_000),
    vigilancePoints: z.array(z.string().trim().min(1).max(500)).max(12),
    recommendations: z.array(z.string().trim().min(1).max(500)).max(12),
  })
  .strict();

export const quoteAnalysisResponseSchema = z
  .object({
    mode: z.enum(['live', 'demo', 'partial']),
    providers: z
      .object({
        ocr: z.enum(['mistral', 'demo']),
        extraction: z.enum(['openai', 'deterministic', 'demo']),
        analysis: z.enum(['openai', 'deterministic', 'demo']),
      })
      .strict(),
    quotes: z.array(structuredQuoteSchema).min(1).max(MAX_QUOTE_FILES),
    comparison: quoteComparisonSchema,
    warning: z.string().trim().min(1).nullable(),
  })
  .strict();
