# Sourcing Lab USA — implementation and before/after report

Date: 21 October 2026. Base: `401bd3520dd2c8b9c0e3a147cb634f35cae20e3b`.
Status: tested implementation on a review branch. No production deployment or real lead submission was performed.

## Deliverables

- **A — SEO/GEO audit:** [INITIAL_AUDIT.md](INITIAL_AUDIT.md), public production crawl evidence in `live-baseline.json.gz` and redirect checks in `http-baseline.json`.
- **B — Architecture:** [STRATEGY.md](STRATEGY.md), retaining established service URLs and distinguishing sourcing, market-entry research and recurring representation.
- **C — Keyword map:** commercial intent and page mapping in the strategy. Historical Search Console analysis was delivered separately in a local private report; account performance data is excluded from this public repository. Search volume, difficulty and current rankings are not invented.
- **D — Technical changes:** canonical/indexability consistency, reciprocal EN/ES/ZH schema/languages, current social card, explicit crawler policy, audited internal links and patched production dependencies.
- **E — Content/conversion:** harmonized homepage and priority service/industry pages; separate sourcing and manufacturer qualification forms; no U.S. office, employees, visa, fixed-price or sales guarantee invented. See [CONVERSIONS.md](CONVERSIONS.md).
- **F — AI visibility:** source-based crawler/discovery strategy, stable business identifiers and 48 realistic monitoring questions with a manual observation protocol. No AI answer-platform results were simulated.
- **G — 90-day roadmap:** dated phases, source-specific metrics, owner tasks and acquisition experiments in the strategy.
- **H — Before/after:** table below, final crawl `local-after.json.gz`, SEO assertions `seo-validation.json`, dependency evidence `security-audit.json`, plus the screenshots in this directory.

## What changed and how to measure it

| Area | Before | Implemented | Why it matters / measurement |
| --- | --- | --- | --- |
| Audience journeys | Two pillars in headlines, generic sourcing form for both; EN/ES secondary hero targets absent | Real sourcing and manufacturer destinations, distinct qualification, localized manufacturer form EN/ES/ZH | Measure acknowledged submissions and CRM-qualified opportunities separately by journey |
| Operating model | About/process pages emphasized only product supply; sales copy implied an existing local U.S. firm/team | Two activities explained consistently; France/China contracting today, Miami planned for 2027; specialist delivery identified | Review quote-fit and lead relevance; do not treat a retainer discussion as a signed agreement |
| Service claims | Unsupported MOQs, delivery times, tariff/penalty figures, blanket certification/compliance and sales promises | Scope, evidence, approvals, specialist responsibilities and proposal-based timing | Check accuracy against actual proposals and review dated references when facts change |
| Sitemap | 58 URLs including a deliberately noindexed HS helper | 59 canonical indexable marketing URLs: remove that helper, add two public tools | 59/59 local pages return 200; nonindexable sitemap entries 1 → 0 |
| Links | 2 broken internal fragment targets | Repaired audience CTAs and resource/industry links | Final crawl: broken links 2 → 0, orphan pages 0, maximum depth 3 |
| Metadata/schema | WebSite omitted published Chinese language; old social positioning; some repeated brand suffixes | EN/ES/ZH graph languages, shared two-pillar card, normalized title suffix; accurate editorial dates | Automated assertions for canonical/social URLs, languages, visible FAQs, author/date consistency and unique metadata |
| Lead delivery | Generic 201/200 counted as received even without storage; partial contact data logged | Success requires database acknowledgement or explicit Netlify receipt; fields preserved on error; email fallback and 15-second request timeouts | Controlled owner test must confirm actual database record and notification; code tests cannot prove inbox delivery |
| Abuse controls | Honeypot always sent as an empty literal | Actual hidden trap sent to both sinks; strict validation/origin/rate/size controls retained | Test trap behavior and full manufacturer qualification serialization; limiter remains process-local |
| Analytics | GA4 loaded immediately on live origins | Explicit, revocable EN/ES/ZH consent; no tag before opt-in; no qualification values in event data | Check consented GA4 events in the owner's property, with journey dimensions; submission is not qualification |
| Working resources | Five downloadable worksheets; calculator available within app surface | Two public browser-only tools and three new worksheets linked from homepage/services/resources | Track consented resource completion and the resulting qualified opportunities; do not gate tools behind email |
| Performance | Production homepage HTML 222,346 bytes in baseline crawl | Final compiled homepage payload is recorded in local crawl; duplicated risk/claim copy reduced and Chinese page server-composed | Payload difference is descriptive across environments. Field LCP/INP/CLS and p75 still require real-user data |
| Security | Production audit: 1 critical, 2 high, 6 moderate vulnerability entries | Next/ESLint 16.3.8, Sharp 0.35.5, source-map-js 1.2.2; high-threshold production audit passes | Final production audit has 0 critical/0 high, 6 moderate transitive entries retained for scoped follow-up; see SECURITY.md |

## Free tools

- `/tools/landed-cost-calculator`: USD planning arithmetic using explicit quantity, purchase price, customs value, base/additional ad valorem rates, freight, insurance and other charges. Supports rates over 100%; no live rate lookup or classification. The browser-tested scenario totals $2,960 and $29.60 per unit; these are illustrative test inputs, not a real shipment or tax determination.
- `/tools/us-market-entry-assessment`: eight equally weighted self-reported documentation questions, 0–2 points each. A missing requirement remains visible even at 14/16. No forecast of sales, import eligibility or legal clearance. Worksheet downloads locally; raw answers are not submitted.
- `dashboard.html`: standalone internal founder dashboard. All metrics start unmeasured. Add dated, source-labeled observations manually or by CSV; no invented baseline, network access or silent aggregation. Do not commit actual account/CRM exports to this public repository.

## Validation

- ESLint with `--max-warnings=0`: passed.
- TypeScript: passed against regenerated route types.
- Vitest: 25 files / 135 tests passed after the dependency corrections.
- Next.js 16.3.8 production build: passed with `npm run build -- --webpack`, 77 generated routes/assets. Default Turbopack was unavailable in this host's port-restricted process environment; production framework and configuration remain Next.js. The build's metadataBase warning is limited to the framework fallback `_not-found.html`; all indexable marketing pages passed absolute canonical/social metadata assertions.
- `npm audit --omit=dev --audit-level=high`: passed. Six moderate transitive production entries remain; this is not a claim that every development dependency is clear.
- SEO assertions: 59 pages, 3,226 internal links and eight downloads passed, including visible FAQ/schema parity, authors/dates, hreflang, preview/app noindex boundaries and bot policy.
- Complete compiled-site GET crawl: 59 pages, no broken links, duplicates or orphans, maximum link depth three; eight downloadable worksheets return 200.
- Chrome UI: existing desktop viewport and a 390×844 CSS viewport checked. Homepage, calculator, readiness results and manufacturer conversion path render without horizontal overflow. Calculator arithmetic and the 14/16 readiness gap were exercised. English and Chinese manufacturer field labels verified. Declined analytics produced no Google tag. No production or local form was submitted by browser; form outcomes were tested with mocks.

Compressed JSON contains the complete crawl, including repeated link and schema records. To inspect without changing the archive: `gzip -dc live-baseline.json.gz` or `gzip -dc local-after.json.gz`.

## Remaining owner/platform work before treating this as live acquisition

1. Review the proposed commercial wording. Supply the exact legal names, addresses and approved contractual/retainer terms before publishing definitive legal terms or prices. No Terms of Service page with invented identities has been added.
2. Verify production Supabase insertion and Netlify Forms detection/recipient settings, then send clearly labeled owner-controlled tests through both journeys. A platform receipt does not prove inbox delivery or a qualified lead.
3. Confirm Search Console and Bing ownership and sitemap submission, GA4 property/key events, and the available Google/Bing generative-AI reporting features. Verification tags being absent cannot rule out DNS verification.
4. IndexNow is documented as an optional owner-configured step. No key or submission is claimed active. GPTBot's existing public allowance is explicitly preserved; discovery and training policies are distinguished in the strategy.
5. Establish real-user Core Web Vitals and current U.S. query/page baselines. No Lighthouse score, p75 performance, AI citation increase, backlinks, leads or revenue is asserted by this implementation.
6. Run the 90-day plan progressively. New articles, external directory profiles, outreach, press placements, verified U.S. location pages and actual AI-platform observations are future work, not fictional completions.

## Changelog

Preserved existing service URLs, redirects, app workflows, case studies and founder project provenance. Reworked priority commercial copy, shared service journey rendering and localized entry hubs. Added public planning tools, manufacturer qualification, delivery/consent regressions, resource downloads and review artifacts. Corrected sitemap/schema/share images and patched vulnerable production packages. No domain, hosting provider, legal identity, definitive pricing or production data was changed.
