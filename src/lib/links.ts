import type { CatalogProduct, Company, Locale, Localized, Person } from "../data/types";
import { localePath, t } from "./i18n";

export function mdLink(label: string, href: string): string {
  return `[${label.replace(/[[\]]/g, "")}](${href})`;
}

export function companyHref(slug: string, locale: Locale): string {
  return localePath(locale, `/companies/${slug}`);
}

export function personHref(slug: string, locale: Locale): string {
  return localePath(locale, `/people/${slug}`);
}

export function productHref(slug: string, locale: Locale): string {
  return localePath(locale, `/products/${slug}`);
}

export function sectorHref(slug: string, locale: Locale): string {
  return localePath(locale, `/sectors/${slug}`);
}

export function regionHref(slug: string, locale: Locale): string {
  return localePath(locale, `/regions/${slug}`);
}

export function countryHref(code: string, locale: Locale): string {
  return localePath(locale, `/countries/${code.toLowerCase()}`);
}

export function cityHref(slug: string, locale: Locale): string {
  return localePath(locale, `/cities/${slug}`);
}

export function docHref(slug: string, locale: Locale): string {
  return localePath(locale, `/${slug}`);
}

export function companyMdLink(company: Pick<Company, "slug" | "name">, locale: Locale): string {
  return mdLink(t(company.name, locale), companyHref(company.slug, locale));
}

export function personMdLink(person: Pick<Person, "slug" | "name">, locale: Locale): string {
  return mdLink(t(person.name, locale), personHref(person.slug, locale));
}

export function productMdLink(product: Pick<CatalogProduct, "slug" | "name">, locale: Locale): string {
  return mdLink(t(product.name, locale), productHref(product.slug, locale));
}

export function namedLink(name: Localized, hrefFor: (locale: Locale) => string): Localized {
  return {
    en: mdLink(name.en, hrefFor("en")),
    zh: mdLink(name.zh, hrefFor("zh")),
  };
}
