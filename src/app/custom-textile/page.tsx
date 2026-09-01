import type { Metadata } from 'next';

import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customTextilePage } from '@/lib/service-pages';

export const metadata: Metadata = {
  title: 'Custom Textile Products for U.S. Brands',
  description:
    'Develop custom apparel, towels, tote bags, uniforms, and branded textile accessories from a usable product specification.',
  alternates: {
    canonical: '/custom-textile',
  },
  openGraph: {
    type: 'website',
    url: '/custom-textile',
    title: 'Custom Textile Products for U.S. Brands',
    description:
      'Custom apparel, towels, tote bags, uniforms, and branded textile accessories developed to your project brief.',
  },
};

export default function CustomTextilePage() {
  return <ServiceLandingPage page={customTextilePage} />;
}
