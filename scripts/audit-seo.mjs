import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Run against a local production build. Nothing is submitted to a search engine.
const base = new URL(process.env.SEO_BASE_URL || 'http://127.0.0.1:3013');
const canonicalOrigin = new URL(
  process.env.MARKETING_ORIGIN || 'https://sourcinglabusa.com',
).origin;
const pages = new Map();

async function get(path, headers) {
  const response = await fetch(new URL(path, base), {
    headers,
    redirect: 'manual',
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return { response, text: await response.text() };
}

const { text: xml } = await get('/sitemap.xml');
const sitemap = new JSDOM(xml, { contentType: 'text/xml' }).window.document;
const urls = [...sitemap.querySelectorAll('url > loc')].map(
  (node) => new URL(node.textContent),
);
assert.ok(urls.length > 0, 'Sitemap is empty');
assert.equal(
  new Set(urls.map(String)).size,
  urls.length,
  'Duplicate sitemap entries',
);

for (const url of urls) {
  assert.equal(
    url.origin,
    canonicalOrigin,
    'Sitemap must use the canonical domain',
  );
  assert.ok(
    !/^\/(app|api|tools)(\/|$)/.test(url.pathname),
    'Private/tool URL in sitemap',
  );
  const { response, text } = await get(url.pathname);
  const document = new JSDOM(text).window.document;
  const title = document.title.trim();
  const description = document.querySelector(
    'meta[name="description"]',
  )?.content;
  assert.ok(
    title && description,
    `${url.pathname}: missing title or description`,
  );
  assert.equal(
    document.querySelectorAll('link[rel="canonical"]').length,
    1,
    `${url.pathname}: canonical count`,
  );
  assert.equal(
    document.querySelector('link[rel="canonical"]').href,
    url.href,
    `${url.pathname}: canonical mismatch`,
  );
  assert.equal(
    new URL(document.querySelector('meta[property="og:url"]')?.content).href,
    url.href,
    `${url.pathname}: social URL mismatch`,
  );
  assert.equal(
    document.querySelector('meta[property="og:description"]')?.content,
    description,
    `${url.pathname}: social description mismatch`,
  );
  assert.equal(
    document.querySelector('meta[name="twitter:description"]')?.content,
    description,
    `${url.pathname}: Twitter description mismatch`,
  );
  assert.ok(
    document.querySelector('meta[property="og:image"]')?.content,
    `${url.pathname}: missing share image`,
  );
  assert.equal(
    document.querySelectorAll('h1').length,
    1,
    `${url.pathname}: expected one H1`,
  );
  assert.ok(
    document.querySelector('main')?.textContent.trim().length > 150,
    `${url.pathname}: missing server-rendered content`,
  );
  for (const img of document.querySelectorAll('img'))
    assert.ok(img.hasAttribute('alt'), `${url.pathname}: missing image alt`);
  assert.ok(
    !/noindex/i.test(
      document.querySelector('meta[name="robots"]')?.content || '',
    ),
    `${url.pathname}: public page is noindex`,
  );
  if (['localhost', '127.0.0.1'].includes(base.hostname))
    assert.ok(
      !/noindex/i.test(response.headers.get('x-robots-tag') || ''),
      `${url.pathname}: unexpected local noindex`,
    );

  const graph = [
    ...document.querySelectorAll('script[type="application/ld+json"]'),
  ].flatMap((node) => {
    const json = JSON.parse(node.textContent);
    assert.equal(json['@context'], 'https://schema.org');
    return json['@graph'] || [json];
  });
  const organizations = graph.filter(
    (node) => node['@type'] === 'Organization',
  );
  assert.equal(
    organizations.length,
    1,
    `${url.pathname}: duplicate/missing company entity`,
  );
  assert.equal(organizations[0]['@id'], `${canonicalOrigin}/#organization`);
  assert.ok(
    !organizations[0].address && !organizations[0].foundingDate,
    'Planned launch must not imply a current address/founding date',
  );
  const main = document.querySelector('main').cloneNode(true);
  main.querySelectorAll('script').forEach((node) => node.remove());
  const normalize = (value) => value.replace(/\s+/g, ' ').trim();
  const visibleText = normalize(main.textContent);
  for (const faq of graph.filter((node) => node['@type'] === 'FAQPage')) {
    for (const question of faq.mainEntity) {
      assert.ok(
        visibleText.includes(normalize(question.name)),
        `${url.pathname}: schema question absent from content`,
      );
      assert.ok(
        visibleText.includes(normalize(question.acceptedAnswer.text)),
        `${url.pathname}: schema answer absent from content`,
      );
    }
  }
  if (url.pathname.startsWith('/blog/') && url.pathname !== '/blog/') {
    const article = graph.find((node) => node['@type'] === 'BlogPosting');
    assert.ok(
      article?.publisher &&
        article.author?.url &&
        article.datePublished &&
        article.dateModified,
      `${url.pathname}: incomplete article identity/dates`,
    );
    assert.ok(
      document.querySelector(`time[datetime="${article.dateModified}"]`),
      `${url.pathname}: modified date absent from visible content`,
    );
  }
  pages.set(url.pathname, { document, title, description });
}

assert.equal(
  new Set([...pages.values()].map((page) => page.title)).size,
  pages.size,
  'Duplicate page titles',
);
assert.equal(
  new Set([...pages.values()].map((page) => page.description)).size,
  pages.size,
  'Duplicate descriptions',
);
const internalAssets = new Set();
let linksChecked = 0;
for (const [path, { document }] of pages) {
  for (const anchor of document.querySelectorAll('a[href]')) {
    const url = new URL(
      anchor.getAttribute('href'),
      `${canonicalOrigin}${path}`,
    );
    if (
      url.origin !== canonicalOrigin ||
      !['https:', 'http:'].includes(url.protocol)
    )
      continue;
    if (/^\/(app|api|tools)(\/|$)/.test(url.pathname)) continue;
    const target = pages.get(url.pathname);
    if (!target) {
      // Downloadable public resources are valid links but don't belong in the page sitemap.
      assert.ok(
        url.pathname.startsWith('/resources/'),
        `${path}: internal page missing from sitemap: ${url.pathname}`,
      );
      internalAssets.add(url.pathname);
    } else if (url.hash) {
      assert.ok(
        target.document.getElementById(decodeURIComponent(url.hash.slice(1))),
        `${path}: broken anchor ${url.pathname}${url.hash}`,
      );
    }
    linksChecked += 1;
  }
}
for (const path of internalAssets) await get(path);

for (const path of ['/', '/es']) {
  const document = pages.get(path).document;
  for (const [language, target] of [
    ['en-US', '/'],
    ['es-US', '/es'],
    ['x-default', '/'],
  ]) {
    assert.equal(
      document.querySelector(`link[hreflang="${language}"]`)?.href,
      `${canonicalOrigin}${target}`,
      `${path}: incorrect ${language} alternate`,
    );
  }
  const entry = [...sitemap.querySelectorAll('url')].find(
    (node) =>
      node.querySelector('loc').textContent === `${canonicalOrigin}${path}`,
  );
  assert.equal(
    entry.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link').length,
    3,
    `${path}: sitemap language alternates`,
  );
}

const { text: robots } = await get('/robots.txt');
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//i);
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));

if (['localhost', '127.0.0.1'].includes(base.hostname)) {
  const production = await get('/', {
    'x-forwarded-host': new URL(canonicalOrigin).host,
  });
  assert.ok(
    !production.response.headers.get('x-robots-tag')?.includes('noindex'),
    'Production domain must be indexable',
  );
  const preview = await get('/', {
    'x-forwarded-host': 'seo-check-preview.netlify.app',
  });
  assert.match(
    preview.response.headers.get('x-robots-tag') || '',
    /noindex/,
    'Preview domain must be noindex',
  );
  const app = await get('/app');
  assert.match(
    app.response.headers.get('x-robots-tag') || '',
    /noindex/,
    'App must stay noindex',
  );
}

console.log(
  JSON.stringify(
    {
      status: 'passed',
      pages: pages.size,
      internalLinks: linksChecked,
      downloads: internalAssets.size,
      checks: [
        'server-rendered content',
        'unique metadata',
        'canonicals',
        'social previews',
        'JSON-LD',
        'visible FAQ consistency',
        'article dates',
        'internal links and anchors',
        'EN/ES hreflang',
        'sitemap',
        'crawler access',
        'indexing boundaries',
      ],
    },
    null,
    2,
  ),
);
