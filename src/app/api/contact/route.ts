import { NextResponse } from 'next/server';

import {
  exceedsContentLength,
  getPublicOrigin,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import { getSupabaseAdminClient } from '@/lib/server/supabase';
import {
  contactInputSchema,
  PROJECT_TYPE_LABELS,
  QUANTITY_RANGE_LABELS,
  type ValidatedContactInput,
} from '@/lib/validation/contact';

const INVALID_REQUEST_MESSAGE = 'Some details are missing or invalid.';
const UNAVAILABLE_MESSAGE =
  'Your brief could not be delivered. Please email it to us directly so nothing is lost.';
const SUCCESS_MESSAGE = 'Brief received.';

const NETLIFY_FORM_NAME = 'contact';
const NETLIFY_FORM_PATH = '/contact.html';
const FORWARD_TIMEOUT_MS = 8_000;

type DeliveryChannel = 'database' | 'form_notification';

/**
 * Stores the brief in Supabase. This is the durable record: it survives a
 * Netlify Forms outage, a disabled form detection, or a spam-filter rejection.
 */
async function storeBrief(brief: ValidatedContactInput): Promise<boolean> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase.from('project_briefs').insert({
      name: brief.name,
      email: brief.email,
      company: brief.company ?? null,
      project_type: brief.projectType,
      quantity_range: brief.quantityRange,
      message: brief.message || null,
      source_path: brief.sourcePath,
    });

    if (error) {
      console.error('Project brief insertion failed', { code: error.code });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Project brief insertion failed unexpectedly', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
  }
}

/**
 * Replays the submission into Netlify Forms so the existing email
 * notifications and the Netlify dashboard keep working.
 */
async function notifyThroughNetlifyForms(
  brief: ValidatedContactInput,
  request: Request,
): Promise<boolean> {
  const origin = getPublicOrigin(request);

  if (!origin || new URL(origin).protocol !== 'https:') {
    // Local and preview hosts have no Netlify Forms backend to call.
    return false;
  }

  const body = new URLSearchParams({
    'form-name': NETLIFY_FORM_NAME,
    name: brief.name,
    email: brief.email,
    company: brief.company ?? '',
    projectType: PROJECT_TYPE_LABELS[brief.projectType],
    quantityRange: QUANTITY_RANGE_LABELS[brief.quantityRange],
    message: brief.message,
    sourcePath: brief.sourcePath,
  });

  try {
    const response = await fetch(new URL(NETLIFY_FORM_PATH, origin), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('Netlify Forms notification rejected', {
        status: response.status,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Netlify Forms notification failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
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

  const [stored, notified] = await Promise.all([
    storeBrief(brief),
    notifyThroughNetlifyForms(brief, request),
  ]);

  const delivery: DeliveryChannel[] = [
    ...(stored ? (['database'] as const) : []),
    ...(notified ? (['form_notification'] as const) : []),
  ];

  if (delivery.length === 0) {
    console.error('Project brief could not be delivered to any channel', {
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
