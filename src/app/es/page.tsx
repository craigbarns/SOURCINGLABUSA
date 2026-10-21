import { LandingPageES } from '@/components/es/LandingPageES';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsES } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

const title = 'Sourcing en China y Suministro de Productos';
const description =
  'Sourcing en China, coordinación de fabricación y suministro para empresas de EE. UU. Especialistas en prendas, textiles y packaging; otros productos según viabilidad.';
const homeAnswerES =
  'Sourcing Lab USA ayuda a compradores empresariales de Estados Unidos a buscar y fabricar productos en el extranjero, principalmente en China mediante una colaboración independiente. Prendas, textiles y packaging son las especialidades más desarrolladas; otros productos se evalúan según viabilidad. Coordinamos el brief, las consultas a proveedores, la aprobación de muestras y el seguimiento de producción acordado. El presupuesto confirma precios, empresa contratante y responsabilidades de entrega.';

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
              'Sourcing en China, Coordinación de Fabricación y Suministro',
              'Sourcing y suministro de productos para compradores empresariales de Estados Unidos, principalmente desde China. Prendas, textiles y packaging son las especialidades principales; otros productos se evalúan según viabilidad. Especificaciones, muestras, precios y responsabilidades de entrega se acuerdan por pedido.',
            ),
            faqSchema('/es', homeFaqsES, 'es-US'),
          ],
        }}
      />
      <LandingPageES />
    </>
  );
}
