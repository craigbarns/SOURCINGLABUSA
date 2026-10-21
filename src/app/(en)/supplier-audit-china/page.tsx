import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Supplier Audit China & Manufacturing Audits | Sourcing Lab USA',
  description:
    'Comprehensive on-site supplier audits in China. In-depth technical audits, quality management system (QMS) evaluation, capacity analysis, and social compliance.',
  path: '/supplier-audit-china',
});

const page: ServicePageContent = {
  path: '/supplier-audit-china',
  eyebrow: 'Manufacturing Due Diligence · On-Site Supplier Audits',
  title: 'Supplier Audits in China: Quality & Technical Evaluation',
  directAnswer:
    'A supplier audit examines selected factory systems and records against an agreed checklist. It may cover manufacturing capability, quality controls, traceability and corrective actions. Sourcing Lab USA can coordinate the scope and an appointed provider where available; the provider’s qualifications, framework, access, report and limits must be confirmed before the visit.',
  intro:
    'A supplier’s claims need evidence relevant to your product and order. Define which production processes and records matter, then confirm factory access and an appropriately appointed provider. Sourcing Lab USA coordinates the review accepted for the project, with any independent specialist scope agreed separately.',
  overviewTitle: 'An audit scope tied to your manufacturing risks.',
  overview:
    'Review how the factory handles incoming materials, work instructions, in-process checks, finished-goods release, equipment records and nonconforming products. The appointed provider should explain what can be examined and which records are unavailable. A sourcing review is not an accredited certification audit.',
  processTitle: 'The comprehensive on-site audit methodology.',
  offerName: 'China Supplier Technical & Quality Audits',
  offerDescription:
    'On-site technical evaluation of manufacturing infrastructure, quality control systems, machine capacity, labor conditions, and production traceability across China.',
  focusAreas: [
    {
      title: 'Quality Management System (QMS) Inspection',
      body: 'We audit the implementation of quality management protocols, checking whether inspection logs, non-conformance reports, and corrective action procedures are actively enforced on the production line.',
    },
    {
      title: 'Machinery, Tooling & Maintenance Protocols',
      body: 'We review machine operating records, tooling maintenance logs, preventive maintenance schedules, and calibration certificates for critical measuring and testing instruments.',
    },
    {
      title: 'Incoming Material & Traceability Controls',
      body: 'The agreed checklist can examine storage, material identification, quarantine and batch traceability. Findings describe the evidence reviewed and cannot guarantee that unsuitable material never enters production.',
    },
    {
      title: 'Social Compliance & Environmental Standards',
      body: 'Where these risks are in scope, identify a suitably qualified specialist and the required framework. A general sourcing visit does not establish social-compliance certification or conformance with a named audit scheme.',
    },
  ],
  briefItems: [
    'Target factory name, location, and management contact details',
    'Product category, technical drawings, and key critical-to-quality (CTQ) specifications',
    'Specific audit focus (Technical QMS, Manufacturing Capacity, or Social Compliance)',
    'Anticipated production volume and target audit completion date',
  ],
  workflow: [
    {
      title: 'Pre-Audit Scope & Questionnaire Definition',
      body: 'We customize the audit checklist according to your product’s specific failure modes, regulatory standards, and commercial volume requirements.',
    },
    {
      title: 'On-Site Opening Meeting & Facility Walkthrough',
      body: 'The appointed provider reviews the agreed documents and accessible facility areas with factory management. Credentials, access permissions and the scope of observation are confirmed beforehand.',
    },
    {
      title: 'Deep-Dive Process & Record Examination',
      body: 'We pull production batch records, interview floor operators, test calibration on live equipment, and verify non-conforming product isolation areas.',
    },
    {
      title: 'Closing Debrief & Immediate Findings',
      body: 'We conduct a formal debrief with factory principals, documenting critical, major, and minor non-conformities and agreeing on corrective action plans.',
    },
    {
      title: 'Comprehensive Written Audit Report',
      body: 'The agreed report records scope, evidence, findings, missing information and recommended follow-up. Format, permitted photography, grading method and delivery timing depend on the engagement.',
    },
  ],
  benchmarks: [
    {
      label: 'Audit execution',
      value: 'Provider confirmed',
      qualifier: 'Scheduling depends on location, scope, factory access and provider availability.',
    },
    {
      label: 'On-site audit duration',
      value: 'Scope-specific',
      qualifier: 'Dependent on factory footprint, number of production lines, and audit scope.',
    },
    {
      label: 'Report delivery',
      value: 'Agreed in proposal',
      qualifier: 'Report format, findings and corrective-action follow-up are defined before the audit.',
    },
  ],
  benchmarksNote:
    'Sourcing Lab USA does not claim accredited audit credentials. Independent specialist work and any corrective-action monitoring are scoped separately.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between a factory verification and a supplier audit?',
      answer:
        'Verification begins with supplier identity and evidence of its role and facilities. An audit examines selected processes and records in more depth. Both have access and evidence limits; neither proves that fraud or future production problems are impossible.',
    },
    {
      question: 'What are the main types of supplier audits you conduct in China?',
      answer:
        'A project can request review of manufacturing processes, quality controls or capacity. Specialist labor, environmental or certification work requires an appropriately appointed provider and an explicitly agreed framework. Availability is confirmed before acceptance.',
    },
    {
      question: 'What happens if a factory fails the audit?',
      answer:
        'The audit report clearly categorizes findings into critical, major, and minor non-conformities. For minor or major issues, we establish a Corrective and Preventive Action (CAPA) timeline. For critical failures (such as falsified testing or dangerous working conditions), we advise against placing orders.',
    },
    {
      question: 'Do Chinese factories cooperate with independent audits?',
      answer:
        'Access depends on the supplier, confidentiality requirements and the requested scope. Ask for the reason for any restriction and record what could not be checked. Refusal is a factor to investigate, not proof of misconduct by itself.',
    },
    {
      question: 'Which industrial regions in China do you audit?',
      answer:
        'Provide the factory address, product and requested framework. Coverage, travel requirements and specialist availability are confirmed for the location rather than assumed nationwide.',
    },
  ],
  briefTitle: 'Schedule a supplier audit in China.',
  briefIntro:
    'Provide the factory name, location, and your target product requirements. We will coordinate auditor scheduling and deliver a comprehensive facility report.',
  relatedPages: [
    {
      href: '/factory-verification',
      title: 'Factory Verification Services',
      description: 'Preliminary background checks and legal registration verification.',
    },
    {
      href: '/quality-control-china',
      title: 'Quality Control & Inspections',
      description: 'Pre-shipment inspections (PSI) and during-production quality monitoring.',
    },
    {
      href: '/china-sourcing',
      title: 'China Sourcing Services',
      description: 'Full-service product sourcing, contract negotiation, and production management.',
    },
    {
      href: '/supplier-sourcing',
      title: 'Supplier Sourcing & Vetting',
      description: 'Strategic supplier identification, capacity screening, and negotiation.',
    },
  ],
};

export default function SupplierAuditChinaPage() {
  return <ServiceLandingPage page={page} />;
}
