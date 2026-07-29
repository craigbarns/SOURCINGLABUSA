import { z } from 'zod';

export const HISTORY_TOOLS = [
  'quote',
  'specs',
  'cost',
  'hscode',
  'email',
] as const;

export type HistoryTool = (typeof HISTORY_TOOLS)[number];

export const HISTORY_TOOL_LABELS: Record<HistoryTool, string> = {
  quote: 'Quote Audit',
  specs: 'Product Specification',
  cost: 'Landed Cost',
  hscode: 'HS Code & Customs',
  email: 'Supplier Email',
};

/** Maximum serialized payload size accepted for a saved analysis (256 KB). */
export const MAX_ANALYSIS_PAYLOAD_BYTES = 256 * 1024;

export const saveAnalysisInputSchema = z
  .object({
    tool: z.enum(HISTORY_TOOLS),
    title: z.string().trim().min(1).max(200),
    payload: z
      .unknown()
      .refine(
        (value) => value !== undefined && value !== null,
        'A payload is required.',
      ),
  })
  .strict();

export type SaveAnalysisInput = z.infer<typeof saveAnalysisInputSchema>;

export const savedAnalysisSummarySchema = z.object({
  id: z.string().uuid(),
  tool: z.enum(HISTORY_TOOLS),
  title: z.string().min(1).max(200),
  createdAt: z.string(),
});

export type SavedAnalysisSummary = z.infer<typeof savedAnalysisSummarySchema>;

export const savedAnalysisSummaryListSchema = z.object({
  items: z.array(savedAnalysisSummarySchema),
});

export const savedAnalysisSchema = savedAnalysisSummarySchema.extend({
  payload: z.unknown(),
});

export type SavedAnalysis = z.infer<typeof savedAnalysisSchema>;

/** Serialized byte length of a JSON payload, or null when it cannot serialize. */
export function analysisPayloadByteLength(payload: unknown): number | null {
  try {
    return new TextEncoder().encode(JSON.stringify(payload)).length;
  } catch {
    return null;
  }
}
