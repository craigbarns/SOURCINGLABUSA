import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Quality Inspection in China: Added When Written into the Quotation',
  description:
    'Third-party inspections (during production, before shipment) coordinated on a supply when written into the quotation, with their scope and acceptance criteria. Not a default on every order.',
  path: '/quality-control-china',
});

const page: ServicePageContent = {
  path: '/quality-control-china',
  eyebrow: 'Only if written into the quotation · Inspections',
  title: 'Quality inspection: added to a supply when you ask for it.',
  directAnswer:
    'A third-party quality inspection checks goods at the factory against the approved sample, the specification and agreed acceptance criteria. On a Sourcing Lab USA supply, an inspection is coordinated when it is written into the quotation, with its stage, scope and criteria. It is not assumed on every order, and the inspection firm, not Sourcing Lab USA, performs and signs it.',
  intro:
    'Production follow-up against the approved sample is part of every supply. A third-party inspection is an addition: worth it when the order value, the product or the buyer’s requirements justify an independent check before the final payment.',
  overviewTitle: 'When an inspection is worth adding.',
  overview:
    'A factory’s own quality team reports to the factory. A third-party inspector reports to the buyer and checks a random sample of the goods against criteria agreed in advance. Where the goods are supplied by Sourcing Lab USA itself, an inspection written into the quotation is a checkpoint on your behalf, carried out by the appointed firm, and is not presented as an independent audit of our own supply.',
  processTitle: 'How an inspection is added to a supply.',
  offerName: 'Quality inspection on request',
  offerDescription:
    'Third-party inspections during production or before shipment, coordinated on a supply when written into the quotation.',
  boundary: {
    coordinate: [
      'Inspections written into your quotation, at the stage agreed',
      'The checklist and acceptance criteria, agreed with you before the inspection',
      'Passing the inspection report to you and the factory',
    ],
    notDone: [
      'Inspections by default on every order',
      'Performing or signing inspections ourselves',
      'Certifying products or issuing compliance certificates',
      'Booking a standalone inspection outside a supply',
    ],
  },
  focusAreas: [
    {
      title: 'Before shipment (PSI)',
      body: 'Carried out when production is finished and most of it is packed. The inspector draws a random sample and checks appearance, dimensions, function and packaging against the agreed criteria.',
    },
    {
      title: 'During production (DUPRO)',
      body: 'Carried out early in the run, to catch a material, tooling or assembly problem while it can still be corrected.',
    },
    {
      title: 'Acceptance criteria',
      body: 'Sampling follows tables such as ISO 2859-1. The acceptable defect levels are set per product and per defect severity; a figure like AQL 2.5 is a common example, not a rule.',
    },
    {
      title: 'Lab tests',
      body: 'Where a product needs a test, such as a material or safety test, it is done by the laboratory you or the quotation names. Tests are added the same way as inspections: only when written into the quotation.',
    },
  ],
  briefItems: [
    'The product and the approved sample or specification',
    'Which stage you want checked: during production, before shipment, or both',
    'The defects that matter most to you: critical, major, minor',
    'Any lab test your market or buyer requires',
  ],
  workflow: [
    {
      title: 'Written into the quotation',
      body: 'The quotation states the inspection stage, its scope and who performs it.',
    },
    {
      title: 'Checklist agreed',
      body: 'The checklist and acceptance criteria are agreed with you before the inspection, against the approved sample.',
    },
    {
      title: 'Inspection',
      body: 'The appointed inspection firm checks a random sample at the factory and issues its report.',
    },
    {
      title: 'Report and next step',
      body: 'You receive the report. Where the quotation ties the final balance to the report, the balance follows the result.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Is an inspection included on every order?',
      answer:
        'No. Production is followed against the approved sample on every supply. A third-party inspection is added when it is written into the quotation, with its stage, scope and criteria.',
    },
    {
      question: 'What is AQL 2.5, and is it used for every product?',
      answer:
        'AQL (Acceptance Quality Limit) 2.5 is a commonly cited level for major defects in consumer goods, but it is not universal. Inspection levels and acceptable defect levels are set per product, defect severity and risk.',
    },
    {
      question: 'When is the best time to inspect?',
      answer:
        'Early in production to catch a systemic problem while it can still be corrected, and before shipment to check the finished, packed goods. Many orders need only the second; complex or high-value orders may justify both.',
    },
    {
      question: 'What happens if an inspection fails?',
      answer:
        'The report says what failed and why. Rework, replacement and re-inspection follow the terms written into your quotation and contract.',
    },
    {
      question: 'Why not rely on the factory’s own quality team?',
      answer:
        'Because it reports to the factory, which wants to ship on time. A third-party inspector reports to the buyer and checks against criteria agreed in advance.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Tell us the product and whether you want an inspection written into the quotation. We confirm what can be quoted and sampled.',
  relatedPages: [
    {
      href: '/factory-verification',
      title: 'Factory checks',
      description: 'How a manufacturer is checked before an order, and what an audit adds.',
    },
    {
      href: '/china-sourcing-agent',
      title: 'Agent or supplier?',
      description: 'Who carries the order, and where your recourse sits.',
    },
    {
      href: '/blog/quality-control-checklist',
      title: 'Quality control checklist',
      description: 'A worksheet for the checks to agree before production.',
    },
  ],
};

export default function QualityControlChinaPage() {
  return <ServiceLandingPage page={page} />;
}
