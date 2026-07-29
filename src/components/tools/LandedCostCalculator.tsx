'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Calculator,
  DollarSign,
  PieChart,
} from 'lucide-react';

import { calculateLandedCost } from '@/lib/landed-cost';
import type { LandedCostInput } from '@/lib/types';
import {
  DESTINATION_MARKET_LABELS,
  landedCostInputSchema,
  SHIPPING_MODE_LABELS,
} from '@/lib/validation/landed-cost';

interface RawCalculatorInput {
  unitPriceFob: string;
  quantity: string;
  shippingMode: LandedCostInput['shippingMode'];
  hsCode: string;
  destinationMarket: LandedCostInput['destinationMarket'];
  customsDutyRate: string;
  freightCostTotal: string;
  insuranceCost: string;
  localPortCharges: string;
  lastMileDelivery: string;
  targetRetailPrice: string;
}

const INITIAL_INPUT: RawCalculatorInput = {
  unitPriceFob: '4.50',
  quantity: '3000',
  shippingMode: 'sea_lcl',
  hsCode: '9617.00',
  destinationMarket: 'US',
  customsDutyRate: '0',
  freightCostTotal: '1850',
  insuranceCost: '150',
  localPortCharges: '350',
  lastMileDelivery: '450',
  targetRetailPrice: '24.99',
};

type NumericFieldName = Exclude<
  keyof RawCalculatorInput,
  'shippingMode' | 'hsCode' | 'destinationMarket'
>;

function parseNumber(value: string): number {
  if (!value.trim()) return Number.NaN;
  return Number(value);
}

function validateRawInput(raw: RawCalculatorInput) {
  return landedCostInputSchema.safeParse({
    unitPriceFob: parseNumber(raw.unitPriceFob),
    quantity: parseNumber(raw.quantity),
    shippingMode: raw.shippingMode,
    hsCode: raw.hsCode,
    destinationMarket: raw.destinationMarket,
    customsDutyRate: parseNumber(raw.customsDutyRate),
    freightCostTotal: parseNumber(raw.freightCostTotal),
    insuranceCost: raw.insuranceCost.trim()
      ? parseNumber(raw.insuranceCost)
      : null,
    localPortCharges: parseNumber(raw.localPortCharges),
    lastMileDelivery: parseNumber(raw.lastMileDelivery),
    targetRetailPrice: parseNumber(raw.targetRetailPrice),
  });
}

const NumberField: React.FC<{
  id: string;
  name: NumericFieldName;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  step?: string;
  onChange: (name: NumericFieldName, value: string) => void;
}> = ({ id, name, label, value, error, hint, step = '0.01', onChange }) => (
  <div>
    <label htmlFor={id} className="block text-xs text-gray-400 mb-1">
      {label}
    </label>
    <input
      id={id}
      type="number"
      min="0"
      step={step}
      value={value}
      onChange={(event) => onChange(name, event.target.value)}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={
        [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(' ') || undefined
      }
      className={`w-full px-3 py-2 rounded-lg bg-slate-950 border text-white text-sm focus:outline-none ${
        error ? 'border-red-500' : 'border-gray-800 focus:border-blue-500'
      }`}
    />
    {hint && (
      <p id={`${id}-hint`} className="text-[10px] text-gray-500 mt-1">
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} className="text-xs text-red-400 mt-1">
        {error}
      </p>
    )}
  </div>
);

export const LandedCostCalculator: React.FC = () => {
  const [rawInput, setRawInput] = useState<RawCalculatorInput>(INITIAL_INPUT);
  const validation = useMemo(() => validateRawInput(rawInput), [rawInput]);
  const errors = useMemo(() => {
    if (validation.success) return {} as Record<string, string>;

    return validation.error.issues.reduce<Record<string, string>>((accumulator, issue) => {
      const field = String(issue.path[0] ?? 'form');
      accumulator[field] ??= issue.message;
      return accumulator;
    }, {});
  }, [validation]);
  const result = useMemo(
    () => (validation.success ? calculateLandedCost(validation.data) : null),
    [validation],
  );

  const updateNumber = (name: NumericFieldName, value: string) => {
    setRawInput((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/90 border border-gray-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
          <Calculator className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Calculateur de coût rendu validé
          </h3>
          <p className="text-xs text-gray-400">
            Calcul déterministe. Le code HS et son taux doivent être vérifiés auprès
            d&apos;une source douanière ou d&apos;un spécialiste avant décision.
          </p>
        </div>
      </div>

      {!validation.success && (
        <p
          className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-sm text-red-300"
          role="alert"
        >
          Corrigez les champs signalés pour obtenir un calcul fiable.
        </p>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            Paramètres de commande et de logistique
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberField
              id="landed-unit-price"
              name="unitPriceFob"
              label="Prix usine FOB ($ / unité)"
              value={rawInput.unitPriceFob}
              error={errors.unitPriceFob}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-quantity"
              name="quantity"
              label="Quantité"
              value={rawInput.quantity}
              error={errors.quantity}
              step="1"
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="landed-destination" className="block text-xs text-gray-400 mb-1">
                Destination
              </label>
              <select
                id="landed-destination"
                value={rawInput.destinationMarket}
                onChange={(event) =>
                  setRawInput((current) => ({
                    ...current,
                    destinationMarket: event.target
                      .value as LandedCostInput['destinationMarket'],
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-gray-200 text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.entries(DESTINATION_MARKET_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="landed-shipping-mode" className="block text-xs text-gray-400 mb-1">
                Mode de transport
              </label>
              <select
                id="landed-shipping-mode"
                value={rawInput.shippingMode}
                onChange={(event) =>
                  setRawInput((current) => ({
                    ...current,
                    shippingMode: event.target
                      .value as LandedCostInput['shippingMode'],
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-gray-800 text-gray-200 text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.entries(SHIPPING_MODE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="landed-hs-code" className="block text-xs text-gray-400 mb-1">
                Code HS vérifié
              </label>
              <input
                id="landed-hs-code"
                type="text"
                inputMode="numeric"
                value={rawInput.hsCode}
                onChange={(event) =>
                  setRawInput((current) => ({
                    ...current,
                    hsCode: event.target.value,
                  }))
                }
                aria-invalid={errors.hsCode ? 'true' : undefined}
                aria-describedby={errors.hsCode ? 'landed-hs-code-error' : undefined}
                className={`w-full px-3 py-2 rounded-lg bg-slate-950 border text-white text-sm font-mono focus:outline-none ${
                  errors.hsCode
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-blue-500'
                }`}
              />
              {errors.hsCode && (
                <p id="landed-hs-code-error" className="text-xs text-red-400 mt-1">
                  {errors.hsCode}
                </p>
              )}
            </div>
            <NumberField
              id="landed-duty-rate"
              name="customsDutyRate"
              label="Taux associé au code HS (%)"
              value={rawInput.customsDutyRate}
              error={errors.customsDutyRate}
              step="0.1"
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberField
              id="landed-freight"
              name="freightCostTotal"
              label="Fret international total ($)"
              value={rawInput.freightCostTotal}
              error={errors.freightCostTotal}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-insurance"
              name="insuranceCost"
              label="Assurance cargo ($)"
              value={rawInput.insuranceCost}
              error={errors.insuranceCost}
              hint="Laisser vide pour une estimation selon le mode de transport."
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberField
              id="landed-port"
              name="localPortCharges"
              label="Frais portuaires / douane ($)"
              value={rawInput.localPortCharges}
              error={errors.localPortCharges}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-last-mile"
              name="lastMileDelivery"
              label="Livraison entrepôt ($)"
              value={rawInput.lastMileDelivery}
              error={errors.lastMileDelivery}
              onChange={updateNumber}
            />
          </div>

          <div className="pt-2 border-t border-gray-800">
            <NumberField
              id="landed-retail"
              name="targetRetailPrice"
              label="Prix de vente public cible ($)"
              value={rawInput.targetRetailPrice}
              error={errors.targetRetailPrice}
              onChange={updateNumber}
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-blue-500/30 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Estimation du coût rendu
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                    Entrées valides
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
                    <span className="text-xs text-gray-400 block">
                      Coût rendu unitaire estimé
                    </span>
                    <span className="text-3xl font-black text-white">
                      ${result.unitLandedCost}
                    </span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">
                      Hors taxes/frais signalés ci-dessous
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
                    <span className="text-xs text-gray-400 block">
                      Marge brute / unité
                    </span>
                    <span
                      className={`text-3xl font-black ${
                        result.marginPerUnit >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      ${result.marginPerUnit}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      Marge : {result.marginPercent}% • ROI : {result.roiPercent}%
                    </span>
                  </div>
                </div>

                <dl className="p-4 rounded-xl bg-slate-950/80 border border-gray-800/80 space-y-2 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-400">Investissement total</dt>
                    <dd className="font-bold text-white">
                      ${result.totalLandedCost.toLocaleString('fr-FR')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-400">Droits calculés</dt>
                    <dd className="font-bold text-purple-300">
                      ${result.customsDutyTotal.toLocaleString('fr-FR')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-400">
                      Assurance
                      {result.calculationContext.insuranceWasEstimated
                        ? ' (estimée)'
                        : ''}
                    </dt>
                    <dd className="font-bold text-blue-300">
                      ${result.insuranceCostTotal.toLocaleString('fr-FR')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-gray-400">CA brut possible</dt>
                    <dd className="font-bold text-emerald-400">
                      $
                      {(
                        Number(rawInput.targetRetailPrice) *
                        Number(rawInput.quantity)
                      ).toLocaleString('fr-FR')}
                    </dd>
                  </div>
                </dl>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <PieChart className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                      Répartition du coût
                    </span>
                    <span className="font-mono">100 %</span>
                  </div>
                  <div
                    className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex"
                    role="img"
                    aria-label={`Usine ${result.breakdownPct.factoryPct} %, fret ${result.breakdownPct.freightPct} %, douanes ${result.breakdownPct.dutyPct} %, autres ${result.breakdownPct.localPct} %`}
                  >
                    <span style={{ width: `${result.breakdownPct.factoryPct}%` }} className="bg-blue-500" />
                    <span style={{ width: `${result.breakdownPct.freightPct}%` }} className="bg-indigo-500" />
                    <span style={{ width: `${result.breakdownPct.dutyPct}%` }} className="bg-purple-500" />
                    <span style={{ width: `${result.breakdownPct.localPct}%` }} className="bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  Limites à vérifier
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-100/80">
                  {result.warnings.map((warning) => (
                    <li key={warning}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-dashed border-gray-800 text-center">
              <Calculator className="w-10 h-10 text-gray-600 mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm text-gray-300">
                Complétez des valeurs valides pour afficher le calcul.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
