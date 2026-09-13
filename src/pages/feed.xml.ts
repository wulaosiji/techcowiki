import type { APIRoute } from "astro";
import { allCompanies } from "../data/catalog";
import { SITE_NAME, SITE_ORIGIN, tagline } from "../data/site";
import { escapeHtml, stripCitations } from "../lib/citations";
import { textResponse } from "../lib/http";

function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export const GET: APIRoute = () => {
  const items = allCompanies()
    .map(
      (company) => `  <item>
    <title>${escapeHtml(company.name.en)}</title>
    <link>${SITE_ORIGIN}/companies/${company.slug}</link>
    <guid>${company.id}</guid>
    <pubDate>${rfc822(company.lastReviewed)}</pubDate>
    <description>${escapeHtml(stripCitations(company.definition.en))}</description>
  </item>`,
    )
    .join("\n");
  return textResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${SITE_NAME}</title>
  <link>${SITE_ORIGIN}</link>
  <description>${tagline.en}</description>
${items}
</channel>
</rss>
`,
    "application/rss+xml",
  );
};
