import type { Metadata } from 'next';

import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'AI Factory Quote Analyzer',
  description:
    'Turn supplier quotes into comparable costs, risk flags, landed-cost estimates, and ready-to-review RFQs.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SourcingLab USA',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'A sourcing workspace for comparing supplier quotes, modeling landed cost, researching HS codes, and drafting supplier responses.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free during the open beta.',
    },
    featureList: [
      'Supplier quote comparison',
      'Deterministic quote math checks',
      'Landed-cost modeling',
      'Product specification drafts',
      'Supplier email drafts',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPage />
    </>
  );
}
