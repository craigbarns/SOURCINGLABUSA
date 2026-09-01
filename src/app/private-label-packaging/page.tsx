import type { Metadata } from 'next';

import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { privateLabelPackagingPage } from '@/lib/service-pages';

export const metadata: Metadata = {
  title: 'Private Label Packaging Development',
  description:
    'Develop private label packaging with branded boxes, bags, labels, inserts, and presentation details documented in one product brief.',
  alternates: {
    canonical: '/private-label-packaging',
  },
  openGraph: {
    type: 'website',
    url: '/private-label-packaging',
    title: 'Private Label Packaging Development',
    description:
      'Custom packaging development for private label products, from branded structure to labels and presentation details.',
  },
};

export default function PrivateLabelPackagingPage() {
  return <ServiceLandingPage page={privateLabelPackagingPage} />;
}
