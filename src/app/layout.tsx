import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

import './globals.css';

const { marketingOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  metadataBase: new URL(marketingOrigin),
  applicationName: 'SourcingLab USA',
  title: {
    default: 'SourcingLab USA - Comparateur de devis fournisseurs',
    template: '%s | SourcingLab USA',
  },
  description:
    'Source Smarter. Buy Better. Téléversez des devis fournisseurs, structurez leur contenu et contrôlez leurs montants dans un pipeline serveur sécurisé.',
  keywords: ['sourcing', 'copilot IA', 'achats', 'landed cost', 'devis PDF', 'négociation usine', 'WEMADE USA'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SourcingLab USA',
    url: marketingOrigin,
    title: 'SourcingLab USA - Comparateur de devis fournisseurs',
    description:
      'Structurez et comparez vos devis fournisseurs dans un pipeline serveur sécurisé.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#08090d] text-gray-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
