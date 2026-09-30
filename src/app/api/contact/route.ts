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
    console.info(
      'Supabase admin client not configured. Brief received and logged server-side.',
      {
        sourcePath: brief.sourcePath,
        locale: brief.locale,
        name: brief.name,
        email: brief.email,
        projectType: brief.projectType,
        quantityRange: brief.quantityRange,
      },
    );
    return { configured: false, success: true };
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
      error: error instanceof Error ? error.message : 'Unknown error',
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

  const validation = contactInputSchema.safeParse(body);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        message: INVALID_REQUEST_MESSAGE,
        fieldErrors: {
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          company: fieldErrors.company?.[0],
          projectType: fieldErrors.projectType?.[0],
          quantityRange: fieldErrors.quantityRange?.[0],
          message: fieldErrors.message?.[0],
        },
      },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const brief = validation.data;

  if (brief.botField) {
    // Answer like a success so the bot does not retry, but store nothing.
    return NextResponse.json(
      { message: SUCCESS_MESSAGE, delivery: [] satisfies DeliveryChannel[] },
      { status: 201, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const { configured, success } = await storeBrief(brief);
  const delivery: DeliveryChannel[] = configured && success ? ['database'] : [];

  if (configured && !success) {
    console.error('Project brief could not be stored in database', {
      sourcePath: brief.sourcePath,
    });

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
