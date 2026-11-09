import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'China Sourcing Timeline: Brief to Supply',
  description:
    'The stages of a sourcing order — brief, factory options, samples, production and delivery — what sets the length of each stage, and what can move the date.',
  path: '/sourcing-timeline',
});

const page: ServicePageContent = {
  path: '/sourcing-timeline',
  eyebrow: 'Product supply · Timeline',
  title: 'How long sourcing takes, and what sets the date.',
  directAnswer:
    'A sourcing order runs in five stages: the brief, factory options and pricing, sampling and approval, production, and delivery. Sampling and production set most of the calendar. Production typically runs about 45 to 60 days after sample sign-off, confirmed in your quotation; each stage above has its own length, driven by decisions you control — the completeness of the brief, the speed of sample approvals and the quantity ordered.',
  intro:
    'Timelines are hard to promise because the stages depend on approvals, not just on factory schedules. The stages below say what each one involves and what moves it.',
  overviewTitle: 'Five stages, five things that set their length.',
  overview:
    'The quotation states the schedule that applies to your order. The stages below explain what happens in each and which decisions move the date: a complete brief shortens the factory search, fast sample decisions shorten approval, and quantity, product complexity and the delivery term set production and transport.',
  processTitle: 'What happens at each stage.',
  offerName: 'Written order with a stated schedule',
  offerDescription:
    'A supply order with the stages, approvals and schedule written into the quotation: brief, factory options, prices, samples, production follow-up and delivery terms.',
  boundary: {
    coordinate: [
      'A stage-by-stage schedule written into the quotation',
      'Production follow-up through the agreed checkpoints',
      'Coordination of transport with the parties named in the quotation',
    ],
    notDone: [
      'Guaranteeing a delivery date that depends on approvals you control',
      'Freight forwarding or customs clearance',
      'Storage in the United States',
    ],
  },
  focusAreas: [
    {
      title: 'Brief and quotation',
      body: 'A complete brief — product, dimensions, material, print or finish, quantity, destination — lets pricing start immediately. Missing specifications are the most common delay at this stage.',
    },
    {
      title: 'Factory options and pricing',
      body: 'Options are collected from factories that make the product type. The length depends on how specialized the specification is and how many options you want to compare.',
    },
    {
      title: 'Sampling and approval',
      body: 'A sample takes days to weeks to make and ship, and it is you who signs it off. Each revision cycle adds its own making and shipping time, so complete comments in one pass keep the stage short.',
    },
    {
      title: 'Production',
      body: 'Production typically runs about 45 to 60 days after sample sign-off for the product types supplied here, confirmed in your quotation. Quantity, tooling and number of product variants set the length within that range.',
    },
    {
      title: 'Delivery',
      body: 'Ocean transport is booked under the commercial term agreed in the quotation. Sourcing Lab USA is not a freight forwarder: transport, insurance and U.S. entry are named in your quotation, or stay on your side.',
    },
  ],
  briefItems: [
    'The product, dimensions, material and finish',
    'Quantity and the date the stock is needed',
    'Destination in the United States',
    'Current supplier or sample status',
  ],
  workflow: [
    {
      title: 'Brief and quotation',
      body: 'You send the brief; the quotation states the stages, approvals and schedule.',
    },
    {
      title: 'Options, prices, samples',
      body: 'Factory options are priced, a sample is produced and you approve it — or comment and repeat once.',
    },
    {
      title: 'Production and follow-up',
      body: 'Production runs under the agreed checkpoints, with follow-up through the order.',
    },
    {
      title: 'Delivery under the agreed terms',
      body: 'Goods ship under the commercial term in the quotation, to the delivery point agreed.',
    },
  ],
  benchmarks: [],
  hideShowcase: true,
  faqs: [
    {
      question: 'How long does production take after the sample is approved?',
      answer:
        'Production typically runs about 45 to 60 days after sample sign-off for the product types supplied here, confirmed in your quotation. Quantity, tooling and the number of variants set the length within that range.',
    },
    {
      question: 'What is the fastest way to shorten the timeline?',
      answer:
        'A complete brief, and full written comments when the sample arrives. Every additional sample cycle adds making and shipping time, which is often longer than the production of the approved sample.',
    },
    {
      question: 'Do you promise a delivery date?',
      answer:
        'The quotation states the schedule and the checkpoints. A delivery date also depends on transport and approvals that belong to the parties named in the quotation.',
    },
    {
      question: 'Can goods ship directly to the United States?',
      answer:
        'Yes, under the commercial term agreed in the quotation. Transport, insurance and U.S. entry are named in your quotation, or stay on your side — Sourcing Lab USA is not a freight forwarder or an importer.',
    },
    {
      question: 'What if my product needs new tooling?',
      answer:
        'Tooling is quoted and owned as agreed in the quotation — see the sample and tooling guide for what to confirm before ordering. Tooling adds time to the sampling stage.',
    },
  ],
  briefTitle: 'Send your product brief.',
  briefIntro:
    'Product, quantity and the date the stock is needed. The quotation states the stages and the schedule that apply.',
  relatedPages: [
    {
      href: '/how-we-work',
      title: 'How we work',
      description: 'The brief, factory search, quotation, samples, production follow-up and hand-off.',
    },
    {
      href: '/landed-cost-analysis',
      title: 'Landed-cost analysis',
      description: 'The cost side of the same decisions, estimated before the order.',
    },
    {
      href: '/product-development',
      title: 'Product development',
      description: 'Specifications and samples before production.',
    },
  ],
};

export default function SourcingTimelinePage() {
  return <ServiceLandingPage page={page} />;
}
