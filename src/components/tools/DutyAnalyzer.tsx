'use client';

import React, { useState } from 'react';

import type { DutyResult } from '@/lib/validation/duty';

const ORIGIN_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'CN', label: 'China (CN)' },
  { value: 'BD', label: 'Bangladesh (BD)' },
  { value: 'VN', label: 'Vietnam (VN)' },
  { value: 'IN', label: 'India (IN)' },
  { value: 'OTHER', label: 'Other origin' },
];

export function DutyAnalyzer() {
  const [description, setDescription] = useState('');
  const [originCountry, setOriginCountry] = useState('CN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DutyResult | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/ai/duty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productDescription: description,
          originCountry,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'The duty lookup failed. Please try again.');
        return;
      }
      setResult(data as DutyResult);
    } catch {
      setError('The duty lookup failed. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="editorial-container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Describe the product</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            minLength={20}
            maxLength={1000}
            rows={4}
            placeholder={'Example: "100% cotton men\'s crew neck t-shirts, 180 gsm, screen printed"'}
            className="mt-1 w-full rounded-md border border-brand-ink/15 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Country of manufacture</span>
          <select
            value={originCountry}
            onChange={(event) => setOriginCountry(event.target.value)}
            className="mt-1 w-full rounded-md border border-brand-ink/15 bg-white px-3 py-2 text-sm"
          >
            {ORIGIN_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={isLoading || description.trim().length < 20}
          className="rounded-md bg-brand-ink px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {isLoading ? 'Checking the HTS…' : 'Find candidate codes and rates'}
        </button>
        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {result ? (
        <div className="mt-8 space-y-6">
          <p className="text-xs text-brand-ink/60">
            {result.sourceLabel} · Rates checked {result.dateChecked} ·{' '}
            Origin: {result.originCountryLabel}
          </p>
          {result.rates.map((rate) => (
            <div
              key={rate.code}
              className="rounded-md border border-brand-ink/10 bg-white p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-sm font-semibold">{rate.code}</span>
                <span className="text-lg font-semibold">{rate.baseRate}</span>
              </div>
              <p className="mt-1 text-sm">{rate.description}</p>
              {rate.why ? (
                <p className="mt-1 text-sm italic text-brand-ink/70">{rate.why}</p>
              ) : null}
              <dl className="mt-2 space-y-1 text-xs text-brand-ink/70">
                <div>
                  <dt className="inline font-medium">Special programs: </dt>
                  <dd className="inline">{rate.specialPrograms}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Additional tariffs: </dt>
                  <dd className="inline">{rate.section301Note}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Source: </dt>
                  <dd className="inline">
                    <a
                      href={rate.sourceUrl}
                      className="underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      USITC HTS lookup
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
          <div className="rounded-md border border-brand-ink/10 bg-brand-ink/5 p-4">
            <h3 className="text-sm font-semibold">What this is — and is not</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-brand-ink/80">
              {result.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
