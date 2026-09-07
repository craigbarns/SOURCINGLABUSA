'use client';

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useMemo, useRef, useState } from 'react';

import {
  ANALYTICS_EVENTS,
  trackEvent,
} from '@/lib/analytics';
import {
  BRIEF_CONTACT_EMAIL,
  BRIEF_FORM_COPY,
  type BriefFormCopy,
  type BriefLocale,
} from '@/lib/brief-copy';
import {
  contactInputSchema,
  PROJECT_TYPE_VALUES,
  QUANTITY_RANGE_VALUES,
  type ProjectType,
  type QuantityRange,
} from '@/lib/validation/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldName = keyof BriefFormCopy['fieldErrors'];

type FieldErrors = Partial<Record<FieldName, string>>;

interface ContactFormProps {
  locale?: BriefLocale;
  /** Where the form is rendered, reported with the conversion event. */
  formLocation?: string;
}

const inputClassName =
  'min-h-12 w-full rounded-xl border border-white/10 bg-[#0a0e0c] px-4 py-3 text-sm text-white placeholder-[#5d6962] transition focus:border-[#c7ff6b] focus:outline-none focus:ring-1 focus:ring-[#c7ff6b] disabled:opacity-60';
const labelClassName =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-[#8f9c94]';

const emptyValues = {
  name: '',
  email: '',
  company: '',
  projectType: '' as ProjectType | '',
  quantityRange: 'not_sure' as QuantityRange,
  message: '',
};

export function ContactForm({
  locale = 'en',
  formLocation = 'contact_section',
}: ContactFormProps) {
  const copy = BRIEF_FORM_COPY[locale];
  const pathname = usePathname();
  const fieldId = useId();
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const hasStarted = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const sourcePath = pathname && pathname.startsWith('/') ? pathname : '/';

  const mailtoHref = useMemo(() => {
    const lines = [
      `${copy.nameLabel}: ${values.name}`,
      `${copy.companyLabel}: ${values.company}`,
      `${copy.projectTypeLabel} ${
        values.projectType ? copy.projectTypeOptions[values.projectType] : ''
      }`,
      `${copy.quantityLabel}: ${copy.quantityOptions[values.quantityRange]}`,
      '',
      values.message,
    ];

    return `mailto:${BRIEF_CONTACT_EMAIL}?subject=${encodeURIComponent(
      copy.fallbackSubject,
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
  }, [copy, values]);

  const updateValue = <Key extends keyof typeof emptyValues>(
    key: Key,
    value: (typeof emptyValues)[Key],
  ) => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent(ANALYTICS_EVENTS.formStart, {
        form_location: formLocation,
        source_path: sourcePath,
      });
    }

    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!(key in current)) {
        return current;
      }

      const next = { ...current };
      delete next[key as FieldName];
      return next;
    });
  };

  const failWith = (errors: FieldErrors, message: string | null, reason: string) => {
    setFieldErrors(errors);
    setGeneralError(message);
    setStatus(message ? 'error' : 'idle');
    trackEvent(ANALYTICS_EVENTS.formError, {
      form_location: formLocation,
      error_reason: reason,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const payload = {
      name: values.name,
      email: values.email,
      company: values.company,
      projectType: values.projectType,
      quantityRange: values.quantityRange,
      message: values.message,
      sourcePath,
      botField: '',
    };

    const validation = contactInputSchema.safeParse(payload);

    if (!validation.success) {
      const invalidFields = Object.keys(
        validation.error.flatten().fieldErrors,
      ) as FieldName[];

      failWith(
        Object.fromEntries(
          invalidFields
            .filter((field) => field in copy.fieldErrors)
            .map((field) => [field, copy.fieldErrors[field]]),
        ),
        null,
        'client_validation',
      );
      return;
    }

    setStatus('submitting');
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let serverMessage: string | undefined;
        let serverFieldErrors: FieldErrors = {};

        try {
          const body = (await response.json()) as {
            message?: string;
            fieldErrors?: Record<string, string | undefined>;
          };
          serverMessage = body.message;
          serverFieldErrors = Object.fromEntries(
            Object.entries(body.fieldErrors ?? {}).filter(
              (entry): entry is [FieldName, string] =>
                typeof entry[1] === 'string' && entry[0] in copy.fieldErrors,
            ),
          );
        } catch {
          // A non-JSON error response falls back to the generic message.
        }

        failWith(
          serverFieldErrors,
          serverMessage ?? copy.genericError,
          `http_${response.status}`,
        );
        return;
      }

      setStatus('success');
      trackEvent(ANALYTICS_EVENTS.lead, {
        form_location: formLocation,
        source_path: sourcePath,
        project_type: validation.data.projectType,
        quantity_range: validation.data.quantityRange,
        has_brief: validation.data.message.length > 0,
      });
      window.requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      failWith({}, copy.genericError, 'network');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="rounded-2xl border border-[#70e1b2]/20 bg-[#70e1b2]/[0.07] p-7 outline-none sm:p-9"
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#70e1b2]/12 text-[#70e1b2]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-white">
          {copy.successTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#94a198]">{copy.successBody}</p>

        <ol className="mt-7 space-y-4 border-t border-white/[0.08] pt-6">
          {copy.successSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-[11px] font-black text-[#dfffab]">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-[#c2ccc6]">{step}</p>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => {
            setValues(emptyValues);
            hasStarted.current = false;
            setStatus('idle');
          }}
          className="mt-7 text-xs font-bold text-[#aebfff] transition-colors hover:text-white"
        >
          {copy.successReset}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${fieldId}-name`} className={labelClassName}>
            {copy.nameLabel}
          </label>
          <input
            id={`${fieldId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            value={values.name}
            disabled={status === 'submitting'}
            onChange={(event) => updateValue('name', event.target.value)}
            aria-invalid={fieldErrors.name ? 'true' : undefined}
            aria-describedby={fieldErrors.name ? `${fieldId}-name-error` : undefined}
            className={inputClassName}
          />
          {fieldErrors.name && (
            <p id={`${fieldId}-name-error`} role="alert" className="mt-2 text-xs text-[#ff9d96]">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${fieldId}-email`} className={labelClassName}>
            {copy.emailLabel}
          </label>
          <input
            id={`${fieldId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={copy.emailPlaceholder}
            value={values.email}
            disabled={status === 'submitting'}
            onChange={(event) => updateValue('email', event.target.value)}
            aria-invalid={fieldErrors.email ? 'true' : undefined}
            aria-describedby={fieldErrors.email ? `${fieldId}-email-error` : undefined}
            className={inputClassName}
          />
          {fieldErrors.email && (
            <p id={`${fieldId}-email-error`} role="alert" className="mt-2 text-xs text-[#ff9d96]">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${fieldId}-company`} className={labelClassName}>
            {copy.companyLabel}{' '}
            <span className="font-medium normal-case tracking-normal text-[#67736c]">
              ({copy.companyOptional})
            </span>
          </label>
          <input
            id={`${fieldId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={copy.companyPlaceholder}
            value={values.company}
            disabled={status === 'submitting'}
            onChange={(event) => updateValue('company', event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor={`${fieldId}-quantity`} className={labelClassName}>
            {copy.quantityLabel}
          </label>
          <div className="relative">
            <select
              id={`${fieldId}-quantity`}
              name="quantityRange"
              value={values.quantityRange}
              disabled={status === 'submitting'}
              onChange={(event) =>
                updateValue('quantityRange', event.target.value as QuantityRange)
              }
              className={`${inputClassName} appearance-none pr-11`}
            >
              {QUANTITY_RANGE_VALUES.map((value) => (
                <option key={value} value={value}>
                  {copy.quantityOptions[value]}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f8d85]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor={`${fieldId}-project-type`} className={labelClassName}>
          {copy.projectTypeLabel}
        </label>
        <div className="relative">
          <select
            id={`${fieldId}-project-type`}
            name="projectType"
            value={values.projectType}
            disabled={status === 'submitting'}
            onChange={(event) =>
              updateValue('projectType', event.target.value as ProjectType)
            }
            aria-invalid={fieldErrors.projectType ? 'true' : undefined}
            aria-describedby={
              fieldErrors.projectType ? `${fieldId}-project-type-error` : undefined
            }
            className={`${inputClassName} appearance-none pr-11`}
          >
            <option value="" disabled>
              {copy.projectTypePlaceholder}
            </option>
            {PROJECT_TYPE_VALUES.map((value) => (
              <option key={value} value={value}>
                {copy.projectTypeOptions[value]}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f8d85]"
            aria-hidden="true"
          />
        </div>
        {fieldErrors.projectType && (
          <p
            id={`${fieldId}-project-type-error`}
            role="alert"
            className="mt-2 text-xs text-[#ff9d96]"
          >
            {fieldErrors.projectType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${fieldId}-message`} className={labelClassName}>
          {copy.messageLabel}{' '}
          <span className="font-medium normal-case tracking-normal text-[#67736c]">
            ({copy.messageOptional})
          </span>
        </label>
        <textarea
          id={`${fieldId}-message`}
          name="message"
          rows={4}
          placeholder={copy.messagePlaceholder}
          value={values.message}
          disabled={status === 'submitting'}
          onChange={(event) => updateValue('message', event.target.value)}
          aria-describedby={`${fieldId}-message-hint`}
          className={`${inputClassName} resize-none py-3.5`}
        />
        <p id={`${fieldId}-message-hint`} className="mt-2 text-[11px] leading-5 text-[#65726a]">
          {copy.messageHint}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] shadow-[0_12px_40px_rgba(199,255,107,0.14)] transition hover:bg-[#d7ff94] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? copy.submitting : copy.submit}
        {status === 'submitting' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </button>

      <p className="flex items-start gap-2 text-[11px] leading-5 text-[#7e8a83]">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#70e1b2]" aria-hidden="true" />
        <span>
          {copy.privacy}{' '}
          <Link
            href="/privacy"
            className="font-semibold text-[#a9b5ae] underline underline-offset-2 transition-colors hover:text-white"
          >
            {copy.privacyLink}
          </Link>
        </span>
      </p>

      {generalError && (
        <div
          role="alert"
          className="rounded-xl border border-[#f1b47d]/25 bg-[#f1b47d]/[0.07] p-4"
        >
          <p className="flex items-start gap-2 text-sm font-semibold text-[#f4c79c]">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {generalError}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#c9d3cd]">{copy.fallbackIntro}</p>
          <a
            href={mailtoHref}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.emailFallback, {
                form_location: formLocation,
              })
            }
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-xs font-bold text-white transition hover:bg-white/[0.1]"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.fallbackCta}
          </a>
        </div>
      )}
    </form>
  );
}
