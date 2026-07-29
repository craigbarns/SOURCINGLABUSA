import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

export default function robots(): MetadataRoute.Robots {
  const { marketingOrigin } = getDomainRoutingConfig();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/app', '/api/'],
    },
    sitemap: `${marketingOrigin}/sitemap.xml`,
    host: marketingOrigin,
  };
}
