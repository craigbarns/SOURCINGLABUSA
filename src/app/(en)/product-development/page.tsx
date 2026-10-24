import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Product Development in China: From Specification to Approved Sample',
  description:
    'How a new packaging or textile product goes from your specification to an approved sample with a factory in China, and what that does not include: in-house engineering, CAD design or certification.',
  path: '/product-development',
});

const page: ServicePageContent = {
  path: '/product-development',
  eyebrow: 'Product development · Specification to sample',
  title: 'Product development: from your specification to an approved sample.',
  directAnswer:
    'For Sourcing Lab USA, product development means turning your specification into an approved sample with a factory in China, then supplying the order. It covers custom packaging and textiles: structure, materials, construction, print and finish, through rounds of samples. Products that need new molds or engineered parts are reviewed for feasibility first. Design, engineering drawings and certification stay with you or the specialists you appoint.',
  intro:
    'A new product rarely works on the first sample. What shortens the rounds is a specification that says what must not change, what can, and how the sample will be judged.',
  overviewTitle: 'The sample is the contract’s reference.',
  overview:
    'Development ends when you approve a sample that the factory can repeat at your quantity and price. That sample, with the written specification, becomes the reference for production. Each revision is recorded, so the approved version is never in doubt.',
  processTitle: 'From specification to the order.',
  offerName: 'Development to an approved sample',
  offerDescription:
    'Sampling of new custom packaging and textile products with a factory in China, up to an approved sample and the supply of the order.',
  boundary: {
    coordinate: [
      'Sampling rounds against your specification with a factory in China',
      'Recording each revision and the approved sample',
      'Tooling terms in the quotation: cost, ownership and where it is kept',
    ],
    notDone: [
      'Industrial design, CAD or engineering drawings',
      'Engineering parts and molds as a specialty: these are reviewed for feasibility',
      'Certifying products or issuing compliance certificates',
      'Legal protection of your design: that is for your counsel',
    ],
  },
  focusAreas: [
    {
      title: 'Packaging',
      body: 'Structure, board or material, inserts, print and finish. A blank structural sample checks the fit before a printed sample checks the artwork.',
    },
    {
      title: 'Textiles',
      body: 'Tech pack, fabric, lab dips, fit sample and size set. Each approval narrows what the next sample has to prove.',
    },
    {
      title: 'Tooling',
      body: 'Cutting dies, printing plates or molds have a cost and an owner. Both, and where the tooling is kept, are written into the quotation before anything is paid.',
    },
    {
      title: 'Tests',
      body: 'Where a product needs a test, it is done by the laboratory named in the quotation, when written into it.',
    },
  ],
  briefItems: [
    'Your specification, tech pack or drawings',
    'A reference product or sample, if you have one',
    'What must not change, and what can',
    'Quantity, target price and date',
  ],
  workflow: [
    {
      title: 'Specification',
      body: 'We review your specification and say what is missing before a factory is asked to sample.',
    },
    {
      title: 'First sample',
      body: 'The factory makes a first sample; you review it against the specification.',
    },
    {
      title: 'Revisions',
      body: 'Each revision is recorded, with what changed and why.',
    },
    {
      title: 'Approved sample',
      body: 'The sample you approve becomes the reference for production.',
    },
    {
      title: 'Order',
      body: 'The order is quoted and supplied, with production followed against the approved sample.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Do you design products or produce CAD files?',
      answer:
        'No. We work from your specification, tech pack or drawings, and say what is missing for a factory to sample it. Design and engineering drawings stay with you or the designer you appoint.',
    },
    {
      question: 'Who owns the tooling?',
      answer:
        'It depends on the terms, which is why tooling cost, ownership and where it is kept are written into the quotation before anything is paid.',
    },
    {
      question: 'How many sample rounds should I expect?',
      answer:
        'It depends on how complete the specification is and how new the product is. A clear specification with a reference sample often needs fewer rounds; a new construction usually needs more.',
    },
    {
      question: 'How is my design protected?',
      answer:
        'Through the written terms of the supply and, where needed, an agreement drafted by your own counsel. We do not provide legal advice.',
    },
    {
      question: 'What is the difference between OEM and ODM?',
      answer:
        'OEM means the product is made to your own design. ODM means a factory’s existing design is adapted and sold under your brand.',
    },
  ],
  briefTitle: 'Send your specification.',
  briefIntro:
    'Specification or tech pack, references, quantity and target date. We confirm what can be sampled and quoted.',
  relatedPages: [
    {
      href: '/custom-packaging',
      title: 'Custom packaging',
      description: 'Boxes, mailers, labels and inserts, a core specialty.',
    },
    {
      href: '/custom-textile',
      title: 'Clothing and textiles',
      description: 'Garments and textile products, a core specialty.',
    },
    {
      href: '/private-label-manufacturing',
      title: 'Private label',
      description: 'Your brand on the product, its labels and its packaging.',
    },
  ],
};

export default function ProductDevelopmentPage() {
  return <ServiceLandingPage page={page} />;
}
