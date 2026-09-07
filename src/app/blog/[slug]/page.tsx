import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  absoluteUrl,
  breadcrumbSchema,
  pageMetadata,
  ORGANIZATION_ID,
  webpageSchema,
} from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BriefSection } from '@/components/BriefSection';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { getPostBySlug, getPostSlugs, getPostSections } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return pageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
      article: { published: post.date, modified: post.updated ?? post.date },
    });
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;

  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const path = `/blog/${slug}`;
  const { intro, sections } = getPostSections(post.content);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webpageSchema(path, post.title, post.excerpt),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Sourcing guides', path: '/blog' },
        { name: post.title, path },
      ]),
      {
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(path)}#article`,
        headline: post.title,
        description: post.excerpt,
        mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
        url: absoluteUrl(path),
        inLanguage: 'en-US',
        author: {
          '@type': 'Organization',
          '@id': ORGANIZATION_ID,
          name: post.author,
          url: absoluteUrl('/about'),
        },
        publisher: { '@id': ORGANIZATION_ID },
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09]">
      <StructuredData data={jsonLd} />
      <Navbar area="marketing" />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap gap-2 text-sm text-[#a0aca5]"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-white">
              Sourcing guides
            </Link>
            <span aria-hidden="true">/</span>
            <span>Article</span>
          </nav>
          <header className="mb-12">
            <time
              dateTime={post.date}
              className="text-sm text-[#70e1b2] font-semibold tracking-wider uppercase"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-[#94a198]">
              By{' '}
              <Link
                href="/about"
                className="underline underline-offset-4 hover:text-white"
              >
                {post.author}
              </Link>
            </p>
            {post.updated && (
              <p className="mt-3 text-sm text-[#a0aca5]">
                Updated{' '}
                <time dateTime={post.updated}>
                  {new Date(`${post.updated}T12:00:00Z`).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    },
                  )}
                </time>
              </p>
            )}
            <p className="mt-6 text-lg leading-8 text-[#cbd5ce]">
              {post.excerpt}
            </p>
          </header>
          {sections.length > 0 && (
            <nav
              aria-label="On this page"
              className="mb-12 rounded-2xl border border-white/10 bg-[#101710] p-6"
            >
              <h2 className="text-sm font-bold text-white">In this guide</h2>
              <ol className="mt-4 space-y-3 text-sm text-[#c7ff6b]">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose prose-invert prose-lg mx-auto max-w-none prose-h2:text-white prose-a:text-[#c7ff6b] hover:prose-a:text-[#d6ff91] prose-p:text-[#94a198] prose-li:text-[#94a198]">
            <ReactMarkdown>{intro}</ReactMarkdown>
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h2>{section.title}</h2>
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </section>
            ))}
          </div>
        </article>
        <BriefSection
          formLocation="blog_post"
          title="Turn this into a real quotation."
          intro="Send the product, quantity, references, destination, and timing. We review the project and come back with the right next step."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
