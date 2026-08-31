# Design audit — UX/UI, branding and conversion

**Audit date:** 31 August 2026

**Pages reviewed:** public homepage, navigation, contact form, footer, responsive implementation, and existing public resource pages.
**Visual benchmark set:** [PackMojo](https://packmojo.com/), [PakFactory](https://pakfactory.com/), [Arka](https://www.arka.com/), [DulinkPack](https://www.dulinkpack.com/), [Huarong Packaging](https://www.huarongpackaging.com/), and [Deepwove](https://deepwove.com/for-north-american-brands/).

## Executive conclusion

The current site is polished, fast-feeling, and more credible than a typical generic sourcing site. It clearly states the 2027 planned Miami launch, the packaging/textile focus, and a next action. The strongest issue is visual positioning: the dark grid, neon lime, dashboard-style workflow card, and confetti interaction make it feel closer to an AI/SaaS product than a premium procurement partner with real products.

The next design step is **not** more decoration. It is a move toward a tactile, evidence-led B2B presentation: real packaging, real materials, real samples, a restrained hierarchy, a founder presence, and a smaller number of stronger conversion moments.

## 1. Overall score — 68/100

| Dimension | Score | Assessment |
| --- | ---: | --- |
| Brand | 13/20 | Clear name and focused message, but the visual language is more SaaS than procurement. |
| UX | 14/20 | Good reading flow and visible CTA; key information is repeated and the header is too dense. |
| UI | 15/20 | Strong spacing, contrast, components, and polish; lacks visual product evidence. |
| Trust | 12/20 | Genuine experience is stated, but not yet demonstrated through people, products, cases, or legal/privacy basics. |
| Conversion | 14/20 | The project-brief CTA and short form are useful; proof and qualification are insufficient. |

### First-five-seconds score

| Signal | Score | What a prospect understands now |
| --- | ---: | --- |
| Clarity | 8/10 | Custom packaging and textile, U.S. audience, China partnership, future 2027 launch. |
| Trust | 5/10 | The process is clear, but there is no visible proof of people, products, or projects. |
| Premium perception | 7/10 | Good typography and restraint, weakened by the neon/tech-dashboard aesthetic. |
| Expertise | 6/10 | “20 years” and the process help; no case evidence makes it abstract. |
| Differentiation | 5/10 | “Sourced with clarity” is attractive but not a durable reason to choose the company. |
| Conversion | 6/10 | A clear CTA exists, but visitors cannot yet see what they would actually receive. |
| Visual quality | 7/10 | Cohesive and professional, but visually too generic for product procurement. |

## 2. First impression and above-the-fold audit

### Current

- The hero immediately names the categories, announces Miami 2027, describes the China partnership, and exposes a project-brief CTA.
- The right-hand panel explains the process as four application-style rows.
- A three-item proof ribbon states 20 years, 10 years, and Miami 2027.

### Problem

- The most prominent visual is a workflow dashboard, not packaging or textile work. It says “software/process” before it says “premium product.”
- The planned-launch message is visually more dominant than the commercial benefit. It is necessary for E-2 consistency, but should not be the brand’s main value proposition.
- The H1 is memorable but broad. It does not explicitly say “procurement for U.S. brands” in the first line.
- There is no visual proof a buyer can use to assess materials, finish, printing, scale, or taste.

### Proposed hero

**Eyebrow:** `Miami launch planned for 2027`

**H1:** `Custom packaging & textile procurement for U.S. brands.`

**Supporting line:** `Built on real product and China sourcing experience — from brief and sampling to production follow-up and agreed delivery terms.`

**Primary CTA:** `Send your specifications`
**Secondary CTA:** `Explore packaging & textile projects` (link only when a real, approved examples page exists)

The right side should become a **real product composition**: one premium box, one bag/pouch, one textile item, and close-up detail shots. Until real images are approved, use a quiet material/specification layout rather than an artificial 3D render or an AI “factory” image.

### Expected impact

More immediate product relevance, less SaaS confusion, higher perceived capability, and a better bridge to future service pages.

## 3. Top 10 design problems

| # | Current | Problem | Proposed | Conversion | Trust | Brand | SEO | Difficulty | Priority |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | No authentic product imagery anywhere on the homepage. | Buyers cannot assess quality, category fit, or premium execution. | Create a rights-cleared product/sample library and a curated hero/gallery. | 10/10 | 10/10 | 10/10 | 5/10 | 7/10 | P0 |
| 2 | Hero visual is a dashboard/process card. | Signals SaaS/AI rather than packaging/textile procurement. | Replace with real product composition once approved; use a quiet specification composition interim. | 9/10 | 8/10 | 9/10 | 4/10 | 6/10 | P0 |
| 3 | No founder presence or proof page. | “20 years” reads as unsupported marketing rather than experience. | Add an approved founder portrait and concise factual About section. | 8/10 | 10/10 | 8/10 | 7/10 | 5/10 | P0 |
| 4 | Dark grid plus neon lime dominate every section. | Strong polish, but a generic tech/startup signal. | Reserve dark canvas for hero/footer; use warm neutral content sections and a restrained copper/moss accent system. | 6/10 | 7/10 | 9/10 | 2/10 | 8/10 | P1 |
| 5 | Header has six primary links plus language and CTA. | More navigation weight than a one-page pre-launch site needs. | Use Products, How it works, Resources, About, and one CTA. | 7/10 | 6/10 | 6/10 | 3/10 | 3/10 | P1 |
| 6 | Process appears both in the hero and lower on the page. | Repetition uses valuable above-the-fold space without adding proof. | Hero: product evidence; lower page: five-step process with an order-specific caveat. | 7/10 | 6/10 | 6/10 | 3/10 | 5/10 | P1 |
| 7 | Service cards use icons and copy only. | No texture, examples, or differentiation between packaging and textile. | Give each category a large approved image/detail and 3–5 specific example products. | 9/10 | 8/10 | 9/10 | 6/10 | 6/10 | P1 |
| 8 | Form captures only name, email, type, and free text. | It produces incomplete briefs and leaves sales qualification to email. | Add Company, quantity range, and optional website; add file upload only after Netlify/CRM handling is confirmed. | 9/10 | 5/10 | 4/10 | 1/10 | 5/10 | P1 |
| 9 | Contact form has no visible privacy/data-handling link. | A B2B buyer may hesitate to send a brief or file. | Add approved Privacy notice and a short “how we use your brief” line. | 7/10 | 8/10 | 4/10 | 1/10 | 4/10 | P1 |
| 10 | Confetti fired after copying the email address. | Playful micro-interaction is off-positioning for a premium B2B procurement workflow. | Use a restrained “Email copied” state only. **Applied.** | 2/10 | 3/10 | 5/10 | 0/10 | 1/10 | P2 |

## 4. Homepage, section by section

| Section | What works | What to change |
| --- | --- | --- |
| Header | Logo, language control, and primary CTA are visible. | Reduce links; make the brand descriptor “Custom procurement”; make the mobile launch label shorter. |
| Hero | Strong hierarchy and readable CTA. | Lead with business value, keep 2027 disclosure concise, replace dashboard visual with products/evidence. |
| Experience ribbon | Real numbers help with scanability. | Link it to an About/founder proof section; phrase each number as a substantiated fact, not a badge. |
| Offerings | Two focused offers are exactly right. | Add real product examples and material/final-finish photography. |
| Process | Clear sequential logic. | Keep it once, lower on the page; show concrete outputs at each step (brief, sample, approved specification). |
| Experience | Strong factual starting point. | Replace the generic panel with an approved founder/profile and one short “how this experience affects your order” statement. |
| Compliance | Correctly avoids overpromising. | Reduce warning-like visual tone; call it “Order clarity” and use a neutral, factual design. |
| FAQ | Helps with objections and GEO. | Keep concise; add one answer on what a useful first brief includes. |
| Contact | Project-brief framing is much better than “Contact us.” | Add qualification fields and privacy/data note. Do not state response-time promises unless operationally proven. |
| Footer | Clear scope and contact route. | Add approved Privacy/Terms links, legal entity details when established, and keep future-Miami wording. |

## 5. Recommended homepage wireframe

```text
HEADER
  Logo | Products | How it works | Resources | About | Send your specifications

HERO (dark, restrained)
  Miami launch planned for 2027
  H1: Custom packaging & textile procurement for U.S. brands
  Supporting line + primary / secondary CTA
  Real product composition: packaging, print finish, textile detail

TRUST STRIP
  20 years product/sourcing experience | 10-year independent China partnership | Miami 2027 planned

PRODUCT FOCUS
  Custom packaging     [real image + boxes/bags/pouches/materials]
  Custom textile       [real image + totes/towels/textile accessories]

WHAT A GOOD BRIEF UNLOCKS
  Specification | Sample | Production follow-up | Delivery terms

FOUNDER / EXPERIENCE
  Professional portrait, short factual bio, link to About

ONE APPROVED CASE STUDY OR “PROJECT EXAMPLE”
  Product / objective / process / result — only with proof and permission

RESOURCE PREVIEW
  Packaging RFQ template | MOQ guide | specification checklist

FAQ

PROJECT-BRIEF FORM
  Company, contact, product type, quantity range, brief, optional file upload

FOOTER
  Contact, business/legal links, privacy, planned Miami launch wording
```

## 6. Commercial page wireframe

```text
Breadcrumb
Hero: precise product/service promise + a real example visual + “Send specifications”
Quick answer: what the service covers / does not cover
Product examples: 3–6 real, approved examples
Capabilities: materials, sampling, branding, production follow-up (only what is true)
How it works: product-specific process
Brief checklist: what to send for a useful proposal
Proof: founder or approved case example
FAQ: 4–6 non-duplicated questions
Contextual CTA and compact qualification form
```

SEO copy should live inside these human-oriented blocks: quick-answer panels, specification lists, process cards, comparison tables, and concise FAQs. Do not add text-heavy “SEO sections” after the conversion CTA.

## 7. Brand, color, and typography system

### Current brand assessment

The cube mark is clean and the wordmark is legible. “SourcingLab” and the former “Custom supply” descriptor skew toward a technology platform. “Custom procurement” is a clearer B2B descriptor and is now used in the logo lockup.

### Proposed visual direction: tactile editorial procurement

- **Mood:** calm expertise, material quality, international execution.
- **Hero/footer:** deep forest ink, not pure black.
- **Content sections:** warm mineral/ivory canvas so real products can carry color and texture.
- **Accent:** burnished copper for decisions/quality; moss green for active/success states. Avoid ubiquitous neon-lime fills.
- **Photography:** macro material detail, printed finishes, samples on a worktable, product-in-hand, approved production moments. No AI factories, generic containers, handshakes, or anonymous executives.

### Token recommendation

| Token | HEX | Use |
| --- | --- | --- |
| Primary / Ink | `#10221E` | Header, hero, footer, primary text on light canvas. |
| Secondary / Deep green | `#245247` | Secondary controls, labels, illustrations. |
| Accent / Copper | `#BF7C36` | Premium emphasis, material/process markers; use sparingly. |
| Background | `#F7F5F0` | Main light canvas; lets product photography breathe. |
| Surface | `#FFFFFF` | Cards and form surfaces. |
| Text primary | `#16231F` | Main body text on light surfaces. |
| Text secondary | `#5C6A64` | Supporting copy. |
| Border | `#D8DDD6` | Quiet divisions. |
| Success | `#247352` | Confirmed states and completed steps. |
| Error | `#B42318` | Form errors only. |

### Typography

Keep Inter initially: it is reliable, familiar to American B2B readers, and already optimized by Next.js. Premium perception should come from restraint and product art direction, not a fashionable font swap.

| Role | Desktop | Mobile | Weight / line-height |
| --- | --- | --- | --- |
| H1 | 64px | 39–44px | 750–800 / 0.98–1.04 |
| H2 | 44px | 30–34px | 700–750 / 1.05 |
| H3 | 24px | 21–22px | 700 / 1.15 |
| Body | 18px | 16px | 400–450 / 1.55–1.65 |
| Small | 14px | 14px | 500 / 1.45 |
| Eyebrow | 12px | 11px | 700 / 1.2, letter spacing 0.08em |

Do not use 900-weight display text in every section. Use it only for the hero and one or two key H2s. This will make genuine proof and product imagery feel more important.

## 8. Design system

| Area | Rule |
| --- | --- |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px scale. Main sections: 96 desktop / 64 mobile. |
| Container | 1280px maximum content width; 20px mobile gutter, 32px tablet, 48px desktop. |
| Radius | 12px controls, 16px small cards, 24px feature cards; avoid random values. |
| Primary button | Solid ink on light pages or restrained moss on dark; 48px min height; label states exact action. |
| Secondary button | Transparent/outlined, equal height, never visually louder than primary. |
| Text link | Underline on hover/focus; descriptive action copy. |
| Product card | Image first, product category, 1-line use case, 3 specifications/benefits, CTA. |
| Resource card | Label, title, outcome, reading/download time, CTA. |
| Case card | Product image, client type (anonymized if required), challenge, approach, documented outcome. |
| Form controls | 48px min height, persistent visible labels, clear error message below input, no placeholder-only labels. |
| Motion | 150–250ms fade/translate/hover only; honor reduced motion; no parallax or playful confetti. |

## 9. Form, CTA, mobile, accessibility, and performance audit

### CTA strategy

Use one primary conversion phrase site-wide: **Send your specifications** or **Request a packaging proposal**. “Send your project brief” remains acceptable while the company is pre-launch, but avoid mixing “Start,” “Contact,” “Get started,” and “Quote” without intent.

| Current | Problem | Proposed | Expected impact |
| --- | --- | --- | --- |
| `Send your project brief` | Clear, but it does not signal the type of information needed. | `Send your specifications` with helper text “Product, quantity, references, destination, timing.” | Better lead quality. |
| Short form | Low friction, but qualification is weak. | Name, Company, work email, product type, quantity range, brief. Website optional. | More useful first response. |
| No upload | Product buyers often have artwork/specs/RFQs. | Add optional PDF/image upload only after validating storage, security, size, and privacy terms. | Higher conversion for serious projects. |

### Mobile

The layout uses sensible one-column rules, full-width CTAs, visible labels, and an accessible mobile menu. The long launch eyebrow and large hero heading were high-risk at narrow widths; the mobile label has been shortened and the heading constrained in the implementation. Re-test on real iPhone Safari and Chrome Android before considering this closed.

Recommended mobile refinements:

1. Keep only logo, menu, and one icon CTA in the header.
2. Use a sticky bottom `Send specifications` CTA after the visitor scrolls past the hero, only if it does not obscure form fields or accessibility controls.
3. Stack proof points as short rows rather than three compressed columns below 480px.
4. Keep buttons 48px high with at least 16px body copy.
5. Use one product image at a time; no carousels unless images are real and worth comparing.

### Accessibility

- Good: focus-visible treatment, semantic buttons, `sr-only` form labels, reduced-motion handling, and a skip link.
- Improve: add visible labels to the form (not only placeholders), ensure logo text remains legible at all breakpoints, and test keyboard mobile menu closing/focus return.
- Maintain WCAG 2.2 AA contrast whenever colors change. Muted text on the current black surfaces should be tested with an automated checker before reducing contrast further.

### Performance

- Current illustration/icon approach is lightweight; retain that discipline.
- Do not add autoplay video, heavyweight 3D, or a large animated product carousel.
- Serve approved product images as responsive AVIF/WebP through `next/image`, with explicit dimensions and meaningful alt text.
- Keep only one font family and the weights actually used.
- The confetti dependency is no longer invoked in the email-copy action, reducing a distracting interaction and avoiding unnecessary client work.

## 10. Competitor design benchmark

| Reference | Strength to learn from | Weakness to avoid |
| --- | --- | --- |
| PackMojo | Product-first discovery, sample/product detail, clear path to quote. | Do not mimic a broad self-serve configurator or make claims of global operations. |
| PakFactory | Strong “expert support” and quote-centered commercial flow. | Avoid end-to-end promises that exceed actual order terms. |
| Arka | Product imagery and lead magnets make packaging tangible. | Avoid consumer-discount/e-commerce promotional tone. |
| DulinkPack | Clear packaging-category focus and practical request form. | Avoid “low MOQ,” certification, inspection, or global-delivery proof without documentation. |
| Huarong Packaging | Close-up product/print examples create manufacturing credibility. | Do not use factory-direct language or factory imagery without approval. |
| Deepwove | Narrow vertical focus and editorial confidence. | Avoid dense trade/tariff claims and unverified operational detail. |

Sourcing Lab USA should combine **PackMojo’s product clarity**, **Arka’s tangible visual presentation**, and **Deepwove’s narrow positioning** — while remaining more transparent about the planned 2027 U.S. launch and actual order-specific capabilities.

## 11. Evidence and image brief

Collect only material that can be documented and used with permission:

1. One professional founder portrait: neutral studio or real work environment.
2. Three finished custom packaging examples: box, bag/pouch, retail insert/label.
3. Two textile examples: tote bag, towel, or other actually supported product.
4. Four macro details: paper/texture, emboss/foil/print, stitching/label, sample/prototype.
5. One approved sampling/process image, not an AI “factory” image.
6. One before/after sample comparison for a real anonymized case, only after approval.

Every asset needs: owner/permission, product category, date, location only if approved, and a factual caption. Do not show supplier premises, client branding, or personal information without written approval.

## 12. Implementation sequence

| Priority | Design work |
| --- | --- |
| P0 | Obtain approved product/founder proof; redesign hero around it; preserve planned-2027 disclosure without making it the visual product. |
| P0 | Publish Privacy/data-handling information before encouraging file uploads or scaling paid/organic lead capture. |
| P1 | Simplify navigation and remove repeated process treatment from the hero. |
| P1 | Introduce packaging/textile product cards with approved imagery and tangible examples. |
| P1 | Improve first form qualification with Company and quantity range. |
| P1 | Build About/founder and first approved anonymized case-study page. |
| P2 | Introduce the tactile editorial color system progressively as real imagery becomes available. |
| P2 | Create Quick Answer, MOQ, Cost Factors, and Brief Checklist components for SEO/GEO pages. |
| P3 | Add limited sticky mobile CTA and subtle product-image transitions after real-device testing. |

## Final release checklist

Before a visual redesign is published, verify:

- [ ] Every image is real, permitted, and accurately captioned.
- [ ] No product, client, factory, certification, inspection, shipping, or delivery capability is invented.
- [ ] The hero still states the Miami launch as planned for 2027.
- [ ] The new palette passes contrast testing.
- [ ] Mobile is checked on iPhone Safari and Chrome Android.
- [ ] Form collection, uploads, privacy, and lead routing are documented.
- [ ] The page remains fast with responsive images and no unnecessary motion.
