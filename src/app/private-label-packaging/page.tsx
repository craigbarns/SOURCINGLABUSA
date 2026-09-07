import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { privateLabelPackagingPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Private Label Packaging from China',
  description:
    'Branded boxes, bags, labels and inserts for private label products. China sourcing and product supply; Miami launch planned for 2027.',
  path: '/private-label-packaging',
});

export default function PrivateLabelPackagingPage() {
  return <ServiceLandingPage page={privateLabelPackagingPage} />;
}
