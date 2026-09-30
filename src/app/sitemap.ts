import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';
import { homeLanguages } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const { marketingOrigin } = getDomainRoutingConfig();
  const posts = getAllPosts();

  const serviceUrls = [
    '/product-sourcing',
    '/china-sourcing',
    '/china-sourcing-agent',
    '/supplier-sourcing',
    '/factory-verification',
    '/supplier-audit-china',
    '/product-development',
    '/private-label-manufacturing',
    '/quality-control-china',
    '/packaging-sourcing',
    '/custom-packaging',
    '/custom-textile',
    '/sportswear-sourcing',
    '/private-label-packaging',
    '/china-to-us-procurement',
    '/import-from-china',
    '/freight-logistics',
    '/hs-code-consulting',
    '/landed-cost-analysis',
    '/us-market-entry',
    '/market-entry-consulting',
    '/us-sales-representation',
    '/industries/packaging',
    '/industries/textiles',
    '/industries/consumer-products',
    '/industries/building-materials',
    '/industries/furniture',
    '/industries/private-label',
    '/tools/hs-code-finder',
  ].map((path) => ({
    url: `${marketingOrigin}${path}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogUrls = posts.map((post) => ({
    url: `${marketingOrigin}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date)
      .toISOString()
      .split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${marketingOrigin}/`,
      alternates: { languages: homeLanguages },
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${marketingOrigin}/es`,
      alternates: { languages: homeLanguages },
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${marketingOrigin}/zh`,
      alternates: { languages: homeLanguages },
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${marketingOrigin}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${marketingOrigin}/about`, lastModified: '2026-09-14' },
    ...['/how-we-work', '/editorial-policy', '/contact-us'].map((path) => ({
      url: `${marketingOrigin}${path}`,
      lastModified: '2026-09-14',
    })),
    ...serviceUrls,
    ...blogUrls,
    {
      url: `${marketingOrigin}/resources`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${marketingOrigin}/resources/product-sourcing-brief`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${marketingOrigin}/privacy`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
