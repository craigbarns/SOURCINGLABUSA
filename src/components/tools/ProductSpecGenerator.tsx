'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, ShieldCheck, DollarSign, Package, AlertCircle } from 'lucide-react';
import { ClientApiError, generateProductSpecs } from '@/lib/ai-service';
import { ProductSpecResult } from '@/lib/types';

export const ProductSpecGenerator: React.FC = () => {
  const [promptInput, setPromptInput] = useState(
    'Je cherche un fabricant de gourdes en inox pour les États-Unis.'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductSpecResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    'Je cherche un fabricant de gourdes en inox 18/8 isothermes pour le marché US.',
    'Sourcing de t-shirts 100% coton bio GOTS 240 GSM personnalisés.',
    'Recherche usine écouteurs Bluetooth TWS avec réduction de bruit ANC & FCC certifié.',
    'Fabricant de sacs à dos de voyage 35 L résistants à la pluie.'
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
          ? e.message
          : "Le cahier des charges n'a pas pu être généré.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `
=== CAHIER DES CHARGES SOURCINGLAB USA ===
Produit: ${result.productTitle}
Marché Cible: ${result.targetMarket}

--- MATÉRIAUX & SPÉCIFICATIONS ---
- Matériaux: ${result.technicalSpecs.materials.join(', ')}
- Dimensions: ${result.technicalSpecs.dimensions}
- Poids: ${result.technicalSpecs.weight}
- Tolérances: ${result.technicalSpecs.tolerances}

	--- EXIGENCES POTENTIELLES À VÉRIFIER ---
	${result.certifications.toVerify.map((c) => `- ${c}`).join('\n')}

	AVERTISSEMENT: ${result.certifications.verificationNotice}

--- TARGET PRICING & MOQ ---
- MOQ Conseillé: ${result.moq.recommended} ${result.moq.unit}
- Prix Cible FOB: ${result.pricingTarget.estimatedFob}
- Coût Rendu estimé US: ${result.pricingTarget.targetLandCost}
- MSRP Suggéré: ${result.pricingTarget.recommendedMSRP}
`;
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setErrorMessage(
          'La copie automatique a échoué. Sélectionnez le contenu du cahier.',
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
          <h3 className="text-base font-bold text-white">Fonction 1 : Décris ton produit</h3>
          <p className="text-xs text-gray-400">
            L&apos;IA traduit votre idée en un cahier des charges technique rigoureux ready-to-send aux usines.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="product-spec-prompt"
          className="block text-xs font-semibold text-gray-300 uppercase tracking-wider"
        >
          Description de votre besoin produit :
        </label>
        <textarea
          id="product-spec-prompt"
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Ex: Je cherche un fabricant de gourdes en inox pour les États-Unis..."
          className="w-full p-4 rounded-xl bg-slate-950 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-gray-500 font-medium">Exemples :</span>
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
              <span>Génération du cahier des charges...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Générer le Cahier des Charges IA</span>
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
              ' — aucune analyse IA n’a été exécutée. Les valeurs inconnues restent à confirmer.'}
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
              <span>{copied ? 'Copié !' : 'Copier le Cahier'}</span>
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Technical Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>Matériaux & Dimensions</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <div>
                  <span className="text-gray-500 block">Matériaux recommandés:</span>
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
                    <span className="text-gray-500 block">Poids unitaire:</span>
                    <span className="text-gray-200">{result.technicalSpecs.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Certifications & Conformité</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-500 block">
                    Exigences potentielles à vérifier :
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
                  <span className="text-gray-500 block">Laboratoires de test recommandés:</span>
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
                <span>Objectifs Prix & MOQ</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Prix Cible FOB Usine</span>
                  <span className="text-base font-bold text-white">{result.pricingTarget.estimatedFob}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Coût Rendu Estimé</span>
                  <span className="text-base font-bold text-emerald-400">{result.pricingTarget.targetLandCost}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">MOQ Recommandé</span>
                  <span className="text-sm font-bold text-blue-400">{result.moq.recommended} {result.moq.unit}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-gray-800">
                  <span className="text-gray-400 block text-[11px]">Prix de Vente MSRP</span>
                  <span className="text-sm font-bold text-purple-300">{result.pricingTarget.recommendedMSRP}</span>
                </div>
              </div>
            </div>

            {/* Quality Control */}
            <div className="p-4 rounded-xl bg-slate-950 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Package className="w-4 h-4" />
                <span>Points de Contrôle Qualité (QC)</span>
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
