import { NextResponse } from 'next/server';

import {
  getRequestClientKey,
  consumeRateLimit,
} from '@/lib/server/rate-limit';
import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import { analyzeQuoteFiles } from '@/lib/server/quotes/pipeline';
import {
  OcrProviderError,
  UploadValidationError,
  validateQuoteUploads,
} from '@/lib/server/quotes/ocr';
import {
  formatQuoteUploadBytes,
  MAX_QUOTE_REQUEST_BYTES,
  MAX_QUOTE_UPLOAD_BYTES,
} from '@/lib/validation/quote';

export const runtime = 'nodejs';
export const maxDuration = 180;

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: 'Request origin not allowed.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (exceedsContentLength(request, MAX_QUOTE_REQUEST_BYTES)) {
    return NextResponse.json(
      {
        message: `The multipart upload is too large. Keep the combined files within the ${formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)} limit so form-data overhead remains under the server request limit.`,
      },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const rateLimit = consumeRateLimit(
    `quote-analysis:${getRequestClientKey(request)}`,
    {
      limit: 6,
      windowMs: 10 * 60 * 1_000,
    },
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        message:
          'Too many analysis requests. Please try again in a few minutes.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
          'Cache-Control': 'no-store',
        },
      },
    );
  }

  try {
    const formData = await request.formData();
    const files = await validateQuoteUploads(formData);
    const analysis = await analyzeQuoteFiles(files);

    return NextResponse.json(analysis, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 400,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    if (error instanceof OcrProviderError) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 502,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    console.error('Quote analysis pipeline failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { message: 'Quote analysis failed.' },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}
