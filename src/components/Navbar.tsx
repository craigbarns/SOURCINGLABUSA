'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Sparkles, ShieldCheck, ArrowRight, Settings, Zap, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab?: 'landing' | 'app';
  setActiveTab?: (tab: 'landing' | 'app') => void;
  onOpenSettings?: () => void;
  hasApiKey?: boolean;
  area?: 'app' | 'marketing';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'landing',
  setActiveTab,
  onOpenSettings,
  hasApiKey = false,
  area,
}) => {
  const isAppArea = area === 'app';
  const isMarketingArea = area === 'marketing';
  const currentTab = isAppArea ? 'app' : activeTab;

  const marketingHref = isAppArea ? '/marketing' : '/';
  const appHref = '/app';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo Link */}
        <Link
          href={marketingHref}
          aria-label="Retour à l’accueil SourcingLab"
          onClick={(e) => {
            if (setActiveTab && !area) {
              e.preventDefault();
              setActiveTab('landing');
            }
          }}
          className="cursor-pointer"
        >
          <Logo size="md" />
        </Link>

        {/* Center Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-gray-800/80 p-1.5 rounded-2xl text-xs font-semibold backdrop-blur-md">
          <Link
            href={marketingHref}
            aria-current={currentTab === 'landing' ? 'page' : undefined}
            onClick={(e) => {
              if (setActiveTab && !area) {
                e.preventDefault();
                setActiveTab('landing');
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${
              currentTab === 'landing'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Landing Page
          </Link>
          <Link
            href={appHref}
            aria-current={currentTab === 'app' ? 'page' : undefined}
            onClick={(e) => {
              if (setActiveTab && !area) {
                e.preventDefault();
                setActiveTab('app');
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              currentTab === 'app'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Lancer l'App Copilote</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-gray-800 text-[11px] text-gray-300 font-mono">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>IA Prête • 2026</span>
          </div>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              title="Configuration Clé API OpenAI (Optionnel)"
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                hasApiKey
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-gray-800 bg-slate-900 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {currentTab === 'landing' ? (
            <Link
              href={appHref}
              onClick={(e) => {
                if (setActiveTab && !area) {
                  e.preventDefault();
                  setActiveTab('app');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white hover:opacity-95 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
            >
              <span>Ouvrir l&apos;App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href={marketingHref}
              onClick={(e) => {
                if (setActiveTab && !area) {
                  e.preventDefault();
                  setActiveTab('landing');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-gray-800 bg-slate-900 text-gray-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Voir Offres & Liste d'attente</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
