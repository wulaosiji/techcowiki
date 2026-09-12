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

export function switchLocale(locale: Locale, path: string): string {
  const next = locale === "en" ? "zh" : "en";
  const stripped = path.replace(/^\/zh(?=\/|$)/, "") || "/";
  return localePath(next, stripped);
}

export function pageUrl(locale: Locale, path = "/"): string {
  const local = localePath(locale, path);
  return local === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${local}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export function htmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-Hans" : "en";
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
