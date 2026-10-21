import { analyticsBootstrap } from '@/lib/analytics-bootstrap';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import { StructuredData } from '@/components/StructuredData';
import { AnalyticsConsent } from '@/components/AnalyticsConsent';
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
    default: '美国市场准入与商业代表 | Sourcing Lab USA',
    template: '%s | Sourcing Lab USA',
  },
  description:
    '为国际制造企业准备美国市场拓展：客户与渠道研究、商业资料和商业代表合作。当前项目通过法国或中国公司签约；迈阿密扩展计划于2027年开展。',
  alternates: {
    canonical: `${marketingOrigin}/zh`,
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
    locale: 'zh_CN',
    alternateLocale: ['en_US', 'es_US'],
    siteName: 'Sourcing Lab USA',
    url: `${marketingOrigin}/zh`,
    title: '美国市场准入与商业代表 | Sourcing Lab USA',
    description:
      '为国际制造企业准备美国市场拓展：客户与渠道研究、商业资料和商业代表合作。当前项目通过法国或中国公司签约；迈阿密扩展计划于2027年开展。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '美国市场准入与商业代表 | Sourcing Lab USA',
    description:
      '为国际制造企业准备美国市场拓展：客户与渠道研究、商业资料和商业代表合作。当前项目通过法国或中国公司签约；迈阿密扩展计划于2027年开展。',
  },
};

export default function ChineseRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hans" className={inter.variable}>
      <head>
        <Script id="google-analytics" strategy="beforeInteractive">
          {analyticsBootstrap([marketingOrigin, appOrigin])}
        </Script>
      </head>
      <body className="min-h-screen bg-brand-paper text-brand-ink antialiased font-sans">
        <StructuredData data={organizationGraph()} />
        {children}
        <AnalyticsConsent locale="zh" />
      </body>
    </html>
  );
}
