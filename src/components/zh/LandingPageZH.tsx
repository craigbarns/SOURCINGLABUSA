'use client';

import { ArrowRight, Check, CheckCircle2, Plus } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { ScopeTable } from '@/components/ScopeTable';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { homeFaqsZH } from '@/lib/home-faqs';
import { HERO_NOTE } from '@/lib/positioning';

/**
 * Chinese homepage. Same business as the English and Spanish sites: custom
 * packaging and textiles sourced from factories, under a contract and invoice
 * from France or China. The U.S. market-entry path was dropped on 24 October
 * 2026. Wording shared with the other languages: src/lib/positioning.ts.
 */

const WORKFLOW_STEPS = [
  { step: '01', name: '需求', title: '需求说明与目标价格', description: '产品、参考资料、材料、各款数量、目的地和目标价格，写进同一份需求说明。' },
  { step: '02', name: '寻源', title: '工厂寻源', description: '通过我们在中国的独立合作伙伴寻找工厂，并按需求说明进行评估。' },
  { step: '03', name: '报价', title: '价格与条款', description: '为工厂方案报价。报价单写明法国或中国的签约公司、付款节点和模具条款。' },
  { step: '04', name: '打样', title: '样品与确认', description: '按需求说明制作并审核样品。样品确认之前，不进入生产。' },
  { step: '05', name: '生产', title: '下单与跟进', description: '下单后按确认样品跟进生产。仅在报价单写明时，才增加验货或实验室检测。' },
  { step: '06', name: '发运', title: '交接', description: '运费、保险和清关在报价单中写明，或由您负责。我们不订舱，也不办理入境清关。' },
];

const SUPPLY_LINES = [
  { href: '/custom-packaging', tag: '核心', title: '定制包装', body: '精品盒、折叠盒、邮寄盒、袋子、标签和内衬，按您的规格制作。' },
  { href: '/custom-textile', tag: '核心', title: '服装与纺织品', body: '系列服装、制服、面料与后整理，从工艺单到确认样品。' },
  { href: '/sportswear-sourcing', tag: '核心', title: '运动服', body: '版型、面料和弹性按用途确定；功能性声明须有证明。' },
  { href: '/private-label-packaging', tag: '核心', title: '自有品牌包装', body: '为您自己的产品线设计包装：结构、印刷和必须标注的信息。' },
  { href: '/product-sourcing', tag: '按需', title: '其他产品', body: '其他产品在报价前先进行可行性评估。' },
];

const BRAND_POINTS = [
  '工厂价格，以及报价单上写明的供应方。',
  '生产前确认样品。',
  '仅在报价单包含时，才提供验货或到岸成本模型。',
];

export function LandingPageZH() {
  return (
    <div className="editorial-shell flex min-h-screen flex-col" lang="zh-Hans">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[#dce7bd] px-4 py-2 font-bold text-[#243a2f] focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        跳至主要内容
      </a>
      <Navbar area="marketing" appearance="light" locale="zh" contactHref="#contact" />
      <main id="main-content" className="flex-1">
        <Hero locale="zh" />

        <ScopeTable locale="zh" />

        {/* HOW A PROJECT RUNS */}
        <section id="how-it-works" className="process-section editorial-section scroll-mt-24">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">合作流程</p>
              <h2 className="editorial-title">
                从需求说明<br />
                <em>到确认的订单。</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                六个步骤，每一步都先写清楚，再开始下一步。
              </p>
            </div>

            <div className="process-steps">
              {WORKFLOW_STEPS.map((step) => (
                <div key={step.step} className="process-step">
                  <div className="process-number">
                    <span>{step.step}</span>
                    <span>{step.name}</span>
                  </div>
                  <h3 className="collection-title mt-4 text-white text-lg font-bold">{step.title}</h3>
                  <p className="editorial-body mt-2 text-xs leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE SUPPLY */}
        <section id="supply" className="editorial-section border-t border-brand-line bg-brand-surface/30 scroll-mt-24">
          <div className="editorial-container">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <p className="editorial-kicker">供货内容</p>
                <h2 className="editorial-title">
                  包装与纺织品。<br />
                  <em>按您的规格制作。</em>
                </h2>
              </div>
              <div className="lg:col-span-5 rounded-xl border border-brand-line bg-white p-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">面向美国品牌</p>
                <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                  {BRAND_POINTS.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SUPPLY_LINES.map((line) => (
                <article
                  key={line.href}
                  className="flex flex-col justify-between rounded-xl border border-brand-line bg-white p-6"
                >
                  <div>
                    <span className="rounded-md bg-brand-surface px-2.5 py-1 text-[10px] font-semibold text-brand-ink border border-brand-line">
                      {line.tag}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-brand-ink">{line.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-brand-muted">{line.body}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-brand-line/60">
                    <Link
                      href={line.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:underline"
                    >
                      查看英文页面
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section id="faq" className="editorial-section border-t border-brand-line bg-brand-surface/40 scroll-mt-24">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">常见问题</p>
              <h2 className="editorial-title">
                首次下单前<br />
                <em>常被问到的问题</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                谁开票、一次供货包含什么、谁负责进口，以及哪些不在范围内。
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {homeFaqsZH.map(([question, answer]) => (
                <details key={question} className="faq-item">
                  <summary className="cursor-pointer">
                    <span>{question}</span>
                    <Plus size={16} aria-hidden="true" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT BRIEF FORM */}
        <section id="contact" className="editorial-section contact-section border-t border-brand-line bg-brand-paper">
          <div className="editorial-container">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <p className="editorial-kicker">开始一个项目</p>
                <h2 className="editorial-title">
                  告诉我们<br />
                  <em>您的下一个项目</em>
                </h2>
                <p className="editorial-body mt-4 text-sm leading-relaxed">
                  发送您的产品需求：我们确认哪些可以报价和打样，并通过邮件回复。
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-brand-line bg-white p-6 shadow-xs text-xs text-brand-ink">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>提交需求不构成任何委托或订单</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>合同和发票由法国或中国的公司开具</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>{HERO_NOTE.zh}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-brand-line pt-6">
                  <p className="text-xs text-brand-muted">直接联络邮箱：</p>
                  <a
                    href="mailto:contact@sourcinglabusa.com"
                    className="mt-1 inline-block text-base font-bold text-brand-ink hover:text-brand-green transition-colors"
                  >
                    contact@sourcinglabusa.com ↗
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-line bg-white p-8 shadow-sm lg:col-span-7">
                <ContactForm
                  locale="zh"
                  appearance="editorial"
                  formLocation="chinese_market_entry_landing"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter locale="zh" />
      <StickyMobileCta locale="zh" />
    </div>
  );
}
