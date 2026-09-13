import { getCompany, getPerson, relatedPeople, seeAlsoCompanies } from "../data/catalog";
import { regionName, sectorName, tickerText } from "../data/copy";
import { CONTENT_LICENSE, CONTENT_LICENSE_URL, SITE_NAME, SITE_ORIGIN } from "../data/site";
import type { Company, EntityClaim, EntityFaq, Locale, Person } from "../data/types";
import { citySlug, countrySlug } from "../data/places";
import { stripCiteMarks } from "./citations";
import { formatFounded, markdownUrl, pageUrl, pick, t } from "./i18n";
import { companyMdLink, personMdLink } from "./links";

function claimsMarkdown(claims: EntityClaim[] | undefined, locale: Locale): string[] {
  if (!claims?.length) return [];
  return [
    pick(locale, "## Extractable facts", "## 可抽取事实"),
    "",
    ...claims.map(
      (item) => `- **${t(item.label, locale)}:** ${stripCiteMarks(t(item.value, locale))}`,
    ),
    "",
  ];
}

function faqMarkdown(faq: EntityFaq[] | undefined, locale: Locale): string[] {
  if (!faq?.length) return [];
  return [
    pick(locale, "## Frequently asked questions", "## 常见问题"),
    "",
    ...faq.flatMap((item) => [
      `### ${t(item.question, locale)}`,
      "",
      stripCiteMarks(t(item.answer, locale)),
      "",
    ]),
  ];
}

export function companyMarkdown(company: Company, locale: Locale): string {
  const url = pageUrl(locale, `/companies/${company.slug}`);
  const founders = company.founders.map((founder) => {
    const person = getPerson(founder.personSlug);
    const name = person ? personMdLink(person, locale) : founder.personSlug;
    return `${name} (${t(founder.role, locale)}; ${founder.personSlug})`;
  });
  const products = company.products.map(
    (product) => `${product.name}: ${t(product.description, locale)}`,
  );
  const lines = [
    `# ${t(company.name, locale)}`,
    "",
    `> ${stripCiteMarks(t(company.definition, locale))}`,
    "",
    `- Stable ID: \`${company.id}\``,
    `- Canonical URL: ${url}`,
    `- Markdown twin: ${markdownUrl(locale, `/companies/${company.slug}`)}`,
    `- JSON: ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
    `- Last reviewed: ${company.lastReviewed}`,
    `- Confidence: ${company.confidence}`,
    `- License: ${CONTENT_LICENSE} (${CONTENT_LICENSE_URL})`,
    `- Founded: ${formatFounded(company.founded, company.foundedPrecision)}`,
    `- Headquarters: [${t(company.headquarters.city, locale)}](${pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`)}), [${t(company.headquarters.country, locale)}](${pageUrl(locale, `/countries/${countrySlug(company.headquarters.countryCode)}`)}) (${company.headquarters.countryCode})`,
    `- Status: ${company.status}`,
    `- Stage: ${company.stage}`,
    `- Sectors: ${company.sectors.map((slug) => `[${sectorName(slug, locale)}](${pageUrl(locale, `/sectors/${slug}`)})`).join(", ")}`,
    `- Regions: ${company.regions.map((slug) => `[${regionName(slug, locale)}](${pageUrl(locale, `/regions/${slug}`)})`).join(", ")}`,
    `- Website: ${company.website}`,
    `- Founders: ${founders.join("; ")}`,
    `- Products: ${products.join("; ")}`,
    company.legalName ? `- Legal name: ${company.legalName}` : undefined,
    company.stock ? `- Ticker: ${tickerText(company, locale)}` : undefined,
    `- sameAs: ${Object.values(company.sameAs).filter(Boolean).join(" ")}`,
    "",
    ...claimsMarkdown(company.claims, locale),
    stripCiteMarks(t(company.lead, locale)),
    "",
    ...company.sections
      .filter((section) => section.id !== "faq")
      .flatMap((section) => [
        `## ${t(section.title, locale)}`,
        "",
        stripCiteMarks(t(section.body, locale)),
        "",
      ]),
    ...faqMarkdown(company.faq, locale),
    "## Sources",
    "",
    ...company.sources.map(
      (source, index) =>
        `${index + 1}. ${source.title}. ${source.publisher}. ${source.url}` +
        (source.published ? ` (${source.published})` : "") +
        ` (accessed ${source.accessed}).`,
    ),
    "",
    pick(locale, "## See also", "## 参见"),
    "",
    ...company.sectors.map((slug) => `- [${sectorName(slug, locale)}](${pageUrl(locale, `/sectors/${slug}`)})`),
    ...company.regions.map((slug) => `- [${regionName(slug, locale)}](${pageUrl(locale, `/regions/${slug}`)})`),
    `- [${t(company.headquarters.country, locale)}](${pageUrl(locale, `/countries/${countrySlug(company.headquarters.countryCode)}`)})`,
    `- [${t(company.headquarters.city, locale)}](${pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`)})`,
    ...company.founders.map((founder) => {
      const person = getPerson(founder.personSlug);
      return `- ${person ? personMdLink(person, locale) : founder.personSlug}`;
    }),
    ...seeAlsoCompanies(company, 6).map((peer) => `- ${companyMdLink(peer, locale)}`),
    "",
    `How to cite: ${SITE_NAME}, "${company.name.en}," ${url}, last reviewed ${company.lastReviewed}, ${company.id}.`,
    "",
  ];
  return lines.filter((line) => line !== undefined).join("\n");
}

export function personMarkdown(person: Person, locale: Locale): string {
  const url = pageUrl(locale, `/people/${person.slug}`);
  const companies = person.companies.map((item) => {
    const company = getCompany(item.companySlug);
    const name = company ? companyMdLink(company, locale) : item.companySlug;
    const hq = company
      ? `${t(company.headquarters.city, locale)}, ${t(company.headquarters.country, locale)}`
      : "";
    return `${name} (${t(item.role, locale)}${hq ? `; ${hq}` : ""})`;
  });
  return [
    `# ${t(person.name, locale)}`,
    "",
    `> ${stripCiteMarks(t(person.definition, locale))}`,
    "",
    `- Stable ID: \`${person.id}\``,
    `- Canonical URL: ${url}`,
    `- Markdown twin: ${markdownUrl(locale, `/people/${person.slug}`)}`,
    `- JSON: ${SITE_ORIGIN}/api/v1/people/${person.slug}.json`,
    `- Last reviewed: ${person.lastReviewed}`,
    `- Confidence: ${person.confidence}`,
    `- License: ${CONTENT_LICENSE} (${CONTENT_LICENSE_URL})`,
    `- Roles: ${person.roles.map((role) => t(role, locale)).join("; ")}`,
    person.birthYear ? `- Birth year: ${person.birthYear}` : undefined,
    person.birthPlace ? `- Birthplace: ${t(person.birthPlace, locale)}` : undefined,
    `- Companies: ${companies.join("; ")}`,
    `- Country hubs: ${[...new Set(person.companies.map((item) => getCompany(item.companySlug)).filter(Boolean))].map((company) => `[${t(company!.headquarters.country, locale)}](${pageUrl(locale, `/countries/${countrySlug(company!.headquarters.countryCode)}`)})`).join(", ")}`,
    `- City hubs: ${[...new Set(person.companies.map((item) => getCompany(item.companySlug)).filter(Boolean))].map((company) => `[${t(company!.headquarters.city, locale)}](${pageUrl(locale, `/cities/${citySlug(company!.headquarters.city.en)}`)})`).join(", ")}`,
    `- sameAs: ${Object.values(person.sameAs).filter(Boolean).join(" ")}`,
    "",
    ...claimsMarkdown(person.claims, locale),
    stripCiteMarks(t(person.lead, locale)),
    "",
    ...(person.sections ?? [])
      .filter((section) => section.id !== "faq")
      .flatMap((section) => [
        `## ${t(section.title, locale)}`,
        "",
        stripCiteMarks(t(section.body, locale)),
        "",
      ]),
    ...faqMarkdown(person.faq, locale),
    "## Sources",
    "",
    ...person.sources.map(
      (source, index) =>
        `${index + 1}. ${source.title}. ${source.publisher}. ${source.url} (accessed ${source.accessed}).`,
    ),
    "",
    pick(locale, "## See also", "## 参见"),
    "",
    ...person.companies.map((item) => {
      const company = getCompany(item.companySlug);
      return `- ${company ? companyMdLink(company, locale) : item.companySlug}`;
    }),
    ...relatedPeople(person, 6).map((other) => `- ${personMdLink(other, locale)}`),
    ...[
      ...new Map(
        person.companies
          .map((item) => getCompany(item.companySlug))
          .filter((company): company is NonNullable<typeof company> => Boolean(company))
          .flatMap((company) => [
            [
              `country:${company.headquarters.countryCode}`,
              `- [${t(company.headquarters.country, locale)}](${pageUrl(locale, `/countries/${countrySlug(company.headquarters.countryCode)}`)})`,
            ],
            [
              `city:${citySlug(company.headquarters.city.en)}`,
              `- [${t(company.headquarters.city, locale)}](${pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`)})`,
            ],
          ] as const),
      ).values(),
    ],
    "",
    `How to cite: ${SITE_NAME}, "${person.name.en}," ${url}, last reviewed ${person.lastReviewed}, ${person.id}.`,
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function homeMarkdown(locale: Locale): string {
  return [
    `# ${SITE_NAME}`,
    "",
    pick(locale, "> The open encyclopedia of Chinese-founded technology companies. Written first for generative engines, then for people.", "> 全球华人创办科技公司的开放百科。内容首先写给生成式引擎，同时供人类阅读。"),
    "",
    pick(locale, "English is the canonical text, with complete Simplified Chinese and Traditional Chinese editions. Every claim is sourced, every entity has a stable identifier, and every page ships HTML, Markdown, and JSON. Each company and person page includes extractable fact cards, identity disambiguation, dated facts, FAQ, unrecorded-field notes, model-description rules, a public-record section, and retrieval instructions.", "默认使用英语规范文本，并提供完整简体中文与繁体中文版。每条事实带出处，实体有稳定标识符，页面提供 HTML、Markdown 与 JSON。每家公司与每个人物条目都包含可抽取事实卡、身份消解、带日期事实、问答、未记录字段、模型表述说明、公共记录与检索说明。"),
    "",
    "## Machine entry points",
    "",
    `- [llms.txt](${SITE_ORIGIN}/llms.txt)`,
    `- [llms-full.txt](${SITE_ORIGIN}/llms-full.txt)`,
    `- [Chinese llms-full.txt](${SITE_ORIGIN}/zh/llms-full.txt)`,
    `- [Traditional Chinese llms-full.txt](${SITE_ORIGIN}/zh-hant/llms-full.txt)`,
    `- [OpenAPI](${SITE_ORIGIN}/api/v1/openapi.json)`,
    `- [Dataset](${SITE_ORIGIN}/api/v1/dataset.json)`,
    `- [Companies JSON](${SITE_ORIGIN}/api/v1/companies.json)`,
    `- [People JSON](${SITE_ORIGIN}/api/v1/people.json)`,
    `- [Entity graph](${SITE_ORIGIN}/api/v1/graph.json)`,
    `- [RSS feed](${SITE_ORIGIN}/feed.xml)`,
    "",
    "## Editorial",
    "",
    `- [Methodology](${pageUrl(locale, "/methodology")})`,
    `- [Inclusion](${pageUrl(locale, "/inclusion")})`,
    `- [For models](${pageUrl(locale, "/for-models")})`,
    `- [FAQ](${pageUrl(locale, "/faq")})`,
    "",
    "## Catalog hubs",
    "",
    `- [Companies](${pageUrl(locale, "/companies")})`,
    `- [People](${pageUrl(locale, "/people")})`,
    `- [Sectors](${pageUrl(locale, "/sectors")})`,
    `- [Regions](${pageUrl(locale, "/regions")})`,
    `- [Countries](${pageUrl(locale, "/countries")})`,
    `- [Cities](${pageUrl(locale, "/cities")})`,
    "",
  ].join("\n");
}

export function searchMarkdown(locale: Locale): string {
  return [
    pick(locale, "# Search", "# 搜索"),
    "",
    pick(locale, "The TechCo.Wiki search page is static HTML. The full catalog is in the page; query parameters only hide cards in the browser. Without JavaScript, every company and person remains readable.", "TechCo.Wiki 的搜索页是静态 HTML：完整目录写在页面里，查询参数只在浏览器里筛选卡片。无 JavaScript 时仍能阅读全部公司与人物。"),
    "",
    pick(locale, "## Machine entry points", "## 机器入口"),
    "",
    `- [${pick(locale, "All companies", "全部公司")}](${pageUrl(locale, "/companies")}.md)`,
    `- [${pick(locale, "All people", "全部人物")}](${pageUrl(locale, "/people")}.md)`,
    `- [Companies JSON](${SITE_ORIGIN}/api/v1/companies.json)`,
    `- [People JSON](${SITE_ORIGIN}/api/v1/people.json)`,
    "",
  ].join("\n");
}
