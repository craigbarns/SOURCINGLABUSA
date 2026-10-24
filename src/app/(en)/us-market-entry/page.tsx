import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { MARKET_ENTRY_SUMMARY } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Selling in the U.S.: A Path for Overseas Manufacturers',
  description: MARKET_ENTRY_SUMMARY.en,
  path: '/us-market-entry',
});

const page: ServicePageContent = {
  path: '/us-market-entry',
  eyebrow: 'Second path · For manufacturers already in production',
  title: 'Selling in the United States, with the limits written first.',
  directAnswer:
    'Sourcing Lab USA helps manufacturers already in production prepare to sell to U.S. buyers in three ways: a reading of the U.S. requirements that apply to the product, a wholesale price built for U.S. channels, and targeted introductions to U.S. buyers. No U.S. company is formed for the manufacturer, and nothing is imported in its name.',
  intro:
    'This is a second path beside our business, the supply of custom packaging and textiles. It suits a manufacturer with stable production that wants a clear view of what U.S. buyers will ask before approaching them.',
  overviewTitle: 'Three deliverables, and their limits.',
  overview:
    'Before an order, a U.S. buyer checks three things: that the product meets the rules that apply to it, that the price leaves room for its margin, and that the supplier can be reached and trusted. We prepare the first two with you and make introductions for the third. The import itself, the customs entry and any U.S. company stay with you and the buyer, through the licensed providers you appoint.',
  processTitle: 'How the U.S. path runs.',
  offerName: 'Selling in the U.S.',
  offerDescription: MARKET_ENTRY_SUMMARY.en,
  boundary: {
    coordinate: [
      'A reading of the U.S. requirements that apply to your product, confirmed by the specialists or laboratories you appoint',
      'A wholesale price and margin structure for U.S. channels',
      'Targeted introductions to U.S. buyers in your category',
      'Buyer-facing material in plain English: specifications, price list, terms',
    ],
    notDone: [
      'Forming a U.S. company for you',
      'Importing in your name or acting as importer of record',
      'Customs brokerage, freight forwarding or U.S. storage',
      'Legal representation, a U.S. office or a sales force',
    ],
  },
  focusAreas: [
    {
      title: 'Compliance reading',
      body: 'We review the product against the U.S. federal and state requirements that may apply, such as CPSC, FDA, FCC or California Proposition 65, and say which need a test, a registration or a label. Testing is done by the laboratories you appoint.',
    },
    {
      title: 'Wholesale price',
      body: 'We build a wholesale price from your factory price, the landed cost to the buyer and the margins a U.S. channel expects, so the first conversation starts from a realistic number.',
    },
    {
      title: 'Targeted introductions',
      body: 'We introduce your product to U.S. buyers whose category and volume fit it. An introduction is not an order: the terms are agreed between you and the buyer.',
    },
    {
      title: 'Who imports',
      body: 'Either the U.S. buyer imports the goods, or you register as a foreign importer of record through a licensed customs broker. We do not take that role.',
    },
  ],
  briefItems: [
    'Your product, with specifications and photos',
    'Current production capacity and export markets',
    'Certifications and test reports you already hold',
    'Your factory price and the Incoterm you sell on',
  ],
  workflow: [
    {
      title: 'Product review',
      body: 'We review the product, your documents and your price, and confirm whether the U.S. path fits.',
    },
    {
      title: 'Compliance reading',
      body: 'We list the U.S. requirements that apply and the evidence each one needs.',
    },
    {
      title: 'Wholesale price',
      body: 'We build the wholesale price and the terms a U.S. buyer will read.',
    },
    {
      title: 'Introductions',
      body: 'We introduce the product to selected U.S. buyers. Orders, import and entry are agreed between you and the buyer.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Do you form a U.S. company or import in our name?',
      answer:
        'No. No U.S. company is formed for you, and nothing is imported in your name. Either the U.S. buyer imports, or you register as a foreign importer of record through a licensed customs broker.',
    },
    {
      question: 'Can a foreign company import into the U.S. without a U.S. entity?',
      answer:
        'Generally yes: a foreign company can act as importer of record with a CBP-assigned importer number and a customs bond, arranged through a licensed customs broker. Confirm the current requirements with the broker before the first shipment.',
    },
    {
      question: 'What do U.S. buyers check first?',
      answer:
        'That the product meets the rules that apply to it, with test reports where they are required; that production matches the approved sample; and that the price and terms leave room for their margin.',
    },
    {
      question: 'Do you provide local sales representation?',
      answer:
        'We make targeted introductions to U.S. buyers. We are not a U.S. sales office, a legal representative or a distributor, and an introduction does not commit a buyer to order.',
    },
    {
      question: 'Is this path open now?',
      answer:
        'Yes. Like our supply projects, it is contracted and invoiced from France or China, by the company named in your quotation.',
    },
  ],
  briefTitle: 'Tell us about your product.',
  briefIntro:
    'Product, production capacity, certifications and your current price. We confirm whether the U.S. path fits and what it would include.',
  relatedPages: [
    {
      href: '/us-sales-representation',
      title: 'Introductions to U.S. buyers',
      description: 'What an introduction includes, and what it does not commit anyone to.',
    },
    {
      href: '/market-entry-consulting',
      title: 'U.S. channel strategy',
      description: 'Choosing the channel, the price and the buyer before the first approach.',
    },
    {
      href: '/import-from-china',
      title: 'Who imports, and what that involves',
      description: 'Importer of record, customs entry and duties, explained.',
    },
    {
      href: '/hs-code-consulting',
      title: 'HS code classification',
      description: 'Working classification research, confirmed by the customs broker at entry.',
    },
  ],
};

export default function UsMarketEntryPage() {
  return <ServiceLandingPage page={page} />;
}
