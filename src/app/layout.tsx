import { analyticsBootstrap } from '@/lib/analytics-bootstrap';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import { StructuredData } from '@/components/StructuredData';
import { organizationGraph } from '@/lib/seo';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const { marketingOrigin, appOrigin } = getDomainRoutingConfig();

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
    default: 'China Sourcing & Product Supply | Sourcing Lab USA',
    template: '%s | Sourcing Lab USA',
  },
  description:
    'China sourcing and product supply for business customers. Clothing, sportswear, packaging and labels. Projects open now; invoicing from France or China.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SourcingLab USA',
    url: marketingOrigin,
    title: 'China Sourcing & Product Supply | Sourcing Lab USA',
    description:
      'Source clothing, sportswear, packaging and labels from China. Start your project now, with the invoicing company in France or China identified in your quote.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Sourcing & Product Supply | Sourcing Lab USA',
    description:
      'Source clothing, sportswear, packaging and labels from China. Start your project now, with the invoicing company in France or China identified in your quote.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={inter.variable}>
      <head>
        <Script id="google-analytics" strategy="beforeInteractive">
          {analyticsBootstrap([marketingOrigin, appOrigin])}
        </Script>
      </head>
      <body className="min-h-screen bg-brand-paper text-brand-ink antialiased font-sans">
        <StructuredData data={organizationGraph()} />
        {children}
      </body>
    </html>
  );
}
