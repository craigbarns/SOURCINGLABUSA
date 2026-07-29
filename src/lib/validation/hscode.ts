import { z } from 'zod';

import type { HsCodeAnalysisResult } from '@/lib/types';

const boundedText = (maximum: number) =>
  z.string().trim().min(1).max(maximum);
const dutyRate = z.number().finite().min(0).max(500);
const originCountries = ['CN', 'VN', 'IN', 'MX', 'TR'] as const;

export const hsCodeInputSchema = z
  .object({
    query: z
      .string()
      .trim()
      .min(2, 'The product name or HS code must be at least 2 characters.')
      .max(300, 'The search query must not exceed 300 characters.'),
    destinationMarket: z.enum(['US', 'EU']).optional().default('US'),
    originCountry: z
      .enum(originCountries, {
        error: 'Select a supported country of origin.',
      })
      .optional()
      .default('CN'),
  })
  .strict();

export const hsCodeAnalysisResultSchema: z.ZodType<HsCodeAnalysisResult> = z
  .object({
    mode: z.enum(['live', 'demo']),
    sourceLabel: boundedText(160),
    hsCode6Digit: z
      .string()
      .trim()
      .regex(/^\d{4}\.\d{2}$/, 'Invalid 6-digit HS code.'),
    hsCode10Digit: z
      .string()
      .trim()
      .regex(/^\d{4}(?:\.\d{2}){1,3}$/, 'Invalid 10-digit tariff code.'),
    productDescription: boundedText(500),
    categoryName: boundedText(200),
    destinationMarket: z.enum(['US', 'EU']),
    originCountry: boundedText(50),
    dutyRates: z
      .object({
        baseDutyPercent: dutyRate,
        section301Percent: dutyRate,
        additionalTaxesPercent: dutyRate,
        effectiveDutyPercent: z.number().finite().min(0).max(1_500),
      })
      .strict(),
    dutyBreakdownNotes: z.array(boundedText(500)).max(20),
    regulatoryWarnings: z.array(boundedText(500)).max(20),
    alternativeHsCodes: z
      .array(
        z
          .object({
            code: z
              .string()
              .trim()
              .regex(
                /^\d{4}(?:\.\d{2}){0,3}$/,
                'Invalid alternative HS code.',
              ),
            description: boundedText(300),
            dutyRate: boundedText(100),
          })
          .strict(),
      )
      .max(10),
  })
  .strict();

function roundDutyRate(value: number): number {
  return Math.round((value + Number.EPSILON) * 10_000) / 10_000;
}

export function normalizeHsCodeAnalysisResult(
  rawResult: unknown,
): HsCodeAnalysisResult {
  const parsed = hsCodeAnalysisResultSchema.parse(rawResult);
  const effectiveDutyPercent = roundDutyRate(
    parsed.dutyRates.baseDutyPercent +
      parsed.dutyRates.section301Percent +
      parsed.dutyRates.additionalTaxesPercent,
  );

  return hsCodeAnalysisResultSchema.parse({
    ...parsed,
    dutyRates: {
      ...parsed.dutyRates,
      effectiveDutyPercent,
    },
  });
}

export type ValidatedHsCodeInput = z.output<typeof hsCodeInputSchema>;
export type HsCodeRequestInput = z.input<typeof hsCodeInputSchema>;
