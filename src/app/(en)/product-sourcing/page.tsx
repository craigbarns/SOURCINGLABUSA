import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Product Sourcing Company USA | Direct Overseas Procurement',
  description:
    'End-to-end product sourcing for U.S. brands and enterprises. Direct manufacturer screening, price negotiation, factory audits, quality control, and delivered supply.',
  path: '/product-sourcing',
});

const page: ServicePageContent = {
  path: '/product-sourcing',
  eyebrow: 'Global Sourcing & Procurement · Built for U.S. Businesses',
  title: 'Product Sourcing Company for U.S. Brands & Enterprises',
  directAnswer:
    'A product sourcing company identifies, evaluates, and manages overseas manufacturing partners on behalf of domestic businesses. Rather than relying on unverified online directories or trading intermediaries, an operational sourcing partner audits factory capabilities, negotiates direct manufacturer pricing, oversees sample prototyping, enforces quality control standards, and coordinates cross-border logistics through to final U.S. delivery.',
  intro:
    'Navigating international manufacturing requires technical verification, commercial discipline, and clear operational accountability. Sourcing Lab USA helps American companies connect directly with capable overseas manufacturers, ensuring transparent supplier economics and reduced supply chain vulnerabilities.',
  overviewTitle: 'Direct factory procurement without middleman opacity.',
  overview:
    'Most cross-border sourcing failures happen before the first purchase order is signed. Misaligned technical drawings, unverified production capacity, unvetted subcontractors, and ambiguous commercial terms cause delays, cost overruns, and severe quality degradation. We operate as your dedicated procurement execution team, validating every manufacturer, engineering specification, and supply contract.',
  processTitle: 'The 6-stage product sourcing workflow.',
  offerName: 'Product Sourcing & Procurement Management',
  offerDescription:
    'Comprehensive overseas manufacturer identification, factory auditing, commercial negotiation, sample development, quality assurance, and delivered international supply.',
  focusAreas: [
    {
      title: 'Direct Manufacturer Identification',
      body: 'We screen and bypass third-party trading brokers, locating direct industrial manufacturers with verifiable production lines, audited quality management systems, and relevant export experience.',
    },
    {
      title: 'Commercial Negotiation & Tooling',
      body: 'We negotiate unit pricing, volume tiered thresholds, minimum order quantities (MOQs), payment terms, and tooling/mold ownership to protect your intellectual property and profit margins.',
    },
    {
      title: 'Technical Specification & Prototyping',
      body: 'From bills of materials (BOM) and tech packs to golden samples, we ensure factory engineers reproduce your exact tolerances, dimensions, material grades, and cosmetic standards.',
    },
    {
      title: 'End-to-End Supply Accountability',
      body: 'Specifications, sample sign-offs, production milestones, AQL quality inspections, and commercial terms are contractually locked before mass production commences.',
    },
  ],
  briefItems: [
    'Product category, functional requirements, and reference samples or 2D/3D CAD drawings',
    'Target order volumes, annual forecast, and required packaging specifications',
    'Benchmark unit target cost and landed cost expectations',
    'Mandatory regulatory certifications, testing protocols, and delivery timeline',
  ],
  workflow: [
    {
      title: 'Technical Brief & Feasibility Review',
      body: 'We review your product specifications, bills of materials, volume requirements, and target pricing to assess manufacturing feasibility, tooling requirements, and applicable tariff brackets.',
    },
    {
      title: 'Factory Screening & Background Audits',
      body: 'We identify and evaluate multiple candidate manufacturers, validating business licenses, export records, machinery capacity, labor standards, and on-site production capabilities.',
    },
    {
      title: 'Commercial Terms & Prototyping',
      body: 'We negotiate pricing, tooling costs, and production lead times, then coordinate sample production and laboratory testing until physical golden samples are formally approved.',
    },
    {
      title: 'Production Oversight & Quality Control',
      body: 'During production and prior to shipment, on-site quality inspectors verify dimensions, workmanship, packaging, and safety standards against your signed golden sample.',
    },
    {
      title: 'Customs & Delivered Supply',
      body: 'We coordinate freight booking, export documentation, US Customs clearance support, and final warehouse delivery under transparent Incoterms.',
    },
  ],
  faqs: [
    {
      question: 'What does a product sourcing company do?',
      answer:
        'A product sourcing company manages the entire supplier discovery, validation, and procurement lifecycle. This includes identifying legitimate manufacturers, auditing factories, negotiating pricing and MOQs, overseeing sample creation, enforcing quality control, and managing international shipping and import compliance.',
    },
    {
      question: 'How does Sourcing Lab USA differ from browsing Alibaba or Global Sources?',
      answer:
        'Online directories list thousands of trading middlemen, unverified workshops, and commission agents posing as direct factories. Sourcing Lab USA conducts on-site factory verification, verifies legal business registrations and machinery, tests physical samples, negotiates institutional terms, and maintains direct operational oversight throughout production.',
    },
    {
      question: 'Can you source custom OEM and ODM products?',
      answer:
        'Yes. We regularly manage custom tooling, mold fabrication, proprietary technical textiles, electronics housings, precision hardware, and bespoke retail packaging. All custom tooling and proprietary designs remain 100% your company property.',
    },
    {
      question: 'How are sourcing services structured and priced?',
      answer:
        'Depending on project scope and client requirements, engagements are structured as delivered product supply contracts (with transparent, all-inclusive product unit pricing) or dedicated procurement management agreements. All commercial terms and responsibilities are confirmed in writing before commitment.',
    },
    {
      question: 'What geographic regions do you cover?',
      answer:
        'Our primary manufacturing network spans China (Guangdong, Zhejiang, Jiangsu, Shandong, Fujian), Southeast Asia (Vietnam, Cambodia), and Europe, with centralized operations coordinating deliveries directly into North American distribution hubs.',
    },
  ],
  briefTitle: 'Submit your product sourcing brief.',
  briefIntro:
    'Share your product specifications, target volumes, and delivery timeline. Our procurement team will review feasibility and respond with concrete manufacturing options.',
  relatedPages: [
    {
      href: '/china-sourcing',
      title: 'China Sourcing Services',
      description: 'On-the-ground manufacturing coordination and supplier verification across industrial clusters.',
    },
    {
      href: '/factory-verification',
      title: 'Factory Verification & Audits',
      description: 'On-site factory inspections, license checks, and machinery verification before you wire funds.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control & Inspections',
      description: 'Pre-shipment inspections (PSI) and during-production audits using statistical sampling standards.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed Cost Analysis',
      description: 'Accurate modeling of duty, ocean freight, drayage, and tariff impact on product margins.',
    },
  ],
};

export default function ProductSourcingPage() {
  return <ServiceLandingPage page={page} />;
}
