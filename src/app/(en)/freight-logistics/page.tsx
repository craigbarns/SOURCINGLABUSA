import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Freight & Customs on China Orders: What We Coordinate',
  description:
    'How transport, insurance and U.S. customs entry are handled on a China supply order: named in the quotation or left with you. We are not a freight forwarder, customs broker or importer.',
  path: '/freight-logistics',
});

const page: ServicePageContent = {
  path: '/freight-logistics',
  eyebrow: 'Freight and customs · Our limits',
  title: 'Freight and customs: named in the quotation, not assumed.',
  directAnswer:
    'Sourcing Lab USA is not a freight forwarder, a customs broker or an importer. For each order, the quotation states the shipping terms (the Incoterm) and names who books and pays for transport and insurance and who files the U.S. customs entry. Where the quotation does not name them, transport, insurance and U.S. entry stay with you and the providers you appoint.',
  intro:
    'Many landed-cost surprises come from shipping terms nobody wrote down. This page explains what the quotation settles, what we coordinate with the parties it names, and what stays outside our scope.',
  overviewTitle: 'What the quotation settles about shipping.',
  overview:
    'The Incoterm decides where responsibility for the goods passes from seller to buyer. Under FOB, the goods are handed over on board at the port of export and you, or your forwarder, take over from there. Where the quotation goes further, it names who books the freight, who insures it and up to which point. U.S. customs entry is filed by a licensed customs broker for the importer of record, and the importer of record is never Sourcing Lab USA.',
  processTitle: 'How transport is settled on a supply.',
  offerName: 'Freight and customs: our limits',
  offerDescription:
    'How transport, insurance and U.S. customs entry are named in a supply quotation, and what Sourcing Lab USA coordinates with the parties named there.',
  boundary: {
    coordinate: [
      'The shipping terms (Incoterm) written into your quotation',
      'Packing and carton data passed to the forwarder you or the quotation names',
      'Export documents from the factory side: commercial invoice and packing list',
      'Handover of the goods at the point the Incoterm sets',
    ],
    notDone: [
      'Booking or operating freight as a forwarder',
      'Filing U.S. customs entries or acting as customs broker',
      'Acting as importer of record',
      'U.S. storage, drayage or Amazon FBA delivery',
    ],
  },
  focusAreas: [
    {
      title: 'FOB: you take over at the port',
      body: 'Under FOB, the goods are delivered on board at the port of export. Freight, insurance, U.S. entry and duties are then yours, through the forwarder and customs broker you appoint.',
    },
    {
      title: 'Further terms: named in the quotation',
      body: 'If the quotation goes beyond FOB, it names who books the freight and the insurance and up to which point. Anything the quotation does not name is not included.',
    },
    {
      title: 'Packing and carton data',
      body: 'Carton count, dimensions and gross weight are confirmed with the factory before the goods are ready, so your forwarder can price and book the cargo.',
    },
    {
      title: 'Customs entry and duties',
      body: 'Duties and the customs entry belong to the importer of record, and a licensed customs broker files the entry. A working HS classification can be added to the quotation as research, not as a ruling.',
    },
  ],
  briefItems: [
    'The product and the quantity you plan to order',
    'The delivery destination and the Incoterm you prefer',
    'Whether you already work with a freight forwarder and a customs broker',
    'Your target arrival date and how flexible it is',
  ],
  workflow: [
    {
      title: 'Shipping terms in the quotation',
      body: 'The quotation states the Incoterm and names who handles transport, insurance and U.S. entry, or states that they stay with you.',
    },
    {
      title: 'Packing confirmed',
      body: 'Carton count, dimensions and weights are confirmed with the factory before the goods are ready.',
    },
    {
      title: 'Export documents',
      body: 'The commercial invoice and packing list are prepared for the shipment.',
    },
    {
      title: 'Handover',
      body: 'The goods are handed over at the point the Incoterm sets, to the forwarder named in the quotation or appointed by you.',
    },
    {
      title: 'Entry by the importer',
      body: 'U.S. customs entry is filed for the importer of record through a licensed customs broker. Sourcing Lab USA does not file it.',
    },
  ],
  hideShowcase: true,
  faqs: [
    {
      question: 'Are you a freight forwarder or a customs broker?',
      answer:
        'No. Sourcing Lab USA is not a freight forwarder, a customs broker or an importer. The quotation names who handles transport, insurance and U.S. entry, or they stay on your side.',
    },
    {
      question: 'What is the difference between FCL and LCL shipping?',
      answer:
        'FCL (Full Container Load) reserves a whole container for your cargo. LCL (Less than Container Load) shares a container with other shipments and is priced by volume. Your forwarder advises which suits the volume and the timing.',
    },
    {
      question: 'What are demurrage and detention?',
      answer:
        'Demurrage is charged by the terminal when a loaded container is not collected within its free time. Detention is charged by the carrier when the empty container is returned late. Both arise at destination and are managed by the importer and its forwarder.',
    },
    {
      question: 'Should the supplier arrange the shipping?',
      answer:
        'It can, if the quotation names the terms and what is paid up to which point. Under terms that leave destination charges unstated, they can arrive unannounced. Under FOB, your own forwarder controls the freight from the port of export.',
    },
    {
      question: 'Can the goods be delivered to Amazon FBA?',
      answer:
        'Not by us. FBA preparation and delivery appointments are handled by your forwarder or a prep service. Carton labels and packing data can be written into your specification and confirmed with the factory.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Tell us the product, quantity and destination, and whether you already have a forwarder. The quotation will name the shipping terms.',
  relatedPages: [
    {
      href: '/import-from-china',
      title: 'Importing from China to the U.S.',
      description: 'What the importer of record carries: entry, duties and documents.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'Freight, insurance and duties added to the factory price, if written into the quotation.',
    },
    {
      href: '/hs-code-consulting',
      title: 'HS code classification',
      description: 'Working classification research, confirmed by the customs broker at entry.',
    },
    {
      href: '/china-to-us-procurement',
      title: 'China-to-U.S. product supply',
      description: 'How a product moves from brief to a supplied order.',
    },
  ],
};

export default function FreightLogisticsPage() {
  return <ServiceLandingPage page={page} />;
}
