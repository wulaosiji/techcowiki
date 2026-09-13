import { allCompanies, allPeople } from "../data/catalog";
import type { EditorialDoc } from "../data/pages";
import { faqs } from "../data/site";
import type { Locale } from "../data/types";
import { linkCatalogCopy } from "./autolink";
import { pageUrl, pick, t, tList } from "./i18n";

function linkCopy(text: string, locale: Locale): string {
  return linkCatalogCopy(text, locale, allCompanies(), allPeople());
}

export function editorialMarkdown(doc: EditorialDoc, locale: Locale): string {
  return [
    `# ${t(doc.title, locale)}`,
    "",
    `> ${t(doc.description, locale)}`,
    "",
    `Canonical: ${pageUrl(locale, `/${doc.slug}`)}`,
    "",
    ...doc.blocks.flatMap((block) => [
      `## ${t(block.title, locale)}`,
      "",
      ...tList(block.body, locale).flatMap((p) => [linkCopy(p, locale), ""]),
    ]),
  ].join("\n");
}

export function faqMarkdown(locale: Locale): string {
  return [
    `# ${pick(locale, "FAQ", "常见问题")}`,
    "",
    ...faqs.flatMap((item) => [`## ${t(item.question, locale)}`, "", linkCopy(t(item.answer, locale), locale), ""]),
  ].join("\n");
}
