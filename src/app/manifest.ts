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
    ],
  };
}
