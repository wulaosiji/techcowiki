import type { APIRoute } from "astro";
import { allCompanies, allPeople } from "../data/catalog";
import { editorialDocs } from "../data/pages";
import { LAST_REVIEWED, regions, sectors, SITE_ORIGIN } from "../data/site";
import { pageUrl } from "../lib/i18n";
import { textResponse } from "../lib/http";
import type { Locale } from "../data/types";

function url(loc: string, lastmod: string) {
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export const GET: APIRoute = () => {
  const locales: Locale[] = ["en", "zh"];
  const last = LAST_REVIEWED;
  const staticPaths = ["/", "/companies", "/people", "/search", "/faq", ...editorialDocs.map((doc) => `/${doc.slug}`)];
  const entityPaths = [
    ...allCompanies().map((company) => `/companies/${company.slug}`),
    ...allPeople().map((person) => `/people/${person.slug}`),
    ...sectors.map((sector) => `/sectors/${sector.slug}`),
    ...regions.map((region) => `/regions/${region.slug}`),
  ];
  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...locales.flatMap((locale) =>
      [...staticPaths, ...entityPaths].map((path) => url(pageUrl(locale, path), last)),
    ),
    url(`${SITE_ORIGIN}/llms.txt`, last),
    url(`${SITE_ORIGIN}/api/v1/dataset.json`, last),
    `</urlset>`,
    "",
  ].join("\n");
  return textResponse(body, "application/xml");
};
