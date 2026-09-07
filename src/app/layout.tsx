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
    default: 'China Sourcing & Product Supply | Sourcing Lab USA',
    template: '%s | Sourcing Lab USA',
  },
  description:
    'China sourcing and product supply for U.S. business customers. Clothing, packaging and other products on request. Miami launch planned for 2027.',
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
      'Clothing, packaging and other products sourced from China. Product purchase and supply for U.S. businesses, with a Miami launch planned for 2027.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Sourcing & Product Supply | Sourcing Lab USA',
    description:
      'Clothing, packaging and other products sourced from China. Product purchase and supply for U.S. businesses, with a Miami launch planned for 2027.',
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
      <body className="min-h-screen bg-[#070a09] text-gray-100 antialiased font-sans">
        <StructuredData data={organizationGraph()} />
        {children}
      </body>
    </html>
  );
}
