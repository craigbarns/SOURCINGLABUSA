'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Globe,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react';

import { ClientApiError, generateSupplierEmail } from '@/lib/ai-service';
import type { EmailGeneratorInput, EmailGeneratorResult } from '@/lib/types';

const EMAIL_TYPE_LABELS: Record<EmailGeneratorInput['emailType'], string> = {
  rfq: 'Initial request for quotation (RFQ)',
  negotiation: 'Price negotiation / counteroffer',
  sample_request: 'Validation sample request',
  quality_audit: 'Quality audit and test report request',
};

const LANGUAGE_LABELS: Record<EmailGeneratorInput['language'], string> = {
  en: 'English',
  fr: 'French',
  zh: 'Simplified Chinese',
};

const SUPPLIER_EMAIL_ERROR_TRANSLATIONS: Record<string, string> = {
  "L'e-mail fournisseur n'a pas pu être généré.":
    'The supplier email could not be generated.',
  'La réponse du serveur est invalide.':
    'The server returned an invalid response.',
};

const FIELD_CLASS =
  'w-full rounded-lg bg-brand-surface border border-brand-line text-brand-ink text-sm px-3 py-2 focus:outline-none focus:border-brand-plum/60 transition-colors';

export const SupplierEmailGenerator: React.FC = () => {
  const [input, setInput] = useState<EmailGeneratorInput>({
    supplierName: 'Shenzhen Precision Industrial Co., Ltd.',
    contactPerson: 'Sales Dept / Manager',
    productName: 'Stainless Steel Water Bottle 750ml',
    quantity: 3000,
    emailType: 'rfq',
    language: 'en',
    targetPrice: '$4.20',
    specificRequirements:
      'Food-contact compliance evidence to verify, custom laser logo on body.',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailGeneratorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formIsValid =
    input.supplierName.trim().length > 0 &&
    input.productName.trim().length > 0 &&
    Number.isInteger(input.quantity) &&
    input.quantity > 0;

  const handleGenerate = async () => {
    if (!formIsValid) {
      setErrorMessage(
        'Enter a supplier, a product, and a positive whole-number quantity.',
      );
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    try {
      setResult(await generateSupplierEmail(input));
    } catch (error) {
      setErrorMessage(
        error instanceof ClientApiError
          ? (SUPPLIER_EMAIL_ERROR_TRANSLATIONS[error.message] ?? error.message)
          : 'The supplier email could not be generated.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(
        `Subject: ${result.subject}\n\n${result.body}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMessage(
        'Automatic copy failed. Select and copy the email text manually.',
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-panel flex items-start gap-3 rounded-[4px] p-5">
        <div className="shrink-0 rounded-[4px] bg-brand-plum/12 p-2.5 text-brand-plum">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-brand-ink">
            Supplier Email Generator
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">
            Create structured supplier email templates on the server. Always
            verify commercial and regulatory details before sending.
          </p>
        </div>
      </div>

      {errorMessage && (
        <p
          className="rounded-[4px] border border-brand-error/30 bg-brand-error/[0.08] p-3 text-sm text-brand-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="soft-panel space-y-4 rounded-[4px] p-6 lg:col-span-5">
          <h4 className="flex items-center gap-2 border-b border-brand-line pb-3 text-sm font-bold text-brand-ink">
            <Send className="h-4 w-4 text-brand-plum" aria-hidden="true" />
            Email Details
          </h4>

          <div>
            <label
              htmlFor="supplier-email-type"
              className="mb-1 block text-xs text-brand-muted"
            >
              Email purpose
            </label>
            <select
              id="supplier-email-type"
              value={input.emailType}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  emailType: event.target
                    .value as EmailGeneratorInput['emailType'],
                }))
              }
              className={`${FIELD_CLASS} py-2.5`}
            >
              {Object.entries(EMAIL_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="supplier-email-language"
              className="mb-1 flex items-center gap-1.5 text-xs text-brand-muted"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              Message language
            </label>
            <select
              id="supplier-email-language"
              value={input.language}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  language: event.target
                    .value as EmailGeneratorInput['language'],
                }))
              }
              className={`${FIELD_CLASS} py-2.5`}
            >
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="supplier-name"
                className="mb-1 block text-xs text-brand-muted"
              >
                Supplier name
              </label>
              <input
                id="supplier-name"
                type="text"
                value={input.supplierName}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    supplierName: event.target.value,
                  }))
                }
                required
                className={FIELD_CLASS}
              />
            </div>
            <div>
              <label
                htmlFor="supplier-quantity"
                className="mb-1 block text-xs text-brand-muted"
              >
                Quantity (units)
              </label>
              <input
                id="supplier-quantity"
                type="number"
                min="1"
                step="1"
                value={input.quantity}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    quantity: Number(event.target.value),
                  }))
                }
                required
                aria-invalid={
                  Number.isInteger(input.quantity) && input.quantity > 0
                    ? undefined
                    : 'true'
                }
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="supplier-product"
              className="mb-1 block text-xs text-brand-muted"
            >
              Product name
            </label>
            <input
              id="supplier-product"
              type="text"
              value={input.productName}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  productName: event.target.value,
                }))
              }
              required
              className={FIELD_CLASS}
            />
          </div>

          {input.emailType === 'negotiation' && (
            <div>
              <label
                htmlFor="supplier-target-price"
                className="mb-1 block text-xs text-brand-muted"
              >
                Target price
              </label>
              <input
                id="supplier-target-price"
                type="text"
                value={input.targetPrice ?? ''}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    targetPrice: event.target.value,
                  }))
                }
                placeholder="Example: $4.10 / unit"
                className={FIELD_CLASS}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="supplier-requirements"
              className="mb-1 block text-xs text-brand-muted"
            >
              Requirements to request or verify
            </label>
            <textarea
              id="supplier-requirements"
              rows={3}
              value={input.specificRequirements ?? ''}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  specificRequirements: event.target.value,
                }))
              }
              placeholder="Test reports, packaging, tolerances..."
              className={`${FIELD_CLASS} text-xs`}
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !formIsValid}
            className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-brand-green py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span>Generating email…</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Generate Email Template</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4 lg:col-span-7">
          {!result && !loading && (
            <div className="space-y-3 rounded-[4px] border border-dashed border-brand-line bg-brand-surface p-12 text-center">
              <Mail
                className="mx-auto h-10 w-10 text-brand-muted"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-brand-ink">
                Enter the request details to prepare a message for review.
              </p>
            </div>
          )}

          {result && (
            <div className="animate-rise surface-panel space-y-4 rounded-[4px] p-6">
              <div className="flex items-center justify-between gap-3 border-b border-brand-line pb-3">
                <span className="rounded border border-brand-plum/30 bg-brand-plum/15 px-2.5 py-1 text-xs font-bold uppercase text-brand-plum">
                  Review before sending
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg border border-brand-line bg-brand-surface px-3.5 py-1.5 text-xs font-semibold text-brand-ink transition-all hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum"
                >
                  {copied ? (
                    <Check
                      className="h-3.5 w-3.5 text-brand-green"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy All'}</span>
                </button>
              </div>

              <div className="rounded-lg border border-brand-line bg-brand-surface p-3">
                <span className="mb-0.5 block text-[11px] font-semibold uppercase text-brand-muted">
                  Subject
                </span>
                <span className="text-sm font-bold text-brand-ink">
                  {result.subject}
                </span>
              </div>

              <div className="rounded-[4px] border border-brand-line bg-brand-surface p-4">
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-brand-ink">
                  {result.body}
                </pre>
              </div>

              <div className="space-y-2 rounded-[4px] border border-brand-info/25 bg-brand-info/[0.06] p-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-brand-info">
                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Review Notes
                </span>
                <ul className="space-y-1 text-xs text-brand-ink">
                  {result.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
