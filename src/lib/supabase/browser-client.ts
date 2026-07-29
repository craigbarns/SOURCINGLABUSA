'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabasePublicConfig } from './config';

let cachedClient: SupabaseClient | null | undefined;

/**
 * Returns a singleton browser Supabase client, or null when public auth
 * configuration is absent. The client persists the session in cookies so
 * server route handlers can read it.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const config = getSupabasePublicConfig();
  cachedClient = config
    ? createBrowserClient(config.url, config.anonKey)
    : null;

  return cachedClient;
}
