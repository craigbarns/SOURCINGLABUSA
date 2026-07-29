import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SourcingLab USA',
    short_name: 'SourcingLab',
    description:
      'Compare supplier quotes, model landed cost, and prepare your next sourcing move.',
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
