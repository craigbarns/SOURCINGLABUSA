import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Overseas Product Development & OEM/ODM Consulting | Sourcing Lab USA',
  description:
    'Turn product concepts and CAD files into mass-produced goods. Design for Manufacturing (DFM), custom tooling, prototyping, and factory scaling overseas.',
  path: '/product-development',
});

const page: ServicePageContent = {
  path: '/product-development',
  eyebrow: 'Engineering & Prototyping · Concept to Mass Production',
  title: 'Overseas Product Development & OEM/ODM Manufacturing',
  directAnswer:
    'Overseas product development is the comprehensive engineering and operational process of converting a concept, 3D CAD design, or prototype into mass-producible finished goods with overseas manufacturing partners. It encompasses Design for Manufacturing (DFM) optimization, custom mold and tooling fabrication, material testing, iterative functional prototyping, compliance certification, and controlled pilot production before commercial launch.',
  intro:
    'Taking a new physical product from drawing board to factory floor involves high engineering and capital risks. Without rigorous Design for Manufacturing (DFM) oversight, products suffer from expensive tooling reworks, unworkable assembly tolerances, and unexpected material costs. Sourcing Lab USA bridges the gap between American industrial designers and overseas factory engineers.',
  overviewTitle: 'De-risking the transition from prototype to volume manufacturing.',
  overview:
    'A prototype that works in a 3D printing lab often fails when scaled across a high-speed injection molding or CNC assembly line. We collaborate directly with factory toolmakers and chemical engineers to optimize part geometries, reduce cycle times, select durable commercial-grade materials, and establish strict tolerance limits before steel is cut for expensive production molds.',
  processTitle: 'The 5-stage product development lifecycle.',
  offerName: 'Overseas Product Development & Engineering Management',
  offerDescription:
    'Turnkey engineering support for custom product development, DFM analysis, tooling fabrication, functional prototyping, and manufacturing scaling overseas.',
  focusAreas: [
    {
      title: 'Design for Manufacturing (DFM) Analysis',
      body: 'We review part thicknesses, draft angles, undercut geometries, and parting lines to minimize mold complexity, eliminate sink marks, and lower per-unit cycle costs.',
    },
    {
      title: 'Tooling, Mold & Die Management',
      body: 'We oversee the precision machining of injection molds, stamping dies, and extrusion tooling, verifying steel specifications (such as S136 or H13) and structuring clear written terms for client tooling ownership.',
    },
    {
      title: 'Iterative Functional Prototyping (T0 to T-Final)',
      body: 'From initial mold test shots (T0) to fully functional off-tool samples (T1, T2), we conduct dimensional CMM measurements, fit testing, and cosmetic finishing evaluations.',
    },
    {
      title: 'Regulatory & Lab Compliance Testing',
      body: 'We coordinate testing with accredited third-party laboratories (SGS, TÜV, Intertek) to certify compliance with U.S. standards including CPSC, FDA, FCC, UL, and RoHS.',
    },
  ],
  briefItems: [
    '2D engineering drawings (PDF/DWG) and 3D CAD models (STEP, IGES, SolidWorks)',
    'Detailed Bill of Materials (BOM) specifying materials, finishes, and electronic components',
    'Target unit manufacturing cost and allocated tooling budget',
    'Target product launch schedule and mandatory safety/regulatory certifications',
  ],
  workflow: [
    {
      title: 'DFM Review & Tooling Quotation',
      body: 'We analyze your CAD files with specialized factory engineers to identify manufacturability challenges, recommend design adjustments, and benchmark tooling options.',
    },
    {
      title: 'Tooling Fabrication & Mold Machining',
      body: 'Tooling is cut using high-precision CNC, EDM, and wire-cutting machinery, with weekly progress reports and steel hardness certification.',
    },
    {
      title: 'First-Article Inspection (T1 Samples)',
      body: 'Initial off-tool samples are produced and subjected to full coordinate measuring machine (CMM) dimensional checks, functional stress tests, and surface finish reviews.',
    },
    {
      title: 'Sample Iteration & Golden Sample Sign-Off',
      body: 'Tooling is tuned to achieve exact mechanical tolerances and color matching (Pantone/RAL) until physical golden samples receive formal engineering sign-off.',
    },
    {
      title: 'Pilot Production & Mass Assembly',
      body: 'A limited pilot run (500–1,000 units) validates assembly line cycle times, packaging durability, and quality control jigs before releasing full-scale mass production.',
    },
  ],
  benchmarks: [
    {
      label: 'DFM engineering review',
      value: '3 to 5 business days',
      qualifier: 'Full manufacturability analysis, tolerance check, and mold cost breakdown.',
    },
    {
      label: 'Tooling & mold fabrication',
      value: '25 to 45 days',
      qualifier: 'Dependent on mold cavity count, steel hardness, and complexity of part geometry.',
    },
    {
      label: 'T1 off-tool samples',
      value: '5 to 7 days post-tooling',
      qualifier: 'First physical parts delivered for dimensional verification and mechanical testing.',
    },
  ],
  benchmarksNote:
    'Tooling timelines vary by manufacturing process (plastic injection molding, die casting, stamping, or blow molding). All client tooling remains client property.',
  hideShowcase: true,
  faqs: [
    {
      question: 'Who owns the tooling and molds created during product development?',
      answer:
        'Under clear written procurement agreements, custom tooling, dies, and molds funded by clients are defined as client property, with explicit contractual terms restricting unauthorized production, cloning, or transfer.',
    },
    {
      question: 'What file formats do you need to begin a product development project?',
      answer:
        'For plastic and metal hardgoods, 3D CAD files in STEP (.stp) or IGES (.igs) format accompanied by 2D engineering drawings in PDF with critical tolerances and threading callouts. For apparel and softgoods, comprehensive tech packs with measurement specs.',
    },
    {
      question: 'Can you help if we only have an initial concept sketch or physical prototype?',
      answer:
        'Yes. We regularly help founders and brands translate hand sketches, physical mockups, or rough 3D prints into production-grade CAD files, detailed BOMs, and manufacturing-ready engineering specifications.',
    },
    {
      question: 'How do you protect proprietary designs from being copied?',
      answer:
        'We put in place bilateral Non-Disclosure, Non-Use, and Non-Circumvention (NNN) agreements before proprietary CAD files are shared, coordinating with qualified international counsel when formal jurisdiction-specific agreements are required, and working with factories committed to contract manufacturing.',
    },
    {
      question: 'What is the difference between OEM and ODM manufacturing?',
      answer:
        'OEM (Original Equipment Manufacturing) involves manufacturing a completely custom product designed by the buyer using proprietary tooling. ODM (Original Design Manufacturing) involves selecting an existing factory-developed base product and customizing branding, colors, packaging, or minor functional features.',
    },
  ],
  briefTitle: 'Discuss your product development project.',
  briefIntro:
    'Submit your CAD files, sketches, or product specs. Our engineering and procurement team will conduct a preliminary DFM review and estimate tooling requirements.',
  relatedPages: [
    {
      href: '/private-label-manufacturing',
      title: 'Private Label Manufacturing',
      description: 'Turnkey private label sourcing, custom branding, and custom packaging solutions.',
    },
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'Direct overseas factory procurement and manufacturing execution.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control & Inspections',
      description: 'Pre-shipment inspections and pilot production quality verification.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Calculate complete unit landed cost including tooling amortization and duties.',
    },
  ],
};

export default function ProductDevelopmentPage() {
  return <ServiceLandingPage page={page} />;
}
