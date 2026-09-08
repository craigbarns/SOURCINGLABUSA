'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  DollarSign,
  Package,
  AlertCircle,
} from 'lucide-react';
import { ClientApiError, generateProductSpecs } from '@/lib/ai-service';
import type { ProductSpecResult } from '@/lib/types';

interface ProductSpecGeneratorProps {
  userApiKey?: string;
}

const PRODUCT_SPEC_ERROR_TRANSLATIONS: Record<string, string> = {
  "Le cahier des charges n'a pas pu être généré.":
    'The product specification could not be generated.',
  'La réponse du serveur est invalide.':
    'The server returned an invalid response.',
};

const INPUT_CLASS =
  'w-full rounded-[4px] bg-brand-surface border border-brand-line text-brand-ink placeholder-brand-muted text-sm focus:outline-none focus:border-brand-info/60 transition-colors';

export const ProductSpecGenerator: React.FC<ProductSpecGeneratorProps> = () => {
  const [promptInput, setPromptInput] = useState(
    'I need a manufacturer for stainless steel water bottles for the US market.',
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductSpecResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    '18/8 stainless steel insulated water bottles for the US market.',
    'Custom 240 GSM GOTS organic cotton T-shirts.',
    'TWS Bluetooth earbuds with ANC for the US market.',
    'Water-resistant 35 L travel backpacks.',
  ];

  const handleGenerate = async (queryText?: string) => {
    const textToUse = queryText || promptInput;
    if (!textToUse.trim()) return;

    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await generateProductSpecs(textToUse);
      setResult(data);
    } catch (e) {
      setErrorMessage(
        e instanceof ClientApiError
          ? (PRODUCT_SPEC_ERROR_TRANSLATIONS[e.message] ?? e.message)
          : 'The product specification could not be generated.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `
=== SOURCINGLAB USA PRODUCT SPECIFICATION ===
Product: ${result.productTitle}
Target Market: ${result.targetMarket}

--- MATERIALS & SPECIFICATIONS ---
- Materials: ${result.technicalSpecs.materials.join(', ')}
- Dimensions: ${result.technicalSpecs.dimensions}
- Weight: ${result.technicalSpecs.weight}
- Tolerances: ${result.technicalSpecs.tolerances}

	--- POTENTIAL REQUIREMENTS TO VERIFY ---
	${result.certifications.toVerify.map((c) => `- ${c}`).join('\n')}

	NOTICE: ${result.certifications.verificationNotice}

--- TARGET PRICING & MOQ ---
- Recommended MOQ: ${result.moq.recommended} ${result.moq.unit}
- Target FOB Price: ${result.pricingTarget.estimatedFob}
- Estimated Landed Cost: ${result.pricingTarget.targetLandCost}
- Suggested MSRP: ${result.pricingTarget.recommendedMSRP}
`;
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setErrorMessage(
          'Automatic copy failed. Select and copy the specification manually.',
        );
      });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="surface-panel flex items-start gap-3 rounded-[4px] p-5">
        <div className="shrink-0 rounded-[4px] bg-brand-info/12 p-2.5 text-brand-info">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-brand-ink">
            Product specification generator
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">
            Turn a product idea into a structured factory-ready specification.
            Verify all commercial and regulatory details before use.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="product-spec-prompt"
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-brand-muted"
        >
          Describe your product requirements
        </label>
        <textarea
          id="product-spec-prompt"
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Example: I need a manufacturer for insulated stainless steel water bottles for the US market..."
          className={`${INPUT_CLASS} p-4`}
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-brand-muted">
            Examples:
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(preset);
                handleGenerate(preset);
              }}
              className="max-w-[280px] truncate rounded-lg border border-brand-line bg-brand-surface px-2.5 py-1 text-xs text-brand-muted transition-all hover:border-brand-info/40 hover:text-brand-ink"
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !promptInput.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-brand-green px-8 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <div
                className="h-4 w-4 animate-spin rounded-full border-2 border-brand-line/40 border-t-[#07130c]"
                aria-hidden="true"
              />
              <span>Generating specification...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Generate Product Specification</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <p
          className="rounded-[4px] border border-brand-error/30 bg-brand-error/[0.08] p-4 text-sm text-brand-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Output Results */}
      {result && (
        <div className="animate-rise surface-panel mt-8 space-y-6 rounded-[4px] p-6">
          <div
            className={`rounded-[4px] border p-3 text-xs ${
              result.mode === 'demo'
                ? 'border-brand-warning/30 bg-brand-warning/[0.08] text-brand-warning'
                : 'border-brand-green/30 bg-brand-green/[0.08] text-brand-green'
            }`}
            role="status"
          >
            <strong>{result.sourceLabel}</strong>
            {result.mode === 'demo' &&
              ' — no AI analysis was performed. Unknown values still need confirmation.'}
          </div>

          {/* Output Header */}
          <div className="flex flex-col justify-between gap-3 border-b border-brand-line pb-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-brand-info/30 bg-brand-info/15 px-2 py-0.5 text-xs font-semibold text-brand-info">
                  {result.targetMarket}
                </span>
              </div>
              <h3 className="mt-1 text-xl font-bold text-brand-ink">
                {result.productTitle}
              </h3>
              <p className="mt-0.5 text-xs text-brand-muted">
                {result.specsSummary}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 self-start rounded-[4px] border border-brand-line bg-brand-surface px-4 py-2 text-xs font-semibold text-brand-ink transition-all hover:bg-brand-surface sm:self-center"
            >
              {copied ? (
                <Check className="h-4 w-4 text-brand-green" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? 'Copied!' : 'Copy Specification'}</span>
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Technical Specs */}
            <div className="space-y-3 rounded-[4px] border border-brand-line bg-brand-surface p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-info">
                <FileText className="h-4 w-4" />
                <span>Materials & Dimensions</span>
              </div>
              <div className="space-y-2 text-xs text-brand-ink">
                <div>
                  <span className="block text-brand-muted">
                    Recommended materials:
                  </span>
                  <ul className="list-inside list-disc font-medium text-brand-ink">
                    {result.technicalSpecs.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="block text-brand-muted">Dimensions:</span>
                    <span className="text-brand-ink">
                      {result.technicalSpecs.dimensions}
                    </span>
                  </div>
                  <div>
                    <span className="block text-brand-muted">Unit weight:</span>
                    <span className="text-brand-ink">
                      {result.technicalSpecs.weight}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3 rounded-[4px] border border-brand-line bg-brand-surface p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-green">
                <ShieldCheck className="h-4 w-4" />
                <span>Compliance & Documentation</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="block text-brand-muted">
                    Potential requirements to verify:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {result.certifications.toVerify.map((c, i) => (
                      <span
                        key={i}
                        className="rounded border border-brand-green/20 bg-brand-green/10 px-2 py-0.5 font-mono text-brand-green"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-brand-muted">
                    Recommended testing labs:
                  </span>
                  <span className="font-medium text-brand-ink">
                    {result.certifications.testingLabs.join(' • ')}
                  </span>
                </div>
                <p className="leading-relaxed text-brand-warning">
                  {result.certifications.verificationNotice}
                </p>
              </div>
            </div>

            {/* Pricing & MOQ Target */}
            <div className="space-y-3 rounded-[4px] border border-brand-line bg-brand-surface p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-green">
                <DollarSign className="h-4 w-4" />
                <span>Pricing & MOQ Targets</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-brand-line bg-brand-surface p-2.5">
                  <span className="block text-[11px] text-brand-muted">
                    Target Factory FOB Price
                  </span>
                  <span className="text-base font-bold text-brand-ink">
                    {result.pricingTarget.estimatedFob}
                  </span>
                </div>
                <div className="rounded-lg border border-brand-line bg-brand-surface p-2.5">
                  <span className="block text-[11px] text-brand-muted">
                    Estimated Landed Cost
                  </span>
                  <span className="text-base font-bold text-brand-green">
                    {result.pricingTarget.targetLandCost}
                  </span>
                </div>
                <div className="rounded-lg border border-brand-line bg-brand-surface p-2.5">
                  <span className="block text-[11px] text-brand-muted">
                    Recommended MOQ
                  </span>
                  <span className="text-sm font-bold text-brand-info">
                    {result.moq.recommended} {result.moq.unit}
                  </span>
                </div>
                <div className="rounded-lg border border-brand-line bg-brand-surface p-2.5">
                  <span className="block text-[11px] text-brand-muted">
                    Suggested MSRP
                  </span>
                  <span className="text-sm font-bold text-brand-green">
                    {result.pricingTarget.recommendedMSRP}
                  </span>
                </div>
              </div>
            </div>

            {/* Quality Control */}
            <div className="space-y-3 rounded-[4px] border border-brand-line bg-brand-surface p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-warning">
                <Package className="h-4 w-4" />
                <span>Quality Control Checkpoints</span>
              </div>
              <ul className="space-y-1.5 text-xs text-brand-ink">
                {result.qualityControl.map((qc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-warning" />
                    <span>{qc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
