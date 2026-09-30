import { LandingPageES } from '@/components/es/LandingPageES';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsES } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

const title = 'Sourcing Global y Entrada al Mercado de EE. UU.';
const description =
  'Ayudamos a empresas estadounidenses a buscar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos. Verificación directa de fábricas, control de calidad y representación comercial.';
const homeAnswerES =
  'Sourcing Lab USA es un socio operativo de comercio internacional y compras. Gestionamos el sourcing global de productos, auditorías de fábricas directas, negociación de precios y MOQ, control de calidad in situ y logística transfronteriza para marcas estadounidenses, al tiempo que ofrecemos consultoría de entrada al mercado de EE. UU., cumplimiento normativo y representación comercial para fabricantes internacionales.';

export const metadata = pageMetadata({
  title,
  description,
  path: '/es',
  locale: 'es-US',
  translatedHome: true,
});

export default function HomePageES() {
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema('/es', title, description, 'es-US', {
              abstract: homeAnswerES,
            }),
            serviceSchema(
              '/es',
              'Sourcing Global y Ejecución de Entrada al Mercado de EE. UU.',
              'Sourcing integral de productos en el extranjero, auditorías de fábrica, control de calidad y análisis de costes en destino para marcas estadounidenses, junto con consultoría de entrada al mercado y representación comercial para fabricantes internacionales.',
            ),
            faqSchema('/es', homeFaqsES, 'es-US'),
          ],
        }}
      />
      <LandingPageES />
    </>
  );
}
