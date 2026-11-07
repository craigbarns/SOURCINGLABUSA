import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DutyAnalyzer } from '@/components/tools/DutyAnalyzer';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Duty Rate Finder for U.S. Imports',
  description:
    'Enter a product and country of manufacture: candidate HTS codes from an AI model, rates fetched live from the official USITC tariff schedule, with the date checked. Working research — your customs broker confirms.',
  path: '/duty-calculator',
});

export default function DutyCalculatorPage() {
  return (
    <div className="editorial-shell workspace-page flex min-h-screen flex-col">
      <Navbar area="marketing" contactHref="/contact-us#contact" />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <span className="inline-flex items-center rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-green">
            Free duty research tool
          </span>
          <h1 className="text-balance mt-6 text-3xl font-medium tracking-[-0.045em] text-brand-ink sm:text-5xl">
            Duty rate finder — check the tariff before you price an order
          </h1>
          <p className="mt-4 text-brand-ink/70">
            Describe your product and where it is made. An AI model proposes
            candidate HTS classifications; every rate shown is fetched live
            from the official U.S. International Trade Commission schedule and
            dated. This is working research: your customs broker confirms the
            classification and the rates in force before you rely on them.
          </p>
          <div className="mt-10">
            <DutyAnalyzer />
          </div>

          <section className="editorial-section mt-16" aria-label="How it works">
            <h2 className="text-2xl font-medium text-brand-ink">
              How the duty rate finder works.
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-brand-ink/80">
              <li>
                <strong>The model classifies, it never prices.</strong> GLM,
                our AI classification model, reads your product description
                and proposes the most likely HTSUS candidate codes — material,
                use and composition decide the chapter.
              </li>
              <li>
                <strong>The rate comes from the official schedule.</strong>{' '}
                Each candidate code is looked up in the U.S. International
                Trade Commission&apos;s HTS at the moment of your request, and
                the date of the check is shown with the result.
              </li>
              <li>
                <strong>Additional tariffs stay a layer to verify.</strong>{' '}
                Additional tariffs on Chinese-origin goods — Section 301 among
                them — are set and changed by government action. They are
                described, never hard-coded: your customs broker confirms the
                layers in force for your code and origin.
              </li>
              <li>
                <strong>Before an order, it is confirmed.</strong> A licensed
                customs broker confirms classification and duty rates.
                Sourcing Lab USA is not a customs broker and is not the
                importer of record.
              </li>
            </ol>
          </section>

          <section className="editorial-section mt-12" aria-label="Sources">
            <h2 className="text-2xl font-medium text-brand-ink">Sources.</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-brand-ink/80">
              <li>
                <a
                  className="underline"
                  href="https://hts.usitc.gov/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Harmonized Tariff Schedule
                </a>{' '}
                — U.S. International Trade Commission (rates shown live from
                this source)
              </li>
              <li>
                <a
                  className="underline"
                  href="https://ustr.gov/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Section 301 actions
                </a>{' '}
                — Office of the U.S. Trade Representative (additional tariffs
                on Chinese-origin goods)
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.cbp.gov/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Entry fees and guidance
                </a>{' '}
                — U.S. Customs and Border Protection (MPF, HMF)
              </li>
            </ul>
          </section>

          <section className="editorial-section mt-12" aria-label="Questions">
            <h2 className="text-2xl font-medium text-brand-ink">
              Questions and answers.
            </h2>
            <div className="mt-4 space-y-4 text-sm text-brand-ink/80">
              <div>
                <h3 className="font-semibold">
                  Is the rate the tool shows the duty I will pay?
                </h3>
                <p>
                  No. It is the HTSUS general rate for the candidate code as
                  published by the USITC on the date shown. Your final duty
                  depends on the confirmed classification, additional tariffs
                  that apply to your origin, entry fees and your broker&apos;s
                  fee.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Why does the country of manufacture matter?
                </h3>
                <p>
                  Additional tariffs apply by origin, and origin follows where
                  the goods are manufactured — not where they ship from. The
                  base HTS rate can also differ between origins under special
                  programs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Does the AI model choose the tariff?
                </h3>
                <p>
                  No. The model only proposes candidate classifications. Every
                  rate on this page is fetched from the official USITC
                  schedule, and the date of that lookup is displayed with the
                  result.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Can Sourcing Lab USA classify my product for customs?
                </h3>
                <p>
                  We provide working classification research, subject to
                  confirmation by the importer or customs broker. On request,
                  the working classification is written into your quotation —
                  and a licensed customs broker confirms it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
