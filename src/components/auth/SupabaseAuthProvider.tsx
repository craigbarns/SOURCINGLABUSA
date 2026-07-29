'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '@supabase/supabase-js';

import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

type AuthStatus = 'loading' | 'ready';

interface AuthContextValue {
  status: AuthStatus;
  isConfigured: boolean;
  session: Session | null;
  email: string | null;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const client = getSupabaseBrowserClient();
  const isConfigured = client !== null;
  const [status, setStatus] = useState<AuthStatus>(
    isConfigured ? 'loading' : 'ready',
  );
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!client) {
      return;
    }

    let active = true;

    client.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setStatus('ready');
      }
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setStatus('ready');
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [client]);

  const signInWithEmail = useCallback(
    async (email: string) => {
      if (!client) {
        throw new Error('Sign-in is not configured.');
      }

      const emailRedirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/app/auth/callback`
          : undefined;

      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    [client],
  );

  const signOut = useCallback(async () => {
    await client?.auth.signOut();
    setSession(null);
  }, [client]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isConfigured,
      session,
      email: session?.user.email ?? null,
      signInWithEmail,
      signOut,
    }),
    [status, isConfigured, session, signInWithEmail, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const UNCONFIGURED_AUTH: AuthContextValue = {
  status: 'ready',
  isConfigured: false,
  session: null,
  email: null,
  signInWithEmail: async () => {
    throw new Error('Sign-in is not configured.');
  },
  signOut: async () => {},
};

/**
 * Auth state for the current tree. Rendering outside a provider is a
 * supported case — the workspace stays fully usable without accounts — so
 * this reports "not configured" rather than throwing.
 */
export function useAuth(): AuthContextValue {
  return useContext(AuthContext) ?? UNCONFIGURED_AUTH;
}
