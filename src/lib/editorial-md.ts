import type { EditorialDoc } from "../data/pages";
import { faqs } from "../data/site";
import type { Locale } from "../data/types";
import { pageUrl } from "./i18n";

export function editorialMarkdown(doc: EditorialDoc, locale: Locale): string {
  return [
    `# ${doc.title[locale]}`,
    "",
    `> ${doc.description[locale]}`,
    "",
    `Canonical: ${pageUrl(locale, `/${doc.slug}`)}`,
    "",
    ...doc.blocks.flatMap((block) => [`## ${block.title[locale]}`, "", ...block.body[locale].flatMap((p) => [p, ""])]),
  ].join("\n");
}

export function faqMarkdown(locale: Locale): string {
  return [
    `# ${locale === "zh" ? "常见问题" : "FAQ"}`,
    "",
    ...faqs.flatMap((item) => [`## ${item.question[locale]}`, "", item.answer[locale], ""]),
  ].join("\n");
}
