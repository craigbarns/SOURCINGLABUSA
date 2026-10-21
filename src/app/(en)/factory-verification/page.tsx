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
    'Before paying a supplier, establish who the contracting party is, what production role it has and which beneficiary details have been confirmed. Sourcing Lab USA coordinates the available document and capability checks agreed for the project, recording unresolved questions so the buyer can make an informed decision.',
  overviewTitle: 'Multi-layered investigative verification for international suppliers.',
  overview:
    'A supplier’s professional website or online badge does not guarantee manufacturing capability or legal solvency. Many overseas entities rent temporary office spaces or represent third-party factories. We apply a multi-layered verification framework: reviewing official corporate registrations, cross-referencing legal scope and litigation records, coordinating physical on-site audits when appropriate, and evaluating actual production machinery.',
  processTitle: 'The 4-stage factory verification framework.',
  offerName: 'Factory Verification & Due Diligence',
  offerDescription:
    'Supplier identity and document research, capability questions and coordination of an appointed site-review provider where agreed and available.',
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
      body: 'Compare beneficiary details with the supplier documents and confirm changes through an independently established contact channel. Documentary checks can flag discrepancies; they do not guarantee account ownership or prevent all payment fraud.',
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
      body: 'We pull official government corporate records, check tax status, operational licenses, unified social credit codes, and review any pending legal disputes. Desk-audit turnaround is confirmed when the engagement is scoped.',
    },
    {
      title: 'Physical On-Site Facility Inspection',
      body: 'Where agreed and available, an appointed provider visits the accessible facility areas and records relevant observations. The provider, qualifications, access, permitted photos and scope are confirmed before the visit.',
    },
    {
      title: 'Technical Capacity & Machinery Evaluation',
      body: 'We verify the make, age, and operational status of key machinery, testing equipment, calibration records, and internal quality control stations.',
    },
    {
      title: 'Comprehensive Verification Report & Risk Rating',
      body: 'The agreed summary records documents and observations reviewed, discrepancies, missing information and next questions. It does not constitute a legal opinion, certify solvency or guarantee the outcome of a future order.',
    },
  ],
  benchmarks: [
    {
      label: 'Desk audit turnaround',
      value: 'Scope-specific',
      qualifier: 'Official government corporate registry search, license check, and initial risk screening.',
    },
    {
      label: 'On-site factory audit',
      value: 'Access confirmed',
      qualifier: 'Physical on-site inspection, photo documentation, and machine capacity verification.',
    },
    {
      label: 'Risk rating report',
      value: 'Timing agreed',
      qualifier: 'Photo-documented report with an executive summary, delivered on the timeline agreed for the engagement.',
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
        'A supplier’s presentation may not establish whether it manufactures, trades or subcontracts. Request its legal name, business documents, facility details and explanation of the production arrangement, then identify what evidence can be independently checked.',
    },
    {
      question: 'What documents should a legitimate Chinese factory be able to provide?',
      answer:
        'Start with the legal business name, registration information, facility address, product capability information and any certifications the supplier claims. The relevant evidence depends on the jurisdiction and project; no single checklist proves legitimacy or makes every listed document mandatory.',
    },
    {
      question: 'Can you verify suppliers outside of China?',
      answer:
        'China is the established sourcing starting point. For another location, share the supplier address and requested checks so feasibility and any independent provider can be confirmed before a service is offered.',
    },
  ],
  briefTitle: 'Request a factory verification audit.',
  briefIntro:
    'Enter the supplier’s name, website, and address. We will confirm the available checks, evidence limits and project-specific scope.',
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
