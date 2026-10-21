import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

export default function robots(): MetadataRoute.Robots {
  const { marketingOrigin } = getDomainRoutingConfig();
  const publicContentRules = {
    allow: '/',
    disallow: ['/app', '/api/'],
  };

  return {
    rules: [
      { userAgent: '*', ...publicContentRules },
      {
        // Preserve the existing wildcard policy explicitly for OpenAI agents.
        // GPTBot stays allowed on public content; this does not opt out of training.
        // Every group keeps the same app/API exclusions.
        userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot'],
        ...publicContentRules,
      },
    ],
    sitemap: `${marketingOrigin}/sitemap.xml`,
    host: marketingOrigin,
  };
}
