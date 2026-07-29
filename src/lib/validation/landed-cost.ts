import { z } from 'zod';

export const SHIPPING_MODE_LABELS = {
  sea_fcl: 'Maritime FCL',
  sea_lcl: 'Maritime LCL',
  air_express: 'Express aérien',
  air_freight: 'Fret aérien',
} as const;

export const DESTINATION_MARKET_LABELS = {
  US: 'États-Unis',
  EU: 'Union européenne',
} as const;

export const landedCostInputSchema = z
  .object({
    unitPriceFob: z.number().finite().nonnegative(),
    quantity: z.number().int().finite().positive().max(100_000_000),
    shippingMode: z.enum(['sea_fcl', 'sea_lcl', 'air_express', 'air_freight']),
    hsCode: z
      .string()
      .trim()
      .regex(
        /^\d{4}(?:\.\d{2}){0,2}$/,
        'Le code HS doit contenir 4, 6 ou 8 chiffres (ex. 9617.00).',
      ),
    destinationMarket: z.enum(['US', 'EU']),
    customsDutyRate: z.number().finite().min(0).max(100),
    freightCostTotal: z.number().finite().nonnegative(),
    insuranceCost: z.number().finite().nonnegative().nullable(),
    localPortCharges: z.number().finite().nonnegative(),
    lastMileDelivery: z.number().finite().nonnegative(),
    targetRetailPrice: z.number().finite().nonnegative(),
  })
  .strict();

export type ValidatedLandedCostInput = z.output<typeof landedCostInputSchema>;

