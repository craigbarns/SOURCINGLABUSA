import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DutyAnalyzer } from '@/components/tools/DutyAnalyzer';
import { StructuredData } from '@/components/StructuredData';
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  pageMetadata,
  webpageSchema,
} from '@/lib/seo';
import {
  dutyCalculatorFaqs,
  dutyCalculatorSteps,
} from '@/lib/duty-calculator-faqs';

export const metadata = pageMetadata({
  title: 'Duty Rate Finder for U.S. Imports',
  description:
    'Candidate HTS codes from an AI model, with duty rates fetched live from the official USITC schedule and the date checked. Your customs broker confirms.',
  path: '/duty-calculator',
});

export default function DutyCalculatorPage() {
  return (
    <div className="editorial-shell workspace-page flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema(
              '/duty-calculator',
              'Duty Rate Finder for U.S. Imports',
              'Candidate HTS codes from an AI model, with duty rates fetched live from the official USITC schedule and the date checked. Your customs broker confirms.',
            ),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Duty Rate Finder', path: '/duty-calculator' },
            ]),
            faqSchema('/duty-calculator', dutyCalculatorFaqs, 'en-US'),
            howToSchema(
              '/duty-calculator',
              'How the duty rate finder works.',
              dutyCalculatorSteps,
            ),
          ],
        }}
      />
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
              {dutyCalculatorSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}</strong> {step.text}
                </li>
              ))}
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
              {dutyCalculatorFaqs.map(([question, answer]) => (
                <div key={question}>
                  <h3 className="font-semibold">{question}</h3>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
