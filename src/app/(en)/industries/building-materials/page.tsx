import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Building Materials & Hardware Sourcing | Sourcing Lab USA',
  description:
    'Direct factory procurement of building materials, architectural hardware, fasteners, sanitaryware, and metal extrusions for American contractors and developers.',
  path: '/industries/building-materials',
});

const page: ServicePageContent = {
  path: '/industries/building-materials',
  eyebrow: 'Industry Vertical · Building Materials & Hardware',
  title: 'Building Materials & Architectural Hardware Sourcing',
  directAnswer:
    'Building materials sourcing connects American commercial developers, general contractors, and hardware distributors with certified overseas industrial manufacturers. It covers architectural hardware, aluminum extrusions, stainless steel fasteners, commercial sanitaryware, porcelain tile, and interior fixtures, ensuring full compliance with ASTM, ANSI, and U.S. building codes while lowering procurement budgets by 25% to 40%.',
  intro:
    'Commercial construction projects face punishing material inflation, lengthy distributor lead times, and volatile supply chains. Sourcing building materials directly from verified overseas manufacturers bypasses layers of domestic markups while ensuring materials meet rigorous U.S. engineering standards and building codes. Sourcing Lab USA manages direct mill procurement.',
  overviewTitle: 'Engineered hardware and materials certified to ASTM standards.',
  overview:
    'In building materials, compliance and load ratings are non-negotiable. Sourcing Lab USA audits metallurgical test reports, coating thickness certifications, and load ratings to ensure that every shipment of architectural hardware, structural extrusions, or ceramic finishes strictly adheres to American construction standards.',
  processTitle: 'The building materials procurement lifecycle.',
  offerName: 'Building Materials & Hardware Sourcing Management',
  offerDescription:
    'Direct mill procurement of architectural hardware, fasteners, custom metal extrusions, sanitary fixtures, and commercial tiles for U.S. developers.',
  focusAreas: [
    {
      title: 'Architectural Hardware & Fasteners',
      body: 'Commercial-grade door handles, hinges, mortise locks, cabinet pulls, and grade 304/316 stainless steel structural fasteners manufactured to ANSI/BHMA standards.',
    },
    {
      title: 'Aluminum Extrusions & Metal Profiles',
      body: 'Custom 6063 and 6061 T5/T6 architectural aluminum profiles, curtain wall components, and railing systems with anodized, powder-coated, or PVDF finishes.',
    },
    {
      title: 'Commercial Sanitaryware & Plumbing Fixtures',
      body: 'CUPC-certified ceramic toilets, vitreous china basins, solid brass faucets, and thermostatic shower valves engineered to ASME A112.18.1 standards.',
    },
    {
      title: 'Porcelain Tiles & Architectural Stone',
      body: 'Large-format porcelain slabs, rectified floor tiles, quartz countertops, and sintered stone surfaces tested for water absorption, slip resistance (DCOF), and Mohs hardness.',
    },
  ],
  briefItems: [
    'Material bill of quantities (BOQ), architectural schedules, or engineering drawings',
    'Required alloy grades, finish standards (salt spray hours), and dimensional tolerances',
    'Total project volume (FCL container lots or continuous project release schedule)',
    'Required certifications (ASTM, ANSI/BHMA, cUPC, WaterSense) and site delivery dates',
  ],
  workflow: [
    {
      title: 'Specification Review & BOQ Optimization',
      body: 'We review project architectural drawings and bills of quantities, benchmarking technical specs against direct industrial manufacturers in specialized clusters.',
    },
    {
      title: 'Mill Qualification & Submittal Approvals',
      body: 'Candidate manufacturers provide physical sample boards, mill test certificates (MTCs), and finish submittal samples for architect and engineering sign-off.',
    },
    {
      title: 'Commercial Contracting & Tooling Dies',
      body: 'We negotiate container-lot commercial terms, amortize extrusion die tooling, and structure staged payment terms tied to strict milestone inspections.',
    },
    {
      title: 'Mass Production & Metallurgical Testing',
      body: 'We inspect raw billet quality, verify alloy chemistry via spectrometer, test coating micron thickness, and conduct 72–120 hour salt spray corrosion tests.',
    },
    {
      title: 'Container Loading & Jobsite Logistics',
      body: 'Containers are packed with heavy-duty timber dunnage and delivered directly to regional project staging yards or developer job sites.',
    },
  ],
  benchmarks: [
    {
      label: 'Minimum order volume',
      value: 'Full Container Loads (FCL)',
      qualifier: 'Standard 20ft or 40ft container lots to optimize freight and port drayage economics.',
    },
    {
      label: 'Sample submittals',
      value: '10 to 18 days',
      qualifier: 'Architectural finish boards, cut sections, and laboratory metallurgical test reports.',
    },
    {
      label: 'Container production lead time',
      value: '30 to 45 days',
      qualifier: 'Following engineering submittal sign-off and production schedule release.',
    },
  ],
  benchmarksNote:
    'All structural hardware undergoes third-party salt-spray corrosion and tensile strength testing prior to export packing.',
  hideShowcase: true,
  faqs: [
    {
      question: 'How do you ensure building materials meet U.S. building codes?',
      answer:
        'We mandate third-party laboratory verification (SGS, Intertek, or IAPMO) for applicable U.S. standards, including ASTM for metals and tiles, ANSI/BHMA for commercial hardware, and cUPC / NSF 61 for plumbing fixtures.',
    },
    {
      question: 'What are the main risks when sourcing building materials overseas?',
      answer:
        'The primary risks are substandard metal alloys (e.g. using 201 stainless steel instead of 304), inadequate protective coatings leading to rapid rust, dimensional variations causing onsite installation failure, and heavy cargo damage during ocean transit if pallet dunnage is poorly engineered.',
    },
    {
      question: 'Can you source custom extrusion dies for aluminum profiles?',
      answer:
        'Yes. We regularly manage custom extrusion tooling for commercial facades, window systems, and modular railing systems. Tooling is quoted per project: die complexity, alloy, profile tolerances and run length all move the cost, so it is compared against your domestic quotation case by case.',
    },
    {
      question: 'How do you manage freight for heavy building materials?',
      answer:
        'Building materials are extremely heavy and dense. We optimize container loading to maximize weight limits (up to 44,000 lbs in 20ft containers) and arrange tri-axle chassis drayage in the U.S. to ensure full DOT road weight compliance.',
    },
  ],
  briefTitle: 'Submit your building materials procurement brief.',
  briefIntro:
    'Provide your bill of quantities (BOQ), architectural specifications, or project drawings. We will deliver direct mill pricing and compliance documentation.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'End-to-end industrial procurement and direct factory management.',
    },
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'Physical mill inspections, machine checks, and capacity audits.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight & Cross-Border Logistics',
      description: 'Heavy container transport, tri-axle drayage, and jobsite delivery.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Model complete delivered material costs against domestic distributor quotes.',
    },
  ],
};

export default function BuildingMaterialsIndustryPage() {
  return <ServiceLandingPage page={page} />;
}
