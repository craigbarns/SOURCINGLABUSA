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
const title = 'Product Sourcing Resources, Tools and Templates';
const description =
  'Prepare a product sourcing brief, compare supplier quotations, review supplier evidence and estimate landed costs with free worksheets and practical guides.';

const directAnswer =
  'These free resources help U.S. business buyers prepare an overseas sourcing and product supply project: define the product, compare supplier quotations, review supplier evidence and document landed-cost assumptions. Start with the sourcing brief, then use the relevant worksheets before approving samples or an order. Separate manufacturer market-entry resources are available further down this page.';

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
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Landed cost calculator',
                    url: absoluteUrl('/tools/landed-cost-calculator'),
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Manufacturing cost comparison worksheet',
                    url: absoluteUrl('/resources/manufacturing-cost-comparison.txt'),
                  },
                  ...posts.map((post, index) => ({
                    '@type': 'ListItem',
                    position: index + 4,
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
              Prepare your sourcing project
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
            <div className="detail-card-grid mt-10">
              <article className="detail-card"><h2>Landed cost calculator</h2><p>Use your own product, freight, duty and fee assumptions. All inputs stay in the browser.</p><Link href="/tools/landed-cost-calculator" className="editorial-text-link mt-4">Calculate a scenario <ArrowUpRight size={16} aria-hidden="true" /></Link></article>
              <article className="detail-card"><h2>Supplier evidence and quality checkpoints</h2><p>Document the supplier information, sample references and checks needed for your order.</p><ul className="mt-4 space-y-3"><li><Link href="/blog/verify-chinese-supplier" className="underline">Supplier evidence matrix</Link></li><li><Link href="/blog/quality-control-checklist" className="underline">Quality checkpoint worksheet</Link></li></ul></article>
              <article className="detail-card"><h2>Manufacturing cost comparison</h2><p>Compare supplier offers on a consistent basis, including quantities, tooling, packaging and delivery assumptions.</p><a href="/resources/manufacturing-cost-comparison.txt" download className="editorial-text-link mt-4">Download the worksheet <ArrowDown size={16} aria-hidden="true" /></a></article>
            </div>
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
        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <aside className="rounded-xl border border-brand-line p-6" aria-label="Additional resources for international manufacturers">
              <h2 className="text-xl font-medium">Also available for international manufacturers</h2>
              <p className="editorial-body mt-3">If you manufacture overseas and are preparing to approach American buyers, use the separate <Link href="/tools/us-market-entry-assessment" className="underline">U.S. market entry readiness assessment</Link>, <a href="/resources/us-market-entry-checklist.txt" download className="underline">market entry checklist</a> and <a href="/resources/distributor-evaluation-scorecard.txt" download className="underline">distributor evaluation scorecard</a>. For that inquiry, start with <Link href="/us-market-entry" className="underline">manufacturer market-entry support</Link>.</p>
            </aside>
          </div>
        </section>
        <BriefSection
          formLocation="resources_hub"
          title="Request a sourcing quote."
          intro="Send the product, quantity, references, destination and timing. We confirm what can be quoted and sampled, and reply by email."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
