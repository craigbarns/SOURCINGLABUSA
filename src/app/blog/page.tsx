import { StructuredData } from '@/components/StructuredData';
import {
  absoluteUrl,
  pageMetadata,
  webpageSchema,
  breadcrumbSchema,
} from '@/lib/seo';
import Link from 'next/link';
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

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09]">
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
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          <div className="max-w-2xl">
            <span className="eyebrow">Insights & Guides</span>
            <h1 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              The Sourcing Resource Center
            </h1>
            <p className="mt-5 text-base leading-7 text-[#94a198]">
              Practical planning guides for China sourcing, clothing, packaging
              and product supply. Start with a clear brief, compare product
              proposals, and document the decisions that matter.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col items-start justify-between rounded-[26px] bg-[#0a0e0c] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-[#111714]"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-[#94a198]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="group relative">
                  <h2 className="mt-3 text-lg font-bold text-white group-hover:text-[#c7ff6b]">
                    {post.title}
                  </h2>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#94a198]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-white">{post.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
