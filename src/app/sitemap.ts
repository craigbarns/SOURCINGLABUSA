import type { MetadataRoute } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

export default function sitemap(): MetadataRoute.Sitemap {
  const { marketingOrigin } = getDomainRoutingConfig();

  return [
    {
      url: marketingOrigin,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
