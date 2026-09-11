/**
 * Indicative figures confirmed by the owner on 11 September 2026.
 *
 * These are starting points for planning, never commitments: the guardrails
 * prohibit guaranteed lead times, and a flat number published as fact becomes
 * an expectation the business has to meet on every order. Each figure is
 * therefore paired with what actually moves it, which is also what makes the
 * block worth quoting — competitors publish either nothing or a bare number.
 *
 * Every figure is confirmed per order in the quotation.
 */

export interface SourcingBenchmark {
  label: string;
  value: string;
  /** What changes the figure on a real project. */
  qualifier: string;
}

export const SOURCING_BENCHMARKS: SourcingBenchmark[] = [
  {
    label: 'Minimum order quantity',
    value: 'From 500 units',
    qualifier:
      'A common starting point. The real minimum follows the product, material, construction, decoration and the split across sizes or colours.',
  },
  {
    label: 'Samples',
    value: '1 to 2 weeks',
    qualifier:
      'Once the specification is agreed. A new mould, tooling or a custom material extends it, and a revised sample restarts the cycle.',
  },
  {
    label: 'Production',
    value: '45 to 60 days',
    qualifier:
      'After sample approval, before shipping. Quantity, decoration and factory loading at the time of order all move it.',
  },
];

export const BENCHMARKS_NOTE =
  'Indicative planning figures, not commitments. The quantity, sampling scope and production timing for your project are confirmed in your quotation.';

/** One sentence carrying the same figures, for reuse inside FAQ answers. */
export const BENCHMARKS_SENTENCE =
  'As an indication, minimum order quantities commonly start around 500 units, samples take one to two weeks once the specification is agreed, and production runs about 45 to 60 days after sample approval.';
