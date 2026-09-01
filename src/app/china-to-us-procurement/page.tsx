import type { Metadata } from 'next';

import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { chinaToUsProcurementPage } from '@/lib/service-pages';

export const metadata: Metadata = {
  title: 'China-to-U.S. Packaging & Textile Procurement',
  description:
    'Custom packaging and textile procurement for U.S. destinations, with product scope and commercial responsibilities confirmed order by order.',
  alternates: {
    canonical: '/china-to-us-procurement',
  },
  openGraph: {
    type: 'website',
    url: '/china-to-us-procurement',
    title: 'China-to-U.S. Packaging & Textile Procurement',
    description:
      'Custom packaging and textile procurement for a U.S. destination through an established China sourcing partnership.',
  },
};

export default function ChinaToUsProcurementPage() {
  return <ServiceLandingPage page={chinaToUsProcurementPage} />;
}
