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
  'Sourcing y coordinación de fabricación internacional para empresas estadounidenses. Preparación y representación comercial para fabricantes que buscan clientes en EE. UU.';
const homeAnswerES =
  'Sourcing Lab USA apoya a empresas estadounidenses en compras y fabricación internacional y a fabricantes extranjeros en preparación comercial para EE. UU. Prendas, textiles y packaging son las especialidades más desarrolladas. Los proyectos actuales se contratan desde Francia o China, con una colaboración independiente en China y especialistas designados cuando corresponde. La expansión en Miami está prevista para 2027.';

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
              'Sourcing y coordinación de fabricación para empresas estadounidenses, junto con preparación de entrada al mercado y representación comercial para fabricantes internacionales.',
            ),
            faqSchema('/es', homeFaqsES, 'es-US'),
          ],
        }}
      />
      <LandingPageES />
    </>
  );
}
