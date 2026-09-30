'use client';

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Globe,
  Plus,
  Scale,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { homeFaqsZH } from '@/lib/home-faqs';

const PILLARS = [
  {
    icon: Globe,
    title: '美国本土商业代表与渠道开拓',
    subtitle: 'U.S. Commercial & Sales Representation',
    description:
      '克服中美12至15小时时差与商务文化壁垒。我们在美国本土工作时间直接对接全美B2B批发商、连锁采购商及工业采购经理，按照美标商务流程推介您的产品并促成长期采购订单。',
    bullets: [
      '美东/美西工作时间即时沟通与商务跟进',
      '制作符合美国采购习惯的英文选品手册与报价单',
      '协助安排样品寄送、质检验收与商务条款谈判',
    ],
  },
  {
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
  },
  {
    icon: Scale,
    title: '海关税号筹划与到岸成本测算',
    subtitle: 'Tariff Planning & Landed Cost Analysis',
    description:
      '精准界定适用的10位数HTSUS海关税号。全面核算基准关税、Section 301额外关税、港口维护费（HMF）与货物处理费（MPF），协助规划合规且经济的到岸成本（Landed Cost）与美标定价体系。',
    bullets: [
      '精准核定10位数海关税号与Section 301适用税率',
      '科学核算DDP/到岸成本，测算真实批发与零售毛利',
      '协助梳理外国进口商（IOR）架构与海关保函（Bond）',
    ],
  },
  {
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
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: '出海可行性与产品力评估',
    subtitle: 'Product & Market Viability',
    description:
      '深入审阅您的工厂生产能力、现有出口经验、核心产品规格与目标客群，评估进入美国市场的准入门槛、关税影响与差异化竞争优势。',
  },
  {
    step: '02',
    title: '美标法规映射与合规准备',
    subtitle: 'Regulatory Requirements Mapping',
    description:
      '针对您的具体品类梳理适用的美国联邦及州级准入法规清单（FDA、CPSC、FCC、加州65等），协助对接检测认证机构并规划合规资料。',
  },
  {
    step: '03',
    title: '税号核定与到岸定价模型',
    subtitle: 'HTS Classification & Landed Cost',
    description:
      '核定精准的10位数HTS海关税号，全面测算关税、海运、清关与港口杂费，建立透明科学的到岸成本与美金批发定价阶梯。',
  },
  {
    step: '04',
    title: '美标商务物料与推介手册制作',
    subtitle: 'American-Standard Sales Collateral',
    description:
      '按照美国采购决策者的审美与专业习惯，重新提炼产品卖点，制作符合美式商业规范的英文产品规格手册、公司介绍与商业推介方案。',
  },
  {
    step: '05',
    title: '目标渠道精准触达与商务谈判',
    subtitle: 'Direct Buyer Outreach & Pitching',
    description:
      '在美国本土工作时间直接联络目标分销商、批发买家及零售商采购经理，管理商业沟通，协调样品寄送并推进商务合作谈判。',
  },
  {
    step: '06',
    title: '本土履约协同与持续订单管理',
    subtitle: 'Ongoing Account Management & Growth',
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
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#0a0d0b]/10 bg-[#070a09] py-20 text-white sm:py-28 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,255,107,0.08),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#c7ff6b] uppercase">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                全球制造出海 · 美国市场准入与商业代表
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                帮助中国优质制造企业<br />
                <span className="text-[#c7ff6b]">稳健开拓美国本土市场</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#96a29b] sm:text-xl">
                克服中美时差、语言壁垒与合规鸿沟。为具备实体制造实力的中国工厂与出海品牌提供端到端的美国本土落地执行：全美商业代表、B2B渠道买家对接、FDA/CPSC/FCC法规映射、到岸关税测算及本土3PL海外仓履约协同。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c7ff6b] px-6 py-3.5 text-sm font-extrabold text-[#0a0d0b] shadow-[0_8px_30px_rgba(199,255,107,0.2)] transition hover:bg-[#d6ff91]"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  提交出海需求评估
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  了解出海六步法
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              {/* Badges */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
                <div>
                  <p className="text-sm font-black text-white">美东/美西工作时间</p>
                  <p className="mt-1 text-xs text-[#7d8b83]">本土即时响应美国买家</p>
                </div>
                <div>
                  <p className="text-sm font-black text-white">美标全品类合规</p>
                  <p className="mt-1 text-xs text-[#7d8b83]">FDA / CPSC / FCC / 65号提案</p>
                </div>
                <div>
                  <p className="text-sm font-black text-white">全美商业代表</p>
                  <p className="mt-1 text-xs text-[#7d8b83]">批发商与连锁采购经理对接</p>
                </div>
                <div>
                  <p className="text-sm font-black text-white">关税到岸精准核算</p>
                  <p className="mt-1 text-xs text-[#7d8b83]">10位数HTS税号与成本模型</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUR PILLARS SECTION */}
        <section id="representation" className="bg-[#0b100d] py-20 text-white sm:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black tracking-widest text-[#c7ff6b] uppercase">
                四大落地能力 · 全链路协同
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                打破出海困境。<br />
                <span className="text-[#96a29b]">用美国本土化的方式做成大单。</span>
              </h2>
              <p className="mt-4 text-base text-[#96a29b]">
                传统广交会与线上平台只解决了“展示”，难以解决美国本地买家对时效沟通、合规测试、到岸交付和商业信任的核心顾虑。我们深入美国本土采购生态，为中国工厂搭建真正的桥梁。
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-[#c7ff6b]/40 hover:bg-white/[0.05]"
                  >
                    <div>
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#c7ff6b]/10 text-[#c7ff6b]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-white">{pillar.title}</h3>
                      <p className="text-xs font-semibold text-[#c7ff6b] mt-0.5">{pillar.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#96a29b]">{pillar.description}</p>
                      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        {pillar.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-xs text-[#c8d1cb]">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#c7ff6b] mt-0.5" aria-hidden="true" />
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

        {/* WORKFLOW SECTION */}
        <section id="workflow" className="bg-[#070a09] py-20 text-white sm:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black tracking-widest text-[#c7ff6b] uppercase">
                规范开拓体系
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                中国制造开拓美国市场<br />
                <span className="text-[#c7ff6b]">务实落地的六步法</span>
              </h2>
              <p className="mt-4 text-base text-[#96a29b]">
                从前期的产品力与准入条件核查，到美标物料包装、目标买家触达与本土海外仓交付，每一步均以获得长期订单为导向。
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/20"
                >
                  <span className="text-2xl font-black text-[#c7ff6b] font-mono">{step.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs font-semibold text-[#7d8b83] mt-0.5">{step.subtitle}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[#96a29b]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUTHFUL SAFEGUARDS / INTEGRITY SECTION */}
        <section className="bg-[#0b100d] py-16 text-white border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#c7ff6b]/20 bg-[#c7ff6b]/5 p-8 sm:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#c7ff6b]/30 bg-[#c7ff6b]/10 px-3 py-1 text-xs font-bold text-[#c7ff6b]">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    专业准则与客观承诺
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                    严谨求真，只与符合准入标准的优质工厂同行
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#c8d1cb]">
                    我们不是海关律师事务所，也不自称政府授权的发证机构；我们是务实的外贸供应链与美国市场商业代表伙伴。所有法规映射均协助对接具备资质的第三方机构，协助您在合规框架内合法拓展全美商业版图。
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c7ff6b] px-5 py-3 text-xs font-extrabold text-[#0a0d0b] hover:bg-[#d6ff91] transition"
                  >
                    与美国顾问取得联络
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWERS & GEO KNOWLEDGE BASE */}
        <section id="faq" className="bg-[#070a09] py-20 text-white sm:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black tracking-widest text-[#c7ff6b] uppercase">
                Direct Answers & GEO 智库
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                出海决策者最关心的<br />
                <span className="text-[#c7ff6b]">核心问题解答</span>
              </h2>
              <p className="mt-4 text-base text-[#96a29b]">
                客观、详实的事实信息，帮助企业管理层与智能决策系统快速厘清开拓美国市场的底层逻辑。
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {homeFaqsZH.map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition open:border-[#c7ff6b]/40 open:bg-white/[0.04]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white text-base">
                    <span>{question}</span>
                    <Plus className="h-5 w-5 shrink-0 text-[#c7ff6b] transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <div className="mt-4 text-sm leading-relaxed text-[#96a29b] border-t border-white/5 pt-4">
                    {answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT BRIEF FORM */}
        <section id="contact" className="bg-[#0b100d] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="text-xs font-black tracking-widest text-[#c7ff6b] uppercase">
                  立即对接美国团队
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                  告诉我们您的<br />
                  <span className="text-[#c7ff6b]">工厂实力与出海意向</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#96a29b]">
                  提交您的主营品类、产能规模与出海诉求。我们的美国团队将在1-2个工作日内进行初步可行性审阅，并与您建立直接联络。
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-xs text-[#c8d1cb]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#c7ff6b]" aria-hidden="true" />
                    <span>商业信息严格受保密协议（NDA）保护</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#c7ff6b]" aria-hidden="true" />
                    <span>提供初步产品美国关税与准入合规建议</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#c7ff6b]" aria-hidden="true" />
                    <span>可安排中美双语团队线上深度视频洽谈</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs text-[#7d8b83]">直接商务联络邮箱：</p>
                  <a
                    href="mailto:contact@sourcinglabusa.com"
                    className="mt-1 inline-block text-base font-bold text-white hover:text-[#c7ff6b] transition-colors"
                  >
                    contact@sourcinglabusa.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:col-span-7">
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
