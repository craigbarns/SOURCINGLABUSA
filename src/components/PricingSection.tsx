'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-slate-950/80 relative border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            Investissement Rentable
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tarification transparente. <br />
            <span className="gradient-text">Rentabilisé dès la 1ère négociation.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Économisez des milliers de dollars en évitant les surtarifications et les pièges de devis usine.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>Mensuel</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-900 p-1 border border-gray-700 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                  isAnnual ? 'translate-x-6 bg-emerald-400' : 'translate-x-0 bg-blue-500'
                }`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Annuel
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                -20% Réduction
              </span>
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 grid md:grid-cols-3 gap-8 items-stretch">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bento-card flex flex-col justify-between hover:border-gray-700 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
              <p className="mt-2 text-xs text-gray-400">Pour créateurs de marque & 1er produit</p>

              <div className="mt-6">
                <span className="text-5xl font-black text-white">
                  ${isAnnual ? '29' : '39'}
                </span>
                <span className="text-xs text-gray-400"> / mois</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10 Cahiers des charges IA / mois</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5 Analyses de Devis PDF / mois</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Calculateur de Coût Rendu DDP illimité</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Générateur d&apos;emails RFQ (EN/FR)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Starter')}
              className="mt-8 w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-800 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Démarrer le Starter
            </button>
          </div>

          {/* Pro Copilot Plan (Featured Linear / Stripe Style) */}
          <div className="relative p-8 rounded-3xl bento-card bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/60 border-2 border-blue-500 shadow-2xl shadow-blue-500/25 flex flex-col justify-between animated-glow-border">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
              Plus Populaire • Recommandé
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  Pro Copilot
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </h3>
              </div>
              <p className="mt-2 text-xs text-blue-200">Pour e-commerçants & acheteurs réguliers</p>

              <div className="mt-6">
                <span className="text-6xl font-black text-white">
                  ${isAnnual ? '79' : '99'}
                </span>
                <span className="text-xs text-gray-400"> / mois</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-gray-200">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong className="text-white">Cahiers des charges illimités</strong>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30 Analyses de Devis PDF / mois</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Détection surtarification & Red Flags</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Générateur d&apos;emails Négociation Avancée</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Accès prioritaire support SourcingLab</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Pro Copilot')}
              className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Choisir le Pro Copilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl bento-card flex flex-col justify-between hover:border-gray-700 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              <p className="mt-2 text-xs text-gray-400">Pour équipes d&apos;achats & marques multi-SKU</p>

              <div className="mt-6">
                <span className="text-5xl font-black text-white">
                  ${isAnnual ? '249' : '299'}
                </span>
                <span className="text-xs text-gray-400"> / mois</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tout le plan Pro en illimité</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-utilisateurs (5 seats)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Intégration directe services WEMADE USA</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Accompagnement audit usine 1-on-1</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Enterprise')}
              className="mt-8 w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-800 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Contact Équipe Enterprise
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
