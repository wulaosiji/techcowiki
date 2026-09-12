import type { APIRoute } from "astro";
import { editorialDocs, getEditorial } from "../data/pages";
import { editorialMarkdown } from "../lib/editorial-md";
import { textResponse } from "../lib/http";

export function getStaticPaths() {
  return editorialDocs.map((doc) => ({ params: { doc: doc.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const doc = getEditorial(params.doc!);
  if (!doc) return new Response("Not found", { status: 404 });
  return textResponse(editorialMarkdown(doc, "en"), "text/markdown");
};
