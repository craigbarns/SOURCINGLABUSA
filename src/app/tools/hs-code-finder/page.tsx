import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
    <div className="flex min-h-screen flex-col bg-[#070a09]">
      <Navbar area="marketing" />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#70e1b2]">
              Free AI Tool
            </span>
            <h1 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Preliminary HS code research — verify before importing
            </h1>
            <p className="mt-5 text-base leading-7 text-[#94a198]">
              Describe your product to generate possible classification questions and a starting point for research. This tool does not determine an HS code, duty rate, or import requirement.
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-[26px] bg-[#0a0e0c] p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <HsCodeAnalyzer />
          </div>

          <div className="mx-auto max-w-3xl mt-24 prose prose-invert prose-p:text-[#94a198]">
            <h2 className="text-white text-2xl font-bold mb-4">Use this as a starting point, not an import decision</h2>
            <p>
              U.S. product classification and duty treatment depend on the exact product, materials, construction, use, country of origin, and the current tariff schedule. A product description alone may not provide enough information to make a reliable classification.
            </p>
            <p>
              Confirm any classification and current rate using the official U.S. Harmonized Tariff Schedule and, when necessary, qualified customs or legal advice. Sourcing Lab USA does not provide customs brokerage, legal advice, or binding tariff determinations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
