import { LandingPageZH } from '@/components/zh/LandingPageZH';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsZH } from '@/lib/home-faqs';
import {
  faqSchema,
  pageMetadata,
  serviceSchema,
  webpageSchema,
} from '@/lib/seo';
import { MARKET_ENTRY_SUMMARY } from '@/lib/positioning';

const title = '进入美国市场：合规解读、批发定价与买家引荐';
const description = MARKET_ENTRY_SUMMARY.zh;
const homeAnswerZH = MARKET_ENTRY_SUMMARY.zh;

export const metadata = pageMetadata({
  title,
  description,
  path: '/zh',
  locale: 'zh-Hans',
  translatedHome: true,
});

export default function HomePageZH() {
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema('/zh', title, description, 'zh-Hans', {
              abstract: homeAnswerZH,
            }),
            serviceSchema('/zh', '美国市场路径：合规解读、批发定价与买家引荐', MARKET_ENTRY_SUMMARY.zh),
            faqSchema('/zh', homeFaqsZH, 'zh-Hans'),
          ],
        }}
      />
      <LandingPageZH />
    </>
  );
}
