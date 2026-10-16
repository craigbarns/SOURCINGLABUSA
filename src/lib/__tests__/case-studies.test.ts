import { describe, expect, it } from 'vitest';

import {
  CASE_STUDIES,
  caseStudyProblems,
  caseStudySummary,
  type CaseStudy,
} from '@/lib/case-studies';

const valid: CaseStudy = {
  slug: 'rigid-gift-boxes',
  title: 'Rigid gift boxes for a cosmetics brand',
  category: 'packaging',
  client: 'A U.S. cosmetics brand',
  deliveredBy: 'Led by the founder at a previous sourcing business',
  year: 2019,
  product: 'Magnetic-closure rigid boxes',
  quantity: '3,000 units in two sizes',
  destination: 'New Jersey, United States',
  challenge: 'The foil logo cracked on the first soft-touch sample.',
  approach: ['Changed the lamination order and re-sampled.'],
  outcome: 'The second sample was approved and the order shipped.',
  figures: [{ label: 'Sample rounds', value: '2', evidence: 'Sample approval emails' }],
  approval: { approvedBy: 'Gregory Baranes', date: '2026-10-16', namedClient: false },
};

describe('case studies', () => {
  it('accepts a complete, approved study', () => {
    expect(caseStudyProblems(valid)).toEqual([]);
  });

  it('refuses a study that does not say where it was delivered', () => {
    expect(caseStudyProblems({ ...valid, deliveredBy: ' ' })).toContain('deliveredBy is empty');
  });

  it('refuses a study nobody approved', () => {
    expect(
      caseStudyProblems({ ...valid, approval: { ...valid.approval, approvedBy: '' } }),
    ).toContain('publication has not been approved');
  });

  it('refuses a figure without evidence', () => {
    expect(
      caseStudyProblems({
        ...valid,
        figures: [{ label: 'Unit cost change', value: '-22%', evidence: '' }],
      }),
    ).toContain('figure "Unit cost change" has no evidence');
  });

  it('keeps "U.S." intact and lower-cases only an anonymized client', () => {
    expect(caseStudySummary(valid)).toBe(
      'Magnetic-closure rigid boxes, 3,000 units in two sizes, for a U.S. cosmetics brand, delivered to New Jersey, United States.',
    );
    expect(
      caseStudySummary({
        ...valid,
        client: 'Acme Cosmetics',
        approval: { ...valid.approval, namedClient: true },
      }),
    ).toContain('for Acme Cosmetics,');
  });

  it('publishes only studies that pass, with unique slugs', () => {
    for (const study of CASE_STUDIES) {
      expect(caseStudyProblems(study), study.slug).toEqual([]);
    }
    const slugs = CASE_STUDIES.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
