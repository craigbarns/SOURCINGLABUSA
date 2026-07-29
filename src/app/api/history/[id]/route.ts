import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isSameOriginRequest } from '@/lib/server/http';
import { getSupabaseServerClient } from '@/lib/supabase/server-client';

export const runtime = 'nodejs';

const NO_STORE = { 'Cache-Control': 'no-store' };
const NOT_CONFIGURED = 'History is not available: sign-in is not configured.';
const SIGN_IN_REQUIRED = 'Sign in to use your saved history.';

const idSchema = z.string().uuid();

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!idSchema.safeParse(id).success) {
    return json({ message: 'Invalid analysis id.' }, 400);
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

  const { data, error } = await supabase
    .from('saved_analyses')
    .select('id, tool, title, payload, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('History fetch failed', { code: error.code });
    return json({ message: 'Could not load the analysis.' }, 500);
  }

  if (!data) {
    return json({ message: 'Analysis not found.' }, 404);
  }

  return json(
    {
      id: data.id,
      tool: data.tool,
      title: data.title,
      payload: data.payload,
      createdAt: data.created_at,
    },
    200,
  );
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!isSameOriginRequest(request)) {
    return json({ message: 'Request origin not allowed.' }, 403);
  }

  const { id } = await context.params;

  if (!idSchema.safeParse(id).success) {
    return json({ message: 'Invalid analysis id.' }, 400);
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

  const { error } = await supabase
    .from('saved_analyses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('History delete failed', { code: error.code });
    return json({ message: 'Could not delete the analysis.' }, 500);
  }

  return json({ id }, 200);
}
