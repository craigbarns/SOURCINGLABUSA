'use client';

import { useState } from 'react';
import { Check, LoaderCircle, Save } from 'lucide-react';

import { useAuth } from '@/components/auth/SupabaseAuthProvider';
import { saveAnalysis } from '@/lib/history-client';
import type { HistoryTool } from '@/lib/validation/history';

interface SaveAnalysisButtonProps {
  tool: HistoryTool;
  title: string;
  payload: unknown;
}

/**
 * Saves the current tool result to the signed-in user's history. Renders
 * nothing when auth is not configured, and prompts to sign in otherwise.
 */
export function SaveAnalysisButton({
  tool,
  title,
  payload,
}: SaveAnalysisButtonProps) {
  const { isConfigured, email } = useAuth();
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!isConfigured) {
    return null;
  }

  if (!email) {
    return (
      <span className="text-[11px] text-[#6f7c74]">
        Sign in to save this to your history.
      </span>
    );
  }

  const handleSave = async () => {
    setState('saving');
    setError(null);

    try {
      await saveAnalysis({ tool, title, payload });
      setState('saved');
      window.setTimeout(() => setState('idle'), 2500);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Could not save the analysis.',
      );
      setState('idle');
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={state === 'saving'}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08] disabled:opacity-60"
      >
        {state === 'saving' ? (
          <>
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Saving…
          </>
        ) : state === 'saved' ? (
          <>
            <Check className="h-3.5 w-3.5 text-[#70e1b2]" aria-hidden="true" />
            Saved
          </>
        ) : (
          <>
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            Save to history
          </>
        )}
      </button>
      {error && (
        <span className="text-[11px] text-[#ffb4b4]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
