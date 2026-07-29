import { NextResponse } from 'next/server';

import {
  exceedsContentLength,
  isSameOriginRequest,
} from '@/lib/server/http';
import {
  consumeRateLimit,
  getRequestClientKey,
} from '@/lib/server/rate-limit';
import { getSupabaseServerClient } from '@/lib/supabase/server-client';
import {
  analysisPayloadByteLength,
  MAX_ANALYSIS_PAYLOAD_BYTES,
  saveAnalysisInputSchema,
} from '@/lib/validation/history';

export const runtime = 'nodejs';

const NO_STORE = { 'Cache-Control': 'no-store' };
const NOT_CONFIGURED = 'History is not available: sign-in is not configured.';
const SIGN_IN_REQUIRED = 'Sign in to use your saved history.';

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

export async function GET() {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return json({ message: NOT_CONFIGURED }, 503);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return json({ message: SIGN_IN_REQUIRED }, 401);
  }

  const { data, error } = await supabase
    .from('saved_analyses')
    .select('id, tool, title, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('History list failed', { code: error.code });
    return json({ message: 'Could not load your saved history.' }, 500);
  }

  return json(
    {
      items: (data ?? []).map((row) => ({
        id: row.id,
        tool: row.tool,
        title: row.title,
        createdAt: row.created_at,
      })),
    },
    200,
  );
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return json({ message: 'Request origin not allowed.' }, 403);
  }

  if (exceedsContentLength(request, MAX_ANALYSIS_PAYLOAD_BYTES + 4 * 1024)) {
    return json({ message: 'The request is too large.' }, 413);
  }

  const rateLimit = consumeRateLimit(`history:${getRequestClientKey(request)}`, {
    limit: 60,
    windowMs: 10 * 60 * 1_000,
  });

  if (!rateLimit.allowed) {
    return json({ message: 'Too many requests. Please try again later.' }, 429);
  }

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return json({ message: NOT_CONFIGURED }, 503);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return json({ message: SIGN_IN_REQUIRED }, 401);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ message: 'Invalid JSON request.' }, 400);
  }

  const parsed = saveAnalysisInputSchema.safeParse(body);

  if (!parsed.success) {
    return json({ message: 'The analysis could not be saved (invalid data).' }, 400);
  }

  const byteLength = analysisPayloadByteLength(parsed.data.payload);

  if (byteLength === null || byteLength > MAX_ANALYSIS_PAYLOAD_BYTES) {
    return json({ message: 'This analysis is too large to save.' }, 413);
  }

  const { data, error } = await supabase
    .from('saved_analyses')
    .insert({
      user_id: user.id,
      tool: parsed.data.tool,
      title: parsed.data.title,
      payload: parsed.data.payload,
    })
    .select('id, tool, title, created_at')
    .single();

  if (error) {
    console.error('History save failed', { code: error.code });
    return json({ message: 'Could not save the analysis.' }, 500);
  }

  return json(
    {
      id: data.id,
      tool: data.tool,
      title: data.title,
      createdAt: data.created_at,
    },
    201,
  );
}
