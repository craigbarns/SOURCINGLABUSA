'use client';

import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'app';
  setActiveTab: (tab: 'landing' | 'app') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => setActiveTab('landing')}
          aria-label="Retour à l’accueil SourcingLab"
          className="flex items-center gap-3 cursor-pointer group text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                SOURCING<span className="text-blue-500">LAB</span>
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                USA
              </span>
            </div>
            <p className="text-[10px] text-gray-400 -mt-1 tracking-wider uppercase font-semibold">
              AI Sourcing Copilot
            </p>
          </div>
        </button>

        {/* Center Nav Items */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-gray-800 p-1 rounded-full text-sm font-medium"
        >
          <button
            type="button"
            onClick={() => setActiveTab('landing')}
            aria-current={activeTab === 'landing' ? 'page' : undefined}
            className={`px-4 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              activeTab === 'landing'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Landing Page
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            aria-current={activeTab === 'app' ? 'page' : undefined}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'app'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            Lancer l&apos;App Copilote
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-semibold text-emerald-300"
            title="Les clés des fournisseurs IA restent uniquement sur le serveur"
          >
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Secrets côté serveur
          </span>

          {activeTab === 'landing' ? (
            <button
              type="button"
              onClick={() => setActiveTab('app')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <span>Accéder au Copilote</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('landing')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-gray-700 bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Voir Offres & Liste d&apos;attente</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
