import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseAdminClient: SupabaseClient | undefined;

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!supabaseUrl || !supabaseSecretKey) {
    return null;
  }

  try {
    const parsedUrl = new URL(supabaseUrl);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  supabaseAdminClient = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabaseAdminClient;
}
