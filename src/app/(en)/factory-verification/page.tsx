import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Factory Verification & Background Check China | Sourcing Lab USA',
  description:
    'Protect your investment with rigorous on-site factory verification, legal entity checks, machinery capacity audits, and anti-fraud screening across China and Asia.',
  path: '/factory-verification',
});

const page: ServicePageContent = {
  path: '/factory-verification',
  eyebrow: 'Supplier Due Diligence · On-Site Verification & Anti-Fraud',
  title: 'Factory Verification & Supplier Background Checks',
  directAnswer:
    'Factory verification is a multi-layered due diligence process to evaluate whether an overseas supplier has the legal standing, operational infrastructure, machinery, and capacity to manufacture your goods. A thorough verification combines corporate registration checks, business-scope analysis, document and certification reviews, machinery assessments, sample validation, and physical on-site audits when appropriate.',
  intro:
    'Wiring deposits to unverified overseas bank accounts carries severe financial and operational exposure. Fraudulent storefronts, phantom factories, and unvetted subcontractors are pervasive across online B2B directories. Sourcing Lab USA coordinates structured factory verification and corporate vetting to protect your company’s capital and brand reputation.',
  overviewTitle: 'Multi-layered investigative verification for international suppliers.',
  overview:
    'A supplier’s professional website or online badge does not guarantee manufacturing capability or legal solvency. Many overseas entities rent temporary office spaces or represent third-party factories. We apply a multi-layered verification framework: reviewing official corporate registrations, cross-referencing legal scope and litigation records, coordinating physical on-site audits when appropriate, and evaluating actual production machinery.',
  processTitle: 'The 4-stage factory verification framework.',
  offerName: 'Factory Verification & Due Diligence',
  offerDescription:
    'Independent legal background checks, physical factory audits, production machinery inspections, and anti-fraud verification for overseas suppliers.',
  focusAreas: [
    {
      title: 'Government Legal Registration & Business Scope Review',
      body: 'We review official business records directly from government corporate registries to verify registered capital, legal representatives, operational scope, and recorded legal disputes.',
    },
    {
      title: 'Physical Premises & Production Asset Audit',
      body: 'We coordinate on-site visits to verify whether the supplier operates the facility, inspect the active factory floor, and catalog primary machinery and tooling.',
    },
    {
      title: 'Bank Account & Beneficiary Authentication',
      body: 'We cross-check bank accounts against registered corporate entities to prevent payment diversion fraud, confirming that payment beneficiary details match verified corporate accounts.',
    },
    {
      title: 'Capacity, Workforce & Subcontractor Screening',
      body: 'We review workforce scale, examine shift logs, and inspect raw material inventories to help verify that production will not be secretly outsourced to unvetted subcontractors.',
    },
  ],
  briefItems: [
    'Supplier company name in both English and native language (Chinese / local characters)',
    'Supplier contact information, factory address, and website URL',
    'Intended product, order volume, and estimated purchase order value',
    'Proposed bank details or proforma invoices received from the supplier',
  ],
  workflow: [
    {
      title: 'Desk Audit & Corporate Records Search',
      body: 'Within 24-48 hours, we pull certified government corporate records, check tax status, operational licenses, unified social credit codes, and review any pending legal disputes.',
    },
    {
      title: 'Physical On-Site Facility Inspection',
      body: 'An experienced industrial auditor inspects the physical factory, photographing production lines, warehouses, raw material inventories, worker headcount, and safety conditions.',
    },
    {
      title: 'Technical Capacity & Machinery Evaluation',
      body: 'We verify the make, age, and operational status of key machinery, testing equipment, calibration records, and internal quality control stations.',
    },
    {
      title: 'Comprehensive Verification Report & Risk Rating',
      body: 'You receive a detailed report with geotagged photographs, document translations, legal findings, capacity benchmarks, and an explicit Go / No-Go risk assessment.',
    },
  ],
  benchmarks: [
    {
      label: 'Desk audit turnaround',
      value: '24 to 48 hours',
      qualifier: 'Official government corporate registry search, license check, and initial risk screening.',
    },
    {
      label: 'On-site factory audit',
      value: '3 to 5 business days',
      qualifier: 'Physical on-site inspection, photo documentation, and machine capacity verification.',
    },
    {
      label: 'Risk rating report',
      value: 'Delivered in 24 hours',
      qualifier: 'Delivered within 24 hours of on-site inspection completion with executive summary.',
    },
  ],
  benchmarksNote:
    'Turnaround times depend on factory location, willingness to cooperate with on-site inspection, and regional travel logistics.',
  hideShowcase: true,
  faqs: [
    {
      question: 'How do you verify a Chinese manufacturer?',
      answer:
        'We verify Chinese manufacturers through a multi-layered framework: (1) corporate registration and business-scope review, (2) ownership and capital verification, (3) certification and document checks, (4) on-site factory and machinery audits when appropriate, and (5) sample validation and production inspection.',
    },
    {
      question: 'What is the risk of not conducting factory verification?',
      answer:
        'Unverified buyers risk wiring money to fraudulent shell companies, falling victim to payment diversion fraud, working with insolvent workshops that shut down mid-production, or discovering that their order has been outsourced to a low-grade subcontractor with zero quality control.',
    },
    {
      question: 'Can a trading company pass itself off as a direct factory?',
      answer:
        'Yes, this is very common. Intermediaries routinely use photos from real manufacturers, print marketing collateral with factory addresses, and stage showroom tours. Our multi-layered framework reviews business license registered scope, tax classifications, equipment ownership, and physical manufacturing activity to differentiate genuine production facilities from trading intermediaries.',
    },
    {
      question: 'What documents should a legitimate Chinese factory be able to provide?',
      answer:
        'A legitimate factory must provide a Unified Social Credit Business License (营业执照), foreign trade export registration, bank account registration certificate, ISO certifications (if claimed), and recent utility or tax bills demonstrating active operations.',
    },
    {
      question: 'Can you verify suppliers outside of China?',
      answer:
        'Yes. While our primary audit coordination is centered across key manufacturing clusters in China, we can also coordinate supplier verifications across other Asian and international manufacturing markets through qualified audit partners.',
    },
  ],
  briefTitle: 'Request a factory verification audit.',
  briefIntro:
    'Enter the supplier’s name, website, and address. We will verify their credentials, check government corporate databases, and provide a full risk assessment.',
  relatedPages: [
    {
      href: '/supplier-audit-china',
      title: 'In-Depth Supplier Audits',
      description: 'Comprehensive quality management, manufacturing capacity, and social compliance audits.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control Inspections',
      description: 'Pre-shipment inspections and during-production quality control audits.',
    },
    {
      href: '/china-sourcing',
      title: 'China Sourcing Services',
      description: 'End-to-end direct factory procurement and supply management.',
    },
    {
      href: '/supplier-sourcing',
      title: 'Supplier Sourcing & Vetting',
      description: 'Strategic supplier identification, capacity screening, and negotiation.',
    },
  ],
};

export default function FactoryVerificationPage() {
  return <ServiceLandingPage page={page} />;
}
