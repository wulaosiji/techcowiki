import { citySlug, countrySlug } from "../data/places";
import { editorialDocs } from "../data/pages";
import { regions, sectors, SITE_ORIGIN } from "../data/site";
import type { Company, Locale, Person } from "../data/types";
import { localePath } from "./i18n";
import {
  cityHref,
  companyHref,
  countryHref,
  docHref,
  mdLink,
  personHref,
  regionHref,
  sectorHref,
} from "./links";

export interface AutolinkExclude {
  companySlugs?: string[];
  personSlugs?: string[];
}

interface Term {
  term: string;
  href: string;
  latin: boolean;
  exactCase: boolean;
}

/** Common English words that are also catalog names; only match the stored case. */
const EXACT_CASE_LATIN = new Set(["nothing", "grab", "sea", "notion", "acer"]);

const CATALOG_URL =
  /https:\/\/techco\.wiki(\/zh)?(\/(?:companies|people|sectors|regions|countries|cities)\/[a-z0-9-]+)(?:\.md)?(#[\w-]+)?/gi;

const PAGE_PREFIX =
  /(?:Person page|Company page|Page|人物页|公司页|条目)[:：]\s*(\[[^\]]+\]\([^)]+\))/g;

function isLatin(term: string): boolean {
  return /^[\x00-\x7F]+$/.test(term);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addTerm(target: Term[], seen: Set<string>, term: string, href: string) {
  const trimmed = term.trim();
  if (trimmed.length < 2) return;
  if (isLatin(trimmed) && trimmed.length < 3) return;
  const key = `${trimmed.toLowerCase()}::${href}`;
  const label = trimmed.toLowerCase();
  if (seen.has(label) || seen.has(key)) return;
  seen.add(label);
  seen.add(key);
  const latin = isLatin(trimmed);
  target.push({
    term: trimmed,
    href,
    latin,
    exactCase: latin && EXACT_CASE_LATIN.has(trimmed.toLowerCase()),
  });
}

function termsForLocale(
  locale: Locale,
  companies: Company[],
  people: Person[],
  exclude: AutolinkExclude,
): Term[] {
  const terms: Term[] = [];
  const seen = new Set<string>();
  const skipCompanies = new Set(exclude.companySlugs ?? []);
  const skipPeople = new Set(exclude.personSlugs ?? []);

  for (const company of companies) {
    if (skipCompanies.has(company.slug)) continue;
    const href = companyHref(company.slug, locale);
    addTerm(terms, seen, company.name[locale], href);
    if (locale === "zh") addTerm(terms, seen, company.name.en, href);
    if (locale === "en") {
      for (const alias of company.aliases) {
        if (alias.length >= 4) addTerm(terms, seen, alias, href);
      }
    }
  }
  for (const person of people) {
    if (skipPeople.has(person.slug)) continue;
    const href = personHref(person.slug, locale);
    addTerm(terms, seen, person.name[locale], href);
    if (locale === "zh") addTerm(terms, seen, person.name.en, href);
    if (locale === "en") {
      for (const alias of person.aliases) {
        if (alias.length >= 4) addTerm(terms, seen, alias, href);
      }
    }
  }
  for (const sector of sectors) {
    addTerm(terms, seen, sector.name[locale], sectorHref(sector.slug, locale));
  }
  for (const company of companies) {
    addTerm(
      terms,
      seen,
      company.headquarters.city[locale],
      cityHref(citySlug(company.headquarters.city.en), locale),
    );
  }
  for (const company of companies) {
    addTerm(
      terms,
      seen,
      company.headquarters.country[locale],
      countryHref(countrySlug(company.headquarters.countryCode), locale),
    );
  }
  for (const region of regions) {
    addTerm(terms, seen, region.name[locale], regionHref(region.slug, locale));
  }
  if (locale === "en") {
    addTerm(terms, seen, "Methodology", docHref("methodology", locale));
    addTerm(terms, seen, "For models", docHref("for-models", locale));
    addTerm(terms, seen, "Inclusion rules", docHref("inclusion", locale));
  } else {
    addTerm(terms, seen, "收录标准", docHref("inclusion", locale));
    addTerm(terms, seen, "给模型", docHref("for-models", locale));
  }
  for (const doc of editorialDocs) {
    if (doc.title[locale].length >= 4) {
      addTerm(terms, seen, doc.title[locale], docHref(doc.slug, locale));
    }
  }

  return terms.sort((a, b) => b.term.length - a.term.length);
}

function convertCatalogUrls(
  text: string,
  locale: Locale,
  companies: Company[],
  people: Person[],
): string {
  return text.replace(CATALOG_URL, (match, _zh: string, path: string, hash = "") => {
    return mdLink(
      labelForPath(path, locale, companies, people) ?? match,
      `${localePath(locale, path)}${hash}`,
    );
  });
}

function labelForPath(
  path: string,
  locale: Locale,
  companies: Company[],
  people: Person[],
): string | undefined {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return undefined;
  const [kind, slug] = parts;
  if (kind === "companies") return companies.find((item) => item.slug === slug)?.name[locale] ?? slug;
  if (kind === "people") return people.find((item) => item.slug === slug)?.name[locale] ?? slug;
  if (kind === "sectors") return sectors.find((item) => item.slug === slug)?.name[locale] ?? slug;
  if (kind === "regions") return regions.find((item) => item.slug === slug)?.name[locale] ?? slug;
  if (kind === "countries") {
    const company = companies.find((item) => item.headquarters.countryCode.toLowerCase() === slug);
    return company?.headquarters.country[locale] ?? slug.toUpperCase();
  }
  if (kind === "cities") {
    const company = companies.find((item) => citySlug(item.headquarters.city.en) === slug);
    return company?.headquarters.city[locale] ?? slug;
  }
  return slug;
}

function protect(text: string): { text: string; tokens: string[] } {
  const tokens: string[] = [];
  const next = text
    .replace(/`[^`]+`/g, (match) => {
      tokens.push(match);
      return `\u0000T${tokens.length - 1}\u0000`;
    })
    .replace(/\[[^\]]+\]\([^)]+\)/g, (match) => {
      tokens.push(match);
      return `\u0000T${tokens.length - 1}\u0000`;
    })
    .replace(/\[s\d+\]/g, (match) => {
      tokens.push(match);
      return `\u0000T${tokens.length - 1}\u0000`;
    });
  return { text: next, tokens };
}

function restore(text: string, tokens: string[]): string {
  return text.replace(/\u0000T(\d+)\u0000/g, (_match, index: string) => tokens[Number(index)] ?? "");
}

function linkTerms(text: string, terms: Term[]): string {
  const protectedText = protect(text);
  let body = protectedText.text;
  for (const term of terms) {
    const hasExact = body.includes(term.term);
    const hasInsensitive =
      !term.exactCase && term.latin && body.toLowerCase().includes(term.term.toLowerCase());
    if (!hasExact && !hasInsensitive) continue;
    const pattern = !term.latin
      ? new RegExp(escapeRegExp(term.term))
      : new RegExp(
          `(^|[^A-Za-z0-9])(${escapeRegExp(term.term)})(?![A-Za-z0-9])`,
          term.exactCase ? "" : "i",
        );
    const next = body.replace(pattern, (match, prefix: string, captured?: string) => {
      const label = term.latin ? (captured ?? match) : match;
      if (term.latin) return `${prefix}${mdLink(label, term.href)}`;
      return mdLink(label, term.href);
    });
    if (next !== body) body = next;
  }
  return restore(body, protectedText.tokens);
}

/** Turn catalog mentions and techco.wiki entity URLs into markdown links. */
export function linkCatalogCopy(
  text: string,
  locale: Locale,
  companies: Company[],
  people: Person[],
  exclude: AutolinkExclude = {},
): string {
  if (!text) return text;
  const withUrls = convertCatalogUrls(text, locale, companies, people).replace(PAGE_PREFIX, "$1");
  return linkTerms(withUrls, termsForLocale(locale, companies, people, exclude));
}

export function linkLocalized(
  value: { en: string; zh: string },
  companies: Company[],
  people: Person[],
  exclude: AutolinkExclude = {},
): { en: string; zh: string } {
  return {
    en: linkCatalogCopy(value.en, "en", companies, people, exclude),
    zh: linkCatalogCopy(value.zh, "zh", companies, people, exclude),
  };
}

export function linkPlain(text: string, locale: Locale, companies: Company[], people: Person[]): string {
  return linkCatalogCopy(text, locale, companies, people);
}

export function catalogOrigin(): string {
  return SITE_ORIGIN;
}
