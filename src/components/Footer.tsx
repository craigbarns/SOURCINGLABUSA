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
              Un copilote de sourcing qui structure les devis, contrôle les calculs et
              prépare les informations à vérifier avec les fournisseurs.
            </p>
            <p className="text-[11px] text-gray-500 font-mono">
              Domaine réservé : sourcinglabusa.com • Canal d&apos;acquisition stratégique WEMADE USA
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation MVP</h4>
            <ul className="space-y-1.5">
              <li><a href={appHref} className="hover:text-blue-400">Copilote IA (Accès Direct)</a></li>
              <li><button type="button" onClick={onScrollToWaitlist} className="hover:text-blue-400">Liste d&apos;Attente (Prioritaire)</button></li>
              <li><a href="#pricing" className="hover:text-blue-400">Tarifs & Abonnements</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fonctionnalités IA</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>1. Cahier des charges & Normes US</li>
              <li>2. Audit & Détections pièges PDF</li>
              <li>3. Calculateur Landed Cost & Marges</li>
              <li>4. E-mails Négociation Usines</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SourcingLab USA. Tous droits réservés.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Conçu avec ambition pour transformer l&apos;industrie des achats</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
