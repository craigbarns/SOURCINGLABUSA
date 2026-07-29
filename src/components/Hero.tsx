'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldAlert, FileText, Calculator, Mail, Play, CheckCircle2, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLaunchApp?: () => void;
  onScrollToWaitlist?: () => void;
  onOpenDemo?: () => void;
  appHref?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onLaunchApp,
  onScrollToWaitlist,
  onOpenDemo,
  appHref,
}) => {
  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-grid-pattern">
      {/* Background Gradients & Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl shadow-lg shadow-blue-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-blue-300">
              Le Copilote IA n°1 pour le Sourcing de Produits & Négociation Usine
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Source Smarter. <br />
            <span className="gradient-text">Buy Better.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white font-semibold">Pas un annuaire. Pas une marketplace.</strong>
            <br />
            Un expert IA dédié qui rédige vos cahiers des charges, inspecte vos devis PDF, calcule votre coût rendu net DDP et négocie avec vos fournisseurs.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-extrabold text-base hover:opacity-95 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Essayer le Copilote IA (Accès Direct)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 border border-gray-800 text-gray-200 font-bold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-blue-400" />
              </div>
              <span>Démo vidéo (60s)</span>
            </button>
          </div>

          {/* Value Stats Pills */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Gain de Temps</p>
                <p className="text-sm font-extrabold text-white">85% plus rapide</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Prix Négociés</p>
                <p className="text-sm font-extrabold text-emerald-400">+14.2% Marge</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Calcul Douanes</p>
                <p className="text-sm font-extrabold text-white">DDP Précis à 100%</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Normes US/EU</p>
                <p className="text-sm font-extrabold text-amber-300">FDA, Prop65, CE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive App Preview Container */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-gray-700 via-gray-800/80 to-gray-900 shadow-2xl shadow-blue-900/30">
          <div className="bg-slate-950 rounded-[22px] p-5 sm:p-7 overflow-hidden">
            {/* Top Mock Window Control */}
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-gray-400">sourcinglabusa.com/workspace</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mistral OCR & OpenAI Active
              </div>
            </div>

            {/* Mock Chat / Analysis preview */}
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="font-bold text-blue-400">Acheteur Sourcing</span>
                    <span className="font-mono text-[10px]">Prompt initial</span>
                  </div>
                  <p className="text-sm text-gray-200 font-medium leading-relaxed">
                    &quot;Je cherche un fabricant de gourdes en inox 18/8 pour les États-Unis. Mon budget FOB cible est de $3.50 avec MOQ 1000 pcs.&quot;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-blue-500/30 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      SourcingLab Copilote IA
                    </span>
                    <span className="text-gray-400 font-mono">Réponse en 0.8s</span>
                  </div>

                  <div className="text-xs text-gray-300 space-y-2 font-mono">
                    <div className="flex justify-between border-b border-gray-800/80 pb-1">
                      <span className="text-gray-400">Matériaux Recommandés:</span>
                      <span className="text-white font-semibold">Inox 304 Food-Grade + Silicon BPA Free</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800/80 pb-1">
                      <span className="text-gray-400">Certifications US Obligatoires:</span>
                      <span className="text-emerald-300 font-bold">FDA 21 CFR, California Prop 65</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800/80 pb-1">
                      <span className="text-gray-400">Target FOB Usine:</span>
                      <span className="text-blue-400 font-bold">$3.20 - $3.80 / pcs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-3">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Score de Devis Rendu DDP
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      Calculé
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-white">$5.85 <span className="text-xs text-gray-400 font-normal">/ unité rendue US</span></p>
                      <p className="text-xs text-emerald-400 font-semibold mt-1">Marge brute estimée : 72%</p>
                    </div>
                    <div className="w-14 h-14 rounded-full border-2 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-base bg-emerald-500/10 shadow-lg shadow-emerald-500/20">
                      88/100
                    </div>
                  </div>

                  <button
                    onClick={onLaunchApp}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Ouvrir dans le Copilote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
