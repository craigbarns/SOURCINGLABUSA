'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Printer } from 'lucide-react';

import type { QuoteAnalysisResponse } from '@/lib/types';
import { buildQuoteSummaryText } from '@/lib/quote-report-summary';

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand('copy');
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}

export function QuoteReportActions({
  result,
}: {
  result: QuoteAnalysisResponse;
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const succeeded = await copyText(buildQuoteSummaryText(result));
    setCopyState(succeeded ? 'copied' : 'error');

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2200);
  };

  const copyLabel =
    copyState === 'copied'
      ? 'Summary copied'
      : copyState === 'error'
        ? 'Copy failed'
        : 'Copy summary';

  return (
    <div className="report-print-hidden flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7ff6b]"
      >
        {copyState === 'copied' ? (
          <Check className="h-3.5 w-3.5 text-[#9ff0cf]" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copyLabel}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7ff6b]"
      >
        <Printer className="h-3.5 w-3.5" aria-hidden="true" />
        Print / Save as PDF
      </button>
    </div>
  );
}
