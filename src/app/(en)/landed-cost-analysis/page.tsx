import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Landed Cost Analysis & Import Cost Calculator | Sourcing Lab USA',
  description:
    'Calculate the true, all-inclusive landed cost of importing manufactured goods into the United States. Unit cost, ocean freight, tariffs, MPF, and drayage modeling.',
  path: '/landed-cost-analysis',
});

const page: ServicePageContent = {
  path: '/landed-cost-analysis',
  eyebrow: 'Import Economics · True Landed Cost Modeling',
  title: 'Landed Cost Analysis for U.S. Importers & Brands',
  directAnswer:
    'Landed cost analysis is the comprehensive calculation of the total financial cost incurred to manufacture, transport, insure, clear customs, and deliver a commercial product into a domestic warehouse. It aggregates the factory ex-works unit price, origin handling, international ocean or air freight, marine insurance, U.S. customs duties, Section 301 tariffs, federal customs processing fees (MPF and HMF), and destination port drayage to establish true gross profit margins.',
  intro:
    'Calculating profitability based solely on a supplier’s Ex-Works (EXW) or FOB price is the primary reason first-time importers suffer severe margin collapse. International shipping, harbor fees, customs brokerage, and tariffs routinely add 25% to 65% on top of factory gate pricing. Sourcing Lab USA builds deterministic landed-cost models so you know your exact unit economics before placing purchase orders.',
  overviewTitle: 'Every line item quantified before capital deployment.',
  overview:
    'Our landed cost model breaks down the total unit cost into its eight constituent economic drivers: factory production cost, origin export charges, international freight, cargo risk insurance, customs duties, statutory federal fees, port terminal drayage, and warehouse receiving. This enables granular sensitivity analysis against freight rate spikes or tariff increases.',
  processTitle: 'The 5-component landed cost calculation model.',
  offerName: 'Comprehensive Landed Cost Modeling & Advisory',
  offerDescription:
    'Detailed landed-cost calculations, unit margin audits, tariff sensitivity modeling, and volume break-even analysis for international procurement projects.',
  focusAreas: [
    {
      title: 'Factory Gate Unit Economics (EXW vs FOB)',
      body: 'We quantify raw material costs, production tooling amortization, and origin inland logistics to ensure your base purchase price reflects true manufacturing costs.',
    },
    {
      title: 'Ocean & Air Freight Volumetric Allocation',
      body: 'We allocate container shipping costs accurately across multiple SKUs based on cubic meter volume (CBM) and chargeable gross weight, avoiding distorted per-unit cost averages.',
    },
    {
      title: 'U.S. Customs Duties & Section 301 Tariffs',
      body: 'We model exact ad valorem duty rates, Section 301 punitive tariffs, and statutory CBP fees including the Merchandise Processing Fee (MPF) and Harbor Maintenance Fee (HMF).',
    },
    {
      title: 'Port Drayage, Demurrage & Receiving Fees',
      body: 'We incorporate domestic chassis rentals, pier pass charges, clean truck fees, and 3PL palletization and intake labor to determine the true door-to-door cost per unit.',
    },
  ],
  briefItems: [
    'Supplier quotation (EXW or FOB terms) and currency',
    'Carton packaging dimensions (L x W x H), gross weight, and units per carton',
    'Total order volume and anticipated container configuration (20GP, 40HQ, or LCL)',
    'Target U.S. delivery zip code and intended retail/wholesale sales price',
  ],
  workflow: [
    {
      title: 'BOM & Unit Packaging Analysis',
      body: 'We audit the physical dimensions, master carton counts, and weight of your product to determine volumetric density and maximum container loading efficiency.',
    },
    {
      title: 'HTS Tariff & Statutory Fee Classification',
      body: 'We identify the exact 10-digit HTS code, calculating base duty, Section 301 rate, MPF (0.3464% ad valorem), and HMF (0.125% ad valorem for ocean freight).',
    },
    {
      title: 'Freight Lane & Destination Cost Benchmarking',
      body: 'We benchmark live ocean or air freight rates, terminal handling charges (THC), fuel surcharges, and destination drayage trucking to your warehouse.',
    },
    {
      title: 'Deterministic Landed Cost Model Delivery',
      body: 'You receive an interactive financial spreadsheet with per-unit landed costs, margin contribution percentages, and break-even retail pricing tiers.',
    },
  ],
  benchmarks: [
    {
      label: 'Landed cost model delivery',
      value: '24 to 48 hours',
      qualifier: 'Delivered in detailed financial model with all duty, freight, and fee line items.',
    },
    {
      label: 'Freight sensitivity testing',
      value: 'Multi-scenario modeling',
      qualifier: 'Simulations across spot freight spikes ($2,000 vs $6,000/FEU) and tariff adjustments.',
    },
    {
      label: 'CBM container optimization',
      value: 'Up to 20% savings',
      qualifier: 'Redesigning master carton dimensions to maximize 40HQ container cube utilization.',
    },
  ],
  benchmarksNote:
    'Landed cost models reflect current federal duty schedules, CBP fee caps, and live carrier fuel/bunker adjustments.',
  hideShowcase: true,
  faqs: [
    {
      question: 'How do you calculate landed cost when importing into the United States?',
      answer:
        'Landed cost is calculated by summing: (1) Product Unit Price + (2) Origin Freight & Export Handling + (3) International Ocean/Air Freight + (4) Marine Cargo Insurance + (5) Customs Brokerage Fee + (6) U.S. Customs Duty & Section 301 Tariffs + (7) Federal Fees (MPF + HMF) + (8) Destination Port Drayage & Receiving, divided by total units imported.',
    },
    {
      question: 'What are the Merchandise Processing Fee (MPF) and Harbor Maintenance Fee (HMF)?',
      answer:
        'MPF is a statutory U.S. Customs fee assessed on commercial formal entries at 0.3464% of the cargo value (subject to a minimum and maximum cap adjusted annually). HMF is a 0.125% fee assessed on the commercial value of all cargo transported via ocean vessels entering U.S. ports to maintain federal harbors.',
    },
    {
      question: 'Why does packaging size affect landed cost so drastically?',
      answer:
        'Ocean freight is billed by container capacity (e.g. a 40HQ container holds approximately 68 CBM). If your product packaging contains 20% empty space, 20% of your shipping budget is spent moving air, which drastically inflates the freight cost allocated to each individual unit.',
    },
    {
      question: 'How do Section 301 tariffs impact landed cost?',
      answer:
        'Section 301 tariffs impose an additional 7.5% or 25% duty on products originating from China on top of standard HTS duties. On a product with a $10 FOB cost and a standard 3% duty, a 25% Section 301 tariff adds an extra $2.50 per unit in direct taxes, significantly altering margin requirements.',
    },
    {
      question: 'Can landed cost analysis help negotiate better supplier terms?',
      answer:
        'Yes. By identifying that a supplier’s carton packaging creates excessive volumetric waste or that a small change in material composition drops the HTS tariff bracket by 6%, you can direct the factory to make targeted modifications that lower your total delivered cost.',
    },
  ],
  briefTitle: 'Calculate your product landed cost.',
  briefIntro:
    'Submit your supplier quote, carton dimensions, and destination. We will deliver a complete landed cost breakdown and unit margin audit.',
  relatedPages: [
    {
      href: '/hs-code-consulting',
      title: 'HS Code & Tariff Consulting',
      description: 'Accurate HTS classification to determine exact duty and Section 301 liabilities.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight Sourcing & Logistics',
      description: 'Ocean and air freight booking to optimize international transport costs.',
    },
    {
      href: '/import-from-china',
      title: 'Importing from China to USA',
      description: 'Full operational import guide covering compliance and customs clearance.',
    },
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'Direct factory procurement designed to lower base manufacturing costs.',
    },
  ],
};

export default function LandedCostAnalysisPage() {
  return <ServiceLandingPage page={page} />;
}
