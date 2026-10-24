import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { BriefSection } from '@/components/BriefSection';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { StructuredData } from '@/components/StructuredData';
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORY_LABELS,
  CASE_STUDY_RECORD_LABELS,
} from '@/lib/case-studies';
import { breadcrumbSchema, pageMetadata, webpageSchema } from '@/lib/seo';

const path = '/case-studies';
const title = 'Sourcing Case Studies: Real Projects, Documented';
const description =
  'Real sourcing projects written from their email record: rigid boxes, bags and retail hangers, what went wrong and what was done about it.';

export const metadata = pageMetadata({ title, description, path });

export default function CaseStudiesPage() {
  // Unpublished until real, approved projects exist: see src/lib/case-studies.ts.
  if (CASE_STUDIES.length === 0) notFound();

  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema(path, title, description),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Case studies', path },
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
              <span>Case studies</span>
            </nav>
            <p className="editorial-kicker">CASE STUDIES</p>
            <h1 className="editorial-title page-title">
              Real projects,
              <br />
              <em>documented.</em>
            </h1>
            <p className="direct-answer">
              Each case is written from a real project’s email record: the
              product, what made it difficult and what was done. Where the record
              stops, the outcome adds only what the founder confirmed, and says
              so. Clients are described, not named, and every case carries one of
              two labels: “Founder’s record, before Sourcing Lab USA” for the
              founder’s earlier projects, or “Sourcing Lab USA project” where a
              current project record exists.
            </p>
          </div>
        </section>

        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <div className="resource-list">
              {CASE_STUDIES.map((study) => (
                <Link
                  key={study.slug}
                  href={`${path}/${study.slug}`}
                  className="resource-row"
                >
                  <h2>{study.title}</h2>
                  <p>
                    <strong>{CASE_STUDY_RECORD_LABELS[study.record]}</strong> ·{' '}
                    {CASE_STUDY_CATEGORY_LABELS[study.category]} · {study.year}
                  </p>
                  <span aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BriefSection
          formLocation="case_studies"
          title="Have a similar project?"
          intro="Send the product, quantity, references, destination and timing. We confirm what can be quoted and sampled, and reply by email."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
