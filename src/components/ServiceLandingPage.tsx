import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardList, Plus } from 'lucide-react';

import { BriefSection } from '@/components/BriefSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { CtaLink } from '@/components/CtaLink';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { StructuredData } from '@/components/StructuredData';
import { breadcrumbSchema, faqSchema, serviceSchema, webpageSchema } from '@/lib/seo';
import {
  SOURCING_BENCHMARKS,
  BENCHMARKS_NOTE,
} from '@/lib/sourcing-benchmarks';
import type { ProductCategory } from '@/lib/product-media';

type ContentBlock = {
  title: string;
  body: string;
};

type Question = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  path: string;
  journey?: 'sourcing' | 'market-entry';
  references?: Array<{ title: string; url: string }>;
  reviewedDate?: string;
  eyebrow: string;
  title: string;
  intro: string;
  /**
   * A self-contained factual answer to the question this page exists for,
   * 40-80 words, placed directly under the H1 and mirrored into the page
   * schema. Written to stay true if an answer engine quotes it alone, with no
   * preceding sentence for context.
   */
  directAnswer: string;
  overview: string;
  overviewTitle: string;
  processTitle: string;
  offerName: string;
  offerDescription: string;
  focusAreas: ContentBlock[];
  briefItems: string[];
  workflow: ContentBlock[];
  faqs: Question[];
  /** Limits the product grid to one category; omit to show every product. */
  showcaseCategory?: ProductCategory;
  /** Headline of the brief form on this page. */
  briefTitle: string;
  /** Supporting line of the brief form on this page. */
  briefIntro: string;
  /** Set to true to omit product brief showcase cards for pure consulting/audit services */
  hideShowcase?: boolean;
  /** Optional custom benchmarks for non-standard services */
  benchmarks?: typeof SOURCING_BENCHMARKS;
  /** Optional custom benchmark footnote */
  benchmarksNote?: string;
  relatedPages: Array<{
    href: string;
    title: string;
    description: string;
  }>;
};

export function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  const marketEntry = page.journey === 'market-entry';
  const cta = marketEntry ? 'Request a U.S. market assessment' : 'Request a sourcing quote';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      webpageSchema(page.path, page.title, page.intro, 'en-US', {
        abstract: page.directAnswer,
      }),
      serviceSchema(page.path, page.offerName, page.offerDescription),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: page.offerName, path: page.path },
      ]),
      faqSchema(
        page.path,
        page.faqs.map(({ question, answer }) => [question, answer] as const),
      ),
    ],
  };

  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <Navbar area="marketing" />
      <main className="flex-1">
        <StructuredData data={structuredData} />
        <section className="editorial-section service-intro-section">
          <div className="editorial-container">
            <nav aria-label="Breadcrumb" className="page-breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{page.offerName}</span>
            </nav>
            <div className="service-intro-layout">
              <div>
                <p className="editorial-kicker">{page.eyebrow}</p>
                <h1 className="editorial-title page-title">{page.title}</h1>
                <p className="direct-answer">{page.directAnswer}</p>
                <p className="editorial-body page-intro">{page.intro}</p>
                <CtaLink
                  href="#contact"
                  location="service_hero"
                  label={cta}
                  className="editorial-button mt-8"
                >
                  {cta}{' '}
                  <ArrowRight size={17} aria-hidden="true" />
                </CtaLink>
              </div>
              <aside className="sourcing-overview" aria-label="Project and supply information">
                <p className="editorial-kicker">SOURCING LAB USA / YOUR PROJECT</p>
                <h2>{page.offerName}</h2>
                <p className="editorial-body">{page.offerDescription}</p>
                <p className="editorial-body mt-5">
                  {marketEntry
                    ? 'For international manufacturers preparing to reach U.S. buyers. Market research, sales preparation and outreach are scoped for your products and target channels.'
                    : 'For U.S. business customers. Sourcing and supply projects can start now through an established independent partnership in China.'}
                </p>
                <p className="sourcing-overview-note">
                  Your quotation identifies the company in France or China that
                  contracts with you and invoices the agreed products or services.
                  Miami expansion is planned for 2027.
                </p>
                <Link href="/about" className="editorial-text-link mt-5">
                  About Sourcing Lab USA <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="editorial-section section-ruled">
          <div className="editorial-container service-overview-layout">
            <div>
              <p className="editorial-kicker">{marketEntry ? 'DESIGNED AROUND YOUR TARGET BUYER' : 'DESIGNED AROUND THE PRODUCT'}</p>
              <h2 className="editorial-title">
                {page.overviewTitle}
              </h2>
              <p className="editorial-body page-intro">{page.overview}</p>
              <aside className="brief-checklist">
                <h3>
                  <ClipboardList size={18} aria-hidden="true" /> Start with a
                  clear brief
                </h3>
                <ul>
                  {page.briefItems.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <div className="detail-card-grid">
              {page.focusAreas.map((area, index) => (
                <article key={area.title} className="detail-card">
                  <span className="editorial-kicker">0{index + 1}</span>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {!page.hideShowcase && <ProductShowcase category={page.showcaseCategory} />}

        <section id="order-terms" className="editorial-section process-section scroll-mt-24">
          <div className="editorial-container">
            <p className="editorial-kicker">A DOCUMENTED PROCESS</p>
            <h2 className="editorial-title">
              {page.processTitle}
            </h2>
            <ol className="service-process-grid">
              {page.workflow.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <dl className="sourcing-benchmarks">
              {(page.benchmarks ?? SOURCING_BENCHMARKS).map((benchmark) => (
                <div key={benchmark.label}>
                  <dt>{benchmark.label}</dt>
                  <dd className="benchmark-value">{benchmark.value}</dd>
                  <dd className="benchmark-qualifier">{benchmark.qualifier}</dd>
                </div>
              ))}
            </dl>
            <p className="benchmarks-note">{page.benchmarksNote ?? BENCHMARKS_NOTE}</p>
            <p className="editorial-body mt-8">
              {marketEntry ? <>Agree the target products, channels, responsibilities, deliverables and reporting cadence before starting. A market-entry project may use a fixed scope; ongoing representation may use a monthly retainer and, where agreed, a sales commission. Pricing, territory, exclusivity and commission triggers are established in your proposal. No sales volume or buyer response is guaranteed.</> : <>Review the product specifications, sample requirements, quantities,
              product pricing and payment terms before approving your order.
              Delivery and import responsibilities are agreed for each project.{' '}
              <Link href="/china-to-us-procurement#order-terms" className="editorial-text-link">
                See how product supply and order terms work
              </Link>.
              {' '}Use the <Link href="/blog/verify-chinese-supplier">supplier evidence matrix</Link> and{' '}
              <Link href="/blog/quality-control-checklist">quality checkpoint worksheet</Link> to prepare the questions for your order.</>}
            </p>
            <p className="editorial-body mt-5">Sourcing Lab USA coordinates the commercial brief and the agreed workflow. Factory audits, product testing, inspections, freight and customs work are coordinated with appointed specialists where needed; the quotation identifies the scope and responsibilities. Current projects are contracted through France or China.</p>
            {page.references && <aside className="mt-8 rounded-xl border border-brand-line p-6" aria-label="Official references">
              <h3 className="font-semibold">Official references</h3>
              {page.reviewedDate && <p className="mt-2 text-sm">References checked <time dateTime={page.reviewedDate}>{page.reviewedDate}</time>. Verify requirements and rates for the exact product and entry date.</p>}
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">{page.references.map(reference => <li key={reference.url}><a className="underline" href={reference.url}>{reference.title}</a></li>)}</ul>
            </aside>}
          </div>
        </section>

        <section className="editorial-section">
          <div className="editorial-container service-overview-layout">
            <div>
              <p className="editorial-kicker">RELATED RESOURCES</p>
              <h2 className="editorial-title">
                {marketEntry ? 'Resources for your U.S. launch plan.' : 'Resources for your sourcing brief.'}
              </h2>
            </div>
            <div className="resource-links">
              {page.relatedPages.map((related) => (
                <Link key={related.href} href={related.href}>
                  <div>
                    <h3>{related.title}</h3>
                    <p>{related.description}</p>
                  </div>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-section faq-section section-ruled">
          <div className="editorial-container faq-layout">
            <div>
              <p className="editorial-kicker">QUESTIONS, ANSWERED</p>
              <h2 className="editorial-title">
                Questions about {page.offerName.toLowerCase()}.
              </h2>
            </div>
            <div className="faq-list">
              {page.faqs.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <BriefSection
          formLocation="service_page"
          title={page.briefTitle}
          intro={page.briefIntro}
          initialProjectType={page.showcaseCategory}
          journey={page.journey}
        />
      </main>
      <Footer />
      <StickyMobileCta journey={page.journey} />
    </div>
  );
}
