import { LandingPageZH } from '@/components/zh/LandingPageZH';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsZH } from '@/lib/home-faqs';
import {
  faqSchema,
  pageMetadata,
  serviceSchema,
  webpageSchema,
} from '@/lib/seo';
import { HOME_DESCRIPTION, PROMISE_STATEMENT } from '@/lib/positioning';

const title = '定制包装与纺织品：工厂生产，合同供货';
const description = HOME_DESCRIPTION.zh;
const homeAnswerZH = PROMISE_STATEMENT.zh;

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
            serviceSchema('/zh', '定制包装与纺织品供货', PROMISE_STATEMENT.zh),
            faqSchema('/zh', homeFaqsZH, 'zh-Hans'),
          ],
        }}
      />
      <LandingPageZH />
    </>
  );
}
