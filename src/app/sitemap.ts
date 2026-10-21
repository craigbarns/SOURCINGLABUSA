import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';
import { homeLanguages } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import { CASE_STUDIES } from '@/lib/case-studies';

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
    '/industries/textiles',
    '/industries/consumer-products',
    '/industries/building-materials',
    '/industries/furniture',
    '/industries/private-label',
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
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${marketingOrigin}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Only articles carry documented modification dates in their frontmatter.
    // Do not give static pages a fabricated date or refresh it on every build.
    ...['/about', '/how-we-work', '/editorial-policy', '/contact-us'].map((path) => ({
      url: `${marketingOrigin}${path}`,
    })),
    ...serviceUrls,
    ...['/tools/landed-cost-calculator', '/tools/us-market-entry-assessment'].map((path) => ({
      url: `${marketingOrigin}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogUrls,
    // Listed only once real, approved projects exist (src/lib/case-studies.ts).
    ...(CASE_STUDIES.length > 0
      ? [
          { url: `${marketingOrigin}/case-studies`, changeFrequency: 'monthly' as const, priority: 0.7 },
          ...CASE_STUDIES.map((study) => ({
            url: `${marketingOrigin}/case-studies/${study.slug}`,
            changeFrequency: 'yearly' as const,
            priority: 0.6,
          })),
        ]
      : []),
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
