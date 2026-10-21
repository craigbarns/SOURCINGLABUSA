import { describe, expect, it } from 'vitest';

import { marketEntryInputSchema, marketEntryToContact } from '@/lib/validation/market-entry';

const inquiry = {
  journey: 'market_entry', name: 'Jane Doe', email: 'JANE@EXAMPLE.COM',
  company: 'Example Manufacturing', country: 'France', productCategory: 'Custom packaging',
  objectives: 'Identify U.S. distributors for our packaging range.',
};

describe('market-entry qualification', () => {
  it('requires a manufacturer identity and substantive commercial objective', () => {
    const result = marketEntryInputSchema.safeParse({ ...inquiry, company: '', country: '', objectives: 'Sales' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toHaveProperty('company');
      expect(result.error.flatten().fieldErrors).toHaveProperty('country');
      expect(result.error.flatten().fieldErrors).toHaveProperty('objectives');
    }
  });

  it('retains qualification in the existing durable storage format without implying an order quantity', () => {
    const parsed = marketEntryInputSchema.parse({ ...inquiry, capabilities: 'Printed cartons', exportActivity: 'EU wholesale', targetCustomers: 'Regional distributors', expansionBudget: 'USD 20000', botField: 'trap' });
    const stored = marketEntryToContact(parsed);
    expect(stored).toMatchObject({ email: 'jane@example.com', company: 'Example Manufacturing', projectType: 'other', quantityRange: 'not_sure', botField: 'trap' });
    expect(stored.message).toContain('U.S. MARKET ENTRY / SALES REPRESENTATION INQUIRY');
    expect(stored.message).toContain('Existing export activity: EU wholesale');
    expect(stored.message).toContain('Estimated expansion budget and currency: USD 20000');
  });

  it('keeps the largest permitted qualification brief within the existing 4000-character limit', () => {
    const parsed = marketEntryInputSchema.parse({ ...inquiry, company: 'c'.repeat(160), country: 'c'.repeat(100), productCategory: 'p'.repeat(160), objectives: 'o'.repeat(900), capabilities: 'c'.repeat(500), exportActivity: 'e'.repeat(400), targetCustomers: 't'.repeat(400), expansionBudget: 'b'.repeat(160) });
    expect(marketEntryToContact(parsed).message.length).toBeLessThanOrEqual(4000);
  });

  it('rejects unrelated extra fields and oversized free text', () => {
    expect(marketEntryInputSchema.safeParse({ ...inquiry, isAdmin: true }).success).toBe(false);
    expect(marketEntryInputSchema.safeParse({ ...inquiry, capabilities: 'x'.repeat(501) }).success).toBe(false);
  });
});
