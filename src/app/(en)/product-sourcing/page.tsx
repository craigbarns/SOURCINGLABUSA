import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Product Sourcing in China: Other Products, Reviewed for Feasibility',
  description:
    'Products outside packaging and textiles are reviewed for feasibility before anything is quoted. If quoted, they follow the same supply: factory search, pricing, samples, order and production follow-up, invoiced from France or China.',
  path: '/product-sourcing',
});

const page: ServicePageContent = {
  path: '/product-sourcing',
  eyebrow: 'Other products · Feasibility review, then supply',
  title: 'Other products: reviewed for feasibility, then supplied like the rest.',
  directAnswer:
    'Sourcing Lab USA’s business is custom packaging and textiles. Other products can be reviewed on request: we check whether the product, its specification, the quantity and the requirements that apply can be quoted through our partnership in China. If they can, the product is supplied like the rest: factory search, pricing, samples, order and production follow-up, under a contract and invoice from the company named in the quotation.',
  intro:
    'Packaging and textiles are where the experience is deepest. Other products are not refused, but they start with a feasibility review rather than a promise, and the answer can be no.',
  overviewTitle: 'What the feasibility review decides.',
  overview:
    'The review asks four questions before any quotation: can a manufacturer we can check make this product to your specification; does your quantity fit its minimums; which requirements apply to the product, and what evidence they call for; and does the price make sense once freight and duties are added. It ends with a clear answer: quoted, quoted with conditions, or declined.',
  processTitle: 'From review to supply.',
  offerName: 'Product supply for other products, after feasibility review',
  offerDescription:
    'Feasibility review, then factory search, pricing, samples, order and production follow-up for products outside the core packaging and textile supply.',
  focusAreas: [
    {
      title: 'Specification',
      body: 'Drawings, a reference product, materials and finish. The more of it is written down, the faster the review, and the clearer the sample to approve.',
    },
    {
      title: 'Quantity',
      body: 'Minimum quantities follow the process, the material and the number of versions. The review says what is realistic for your quantity.',
    },
    {
      title: 'Requirements and evidence',
      body: 'Some products need a test or a certificate to be sold in the U.S. Which ones apply is confirmed per product; tests are done by the laboratory named in the quotation, when written into it.',
    },
    {
      title: 'Tooling',
      body: 'Where a product needs a mold or tooling, its cost, ownership and where it is kept are written into the quotation before anything is paid.',
    },
  ],
  briefItems: [
    'The product: drawings, photos or a reference product',
    'Materials, finish and packaging',
    'Quantity and target date',
    'Any test or certificate your market or buyer requires',
  ],
  workflow: [
    {
      title: 'Feasibility review',
      body: 'We review the product, quantity and requirements with our partnership in China.',
    },
    {
      title: 'A clear answer',
      body: 'Quoted, quoted with conditions, or declined, with the reason.',
    },
    {
      title: 'Factory search and pricing',
      body: 'Checked manufacturers, prices and the terms of the quotation.',
    },
    {
      title: 'Samples',
      body: 'Samples against your specification; the one you approve becomes the reference.',
    },
    {
      title: 'Order and production follow-up',
      body: 'Production is followed against the approved sample, with any inspection or test written into the quotation.',
    },
  ],
  benchmarks: [],
  faqs: [
    {
      question: 'Do you source products other than packaging and textiles?',
      answer:
        'On request, after a feasibility review. Packaging and textiles are the business; other products are reviewed before anything is quoted, and the answer can be no.',
    },
    {
      question: 'Who do I contract with and pay?',
      answer:
        'The company named in your quotation, in France or China. It supplies the product; you do not pay an unknown factory account.',
    },
    {
      question: 'How is this different from buying on a B2B marketplace?',
      answer:
        'You buy from one named company under a written contract, against an approved sample, instead of choosing among listings and carrying the supplier risk yourself.',
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
    'Product, materials, quantity and any requirement. We confirm whether it can be quoted before anything else.',
  relatedPages: [
    {
      href: '/industries/consumer-products',
      title: 'Consumer products',
      description: 'Why the U.S. requirements decide feasibility first.',
    },
    {
      href: '/industries/furniture',
      title: 'Furniture',
      description: 'Bulky freight, hardware and materials rules, reviewed first.',
    },
    {
      href: '/industries/building-materials',
      title: 'Building materials',
      description: 'Specification and standards evidence before any quotation.',
    },
    {
      href: '/factory-verification',
      title: 'Factory checks',
      description: 'How a manufacturer is checked before it is proposed.',
    },
  ],
};

export default function ProductSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
