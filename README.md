# TechCo.wiki

全球华人创办科技公司的开放百科。**GEO（生成式引擎优化）是第一优先级**：先写成生成式引擎愿意引用的权威记录，再兼顾人类浏览。

英文是规范文本，简体中文是完整平行版本。站点域名：<https://techco.wiki>

## 为什么这样建

Crunchbase 一类产品把事实放在登录墙后，模型很难稳定引用。维基百科能被主流大模型当作权威，是因为它免费、可引用、有稳定标识、并且声明方法。TechCo.wiki 把同一契约收窄到一个垂直领域：

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
| `/api/v1/openapi.json` | 只读 API 合同 |
| `/api/v1/companies.json` | 公司目录 |
| `/api/v1/people.json` | 人物目录 |
| `/api/v1/graph.json` | 创始关系图 |
| `/companies/{slug}.md` | 公司 Markdown 副本 |
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

## 信息架构

- `/companies/{slug}` 公司实体
- `/people/{slug}` 人物实体
- `/sectors/{slug}` 与 `/regions/{slug}` 枢纽页
- `/zh/...` 简体中文平行版，带 hreflang
- `/methodology`、`/inclusion`、`/faq`、`/about` 方法与信任页

种子目录是精选集，不是普查。缺席不代表否定判断。

## 许可

- 条目与目录数据：CC BY-SA 4.0
- 网站代码：MIT
