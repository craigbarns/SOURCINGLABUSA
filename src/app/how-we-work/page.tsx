import { InformationPage } from '@/components/InformationPage';
import { GuideMarkdown } from '@/components/GuideMarkdown';
import { pageMetadata } from '@/lib/seo';

const path = '/how-we-work';
const title = 'How Our China Sourcing and Product Supply Process Works';
const description = 'Sourcing Lab USA starts with your brief, reviews supplier options and samples, and agrees product pricing, production checkpoints and order responsibilities before purchasing and supplying the goods.';
export const metadata = pageMetadata({ path, title, description });

export default function HowWeWorkPage() {
  return <InformationPage path={path} title={title} description={description}><GuideMarkdown>{`
## What do we supply, and who is it for?

Sourcing Lab USA is a custom packaging and textile procurement partner for U.S. brands and business customers. We source, purchase and supply products through an established independent China sourcing partnership. Clothing, textiles, sportswear, packaging and labels are core specialties. Other products are reviewed for feasibility before a proposal is made.

Projects can start now. The quotation identifies the company in France or China that contracts with you and invoices the goods. The Miami expansion is planned for 2027. Read [about the business](/about) and [the difference between an agent and a product supply arrangement](/china-sourcing-agent).

## What happens between a brief and an order?

The process below explains the decisions described in our supply offer. Exact deliverables, checks, timing and responsibilities are agreed for each project.

| Stage | What is reviewed | What needs your decision |
| --- | --- | --- |
| Product brief | Intended use, specifications, quantity, destination and timing | Confirm the requirement and identify unresolved details |
| Feasibility and supplier options | Whether the brief can be proposed through the China partnership | Review proposed options and differences |
| Quotation and samples | Product price, sample scope, materials, construction and branding | Confirm the quoted basis and sample approvals |
| Order agreement | Contracting company, specification, quantities, payment and responsibilities | Approve the written order terms |
| Production follow-up | Agreed checkpoints and changes affecting the order | Resolve issues and approve changes where required |
| Delivery arrangements | Packing, shipping terms and import responsibilities | Confirm the agreed handoff and receiving arrangements |

Submitting a brief requests a discussion; it does not place an order. [Prepare your RFQ](/blog/china-sourcing-rfq-checklist) or [send the details you have](/contact#contact).

## How should approvals be documented?

Use a product reference and revision throughout the brief, quotation, sample comments and order. Identify which sample features are approved and which require correction. Keep changes to materials, quantities or artwork visible, with the responsible person and date. This gives the buyer and supplying company a common reference for the order.

Our [supplier evidence matrix](/blog/verify-chinese-supplier) and [quality checkpoint worksheet](/blog/quality-control-checklist) are planning resources you can adapt. They are not certificates or evidence that a particular supplier has been audited.

## What does quality coordination mean?

Quality follow-up means production coordination and the checkpoints agreed for the order. It is not an independent certified inspection service. If independent inspection, laboratory testing or technical review is needed, the provider, scope and costs must be identified separately in the project arrangements.

A sample approval, a production photograph and a test report answer different questions. Define what each item is intended to establish before relying on it. Product compliance cannot be guaranteed by a generic sourcing checklist.

## Who handles transport and import responsibilities?

Delivery may be direct from China under the agreed commercial terms. The quotation and order must identify the responsibilities for transport, import review and delivery. Sourcing Lab USA does not offer standalone customs brokerage or freight forwarding. Specialist work belongs with the appropriate appointed providers.

Compare the [landed-cost inputs](/blog/calculating-landed-costs-merchandise) and [China-to-U.S. procurement scope](/china-to-us-procurement) before assuming that an amount includes delivery or import charges.

## What is useful in the first conversation?

Send product references, estimated quantity, intended market, budget basis if available, and the date you are working toward. Tell us if you already have a supplier or sample and which decisions are still open. You can start with a short brief and provide more detail after the scope is discussed.

[Discuss your sourcing project](/contact#contact). Method explained September 14, 2026; specific order terms control the work agreed for your project.
`}</GuideMarkdown></InformationPage>;
}
