import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import { pageMetadata, webpageSchema, faqSchema } from '@/lib/seo';

const title = 'China Sourcing & Product Supply';
const description =
  'China sourcing and product supply for U.S. brands: clothing, sportswear, packaging and labels. Share your specifications and quantities to request a quote.';
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
            webpageSchema('/', title, description, 'en-US'),
            faqSchema('/', homeFaqs, 'en-US'),
          ],
        }}
      />
      <LandingPage />
    </>
  );
}
