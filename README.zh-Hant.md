# TechCo.Wiki

[English](./README.md) · [简体中文](./README.zh-CN.md)

全球華人創辦科技公司的開放百科。**GEO（生成式引擎優化）是第一優先級**：先寫成生成式引擎願意引用的權威記錄，再兼顧人類瀏覽。

英文是規範文本。簡體中文（`/zh`）與繁體中文（`/zh-hant`）是完整平行版本。站點域名：<https://techco.wiki>

倉庫預設英文。只有 README 與公開網站保持多語言（en、zh-CN、zh-Hant）。代理、Harness 與 CI 文件使用英文。

## 為什麼這樣建

Crunchbase 一類產品把事實放在登入牆後，模型很難穩定引用。維基百科能被主流大模型當作權威，是因為它免費、可引用、有穩定標識，並且聲明方法。TechCo.Wiki 把同一契約收窄到一個垂直領域：

- 至少一名具名創始人是華人（含港澳臺與全球華裔）
- 公司是科技公司，不是純品牌或純控股殼
- 每條事實有出處，每個實體有 `techco:company:*` / `techco:person:*`
- 同一記錄同時提供 HTML、Markdown、JSON-LD 和版本化 JSON API
- 內容 CC BY-SA 4.0，允許訓練、檢索與引用

## 機器入口

| 資源 | 用途 |
| --- | --- |
| `/llms.txt` | [llms.txt v2](https://llmstxt.org/) 索引 |
| `/llms-full.txt` | 英文全文拼接 |
| `/zh/llms-full.txt` | 簡體中文全文拼接 |
| `/zh-hant/llms-full.txt` | 繁體中文全文拼接 |
| `/feed.xml` | 公司與人物 RSS |
| `/api/v1/openapi.json` | 唯讀 API 合同 |
| `/api/v1/companies.json` | 公司目錄 |
| `/api/v1/people.json` | 人物目錄 |
| `/api/v1/graph.json` | 創始、任職、行業、地區、國家、城市與鄰居關係圖 |
| `/api/v1/dataset.json` | 目錄計數與機器入口 |
| `/api/v1/{companies,people}/{slug}.json` | 單實體 JSON |
| `/companies.md` / `/people.md` | 英文目錄 Markdown |
| `/zh/companies.md` / `/zh/people.md` | 簡體中文目錄 Markdown |
| `/zh-hant/companies.md` / `/zh-hant/people.md` | 繁體中文目錄 Markdown |
| `/sectors.md` `/regions.md` `/countries.md` `/cities.md` | 樞紐 Markdown |
| `/companies/{slug}.md` | 公司 Markdown 副本 |
| `/search` | 用戶端篩選；完整目錄仍在 HTML 中 |
| `/for-models` | 給模型的引用規則 |

## 本地開發

代理與貢獻者先讀根目錄 [AGENTS.md](./AGENTS.md)（專案 Harness）。不要只跑 `npm test` 就宣布 UI / 內鏈 / 404 / 部署完成。

要求 Node.js 22.12+（可用 `nvm use`）；依賴版本由 lockfile 固定。

```bash
npm ci
npm run typecheck                 # Astro / TypeScript 類型檢查
npm test                          # 第 1 層：函式與源碼契約
npm run build && npm run harness  # 第 2 層：dist/ HTML 合同
npm run preview                   # 手動預覽：http://127.0.0.1:4321
npm run e2e                       # 自動啟動臨時預覽並執行 Chrome，結束後關閉
npm run e2e:pages                 # 本地 Pages runtime：瀏覽器 + 真實中文 404
```

`npm run check` 依序執行類型、單測、構建和全站產物檢查；CI 另外執行兩種瀏覽器驗收。`npm run e2e` 會自動探測 macOS / Linux 的 Chrome，找不到時應透過 `CHROME_PATH` 指定路徑；缺少瀏覽器會報錯，不會跳過。已有預覽可用 `E2E_BASE=http://127.0.0.1:4321 npm run e2e`。

`dist/` 是靜態站點。`public/_headers` 寫好 CORS 與 `rel=describedby`。`/zh/*` 與 `/zh-hant/*` 缺失 URL 的 404 由 `public/_worker.js` 處理——Astro preview 不會執行它。

## 檢索與 API 契約

搜尋保留公司、人物與產品卡片，無 JavaScript 時仍可閱讀。瀏覽器按所有空白分隔的關鍵詞篩選，忽略大小寫並歸一化全形字元；行業和地區使用完整 slug。未知篩選值按未選擇處理，語言切換保留查詢和篩選條件。檢索文本去除重複詞和 Markdown 目標地址，原始英/簡體源文不受影響。

API 文件版本 **1.5.0** 繼續使用 `/api/v1/` 路徑：

- 本地化字串與 `citations` / `sourceIds` 含 `en`、`zh`（簡體）和 `zht`（繁體）；ID 對應實體的 `sources` 陣列。
- 圖譜中的 `works-at` 更正為 `associated-with`，並提供 `{en, zh, zht}` 的 `role`。既有呼叫者須更新對該邊類型的判斷；歷史創始、任職關聯不證明當前僱傭關係。
- 一等產品記錄見 `/api/v1/products.json` 與 `/api/v1/products/{slug}.json`。圖譜 `offers` 邊連接公司與已記錄產品線。產品頁不編造融資、估值、SKU 價格或證券代碼。
- JSON-LD 使用總部 `location`，不從總部推斷 `foundingLocation`；人物使用帶角色的 `affiliation`。

詳細審查與驗證記錄見 [docs/review-2026-09-13.md](./docs/review-2026-09-13.md)。

## Cloudflare 開發 demo

目前開發預覽：<https://techcowiki.pages.dev>

本地已登入 Wrangler 時：

```bash
npm run deploy
```

Wrangler 未登入時不要假設這條命令可用。生產是 Pages Direct Upload；步驟與「測過函式仍可能在線上失敗」的原因寫在 [AGENTS.md](./AGENTS.md)。部署後：

```bash
HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host
```

自訂域 `techco.wiki` 可在專案就緒後接到同一個 Pages 專案；在使用者點名之前不要改 DNS。

## 資訊架構

- `/companies/{slug}` 公司實體
- `/people/{slug}` 人物實體
- `/sectors`、`/regions`、`/countries`、`/cities` 樞紐總索引及各 `{slug}` 詳情
- `/zh/...` 簡體中文平行版，帶 hreflang
- `/zh-hant/...` 繁體中文平行版，帶 hreflang
- `/methodology`、`/inclusion`、`/faq`、`/about`、`/license` 方法與信任頁
- 搜尋頁是靜態 HTML：`?q=` / `?sector=` / `?region=` 只在瀏覽器裡篩選，爬蟲仍能看到全部實體

本目錄是精選的 100 家公司版本，覆蓋上市集團、老牌硬體商與較新的人工智慧公司，不是普查。缺席不代表否定判斷。

## 許可

- 條目與目錄資料：CC BY-SA 4.0
- 網站程式碼：MIT
