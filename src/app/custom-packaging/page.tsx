import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customPackagingPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Custom Packaging Sourcing from China',
  description:
    'Custom boxes, bags, tissue and branded packaging sourced to your brief for U.S. businesses. Miami launch planned for 2027.',
  path: '/custom-packaging',
});

export default function CustomPackagingPage() {
  return <ServiceLandingPage page={customPackagingPage} />;
}
