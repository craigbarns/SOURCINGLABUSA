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
      <div className="p-6 rounded-3xl bento-card bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 border border-blue-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              AI Customs Engine • HTSUS & TARIC
            </div>
            <h2 className="text-2xl font-black text-white">HS Code & Customs Duty Analyzer</h2>
            <p className="text-xs text-gray-300">
              Identify a potential Harmonized System code and estimate base
              duties, Section 301 tariffs, and US/EU customs fees for review.
            </p>
          </div>

          <fieldset className="space-y-1">
            <legend className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Destination market
            </legend>
            <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-gray-800 text-xs font-semibold">
              <button
                type="button"
                aria-pressed={destinationMarket === 'US'}
                onClick={() => {
                  setDestinationMarket('US');
                  setResult(null);
                  setError(null);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  destinationMarket === 'US'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
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
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  destinationMarket === 'EU'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇪🇺 European Union (TARIC)
              </button>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Input Search Form */}
      <div className="p-6 rounded-3xl bento-card space-y-4">
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
              className="text-xs font-bold text-gray-300 uppercase tracking-wider block"
            >
              Describe the product or enter an HS code
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
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
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                      aria-hidden="true"
                    />
                    <span>Analyzing customs data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Analyze HS Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="max-w-sm">
            <label
              htmlFor="hs-origin-country"
              className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-gray-800 text-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              {ORIGIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>

          {/* Preset Prompt Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-gray-400 font-mono uppercase">
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
                className="px-3 py-1 rounded-xl bg-slate-900 border border-gray-800 text-[11px] text-gray-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer"
              >
                + {sample}
              </button>
            ))}
          </div>
        </form>
      </div>

      {error && (
        <div
          className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-3"
          role="alert"
        >
          <ShieldAlert
            className="w-5 h-5 text-red-400 shrink-0"
            aria-hidden="true"
          />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/30 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${
                  result.mode === 'demo'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-blue-500/15 border-blue-500/40 text-blue-300'
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
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-100">
              <strong className="text-amber-300">Verification required.</strong>{' '}
              Treat every code and rate as a starting point. Check current
              HTSUS or TARIC data and consult a qualified customs professional
              before importing.
            </div>
          </div>

          {/* Main Tariff Summary Card */}
          <div className="p-6 rounded-3xl bento-card border border-blue-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                    6-digit HS candidate: {result.hsCode6Digit}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                    10-digit {result.destinationMarket === 'US' ? 'HTS' : 'TARIC'} candidate: {result.hsCode10Digit}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(result.hsCode10Digit)}
                      className="ml-1 text-emerald-400 hover:text-white"
                      aria-label="Copy the 10-digit tariff code"
                      title="Copy HS code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-2">{result.productDescription}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Category: {result.categoryName} • Origin: {result.originCountry}</p>
              </div>

              {/* Total Duty Rate Highlight Badge */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center shrink-0 shadow-lg shadow-emerald-500/10">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Calculated Component Total</span>
                <span className="text-3xl font-black text-emerald-400">{result.dutyRates.effectiveDutyPercent}%</span>
                <span className="text-[10px] text-emerald-300 font-mono block mt-0.5">Based on the components below</span>
              </div>
            </div>

            {/* Duty Rate Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">Base Duty ({result.destinationMarket})</p>
                <p className="text-xl font-bold text-white mt-1">{result.dutyRates.baseDutyPercent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">
                  {result.destinationMarket === 'US' &&
                  result.originCountry.includes('(CN)')
                    ? 'Section 301 Estimate'
                    : 'Trade-Remedy Estimate'}
                </p>
                <p className="text-xl font-bold text-amber-400 mt-1">+{result.dutyRates.section301Percent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">
                  {result.destinationMarket === 'US'
                    ? 'Estimated Customs Fees'
                    : 'Estimated Fees / Taxes'}
                </p>
                <p className="text-xl font-bold text-purple-400 mt-1">+{result.dutyRates.additionalTaxesPercent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 bg-emerald-950/20">
                <p className="text-xs text-emerald-300 font-bold">Component Total</p>
                <p className="text-xl font-black text-emerald-400 mt-1">{result.dutyRates.effectiveDutyPercent}%</p>
              </div>
            </div>

            {/* Detailed Breakdown Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Customs Calculation Details</h4>
              <ul className="space-y-1.5">
                {result.dutyBreakdownNotes.map((note, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Warnings */}
            {result.regulatoryWarnings.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Import Warnings & Requirements ({result.destinationMarket})</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-200/90 pl-6 list-disc">
                  {result.regulatoryWarnings.map((warn, idx) => (
                    <li key={idx}>{warn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Alternative HS Codes Card */}
          {result.alternativeHsCodes.length > 0 && (
            <div className="p-6 rounded-3xl bento-card space-y-4">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-400" />
                <span>Potential Alternative HS Codes to Review</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {result.alternativeHsCodes.map((alt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-gray-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-400">{alt.code}</span>
                      <p className="text-xs text-gray-300 font-medium mt-0.5">{alt.description}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
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
