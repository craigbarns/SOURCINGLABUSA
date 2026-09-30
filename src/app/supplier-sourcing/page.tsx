import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Supplier Sourcing & Manufacturer Vetting USA | Sourcing Lab USA',
  description:
    'Strategic supplier sourcing and manufacturer vetting for American companies. Direct factory identification, capacity screening, commercial negotiation, and risk mitigation.',
  path: '/supplier-sourcing',
});

const page: ServicePageContent = {
  path: '/supplier-sourcing',
  eyebrow: 'Supplier Procurement & Vetting · Risk-Eliminated Sourcing',
  title: 'Strategic Supplier Sourcing & Manufacturer Vetting',
  directAnswer:
    'Supplier sourcing is the systematic process of identifying, evaluating, auditing, and contracting qualified manufacturing facilities based on verified technical capability, landed unit cost, quality standards, and delivery reliability. Professional supplier vetting eliminates unvetted intermediaries, validates legal corporate standing, benchmarks multiple competitive factories, and negotiates enforceable commercial terms before production begins.',
  intro:
    'Selecting the wrong manufacturing partner can jeopardize an entire product line through unexpected delays, intellectual property leakage, non-compliant materials, or fatal quality defects. Sourcing Lab USA delivers an exhaustive supplier qualification framework that gives U.S. businesses confidence in their overseas manufacturing partners.',
  overviewTitle: 'Rigorous vetting before capital deployment.',
  overview:
    'Many buyers make the mistake of choosing a supplier based purely on the lowest initial quote or the slickest online storefront. In reality, low quotes often reflect cheap substitute materials, unverified subcontractors, or low-grade machinery. We evaluate candidate suppliers across four essential dimensions: technical manufacturing capability, operational capacity, financial stability, and legal compliance.',
  processTitle: 'The 5-phase supplier vetting and selection process.',
  offerName: 'Supplier Sourcing & Vetting Services',
  offerDescription:
    'End-to-end industrial supplier identification, background verification, comparative cost analysis, commercial contract negotiation, and ongoing vendor management.',
  focusAreas: [
    {
      title: 'Direct Factory Qualification',
      body: 'We distinguish genuine original equipment manufacturers (OEMs) from trading entities and unauthorized brokers, validating physical production assets, equipment maintenance, and factory ownership.',
    },
    {
      title: 'Comparative Cost & BOM Benchmarking',
      body: 'We break down supplier quotations into raw materials, labor, tooling, overhead, and margin to expose artificially inflated line items and negotiate sustainable, institutional pricing.',
    },
    {
      title: 'Capacity & Scalability Assessment',
      body: 'We assess a factory’s current floor utilization, peak seasonal bottlenecks, and maximum monthly throughput to ensure they can scale alongside your business growth without sacrificing lead times.',
    },
    {
      title: 'Compliance & Export Readiness',
      body: 'We verify international compliance certifications (ISO 9001, BSCI, SMETA, FDA, CE) and review past customs export records to confirm a spotless compliance track record.',
    },
  ],
  briefItems: [
    'Target product category, bill of materials (BOM), and mechanical/electrical specs',
    'Volume projections (initial trial run, subsequent production runs, and annual capacity)',
    'Target Ex-Works (EXW) or FOB price targets',
    'Required quality tolerances, certifications, and compliance standards',
  ],
  workflow: [
    {
      title: 'Market Mapping & Longlist Identification',
      body: 'We map the global manufacturing landscape for your specific product category, identifying 10-20 qualified candidate manufacturers across specialized industrial clusters.',
    },
    {
      title: 'Screening & RFQ Tender Analysis',
      body: 'Candidate factories receive structured Requests for Quotation (RFQs). We benchmark their technical responses, unit economics, tooling quotes, and lead-time commitments.',
    },
    {
      title: 'In-Depth Background & Facility Audits',
      body: 'Top candidates undergo physical on-site audits to verify equipment, quality control stations, raw material provenance, environmental standards, and labor practices.',
    },
    {
      title: 'Commercial Terms & Specification Structuring',
      body: 'We help negotiate clear commercial terms covering unit prices, tooling ownership terms, payment milestones, and quality acceptance criteria, coordinating formal legal agreements with qualified counsel when needed.',
    },
    {
      title: 'Pilot Run & Production Onboarding',
      body: 'We supervise pilot production runs, validate tooling samples, and establish standard operating procedures (SOPs) for repeatable mass production.',
    },
  ],
  faqs: [
    {
      question: 'How do you identify legitimate manufacturers versus trading companies?',
      answer:
        'We use a layered evaluation process: checking local corporate registrations, reviewing registered capital and business scope, examining facility documentation, and coordinating on-site visits when appropriate to inspect factory equipment and active operations.',
    },
    {
      question: 'What information is needed to start a supplier sourcing project?',
      answer:
        'A comprehensive product brief including CAD drawings, 3D models or physical reference samples, material specifications, target purchase volumes, target pricing, and any mandatory regulatory or testing requirements.',
    },
    {
      question: 'How do you protect our intellectual property when sourcing overseas?',
      answer:
        'We require bilateral Non-Disclosure, Non-Use, and Non-Circumvention (NNN) terms before sensitive CAD files or proprietary specifications are shared, coordinating with qualified international counsel when formal jurisdiction-specific agreements are required.',
    },
    {
      question: 'How long does a supplier sourcing engagement take?',
      answer:
        'Initial supplier longlisting, RFQ benchmarking, and comparative analysis generally take 2 to 3 weeks. Full on-site verification and prototype sample sign-off typically require an additional 2 to 4 weeks depending on product complexity.',
    },
    {
      question: 'Can you help re-source an existing product if our current supplier is failing?',
      answer:
        'Yes. We regularly assist brands in transitioning production away from problematic suppliers. We evaluate your current technical data, benchmark alternative factories, verify tooling transfer or new tooling fabrication, and execute a seamless cutover.',
    },
  ],
  briefTitle: 'Request a supplier sourcing review.',
  briefIntro:
    'Tell us what product you need manufactured, your volume projections, and your target commercial terms. We will evaluate sourcing options and initiate supplier screening.',
  relatedPages: [
    {
      href: '/product-sourcing',
      title: 'Product Sourcing Overview',
      description: 'Comprehensive end-to-end procurement and supply execution for U.S. brands.',
    },
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'Physical factory inspections, legal checks, and capacity audits.',
    },
    {
      href: '/supplier-audit-china',
      title: 'Supplier Audits in China',
      description: 'Detailed on-site manufacturing audits and quality management assessments.',
    },
    {
      href: '/china-sourcing',
      title: 'China Sourcing Services',
      description: 'Specialized manufacturing management across China’s premier industrial regions.',
    },
  ],
};

export default function SupplierSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
