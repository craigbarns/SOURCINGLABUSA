import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customPackagingPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Custom Packaging Sourcing from China',
  description:
    'Packaging sourcing from China for U.S. brands: rigid boxes, folding cartons, mailers, bags, labels and inserts made to your brief. Request a quote.',
  path: '/custom-packaging',
});

export default function CustomPackagingPage() {
  return <ServiceLandingPage page={customPackagingPage} />;
}
