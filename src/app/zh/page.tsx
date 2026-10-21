import { LandingPageZH } from '@/components/zh/LandingPageZH';
import { StructuredData } from '@/components/StructuredData';
import { homeFaqsZH } from '@/lib/home-faqs';
import {
  faqSchema,
  pageMetadata,
  serviceSchema,
  webpageSchema,
} from '@/lib/seo';

const title = '美国市场准入与商业代表';
const description =
  '为国际制造企业准备美国市场拓展：目标客户研究、商业资料、潜在分销商识别与商业代表合作。当前项目通过法国或中国公司签约，迈阿密扩展计划于2027年开展。';
const homeAnswerZH =
  'Sourcing Lab USA帮助国际制造企业准备美国市场拓展，包括目标客户与渠道研究、商业资料、潜在分销商识别以及按约定范围的买家联络和跟进。具体产品、进口和法律问题与适当的专业人士协调。当前项目通过报价列明的法国或中国公司签约并开票，迈阿密扩展计划于2027年开展。';

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
            serviceSchema(
              '/zh',
              '美国市场准备与商业代表合作',
              '面向国际制造商的美国市场研究、商业资料准备、潜在买家联络和商业代表合作。',
            ),
            faqSchema('/zh', homeFaqsZH, 'zh-Hans'),
          ],
        }}
      />
      <LandingPageZH />
    </>
  );
}
