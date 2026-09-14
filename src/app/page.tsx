import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

const title = 'China Sourcing for U.S. Brands';
const description =
  'Custom packaging and textile procurement for U.S. brands. Source products from China with a clear brief, sample approvals and agreed supply terms.';
// Answer-first summary for the page schema. It restates what the hero already
// shows a reader — the description and the availability note — so the markup
// never carries a claim that is not visible on the page.
const homeAnswer =
  'Sourcing Lab USA is a custom packaging and textile procurement partner for U.S. brands. We source, purchase and supply products from China, starting with your specifications, quantities and destination. Projects open now. Invoicing from France or China, with the company identified in your quotation.';

export const metadata = pageMetadata({
  title,
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
              'China Sourcing & Product Supply',
              'Sourcing and supply of clothing, textiles, sportswear, packaging and labels from China for U.S. business customers, from written brief through sampling to delivered order.',
            ),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
