'use client';

import { useCallback, useEffect, useState } from 'react';
import { History, LoaderCircle, Trash2 } from 'lucide-react';

import { AccessibleModal } from '@/components/AccessibleModal';
import { useAuth } from '@/components/auth/SupabaseAuthProvider';
import { deleteAnalysis, listAnalyses } from '@/lib/history-client';
import {
  HISTORY_TOOL_LABELS,
  type SavedAnalysisSummary,
} from '@/lib/validation/history';

const TOOL_ACCENT: Record<string, string> = {
  quote: 'text-[#f1b47d]',
  specs: 'text-[#aebfff]',
  cost: 'text-[#dfffab]',
  hscode: 'text-[#9ff0cf]',
  email: 'text-[#cebaff]',
};

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
}

export function HistoryPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { email } = useAuth();
  const [items, setItems] = useState<SavedAnalysisSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listAnalyses());
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Could not load your history.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && email) {
      // Legitimate data fetch when the panel opens for a signed-in user;
      // state updates happen asynchronously inside refresh().
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void refresh();
    }
  }, [isOpen, email, refresh]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAnalysis(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Could not delete the item.',
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title="Saved history"
      description="Your saved sourcing analyses."
      contentClassName="surface-panel w-full max-w-lg rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <History className="h-5 w-5 text-[#c7ff6b]" aria-hidden="true" />
        <h2 className="text-lg font-black text-white">Saved history</h2>
      </div>

      {!email ? (
        <p className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-[#849188]">
          Sign in to save analyses and see them here on any device.
        </p>
      ) : loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#849188]">
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading your history…
        </div>
      ) : error ? (
        <p className="rounded-xl border border-[#ff9e9e]/30 bg-[#ff9e9e]/[0.08] p-4 text-sm text-[#ffb4b4]" role="alert">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] p-6 text-center text-sm text-[#849188]">
          No saved analyses yet. Run a tool and choose “Save to history”.
        </p>
      ) : (
        <ul className="max-h-[60vh] space-y-2 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#6f7c74]">
                  <span className={TOOL_ACCENT[item.tool] ?? 'text-[#849188]'}>
                    {HISTORY_TOOL_LABELS[item.tool]}
                  </span>
                  {' • '}
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleDelete(item.id)}
                disabled={deletingId === item.id}
                aria-label={`Delete ${item.title}`}
                className="shrink-0 rounded-lg p-1.5 text-[#7f8d85] transition-colors hover:bg-[#ff9e9e]/10 hover:text-[#ffb4b4] disabled:opacity-50"
              >
                {deletingId === item.id ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </AccessibleModal>
  );
}
