import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Building Materials from China',
  description:
    'Building materials and hardware are not a specialty. A project is reviewed for feasibility before it is quoted, then supplied under the same contract.',
  path: '/industries/building-materials',
});

const page: ServicePageContent = {
  path: '/industries/building-materials',
  eyebrow: 'Other products · Feasibility review',
  title: 'Building materials: reviewed for feasibility, not a specialty.',
  directAnswer:
    'Building materials and hardware are outside our core business, which is custom packaging and textiles. A project can be reviewed on request: we check whether the specification, tolerances, the evidence your project needs and the quantity can be quoted through our partnership in China before anything is promised. If the answer is no, we say so.',
  intro:
    'Construction products are usually bought against a specification and a standard named in the project documents. What decides feasibility is less the product than the evidence: test reports, certificates and tolerances the buyer, the inspector or the code official will ask for.',
  overviewTitle: 'Specification and evidence first.',
  overview:
    'The review starts from your drawings or product data sheet and from the standard or listing your project requires. It checks whether a manufacturer can make the item to that specification and provide the evidence, and ends with a clear answer: quoted, quoted with conditions, or declined.',
  processTitle: 'How a building-materials request is handled.',
  offerName: 'Building materials: feasibility review',
  offerDescription:
    'Feasibility review of a building-material or hardware project before any quotation, as an other product outside the core packaging and textile supply.',
  boundary: {
    coordinate: [
      'A feasibility review against your specification and required standard',
      'If feasible: factory options, pricing and samples, as for any supply',
      'Collecting the manufacturer’s existing test reports and certificates for your review',
    ],
    notDone: [
      'Presenting building materials as a specialty or guaranteeing feasibility',
      'Certifying products or issuing listings: that is for accredited bodies',
      'Freight forwarding, customs clearance or U.S. storage',
      'Delivery to site, installation or code approval',
    ],
  },
  focusAreas: [
    {
      title: 'Specification',
      body: 'Drawings, product data sheets, finishes and tolerances. Construction items are judged against them, not against a reference photo.',
    },
    {
      title: 'Standards evidence',
      body: 'Many items must meet a standard or carry a listing named in your project. The review checks what evidence the manufacturer already holds; testing and certification are done by accredited bodies.',
    },
    {
      title: 'Quantity and project timing',
      body: 'Construction orders follow project schedules. The review says whether your quantity and dates are realistic before anything is committed.',
    },
    {
      title: 'Weight and volume',
      body: 'Heavy or long items change freight costs sharply. Packing and carton data are part of the review because they change the landed cost.',
    },
  ],
  briefItems: [
    'Drawings or product data sheets',
    'The standard or listing your project requires',
    'Quantity and project dates',
    'Destination',
  ],
  workflow: [
    {
      title: 'Feasibility review',
      body: 'We review the specification, the evidence required and the quantity with our partnership in China.',
    },
    {
      title: 'A clear answer',
      body: 'Quoted, quoted with conditions, or declined, with the reason.',
    },
    {
      title: 'Supply as usual',
      body: 'If quoted, the project follows the usual supply: factory options, pricing, samples, order and production follow-up.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Are building materials a specialty of Sourcing Lab USA?',
      answer:
        'No. Our business is custom packaging and textiles. Building materials and hardware are reviewed for feasibility on request, before anything is quoted.',
    },
    {
      question: 'Can you certify that a product meets a U.S. standard?',
      answer:
        'No. Certification and listings come from accredited bodies. We collect the manufacturer’s existing evidence for your review and say what is missing.',
    },
    {
      question: 'Who handles freight and the import?',
      answer: NOT_AN_IMPORTER.en,
    },
  ],
  briefTitle: 'Send your specification.',
  briefIntro:
    'Drawings or data sheets, the standard required, quantity and dates. We confirm whether it can be quoted before anything else.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Other products',
      description: 'How products outside packaging and textiles are reviewed.',
    },
    {
      href: '/blog/building-materials-sourcing-brief',
      title: 'Building materials sourcing brief',
      description: 'What to put in writing before asking for a quotation.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'Why weight and volume weigh on the final cost.',
    },
  ],
};

export default function BuildingMaterialsIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
