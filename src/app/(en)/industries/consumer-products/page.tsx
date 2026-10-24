import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Consumer Products from China: Feasibility Review on Request',
  description:
    'Housewares, accessories and other consumer goods are not a specialty of Sourcing Lab USA. A project is reviewed for feasibility before anything is quoted, starting with the U.S. requirements the product must meet.',
  path: '/industries/consumer-products',
});

const page: ServicePageContent = {
  path: '/industries/consumer-products',
  eyebrow: 'Other products · Feasibility review',
  title: 'Consumer products: reviewed for feasibility, not a specialty.',
  directAnswer:
    'Consumer goods such as housewares, drinkware or accessories are outside our core business, which is custom packaging and textiles. A project can be reviewed on request: we check whether the product, its materials, the quantity and the U.S. requirements that apply to it can be quoted through our partnership in China before anything is promised. If the answer is no, we say so.',
  intro:
    'For consumer goods, feasibility is often decided by the rules rather than the factory. A product that touches food, is meant for children or plugs into a socket carries U.S. requirements and test evidence that must be planned before the sample, not after the order.',
  overviewTitle: 'Requirements first, then the factory.',
  overview:
    'The review starts with what the product is and who uses it, because that decides which U.S. requirements may apply and what evidence a buyer or marketplace will ask for. It then checks whether a manufacturer can make it to your specification and quantity, and ends with a clear answer: quoted, quoted with conditions, or declined.',
  processTitle: 'How a consumer-product request is handled.',
  offerName: 'Consumer products: feasibility review',
  offerDescription:
    'Feasibility review of a consumer-product project before any quotation, as an other product outside the core packaging and textile supply.',
  boundary: {
    coordinate: [
      'A feasibility review of the product, its materials, quantity and likely U.S. requirements',
      'If feasible: factory options, pricing and samples, as for any supply',
      'Lab tests by the laboratory named in the quotation, when written into it',
    ],
    notDone: [
      'Presenting consumer goods as a specialty or guaranteeing feasibility',
      'Certifying products or issuing compliance certificates',
      'Electrical or engineered products as a specialty',
      'Freight forwarding, customs clearance or U.S. storage',
    ],
  },
  focusAreas: [
    {
      title: 'Food contact',
      body: 'Drinkware, kitchenware and storage that touch food must use materials suitable for food contact. The evidence comes from tests on the actual materials, planned before production.',
    },
    {
      title: 'Children’s products',
      body: 'Products designed or intended mainly for children carry specific U.S. safety requirements. A project of this kind is reviewed with the evidence it will need in mind from the start.',
    },
    {
      title: 'Electrical products',
      body: 'Products with a plug, a battery or a radio module raise safety and certification questions that are outside our core business. They are reviewed case by case, and often declined.',
    },
    {
      title: 'Packaging',
      body: 'Retail boxes, blister cards and cartons are our specialty, and are specified with the product so the minimums line up.',
    },
  ],
  briefItems: [
    'The product: drawings, photos or a reference product',
    'Materials, and whether it touches food or is meant for children',
    'Quantity and target date',
    'Any test or certificate your buyer or marketplace requires',
  ],
  workflow: [
    {
      title: 'Feasibility review',
      body: 'We review the product, its likely U.S. requirements and the quantity with our partnership in China.',
    },
    {
      title: 'A clear answer',
      body: 'Quoted, quoted with conditions, or declined, with the reason.',
    },
    {
      title: 'Supply as usual',
      body: 'If quoted, the project follows the usual supply: factory options, pricing, samples, order and production follow-up, with any test written into the quotation.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Are consumer products a specialty of Sourcing Lab USA?',
      answer:
        'No. Our business is custom packaging and textiles. Consumer goods are reviewed for feasibility on request, before anything is quoted.',
    },
    {
      question: 'Who decides which U.S. requirements apply?',
      answer:
        'You, as the party placing the product on the market, with the specialist or laboratory you appoint. The review flags the requirements that are likely to apply so they are planned before the sample.',
    },
    {
      question: 'Who owns custom tooling?',
      answer:
        'It depends on the terms, which is why tooling cost, ownership and where it is kept are written into the quotation before anything is paid.',
    },
    {
      question: 'Who handles freight and the import?',
      answer: NOT_AN_IMPORTER.en,
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'The product, materials, quantity and any requirement. We confirm whether it can be quoted before anything else.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Other products',
      description: 'How products outside packaging and textiles are reviewed.',
    },
    {
      href: '/custom-packaging',
      title: 'Custom packaging',
      description: 'Retail boxes and cartons for the product, a core specialty.',
    },
    {
      href: '/quality-control-china',
      title: 'Inspections',
      description: 'Third-party inspections, added when written into the quotation.',
    },
  ],
};

export default function ConsumerProductsIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
