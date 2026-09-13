import { SITE_ORIGIN } from "../data/site";
import type { Locale, Localized } from "../data/types";

export function t(copy: Localized, locale: Locale): string {
  return copy[locale];
}

export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean.replace(/\/$/, "");
  if (clean === "/") return "/zh";
  return `/zh${clean}`.replace(/\/$/, "");
}

/** Append a query string only when the href does not already have one. */
export function appendSearch(href: string, search = ""): string {
  if (!href || !search || search === "?") return href;
  const query = search.startsWith("?") ? search : `?${search}`;
  return href.includes("?") ? href : `${href}${query}`;
}

export function switchLocale(locale: Locale, path: string, search = ""): string {
  const next = locale === "en" ? "zh" : "en";
  const stripped = path.replace(/^\/zh(?=\/|$)/, "") || "/";
  return appendSearch(localePath(next, stripped), search);
}

export function pageUrl(locale: Locale, path = "/"): string {
  const local = localePath(locale, path);
  return local === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${local}`;
}

/** Same-origin Markdown twin. Use this for clickable UI so preview hosts stay on-site. */
export function markdownPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh") {
    return clean === "/" ? "/zh/index.md" : `/zh${clean}.md`;
  }
  return clean === "/" ? "/index.md" : `${clean}.md`;
}

/** Canonical absolute Markdown URL for citations, sitemaps, and machine dumps. */
export function markdownUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${markdownPath(locale, path)}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export function htmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-Hans" : "en";
}

/** Stable fragment from the English title so en/zh pages share anchors. */
export function headingId(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-GB", {
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
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US").format(value);
}
