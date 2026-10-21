'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateImportScenario, type CostScenario } from '@/lib/public-tools';
import { trackEvent } from '@/lib/analytics';

const initial: Record<keyof CostScenario, string> = {
  unitPrice: '4.50', quantity: '3000', freight: '1850', insurance: '150',
  customsValue: '13500', baseDutyRate: '0', additionalDutyRate: '0', entryFees: '350', inlandCosts: '450',
};
const fields: { key: keyof CostScenario; label: string; hint: string }[] = [
  { key: 'unitPrice', label: 'Product price per unit (USD)', hint: 'Use a consistent quotation basis. Avoid counting freight twice.' },
  { key: 'quantity', label: 'Order quantity (units)', hint: 'A positive whole number.' },
  { key: 'freight', label: 'International freight (USD)', hint: 'Total quoted transport cost for this shipment.' },
  { key: 'insurance', label: 'Cargo insurance (USD)', hint: 'Enter the quoted premium; no automatic insurance rate is applied.' },
  { key: 'customsValue', label: 'Customs value (USD)', hint: 'Independent input: reconfirm this value whenever price or quantity changes. The example uses goods value; assists, royalties and other adjustments may change it.' },
  { key: 'baseDutyRate', label: 'Base duty rate (%)', hint: 'User supplied. Zero in the example is an assumption, not an applicable tariff.' },
  { key: 'additionalDutyRate', label: 'Additional ad valorem duties (%)', hint: 'User supplied combined rate on the same value basis. Rates above 100% are supported.' },
  { key: 'entryFees', label: 'Brokerage, entry fees and other charges (USD)', hint: 'Include verified MPF/HMF, specific duties and any other applicable amounts here.' },
  { key: 'inlandCosts', label: 'Destination transport and receiving (USD)', hint: 'Include delivery, handling and receiving costs relevant to the order.' },
];
const usd = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function ImportCostPlanner() {
  const [values, setValues] = useState(initial);
  const [result, setResult] = useState<ReturnType<typeof calculateImportScenario> | null>(null);
  const [error, setError] = useState('');
  const rows = result ? [
    ['Goods', result.goods], ['International freight', Number(values.freight)], ['Insurance', Number(values.insurance)],
    ['Base duty', result.baseDuty], ['Additional ad valorem duties', result.additionalDuty],
    ['Brokerage, entry fees and other charges', Number(values.entryFees)], ['Destination transport and receiving', Number(values.inlandCosts)],
  ] as const : [];
  return (
    <div className="not-prose my-10 rounded-2xl border border-brand-line bg-brand-surface p-5 sm:p-8">
      <p className="mb-6 text-sm leading-6 text-brand-muted">The prefilled figures are an illustrative scenario. Replace every input with your own quote and verified duty assumptions. All amounts are in USD; no exchange-rate conversion is performed. Inputs stay in this browser and are not submitted.</p>
      <form onSubmit={(event) => {
        event.preventDefault();
        try {
          if (Object.values(values).some(value => !value.trim())) throw new Error('Complete every field. Use 0 only where the cost does not apply.');
          const input = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])) as CostScenario;
          setResult(calculateImportScenario(input)); setError('');
          trackEvent('resource_complete', { resource: 'landed_cost_calculator' });
        } catch (err) { setResult(null); setError(err instanceof Error ? err.message : 'Check your inputs.'); }
      }}>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map(({ key, label, hint }) => <div key={key}>
            <label htmlFor={`cost-${key}`} className="mb-2 block text-sm font-semibold">{label}</label>
            <input id={`cost-${key}`} name={key} type="number" min={key === 'quantity' ? 1 : 0} step={key === 'quantity' ? '1' : 'any'} required value={values[key]} aria-describedby={`cost-${key}-hint`} className="min-h-12 w-full rounded-lg border border-brand-line bg-white px-3 py-2" onChange={event => { setValues(current => ({ ...current, [key]: event.target.value })); setResult(null); }} />
            <p id={`cost-${key}-hint`} className="mt-2 text-xs leading-5 text-brand-muted">{hint}</p>
          </div>)}
        </div>
        <button className="editorial-button mt-6" type="submit">Calculate my scenario</button>
        {error && <p role="alert" className="mt-4 text-sm text-brand-error">{error}</p>}
      </form>
      {result && <section aria-live="polite" className="mt-8 border-t border-brand-line pt-6">
        <h2 className="text-2xl font-medium">Your planning estimate</h2>
        <dl className="mt-4 grid gap-3">{rows.map(([label, amount]) => <div className="flex flex-wrap justify-between gap-2 text-sm" key={label}><dt>{label}</dt><dd>{usd(amount)}</dd></div>)}
          <div className="flex flex-wrap justify-between gap-2 border-t border-brand-line pt-4 font-bold"><dt>Total landed cost</dt><dd>{usd(result.total)}</dd></div>
          <div className="flex flex-wrap justify-between gap-2 font-bold"><dt>Cost per unit</dt><dd>{usd(result.perUnit)}</dd></div>
        </dl>
        <p className="mt-5 text-xs leading-6 text-brand-muted">Total = goods + freight + insurance + customs value × (base rate + additional rate) ÷ 100 + entry fees + inland costs. Per unit = total ÷ quantity. Components use full precision; displayed amounts are rounded to cents. The model applies both percentage rates to the customs value entered. Specific, compound or different valuation bases need separate calculations entered as other charges. Missing taxes, storage, testing or product-specific duties can materially change the result.</p>
        <Link href="/landed-cost-analysis#contact" className="editorial-button mt-5">Review my sourcing costs</Link>
      </section>}
    </div>
  );
}
