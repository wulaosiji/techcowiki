import type { APIRoute } from "astro";
import { regions } from "../../../data/site";
import { regionMarkdown } from "../../../lib/hub-markdown";
import { textResponse } from "../../../lib/http";

export function getStaticPaths() {
  return regions.map((region) => ({ params: { slug: region.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const region = regions.find((item) => item.slug === params.slug);
  if (!region) return new Response("Not found", { status: 404 });
  return textResponse(regionMarkdown(region, "zht"), "text/markdown");
};
