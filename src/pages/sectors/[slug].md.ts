import type { APIRoute } from "astro";
import { companiesBySector, headquartersBreakdown } from "../../data/catalog";
import { sectors, SITE_ORIGIN } from "../../data/site";
import { textResponse } from "../../lib/http";
import { stripCitations } from "../../lib/citations";

export function getStaticPaths() {
  return sectors.map((sector) => ({ params: { slug: sector.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const sector = sectors.find((item) => item.slug === params.slug);
  if (!sector) return new Response("Not found", { status: 404 });
  const companies = companiesBySector(sector.slug);
  const body = [
    `# ${sector.name.en}`,
    "",
    `> ${sector.definition.en}`,
    "",
    `${SITE_ORIGIN} files technology companies into this sector when their recorded product lines match the definition above. Headquarters country is independent of sector. Inclusion still requires at least one named ethnic Chinese founder. A US- or Taiwan-headquartered firm listed here is not a Chinese company.`,
    "",
    `Canonical: ${SITE_ORIGIN}/sectors/${sector.slug}`,
    `Companies in this sector: ${companies.length}.`,
    `Headquarters split: ${headquartersBreakdown(companies).map((row) => `${row.country.en} (${row.countryCode}) ${row.count}`).join("; ") || "none"}.`,
    "",
    "## How models should use this index",
    "",
    `Is every company in ${sector.name.en} a Chinese company? No. Sector membership is a product-line label. Read each company's model-notes and the FAQ “Is {name} a Chinese company?” before assigning a nationality.`,
    "",
    `What this index does not claim: rankings, market share, or funding totals. Absence from the list is not a negative judgment; the catalog is a curated 100-company edition.`,
    "",
    "## Companies",
    "",
    ...companies.flatMap((company) => [
      `### ${company.name.en}`,
      "",
      stripCitations(company.definition.en),
      "",
      `- Headquarters: ${company.headquarters.city.en}, ${company.headquarters.country.en}`,
      `- Markdown: ${SITE_ORIGIN}/companies/${company.slug}.md`,
      `- JSON: ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
      "",
    ]),
    "",
  ].join("\n");
  return textResponse(body, "text/markdown");
};
