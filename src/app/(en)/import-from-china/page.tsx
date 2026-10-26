import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { NOT_AN_IMPORTER } from '@/lib/positioning';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Importing from China to the U.S.',
  description:
    'The roles in a China-to-U.S. import: supplier, freight forwarder, customs broker and importer of record. Who does what is named in the quotation, not assumed.',
  path: '/import-from-china',
});

const page: ServicePageContent = {
  path: '/import-from-china',
  eyebrow: 'Explainer · China to the United States',
  title: 'Importing from China: who does what, before the order.',
  directAnswer:
    'A China-to-U.S. import involves a supplier, a carrier or freight forwarder, a licensed customs broker and an importer of record, who is responsible for the entry and the duties. On a Sourcing Lab USA supply, we carry the supplier side: factory, price, samples, order and production follow-up. Transport, insurance and U.S. entry are named in the quotation or stay on your side. We are not a freight forwarder, a customs broker or an importer.',
  intro:
    'Most import problems are not caused by a bad factory but by a role nobody took: a filing nobody made, a duty nobody priced, a container nobody collected. Naming each role before the order is cheaper than discovering the gap at the port.',
  overviewTitle: 'Four roles, named before the order.',
  overview:
    'The supplier makes and packs the goods. The forwarder or carrier moves them. The customs broker files the U.S. entry for the importer. The importer of record answers to U.S. Customs and Border Protection (CBP) for the classification, the value, the duties and the compliance of the goods. The Incoterm in the contract says where the seller’s responsibility ends and the buyer’s begins.',
  processTitle: 'Who carries each step.',
  offerName: 'Supplier side of a China-to-U.S. supply',
  offerDescription:
    'Factory search, pricing, samples, order and production follow-up for products supplied from China, with transport and U.S. entry named in the quotation or left with the buyer.',
  boundary: {
    coordinate: [
      'The supplier side: factory, price, samples, order and production follow-up',
      'Export packing and the commercial documents for the goods we supply',
      'Naming in the quotation who carries transport, insurance and U.S. entry',
    ],
    notDone: [
      'Acting as importer of record',
      'Filing U.S. customs entries or the Importer Security Filing',
      'Booking freight as a forwarder or carrier',
      'U.S. storage or final delivery',
    ],
  },
  focusAreas: [
    {
      title: 'Importer of record',
      body: 'The party responsible to CBP for the entry: classification, declared value, duties and compliance of the goods. Usually the U.S. buyer; a foreign company can also act as importer of record through a customs broker.',
    },
    {
      title: 'Customs broker',
      body: 'Licensed by CBP to file entries on the importer’s behalf. The broker files; the importer remains responsible for what is declared.',
    },
    {
      title: 'Freight forwarder',
      body: 'Books the transport, consolidates documents and often coordinates the Importer Security Filing that CBP requires for ocean cargo, on the importer’s behalf.',
    },
    {
      title: 'Incoterms',
      body: 'FOB, EXW or DDP say who pays for and carries the goods at each point. Under DDP the seller’s side arranges the import and pays the duties; on our quotations, any party taking that role is named, and it is not Sourcing Lab USA.',
    },
  ],
  briefItems: [
    'The product and its materials',
    'Quantity and target date',
    'Who will import: your company, your broker, or still to be decided',
    'Destination in the United States',
  ],
  workflow: [
    {
      title: 'Supplier side — Sourcing Lab USA',
      body: 'Factory, price, samples, order and production follow-up against the approved sample.',
    },
    {
      title: 'Optional checks — if in the quotation',
      body: 'A third-party inspection, a lab test, a working HS classification or a landed-cost model, each only when written into the quotation.',
    },
    {
      title: 'Transport — named in the quotation or yours',
      body: 'The forwarder or carrier, the Incoterm and the insurance are named in the quotation, or arranged by you.',
    },
    {
      title: 'U.S. entry — the importer of record',
      body: 'The importer of record, through its customs broker, files the entry and pays the duties. That is you or a party named in the quotation, never Sourcing Lab USA.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Is Sourcing Lab USA the importer of record?',
      answer: NOT_AN_IMPORTER.en,
    },
    {
      question: 'Do I need a customs broker?',
      answer:
        'Most commercial importers use one. A licensed customs broker files the entry on the importer’s behalf; the importer remains responsible for what is declared.',
    },
    {
      question: 'What is the Importer Security Filing?',
      answer:
        'A filing CBP requires for import cargo arriving by vessel, made on the importer’s behalf, usually by its forwarder or broker, before the goods are loaded. Failure to comply can lead to penalties, more inspections and delays. Rule checked on cbp.gov on October 24, 2026.',
    },
    {
      question: 'Should I buy FOB or DDP?',
      answer:
        'FOB leaves the transport and the import with you and your forwarder, so their costs are visible. DDP puts them on the seller’s side, which is simpler but hides the freight and duty inside the price. Either way, the quotation names who carries them.',
    },
    {
      question: 'How do I know the duties on my product?',
      answer:
        'Duties follow the product’s HTS classification and origin, and additional tariffs on Chinese-origin goods change by government action. A working classification can be added to the quotation; the rate is confirmed by your customs broker or a CBP ruling.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Product, quantity and who will import. We confirm what can be quoted and name who carries each step.',
  relatedPages: [
    {
      href: '/freight-logistics',
      title: 'Freight and customs: our limits',
      description: 'What we coordinate on transport, and what we do not do.',
    },
    {
      href: '/hs-code-consulting',
      title: 'HS code classification',
      description: 'A working classification, added to the quotation on request.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'The cost of the goods once transport and duties are added.',
    },
  ],
};

export default function ImportFromChinaPage() {
  return <ServiceLandingPage page={page} />;
}
