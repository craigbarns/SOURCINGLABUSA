'use client';

import React, { useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Scale,
  ShieldAlert,
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

type AnalyzerStatus = 'idle' | 'uploading' | 'success';

type ApiError = {
  message?: string;
};

function formatMoney(
  amount: number | null,
  currency: string | null,
): string {
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

const QuoteCard: React.FC<{
  quote: StructuredQuote;
  mathCheck?: QuoteMathCheck;
}> = ({ quote, mathCheck }) => (
  <article className="p-4 rounded-xl bg-slate-950 border border-gray-800 space-y-3">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs text-blue-400 font-mono break-all">{quote.fileName}</p>
        <h4 className="text-base font-bold text-white">
          {quote.supplierName ?? 'Unidentified supplier'}
        </h4>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full border ${
          mathCheck?.status === 'matched'
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            : mathCheck?.status === 'mismatch'
              ? 'text-red-400 bg-red-500/10 border-red-500/30'
              : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
        }`}
      >
        {mathCheck ? mathCheckLabel(mathCheck) : 'Check unavailable'}
      </span>
    </div>

    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
      <div>
        <dt className="text-gray-500">Reported total</dt>
        <dd className="font-bold text-white">
          {formatMoney(quote.totals.total, quote.currency)}
        </dd>
      </div>
      <div>
        <dt className="text-gray-500">Total quantity</dt>
        <dd className="text-gray-200">
          {quote.totalQuantity?.toLocaleString('en-US') ?? 'Not extracted'}
        </dd>
      </div>
      <div>
        <dt className="text-gray-500">Incoterm</dt>
        <dd className="text-gray-200">{quote.incoterm ?? 'Not extracted'}</dd>
      </div>
      <div>
        <dt className="text-gray-500">Lead time</dt>
        <dd className="text-gray-200">{quote.leadTime ?? 'Not extracted'}</dd>
      </div>
      <div className="col-span-2">
        <dt className="text-gray-500">Payment terms</dt>
        <dd className="text-gray-200">{quote.paymentTerms ?? 'Not extracted'}</dd>
      </div>
    </dl>

    <p className="text-[11px] text-gray-500">
      Extraction confidence: {Math.round(quote.extractionConfidence * 100)}%
      {' • '}
      {quote.lineItems.length} line item{quote.lineItems.length === 1 ? '' : 's'} extracted
    </p>

    {quote.warnings.length > 0 && (
      <ul className="space-y-1 text-xs text-amber-300/90">
        {quote.warnings.map((warning) => (
          <li key={warning}>• {warning}</li>
        ))}
      </ul>
    )}
  </article>
);

const RankingRow: React.FC<{ item: QuoteRankingItem }> = ({ item }) => (
  <tr className="border-t border-gray-800">
    <td className="px-3 py-3 text-gray-300">
      {item.rank === null ? '—' : `#${item.rank}`}
    </td>
    <td className="px-3 py-3">
      <span className="block font-semibold text-white">
        {item.supplierName ?? 'Unidentified supplier'}
      </span>
      <span className="text-[11px] text-gray-500 break-all">{item.fileName}</span>
    </td>
    <td className="px-3 py-3 text-right font-mono text-gray-200">
      {formatMoney(item.amount, item.currency)}
      {item.basis === 'weighted_unit_price' && (
        <span className="block text-[10px] text-gray-500">weighted unit price</span>
      )}
      {item.basis === 'reported_total_per_unit' && (
        <span className="block text-[10px] text-gray-500">
          reported total / quantity
        </span>
      )}
    </td>
  </tr>
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
        nextErrorMessage ??=
          `You can compare up to ${MAX_QUOTE_FILES} quotes at a time.`;
        continue;
      }

      if (file.size > MAX_QUOTE_FILE_BYTES) {
        nextErrorMessage ??=
          `File "${file.name}" exceeds the ${formatQuoteUploadBytes(MAX_QUOTE_FILE_BYTES)} per-file limit.`;
        continue;
      }

      if (totalBytes + file.size > MAX_QUOTE_UPLOAD_BYTES) {
        nextErrorMessage ??=
          `The combined file size exceeds the ${formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)} limit.`;
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
        setErrorMessage(
          'The server returned an invalid analysis report.',
        );
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

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
          <ShieldAlert className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Supplier Quote Comparison
          </h3>
          <p className="text-xs text-gray-400">
            Upload up to three PDFs or images. The server extracts tables,
            structures each quote, recalculates totals, and compares only the
            available data.
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
        className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-800 bg-slate-950'
        }`}
      >
        <Upload
          className="w-10 h-10 mx-auto text-blue-400 mb-3"
          aria-hidden="true"
        />
        <p className="text-sm font-semibold text-white">
          Drag your quotes here or select files
        </p>
        <p id="quote-upload-help" className="text-xs text-gray-500 mt-1">
          PDF, JPEG, PNG, or WebP • {formatQuoteUploadBytes(MAX_QUOTE_FILE_BYTES)} per
          file • {formatQuoteUploadBytes(MAX_QUOTE_UPLOAD_BYTES)} combined
        </p>
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white focus-within:ring-2 focus-within:ring-blue-400">
          <FileText className="w-4 h-4" aria-hidden="true" />
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
        <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-bold text-white">
              {files.length} document{files.length === 1 ? '' : 's'} selected
            </h4>
            <span className="text-xs text-gray-500">{files.length}/{MAX_QUOTE_FILES}</span>
          </div>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-950 px-3 py-2"
              >
                <span className="min-w-0 text-xs text-gray-200 truncate">
                  {file.name}{' '}
                  <span className="text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={status === 'uploading'}
                  aria-label={`Remove ${file.name}`}
                  className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={status === 'uploading'}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60"
          >
            {status === 'uploading' ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                Running OCR and checks…
              </>
            ) : (
              <>
                <Scale className="w-4 h-4" aria-hidden="true" />
                Analyze and Compare Quotes
              </>
            )}
          </button>
        </div>
      )}

      {status === 'uploading' && (
        <div
          className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-sm text-blue-200"
          role="status"
          aria-live="polite"
        >
          Server upload → Mistral OCR → structured JSON → deterministic math checks
          → analysis. Processing may take several seconds.
        </div>
      )}

      {errorMessage && (
        <p
          className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {result && status === 'success' && (
        <section
          className="p-6 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-6 animate-fadeIn"
          aria-labelledby="quote-report-title"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-800 pb-4">
            <div>
              <p className="text-xs text-blue-400 font-mono">{providerLabel(result)}</p>
              <h3 id="quote-report-title" className="text-2xl font-bold text-white">
                Comparison Report
              </h3>
            </div>
            <span
              className={`self-start px-3 py-1 rounded-full border text-xs font-bold uppercase ${
                result.mode === 'demo'
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : result.mode === 'partial'
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}
            >
              {result.mode === 'demo'
                ? 'Demo mode'
                : result.mode === 'partial'
                  ? 'Partial live analysis'
                  : 'Live analysis'}
            </span>
          </div>

          {result.warning && (
            <div
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200"
              role={result.mode === 'demo' ? 'alert' : 'status'}
            >
              <strong className="block text-amber-300 mb-1">
                {result.mode === 'demo'
                  ? 'No user files analyzed'
                  : 'Pipeline transparency'}
              </strong>
              {result.warning}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
            <div className="flex items-start gap-3">
              {result.comparison.comparability === 'high' ? (
                <CheckCircle2
                  className="w-5 h-5 text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  className="w-5 h-5 text-amber-400 shrink-0"
                  aria-hidden="true"
                />
              )}
              <div>
                <h4 className="text-sm font-bold text-white">
                  Comparability:{' '}
                  {result.comparison.comparability === 'high'
                    ? 'high'
                    : result.comparison.comparability === 'limited'
                      ? 'limited'
                      : 'insufficient'}
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  {result.comparison.summary}
                </p>
                {result.comparison.priceSpreadPercent !== null && (
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">
                    Calculated spread: {result.comparison.priceSpreadPercent}%
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full min-w-[560px] text-sm">
              <caption className="sr-only">Deterministic quote ranking</caption>
              <thead className="bg-slate-950 text-left text-xs text-gray-400 uppercase">
                <tr>
                  <th scope="col" className="px-3 py-3">Rank</th>
                  <th scope="col" className="px-3 py-3">Supplier</th>
                  <th scope="col" className="px-3 py-3 text-right">Comparable basis</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900">
                {result.comparison.ranking.map((item, index) => (
                  <RankingRow key={`${index}-${item.fileName}`} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {result.quotes.map((quote, index) => (
              <QuoteCard
                key={`${index}-${quote.fileName}`}
                quote={quote}
                mathCheck={result.comparison.mathChecks[index]}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
              <h4 className="text-sm font-bold text-red-300 mb-2">
                Items to Verify
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.comparison.vigilancePoints.map((point, index) => (
                  <li key={`${index}-${point}`}>• {point}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
              <h4 className="text-sm font-bold text-emerald-300 mb-2">
                Next Actions
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.comparison.recommendations.map((recommendation, index) => (
                  <li key={`${index}-${recommendation}`}>• {recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
