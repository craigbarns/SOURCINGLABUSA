import type { Metadata } from 'next';

import { AppDashboard } from '@/components/AppDashboard';
import { EditorialFooter } from '@/components/EditorialFooter';
import { Navbar } from '@/components/Navbar';
import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

const { appOrigin } = getDomainRoutingConfig();

export const metadata: Metadata = {
  title: 'Supplier Sourcing Workspace',
  description:
    'Audit supplier quotes, build product specifications, estimate landed costs, review customs classifications, and prepare supplier outreach.',
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
    <div className="editorial-shell min-h-screen">
      <a
        href="#app-workspace"
        className="sr-only z-[100] rounded-lg bg-brand-sage px-4 py-2 font-bold text-brand-ink focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Skip to workspace
      </a>
      <Navbar area="app" />
      <div id="app-workspace">
        <AppDashboard marketingHref="/marketing" />
      </div>
      <EditorialFooter linkPrefix="/marketing" />
    </div>
  );
}
