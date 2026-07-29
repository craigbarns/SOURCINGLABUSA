'use client';

import React, { useRef, useState } from 'react';
import { FileText, ShieldAlert, Calculator, Mail, Sparkles, ArrowLeft } from 'lucide-react';
import { ProductSpecGenerator } from './tools/ProductSpecGenerator';
import { QuoteAnalyzer } from './tools/QuoteAnalyzer';
import { LandedCostCalculator } from './tools/LandedCostCalculator';
import { SupplierEmailGenerator } from './tools/SupplierEmailGenerator';

interface AppDashboardProps {
  marketingHref: string;
}

type ToolId = 'specs' | 'quote' | 'cost' | 'email';

const TOOL_ORDER: ToolId[] = ['specs', 'quote', 'cost', 'email'];

export const AppDashboard: React.FC<AppDashboardProps> = ({ marketingHref }) => {
  const [activeTool, setActiveTool] = useState<ToolId>('specs');
  const tabRefs = useRef<Record<ToolId, HTMLButtonElement | null>>({
    specs: null,
    quote: null,
    cost: null,
    email: null,
  });

  const activateAndFocusTab = (tool: ToolId) => {
    setActiveTool(tool);
    tabRefs.current[tool]?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentTool: ToolId,
  ) => {
    const currentIndex = TOOL_ORDER.indexOf(currentTool);
    let nextTool: ToolId | undefined;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextTool = TOOL_ORDER[(currentIndex + 1) % TOOL_ORDER.length];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextTool = TOOL_ORDER[(currentIndex - 1 + TOOL_ORDER.length) % TOOL_ORDER.length];
        break;
      case 'Home':
        nextTool = TOOL_ORDER[0];
        break;
      case 'End':
        nextTool = TOOL_ORDER[TOOL_ORDER.length - 1];
        break;
      default:
        return;
    }

    event.preventDefault();
    activateAndFocusTab(nextTool);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-gray-100 pb-20">
      {/* Copilot Header */}
      <div className="bg-slate-950 border-b border-gray-800/80 pt-6 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={marketingHref}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Retour Landing Page</span>
                </a>
                <span className="text-gray-700">•</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                  MVP Live Phase 1
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
                Copilote SourcingLab
                <Sparkles className="w-6 h-6 text-blue-400" aria-hidden="true" />
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">
                Quatre outils reliés à un pipeline serveur unique et contrôlé.
              </p>
            </div>

            {/* Quick Status */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-gray-800 text-xs text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Traitement sécurisé côté serveur</span>
              </div>
            </div>
          </div>

          {/* Tool Selector Tabs */}
          <div
            role="tablist"
            aria-label="Outils du copilote"
            aria-orientation="horizontal"
            className="mt-8 flex flex-wrap gap-2 border-b border-gray-800 pb-0.5"
          >
            <button
              ref={(element) => {
                tabRefs.current.specs = element;
              }}
              type="button"
              id="tool-tab-specs"
              role="tab"
              aria-selected={activeTool === 'specs'}
              aria-controls="tool-panel-specs"
              tabIndex={activeTool === 'specs' ? 0 : -1}
              onClick={() => setActiveTool('specs')}
              onKeyDown={(event) => handleTabKeyDown(event, 'specs')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 ${
                activeTool === 'specs'
                  ? 'bg-slate-900 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>1. Cahier des charges</span>
            </button>

            <button
              ref={(element) => {
                tabRefs.current.quote = element;
              }}
              type="button"
              id="tool-tab-quote"
              role="tab"
              aria-selected={activeTool === 'quote'}
              aria-controls="tool-panel-quote"
              tabIndex={activeTool === 'quote' ? 0 : -1}
              onClick={() => setActiveTool('quote')}
              onKeyDown={(event) => handleTabKeyDown(event, 'quote')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 ${
                activeTool === 'quote'
                  ? 'bg-slate-900 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>2. Analyse de Devis PDF</span>
            </button>

            <button
              ref={(element) => {
                tabRefs.current.cost = element;
              }}
              type="button"
              id="tool-tab-cost"
              role="tab"
              aria-selected={activeTool === 'cost'}
              aria-controls="tool-panel-cost"
              tabIndex={activeTool === 'cost' ? 0 : -1}
              onClick={() => setActiveTool('cost')}
              onKeyDown={(event) => handleTabKeyDown(event, 'cost')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-400 ${
                activeTool === 'cost'
                  ? 'bg-slate-900 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span>3. Calcul des Coûts Rendu</span>
            </button>

            <button
              ref={(element) => {
                tabRefs.current.email = element;
              }}
              type="button"
              id="tool-tab-email"
              role="tab"
              aria-selected={activeTool === 'email'}
              aria-controls="tool-panel-email"
              tabIndex={activeTool === 'email' ? 0 : -1}
              onClick={() => setActiveTool('email')}
              onKeyDown={(event) => handleTabKeyDown(event, 'email')}
              className={`px-4 py-3 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-t border-x transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 ${
                activeTool === 'email'
                  ? 'bg-slate-900 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>4. E-mails Fournisseurs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div
          id={`tool-panel-${activeTool}`}
          role="tabpanel"
          aria-labelledby={`tool-tab-${activeTool}`}
          tabIndex={0}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#08090d]"
        >
          {activeTool === 'specs' && <ProductSpecGenerator />}
          {activeTool === 'quote' && <QuoteAnalyzer />}
          {activeTool === 'cost' && <LandedCostCalculator />}
          {activeTool === 'email' && <SupplierEmailGenerator />}
        </div>
      </main>
    </div>
  );
};
