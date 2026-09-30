import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Furniture & Home Goods Sourcing Overseas | Sourcing Lab USA',
  description:
    'Direct factory sourcing of contract furniture, hospitality furnishings, casegoods, and flat-pack home goods. TSCA Title VI compliance, drop testing, and delivery.',
  path: '/industries/furniture',
});

const page: ServicePageContent = {
  path: '/industries/furniture',
  eyebrow: 'Industry Vertical · Furniture & Hospitality Furnishings',
  title: 'Furniture & Contract Furnishings Manufacturing Sourcing',
  directAnswer:
    'Furniture industry sourcing connects commercial hospitality developers, interior design firms, and home goods retailers with specialized furniture manufacturers in Asia and Europe. It encompasses solid wood casegoods, metal-frame seating, upholstered commercial furniture, flat-pack cabinetry, EPA TSCA Title VI formaldehyde compliance, TB 117 fire-safety certification, and ISTA 3A transit packaging validation.',
  intro:
    'Sourcing furniture internationally provides access to specialized woodworking craftsmanship, advanced metal fabrication, and significant cost savings. However, furniture is highly susceptible to wood moisture warping, transit transit breakage, and complex environmental regulations. Sourcing Lab USA provides rigorous factory-floor oversight and structural testing.',
  overviewTitle: 'Engineered durability for hospitality, commercial, and residential use.',
  overview:
    'We audit furniture manufacturers across primary woodworking and metalworking centers in Guangdong (Foshan, Dongguan), Zhejiang, and Vietnam. Every production run is inspected for kiln-dried wood moisture content (8%–12%), joinery integrity (mortise and tenon, dowel bonding), foam density, and commercial rub counts (Wyzenbeek/Martindale).',
  processTitle: 'The furniture manufacturing and delivery process.',
  offerName: 'Furniture Sourcing & Contract Manufacturing',
  offerDescription:
    'Direct factory procurement of commercial hospitality furniture, residential casegoods, flat-pack cabinetry, and outdoor living products.',
  focusAreas: [
    {
      title: 'Commercial Hospitality Seating & Upholstery',
      body: 'Dining chairs, lounge chairs, barstools, and banquettes built with kiln-dried hardwood frames, high-resilience fire-rated foam (CAL TB 117-2013), and contract commercial fabrics.',
    },
    {
      title: 'Architectural Casegoods & Metal Accents',
      body: 'Credenzas, headboards, desks, and nightstands crafted from solid wood, engineered wood with natural wood veneers, sintered stone tops, and brass/steel metal accents.',
    },
    {
      title: 'Flat-Pack E-Commerce & KD Furniture',
      body: 'Knock-down (KD) furniture engineered with cam-lock fasteners, clear bilingual step-by-step assembly instructions, blister-packed hardware, and ISTA 3A certified packaging.',
    },
    {
      title: 'Outdoor & Weather-Resistant Furniture',
      body: 'Rust-proof powder-coated aluminum frames, all-weather synthetic PE wicker, quick-dry reticulated foam, and solution-dyed acrylic outdoor textiles with high UV ratings.',
    },
  ],
  briefItems: [
    'Furniture schedule, shop drawings (CAD/PDF), 3D renderings, or reference photography',
    'Material specifications (wood species, veneer cut, metal finish, fabric rub counts)',
    'Target unit volumes, project delivery phasing, and target FOB/DDP budget',
    'Required certifications (TSCA Title VI, TB 117, BIFMA testing) and jobsite zip code',
  ],
  workflow: [
    {
      title: 'Shop Drawing Review & Value Engineering',
      body: 'We review architectural drawings with factory engineers to optimize internal structural framing, reduce shipping cube size, and select durable commercial materials.',
    },
    {
      title: 'Factory Benchmarking & Full-Scale Prototyping',
      body: 'Candidate factories construct full-scale physical prototype samples for client review, examining finish consistency, ergonomics, and structural joint rigidity.',
    },
    {
      title: 'Laboratory Testing & Environmental Compliance',
      body: 'Samples undergo third-party testing for formaldehyde emissions (CARB Phase 2 / TSCA Title VI), foam flammability, and commercial stability/durability (ANSI/BIFMA).',
    },
    {
      title: 'Production Oversight & Moisture Monitoring',
      body: 'During production, our inspectors verify that kiln-dried wood moisture content remains strictly between 8% and 12% to prevent cracking or warping in dry U.S. climates.',
    },
    {
      title: 'ISTA 3A Packaging & Container Stuffing',
      body: 'Furniture cartons undergo rigorous drop and vibration testing, followed by specialized container loading using corner protectors, foam padding, and air bags.',
    },
  ],
  benchmarks: [
    {
      label: 'Minimum order volume',
      value: 'From 50 to 100 pcs/model',
      qualifier: 'Standard starting volume for custom contract hospitality or flat-pack production.',
    },
    {
      label: 'Full-scale physical prototype',
      value: '15 to 25 days',
      qualifier: 'Hand-crafted physical prototype including final wood finishes, upholstery, and metalwork.',
    },
    {
      label: 'Production & container loading',
      value: '45 to 60 days',
      qualifier: 'Complete production cycle including kiln drying, assembly, finishing, and packaging.',
    },
  ],
  benchmarksNote:
    'All wood materials strictly comply with the U.S. Lacey Act (legal timber verification) and EPA TSCA Title VI formaldehyde emission limits.',
  hideShowcase: true,
  faqs: [
    {
      question: 'How do you prevent wood furniture from cracking or warping in the U.S.?',
      answer:
        'The primary cause of wood warping is improper moisture content. We enforce strict industrial kiln-drying protocols, measuring wood moisture with calibrated digital pin meters on the factory floor to ensure moisture content remains at 8%–12%, matching the interior equilibrium of American heated homes.',
    },
    {
      question: 'What environmental regulations apply to imported wood furniture?',
      answer:
        'Imported wood furniture must comply with: (1) EPA TSCA Title VI / CARB Phase 2 regulating formaldehyde emissions from composite wood panels (MDF, particleboard, hardwood plywood), and (2) the U.S. Lacey Act, requiring electronic declarations proving timber was legally harvested.',
    },
    {
      question: 'Can you source furniture that meets commercial contract BIFMA standards?',
      answer:
        'Yes. For office, educational, and commercial projects, we mandate ANSI/BIFMA durability testing (load-bearing static weights, cycle tilt tests, and drop impact tests) conducted by accredited third-party labs.',
    },
    {
      question: 'How do you protect large furniture pieces during ocean transit?',
      answer:
        'We mandate heavy-duty 5-ply or 7-ply double-wall corrugated master cartons, reinforced EPS foam corner blocks, edge protectors, and individual moisture-absorbing desiccants, validated through ISTA 3A transit drop tests.',
    },
  ],
  briefTitle: 'Submit your furniture procurement brief.',
  briefIntro:
    'Share your furniture schedules, CAD drawings, or hospitality specs. We will review production feasibility and deliver direct factory pricing.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'End-to-end global procurement and direct factory management.',
    },
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'Physical workshop audits, kiln-dry inspection, and capacity checks.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight & Cross-Border Logistics',
      description: 'High-cube ocean container shipping and specialized furniture drayage.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model container volumetric efficiency and delivered furniture economics.',
    },
  ],
};

export default function FurnitureIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
