import type { APIRoute } from "astro";
import { allPeople, getPerson } from "../../../data/catalog";
import { textResponse } from "../../../lib/http";
import { personMarkdown } from "../../../lib/markdown";

export function getStaticPaths() {
  return allPeople().map((person) => ({ params: { slug: person.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const person = getPerson(params.slug!);
  if (!person) return new Response("Not found", { status: 404 });
  return textResponse(personMarkdown(person, "zht"), "text/markdown");
};
