import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SourcingLab USA - Comparateur de devis fournisseurs',
  description: 'Source Smarter. Buy Better. Téléversez des devis fournisseurs, structurez leur contenu et contrôlez leurs montants dans un pipeline serveur sécurisé.',
  keywords: ['sourcing', 'copilot IA', 'achats', 'landed cost', 'devis PDF', 'négociation usine', 'WEMADE USA'],
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
