import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { MARKET_ENTRY_LIMIT } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'U.S. Channel & Wholesale Price Strategy for Manufacturers',
  description:
    'Choosing a U.S. sales channel and a wholesale price before approaching buyers: distributors, wholesalers and retail chains, and the margins each expects. No U.S. company, no importing in your name.',
  path: '/market-entry-consulting',
});

const page: ServicePageContent = {
  path: '/market-entry-consulting',
  eyebrow: 'Second path · U.S. channel and price',
  title: 'Choose the channel and the price before the first U.S. buyer.',
  directAnswer:
    'Before approaching U.S. buyers, a manufacturer needs two decisions: which channel to sell through, and the wholesale price that channel can carry. Sourcing Lab USA helps manufacturers already in production make both, as part of its U.S. market path. No U.S. company is formed for the manufacturer, and nothing is imported in its name.',
  intro:
    'A distributor, a wholesaler and a retail chain buy differently, expect different margins and ask for different documents. Approaching all of them with one price list is the most common way to lose the first conversations.',
  overviewTitle: 'One channel, one price, one set of terms.',
  overview:
    'Each U.S. channel adds its own margin between your price and the shelf. A distributor needs room for its own resellers; a retail chain often expects to roughly double its cost price, the practice known as keystone pricing; a business buyer compares your landed price with a domestic supplier. The channel decides the price, and the price decides whether the product can sell at all.',
  processTitle: 'From channel to price to terms.',
  offerName: 'U.S. channel and price strategy',
  offerDescription:
    'Channel choice and wholesale price for manufacturers preparing to sell in the United States, as part of the U.S. market path.',
  boundary: {
    coordinate: [
      'Comparing the channels that fit your product: distributors, wholesalers, retail chains, business buyers',
      'A wholesale price and margin structure for the chosen channel',
      'The terms a buyer in that channel will expect to read',
    ],
    notDone: [
      'Forming a U.S. company or opening an office for you',
      'Importing in your name or acting as importer of record',
      'Signing contracts on your behalf',
      'Market studies presented as guarantees of sales',
    ],
  },
  focusAreas: [
    {
      title: 'Distributors',
      body: 'Buy in volume and resell to their own customers. They need a price that leaves room for their margin and their resellers’ margin, and stable supply.',
    },
    {
      title: 'Wholesalers',
      body: 'Supply retailers from stock. They look at minimum quantities, carton configuration and how quickly a reorder arrives.',
    },
    {
      title: 'Retail chains',
      body: 'Often price at roughly twice their cost and ask for compliance documents, labeling and packaging to their own standards before a first order.',
    },
    {
      title: 'Business buyers',
      body: 'Compare your landed price with a domestic supplier and weigh lead time, quality consistency and who carries the import.',
    },
  ],
  briefItems: [
    'Your product and its current export markets',
    'Your factory price and the Incoterm you sell on',
    'The U.S. channel you have in mind, if any',
    'Certifications and test reports you already hold',
  ],
  workflow: [
    {
      title: 'Channel comparison',
      body: 'We compare the channels that fit the product and say which one to approach first, and why.',
    },
    {
      title: 'Price structure',
      body: 'We build the wholesale price from your factory price, the landed cost and the margins the channel expects.',
    },
    {
      title: 'Terms to present',
      body: 'We set out the terms a buyer in that channel will read: quantities, lead time, Incoterm and who imports.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'What is keystone pricing?',
      answer:
        'A retail practice of setting the shelf price at roughly twice the cost price. It is a convention, not a rule, but it explains why a factory price that looks competitive can be too high once a channel’s margin is added.',
    },
    {
      question: 'Do we need a U.S. office or employees to sell in the U.S.?',
      answer:
        'Not to start. Many manufacturers sell through a U.S. buyer who imports, or register as a foreign importer of record through a licensed customs broker. We do not open an office or form a company for you.',
    },
    {
      question: 'Is this a separate service from introductions?',
      answer:
        'It is the step before them. The channel and the price come first; introductions to buyers in that channel follow.',
    },
    {
      question: 'What does this path not include?',
      answer: `Forming a U.S. company, importing in your name, customs brokerage, freight forwarding and U.S. storage. ${MARKET_ENTRY_LIMIT.en}`,
    },
  ],
  briefTitle: 'Tell us about your product.',
  briefIntro:
    'Product, current price and the channel you have in mind. We confirm whether the U.S. path fits and what it would include.',
  relatedPages: [
    {
      href: '/us-market-entry',
      title: 'Selling in the U.S.',
      description: 'The whole path: compliance reading, wholesale price, introductions.',
    },
    {
      href: '/us-sales-representation',
      title: 'Introductions to U.S. buyers',
      description: 'What an introduction includes, and what it does not commit anyone to.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'The cost a U.S. buyer will compare with a domestic supplier.',
    },
  ],
};

export default function MarketEntryConsultingPage() {
  return <ServiceLandingPage page={page} />;
}
