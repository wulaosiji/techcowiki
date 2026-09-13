import { SITE_ORIGIN } from "../data/site";
import type { Locale, Localized } from "../data/types";
import { isZhFamily, toTraditional, traditionalSearchVariants } from "./traditional";

export const LOCALES: Locale[] = ["en", "zh", "zht"];

export const localeMeta: Record<
  Locale,
  { prefix: string; htmlLang: string; hreflang: string; og: string; label: Localized; intl: string }
> = {
  en: {
    prefix: "",
    htmlLang: "en",
    hreflang: "en",
    og: "en_US",
    label: { en: "English", zh: "English" },
    intl: "en-GB",
  },
  zh: {
    prefix: "/zh",
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    og: "zh_CN",
    label: { en: "简体", zh: "简体" },
    intl: "zh-CN",
  },
  zht: {
    prefix: "/zh-hant",
    htmlLang: "zh-Hant",
    hreflang: "zh-Hant",
    og: "zh_Hant",
    label: { en: "繁體", zh: "繁體" },
    intl: "zh-Hant",
  },
};

export function t(copy: Localized, locale: Locale): string {
  if (locale === "zht") return toTraditional(copy.zh);
  return copy[locale];
}

export function tOpt(copy: Localized | undefined, locale: Locale): string | undefined {
  return copy ? t(copy, locale) : undefined;
}

export function pick(locale: Locale, en: string, zh: string): string {
  return t({ en, zh }, locale);
}

/** Cross-script alias shown under the localized heading. */
export function altName(name: Localized, locale: Locale): string {
  return locale === "en" ? name.zh : name.en;
}

export function tList(copy: { en: string[]; zh: string[] }, locale: Locale): string[] {
  if (locale === "zht") return copy.zh.map(toTraditional);
  return copy[locale];
}

export function localizedTriple(copy: Localized): { en: string; zh: string; zht: string } {
  return { en: copy.en, zh: copy.zh, zht: toTraditional(copy.zh) };
}

export function localePrefix(locale: Locale): string {
  return localeMeta[locale].prefix;
}

export function stripLocalePrefix(path: string): string {
  if (path === "/zh-hant" || path.startsWith("/zh-hant/")) return path.slice("/zh-hant".length) || "/";
  if (path === "/zh" || path.startsWith("/zh/")) return path.slice("/zh".length) || "/";
  return path || "/";
}

export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const prefix = localePrefix(locale);
  if (!prefix) return clean === "/" ? "/" : clean.replace(/\/$/, "");
  if (clean === "/") return prefix;
  return `${prefix}${clean}`.replace(/\/$/, "");
}

/** Append a query string only when the href does not already have one. */
export function appendSearch(href: string, search = ""): string {
  if (!href || !search || search === "?") return href;
  const query = search.startsWith("?") ? search : `?${search}`;
  return href.includes("?") ? href : `${href}${query}`;
}

export function switchToLocale(target: Locale, path: string, search = ""): string {
  return appendSearch(localePath(target, stripLocalePrefix(path)), search);
}

/** Default toggle stays en ↔ zh so existing search-switch e2e still clicks Simplified Chinese first. */
export function switchLocale(locale: Locale, path: string, search = ""): string {
  const next = locale === "en" ? "zh" : "en";
  return switchToLocale(next, path, search);
}

export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((item) => item !== locale);
}

export function localeSwitchLinks(
  locale: Locale,
  path: string,
  search = "",
): { locale: Locale; href: string; label: string; hreflang: string }[] {
  const order: Locale[] = locale === "en" ? ["zh", "zht"] : locale === "zh" ? ["en", "zht"] : ["en", "zh"];
  return order.map((item) => ({
    locale: item,
    href: switchToLocale(item, path, search),
    label: t(localeMeta[item].label, locale),
    hreflang: localeMeta[item].hreflang,
  }));
}

export function pageUrl(locale: Locale, path = "/"): string {
  const local = localePath(locale, path);
  return local === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${local}`;
}

/** Same-origin Markdown twin. Use this for clickable UI so preview hosts stay on-site. */
export function markdownPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const prefix = localePrefix(locale);
  if (!prefix) return clean === "/" ? "/index.md" : `${clean}.md`;
  return clean === "/" ? `${prefix}/index.md` : `${prefix}${clean}.md`;
}

/** Canonical absolute Markdown URL for citations, sitemaps, and machine dumps. */
export function markdownUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${markdownPath(locale, path)}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export function htmlLang(locale: Locale): string {
  return localeMeta[locale].htmlLang;
}

export function hreflang(locale: Locale): string {
  return localeMeta[locale].hreflang;
}

/** Stable fragment from the English title so en/zh/zht pages share anchors. */
export function headingId(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatFounded(iso: string, precision: "year" | "month" | "day"): string {
  if (precision === "year") return iso.slice(0, 4);
  if (precision === "month") return iso.slice(0, 7);
  return iso;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : localeMeta[locale].intl).format(value);
}

export function listSep(locale: Locale): string {
  return isZhFamily(locale) ? "、" : ", ";
}

export { isZhFamily, toTraditional, traditionalSearchVariants };
