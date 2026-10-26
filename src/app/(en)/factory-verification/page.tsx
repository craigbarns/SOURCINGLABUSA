import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'China Factory Checks & Verification',
  description:
    'How a manufacturer is checked before it is proposed: registration, business scope, trade references and evidence, before any quotation is made.',
  path: '/factory-verification',
});

const page: ServicePageContent = {
  path: '/factory-verification',
  eyebrow: 'Factory search · Audits only if written into the quotation',
  title: 'Factory checks: part of the search, before any factory is proposed.',
  directAnswer:
    'Before a manufacturer is proposed for a Sourcing Lab USA supply, it is checked as part of the factory search: its registration and business scope, whether it makes the product itself, and the samples it produces. An on-site audit by an appointed auditor is added only when written into the quotation. You contract with and pay the company named in your quotation, not a factory account you have never checked.',
  intro:
    'The usual fear with an overseas supplier is paying a deposit to the wrong party: a trading company posing as a factory, a workshop that subcontracts, or an account that does not belong to the supplier. On a supply, that risk sits with us: we choose the factory, and the contract and invoice come from the company named in the quotation.',
  overviewTitle: 'What is checked, and by whom.',
  overview:
    'The checks during the factory search are done with our partnership in Shanghai, from official records, the factory’s own documents and its samples. They answer one question: can this manufacturer make your product, at your quantity, to the approved sample? A physical audit of the premises, capacity or working conditions is a separate step, carried out by an appointed audit firm when the quotation includes it.',
  processTitle: 'How a manufacturer gets onto your shortlist.',
  offerName: 'Factory checks within the factory search',
  offerDescription:
    'Checks on the manufacturers proposed for a supply, with on-site audits by an appointed auditor when written into the quotation.',
  boundary: {
    coordinate: [
      'Registration and business-scope checks on the factories we propose',
      'Confirming the factory makes the product, through its documents and samples',
      'An on-site audit by an appointed auditor, when written into the quotation',
    ],
    notDone: [
      'Standalone verification reports on suppliers you contract directly',
      'Audits performed or signed by Sourcing Lab USA itself',
      'Certifying a factory or its compliance',
      'Legal opinions on a supplier',
    ],
  },
  focusAreas: [
    {
      title: 'Registration and business scope',
      body: 'The business license, the registered business scope and the legal representative are checked against official records, so the company proposed is the company that makes the product.',
    },
    {
      title: 'Factory or trading company',
      body: 'Trading companies are common and not always a problem, but you should know which one you are dealing with. The search confirms who actually makes the product.',
    },
    {
      title: 'Samples as evidence',
      body: 'A factory is judged on the samples it produces for your specification, not on its catalog photos. The approved sample becomes the reference for production.',
    },
    {
      title: 'On-site audit, when needed',
      body: 'For a large order, a new product category or a buyer who requires it, an audit of the premises, capacity or working conditions can be written into the quotation and carried out by an appointed audit firm.',
    },
  ],
  briefItems: [
    'The product and its specification',
    'Quantity and target date',
    'Any requirement your buyers place on factories, such as a social audit',
    'Whether you want an on-site audit written into the quotation',
  ],
  workflow: [
    {
      title: 'Search',
      body: 'Manufacturers that make your type of product are identified with our partnership in Shanghai.',
    },
    {
      title: 'Checks',
      body: 'Registration, business scope and the product actually made are checked before a factory is proposed.',
    },
    {
      title: 'Samples',
      body: 'Shortlisted factories produce samples against your specification; the one you approve becomes the reference.',
    },
    {
      title: 'Audit, if in the quotation',
      body: 'Where the quotation includes it, an appointed audit firm visits the factory and issues its report before the order.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'Do I pay the factory directly?',
      answer:
        'No. On a supply, you contract with and pay the company named in your quotation, in France or China. The factory is paid on our side.',
    },
    {
      question: 'Is an on-site audit included?',
      answer:
        'No, not by default. Checks on registration, business scope, the product made and the samples are part of the factory search. An on-site audit is added when written into the quotation, and carried out by an appointed audit firm.',
    },
    {
      question: 'Can a trading company pass itself off as a factory?',
      answer:
        'Yes, it is common. The business scope, the documents and the samples usually show who actually makes the product, and that is checked before a factory is proposed.',
    },
    {
      question: 'What documents should a Chinese factory be able to show?',
      answer:
        'At least its business license (营业执照) with a registered scope that covers the product, and any certificate it claims, which can be checked with the body that issued it.',
    },
    {
      question: 'Can you check a supplier I found myself?',
      answer:
        'Not as a standalone report. If you want that supplier considered for a supply, it goes through the same checks as any factory we propose.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Tell us the product, the quantity and any requirement your buyers place on factories. We confirm what can be quoted and sampled.',
  relatedPages: [
    {
      href: '/quality-control-china',
      title: 'Inspections',
      description: 'Third-party inspections, added when written into the quotation.',
    },
    {
      href: '/china-sourcing-agent',
      title: 'Agent or supplier?',
      description: 'Who carries the order, and where your recourse sits.',
    },
    {
      href: '/how-we-work',
      title: 'How we work',
      description: 'From the brief to the approved sample and the order.',
    },
  ],
};

export default function FactoryVerificationPage() {
  return <ServiceLandingPage page={page} />;
}
