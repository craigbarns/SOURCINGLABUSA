import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SourcingLab USA',
    short_name: 'SourcingLab',
    description:
      'China sourcing and product supply. Clothing, sportswear, packaging and labels. Projects open now, with invoicing from France or China.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5ef',
    theme_color: '#f7f5ef',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/sourcinglab-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/sourcinglab-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
