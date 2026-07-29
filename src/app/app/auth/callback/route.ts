import { NextResponse } from 'next/server';

import { getSupabaseServerClient } from '@/lib/supabase/server-client';

export const runtime = 'nodejs';

/**
 * Completes a magic-link / OAuth sign-in by exchanging the auth code for a
 * session, then returns the user to the workspace. On any failure it still
 * redirects to the workspace with an error flag so the UI can explain.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (code) {
    const supabase = await getSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(new URL('/app', url.origin));
      }

      console.error('Auth code exchange failed', { message: error.message });
    }
  }

  return NextResponse.redirect(new URL('/app?auth_error=1', url.origin));
}
