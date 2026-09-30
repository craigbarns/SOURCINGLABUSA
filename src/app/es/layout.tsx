import { analyticsBootstrap } from '@/lib/analytics-bootstrap';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import { StructuredData } from '@/components/StructuredData';
import { homeLanguages, organizationGraph } from '@/lib/seo';

import '../globals.css';

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
    default: 'Sourcing Global y Entrada al Mercado de EE. UU. | Sourcing Lab USA',
    template: '%s | Sourcing Lab USA',
  },
  description:
    'Ayudamos a empresas estadounidenses a buscar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos. Verificación directa de fábricas, control de calidad y representación comercial.',
  alternates: {
    canonical: `${marketingOrigin}/es`,
    languages: homeLanguages,
  },
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
    locale: 'es_US',
    alternateLocale: ['en_US'],
    siteName: 'Sourcing Lab USA',
    url: `${marketingOrigin}/es`,
    title: 'Sourcing Global y Entrada al Mercado de EE. UU. | Sourcing Lab USA',
    description:
      'Ayudamos a empresas estadounidenses a buscar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos. Verificación directa de fábricas, control de calidad y representación comercial.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sourcing Global y Entrada al Mercado de EE. UU. | Sourcing Lab USA',
    description:
      'Ayudamos a empresas estadounidenses a buscar y fabricar en el extranjero, y ayudamos a fabricantes internacionales a entrar, distribuir y crecer en el mercado de Estados Unidos. Verificación directa de fábricas, control de calidad y representación comercial.',
  },
};

export default function SpanishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-US" className={inter.variable}>
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
