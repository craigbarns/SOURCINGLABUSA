'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  Copy,
  Percent,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { analyzeHsCode } from '@/lib/ai-service';
import type {
  HsCodeAnalysisResult,
  HsCodeOriginCountry,
} from '@/lib/types';
import { hsCodeInputSchema } from '@/lib/validation/hscode';

const SAMPLE_QUERIES = [
  '18/8 stainless steel insulated water bottles',
  '100% cotton knit T-shirts',
  'Polyester insulated backpacks',
];

const ORIGIN_OPTIONS: Array<{
  value: HsCodeOriginCountry;
  label: string;
}> = [
  { value: 'CN', label: 'China' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'IN', label: 'India' },
  { value: 'MX', label: 'Mexico' },
  { value: 'TR', label: 'Türkiye' },
];

export const HsCodeAnalyzer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [destinationMarket, setDestinationMarket] = useState<'US' | 'EU'>('US');
  const [originCountry, setOriginCountry] =
    useState<HsCodeOriginCountry>('CN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HsCodeAnalysisResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleAnalyze = async (searchQuery?: string) => {
    const q = searchQuery || query;
    const validation = hsCodeInputSchema.safeParse({
      query: q,
      destinationMarket,
      originCountry,
    });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message ??
          'Check the HS-code search parameters.',
      );
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeHsCode(validation.data);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while analyzing the HS code.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="surface-panel rounded-2xl p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#70e1b2]/25 bg-[#70e1b2]/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-[0.08em] text-[#9ff0cf]">
              <BookOpen className="h-3.5 w-3.5" />
              AI Customs Engine • HTSUS & TARIC
            </div>
            <h2 className="text-2xl font-black tracking-[-0.03em] text-white">HS Code & Customs Duty Analyzer</h2>
            <p className="max-w-xl text-xs leading-relaxed text-[#849188]">
              Identify a potential Harmonized System code and estimate base
              duties, Section 301 tariffs, and US/EU customs fees for review.
            </p>
          </div>

          <fieldset className="space-y-1.5">
            <legend className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#849188]">
              Destination market
            </legend>
            <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-[#0d1210] p-1.5 text-xs font-semibold">
              <button
                type="button"
                aria-pressed={destinationMarket === 'US'}
                onClick={() => {
                  setDestinationMarket('US');
                  setResult(null);
                  setError(null);
                }}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  destinationMarket === 'US'
                    ? 'bg-[#70e1b2] font-bold text-[#07130c]'
                    : 'text-[#849188] hover:text-white'
                }`}
              >
                🇺🇸 USA (HTSUS)
              </button>
              <button
                type="button"
                aria-pressed={destinationMarket === 'EU'}
                onClick={() => {
                  setDestinationMarket('EU');
                  setResult(null);
                  setError(null);
                }}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  destinationMarket === 'EU'
                    ? 'bg-[#70e1b2] font-bold text-[#07130c]'
                    : 'text-[#849188] hover:text-white'
                }`}
              >
                🇪🇺 European Union (TARIC)
              </button>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Input Search Form */}
      <div className="soft-panel space-y-4 rounded-2xl p-6">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void handleAnalyze();
          }}
        >
          <div className="space-y-2">
            <label
              htmlFor="hs-code-query"
              className="block text-xs font-bold uppercase tracking-[0.08em] text-[#849188]"
            >
              Describe the product or enter an HS code
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6f7c74]"
                  aria-hidden="true"
                />
                <input
                  id="hs-code-query"
                  name="query"
                  type="text"
                  required
                  minLength={2}
                  maxLength={300}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Example: 18/8 stainless steel insulated bottle with silicone lid..."
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#0d1210] py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#6f7c74] transition-all focus:border-[#70e1b2]/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2] px-6 py-3.5 text-xs font-black text-[#07130c] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div
                      className="h-4 w-4 animate-spin rounded-full border-2 border-[#07130c]/40 border-t-[#07130c]"
                      aria-hidden="true"
                    />
                    <span>Analyzing customs data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Analyze HS Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="max-w-sm">
            <label
              htmlFor="hs-origin-country"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#849188]"
            >
              Country of origin
            </label>
            <select
              id="hs-origin-country"
              name="originCountry"
              value={originCountry}
              onChange={(event) => {
                setOriginCountry(
                  event.target.value as HsCodeOriginCountry,
                );
                setResult(null);
                setError(null);
              }}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0d1210] px-4 py-3 text-sm text-gray-200 transition-colors focus:border-[#70e1b2]/60 focus:outline-none"
            >
              {ORIGIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>

          {/* Preset Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-[11px] uppercase text-[#6f7c74]">
              Quick examples:
            </span>
            {SAMPLE_QUERIES.map((sample) => (
              <button
                type="button"
                key={sample}
                onClick={() => {
                  setQuery(sample);
                  void handleAnalyze(sample);
                }}
                className="cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] text-[#849188] transition-all hover:border-[#70e1b2]/50 hover:text-white"
              >
                + {sample}
              </button>
            ))}
          </div>
        </form>
      </div>

      {error && (
        <div
          className="flex items-center gap-3 rounded-2xl border border-[#ff9e9e]/30 bg-[#ff9e9e]/[0.08] p-4 text-xs font-semibold text-[#ffb4b4]"
          role="alert"
        >
          <ShieldAlert
            className="h-5 w-5 shrink-0 text-[#ff9e9e]"
            aria-hidden="true"
          />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div className="animate-rise space-y-6">
          <div className="soft-panel space-y-3 rounded-2xl p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${
                  result.mode === 'demo'
                    ? 'border-[#f1b47d]/40 bg-[#f1b47d]/15 text-[#f7cfa3]'
                    : 'border-[#70e1b2]/40 bg-[#70e1b2]/15 text-[#9ff0cf]'
                }`}
              >
                {result.mode === 'demo'
                  ? 'Limited demo result'
                  : 'Live AI estimate'}
              </span>
              <strong className="text-sm text-white">
                {result.sourceLabel}
              </strong>
            </div>
            <div className="rounded-xl border border-[#f1b47d]/30 bg-[#f1b47d]/[0.08] p-3 text-xs text-[#f7cfa3]">
              <strong className="text-[#f1b47d]">Verification required.</strong>{' '}
              Treat every code and rate as a starting point. Check current
              HTSUS or TARIC data and consult a qualified customs professional
              before importing.
            </div>
          </div>

          {/* Main Tariff Summary Card */}
          <div className="surface-panel space-y-6 rounded-2xl p-6">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-[#7e9cff]/30 bg-[#7e9cff]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#aebfff]">
                    6-digit HS candidate: {result.hsCode6Digit}
                  </span>
                  <span className="flex items-center gap-1 rounded-lg border border-[#70e1b2]/30 bg-[#70e1b2]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#9ff0cf]">
                    10-digit {result.destinationMarket === 'US' ? 'HTS' : 'TARIC'} candidate: {result.hsCode10Digit}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(result.hsCode10Digit)}
                      className="ml-1 text-[#70e1b2] hover:text-white"
                      aria-label="Copy the 10-digit tariff code"
                      title="Copy HS code"
                    >
                      {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-black text-white">{result.productDescription}</h3>
                <p className="mt-0.5 font-mono text-xs text-[#849188]">Category: {result.categoryName} • Origin: {result.originCountry}</p>
              </div>

              {/* Total Duty Rate Highlight Badge */}
              <div className="shrink-0 rounded-2xl border border-[#70e1b2]/40 bg-[#0d1210] p-4 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#849188]">Calculated Component Total</span>
                <span className="text-3xl font-black text-[#70e1b2]">{result.dutyRates.effectiveDutyPercent}%</span>
                <span className="mt-0.5 block font-mono text-[10px] text-[#9ff0cf]">Based on the components below</span>
              </div>
            </div>

            {/* Duty Rate Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-[#849188]">Base Duty ({result.destinationMarket})</p>
                <p className="mt-1 text-xl font-bold text-white">{result.dutyRates.baseDutyPercent}%</p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-[#849188]">
                  {result.destinationMarket === 'US' &&
                  result.originCountry.includes('(CN)')
                    ? 'Section 301 Estimate'
                    : 'Trade-Remedy Estimate'}
                </p>
                <p className="mt-1 text-xl font-bold text-[#f1b47d]">+{result.dutyRates.section301Percent}%</p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-[#849188]">
                  {result.destinationMarket === 'US'
                    ? 'Estimated Customs Fees'
                    : 'Estimated Fees / Taxes'}
                </p>
                <p className="mt-1 text-xl font-bold text-[#cebaff]">+{result.dutyRates.additionalTaxesPercent}%</p>
              </div>

              <div className="rounded-2xl border border-[#70e1b2]/30 bg-[#70e1b2]/[0.08] p-4">
                <p className="text-xs font-bold text-[#9ff0cf]">Component Total</p>
                <p className="mt-1 text-xl font-black text-[#70e1b2]">{result.dutyRates.effectiveDutyPercent}%</p>
              </div>
            </div>

            {/* Detailed Breakdown Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[#849188]">Customs Calculation Details</h4>
              <ul className="space-y-1.5">
                {result.dutyBreakdownNotes.map((note, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-mono text-xs text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#70e1b2]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Warnings */}
            {result.regulatoryWarnings.length > 0 && (
              <div className="space-y-2 rounded-2xl border border-[#f1b47d]/30 bg-[#f1b47d]/[0.08] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f1b47d]">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Import Warnings & Requirements ({result.destinationMarket})</span>
                </div>
                <ul className="list-disc space-y-1 pl-6 text-xs text-[#f7cfa3]">
                  {result.regulatoryWarnings.map((warn, idx) => (
                    <li key={idx}>{warn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Alternative HS Codes Card */}
          {result.alternativeHsCodes.length > 0 && (
            <div className="soft-panel space-y-4 rounded-2xl p-6">
              <h4 className="flex items-center gap-2 text-sm font-extrabold text-white">
                <Percent className="h-4 w-4 text-[#70e1b2]" />
                <span>Potential Alternative HS Codes to Review</span>
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                {result.alternativeHsCodes.map((alt, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#9ff0cf]">{alt.code}</span>
                      <p className="mt-0.5 text-xs font-medium text-gray-300">{alt.description}</p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-[#70e1b2]/20 bg-[#70e1b2]/10 px-2.5 py-1 text-xs font-bold text-[#9ff0cf]">
                      {alt.dutyRate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
