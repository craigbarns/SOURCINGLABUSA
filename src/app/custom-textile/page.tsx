import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customTextilePage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Clothing & Textile Sourcing from China',
  description:
    'Custom clothing, uniforms, tote bags and textiles sourced from China to your specifications. U.S. product supply launch planned for Miami in 2027.',
  path: '/custom-textile',
});

export default function CustomTextilePage() {
  return <ServiceLandingPage page={customTextilePage} />;
}
