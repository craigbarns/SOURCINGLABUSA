import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BriefSection } from '@/components/BriefSection';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { StructuredData } from '@/components/StructuredData';
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORY_LABELS,
  caseStudySummary,
  getCaseStudy,
} from '@/lib/case-studies';
import { breadcrumbSchema, pageMetadata, webpageSchema } from '@/lib/seo';

function summaryLowerFirst(summary: string): string {
  return summary.charAt(0).toLowerCase() + summary.slice(1);
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    // Provenance first: a search snippet is cut around 155 characters, and
    // where the project was delivered must survive the cut.
    description: `${study.deliveredBy} (${study.year}): ${summaryLowerFirst(caseStudySummary(study))}`,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const path = `/case-studies/${study.slug}`;
  const summary = caseStudySummary(study);

  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema(path, study.title, summary, 'en-US', {
              abstract: summary,
            }),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Case studies', path: '/case-studies' },
              { name: study.title, path },
            ]),
          ],
        }}
      />
      <Navbar area="marketing" contactHref="#contact" />

      <main className="flex-1">
        <section className="editorial-section">
          <div className="editorial-container">
            <nav aria-label="Breadcrumb" className="page-breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> / </span>
              <Link href="/case-studies">Case studies</Link>
              <span aria-hidden="true"> / </span>
              <span>{study.title}</span>
            </nav>
            <p className="editorial-kicker">
              {CASE_STUDY_CATEGORY_LABELS[study.category].toUpperCase()} · {study.year}
            </p>
            <h1 className="editorial-title page-title">{study.title}</h1>
            <p className="direct-answer">{summary}</p>
            <p className="page-note">
              {study.deliveredBy}. Written from the project’s email record; where
              the record stops, the outcome adds only what the founder confirmed.
            </p>
          </div>
        </section>

        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <p className="editorial-kicker">THE PROJECT</p>
            <h2 className="editorial-title">How it went.</h2>
            <div className="detail-card-grid mt-10">
              <article className="detail-card">
                <span className="editorial-kicker">01</span>
                <h3>The difficulty</h3>
                <p>{study.challenge}</p>
              </article>
              <article className="detail-card">
                <span className="editorial-kicker">02</span>
                <h3>What was done</h3>
                <ol>
                  {study.approach.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
              <article className="detail-card">
                <span className="editorial-kicker">03</span>
                <h3>The result</h3>
                <p>{study.outcome}</p>
                {study.figures && study.figures.length > 0 && (
                  <dl>
                    {study.figures.map((figure) => (
                      <div key={figure.label}>
                        <dt>{figure.label}</dt>
                        <dd>{figure.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            </div>
          </div>
        </section>

        <BriefSection
          formLocation="case_study"
          title="Have a similar project?"
          intro="Send the product, quantity, references, destination and timing. We confirm what can be quoted and sampled, and reply by email."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
