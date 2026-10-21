export type CostScenario = {
  unitPrice: number;
  quantity: number;
  freight: number;
  insurance: number;
  customsValue: number;
  baseDutyRate: number;
  additionalDutyRate: number;
  entryFees: number;
  inlandCosts: number;
};

/** Planning arithmetic only. Rates and valuation are supplied by the user. */
export function calculateImportScenario(input: CostScenario) {
  for (const [field, value] of Object.entries(input)) {
    if (!Number.isFinite(value) || value < 0 || value > 1e12) {
      throw new Error(`Enter a finite, nonnegative value for ${field}.`);
    }
  }
  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    throw new Error('Quantity must be a positive whole number.');
  }
  const goods = input.unitPrice * input.quantity;
  const baseDuty = input.customsValue * input.baseDutyRate / 100;
  const additionalDuty = input.customsValue * input.additionalDutyRate / 100;
  const total = goods + input.freight + input.insurance + baseDuty + additionalDuty + input.entryFees + input.inlandCosts;
  if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER / 100) {
    throw new Error('This scenario exceeds the supported calculation range.');
  }
  return { goods, baseDuty, additionalDuty, total, perUnit: total / input.quantity };
}

export const READINESS_CRITERIA = [
  { id: 'customer', title: 'Target customer', question: 'Have you identified the U.S. buyer segment and the problem your product solves?', action: 'Name one buyer segment, its purchasing use case and the reason to switch suppliers.' },
  { id: 'economics', title: 'Channel economics', question: 'Have you modeled export pricing, delivery costs and the margin required by your target channel?', action: 'Prepare a price waterfall with freight, duties, channel margin and returns assumptions.' },
  { id: 'evidence', title: 'Product evidence', question: 'Do you have a clear product specification and evidence supporting performance claims?', action: 'Assemble specifications, test reports where applicable and a claims evidence folder.' },
  { id: 'requirements', title: 'Import and product requirements', question: 'Have the requirements for your exact product and destination been reviewed with appropriate specialists?', action: 'Have qualified customs, legal or testing specialists review the exact product and intended use.' },
  { id: 'samples', title: 'Sample and production readiness', question: 'Can you document sample availability, production capacity and quality checkpoints?', action: 'Document sampling steps, production limits and acceptance criteria.' },
  { id: 'materials', title: 'Sales materials', question: 'Are your English product sheets, quotation terms and buyer presentation ready?', action: 'Prepare a concise English line sheet, specification pack and quotation with clear responsibilities.' },
  { id: 'fulfillment', title: 'Order responsibilities', question: 'Are shipping, import, after-sales and returns responsibilities assigned?', action: 'Assign each order responsibility and validate the delivery model before making offers.' },
  { id: 'resources', title: 'Commercial commitment', question: 'Do you have an owner, a working budget and a process to follow up buyer opportunities?', action: 'Assign a commercial owner, budget and a repeatable opportunity follow-up process.' },
] as const;

export type ReadinessAnswers = Record<string, number | null>;

export function assessMarketReadiness(answers: ReadinessAnswers) {
  const values = READINESS_CRITERIA.map(({ id }) => answers[id]);
  if (values.some(value => value !== 0 && value !== 1 && value !== 2)) return null;
  const points = values.reduce<number>((sum, value) => sum + (value as number), 0);
  return {
    points,
    maximum: READINESS_CRITERIA.length * 2,
    percentage: Math.round(points / (READINESS_CRITERIA.length * 2) * 100),
    gaps: READINESS_CRITERIA.filter(({ id }) => answers[id] !== 2),
  };
}
