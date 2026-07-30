'use client';

import React, { useRef, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Crown,
  FileText,
  Gauge,
  Layers,
  LoaderCircle,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  Trash2,
  Upload,
} from 'lucide-react';

import type {
  QuoteAnalysisResponse,
  QuoteMathCheck,
  QuoteRankingItem,
  StructuredQuote,
} from '@/lib/types';
import {
  ACCEPTED_QUOTE_MIME_TYPES,
  formatQuoteUploadBytes,
  MAX_QUOTE_FILE_BYTES,
  MAX_QUOTE_FILES,
  MAX_QUOTE_UPLOAD_BYTES,
  quoteAnalysisResponseSchema,
} from '@/lib/validation/quote';
import { QuoteReportActions } from './QuoteReportActions';

type AnalyzerStatus = 'idle' | 'uploading' | 'success';

type ApiError = {
  message?: string;
};

const PIPELINE_STEPS = [
  'Validating upload',
  'Mistral OCR',
  'Structuring data',
  'Math & comparability',
] as const;

function formatMoney(amount: number | null, currency: string | null): string {
  if (amount === null) {
    return 'Not extracted';
  }

  if (!currency) {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString('en-US')} ${currency}`;
  }
}

function providerLabel(result: QuoteAnalysisResponse): string {
  if (result.mode === 'demo') {
    return 'Demo fixture';
  }

  if (result.mode === 'partial') {
    return `Live Mistral OCR • ${result.providers.extraction} extraction • ${result.providers.analysis} analysis`;
  }

  return 'Live Mistral OCR • server-side AI extraction and analysis';
}

function mathCheckLabel(check: QuoteMathCheck): string {
  if (check.status === 'matched') return 'Total matches';
  if (check.status === 'mismatch') return 'Mismatch detected';
  return 'Insufficient data';
}

function basisLabel(basis: QuoteRankingItem['basis']): string | null {
  if (basis === 'weighted_unit_price') return 'weighted unit price';
  if (basis === 'reported_total_per_unit') return 'reported total / quantity';
  if (basis === 'reported_total') return 'reported total';
  return null;
}

/** Comparable ranking rows (numeric amount), best value first. */
function comparableRows(ranking: QuoteRankingItem[]): QuoteRankingItem[] {
  return ranking
    .filter((row): row is QuoteRankingItem & { amount: number } =>
      typeof row.amount === 'number',
    )
    .slice()
    .sort((a, b) => a.amount - b.amount);
}

const PipelineStepper: React.FC = () => (
  <div
    className="rounded-2xl border border-[#f1b47d]/25 bg-[#f1b47d]/[0.04] p-5"
    role="status"
    aria-live="polite"
  >
    <div className="flex items-center gap-2 text-sm font-bold text-white">
      <LoaderCircle className="h-4 w-4 animate-spin text-[#f1b47d]" aria-hidden="true" />
      Analyzing your quotes…
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {PIPELINE_STEPS.map((step, index) => (
        <div key={step} className="space-y-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <span
              className="shimmer-line block h-full w-full rounded-full"
              style={{ animationDelay: `${index * 160}ms` }}
            />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#849188]">
            {step}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-4 text-xs text-[#849188]">
      Server upload → Mistral OCR → structured JSON → deterministic math checks.
      Processing may take several seconds.
    </p>
  </div>
);

const StatTile: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  tone: 'lime' | 'mint' | 'blue' | 'amber';
}> = ({ icon, label, value, sub, tone }) => {
  const toneMap = {
    lime: 'text-[#dfffab]',
    mint: 'text-[#9ff0cf]',
    blue: 'text-[#aebfff]',
    amber: 'text-[#f7cfa3]',
  } as const;

  return (
    <div className="bento-card count-pop rounded-2xl p-4">
      <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${toneMap[tone]}`}>
        {icon}
        {label}
      </div>
      <p className="mt-2 text-2xl font-black tracking-[-0.02em] text-white">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-[#849188]">{sub}</p>}
    </div>
  );
};

const ComparisonChart: React.FC<{
  rows: QuoteRankingItem[];
  winnerFileName: string | null;
}> = ({ rows, winnerFileName }) => {
  const amounts = rows.map((row) => row.amount as number);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);

  return (
    <div className="print:hidden space-y-3.5" aria-hidden="true">
      {rows.map((row, index) => {
        const amount = row.amount as number;
        const width = maxAmount > 0 ? Math.max((amount / maxAmount) * 100, 6) : 6;
        const isWinner =
          winnerFileName !== null
            ? row.fileName === winnerFileName
            : amount === minAmount;
        const deltaPercent =
          minAmount > 0 ? Math.round(((amount - minAmount) / minAmount) * 100) : 0;

        return (
          <div key={`${index}-${row.fileName}`}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-white">
                {isWinner && (
                  <Crown className="h-3.5 w-3.5 shrink-0 text-[#c7ff6b]" aria-hidden="true" />
                )}
                <span className="truncate">
                  {row.supplierName ?? 'Unidentified supplier'}
                </span>
              </span>
              <span className="shrink-0 font-mono text-xs text-gray-200">
                {formatMoney(amount, row.currency)}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className={`bar-grow h-full rounded-full ${
                  isWinner
                    ? 'bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2]'
                    : 'bg-gradient-to-r from-[#5a6b62] to-[#7f8d85]'
                }`}
                style={{ width: `${width}%`, animationDelay: `${index * 90}ms` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between gap-3 text-[10px]">
              <span className="text-[#6f7c74]">{basisLabel(row.basis) ?? ''}</span>
              <span
                className={
                  isWinner ? 'font-bold text-[#c7ff6b]' : 'text-[#849188]'
                }
              >
                {isWinner
                  ? 'Best comparable value'
                  : deltaPercent > 0
                    ? `+${deltaPercent}% vs best`
                    : 'Tied for best'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ConfidenceMeter: React.FC<{ value: number }> = ({ value }) => {
  const pct = Math.round(value * 100);
  const tone =
    pct >= 80
      ? 'from-[#c7ff6b] to-[#70e1b2]'
      : pct >= 55
        ? 'from-[#f1b47d] to-[#f7cfa3]'
        : 'from-[#ff9e9e] to-[#f1b47d]';

  return (
    <div className="mt-1 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone}`}
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <span className="w-9 shrink-0 text-right font-mono text-[10px] text-[#849188]">
        {pct}%
      </span>
    </div>
  );
};

const QuoteCard: React.FC<{
  quote: StructuredQuote;
  mathCheck?: QuoteMathCheck;
  isWinner: boolean;
}> = ({ quote, mathCheck, isWinner }) => (
  <article
    className={`relative space-y-3 rounded-2xl p-4 transition-colors ${
      isWinner
        ? 'border border-[#c7ff6b]/35 bg-[#c7ff6b]/[0.05]'
        : 'border border-white/[0.07] bg-white/[0.02]'
    }`}
  >
    {isWinner && (
      <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full border border-[#c7ff6b]/40 bg-[#0a0e0c] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#c7ff6b]">
        <Crown className="h-3 w-3" aria-hidden="true" />
        Best value
      </span>
    )}
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="break-all font-mono text-[11px] text-[#7f8d85]">
          {quote.fileName}
        </p>
        <h4 className="text-base font-bold text-white">
          {quote.supplierName ?? 'Unidentified supplier'}
        </h4>
      </div>
      <span
        className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${
          mathCheck?.status === 'matched'
            ? 'border-[#70e1b2]/30 bg-[#70e1b2]/10 text-[#9ff0cf]'
            : mathCheck?.status === 'mismatch'
              ? 'border-[#ff9e9e]/30 bg-[#ff9e9e]/10 text-[#ffb4b4]'
              : 'border-[#f1b47d]/30 bg-[#f1b47d]/10 text-[#f7cfa3]'
        }`}
      >
        {mathCheck ? mathCheckLabel(mathCheck) : 'Check unavailable'}
      </span>
    </div>

    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
      <div>
        <dt className="text-[#6f7c74]">Reported total</dt>
        <dd className="font-bold text-white">
          {formatMoney(quote.totals.total, quote.currency)}
        </dd>
      </div>
      <div>
        <dt className="text-[#6f7c74]">Total quantity</dt>
        <dd className="text-gray-200">
          {quote.totalQuantity?.toLocaleString('en-US') ?? 'Not extracted'}
        </dd>
      </div>
      <div>
        <dt className="text-[#6f7c74]">Incoterm</dt>
        <dd className="text-gray-200">{quote.incoterm ?? 'Not extracted'}</dd>
      </div>
      <div>
        <dt className="text-[#6f7c74]">Lead time</dt>
        <dd className="text-gray-200">{quote.leadTime ?? 'Not extracted'}</dd>
      </div>
      <div className="col-span-2">
        <dt className="text-[#6f7c74]">Payment terms</dt>
        <dd className="text-gray-200">{quote.paymentTerms ?? 'Not extracted'}</dd>
      </div>
    </dl>

    <div>
      <p className="text-[11px] text-[#6f7c74]">
        Extraction confidence •{' '}
        {quote.lineItems.length} line item{quote.lineItems.length === 1 ? '' : 's'}
      </p>
      <ConfidenceMeter value={quote.extractionConfidence} />
    </div>

    {quote.warnings.length > 0 && (
      <ul className="space-y-1 border-t border-white/[0.06] pt-2 text-[11px] text-[#f7cfa3]">
        {quote.warnings.map((warning) => (
          <li key={warning}>• {warning}</li>
        ))}
      </ul>
    )}
  </article>
);

interface QuoteAnalyzerProps {
  userApiKey?: string;
}

export const QuoteAnalyzer: React.FC<QuoteAnalyzerProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<AnalyzerStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteAnalysisResponse | null>(null);

  const addFiles = (incoming: File[]) => {
    setResult(null);

    const nextFiles = [...files];
    let totalBytes = nextFiles.reduce((sum, file) => sum + file.size, 0);
    let nextErrorMessage: string | null = null;

    for (const file of incoming) {
      const alreadyAdded = nextFiles.some(
        (candidate) =>
          candidate.name === file.name &&
          candidate.size === file.size &&
          candidate.lastModified === file.lastModified,
      );

      if (alreadyAdded) {
        continue;
      }

      if (nextFiles.length >= MAX_QUOTE_FILES) {
        nextErrorMessage ??= `You can compare up to ${MAX_QUOTE_FILES} quotes at a time.`;
        continue;
      }

      if (file.size > MAX_QUOTE_FILE_BYTES) {
        nextErrorMessage ??= `File "${file.name}" exceeds the ${formatQuoteUploadBytes(MAX_QUOTE_FILE_BYTES)} per-file limit.`;
        continue;
      }

      if (totalBytes + file.size > MAX_QUOTE_UPLOAD_BYTES) {
        nextErrorMessage ??= `The combined file size exceeds the ${formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)} limit.`;
        continue;
      }

      nextFiles.push(file);
      totalBytes += file.size;
    }

    setErrorMessage(nextErrorMessage);
    setFiles(nextFiles);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setErrorMessage('Select at least one quote.');
      inputRef.current?.focus();
      return;
    }

    setStatus('uploading');
    setErrorMessage(null);
    setResult(null);

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('/api/quotes/analyze', {
        method: 'POST',
        body: formData,
      });
      const payload = (await response.json()) as unknown;

      if (!response.ok) {
        const errorPayload =
          typeof payload === 'object' && payload !== null
            ? (payload as ApiError)
            : {};
        setErrorMessage(
          errorPayload.message ??
            'The server could not analyze the documents. Try again later.',
        );
        setStatus('idle');
        return;
      }

      const validation = quoteAnalysisResponseSchema.safeParse(payload);

      if (!validation.success) {
        setErrorMessage('The server returned an invalid analysis report.');
        setStatus('idle');
        return;
      }

      setResult(validation.data);
      setStatus('success');
    } catch {
      setErrorMessage(
        'The analysis service could not be reached. Check your connection.',
      );
      setStatus('idle');
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((current) =>
      current.filter((_, currentIndex) => currentIndex !== indexToRemove),
    );
    setResult(null);
    setStatus('idle');
  };

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  const rows = result ? comparableRows(result.comparison.ranking) : [];
  const winnerFileName = result
    ? (result.comparison.recommendedQuoteFileName ??
      rows.find((row) => row.rank === 1)?.fileName ??
      rows[0]?.fileName ??
      null)
    : null;
  const singleCurrency =
    rows.length > 1 && new Set(rows.map((row) => row.currency)).size === 1;
  const bestRow = rows[0];
  const worstRow = rows[rows.length - 1];
  const savingsAbsolute =
    singleCurrency && bestRow && worstRow
      ? (worstRow.amount as number) - (bestRow.amount as number)
      : null;
  const savingsPercent =
    savingsAbsolute !== null && (worstRow?.amount as number) > 0
      ? Math.round((savingsAbsolute / (worstRow!.amount as number)) * 100)
      : null;
  const notComparableCount = result
    ? result.comparison.ranking.length - rows.length
    : 0;

  const comparabilityLabel =
    result?.comparison.comparability === 'high'
      ? 'High'
      : result?.comparison.comparability === 'limited'
        ? 'Limited'
        : 'Insufficient';

  return (
    <div className="space-y-6">
      <div className="print-hidden surface-panel flex items-start gap-3 rounded-2xl p-5">
        <div className="shrink-0 rounded-xl bg-[#f1b47d]/12 p-2.5 text-[#f1b47d]">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Supplier Quote Comparison
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-[#849188]">
            Upload up to three PDFs or images. The server extracts tables,
            structures each quote, recalculates totals, and compares only the
            data it can verify — narrative never overrides the numbers.
          </p>
        </div>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          addFiles(Array.from(event.dataTransfer.files));
        }}
        className={`print-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-[#c7ff6b]/60 bg-[#c7ff6b]/[0.06]'
            : 'border-white/[0.1] bg-white/[0.015] hover:border-[#f1b47d]/40'
        }`}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1b47d]/12 text-[#f1b47d]">
          <Upload className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-white">
          Drag your quotes here or select files
        </p>
        <p id="quote-upload-help" className="mt-1 text-xs text-[#6f7c74]">
          PDF, JPEG, PNG, or WebP • {formatQuoteUploadBytes(MAX_QUOTE_FILE_BYTES)}{' '}
          per file • {formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)} combined
        </p>
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1] focus-within:ring-2 focus-within:ring-[#c7ff6b]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Choose Files
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED_QUOTE_MIME_TYPES.join(',')}
            aria-describedby="quote-upload-help"
            className="sr-only"
            onChange={(event) => {
              addFiles(Array.from(event.target.files ?? []));
              event.target.value = '';
            }}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="print-hidden soft-panel space-y-3 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-bold text-white">
              {files.length} document{files.length === 1 ? '' : 's'} selected
            </h4>
            <span className="font-mono text-xs text-[#849188]">
              {formatQuoteUploadBytes(totalBytes)} • {files.length}/
              {MAX_QUOTE_FILES}
            </span>
          </div>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2"
              >
                <span className="flex min-w-0 items-center gap-2 text-xs text-gray-200">
                  <FileText
                    className="h-3.5 w-3.5 shrink-0 text-[#7f8d85]"
                    aria-hidden="true"
                  />
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-[#6f7c74]">
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={status === 'uploading'}
                  aria-label={`Remove ${file.name}`}
                  className="rounded-lg p-1.5 text-[#7f8d85] transition-colors hover:bg-[#ff9e9e]/10 hover:text-[#ffb4b4] disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={status === 'uploading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2] py-3 text-sm font-black text-[#07130c] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'uploading' ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                Running OCR and checks…
              </>
            ) : (
              <>
                <Scale className="h-4 w-4" aria-hidden="true" />
                Analyze and Compare Quotes
              </>
            )}
          </button>
        </div>
      )}

      {status === 'uploading' && <PipelineStepper />}

      {errorMessage && (
        <p
          className="rounded-xl border border-[#ff9e9e]/30 bg-[#ff9e9e]/[0.08] p-4 text-sm text-[#ffb4b4]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {result && status === 'success' && (
        <section
          data-quote-report
          className="quote-report-print animate-rise surface-panel space-y-6 rounded-2xl p-6"
          aria-labelledby="quote-report-title"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-xs text-[#f1b47d]">
                {providerLabel(result)}
              </p>
              <h3
                id="quote-report-title"
                className="mt-0.5 flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-white"
              >
                Comparison Report
                <Sparkles className="h-5 w-5 text-[#c7ff6b]" aria-hidden="true" />
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <span
                className={`self-start rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.08em] sm:self-end ${
                  result.mode === 'demo'
                    ? 'border-[#f1b47d]/40 bg-[#f1b47d]/15 text-[#f7cfa3]'
                    : result.mode === 'partial'
                      ? 'border-[#7e9cff]/40 bg-[#7e9cff]/15 text-[#aebfff]'
                      : 'border-[#c7ff6b]/40 bg-[#c7ff6b]/15 text-[#dfffab]'
                }`}
              >
                {result.mode === 'demo'
                  ? 'Demo mode'
                  : result.mode === 'partial'
                    ? 'Partial live analysis'
                    : 'Live analysis'}
              </span>
              <QuoteReportActions result={result} />
            </div>
          </div>

          {result.warning && (
            <div
              className="rounded-xl border border-[#f1b47d]/30 bg-[#f1b47d]/[0.08] p-4 text-sm text-[#f7cfa3]"
              role={result.mode === 'demo' ? 'alert' : 'status'}
            >
              <strong className="mb-1 block text-[#f1b47d]">
                {result.mode === 'demo'
                  ? 'No user files analyzed'
                  : 'Pipeline transparency'}
              </strong>
              {result.warning}
            </div>
          )}

          {/* Winner spotlight */}
          {bestRow && (
            <div className="relative overflow-hidden rounded-2xl border border-[#c7ff6b]/30 bg-gradient-to-br from-[#c7ff6b]/[0.1] via-[#70e1b2]/[0.04] to-transparent p-5">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#c7ff6b]">
                    <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                    Best comparable value
                  </span>
                  <p className="mt-1.5 text-xl font-black text-white">
                    {bestRow.supplierName ?? 'Unidentified supplier'}
                  </p>
                  <p className="text-xs text-[#849188]">
                    {formatMoney(bestRow.amount, bestRow.currency)}
                    {basisLabel(bestRow.basis) ? ` • ${basisLabel(bestRow.basis)}` : ''}
                  </p>
                </div>
                {savingsAbsolute !== null && savingsAbsolute > 0 && (
                  <div className="text-right">
                    <span className="flex items-center justify-end gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#9ff0cf]">
                      <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                      Potential savings
                    </span>
                    <p className="text-2xl font-black text-[#c7ff6b]">
                      {formatMoney(savingsAbsolute, bestRow.currency)}
                    </p>
                    {savingsPercent !== null && (
                      <p className="text-[11px] text-[#849188]">
                        {savingsPercent}% vs the highest quote
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile
              icon={<Gauge className="h-3.5 w-3.5" aria-hidden="true" />}
              label="Comparability"
              value={comparabilityLabel}
              sub={`${rows.length} directly comparable`}
              tone={
                result.comparison.comparability === 'high' ? 'mint' : 'amber'
              }
            />
            <StatTile
              icon={<BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />}
              label="Price spread"
              value={
                result.comparison.priceSpreadPercent !== null
                  ? `${result.comparison.priceSpreadPercent}%`
                  : '—'
              }
              sub="between comparable quotes"
              tone="lime"
            />
            <StatTile
              icon={<Layers className="h-3.5 w-3.5" aria-hidden="true" />}
              label="Quotes"
              value={String(result.quotes.length)}
              sub={
                notComparableCount > 0
                  ? `${notComparableCount} non-comparable`
                  : 'all comparable'
              }
              tone="blue"
            />
            <StatTile
              icon={<Crown className="h-3.5 w-3.5" aria-hidden="true" />}
              label="Best value"
              value={formatMoney(bestRow?.amount ?? null, bestRow?.currency ?? null)}
              sub={bestRow?.supplierName ?? 'Not ranked'}
              tone="lime"
            />
          </div>

          {/* Comparability summary */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-start gap-3">
              {result.comparison.comparability === 'high' ? (
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-[#70e1b2]"
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  className="h-5 w-5 shrink-0 text-[#f1b47d]"
                  aria-hidden="true"
                />
              )}
              <p className="text-xs leading-relaxed text-gray-300">
                {result.comparison.summary}
              </p>
            </div>
          </div>

          {/* Price comparison chart + accessible ranking table */}
          {rows.length > 0 && (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                <BarChart3 className="h-4 w-4 text-[#c7ff6b]" aria-hidden="true" />
                Comparable price ranking
              </h4>
              <ComparisonChart rows={rows} winnerFileName={winnerFileName} />
              <table className="sr-only" data-print-table>
                <caption>Deterministic quote ranking</caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Supplier</th>
                    <th scope="col">Comparable amount</th>
                    <th scope="col">Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {result.comparison.ranking.map((item, index) => (
                    <tr key={`${index}-${item.fileName}`}>
                      <td>{item.rank === null ? 'Not ranked' : `#${item.rank}`}</td>
                      <td>{item.supplierName ?? 'Unidentified supplier'}</td>
                      <td>{formatMoney(item.amount, item.currency)}</td>
                      <td>{basisLabel(item.basis) ?? 'insufficient data'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Quote cards */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.quotes.map((quote, index) => (
              <QuoteCard
                key={`${index}-${quote.fileName}`}
                quote={quote}
                mathCheck={result.comparison.mathChecks[index]}
                isWinner={
                  winnerFileName !== null && quote.fileName === winnerFileName
                }
              />
            ))}
          </div>

          {/* Vigilance + next actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#ff9e9e]/25 bg-[#ff9e9e]/[0.05] p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-[#ffb4b4]">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                Items to Verify
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.comparison.vigilancePoints.map((point, index) => (
                  <li key={`${index}-${point}`} className="flex gap-2">
                    <span className="text-[#ff9e9e]">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#70e1b2]/25 bg-[#70e1b2]/[0.05] p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-[#9ff0cf]">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Next Actions
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.comparison.recommendations.map((recommendation, index) => (
                  <li key={`${index}-${recommendation}`} className="flex gap-2">
                    <span className="text-[#70e1b2]">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
