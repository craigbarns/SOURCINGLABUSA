'use client';

import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Plus,
  Scale,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { homeFaqsZH } from '@/lib/home-faqs';

const PILLARS = [
  {
    id: 'representation-card',
    icon: Globe,
    title: '美国商业代表与渠道开拓',
    subtitle: 'U.S. Commercial & Sales Representation',
    description:
      '克服中美12至15小时时差与商务文化壁垒。我们按美国工作时间安排沟通，对接目标B2B批发商、连锁采购商及工业采购经理，按照美国商务习惯推介您的产品，推动长期采购合作。',
    bullets: [
      '按美东/美西工作时间安排沟通与商务跟进',
      '制作符合美国采购习惯的英文选品手册与报价单',
      '协助安排样品寄送、质检验收与商务条款谈判',
    ],
    link: '#contact',
    linkText: '咨询商业代表合作',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: '美国法规合规与准入标准映射',
    subtitle: 'U.S. Regulatory & Compliance Mapping',
    description:
      '全面梳理联邦及各州准入法律红线。协助工厂明确所适用的FDA注册、CPSC儿童安全CPC认证、FCC电子认证及加州Prop 65有害物质清单等要求，协助对接合规检测机构。',
    bullets: [
      '品类法规要求精准排查，避免海关扣押风险',
      '协助对接经美国认可的第三方检测与认证实验室',
      '协助准备符合美国采购商审计要求的合规技术文件',
    ],
    link: '#contact',
    linkText: '咨询法规合规映射',
  },
  {
    id: 'landed-cost',
    icon: Scale,
    title: '海关税号筹划与到岸成本测算',
    subtitle: 'Tariff Planning & Landed Cost Analysis',
    description:
      '精准界定适用的10位数HTSUS海关税号。全面核算基准关税、Section 301额外关税、港口维护费（HMF）与货物处理费（MPF），协助规划合规且经济的到岸成本（Landed Cost）与美标定价体系。',
    bullets: [
      '研究10位数海关税号归类与Section 301适用税率',
      '科学核算DDP/到岸成本，测算真实批发与零售毛利',
      '协助梳理外国进口商（IOR）架构与海关保函（Bond）',
    ],
    link: '#contact',
    linkText: '咨询到岸关税测算',
  },
  {
    id: 'fulfillment',
    icon: Warehouse,
    title: '美国本土3PL海外仓与交付协同',
    subtitle: 'U.S. 3PL Fulfillment & Logistics',
    description:
      '协助对接美国东西海岸及中部主要港口辐射区的优质第三方物流（3PL）海外仓网络，支持小批量本土试样分拨、大宗托盘仓储、整箱中转及退换货售后支持，提升美国买家采购信心。',
    bullets: [
      '协助对接美东、美西主流合规3PL仓储网络',
      '支持本地快速派送与打托贴标，满足连锁渠道要求',
      '本土化退换货与逆向物流协同，打消买家后顾之忧',
    ],
    link: '#contact',
    linkText: '咨询海外仓协同',
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    name: '评估',
    title: '出海可行性与产品力评估',
    description:
      '深入审阅您的工厂生产能力、现有出口经验、核心产品规格与目标客群，评估进入美国市场的准入门槛、关税影响与差异化竞争优势。',
  },
  {
    step: '02',
    name: '映射',
    title: '美标法规映射与合规准备',
    description:
      '针对您的具体品类梳理适用的美国联邦及州级准入法规清单（FDA、CPSC、FCC、加州65等），协助对接检测认证机构并规划合规资料。',
  },
  {
    step: '03',
    name: '测算',
    title: '税号归类研究与到岸定价模型',
    description:
      '研究10位数HTS海关税号归类（由报关行最终确认），全面测算关税、海运、清关与港口杂费，建立透明科学的到岸成本与美金批发定价阶梯。',
  },
  {
    step: '04',
    name: '包装',
    title: '美标商务物料与推介制作',
    description:
      '按照美国采购决策者的审美与专业习惯，重新提炼产品卖点，制作符合美式商业规范的英文产品规格手册、公司介绍与商业推介方案。',
  },
  {
    step: '05',
    name: '拓客',
    title: '目标买家触达与商务谈判',
    description:
      '按美国工作时间联络目标分销商、批发买家及零售商采购经理，管理商业沟通，协调样品寄送并推进商务合作谈判。',
  },
  {
    step: '06',
    name: '深耕',
    title: '本土履约协同与订单管理',
    description:
      '协助对接美国本土3PL仓储履约，跟进日常订单执行与售后服务沟通，深挖买家复购需求，协助中国工厂在美国市场实现持续稳健增长。',
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

        {/* FOUR PILLARS SECTION */}
        <section id="representation" className="editorial-section border-t border-brand-line bg-brand-surface/30">
          <div className="editorial-container">
            <div className="max-w-3xl">
              <p className="editorial-kicker">
                <span className="launch-dot" aria-hidden="true" />
                四大落地能力 · 全链路协同
              </p>
              <h2 className="editorial-title">
                打破出海困境。<br />
                <em>用美国本土化的方式做成高价值大单。</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                传统广交会与线上平台只解决了“产品展示”，难以解决美国本地买家对时区沟通、合规准入、到岸交付和商业信任的核心顾虑。我们熟悉美国采购流程与买家要求，为中国制造企业搭建切实的对接桥梁。
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    id={pillar.id}
                    className="scroll-mt-24 flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-8 shadow-sm transition hover:shadow-md"
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
                    <div className="mt-8 pt-6 border-t border-brand-line">
                      <Link
                        href={pillar.link}
                        className="editorial-button inline-flex w-full items-center justify-center gap-2"
                      >
                        {pillar.linkText}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
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
              <p className="editorial-kicker">规范开拓体系</p>
              <h2 className="editorial-title">
                中国制造开拓美国市场<br />
                <em>务实落地的六步法</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                从前期的产品力与准入条件核查，到美标物料包装、目标买家触达与本土海外仓交付，每一步均以获得长期订单为导向。
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
                    专业准则与客观承诺
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-brand-ink sm:text-2xl">
                    严谨求真，只与符合准入标准的优质工厂同行
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    我们不是海关律师事务所，也不自称政府授权的发证机构；我们是务实的外贸供应链与美国市场商业代表伙伴。目前项目由报价单中注明的法国或中国签约公司执行并开具发票；美国（迈阿密）实体计划于2027年设立。所有法规映射均协助对接具备资质的第三方机构，协助您在合规框架内合法拓展全美商业版图。
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="#contact"
                    className="editorial-button inline-flex items-center justify-center gap-2"
                  >
                    与美国顾问取得联络
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
              <p className="editorial-kicker">DIRECT ANSWERS &amp; GEO 智库</p>
              <h2 className="editorial-title">
                出海决策者最关心的<br />
                <em>核心问题解答</em>
              </h2>
              <p className="editorial-body mt-4 text-base">
                客观、详实的事实信息，帮助企业管理层与智能决策系统快速厘清开拓美国市场的底层逻辑。
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
                    <span>商业信息严格受保密协议（NDA）保护</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>提供初步产品美国关税与准入合规建议</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0" aria-hidden="true" />
                    <span>可安排中美双语团队线上深度视频洽谈</span>
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
