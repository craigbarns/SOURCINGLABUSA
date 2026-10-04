import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Packaging Sourcing & Custom Box Manufacturing | Sourcing Lab USA',
  description:
    'Direct factory packaging sourcing for American consumer brands. Rigid luxury boxes, corrugated mailers, folding cartons, eco-friendly materials, and labels.',
  path: '/packaging-sourcing',
});

const page: ServicePageContent = {
  path: '/packaging-sourcing',
  eyebrow: 'Bespoke Packaging · Direct Factory Procurement',
  title: 'Packaging Sourcing & Custom Box Manufacturing',
  directAnswer:
    'Packaging sourcing is the procurement process of contracting specialized packaging converters and paper mills overseas to manufacture bespoke retail boxes, luxury rigid containers, corrugated mailers, and custom inserts. Sourcing packaging directly from primary manufacturers reduces per-unit costs by 30% to 50% compared to domestic distributors, while unlocking advanced finishing techniques like foil stamping, soft-touch laminates, and custom molded pulp inserts.',
  intro:
    'For modern e-commerce, beauty, electronics, and luxury brands, packaging is an essential driver of perceived product value and customer retention. Yet domestic packaging brokers add heavy markups while offering limited structural options. Sourcing Lab USA connects you directly with premier packaging factories.',
  overviewTitle: 'High-end structural packaging engineered to specification.',
  overview:
    'Packaging engineering requires precise dieline creation, paper stock calibration, and color reproduction accuracy. We coordinate with specialized packaging manufacturers in Guangdong and Zhejiang to produce rigid gift boxes, folding cartons, corrugated subscription boxes, flexible pouches, and FSC-certified sustainable packaging with exact Pantone color fidelity.',
  processTitle: 'From vector dieline to delivered packaging production.',
  offerName: 'Custom Packaging Sourcing & Production',
  offerDescription:
    'Direct factory procurement of rigid presentation boxes, corrugated mailers, folding cartons, eco-friendly inserts, woven labels, and retail packaging sets.',
  focusAreas: [
    {
      title: 'Luxury Rigid Boxes & Gift Sets',
      body: 'Custom magnetic closure boxes, shoulder-and-neck boxes, and book-style boxes manufactured with 1200–1800 gsm greyboard, wrapped in premium art paper or specialty textured substrates.',
    },
    {
      title: 'E-Commerce Corrugated & Folding Cartons',
      body: 'E-flute and B-flute corrugated mailers engineered for high-speed automated packing lines, drop-tested to withstand international transit without structural failure.',
    },
    {
      title: 'Molded Pulp & Custom Protective Inserts',
      body: 'Eco-friendly biodegradable molded sugarcane bagasse pulp, EVA foam, high-density sponge, and thermoformed RPET blister trays engineered to cradle delicate products securely.',
    },
    {
      title: 'Advanced Specialty Surface Finishes',
      body: 'Precision hot foil stamping, spot UV gloss, blind embossing and debossing, anti-scratch soft-touch matte lamination, and food-grade barrier coatings.',
    },
  ],
  briefItems: [
    'Box style (rigid magnetic, folding carton, mailer box, tube, or flexible pouch)',
    'Internal and external dimensions (L x W x H in inches or millimeters)',
    'Vector dielines and artwork files (AI, PDF with bleed and cut lines)',
    'Target order volume (starting from 500 units), target unit budget, and delivery date',
  ],
  workflow: [
    {
      title: 'Structural Dieline & Paper Selection',
      body: 'We review your product weight and dimensions to create optimized dielines, selecting optimal board calipers, fluting profiles, and face papers for maximum durability.',
    },
    {
      title: 'Direct Factory Tender & Cost Optimization',
      body: 'We benchmark specialized packaging converters to secure direct factory-floor pricing, optimizing sheet nesting to reduce raw material waste and minimize tooling costs.',
    },
    {
      title: 'Digital & Physical Proof Sampling',
      body: 'The factory cuts a physical unprinted structural white sample to verify fit, followed by a digital press proof and fully finished pre-production sample with all foil and print finishes.',
    },
    {
      title: 'Automated Printing & Assembly Run',
      body: 'High-speed Heidelberg offset printing presses ensure ultra-precise color registration and ink density across large production volumes.',
    },
    {
      title: 'Drop Testing, Palletization & Delivery',
      body: 'Packaging batches undergo ISTA drop tests, burst strength testing, moisture barrier checks, and shrink-wrapped palletization for safe container transit.',
    },
  ],
  showcaseCategory: 'packaging',
  benchmarks: [
    {
      label: 'Minimum order quantity',
      value: 'From 500 units',
      qualifier: 'Standard starting volume for custom printed rigid boxes, mailers, and folding cartons.',
    },
    {
      label: 'Structural white sample',
      value: '3 to 5 business days',
      qualifier: 'Unprinted physical prototype cut on CAD tables to verify internal fit and dimensions.',
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
      question: 'What is the minimum order quantity (MOQ) for custom packaging?',
      answer:
        'Standard MOQs for custom printed packaging typically start at 500 to 1,000 units per artwork variation. Sourcing packaging in volumes above 2,500 to 5,000 units yields dramatic volume savings due to offset printing plate amortization.',
    },
    {
      question: 'Can you match exact Pantone brand colors on packaging?',
      answer:
        'Yes. We require Pantone Matching System (PMS) color codes for all critical brand graphics and conduct spectrophotometer readings during print press checks to ensure tight delta-E color tolerance.',
    },
    {
      question: 'Do you offer sustainable and eco-friendly packaging options?',
      answer:
        'Yes. We source FSC-certified recycled paperboard, post-consumer waste (PCW) corrugated cardboard, soy-based and water-based non-toxic inks, and biodegradable molded sugarcane/bamboo pulp inserts to replace plastic blisters.',
    },
    {
      question: 'How do you prevent shipping damage to empty packaging during transit?',
      answer:
        'Folding cartons and corrugated mailers ship flat to minimize shipping volume and protect corners. Rigid boxes that cannot fold flat are nested with protective poly foam and packed into heavy-duty double-wall master export cartons with corner board protection.',
    },
    {
      question: 'Can you source complete packaging suites (boxes, tissue paper, stickers, labels)?',
      answer:
        'Yes. We coordinate full packaging kits including custom rigid boxes, printed tissue paper, thank-you cards, custom grosgrain ribbons, barcode stickers, and woven brand labels from unified manufacturing sources.',
    },
  ],
  briefTitle: 'Request a custom packaging quote.',
  briefIntro:
    'Provide your box dimensions, artwork status, and target quantities. We will review dielines and deliver factory-direct pricing.',
  relatedPages: [
    {
      href: '/custom-packaging',
      title: 'Custom Packaging Overview',
      description: 'Explore our full custom box, carton, and retail packaging capabilities.',
    },
    {
      href: '/private-label-packaging',
      title: 'Private Label Packaging',
      description: 'Turnkey packaging solutions designed specifically for private label brands.',
    },
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'Combine packaging manufacturing with direct product procurement.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight & Cross-Border Logistics',
      description: 'Ocean and air shipping solutions optimized for volumetric cargo.',
    },
  ],
};

export default function PackagingSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
