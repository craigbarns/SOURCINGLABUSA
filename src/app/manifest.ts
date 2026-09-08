import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SourcingLab USA',
    short_name: 'SourcingLab',
    description:
      'China sourcing and product supply. Clothing, packaging and other products on request. U.S. launch planned for Miami in 2027.',
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
