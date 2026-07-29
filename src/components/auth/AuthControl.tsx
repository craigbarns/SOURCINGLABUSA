'use client';

import { useRef, useState } from 'react';
import { LogIn, LogOut, LoaderCircle, Mail } from 'lucide-react';

import { AccessibleModal } from '@/components/AccessibleModal';
import { useAuth } from './SupabaseAuthProvider';

export function AuthControl() {
  const { status, isConfigured, email, signInWithEmail, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  if (!isConfigured) {
    return null;
  }

  if (status === 'loading') {
    return (
      <span className="flex items-center gap-1.5 text-xs text-[#7f8d85]">
        <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        <span className="sr-only">Checking sign-in status</span>
      </span>
    );
  }

  if (email) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="hidden max-w-[180px] truncate text-xs font-medium text-[#9ff0cf] sm:inline"
          title={email}
        >
          {email}
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-[#849188] transition-colors hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign out
        </button>
      </div>
    );
  }

  const closeModal = () => {
    setIsOpen(false);
    setState('idle');
    setError(null);
    setValue('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;

    setState('sending');
    setError(null);

    try {
      await signInWithEmail(value.trim());
      setState('sent');
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'The sign-in link could not be sent.',
      );
      setState('idle');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#c7ff6b]/25 bg-[#c7ff6b]/[0.08] px-3 py-1.5 text-xs font-bold text-[#dfffab] transition-colors hover:bg-[#c7ff6b]/[0.14]"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
        Sign in to save
      </button>

      <AccessibleModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Sign in to SourcingLab"
        description="Enter your email to receive a one-click sign-in link."
        initialFocusRef={emailRef}
        contentClassName="surface-panel w-full max-w-md rounded-2xl p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-black text-white">Sign in to save your work</h2>
          <p className="mt-1 text-xs text-[#849188]">
            We&apos;ll email you a secure sign-in link. Your analyses are then
            saved to your account and available on any device.
          </p>
        </div>

        {state === 'sent' ? (
          <div className="rounded-xl border border-[#70e1b2]/30 bg-[#70e1b2]/[0.08] p-4 text-sm text-[#9ff0cf]">
            <strong className="block">Check your inbox.</strong>
            We sent a sign-in link to {value}. Open it on this device to finish
            signing in.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="auth-email" className="block text-xs text-[#849188]">
              Work email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7c74]"
                aria-hidden="true"
              />
              <input
                ref={emailRef}
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/[0.08] bg-[#0d1210] py-2.5 pl-10 pr-3 text-sm text-white placeholder-[#6f7c74] focus:border-[#c7ff6b]/60 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-xs text-[#ffb4b4]" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending' || !value.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2] py-2.5 text-sm font-black text-[#07130c] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
            >
              {state === 'sending' ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending link…
                </>
              ) : (
                'Email me a sign-in link'
              )}
            </button>
          </form>
        )}
      </AccessibleModal>
    </>
  );
}
