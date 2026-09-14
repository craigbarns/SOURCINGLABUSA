# GEO visibility benchmark

The inventory contains **120 unique English prompts**, tagged by category, current relevance and expansion scope. It tests procurement, packaging, textiles, private label, qualification, RFQ/MOQ, quality, costs/import, furniture, building projects, Canton Fair and comparisons.

`search-observations.json` records seven actual web-search queries from September 14, 2026. The available search tool returned Sourcing Lab USA URLs for two queries, concerning packaging and textiles. These are retrieval observations, not a measured Google rank or a citation by ChatGPT, Gemini, Claude, Perplexity, Copilot, AI Overviews or AI Mode. Some About-page search titles still used older wording.

`visibility-runs.json` deliberately has no completed AI tests: no direct supported interface to the named AI platforms was available. `null` means **unmeasured**, not zero. Do not seed the tracker with invented results.

## Run protocol

1. Use the same prompts, language, target market and account conditions for each comparison. Record actual location; do not claim U.S.-localized testing from an unlocalized tool.
2. Use a fresh conversation and no prior brand context. Enable search where the platform offers it. Record platform, model/version when exposed, date/time, locale and whether web search was active. If the model is not exposed, record `not_exposed` rather than guessing.
3. Conduct tests manually in the normal interface or through an expressly authorized official API. Do not automate consumer interfaces, bypass limits or ask an engine to recommend the brand before testing it. Search API output is not a substitute for consumer-product output.
4. Store a transcript reference or share URL, answer context, exact cited URLs and competitor names. A text mention, a citation and a recommendation are distinct observations. A misleading recommendation counts in the visibility calculation but must be flagged for accuracy review in `context`; do not treat it as evidence of capability.
5. For Google, record whether the AI feature actually appeared. Absence of a feature or inaccessible interface is `unavailable`, not a negative brand answer.
6. Run the complete set monthly where practical; review a stable subset of 20 high-intent prompts weekly. Label subsets and show coverage. Repeat comparable observations three times to assess volatility; never cherry-pick only favorable runs.
7. Retain the original baseline and date later runs separately. Follow the platform's current terms and limits.

## Observation format

Each `records` entry needs `sampleId`, `promptId`, `platform`, and `status` (`completed` or `unavailable`). A completed record also needs:

- `observedAt`: actual ISO timestamp.
- `model`: actual exposed model/version, or `not_exposed`.
- `locale`: actual locale/region conditions.
- `brandMentioned`: boolean, including a named mention without a link.
- `citedUrls`: actual HTTP(S) citations; empty when none.
- `recommended`: boolean; true only when recommended in relevant context.
- `context`: position/context, accuracy limitations and search mode.
- `competitors`: actual names returned; empty when none.
- `evidence`: reference to the saved observation or share URL.

Do not put customer data, account tokens or confidential transcripts in the public repository.

## Scoring

Run `node scripts/score-geo.mjs docs/geo/visibility-runs.json docs/geo/visibility-score.json`.

Per observation: **30 × brand mention + 50 × own-domain citation + 20 × relevant recommendation**. Repeats are averaged per prompt; prompts are weighted by commercial relevance (3 current high-intent, 2 supporting decision, 1 expansion). Platform averages receive equal weight. Always report prompt coverage, unavailable observations, run conditions and the separate expansion slice. A score from ten prompts is not comparable with one from 120 unless the tested subset is controlled.

This measured visibility score is different from the editorial GEO/SEO/readiness assessment in the audit report. Readiness does not guarantee a mention, ranking, citation or sale.

## Conversion measurement

The website currently emits `cta_click`, `form_start`, `form_error`, `generate_lead`, `email_copy` and `email_fallback_used`. A delivered form is a lead, not a qualified lead or purchase. Optional project details stay in the brief sent to the existing database/Netlify channels; they are not sent as analytics parameters.

Maintain a restricted CRM or operational register containing lead ID, received date, source landing page, category, qualification outcome and reason, appointment date, proposal date/value/currency, deposit or paid-order date/value/currency, and order completion or loss reason. Avoid copying personal data into this public repo.

The verified commercial model is product purchase and supply. Use a **paid order or deposit** as the primary economic outcome. A paid sourcing engagement becomes a separate conversion only if the company actually launches and contracts that service. No browser click should fabricate an offline conversion. Connect official offline conversion import after account access, attribution design and the applicable privacy handling are confirmed.

Track cost per qualified lead, proposal-to-paid-order rate, cost per paid order, attributable order value, and contribution margin where actually available. Keep raw leads secondary. Do not deploy a new advertising campaign or spend based only on these planning documents.
