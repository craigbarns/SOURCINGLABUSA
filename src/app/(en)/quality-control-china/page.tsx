import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Quality Control China & Pre-Shipment Inspection | Sourcing Lab USA',
  description:
    'Independent third-party quality control inspections in China. Pre-Shipment Inspection (PSI), During Production (DUPRO), container loading checks, and AQL 2.5 reports.',
  path: '/quality-control-china',
});

const page: ServicePageContent = {
  path: '/quality-control-china',
  eyebrow: 'Quality Assurance · On-Site China Inspections',
  title: 'Quality Control in China: Pre-Shipment & Factory Inspections',
  directAnswer:
    'Quality control in China is the systematic on-site verification of manufactured goods against approved product specifications, engineering tolerances, cosmetic criteria, and safety regulations. Utilizing the international ISO 2859-1 / ANSI-ASQ Z1.4 (AQL) statistical sampling standard, professional QC inspectors evaluate raw materials, in-line assembly, finished product functionality, packaging durability, and labeling before final balance payments are authorized and goods are loaded for export.',
  intro:
    'Once defective goods leave a foreign port and cross the ocean, returns or remanufacturing are practically impossible. Discovering defects in an American warehouse means catastrophic write-downs, missed retail delivery windows, and brand damage. Sourcing Lab USA coordinates rigorous, independent on-site inspections to protect your supply chain at the factory source.',
  overviewTitle: 'Independent inspection protocols based on statistical sampling.',
  overview:
    'Never rely on a factory’s internal quality control team to verify their own production. Factory quality managers face internal corporate pressures to meet shipping quotas and clear inventory. Independent field inspectors act as your eyes and ears on the factory floor, executing objective, standardized test protocols to catch defects while corrective rework is still fast and enforceable.',
  processTitle: 'The 4 primary stages of factory quality control.',
  offerName: 'China Quality Control & Inspection Services',
  offerDescription:
    'Independent on-site pre-shipment inspections (PSI), during-production checks (DUPRO), first-article inspections (FAI), and container loading supervision across China.',
  focusAreas: [
    {
      title: 'Pre-Shipment Inspection (PSI / FRI)',
      body: 'Conducted when 100% of the order is manufactured and at least 80% is packed. Inspectors draw randomized samples using ISO 2859-1 tables to audit appearance, dimensions, functions, and packaging.',
    },
    {
      title: 'During Production Inspection (DUPRO)',
      body: 'Conducted when 10%–30% of goods are finished to verify that initial production units strictly conform to the approved golden sample, catching tooling or assembly flaws early.',
    },
    {
      title: 'On-Site Functional & Stress Testing',
      body: 'We perform physical testing directly on the factory floor: drop tests (ISTA 1A/2A), hi-pot electrical tests, moisture readings, pull tests, barcode scan verification, and waterproof tests.',
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
      body: 'A certified quality inspector arrives at the factory, verifies total batch quantities, and randomly selects sample cartons according to ISO 2859-1 AQL inspection level II.',
    },
    {
      title: 'Visual, Dimensional & Functional Audit',
      body: 'Every sampled unit is measured with calibrated instruments, inspected under standardized lighting for cosmetic blemishes, and tested for mechanical and electrical performance.',
    },
    {
      title: 'Packaging & Barcode Integrity Check',
      body: 'Inspectors verify master carton markings, shipping labels, polybag warning text, individual retail packaging, and verify that all barcodes scan instantly with standard optical scanners.',
    },
    {
      title: 'Same-Day Comprehensive Inspection Report',
      body: 'Within 24 hours of inspection, you receive a detailed report with full-color photographic evidence, itemized defect lists, and an unambiguous Pass / Fail conclusion.',
    },
  ],
  benchmarks: [
    {
      label: 'Sample AQL threshold',
      value: 'AQL 0 / 2.5 / 4.0 (Example)',
      qualifier: 'Common consumer goods example: zero critical defects, 2.5% major defects, 4.0% minor defects. Final criteria tailored to product risk.',
    },
    {
      label: 'Inspector dispatch notice',
      value: '48 to 72 hours',
      qualifier: 'Inspectors mobilized to any manufacturing hub across Guangdong, Zhejiang, and Jiangsu.',
    },
    {
      label: 'Report turnaround',
      value: 'Within 24 hours',
      qualifier: 'Complete photo-documented report delivered within 24 hours of on-site inspection.',
    },
  ],
  benchmarksNote:
    'We adhere to ISO 2859-1 (ANSI/ASQ Z1.4) international sampling tables. Custom testing jigs can be integrated upon request.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is AQL 2.5 and is it used for every product?',
      answer:
        'AQL (Acceptance Quality Limit) 2.5 is a commonly cited statistical benchmark in consumer goods inspections, but it is not a universal standard. Inspection levels and defect acceptance thresholds are determined based on product category, defect severity, order value, customer specifications, and regulatory risk. For higher-risk categories such as medical, food-contact, or precision industrial goods, significantly stricter criteria apply.',
    },
    {
      question: 'When is the best time to conduct quality control during production?',
      answer:
        'For high-volume or complex custom orders, a During Production (DUPRO) inspection at 20% completion catches systemic flaws early, while a final Pre-Shipment Inspection (PSI) at 100% completion ensures that all packaged goods meet final export standards before the final balance is paid.',
    },
    {
      question: 'What happens if a factory fails the quality inspection?',
      answer:
        'If an inspection results in a "Fail", the buyer holds final payment. The factory is presented with the detailed inspection report and required to rework or replace defective units at their own expense before a re-inspection is conducted.',
    },
    {
      question: 'Why can’t I rely on the factory’s internal QC department?',
      answer:
        'Internal factory QC reports directly to factory management, who are commercially incentivized to ship orders on schedule and minimize factory losses. An independent third-party QC firm represents exclusively the buyer’s commercial interests.',
    },
    {
      question: 'Which cities and regions in China do your quality inspectors cover?',
      answer:
        'We coordinate on-site inspections across primary manufacturing hubs in China: Shenzhen, Dongguan, Guangzhou, Foshan, Zhongshan, Ningbo, Hangzhou, Yiwu, Shaoxing, Wenzhou, Suzhou, Wuxi, Qingdao, and Xiamen.',
    },
  ],
  briefTitle: 'Book an on-site quality inspection in China.',
  briefIntro:
    'Provide your factory’s location, product details, and planned shipping date. We will prepare an inspection protocol and dispatch an inspector.',
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
      description: 'Secure shipping, customs clearance, and container logistics.',
    },
  ],
};

export default function QualityControlChinaPage() {
  return <ServiceLandingPage page={page} />;
}
