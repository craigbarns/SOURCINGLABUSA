import { ServiceLandingPage, type ServicePageContent } from '@/components/ServiceLandingPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'China Sourcing Agent vs Supplier for U.S. Companies',
  description:
    'Sourcing agent, trading company or supplier: what each one does, who carries the risk, and how Sourcing Lab USA works. Projects open now — request a quotation.',
  path: '/china-sourcing-agent',
});

const page: ServicePageContent = {
  path: '/china-sourcing-agent',
  eyebrow: 'China sourcing · how the arrangement works',
  overviewTitle: 'Three arrangements, three very different positions.',
  processTitle: 'From your brief to a supplied order.',
  title:
    'Sourcing agent, trading company or supplier: what you are actually hiring.',
  directAnswer:
    'A China sourcing agent finds suppliers on your behalf and is usually paid a commission, while you buy from the factory and carry the order. A trading company buys and resells, and a supplier does the same under its own commercial terms. Sourcing Lab USA buys and supplies the products: the company named in your quotation contracts with you and invoices the goods.',
  intro:
    'U.S. companies searching for a China sourcing agent are usually trying to solve one problem: getting a product made properly without managing suppliers themselves. The arrangements on offer differ in who contracts with the factory, who carries the order, and who is accountable if the goods are wrong.',
  overview:
    'The distinction matters before anything is ordered. Under an agency arrangement you contract with the factory directly and the agent is paid for the introduction and coordination. Where a company buys and resells, it contracts with the supplier and then sells the goods to you, so your commercial relationship and your recourse sit with that company. Sourcing Lab USA works the second way. Clothing, textiles and packaging are the core specialties; other products are reviewed for feasibility before anything is quoted.',
  offerName: 'China Sourcing and Product Supply',
  offerDescription:
    'Sourcing, purchase and supply of clothing, textiles, sportswear, packaging and labels from China for U.S. business customers, from written brief through sampling to a delivered order.',
  focusAreas: [
    {
      title: 'Who contracts with the factory',
      body: 'Under an agency arrangement you do, and the agent coordinates. Where a company buys and resells, it holds that contract and supplies you. Sourcing Lab USA buys and supplies, so your agreement is with the company identified in your quotation.',
    },
    {
      title: 'How the work is paid for',
      body: 'An agent is typically paid a commission on order value or a retainer. A supply arrangement is priced as a product price for the goods supplied. Ask which applies before comparing two proposals, because the numbers are not equivalent.',
    },
    {
      title: 'Where accountability sits',
      body: 'If goods arrive wrong, recourse follows the contract. With an agency arrangement it generally sits between you and the factory. Where the goods are bought and resold to you, it sits with the company that supplied them.',
    },
    {
      title: 'What is agreed before production',
      body: 'Specification, sample approval, quantities, quality checkpoints, shipping terms and import responsibilities are confirmed per order. None of these should be assumed from a product description or a reference sample alone.',
    },
  ],
  briefItems: [
    'The product, with references, drawings or an existing sample',
    'Quantity, or the range you are considering',
    'Materials, finish, branding and any requirement that must be met',
    'Destination and the timing you are working towards',
  ],
  workflow: [
    {
      title: 'Send the product brief',
      body: 'Describe the product, quantity, references and destination. We identify what is missing and confirm whether it can be quoted and sampled through our independent China sourcing partnership.',
    },
    {
      title: 'Review options and samples',
      body: 'Supplier options, a quotation basis, sample scope and production timing are put to you for review. Nothing is ordered at this stage and no minimum quantity or deadline is assumed.',
    },
    {
      title: 'Agree and supply the order',
      body: 'The company in France or China identified in your quotation purchases and supplies the products. Specification, pricing, samples, quality checkpoints and delivery responsibilities are agreed for that order.',
    },
  ],
  faqs: [
    {
      question: 'What does a China sourcing agent do?',
      answer:
        'A sourcing agent looks for suppliers on your behalf, requests quotations, coordinates samples and follows production. In a typical agency arrangement you contract with and pay the factory directly, and the agent is paid a commission or a fee for that coordination.',
    },
    {
      question: 'What is the difference between a sourcing agent and a trading company?',
      answer:
        'An agent acts on your behalf and is paid for the service, while you buy from the factory. A trading company buys the goods and resells them to you, so it holds the supplier contract and you buy from it. The practical difference is who carries the order and where your recourse sits if something is wrong.',
    },
    {
      question: 'Is Sourcing Lab USA a sourcing agent?',
      answer:
        'No. Sourcing Lab USA sources, purchases and supplies the products. The company identified in your quotation contracts with you and invoices the goods, rather than introducing you to a factory for a commission.',
    },
    {
      question: 'How much does sourcing from China cost?',
      answer:
        'Where goods are bought and supplied, you are quoted a product price for the specification and quantity agreed, rather than a separate commission. What drives that price is the product itself: material, construction, finish, decoration, quantity, packaging and shipping terms. Ask for the basis of any quotation before comparing two of them.',
    },
    {
      question: 'Do you handle customs clearance and freight forwarding?',
      answer:
        'No. Shipping terms and import responsibilities are confirmed in the commercial terms for each order, and we identify which requirements need to be settled before production. Customs brokerage and freight forwarding are handled by the specialists appointed for that purpose.',
    },
    {
      question: 'Can I start a project now?',
      answer:
        'Yes. Projects and invoicing are available now through France or China, with the contracting company identified in your quotation. You do not need to wait for the planned U.S. expansion in Miami in 2027. Submitting a brief does not place an order.',
    },
  ],
  briefTitle: 'Tell us what you need sourced.',
  briefIntro:
    'Send the product, quantity, references, destination and timing. We confirm what can be quoted and sampled, and reply by email. No order is placed by submitting this form.',
  relatedPages: [
    {
      href: '/china-to-us-procurement',
      title: 'China-to-U.S. procurement',
      description: 'How a product moves from a brief to a delivered order.',
    },
    {
      href: '/custom-textile',
      title: 'Clothing and textile sourcing',
      description: 'The deepest specialty: fabrics, construction and branding.',
    },
    {
      href: '/custom-packaging',
      title: 'Packaging, boxes and labels',
      description: 'Materials, print finishes and retail packaging to specification.',
    },
    {
      href: '/blog/china-sourcing-rfq-checklist',
      title: 'Prepare your sourcing brief',
      description: 'A practical checklist for the information a quotation needs.',
    },
  ],
};

export default function ChinaSourcingAgentPage() {
  return <ServiceLandingPage page={page} />;
}
