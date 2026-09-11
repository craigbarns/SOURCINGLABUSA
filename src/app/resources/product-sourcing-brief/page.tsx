import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';

import { BriefSection } from '@/components/BriefSection';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { StructuredData } from '@/components/StructuredData';
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  webpageSchema,
} from '@/lib/seo';
import {
  SOURCING_BENCHMARKS,
  BENCHMARKS_NOTE,
} from '@/lib/sourcing-benchmarks';

const path = '/resources/product-sourcing-brief';
const downloadPath = '/resources/product-sourcing-brief.txt';

const title = 'Product Sourcing Brief Template (Free Download)';
const description =
  'A free RFQ template for sourcing from China: the fields a supplier needs to quote, what to mark as to confirm, and the quantities and timing to plan around.';

const directAnswer =
  'A product sourcing brief is the document a supplier quotes from. It states the product, the reference it must match, materials, dimensions, quantity by variant, sample and approval requirements, destination and target date, and separates what is mandatory from what can change. Anything unresolved is marked "to confirm" rather than guessed, because a guessed figure produces a quotation for the wrong product.';

/** The template's own structure, rendered so the page is readable and citable
 *  without downloading the file. Kept in step with the .txt in public/. */
const sections = [
  {
    name: 'Business and contact',
    fields: [
      'Company',
      'Contact name',
      'Email',
      'Product reference, brief revision and date',
    ],
  },
  {
    name: 'Product',
    fields: [
      'Product description',
      'Intended use and intended customer',
      'Reference images, drawings, tech pack or dieline',
      'Details that must match the reference',
      'Materials and composition',
      'Dimensions, units and tolerances',
      'Colours, artwork and finishes',
      'Labels, trims and packaging',
      'Mandatory requirements',
      'Options open to change',
    ],
  },
  {
    name: 'Quantity',
    fields: [
      'First-order quantity',
      'Breakdown by size, style, colour or artwork',
      'Possible repeat quantity, as an estimate only',
    ],
  },
  {
    name: 'Samples and approval',
    fields: [
      'Samples needed',
      'Features to review',
      'Person approving the sample',
      'Documents or claims to review',
    ],
  },
  {
    name: 'Commercial and delivery',
    fields: [
      'Budget and currency',
      'Items expected within the budget',
      'Delivery destination',
      'Target arrival date and flexibility',
      'Proposed delivery terms, to confirm',
      'Import and delivery responsibilities, to confirm',
    ],
  },
  {
    name: 'Questions to resolve',
    fields: [
      'Outstanding specifications',
      'Product feasibility',
      'Minimum order quantity by variant',
      'Unit price, sample and setup charges',
      'Quotation validity and payment terms',
      'Sample, production and transport timing',
      'Production checkpoints and change approvals',
    ],
  },
];

const mistakes = [
  {
    title: 'A quantity with no breakdown',
    body: 'Five thousand units across one size behaves nothing like five thousand across six sizes and three colours. The breakdown is what decides whether a minimum is reachable.',
  },
  {
    title: 'A reference with no boundary',
    body: 'Attaching a reference product without saying which parts must match leaves the supplier to guess. State what is fixed and what is open.',
  },
  {
    title: 'A guessed figure instead of "to confirm"',
    body: 'A placeholder dimension or material is treated as a requirement and quoted against. Marking it unresolved costs nothing and avoids a quotation for the wrong product.',
  },
  {
    title: 'A claim with no evidence path',
    body: 'A performance, safety or compliance requirement needs to say what evidence will be accepted. It cannot be assumed from a fabric name or a reference product.',
  },
];

const faqs = [
  {
    question: 'What is a product sourcing brief?',
    answer:
      'It is the document a supplier quotes from. It states the product, the reference it must match, materials and dimensions, quantity by variant, sample and approval requirements, destination and target date, and separates mandatory requirements from details that can change.',
  },
  {
    question: 'What is the difference between a brief and an RFQ?',
    answer:
      'In practice they are the same document seen from two sides. The brief describes the product you want made; the request for quotation asks a supplier what that product costs and how long it takes. One well-written brief serves as the RFQ.',
  },
  {
    question: 'How complete does a brief need to be before sending it?',
    answer:
      'It does not need to be complete. Mark what is unresolved as "to confirm" and send it. An incomplete brief with honest gaps gets a useful first answer; a brief filled with guessed figures gets a quotation for a product you did not intend.',
  },
  {
    question: 'What quantities and timing should I plan around?',
    answer:
      'As an indication, minimum order quantities commonly start around 500 units, samples take one to two weeks once the specification is agreed, and production runs about 45 to 60 days after sample approval. All three depend on the product and are confirmed in the quotation.',
  },
];

export const metadata = pageMetadata({ title, description, path });

export default function ProductSourcingBriefPage() {
  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webpageSchema(path, title, description, 'en-US', {
              abstract: directAnswer,
            }),
            {
              '@type': 'HowTo',
              '@id': `${absoluteUrl(path)}#howto`,
              name: 'How to prepare a product sourcing brief',
              description: directAnswer,
              step: sections.map((section, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: section.name,
                itemListElement: section.fields.map((field) => ({
                  '@type': 'HowToDirection',
                  text: field,
                })),
              })),
            },
            faqSchema(
              path,
              faqs.map(({ question, answer }) => [question, answer] as const),
              'en-US',
            ),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Sourcing resources', path: '/resources' },
              { name: 'Product sourcing brief template', path },
            ]),
          ],
        }}
      />
      <Navbar area="marketing" contactHref="#contact" />

      <main className="flex-1">
        <section className="editorial-section">
          <div className="editorial-container">
            <nav aria-label="Breadcrumb" className="page-breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> / </span>
              <Link href="/resources">Sourcing resources</Link>
              <span aria-hidden="true"> / </span>
              <span>Brief template</span>
            </nav>
            <p className="editorial-kicker">FREE TEMPLATE · NO EMAIL REQUIRED</p>
            <h1 className="editorial-title page-title">
              The product sourcing brief
              <br />
              <em>a supplier can actually quote.</em>
            </h1>
            <p className="direct-answer">{directAnswer}</p>
            <div className="hero-actions">
              <a
                className="editorial-button"
                href={downloadPath}
                download
              >
                Download the template
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <Link href="#structure" className="editorial-text-link">
                Read it on this page
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="page-note">
              Plain text, so it opens anywhere and pastes into an email. No sign-up,
              no tracking, nothing to accept.
            </p>
          </div>
        </section>

        <section className="editorial-section section-ruled" id="structure">
          <div className="editorial-container">
            <p className="editorial-kicker">WHAT THE TEMPLATE ASKS FOR</p>
            <h2 className="editorial-title">Six sections, in the order a supplier reads them.</h2>
            <div className="brief-template-grid">
              {sections.map((section) => (
                <section key={section.name} className="brief-template-block">
                  <h3>{section.name}</h3>
                  <ul>
                    {section.fields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-section process-section">
          <div className="editorial-container">
            <p className="editorial-kicker">WHAT TO PLAN AROUND</p>
            <h2 className="editorial-title">Figures to hold in mind while you fill it in.</h2>
            <dl className="sourcing-benchmarks">
              {SOURCING_BENCHMARKS.map((benchmark) => (
                <div key={benchmark.label}>
                  <dt>{benchmark.label}</dt>
                  <dd className="benchmark-value">{benchmark.value}</dd>
                  <dd className="benchmark-qualifier">{benchmark.qualifier}</dd>
                </div>
              ))}
            </dl>
            <p className="benchmarks-note">{BENCHMARKS_NOTE}</p>
          </div>
        </section>

        <section className="editorial-section section-ruled">
          <div className="editorial-container">
            <p className="editorial-kicker">WHAT MAKES A BRIEF UNANSWERABLE</p>
            <h2 className="editorial-title">Four gaps that send a quotation off course.</h2>
            <div className="brief-template-grid">
              {mistakes.map((mistake) => (
                <article key={mistake.title} className="brief-template-block">
                  <h3>{mistake.title}</h3>
                  <p>{mistake.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-section">
          <div className="editorial-container">
            <p className="editorial-kicker">QUESTIONS, ANSWERED</p>
            <h2 className="editorial-title">About the brief.</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <BriefSection
          formLocation="brief_template"
          title="Or send the brief straight to us."
          intro="Fill in the template and attach it, or use the form below. We confirm what can be quoted and sampled, and reply by email."
        />
      </main>

      <Footer />
      <StickyMobileCta />
    </div>
  );
}
