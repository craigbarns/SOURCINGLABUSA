import { InformationPage } from '@/components/InformationPage';
import { GuideMarkdown } from '@/components/GuideMarkdown';
import { pageMetadata } from '@/lib/seo';

// Netlify serves public/contact.html at /contact through Pretty URLs.
// Preserve that existing form endpoint and keep this page on a distinct URL.
const path = '/contact-us';
const title = 'Discuss Your China Sourcing Project';
const description = 'Send Sourcing Lab USA your product, quantity and requirements for a China sourcing and supply discussion. Packaging and textiles are core specialties; other products are assessed for feasibility.';
export const metadata = pageMetadata({ path, title, description });

export default function ContactPage() {
  return <InformationPage path={path} title={title} description={description} contact><GuideMarkdown>{`
## What should you send first?

Start with the product and estimated quantity. Reference images, a drawing, a tech pack or a packaging dieline can follow by email. If you know your purchasing budget, intended market, customization needs and target timing, include them. Tell us whether you already have a supplier or sample. Unresolved details can be clarified during the discussion.

The form only requires your name, email and product category. Additional project details are optional. For a more developed brief, use the [product sourcing template](/resources/product-sourcing-brief).

## What happens next?

We review the request and reply by email to clarify the scope and what can be quoted or sampled. If the project fits, the next discussion covers specifications, supplier options, pricing and sampling. Submitting the form does not place an order or commit you to a purchase.

Current projects are contracted and invoiced through France or China, with the company identified in your quotation. Miami expansion is planned for 2027. Learn [about Sourcing Lab USA](/about) and [how the supply process works](/how-we-work).

## Prefer email?

Write to [contact@sourcinglabusa.com](mailto:contact@sourcinglabusa.com). Include your company, product and approximate quantity so the conversation can begin with a concrete brief. Please avoid sending sensitive identity or banking documents with an initial inquiry.

See [how we handle project details](/privacy).
`}</GuideMarkdown></InformationPage>;
}
