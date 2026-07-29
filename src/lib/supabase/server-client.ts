import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabasePublicConfig } from './config';

/**
 * Creates a request-scoped Supabase client bound to the incoming cookies.
 * All queries run under the signed-in user's session, so row-level security
 * governs access. Returns null when public auth configuration is absent.
 */
export async function getSupabaseServerClient(): Promise<SupabaseClient | null> {
  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render where cookies are
          // read-only. Session refresh still happens on the next request.
        }
      },
    },
  });
}
