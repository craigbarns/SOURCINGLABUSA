import { z } from 'zod';

export const PROJECT_TYPE_VALUES = [
  'packaging',
  'textile',
  'both',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPE_VALUES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  packaging: 'Packaging, boxes and labels',
  textile: 'Clothing, sportswear and technical apparel',
  both: 'Packaging and textile',
  other: 'Other products / discuss a project',
};

export const QUANTITY_RANGE_VALUES = [
  'under_500',
  'from_500_to_2000',
  'from_2000_to_10000',
  'over_10000',
  'not_sure',
] as const;

export type QuantityRange = (typeof QUANTITY_RANGE_VALUES)[number];

export const QUANTITY_RANGE_LABELS: Record<QuantityRange, string> = {
  under_500: 'Under 500 units',
  from_500_to_2000: '500 – 2,000 units',
  from_2000_to_10000: '2,000 – 10,000 units',
  over_10000: 'More than 10,000 units',
  not_sure: 'Not defined yet',
};

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .optional()
    .transform((value) => (value ? value : undefined));

export const contactInputSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Please enter your name.')
      .max(120, 'This name is too long.'),
    email: z
      .string()
      .trim()
      .min(1, 'Please enter a work email address.')
      .max(254, 'The email address is too long.')
      .email('Please enter a valid email address.')
      .transform((value) => value.toLowerCase()),
    company: optionalText(160),
    projectType: z.enum(PROJECT_TYPE_VALUES, {
      error: 'Select the type of product you need.',
    }),
    quantityRange: z
      .enum(QUANTITY_RANGE_VALUES, {
        error: 'Select an approximate quantity.',
      })
      .default('not_sure'),
    message: z
      .string()
      .trim()
      .max(4_000, 'The brief must not exceed 4,000 characters.')
      .default(''),
    sourcePath: z
      .string()
      .trim()
      .max(300)
      .default('/')
      // Only same-site paths are accepted so the stored attribution can never
      // become an arbitrary external URL.
      .transform((value) => (value.startsWith('/') ? value : '/')),
    // Honeypot. Real visitors never see this field, so any value means a bot.
    botField: z.string().max(200).default(''),
  })
  .strict();

export type ContactInput = z.input<typeof contactInputSchema>;
export type ValidatedContactInput = z.output<typeof contactInputSchema>;
