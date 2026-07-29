import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import './globals.css';

const { marketingOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  metadataBase: new URL(marketingOrigin),
  applicationName: 'SourcingLab USA',
  manifest: '/manifest.webmanifest',
  title: {
    default: 'AI Factory Quote Analyzer | SourcingLab USA',
    template: '%s | SourcingLab USA',
  },
  description:
    'Turn supplier quotes into comparable costs, risk flags, landed-cost estimates, and ready-to-review RFQs. Try SourcingLab USA in minutes.',
  keywords: [
    'factory quote analyzer',
    'supplier quote comparison',
    'landed cost calculator',
    'product sourcing',
    'supplier negotiation',
    'HS code research',
    'procurement software',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SourcingLab USA',
    url: marketingOrigin,
    title: 'AI Factory Quote Analyzer | SourcingLab USA',
    description:
      'Compare factory quotes, surface costly gaps, and prepare your next supplier move.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Factory Quote Analyzer | SourcingLab USA',
    description:
      'Compare factory quotes, surface costly gaps, and prepare your next supplier move.',
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
