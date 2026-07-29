import { z } from 'zod';

export const WAITLIST_ROLE_VALUES = [
  'brand_owner_ecommerce',
  'amazon_fba_seller',
  'industrial_sourcing_manager',
  'sourcing_consultant',
] as const;

export type WaitlistRole = (typeof WAITLIST_ROLE_VALUES)[number];

export const WAITLIST_ROLE_LABELS: Record<WaitlistRole, string> = {
  brand_owner_ecommerce: 'Marque E-Commerce / D2C Owner',
  amazon_fba_seller: 'Vendeur Amazon FBA / Private Label',
  industrial_sourcing_manager: 'Responsable Sourcing & Achats Industriel',
  sourcing_consultant: 'Consultant ou Agent de Sourcing',
};

export const waitlistInputSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Saisissez une adresse e-mail.')
      .max(254, "L'adresse e-mail est trop longue.")
      .email("L'adresse e-mail n'est pas valide.")
      .transform((value) => value.toLowerCase()),
    role: z.enum(WAITLIST_ROLE_VALUES),
  })
  .strict();

export type WaitlistInput = z.input<typeof waitlistInputSchema>;
export type ValidatedWaitlistInput = z.output<typeof waitlistInputSchema>;
