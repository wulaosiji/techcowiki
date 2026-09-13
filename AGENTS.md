# TechCo.Wiki Harness

This is the development contract for the repository. People and agents should read this page before changing the repo, then write the patch.

The project defaults to English. Only README files and the public website stay multilingual (`en`, `zh-CN`, `zh-Hant`). English is the canonical encyclopedia text; Simplified Chinese (`/zh`) and Traditional Chinese (`/zh-hant`) are complete parallel editions. The publisher wordmark is **TechCo.Wiki**. The hostname is always lowercase `techco.wiki`.

## What this project is

A vertical, citable encyclopedia of technology companies. **GEO comes first**: give generative engines one citable record, then serve human browsing.

The same entity must exist as HTML, Markdown, JSON-LD, and `/api/v1/...` JSON. Content is CC BY-SA 4.0. Code is MIT.

The catalog is locked at **100 companies / 100 people**. It is not a census. Absence is not a negative judgment.

## Why earlier sessions kept reworking the same work

In the full “review then implement” pass, time was lost on the wrong acceptance layer, not missing features:

1. **A passing function is not rendered HTML.** `switchLocale()` unit tests were correct, but the static search page is built with an empty `Astro.url.search`, so language-switch hrefs stayed `/zh/search` and dropped `?q=TSM`. You must click once in the build output and in a browser.
2. **Local preview is not Cloudflare Pages.** Astro preview does not run `public/_worker.js` and does not apply Pages `_redirects`. Docs that rewrite `/zh/* → 404` are wrong for Pages: `_redirects` **cannot** fall back 404s, and a root `404.html` swallows every missing path. Localized 404s must be intercepted by the worker on `/zh/*` and `/zh-hant/*` 404s, reading `/zh/404/index.html` or `/zh-hant/404/index.html` via the clean URL `/zh/404/` or `/zh-hant/404/`.
3. **Canonical URLs are not clickable UI.** `https://techco.wiki/...` belongs on citations, sitemap, API, and llms. If the toolbar, homepage machine box, or footer also use those absolute URLs, preview and `pages.dev` jump to the undeployed production host. Clickable links use same-origin paths (`markdownPath()`).
4. **Autolink rewrites words it must not touch.** Wikipedia URLs, `中国大陆`, `Chinese mainland`, and hyphenated nationality (`United States-headquartered`) must be protected before matching. Autolink regressions must inspect the rendered `<a>`, not only the source string.
5. **Loading the catalog is expensive.** Autolink already reuses the dictionary, regex, and case folding, but importing `catalog` still enriches the whole catalog. New tests should read files or extract pure functions; do not import `catalog` for trivial asserts. Run the matching `tests/*.test.ts` first; run the full suite before build.
6. **Default HTTP clients lie.** `urllib` and scripts with no User-Agent often get 308/403 from `pages.dev`. Acceptance uses a browser UA and follows slash redirects such as `/companies/nvidia` → `/companies/nvidia/`.
7. **`npm run deploy` (Wrangler) is often unavailable.** Production is Pages Direct Upload on the nominal `main` branch. A JWT can only hit `/pages/assets/*`; it cannot create a deployment. `_headers`, `_redirects`, and `_worker.js` **must not** enter the asset manifest; upload them as deployment form fields.
8. **One screenshot is not acceptance.** Search, language switch, form submit, and 404 must be clicked or typed, then checked in the address bar and body.

The four gates below exist so those mistakes are not repeated.

## Hard stops (never violate)

- Do not invent funding, valuation, headcount, or a ticker that is not already on the entry or a reliable source. For Li Auto / XPeng / NIO / CATL and similar “also traded in Hong Kong” cases, omit the number unless a specific code is on the record.
- Ethnic Chinese identity explains **inclusion only**. Do not call NVIDIA, Yahoo, or Fremont-headquartered Pony.ai Chinese companies. Do not call TSMC, UMC, MediaTek, or other Taiwan companies mainland Chinese companies.
- Do not treat “China / 中国” as a synonym for a Taiwan, Hong Kong, or Macau headquarters. Greater China is a macro-region label.
- Do not change wordmark casing to match the domain: UI writes `TechCo.Wiki`; URLs write `https://techco.wiki`.
- Do not paraphrase proper names on About / License / FAQ. Match them exactly.
- Unless the user asked: no custom-domain DNS, no IndexNow / Google / Bing submission, no UGC, no catalog expansion, no full Wikidata Q-ID pass, no rewrite of `src/data/enrich.ts`.

## Four acceptance gates (in order; do not skip)

| Gate | Command | What it proves | What it does not prove |
| --- | --- | --- | --- |
| 1. Source contracts | `npm test` (includes `tests/harness.test.ts`) | Pure functions, catalog integrity, autolink protection, UI source does not misuse absolute URLs | Built hrefs, Pages 404s |
| 2. Build artifacts | `npm run build && npm run harness` | `dist/` machine box, tickers, same-origin Markdown, localized 404 files, worker | JS language switch, live splat |
| 3. Browser | `npm run e2e` (starts its own temporary preview) | Real path: type, submit, click Simplified Chinese, address bar still has `?q=` | Pages worker, CDN cache |
| 4. Hosted | `HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host` | Live HTML and 404 body for missing Simplified / Traditional URLs | — |

UI / routing / copy / autolink / machine surface: **gates 1+2 required**. Interaction or i18n: **also gate 3**. Claiming “deployed”: **also gate 4**.

Done means the relevant gates are green. A screenshot alone is not success.

## What to test when you change something

| You changed | Run at least | Open at least |
| --- | --- | --- |
| `src/lib/autolink.ts` | `tests/links.test.ts` | NVIDIA / TSMC pages: Wikipedia URLs unchanged; hyphenated nationality not split into “United” |
| `src/lib/i18n.ts` / `BaseLayout.astro` | `tests/i18n.test.ts` + e2e search language switch | `/search?q=TSM` → after Simplified Chinese the URL still has `q=TSM` |
| Company / person / product data or `normalize.ts` | `tests/catalog.test.ts` `tests/geo.test.ts` `tests/products.test.ts` | That entity’s en / zh / zh-hant pages; search haystack (ticker / alias / HQ) |
| Toolbar, homepage machine box, footer | `tests/harness.test.ts` + `npm run harness` | Preview clicks on Markdown / llms.txt stay on the current host |
| 404 / `_worker.js` / `_redirects` | `tests/redirects.test.ts` + harness | Local `/zh/404` and `/zh-hant/404`; live `/zh/this-page-does-not-exist` and `/zh-hant/this-page-does-not-exist` titles are `未找到` |
| Machine surface (llms / sitemap / OpenAPI / graph) | `tests/i18n.test.ts` `tests/geo.test.ts` | OpenAPI path is **`/api/v1/openapi.json`**, not root `/openapi.json` |

## Information architecture (do not invent URLs)

- `/companies/{slug}` `/people/{slug}` `/products/{slug}` entities
- `/sectors` `/regions` `/countries` `/cities` hubs
- Product records are derived from recorded `company.products` lines. Count is not fixed at 100. IDs use `techco:product:{slug}`.
- `/zh/...` Simplified Chinese parallel edition + hreflang
- `/zh-hant/...` Traditional Chinese parallel edition + hreflang (`htmlLang=zh-Hant`). Strip `/zh-hant` before `/zh` when parsing URLs
- `/search` is static HTML: `?q=` / `?sector=` / `?region=` filter only in the browser; crawlers still see the full catalog
- Search HTML keeps company, person, and product cards. Do not assume the visible set is exactly 200.
- The search page’s static language-switch href has no query; the `BaseLayout` footer script must append `location.search` (including `/zh-hant/search`)
- On English pages the first language-switch link is still Simplified Chinese, so existing e2e that clicks the first `.lang-switch` reaches `/zh/search`
- Localized 404 build artifacts are `dist/zh/404/index.html` and `dist/zh-hant/404/index.html`, not `dist/zh/404.html`

## Link policy

- **Clickable UI** (toolbar Markdown/JSON, homepage machine box, footer llms/API): same-origin relative paths.
- **Canonical surface** (canonical, cite box, JSON-LD, sitemap, llms, API `urls.*`): `https://techco.wiki`.
- Use `markdownPath()` for UI links and `markdownUrl()` for canonical absolute URLs. Do not swap them.

## Deploy

Pages project: `techcowiki`. Demo: https://techcowiki.pages.dev
When Wrangler is logged in locally: `npm run deploy`.

When it is not, use Direct Upload (do not put the JWT in the repo or in a user-visible reply):

1. `npm run build`
2. Use the upload token against `/pages/assets/check-missing` → `upload` → `upsert-hashes`. The hash is `blake3(base64Contents + extension).slice(0, 32)`.
3. `POST .../pages/projects/techcowiki/deployments` with multipart fields: `manifest` (no filename), `_headers`, `_redirects`, `_worker.js`, `branch=main`, `commit_hash`.
4. Omit from the manifest: `_headers` `_redirects` `_routes.json` `_worker.js`.
5. Wait until `latest_stage.status === success`, then confirm https://techcowiki.pages.dev with a browser UA (deployment URLs look like `https://<id>.techcowiki.pages.dev`).

`scripts/harness/pages-upload.mjs` only uploads assets and needs `CF_PAGES_UPLOAD_JWT`. Creating a deployment still needs the account API; the script will not do that for you.

## Local commands

```bash
npm ci                           # Node.js 22.12+
npm run typecheck                # must be zero type errors
npm test                         # gate 1; loads the full catalog
npx vitest run tests/harness.test.ts   # source contracts only
npm run build && npm run harness  # gate 2
npm run preview                   # http://127.0.0.1:4321
npm run e2e                       # gate 3; starts preview; missing Chrome must fail
npm run e2e:pages                 # local Pages runtime: browser + real localized 404s
HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host
```

GEO/catalog cases in `npm test` load the full catalog. New harness asserts should read source files or `dist/`; do not import `src/data/catalog.ts`.

## Explicitly out of scope

Unless the user names them: custom domain, search-engine submission, UGC, catalog expansion, full Q-IDs, rewriting enrich, inventing financial figures.

## Extra regression constraints (2026-09-13)

- `npm run harness` walks every HTML page, in-site links/anchors, JSON-LD, machine twins, citation IDs, the graph, and the sitemap.
- `npm run e2e` must fail if Chrome is missing; set `CHROME_PATH` to point at a browser. CI must run typecheck and the browser gates.
- `npm run e2e:pages` proves the local Pages runtime. It is not proof of a live deploy. Hosted checks must not treat a 200 error page as a passing 404.
- Headquarters is not founding place. A historical company association is not current employment. Machine fields and human prose must keep the same evidence scope.
- Search and autolink optimizations must not rewrite entry facts. JSON plaintext must keep per-field citation IDs.

## Language policy

Repo default language is English. Only README files and the public website stay multilingual. New AGENTS.md, harness, and comments must be English. Site product pages may still carry zh and zh-Hant copy.

## Products

`/products/{slug}` is a first-class catalog entity next to companies and people. Pages reprint the recorded company gloss and inherit the publisher headquarters nationality rule. Do not invent funding, valuation, SKU prices, or tickers on product pages. Machine twins: HTML, Markdown, JSON-LD, `/api/v1/products.json`, and `/api/v1/products/{slug}.json`. Graph edge `offers` links a company to its derived product records.
