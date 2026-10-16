/**
 * Case studies are published from real projects only, and AGENTS.md sets
 * the bar: no client identity, result, saving, lead time or photo without
 * documented proof and approval.
 *
 * Sourcing Lab USA is a new business. Projects from the founder's earlier
 * career were carried out under other companies, so every study states
 * where it was delivered. Presenting them as Sourcing Lab USA references
 * would misstate the company's track record.
 *
 * The list is empty until the owner supplies projects. While it is empty,
 * /case-studies returns 404 and nothing is added to the sitemap or menus.
 */

export type CaseStudyCategory = 'packaging' | 'textile' | 'sportswear' | 'other';

export interface CaseStudyFigure {
  /** e.g. "Unit cost change" or "Sample rounds". */
  label: string;
  /** As it will be displayed, e.g. "3 rounds". */
  value: string;
  /**
   * The document that proves the figure (purchase order, invoice,
   * inspection report). Kept for the record and never rendered.
   */
  evidence: string;
}

export interface CaseStudy {
  slug: string;
  /** Factual, e.g. "Rigid gift boxes for a cosmetics brand". */
  title: string;
  category: CaseStudyCategory;
  /**
   * The client described without identifying it, e.g. "A U.S. specialty
   * coffee brand". A name appears only when approval.namedClient is true.
   */
  client: string;
  /**
   * Where the project was carried out, e.g. "Led by the founder at a
   * previous sourcing business". Required.
   */
  deliveredBy: string;
  year: number;
  product: string;
  /** As delivered, e.g. "3,000 units in two sizes". */
  quantity: string;
  destination: string;
  /** What made the project difficult. */
  challenge: string;
  /** What was done, in order. */
  approach: string[];
  /** The factual result. */
  outcome: string;
  figures?: CaseStudyFigure[];
  approval: {
    approvedBy: string;
    /** ISO date, YYYY-MM-DD. */
    date: string;
    namedClient: boolean;
  };
}

export const CASE_STUDY_CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  packaging: 'Packaging',
  textile: 'Clothing and textiles',
  sportswear: 'Sportswear',
  other: 'Other products',
};

export const CASE_STUDIES: CaseStudy[] = [];

/** Lists what stops a study from being published; empty means publishable. */
export function caseStudyProblems(study: CaseStudy): string[] {
  const problems: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug)) problems.push('slug must be kebab-case');
  for (const field of ['title', 'client', 'deliveredBy', 'product', 'quantity', 'destination', 'challenge', 'outcome'] as const) {
    if (!study[field].trim()) problems.push(`${field} is empty`);
  }
  if (study.approach.length === 0) problems.push('approach has no steps');
  if (!study.approval.approvedBy.trim()) problems.push('publication has not been approved');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(study.approval.date)) problems.push('approval date must be YYYY-MM-DD');
  for (const figure of study.figures ?? []) {
    if (!figure.evidence.trim()) problems.push(`figure "${figure.label}" has no evidence`);
  }
  return problems;
}

/**
 * One sentence that stands alone: product, quantity, client, destination.
 * An anonymized client ("A U.S. cosmetics brand") is lower-cased mid-sentence;
 * an approved client name is left as written.
 */
export function caseStudySummary(study: CaseStudy): string {
  const client = study.approval.namedClient
    ? study.client
    : study.client.charAt(0).toLowerCase() + study.client.slice(1);
  return `${study.product}, ${study.quantity}, for ${client}, delivered to ${study.destination}.`;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
