import { InformationPage } from '@/components/InformationPage';
import { GuideMarkdown } from '@/components/GuideMarkdown';
import { pageMetadata } from '@/lib/seo';

const path = '/editorial-policy';
const title = 'Editorial Policy: Sources, Examples and Corrections';
const description = 'Our sourcing resources distinguish business information, original planning tools, hypothetical examples and external rules. They help readers prepare decisions; they do not certify suppliers, products or import arrangements.';
export const metadata = pageMetadata({ path, title, description });

export default function EditorialPolicyPage() {
  return <InformationPage path={path} title={title} description={description}><GuideMarkdown>{`
## Who publishes these resources?

Sourcing Lab USA publishes educational material about sourcing and product procurement. The [About page](/about) identifies the business and its founder. Articles show their attribution and publication date. A named author is used where the article is attributed to that person; organization-attributed planning resources do not imply personal review or endorsement by the founder.

AI-assisted drafting is used for some planning resources. Authorship is not a claim that every paragraph comes from firsthand fieldwork. A planning guide, a hypothetical example and a report of an actual project must be clearly distinguished.

## How are facts and examples presented?

Business descriptions follow the stated offer: clothing, textiles and packaging are core specialties, with other products assessed for feasibility. Current projects are contracted and invoiced through the company in France or China identified in the quotation. The Miami expansion is planned for 2027.

Original worksheets and frameworks are identified as editorial tools. They do not claim industry recognition, supplier certification or a validated predictive score. Numerical examples are labeled hypothetical and show their assumptions. They are not customer results, quoted prices, market averages or guaranteed savings.

Previously published indicative quantity and timing figures are planning references, qualified by product and order conditions. The quotation confirms the figures for an actual order.

## Which external sources are used?

For U.S. import and product questions, resources link to relevant primary authorities such as CBP, USITC, FTC, CPSC and EPA where applicable. Event arrangements are referred to the event organizer; Incoterms guidance is referred to the International Chamber of Commerce.

Source links are placed near the statements they support. A date of source checking describes the editorial check, not a promise that rules remain unchanged. Readers should recheck the authority and obtain the appropriate product, legal or customs advice for a real decision. An official link is not an endorsement of Sourcing Lab USA by that organization.

## What counts as firsthand evidence?

A field report should identify when and where the activity occurred, what was observed, which details came from another party and what the observation cannot establish. Photographs need accurate captions and permission where required. Supplier identities, client details and project results require documented support and permission before publication.

Concept imagery and hypothetical examples must not be presented as client work. A Canton Fair preparation guide does not imply attendance. A supplier worksheet does not imply that a supplier has been visited or approved.

## How can readers request a correction?

Email [contact@sourcinglabusa.com](mailto:contact@sourcinglabusa.com) with the page URL, statement concerned and supporting source if available. Substantive content changes should update the visible modification date. Original publication dates remain part of the article record.

The website's educational resources do not replace an agreed quotation, purchase contract, independent inspection or professional determination. [Read our sourcing method](/how-we-work) or [browse the resource center](/resources).

Policy introduced September 14, 2026.
`}</GuideMarkdown></InformationPage>;
}
