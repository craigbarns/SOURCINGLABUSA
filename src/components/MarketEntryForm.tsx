'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useRef, useState, useSyncExternalStore } from 'react';

import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { MARKET_ENTRY_COPY } from '@/lib/market-entry-copy';
import { BRIEF_CONTACT_EMAIL, type BriefLocale } from '@/lib/brief-copy';
import { FORM_DELIVERY_TIMEOUT_MS, submitToNetlifyForms } from '@/lib/netlify-forms';
import {
  formatMarketEntryBrief,
  MARKET_ENTRY_FIELDS,
  marketEntryInputSchema,
  marketEntryToContact,
} from '@/lib/validation/market-entry';

const initialValues = {
  name: '', email: '', company: '', country: '', productCategory: '',
  objectives: '', capabilities: '', exportActivity: '', targetCustomers: '',
  expansionBudget: '', botField: '',
};
type Field = keyof typeof initialValues;
type Errors = Partial<Record<Field, string>>;
const inputClass = 'min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#c7ff6b] disabled:opacity-60';
const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-[#8f9c94]';
const subscribe = () => () => {};

export function MarketEntryForm({ formLocation = 'market_entry', locale = 'en' }: { formLocation?: string; locale?: BriefLocale }) {
  const copy = MARKET_ENTRY_COPY[locale];
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const pathname = usePathname();
  const sourcePath = pathname?.startsWith('/') ? pathname : '/us-market-entry';
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const started = useRef(false);
  const success = useRef<HTMLDivElement>(null);
  const disabled = !ready || status === 'submitting';

  function localizedErrors(fields: Record<string, unknown>): Errors {
    return Object.fromEntries(Object.keys(fields)
      .filter((field) => field in copy.errors)
      .map((field) => [field, copy.errors[field as keyof typeof copy.errors]]));
  }

  function update(field: Field, value: string) {
    if (!started.current) {
      started.current = true;
      trackEvent(ANALYTICS_EVENTS.formStart, { form_location: formLocation, source_path: sourcePath, lead_journey: 'market_entry' });
    }
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  const input = (field: Field, label: string, required: boolean, maximum: number, multiline = false) => {
    const props = {
      id: `${id}-${field}`, name: field, value: values[field], required, disabled,
      maxLength: maximum, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field, event.target.value),
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
      className: inputClass,
    };
    return <div key={field}>
      <label htmlFor={props.id} className={labelClass}>{label}{required ? ' *' : ''}</label>
      {multiline ? <textarea {...props} rows={3} /> : <input {...props} type={field === 'email' ? 'email' : 'text'} autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : field === 'company' ? 'organization' : field === 'country' ? 'country-name' : undefined} />}
      {errors[field] && <p id={`${id}-${field}-error`} role="alert" className="mt-2 text-xs text-[#b42318]">{errors[field]}</p>}
    </div>;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const validation = marketEntryInputSchema.safeParse({ ...values, journey: 'market_entry', sourcePath, locale });
    if (!validation.success) {
      setErrors(localizedErrors(validation.error.flatten().fieldErrors));
      trackEvent(ANALYTICS_EVENTS.formError, { form_location: formLocation, error_reason: 'client_validation', lead_journey: 'market_entry' });
      return;
    }
    setStatus('submitting');
    setErrors({});
    const [outcome, notified] = await Promise.all([
      (async () => {
        try {
          const response = await fetch('/api/contact', { method: 'POST', signal: AbortSignal.timeout(FORM_DELIVERY_TIMEOUT_MS), headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(validation.data) });
          const body = await response.json();
          return { stored: response.ok && Array.isArray(body.delivery) && body.delivery.includes('database'), fieldErrors: response.status === 400 ? body.fieldErrors : undefined };
        } catch { return { stored: false }; }
      })(),
      submitToNetlifyForms(marketEntryToContact(validation.data)),
    ]);
    if (outcome.fieldErrors || (!outcome.stored && !notified)) {
      if (outcome.fieldErrors) setErrors(localizedErrors(outcome.fieldErrors));
      setStatus('error');
      setMessage(copy.failure);
      trackEvent(ANALYTICS_EVENTS.formError, { form_location: formLocation, error_reason: outcome.fieldErrors ? 'server_validation' : 'no_channel', lead_journey: 'market_entry' });
      return;
    }
    setStatus('success');
    trackEvent(ANALYTICS_EVENTS.lead, { form_location: formLocation, source_path: sourcePath, lead_journey: 'market_entry', stored: outcome.stored, notified });
    window.requestAnimationFrame(() => success.current?.focus());
  }

  if (status === 'success') return <div ref={success} tabIndex={-1} role="status" className="contact-success">
    <h3>{copy.successTitle}</h3>
    <p>{copy.successBody}</p>
    <button type="button" className="mt-5 underline" onClick={() => { setValues(initialValues); started.current = false; setStatus('idle'); }}>{copy.reset}</button>
  </div>;

  const emailBody = `Name: ${values.name}\nEmail: ${values.email}\n${formatMarketEntryBrief(values)}`;
  return <form className="contact-form grid gap-5" action="/api/contact" method="post" noValidate onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
    <p className="text-sm">{copy.intro}</p>
    <div hidden aria-hidden="true"><label htmlFor={`${id}-trap`}>Leave this field empty</label><input id={`${id}-trap`} name="bot-field" type="text" tabIndex={-1} autoComplete="off" maxLength={200} disabled={disabled} value={values.botField} onChange={(event) => update('botField', event.target.value)} /></div>
    <div className="grid gap-5 sm:grid-cols-2">{input('name', copy.labels.name, true, 120)}{input('email', copy.labels.email, true, 254)}</div>
    <div className="grid gap-5 sm:grid-cols-2">{input('company', copy.labels.company, true, 160)}{input('country', copy.labels.country, true, 100)}</div>
    {input('productCategory', copy.labels.productCategory, true, 160)}
    {input('objectives', copy.labels.objectives, true, 900, true)}
    <details className="contact-qualification"><summary>{copy.details}</summary><div className="mt-5 grid gap-5">
      {MARKET_ENTRY_FIELDS.filter((field) => !field.required).map((field) => input(field.key, copy.labels[field.key], false, field.maxLength, field.key !== 'expansionBudget'))}
    </div></details>
    <button type="submit" disabled={disabled} className="contact-submit min-h-12 rounded-xl bg-[#c7ff6b] px-6 py-3 text-sm font-bold text-[#0a0d0b] disabled:opacity-60">{status === 'submitting' ? copy.submitting : copy.submit}</button>
    <p className="text-xs leading-6">{copy.privacy} <Link href="/privacy" className="underline">{copy.privacyLink}</Link>.</p>
    {message && <div role="alert"><p>{message}</p><a className="mt-3 inline-block underline" href={`mailto:${BRIEF_CONTACT_EMAIL}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(emailBody)}`} onClick={() => trackEvent(ANALYTICS_EVENTS.emailFallback, { form_location: formLocation, lead_journey: 'market_entry' })}>{copy.fallback}</a></div>}
  </form>;
}
