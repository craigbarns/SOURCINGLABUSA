import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Sourcing Lab USA`,
      description: post.excerpt,
    };
  } catch (e) {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  let post;
  
  try {
    post = getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.date,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar area="marketing" />
      
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          <header className="mb-16 text-center">
            <time dateTime={post.date} className="text-sm text-[#70e1b2] font-semibold tracking-wider uppercase">
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
              By {post.author}
            </p>
          </header>

          <div className="prose prose-invert prose-lg mx-auto max-w-none prose-h2:text-white prose-a:text-[#c7ff6b] hover:prose-a:text-[#d6ff91] prose-p:text-[#94a198] prose-li:text-[#94a198]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
