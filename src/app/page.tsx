import type { Metadata } from 'next';

import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Comparateur de devis fournisseurs',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <LandingPage />;
}
