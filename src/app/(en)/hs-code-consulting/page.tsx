import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'HS Code Consulting & Tariff Classification USA | Sourcing Lab USA',
  description:
    'HTSUS classification research, product documentation and tariff assumptions for review with your appointed customs broker or trade adviser.',
  path: '/hs-code-consulting',
});

const page: ServicePageContent = {
  path: '/hs-code-consulting',
  reviewedDate: '2026-10-21',
  references: [
    { title: 'USITC — Harmonized Tariff Schedule', url: 'https://hts.usitc.gov/' },
    { title: 'CBP — Binding Ruling Program', url: 'https://www.help.cbp.gov/s/article/Article-1106?language=en_US' },
    { title: 'USTR — China Section 301 tariff actions', url: 'https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions' },
  ],
  eyebrow: 'Customs & Trade Advisory · Tariff Classification',
  title: 'HS Code Consulting & U.S. Tariff Classification',
  directAnswer:
    'HS code research brings together a product description, materials, intended use and candidate U.S. Harmonized Tariff Schedule classifications for review before importing. Sourcing Lab USA helps organize this research and its assumptions. Your appointed customs broker or trade adviser should review classification and applicable duties; only CBP can issue a binding customs ruling.',
  intro:
    'An unsupported tariff code can distort a purchasing budget and create questions when goods are entered. Start with the actual product specification and record the basis for any classification assumption. Sourcing Lab USA provides research support and organizes technical information for your appointed customs professional; it does not act as a licensed customs broker or issue legal opinions.',
  overviewTitle: 'Defensible classification research, grounded in the GRIs and published CBP rulings.',
  overview:
    'A supplier code is a starting point to investigate. Gather material composition, construction, function, images and relevant product variants, then compare candidate HTSUS entries and notes. Record uncertainties and questions for the broker or trade adviser rather than treating a search result as an approved classification.',
  processTitle: 'The 4-step tariff classification methodology.',
  offerName: 'HS Code & Customs Tariff Consulting',
  offerDescription:
    'Product documentation, candidate HTSUS classification research and tariff assumptions for review by appointed customs professionals.',
  focusAreas: [
    {
      title: '10-Digit HTSUS Precision Classification',
      body: 'We gather the product facts and identify candidate HTSUS entries and notes to discuss with your customs broker. A candidate code is not a binding classification decision.',
    },
    {
      title: 'Section 301 & Antidumping (AD/CVD) Screening',
      body: 'Flag additional-duty and trade-remedy questions for specialist review using current official information. Applicability depends on the merchandise, origin, scope and entry date; no universal rate is assumed.',
    },
    {
      title: 'CBP Binding Ruling Submissions (e-Rulings)',
      body: 'For uncertain classifications, we can organize the product facts that your importer or appointed adviser needs to consider a CBP ruling request. CBP determines acceptance, timing and the decision; we do not guarantee a ruling.',
    },
    {
      title: 'Product Changes & Classification Questions',
      body: 'Changes to materials, construction or presentation may require a new classification review. Discuss proposed changes with qualified trade counsel before relying on any expected duty outcome.',
    },
  ],
  briefItems: [
    'Detailed product description, intended use, and functioning mechanism',
    'Component breakdown and material composition percentages (by weight and value)',
    'Manufacturing processes, engineering schematics, and photos from all angles',
    'Country of origin and existing supplier tariff suggestions (if any)',
  ],
  workflow: [
    {
      title: 'Technical Specification & Material Audit',
      body: 'We review your engineering files, material safety data sheets (MSDS), and component breakdowns to establish the product’s essential character and classification factors.',
    },
    {
      title: 'GRI Analysis & CBP Precedent Search',
      body: 'We evaluate the General Rules of Interpretation and search CROSS (Customs Rulings Online Search System) for published CBP precedent rulings on identical or analogous merchandise.',
    },
    {
      title: 'Classification Opinion & Duty Schedule',
      body: 'An agreed research note records candidate codes, sources, review date and unresolved questions. Any duty scenario states its assumptions and requires professional confirmation for the shipment.',
    },
    {
      title: 'Broker Coordination & Customs Alignment',
      body: 'Share the research and supporting documents with your appointed broker or adviser. The importer and its appointed professionals handle the entry decisions and filings.',
    },
  ],
  benchmarks: [
    {
      label: 'Standard classification memo',
      value: 'Scope agreed first',
      qualifier: 'Product facts, candidate codes, sources and questions to resolve.',
    },
    {
      label: 'CBP Binding Ruling petition',
      value: 'CBP decision',
      qualifier: 'Your appointed adviser can explain the request process; no agency processing time is promised.',
    },
    {
      label: 'Specialist review',
      value: 'Before reliance',
      qualifier: 'Trade-remedy scope and proposed product changes require appropriate professional review.',
    },
  ],
  benchmarksNote:
    'Research deliverables and timing are agreed for the product. Rates and applicability must be rechecked for the shipment date.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between an HS code and an HTS code?',
      answer:
        'The international Harmonized System provides six-digit product groupings. The U.S. HTSUS adds national detail, including ten-digit statistical reporting numbers. A supplier’s shorter code does not by itself establish the correct U.S. entry classification.',
    },
    {
      question: 'Can I just use the HS code provided by my Chinese supplier?',
      answer:
        'Treat it as a suggestion. Check the actual product against U.S. HTSUS descriptions and notes, and have your appointed customs professional review it. A supplier’s export documentation does not replace the importer’s U.S. classification review.',
    },
    {
      question: 'What is a CBP Binding Ruling and why is it valuable?',
      answer:
        'A CBP ruling addresses a prospective transaction on the facts presented. Its applicability depends on the ruling, the merchandise and the governing rules. It does not confer blanket immunity from audits, changed laws or examination of whether the imported goods match those facts. Ask your trade adviser whether a request is appropriate.',
    },
    {
      question: 'What happens if U.S. Customs reclassifies my imported product?',
      answer:
        'Provide the notice and supporting product and entry records to your customs broker or trade counsel promptly. The response, duty consequences and available procedures depend on the facts and the notice; a generic website answer cannot determine them.',
    },
    {
      question: 'What is legal tariff engineering?',
      answer:
        'The term describes considering tariff treatment when designing a product. A proposed material, assembly or presentation change needs a fact-specific review by qualified trade counsel. Do not alter descriptions or assume a lower duty without that review.',
    },
  ],
  briefTitle: 'Request an HS code classification review.',
  briefIntro:
    'Share your product description, materials, and photos. We can scope the research and identify questions to review with your appointed customs professional.',
  relatedPages: [
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model import costs using documented duty assumptions and verified shipment inputs.',
    },
    {
      href: '/tools/hs-code-finder',
      title: 'HS Code Finder Tool',
      description: 'Interactive AI-assisted tariff code lookup and duty rate estimation tool.',
    },
    {
      href: '/import-from-china',
      title: 'Importing from China to USA',
      description: 'End-to-end guidance on customs compliance, documentation, and shipping.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight Sourcing & Logistics',
      description: 'Compare transport requirements and coordinate with appointed freight and customs providers.',
    },
  ],
};

export default function HsCodeConsultingPage() {
  return <ServiceLandingPage page={page} />;
}
