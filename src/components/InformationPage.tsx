import Link from 'next/link';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BriefSection } from '@/components/BriefSection';
import { StructuredData } from '@/components/StructuredData';
import { breadcrumbSchema, webpageSchema } from '@/lib/seo';

export function InformationPage({ path, title, description, children, contact = false }: {
  path: string;
  title: string;
  description: string;
  children: ReactNode;
  contact?: boolean;
}) {
  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <StructuredData data={{ '@context': 'https://schema.org', '@graph': [
        { ...webpageSchema(path, title, description), '@type': contact ? 'ContactPage' : 'WebPage' },
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: title, path }]),
      ] }} />
      <Navbar area="marketing" contactHref={contact ? '#contact' : '/contact-us#contact'} />
      <main className="flex-1">
        <article className="article-layout">
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span>
          </nav>
          <h1 className="mt-8">{title}</h1>
          <p className="direct-answer">{description}</p>
          <div className="prose editorial-prose mt-10 max-w-none">{children}</div>
        </article>
        {contact && <BriefSection formLocation="contact_page" title="Discuss your sourcing project." intro="Start with your product, quantity and contact details. Add budget, destination and timing if you know them; we will confirm what can be quoted and sampled." />}
      </main>
      <Footer />
    </div>
  );
}
