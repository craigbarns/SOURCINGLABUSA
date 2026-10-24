'use client';

import { ArrowRight, CheckCircle2, Globe, Plus, Scale, ShieldCheck } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { ScopeTable } from '@/components/ScopeTable';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { homeFaqsZH } from '@/lib/home-faqs';
import { MARKET_ENTRY_LIMIT, NOT_AN_IMPORTER } from '@/lib/positioning';

const PILLARS = [
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: '美国合规要求解读',
    subtitle: 'A reading of U.S. requirements',
    description:
      '梳理可能适用于您产品的美国联邦及州级要求（如FDA、CPSC、FCC、加州65号提案），以及美国买家通常会索取的证明文件。检测由您指定或报价单中写明的实验室完成。',
    bullets: [
      '列出可能适用的要求与所需证明文件',
      '指出现有检测报告与证书的缺口',
      '不发证，不出具法律意见',
    ],
  },
  {
    id: 'landed-cost',
    icon: Scale,
    title: '批发价格体系',
    subtitle: 'Wholesale price',
    description:
      '按目标渠道（分销商、批发商、零售连锁、企业采购）建立批发价格与利润结构。HS税号归类研究与到岸成本模型仅在报价单写明时提供，税率以持牌报关行确认为准。',
    bullets: [
      '比较适合您产品的美国渠道',
      '按渠道利润结构推算批发价格',
      '到岸成本模型：仅在报价单写明时提供',
    ],
  },
  {
    id: 'representation',
    icon: Globe,
    title: '美国买家引荐',
    subtitle: 'Introductions to U.S. buyers',
    description:
      '选择品类、采购量与渠道相匹配的美国买家，以英文资料呈现您的产品、合规证明与批发条款，并转达买家的问题与样品需求。引荐不保证订单。',
    bullets: [
      '按品类与采购量筛选买家',
      '英文产品资料与批发条款',
      '不是美国销售办公室、法定代表或独家代理',
    ],
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    name: '评估',
    title: '确认是否适合',
    description:
      '审阅您的产品、产能、出口经验与现有检测文件，判断现在进入美国市场是否可行。',
  },
  {
    step: '02',
    name: '解读',
    title: '合规要求解读',
    description:
      '列出可能适用的美国要求与买家会索取的证明文件，并指出缺口。',
  },
  {
    step: '03',
    name: '定价',
    title: '渠道与批发价格',
    description:
      '选择首先接触的渠道，并按该渠道的利润结构建立批发价格与交易条款。',
  },
  {
    step: '04',
    name: '引荐',
    title: '精准买家引荐',
    description:
      '向匹配的美国买家呈现产品与条款。之后的订单、合同、进口与付款由您与买家直接约定。',
  },
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
        {/* HERO SECTION IN EDITORIAL STYLE */}
        <Hero locale="zh" />

        <ScopeTable locale="zh" path="market-entry" />

        {/* THREE DELIVERABLES */}
        <section id="deliverables" className="editorial-section border-t border-brand-line bg-brand-surface/30">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">三项交付内容</p>
              <h2 className="editorial-title">
                面向已投产的制造企业。<br />
                <em>{MARKET_ENTRY_LIMIT.zh}</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                展会与线上平台解决了产品展示，但美国买家在下单前还会看三件事：产品是否符合适用要求、价格是否适合他们的渠道、条款是否写得清楚。我们的工作围绕这三件事展开。
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    id={pillar.id}
                    className="scroll-mt-24 flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-8 shadow-sm"
                  >
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                        {pillar.subtitle}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                        {pillar.description}
                      </p>
                      <ul className="mt-6 space-y-2.5 text-xs text-brand-ink">
                        {pillar.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORKFLOW PROCESS SECTION */}
        <section id="workflow" className="process-section editorial-section">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">出海流程</p>
              <h2 className="editorial-title">
                四个步骤，<br />
                <em>边界在每一步都写清楚。</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                从可行性评估到买家引荐。运输、清关与进口不在流程之内，由买卖双方及其指定的服务商负责。
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

        {/* TRUTHFUL SAFEGUARDS / INTEGRITY SECTION */}
        <section className="editorial-section border-t border-brand-line bg-brand-paper py-16">
          <div className="editorial-container">
            <div className="rounded-2xl border border-brand-line bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-surface px-3 py-1 text-xs font-bold text-brand-green">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    我们不做什么
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-brand-ink sm:text-2xl">
                    {MARKET_ENTRY_LIMIT.zh}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {NOT_AN_IMPORTER.zh}我们不是律师事务所，也不是发证或检测机构。合同与发票由报价单中写明的法国或中国公司出具。
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="#contact"
                    className="editorial-button inline-flex items-center justify-center gap-2"
                  >
                    提交产品信息
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWERS & GEO KNOWLEDGE BASE */}
        <section id="faq" className="editorial-section border-t border-brand-line bg-brand-surface/40">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">常见解答</p>
              <h2 className="editorial-title">
                出海前最常被问到的<br />
                <em>问题</em>
              </h2>
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
                <p className="editorial-kicker">立即提交出海需求</p>
                <h2 className="editorial-title">
                  告诉我们您的<br />
                  <em>工厂实力与出海意向</em>
                </h2>
                <p className="editorial-body mt-4 text-sm leading-relaxed">
                  提交您的主营品类、产能规模与出海诉求。我们将进行初步可行性审阅，并通过邮件与您联系。
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-brand-line bg-white p-6 shadow-xs text-xs text-brand-ink">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>提交需求不构成任何委托或订单</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>我们先判断美国路径是否适合您的产品</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>{MARKET_ENTRY_LIMIT.zh}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-brand-line pt-6">
                  <p className="text-xs text-brand-muted">直接商务联络邮箱：</p>
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
