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
  eyebrow: string;
  title: string;
  intro: string;
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
  relatedPages: Array<{
    href: string;
    title: string;
    description: string;
  }>;
};

export function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      webpageSchema(page.path, page.title, page.intro),
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
                <p className="editorial-body page-intro">{page.intro}</p>
                <CtaLink
                  href="#contact"
                  location="service_hero"
                  label="Share your project brief"
                  className="editorial-button mt-8"
                >
                  Share your project brief{' '}
                  <ArrowRight size={17} aria-hidden="true" />
                </CtaLink>
              </div>
              <aside className="sourcing-overview" aria-label="Project and supply information">
                <p className="editorial-kicker">SOURCING LAB USA / YOUR PROJECT</p>
                <h2>{page.offerName}</h2>
                <p className="editorial-body">{page.offerDescription}</p>
                <p className="editorial-body mt-5">
                  For U.S. business customers. Projects can start now through our
                  independent China sourcing partnership.
                </p>
                <p className="sourcing-overview-note">
                  Your quotation identifies the company in France or China that
                  contracts with you and invoices the products.
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
              <p className="editorial-kicker">DESIGNED AROUND THE PRODUCT</p>
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

        <ProductShowcase category={page.showcaseCategory} />

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
            <p className="editorial-body mt-8">
              Review the product specifications, sample requirements, quantities,
              product pricing and payment terms before approving your order.
              Delivery and import responsibilities are agreed for each project.{' '}
              <Link href="/china-to-us-procurement#order-terms" className="editorial-text-link">
                See how product supply and order terms work
              </Link>.
            </p>
          </div>
        </section>

        <section className="editorial-section">
          <div className="editorial-container service-overview-layout">
            <div>
              <p className="editorial-kicker">RELATED RESOURCES</p>
              <h2 className="editorial-title">
                Resources for your sourcing brief.
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
        />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
}
