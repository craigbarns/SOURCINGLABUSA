import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { MARKET_ENTRY_LIMIT } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Introductions to U.S. Buyers for Overseas Manufacturers',
  description:
    'Targeted introductions of qualified manufacturers to U.S. buyers in their category. Not a U.S. sales office, a legal representative or an importer.',
  path: '/us-sales-representation',
});

const page: ServicePageContent = {
  path: '/us-sales-representation',
  eyebrow: 'Second path · Introductions to U.S. buyers',
  title: 'Introductions to U.S. buyers, for manufacturers ready to supply.',
  directAnswer:
    'Sourcing Lab USA introduces qualified manufacturers to U.S. buyers whose category and volume fit the product. An introduction puts the manufacturer, its product and its terms in front of a buyer; it does not commit the buyer to order. We are not a U.S. sales office, a legal representative or an importer, and nothing is imported in the manufacturer’s name.',
  intro:
    'U.S. buyers receive many supplier approaches. An introduction works when the product already meets the rules that apply to it, the price fits the buyer’s channel and the terms are written in a form the buyer can check quickly.',
  overviewTitle: 'What an introduction includes.',
  overview:
    'We select buyers whose category, volume and channel match your product, present it with its specifications, compliance evidence and wholesale terms, and pass on the buyer’s questions and sample requests. From there, the commercial relationship is between you and the buyer: the order, the contract, the import and the payment.',
  processTitle: 'How introductions run.',
  offerName: 'Introductions to U.S. buyers',
  offerDescription:
    'Targeted introductions of qualified manufacturers to U.S. buyers, as part of the U.S. market path.',
  boundary: {
    coordinate: [
      'Selecting U.S. buyers whose category and volume fit your product',
      'Presenting the product with its specifications, compliance evidence and wholesale terms',
      'Passing on buyer questions and sample requests',
    ],
    notDone: [
      'Acting as your legal representative or signing on your behalf',
      'A U.S. office, a local sales force or exclusive agency',
      'Importing in your name or acting as importer of record',
      'Guaranteeing that an introduction leads to an order',
    ],
  },
  focusAreas: [
    {
      title: 'Who qualifies',
      body: 'Manufacturers already in production, with stable quality, test reports where the product needs them, and a price that fits a U.S. channel.',
    },
    {
      title: 'Buyer selection',
      body: 'Buyers are chosen for their category, volume and channel, so an introduction reaches someone who can actually buy the product.',
    },
    {
      title: 'What the buyer receives',
      body: 'Specifications, compliance evidence, wholesale price, minimum quantities, lead time and who imports, in plain English.',
    },
    {
      title: 'After the introduction',
      body: 'Samples, the order, the contract, the import and the payment are agreed between you and the buyer.',
    },
  ],
  briefItems: [
    'Your product, with specifications and photos',
    'Production capacity and current export markets',
    'Test reports and certifications you hold',
    'Your wholesale price or factory price and Incoterm',
  ],
  workflow: [
    {
      title: 'Qualification',
      body: 'We review the product, its compliance evidence and its price, and confirm whether introductions make sense yet.',
    },
    {
      title: 'Buyer selection',
      body: 'We select buyers whose category, volume and channel fit the product.',
    },
    {
      title: 'Introductions',
      body: 'We present the product and its terms, and pass on the buyer’s questions and sample requests.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Are you a U.S. sales representative or agent?',
      answer:
        'We make targeted introductions. We are not a U.S. sales office, a legal representative or an exclusive agent, and we do not sign on a manufacturer’s behalf.',
    },
    {
      question: 'Who invoices the U.S. buyer and ships the goods?',
      answer:
        'You do, under the terms you agree with the buyer. The buyer or you, as foreign importer of record, handles the import through a licensed customs broker. We do not import or invoice the buyer for you.',
    },
    {
      question: 'Does an introduction guarantee an order?',
      answer:
        'No. It gives the buyer what it needs to decide: the product, the evidence and the terms. The decision is the buyer’s.',
    },
    {
      question: 'What does this path not include?',
      answer: `Forming a U.S. company, importing in your name, customs brokerage, freight forwarding and U.S. storage. ${MARKET_ENTRY_LIMIT.en}`,
    },
  ],
  briefTitle: 'Tell us about your product.',
  briefIntro:
    'Product, capacity, certifications and price. We confirm whether introductions make sense now and what they would include.',
  relatedPages: [
    {
      href: '/us-market-entry',
      title: 'Selling in the U.S.',
      description: 'The whole path: compliance reading, wholesale price, introductions.',
    },
    {
      href: '/market-entry-consulting',
      title: 'U.S. channel strategy',
      description: 'Choosing the channel and the price before the first approach.',
    },
    {
      href: '/import-from-china',
      title: 'Who imports, and what that involves',
      description: 'Importer of record, customs entry and duties, explained.',
    },
  ],
};

export default function UsSalesRepresentationPage() {
  return <ServiceLandingPage page={page} />;
}
