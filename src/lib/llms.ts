import { getAllPosts } from '@/lib/blog';
import { homeFaqs } from '@/lib/home-faqs';
import { NOT_AN_IMPORTER, PILLARS, PROMISE_STATEMENT, SCOPE } from '@/lib/positioning';
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from '@/lib/seo';

// Keep the business promise and scope in positioning.ts, as on the HTML pages.
// This directory lists canonical public pages, never the private app or API.
const sections = [
  {
    title: 'Product supply',
    pages: [
      ['/product-sourcing', 'Product sourcing', 'Product brief, factory options, prices, samples and a written order.'],
      ['/custom-packaging', 'Custom packaging', 'Boxes, bags, labels and inserts made to specification.'],
      ['/custom-textile', 'Clothing and textiles', 'Tech packs, materials, sizing, branding and sample approval.'],
      ['/sportswear-sourcing', 'Sportswear and technical apparel', 'Fit, fabric and intended use; technical claims require evidence.'],
      ['/private-label-packaging', 'Private label packaging', 'Structure, print and product information for a brand.'],
      ['/private-label-manufacturing', 'Private label manufacturing', 'Product customization, samples and order terms.'],
      ['/product-development', 'Product development', 'Specifications and samples before production.'],
      ['/china-sourcing-agent', 'China sourcing', 'Factory search through the independent China partnership and product supply.'],
      ['/china-to-us-procurement', 'China-to-U.S. procurement', 'Contracting company, invoicing and responsibilities agreed per order.'],
    ],
  },
  {
    title: 'Factory checks and cost before ordering',
    pages: [
      ['/factory-verification', 'Factory verification', 'Company records and supplier checks; on-site audits only when included in the quotation.'],
      ['/quality-control-china', 'Quality control', 'Written specifications and approved samples; an inspection or lab test is coordinated only when quoted.'],
      ['/landed-cost-analysis', 'Landed-cost analysis', 'A cost model only when included in the quotation, with transport and duty assumptions made explicit.'],
      ['/hs-code-consulting', 'HS code research', 'Working classification research, subject to confirmation by the importer or customs broker.'],
      ['/tools/hs-code-finder', 'HS code preparation tool', 'Prepare product information for classification review; the tool does not determine a code, duty rate or import requirement.'],
      ['/how-we-work', 'How we work', 'The brief, factory search, quotation, samples, production follow-up and hand-off.'],
    ],
  },
  {
    title: 'Company, evidence and contact',
    pages: [
      ['/about', 'About Sourcing Lab USA', 'Founder Gregory Baranes and the sourcing business.'],
      ['/case-studies', 'Documented case studies', 'Projects labelled to distinguish the founder\'s earlier work from Sourcing Lab USA projects.'],
      ['/editorial-policy', 'Editorial policy', 'Attribution, evidence, review and corrections.'],
      ['/contact-us', 'Request a quotation', 'Share the product brief, quantities and delivery destination.'],
    ],
  },
  {
    title: 'Languages and resources',
    pages: [
      ['/', 'English homepage', 'Custom packaging and textile supply for U.S. business buyers.'],
      ['/es', 'Spanish homepage', 'The same sourcing offer in Spanish for U.S. buyers.'],
      ['/zh', 'Simplified Chinese homepage', 'The same product supply and quotation scope in Simplified Chinese.'],
      ['/resources', 'Sourcing resources', 'Briefs and worksheets for comparing offers and preparing an order.'],
      ['/resources/product-sourcing-brief', 'Product sourcing brief', 'Product, material, quantity, sampling and destination requirements.'],
      ['/blog', 'Sourcing guides', 'Packaging, textiles, supplier checks and order preparation.'],
    ],
  },
] as const;

function pageDirectory() {
  return sections.map(({ title, pages }) => [
    `## ${title}`,
    '',
    ...pages.map(([path, name, description]) => `- [${name}](${absoluteUrl(path)}): ${description}`),
  ].join('\n')).join('\n\n');
}

export function getLlmsText() {
  return [
    `# ${SITE_NAME}`,
    `> ${PROMISE_STATEMENT.en}`,
    NOT_AN_IMPORTER.en,
    'Clothing, textiles, sportswear and packaging are the business. Other products are reviewed for feasibility on request.',
    pageDirectory(),
    '## Optional',
    `- [Extended overview](${absoluteUrl('/llms-full.txt')}): The published scope, answers to common questions and links to sourcing guides.`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')}): The current directory of public pages.`,
    '',
  ].join('\n\n');
}

export function getLlmsFullText() {
  const scope = SCOPE.en;
  const scopeSections = [scope.included, scope.onRequest, scope.excluded].map(
    ({ heading, items }) => `### ${heading}\n\n${items.map((item) => `- ${item}`).join('\n')}`,
  );
  const guides = getAllPosts().map((post) =>
    `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`,
  );

  return [
    `# ${SITE_NAME}`,
    `> ${PROMISE_STATEMENT.en}`,
    'This is an extended overview of the published business scope and a directory of source pages. It is not a copy of every page or article.',
    `Contact: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}). [Request a quotation](${absoluteUrl('/contact-us')}).`,
    '## The three pillars',
    ...PILLARS.en.map(({ title, body, href }) => `### ${title}\n\n${body}\n\nSource: [${title}](${absoluteUrl(href)}).`),
    `## ${scope.title}`,
    ...scopeSections,
    NOT_AN_IMPORTER.en,
    `Source: [Product supply and order terms](${absoluteUrl('/china-to-us-procurement')}).`,
    '## Questions and answers',
    ...homeFaqs.map(([question, answer]) => `### ${question}\n\n${answer}`),
    `Source: [Homepage questions and answers](${absoluteUrl('/#faq')}).`,
    pageDirectory(),
    '## Sourcing guides',
    guides.join('\n'),
    '## Optional',
    `- [Concise overview](${absoluteUrl('/llms.txt')}): A shorter directory of the business and its public pages.`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')}): The current directory of public pages.`,
    `- [Privacy policy](${absoluteUrl('/privacy')}): Contact data and privacy information.`,
    '',
  ].join('\n\n');
}
