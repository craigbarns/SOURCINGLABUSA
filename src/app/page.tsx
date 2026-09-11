import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import {
  pageMetadata,
  webpageSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

const title = 'China Sourcing & Product Supply';
const description =
  'China sourcing and product supply for U.S. brands: clothing, sportswear, packaging and labels. Share your specifications and quantities to request a quote.';
// Answer-first summary for the page schema. It restates what the hero already
// shows a reader — the description and the availability note — so the markup
// never carries a claim that is not visible on the page.
const homeAnswer =
  'Sourcing Lab USA sources, purchases and supplies clothing, textiles, sportswear, custom packaging and labels from China. Each project starts with your specifications, quantities and destination. Projects are open now, with invoicing from France or China and the contracting company identified in your quotation.';

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
