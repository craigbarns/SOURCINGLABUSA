'use client';

import Link from 'next/link';
import { useState } from 'react';
import { assessMarketReadiness, READINESS_CRITERIA, type ReadinessAnswers } from '@/lib/public-tools';
import { trackEvent } from '@/lib/analytics';

const options = ['Not yet documented', 'Partly documented', 'Documented and reviewed'];

export function MarketReadinessAssessment() {
  const [answers, setAnswers] = useState<ReadinessAnswers>({});
  const [completed, setCompleted] = useState(false);
  const result = assessMarketReadiness(answers);
  function download() {
    if (!result) return;
    const body = ['U.S. Market Entry Readiness — self-assessment', `Date: ${new Date().toISOString().slice(0, 10)}`, `Documentation score: ${result.points}/${result.maximum} (${result.percentage}%)`, 'Each criterion has equal weight: 0 not yet, 1 partly, 2 documented and reviewed.', 'This is a self-reported preparation checklist, not legal clearance, demand validation or a prediction of sales.', '', ...READINESS_CRITERIA.map(item => `${item.title}: ${options[answers[item.id] as number]}\nNext step: ${item.action}`)].join('\n\n');
    const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'us-market-entry-readiness.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="not-prose my-10 rounded-2xl border border-brand-line bg-brand-surface p-5 sm:p-8">
    <p className="mb-6 text-sm leading-6 text-brand-muted">Eight questions to identify preparation gaps before approaching American buyers. No email is required. Answers remain in this page and are not sent to a server.</p>
    <form onSubmit={event => { event.preventDefault(); if (result) { setCompleted(true); trackEvent('resource_complete', { resource: 'us_market_entry_assessment' }); } }}>
      <div className="grid gap-7">{READINESS_CRITERIA.map((item, index) => <fieldset key={item.id} className="border-b border-brand-line pb-6">
        <legend className="mb-3 text-base font-semibold">{index + 1}. {item.question}</legend>
        <div className="grid gap-3 sm:grid-cols-3">{options.map((label, value) => <label key={value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-brand-line bg-white p-3 text-sm leading-5">
          <input type="radio" name={item.id} value={value} required checked={answers[item.id] === value} onChange={() => { setAnswers(current => ({ ...current, [item.id]: value })); setCompleted(false); }} className="mt-1" />{label}
        </label>)}</div>
      </fieldset>)}</div>
      <button type="submit" className="editorial-button mt-6">Show my preparation gaps</button>
    </form>
    {completed && result && <section aria-live="polite" className="mt-8 border-t border-brand-line pt-6">
      <h2 className="text-2xl font-medium">Documentation score: {result.points}/{result.maximum} ({result.percentage}%)</h2>
      <p className="mt-3 text-sm leading-6">Each answer scores 0, 1 or 2 with equal weight. This measures your reported preparation, not eligibility to import, market demand or the probability of winning sales. A high total does not resolve a missing product requirement.</p>
      <h3 className="mt-6 text-lg font-semibold">{result.gaps.length ? 'Work to document next' : 'Validate your prepared plan'}</h3>
      {result.gaps.length ? <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6">{result.gaps.map(item => <li key={item.id}><strong>{item.title}:</strong> {item.action}</li>)}</ul> : <p className="mt-3 text-sm leading-6">Test the assumptions with target buyers and have product, legal and import responsibilities reviewed by the appropriate specialists.</p>}
      <div className="mt-6 flex flex-wrap gap-4"><Link href="/us-market-entry#contact" className="editorial-button">Request a U.S. market assessment</Link><button type="button" onClick={download} className="editorial-text-link">Download my worksheet</button></div>
    </section>}
  </div>;
}
