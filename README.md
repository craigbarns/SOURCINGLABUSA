# SourcingLab USA

SourcingLab is a procurement workspace for importers, private-label brands, and
lean sourcing teams. It turns supplier quotes into structured comparisons,
deterministic math checks, landed-cost estimates, and supplier-response drafts.

The quote-analysis pipeline is the core workflow:

```text
PDF or image
  → server-side validation
  → Mistral OCR
  → schema-validated structured data
  → deterministic math and comparability checks
  → optional AI-assisted review
  → decision-ready report
```

The browser calls internal `/api/*` routes only. Mistral, OpenAI, and Supabase
credentials remain on the server.

## What is included

- Compare up to three supplier quotes in PDF, JPEG, PNG, or WebP format.
- Extract line items, quantities, currencies, Incoterms, payment terms, and lead
  times.
- Recalculate totals in code and separate non-comparable offers.
- Draft product specifications with explicit verification boundaries.
- Model landed cost from user-controlled freight, duty, insurance, and local
  charge inputs.
- Generate HS-code research briefs that remain clearly labeled as estimates or
  demo data.
- Prepare RFQs, sample requests, quality-audit requests, and counteroffers in
  English, French, or Simplified Chinese.

SourcingLab does not contact suppliers automatically and does not present customs
classification, regulatory guidance, or AI suggestions as professional advice.

## Local development

Requirements:

- Node.js 20.19 or newer
- npm

```bash
git clone https://github.com/craigbarns/SOURCINGLABUSA.git
cd SOURCINGLABUSA
npm install
cp .env.example .env.local
npm run dev
```

Open:

- `http://localhost:3000` — marketing site
- `http://localhost:3000/app` — sourcing workspace
- `http://app.localhost:3000` — local app-subdomain simulation, when supported

Without provider keys, the product remains usable in an explicitly labeled demo
mode. No uploaded file is presented as analyzed when OCR is not configured.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MARKETING_ORIGIN` | Production | Canonical marketing origin; defaults to `https://sourcinglabusa.com` |
| `APP_ORIGIN` | Production | Canonical app origin; defaults to `https://app.sourcinglabusa.com` |
| `MISTRAL_API_KEY` | Live quote OCR | Server-to-server document OCR |
| `MISTRAL_OCR_MODEL` | No | Mistral OCR model; defaults to `mistral-ocr-latest` |
| `OPENAI_API_KEY` | Live AI features | Structured extraction, review, specs, and HS research |
| `OPENAI_MODEL` | No | OpenAI model; defaults to the server-configured model |
| `SUPABASE_URL` | Product updates | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Product updates | Server-only insert credential |

Never expose a secret with the `NEXT_PUBLIC_` prefix.

## Analysis modes

The quote analyzer exposes its data source instead of silently falling back:

- `live` — Mistral OCR plus schema-validated OpenAI extraction and review.
- `partial` — real Mistral OCR with deterministic extraction or review when
  OpenAI is unavailable.
- `demo` — labeled sample data when Mistral OCR is not configured.

If a configured OCR provider fails, the route returns an error. It does not
replace the uploaded document with demo results.

Quote ranking is deterministic. AI-generated narrative cannot change extracted
amounts, math-check status, ranks, or price spreads.

## Upload limits

The current direct-to-function upload flow is intentionally capped at 4 MB
aggregate per request, including a maximum of three files. This stays below the
Vercel Function request-body limit with multipart overhead.

For larger production documents, the next architecture step is a direct upload
to private object storage through a short-lived signed URL, followed by an
asynchronous analysis job.

## Domains and Vercel

Connect one Vercel project to this repository, then add:

```text
sourcinglabusa.com
www.sourcinglabusa.com
app.sourcinglabusa.com
```

Set the two canonical origins in Production and Preview:

```dotenv
MARKETING_ORIGIN=https://sourcinglabusa.com
APP_ORIGIN=https://app.sourcinglabusa.com
```

`src/proxy.ts` keeps the marketing and application surfaces separate:

```text
sourcinglabusa.com/        → marketing
sourcinglabusa.com/app     → app.sourcinglabusa.com
app.sourcinglabusa.com/    → internal /app rewrite
app.sourcinglabusa.com/marketing → marketing domain
```

Unknown Vercel preview hosts keep `/` and `/app` on the same origin so preview
deployments remain testable.

## Data handling

- Provider credentials stay in server-only modules.
- Quote files and OCR text are not persisted in the application database.
- Uploads are validated by count, size, declared type, and binary signature.
- Expensive routes enforce same-origin checks, request-size checks, and rate
  limits.
- API responses containing quote analysis use `Cache-Control: no-store`.
- The app surface is `noindex`; the marketing surface remains indexable.
- Waitlist emails are normalized and stored in Supabase through a server-only
  credential. Row-level security is enabled.

Before a public paid launch, add authentication, per-account entitlements,
distributed rate limiting, private object storage, a documented retention
policy, and cost observability.

## Accuracy boundaries

- HS codes and duty rates are research starting points. Verify them against a
  current official tariff source or with a customs professional.
- Landed-cost calculations use the inputs supplied by the user. They do not
  automatically include every tax, harbor fee, antidumping duty, or product-
  specific surcharge.
- Product specifications are drafts. Regulatory and certification applicability
  depends on the exact product, use case, destination, and current law.
- Supplier emails are drafts for human review and manual sending.

## Architecture

```text
src/app/
  page.tsx                       marketing entry and structured data
  app/page.tsx                   noindex sourcing workspace
  api/ai/product-specs/          product-specification route
  api/ai/hscode/                 HS research route
  api/ai/supplier-email/         supplier-email route
  api/quotes/analyze/            quote upload and analysis route
  api/waitlist/                  product-update registration

src/components/
  LandingPage.tsx                server-composed marketing page
  HeroExperience.tsx             sample-report interaction island
  MarketingSections.tsx          product, workflow, trust, and FAQ
  AppDashboard.tsx               accessible five-tool workspace
  tools/                         sourcing tools

src/lib/server/
  ai/provider.ts                 schema-validated AI provider interface
  quotes/ocr.ts                  upload validation and Mistral OCR
  quotes/extraction.ts           deterministic OCR extraction
  quotes/comparison.ts           deterministic comparison and math checks
  quotes/pipeline.ts             live, partial, and demo orchestration

src/lib/validation/              shared Zod contracts
src/lib/routing/                 testable domain-routing decisions
src/proxy.ts                     marketing/app host separation
supabase/migrations/             versioned database schema
.github/workflows/ci.yml         required quality pipeline
```

## Quality checks

```bash
npm run lint -- --max-warnings=0
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

GitHub Actions runs lint, TypeScript, the full test suite, the production
dependency audit, and a production build on every pull request and push to
`main`.

## Supabase

The only persisted product data in this version is the product-update
registration.

Migration:

```text
supabase/migrations/202607290001_create_waitlist_entries.sql
```

Apply it with the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```
