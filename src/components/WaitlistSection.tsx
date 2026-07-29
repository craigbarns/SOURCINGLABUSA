'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle2, Users, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
          "Les informations d'inscription ne sont pas valides.",
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
        // A non-JSON server response is handled by the generic message below.
      }

      if (!response.ok) {
        setStatus('idle');
        setErrorMessage(
          responseBody.message ??
            "L'inscription n'a pas pu être enregistrée. Veuillez réessayer.",
        );
        return;
      }

      setEmail(validation.data.email);
      setStatus('success');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti is decorative and must never affect the confirmed submission.
      }
    } catch {
      setStatus('idle');
      setErrorMessage(
        "Impossible de joindre le service d'inscription. Veuillez réessayer.",
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
    <section id="waitlist" className="py-20 relative overflow-hidden bg-slate-950 border-t border-gray-800/80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
          <Users className="w-4 h-4" aria-hidden="true" />
          <span>Accès Prioritaire MVP Phase 1</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Rejoignez la <span className="gradient-text">liste d&apos;attente</span>.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Enregistrez votre intérêt pour participer aux prochaines phases du MVP.
          Aucun e-mail automatique ni abonnement n&apos;est activé à ce stade.
        </p>

        <div className="mt-8 max-w-xl mx-auto p-6 rounded-2xl bg-slate-900/90 border border-gray-800 backdrop-blur-xl shadow-2xl">
          {status === 'success' ? (
            <div
              ref={successMessageRef}
              className="py-8 space-y-3 outline-none"
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white">Vous êtes inscrit avec succès !</h3>
              <p className="text-sm text-gray-300">
                Votre inscription à la liste d&apos;attente est enregistrée pour{' '}
                <strong className="text-emerald-400">{email}</strong>.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-blue-400 hover:underline font-mono"
                >
                  Ajouter un autre email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label
                  htmlFor="waitlist-role"
                  className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                >
                  Votre rôle principal
                </label>
                <select
                  id="waitlist-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as WaitlistRole)}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-gray-800 text-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                  className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                >
                  Adresse e-mail professionnelle
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    ref={emailInputRef}
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="vous@entreprise.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errorMessage) {
                        setErrorMessage(null);
                      }
                    }}
                    disabled={status === 'submitting'}
                    aria-invalid={errorMessage ? 'true' : undefined}
                    aria-describedby={errorMessage ? 'waitlist-error' : undefined}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-describedby={errorMessage ? 'waitlist-error' : undefined}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{status === 'submitting' ? 'Inscription…' : 'Rejoindre'}</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                {errorMessage && (
                  <p
                    id="waitlist-error"
                    className="mt-2 text-sm text-red-400"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-800/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  Adresse utilisée uniquement pour gérer votre inscription.
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Accès Beta Gratuit
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
