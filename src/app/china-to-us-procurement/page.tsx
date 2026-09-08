import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { chinaToUsProcurementPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'China-to-U.S. Product Sourcing & Supply',
  description:
    'China sourcing and product supply for U.S. businesses. Clothing, packaging and other products on request. Projects and invoicing available from France or China.',
  path: '/china-to-us-procurement',
});

export default function ChinaToUsProcurementPage() {
  return <ServiceLandingPage page={chinaToUsProcurementPage} />;
}
