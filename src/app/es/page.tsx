import { LandingPageES } from '@/components/es/LandingPageES';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsES } from '@/lib/home-faqs';
import { pageMetadata, webpageSchema, faqSchema } from '@/lib/seo';

const title = 'Sourcing en China y Suministro de Productos';
const description =
  'Prendas, empaques y otros productos desde China para empresas de EE. UU. Compra y suministro. Lanzamiento previsto en Miami para 2027.';
export const metadata = pageMetadata({
  title,
  description,
  path: '/es',
  locale: 'es-US',
  translatedHome: true,
});

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema('/es', title, description, 'es-US'),
            faqSchema('/es', homeFaqsES, 'es-US'),
          ],
        }}
      />
      <LandingPageES />
    </>
  );
}
