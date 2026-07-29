'use client';

import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  appHref: string;
  onScrollToWaitlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ appHref, onScrollToWaitlist }) => {
  return (
    <footer className="bg-slate-950 border-t border-gray-800/80 pt-12 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 pb-8 border-b border-gray-800/80">
          <div className="md:col-span-6 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              The #1 AI Sourcing Copilot that structures quotes, audits calculations, verifies US/EU customs duties, and negotiates with global suppliers.
            </p>
            <p className="text-[11px] text-gray-500 font-mono">
              Primary domain: sourcinglabusa.com • Strategic acquisition channel for WEMADE USA
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5">
              <li><a href={appHref} className="hover:text-blue-400">Launch AI Copilot</a></li>
              <li><button type="button" onClick={onScrollToWaitlist} className="hover:text-blue-400">Priority Waitlist</button></li>
              <li><a href="#pricing" className="hover:text-blue-400">Pricing & Subscriptions</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Procurement Modules</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>1. Product Tech Specs & US Compliance</li>
              <li>2. PDF Factory Quote OCR Audit</li>
              <li>3. Net Landed Cost & Margin Calculator</li>
              <li>4. HTSUS Customs Duty AI Engine</li>
              <li>5. Factory Outreach & RFQ Emails</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SourcingLab USA. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Built with ambition for US & global procurement leaders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
