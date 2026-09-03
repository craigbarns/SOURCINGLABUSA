import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const { marketingOrigin } = getDomainRoutingConfig();
  const posts = getAllPosts();

  const serviceUrls = [
    '/custom-packaging',
    '/custom-textile',
    '/private-label-packaging',
    '/china-to-us-procurement',
  ].map((path) => ({
    url: `${marketingOrigin}${path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogUrls = posts.map((post) => ({
    url: `${marketingOrigin}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date).toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: marketingOrigin,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${marketingOrigin}/es`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${marketingOrigin}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
    ...blogUrls,
  ];
}
