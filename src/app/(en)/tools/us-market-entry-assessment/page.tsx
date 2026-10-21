import Link from 'next/link';
import { InformationPage } from '@/components/InformationPage';
import { MarketReadinessAssessment } from '@/components/tools/MarketReadinessAssessment';
import { pageMetadata } from '@/lib/seo';

const title = 'U.S. Market Entry Readiness Assessment for Manufacturers';
const description = 'Identify gaps in customer targeting, pricing, product evidence, samples and commercial preparation before approaching U.S. buyers. Free eight-question self-assessment.';
export const metadata = pageMetadata({ title, description, path: '/tools/us-market-entry-assessment' });

export default function ReadinessPage() {
  return <InformationPage path="/tools/us-market-entry-assessment" title={title} description={description} contactHref="/us-market-entry#contact">
    <p>A manufacturer preparing to sell in the United States needs a defined buyer, credible product evidence, workable channel economics and clear order responsibilities. This checklist helps structure that preparation before committing to a distributor search or representation engagement.</p>
    <MarketReadinessAssessment />
    <h2>Use the score as a working checklist</h2>
    <p>Self-reported answers are not independently verified. The score is an editorial checklist with equal weights, not an externally validated market model. Review each gap individually; an unresolved product requirement can stop a launch even when other areas are well prepared.</p>
    <p>Start with <Link href="/us-market-entry">U.S. market entry planning</Link>, or compare the responsibilities in a <Link href="/us-sales-representation">sales representation engagement</Link>. Bring the downloaded worksheet to your first discussion.</p>
  </InformationPage>;
}
