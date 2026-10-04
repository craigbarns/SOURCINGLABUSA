import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Packaging Industry Sourcing & Box Manufacturing | Sourcing Lab USA',
  description:
    'Industrial packaging procurement for consumer brands and enterprises. Custom rigid boxes, folding cartons, corrugated shipping boxes, and eco-friendly inserts.',
  path: '/industries/packaging',
});

const page: ServicePageContent = {
  path: '/industries/packaging',
  eyebrow: 'Industry Vertical · Packaging & Paperboard Manufacturing',
  title: 'Packaging Industry Sourcing & Custom Box Procurement',
  directAnswer:
    'Packaging industry sourcing connects consumer brands with specialized printing converters, paperboard mills, and packaging manufacturers overseas. Sourcing packaging directly enables brands to produce custom rigid gift boxes, folding cartons, corrugated subscription mailers, and biodegradable molded pulp inserts at 30% to 50% lower unit costs than domestic distributors while achieving luxury finishes.',
  intro:
    'Packaging is the first physical touchpoint a customer has with your brand. Off-the-shelf packaging signals generic commodity products, while custom structural packaging elevates brand equity, prevents transit damage, and drives unboxing engagement. Sourcing Lab USA partners directly with accredited packaging manufacturing plants in Guangdong and Zhejiang.',
  overviewTitle: 'High-precision printing, structural engineering, and finishing.',
  overview:
    'Our packaging procurement covers the complete spectrum of retail and e-commerce packaging: premium rigid gift boxes, folding cosmetic cartons, heavy-duty corrugated shipping cartons, flexible pouches, and custom interior protective inserts. Every production run is color-calibrated to exact Pantone specifications and ISTA drop-tested.',
  processTitle: 'The packaging manufacturing lifecycle.',
  offerName: 'Packaging Industry Sourcing & Production',
  offerDescription:
    'Direct factory procurement of custom retail boxes, luxury rigid packaging, corrugated shipping mailers, and eco-friendly protective inserts.',
  focusAreas: [
    {
      title: 'Luxury Rigid Boxes & Gift Sets',
      body: 'Sturdy magnetic closure boxes, two-piece lift-off lid boxes, and collapsible rigid boxes constructed from 1200–1800 gsm dense greyboard with specialty art paper wrapping.',
    },
    {
      title: 'Folding Cartons & Retail Boxes',
      body: 'SBS, C1S, and kraft folding cartons precision die-cut for high-speed automated packaging lines in cosmetics, food & beverage, and consumer electronics.',
    },
    {
      title: 'Corrugated E-Commerce Mailers',
      body: 'Custom-printed E-flute, B-flute, and double-wall corrugated shipping boxes engineered for drop durability, tear resistance, and memorable unboxing aesthetics.',
    },
    {
      title: 'FSC-Certified & Sustainable Substrates',
      body: 'Post-consumer waste (PCW) recycled board, biodegradable molded sugarcane bagasse pulp, soy-based vegetable inks, and plastic-free interior cradles.',
    },
  ],
  briefItems: [
    'Box structure (rigid box, folding carton, mailer, or flexible pouch)',
    'Precise dimensions (length x width x depth in mm or inches) and substrate caliper',
    'Print artwork, Pantone color codes, and specialty finish requirements (foil, spot UV, emboss)',
    'Target order quantity (starting from 500 units) and target delivery date',
  ],
  workflow: [
    {
      title: 'Dieline Engineering & Board Selection',
      body: 'We optimize your structural dieline for machine packing efficiency, board yield, and shipping container density.',
    },
    {
      title: 'Tender & Mill-Direct Cost Modeling',
      body: 'We benchmark specialized packaging converters, securing paper mill direct raw material pricing and tooling amortization.',
    },
    {
      title: 'Structural CAD White & Press Proof Sampling',
      body: 'The factory cuts a physical white mockup for dimensional fitting, followed by high-definition press proofs for color sign-off.',
    },
    {
      title: 'High-Speed Automated Offset Printing',
      body: 'State-of-the-art multi-color Heidelberg presses execute production runs with continuous densitometer color checks.',
    },
    {
      title: 'Drop Testing, Palletization & Container Dispatch',
      body: 'Packaging undergoes compression burst testing and moisture-barrier shrink-wrapping before container loading.',
    },
  ],
  showcaseCategory: 'packaging',
  benchmarks: [
    {
      label: 'Minimum order quantity',
      value: 'From 500 units',
      qualifier: 'Starting volume for custom printed rigid boxes, mailers, and folding cartons.',
    },
    {
      label: 'Structural white sample',
      value: '3 to 5 business days',
      qualifier: 'Unprinted prototype cut on CAD tables to verify internal product fit.',
    },
    {
      label: 'Full finished sample',
      value: '7 to 12 business days',
      qualifier: 'Complete sample with custom offset printing, foil stamping, lamination, and insert tray.',
    },
  ],
  benchmarksNote:
    'Production typically runs 45 to 60 days after proof approval, depending on quantity, materials and finishes, and is confirmed in your quotation. FSC certified papers and soy-based inks available upon request.',
  faqs: [
    {
      question: 'What are typical minimum order quantities for custom packaging?',
      answer:
        'Custom packaging MOQs typically start at 500 to 1,000 units. For optimal unit cost economies of scale, production runs of 2,500 to 10,000 units significantly amortize prepress plate and die setup costs.',
    },
    {
      question: 'How do you ensure color accuracy across different packaging pieces?',
      answer:
        'We mandate standard Pantone (PMS) ink codes and conduct spectrophotometer readings during press runs, ensuring that rigid boxes, retail cartons, and tissue paper match within strict delta-E tolerances.',
    },
    {
      question: 'Can you manufacture custom protective inserts for fragile products?',
      answer:
        'Yes. We manufacture precision custom inserts using high-density EVA foam, cross-linked polyethylene, thermoformed RPET blister trays, and eco-friendly molded sugarcane pulp.',
    },
    {
      question: 'How do you prevent moisture damage to paper packaging during ocean transit?',
      answer:
        'Finished packaging is packed inside heavy-duty double-wall master cartons lined with poly moisture barriers and high-capacity silica desiccant packs, then stretch-wrapped onto heat-treated ISPM-15 export pallets.',
    },
  ],
  briefTitle: 'Request a custom packaging quote.',
  briefIntro:
    'Share your box dimensions, artwork status, and target quantities. We will benchmark factory-direct pricing.',
  relatedPages: [
    {
      href: '/custom-packaging',
      title: 'Custom Packaging Overview',
      description: 'Comprehensive packaging, box, and label procurement.',
    },
    {
      href: '/packaging-sourcing',
      title: 'Packaging Sourcing Services',
      description: 'Direct converter sourcing and paper mill coordination.',
    },
    {
      href: '/private-label-packaging',
      title: 'Private Label Packaging',
      description: 'Packaging solutions tailored for private label brands.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight & Cross-Border Logistics',
      description: 'Ocean and air shipping optimized for volumetric packaging cargo.',
    },
  ],
};

export default function PackagingIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
