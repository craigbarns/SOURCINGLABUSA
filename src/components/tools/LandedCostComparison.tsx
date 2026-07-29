'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Ship, TrendingDown, Zap } from 'lucide-react';

import { compareLandedCosts } from '@/lib/landed-comparison';
import type {
  LandedComparisonSharedInput,
  LandedComparisonSupplierInput,
  QuoteRankingItem,
} from '@/lib/types';
import {
  DESTINATION_MARKET_LABELS,
  SHIPPING_MODE_LABELS,
} from '@/lib/validation/landed-cost';

const ORIGIN_OPTIONS = [
  { value: 'CN', label: 'China' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'IN', label: 'India' },
  { value: 'MX', label: 'Mexico' },
  { value: 'TR', label: 'Türkiye' },
  { value: 'OT', label: 'Other' },
] as const;

interface SupplierAssumption {
  originCountry: string;
  dutyRate: string;
}

interface LandedCostComparisonProps {
  ranking: QuoteRankingItem[];
  /** Total order quantity extracted from the quotes, when available. */
  defaultQuantity: number | null;
}

const FIELD_CLASS =
  'w-full rounded-lg border border-white/[0.08] bg-[#0d1210] px-3 py-2 text-sm text-white focus:border-[#c7ff6b]/60 focus:outline-none';

function money(value: number | null, currency: string | null): string {
  if (value === null) return '—';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency ?? ''}`.trim();
  }
}

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Re-ranks the comparable quotes by true landed cost. The headline case is a
 * ranking inversion: the cheapest factory price is often not the cheapest
 * delivered cost once origin-specific duty is applied.
 */
export const LandedCostComparison: React.FC<LandedCostComparisonProps> = ({
  ranking,
  defaultQuantity,
}) => {
  const comparableQuotes = useMemo(
    () =>
      ranking.filter(
        (item): item is QuoteRankingItem & { amount: number } =>
          typeof item.amount === 'number',
      ),
    [ranking],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [assumptions, setAssumptions] = useState<Record<string, SupplierAssumption>>(
    () =>
      Object.fromEntries(
        comparableQuotes.map((quote) => [
          quote.fileName,
          { originCountry: 'CN', dutyRate: '0' },
        ]),
      ),
  );
  const [shared, setShared] = useState({
    quantity: String(defaultQuantity ?? 1000),
    destinationMarket: 'US' as LandedComparisonSharedInput['destinationMarket'],
    shippingMode: 'sea_lcl' as LandedComparisonSharedInput['shippingMode'],
    freightCostTotal: '1850',
    insuranceCost: '150',
    localPortCharges: '350',
    lastMileDelivery: '450',
  });

  const result = useMemo(() => {
    const suppliers: LandedComparisonSupplierInput[] = comparableQuotes.map(
      (quote) => {
        const assumption = assumptions[quote.fileName] ?? {
          originCountry: 'CN',
          dutyRate: '0',
        };

        return {
          fileName: quote.fileName,
          supplierName: quote.supplierName,
          unitPriceFob: quote.amount,
          currency: quote.currency,
          originCountry: assumption.originCountry,
          dutyRatePercent: toNumber(assumption.dutyRate),
        };
      },
    );

    return compareLandedCosts(suppliers, {
      quantity: toNumber(shared.quantity),
      destinationMarket: shared.destinationMarket,
      shippingMode: shared.shippingMode,
      freightCostTotal: toNumber(shared.freightCostTotal),
      insuranceCost: shared.insuranceCost.trim()
        ? toNumber(shared.insuranceCost)
        : null,
      localPortCharges: toNumber(shared.localPortCharges),
      lastMileDelivery: toNumber(shared.lastMileDelivery),
    });
  }, [comparableQuotes, assumptions, shared]);

  if (comparableQuotes.length < 2) {
    return null;
  }

  const currency = comparableQuotes[0]?.currency ?? 'USD';
  const fobWinner = result.rows.find(
    (row) => row.fileName === result.fobWinnerFileName,
  );
  const landedWinner = result.rows.find(
    (row) => row.fileName === result.landedWinnerFileName,
  );

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#c7ff6b]/25 bg-gradient-to-r from-[#c7ff6b]/[0.08] to-transparent p-4 text-left transition-colors hover:border-[#c7ff6b]/45"
      >
        <span className="flex items-center gap-3">
          <span className="rounded-xl bg-[#c7ff6b]/12 p-2 text-[#c7ff6b]">
            <Ship className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-bold text-white">
              Compare true landed cost
            </span>
            <span className="block text-xs text-[#849188]">
              The cheapest factory price is often not the cheapest delivered
              cost once duty is applied.
            </span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#c7ff6b]" aria-hidden="true" />
      </button>
    );
  }

  return (
    <section
      className="space-y-5 rounded-2xl border border-[#c7ff6b]/25 bg-white/[0.02] p-5"
      aria-labelledby="landed-comparison-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4
            id="landed-comparison-title"
            className="flex items-center gap-2 text-sm font-bold text-white"
          >
            <Ship className="h-4 w-4 text-[#c7ff6b]" aria-hidden="true" />
            True landed cost comparison
          </h4>
          <p className="mt-0.5 text-xs text-[#849188]">
            Enter each supplier&apos;s country of origin and duty rate. Use the
            HS Codes tab to research a rate, then verify it against official
            tariff data.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="shrink-0 rounded-lg border border-white/[0.08] px-2.5 py-1 text-xs text-[#849188] transition-colors hover:text-white"
        >
          Hide
        </button>
      </div>

      {/* Headline: ranking inversion */}
      {result.comparable && result.inverted && fobWinner && landedWinner && (
        <div className="relative overflow-hidden rounded-2xl border border-[#f1b47d]/35 bg-gradient-to-br from-[#f1b47d]/[0.12] via-[#c7ff6b]/[0.05] to-transparent p-5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#f1b47d]">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Ranking flips on landed cost
          </span>
          <p className="mt-2 text-sm leading-relaxed text-white">
            <strong className="text-[#f7cfa3]">
              {fobWinner.supplierName ?? fobWinner.fileName}
            </strong>{' '}
            has the lowest factory price at{' '}
            {money(fobWinner.unitPriceFob, currency)}/unit — but{' '}
            <strong className="text-[#c7ff6b]">
              {landedWinner.supplierName ?? landedWinner.fileName}
            </strong>{' '}
            is cheaper delivered at{' '}
            <strong className="text-[#c7ff6b]">
              {money(landedWinner.landedUnitCost, currency)}/unit
            </strong>{' '}
            once the {fobWinner.dutyRatePercent}% duty on{' '}
            {fobWinner.originCountry} goods is applied
            {landedWinner.dutyRatePercent < fobWinner.dutyRatePercent &&
              `, versus ${landedWinner.dutyRatePercent}% from ${landedWinner.originCountry}`}
            .
          </p>
          {result.savingsTotal !== null && result.savingsTotal > 0 && (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-black text-[#c7ff6b]">
              <TrendingDown className="h-4 w-4" aria-hidden="true" />
              {money(result.savingsTotal, currency)} saved on this order
              {result.savingsPercent !== null && ` (${result.savingsPercent}%)`}
            </p>
          )}
        </div>
      )}

      {/* Per-supplier assumptions */}
      <div className="space-y-2">
        {comparableQuotes.map((quote) => {
          const assumption = assumptions[quote.fileName] ?? {
            originCountry: 'CN',
            dutyRate: '0',
          };
          const inputId = `landed-${quote.fileName.replace(/\W/g, '-')}`;

          return (
            <div
              key={quote.fileName}
              className="grid grid-cols-1 items-end gap-2 rounded-xl border border-white/[0.06] bg-[#0d1210]/60 p-3 sm:grid-cols-[1fr_auto_auto]"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  {quote.supplierName ?? quote.fileName}
                </p>
                <p className="text-[11px] text-[#6f7c74]">
                  {money(quote.amount, quote.currency)} / unit factory price
                </p>
              </div>
              <div>
                <label
                  htmlFor={`${inputId}-origin`}
                  className="mb-1 block text-[10px] uppercase tracking-[0.08em] text-[#6f7c74]"
                >
                  Origin
                </label>
                <select
                  id={`${inputId}-origin`}
                  value={assumption.originCountry}
                  onChange={(event) =>
                    setAssumptions((current) => ({
                      ...current,
                      [quote.fileName]: {
                        ...assumption,
                        originCountry: event.target.value,
                      },
                    }))
                  }
                  className={`${FIELD_CLASS} py-1.5 text-xs`}
                >
                  {ORIGIN_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor={`${inputId}-duty`}
                  className="mb-1 block text-[10px] uppercase tracking-[0.08em] text-[#6f7c74]"
                >
                  Duty %
                </label>
                <input
                  id={`${inputId}-duty`}
                  type="number"
                  min="0"
                  step="0.1"
                  value={assumption.dutyRate}
                  onChange={(event) =>
                    setAssumptions((current) => ({
                      ...current,
                      [quote.fileName]: {
                        ...assumption,
                        dutyRate: event.target.value,
                      },
                    }))
                  }
                  className={`${FIELD_CLASS} w-24 py-1.5 text-xs`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared logistics assumptions */}
      <details className="rounded-xl border border-white/[0.06] bg-[#0d1210]/60 p-3">
        <summary className="cursor-pointer text-xs font-semibold text-[#849188]">
          Shared logistics assumptions
        </summary>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div>
            <label htmlFor="landed-cmp-qty" className="mb-1 block text-[11px] text-[#849188]">
              Quantity
            </label>
            <input
              id="landed-cmp-qty"
              type="number"
              min="1"
              step="1"
              value={shared.quantity}
              onChange={(event) =>
                setShared((current) => ({ ...current, quantity: event.target.value }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            />
          </div>
          <div>
            <label htmlFor="landed-cmp-dest" className="mb-1 block text-[11px] text-[#849188]">
              Destination
            </label>
            <select
              id="landed-cmp-dest"
              value={shared.destinationMarket}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  destinationMarket: event.target
                    .value as LandedComparisonSharedInput['destinationMarket'],
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            >
              {Object.entries(DESTINATION_MARKET_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="landed-cmp-mode" className="mb-1 block text-[11px] text-[#849188]">
              Shipping mode
            </label>
            <select
              id="landed-cmp-mode"
              value={shared.shippingMode}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  shippingMode: event.target
                    .value as LandedComparisonSharedInput['shippingMode'],
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            >
              {Object.entries(SHIPPING_MODE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="landed-cmp-freight" className="mb-1 block text-[11px] text-[#849188]">
              Freight ($)
            </label>
            <input
              id="landed-cmp-freight"
              type="number"
              min="0"
              value={shared.freightCostTotal}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  freightCostTotal: event.target.value,
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            />
          </div>
          <div>
            <label htmlFor="landed-cmp-ins" className="mb-1 block text-[11px] text-[#849188]">
              Insurance ($)
            </label>
            <input
              id="landed-cmp-ins"
              type="number"
              min="0"
              value={shared.insuranceCost}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  insuranceCost: event.target.value,
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            />
          </div>
          <div>
            <label htmlFor="landed-cmp-port" className="mb-1 block text-[11px] text-[#849188]">
              Port charges ($)
            </label>
            <input
              id="landed-cmp-port"
              type="number"
              min="0"
              value={shared.localPortCharges}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  localPortCharges: event.target.value,
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            />
          </div>
          <div>
            <label htmlFor="landed-cmp-mile" className="mb-1 block text-[11px] text-[#849188]">
              Delivery ($)
            </label>
            <input
              id="landed-cmp-mile"
              type="number"
              min="0"
              value={shared.lastMileDelivery}
              onChange={(event) =>
                setShared((current) => ({
                  ...current,
                  lastMileDelivery: event.target.value,
                }))
              }
              className={`${FIELD_CLASS} py-1.5 text-xs`}
            />
          </div>
        </div>
      </details>

      {/* Landed ranking */}
      {result.comparable ? (
        <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full min-w-[560px] text-sm">
            <caption className="sr-only">
              Supplier ranking by true landed cost
            </caption>
            <thead className="bg-[#0d1210] text-left text-[11px] uppercase tracking-[0.06em] text-[#6f7c74]">
              <tr>
                <th scope="col" className="px-3 py-2.5">Landed rank</th>
                <th scope="col" className="px-3 py-2.5">Supplier</th>
                <th scope="col" className="px-3 py-2.5 text-right">Factory</th>
                <th scope="col" className="px-3 py-2.5 text-right">Duty / unit</th>
                <th scope="col" className="px-3 py-2.5 text-right">Landed / unit</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row) => {
                const isWinner = row.landedRank === 1;

                return (
                  <tr
                    key={row.fileName}
                    className={`border-t border-white/[0.06] ${
                      isWinner ? 'bg-[#c7ff6b]/[0.06]' : ''
                    }`}
                  >
                    <td className="px-3 py-3">
                      <span
                        className={`font-bold ${isWinner ? 'text-[#c7ff6b]' : 'text-gray-300'}`}
                      >
                        #{row.landedRank}
                      </span>
                      {row.rankDelta !== 0 && (
                        <span
                          className={`ml-1.5 text-[10px] font-semibold ${
                            row.rankDelta > 0 ? 'text-[#9ff0cf]' : 'text-[#f7cfa3]'
                          }`}
                          title={`Was #${row.fobRank} on factory price`}
                        >
                          {row.rankDelta > 0 ? '▲' : '▼'}
                          {Math.abs(row.rankDelta)}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className="block font-semibold text-white">
                        {row.supplierName ?? 'Unidentified supplier'}
                      </span>
                      <span className="text-[11px] text-[#6f7c74]">
                        {row.originCountry} • {row.dutyRatePercent}% duty
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-gray-300">
                      {money(row.unitPriceFob, row.currency)}
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-[#f7cfa3]">
                      +{money(row.dutyPerUnit, row.currency)}
                    </td>
                    <td
                      className={`px-3 py-3 text-right font-mono font-bold ${
                        isWinner ? 'text-[#c7ff6b]' : 'text-white'
                      }`}
                    >
                      {money(row.landedUnitCost, row.currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-[#f1b47d]/30 bg-[#f1b47d]/[0.08] p-3 text-xs text-[#f7cfa3]">
          {result.warnings[0]}
        </p>
      )}

      {result.comparable && (
        <ul className="space-y-1 border-t border-white/[0.06] pt-3 text-[11px] text-[#849188]">
          {result.warnings.map((warning) => (
            <li key={warning}>• {warning}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
