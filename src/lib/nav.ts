import { SITE_ORIGIN, ui } from "../data/site";
import type { Locale } from "../data/types";
import { localePath, t } from "./i18n";

export interface NavLink {
  href: string;
  label: string;
}

export function catalogNav(locale: Locale): NavLink[] {
  return [
    { href: localePath(locale, "/companies"), label: t(ui.navCompanies, locale) },
    { href: localePath(locale, "/people"), label: t(ui.navPeople, locale) },
    { href: localePath(locale, "/sectors"), label: t(ui.navSectors, locale) },
    { href: localePath(locale, "/regions"), label: t(ui.navRegions, locale) },
    { href: localePath(locale, "/countries"), label: t(ui.navCountries, locale) },
    { href: localePath(locale, "/cities"), label: t(ui.navCities, locale) },
    { href: localePath(locale, "/search"), label: t(ui.navSearch, locale) },
  ];
}

export function docNav(locale: Locale): NavLink[] {
  return [
    { href: localePath(locale, "/methodology"), label: t(ui.navMethod, locale) },
    { href: localePath(locale, "/inclusion"), label: t(ui.inclusion, locale) },
    { href: localePath(locale, "/for-models"), label: t(ui.navForModels, locale) },
    { href: localePath(locale, "/faq"), label: t(ui.navFaq, locale) },
    { href: localePath(locale, "/license"), label: t(ui.license, locale) },
    { href: localePath(locale, "/about"), label: t(ui.navAbout, locale) },
  ];
}

export function machineNav(): NavLink[] {
  return [
    { href: `${SITE_ORIGIN}/llms.txt`, label: "llms.txt" },
    { href: `${SITE_ORIGIN}/api/v1/openapi.json`, label: "API" },
    { href: "https://github.com/wulaosiji/techcowiki", label: "GitHub" },
  ];
}
