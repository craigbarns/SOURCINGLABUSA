import { z } from 'zod';

import { contactInputSchema, type ValidatedContactInput } from '@/lib/validation/contact';

export const MARKET_ENTRY_FIELDS = [
  { key: 'company', label: 'Company', required: true, maxLength: 160 },
  { key: 'country', label: 'Country', required: true, maxLength: 100 },
  { key: 'productCategory', label: 'Product category', required: true, maxLength: 160 },
  { key: 'objectives', label: 'U.S. commercial objectives', required: true, maxLength: 900 },
  { key: 'capabilities', label: 'Manufacturing capabilities', required: false, maxLength: 500 },
  { key: 'exportActivity', label: 'Existing export activity', required: false, maxLength: 400 },
  { key: 'targetCustomers', label: 'Target American customers', required: false, maxLength: 400 },
  { key: 'expansionBudget', label: 'Estimated expansion budget and currency', required: false, maxLength: 160 },
] as const;

export function formatMarketEntryBrief(values: Record<string, string>): string {
  return [
    'U.S. MARKET ENTRY / SALES REPRESENTATION INQUIRY',
    ...MARKET_ENTRY_FIELDS.map(({ key, label }) =>
      values[key]?.trim() ? `${label}: ${values[key].trim()}` : null,
    ).filter(Boolean),
  ].join('\n');
}

export const marketEntryInputSchema = z.object({
  journey: z.literal('market_entry'),
  name: contactInputSchema.shape.name,
  email: contactInputSchema.shape.email,
  company: z.string().trim().min(2, 'Please enter your company.').max(160),
  country: z.string().trim().min(2, 'Please enter your country.').max(100),
  productCategory: z.string().trim().min(2, 'Please describe your product category.').max(160),
  objectives: z.string().trim().min(10, 'Please describe your U.S. commercial objectives.').max(900),
  capabilities: z.string().trim().max(500).default(''),
  exportActivity: z.string().trim().max(400).default(''),
  targetCustomers: z.string().trim().max(400).default(''),
  expansionBudget: z.string().trim().max(160).default(''),
  sourcePath: contactInputSchema.shape.sourcePath,
  botField: contactInputSchema.shape.botField,
  locale: contactInputSchema.shape.locale,
}).strict();

export type MarketEntryInput = z.input<typeof marketEntryInputSchema>;
export type ValidatedMarketEntryInput = z.output<typeof marketEntryInputSchema>;

/** Keep both qualification journeys in the existing project_briefs table. */
export function marketEntryToContact(values: ValidatedMarketEntryInput): ValidatedContactInput {
  return contactInputSchema.parse({
    name: values.name,
    email: values.email,
    company: values.company,
    projectType: 'other',
    quantityRange: 'not_sure',
    message: formatMarketEntryBrief(values),
    sourcePath: values.sourcePath,
    botField: values.botField,
    locale: values.locale,
  });
}
