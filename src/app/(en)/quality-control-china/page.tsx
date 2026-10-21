import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Quality Control China & Pre-Shipment Inspection | Sourcing Lab USA',
  description:
    'Coordinate product-specific quality checkpoints and appointed inspection providers in China. Agree specifications, sampling, reporting and follow-up before production.',
  path: '/quality-control-china',
});

const page: ServicePageContent = {
  path: '/quality-control-china',
  reviewedDate: '2026-10-21',
  references: [
    { title: 'CPSC — Business Education and product testing guidance', url: 'https://www.cpsc.gov/Business--Manufacturing/Business-Education' },
  ],
  eyebrow: 'Quality Assurance · On-Site China Inspections',
  title: 'Quality Control in China: Pre-Shipment & Factory Inspections',
  directAnswer:
    'Quality control compares production with a written product specification and agreed acceptance criteria. Sourcing Lab USA coordinates project checkpoints and, where agreed, an appointed inspection provider. A sample inspection describes the goods and tests examined; it does not prove every unit is defect-free or replace product-specific regulatory testing and certification.',
  intro:
    'Quality expectations are easier to discuss before production than after delivery. Define measurable requirements, sample references, reporting and the response to a failed check. The checkpoint scope and any third-party inspection arrangement are confirmed for the order; Sourcing Lab USA does not claim to be an independent certified inspection company.',
  overviewTitle: 'Inspection protocols based on statistical sampling.',
  overview:
    'Factory controls and buyer-appointed inspections serve different purposes. Ask the inspection provider to define the lot, sampling method, inspection level, defect categories and acceptance criteria for your product. Statistical acceptance sampling is not a promise of a particular defect percentage in the whole order.',
  processTitle: 'The 4 primary stages of factory quality control.',
  offerName: 'China Quality Control & Inspection Services',
  offerDescription:
    'On-site pre-shipment inspections (PSI), during-production checks (DUPRO), first-article inspections (FAI), and container loading supervision across China.',
  focusAreas: [
    {
      title: 'Pre-Shipment Inspection (PSI / FRI)',
      body: 'Agree the required production and packing status with the appointed provider. The checklist may cover appearance, dimensions, function, quantity and packaging using the sampling plan selected for the lot.',
    },
    {
      title: 'During Production Inspection (DUPRO)',
      body: 'An agreed checkpoint while production is underway can identify deviations before more units are made. Select the timing according to process risks, order size and what corrective action remains possible.',
    },
    {
      title: 'On-Site Functional & Stress Testing',
      body: 'Specify the checks, equipment, test methods and provider competence needed for the product. Electrical, safety, performance or regulated testing may require a qualified laboratory and a separate engagement.',
    },
    {
      title: 'Container Loading Supervision (CLS)',
      body: 'Inspectors supervise port container stuffing, verifying carton counts, securing pallet wrapping, checking container cleanliness and weather-proofing, and sealing container doors.',
    },
  ],
  briefItems: [
    'Factory location, management contact person, and planned production completion date',
    'Approved Golden Sample specifications, technical drawings, and acceptable tolerance limits',
    'Custom quality checklist with specific defect classifications (Critical, Major, Minor)',
    'Packaging requirements, barcode data (UPC/EAN), and carton drop-test standards',
  ],
  workflow: [
    {
      title: 'Inspection Protocol & Checklist Alignment',
      body: 'We establish an objective inspection checklist customized to your product category, detailing Critical-to-Quality (CTQ) points, acceptable defect thresholds, and required testing protocols.',
    },
    {
      title: 'Auditor Dispatch & Random Sampling',
      body: 'The appointed provider confirms factory access, lot readiness and the agreed sample-selection method. Inspection level and acceptance criteria are selected for the product rather than assumed universally.',
    },
    {
      title: 'Visual, Dimensional & Functional Audit',
      body: 'The provider performs the visual, dimensional and functional checks included in the protocol and records any limits in equipment, access or test coverage.',
    },
    {
      title: 'Packaging & Barcode Integrity Check',
      body: 'Inspectors verify master carton markings, shipping labels, polybag warning text, individual retail packaging, and verify that all barcodes scan instantly with standard optical scanners.',
    },
    {
      title: 'Inspection Findings & Next Decision',
      body: 'The agreed report records inspected items, observations, defects and limitations, with supporting images where available. Reporting timing and the buyer’s release or corrective-action decision are agreed for the project.',
    },
  ],
  benchmarks: [
    {
      label: 'Acceptance criteria',
      value: 'Product-specific',
      qualifier: 'Define defect categories, sampling and acceptance numbers with the appointed inspection provider.',
    },
    {
      label: 'Inspector dispatch notice',
      value: 'Availability confirmed',
      qualifier: 'Scheduling depends on location, factory access, production readiness and provider availability.',
    },
    {
      label: 'Report turnaround',
      value: 'Agreed in scope',
      qualifier: 'Complete photo-documented report, delivered on the timeline agreed for the inspection.',
    },
  ],
  benchmarksNote:
    'The appointed provider confirms the applicable sampling protocol. An inspection is a defined checkpoint, not a guarantee of defect-free goods or regulatory approval.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is AQL 2.5 and is it used for every product?',
      answer:
        'AQL is a parameter in an acceptance-sampling plan, not a guaranteed percentage of defects in an order. The appropriate plan depends on the lot, product risks and agreed criteria. Ask the appointed inspection provider to explain its method and acceptance numbers; do not apply one value to every product.',
    },
    {
      question: 'When is the best time to conduct quality control during production?',
      answer:
        'Choose checkpoints according to the production process and when problems can still be corrected. During-production checks can expose emerging deviations; a final inspection examines the defined finished lot. Neither establishes that every unit complies with every requirement.',
    },
    {
      question: 'What happens if a factory fails the quality inspection?',
      answer:
        'Review the findings against the order agreement, then decide on corrective action, reinspection and shipment release. Payment holds, rework costs and remedies depend on the agreed contract; they should not be assumed after a failure.',
    },
    {
      question: 'Why can’t I rely on the factory’s internal QC department?',
      answer:
        'Internal factory QC reports directly to factory management, who are commercially incentivized to ship orders on schedule and minimize factory losses. An appointed third-party QC firm reports to the buyer rather than to factory management. Where the goods are supplied by Sourcing Lab USA itself, the inspection is a production checkpoint on your behalf and is not presented as an independent audit.',
    },
    {
      question: 'Which cities and regions in China do your quality inspectors cover?',
      answer:
        'Share the factory address and proposed inspection scope. Coverage, access, travel costs and provider availability are confirmed before an engagement is accepted.',
    },
  ],
  briefTitle: 'Book an on-site quality inspection in China.',
  briefIntro:
    'Provide your factory’s location, product details, and planned shipping date. We will confirm the checkpoint scope and any appointed inspection provider’s availability.',
  relatedPages: [
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'Physical background checks and business license verification.',
    },
    {
      href: '/supplier-audit-china',
      title: 'Supplier Audits in China',
      description: 'In-depth quality management system and manufacturing process audits.',
    },
    {
      href: '/china-sourcing',
      title: 'China Sourcing Services',
      description: 'Full-cycle product sourcing, price negotiation, and production management.',
    },
    {
      href: '/freight-logistics',
      title: 'Freight & Cross-Border Logistics',
      description: 'Shipment planning and coordination with appointed logistics and customs providers.',
    },
  ],
};

export default function QualityControlChinaPage() {
  return <ServiceLandingPage page={page} />;
}
