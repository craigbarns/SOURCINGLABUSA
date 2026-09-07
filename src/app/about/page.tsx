import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { EditorialFooter } from '@/components/EditorialFooter';
import { CtaLink } from '@/components/CtaLink';
import { StructuredData } from '@/components/StructuredData';
import {
  breadcrumbSchema,
  pageMetadata,
  webpageSchema,
  ORGANIZATION_ID,
} from '@/lib/seo';

const title = 'About Our China Sourcing & Product Supply Business';
const description =
  'Meet Sourcing Lab USA: clothing, packaging and other products on request through an independent China sourcing partnership. Miami launch planned for 2027.';
export const metadata = pageMetadata({ title, description, path: '/about' });

const facts = [
  ['U.S. launch', 'Planned for Miami in 2027.'],
  [
    'Who the offer is for',
    'U.S. brands, e-commerce businesses and other business customers.',
  ],
  [
    'Core specialties',
    'Clothing, textiles, custom packaging and private label packaging.',
  ],
  [
    'Other products',
    'Reviewed on request, subject to product specifications and sourcing feasibility.',
  ],
  [
    'Supply relationship',
    'An established independent sourcing partnership in China.',
  ],
  [
    'Commercial model',
    'The planned U.S. business will purchase products from suppliers and supply and invoice those products to customers.',
  ],
];

export default function AboutPage() {
  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              ...webpageSchema('/about', title, description),
              '@type': 'AboutPage',
              mainEntity: { '@id': ORGANIZATION_ID },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About Sourcing Lab USA', path: '/about' },
            ]),
          ],
        }}
      />
      <Navbar area="marketing" appearance="light" contactHref="/#contact" />
      <main className="flex-1">
        <section className="editorial-section">
          <div className="editorial-container">
            <nav aria-label="Breadcrumb" className="about-breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> / </span>
              <span>About Sourcing Lab USA</span>
            </nav>
            <div className="about-intro">
              <div>
                <p className="editorial-kicker">PLANNED MIAMI LAUNCH · 2027</p>
                <h1 className="editorial-title">
                  Products with purpose.
                  <br />
                  <em>A clearer way to source.</em>
                </h1>
                <p className="editorial-body">
                  Sourcing Lab USA is preparing a China sourcing and product
                  supply business for U.S. customers. Clothing and packaging are
                  our specialties. Other products can be assessed on request,
                  starting with a clear brief.
                </p>
                <CtaLink
                  href="/#contact"
                  location="about_hero"
                  label="Discuss a future project"
                  className="editorial-button"
                >
                  Discuss a future project{' '}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </CtaLink>
              </div>
              <figure className="about-photo">
                <Image
                  src="/images/brand-still-life.webp"
                  alt="Concept arrangement of clothing, textile swatches and custom packaging"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority
                />
                <figcaption>
                  AI-created product concept · illustrative, not a client
                  project
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="editorial-section process-section">
          <div className="editorial-container">
            <p className="editorial-kicker">SOURCING LAB USA AT A GLANCE</p>
            <h2 className="editorial-title">
              The business, <em>clearly explained.</em>
            </h2>
            <dl className="company-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="editorial-section">
          <div className="editorial-container about-details">
            <div>
              <p className="editorial-kicker">FROM SPECIFICATION TO SUPPLY</p>
              <h2 className="editorial-title">
                Your order.
                <br />
                <em>A documented process.</em>
              </h2>
            </div>
            <div>
              <p className="editorial-body">
                The planned model starts with the product, quantity, references,
                destination and timing. We will review sourcing feasibility
                through our China partnership, then present a product proposal
                with specifications, samples, pricing and commercial terms.
              </p>
              <p className="editorial-body">
                After order approval, Sourcing Lab USA will purchase from the
                selected supplier, coordinate production follow-up, and supply
                the products to the customer. Delivery may be direct from China
                under the agreed order terms. Import responsibilities and
                quality checkpoints will be documented for each order.
              </p>
              <p className="editorial-body">
                The China relationship is an independent partnership. The U.S.
                launch remains planned for 2027; the site will be updated as the
                business becomes operational.
              </p>
              <Link
                href="/china-to-us-procurement"
                className="editorial-text-link"
              >
                Explore China-to-U.S. product supply{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <p className="editorial-body">
                Start with our{' '}
                <Link href="/custom-textile">clothing and textile scope</Link>,{' '}
                <Link href="/custom-packaging">custom packaging scope</Link>, or{' '}
                <Link href="/blog/china-sourcing-rfq-checklist">
                  product quotation checklist
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
