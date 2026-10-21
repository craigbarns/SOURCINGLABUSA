import { NextResponse } from 'next/server';

import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import { getSupabaseAdminClient } from '@/lib/server/supabase';
import {
  contactInputSchema,
  type ValidatedContactInput,
} from '@/lib/validation/contact';

import { marketEntryInputSchema, marketEntryToContact } from '@/lib/validation/market-entry';

const INVALID_REQUEST_MESSAGE = 'Some details are missing or invalid.';
const UNAVAILABLE_MESSAGE =
  'Your brief could not be saved. Please email it to us directly so nothing is lost.';
const SUCCESS_MESSAGE = 'Brief received.';

type DeliveryChannel = 'database';

/**
 * Stores the brief in Supabase. This is the durable record, independent of
 * Netlify Forms: it survives a disabled form detection, a spam-filter
 * rejection, or a deleted submission.
 */
async function storeBrief(
  brief: ValidatedContactInput,
): Promise<{ configured: boolean; success: boolean }> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    // No durable sink is available. Never log contact details or report
    // a stored lead when the only record would be an ephemeral function log.
    console.error('Project brief storage is not configured.');
    return { configured: false, success: false };
  }

  const messageWithLocale =
    brief.locale === 'es'
      ? (brief.message ? `${brief.message}\n\n[Idioma: Español / Spanish]` : '[Idioma: Español / Spanish]')
      : brief.locale === 'zh'
        ? (brief.message ? `${brief.message}\n\n[语言: 中文 / Chinese]` : '[语言: 中文 / Chinese]')
        : (brief.message || null);

  try {
    const { error } = await supabase.from('project_briefs').insert({
      name: brief.name,
      email: brief.email,
      company: brief.company ?? null,
      project_type: brief.projectType,
      quantity_range: brief.quantityRange,
      message: messageWithLocale,
      source_path: brief.sourcePath,
    });

    if (error) {
      console.error('Project brief insertion failed', { code: error.code });
      return { configured: true, success: false };
    }

    return { configured: true, success: true };
  } catch (error) {
    console.error('Project brief insertion failed unexpectedly', {
      errorType: error instanceof Error ? error.name : 'Unknown error',
    });
    return { configured: true, success: false };
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: 'Request origin not allowed.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (exceedsContentLength(request, 16 * 1024)) {
    return NextResponse.json(
      { message: 'The brief is too large. Please email it to us instead.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const rateLimit = consumeRateLimit(`contact:${getRequestClientKey(request)}`, {
    limit: 10,
    windowMs: 60 * 60 * 1_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: 'Too many submissions. Please try again later.' },
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
      { message: INVALID_REQUEST_MESSAGE },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const marketEntry = typeof body === 'object' && body !== null
    && 'journey' in body && body.journey === 'market_entry';
  const validation = marketEntry
    ? marketEntryInputSchema.safeParse(body)
    : contactInputSchema.safeParse(body);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        message: INVALID_REQUEST_MESSAGE,
        fieldErrors: Object.fromEntries(
          Object.entries(fieldErrors).map(([field, errors]) => [field, errors?.[0]]),
        ),
      },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const brief = 'journey' in validation.data
    ? marketEntryToContact(validation.data)
    : validation.data;

  if (brief.botField) {
    // Answer like a success so the bot does not retry, but store nothing.
    return NextResponse.json(
      { message: SUCCESS_MESSAGE, delivery: [] satisfies DeliveryChannel[] },
      { status: 201, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const { configured, success } = await storeBrief(brief);
  const delivery: DeliveryChannel[] = configured && success ? ['database'] : [];

  if (!success) {
    console.error('Project brief could not be stored in database.');

    return NextResponse.json(
      { message: UNAVAILABLE_MESSAGE },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    { message: SUCCESS_MESSAGE, delivery },
    { status: 201, headers: { 'Cache-Control': 'no-store' } },
  );
}
