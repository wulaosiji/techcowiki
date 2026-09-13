# TechCo.Wiki

[简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md)

The open encyclopedia of technology companies founded by ethnic Chinese entrepreneurs worldwide. **GEO (generative-engine optimization) comes first**: write a citable authority record for models, then serve human readers.

English is the canonical text. Simplified Chinese (`/zh`) and Traditional Chinese (`/zh-hant`) are complete parallel editions. Site origin: <https://techco.wiki>

The repository defaults to English. Only README files and the public website stay multilingual (`en`, `zh-CN`, `zh-Hant`). Agent, harness, and CI docs are English.

## Why this site exists

Products like Crunchbase keep facts behind a login wall, so models cannot cite them reliably. Wikipedia works as an authority for major models because it is free, citable, stably identified, and explicit about method. TechCo.Wiki applies the same contract to one vertical:

- At least one named founder is ethnic Chinese (including Hong Kong, Macau, Taiwan, and the global diaspora)
- The company is a technology company, not a pure brand or holding shell
- Every fact has a source; every entity has `techco:company:*` / `techco:person:*`
- The same record ships as HTML, Markdown, JSON-LD, and a versioned JSON API
- Content is CC BY-SA 4.0 and may be used for training, retrieval, and citation

## Machine entry points

| Resource | Purpose |
| --- | --- |
| `/llms.txt` | [llms.txt v2](https://llmstxt.org/) index |
| `/llms-full.txt` | Concatenated English dump |
| `/zh/llms-full.txt` | Concatenated Simplified Chinese dump |
| `/zh-hant/llms-full.txt` | Concatenated Traditional Chinese dump |
| `/feed.xml` | Company and person RSS |
| `/api/v1/openapi.json` | Read-only API contract |
| `/api/v1/companies.json` | Company catalog |
| `/api/v1/people.json` | People catalog |
| `/api/v1/graph.json` | Founding, association, sector, region, country, city, and peer graph |
| `/api/v1/dataset.json` | Catalog counts and machine entry points |
| `/api/v1/{companies,people}/{slug}.json` | Single-entity JSON |
| `/companies.md` / `/people.md` | English catalog Markdown |
| `/zh/companies.md` / `/zh/people.md` | Simplified Chinese catalog Markdown |
| `/zh-hant/companies.md` / `/zh-hant/people.md` | Traditional Chinese catalog Markdown |
| `/sectors.md` `/regions.md` `/countries.md` `/cities.md` | Hub Markdown |
| `/companies/{slug}.md` | Company Markdown twin |
| `/search` | Client-side filter; the full catalog remains in the HTML |
| `/for-models` | Citation rules for models |

## Local development

Agents and contributors should read [AGENTS.md](./AGENTS.md) (the project harness) first. Do not declare UI / internal links / 404 / deploy work done after `npm test` alone.

Requires Node.js 22.12+ (`nvm use` is fine). Dependency versions are pinned by the lockfile.

```bash
npm ci
npm run typecheck                 # Astro / TypeScript
npm test                          # Gate 1: functions and source contracts
npm run build && npm run harness  # Gate 2: dist/ HTML contracts
npm run preview                   # Manual preview: http://127.0.0.1:4321
npm run e2e                       # Temporary preview + Chrome, then exit
npm run e2e:pages                 # Local Pages runtime: browser + real localized 404s
```

`npm run check` runs typecheck, unit tests, build, and the full-site artifact checks in order. CI also runs both browser gates. `npm run e2e` looks for Chrome on macOS / Linux; set `CHROME_PATH` if it is not found. A missing browser fails the gate instead of skipping it. An already-running preview can use `E2E_BASE=http://127.0.0.1:4321 npm run e2e`.

`dist/` is the static site. `public/_headers` sets CORS and `rel=describedby`. Localized 404s for missing `/zh/*` and `/zh-hant/*` URLs are handled by `public/_worker.js` — Astro preview does not run it.

## Search and API contract

Search keeps company, person, and product cards; the catalog stays readable without JavaScript. The browser filters on every whitespace-separated keyword, case-insensitively, after folding full-width characters. Sector and region filters use complete slugs. Unknown filter values behave as unset. Language switching keeps the query and filters. Search haystacks drop duplicate tokens and Markdown destinations; the original bilingual source text is unchanged.

API documentation version **1.5.0** still uses `/api/v1/` paths:

- Localized strings and citation `sourceIds` include `en`, `zh` (zh-Hans), and `zht` (zh-Hant). IDs resolve against the entity `sources` array.
- Graph `works-at` remains `associated-with`, now with `{en, zh, zht} role`. Callers must not treat a historical association as current employment.
- First-class product records live at `/api/v1/products.json` and `/api/v1/products/{slug}.json`. Graph `offers` links a company to its recorded product lines. Product pages do not invent funding, valuation, SKU prices, or tickers.
- JSON-LD uses headquarters `location` and does not infer `foundingLocation` from HQ. People use role-bearing `affiliation`.

See [docs/review-2026-09-13.md](./docs/review-2026-09-13.md) for the earlier review notes.

## Cloudflare development demo

Current development preview: <https://techcowiki.pages.dev>

When Wrangler is logged in locally:

```bash
npm run deploy
```

Do not assume that command works without a login. Production is Pages Direct Upload; the steps, and why a passing function test can still fail online, are in [AGENTS.md](./AGENTS.md). After deploy:

```bash
HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host
```

The custom domain `techco.wiki` can be attached to the same Pages project when the project is ready; do not change DNS until the user asks.

## Information architecture

- `/companies/{slug}` company entities
- `/people/{slug}` person entities
- `/sectors`, `/regions`, `/countries`, `/cities` hub indexes and `{slug}` detail pages
- `/zh/...` Simplified Chinese parallel edition with hreflang
- `/zh-hant/...` Traditional Chinese parallel edition with hreflang
- `/methodology`, `/inclusion`, `/faq`, `/about`, `/license` method and trust pages
- Search pages are static HTML: `?q=` / `?sector=` / `?region=` only hide cards in the browser; crawlers still see every entity

This catalog is a curated 100-company edition covering public groups, long-standing hardware firms, and newer AI companies. It is not a census. Absence is not a negative judgment.

## License

- Entries and catalog data: CC BY-SA 4.0
- Site code: MIT
