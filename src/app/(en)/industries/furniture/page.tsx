import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Furniture Sourcing from China',
  description:
    'Furniture is not a specialty. A project is reviewed for feasibility first, then supplied like the rest: factory search, samples, order and follow-up.',
  path: '/industries/furniture',
});

const page: ServicePageContent = {
  path: '/industries/furniture',
  eyebrow: 'Other products · Feasibility review',
  title: 'Furniture: reviewed for feasibility, not a specialty.',
  directAnswer:
    'Furniture is outside our core business, which is custom packaging and textiles. A furniture project can be reviewed on request: we check whether the piece, its materials, the quantity and the U.S. requirements can be quoted through our partnership in China before anything is promised. If the answer is no, we say so.',
  intro:
    'Furniture brings constraints that packaging and textiles do not: bulky freight, hardware and assembly, finish durability and, for some materials, specific U.S. rules. That is why it starts with a feasibility review rather than a quotation.',
  overviewTitle: 'What a feasibility review looks at.',
  overview:
    'The review checks whether a manufacturer can make the piece to your specification and quantity, what drives its cost, and which U.S. requirements may apply to its materials. It ends with a clear answer: quoted, quoted with conditions, or declined.',
  processTitle: 'How a furniture request is handled.',
  offerName: 'Furniture: feasibility review',
  offerDescription:
    'Feasibility review of a furniture project before any quotation, as an other product outside the core packaging and textile supply.',
  boundary: {
    coordinate: [
      'A feasibility review of the piece, its materials and the quantity',
      'If feasible: factory options, pricing and samples, as for any supply',
      'Carton and packing data for the shipment',
    ],
    notDone: [
      'Presenting furniture as a specialty or guaranteeing feasibility',
      'Certifying compliance: tests are done by the laboratories you appoint',
      'Freight forwarding, customs clearance or U.S. storage',
      'Assembly, installation or delivery in the U.S.',
    ],
  },
  focusAreas: [
    {
      title: 'The piece',
      body: 'Drawings or a reference product, dimensions, materials, finish and hardware. The more of it is written down, the faster the review.',
    },
    {
      title: 'Quantity',
      body: 'Furniture minimums follow the material, the finish and the number of models. The review says what is realistic for your quantity.',
    },
    {
      title: 'U.S. requirements',
      body: 'Some materials carry U.S. rules, for example on formaldehyde emissions from composite wood. Which ones apply is confirmed per product with the specialist or laboratory you appoint.',
    },
    {
      title: 'Shipping volume',
      body: 'Flat-pack and assembled pieces ship very differently, and the carton design changes the landed cost as much as the factory price.',
    },
  ],
  briefItems: [
    'Drawings, photos or a reference product',
    'Materials, finish and hardware',
    'Quantity per model',
    'Destination and target date',
  ],
  workflow: [
    {
      title: 'Feasibility review',
      body: 'We review the piece, materials, quantity and likely U.S. requirements with our partnership in China.',
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
      question: 'Is furniture a specialty of Sourcing Lab USA?',
      answer:
        'No. Our business is custom packaging and textiles. Furniture is reviewed for feasibility on request, before anything is quoted.',
    },
    {
      question: 'What happens if the project is not feasible?',
      answer: 'We say so, with the reason, before anything is quoted.',
    },
    {
      question: 'Who handles freight and the import?',
      answer: NOT_AN_IMPORTER.en,
    },
  ],
  briefTitle: 'Send your furniture brief.',
  briefIntro:
    'The piece, materials, quantity and destination. We confirm whether it can be quoted before anything else.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Other products',
      description: 'How products outside packaging and textiles are reviewed.',
    },
    {
      href: '/custom-packaging',
      title: 'Custom packaging',
      description: 'Cartons and inserts for the product, a core specialty.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'Why shipping volume matters as much as the factory price.',
    },
  ],
};

export default function FurnitureIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
