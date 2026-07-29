'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldAlert, FileText, Calculator, Mail, Play, CheckCircle2, TrendingUp, Clock, ShieldCheck, Search } from 'lucide-react';

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
  appHref = '/app',
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'specs' | 'quote' | 'cost' | 'hscode' | 'email'>('specs');

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-grid-pattern spotlight-bg">
      {/* Background Gradients & Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[380px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Animated Badge Linear Style */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl shadow-lg shadow-blue-500/10 animated-glow-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200">
              #1 AI Copilot for Global Product Sourcing & Factory Negotiation 2026
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-gray-400 pl-1 border-l border-gray-700">
              Press <kbd>⌘K</kbd>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Source Smarter. <br />
            <span className="gradient-text">Buy Better.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white font-semibold">Not a directory. Not a marketplace.</strong>
            <br />
            An expert AI copilot that drafts technical product specs, audits PDF factory quotes, calculates net landed cost (DDP), and negotiates directly with suppliers.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={appHref}
              onClick={(e) => {
                if (onLaunchApp) {
                  e.preventDefault();
                  onLaunchApp();
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-black text-base hover:opacity-95 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Try AI Copilot (Direct Access)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 border border-gray-800 text-gray-200 font-bold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-blue-400" />
              </div>
              <span>Watch 60s Demo</span>
            </button>
          </div>

          {/* Key Value Stats Pills */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Time Saved</p>
                <p className="text-sm font-extrabold text-white">85% Faster</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Negotiated Savings</p>
                <p className="text-sm font-extrabold text-emerald-400">+14.2% Margin</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Customs Duties</p>
                <p className="text-sm font-extrabold text-white">100% Precise DDP</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-800/80 bg-slate-900/70 backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">US & EU Standards</p>
                <p className="text-sm font-extrabold text-amber-300">FDA, Prop65, CE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Feature Architecture Showcase */}
        <div className="mt-16 max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-widest">
              Bento Grid Suite
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              An End-to-End AI Sourcing Engineering Suite
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Bento Card 1: Product Spec */}
            <div 
              onClick={() => setActivePreviewTab('specs')}
              className={`md:col-span-7 p-6 rounded-3xl bento-card cursor-pointer ${
                activePreviewTab === 'specs' ? 'border-blue-500 bg-slate-900/90' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-gray-400">01. PRODUCT SPECS</span>
              </div>
              <h3 className="text-xl font-bold text-white">1. Describe Your Product (AI Specs & Compliance)</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Exact materials, tolerances, mandatory certifications (FDA, California Prop 65, CE), and recommended testing labs.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-gray-800 text-xs font-mono text-blue-300">
                ⚡ E.g. &quot;Insulated stainless steel 24oz water bottle for US market&quot; ➔ Generated in 0.8s
              </div>
            </div>

            {/* Bento Card 2: Quote Analysis */}
            <div 
              onClick={() => setActivePreviewTab('quote')}
              className={`md:col-span-5 p-6 rounded-3xl bento-card bento-card-emerald cursor-pointer ${
                activePreviewTab === 'quote' ? 'border-amber-500 bg-slate-900/90' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">SCORE 0-100</span>
              </div>
              <h3 className="text-xl font-bold text-white">2. PDF Quote Audit & OCR</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Mistral OCR + GPT-4o: Automatic detection of overpricing (+14%), deposit risks, and missing clauses (AQL 2.5, NNN).
              </p>
            </div>

            {/* Bento Card 3: Landed Cost */}
            <div 
              onClick={() => setActivePreviewTab('cost')}
              className={`md:col-span-5 p-6 rounded-3xl bento-card cursor-pointer ${
                activePreviewTab === 'cost' ? 'border-purple-500 bg-slate-900/90' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-purple-400 font-bold">REAL-TIME DDP</span>
              </div>
              <h3 className="text-xl font-bold text-white">3. Landed Cost Calculator</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Factory FOB Price + Freight (Ocean/Air) + Customs Duties (% HS Code) + Insurance = Net DDP Unit Cost & Margin.
              </p>
            </div>

            {/* Bento Card 4: Supplier Email */}
            <div 
              onClick={() => setActivePreviewTab('email')}
              className={`md:col-span-7 p-6 rounded-3xl bento-card bento-card-emerald cursor-pointer ${
                activePreviewTab === 'email' ? 'border-emerald-500 bg-slate-900/90' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">1-CLICK OUTREACH</span>
              </div>
              <h3 className="text-xl font-bold text-white">4. Factory Outreach & Email Generator</h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Draft 1-click RFQs, negotiated price counter-offers, and sample requests in English, French, and Chinese.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-gray-800 text-xs font-mono text-emerald-300">
                ✉️ Subject: RFQ: Quotation Request for Stainless Water Bottle (3,000 units)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
