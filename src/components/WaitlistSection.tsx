'use client';

import { CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import {
  WAITLIST_ROLE_LABELS,
  WAITLIST_ROLE_VALUES,
  type WaitlistRole,
  waitlistInputSchema,
} from '@/lib/validation/waitlist';

type SubmissionStatus = 'idle' | 'submitting' | 'success';

type WaitlistApiResponse = {
  message?: string;
};

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<WaitlistRole>('brand_owner_ecommerce');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success') {
      successMessageRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const validation = waitlistInputSchema.safeParse({ email, role });

    if (!validation.success) {
      setErrorMessage(
        validation.error.issues[0]?.message ??
          'Please enter a valid work email address.',
      );
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      let responseBody: WaitlistApiResponse = {};

      try {
        responseBody = (await response.json()) as WaitlistApiResponse;
      } catch {
        // A non-JSON response is handled by the generic message below.
      }

      if (!response.ok) {
        setStatus('idle');
        setErrorMessage(
          responseBody.message ??
            'Your registration could not be saved. Please try again.',
        );
        return;
      }

      setEmail(validation.data.email);
      setStatus('success');

      try {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const { default: confetti } = await import('canvas-confetti');
          confetti({
            particleCount: 60,
            spread: 64,
            colors: ['#c7ff6b', '#70e1b2', '#7e9cff'],
            origin: { y: 0.68 },
          });
        }
      } catch {
        // Confetti is decorative and must never affect submission.
      }
    } catch {
      setStatus('idle');
      setErrorMessage(
        'Unable to reach the product updates service. Please try again.',
      );
    }
  };

  const resetForm = () => {
    setEmail('');
    setErrorMessage(null);
    setStatus('idle');
    window.requestAnimationFrame(() => emailInputRef.current?.focus());
  };

  return (
    <section id="waitlist" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.07] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(126,156,255,0.09),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel mx-auto grid max-w-5xl overflow-hidden rounded-[26px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <span className="eyebrow">Help shape SourcingLab</span>
            <h2 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
              Get product updates worth opening.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#91a097]">
              Join the build list for beta notes, new sourcing workflows, and an
              invitation to give direct product feedback. No sales sequence.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-7">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#c7ff6b]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-white">Early feature previews</p>
                  <p className="mt-1 text-xs leading-5 text-[#748179]">
                    See what is shipping before the public release.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-white">Your email stays private</p>
                  <p className="mt-1 text-xs leading-5 text-[#748179]">
                    Used only for SourcingLab product communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            {status === 'success' ? (
              <div
                ref={successMessageRef}
                className="flex min-h-[330px] flex-col items-center justify-center text-center outline-none"
                role="status"
                aria-live="polite"
                tabIndex={-1}
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#70e1b2]/10 text-[#70e1b2]">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">You&apos;re on the list.</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#87948b]">
                  Product updates will go to{' '}
                  <strong className="font-bold text-[#dfffab]">{email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 text-xs font-bold text-[#aebfff] hover:text-white"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="waitlist-role"
                    className="mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-[#8f9c94]"
                  >
                    Your sourcing role
                  </label>
                  <select
                    id="waitlist-role"
                    value={role}
                    onChange={(event) => setRole(event.target.value as WaitlistRole)}
                    disabled={status === 'submitting'}
                    className="min-h-12 w-full rounded-[13px] border border-white/10 bg-[#0a0e0c] px-4 py-3 text-sm text-[#e8eee9] transition-colors focus:border-[#c7ff6b]/60 focus:outline-none disabled:opacity-60"
                  >
                    {WAITLIST_ROLE_VALUES.map((roleValue) => (
                      <option key={roleValue} value={roleValue}>
                        {WAITLIST_ROLE_LABELS[roleValue]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-[#8f9c94]"
                  >
                    Work email address
                  </label>
                  <input
                    ref={emailInputRef}
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errorMessage) {
                        setErrorMessage(null);
                      }
                    }}
                    disabled={status === 'submitting'}
                    aria-invalid={errorMessage ? 'true' : undefined}
                    aria-describedby={errorMessage ? 'waitlist-error' : 'waitlist-helper'}
                    className="min-h-12 w-full rounded-[13px] border border-white/10 bg-[#0a0e0c] px-4 py-3 text-sm text-white placeholder:text-[#536058] transition-colors focus:border-[#c7ff6b]/60 focus:outline-none disabled:opacity-60"
                  />
                  <p id="waitlist-helper" className="mt-2 text-[11px] text-[#65726a]">
                    Occasional product emails. Unsubscribe anytime.
                  </p>
                  {errorMessage && (
                    <p
                      id="waitlist-error"
                      className="mt-2 text-sm text-[#ff9d96]"
                      role="alert"
                      aria-live="assertive"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  aria-describedby={errorMessage ? 'waitlist-error' : undefined}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[13px] bg-white px-5 py-3.5 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#eaf0ec] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{status === 'submitting' ? 'Joining…' : 'Join product updates'}</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
