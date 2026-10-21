import Link from 'next/link';
import { Plus } from 'lucide-react';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { MarketEntryForm } from '@/components/MarketEntryForm';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { homeFaqsZH } from '@/lib/home-faqs';

const pillars = [
  { id: 'representation', title: '商业代表与买家联络', body: '先明确产品、目标客户与渠道，再讨论商业资料、潜在买家研究、联络和后续跟进。合适的合作可采用月度服务费和双方约定的佣金；报价列明工作范围、报告和责任，不保证销售结果。', href: '/us-sales-representation', label: '了解商业代表合作范围' },
  { id: 'compliance', title: '准备产品证据并明确专业审查', body: '整理规格、用途、样品和支持产品声明的资料。针对具体产品的进口、测试和法律问题，应由适当的专业人士确认。Sourcing Lab USA协调约定的工作，不将市场资料等同于法律批准或产品认证。', href: '/tools/us-market-entry-assessment', label: '检查市场准备缺项' },
  { id: 'landed-cost', title: '使用透明假设比较到岸成本', body: '记录产品报价、运输、保险、经核实的税费以及目的地费用。免费计算器仅使用您输入的数据，显示总成本和单位成本；不会自动查询税率、确定税号或保证利润。', href: '/tools/landed-cost-calculator', label: '使用免费到岸成本计算器' },
  { id: 'fulfillment', title: '明确渠道、订单和交付责任', body: '比较直接B2B销售、商业代表和分销商路径。报价中明确由谁与买家签约、开票、进口、运输及处理售后。具体物流工作在约定范围内与指定服务商协调；本网站不表示已有美国仓库或库存。', href: '/us-market-entry', label: '了解市场进入准备流程' },
];
export function LandingPageZH() {
  return <div className="editorial-shell flex min-h-screen flex-col" lang="zh-Hans">
    <a href="#main-content" className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:not-sr-only">跳至正文</a>
    <Navbar area="marketing" appearance="light" locale="zh" contactHref="#contact" />
    <main id="main-content" className="flex-1"><Hero locale="zh" />
      {pillars.map(pillar => <section id={pillar.id} key={pillar.id} className="editorial-section section-ruled scroll-mt-24"><div className="editorial-container service-overview-layout"><h2 className="editorial-title">{pillar.title}</h2><div><p className="editorial-body">{pillar.body}</p><Link href={pillar.href} className="editorial-text-link mt-6">{pillar.label} ↗</Link></div></div></section>)}
      <section id="workflow" className="editorial-section process-section section-ruled"><div className="editorial-container"><p className="editorial-kicker">从资料到商业测试</p><h2 className="editorial-title">先明确范围，再开展工作。</h2><ol className="service-process-grid mt-8"><li><span>01</span><h3>审查起点</h3><p>产品、制造能力、现有出口、目标客户及证据。</p></li><li><span>02</span><h3>约定方案</h3><p>研究问题、商业资料、工作范围、责任和预算。</p></li><li><span>03</span><h3>开展并复盘</h3><p>按约定范围跟进潜在买家，记录反馈、缺项与下一步决定。</p></li></ol><p className="editorial-body mt-8">当前项目可通过报价列明的法国或中国公司签约并开票。迈阿密扩展计划于2027年开展，与当前可用服务分开说明。中国采购关系为独立合作伙伴关系。</p></div></section>
      <section id="faq" className="editorial-section faq-section section-ruled"><div className="editorial-container faq-layout"><h2 className="editorial-title">常见问题</h2><div className="faq-list">{homeFaqsZH.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<Plus aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
      <section id="contact" className="editorial-section contact-section section-ruled"><div className="editorial-container contact-panel"><div><p className="editorial-kicker">面向国际制造商</p><h2 className="editorial-title">讨论您的美国市场目标。</h2><p className="editorial-body">提交产品、制造能力和目标客户。我们先审查项目匹配度，再提出书面工作范围。不要通过此表单发送机密技术文件。</p><a className="contact-email" href="mailto:contact@sourcinglabusa.com">contact@sourcinglabusa.com</a><Link href="/tools/us-market-entry-assessment" className="editorial-text-link mt-5">先完成免费准备度评估 ↗</Link></div><MarketEntryForm formLocation="zh_market_entry" locale="zh" /></div></section>
    </main><EditorialFooter locale="zh" /><StickyMobileCta locale="zh" />
  </div>;
}
