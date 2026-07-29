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
      <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Product specification generator</h3>
          <p className="text-xs text-gray-400">
            Turn a product idea into a structured factory-ready specification.
            Verify all commercial and regulatory details before use.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="product-spec-prompt"
          className="block text-xs font-semibold text-gray-300 uppercase tracking-wider"
        >
          Describe your product requirements
        </label>
        <textarea
          id="product-spec-prompt"
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Example: I need a manufacturer for insulated stainless steel water bottles for the US market..."
          className="w-full p-4 rounded-xl bg-slate-950 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-gray-500 font-medium">Examples:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(preset);
                handleGenerate(preset);
              }}
              className="text-xs px-2.5 py-1 rounded-lg border border-gray-800 bg-slate-900 text-gray-300 hover:text-white hover:border-gray-700 transition-all truncate max-w-[280px]"
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !promptInput.trim()}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
              <span>Generating specification...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Product Specification</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <p
          className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Output Results */}
      {result && (
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-6 animate-fadeIn">
          <div
            className={`p-3 rounded-xl border text-xs ${
              result.mode === 'demo'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
            }`}
            role="status"
          >
            <strong>{result.sourceLabel}</strong>
            {result.mode === 'demo' &&
              ' — no AI analysis was performed. Unknown values still need confirmation.'}
          </div>

          {/* Output Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                  {result.targetMarket}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{result.productTitle}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{result.specsSummary}</p>
            </div>

            <button
              onClick={handleCopy}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-gray-200 flex items-center gap-2 border border-gray-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Specification'}</span>
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Technical Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>Materials & Dimensions</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <div>
                  <span className="text-gray-500 block">Recommended materials:</span>
                  <ul className="list-disc list-inside text-white font-medium">
                    {result.technicalSpecs.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-gray-500 block">Dimensions:</span>
                    <span className="text-gray-200">{result.technicalSpecs.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Unit weight:</span>
                    <span className="text-gray-200">{result.technicalSpecs.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Compliance & Documentation</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-500 block">
                    Potential requirements to verify:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {result.certifications.toVerify.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block">Recommended testing labs:</span>
                  <span className="text-gray-300 font-medium">{result.certifications.testingLabs.join(' • ')}</span>
                </div>
                <p className="text-amber-300/90 leading-relaxed">
                  {result.certifications.verificationNotice}
                </p>
              </div>
            </div>

            {/* Pricing & MOQ Target */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <DollarSign className="w-4 h-4" />
                <span>Pricing & MOQ Targets</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Target Factory FOB Price</span>
                  <span className="text-base font-bold text-white">{result.pricingTarget.estimatedFob}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Estimated Landed Cost</span>
                  <span className="text-base font-bold text-emerald-400">{result.pricingTarget.targetLandCost}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Recommended MOQ</span>
                  <span className="text-sm font-bold text-blue-400">{result.moq.recommended} {result.moq.unit}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Suggested MSRP</span>
                  <span className="text-sm font-bold text-purple-300">{result.pricingTarget.recommendedMSRP}</span>
                </div>
              </div>
            </div>

            {/* Quality Control */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Package className="w-4 h-4" />
                <span>Quality Control Checkpoints</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {result.qualityControl.map((qc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
