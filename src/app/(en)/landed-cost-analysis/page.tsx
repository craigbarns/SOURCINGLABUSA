import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Landed-Cost Model for China Orders',
  description:
    'What a landed cost includes, from factory price to freight, duties and fees, and how the estimate is built and added to your quotation on request.',
  path: '/landed-cost-analysis',
});

const page: ServicePageContent = {
  path: '/landed-cost-analysis',
  eyebrow: 'Only if written into the quotation · Landed-cost model',
  title: 'Landed cost: what the product costs once it reaches you.',
  directAnswer:
    'Landed cost is the cost of a product once it reaches your door: the factory price, export charges, freight, insurance, U.S. duties and fees, the customs broker and local delivery, divided by the number of units. On a Sourcing Lab USA supply, a landed-cost model is an estimate added when written into the quotation. Duty rates are confirmed by your customs broker, and freight rates by the forwarder who quotes the shipment.',
  intro:
    'A factory price on its own says little about margin. Freight, duties and fees can change the unit cost more than a round of price negotiation, and they depend on decisions made before the order: the packaging, the carton, the Incoterm and the classification.',
  overviewTitle: 'One line per cost, and who carries it.',
  overview:
    'The model sets out each cost line, the assumption behind it and the party that carries it: the supplier, the forwarder, the importer of record or you. It is built from the quotation price, the carton and packing data and a working HS classification, and it shows which lines move when freight rates or tariffs change.',
  processTitle: 'How the estimate is built.',
  offerName: 'Landed-cost model on request',
  offerDescription:
    'A landed-cost estimate for a supplied product, added to the quotation on request, with each cost line, its assumption and who carries it.',
  boundary: {
    coordinate: [
      'An estimate built from the quotation price, carton data and a working classification',
      'Each cost line with its assumption and the party that carries it',
      'The lines that move with freight rates and tariffs',
    ],
    notDone: [
      'Guaranteeing duty rates, fees or freight prices',
      'Booking freight or paying duties on your behalf',
      'Customs rulings or entries',
    ],
  },
  focusAreas: [
    {
      title: 'Factory price and Incoterm',
      body: 'The quotation price and the Incoterm decide where the supplier’s costs stop and yours begin. An FOB price and an EXW price do not cover the same costs.',
    },
    {
      title: 'Freight and carton volume',
      body: 'Freight is charged on volume or weight. The carton size and how many units fit in it often matter more to the unit cost than a small change in factory price.',
    },
    {
      title: 'Duties and fees',
      body: 'The duty rate follows the HTS classification and origin; additional tariffs on many Chinese-origin goods are set and changed by government action. Customs processing fees apply on top. The rates used are confirmed by your customs broker.',
    },
    {
      title: 'Local costs',
      body: 'The customs broker’s fee, port charges and delivery to your address complete the cost. They are quoted by the parties who carry them.',
    },
  ],
  briefItems: [
    'The product, quantity and Incoterm you want to buy on',
    'Destination in the United States',
    'Who imports: your company, your broker, or still to be decided',
    'Your target selling price, if you want the margin shown',
  ],
  workflow: [
    {
      title: 'Written into the quotation',
      body: 'The quotation states that a landed-cost estimate is included, and on which assumptions.',
    },
    {
      title: 'Cost lines',
      body: 'Factory price, carton data, a working classification and indicative freight are set out line by line.',
    },
    {
      title: 'Sensitivity',
      body: 'The lines that move with freight rates and tariffs are shown, so you can see the range before ordering.',
    },
    {
      title: 'Confirmation by the parties',
      body: 'Your customs broker confirms the duties and fees, and the forwarder quotes the shipment.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'What goes into a landed cost?',
      answer:
        'The factory price, origin and export charges, international freight, insurance, U.S. duties and additional tariffs, customs processing fees, the customs broker’s fee and delivery to your address, divided by the number of units shipped.',
    },
    {
      question: 'What are MPF and HMF?',
      answer:
        'The Merchandise Processing Fee is charged by U.S. Customs on most formal entries as a percentage of the entered value, within a minimum and a maximum adjusted each fiscal year. The Harbor Maintenance Fee applies to cargo arriving by vessel. Confirm the rates in force with your customs broker before pricing against them.',
    },
    {
      question: 'Is the landed-cost model a guarantee?',
      answer:
        'No. It is an estimate based on the assumptions it states. Duties are confirmed by your customs broker or a CBP ruling, and freight by the forwarder who quotes the shipment.',
    },
    {
      question: 'Why does packaging change the landed cost?',
      answer:
        'Because freight is paid on space and weight. A carton that holds more units, or packaging that ships flat, lowers the freight carried by each unit.',
    },
    {
      question: 'Are tariffs on Chinese goods included?',
      answer:
        'Yes, as an assumption. Additional tariffs on Chinese-origin goods change by government action, so the estimate states the rate used and the date it was checked, and your customs broker confirms it.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Product, quantity, Incoterm and destination. Ask for a landed-cost estimate to be written into the quotation.',
  relatedPages: [
    {
      href: '/hs-code-consulting',
      title: 'HS code classification',
      description: 'The working classification behind the duty line.',
    },
    {
      href: '/import-from-china',
      title: 'Who imports, and what that involves',
      description: 'Importer of record, customs broker and forwarder, explained.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight and customs: our limits',
      description: 'What we coordinate on transport, and what we do not do.',
    },
  ],
};

export default function LandedCostAnalysisPage() {
  return <ServiceLandingPage page={page} />;
}
