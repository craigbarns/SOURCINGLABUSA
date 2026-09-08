import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customPackagingPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Custom Packaging Sourcing from China',
  description:
    'Custom boxes, bags, labels and branded packaging sourced in China to your brief. Share dimensions, quantity and artwork to request a sourcing quote.',
  path: '/custom-packaging',
});

export default function CustomPackagingPage() {
  return <ServiceLandingPage page={customPackagingPage} />;
}
