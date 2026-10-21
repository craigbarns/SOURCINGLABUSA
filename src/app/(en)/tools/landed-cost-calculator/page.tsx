import Link from 'next/link';
import { InformationPage } from '@/components/InformationPage';
import { ImportCostPlanner } from '@/components/tools/ImportCostPlanner';
import { pageMetadata } from '@/lib/seo';

const title = 'Landed Cost Calculator for U.S. Import Planning';
const description = 'Estimate shipment and per-unit landed cost using your own product price, freight, customs value, duty rates and fees. Free calculator with visible assumptions.';
export const metadata = pageMetadata({ title, description, path: '/tools/landed-cost-calculator' });

export default function LandedCostCalculatorPage() {
  return <InformationPage path="/tools/landed-cost-calculator" title={title} description={description}>
    <p>Landed cost combines the purchase price with transport, insurance, duties and the other costs needed to receive an order. Compare supplier quotations on the same delivery basis and include charges absent from an EXW or FOB quotation.</p>
    <ImportCostPlanner />
    <h2>Where to verify the inputs</h2>
    <p>This tool does not look up tariffs or determine a classification. Check the exact product, origin, valuation and date with your customs broker. Use the <a href="https://hts.usitc.gov/">USITC Harmonized Tariff Schedule</a>, <a href="https://www.cbp.gov/trade/basic-import-export">CBP import guidance</a> and <a href="https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions">USTR Section 301 tariff actions</a> as starting points. Official reference links checked 21 October 2026; applicable rates must be verified for your entry.</p>
    <h2>Before relying on the estimate</h2>
    <p>Ask who is responsible for import, brokerage and destination charges. Confirm whether the quote includes tooling, samples, taxes, testing, storage and returns. Different duty bases and product-specific charges may require a separate calculation.</p>
    <p>For support reviewing assumptions, see <Link href="/landed-cost-analysis">landed cost analysis</Link>. To prepare comparable supplier offers, use the <Link href="/resources/product-sourcing-brief">sourcing brief template</Link>.</p>
  </InformationPage>;
}
