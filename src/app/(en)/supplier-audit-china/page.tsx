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
    'A supplier audit in China is an in-depth on-site technical evaluation of a manufacturing facility’s quality management systems, operational capacity, machinery maintenance, and workforce standards. Conducted by certified industrial auditors before major purchase orders are signed, a supplier audit verifies whether a factory has the processes, equipment, and management discipline required to produce consistent goods to Western engineering tolerances.',
  intro:
    'Relying on self-reported factory credentials or generic ISO certificates creates operational vulnerability. Sourcing Lab USA coordinates structured on-site technical and quality audits across China’s primary industrial centers, inspecting everything from incoming raw material testing to final packaging protocols.',
  overviewTitle: 'Technical manufacturing audits based on international standards.',
  overview:
    'Supplier audits evaluate the critical intersection between engineering capability and shop-floor discipline. We coordinate evaluations of incoming raw material inspection (IQC), in-process quality control (IPQC), final quality assurance (FQA), equipment calibration schedules, and internal defect remediation processes based on ISO 9001 and industry-specific frameworks.',
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
      body: 'We inspect warehouse storage conditions, raw material quarantine zones, component batch tracking, and traceability systems to ensure substandard materials never enter production.',
    },
    {
      title: 'Social Compliance & Environmental Standards',
      body: 'We audit workplace safety, emergency egress, working hour documentation, child/forced labor prohibitions, and environmental waste management (aligned with BSCI and SMETA benchmarks).',
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
      body: 'Qualified industrial auditors review documentation with factory management, followed by a comprehensive walk of incoming material bays, production floors, and testing labs.',
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
      body: 'Within 24 hours of audit completion, you receive an itemized 30+ page report with photographic evidence, grading metrics, and actionable recommendations.',
    },
  ],
  benchmarks: [
    {
      label: 'Audit execution',
      value: '3 to 5 business days notice',
      qualifier: 'Auditor scheduling coordinated across major Chinese manufacturing provinces.',
    },
    {
      label: 'On-site audit duration',
      value: '1 to 2 full days',
      qualifier: 'Dependent on factory footprint, number of production lines, and audit scope.',
    },
    {
      label: 'Report delivery',
      value: 'Within 24 hours',
      qualifier: 'Full audit report with high-resolution photos and CAPA recommendations delivered next business day.',
    },
  ],
  benchmarksNote:
    'Audits follow ISO 9001 quality framework guidelines. Detailed corrective action plans (CAPA) can be monitored on request.',
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between a factory verification and a supplier audit?',
      answer:
        'A factory verification is a preliminary due diligence check that confirms a supplier legally exists, owns machinery, and is not a fraud. A supplier audit is a technical evaluation that assesses whether the factory has the quality systems, maintenance schedules, process controls, and capacity to manufacture your specific product reliably.',
    },
    {
      question: 'What are the main types of supplier audits you conduct in China?',
      answer:
        'We conduct Manufacturing & Quality Audits (evaluating QMS and technical capability), Capacity Audits (evaluating monthly output and bottleneck constraints), and Social Compliance Audits (evaluating labor standards, safety, and working conditions).',
    },
    {
      question: 'What happens if a factory fails the audit?',
      answer:
        'The audit report clearly categorizes findings into critical, major, and minor non-conformities. For minor or major issues, we establish a Corrective and Preventive Action (CAPA) timeline. For critical failures (such as falsified testing or dangerous working conditions), we advise against placing orders.',
    },
    {
      question: 'Do Chinese factories cooperate with independent audits?',
      answer:
        'Legitimate direct manufacturers that are proud of their facilities and seek serious international clients welcome professional audits. Resistance or refusal to allow an audit is one of the strongest red flags that a supplier is hiding subcontractor relationships or substandard conditions.',
    },
    {
      question: 'Which industrial regions in China do you audit?',
      answer:
        'We coordinate on-site audits across all major Chinese manufacturing provinces: Guangdong (Shenzhen, Dongguan, Guangzhou, Foshan), Zhejiang (Ningbo, Hangzhou, Yiwu, Wenzhou), Jiangsu (Suzhou, Wuxi, Changzhou), Shandong (Qingdao, Weihai), Fujian (Xiamen, Quanzhou), and surrounding hubs.',
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
