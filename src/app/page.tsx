import type { Metadata } from 'next';

import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Sourcing Lab USA | Custom Packaging & Textile',
  description:
    'Custom packaging and textile products for U.S. brands, e-commerce businesses, and companies. U.S. market launch planned for Miami in 2027.',
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
    '@type': 'ProfessionalService',
    name: 'SourcingLab USA',
    description:
      'Custom packaging and textile sourcing for U.S. brands, e-commerce businesses, and companies, with a U.S. market launch planned for Miami in 2027.',
    areaServed: 'United States',
    serviceType: ['Custom packaging sourcing', 'Custom textile sourcing'],
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
