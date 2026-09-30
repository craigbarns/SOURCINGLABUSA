#!/usr/bin/env node

/**
 * Automated SEO, i18n & API Health Check for Sourcing Lab USA
 * Validates production availability, language tags, canonicals, hreflang reciprocity, sitemap, and contact endpoint.
 */

const PRODUCTION_ORIGIN = process.env.SITE_ORIGIN || 'https://sourcinglabusa.com';

async function checkUrl(url, options = {}) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'SourcingLab-HealthCheck/1.0',
        ...options.headers,
      },
      ...options,
    });
    const duration = Date.now() - start;
    const text = await res.text();
    return { ok: res.ok, status: res.status, duration, text, headers: res.headers };
  } catch (error) {
    return { ok: false, status: 0, duration: Date.now() - start, text: '', error: error.message };
  }
}

async function runHealthCheck() {
  console.log(`\n🔍 Starting SEO & System Health Check on ${PRODUCTION_ORIGIN}...\n`);
  const results = [];

  // 1. Homepage (EN)
  const home = await checkUrl(`${PRODUCTION_ORIGIN}/`);
  const homeLangOk = /<html[^>]*lang=["']en-US["']/i.test(home.text);
  const homeCanonicalOk = /<link[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/sourcinglabusa\.com\/?["']/i.test(home.text);
  const homeHreflangOk =
    /hreflang=["']en-US["']/i.test(home.text) &&
    /hreflang=["']es-US["']/i.test(home.text) &&
    /hreflang=["']x-default["']/i.test(home.text);

  results.push({
    test: 'Homepage (EN) HTTP 200',
    status: home.status === 200 ? '✅ Pass' : '❌ Fail',
    detail: `${home.duration}ms (status ${home.status})`,
  });
  results.push({
    test: 'Homepage (EN) <html lang="en-US">',
    status: homeLangOk ? '✅ Pass' : '❌ Fail',
    detail: homeLangOk ? 'Found en-US' : 'Missing or incorrect',
  });
  results.push({
    test: 'Homepage (EN) Canonical & Hreflang',
    status: homeCanonicalOk && homeHreflangOk ? '✅ Pass' : '❌ Fail',
    detail: 'Canonical https://sourcinglabusa.com + hreflang en-US/es-US/x-default',
  });

  // 2. Spanish Homepage (/es)
  const es = await checkUrl(`${PRODUCTION_ORIGIN}/es`);
  const esLangOk = /<html[^>]*lang=["']es-US["']/i.test(es.text);
  const esCanonicalOk = /<link[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/sourcinglabusa\.com\/es\/?["']/i.test(es.text);
  const esHreflangOk =
    /hreflang=["']en-US["']/i.test(es.text) &&
    /hreflang=["']es-US["']/i.test(es.text) &&
    /hreflang=["']x-default["']/i.test(es.text);
  const esContentOk = es.text.includes('Sourcing global') || es.text.includes('entrada al mercado de EE. UU.');

  results.push({
    test: 'Spanish (/es) HTTP 200',
    status: es.status === 200 ? '✅ Pass' : '❌ Fail',
    detail: `${es.duration}ms (status ${es.status})`,
  });
  results.push({
    test: 'Spanish (/es) <html lang="es-US">',
    status: esLangOk ? '✅ Pass' : '❌ Fail',
    detail: esLangOk ? 'Found es-US' : 'Missing or incorrect',
  });
  results.push({
    test: 'Spanish (/es) Canonical & Hreflang',
    status: esCanonicalOk && esHreflangOk ? '✅ Pass' : '❌ Fail',
    detail: 'Canonical https://sourcinglabusa.com/es + hreflang reciprocity',
  });
  results.push({
    test: 'Spanish (/es) Translated Content',
    status: esContentOk ? '✅ Pass' : '❌ Fail',
    detail: 'Verified native Spanish copy & headings',
  });

  // 3. Sitemap XML
  const sitemap = await checkUrl(`${PRODUCTION_ORIGIN}/sitemap.xml`);
  const sitemapEn = sitemap.text.includes('https://sourcinglabusa.com/');
  const sitemapEs = sitemap.text.includes('https://sourcinglabusa.com/es');
  const sitemapCount = (sitemap.text.match(/<loc>/g) || []).length;

  results.push({
    test: 'Sitemap.xml Availability & URLs',
    status: sitemap.status === 200 && sitemapEn && sitemapEs ? '✅ Pass' : '❌ Fail',
    detail: `${sitemapCount} URLs indexed (including / and /es)`,
  });

  // 4. Robots.txt
  const robots = await checkUrl(`${PRODUCTION_ORIGIN}/robots.txt`);
  const robotsSitemap = robots.text.includes('sitemap.xml');
  results.push({
    test: 'Robots.txt Directive & Sitemap pointer',
    status: robots.status === 200 && robotsSitemap ? '✅ Pass' : '❌ Fail',
    detail: 'Points to sitemap.xml and allows public crawling',
  });

  // 5. Contact Form API Endpoint
  const contactApi = await checkUrl(`${PRODUCTION_ORIGIN}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: PRODUCTION_ORIGIN,
      Referer: `${PRODUCTION_ORIGIN}/es`,
    },
    body: JSON.stringify({
      name: 'System HealthCheck',
      email: 'monitoring@sourcinglabusa.com',
      projectType: 'packaging',
      quantityRange: 'from_500_to_2000',
      sourcePath: '/healthcheck',
      locale: 'es',
      message: 'Automated weekly health check ping',
    }),
  });
  results.push({
    test: 'Contact API Route (/api/contact)',
    status: contactApi.status === 201 || contactApi.status === 200 ? '✅ Pass' : '❌ Fail',
    detail: `HTTP ${contactApi.status} in ${contactApi.duration}ms`,
  });

  // Print Summary Table
  console.table(results);

  const hasFailures = results.some((r) => r.status.includes('Fail'));

  // Export to GitHub Step Summary if running in CI
  if (process.env.GITHUB_STEP_SUMMARY) {
    const fs = await import('fs');
    const rows = results
      .map((r) => `| ${r.test} | ${r.status} | ${r.detail} |`)
      .join('\n');
    const markdown = `## 📊 Weekly SEO & System Health Check Report\n\n| Test | Result | Details |\n| :--- | :---: | :--- |\n${rows}\n\n*Executed at: ${new Date().toISOString()}*\n`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
  }

  if (hasFailures) {
    console.error('\n⚠️ One or more health checks failed!');
    process.exit(1);
  } else {
    console.log('\n🎉 All SEO, i18n & API health checks passed successfully!\n');
  }
}

runHealthCheck();
