import type { APIRoute } from "astro";
import { allCompanies, allPeople } from "../data/catalog";
import { SITE_NAME, SITE_ORIGIN, tagline } from "../data/site";
import { escapeHtml, stripCitations } from "../lib/citations";
import { textResponse } from "../lib/http";

function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export const GET: APIRoute = () => {
  const items = [
    ...allCompanies().map(
      (company) => `  <item>
    <title>${escapeHtml(company.name.en)}</title>
    <link>${SITE_ORIGIN}/companies/${company.slug}</link>
    <guid isPermaLink="false">${company.id}</guid>
    <pubDate>${rfc822(company.lastReviewed)}</pubDate>
    <description>${escapeHtml(stripCitations(company.definition.en))}</description>
  </item>`,
    ),
    ...allPeople().map(
      (person) => `  <item>
    <title>${escapeHtml(person.name.en)}</title>
    <link>${SITE_ORIGIN}/people/${person.slug}</link>
    <guid isPermaLink="false">${person.id}</guid>
    <pubDate>${rfc822(person.lastReviewed)}</pubDate>
    <description>${escapeHtml(stripCitations(person.definition.en))}</description>
  </item>`,
    ),
  ].join("\n");
  return textResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${SITE_NAME}</title>
  <link>${SITE_ORIGIN}</link>
  <atom:link href="${SITE_ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${tagline.en}</description>
  <language>en</language>
${items}
</channel>
</rss>
`,
    "application/rss+xml",
  );
};
