import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { BRIEF_CONTACT_EMAIL } from '@/lib/brief-copy';

/*
 * This notice states exactly what the site does today: the fields the brief
 * form collects, the three services that receive them, and how to have them
 * removed. It is written from the implementation, not from a template.
 *
 * Before publication it still needs the registered legal entity name and
 * address, and a review by qualified counsel for the jurisdictions the
 * business will operate in.
 */

const LAST_UPDATED = '7 September 2026';

export const metadata = pageMetadata({
  title: 'Privacy notice',
  description:
    'What Sourcing Lab USA collects when you send a project brief, where it is stored, and how to have it removed.',
  path: '/privacy',
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-brand-line py-8">
      <h2 className="text-xl font-medium tracking-[-0.03em] text-brand-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-brand-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <Navbar area="marketing" contactHref="/#contact" />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link href="/" className="transition-colors hover:text-brand-ink">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-brand-muted">
              /
            </span>
            <span>Privacy notice</span>
          </nav>

          <h1 className="mt-10 text-balance text-4xl font-medium tracking-[-0.05em] text-brand-ink sm:text-5xl">
            Privacy notice
          </h1>
          <p className="mt-6 text-base leading-7 text-brand-muted">
            This page explains what we collect when you use this website, why we
            collect it, where it is stored, and how to have it removed. Last
            updated {LAST_UPDATED}.
          </p>

          <div className="mt-12">
            <Section title="What we collect">
              <p>
                When you send a project brief we collect your name, email
                address, the type of product you need, an approximate quantity,
                the page you sent the brief from, and — if you choose to provide
                them — your company name and a description of your project.
              </p>
              <p>
                If you join the product update list we collect your email
                address and the sourcing role you select.
              </p>
              <p>
                We do not ask for payment details, identity documents, or any
                special category of personal data anywhere on this site.
              </p>
            </Section>

            <Section title="Why we collect it">
              <p>
                A project brief is used to answer your request: to confirm what
                can be quoted and sampled, to ask for anything missing, and to
                reply to you by email. Product update registrations are used
                only to send occasional updates about the service.
              </p>
              <p>
                We do not sell your information, we do not share it with
                advertising networks, and we do not add you to a marketing
                sequence because you sent a brief.
              </p>
            </Section>

            <Section title="Where it is stored">
              <p>
                Briefs and product update registrations are stored in a Supabase
                database that only our servers can reach. Brief submissions are
                also delivered to us as a notification through Netlify Forms,
                the service that hosts this website.
              </p>
              <p>
                We use Google Analytics to understand how the site is used —
                which pages are visited and which actions are taken, such as
                opening or submitting the brief form. Google Analytics sets
                cookies in your browser and processes this data on Google&apos;s
                infrastructure. It does not receive the contents of your brief.
              </p>
              <p>
                These providers operate in the United States and elsewhere, so
                your information may be processed outside your country.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep a project brief for as long as it takes to answer it and
                to maintain a record of the conversation, and product update
                registrations until you ask to be removed. You can ask us to
                delete either at any time.
              </p>
            </Section>

            <Section title="Your choices">
              <p>
                You can ask for a copy of what we hold about you, ask us to
                correct it, or ask us to delete it. Write to{' '}
                <a
                  className="font-bold text-brand-green transition-colors hover:text-brand-ink"
                  href={`mailto:${BRIEF_CONTACT_EMAIL}?subject=${encodeURIComponent(
                    'Privacy request',
                  )}`}
                >
                  {BRIEF_CONTACT_EMAIL}
                </a>{' '}
                and we will action it.
              </p>
              <p>
                You can block analytics cookies in your browser settings or with
                a content blocker. The site works normally without them.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this notice go to{' '}
                <a
                  className="font-bold text-brand-green transition-colors hover:text-brand-ink"
                  href={`mailto:${BRIEF_CONTACT_EMAIL}`}
                >
                  {BRIEF_CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>
          </div>

          <div className="mt-12 border-t border-brand-line pt-8">
            <Link href="/#contact" className="editorial-button">
              Back to the brief form
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
