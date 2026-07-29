export interface SupabasePublicConfig {
  url: string;
  anonKey: string;
}

/**
 * Public Supabase configuration used by the browser and server auth clients.
 * The anon key is designed to be public and is safe to expose with the
 * NEXT_PUBLIC_ prefix; the service-role secret is never read here.
 */
export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  try {
    const parsed = new URL(url);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseAuthConfigured(): boolean {
  return getSupabasePublicConfig() !== null;
}
