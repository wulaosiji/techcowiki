import type { APIRoute } from "astro";
import { allPeople, getPerson } from "../../../../data/catalog";
import { jsonResponse } from "../../../../lib/http";
import { personRecord } from "../../../../lib/serialize";

export function getStaticPaths() {
  return allPeople().map((person) => ({ params: { slug: person.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const person = getPerson(params.slug!);
  if (!person) return new Response("Not found", { status: 404 });
  return jsonResponse(personRecord(person));
};
