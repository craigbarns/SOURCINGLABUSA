'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldAlert, FileText, Calculator, Mail, Play, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onLaunchApp: () => void;
  onScrollToWaitlist: () => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onLaunchApp,
  onScrollToWaitlist,
  onOpenDemo,
}) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-grid-pattern">
      {/* Background Gradients & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-blue-300">
              Comparaison structurée de devis fournisseurs
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Source Smarter. <br />
            <span className="gradient-text">Buy Better.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white font-semibold">Pas un annuaire. Pas une marketplace.</strong>
            <br />
            Un pipeline serveur qui extrait vos devis PDF ou images, structure leurs
            données et contrôle leurs montants avant analyse.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 group"
            >
              <span>Ouvrir le comparateur de devis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 border border-gray-700 text-gray-200 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-3 group"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-blue-400" />
              </div>
              <span>Démo vidéo (60s)</span>
            </button>

            <button
              type="button"
              onClick={onScrollToWaitlist}
              className="text-sm font-semibold text-blue-300 hover:text-white rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Rejoindre la liste d&apos;attente
            </button>
          </div>

          {/* Feature Highlights Grid Pill */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/60 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Cahier des charges</p>
                <p className="text-sm font-semibold text-white">Specs & Normes</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/60 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Analyse Devis PDF</p>
                <p className="text-sm font-semibold text-white">Score & Vigilance</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/60 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Calcul des coûts</p>
                <p className="text-sm font-semibold text-white">Coût Rendu & Marge</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/60 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">E-mails Fournisseurs</p>
                <p className="text-sm font-semibold text-white">RFQ & Négociation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic App Preview Card */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl shadow-blue-900/30">
          <div className="bg-slate-950 rounded-[14px] p-4 sm:p-6 overflow-hidden">
            {/* Top Mock Window Control */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-gray-400">sourcinglab.com/copilot-ai</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Aperçu • Données de démonstration
              </div>
            </div>

            {/* Mock Chat / Analysis preview */}
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-gray-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-semibold text-blue-400">Acheteur Sourcing</span>
                  </div>
                  <p className="text-sm text-gray-200 font-medium">
                    &quot;Je charge trois devis fournisseurs pour un sac à dos 35 L et
                    je veux comparer leurs prix, Incoterms, délais et conditions de
                    paiement.&quot;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Pipeline de comparaison
                    </span>
                    <span className="text-gray-400">Exemple non réel</span>
                  </div>
                  
                  <div className="text-xs text-gray-300 space-y-1.5 font-mono">
                    <div className="flex justify-between border-b border-gray-800 pb-1">
                      <span className="text-gray-400">Documents structurés :</span>
                      <span className="text-white">3 devis • même devise</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-1">
                      <span className="text-gray-400">Contrôles :</span>
                      <span className="text-emerald-300 font-semibold">Sommes, quantités, Incoterms</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-1">
                      <span className="text-gray-400">Décision :</span>
                      <span className="text-blue-400 font-bold">Vigilances et données manquantes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Comparatif mathématique
                  </h4>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-extrabold text-white">3 devis <span className="text-xs text-gray-400 font-normal">structurés</span></p>
                      <p className="text-xs text-emerald-400 font-medium">Totaux recalculés et écarts signalés</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 text-sm bg-emerald-500/10">
                      OCR
                    </div>
                  </div>
                  <button 
                    onClick={onLaunchApp}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                  >
                    Ouvrir ce projet dans le Copilote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
