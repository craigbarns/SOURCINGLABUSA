import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customTextilePage } from '@/lib/service-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Clothing & Textile Sourcing from China',
  description:
    'Clothing, sportswear, technical garments and uniforms sourced from China to your specifications. Send your brief and request a project-specific quotation.',
  path: '/custom-textile',
});

export default function CustomTextilePage() {
  return <ServiceLandingPage page={customTextilePage} />;
}
