# TechCo.Wiki Harness

这是本仓库的开发契约。人与代理改代码前先读这一页，再写补丁。

英文是规范文本；简体中文（`/zh`）与繁体中文（`/zh-hant`）是完整平行版本。出版者写作 **TechCo.Wiki**，主机名永远是小写 `techco.wiki`。

## 这个项目是什么

垂直、可引用的科技公司百科，**GEO 第一**：先让生成式引擎拿到同一条可引用记录，再兼顾人类浏览。

同一实体必须同时有 HTML、Markdown、JSON-LD 和 `/api/v1/...` JSON。内容 CC BY-SA 4.0，代码 MIT。

当前目录规模锁定为 **100 家公司 / 100 位人物**，不是普查。缺席不是否定判断。

## 会话复盘：开发过程为什么反复返工

整轮「全面 review 再实施」里，真正浪费时间的不是缺功能，而是验收层选错：

1. **测过函数 ≠ 渲染出来的 HTML。** `switchLocale()` 单测正确，但静态搜索页构建时 `Astro.url.search` 为空，语言切换 href 仍是 `/zh/search`，把 `?q=TSM` 丢掉。必须在构建产物和浏览器里点一次。
2. **本地 preview ≠ Cloudflare Pages。** Astro preview 不跑 `public/_worker.js`，也不执行 Pages `_redirects`。`/zh/* → 404` 在文档里写了 rewrite，Pages **不支持** 用 `_redirects` 做 404 回源；根目录 `404.html` 会吞掉所有缺失路径。中文 404 只能靠 worker 拦截 `/zh/*` 的 404，通过 clean URL `/zh/404/` 读取构建产物 `/zh/404/index.html`。
3. **规范 URL ≠ 可点击 UI。** `https://techco.wiki/...` 属于引用、sitemap、API、llms。工具栏、首页机器盒、页脚若也写成绝对地址，预览站和 `pages.dev` 会跳到未部署的生产域。可点击链接用同站相对路径（`markdownPath()`）。
4. **自动内链会改写不该改的词。** 维基 URL、`中国大陆`、`Chinese mainland`、`United States-headquartered` 必须先保护再匹配。内链回归必须看渲染后的 `<a>`，不能只看源字符串。
5. **目录加载有成本。** 自动内链已复用词典、正则与大小写转换，但 import `catalog` 仍会 enrich 整本目录。新增测试尽量只读文件或抽纯函数；不要再 import `catalog` 做 trivial 断言。先跑改动对应的 `tests/*.test.ts`，整包放在构建前。
6. **默认 HTTP 客户端会骗你。** `urllib` / 无 UA 的脚本打 `pages.dev` 常 308/403。验收用浏览器 UA，并跟随 `/companies/nvidia` → `/companies/nvidia/` 这类斜杠跳转。
7. **`npm run deploy`（Wrangler）经常不可用。** 生产是 Pages Direct Upload，名义分支 `main`。JWT 只能打 `/pages/assets/*`，不能建 deployment。`_headers`、`_redirects`、`_worker.js` **不要**进 asset manifest，必须作为 deployment 表单字段上传。
8. **单张截图不算验收。** 搜索、语言切换、表单提交、404 必须点击/输入后看地址栏和正文。

下面的四层门就是为了不再重复这些返工。

## 硬边界（永不违反）

- 不编造融资、估值、人数、未在条目或可靠来源中出现的 ticker。理想/小鹏/蔚来/宁德时代等「亦在香港交易」若没有具体代码，保持不写数字。
- 华人身份只解释**为何收录**。不把 NVIDIA、Yahoo、Pony.ai（Fremont）写成中国公司；不把 TSMC、UMC、联发科等台湾公司写成中国大陆公司。
- 不把「中国 / China」当作台湾、香港、澳门总部的同义词。Greater China 是宏观地区标签。
- 不改字标大小写去迁就域名：UI 写 `TechCo.Wiki`，URL 写 `https://techco.wiki`。
- 不把 About / License / FAQ 里的专名做「意思相近」替换；只做原样匹配。
- 未经明确要求，不要做：自定义域 DNS、IndexNow / Google / Bing 提交、UGC、再扩目录、全量 Wikidata Q-ID、重写整个 `src/data/enrich.ts`。

## 四层验收门（按序，不可跳）

| 层 | 命令 | 证明什么 | 证明不了什么 |
| --- | --- | --- | --- |
| 1. 源码契约 | `npm test`（含 `tests/harness.test.ts`） | 纯函数、目录完整性、内链保护、源码里 UI 没用错绝对地址 | 构建后的 href、Pages 404 |
| 2. 构建产物 | `npm run build && npm run harness` | `dist/` 里机器盒、ticker、同站 Markdown、中文 404 文件、worker | JS 语言切换、线上 splat |
| 3. 浏览器 | `npm run e2e`（自动启动临时 preview） | 真人路径：输入、提交、点击「中文」、地址栏仍带 `?q=` | Pages worker、CDN 缓存 |
| 4. 托管主机 | `HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host` | 线上 HTML 与简体/繁体缺失 URL 的 404 正文 | — |

改 UI / 路由 / 文案 / 内链 / 机器面：**1+2 必过**；涉及交互或 i18n：**再过 3**；声称「已部署」：**再过 4**。

完成定义：相关层全绿，且没有只靠截图宣布成功。

## 改动分类与必测面

| 你改了 | 至少跑 | 至少点开 |
| --- | --- | --- |
| `src/lib/autolink.ts` | `tests/links.test.ts` | NVIDIA / TSMC 页：维基 URL 未被改写；连字符国籍不被拆成「United」 |
| `src/lib/i18n.ts` / `BaseLayout.astro` | `tests/i18n.test.ts` + e2e 搜索切语言 | `/search?q=TSM` → 中文后 URL 仍含 `q=TSM` |
| 公司/人物数据或 `normalize.ts` | `tests/catalog.test.ts` `tests/geo.test.ts` | 该实体英/中页、搜索 haystack（ticker / 别名 / HQ） |
| 工具栏、首页机器盒、页脚 | `tests/harness.test.ts` + `npm run harness` | 预览站点击 Markdown / llms.txt 仍留在当前主机 |
| 404 / `_worker.js` / `_redirects` | `tests/redirects.test.ts` + harness | 本地 `/zh/404` 与 `/zh-hant/404`；线上 `/zh/this-page-does-not-exist` 与 `/zh-hant/this-page-does-not-exist` 标题为「未找到」 |
| 机器面（llms / sitemap / OpenAPI / graph） | `tests/i18n.test.ts` `tests/geo.test.ts` | OpenAPI 路径是 **`/api/v1/openapi.json`**，不是根 `/openapi.json` |

## 信息架构（不要私自改 URL）

- `/companies/{slug}` `/people/{slug}` `/products/{slug}` 实体
- `/sectors` `/regions` `/countries` `/cities` 枢纽
- Product records are derived from recorded `company.products` lines. Count is not fixed at 100. IDs use `techco:product:{slug}`.
- `/zh/...` 简体中文平行版 + hreflang
- `/zh-hant/...` 繁体中文平行版 + hreflang（`htmlLang=zh-Hant`）。URL 必须先剥 `/zh-hant` 再剥 `/zh`
- `/search` 是静态 HTML：`?q=` / `?sector=` / `?region=` 只在浏览器筛选，爬虫仍看到全目录
- Search HTML keeps company, person, and product cards. Do not assume the visible set is exactly 200.
- 搜索页语言切换的静态 href 没有 query；`BaseLayout` 页尾脚本必须补 `location.search`（含 `/zh-hant/search`）
- 英文页语言切换第一个链接仍是简体，保证现有 e2e 点第一个 `.lang-switch` 进入 `/zh/search`
- 中文 404 构建产物是 `dist/zh/404/index.html` 与 `dist/zh-hant/404/index.html`，不是 `dist/zh/404.html`

## 链接政策

- **可点击 UI**（工具栏 Markdown/JSON、首页机器盒、页脚 llms/API）：同站相对路径。
- **规范面**（canonical、cite box、JSON-LD、sitemap、llms、API `urls.*`）：`https://techco.wiki`。
- 用 `markdownPath()` 生成 UI 链接，用 `markdownUrl()` 生成规范绝对地址。不要对调。

## 部署

Pages 项目：`techcowiki`。演示：https://techcowiki.pages.dev  
本机已登录 Wrangler 时：`npm run deploy`。

未登录时走 Direct Upload（不要把 JWT 写进仓库或用户可见回复）：

1. `npm run build`
2. 用 upload token 对 `/pages/assets/check-missing` → `upload` → `upsert-hashes`。哈希是 `blake3(base64Contents + extension).slice(0, 32)`。
3. `POST .../pages/projects/techcowiki/deployments`，multipart 字段：`manifest`（不要 filename）、`_headers`、`_redirects`、`_worker.js`、`branch=main`、`commit_hash`。
4. 忽略进 manifest：`_headers` `_redirects` `_routes.json` `_worker.js`。
5. 等 `latest_stage.status === success`，再用浏览器 UA 打 https://techcowiki.pages.dev 确认（部署 URL 形如 `https://<id>.techcowiki.pages.dev`）。

`scripts/harness/pages-upload.mjs` 只做资产上传，需要 `CF_PAGES_UPLOAD_JWT`。创建 deployment 仍需账户 API，脚本不会代劳。

## 本地命令

```bash
npm ci                           # Node.js 22.12+
npm run typecheck                # 必须零类型错误
npm test                          # 第 1 层；加载整本目录
npx vitest run tests/harness.test.ts   # 只跑源码契约
npm run build && npm run harness  # 第 2 层
npm run preview                   # http://127.0.0.1:4321
npm run e2e                       # 第 3 层；自动启动 preview，缺少 Chrome 时失败
npm run e2e:pages                 # 本地 Pages runtime：浏览器 + 中文缺失 URL 真正返回 404
HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host
```

`npm test` 的 GEO/目录用例会加载整本目录。新增 harness 断言优先读磁盘上的源文件或 `dist/`，不要再 import `src/data/catalog.ts`。

## 明确不要做

除非用户点名：自定义域、搜索引擎提交、UGC、扩目录、全量 Q-ID、重写 enrich、编造财务数字。

## 新增回归约束（2026-09-13）

- `npm run harness` 全量遍历 HTML、站内链接/锚点、JSON-LD、机器副本、引用 ID、图谱和 sitemap。
- `npm run e2e` 缺少 Chrome 时必须失败；用 `CHROME_PATH` 指定浏览器。CI 必须运行类型检查和浏览器验收。
- `npm run e2e:pages` 验证本地 Pages runtime，不能据此声称已部署。托管检查不得将错误页的 200 状态视为 404 通过。
- 总部不等于创立地点；历史公司关联不等于当前任职。机器字段和人类正文必须保持相同证据范围。
- 搜索和内链优化不得改写条目事实；JSON 纯文本必须保留逐字段引用 ID。

## Language policy

Repo default language is English. Only README files and the public website stay multilingual. New AGENTS.md, harness, and comments must be English. Site product pages may still carry zh and zh-Hant copy.

## Products

`/products/{slug}` is a first-class catalog entity next to companies and people. Pages reprint the recorded company gloss and inherit the publisher headquarters nationality rule. Do not invent funding, valuation, SKU prices, or tickers on product pages. Machine twins: HTML, Markdown, JSON-LD, `/api/v1/products.json`, and `/api/v1/products/{slug}.json`. Graph edge `offers` links a company to its derived product records.
