import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SourcingLab USA',
    short_name: 'SourcingLab',
    description:
      'Custom packaging and textile products. U.S. market launch planned for Miami in 2027.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070a09',
    theme_color: '#070a09',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
