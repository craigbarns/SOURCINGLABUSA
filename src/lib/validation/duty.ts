import { z } from 'zod';

/**
 * Duty calculator input. The product description is the only free text; the
 * origin country matters because additional tariffs apply by origin, and the
 * destination market is fixed to the US for this site.
 */
export const dutyInputSchema = z.object({
  productDescription: z.string().trim().min(20).max(1000),
  originCountry: z.enum(['CN', 'BD', 'VN', 'IN', 'OTHER']),
});

export type DutyInput = z.infer<typeof dutyInputSchema>;

export const dutyCandidateSchema = z.object({
  code: z.string().trim().regex(/^\d{4}\.\d{2}(\.\d{2,4})?$/),
  description: z.string().trim().min(3).max(200),
  why: z.string().trim().max(400).optional(),
});

export const dutyClassificationSchema = z.object({
  candidates: z.array(dutyCandidateSchema).min(1).max(5),
});

export type DutyClassification = z.infer<typeof dutyClassificationSchema>;

export const officialRateSchema = z.object({
  htsno: z.string(),
  description: z.string(),
  general: z.string(),
  special: z.string(),
  other: z.string(),
});

export const dutyResultSchema = z.object({
  mode: z.enum(['live', 'demo']),
  sourceLabel: z.string(),
  dateChecked: z.string(),
  originCountry: z.string(),
  originCountryLabel: z.string(),
  productDescription: z.string(),
  rates: z.array(
    z.object({
      code: z.string(),
      description: z.string(),
      baseRate: z.string(),
      specialPrograms: z.string(),
      section301Note: z.string(),
      why: z.string().optional(),
      sourceUrl: z.string(),
    }),
  ),
  notes: z.array(z.string()),
});

export type DutyResult = z.infer<typeof dutyResultSchema>;
