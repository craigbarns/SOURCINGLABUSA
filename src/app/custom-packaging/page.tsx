import type { Metadata } from 'next';

import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { customPackagingPage } from '@/lib/service-pages';

export const metadata: Metadata = {
  title: 'Custom Packaging for U.S. Brands',
  description:
    'Develop custom boxes, paper bags, labels, tissue paper, inserts, and retail packaging from a clear brand and product brief.',
  alternates: {
    canonical: '/custom-packaging',
  },
  openGraph: {
    type: 'website',
    url: '/custom-packaging',
    title: 'Custom Packaging for U.S. Brands',
    description:
      'Custom boxes, paper bags, labels, tissue paper, inserts, and retail packaging developed to your brief.',
  },
};

export default function CustomPackagingPage() {
  return <ServiceLandingPage page={customPackagingPage} />;
}
