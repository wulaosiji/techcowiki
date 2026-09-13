import { isZhFamily, pick, t } from "../lib/i18n";
import { regions, sectors, stageLabel, statusLabel } from "./site";
import type { Company, Locale, Localized, Person, Source } from "./types";

export function L(en: string, zh: string): Localized {
  return { en, zh };
}

export function joinList(items: string[], locale: Locale): string {
  if (items.length === 0) return pick(locale, "none recorded", "未记录");
  if (items.length === 1) return items[0];
  if (isZhFamily(locale)) return items.join("、");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Avoid “Name is Name is …” when a definition already starts with the entity name. */
export function standaloneSentence(name: string, definition: string, locale: Locale): string {
  const def = definition.trim();
  if (!def) return name;
  if (def.startsWith(name)) return def;
  const lower = def.toLowerCase();
  const lowerName = name.toLowerCase();
  if (lower.startsWith(lowerName)) return def;
  return isZhFamily(locale) ? `${name}是${def}` : `${name} is ${def}`;
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
  const item = sectors.find((sector) => sector.slug === slug);
  return item ? t(item.name, locale) : slug;
}

export function sectorDefinition(slug: string, locale: Locale): string {
  const item = sectors.find((sector) => sector.slug === slug);
  return item ? t(item.definition, locale) : "";
}

export function regionName(slug: string, locale: Locale): string {
  const item = regions.find((region) => region.slug === slug);
  return item ? t(item.name, locale) : slug;
}

export function regionDefinition(slug: string, locale: Locale): string {
  const item = regions.find((region) => region.slug === slug);
  return item ? t(item.definition, locale) : "";
}

export function statusName(status: string, locale: Locale): string {
  const label = statusLabel[status];
  return label ? t(label, locale) : status;
}

export function stageName(stage: string, locale: Locale): string {
  const label = stageLabel[stage];
  return label ? t(label, locale) : stage;
}

export function founderLines(company: Company, people: Person[], locale: Locale): string {
  return joinList(
    company.founders.map((founder) => {
      const person = personBySlug(people, founder.personSlug);
      const name = person ? t(person.name, locale) : founder.personSlug;
      return `${name} (${t(founder.role, locale)})`;
    }),
    locale,
  );
}

export function productLines(company: Company, locale: Locale): string {
  return joinList(
    company.products.map((product) => `${product.name} (${t(product.description, locale)})`),
    locale,
  );
}

export function productNames(company: Company, locale: Locale): string {
  return joinList(
    company.products.map((product) => product.name),
    locale,
  );
}

export function sectorNamesOf(company: Company, locale: Locale): string {
  return joinList(
    company.sectors.map((slug) => sectorName(slug, locale)),
    locale,
  );
}

export function foundingYear(company: Company): number {
  const year = Number(company.founded.slice(0, 4));
  return Number.isFinite(year) ? year : 0;
}

export function precisionPhrase(
  precision: Company["foundedPrecision"],
  locale: Locale,
): string {
  if (isZhFamily(locale)) {
    return pick(
      locale,
      precision === "day" ? "day-level precision" : precision === "month" ? "month-level precision" : "year-level precision",
      precision === "day" ? "精确到日" : precision === "month" ? "精确到月" : "精确到年",
    );
  }
  return precision === "day"
    ? "day-level precision"
    : precision === "month"
      ? "month-level precision"
      : "year-level precision";
}

export function yearDeltaPhrase(self: Company, other: Company, locale: Locale): string {
  const delta = foundingYear(other) - foundingYear(self);
  if (delta === 0) return pick(locale, "same founding year", "同一创立年");
  if (delta > 0) return pick(locale, `${delta} years later`, `晚 ${delta} 年`);
  return pick(locale, `${-delta} years earlier`, `早 ${-delta} 年`);
}

export function cohortYearSpan(list: Company[], locale: Locale): string {
  if (list.length === 0) return pick(locale, "none", "无");
  const sorted = [...list].sort(
    (a, b) => foundingYear(a) - foundingYear(b) || a.name.en.localeCompare(b.name.en),
  );
  const oldest = sorted[0];
  const newest = sorted[sorted.length - 1];
  return pick(
    locale,
    `founding years from ${oldest.founded.slice(0, 4)} (${oldest.name.en}) to ${newest.founded.slice(0, 4)} (${newest.name.en})`,
    `创立年从 ${oldest.founded.slice(0, 4)}（${oldest.name.zh}）到 ${newest.founded.slice(0, 4)}（${newest.name.zh}）`,
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

export function listingTickers(company: Company): string[] {
  if (!company.stock) return [];
  return [
    company.stock.ticker,
    company.stock.adr?.ticker,
    ...(company.stock.secondary ?? []).map((item) => item.ticker),
  ].filter((ticker): ticker is string => Boolean(ticker && ticker.length >= 3));
}

export function tickerText(company: Company, locale: Locale): string {
  if (!company.stock) return pick(locale, "none recorded", "未记录");
  const parts = [`${company.stock.exchange}:${company.stock.ticker}`];
  if (company.stock.adr) {
    const adr = `${company.stock.adr.exchange}:${company.stock.adr.ticker}`;
    parts.push(pick(locale, `ADR ${adr}`, `美国存托凭证 ${adr}`));
  }
  for (const item of company.stock.secondary ?? []) {
    parts.push(`${item.exchange}:${item.ticker}`);
  }
  return parts.join(isZhFamily(locale) ? "；" : "; ");
}

export function hqBreakdownText(list: Company[], locale: Locale): string {
  const rows = hqBreakdown(list);
  if (rows.length === 0) return pick(locale, "none", "无");
  return rows
    .map((row) =>
      pick(locale, `${row.country.en} (${row.countryCode}) ${row.count}`, `${row.country.zh}（${row.countryCode}）${row.count}`),
    )
    .join(isZhFamily(locale) ? "、" : "; ");
}
