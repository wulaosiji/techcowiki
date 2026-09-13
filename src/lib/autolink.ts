import { citySlug, countrySlug } from "../data/places";
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
const EXACT_CASE_LATIN = new Set([
  "nothing",
  "grab",
  "sea",
  "notion",
  "acer",
  "scale",
  "horizon",
  "moonshot",
  "fireworks",
  "zoom",
  "realme",
  "oneplus",
  "kingsoft",
  "webull",
]);

const GENERIC_PRODUCT = /\b(process|platform|nodes|software|services|operating system|contract manufacturing|super-app|super app)\b/i;

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "of",
  "in",
  "on",
  "to",
  "a",
  "an",
  "inc",
  "ltd",
  "llc",
  "co",
  "corp",
  "pte",
  "pty",
  "group",
  "holdings",
  "limited",
  "company",
  "technology",
  "technologies",
  "international",
  "new",
  "york",
  "lab",
  "labs",
  "auto",
  "ai",
  "app",
  "open",
  "plus",
  "sense",
]);

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

function addTerm(target: Term[], seen: Set<string>, term: string, href: string, exactCase = false) {
  const trimmed = term.trim();
  if (trimmed.length < 2) return;
  if (isLatin(trimmed) && trimmed.length < 3) return;
  if (isLatin(trimmed) && STOP_WORDS.has(trimmed.toLowerCase())) return;
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
    exactCase: exactCase || (latin && EXACT_CASE_LATIN.has(trimmed.toLowerCase())),
  });
}

function isLinkableProduct(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  if (GENERIC_PRODUCT.test(trimmed)) return false;
  return true;
}

function productTerms(name: string): string[] {
  if (GENERIC_PRODUCT.test(name)) return [];
  const parts = name
    .split(/\s*[/|,·]\s*|\s+and\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);
  const terms: string[] = [];
  for (const part of parts) {
    if (isLinkableProduct(part)) terms.push(part);
    const words = part.split(/\s+/);
    const first = words[0];
    if (
      words.length > 1 &&
      first &&
      /^[A-Z][A-Za-z0-9+]{2,}$/.test(first) &&
      !STOP_WORDS.has(first.toLowerCase()) &&
      !GENERIC_PRODUCT.test(first)
    ) {
      terms.push(first);
    }
  }
  return terms;
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
    if (company.legalName) addTerm(terms, seen, company.legalName, href);
    for (const alias of company.aliases) {
      if (alias.length >= 3) addTerm(terms, seen, alias, href);
    }
    if (company.stock?.ticker && company.stock.ticker.length >= 3) {
      addTerm(terms, seen, company.stock.ticker, href, true);
    }
    if (company.stock?.adr?.ticker && company.stock.adr.ticker.length >= 3) {
      addTerm(terms, seen, company.stock.adr.ticker, href, true);
    }
    for (const listing of company.stock?.secondary ?? []) {
      if (listing.ticker.length >= 3) addTerm(terms, seen, listing.ticker, href, true);
    }
  }
  for (const person of people) {
    if (skipPeople.has(person.slug)) continue;
    const href = personHref(person.slug, locale);
    addTerm(terms, seen, person.name[locale], href);
    if (locale === "zh") addTerm(terms, seen, person.name.en, href);
    for (const alias of person.aliases) {
      if (alias.length >= 3) addTerm(terms, seen, alias, href);
    }
  }
  for (const company of companies) {
    if (skipCompanies.has(company.slug)) continue;
    const href = companyHref(company.slug, locale);
    for (const product of company.products) {
      for (const name of productTerms(product.name)) {
        addTerm(terms, seen, name, href);
      }
    }
  }
  for (const sector of sectors) {
    addTerm(terms, seen, sector.name[locale], sectorHref(sector.slug, locale));
  }
  const cities = new Map<string, { name: Company["headquarters"]["city"] }>();
  const countries = new Map<string, { name: Company["headquarters"]["country"]; code: string }>();
  for (const company of companies) {
    const city = citySlug(company.headquarters.city.en);
    if (!cities.has(city)) cities.set(city, { name: company.headquarters.city });
    const code = countrySlug(company.headquarters.countryCode);
    if (!countries.has(code)) {
      countries.set(code, { name: company.headquarters.country, code: company.headquarters.countryCode });
    }
  }
  for (const [slug, city] of cities) {
    addTerm(terms, seen, city.name[locale], cityHref(slug, locale));
    if (locale === "zh") addTerm(terms, seen, city.name.en, cityHref(slug, locale));
  }
  for (const [slug, country] of countries) {
    addTerm(terms, seen, country.name[locale], countryHref(slug, locale));
    if (locale === "zh") addTerm(terms, seen, country.name.en, countryHref(slug, locale));
  }
  for (const region of regions) {
    addTerm(terms, seen, region.name[locale], regionHref(region.slug, locale));
  }
  if (locale === "en") {
    addTerm(terms, seen, "Methodology", docHref("methodology", locale));
    addTerm(terms, seen, "For models", docHref("for-models", locale));
    addTerm(terms, seen, "Inclusion rules", docHref("inclusion", locale));
    addTerm(terms, seen, "About", docHref("about", locale), true);
    addTerm(terms, seen, "License", docHref("license", locale), true);
    addTerm(terms, seen, "FAQ", docHref("faq", locale), true);
  } else {
    addTerm(terms, seen, "收录标准", docHref("inclusion", locale));
    addTerm(terms, seen, "给模型", docHref("for-models", locale));
    addTerm(terms, seen, "方法", docHref("methodology", locale));
    addTerm(terms, seen, "关于", docHref("about", locale));
    addTerm(terms, seen, "许可", docHref("license", locale));
    addTerm(terms, seen, "常见问题", docHref("faq", locale));
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
    .replace(/https?:\/\/[^\s)<>\]]+/gi, (match) => {
      tokens.push(match);
      return `\u0000T${tokens.length - 1}\u0000`;
    })
    .replace(/中国大陆/g, (match) => {
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

function stash(tokens: string[], value: string): string {
  tokens.push(value);
  return `\u0000T${tokens.length - 1}\u0000`;
}

function linkTerms(text: string, terms: Term[]): string {
  const protectedText = protect(text);
  let body = protectedText.text;
  const tokens = protectedText.tokens;
  for (const term of terms) {
    const hasExact = body.includes(term.term);
    const hasInsensitive =
      !term.exactCase && term.latin && body.toLowerCase().includes(term.term.toLowerCase());
    if (!hasExact && !hasInsensitive) continue;
    const pattern = !term.latin
      ? new RegExp(escapeRegExp(term.term))
      : new RegExp(
          `(^|[^A-Za-z0-9-])(${escapeRegExp(term.term)})(?![A-Za-z0-9-])`,
          term.exactCase ? "" : "i",
        );
    const next = body.replace(pattern, (match, prefix: string, captured?: string) => {
      const label = term.latin ? (captured ?? match) : match;
      const link = mdLink(label, term.href);
      return term.latin ? `${prefix}${stash(tokens, link)}` : stash(tokens, link);
    });
    if (next !== body) body = next;
  }
  return restore(body, tokens);
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
