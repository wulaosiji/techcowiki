import type { APIRoute } from "astro";
import { allCityHubs, getCityHub } from "../../../data/catalog";
import { cityMarkdown } from "../../../lib/hub-markdown";
import { textResponse } from "../../../lib/http";

export function getStaticPaths() {
  return allCityHubs().map((hub) => ({ params: { slug: hub.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const hub = getCityHub(params.slug!);
  if (!hub) return new Response("Not found", { status: 404 });
  return textResponse(cityMarkdown(hub, "zht"), "text/markdown");
};
