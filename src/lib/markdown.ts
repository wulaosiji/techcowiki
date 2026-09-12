import { getCompany, getPerson } from "../data/catalog";
import { CONTENT_LICENSE, CONTENT_LICENSE_URL, SITE_NAME, SITE_ORIGIN } from "../data/site";
import type { Company, EntityFaq, Locale, Person } from "../data/types";
import { stripCitations } from "./citations";
import { formatFounded, pageUrl, t } from "./i18n";

function faqMarkdown(faq: EntityFaq[] | undefined, locale: Locale): string[] {
  if (!faq?.length) return [];
  return [
    locale === "zh" ? "## 常见问题" : "## Frequently asked questions",
    "",
    ...faq.flatMap((item) => [
      `### ${item.question[locale]}`,
      "",
      stripCitations(item.answer[locale]),
      "",
    ]),
  ];
}

export function companyMarkdown(company: Company, locale: Locale): string {
  const url = pageUrl(locale, `/companies/${company.slug}`);
  const founders = company.founders.map((founder) => {
    const person = getPerson(founder.personSlug);
    const name = person ? person.name[locale] : founder.personSlug;
    return `${name} (${t(founder.role, locale)}; ${founder.personSlug})`;
  });
  const products = company.products.map(
    (product) => `${product.name}: ${t(product.description, locale)}`,
  );
  const lines = [
    `# ${company.name[locale]}`,
    "",
    `> ${stripCitations(company.definition[locale])}`,
    "",
    `- Stable ID: \`${company.id}\``,
    `- Canonical URL: ${url}`,
    `- Markdown twin: ${url}.md`,
    `- JSON: ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
    `- Last reviewed: ${company.lastReviewed}`,
    `- Confidence: ${company.confidence}`,
    `- License: ${CONTENT_LICENSE} (${CONTENT_LICENSE_URL})`,
    `- Founded: ${formatFounded(company.founded, company.foundedPrecision)}`,
    `- Headquarters: ${company.headquarters.city[locale]}, ${company.headquarters.country[locale]} (${company.headquarters.countryCode})`,
    `- Status: ${company.status}`,
    `- Stage: ${company.stage}`,
    `- Sectors: ${company.sectors.join(", ")}`,
    `- Regions: ${company.regions.join(", ")}`,
    `- Website: ${company.website}`,
    `- Founders: ${founders.join("; ")}`,
    `- Products: ${products.join("; ")}`,
    company.legalName ? `- Legal name: ${company.legalName}` : undefined,
    company.stock ? `- Ticker: ${company.stock.exchange}:${company.stock.ticker}` : undefined,
    `- sameAs: ${Object.values(company.sameAs).filter(Boolean).join(" ")}`,
    "",
    stripCitations(company.lead[locale]),
    "",
    ...company.sections
      .filter((section) => section.id !== "faq")
      .flatMap((section) => [
        `## ${t(section.title, locale)}`,
        "",
        stripCitations(section.body[locale]),
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
    `How to cite: ${SITE_NAME}, "${company.name.en}," ${url}, last reviewed ${company.lastReviewed}, ${company.id}.`,
    "",
  ];
  return lines.filter((line) => line !== undefined).join("\n");
}

export function personMarkdown(person: Person, locale: Locale): string {
  const url = pageUrl(locale, `/people/${person.slug}`);
  const companies = person.companies.map((item) => {
    const company = getCompany(item.companySlug);
    const name = company ? company.name[locale] : item.companySlug;
    const hq = company
      ? `${company.headquarters.city[locale]}, ${company.headquarters.country[locale]}`
      : "";
    return `${name} (${t(item.role, locale)}${hq ? `; ${hq}` : ""})`;
  });
  return [
    `# ${person.name[locale]}`,
    "",
    `> ${stripCitations(person.definition[locale])}`,
    "",
    `- Stable ID: \`${person.id}\``,
    `- Canonical URL: ${url}`,
    `- Markdown twin: ${url}.md`,
    `- JSON: ${SITE_ORIGIN}/api/v1/people/${person.slug}.json`,
    `- Last reviewed: ${person.lastReviewed}`,
    `- Confidence: ${person.confidence}`,
    `- License: ${CONTENT_LICENSE} (${CONTENT_LICENSE_URL})`,
    `- Roles: ${person.roles.map((role) => t(role, locale)).join("; ")}`,
    person.birthYear ? `- Birth year: ${person.birthYear}` : undefined,
    person.birthPlace ? `- Birthplace: ${person.birthPlace[locale]}` : undefined,
    `- Companies: ${companies.join("; ")}`,
    `- sameAs: ${Object.values(person.sameAs).filter(Boolean).join(" ")}`,
    "",
    stripCitations(person.lead[locale]),
    "",
    ...(person.sections ?? [])
      .filter((section) => section.id !== "faq")
      .flatMap((section) => [
        `## ${t(section.title, locale)}`,
        "",
        stripCitations(section.body[locale]),
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
    locale === "zh"
      ? "> 全球华人创办科技公司的开放百科。内容首先写给生成式引擎，同时供人类阅读。"
      : "> The open encyclopedia of Chinese-founded technology companies. Written first for generative engines, then for people.",
    "",
    locale === "zh"
      ? "默认使用英语规范文本，并提供完整简体中文版。每条事实带出处，实体有稳定标识符，页面提供 HTML、Markdown 与 JSON。每家公司与每个人物条目都包含身份消解、问答、未记录字段、模型表述说明与公共记录。"
      : "English is the canonical text, with a complete Simplified Chinese edition. Every claim is sourced, every entity has a stable identifier, and every page ships HTML, Markdown, and JSON. Each company and person page includes identity disambiguation, FAQ, unrecorded-field notes, model-description rules, and a public-record section.",
    "",
    "## Machine entry points",
    "",
    `- [llms.txt](${SITE_ORIGIN}/llms.txt)`,
    `- [llms-full.txt](${SITE_ORIGIN}/llms-full.txt)`,
    `- [OpenAPI](${SITE_ORIGIN}/api/v1/openapi.json)`,
    `- [Dataset](${SITE_ORIGIN}/api/v1/dataset.json)`,
    `- [Companies JSON](${SITE_ORIGIN}/api/v1/companies.json)`,
    `- [People JSON](${SITE_ORIGIN}/api/v1/people.json)`,
    "",
    "## Editorial",
    "",
    `- [Methodology](${pageUrl(locale, "/methodology")})`,
    `- [Inclusion](${pageUrl(locale, "/inclusion")})`,
    `- [For models](${pageUrl(locale, "/for-models")})`,
    `- [FAQ](${pageUrl(locale, "/faq")})`,
    "",
  ].join("\n");
}
