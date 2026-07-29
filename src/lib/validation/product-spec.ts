import { z } from 'zod';

export const productCategorySchema = z.enum([
  'drinkware',
  'textile',
  'electronics',
  'backpack',
  'generic',
]);

export const productSpecResultSchema = z
  .object({
    mode: z.enum(['live', 'demo']),
    sourceLabel: z.string().trim().min(1),
    category: productCategorySchema,
    productTitle: z.string().trim().min(1),
    targetMarket: z.string().trim().min(1),
    specsSummary: z.string().trim().min(1),
    technicalSpecs: z
      .object({
        materials: z.array(z.string().trim().min(1)).min(1),
        dimensions: z.string().trim().min(1),
        weight: z.string().trim().min(1),
        tolerances: z.string().trim().min(1),
        keyFeatures: z.array(z.string().trim().min(1)).min(1),
      })
      .strict(),
    certifications: z
      .object({
        toVerify: z.array(z.string().trim().min(1)),
        recommended: z.array(z.string().trim().min(1)),
        testingLabs: z.array(z.string().trim().min(1)),
        verificationNotice: z.string().trim().min(1),
      })
      .strict(),
    moq: z
      .object({
        recommended: z.number().int().nonnegative(),
        sampleMoq: z.number().int().nonnegative(),
        unit: z.string().trim().min(1),
        notes: z.string().trim().min(1),
      })
      .strict(),
    pricingTarget: z
      .object({
        estimatedFob: z.string().trim().min(1),
        targetLandCost: z.string().trim().min(1),
        recommendedMSRP: z.string().trim().min(1),
        marginPotential: z.string().trim().min(1),
      })
      .strict(),
    qualityControl: z.array(z.string().trim().min(1)).min(1),
  })
  .strict();

export const productSpecRequestSchema = z
  .object({
    prompt: z.string().trim().min(10).max(4_000),
  })
  .strict();

