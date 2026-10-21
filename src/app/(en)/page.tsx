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
  'China sourcing, manufacturing coordination and product supply for U.S. businesses. Clothing, textiles and packaging specialists; other products reviewed for feasibility.';
const homeAnswer =
  'Sourcing Lab USA helps U.S. business buyers source and manufacture products overseas, principally in China through an established independent partnership. Clothing, textiles and packaging are the deepest specialties; other products are reviewed for feasibility. We coordinate the product brief, supplier discussions, sample approvals and agreed production follow-up. Product pricing, the contracting company and delivery responsibilities are confirmed in the quotation.';

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
              'China Sourcing, Manufacturing Coordination and Product Supply',
              'Overseas sourcing and product supply for U.S. business buyers, principally from China. Clothing, textiles and packaging are core specialties; other products are reviewed for feasibility. Specifications, samples, pricing and delivery responsibilities are agreed per order.',
            ),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
