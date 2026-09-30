import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Consumer Products & Hardgoods Sourcing | Sourcing Lab USA',
  description:
    'Direct factory sourcing for consumer goods, housewares, lifestyle products, and hardware accessories. Quality control, CPSC compliance, and delivered supply.',
  path: '/industries/consumer-products',
});

const page: ServicePageContent = {
  path: '/industries/consumer-products',
  eyebrow: 'Industry Vertical · Consumer Hardgoods & Lifestyle',
  title: 'Consumer Products & Hardgoods Manufacturing Sourcing',
  directAnswer:
    'Consumer products sourcing manages the procurement of consumer hardgoods, housewares, kitchenware, fitness accessories, and lifestyle products from specialized factories overseas. It covers injection molding, metal stamping, precision assembly, U.S. CPSC and FDA compliance coordination, bespoke retail packaging, and comprehensive pre-shipment quality inspection.',
  intro:
    'The consumer products landscape moves at breakneck speed. Brands that rely on domestic importers face thin margins and delayed product cycles, while those that navigate overseas manufacturing without local oversight risk safety recalls, customs holds, and quality inconsistencies. Sourcing Lab USA provides end-to-end procurement execution.',
  overviewTitle: 'Multi-material manufacturing and strict consumer safety standards.',
  overview:
    'Consumer hardgoods frequently combine diverse materials: molded plastics, stainless steel hardware, silicone seals, and printed packaging. Sourcing Lab USA coordinates specialized component suppliers into unified assembly lines, ensuring precise part mating, flawless surface finishes, and strict regulatory compliance with U.S. consumer safety standards.',
  processTitle: 'The consumer goods manufacturing lifecycle.',
  offerName: 'Consumer Products Sourcing & Production Management',
  offerDescription:
    'Turnkey procurement of consumer goods, kitchenware, personal care accessories, hardware tools, and lifestyle products from verified overseas factories.',
  focusAreas: [
    {
      title: 'Plastic Injection & Silicone Tooling',
      body: 'High-precision multi-cavity injection molds, food-grade LFGB/FDA silicone compression molding, and overmolding for ergonomic consumer products.',
    },
    {
      title: 'Stainless Steel & Metal Fabrication',
      body: 'Deep-draw hydroforming, precision CNC machining, aluminum extrusion, stamping, and electroplated / powder-coated finishes for durable hardgoods.',
    },
    {
      title: 'Consumer Safety & Regulatory Compliance',
      body: 'We coordinate lab testing for FDA food contact compliance (21 CFR), CPSC lead and phthalate limits (CPSIA), California Proposition 65, and UL electrical safety.',
    },
    {
      title: 'Retail-Ready Packaging & Barcoding',
      body: 'Window boxes, blister cards, full-color litho-laminated cartons, bilingual compliance labeling, and GS1 scannable UPC/EAN barcodes.',
    },
  ],
  briefItems: [
    'Product category, functional requirements, and 2D/3D CAD files or reference samples',
    'Material specifications (plastic resin grade, metal alloy, surface coating)',
    'Target order quantity (starting from 1,000 units), target unit cost, and retail price point',
    'Required U.S. regulatory certifications (FDA, CPSC, Prop 65) and delivery deadline',
  ],
  workflow: [
    {
      title: 'Technical Review & BOM Cost Benchmarking',
      body: 'We review your product schematics, break down the bill of materials, and benchmark component costs across competing manufacturing clusters.',
    },
    {
      title: 'Factory Selection & Tooling Engineering',
      body: 'We audit qualified factories, review DFM adjustments with moldmakers, cut production tooling, and verify mold ownership covenants.',
    },
    {
      title: 'Functional Sample Prototyping & Lab Testing',
      body: 'Off-tool prototypes are tested for mechanical endurance, food contact safety, impact resistance, and aesthetic finish approval.',
    },
    {
      title: 'Mass Production & In-Process Inspection',
      body: 'We monitor production milestones, verify raw resin purity, inspect assembly line jigs, and audit packaging line speeds.',
    },
    {
      title: 'Final Quality Inspection & Container Dispatch',
      body: 'Statistical sampling inspection verifies agreed specifications, drop-test performance, and barcode accuracy before export clearance.',
    },
  ],
  benchmarks: [
    {
      label: 'Minimum order quantity',
      value: 'From 1,000 units',
      qualifier: 'Standard starting volume for custom plastic injection or metal hardgoods.',
    },
    {
      label: 'Tooling & sampling',
      value: '25 to 40 days',
      qualifier: 'Includes steel mold fabrication and physical off-tool functional sample delivery.',
    },
    {
      label: 'Mass production',
      value: '30 to 45 days',
      qualifier: 'Standard production cycle from golden sample sign-off to container loading.',
    },
  ],
  benchmarksNote:
    'All products intended for food contact, child safety, or electrical operation undergo accredited third-party lab testing prior to shipment release.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What consumer product categories do you source most frequently?',
      answer:
        'We source a broad range of consumer goods: kitchenware, drinkware (stainless steel vacuum bottles, glass, silicone), storage containers, fitness and sports accessories, personal care tools, pet accessories, home organization hardware, and travel accessories.',
    },
    {
      question: 'How do you ensure consumer products comply with FDA food contact requirements?',
      answer:
        'For food-contact items, we source only certified virgin food-grade resins (such as Tritan, PP, or food-grade silicone) and submit finished production samples to accredited laboratories (SGS, Intertek) to test for heavy metal extraction, BPA presence, and FDA 21 CFR compliance.',
    },
    {
      question: 'Can you source custom multi-material assembled products?',
      answer:
        'Yes. We specialize in complex products combining plastic injection housings, metal brackets, silicone gaskets, and custom packaging, ensuring all parts fit with tight mechanical tolerances.',
    },
    {
      question: 'Who owns the custom tooling and molds created for our products?',
      answer:
        'Your company owns the tooling. We structure written manufacturing agreements confirming that molds and tooling funded by clients are client property and cannot be replicated or used for unauthorized third parties.',
    },
  ],
  briefTitle: 'Submit your consumer product brief.',
  briefIntro:
    'Share your product concept, CAD drawings, and target quantities. We will evaluate manufacturing feasibility and provide direct factory pricing.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'End-to-end global procurement and direct factory management.',
    },
    {
      href: '/product-development',
      title: 'Product Development & Prototyping',
      description: 'Convert CAD models into production-ready physical goods.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control & Inspections',
      description: 'Pre-shipment inspections and functional safety testing.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model complete delivered unit economics and import duties.',
    },
  ],
};

export default function ConsumerProductsIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
