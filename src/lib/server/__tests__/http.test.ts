import { describe, expect, it } from 'vitest';

import {
  exceedsContentLength,
  getPublicOrigin,
  isSameOriginRequest,
} from '@/lib/server/http';

describe('server request guards', () => {
  it('accepts the public forwarded origin', () => {
    const request = new Request('http://internal:3000/api/test', {
      method: 'POST',
      headers: {
        origin: 'https://sourcinglabusa.com',
        host: 'internal:3000',
        'x-forwarded-host': 'sourcinglabusa.com',
        'x-forwarded-proto': 'https',
      },
    });

    expect(isSameOriginRequest(request)).toBe(true);
  });

  it('rejects a cross-origin browser request', () => {
    const request = new Request('https://sourcinglabusa.com/api/test', {
      method: 'POST',
      headers: {
        origin: 'https://attacker.example',
      },
    });

    expect(isSameOriginRequest(request)).toBe(false);
  });

  it('rejects invalid and oversized content lengths', () => {
    expect(
      exceedsContentLength(
        new Request('https://example.com', {
          headers: { 'content-length': '2049' },
        }),
        2048,
      ),
    ).toBe(true);
    expect(
      exceedsContentLength(
        new Request('https://example.com', {
          headers: { 'content-length': '2048' },
        }),
        2048,
      ),
    ).toBe(false);
    expect(
      exceedsContentLength(
        new Request('https://example.com', {
          headers: { 'content-length': 'invalid' },
        }),
        2048,
      ),
    ).toBe(true);
  });

  it('rebuilds the public origin behind the platform proxy', () => {
    const request = new Request('http://internal:3000/api/contact', {
      method: 'POST',
      headers: {
        host: 'internal:3000',
        'x-forwarded-host': 'sourcinglabusa.com, edge.internal',
        'x-forwarded-proto': 'https',
      },
    });

    expect(getPublicOrigin(request)).toBe('https://sourcinglabusa.com');
  });

  it('returns no public origin when the host header is missing', () => {
    const request = new Request('https://sourcinglabusa.com/api/contact');
    const headerless = new Request(request, { headers: {} });
    Object.defineProperty(headerless.headers, 'get', { value: () => null });

    expect(getPublicOrigin(headerless)).toBeNull();
  });
});
