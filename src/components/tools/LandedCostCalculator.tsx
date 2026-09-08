'use client';

import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, DollarSign, PieChart } from 'lucide-react';

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

const SELECT_CLASS =
  'w-full rounded-lg bg-brand-surface border border-brand-line text-brand-ink text-sm px-3 py-2 focus:outline-none focus:border-brand-green/60 transition-colors';

function parseNumber(value: string): number {
  if (!value.trim()) return Number.NaN;
  return Number(value);
}

function formatWarning(warning: string): string {
  const dutyRateMatch = warning.match(
    /^Le taux de (.+)% est fourni par l’utilisateur pour le code HS (.+); le calculateur ne consulte pas encore une base tarifaire officielle\.$/,
  );

  if (dutyRateMatch) {
    return `The ${dutyRateMatch[1]}% rate for HS code ${dutyRateMatch[2]} was provided by the user; the calculator does not yet query an official tariff database.`;
  }

  const insuranceMatch = warning.match(
    /^Assurance estimée selon le mode (.+); remplacez-la par le montant réel du transitaire dès qu’il est connu\.$/,
  );

  if (insuranceMatch) {
    return `Insurance was estimated for ${insuranceMatch[1]} shipping; replace it with the forwarder's actual charge when available.`;
  }

  if (
    warning ===
    'La TVA à l’importation n’est pas incluse : son traitement dépend du pays, du régime fiscal et de la récupération éventuelle.'
  ) {
    return 'Import VAT is not included; its treatment depends on the country, tax status, and potential recoverability.';
  }

  if (
    warning ===
    'Les frais MPF/HMF et droits additionnels éventuels ne sont pas inclus.'
  ) {
    return 'Potential MPF/HMF fees and additional duties are not included.';
  }

  return warning;
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
    <label htmlFor={id} className="mb-1 block text-xs text-brand-muted">
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
      className={`w-full rounded-lg border bg-brand-surface px-3 py-2 text-sm text-brand-ink focus:outline-none ${
        error
          ? 'border-brand-error'
          : 'border-brand-line focus:border-brand-green/60'
      }`}
    />
    {hint && (
      <p id={`${id}-hint`} className="mt-1 text-[10px] text-brand-muted">
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-brand-error">
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

    return validation.error.issues.reduce<Record<string, string>>(
      (accumulator, issue) => {
        const field = String(issue.path[0] ?? 'form');
        accumulator[field] ??= issue.message;
        return accumulator;
      },
      {},
    );
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
      <div className="surface-panel flex items-start gap-3 rounded-[4px] p-5">
        <div className="shrink-0 rounded-[4px] bg-brand-green/12 p-2.5 text-brand-green">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-brand-ink">
            Landed Cost Calculator
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">
            Deterministic calculation. Verify the HS code and duty rate with an
            official customs source or qualified specialist before making a
            decision.
          </p>
        </div>
      </div>

      {!validation.success && (
        <p
          className="rounded-[4px] border border-brand-error/30 bg-brand-error/[0.08] p-3 text-sm text-brand-error"
          role="alert"
        >
          Correct the highlighted fields to calculate a reliable estimate.
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="soft-panel space-y-4 rounded-[4px] p-6 lg:col-span-6">
          <h4 className="flex items-center gap-2 border-b border-brand-line pb-3 text-sm font-bold text-brand-ink">
            <DollarSign
              className="h-4 w-4 text-brand-green"
              aria-hidden="true"
            />
            Order & Logistics Inputs
          </h4>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField
              id="landed-unit-price"
              name="unitPriceFob"
              label="Factory FOB price ($ / unit)"
              value={rawInput.unitPriceFob}
              error={errors.unitPriceFob}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-quantity"
              name="quantity"
              label="Quantity"
              value={rawInput.quantity}
              error={errors.quantity}
              step="1"
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="landed-destination"
                className="mb-1 block text-xs text-brand-muted"
              >
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
                className={SELECT_CLASS}
              >
                {Object.entries(DESTINATION_MARKET_LABELS).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor="landed-shipping-mode"
                className="mb-1 block text-xs text-brand-muted"
              >
                Shipping mode
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
                className={SELECT_CLASS}
              >
                {Object.entries(SHIPPING_MODE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="landed-hs-code"
                className="mb-1 block text-xs text-brand-muted"
              >
                Verified HS code
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
                aria-describedby={
                  errors.hsCode ? 'landed-hs-code-error' : undefined
                }
                className={`w-full rounded-lg border bg-brand-surface px-3 py-2 font-mono text-sm text-brand-ink focus:outline-none ${
                  errors.hsCode
                    ? 'border-brand-error'
                    : 'border-brand-line focus:border-brand-green/60'
                }`}
              />
              {errors.hsCode && (
                <p
                  id="landed-hs-code-error"
                  className="mt-1 text-xs text-brand-error"
                >
                  {errors.hsCode}
                </p>
              )}
            </div>
            <NumberField
              id="landed-duty-rate"
              name="customsDutyRate"
              label="HS code duty rate (%)"
              value={rawInput.customsDutyRate}
              error={errors.customsDutyRate}
              step="0.1"
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField
              id="landed-freight"
              name="freightCostTotal"
              label="Total international freight ($)"
              value={rawInput.freightCostTotal}
              error={errors.freightCostTotal}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-insurance"
              name="insuranceCost"
              label="Cargo insurance ($)"
              value={rawInput.insuranceCost}
              error={errors.insuranceCost}
              hint="Leave blank to estimate based on the shipping mode."
              onChange={updateNumber}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField
              id="landed-port"
              name="localPortCharges"
              label="Port / customs charges ($)"
              value={rawInput.localPortCharges}
              error={errors.localPortCharges}
              onChange={updateNumber}
            />
            <NumberField
              id="landed-last-mile"
              name="lastMileDelivery"
              label="Warehouse delivery ($)"
              value={rawInput.lastMileDelivery}
              error={errors.lastMileDelivery}
              onChange={updateNumber}
            />
          </div>

          <div className="border-t border-brand-line pt-2">
            <NumberField
              id="landed-retail"
              name="targetRetailPrice"
              label="Target retail price ($)"
              value={rawInput.targetRetailPrice}
              error={errors.targetRetailPrice}
              onChange={updateNumber}
            />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-6">
          {result ? (
            <>
              <div className="space-y-6 rounded-[4px] border border-brand-green/25 bg-gradient-to-br from-brand-green/[0.08] via-brand-green/[0.03] to-transparent p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.08em] text-brand-green">
                    Landed Cost Estimate
                  </span>
                  <span className="rounded-full border border-brand-green/30 bg-brand-green/15 px-2.5 py-1 text-xs font-semibold text-brand-green">
                    Valid inputs
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[4px] border border-brand-line bg-brand-surface p-4">
                    <span className="block text-xs text-brand-muted">
                      Estimated landed cost per unit
                    </span>
                    <span className="text-3xl font-black text-brand-ink">
                      ${result.unitLandedCost}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-brand-muted">
                      Excludes the taxes and fees noted below
                    </span>
                  </div>
                  <div className="rounded-[4px] border border-brand-line bg-brand-surface p-4">
                    <span className="block text-xs text-brand-muted">
                      Gross margin / unit
                    </span>
                    <span
                      className={`text-3xl font-black ${
                        result.marginPerUnit >= 0
                          ? 'text-brand-green'
                          : 'text-brand-error'
                      }`}
                    >
                      ${result.marginPerUnit}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-brand-muted">
                      Margin: {result.marginPercent}% • ROI: {result.roiPercent}
                      %
                    </span>
                  </div>
                </div>

                <dl className="space-y-2 rounded-[4px] border border-brand-line bg-brand-surface p-4 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-brand-muted">Total investment</dt>
                    <dd className="font-bold text-brand-ink">
                      ${result.totalLandedCost.toLocaleString('en-US')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-brand-muted">Calculated duties</dt>
                    <dd className="font-bold text-brand-plum">
                      ${result.customsDutyTotal.toLocaleString('en-US')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-brand-muted">
                      Insurance
                      {result.calculationContext.insuranceWasEstimated
                        ? ' (estimated)'
                        : ''}
                    </dt>
                    <dd className="font-bold text-brand-info">
                      ${result.insuranceCostTotal.toLocaleString('en-US')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-brand-muted">
                      Potential gross revenue
                    </dt>
                    <dd className="font-bold text-brand-green">
                      $
                      {(
                        Number(rawInput.targetRetailPrice) *
                        Number(rawInput.quantity)
                      ).toLocaleString('en-US')}
                    </dd>
                  </div>
                </dl>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-brand-muted">
                    <span className="flex items-center gap-1">
                      <PieChart
                        className="h-3.5 w-3.5 text-brand-green"
                        aria-hidden="true"
                      />
                      Cost breakdown
                    </span>
                    <span className="font-mono">100 %</span>
                  </div>
                  <div
                    className="flex h-4 w-full overflow-hidden rounded-full bg-brand-surface"
                    role="img"
                    aria-label={`Factory ${result.breakdownPct.factoryPct}%, freight ${result.breakdownPct.freightPct}%, duties ${result.breakdownPct.dutyPct}%, other ${result.breakdownPct.localPct}%`}
                  >
                    <span
                      style={{ width: `${result.breakdownPct.factoryPct}%` }}
                      className="bg-brand-green"
                    />
                    <span
                      style={{ width: `${result.breakdownPct.freightPct}%` }}
                      className="bg-brand-green"
                    />
                    <span
                      style={{ width: `${result.breakdownPct.dutyPct}%` }}
                      className="bg-brand-plum"
                    />
                    <span
                      style={{ width: `${result.breakdownPct.localPct}%` }}
                      className="bg-brand-info"
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-brand-muted">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-green" />
                      Factory {result.breakdownPct.factoryPct}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-green" />
                      Freight {result.breakdownPct.freightPct}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-plum" />
                      Duties {result.breakdownPct.dutyPct}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-info" />
                      Other {result.breakdownPct.localPct}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[4px] border border-brand-warning/30 bg-brand-warning/[0.06] p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-warning">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  Items to Verify
                </h4>
                <ul className="space-y-1.5 text-xs text-brand-warning">
                  {result.warnings.map((warning) => (
                    <li key={warning}>• {formatWarning(warning)}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="rounded-[4px] border border-dashed border-brand-line bg-brand-surface p-12 text-center">
              <Calculator
                className="mx-auto mb-3 h-10 w-10 text-brand-muted"
                aria-hidden="true"
              />
              <p className="text-sm text-brand-ink">
                Enter valid values to display the calculation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
