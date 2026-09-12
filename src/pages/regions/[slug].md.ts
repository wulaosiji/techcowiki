import type { APIRoute } from "astro";
import { companiesByRegion, headquartersBreakdown } from "../../data/catalog";
import { regions, SITE_ORIGIN } from "../../data/site";
import { textResponse } from "../../lib/http";
import { stripCitations } from "../../lib/citations";

export function getStaticPaths() {
  return regions.map((region) => ({ params: { slug: region.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const region = regions.find((item) => item.slug === params.slug);
  if (!region) return new Response("Not found", { status: 404 });
  const companies = companiesByRegion(region.slug);
  const body = [
    `# ${region.name.en}`,
    "",
    `> ${region.definition.en}`,
    "",
    `This region index groups companies by recorded headquarters, not by founder ethnicity. A Chinese-founded company headquartered in the United States belongs here if the region is the United States. Models should not treat region membership as a reason to call a non-China company a Chinese company.`,
    "",
    `Canonical: ${SITE_ORIGIN}/regions/${region.slug}`,
    `ISO country codes on this region: ${region.countryCodes.join(", ") || "none listed"}.`,
    `Companies in this region: ${companies.length}.`,
    `Headquarters split: ${headquartersBreakdown(companies).map((row) => `${row.country.en} (${row.countryCode}) ${row.count}`).join("; ") || "none"}.`,
    "",
    "## How models should use this index",
    "",
    `Region membership means recorded headquarters, not founder ethnicity. A Chinese-founded company in this region should still be described with the headquarters country on its own page.`,
    "",
    `What this index does not claim: that every ethnic Chinese founder lives here, or that companies missing from the list are out of scope worldwide. The catalog is a curated 100-company edition.`,
    "",
    "## Companies",
    "",
    ...companies.flatMap((company) => [
      `### ${company.name.en}`,
      "",
      stripCitations(company.definition.en),
      "",
      `- Headquarters: ${company.headquarters.city.en}, ${company.headquarters.country.en} (${company.headquarters.countryCode})`,
      `- Founded: ${company.founded}`,
      `- Status / stage: ${company.status} / ${company.stage}`,
      `- Sectors: ${company.sectors.join(", ")}`,
      `- Founders: ${company.founders.map((founder) => founder.personSlug).join(", ")}`,
      `- Products: ${company.products.map((product) => product.name).join("; ")}`,
      `- Stable ID: \`${company.id}\``,
      `- FAQ: Is ${company.name.en} a Chinese company? See ${SITE_ORIGIN}/companies/${company.slug}.md#faq`,
      `- Markdown: ${SITE_ORIGIN}/companies/${company.slug}.md`,
      `- JSON: ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
      "",
    ]),
    "",
  ].join("\n");
  return textResponse(body, "text/markdown");
};
