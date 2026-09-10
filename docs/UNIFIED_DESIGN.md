# Shared editorial design — September 8, 2026

The cream and forest-green identity now covers the English/Spanish homepages, About page, four category pages, blog index and eight articles, privacy notice, sourcing workspace, HS research helper, missing-page screen and the static contact fallback.

Shared implementation:

- Named brand colors in `globals.css` cover paper, surfaces, text, borders and status colors. `interior.css` provides the category, journal, article and workspace layouts.
- Navigation defaults to the light identity. The common footer delegates to `EditorialFooter`; the workspace uses marketing-prefixed links so they also work on the app subdomain.
- Category pages share the homepage's photographic treatment, restrained typography, green process sections, FAQ controls and contact panel. Product illustration fallbacks use the same palette.
- Articles share readable typography, photographs labeled as concepts, section navigation and the same conversion panel. Existing metadata, URLs and structured data remain intact.
- All five workspace tools use the shared palette, with distinct accessible error/warning/information colors. Business calculations, API requests, validation and submission handling are unchanged.
- The icon, manifest background and social sharing images match the site. The Netlify detection form retains its fields and is hidden behind a branded link to the real project form.

Validation:

- Lint without warnings, TypeScript, all 94 tests and production build pass.
- Browser review of 21 pages/screens at 320, 390 and 1440 px: no document overflow or JavaScript errors. Axe WCAG A/AA checks report no violations across those pages and all five workspace tabs.
- Navigation, mobile menu, keyboard FAQ controls, article links, reduced motion, and mocked contact failure/success flows pass.
- The production SEO audit passes for all 17 public sitemap pages and 516 internal links. App/preview indexing exclusions are preserved.

Reference captures: `interior-preview.webp`, `journal-preview.webp`, `workspace-preview.webp`. These show the locally built production version.
