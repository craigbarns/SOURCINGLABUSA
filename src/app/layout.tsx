import { Inter } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const { marketingOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  metadataBase: new URL(marketingOrigin),
  applicationName: 'SourcingLab USA',
  manifest: '/manifest.webmanifest',
  authors: [{ name: 'SourcingLab USA' }],
  creator: 'SourcingLab USA',
  publisher: 'SourcingLab USA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: 'Custom Packaging & Textile | Sourcing Lab USA',
    template: '%s | Sourcing Lab USA',
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
    'Miami custom packaging',
    'USA textile sourcing',
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
    <html lang="en-US" className={`dark ${inter.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJ0M56QGGM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZJ0M56QGGM');`}
        </Script>
      </head>
      <body className="min-h-screen bg-[#070a09] text-gray-100 antialiased font-sans">{children}</body>
    </html>
  );
}
