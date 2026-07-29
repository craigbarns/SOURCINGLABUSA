import { z } from 'zod';

export const SHIPPING_MODE_LABELS = {
  sea_fcl: 'Ocean freight (FCL)',
  sea_lcl: 'Ocean freight (LCL)',
  air_express: 'Air express',
  air_freight: 'Air freight',
} as const;

export const DESTINATION_MARKET_LABELS = {
  US: 'United States',
  EU: 'European Union',
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
        /^(?:\d{4}(?:\.\d{2}){0,3}|\d{4}\.\d{2}\.\d{4}|\d{6}|\d{8}|\d{10})$/,
        'The HS or HTS code must contain 4, 6, 8, or 10 digits, with optional dots (e.g., 7323.93.0080).',
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
