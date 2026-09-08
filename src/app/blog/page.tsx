import { StructuredData } from '@/components/StructuredData';
import {
  absoluteUrl,
  pageMetadata,
  webpageSchema,
  breadcrumbSchema,
} from '@/lib/seo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BriefSection } from '@/components/BriefSection';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { getAllPosts } from '@/lib/blog';

const title = 'China Sourcing Guides: Clothing, Packaging & Product Briefs';
const description =
  'Practical guides to China product sourcing, clothing specifications, custom packaging and quotation requests. Prepare your next product brief.';
export const metadata = pageMetadata({ title, description, path: '/blog' });

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...remaining] = posts;

  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              ...webpageSchema('/blog', title, description),
              '@type': 'CollectionPage',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: posts.map((post, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: post.title,
                  url: absoluteUrl(`/blog/${post.slug}`),
                })),
              },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Sourcing guides', path: '/blog' },
            ]),
          ],
        }}
      />
      <Navbar area="marketing" />

      <main className="flex-1">
        <section className="editorial-section">
          <div className="editorial-container">
            <p className="editorial-kicker">THE SOURCING JOURNAL</p>
            <h1 className="editorial-title page-title">
              Good products start
              <br />
              <em>with better questions.</em>
            </h1>
            <p className="editorial-body page-intro">
              Practical planning guides for China sourcing, clothing, packaging
              and product supply. Start with a clear brief, compare proposals,
              and document the decisions that matter.
            </p>
            {featured && (
              <article className="journal-hero">
                <div>
                  <p className="editorial-kicker">FEATURED GUIDE</p>
                  <h2>
                    <Link href={`/blog/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>
                  <p>{featured.excerpt}</p>
                  <Link
                    className="editorial-text-link mt-5"
                    href={`/blog/${featured.slug}`}
                  >
                    Read the guide <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>

              </article>
            )}
          </div>
        </section>
        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <p className="editorial-kicker">EXPLORE THE JOURNAL</p>
            <h2 className="editorial-title">
              Notes for <em>your next project.</em>
            </h2>
            <div className="journal-grid">
              {remaining.map((post) => (
                <article key={post.slug} className="journal-card">

                  <time dateTime={post.date} className="journal-date">
                    {new Date(`${post.date}T12:00:00Z`).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                      },
                    )}
                  </time>
                  <h3 className="mt-4 text-[22px] font-medium leading-snug tracking-[-0.035em]">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="editorial-text-link mt-4"
                  >
                    Read the guide <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <BriefSection
          formLocation="blog_index"
          title="Have a product sourcing project?"
          intro="Guides only take you so far. Send the product, quantity, references, destination, and timing, and we will confirm what can be quoted and sampled."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
