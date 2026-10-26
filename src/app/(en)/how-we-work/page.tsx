import { InformationPage } from '@/components/InformationPage';
import { GuideMarkdown } from '@/components/GuideMarkdown';
import { pageMetadata } from '@/lib/seo';

const path = '/how-we-work';
const title = 'China Sourcing: How We Work';
const description = 'Your brief, supplier options and samples are reviewed before pricing and production checkpoints are agreed. Here is how an order runs, step by step.';
export const metadata = pageMetadata({ path, title, description });

export default function HowWeWorkPage() {
  return <InformationPage path={path} title={title} description={description} scope image={{ src: '/images/pages/how-we-work.webp', alt: 'Illustrative photo: a sourcing project desk with a factory quotation comparison sheet, fabric swatches and project notes', width: 1200, height: 938 }}><GuideMarkdown>{`
## What do we supply, and who is it for?

Sourcing Lab USA is a custom packaging and textile procurement partner for U.S. brands and business customers. We source, purchase and supply products through an established independent China sourcing partnership. Clothing, textiles, sportswear, packaging and labels are core specialties. Other products are reviewed for feasibility before a proposal is made.

Projects can start now. The quotation identifies the company in France or China that contracts with you and invoices the goods. Read [about the business](/about) and [the difference between an agent and a product supply arrangement](/china-sourcing-agent).

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

Submitting a brief requests a discussion; it does not place an order. [Prepare your RFQ](/blog/china-sourcing-rfq-checklist) or [send the details you have](/contact-us#contact).

## How should approvals be documented?

Use a product reference and revision throughout the brief, quotation, sample comments and order. Identify which sample features are approved and which require correction. Keep changes to materials, quantities or artwork visible, with the responsible person and date. This gives the buyer and supplying company a common reference for the order.

Our [supplier evidence matrix](/blog/verify-chinese-supplier) and [quality checkpoint worksheet](/blog/quality-control-checklist) are planning resources you can adapt. They are not certificates or evidence that a particular supplier has been audited.

## What does quality coordination mean?

Quality follow-up means following production against the approved sample and the checkpoints agreed for the order. A third-party inspection or a laboratory test is added only when it is written into the quotation, with its provider, scope and cost.

A sample approval, a production photograph and a test report answer different questions. Define what each item is intended to establish before relying on it. Product compliance cannot be guaranteed by a generic sourcing checklist.

## Who handles transport and import responsibilities?

Goods may ship directly from China under the agreed commercial terms. Sourcing Lab USA is not a freight forwarder, a customs broker or an importer. Transport, insurance and U.S. entry are named in your quotation, or stay on your side.

Compare the [landed-cost inputs](/blog/calculating-landed-costs-merchandise) and [China-to-U.S. procurement scope](/china-to-us-procurement) before assuming that an amount includes delivery or import charges.

## What is useful in the first conversation?

Send product references, estimated quantity, intended market, budget basis if available, and the date you are working toward. Tell us if you already have a supplier or sample and which decisions are still open. You can start with a short brief and provide more detail after the scope is discussed.

[Discuss your sourcing project](/contact-us#contact). Method explained September 14, 2026; specific order terms control the work agreed for your project.
`}</GuideMarkdown></InformationPage>;
}
