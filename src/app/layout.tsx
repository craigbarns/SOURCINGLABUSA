import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import './globals.css';

const { marketingOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  metadataBase: new URL(marketingOrigin),
  applicationName: 'SourcingLab USA',
  manifest: '/manifest.webmanifest',
  title: {
    default: 'Custom Packaging & Textile | Sourcing Lab USA',
    template: '%s | SourcingLab USA',
  },
  description:
    'Custom packaging and textile products for brands, e-commerce businesses, and companies. U.S. market launch planned for Miami in 2027.',
  keywords: [
    'custom packaging',
    'custom textile',
    'product sourcing',
    'China sourcing',
    'B2B packaging',
    'textile sourcing',
    'direct delivery',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SourcingLab USA',
    url: marketingOrigin,
    title: 'Custom Packaging & Textile | Sourcing Lab USA',
    description:
      'Custom packaging and textile products sourced through an established China partnership. Miami launch planned for 2027.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Packaging & Textile | Sourcing Lab USA',
    description:
      'Custom packaging and textile products sourced through an established China partnership. Miami launch planned for 2027.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="dark">
      <body className="min-h-screen bg-[#070a09] text-gray-100 antialiased">{children}</body>
    </html>
  );
}
