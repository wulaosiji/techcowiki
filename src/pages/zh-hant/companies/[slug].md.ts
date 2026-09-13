import type { APIRoute } from "astro";
import { allCompanies, getCompany } from "../../../data/catalog";
import { textResponse } from "../../../lib/http";
import { companyMarkdown } from "../../../lib/markdown";

export function getStaticPaths() {
  return allCompanies().map((company) => ({ params: { slug: company.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const company = getCompany(params.slug!);
  if (!company) return new Response("Not found", { status: 404 });
  return textResponse(companyMarkdown(company, "zht"), "text/markdown");
};
