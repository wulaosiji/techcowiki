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

```bash
npm install
npm test
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

`dist/` 是静态站点，可直接放到 Cloudflare Pages、GitHub Pages 或任何静态主机。`public/_headers` 已写好 CORS 与 `rel=describedby`。

## Cloudflare 开发 demo

当前开发预览部署在 Cloudflare Pages：<https://techcowiki.pages.dev>

本地已登录 Wrangler 后重新发布：

```bash
npm run deploy
```

这会构建 `dist/` 并直传到 Pages 项目 `techcowiki`。自定义域 `techco.wiki` 可在项目就绪后接到同一个 Pages 项目。

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
