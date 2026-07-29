'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Globe,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react';

import { ClientApiError, generateSupplierEmail } from '@/lib/ai-service';
import type { EmailGeneratorInput, EmailGeneratorResult } from '@/lib/types';

const EMAIL_TYPE_LABELS: Record<EmailGeneratorInput['emailType'], string> = {
  rfq: "Demande d'offre de prix initiale (RFQ)",
  negotiation: 'Négociation de prix / contre-offre',
  sample_request: "Commande d'échantillons de validation",
  quality_audit: "Demande d'audit qualité et de rapports de test",
};

const LANGUAGE_LABELS: Record<EmailGeneratorInput['language'], string> = {
  en: 'Anglais',
  fr: 'Français',
  zh: 'Chinois simplifié',
};

export const SupplierEmailGenerator: React.FC = () => {
  const [input, setInput] = useState<EmailGeneratorInput>({
    supplierName: 'Shenzhen Precision Industrial Co., Ltd.',
    contactPerson: 'Sales Dept / Manager',
    productName: 'Stainless Steel Water Bottle 750ml',
    quantity: 3000,
    emailType: 'rfq',
    language: 'en',
    targetPrice: '$4.20',
    specificRequirements:
      'Food-contact compliance evidence to verify, custom laser logo on body.',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailGeneratorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formIsValid =
    input.supplierName.trim().length > 0 &&
    input.productName.trim().length > 0 &&
    Number.isInteger(input.quantity) &&
    input.quantity > 0;

  const handleGenerate = async () => {
    if (!formIsValid) {
      setErrorMessage(
        'Renseignez un fournisseur, un produit et une quantité entière positive.',
      );
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    try {
      setResult(await generateSupplierEmail(input));
    } catch (error) {
      setErrorMessage(
        error instanceof ClientApiError
          ? error.message
          : "L'e-mail fournisseur n'a pas pu être généré.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(
        `Subject: ${result.subject}\n\n${result.body}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMessage(
        "La copie automatique a échoué. Sélectionnez le texte de l'e-mail.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Fonction 4 : Générateur d&apos;e-mails fournisseurs
          </h3>
          <p className="text-xs text-gray-400">
            Prépare des modèles structurés et validés côté serveur. Vérifiez toujours
            les données commerciales et réglementaires avant envoi.
          </p>
        </div>
      </div>

      {errorMessage && (
        <p
          className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-400" aria-hidden="true" />
            Paramètres de l&apos;e-mail
          </h4>

          <div>
            <label
              htmlFor="supplier-email-type"
              className="block text-xs text-gray-400 mb-1"
            >
              Objectif de l&apos;e-mail
            </label>
            <select
              id="supplier-email-type"
              value={input.emailType}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  emailType: event.target
                    .value as EmailGeneratorInput['emailType'],
                }))
              }
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
            >
              {Object.entries(EMAIL_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="supplier-email-language"
              className="text-xs text-gray-400 mb-1 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              Langue du message
            </label>
            <select
              id="supplier-email-language"
              value={input.language}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  language: event.target
                    .value as EmailGeneratorInput['language'],
                }))
              }
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
            >
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="supplier-name"
                className="block text-xs text-gray-400 mb-1"
              >
                Nom du fournisseur
              </label>
              <input
                id="supplier-name"
                type="text"
                value={input.supplierName}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    supplierName: event.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="supplier-quantity"
                className="block text-xs text-gray-400 mb-1"
              >
                Quantité (pièces)
              </label>
              <input
                id="supplier-quantity"
                type="number"
                min="1"
                step="1"
                value={input.quantity}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    quantity: Number(event.target.value),
                  }))
                }
                required
                aria-invalid={
                  Number.isInteger(input.quantity) && input.quantity > 0
                    ? undefined
                    : 'true'
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="supplier-product"
              className="block text-xs text-gray-400 mb-1"
            >
              Nom du produit
            </label>
            <input
              id="supplier-product"
              type="text"
              value={input.productName}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  productName: event.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
            />
          </div>

          {input.emailType === 'negotiation' && (
            <div>
              <label
                htmlFor="supplier-target-price"
                className="block text-xs text-gray-400 mb-1"
              >
                Prix cible négocié
              </label>
              <input
                id="supplier-target-price"
                type="text"
                value={input.targetPrice ?? ''}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    targetPrice: event.target.value,
                  }))
                }
                placeholder="Ex. $4.10 / unité"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-white text-sm focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="supplier-requirements"
              className="block text-xs text-gray-400 mb-1"
            >
              Exigences particulières à demander ou vérifier
            </label>
            <textarea
              id="supplier-requirements"
              rows={3}
              value={input.specificRequirements ?? ''}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  specificRequirements: event.target.value,
                }))
              }
              placeholder="Rapports de test, packaging, tolérances..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-white text-xs focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !formIsValid}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
          >
            {loading ? (
              <span>Génération en cours…</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Générer le modèle d&apos;e-mail</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-dashed border-gray-800 text-center space-y-3">
              <Mail className="w-10 h-10 text-gray-600 mx-auto" aria-hidden="true" />
              <p className="text-sm font-semibold text-gray-300">
                Configurez la demande pour préparer un message à relire.
              </p>
            </div>
          )}

          {result && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 uppercase">
                  Modèle à vérifier avant envoi
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-2 border border-gray-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  {copied ? (
                    <Check
                      className="w-3.5 h-3.5 text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>{copied ? 'Copié !' : 'Copier tout'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-gray-800">
                <span className="text-[11px] text-gray-500 uppercase font-semibold block mb-0.5">
                  Objet
                </span>
                <span className="text-sm font-bold text-white">
                  {result.subject}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
                <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {result.body}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Points de vigilance
                </span>
                <ul className="space-y-1 text-xs text-blue-200/80">
                  {result.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
