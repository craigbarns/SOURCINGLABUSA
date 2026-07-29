import { z } from 'zod';

export const hsCodeInputSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Le nom du produit ou le code SH doit contenir au moins 2 caractères.')
    .max(300, 'La recherche ne doit pas dépasser 300 caractères.'),
  destinationMarket: z.enum(['US', 'EU']).optional().default('US'),
  originCountry: z.string().trim().max(50).optional().default('CN'),
});

export type HsCodeInputSchema = z.infer<typeof hsCodeInputSchema>;
