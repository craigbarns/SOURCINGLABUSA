import { NextResponse } from 'next/server';

import { createAiProvider, AiProviderError } from '@/lib/server/ai/provider';
import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import {
  createDemoProductSpecs,
  detectProductCategory,
} from '@/lib/server/product-specs';
import { productSpecRequestSchema } from '@/lib/validation/product-spec';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: 'Request origin not allowed.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (exceedsContentLength(request, 8 * 1024)) {
    return NextResponse.json(
      { message: 'The request is too large.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const rateLimit = consumeRateLimit(
    `product-specs:${getRequestClientKey(request)}`,
    { limit: 12, windowMs: 10 * 60 * 1_000 },
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid JSON request.' },
      { status: 400 },
    );
  }

  const validation = productSpecRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: validation.error.issues[0]?.message ?? 'Invalid description.',
      },
      { status: 400 },
    );
  }

  const provider = createAiProvider();

  if (!provider) {
    return NextResponse.json(createDemoProductSpecs(validation.data.prompt));
  }

  try {
    const category = detectProductCategory(validation.data.prompt);
    const result = await provider.generateProductSpecs(
      validation.data.prompt,
      category,
    );

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof AiProviderError
        ? error.message
        : 'AI analysis is temporarily unavailable.';

    return NextResponse.json({ message }, { status: 502 });
  }
}
