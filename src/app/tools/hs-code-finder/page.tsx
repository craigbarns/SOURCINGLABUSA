import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HsCodeAnalyzer } from '@/components/tools/HsCodeAnalyzer';

export const metadata: Metadata = {
  title: 'Free AI HS Code Finder & Duty Calculator | Sourcing Lab USA',
  description: 'Instantly find the correct Harmonized System (HS) code for your custom packaging and textiles. Calculate import duties and tariffs from China to the U.S.',
};

export default function HsCodeFinderPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI HS Code Finder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'AI-powered tool to find HS codes and calculate import duties for custom packaging and textiles imported into the United States.',
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar area="marketing" />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 sm:py-32">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#70e1b2]/20 bg-[#70e1b2]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#70e1b2]">
              Free AI Tool
            </span>
            <h1 className="text-balance mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Find Your HS Code & Calculate Import Duties instantly
            </h1>
            <p className="mt-5 text-base leading-7 text-[#94a198]">
              Don't let surprise tariffs destroy your margins. Describe your product, and our AI will identify the correct Harmonized System (HS) code and estimate U.S. import duties.
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-[26px] bg-[#0a0e0c] p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <HsCodeAnalyzer />
          </div>

          <div className="mx-auto max-w-3xl mt-24 prose prose-invert prose-p:text-[#94a198]">
            <h2 className="text-white text-2xl font-bold mb-4">Why finding the right HS Code is critical</h2>
            <p>
              When importing custom merchandise or packaging into the United States, Customs and Border Protection (CBP) requires a specific 10-digit classification number known as an HS Code. This code dictates exactly how much duty and tariff you will pay.
            </p>
            <p>
              A single digit difference can mean the difference between a 0% tax rate and a 25% tax rate. 
              Our <strong>AI HS Code Finder</strong> leverages advanced models to analyze your product's materials, purpose, and construction, matching it against the official US HTS (Harmonized Tariff Schedule).
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
