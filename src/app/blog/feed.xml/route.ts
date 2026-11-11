import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, SITE_NAME } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * RSS 2.0 feed for the sourcing guides. Blog posts are the dated content of
 * the site, and a feed gives AI systems and readers a machine-readable way
 * to discover what is new without crawling.
 */
export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const pubDate = new Date(post.date).toUTCString();
      const lastBuild = post.updated
        ? `\n      <lastBuildDate>${new Date(post.updated).toUTCString()}</lastBuildDate>`
        : '';
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      <pubDate>${pubDate}</pubDate>${lastBuild}
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} — sourcing guides</title>
    <link>${absoluteUrl('/resources')}</link>
    <description><![CDATA[Guides on custom packaging, textiles, supplier verification and order preparation, written by the Sourcing Lab USA team.]]></description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl('/blog/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
