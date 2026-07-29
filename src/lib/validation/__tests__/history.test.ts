import { describe, expect, it } from 'vitest';

import {
  analysisPayloadByteLength,
  MAX_ANALYSIS_PAYLOAD_BYTES,
  saveAnalysisInputSchema,
} from '@/lib/validation/history';

describe('saved-analysis validation', () => {
  it('accepts a well-formed save request and trims the title', () => {
    const parsed = saveAnalysisInputSchema.parse({
      tool: 'quote',
      title: '  Quote comparison  ',
      payload: { mode: 'live' },
    });

    expect(parsed.title).toBe('Quote comparison');
    expect(parsed.tool).toBe('quote');
  });

  it('rejects unknown tools, empty titles, and extra fields', () => {
    expect(
      saveAnalysisInputSchema.safeParse({
        tool: 'unknown_tool',
        title: 'x',
        payload: {},
      }).success,
    ).toBe(false);

    expect(
      saveAnalysisInputSchema.safeParse({
        tool: 'quote',
        title: '   ',
        payload: {},
      }).success,
    ).toBe(false);

    expect(
      saveAnalysisInputSchema.safeParse({
        tool: 'quote',
        title: 'ok',
        payload: {},
        unexpected: true,
      }).success,
    ).toBe(false);
  });

  it('measures payload size and flags oversized documents', () => {
    expect(analysisPayloadByteLength({ a: 'b' })).toBe(
      new TextEncoder().encode(JSON.stringify({ a: 'b' })).length,
    );

    const oversized = { blob: 'x'.repeat(MAX_ANALYSIS_PAYLOAD_BYTES + 10) };
    expect(analysisPayloadByteLength(oversized)).toBeGreaterThan(
      MAX_ANALYSIS_PAYLOAD_BYTES,
    );
  });

  it('returns null for payloads that cannot serialize', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(analysisPayloadByteLength(circular)).toBeNull();
  });
});
