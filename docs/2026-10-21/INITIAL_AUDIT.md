# Initial live SEO, GEO and conversion audit — 21 October 2026

Baseline captured before architectural changes. Evidence: `live-baseline.json.gz` (complete crawl, gzip-compressed JSON) and `http-baseline.json` (redirect/404 checks). Source baseline: Git commit `401bd3520dd2c8b9c0e3a147cb634f35cae20e3b`.

## Scope and limits

Read-only GET crawl of all 58 URLs in the production XML sitemap and all standard internal HTML links found on those pages. All 58 sitemap pages were reachable; no additional marketing pages were discovered outside that set. Five linked public worksheet downloads were fetched. Authenticated application routes, private APIs and lead submissions were not exercised. No test lead was sent to production. Crawler requests changed only the User-Agent string: this tests the response to that header, not verified bot-IP access or actual indexing.

No Search Console, Bing Webmaster Tools, analytics reporting, paid keyword database, backlink database, field Core Web Vitals dataset or AI-platform account was inspected. No ranking, traffic, lead, citation, search volume or keyword-difficulty figures are inferred. HTTP request time is not LCP, INP, CLS or a 75th-percentile field metric. Mobile visual QA and interaction testing remain release checks.

## Critical issues

1. **Commercial claims exceed the substantiated operating model.** The homepage and several service pages describe an on-the-ground U.S. commercial team, U.S. timezone coverage, customs clearance, exact tariff classification, certified/technical audits and fulfillment infrastructure as if established. `/us-sales-representation` says it is an experienced American sales firm and representative on the ground, suggests 50–100 buyer targets per month and 60–120 days to a first purchase order. These claims need scoped, evidence-based wording. Preserve both requested business pillars while distinguishing international coordination today, independently contracted specialist services, and future U.S. operations. Do not imply visa approval, a U.S. entity, office, staff, guaranteed orders or regulatory outcomes.
2. **Lead success can be reported without durable delivery.** Source review found `/api/contact` returns HTTP 201 when Supabase is unconfigured, logs a subset of personal contact information, and reports `delivery: []`. The UI accepts the API's generic successful status. The separate Netlify Forms helper counts any successful HTTP response as acceptance, even if a fallback static page was returned. Real production storage/delivery cannot be verified without authorized delivery testing and platform settings. Correct the code to require an acknowledged sink, preserve entered information on failure and offer email fallback.
3. **Sitemap contradicts indexability.** `/tools/hs-code-finder` appears in the live sitemap but has `noindex, nofollow` and no canonical. Keep this experimental, compliance-sensitive application tool outside the marketing sitemap unless it becomes a complete, intentionally indexable public resource.

## High-impact opportunities

- **Repair two broken journey CTAs.** Homepage `/#representation` and Spanish `/es#representation` targets do not exist. Both audience journeys should reach real landing pages and differentiated forms. The existing generic sourcing brief requests product quantities but does not qualify a manufacturer's market-entry objectives.
- **Unify the two-pillar proposition.** The homepage already says “Global Sourcing & Market Entry for the U.S.” while About, How We Work, contact copy and several resource pages emphasize only China product supply, clothing and packaging. Keep these real specialties while explaining the wider, scoped sourcing and market-entry offer consistently in visible copy and JSON-LD.
- **Limit speculative operational detail.** Remove unsupported fixed MOQs, timelines, buyer counts, infrastructure promises and blanket legal statements. Name the actual deliverable, required inputs, approval gates and the independent specialists used for product-specific work.
- **Use existing URLs.** Most requested high-intent destinations already exist (`/china-sourcing`, `/china-sourcing-agent`, `/private-label-manufacturing`, `/us-market-entry`, `/us-sales-representation`, `/landed-cost-analysis`). Improve them before adding overlapping keyword pages. Compare `/market-entry-consulting` with `/us-market-entry` for distinct intent before any consolidation; ranking evidence is required before redirects.
- **Promote useful public tools.** The current landed-cost calculation code is inside the application. A public calculation page with editable rates, documented assumptions, exclusions and a relevant sourcing CTA can generate better-qualified inquiries. A separate U.S. market-entry readiness tool should explain evidence gaps without claiming to certify legal readiness.
- **Honeypot is not wired.** The contact schema and server recognize `botField`, but the existing UI always submits an empty literal. Add an actual hidden trap field and carry its value to both delivery channels. Existing same-origin checks, validation, request limits and rate limiting are useful safeguards to retain.
- **Analytics consent and attribution need review.** A GA4 bootstrap for `G-ZJ0M56QGGM` is present in production HTML and is initialized on configured live origins. This proves tag code exists, not that events arrive in the correct property or are configured as key events. No consent gate was found in the reviewed source. Keep personal qualification fields out of analytics and make tracking depend on consent where applicable.
- **Separate search crawlers from training crawlers.** Production robots currently grants wildcard access, with `/app` and `/api/` blocked. Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot and Claude-SearchBot each returned HTTP 200 to a header-only probe. Document the business policy and current official bot roles; do not describe this as AI-platform inclusion. `llms.txt` is optional and experimental.
- **Corporate review remains necessary.** No terms page is in the live sitemap. Exact legal names and commercial pricing are not supplied. Do not manufacture them. Contracting identity, retainer amounts, agency authority, commissions and legal terms require founder approval before definitive contractual statements are published.

## Existing strengths to preserve

- Production runs on **Next.js with Netlify hosting**, confirmed by public response headers and repository configuration. Marketing content is delivered in the initial HTML, rather than depending on client-side JavaScript to expose the main copy.
- **58/58 crawled pages returned HTTP 200.** No duplicate titles, meta descriptions or exact main-content hashes were found. All pages had one H1 and a meta description. The 57 intentional marketing pages had self-consistent canonicals; the one exception is the noindexed tool described above.
- **No discovered orphan marketing pages.** All 58 pages were reachable through HTML links, with maximum measured depth three. The crawl found two broken fragment targets and no broken page targets. Five linked worksheets returned HTTP 200.
- **Structured data parses successfully.** JSON-LD exists across all pages and contains stable Organization/Person/WebSite identifiers, service data, breadcrumbs and editorial attribution. Schema validity and truthful content alignment still need checking; parsing alone does not prove Google rich-result eligibility. No invented U.S. address appears on the Organization node inspected.
- **Image basics are sound.** Every crawled `<img>` includes alt, width and height attributes. This reduces common accessibility and layout-shift risks, without proving WCAG compliance or real-user CLS.
- **Useful trust infrastructure exists.** Founder, About, How We Work, editorial policy, privacy, source-linked articles and downloadable sourcing worksheets are already present. Preserve the editorial and source-review workflows.
- **Canonical-domain handling exists.** The `www` homepage redirects permanently to the apex domain. Cached HTML and immutable caching for versioned Next.js assets are configured; neither justifies a performance score without measurement.

## Technical observations

The homepage crawl received 222,346 HTML bytes, including Next.js hydration data. This is a review target, not proof of poor Core Web Vitals. Requests in this single sequential run took approximately 0.30–1.74 seconds end to end; geography, caching and network conditions make them unsuitable as business KPIs. Current document security headers include HTTPS HSTS, content-type protection, a frame-ancestor policy and referrer policy.

The dynamic sitemap already derives article `lastmod` from editorial dates and does not stamp every entry with the current crawl time. Retain meaningful modification dates. English, Spanish and Simplified Chinese homepage alternates are present. Automated word counts are not reliable for Chinese, so the whitespace-based count must not be treated as thin-content evidence.

Search Console and Bing verification meta tags were absent in the fetched homepage HTML. The source supports verification environment variables; an owner may also verify through DNS, which cannot be ruled out by this check. No IndexNow configuration was verified. Existing internal application and AI endpoints should remain protected and excluded from search indexing.

## Recommended implementation order

1. Correct unsupported claims, missing audience anchors, misleading lead success, unwired honeypot and sitemap/indexability conflict.
2. Connect the two journeys to clear existing service pages and separate qualification forms. Preserve current France/China project availability and explicit quotation-based contracting identity.
3. Publish and test public landed-cost and market-entry readiness resources; retain existing service URLs and contextual links.
4. Align metadata, JSON-LD, language pages, founder/current-operations disclosures and conversion events; verify accessibility, mobile rendering and production build behavior.
5. Have the founder complete legal identity/pricing review and connected-platform verification. Establish actual Search Console/Bing/GA4/CRM and AI-citation baselines before expansion or ranking claims.

## Baseline measures for the release comparison

| Measure | Production baseline | Release goal |
| --- | --- | --- |
| Sitemap URLs fetched | 58 | All canonical marketing URLs return 200 |
| Nonindexable sitemap entries | 1 | 0 |
| Broken internal fragment links | 2 | 0 |
| Duplicate titles/descriptions/exact main content | 0 / 0 / 0 | Preserve uniqueness |
| Required H1/description missing | 0 / 0 | Preserve |
| JSON-LD parse failures | 0 | Preserve and validate truthful alignment |
| Verified production end-to-end lead delivery | Not tested | Founder/platform validation required |
| Differentiated journey qualification | Shared sourcing form | Dedicated sourcing and market-entry workflows |
| Field CWV, organic conversions, AI citations | No account data inspected | Establish real measured baselines |
