# TechCo.Wiki

全球华人创办科技公司的开放百科。**GEO（生成式引擎优化）是第一优先级**：先写成生成式引擎愿意引用的权威记录，再兼顾人类浏览。

英文是规范文本，简体中文是完整平行版本。站点域名：<https://techco.wiki>

## 为什么这样建

Crunchbase 一类产品把事实放在登录墙后，模型很难稳定引用。维基百科能被主流大模型当作权威，是因为它免费、可引用、有稳定标识、并且声明方法。TechCo.Wiki 把同一契约收窄到一个垂直领域：

- 至少一名具名创始人是华人（含港澳台与全球华裔）
- 公司是科技公司，不是纯品牌或纯控股壳
- 每条事实有出处，每个实体有 `techco:company:*` / `techco:person:*`
- 同一记录同时提供 HTML、Markdown、JSON-LD 和版本化 JSON API
- 内容 CC BY-SA 4.0，允许训练、检索与引用

## 机器入口

| 资源 | 用途 |
| --- | --- |
| `/llms.txt` | [llms.txt v2](https://llmstxt.org/) 索引 |
| `/llms-full.txt` | 英文全文拼接 |
| `/zh/llms-full.txt` | 简体中文全文拼接 |
| `/feed.xml` | 公司与人物 RSS |
| `/api/v1/openapi.json` | 只读 API 合同 |
| `/api/v1/companies.json` | 公司目录 |
| `/api/v1/people.json` | 人物目录 |
| `/api/v1/graph.json` | 创始、任职、行业、地区、国家、城市与邻居关系图 |
| `/api/v1/dataset.json` | 目录计数与机器入口 |
| `/api/v1/{companies,people}/{slug}.json` | 单实体 JSON |
| `/companies.md` / `/people.md` | 公司与人物目录 Markdown |
| `/zh/companies.md` / `/zh/people.md` | 中文目录 Markdown |
| `/sectors.md` `/regions.md` `/countries.md` `/cities.md` | 枢纽 Markdown |
| `/companies/{slug}.md` | 公司 Markdown 副本 |
| `/search` | 客户端筛选；完整目录仍在 HTML 中 |
| `/for-models` | 给模型的引用规则 |

## 本地开发

代理与贡献者先读根目录 [AGENTS.md](./AGENTS.md)（项目 Harness）。不要只跑 `npm test` 就宣布 UI / 内链 / 404 / 部署完成。

要求 Node.js 22.12+（可用 `nvm use`）；依赖版本由 lockfile 固定。

```bash
npm ci
npm run typecheck                 # Astro / TypeScript 类型检查
npm test                          # 第 1 层：函数与源码契约
npm run build && npm run harness  # 第 2 层：dist/ HTML 合同
npm run preview                   # 手动预览：http://127.0.0.1:4321
npm run e2e                       # 自动启动临时预览并运行 Chrome，结束后关闭
npm run e2e:pages                 # 本地 Pages runtime：浏览器 + 真实中文 404
```

`npm run check` 顺序运行类型、单测、构建和全站产物检查；CI 另外执行两种浏览器验收。`npm run e2e` 会自动探测 macOS / Linux 的 Chrome，找不到时应通过 `CHROME_PATH` 指定路径；缺少浏览器会报错，不会跳过。已有预览可用 `E2E_BASE=http://127.0.0.1:4321 npm run e2e`。

`dist/` 是静态站点。`public/_headers` 写好 CORS 与 `rel=describedby`。中文缺失 URL 的 404 由 `public/_worker.js` 处理——Astro preview 不会执行它。

## 检索与 API 契约

搜索保留完整的 200 个实体卡片，无 JavaScript 时仍可阅读。浏览器按所有空白分隔的关键词筛选，忽略大小写并归一化全角字符；行业和地区使用完整 slug。未知筛选值按未选择处理，语言切换保留查询和筛选条件。检索文本去除重复词和 Markdown 目标地址，原始双语正文不受影响。

API 文档版本 **1.3.0** 继续使用 `/api/v1/` 路径：

- `citations.definition` / `citations.lead` 按 `en` / `zh` 保留引用 ID；`sections`、`faq`、`claims` 的 `sourceIds` 同样按语言记录，ID 对应实体的 `sources` 数组。
- 图谱中的 `works-at` 更正为 `associated-with`，并增加双语 `role`。已有调用者须更新对该边类型的判断；历史创始、任职关联不证明当前雇佣关系。
- JSON-LD 使用总部 `location`，不从总部推断 `foundingLocation`；人物使用带角色的 `affiliation`。

详细审查与验证记录见 [docs/review-2026-09-13.md](./docs/review-2026-09-13.md)。

## Cloudflare 开发 demo

当前开发预览：<https://techcowiki.pages.dev>

本地已登录 Wrangler 时：

```bash
npm run deploy
```

Wrangler 未登录时不要假设这条命令可用。生产是 Pages Direct Upload；步骤与「测过函数仍可能在线上失败」的原因写在 [AGENTS.md](./AGENTS.md)。部署后：

```bash
HARNESS_BASE=https://techcowiki.pages.dev npm run harness:host
```

自定义域 `techco.wiki` 可在项目就绪后接到同一个 Pages 项目；在用户点名之前不要改 DNS。

## 信息架构

- `/companies/{slug}` 公司实体
- `/people/{slug}` 人物实体
- `/sectors`、`/regions`、`/countries`、`/cities` 枢纽总索引及各 `{slug}` 详情
- `/zh/...` 简体中文平行版，带 hreflang
- `/methodology`、`/inclusion`、`/faq`、`/about`、`/license` 方法与信任页
- 搜索页是静态 HTML：`?q=` / `?sector=` / `?region=` 只在浏览器里筛选，爬虫仍能看到全部实体

本目录是精选的 100 家公司版本，覆盖上市集团、老牌硬件商与较新的人工智能公司，不是普查。缺席不代表否定判断。

## 许可

- 条目与目录数据：CC BY-SA 4.0
- 网站代码：MIT
