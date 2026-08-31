import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Sourcing Lab USA',
  description: 'Insights, guides, and trends on custom packaging and textile sourcing for U.S. brands.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09]">
      <Navbar area="marketing" />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          <div className="max-w-2xl">
            <span className="eyebrow">Insights & Guides</span>
            <h1 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              The Sourcing Resource Center
            </h1>
            <p className="mt-5 text-base leading-7 text-[#94a198]">
              Expert advice on custom packaging, textile manufacturing, compliance, and supply chain strategies.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative flex flex-col items-start justify-between rounded-[26px] bg-[#0a0e0c] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-[#111714]">
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
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#c7ff6b]">
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#94a198]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-white">
                      {post.author}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
