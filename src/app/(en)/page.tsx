import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

const title = 'Global Sourcing & U.S. Market Entry | Sourcing Lab USA';
const description =
  'Overseas sourcing and manufacturing coordination for U.S. businesses. U.S. market-entry preparation and sales representation for international manufacturers.';
const homeAnswer =
  'Sourcing Lab USA supports overseas sourcing and manufacturing coordination for U.S. businesses, and U.S. market-entry preparation and commercial representation for international manufacturers. Clothing, textiles and packaging are the deepest specialties; other products are assessed for feasibility. Current projects are contracted through France or China, with an independent sourcing partnership in China and appointed specialists where required. Miami expansion is planned for 2027.';

export const metadata = pageMetadata({
  title: 'Global Sourcing & U.S. Market Entry',
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
            serviceSchema(
              '/',
              'Global Sourcing & U.S. Market Entry Execution',
              'Overseas sourcing and manufacturing coordination for U.S. business buyers, plus U.S. market research, entry preparation and commercial representation for international manufacturers. Current engagements contracted through France or China.',
            ),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
