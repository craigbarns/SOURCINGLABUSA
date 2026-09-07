import { LandingPage } from '@/components/LandingPage';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqs } from '@/lib/home-faqs';
import { pageMetadata, webpageSchema, faqSchema } from '@/lib/seo';

const title = 'China Sourcing & Product Supply';
const description =
  'Clothing, packaging and other products sourced from China for U.S. businesses. Product purchase and supply; Miami launch planned for 2027.';
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
