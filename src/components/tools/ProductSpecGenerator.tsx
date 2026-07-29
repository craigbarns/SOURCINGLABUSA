'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, ShieldCheck, DollarSign, Package, AlertCircle } from 'lucide-react';
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
  'w-full rounded-xl bg-[#0d1210] border border-white/[0.08] text-white placeholder-[#6f7c74] text-sm focus:outline-none focus:border-[#7e9cff]/60 transition-colors';

export const ProductSpecGenerator: React.FC<ProductSpecGeneratorProps> = () => {
  const [promptInput, setPromptInput] = useState(
    'I need a manufacturer for stainless steel water bottles for the US market.'
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
          ? PRODUCT_SPEC_ERROR_TRANSLATIONS[e.message] ?? e.message
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
      <div className="surface-panel flex items-start gap-3 rounded-2xl p-5">
        <div className="shrink-0 rounded-xl bg-[#7e9cff]/12 p-2.5 text-[#7e9cff]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Product specification generator</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-[#849188]">
            Turn a product idea into a structured factory-ready specification.
            Verify all commercial and regulatory details before use.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="product-spec-prompt"
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#849188]"
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
          <span className="text-xs font-medium text-[#6f7c74]">Examples:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(preset);
                handleGenerate(preset);
              }}
              className="max-w-[280px] truncate rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-[#849188] transition-all hover:border-[#7e9cff]/40 hover:text-white"
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !promptInput.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c7ff6b] to-[#70e1b2] px-8 py-3.5 text-sm font-black text-[#07130c] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <div
                className="h-4 w-4 animate-spin rounded-full border-2 border-[#07130c]/40 border-t-[#07130c]"
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
          className="rounded-xl border border-[#ff9e9e]/30 bg-[#ff9e9e]/[0.08] p-4 text-sm text-[#ffb4b4]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Output Results */}
      {result && (
        <div className="animate-rise surface-panel mt-8 space-y-6 rounded-2xl p-6">
          <div
            className={`rounded-xl border p-3 text-xs ${
              result.mode === 'demo'
                ? 'border-[#f1b47d]/30 bg-[#f1b47d]/[0.08] text-[#f7cfa3]'
                : 'border-[#70e1b2]/30 bg-[#70e1b2]/[0.08] text-[#9ff0cf]'
            }`}
            role="status"
          >
            <strong>{result.sourceLabel}</strong>
            {result.mode === 'demo' &&
              ' — no AI analysis was performed. Unknown values still need confirmation.'}
          </div>

          {/* Output Header */}
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-[#7e9cff]/30 bg-[#7e9cff]/15 px-2 py-0.5 text-xs font-semibold text-[#aebfff]">
                  {result.targetMarket}
                </span>
              </div>
              <h3 className="mt-1 text-xl font-bold text-white">{result.productTitle}</h3>
              <p className="mt-0.5 text-xs text-[#849188]">{result.specsSummary}</p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 self-start rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-gray-200 transition-all hover:bg-white/[0.08] sm:self-center"
            >
              {copied ? <Check className="h-4 w-4 text-[#70e1b2]" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Specification'}</span>
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Technical Specs */}
            <div className="space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#aebfff]">
                <FileText className="h-4 w-4" />
                <span>Materials & Dimensions</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <div>
                  <span className="block text-[#6f7c74]">Recommended materials:</span>
                  <ul className="list-inside list-disc font-medium text-white">
                    {result.technicalSpecs.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="block text-[#6f7c74]">Dimensions:</span>
                    <span className="text-gray-200">{result.technicalSpecs.dimensions}</span>
                  </div>
                  <div>
                    <span className="block text-[#6f7c74]">Unit weight:</span>
                    <span className="text-gray-200">{result.technicalSpecs.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#9ff0cf]">
                <ShieldCheck className="h-4 w-4" />
                <span>Compliance & Documentation</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="block text-[#6f7c74]">
                    Potential requirements to verify:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {result.certifications.toVerify.map((c, i) => (
                      <span key={i} className="rounded border border-[#70e1b2]/20 bg-[#70e1b2]/10 px-2 py-0.5 font-mono text-[#9ff0cf]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-[#6f7c74]">Recommended testing labs:</span>
                  <span className="font-medium text-gray-300">{result.certifications.testingLabs.join(' • ')}</span>
                </div>
                <p className="leading-relaxed text-[#f7cfa3]">
                  {result.certifications.verificationNotice}
                </p>
              </div>
            </div>

            {/* Pricing & MOQ Target */}
            <div className="space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#dfffab]">
                <DollarSign className="h-4 w-4" />
                <span>Pricing & MOQ Targets</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-white/[0.06] bg-[#0d1210] p-2.5">
                  <span className="block text-[11px] text-[#849188]">Target Factory FOB Price</span>
                  <span className="text-base font-bold text-white">{result.pricingTarget.estimatedFob}</span>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-[#0d1210] p-2.5">
                  <span className="block text-[11px] text-[#849188]">Estimated Landed Cost</span>
                  <span className="text-base font-bold text-[#9ff0cf]">{result.pricingTarget.targetLandCost}</span>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-[#0d1210] p-2.5">
                  <span className="block text-[11px] text-[#849188]">Recommended MOQ</span>
                  <span className="text-sm font-bold text-[#aebfff]">{result.moq.recommended} {result.moq.unit}</span>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-[#0d1210] p-2.5">
                  <span className="block text-[11px] text-[#849188]">Suggested MSRP</span>
                  <span className="text-sm font-bold text-[#c7ff6b]">{result.pricingTarget.recommendedMSRP}</span>
                </div>
              </div>
            </div>

            {/* Quality Control */}
            <div className="space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f1b47d]">
                <Package className="h-4 w-4" />
                <span>Quality Control Checkpoints</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.qualityControl.map((qc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f1b47d]" />
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
