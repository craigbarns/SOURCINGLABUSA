import { NextResponse } from 'next/server';

import {
  analyzeHsCodeServer,
  HsCodeDemoUnavailableError,
  HsCodeProviderError,
} from '@/lib/server/hscode';
import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import { hsCodeInputSchema } from '@/lib/validation/hscode';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 4 * 1024;
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

function jsonResponse(
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...NO_STORE_HEADERS,
      ...headers,
    },
  });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ message: 'Request origin not allowed.' }, 403);
  }

  if (exceedsContentLength(request, MAX_REQUEST_BYTES)) {
    return jsonResponse({ message: 'The request is too large.' }, 413);
  }

  const rateLimit = consumeRateLimit(
    `hs-code:${getRequestClientKey(request)}`,
    { limit: 12, windowMs: 10 * 60 * 1_000 },
  );

  if (!rateLimit.allowed) {
    return jsonResponse(
      { message: 'Too many requests. Please try again later.' },
      429,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ message: 'Invalid JSON request.' }, 400);
  }

  const validation = hsCodeInputSchema.safeParse(body);

  if (!validation.success) {
    return jsonResponse(
      {
        message:
          validation.error.issues[0]?.message ??
          'Check the HS-code search parameters.',
      },
      400,
    );
  }

  try {
    const result = await analyzeHsCodeServer(validation.data);
    return jsonResponse(result, 200);
  } catch (error) {
    if (error instanceof HsCodeDemoUnavailableError) {
      return jsonResponse({ message: error.message }, 422);
    }

    if (error instanceof HsCodeProviderError) {
      return jsonResponse(
        {
          message:
            'Live tariff analysis is temporarily unavailable. Please try again later.',
        },
        502,
      );
    }

    console.error('HS-code analysis failed unexpectedly', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return jsonResponse(
      { message: 'HS-code analysis could not be completed.' },
      500,
    );
  }
}
