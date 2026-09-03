import type { Metadata } from 'next';

import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Custom Packaging & Textile Procurement',
  description:
    'Custom packaging and textile products for U.S. brands, e-commerce businesses, and companies. U.S. market launch planned for Miami in 2027.',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-US': '/es',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://sourcinglabusa.com/#organization',
        name: 'SourcingLab USA',
        description:
          'Custom packaging and textile sourcing for U.S. brands, e-commerce businesses, and companies, with a U.S. market launch planned for Miami in 2027.',
        url: 'https://sourcinglabusa.com',
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: [
          'Custom packaging sourcing',
          'Custom textile sourcing',
          'Private label packaging development',
          'China-to-U.S. packaging and textile procurement',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contact@sourcinglabusa.com',
          contactType: 'customer support',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sourcinglabusa.com/#website',
        url: 'https://sourcinglabusa.com',
        name: 'SourcingLab USA',
        publisher: {
          '@id': 'https://sourcinglabusa.com/#organization',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://sourcinglabusa.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you only source packaging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Our initial focus is custom packaging and textile products for brands, e-commerce businesses, and companies.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where are you based?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sourcing Lab USA is preparing its U.S. market launch from Miami for 2027, supported by an established China sourcing partnership.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you work from an existing design or sample?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Send your brief, reference images, dimensions, quantity, and target timing. We will confirm what can be quoted and sampled.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who handles compliance and import requirements?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Requirements depend on the exact product and destination. Product specifications, certificates, shipping terms, and importer responsibilities are confirmed for each order before production and shipment.',
            },
          },
        ],
      },
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
