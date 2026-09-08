import { LandingPageES } from '@/components/es/LandingPageES';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsES } from '@/lib/home-faqs';
import { pageMetadata, webpageSchema, faqSchema } from '@/lib/seo';

const title = 'Sourcing en China y Suministro de Productos';
const description =
  'Sourcing en China de prendas, ropa deportiva y técnica, empaques y etiquetas. Proyectos disponibles ahora, con facturación desde Francia o China.';
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
