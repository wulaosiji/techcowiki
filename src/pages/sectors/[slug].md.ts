import type { APIRoute } from "astro";
import { companiesBySector } from "../../data/catalog";
import { sectors } from "../../data/site";
import { textResponse } from "../../lib/http";
import { SITE_ORIGIN } from "../../data/site";

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
    ...companies.map((company) => `- [${company.name.en}](${SITE_ORIGIN}/companies/${company.slug}.md)`),
    "",
  ].join("\n");
  return textResponse(body, "text/markdown");
};
