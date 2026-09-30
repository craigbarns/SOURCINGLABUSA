import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

export const SITE_NAME = 'Sourcing Lab USA';
export const { marketingOrigin: SITE_ORIGIN } = getDomainRoutingConfig();
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const FOUNDER_ID = `${SITE_ORIGIN}/about#founder`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SITE_DESCRIPTION =
  'Global sourcing, overseas manufacturing management, and U.S. market-entry execution for American brands and international manufacturers. Supplier verification, quality control, landed-cost modeling, and U.S. sales representation.';

export const homeLanguages = {
  'en-US': `${SITE_ORIGIN}/`,
  'es-US': `${SITE_ORIGIN}/es`,
  'zh-Hans': `${SITE_ORIGIN}/zh`,
  'x-default': `${SITE_ORIGIN}/`,
};

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  locale = 'en-US',
  translatedHome = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  locale?: 'en-US' | 'es-US' | 'zh-Hans';
  translatedHome?: boolean;
  article?: { published: string; modified: string };
}): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const images = [
    {
      url: absoluteUrl('/opengraph-image'),
      width: 1200,
      height: 630,
      alt: 'Sourcing Lab USA — Global Sourcing, Overseas Manufacturing & U.S. Market Entry Execution.',
    },
  ];

  const currentLocale = locale === 'zh-Hans' ? 'zh_CN' : locale.replace('-', '_');

  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: absoluteUrl(path),
      ...(translatedHome ? { languages: homeLanguages } : {}),
    },
    openGraph: {
      type: article ? 'article' : 'website',
      url: absoluteUrl(path),
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      locale: currentLocale,
      ...(translatedHome
        ? {
            alternateLocale: ['en_US', 'es_US', 'zh_CN'].filter(
              (l) => l !== currentLocale,
            ),
          }
        : {}),
      ...(article
        ? { publishedTime: article.published, modifiedTime: article.modified }
        : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images,
    },
  };
}

export const CONTACT_EMAIL = 'contact@sourcinglabusa.com';

/**
 * Topics the business is genuinely positioned on, each backed by a page on
 * this site. Search and answer engines use these to decide which questions
 * this organization is a credible source for, so every entry must correspond
 * to real published content rather than an ambition.
 */
export const ORGANIZATION_TOPICS = [
  'Global sourcing',
  'Product sourcing',
  'China sourcing company USA',
  'China sourcing agent',
  'Supplier sourcing USA',
  'Factory verification',
  'Supplier audit China',
  'Quality control China USA',
  'Private label manufacturing',
  'Product development China USA',
  'Custom packaging sourcing',
  'Textile and apparel sourcing',
  'Freight and logistics sourcing',
  'Customs compliance and HS code consulting',
  'Landed cost analysis',
  'China-to-United States procurement',
  'U.S. market entry consulting',
  'Manufacturer sales representative USA',
  'U.S. sales representation for foreign manufacturers',
];

/**
 * Verified profiles for this organization elsewhere on the web (LinkedIn,
 * company registers, industry directories). REQUIRES CONFIRMATION: add only
 * URLs the owner controls or has verified. Leaving this empty omits sameAs
 * entirely, which is correct — a wrong profile is worse than none.
 */
export const ORGANIZATION_PROFILES: string[] = [];

export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: 'SourcingLab USA',
        url: absoluteUrl('/'),
        description: SITE_DESCRIPTION,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/sourcinglab-icon-512.png'),
          width: 512,
          height: 512,
        },
        email: CONTACT_EMAIL,
        publishingPrinciples: absoluteUrl('/editorial-policy'),
        contactPoint: {
          '@type': 'ContactPoint',
          email: CONTACT_EMAIL,
          contactType: 'sales',
          availableLanguage: ['English', 'Spanish'],
          areaServed: 'US',
        },
        areaServed: { '@type': 'Country', name: 'United States' },
        knowsAbout: ORGANIZATION_TOPICS,
        founder: { '@id': FOUNDER_ID },
        // Only profiles the owner has confirmed belong here. An unverified or
        // unclaimed profile weakens entity resolution instead of helping it.
        ...(ORGANIZATION_PROFILES.length > 0
          ? { sameAs: ORGANIZATION_PROFILES }
          : {}),
      },
      {
        // Named on the About page. Nothing is asserted here that the page does not
        // show.
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: 'Gregory Baranes',
        jobTitle: 'Founder',
        description:
          'Founder of Sourcing Lab USA, with years of hands-on experience in international sourcing, product development and cross-border business.',
        knowsAbout: ORGANIZATION_TOPICS,
        worksFor: { '@id': ORGANIZATION_ID },
        mainEntityOfPage: absoluteUrl('/about'),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: absoluteUrl('/'),
        name: SITE_NAME,
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: ['en-US', 'es-US'],
      },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(path: string, name: string, description: string) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    url: absoluteUrl(path),
    name,
    serviceType: name,
    description,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
  };
}

export function faqSchema(
  path: string,
  faqs: ReadonlyArray<readonly [string, string]>,
  language = 'en-US',
) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    inLanguage: language,
    isPartOf: { '@id': `${absoluteUrl(path)}#webpage` },
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function webpageSchema(
  path: string,
  title: string,
  description: string,
  language = 'en-US',
  /**
   * `abstract` carries the page's self-contained answer, so an engine reading
   * only the markup gets the same sentence a reader sees under the heading.
   */
  extra?: { abstract?: string },
) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    ...(extra?.abstract ? { abstract: extra.abstract } : {}),
    inLanguage: language,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}
