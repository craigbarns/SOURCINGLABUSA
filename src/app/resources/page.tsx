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
const title = 'China Sourcing Resources: Templates, Checklists and Guides';
const description =
  'Free templates and practical guides for sourcing from China: the brief a supplier can quote, minimum quantities, landed cost, textile and packaging specifications.';

const directAnswer =
  'These resources cover what a U.S. company needs before ordering from China: the brief a supplier can quote from, how minimum order quantities are set, how landed cost is built up, and what a clothing or packaging specification has to state. They are written to be used during a project rather than read once.';

/**
 * Guides grouped by the decision they support, rather than by publication
 * date. Slugs are the existing /blog URLs: this hub gathers them without
 * moving anything, so no redirect or lost ranking is involved.
 */
const clusters = [
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
    ],
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
              What to settle
              <br />
              <em>before you order.</em>
            </h1>
            <p className="direct-answer">{directAnswer}</p>
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
          </div>
        </section>

        {grouped.map((cluster) =>
          cluster.posts.length === 0 ? null : (
            <section key={cluster.name} className="editorial-section section-ruled">
              <div className="editorial-container">
                <p className="editorial-kicker">{cluster.name.toUpperCase()}</p>
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
