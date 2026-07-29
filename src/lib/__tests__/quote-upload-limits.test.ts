import { describe, expect, it } from 'vitest';

import {
  formatQuoteUploadBytes,
  MAX_QUOTE_FILE_BYTES,
  MAX_QUOTE_REQUEST_BYTES,
  MAX_QUOTE_UPLOAD_BYTES,
} from '@/lib/validation/quote';

describe('quote upload limits', () => {
  it('keeps files within a 4 MB aggregate limit', () => {
    expect(MAX_QUOTE_FILE_BYTES).toBe(4 * 1024 * 1024);
    expect(MAX_QUOTE_UPLOAD_BYTES).toBe(4 * 1024 * 1024);
    expect(formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)).toBe('4 MB');
  });

  it('reserves multipart overhead below the Vercel request limit', () => {
    expect(MAX_QUOTE_REQUEST_BYTES).toBeGreaterThan(MAX_QUOTE_UPLOAD_BYTES);
    expect(MAX_QUOTE_REQUEST_BYTES).toBeLessThan(4_500_000);
  });
});
