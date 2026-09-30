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
  'We help U.S. companies source and manufacture overseas — and help international manufacturers enter, distribute, and grow in the United States. Direct factory verification, quality control, and commercial representation.';
const homeAnswer =
  'Sourcing Lab USA is an operational international trade and procurement firm. We manage global product sourcing, direct factory audits, price and MOQ negotiations, on-site quality control, and cross-border logistics for American brands, while providing U.S. market-entry consulting, regulatory compliance, and commercial sales representation for international manufacturers.';

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
              'End-to-end overseas product sourcing, factory audits, quality control, and landed cost analysis for U.S. brands, plus U.S. market-entry consulting and sales representation for international manufacturers.',
            ),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
