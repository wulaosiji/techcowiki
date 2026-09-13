import type { APIRoute } from "astro";
import { sectors } from "../../../data/site";
import { sectorMarkdown } from "../../../lib/hub-markdown";
import { textResponse } from "../../../lib/http";

export function getStaticPaths() {
  return sectors.map((sector) => ({ params: { slug: sector.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const sector = sectors.find((item) => item.slug === params.slug);
  if (!sector) return new Response("Not found", { status: 404 });
  return textResponse(sectorMarkdown(sector, "zht"), "text/markdown");
};
