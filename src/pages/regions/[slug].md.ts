import type { APIRoute } from "astro";
import { companiesByRegion } from "../../data/catalog";
import { regions, SITE_ORIGIN } from "../../data/site";
import { textResponse } from "../../lib/http";

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
    ...companies.map((company) => `- [${company.name.en}](${SITE_ORIGIN}/companies/${company.slug}.md)`),
    "",
  ].join("\n");
  return textResponse(body, "text/markdown");
};
