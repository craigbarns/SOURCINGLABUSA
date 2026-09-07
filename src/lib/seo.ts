import type { Metadata } from 'next';

import { getDomainRoutingConfig } from '@/lib/routing/subdomains';

export const SITE_NAME = 'Sourcing Lab USA';
export const { marketingOrigin: SITE_ORIGIN } = getDomainRoutingConfig();
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SITE_DESCRIPTION =
  'China sourcing and product supply for U.S. business customers. Clothing, packaging and other products on request. Miami launch planned for 2027.';

export const homeLanguages = {
  'en-US': `${SITE_ORIGIN}/`,
  'es-US': `${SITE_ORIGIN}/es`,
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
  locale?: 'en-US' | 'es-US';
  translatedHome?: boolean;
  article?: { published: string; modified: string };
}): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const images = [
    {
      url: absoluteUrl('/opengraph-image'),
      width: 1200,
      height: 630,
      alt: 'Sourcing Lab USA — China sourcing and product supply. Miami launch planned for 2027.',
    },
  ];

  return {
    title,
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
      locale: locale.replace('-', '_'),
      ...(translatedHome
        ? { alternateLocale: [locale === 'en-US' ? 'es_US' : 'en_US'] }
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
        logo: absoluteUrl('/sourcinglab_logo.png'),
        email: 'contact@sourcinglabusa.com',
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
) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}
