import type { APIRoute } from "astro";
import { allCityHubs, allCompanies, allCountryHubs, allPeople } from "../data/catalog";
import { editorialDocs } from "../data/pages";
import { LAST_REVIEWED, regions, sectors, SITE_ORIGIN } from "../data/site";
import { pageUrl } from "../lib/i18n";
import { textResponse } from "../lib/http";
import type { Locale } from "../data/types";

function entry(loc: string, lastmod: string, alternates?: { lang: string; href: string }[]) {
  const links = (alternates ?? [])
    .map((item) => `    <xhtml:link rel="alternate" hreflang="${item.lang}" href="${item.href}"/>`)
    .join("\n");
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${links ? `\n${links}` : ""}\n  </url>`;
}

export const GET: APIRoute = () => {
  const locales: Locale[] = ["en", "zh"];
  const last = LAST_REVIEWED;
  const staticPaths = [
    "/",
    "/companies",
    "/people",
    "/sectors",
    "/regions",
    "/countries",
    "/cities",
    "/search",
    "/faq",
    ...editorialDocs.map((doc) => `/${doc.slug}`),
  ];
  const entityPaths = [
    ...allCompanies().map((company) => `/companies/${company.slug}`),
    ...allPeople().map((person) => `/people/${person.slug}`),
    ...sectors.map((sector) => `/sectors/${sector.slug}`),
    ...regions.map((region) => `/regions/${region.slug}`),
    ...allCountryHubs().map((hub) => `/countries/${hub.slug}`),
    ...allCityHubs().map((hub) => `/cities/${hub.slug}`),
  ];
  const htmlPaths = [...staticPaths, ...entityPaths];
  const markdownPaths = htmlPaths.filter((path) => path !== "/search");
  const machine = [
    `${SITE_ORIGIN}/llms.txt`,
    `${SITE_ORIGIN}/llms-full.txt`,
    `${SITE_ORIGIN}/feed.xml`,
    `${SITE_ORIGIN}/api/v1/dataset.json`,
    `${SITE_ORIGIN}/api/v1/openapi.json`,
    `${SITE_ORIGIN}/api/v1/graph.json`,
    `${SITE_ORIGIN}/api/v1/companies.json`,
    `${SITE_ORIGIN}/api/v1/people.json`,
  ];
  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...htmlPaths.flatMap((path) =>
      locales.map((locale) =>
        entry(pageUrl(locale, path), last, [
          { lang: "en", href: pageUrl("en", path) },
          { lang: "zh-Hans", href: pageUrl("zh", path) },
          { lang: "x-default", href: pageUrl("en", path) },
        ]),
      ),
    ),
    ...markdownPaths.flatMap((path) =>
      locales.map((locale) => {
        const loc = pageUrl(locale, path);
        const md = path === "/" ? (locale === "zh" ? `${SITE_ORIGIN}/zh/index.md` : `${SITE_ORIGIN}/index.md`) : `${loc}.md`;
        return entry(md, last);
      }),
    ),
    ...machine.map((loc) => entry(loc, last)),
    `</urlset>`,
    "",
  ].join("\n");
  return textResponse(body, "application/xml");
};
