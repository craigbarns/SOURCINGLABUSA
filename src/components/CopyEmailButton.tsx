'use client';

import confetti from 'canvas-confetti';
import { Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';

const emailAddress = 'contact@sourcinglabusa.com';
const emailHref =
  'mailto:contact@sourcinglabusa.com?subject=Custom%20packaging%20or%20textile%20project';

export function CopyEmailButton() {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmailAddress = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setIsCopied(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c7ff6b', '#70e1b2', '#7e9cff']
      });
      window.setTimeout(() => setIsCopied(false), 2_500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={copyEmailAddress}
        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[14px] bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#d7ff94]"
      >
        {isCopied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {isCopied ? 'Email copied' : 'Copy email address'}
      </button>
      <p className="text-sm font-semibold text-[#dfffab]">{emailAddress}</p>
    </div>
  );
}
