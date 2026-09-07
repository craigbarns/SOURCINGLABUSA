'use client';

import { Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';

import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { BRIEF_CONTACT_EMAIL } from '@/lib/brief-copy';

interface CopyEmailButtonProps {
  formLocation?: string;
}

export function CopyEmailButton({ formLocation = 'contact_section' }: CopyEmailButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmailAddress = async () => {
    trackEvent(ANALYTICS_EVENTS.emailCopy, { form_location: formLocation });

    try {
      await navigator.clipboard.writeText(BRIEF_CONTACT_EMAIL);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2_500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={`mailto:${BRIEF_CONTACT_EMAIL}?subject=${encodeURIComponent(
          'Custom packaging or textile project',
        )}`}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.emailFallback, { form_location: formLocation })
        }
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/[0.1]"
      >
        <Mail className="h-4 w-4 text-[#dfffab]" aria-hidden="true" />
        {BRIEF_CONTACT_EMAIL}
      </a>
      <button
        type="button"
        onClick={copyEmailAddress}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-[#9aa79f] transition hover:text-white"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-[#70e1b2]" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
