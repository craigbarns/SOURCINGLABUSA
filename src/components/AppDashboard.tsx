'use client';

import React, { useState } from 'react';
import { FileText, ShieldAlert, Calculator, Mail, Sparkles, ArrowLeft, Search } from 'lucide-react';
import { ProductSpecGenerator } from './tools/ProductSpecGenerator';
import { QuoteAnalyzer } from './tools/QuoteAnalyzer';
import { LandedCostCalculator } from './tools/LandedCostCalculator';
import { SupplierEmailGenerator } from './tools/SupplierEmailGenerator';
import { HsCodeAnalyzer } from './tools/HsCodeAnalyzer';

interface AppDashboardProps {
  onBackToLanding?: () => void;
  userApiKey?: string;
  onOpenSettings?: () => void;
  marketingHref?: string;
}

export const AppDashboard: React.FC<AppDashboardProps> = ({
  onBackToLanding,
  userApiKey,
  onOpenSettings,
  marketingHref = '/',
}) => {
  const [activeTool, setActiveTool] = useState<'specs' | 'quote' | 'cost' | 'email' | 'hscode'>('specs');

  return (
    <div className="min-h-screen bg-[#08090d] text-gray-100 pb-20">
      {/* Copilot Header */}
      <div className="bg-slate-950/90 border-b border-gray-800/80 pt-6 pb-6 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onBackToLanding}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Landing Page</span>
                </button>
                <span className="text-gray-700">•</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 uppercase tracking-wide">
                  Live AI Workspace
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-center gap-2.5">
                SourcingLab AI Copilot Workspace
                <Sparkles className="w-6 h-6 text-blue-400" />
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Your automated AI tools for product tech specs, quote audits, customs duties, and factory negotiation.
              </p>
            </div>

            {/* Quick Status */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-300 flex items-center gap-2 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs">Engine: {userApiKey ? 'OpenAI GPT-4o' : 'Mistral OCR & GPT-4o Active'}</span>
              </div>
              <button
                onClick={onOpenSettings}
                className="px-3.5 py-2 rounded-xl border border-gray-800 bg-slate-900 text-xs text-blue-400 hover:text-white hover:border-blue-500/50 transition-all font-mono"
              >
                {userApiKey ? 'API Key Active ✓' : '+ OpenAI Key'}
              </button>
            </div>
          </div>

          {/* Tool Selector Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-800/80 pb-0.5">
            <button
              onClick={() => setActiveTool('specs')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all duration-200 ${
                activeTool === 'specs'
                  ? 'bg-slate-900 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">1</span>
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Product Tech Specs</span>
            </button>

            <button
              onClick={() => setActiveTool('quote')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all duration-200 ${
                activeTool === 'quote'
                  ? 'bg-slate-900 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Quote PDF Audit</span>
            </button>

            <button
              onClick={() => setActiveTool('cost')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all duration-200 ${
                activeTool === 'cost'
                  ? 'bg-slate-900 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-bold">3</span>
              <Calculator className="w-4 h-4 text-purple-400" />
              <span>Landed Cost (DDP)</span>
            </button>

            <button
              onClick={() => setActiveTool('hscode')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all duration-200 ${
                activeTool === 'hscode'
                  ? 'bg-slate-900 border-blue-400 text-white shadow-lg shadow-blue-400/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-400/20 text-blue-300 text-xs flex items-center justify-center font-bold">4</span>
              <Search className="w-4 h-4 text-blue-400" />
              <span>HS Codes & Customs</span>
            </button>

            <button
              onClick={() => setActiveTool('email')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all duration-200 ${
                activeTool === 'email'
                  ? 'bg-slate-900 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">5</span>
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Supplier Emails</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTool === 'specs' && <ProductSpecGenerator userApiKey={userApiKey} />}
        {activeTool === 'quote' && <QuoteAnalyzer userApiKey={userApiKey} />}
        {activeTool === 'cost' && <LandedCostCalculator />}
        {activeTool === 'hscode' && <HsCodeAnalyzer />}
        {activeTool === 'email' && <SupplierEmailGenerator />}
      </main>
    </div>
  );
};
