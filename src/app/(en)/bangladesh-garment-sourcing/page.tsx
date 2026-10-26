import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { bangladeshGarmentPage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Bangladesh Garment Sourcing',
  description:
    'Clothing produced in Bangladesh through our established partner, to your specification. Brief, samples, production follow-up and contracted supply for U.S. brands.',
  path: '/bangladesh-garment-sourcing',
});

export default function BangladeshGarmentPage() {
  return <ServiceLandingPage page={bangladeshGarmentPage} />;
}
