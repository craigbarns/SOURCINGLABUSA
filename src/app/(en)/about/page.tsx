import { SourcingOverview } from '@/components/SourcingOverview';
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

const title = 'About Our Sourcing and Product Supply Business';
const description =
  'Meet the founder and learn how we coordinate China sourcing and product supply for U.S. buyers. Clothing, textiles and packaging are our deepest specialties.';
export const metadata = pageMetadata({ title, description, path: '/about' });

const facts = [
  [
    'Founder',
    'Gregory Baranes, who has managed China sourcing projects since 2011 through a company with an office in Shanghai, for French fashion and retail brands: apparel, leather jackets, bags, labels and hangtags, hangers, retail packaging and promotional products.',
  ],
  ['Current availability', 'Projects can start now. Contracting and invoicing from France or China, with the company identified in your quotation.'],
  ['U.S. expansion', 'Planned for Miami in 2027.'],
  [
    'Who the offer is for',
    'U.S. brands, importers and business buyers sourcing and manufacturing products overseas.',
  ],
  [
    'Core specialties',
    'Clothing, sportswear, technical apparel, packaging, boxes and labels.',
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
    'Product purchase and resale, with separately scoped sourcing or coordination services when agreed. The proposal identifies the goods or deliverables, price basis and responsibilities. Current contracts and invoices are issued through the company in France or China named in your quotation.',
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
                <p className="editorial-kicker">SOURCING &amp; PRODUCT SUPPLY · PROJECTS OPEN NOW</p>
                <h1 className="editorial-title">
                  About Sourcing Lab USA.
                  <br />
                  <em>From your brief to product supply.</em>
                </h1>
                <p className="editorial-body">
                  Start your China sourcing project now. We work on clothing,
                  sportswear, technical apparel and packaging, with other
                  products assessed on request. Current projects are contracted
                  and invoiced from France or China, through the company
                  identified in your quotation.
                </p>
                <p className="editorial-body">Through an established independent partnership in China, we coordinate supplier discussions, quotations, sample approvals and the production checkpoints agreed for your order. Audits, inspections, testing and shipment services are coordinated with appointed specialists when included in the project scope.</p>
                <CtaLink
                  href="/#contact"
                  location="about_hero"
                  label="Request a sourcing quote"
                  className="editorial-button"
                >
                  Request a sourcing quote{' '}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </CtaLink>
              </div>
              <SourcingOverview />
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
                <div key={label} id={label === 'Founder' ? 'founder' : undefined}>
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
                Each project starts with the product, quantity, references,
                destination and timing. We review sourcing feasibility
                through our China partnership, then present a product proposal
                with specifications, samples, pricing and commercial terms.
              </p>
              <p className="editorial-body">
                Before order approval, your quotation identifies the company
                in France or China that contracts with you and invoices the
                products. Product specifications, samples, payment terms and
                production checkpoints are agreed for the order. Delivery may
                be direct from China under the agreed terms and import responsibilities.
              </p>
              <p className="editorial-body">
                The China relationship is an independent partnership. Our Miami
                expansion is planned for 2027. That future U.S. step is separate
                from the projects we can already handle through France or China.
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
              <p className="editorial-body">
                See <Link href="/how-we-work">how the sourcing process and approvals work</Link>,
                browse our <Link href="/resources">planning worksheets</Link>, or
                review the <Link href="/editorial-policy">editorial policy</Link> for sources, examples and corrections.
              </p>
              <p className="editorial-body">
                Read <Link href="/case-studies">case studies</Link> written from
                the founder’s project records.
              </p>
              <p className="editorial-body">For manufacturers seeking American customers, start with <Link href="/us-market-entry">U.S. market entry preparation</Link> or <Link href="/us-sales-representation">sales representation</Link>. The brand name identifies Sourcing Lab USA; your quotation identifies the legal contracting and invoicing company.</p>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
