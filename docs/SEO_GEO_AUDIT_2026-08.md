# SEO + GEO audit — Sourcing Lab USA

**Audit date:** 31 August 2026

**Primary market/language:** United States / American English
**Business rule:** SEO must follow the business model. SEO must never redefine the business model.

## 1. Positioning to preserve

> **Sourcing Lab USA is a custom packaging and textile procurement partner for U.S. brands. A Miami launch is planned for 2027.**

The commercial model is product procurement, purchase/import, supply, and resale — not a generic sourcing-agent or consulting offer. The content may describe supplier coordination, sampling, production follow-up, agreed quality checkpoints, and direct China-to-U.S. delivery when the order terms support it.

It must not claim a current U.S. office, team, warehouse, inventory, factory ownership, certified inspection service, customs brokerage, freight forwarding, certification service, or existing U.S. customer base.

## 2. Executive audit

| Area | Finding | Impact | Difficulty | Priority | Action |
| --- | --- | ---: | ---: | --- | --- |
| E-2 coherence | Structured data previously implied a 2027 Miami founding/location as an existing business fact. | 10/10 | 1/10 | P0 | Removed from schema. Keep the Miami launch explicitly prospective. |
| Customs/tariffs | The public HS-code page promised a “correct” code and duty calculation. This is high-stakes and outside the commercial offer. | 10/10 | 2/10 | P0 | Kept the helper available but removed it from navigation/sitemap and set it to `noindex`. It now states that it is preliminary research only. |
| Content veracity | Blog posts contained unsupported duty/lead-time/MOQ/sustainability figures and claims of certified supplier networks or DDP service. | 10/10 | 3/10 | P0 | Rewrote the four posts around documented, order-specific guidance. |
| Deployment reliability | Netlify’s Git deployment is currently failing with `Host key verification failed`; manual CLI deploys work. | 9/10 | 4/10 | P0 | Reconnect or repair the GitHub integration in Netlify before relying on automatic publishing. |
| Crawl control | `/app`, the research helper, Spanish draft, and Netlify’s static form endpoint should not compete for organic traffic. | 8/10 | 2/10 | P0 | App already noindexes; helper and Spanish draft are now noindexed; the static form endpoint is noindexed. |
| Commercial architecture | The home page carries many different search intents. There are no dedicated pages for packaging, textile, private label, procurement, or product development. | 9/10 | 6/10 | P1 | Build a small set of high-intent pages after checking the live SERP for each target. |
| Conversion measurement | No analytics or Search Console verification code is present in the repository. | 9/10 | 3/10 | P1 | Connect Search Console, Bing Webmaster Tools, and privacy-compliant analytics before content expansion. |
| E-E-A-T | The site states genuine experience but has no approved founder page, evidence library, author bio, case study, or original project imagery. | 8/10 | 6/10 | P1 | Publish only approved, documented experience and anonymized case studies. |
| Spanish page | `/es` is not fully translated and has no language-specific navigation. | 6/10 | 5/10 | P1 | Keep `noindex` until the content is professionally reviewed. Then add reciprocal `hreflang` tags and include it in the sitemap. |
| Legal data collection | The contact form collects names, email addresses, and project briefs without a visible privacy policy. | 8/10 | 5/10 | P1 | Draft a policy only after confirming the legal entity, storage, recipients, retention, and form/CRM providers. |
| Core Web Vitals | The production build is clean, but there is no field-data source in the repo. | 6/10 | 4/10 | P2 | Measure in Search Console/CrUX after launch; do not invent performance scores. |

### Technical status after the P0 code changes

- `robots.txt` points to the XML sitemap and blocks the private app/API routes.
- Homepage and blog canonicals are present; blog article canonicals and `BlogPosting` URLs were added.
- The production build, TypeScript check, lint, and 82 tests pass locally.
- The Spanish draft and HS-code helper are deliberately excluded from search until they meet the business and accuracy standard.
- No 404, redirect, index coverage, Core Web Vitals, or ranking diagnosis can be considered final until Search Console is connected.

## 3. Existing-page decisions

| URL | Decision | Reason |
| --- | --- | --- |
| `/` | Keep and optimize | Correct brand platform; should become the gateway to the focused service pages. |
| `/blog` | Keep and optimize | Use as a resource hub linking visitors to the relevant commercial page. |
| `/blog/custom-packaging-moq-guide` | Keep, rewritten | Strong packaging intent; no unsupported universal MOQ claim. |
| `/blog/calculating-landed-costs-merchandise` | Keep, rewritten | Useful decision-support topic; official sources now used for the classification caveat. |
| `/blog/sustainable-textile-sourcing` | Keep, rewritten | Reframed as documentation and material-brief guidance, not certification services. |
| `/blog/miami-future-hub-sourcing` | Keep, rewritten | Reframed as a truthful 2027 planned-launch page, not a claim about Miami logistics. |
| `/tools/hs-code-finder` | Keep but `noindex` | Useful preliminary helper, but not a public acquisition page or binding customs guidance. |
| `/app` | Keep `noindex` | Private/restricted sourcing workspace; not part of the marketing SEO strategy. |
| `/es` | Keep `noindex` temporarily | It is not yet a fully reviewed Spanish experience. |
| `/contact.html` | Keep `noindex` | Netlify form-detection endpoint, not a landing page. |

No page needs deletion today. Do **not** create broad pages such as `/china-sourcing-agent/`, `/factory-audit-china/`, `/customs-clearance/`, `/freight-forwarding/`, or `/amazon-sourcing-agent/` under the current business model.

## 4. Current SEO competitors to monitor

These are SEO/market competitors, not a claim that each targets exactly the same buyer or that they rank in a fixed order.

| Competitor | Why it matters | What Sourcing Lab USA should learn — without copying claims |
| --- | --- | --- |
| [PakFactory](https://pakfactory.com/) | U.S.-facing custom-packaging platform with a wide product catalog. | Structured product-type pages, clear quote path, decision help. |
| [PackMojo](https://packmojo.com/) | Strong content/product architecture; China production-partner model and samples. | Product pages, useful specification tools, transparent process. |
| [Arka](https://www.arka.com/) | U.S. custom-packaging competitor with lead magnets and product discovery. | Downloadable checklist and conversion-focused educational content. |
| [DulinkPack](https://www.dulinkpack.com/) | Direct packaging-sourcing competitor focused on China. | Packaging category depth; its QC/certification claims must not be imitated without proof. |
| [Wanxin Pack](https://www.wanxinpack.com/) | Packaging coordination from China with practical RFQ-style content. | Detailed brief, sampling, and specification language. |
| [Huarong Packaging](https://www.huarongpackaging.com/) | China packaging manufacturer ranking on custom packaging terms. | The SERP rewards exact product scope and sample/artwork content. |
| [JF Packaging](https://www.jfpak.com/) | Premium custom-box manufacturer focused on global clients. | Premium category language and rigid-box/retail-packaging depth. |
| [ALC Packaging](https://alcpackaging.com/) | Manufacturer-direct packaging supplier targeting English-speaking buyers. | Clear commercial pages, but avoid “manufacturer-direct” unless factually true. |
| [Deepwove](https://deepwove.com/for-north-american-brands/) | Textile/apparel competitor for North American brands. | Narrow category focus and informed content; do not mirror its in-house factory/team claims. |
| [CNCARE USA](https://cncareusa.com/sourcing) | U.S.-buyer-facing China sourcing service. | Qualification by specifications, quantity, commercial target, timing, and destination. |

The exact “custom packaging manufacturer China” SERP is heavily occupied by factories. Sourcing Lab USA should not compete by pretending to be a factory. Its viable difference is a **truthful U.S.-oriented procurement process for custom packaging and textile briefs**, with clear documentation and a direct commercial route.

## 5. Keyword map (100 opportunities to validate)

Volumes and keyword difficulty are deliberately **not invented** here. Validate them in Google Search Console after launch and in a paid keyword tool before writing. `P` means the priority for SERP validation, not a promise of ranking.

### Custom packaging — 01–20

| # | Keyword | Intent | Candidate page | P |
| ---: | --- | --- | --- | --- |
| 1 | custom packaging manufacturer | Commercial | `/custom-packaging/` | P1 |
| 2 | custom packaging for brands | Commercial | `/custom-packaging/` | P1 |
| 3 | custom packaging supplier | Commercial | `/custom-packaging/` | P1 |
| 4 | custom packaging procurement | Commercial | `/packaging-procurement/` | P1 |
| 5 | custom boxes for business | Commercial | `/custom-packaging/` | P1 |
| 6 | branded packaging for businesses | Commercial | `/custom-packaging/` | P1 |
| 7 | custom retail packaging | Commercial | `/custom-packaging/` | P2 |
| 8 | ecommerce packaging supplier | Commercial | `/custom-packaging/` | P2 |
| 9 | private label packaging | Commercial | `/private-label-packaging/` | P1 |
| 10 | custom packaging supplier usa | Commercial | `/custom-packaging/` | P2 |
| 11 | custom product packaging | Commercial | `/custom-packaging/` | P1 |
| 12 | custom packaging quote | Transactional | `/custom-packaging/` | P1 |
| 13 | packaging design and production | Commercial | `/product-development/` | P2 |
| 14 | packaging product development | Commercial | `/product-development/` | P1 |
| 15 | custom packaging samples | Commercial | `/product-development/` | P2 |
| 16 | branded boxes and packaging | Commercial | `/custom-packaging/` | P2 |
| 17 | custom packaging for ecommerce brands | Commercial | `/custom-packaging/` | P1 |
| 18 | packaging procurement services | Commercial | `/packaging-procurement/` | P1 |
| 19 | custom packaging production | Commercial | `/custom-packaging/` | P2 |
| 20 | packaging sourcing services | Commercial | `/packaging-procurement/` | P1 |

### China-to-U.S. packaging procurement — 21–40

| # | Keyword | Intent | Candidate page | P |
| ---: | --- | --- | --- | --- |
| 21 | custom packaging china | Commercial | `/custom-packaging-china/` | P1 |
| 22 | custom packaging manufacturer china | Commercial | `/custom-packaging-china/` | P1 |
| 23 | packaging sourcing from china | Commercial | `/packaging-procurement/` | P1 |
| 24 | china packaging suppliers | Commercial | `/custom-packaging-china/` | P1 |
| 25 | source packaging from china | Informational/commercial | `/resources/source-packaging-from-china/` | P2 |
| 26 | importing packaging from china | Informational/commercial | `/china-to-usa-packaging/` | P1 |
| 27 | china to usa packaging | Commercial | `/china-to-usa-packaging/` | P1 |
| 28 | packaging procurement china | Commercial | `/packaging-procurement/` | P1 |
| 29 | custom boxes from china | Commercial | `/custom-packaging-china/` | P2 |
| 30 | packaging supplier china for usa | Commercial | `/custom-packaging-china/` | P2 |
| 31 | custom packaging china quote | Transactional | `/custom-packaging-china/` | P1 |
| 32 | packaging supplier selection china | Informational/commercial | `/resources/packaging-supplier-checklist/` | P2 |
| 33 | packaging samples from china | Commercial | `/product-development/` | P2 |
| 34 | packaging manufacturing china for us brands | Commercial | `/custom-packaging-china/` | P2 |
| 35 | private label packaging china | Commercial | `/private-label-packaging/` | P1 |
| 36 | custom packaging china usa delivery | Commercial | `/china-to-usa-packaging/` | P2 |
| 37 | custom packaging import cost | Informational/commercial | `/resources/packaging-landed-cost-guide/` | P2 |
| 38 | packaging lead time china | Informational/commercial | `/resources/custom-packaging-lead-times/` | P2 |
| 39 | packaging manufacturer rfq | Transactional | `/resources/custom-packaging-rfq-template/` | P1 |
| 40 | packaging supplier quotation china | Transactional | `/resources/custom-packaging-rfq-template/` | P2 |

### Packaging type and specification intent — 41–60

| # | Keyword | Intent | Candidate page | P |
| ---: | --- | --- | --- | --- |
| 41 | custom rigid boxes | Commercial | future category page after SERP validation | P2 |
| 42 | custom folding cartons | Commercial | future category page after SERP validation | P2 |
| 43 | custom mailer boxes | Commercial | future category page after SERP validation | P2 |
| 44 | custom paper bags | Commercial | future category page after SERP validation | P2 |
| 45 | custom tissue paper | Commercial | future category page after SERP validation | P3 |
| 46 | custom packaging inserts | Commercial | future category page after SERP validation | P3 |
| 47 | custom pouches packaging | Commercial | future category page after SERP validation | P3 |
| 48 | luxury packaging manufacturer | Commercial | future category page after proof/portfolio | P3 |
| 49 | cosmetic packaging manufacturer china | Commercial | future category page after actual offer validation | P3 |
| 50 | custom hang tags china | Commercial | future category page after SERP validation | P3 |
| 51 | custom packaging moq | Informational/commercial | existing MOQ guide | P1 |
| 52 | custom packaging minimum order quantity | Informational/commercial | existing MOQ guide | P1 |
| 53 | custom packaging cost | Informational/commercial | `/resources/custom-packaging-costs/` | P1 |
| 54 | how much does custom packaging cost | Informational/commercial | `/resources/custom-packaging-costs/` | P1 |
| 55 | custom packaging lead time | Informational/commercial | `/resources/custom-packaging-lead-times/` | P2 |
| 56 | packaging specification template | Transactional | `/resources/packaging-specification-template/` | P1 |
| 57 | packaging rfq template | Transactional | `/resources/custom-packaging-rfq-template/` | P1 |
| 58 | packaging supplier checklist | Transactional | `/resources/packaging-supplier-checklist/` | P1 |
| 59 | custom packaging materials guide | Informational | `/resources/packaging-materials-guide/` | P2 |
| 60 | packaging printing finishes guide | Informational | `/resources/packaging-finishes-guide/` | P3 |

### Custom textile — 61–80

| # | Keyword | Intent | Candidate page | P |
| ---: | --- | --- | --- | --- |
| 61 | custom textile products | Commercial | `/custom-textile/` | P1 |
| 62 | custom textile manufacturer | Commercial | `/custom-textile/` | P1 |
| 63 | textile procurement | Commercial | `/custom-textile/` | P1 |
| 64 | branded textile products | Commercial | `/custom-textile/` | P1 |
| 65 | private label textile | Commercial | `/custom-textile/` | P2 |
| 66 | textile sourcing china | Commercial | `/custom-textile/` | P1 |
| 67 | custom textiles from china | Commercial | `/custom-textile/` | P2 |
| 68 | custom tote bags manufacturer | Commercial | future category page after product validation | P2 |
| 69 | custom branded tote bags | Commercial | future category page after product validation | P2 |
| 70 | custom towels manufacturer | Commercial | future category page after product validation | P2 |
| 71 | private label towels | Commercial | future category page after product validation | P3 |
| 72 | branded textile accessories | Commercial | `/custom-textile/` | P2 |
| 73 | custom promotional textiles | Commercial | `/custom-textile/` | P3 |
| 74 | textile product development | Commercial | `/product-development/` | P1 |
| 75 | textile sampling | Commercial | `/product-development/` | P2 |
| 76 | textile moq guide | Informational/commercial | `/resources/textile-moq-guide/` | P2 |
| 77 | textile supplier rfq template | Transactional | `/resources/textile-rfq-template/` | P2 |
| 78 | branded textile supplier usa | Commercial | `/custom-textile/` | P2 |
| 79 | custom textile packaging | Commercial | `/custom-textile/` | P3 |
| 80 | textile material specification template | Transactional | `/resources/textile-specification-template/` | P3 |

### Private label, development, and decision support — 81–100

| # | Keyword | Intent | Candidate page | P |
| ---: | --- | --- | --- | --- |
| 81 | private label packaging supplier | Commercial | `/private-label-packaging/` | P1 |
| 82 | packaging for private label brands | Commercial | `/private-label-packaging/` | P1 |
| 83 | branded packaging procurement | Commercial | `/private-label-packaging/` | P2 |
| 84 | packaging product development services | Commercial | `/product-development/` | P1 |
| 85 | custom product development china | Commercial | `/product-development/` | P2 |
| 86 | product sampling china | Commercial | `/product-development/` | P2 |
| 87 | how to source custom packaging | Informational/commercial | `/resources/source-packaging-from-china/` | P2 |
| 88 | how to write a packaging brief | Informational/transactional | `/resources/packaging-specification-template/` | P1 |
| 89 | packaging quote checklist | Transactional | `/resources/custom-packaging-rfq-template/` | P1 |
| 90 | packaging supplier evaluation | Informational/transactional | `/resources/packaging-supplier-checklist/` | P1 |
| 91 | packaging supplier comparison template | Transactional | `/resources/packaging-supplier-checklist/` | P2 |
| 92 | packaging procurement process | Informational/commercial | `/how-it-works/` | P1 |
| 93 | custom packaging production process | Informational/commercial | `/how-it-works/` | P2 |
| 94 | custom packaging sample process | Informational/commercial | `/product-development/` | P2 |
| 95 | packaging cost reduction | Informational/commercial | `/resources/custom-packaging-costs/` | P2 |
| 96 | packaging landed cost guide | Informational/commercial | `/resources/packaging-landed-cost-guide/` | P2 |
| 97 | packaging purchase planning | Informational/commercial | `/packaging-procurement/` | P2 |
| 98 | custom packaging for ecommerce brands china | Commercial | `/custom-packaging-china/` | P2 |
| 99 | packaging supplier brief | Transactional | `/resources/custom-packaging-rfq-template/` | P2 |
| 100 | product specification for packaging | Transactional | `/resources/packaging-specification-template/` | P1 |

### Top 20 commercial terms

| Keyword | Business value | Best first page | Why |
| --- | ---: | --- | --- |
| custom packaging manufacturer | 10/10 | `/custom-packaging/` | Clear purchase/development intent, but factory sites dominate. |
| custom packaging china | 10/10 | `/custom-packaging-china/` | Exact China procurement intent. |
| packaging sourcing from china | 10/10 | `/packaging-procurement/` | Best alignment with the actual procurement model. |
| private label packaging | 10/10 | `/private-label-packaging/` | High-value branded-product intent. |
| custom packaging quote | 10/10 | `/custom-packaging/` | Direct lead intent. |
| packaging procurement services | 10/10 | `/packaging-procurement/` | Precise service intent. |
| custom textile products | 9/10 | `/custom-textile/` | Exact category intent. |
| textile procurement | 9/10 | `/custom-textile/` | Valuable B2B terminology. |
| textile sourcing china | 9/10 | `/custom-textile/` | Direct China-to-U.S. textile intent. |
| packaging product development | 9/10 | `/product-development/` | Valuable for briefs that are not yet production-ready. |
| packaging specification template | 9/10 | resource | Lead-magnet intent. |
| packaging RFQ template | 9/10 | resource | High-conversion downloadable asset. |
| custom packaging MOQ | 8/10 | MOQ guide | Buyers evaluating feasibility. |
| custom packaging cost | 8/10 | cost guide | Commercial investigation. |
| packaging supplier checklist | 8/10 | checklist | Buyer qualification and email capture. |
| custom packaging samples | 8/10 | `/product-development/` | Signals near-term development intent. |
| importing packaging from china | 8/10 | `/china-to-usa-packaging/` | Valuable but must use cautious, sourced language. |
| china to usa packaging | 8/10 | `/china-to-usa-packaging/` | Delivery/process intent. |
| custom tote bags manufacturer | 8/10 | future vertical | Build only after proving it is a repeatable offer. |
| custom towels manufacturer | 8/10 | future vertical | Build only after proving it is a repeatable offer. |

## 6. Target information architecture

```text
/
├── /custom-packaging/
├── /custom-packaging-china/
├── /custom-textile/
├── /private-label-packaging/
├── /packaging-procurement/
├── /china-to-usa-packaging/
├── /product-development/
├── /how-it-works/
├── /about/
├── /contact/
├── /resources/
│   ├── /resources/custom-packaging-rfq-template/
│   ├── /resources/packaging-specification-template/
│   ├── /resources/packaging-supplier-checklist/
│   ├── /resources/custom-packaging-costs/
│   ├── /resources/packaging-landed-cost-guide/
│   └── existing guides, progressively improved
└── /case-studies/
```

### Maximum 15 next pages

1. `/custom-packaging/`
2. `/custom-packaging-china/`
3. `/custom-textile/`
4. `/private-label-packaging/`
5. `/packaging-procurement/`
6. `/china-to-usa-packaging/`
7. `/product-development/`
8. `/how-it-works/`
9. `/about/`
10. `/resources/custom-packaging-rfq-template/`
11. `/resources/packaging-specification-template/`
12. `/resources/packaging-supplier-checklist/`
13. `/resources/custom-packaging-costs/`
14. `/resources/packaging-landed-cost-guide/`
15. `/case-studies/` (only when the first approved, evidence-backed case is ready)

Validate the page-level SERP and avoid creating a second page if Google treats two topics as the same intent. Do not make city/state doorway pages before a real local operation exists.

## 7. Topical map and internal linking

| Pillar | Supporting topics | Commercial page it strengthens |
| --- | --- | --- |
| Custom packaging | MOQ, materials, samples, printing/finishes, cost, RFQ, specifications | `/custom-packaging/` |
| Packaging from China | supplier proposal, sample process, shipping terms, planning a purchase | `/custom-packaging-china/`, `/packaging-procurement/` |
| Private label | packaging brief, brand requirements, artwork readiness, order planning | `/private-label-packaging/` |
| Custom textile | textile brief, materials, sampling, branded tote bags/towels only when confirmed | `/custom-textile/` |
| Product development | product brief, sample approval, production-ready specifications | `/product-development/` |

Every resource should link to one relevant commercial page and one relevant next-step resource. Examples:

- The MOQ guide → `/custom-packaging/` + RFQ template.
- The packaging cost guide → `/packaging-procurement/` + landed-cost guide.
- The textile materials article → `/custom-textile/` + product-development page.
- A case study → the exact commercial offer it demonstrates + contact form with “Send your specifications.”

Use descriptive links such as “request a custom packaging proposal,” not repeated generic “click here.”

## 8. GEO (generative-engine optimization)

1. Put a concise, qualified answer directly below every question-led H2.
2. Use one definition, one decision table, an explicit process, and a project-brief CTA on each commercial page.
3. Attribute time-sensitive import, tariff, certification, or regulatory statements to current primary sources. For example, the [USITC HTS](https://hts.usitc.gov/) is the current official tariff schedule and [CBP’s eRulings guidance](https://www.help.cbp.gov/s/article/Article-1106?language=en_US) describes binding classification-ruling requests.
4. State the difference between what is currently demonstrable and the 2027 planned U.S. launch on About/How It Works pages.
5. Add Organization, WebSite, Service, BreadcrumbList, and Article schema only where the visible page supports it. Do not invent reviews, ratings, addresses, employee counts, or awards.
6. Build evidence first: approved photos, sample comparisons, redacted supplier-proposal workflows, and real anonymized outcomes. These are more citeable than generic AI-written articles.

## 9. Lead magnets and content moats

### First five lead magnets

| Asset | Impact | Difficulty | Priority | Reason |
| --- | ---: | ---: | --- | --- |
| Custom Packaging RFQ Template | 10/10 | 4/10 | P1 | Captures buyers ready to request supplier proposals. |
| Packaging Specification Template | 10/10 | 5/10 | P1 | Makes the product brief operational and improves lead quality. |
| Packaging Supplier Evaluation Checklist | 9/10 | 4/10 | P1 | Gives buyers a neutral, useful decision tool. |
| Custom Packaging MOQ Guide | 8/10 | 3/10 | P1 | Existing guide can become a gated PDF/worksheet. |
| Packaging Landed-Cost Planning Sheet | 8/10 | 6/10 | P2 | Valuable but must retain strong customs/tariff disclaimers. |

### Five defensible content assets

| Asset | Impact | Difficulty | Priority | Reason |
| --- | ---: | ---: | --- | --- |
| Interactive packaging specification builder | 9/10 | 8/10 | P2 | Creates a better brief and a proprietary lead flow. |
| RFQ generator for packaging | 9/10 | 7/10 | P2 | Converts a complex brief into a usable buyer document. |
| Material/finish comparison matrix | 8/10 | 6/10 | P2 | Useful decision aid that can earn links if based on approved facts. |
| Approved sample-to-production case library | 10/10 | 7/10 | P1 | Strongest E-E-A-T proof, but only with permissions and evidence. |
| Original packaging-MOQ/data study | 8/10 | 8/10 | P3 | Differentiated backlink asset after enough first-party data exists. |

### Potential data/link assets (only with legitimate public or first-party data)

1. A methodology-led U.S. packaging import trend page using [USITC DataWeb](https://dataweb.usitc.gov/), with clear scope and date.
2. A transparent catalogue of anonymized packaging-brief variables that drive MOQ (only after enough approved first-party examples exist).
3. A documented comparison of packaging specification completeness before vs. after an RFQ template (aggregated and anonymized).
4. A data note on imported textile/packaging categories, backed by official classification sources and careful methodology.
5. A yearly “custom packaging brief benchmark” built from voluntarily submitted, anonymized briefs — never publish client data without approval.

## 10. Six-month sequence

| Month | Action | Business impact | SEO impact | Difficulty | Priority | KPI |
| --- | --- | ---: | ---: | ---: | --- | --- |
| 1 | Repair Netlify Git deployment; connect Search Console/Bing/analytics; finish P0 accuracy and crawl controls. | 10/10 | 9/10 | 4/10 | P0 | Deploy reliability, verified properties, indexed-page baseline. |
| 1 | Approve a documented About page and service proof inventory. | 9/10 | 8/10 | 5/10 | P1 | Qualified brief submissions, page engagement. |
| 2 | Publish Custom Packaging, Custom Packaging China, and Packaging Procurement pages after SERP review. | 10/10 | 10/10 | 6/10 | P1 | Commercial impressions, quote requests. |
| 3 | Publish Custom Textile, Private Label Packaging, Product Development, and How It Works. | 9/10 | 9/10 | 6/10 | P1 | Non-brand keyword coverage, qualified leads. |
| 3 | Launch RFQ template and specification template, with consent-aware form flow. | 10/10 | 8/10 | 6/10 | P1 | Downloads, email-to-brief conversion. |
| 4 | Turn approved real operations into one anonymized case study and original visual evidence. | 10/10 | 8/10 | 7/10 | P1 | Assisted conversions, referring domains. |
| 4 | Expand the existing MOQ/cost/landed-cost resources only where the SERP intent supports it. | 8/10 | 8/10 | 5/10 | P2 | Resource impressions, internal-link clicks. |
| 5 | Outreach to packaging, DTC, retail, and procurement publications with a useful asset or evidence-led angle. | 8/10 | 8/10 | 7/10 | P2 | Quality referring domains, relevant mentions. |
| 6 | Refresh winners from Search Console; strengthen internal links; test CTA and form fields. | 9/10 | 8/10 | 5/10 | P1 | Organic qualified leads and conversion rate. |
| 6 | Review cited sources/AI-surface queries and improve answer blocks; do not claim “AI ranking.” | 7/10 | 7/10 | 5/10 | P2 | Branded search, referral/assistant discovery where measurable. |

## 11. Ten actions ranked by business impact

| # | Action | Impact | Difficulty | Priority | Reason |
| ---: | --- | ---: | ---: | --- | --- |
| 1 | Repair Netlify’s GitHub deployment connection. | 10/10 | 4/10 | P0 | A correct site that cannot automatically publish is operationally fragile. |
| 2 | Connect Search Console, Bing Webmaster Tools, and analytics. | 10/10 | 3/10 | P0 | No SEO investment can be properly measured without baseline data. |
| 3 | Preserve the E-2 guardrails in `AGENTS.md`. | 10/10 | 1/10 | P0 | Prevents future content from redefining the business. |
| 4 | Publish `/custom-packaging/` after a page-specific SERP brief. | 10/10 | 6/10 | P1 | Highest-relevance commercial acquisition page. |
| 5 | Publish `/packaging-procurement/` after SERP validation. | 10/10 | 6/10 | P1 | Closest match to the purchase/import/resale model. |
| 6 | Build the RFQ template and specification template. | 10/10 | 6/10 | P1 | Improves both organic conversion and sales qualification. |
| 7 | Publish an evidence-backed About page and first anonymized case study. | 9/10 | 7/10 | P1 | Builds trust without fabricated “authority” language. |
| 8 | Publish `/custom-textile/` and `/private-label-packaging/`. | 9/10 | 6/10 | P1 | Adds valuable, tightly-scoped demand capture. |
| 9 | Create a clear privacy/data-handling flow for the project-brief form. | 9/10 | 5/10 | P1 | Necessary before scaling lead generation. |
| 10 | Launch limited editorial/Digital PR only after a genuinely useful asset exists. | 7/10 | 7/10 | P2 | Higher-quality links come from evidence and utility, not volume outreach. |

## Publication check — apply every time

Before publishing, answer yes to each question:

1. Is the page specifically about custom packaging, textiles, private-label packaging, product development, or China-to-U.S. procurement?
2. Does it distinguish the planned Miami 2027 operations from any current capability?
3. Does it avoid presenting quality follow-up as a certified inspection service?
4. Does it avoid claims of customs brokerage, freight forwarding, legal advice, certification, owned factories, or current U.S. operations?
5. Does it support the purchase/supply/resale business model rather than turning the company into a generic consulting agent?
6. Are all time-sensitive, regulatory, tariff, statistical, result, image, and client claims sourced or documented and approved?
