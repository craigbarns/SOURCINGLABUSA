import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardList, FileText, PackageCheck } from 'lucide-react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

type ContentBlock = {
  title: string;
  body: string;
};

type Question = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  overview: string;
  offerName: string;
  offerDescription: string;
  focusAreas: ContentBlock[];
  briefItems: string[];
  workflow: ContentBlock[];
  faqs: Question[];
  relatedPages: Array<{
    href: string;
    title: string;
    description: string;
  }>;
};

function buildStructuredData(page: ServicePageContent) {
  const url = `https://sourcinglabusa.com${page.path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://sourcinglabusa.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.offerName,
            item: url,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.intro,
        isPartOf: {
          '@id': 'https://sourcinglabusa.com/#website',
        },
        about: {
          '@type': 'Service',
          name: page.offerName,
          description: page.offerDescription,
          provider: {
            '@id': 'https://sourcinglabusa.com/#organization',
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  const structuredData = buildStructuredData(page);

  return (
    <div className="flex min-h-screen flex-col bg-[#070a09] text-gray-100">
      <Navbar area="marketing" />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="border-b border-white/[0.07] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-[#98a69e]">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true" className="mx-2 text-[#5c6861]">/</span>
              <span>{page.offerName}</span>
            </nav>

            <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_0.75fr]">
              <div>
                <span className="eyebrow">{page.eyebrow}</span>
                <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#a0aca5] sm:text-xl">
                  {page.intro}
                </p>
                <Link
                  href="/#contact"
                  className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#c7ff6b] px-5 py-3 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#d6ff91]"
                >
                  Share your project brief
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <aside className="surface-panel rounded-[26px] p-7 sm:p-8">
                <ClipboardList className="h-6 w-6 text-[#c7ff6b]" aria-hidden="true" />
                <h2 className="mt-6 text-xl font-black tracking-[-0.03em] text-white">Start with a clear brief</h2>
                <p className="mt-3 text-sm leading-7 text-[#98a69e]">
                  A practical brief lets us confirm the product scope before discussing options, sampling, and order terms.
                </p>
                <ul className="mt-6 space-y-3">
                  {page.briefItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#d4ddd7]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#70e1b2]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
            <div>
              <span className="eyebrow">Designed around the product</span>
              <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                The details that make a custom product usable and on-brand.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#98a69e]">{page.overview}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {page.focusAreas.map((area) => (
                <article key={area.title} className="bento-card rounded-[22px] p-6 sm:p-7">
                  <PackageCheck className="h-5 w-5 text-[#70e1b2]" aria-hidden="true" />
                  <h3 className="mt-6 text-lg font-bold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#95a199]">{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-[#0a0e0c] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow">A documented process</span>
              <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Move from a product brief to an approved order with fewer assumptions.
              </h2>
            </div>

            <ol className="mt-14 grid gap-4 md:grid-cols-3">
              {page.workflow.map((step, index) => (
                <li key={step.title} className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.025] p-7">
                  <span className="absolute right-5 top-2 font-mono text-5xl font-black tracking-[-0.08em] text-white/[0.045]">
                    0{index + 1}
                  </span>
                  <FileText className="h-5 w-5 text-[#c7ff6b]" aria-hidden="true" />
                  <h3 className="mt-8 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#94a198]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr]">
              <div>
                <span className="eyebrow">Related resources</span>
                <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  Plan the next decision, not just the next order.
                </h2>
              </div>
              <div className="grid gap-4">
                {page.relatedPages.map((related) => (
                  <Link
                    key={related.href}
                    href={related.href}
                    className="group rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-[#c7ff6b]/35 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#dfffab]">{related.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#94a198]">{related.description}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#c7ff6b]" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.65fr_1fr] lg:px-8">
            <div>
              <span className="eyebrow">Questions, answered</span>
              <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                The important details are agreed before production.
              </h2>
            </div>
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="py-6 sm:py-7">
                  <h3 className="text-base font-bold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#94a198]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] pb-24 pt-4 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="surface-panel rounded-[26px] px-7 py-12 sm:px-12 sm:py-16">
              <span className="eyebrow">Ready when your brief is</span>
              <h2 className="mt-6 max-w-3xl text-balance text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Tell us what you need to develop, brand, and deliver.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#98a69e]">
                Share the product, quantity, references, destination, and target timing. We will confirm the appropriate next step for your project.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#c7ff6b] px-5 py-3 text-sm font-extrabold text-[#0a0d0b] transition hover:bg-[#d6ff91]"
              >
                Send your project brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
