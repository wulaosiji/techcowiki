import { regions, sectors, stageLabel, statusLabel } from "./site";
import type { Company, Locale, Localized, Person, Source } from "./types";

export function L(en: string, zh: string): Localized {
  return { en, zh };
}

export function joinList(items: string[], locale: Locale): string {
  if (items.length === 0) return locale === "zh" ? "未记录" : "none recorded";
  if (items.length === 1) return items[0];
  if (locale === "zh") return items.join("、");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function cite(id: string | undefined): string {
  return id ? `[${id}]` : "";
}

export function personBySlug(people: Person[], slug: string): Person | undefined {
  return people.find((person) => person.slug === slug);
}

export function companyBySlug(companies: Company[], slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

export function sectorName(slug: string, locale: Locale): string {
  return sectors.find((sector) => sector.slug === slug)?.name[locale] ?? slug;
}

export function sectorDefinition(slug: string, locale: Locale): string {
  return sectors.find((sector) => sector.slug === slug)?.definition[locale] ?? "";
}

export function regionName(slug: string, locale: Locale): string {
  return regions.find((region) => region.slug === slug)?.name[locale] ?? slug;
}

export function regionDefinition(slug: string, locale: Locale): string {
  return regions.find((region) => region.slug === slug)?.definition[locale] ?? "";
}

export function statusName(status: string, locale: Locale): string {
  return statusLabel[status]?.[locale] ?? status;
}

export function stageName(stage: string, locale: Locale): string {
  return stageLabel[stage]?.[locale] ?? stage;
}

export function founderLines(company: Company, people: Person[], locale: Locale): string {
  return joinList(
    company.founders.map((founder) => {
      const person = personBySlug(people, founder.personSlug);
      const name = person ? person.name[locale] : founder.personSlug;
      return `${name} (${founder.role[locale]})`;
    }),
    locale,
  );
}

export function productLines(company: Company, locale: Locale): string {
  return joinList(
    company.products.map((product) => `${product.name} (${product.description[locale]})`),
    locale,
  );
}

export function sourceId(sources: Source[], predicate: (source: Source) => boolean): string | undefined {
  return sources.find(predicate)?.id;
}

export function wikiId(sources: Source[]): string | undefined {
  return (
    wikiEnId(sources) ??
    sourceId(
      sources,
      (source) => source.type === "encyclopedia" && source.url.includes("wikipedia.org/wiki/"),
    ) ??
    sourceId(sources, (source) => source.type === "encyclopedia")
  );
}

export function wikiEnId(sources: Source[]): string | undefined {
  return sourceId(sources, (source) => source.url.includes("en.wikipedia.org/wiki/"));
}

export function wikiZhId(sources: Source[]): string | undefined {
  return sourceId(sources, (source) => source.url.includes("zh.wikipedia.org/wiki/"));
}

export function officialId(sources: Source[]): string | undefined {
  return sourceId(sources, (source) => source.type === "official");
}

export function methodId(sources: Source[], methodUrl: string): string | undefined {
  return sourceId(sources, (source) => source.url === methodUrl);
}

export function yearsInText(text: string): string[] {
  return [...new Set([...text.matchAll(/\b(?:19|20)\d{2}\b/g)].map((match) => match[0]))].sort();
}

export function countryAdjective(code: string): Localized {
  const map: Record<string, Localized> = {
    CN: L("Chinese", "中国"),
    US: L("American", "美国"),
    TW: L("Taiwanese", "台湾"),
    HK: L("Hong Kong", "香港"),
    SG: L("Singaporean", "新加坡"),
    GB: L("British", "英国"),
    AU: L("Australian", "澳大利亚"),
    ID: L("Indonesian", "印度尼西亚"),
    MY: L("Malaysian", "马来西亚"),
    AE: L("Emirati", "阿联酋"),
    FR: L("French", "法国"),
    IL: L("Israeli", "以色列"),
    NL: L("Dutch", "荷兰"),
  };
  return map[code] ?? L(code, code);
}

export function hqBreakdown(
  list: Company[],
): { countryCode: string; country: Localized; count: number }[] {
  const map = new Map<string, { country: Localized; count: number }>();
  for (const company of list) {
    const prev = map.get(company.headquarters.countryCode);
    if (prev) prev.count += 1;
    else {
      map.set(company.headquarters.countryCode, {
        country: company.headquarters.country,
        count: 1,
      });
    }
  }
  return [...map.entries()]
    .map(([countryCode, value]) => ({ countryCode, ...value }))
    .sort((a, b) => b.count - a.count || a.countryCode.localeCompare(b.countryCode));
}

export function hqBreakdownText(list: Company[], locale: Locale): string {
  const rows = hqBreakdown(list);
  if (rows.length === 0) return locale === "zh" ? "无" : "none";
  return rows
    .map((row) =>
      locale === "zh"
        ? `${row.country.zh}（${row.countryCode}）${row.count}`
        : `${row.country.en} (${row.countryCode}) ${row.count}`,
    )
    .join(locale === "zh" ? "、" : "; ");
}
