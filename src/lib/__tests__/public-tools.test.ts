import { describe, expect, it } from 'vitest';
import { assessMarketReadiness, calculateImportScenario, READINESS_CRITERIA } from '../public-tools';

const scenario = { unitPrice: 10, quantity: 100, freight: 200, insurance: 30, customsValue: 1200, baseDutyRate: 5, additionalDutyRate: 125, entryFees: 80, inlandCosts: 90 };
describe('public import planning arithmetic', () => {
  it('uses the explicit customs value and supports duties above 100 percent', () => {
    expect(calculateImportScenario(scenario)).toEqual({ goods: 1000, baseDuty: 60, additionalDuty: 1500, total: 2960, perUnit: 29.6 });
  });
  it('rejects zero and fractional quantities, negative inputs and non-finite totals', () => {
    for (const quantity of [0, 1.5, Infinity]) expect(() => calculateImportScenario({ ...scenario, quantity })).toThrow();
    expect(() => calculateImportScenario({ ...scenario, freight: -1 })).toThrow();
    expect(() => calculateImportScenario({ ...scenario, unitPrice: 1e12, quantity: 1e12 })).toThrow();
  });
});
describe('readiness checklist', () => {
  it('does not score an unanswered or invalid criterion', () => {
    expect(assessMarketReadiness({})).toBeNull();
    const answers = Object.fromEntries(READINESS_CRITERIA.map(item => [item.id, 2]));
    expect(assessMarketReadiness({ ...answers, resources: 3 })).toBeNull();
  });
  it('keeps a critical gap visible even with a high total', () => {
    const answers = Object.fromEntries(READINESS_CRITERIA.map(item => [item.id, 2]));
    const result = assessMarketReadiness({ ...answers, requirements: 0 });
    expect(result?.points).toBe(14);
    expect(result?.gaps.map(item => item.id)).toEqual(['requirements']);
  });
});
