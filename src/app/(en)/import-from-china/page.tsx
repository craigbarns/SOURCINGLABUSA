import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Import from China to USA Guide & Consulting | Sourcing Lab USA',
  description:
    'Plan China-to-U.S. sourcing, shipping documentation and landed-cost assumptions with clear responsibilities for your appointed freight and customs providers.',
  path: '/import-from-china',
});

const page: ServicePageContent = {
  path: '/import-from-china',
  reviewedDate: '2026-10-21',
  references: [
    { title: 'CBP — Tips for New Importers and Exporters', url: 'https://www.help.cbp.gov/s/article/Article-1894?language=en_US' },
    { title: 'CBP — Importer Security Filing', url: 'https://www.help.cbp.gov/s/article/Article-1868?language=en_US' },
    { title: 'USITC — Harmonized Tariff Schedule', url: 'https://hts.usitc.gov/' },
    { title: 'USTR — China Section 301 tariff actions', url: 'https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions' },
    { title: 'CPSC — Business Education', url: 'https://www.cpsc.gov/Business--Manufacturing/Business-Education' },
  ],
  eyebrow: 'Cross-Border Trade · China to United States',
  title: 'Importing from China to the USA: Procurement, Customs & Logistics',
  directAnswer:
    'A China-to-U.S. import project connects the product specification and supplier agreement with product requirements, transport, customs entry and delivery. Sourcing Lab USA supports the sourcing and coordination work agreed for the order. The importer and appointed specialists confirm applicable requirements, duties and filings; shipping and clearance outcomes cannot be guaranteed.',
  intro:
    'For American businesses, importing from China provides manufacturing scale and competitive margins. However, navigating cross-border trade without experienced operational guidance introduces exposure to customs holds, detention fees, Section 301 tariffs, and regulatory non-compliance. Sourcing Lab USA helps coordinate each operational link in the China-to-U.S. supply chain.',
  overviewTitle: 'Plan the import responsibilities before production.',
  overview:
    'Start with a written product brief and a list of questions for the parties responsible for classification, labeling, testing, shipping and entry. Confirm which checkpoints and documents belong to the sourcing scope, which need separate specialists and who can authorize the next stage.',
  processTitle: 'The 5 essential stages of China-to-U.S. importing.',
  offerName: 'China-to-U.S. Import Consulting & Logistics Coordination',
  offerDescription:
    'Sourcing coordination, product and shipment information, and planning support alongside the importer’s appointed freight, customs and product specialists.',
  focusAreas: [
    {
      title: 'Commercial Incoterms Optimization',
      body: 'Compare the quotation basis and proposed delivery terms with your appointed forwarder and broker. Agree which party arranges transport, insurance, import entry and delivery; confirm exclusions before approving the order.',
    },
    {
      title: 'U.S. Customs Compliance & ISF 10+2',
      body: 'For ocean shipments, ask the importer’s appointed filer to confirm applicable ISF requirements, data and deadlines before booking. We can coordinate supplier information within the agreed project scope; we do not file customs entries or guarantee penalty avoidance.',
    },
    {
      title: 'HTS Tariff & Section 301 Duty Analysis',
      body: 'Organize the product facts and cost assumptions for a current classification and tariff review by your customs professional. Product, origin and entry date can affect applicable duties and trade measures.',
    },
    {
      title: 'Mandatory U.S. Product Safety Standards',
      body: 'Identify product-specific testing, labeling and documentation questions early. The importer should appoint qualified advisers and laboratories to determine applicable requirements; a sourcing checkpoint is not a regulatory approval.',
    },
  ],
  briefItems: [
    'Product category, commercial description, and detailed material breakdown',
    'Estimated shipment volume (Full Container Load FCL or Less than Container Load LCL)',
    'Target destination city, state, or Amazon fulfillment center in the United States',
    'Preferred Incoterms and target arrival deadline',
  ],
  workflow: [
    {
      title: 'Pre-Import Classification & Compliance Review',
      body: 'Before production, assemble materials, intended use and product documents for the appointed broker and product specialists to review. Record classification, labeling and duty assumptions and unresolved questions.',
    },
    {
      title: 'Manufacturing & Pre-Shipment Inspection',
      body: 'We coordinate on-site production monitoring and pre-shipment quality inspections according to agreed acceptance criteria before balance payments are authorized.',
    },
    {
      title: 'Export Clearance & ISF 10+2 Submission',
      body: 'Confirm the document checklist, responsible parties and filing deadlines with the appointed export and import providers. Track missing supplier information before the provider’s cutoff.',
    },
    {
      title: 'Ocean/Air Transit & Customs Brokerage',
      body: 'We monitor vessel passage across the Pacific. Prior to U.S. port arrival, qualified customs brokers file CBP entry documentation, duty payments are settled, and cargo releases are coordinated.',
    },
    {
      title: 'Port Drayage & Final U.S. Warehouse Delivery',
      body: 'The appointed logistics provider plans collection, receiving appointments and container return. Delays, terminal availability and customs holds can still affect costs and delivery.',
    },
  ],
  benchmarks: [
    {
      label: 'Ocean freight (West Coast)',
      value: 'Route-specific quote',
      qualifier: 'Confirm sailing, transshipment, port handling and inland delivery separately with the carrier or forwarder.',
    },
    {
      label: 'Ocean freight (East Coast)',
      value: 'Schedule to confirm',
      qualifier: 'Routing and service availability depend on the shipment and current carrier schedule.',
    },
    {
      label: 'Air freight expedited',
      value: 'Scope-specific quote',
      qualifier: 'Confirm cargo acceptance, airport handling, clearance and final delivery assumptions.',
    },
  ],
  benchmarksNote:
    'Carrier estimates do not guarantee customs release or final delivery. Confirm assumptions and responsibilities for the exact shipment.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What documents are required to import goods from China to the United States?',
      answer:
        'A starting checklist includes the commercial invoice, packing list, transport document and product specifications. Your broker and product advisers should confirm entry, security filing and product-specific certificates or notices for the shipment. Requirements differ by product and transport mode.',
    },
    {
      question: 'What is Section 301 and how does it affect imports from China?',
      answer:
        'Section 301 actions can impose additional duties on covered Chinese-origin goods. Review current USTR notices and the HTSUS with your customs professional for the product and entry date, including any applicable exclusions and other measures. This page does not provide an applicable rate.',
    },
    {
      question: 'What is an Importer Security Filing (ISF 10+2)?',
      answer:
        'Importer Security Filing concerns advance information for vessel cargo. The applicable filing, data elements and deadlines depend on the movement. Confirm them with the importer’s appointed filer using current CBP guidance; late or inaccurate filings may have consequences assessed on the circumstances.',
    },
    {
      question: 'Should I buy from a Chinese supplier under DDP or FOB terms?',
      answer:
        'Compare the parties’ transport and import responsibilities, the quotation exclusions and the importer arrangement with your appointed providers. Neither term alone establishes the best commercial choice. Ask for a written cost breakdown and confirm who is responsible if the shipment is held or delayed.',
    },
    {
      question: 'Do I need an import license to import from China to the USA?',
      answer:
        'Requirements depend on the product and transaction. Ask your customs broker and product advisers to confirm importer identification, any license or permit, bond arrangements and agency requirements. Do not assume that every shipment requires the same bond or documentation.',
    },
  ],
  briefTitle: 'Consult on your China-to-U.S. import project.',
  briefIntro:
    'Share your product details, order volume, and destination. We will calculate estimated duties, identify compliance requirements, and coordinate logistics.',
  relatedPages: [
    {
      href: '/china-to-us-procurement',
      title: 'China-to-U.S. Procurement Overview',
      description: 'Our established procurement, supply terms, and ordering framework.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight Sourcing & Logistics',
      description: 'Ocean container booking, air cargo, drayage, and warehouse coordination.',
    },
    {
      href: '/hs-code-consulting',
      title: 'HS Code & Tariff Consulting',
      description: 'Document candidate classifications and questions for an appointed customs professional.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'True landed cost modeling before ordering mass production.',
    },
  ],
};

export default function ImportFromChinaPage() {
  return <ServiceLandingPage page={page} />;
}
