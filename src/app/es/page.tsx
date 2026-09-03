import type { Metadata } from 'next';
import { LandingPageES } from '@/components/es/LandingPageES';

export const metadata: Metadata = {
  title: 'Empaques y Textiles Personalizados',
  description:
    'Sourcing de empaques y productos textiles para marcas de EE.UU. Lanzamiento previsto en Miami para 2027.',
  alternates: {
    canonical: '/es',
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

export default function HomePageES() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://sourcinglabusa.com/es#organization',
        name: 'SourcingLab USA',
        description: 'Sourcing de empaques y textiles personalizados para marcas y empresas de comercio electrónico en Estados Unidos. Lanzamiento en Miami para 2027.',
        url: 'https://sourcinglabusa.com/es',
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: ['Sourcing de Empaques', 'Sourcing de Textiles'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contact@sourcinglabusa.com',
          contactType: 'customer support',
          availableLanguage: ['English', 'Spanish'],
        },
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPageES />
    </>
  );
}
