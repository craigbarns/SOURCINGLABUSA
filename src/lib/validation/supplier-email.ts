import { z } from 'zod';

export const supplierEmailInputSchema = z
  .object({
    supplierName: z.string().trim().min(1).max(200),
    contactPerson: z.string().trim().max(200).optional(),
    productName: z.string().trim().min(1).max(300),
    quantity: z.number().int().positive().max(100_000_000),
    emailType: z.enum(['rfq', 'negotiation', 'sample_request', 'quality_audit']),
    language: z.enum(['en', 'fr', 'zh']),
    targetPrice: z.string().trim().max(100).optional(),
    specificRequirements: z.string().trim().max(2_000).optional(),
  })
  .strict();

export const supplierEmailResultSchema = z
  .object({
    subject: z.string().trim().min(1).max(500),
    body: z.string().trim().min(1).max(20_000),
    tips: z.array(z.string().trim().min(1).max(500)).max(20),
  })
  .strict();
