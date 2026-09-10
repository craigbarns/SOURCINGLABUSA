import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BriefSection } from '@/components/BriefSection';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { HsCodeAnalyzer } from '@/components/tools/HsCodeAnalyzer';

export const metadata: Metadata = {
  title: 'Preliminary HS Code Research Helper',
  description:
    'An AI-assisted starting point for product-classification research. Verify classifications, duty rates, and import requirements with current official sources before importing.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HsCodeFinderPage() {
  return (
    <div className="editorial-shell workspace-page flex min-h-screen flex-col">
      <Navbar area="marketing" />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-green">
              Free AI Tool
            </span>
            <h1 className="text-balance mt-6 text-3xl font-medium tracking-[-0.045em] text-brand-ink sm:text-5xl">
              Preliminary HS code research — verify before importing
            </h1>
            <p className="mt-5 text-base leading-7 text-brand-muted">
              Describe your product to generate possible classification
              questions and a starting point for research. This tool does not
              determine an HS code, duty rate, or import requirement.
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-[4px] bg-brand-surface p-6 sm:p-10 ">
            <HsCodeAnalyzer />
          </div>

          <div className="mx-auto max-w-3xl mt-24 prose editorial-prose">
            <h2 className="text-brand-ink text-2xl font-bold mb-4">
              Use this as a starting point, not an import decision
            </h2>
            <p>
              U.S. product classification and duty treatment depend on the exact
              product, materials, construction, use, country of origin, and the
              current tariff schedule. A product description alone may not
              provide enough information to make a reliable classification.
            </p>
            <p>
              Confirm any classification and current rate using the official
              U.S. Harmonized Tariff Schedule and, when necessary, qualified
              customs or legal advice. Sourcing Lab USA does not provide customs
              brokerage, legal advice, or binding tariff determinations.
            </p>
          </div>
        </div>
        <BriefSection
          formLocation="hs_code_tool"
          title="Need the product itself sourced?"
          intro="Classification research is only one step. Send the product, quantity, finish, and destination, and we will confirm what can be quoted and sampled."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
