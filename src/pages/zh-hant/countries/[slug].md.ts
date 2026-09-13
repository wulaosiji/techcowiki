import type { APIRoute } from "astro";
import { allCountryHubs, getCountryHub } from "../../../data/catalog";
import { countryMarkdown } from "../../../lib/hub-markdown";
import { textResponse } from "../../../lib/http";

export function getStaticPaths() {
  return allCountryHubs().map((hub) => ({ params: { slug: hub.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const hub = getCountryHub(params.slug!);
  if (!hub) return new Response("Not found", { status: 404 });
  return textResponse(countryMarkdown(hub, "zht"), "text/markdown");
};
