import { z } from 'zod';

export const WAITLIST_ROLE_VALUES = [
  'brand_owner_ecommerce',
  'amazon_fba_seller',
  'industrial_sourcing_manager',
  'sourcing_consultant',
] as const;

export type WaitlistRole = (typeof WAITLIST_ROLE_VALUES)[number];

export const WAITLIST_ROLE_LABELS: Record<WaitlistRole, string> = {
  brand_owner_ecommerce: 'E-Commerce / D2C Brand Owner',
  amazon_fba_seller: 'Amazon FBA / Private Label Seller',
  industrial_sourcing_manager: 'Industrial Procurement & Sourcing Manager',
  sourcing_consultant: 'Sourcing Consultant or Freight Agent',
};

export const waitlistInputSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Please enter a work email address.')
      .max(254, 'The email address is too long.')
      .email('Please enter a valid email address.')
      .transform((value) => value.toLowerCase()),
    role: z.enum(WAITLIST_ROLE_VALUES),
  })
  .strict();

export type WaitlistInput = z.input<typeof waitlistInputSchema>;
export type ValidatedWaitlistInput = z.output<typeof waitlistInputSchema>;
