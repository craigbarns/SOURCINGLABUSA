import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Overseas Product Development & OEM/ODM Consulting | Sourcing Lab USA',
  description:
    'Scope overseas product development from specifications and samples. Coordinate feasibility, supplier engineering questions, tooling and approval checkpoints.',
  path: '/product-development',
});

const page: ServicePageContent = {
  path: '/product-development',
  reviewedDate: '2026-10-21',
  references: [
    { title: 'CPSC — Product requirements, testing and certification guidance', url: 'https://www.cpsc.gov/Business--Manufacturing/Business-Education' },
  ],
  eyebrow: 'Engineering & Prototyping · Concept to Mass Production',
  title: 'Overseas Product Development & OEM/ODM Manufacturing',
  directAnswer:
    'Overseas product development turns a defined product concept into a specification, supplier feasibility review, samples and an agreed production plan. Sourcing Lab USA coordinates the work accepted for the project with the manufacturer and any appointed specialists. Engineering, tooling and testing needs vary by product; a sourcing engagement does not itself provide regulatory certification.',
  intro:
    'Taking a new physical product from drawing board to factory floor involves high engineering and capital risks. Without rigorous Design for Manufacturing (DFM) oversight, products suffer from expensive tooling reworks, unworkable assembly tolerances, and unexpected material costs. Sourcing Lab USA bridges the gap between American industrial designers and overseas factory engineers.',
  overviewTitle: 'De-risking the transition from prototype to volume manufacturing.',
  overview:
    'A prototype does not by itself establish production readiness. Ask the proposed manufacturer to review materials, construction, tolerances, tooling and assembly before commitments are made. Specialist design or engineering work needs a separately agreed scope, provider and approval responsibility.',
  processTitle: 'The 5-stage product development lifecycle.',
  offerName: 'Overseas Product Development & Engineering Management',
  offerDescription:
    'Project scoping, manufacturer feasibility discussions, sample coordination and agreed development checkpoints for overseas production.',
  focusAreas: [
    {
      title: 'Design for Manufacturing (DFM) Analysis',
      body: 'Coordinate the manufacturer’s review of design and process questions, such as construction, material choice, tolerances and assembly. The appointed engineer confirms technical changes and responsibility for design approval.',
    },
    {
      title: 'Tooling, Mold & Die Management',
      body: 'Where tooling is needed, document its specification, quotation, acceptance tests, maintenance and location. Ownership, access and transfer rights must be agreed in writing with the contracting parties.',
    },
    {
      title: 'Iterative Functional Prototyping (T0 to T-Final)',
      body: 'Agree what each sample should establish, who performs measurements and tests, and which changes require a new approval. Specialist equipment and test methods are confirmed with the appointed provider.',
    },
    {
      title: 'Regulatory & Lab Compliance Testing',
      body: 'Identify product-specific testing and documentation questions with the importer’s qualified advisers. Any laboratory, required acceptance or accreditation, test scope and certification responsibility must be confirmed before appointment; no laboratory partnership is implied.',
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
      body: 'The manufacturer confirms the tooling method, specification, milestones and progress evidence included in the quotation. Review changes before authorizing the next agreed stage.',
    },
    {
      title: 'First-Article Inspection (T1 Samples)',
      body: 'Review initial samples against the agreed dimensions, function and finish. The appointed technical provider performs any specialist measurement or stress testing explicitly included in scope.',
    },
    {
      title: 'Sample Iteration & Golden Sample Sign-Off',
      body: 'Review proposed changes against the agreed tolerances, reference colors and acceptance criteria. Record the approved sample and any remaining limitations before production authorization.',
    },
    {
      title: 'Pilot Production & Mass Assembly',
      body: 'Where useful, agree a pilot quantity and review criteria with the manufacturer before wider production. Volume, test coverage and release decisions depend on product risk, process and the order agreement.',
    },
  ],
  benchmarks: [
    {
      label: 'DFM engineering review',
      value: 'Scope confirmed',
      qualifier: 'Required files, manufacturer feedback and any specialist engineering work are agreed first.',
    },
    {
      label: 'Tooling & mold fabrication',
      value: 'Supplier schedule',
      qualifier: 'Dependent on mold cavity count, steel hardness, and complexity of part geometry.',
    },
    {
      label: 'T1 off-tool samples',
      value: 'Milestone agreed',
      qualifier: 'First physical parts delivered for dimensional verification and mechanical testing.',
    },
  ],
  benchmarksNote:
    'No standard development lead time is promised. Tooling rights, technical approvals, testing and timing are recorded in the project agreement.',
  hideShowcase: true,
  faqs: [
    {
      question: 'Who owns the tooling and molds created during product development?',
      answer:
        'Ownership is determined by the actual agreement, not simply by who paid an invoice. Confirm ownership, permitted use, storage, maintenance, access and transfer rights with the parties and qualified counsel where needed before funding tooling.',
    },
    {
      question: 'What file formats do you need to begin a product development project?',
      answer:
        'For plastic and metal hardgoods, 3D CAD files in STEP (.stp) or IGES (.igs) format accompanied by 2D engineering drawings in PDF with critical tolerances and threading callouts. For apparel and softgoods, comprehensive tech packs with measurement specs.',
    },
    {
      question: 'Can you help if we only have an initial concept sketch or physical prototype?',
      answer:
        'A sketch or prototype can begin a feasibility discussion. Share what exists and we will confirm which specification work and specialist design input are needed; production-grade engineering files are not assumed to be included.',
    },
    {
      question: 'How do you protect proprietary designs from being copied?',
      answer:
        'Limit disclosure to what is necessary and agree confidentiality, permitted use and tooling rights before sharing sensitive files. Ask qualified counsel to prepare appropriate agreements for the parties and jurisdictions. No agreement or sourcing workflow can guarantee that copying will not occur.',
    },
    {
      question: 'What is the difference between OEM and ODM manufacturing?',
      answer:
        'OEM and ODM are used inconsistently across suppliers. Broadly, OEM often concerns production to the buyer’s requirements, while ODM often starts from a manufacturer-developed design. Confirm the actual design contribution, customization, intellectual-property rights and tooling needs rather than relying on the label alone.',
    },
  ],
  briefTitle: 'Discuss your product development project.',
  briefIntro:
    'Describe your product and the files or samples available. We will confirm feasibility review, specialist input and the next development step before a scope is agreed.',
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
