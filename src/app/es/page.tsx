import { LandingPageES } from '@/components/es/LandingPageES';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsES } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';
import { HOME_DESCRIPTION, PROMISE_STATEMENT } from '@/lib/positioning';

const title = 'Packaging y textiles a medida fabricados en China';
const description = HOME_DESCRIPTION.es;
const homeAnswerES = PROMISE_STATEMENT.es;

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
            serviceSchema('/es', 'Suministro de packaging y textiles a medida', PROMISE_STATEMENT.es),
            faqSchema('/es', homeFaqsES, 'es-US'),
          ],
        }}
      />
      <LandingPageES />
    </>
  );
}
