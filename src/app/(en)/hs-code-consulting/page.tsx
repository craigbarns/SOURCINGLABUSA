import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'HS Code Classification Research',
  description:
    'A working HTS classification for your product, added to the quotation on request: proposed code, duty rate and the reasoning, for your broker to confirm.',
  path: '/hs-code-consulting',
});

const page: ServicePageContent = {
  path: '/hs-code-consulting',
  eyebrow: 'Only if written into the quotation · HS classification',
  title: 'HS code classification: working research for your broker.',
  directAnswer:
    'The HS code classifies a product for customs; the United States uses a 10-digit HTSUS code, which decides the duty rate. On a Sourcing Lab USA supply, a working classification can be written into the quotation: a proposed code with its reasoning and the published rulings consulted, so your customs broker can confirm it. It is working research, not a ruling or a legal determination: the importer of record stays responsible, and only CBP issues binding rulings.',
  intro:
    'Classification is easiest to get right before production, while materials and construction can still be described precisely. A supplier’s export code is a starting point at best: Chinese and U.S. codes often differ beyond the first six digits.',
  overviewTitle: 'A proposed code, with its reasoning.',
  overview:
    'The working classification starts from the product as specified: materials, construction, function and use. It applies the General Rules of Interpretation, checks published CBP rulings on similar goods, and records why one heading was chosen over another. Your customs broker uses it to confirm the code filed on the entry.',
  processTitle: 'How a working classification is prepared.',
  offerName: 'Working HS classification on request',
  offerDescription:
    'A proposed HTSUS code with its reasoning for a supplied product, added to the quotation on request, for confirmation by the importer’s customs broker.',
  boundary: {
    coordinate: [
      'A proposed HTSUS code with its reasoning and the rulings consulted',
      'The product description and material data your broker will need',
      'Flagging when a binding ruling may be worth requesting',
    ],
    notDone: [
      'Binding rulings, ruling requests or filings with CBP',
      'Customs entries or acting as customs broker',
      'Legal advice, or defence in a customs inquiry',
      'Guaranteeing a duty rate',
    ],
  },
  focusAreas: [
    {
      title: 'HS and HTSUS',
      body: 'The first six digits are the international Harmonized System. The U.S. adds digits for its own tariff lines and statistics, for 10 digits in all.',
    },
    {
      title: 'The supplier’s code',
      body: 'Chinese export codes and U.S. import codes often differ at the national level. The importer of record must use reasonable care in classifying, whatever code the supplier gives.',
    },
    {
      title: 'Published rulings',
      body: 'CBP publishes its classification rulings. Rulings on similar goods are the best evidence of how a heading is applied, and they are cited in the reasoning.',
    },
    {
      title: 'Binding rulings',
      body: 'For a product that is new, complex or high-volume, the importer or its broker can ask CBP for a binding ruling before importing. We say when it may be worth it; the request is theirs.',
    },
  ],
  briefItems: [
    'Product description, materials and their share by weight or value',
    'Photos, drawings or the approved sample',
    'How the product is used, and whether it is sold as a set',
    'Your customs broker’s contact, if you have one',
  ],
  workflow: [
    {
      title: 'Written into the quotation',
      body: 'The quotation states that a working classification is included.',
    },
    {
      title: 'Product facts',
      body: 'Materials, construction, function and use are recorded from the specification and the sample.',
    },
    {
      title: 'Reasoning',
      body: 'The headings are compared under the General Rules of Interpretation and checked against published rulings.',
    },
    {
      title: 'To your broker',
      body: 'You receive the proposed code with its reasoning; your customs broker confirms the code filed on the entry.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'What is the difference between an HS code and an HTS code?',
      answer:
        'The HS code is the international six-digit classification of the World Customs Organization. The U.S. Harmonized Tariff Schedule (HTSUS) extends it to 10 digits: eight for the tariff line and two for statistics.',
    },
    {
      question: 'Can I use the code my Chinese supplier gives me?',
      answer:
        'As a starting point only. Chinese export codes often differ from U.S. import codes beyond six digits, and the importer of record is responsible for the code it declares.',
    },
    {
      question: 'Is your classification a ruling?',
      answer:
        'No. It is working research to help your customs broker. Only CBP issues binding rulings, and the importer of record remains responsible for the classification declared.',
    },
    {
      question: 'What is a binding ruling?',
      answer:
        'A written decision by CBP on how a specific product is classified, requested by the importer or its representative before importing. It applies to the product described in the request.',
    },
    {
      question: 'Is there a free tool?',
      answer:
        'Yes, a preliminary research helper: describe your product to get classification questions and a starting point for research. It does not determine a code, a duty rate or an import requirement.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Product, materials and photos. Ask for a working classification to be written into the quotation.',
  relatedPages: [
    {
      href: '/tools/hs-code-finder',
      title: 'HS code research helper',
      description: 'Classification questions and a starting point for research.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost model',
      description: 'Where the duty line sits in the full unit cost.',
    },
    {
      href: '/import-from-china',
      title: 'Who imports, and what that involves',
      description: 'Importer of record, customs broker and forwarder, explained.',
    },
  ],
};

export default function HsCodeConsultingPage() {
  return <ServiceLandingPage page={page} />;
}
