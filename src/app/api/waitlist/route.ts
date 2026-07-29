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
import { waitlistInputSchema } from '@/lib/validation/waitlist';

const INVALID_REQUEST_MESSAGE = "Les informations d'inscription ne sont pas valides.";
const DUPLICATE_EMAIL_MESSAGE = 'Cette adresse e-mail est déjà inscrite.';
const UNAVAILABLE_MESSAGE =
  "L'inscription est temporairement indisponible. Veuillez réessayer plus tard.";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: 'Origine de requête refusée.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (exceedsContentLength(request, 2 * 1024)) {
    return NextResponse.json(
      { message: 'La requête est trop volumineuse.' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const rateLimit = consumeRateLimit(
    `waitlist:${getRequestClientKey(request)}`,
    { limit: 20, windowMs: 60 * 60 * 1_000 },
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: 'Trop de tentatives. Veuillez réessayer plus tard.' },
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
      { status: 400 },
    );
  }

  const validation = waitlistInputSchema.safeParse(body);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        message: INVALID_REQUEST_MESSAGE,
        fieldErrors: {
          email: fieldErrors.email?.[0],
          role: fieldErrors.role?.[0],
        },
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ message: UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  try {
    const { error } = await supabase.from('waitlist_entries').insert({
      email: validation.data.email,
      role: validation.data.role,
    });

    if (error?.code === '23505') {
      return NextResponse.json(
        { message: DUPLICATE_EMAIL_MESSAGE },
        { status: 409 },
      );
    }

    if (error) {
      console.error('Waitlist insertion failed', {
        code: error.code,
      });

      return NextResponse.json({ message: UNAVAILABLE_MESSAGE }, { status: 500 });
    }
  } catch (error) {
    console.error('Waitlist insertion failed unexpectedly', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json({ message: UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: 'Votre inscription a bien été enregistrée.',
      email: validation.data.email,
    },
    { status: 201 },
  );
}
