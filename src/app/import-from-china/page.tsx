import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Import from China to USA Guide & Consulting | Sourcing Lab USA',
  description:
    'Complete operational guide and consulting for importing goods from China to the United States. Customs clearance, tariffs, Incoterms, and logistics execution.',
  path: '/import-from-china',
});

const page: ServicePageContent = {
  path: '/import-from-china',
  eyebrow: 'Cross-Border Trade · China to United States',
  title: 'Importing from China to the USA: Procurement, Customs & Logistics',
  directAnswer:
    'Importing from China to the United States requires managing five interconnected operational phases: commercial supplier contracting, product compliance testing, international freight booking under clear Incoterms (FOB, CIF, or DDP), regulatory customs entry with U.S. Customs and Border Protection (CBP including ISF 10+2 filings and tariff payments), and domestic inland drayage to U.S. distribution centers.',
  intro:
    'For American businesses, importing from China provides manufacturing scale and competitive margins. However, navigating cross-border trade without experienced operational guidance introduces exposure to customs holds, detention fees, Section 301 tariffs, and regulatory non-compliance. Sourcing Lab USA helps coordinate each operational link in the China-to-U.S. supply chain.',
  overviewTitle: 'End-to-end import execution without border surprises.',
  overview:
    'Successful importing begins long before goods reach the port. It requires accurate 10-digit HTS tariff classification, mandatory labeling compliance, continuous supplier oversight during production, pre-shipment quality verification, timely ocean container booking, and seamless customs brokerage coordination.',
  processTitle: 'The 5 essential stages of China-to-U.S. importing.',
  offerName: 'China-to-U.S. Import Consulting & Logistics Coordination',
  offerDescription:
    'Comprehensive operational management for importing manufactured goods from China to U.S. ports and distribution centers, covering compliance, tariffs, freight, and customs.',
  focusAreas: [
    {
      title: 'Commercial Incoterms Optimization',
      body: 'We advise on and manage shipping under FOB (Free on Board), EXW (Ex Works), or DDP (Delivered Duty Paid), ensuring you retain complete control over ocean freight rates and container routing.',
    },
    {
      title: 'U.S. Customs Compliance & ISF 10+2',
      body: 'We ensure mandatory Importer Security Filings (ISF) are lodged with CBP at least 24 hours prior to vessel departure, preventing automatic $5,000 CBP late-filing penalties.',
    },
    {
      title: 'HTS Tariff & Section 301 Duty Analysis',
      body: 'We classify your goods under the 10-digit Harmonized Tariff Schedule, calculating general duty rates, Section 301 retaliatory tariffs (List 1-4), and identifying legal duty reduction avenues.',
    },
    {
      title: 'Mandatory U.S. Product Safety Standards',
      body: 'We help identify applicable standards and coordinate testing with qualified laboratories for federal regulatory bodies: Consumer Product Safety Commission (CPSC/CPSIA), FDA requirements, FCC rules, and California Proposition 65.',
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
      body: 'Before production begins, we classify your product under the US HTS code, verify applicable duty and tariff rates, and confirm mandatory labeling requirements.',
    },
    {
      title: 'Manufacturing & Pre-Shipment Inspection',
      body: 'We coordinate on-site production monitoring and pre-shipment quality inspections according to agreed acceptance criteria before balance payments are authorized.',
    },
    {
      title: 'Export Clearance & ISF 10+2 Submission',
      body: 'Export customs documentation is cleared in China, bills of lading are issued, and the electronic ISF 10+2 filing is lodged with U.S. Customs prior to container loading.',
    },
    {
      title: 'Ocean/Air Transit & Customs Brokerage',
      body: 'We monitor vessel passage across the Pacific. Prior to U.S. port arrival, qualified customs brokers file CBP entry documentation, duty payments are settled, and cargo releases are coordinated.',
    },
    {
      title: 'Port Drayage & Final U.S. Warehouse Delivery',
      body: 'Containers are retrieved from the marine terminal to avoid costly port demurrage and trucked directly to your fulfillment warehouse or 3PL.',
    },
  ],
  benchmarks: [
    {
      label: 'Ocean freight (West Coast)',
      value: '14 to 20 days transit',
      qualifier: 'Transit time from Shanghai/Shenzhen to Los Angeles/Long Beach, port-to-port.',
    },
    {
      label: 'Ocean freight (East Coast)',
      value: '28 to 35 days transit',
      qualifier: 'Transit time through Panama Canal to New York/Savannah, port-to-port.',
    },
    {
      label: 'Air freight expedited',
      value: '5 to 8 days door-to-door',
      qualifier: 'Commercial air cargo including origin pickup and destination customs clearance.',
    },
  ],
  benchmarksNote:
    'Customs clearance typically clears within 24 to 48 hours of vessel discharge provided ISF and entry filings are submitted on time.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What documents are required to import goods from China to the United States?',
      answer:
        'The mandatory import documents include the Commercial Invoice, Packing List, Bill of Lading (or Air Waybill), Importer Security Filing (ISF 10+2), Customs Entry Summary (CBP Form 7501), and any product-specific certificates (such as Children’s Product Certificate CPC or FDA Prior Notice).',
    },
    {
      question: 'What is Section 301 and how does it affect imports from China?',
      answer:
        'Section 301 is a U.S. trade policy that imposes additional tariffs (ranging from 7.5% to 25% or higher) on thousands of Chinese-origin products across Lists 1 through 4. These tariffs are added on top of the base HTS duty rate and must be factored into your landed-cost calculations.',
    },
    {
      question: 'What is an Importer Security Filing (ISF 10+2)?',
      answer:
        'ISF 10+2 is a mandatory electronic filing required by U.S. Customs for all ocean cargo entering the United States. It consists of 10 data elements from the importer/supplier and 2 from the ocean carrier, and must be submitted at least 24 hours prior to the cargo being loaded onto the vessel in China. Missing or late filings incur a $5,000 fine per shipment.',
    },
    {
      question: 'Should I buy from a Chinese supplier under DDP or FOB terms?',
      answer:
        'FOB (Free on Board) is generally recommended for experienced buyers because it allows you to select your own trusted freight forwarder, control transit times, and eliminate hidden shipping markups. DDP (Delivered Duty Paid) can be convenient for smaller trial orders but often masks true freight and duty costs.',
    },
    {
      question: 'Do I need an import license to import from China to the USA?',
      answer:
        'U.S. Customs and Border Protection does not require a general "import license" for most commercial goods. However, you must have an Employer Identification Number (EIN) or Customs Assigned Number to act as the Importer of Record (IOR), and you must secure a Continuous Customs Bond.',
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
      description: 'Accurate HTS classification and Section 301 tariff mitigation.',
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
