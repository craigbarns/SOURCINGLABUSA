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
 * While the list is empty, /case-studies returns 404 and nothing is added
 * to the sitemap or menus.
 *
 * The first studies (16 October 2026) were written from the founder's project
 * email record. Where that record stops, the outcome adds only what the founder
 * confirmed, attributed as such. Clients are described, never named.
 */

export type CaseStudyCategory = 'packaging' | 'textile' | 'sportswear' | 'other';

/**
 * Every case carries one of two labels (AGENTS.md). "founder": a project from
 * the founder's earlier work, before Sourcing Lab USA. "current": a Sourcing
 * Lab USA project, allowed only with a current project record.
 */
export type CaseStudyRecord = 'founder' | 'current';

export const CASE_STUDY_RECORD_LABELS: Record<CaseStudyRecord, string> = {
  founder: 'Founder’s record, before Sourcing Lab USA',
  current: 'Sourcing Lab USA project',
};

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
  record: CaseStudyRecord;
  /**
   * For a "current" case: the Sourcing Lab USA record it rests on, such as a
   * quotation or order reference. Kept for the record and never rendered.
   */
  projectRecord?: string;
  year: number;
  product: string;
  /** As documented, e.g. "3,000 units in two sizes" or "two box sizes". */
  quantity: string;
  /** Only when delivery is documented; the summary then says "delivered to". */
  destination?: string;
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'rigid-boxes-white-sample-corrections',
    title: 'Rigid boxes corrected to the millimeter on the white sample',
    category: 'packaging',
    client: 'A French client',
    deliveredBy: 'Led by the founder through a sourcing company with an office in Shanghai, before Sourcing Lab USA was created',
    record: 'founder',
    year: 2012,
    product: 'Rigid boxes',
    quantity: 'two sizes',
    challenge:
      'The unprinted white sample showed that neither box size was right: both were slightly too tall and too wide, and the larger box was also too short.',
    approach: [
      'Collected the client’s comments on the unprinted white sample.',
      'Turned them into exact corrections for the factory: the small box 2 mm lower and 3 mm narrower; the large box 2 mm lower, 3 mm narrower and 5 mm longer.',
      'Sent the corrections in writing to the team in Shanghai, before any printing.',
    ],
    outcome:
      'The size corrections were fixed in writing against the white sample, so printing and production started from the corrected dimensions instead of reworking printed boxes. The founder confirms the project was completed; the email record itself ends at the correction step.',
    approval: { approvedBy: 'Gregory Baranes', date: '2026-10-16', namedClient: false },
  },
  {
    slug: 'bag-color-complaint-retained-sample',
    title: 'A color complaint checked against the retained production sample',
    category: 'other',
    client: 'A French menswear brand',
    deliveredBy: 'Led by the founder through a sourcing company with an office in Shanghai, before Sourcing Lab USA was created',
    record: 'founder',
    year: 2019,
    product: 'Branded bags',
    quantity: 'one production order',
    challenge:
      'The brand reported that the bags it received were the wrong size, and light gray instead of the dark gray it had approved.',
    approach: [
      'Raised the size and color complaint with the team in Shanghai the same week.',
      'Checked the production sample kept at the Shanghai office, which showed the dark gray that had been made.',
      'Asked the brand for a physical sample of the color it expected, so the two references could be compared side by side rather than described.',
    ],
    outcome:
      'The color question moved from opinion to evidence: a photo of the retained production sample on one side, the brand’s color reference on the other. The founder confirms the complaint was resolved; the email record itself ends at that comparison.',
    approval: { approvedBy: 'Gregory Baranes', date: '2026-10-16', namedClient: false },
  },
  {
    slug: 'retail-hangers-approved-sample',
    title: 'Retail hangers confirmed in writing against the approved sample',
    category: 'other',
    client: 'A fashion retail client',
    deliveredBy: 'Led by the founder through a sourcing company with an office in Shanghai, before Sourcing Lab USA was created',
    record: 'founder',
    year: 2012,
    product: 'Retail hangers',
    quantity: '2,000 units: 500 standard and 1,500 lingerie hangers',
    challenge:
      'The client had confirmed the order, but the factory had not received the final quantities, and one detail differed from the approved sample: the standard hanger was to be made without its notch.',
    approach: [
      'Chased the missing confirmation the day the gap was found.',
      'Confirmed the split in writing: 500 standard hangers and 1,500 lingerie hangers, both as the approved sample.',
      'The factory asked for the one change from the sample, a standard hanger without its notch, to be confirmed in writing before production.',
    ],
    outcome:
      'Quantities and the single change from the approved sample were set down in writing before production, so the order did not rest on a verbal brief. The founder confirms the order was completed; the email record itself ends at that confirmation.',
    approval: { approvedBy: 'Gregory Baranes', date: '2026-10-16', namedClient: false },
  },
];

/** Lists what stops a study from being published; empty means publishable. */
export function caseStudyProblems(study: CaseStudy): string[] {
  const problems: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug)) problems.push('slug must be kebab-case');
  for (const field of ['title', 'client', 'deliveredBy', 'product', 'quantity', 'challenge', 'outcome'] as const) {
    if (!study[field].trim()) problems.push(`${field} is empty`);
  }
  if (study.approach.length === 0) problems.push('approach has no steps');
  if (study.record === 'current' && !study.projectRecord?.trim()) {
    problems.push('a Sourcing Lab USA project needs a current project record');
  }
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
  const delivery = study.destination ? `, delivered to ${study.destination}` : '';
  return `${study.product}, ${study.quantity}, for ${client}${delivery}.`;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
