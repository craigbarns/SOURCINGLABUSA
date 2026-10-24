import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';
import { HOME_DESCRIPTION, PROMISE_STATEMENT } from '@/lib/positioning';

const title = 'Custom Packaging & Textiles Sourced in China | Sourcing Lab USA';
const description = HOME_DESCRIPTION.en;
const homeAnswer = PROMISE_STATEMENT.en;

export const metadata = pageMetadata({
  title: 'Custom Packaging & Textiles Sourced in China',
  description,
  path: '/',
  locale: 'en-US',
  translatedHome: true,
});

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema('/', title, description, 'en-US', {
              abstract: homeAnswer,
            }),
            serviceSchema('/', 'Custom packaging and textile supply', PROMISE_STATEMENT.en),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
