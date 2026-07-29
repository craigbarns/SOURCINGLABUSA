import type { Metadata } from 'next';

import { AppDashboard } from '@/components/AppDashboard';
import { Navbar } from '@/components/Navbar';
import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

const { appOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  title: 'Copilote de sourcing',
  description:
    'Espace applicatif SourcingLab USA pour structurer, contrôler et comparer des devis fournisseurs.',
  alternates: {
    canonical: appOrigin,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CopilotPage() {
  return (
    <div className="min-h-screen bg-[#08090d]">
      <Navbar area="app" />
      <AppDashboard marketingHref="/marketing" />
    </div>
  );
}
