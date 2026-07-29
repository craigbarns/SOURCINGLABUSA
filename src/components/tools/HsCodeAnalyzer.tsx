'use client';

import React, { useState } from 'react';
import { Search, Globe, ShieldAlert, Sparkles, Percent, ArrowRight, BookOpen, AlertTriangle, Copy, Check } from 'lucide-react';
import { analyzeHsCode } from '@/lib/ai-service';
import type { HsCodeAnalysisResult } from '@/lib/types';

const SAMPLE_QUERIES = [
  'Gourdes isothermes en inox 18/8',
  'T-shirts 100% coton tricoté',
  'Sacs à dos isothermes en polyester',
  'Écouteurs sans fil bluetooth',
  'Jouets en bois pour enfants',
];

export const HsCodeAnalyzer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [destinationMarket, setDestinationMarket] = useState<'US' | 'EU'>('US');
  const [originCountry, setOriginCountry] = useState('Chine (CN)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HsCodeAnalysisResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleAnalyze = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeHsCode({
        query: q,
        destinationMarket,
        originCountry,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l’analyse du Code SH.');
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
              Moteur Douanier IA • HTSUS & TARIC
            </div>
            <h2 className="text-2xl font-black text-white">Analyseur de Code SH & Droits de Douane</h2>
            <p className="text-xs text-gray-300">
              Trouvez le Code Harmonisé (HS Code), calculez les droits de douane de base, les surtaxes Section 301 et les frais de douane US/EU.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-gray-800 text-xs font-semibold">
            <button
              onClick={() => setDestinationMarket('US')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                destinationMarket === 'US'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🇺🇸 USA (HTSUS)
            </button>
            <button
              onClick={() => setDestinationMarket('EU')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                destinationMarket === 'EU'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🇪🇺 Europe (TARIC)
            </button>
          </div>
        </div>
      </div>

      {/* Input Search Form */}
      <div className="p-6 rounded-3xl bento-card space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            Décrivez le produit ou saisissez un Code SH (ex: 7323.93 ou &quot;Gourde Inox&quot;)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="ex: Gourde isotherme en inox 18/8 avec bouchon silicone..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Analyse Douanière en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyser le Code SH</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Prompt Chips */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-gray-400 font-mono uppercase">Exemples rapides :</span>
          {SAMPLE_QUERIES.map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setQuery(sample);
                handleAnalyze(sample);
              }}
              className="px-3 py-1 rounded-xl bg-slate-900 border border-gray-800 text-[11px] text-gray-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer"
            >
              + {sample}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Main Tariff Summary Card */}
          <div className="p-6 rounded-3xl bento-card border border-blue-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                    HS 6 Chiffres : {result.hsCode6Digit}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                    HTS 10 Chiffres : {result.hsCode10Digit}
                    <button
                      onClick={() => copyToClipboard(result.hsCode10Digit)}
                      className="ml-1 text-emerald-400 hover:text-white"
                      title="Copier le code SH"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-2">{result.productDescription}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Catégorie : {result.categoryName} • Origine : {result.originCountry}</p>
              </div>

              {/* Total Duty Rate Highlight Badge */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center shrink-0 shadow-lg shadow-emerald-500/10">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Taux Effectif Global</span>
                <span className="text-3xl font-black text-emerald-400">{result.dutyRates.effectiveDutyPercent}%</span>
                <span className="text-[10px] text-emerald-300 font-mono block mt-0.5">Droits total appliqués</span>
              </div>
            </div>

            {/* Duty Rate Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">Droits de Base ({result.destinationMarket})</p>
                <p className="text-xl font-bold text-white mt-1">{result.dutyRates.baseDutyPercent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">Surtaxe Sec 301 (Chine)</p>
                <p className="text-xl font-bold text-amber-400 mt-1">+{result.dutyRates.section301Percent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-gray-800">
                <p className="text-xs text-gray-400 font-medium">Frais Douane MPF / VAT</p>
                <p className="text-xl font-bold text-purple-400 mt-1">+{result.dutyRates.additionalTaxesPercent}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 bg-emerald-950/20">
                <p className="text-xs text-emerald-300 font-bold">Droits Douane Totaux</p>
                <p className="text-xl font-black text-emerald-400 mt-1">{result.dutyRates.effectiveDutyPercent}%</p>
              </div>
            </div>

            {/* Detailed Breakdown Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Détail des Calculs Douaniers</h4>
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
                  <span>Avertissements & Reglementations Importation ({result.destinationMarket})</span>
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
                <span>Codes SH Alternatifs & Optimisation Tarifaire</span>
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
