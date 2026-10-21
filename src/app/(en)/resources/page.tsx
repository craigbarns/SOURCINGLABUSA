import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { BriefSection } from '@/components/BriefSection';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { StructuredData } from '@/components/StructuredData';
import { getAllPosts } from '@/lib/blog';
import {
  absoluteUrl,
  breadcrumbSchema,
  pageMetadata,
  webpageSchema,
} from '@/lib/seo';

const path = '/resources';
const title = 'Sourcing & U.S. Market Entry Resources, Tools and Templates';
const description =
  'Free sourcing worksheets, a landed cost calculator and U.S. market entry readiness assessment. Prepare supplier quotations and an evidence-based buyer outreach plan.';

const directAnswer =
  'Free working resources for both commercial directions: sourcing briefs, supplier evidence and cost comparisons for U.S. buyers, plus a readiness assessment and channel preparation worksheets for international manufacturers targeting American customers. Use them to document assumptions and open questions before committing to an order or commercial campaign.';

/**
 * Guides grouped by the decision they support, rather than by publication
 * date. Slugs are the existing /blog URLs: this hub gathers them without
 * moving anything, so no redirect or lost ranking is involved.
 */
const clusters = [
  {
    name: 'Find and qualify suppliers',
    slugs: ['china-sourcing-guide-us-businesses', 'verify-chinese-supplier', 'alibaba-vs-sourcing-company'],
  },
  {
    name: 'Before you request a quotation',
    slugs: ['china-sourcing-rfq-checklist', 'custom-packaging-moq-guide'],
  },
  {
    name: 'Clothing and textiles',
    slugs: ['apparel-sourcing-tech-packs-moq', 'sustainable-textile-sourcing'],
  },
  {
    name: 'Packaging',
    slugs: ['sustainable-packaging-ecommerce'],
  },
  {
    name: 'Cost, import and compliance',
    slugs: [
      'calculating-landed-costs-merchandise',
      'importing-textiles-usa-checklist',
      'sourcing-agent-fees',
    ],
  },
  {
    name: 'Production and project preparation',
    slugs: ['quality-control-checklist', 'canton-fair-sourcing-guide', 'building-materials-sourcing-brief'],
  },
];

export const metadata = pageMetadata({ title, description, path });

export default function ResourcesPage() {
  const posts = getAllPosts();
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const grouped = clusters.map((cluster) => ({
    name: cluster.name,
    posts: cluster.slugs
      .map((slug) => bySlug.get(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post)),
  }));
  // Anything published but not yet placed in a cluster still gets a home.
  const placed = new Set(clusters.flatMap((cluster) => cluster.slugs));
  const unplaced = posts.filter((post) => !placed.has(post.slug));

  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              ...webpageSchema(path, title, description, 'en-US', {
                abstract: directAnswer,
              }),
              '@type': 'CollectionPage',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Product sourcing brief template',
                    url: absoluteUrl('/resources/product-sourcing-brief'),
                  },
                  ...posts.map((post, index) => ({
                    '@type': 'ListItem',
                    position: index + 2,
                    name: post.title,
                    url: absoluteUrl(`/blog/${post.slug}`),
                  })),
                ],
              },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Sourcing resources', path },
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
              <span>Sourcing resources</span>
            </nav>
            <p className="editorial-kicker">TEMPLATES &amp; GUIDES</p>
            <h1 className="editorial-title page-title">
              What to document
              <br />
              <em>before you commit.</em>
            </h1>
            <p className="direct-answer">{directAnswer}</p>
            <p className="editorial-body">
              Start with the <Link href="/blog/china-sourcing-guide-us-businesses">China sourcing workflow</Link>, then use the worksheets at each decision.
              {' '}Read <Link href="/how-we-work">our supply method</Link> and <Link href="/editorial-policy">how sources and examples are presented</Link>.
            </p>
          </div>
        </section>

        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <div className="detail-card-grid mb-10">
              <article className="detail-card"><h2>Landed cost calculator</h2><p>Use your own product, freight, duty and fee assumptions. All inputs stay in the browser.</p><Link href="/tools/landed-cost-calculator" className="editorial-text-link mt-4">Calculate a scenario <ArrowUpRight size={16} aria-hidden="true" /></Link></article>
              <article className="detail-card"><h2>U.S. market entry readiness</h2><p>Eight questions about the documents and decisions needed before approaching American buyers.</p><Link href="/tools/us-market-entry-assessment" className="editorial-text-link mt-4">Assess your preparation <ArrowUpRight size={16} aria-hidden="true" /></Link></article>
              <article className="detail-card"><h2>Manufacturer preparation worksheets</h2><p>Plain-text working templates, available without registration.</p><ul className="mt-4 space-y-3"><li><a href="/resources/us-market-entry-checklist.txt" download className="underline">U.S. market entry checklist</a></li><li><a href="/resources/distributor-evaluation-scorecard.txt" download className="underline">Distributor evaluation scorecard</a></li><li><a href="/resources/manufacturing-cost-comparison.txt" download className="underline">Manufacturing cost comparison</a></li></ul></article>
            </div>
            <article className="resource-feature">
              <div>
                <p className="editorial-kicker">START HERE · FREE TEMPLATE</p>
                <h2 className="editorial-title">The product sourcing brief.</h2>
                <p className="editorial-body">
                  The document a supplier quotes from: product, reference,
                  materials, quantity by variant, samples, destination and
                  timing, with unresolved details marked rather than guessed.
                  Plain text, no sign-up.
                </p>
                <div className="hero-actions">
                  <Link
                    href="/resources/product-sourcing-brief"
                    className="editorial-button"
                  >
                    Read and download
                    <ArrowDown size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {grouped.map((cluster) =>
          cluster.posts.length === 0 ? null : (
            <section key={cluster.name} className="editorial-section section-ruled">
              <div className="editorial-container">
                <h2 className="editorial-kicker">{cluster.name.toUpperCase()}</h2>
                <div className="resource-list">
                  {cluster.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="resource-row"
                    >
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <span aria-hidden="true">
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ),
        )}

        {unplaced.length > 0 && (
          <section className="editorial-section section-ruled">
            <div className="editorial-container">
              <p className="editorial-kicker">ALSO PUBLISHED</p>
              <div className="resource-list">
                {unplaced.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="resource-row"
                  >
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span aria-hidden="true">
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <h2 className="editorial-title">Product-specific preparation notes.</h2>
            <p className="editorial-body mt-5">Use these briefs to document the exact product before a feasibility review. They do not represent a stock catalog or a commitment to supply every category.</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              <li><Link className="editorial-text-link" href="/industries/textiles">Textile collection planning ↗</Link></li>
              <li><Link className="editorial-text-link" href="/industries/private-label">Private label assortment and channels ↗</Link></li>
              <li><Link className="editorial-text-link" href="/industries/consumer-products">Consumer product feasibility ↗</Link></li>
              <li><Link className="editorial-text-link" href="/industries/building-materials">Specified building materials requests ↗</Link></li>
              <li><Link className="editorial-text-link" href="/industries/furniture">Furniture drawings and prototypes ↗</Link></li>
            </ul>
          </div>
        </section>
        <BriefSection
          formLocation="resources_hub"
          title="Ready to put a brief together?"
          intro="Send the product, quantity, references, destination and timing. We confirm what can be quoted and sampled, and reply by email."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
