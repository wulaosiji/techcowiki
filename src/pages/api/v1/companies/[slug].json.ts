import type { APIRoute } from "astro";
import { allCompanies, getCompany } from "../../../../data/catalog";
import { jsonResponse } from "../../../../lib/http";
import { companyRecord } from "../../../../lib/serialize";

export function getStaticPaths() {
  return allCompanies().map((company) => ({ params: { slug: company.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const company = getCompany(params.slug!);
  if (!company) return new Response("Not found", { status: 404 });
  return jsonResponse(companyRecord(company));
};
