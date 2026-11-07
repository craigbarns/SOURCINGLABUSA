import { NextResponse } from 'next/server';

import { analyzeDuty } from '@/lib/server/duty';
import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import { dutyInputSchema } from '@/lib/validation/duty';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 4 * 1024;
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: 'Cross-origin requests are not allowed.' },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }

  if (exceedsContentLength(request, MAX_REQUEST_BYTES)) {
    return NextResponse.json(
      { error: 'Request body too large.' },
      { status: 413, headers: NO_STORE_HEADERS },
    );
  }

  const clientKey = getRequestClientKey(request);
  const rate = consumeRateLimit(`duty:${clientKey}`, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { ...NO_STORE_HEADERS, 'Retry-After': String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const parsed = dutyInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Provide a product description of 20-1000 characters and an origin country.' },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  try {
    const result = await analyzeDuty(parsed.data);
    return NextResponse.json(result, { headers: NO_STORE_HEADERS });
  } catch {
    return NextResponse.json(
      { error: 'The duty lookup failed. Please try again in a moment.' },
      { status: 502, headers: NO_STORE_HEADERS },
    );
  }
}
