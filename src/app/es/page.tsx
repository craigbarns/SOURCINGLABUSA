import type { Metadata } from 'next';
import { LandingPageES } from '@/components/es/LandingPageES';

export const metadata: Metadata = {
  title: 'Empaques y Textiles Personalizados',
  description:
    'Sourcing de empaques y productos textiles para marcas de EE.UU. Lanzamiento previsto en Miami para 2027.',
  alternates: {
    canonical: '/es',
  },
  robots: {
    // Keep this version available to visitors while the Spanish editorial review is completed.
    // The English site is the current primary U.S. search experience.
    index: false,
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
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de Sourcing',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Sourcing de Empaques Personalizados',
                description: 'Cajas personalizadas, bolsas de papel, etiquetas, papel de seda e insertos desarrollados según su diseño.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Sourcing de Textiles',
                description: 'Indumentaria, toallas, bolsas de tela, uniformes y accesorios corporativos.'
              }
            }
          ]
        },
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
