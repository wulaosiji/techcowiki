import { CONTENT_LICENSE, CONTENT_LICENSE_URL, SITE_NAME, SITE_ORIGIN } from "../data/site";
import type { Company, Locale, Person } from "../data/types";
import { stripCitations } from "./citations";
import { formatFounded, pageUrl, t } from "./i18n";

export function companyMarkdown(company: Company, locale: Locale): string {
  const url = pageUrl(locale, `/companies/${company.slug}`);
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
    `- Headquarters: ${company.headquarters.city[locale]}, ${company.headquarters.country[locale]}`,
    `- Status: ${company.status}`,
    `- Website: ${company.website}`,
    `- Founders: ${company.founders.map((founder) => founder.personSlug).join(", ")}`,
    company.stock ? `- Ticker: ${company.stock.exchange}:${company.stock.ticker}` : "",
    `- sameAs: ${Object.values(company.sameAs).filter(Boolean).join(" ")}`,
    "",
    stripCitations(company.lead[locale]),
    "",
    ...company.sections.flatMap((section) => [
      `## ${t(section.title, locale)}`,
      "",
      stripCitations(section.body[locale]),
      "",
    ]),
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
  return [
    `# ${person.name[locale]}`,
    "",
    `> ${stripCitations(person.definition[locale])}`,
    "",
    `- Stable ID: \`${person.id}\``,
    `- Canonical URL: ${url}`,
    `- Last reviewed: ${person.lastReviewed}`,
    `- Confidence: ${person.confidence}`,
    `- Companies: ${person.companies.map((item) => item.companySlug).join(", ")}`,
    `- sameAs: ${Object.values(person.sameAs).filter(Boolean).join(" ")}`,
    "",
    stripCitations(person.lead[locale]),
    "",
    "## Sources",
    "",
    ...person.sources.map(
      (source, index) =>
        `${index + 1}. ${source.title}. ${source.publisher}. ${source.url} (accessed ${source.accessed}).`,
    ),
    "",
    `How to cite: ${SITE_NAME}, "${person.name.en}," ${url}, last reviewed ${person.lastReviewed}, ${person.id}.`,
    "",
  ].join("\n");
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
      ? "默认使用英语规范文本，并提供完整简体中文版。每条事实带出处，实体有稳定标识符，页面提供 HTML、Markdown 与 JSON。"
      : "English is the canonical text, with a complete Simplified Chinese edition. Every claim is sourced, every entity has a stable identifier, and every page ships HTML, Markdown, and JSON.",
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
