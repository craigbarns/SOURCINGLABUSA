import { JSDOM } from 'jsdom';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Read-only inventory: no form submissions, search-engine submissions or browser automation.
const base = new URL(process.argv[2] || 'https://sourcinglabusa.com');
const output = process.argv[3] || 'docs/audits/2026-09-14-live.json';
const canonicalOrigin = 'https://sourcinglabusa.com';
const local = ['127.0.0.1', 'localhost'].includes(base.hostname);
const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim();
async function get(path, headers = {}) {
  const start = performance.now();
  try {
    const response = await fetch(new URL(path, base), { headers, signal: AbortSignal.timeout(25000) });
    const body = await response.text();
    return { status: response.status, finalUrl: response.url, headers: Object.fromEntries(response.headers), elapsedMs: Math.round(performance.now() - start), bytes: Buffer.byteLength(body), body };
  } catch (error) {
    return { status: 0, error: error.message, body: '', headers: {}, bytes: 0 };
  }
}
const robots = await get('/robots.txt');
const sitemap = await get('/sitemap.xml');
if (sitemap.status !== 200) throw new Error(`Sitemap unavailable: HTTP ${sitemap.status}. ${sitemap.error || ''}`);
const xml = new JSDOM(sitemap.body, { contentType: 'text/xml' }).window.document;
const sitemapPaths = [...xml.querySelectorAll('url > loc')].map((node) => new URL(node.textContent).pathname);
const queue = [...new Set(['/', ...sitemapPaths])];
const pages = [];
const downloads = new Set();
for (let i = 0; i < queue.length && i < 150; i++) {
  const path = queue[i];
  const result = await get(path);
  const dom = new JSDOM(result.body);
  const doc = dom.window.document;
  const meta = (selector) => doc.querySelector(selector)?.getAttribute('content') || null;
  const main = doc.querySelector('main')?.cloneNode(true);
  main?.querySelectorAll('script, style, nav, form, #contact').forEach((node) => node.remove());
  const content = normalize(main?.textContent);
  const links = [...doc.querySelectorAll('a[href]')].flatMap((a) => {
    const href = new URL(a.getAttribute('href'), canonicalOrigin + path);
    if (!['https:', 'http:'].includes(href.protocol)) return [];
    const internal = [canonicalOrigin, base.origin].includes(href.origin);
    if (internal && /\.[a-z0-9]{2,5}$/i.test(href.pathname)) downloads.add(href.pathname);
    if (internal && !queue.includes(href.pathname) && !/^\/(app|api|tools)(\/|$)/.test(href.pathname) && !/\.[a-z0-9]{2,5}$/i.test(href.pathname)) queue.push(href.pathname);
    return [{ href: href.href, path: href.pathname, hash: href.hash, text: normalize(a.textContent), internal, contextual: Boolean(a.closest('main') && !a.closest('nav, #contact')) }];
  });
  const schema = [];
  const schemaErrors = [];
  for (const node of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try { const data = JSON.parse(node.textContent); schema.push(...(data['@graph'] || [data])); }
    catch (error) { schemaErrors.push(error.message); }
  }
  pages.push({ path, inSitemap: sitemapPaths.includes(path), status: result.status, finalUrl: result.finalUrl, elapsedMs: result.elapsedMs, htmlBytes: result.bytes, title: doc.title, description: meta('meta[name="description"]'), canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), robots: meta('meta[name="robots"]'), xRobots: result.headers['x-robots-tag'] || null, h1: [...doc.querySelectorAll('h1')].map((n) => normalize(n.textContent)), h2: [...doc.querySelectorAll('h2')].map((n) => normalize(n.textContent)), wordCount: content.split(/\s+/).filter(Boolean).length, contentHash: createHash('sha256').update(content).digest('hex'), content, ids: [...doc.querySelectorAll('[id]')].map((n) => n.id), links, schema, schemaErrors, images: [...doc.querySelectorAll('img')].map((n) => ({ src: n.getAttribute('src'), alt: n.getAttribute('alt'), width: n.getAttribute('width'), height: n.getAttribute('height'), loading: n.getAttribute('loading') })), scriptSources: [...doc.querySelectorAll('script[src]')].map((n) => n.getAttribute('src')) });
  dom.window.close();
}
const depths = { '/': 0 };
for (let pass = 0; pass < pages.length; pass++) for (const p of pages) {
  if (depths[p.path] === undefined) continue;
  for (const link of p.links.filter((l) => l.internal)) if (depths[link.path] === undefined || depths[link.path] > depths[p.path] + 1) depths[link.path] = depths[p.path] + 1;
}
const brokenLinks = pages.flatMap((p) => p.links.filter((l) => l.internal).flatMap((link) => {
  const target = pages.find((q) => q.path === link.path);
  if (target && (target.status !== 200 || (link.hash && !target.ids.includes(decodeURIComponent(link.hash.slice(1)))))) return [{ from: p.path, to: link.href, status: target.status, missingAnchor: Boolean(link.hash && !target.ids.includes(decodeURIComponent(link.hash.slice(1)))) }];
  return [];
}));
const duplicateGroups = (key) => Object.values(Object.groupBy(pages, (p) => p[key])).filter((g) => g.length > 1).map((g) => g.map((p) => p.path));
// A similarity flag is for editorial review, not a duplicate-content verdict.
const similarPages = [];
for (let a = 0; a < pages.length; a++) for (let b = a + 1; b < pages.length; b++) {
  const wordsA = new Set(pages[a].content.toLowerCase().match(/[a-z]{3,}/g) || []);
  const wordsB = new Set(pages[b].content.toLowerCase().match(/[a-z]{3,}/g) || []);
  const union = new Set([...wordsA, ...wordsB]);
  const overlap = [...wordsA].filter((word) => wordsB.has(word)).length;
  const similarity = union.size ? overlap / union.size : 0;
  if (similarity >= 0.7) similarPages.push({ paths: [pages[a].path, pages[b].path], wordSetJaccard: Number(similarity.toFixed(3)) });
}
const crawlerAccess = [];
if (!local) for (const userAgent of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Claude-SearchBot']) {
  const result = await get('/', { 'User-Agent': userAgent });
  crawlerAccess.push({ userAgent, status: result.status, bytes: result.bytes, xRobots: result.headers['x-robots-tag'] || null });
}
const downloadChecks = [];
for (const path of downloads) { const result = await get(path); downloadChecks.push({ path, status: result.status, bytes: result.bytes }); }
const report = { generatedAt: new Date().toISOString(), base: base.href, scope: 'All sitemap URLs and reachable internal marketing pages; one sequential request per page. No authenticated search-console/CDN access. HTTP elapsed time is not a Core Web Vital.', robots, sitemap: { status: sitemap.status, body: sitemap.body }, summary: { pages: pages.length, sitemapPages: sitemapPaths.length, brokenLinks, duplicateTitles: duplicateGroups('title'), duplicateDescriptions: duplicateGroups('description'), duplicateContent: duplicateGroups('contentHash'), orphans: pages.filter((p) => depths[p.path] === undefined).map((p) => p.path), maxDepth: Math.max(...pages.map((p) => depths[p.path] ?? 0)) }, pages: pages.map((p) => ({ ...p, crawlDepth: depths[p.path] ?? null, contextualInbound: pages.filter((q) => q.path !== p.path && q.links.some((l) => l.internal && l.contextual && l.path === p.path)).map((q) => q.path) })), crawlerAccess, downloads: downloadChecks };
report.summary.similarPages = similarPages;
await mkdir(output.slice(0, output.lastIndexOf('/')), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output, ...report.summary, crawlerAccess, downloads: downloadChecks }, null, 2));
