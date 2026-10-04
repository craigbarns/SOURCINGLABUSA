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
  '为中国优质制造企业与出海品牌提供端到端的美国本土市场开拓支持：美国商业代表、B2B渠道买家对接、FDA/CPSC/FCC法规合规映射、到岸关税测算及本土3PL海外仓履约协同。';
const homeAnswerZH =
  'Sourcing Lab USA 专注于协助符合标准的国际优质制造企业与出海品牌稳健开拓美国本土市场。我们提供美国市场商业代表服务，按美东/美西工作时间对接目标B2B批发商、连锁采购商及工业买家；协助梳理FDA、CPSC、FCC及加州Prop 65准入法规；研究10位数HTS海关税号归类并测算Section 301额外关税与到岸成本；同时协同对接美国本土3PL海外仓储与履约交付。目前项目由报价单中注明的法国或中国签约公司执行并开具发票；美国（迈阿密）实体计划于2027年设立。';

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
              '美国本土市场准入与商业代表服务',
              '为具备实体制造实力的海外工厂提供美国本土商业拓展、B2B买家直采对接、法规标准排查、关税筹划及3PL仓储履约协同。',
            ),
            faqSchema('/zh', homeFaqsZH, 'zh-Hans'),
          ],
        }}
      />
      <LandingPageZH />
    </>
  );
}
