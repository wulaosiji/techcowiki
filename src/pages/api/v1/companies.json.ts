import type { APIRoute } from "astro";
import { allCompanies } from "../../../data/catalog";
import { jsonResponse } from "../../../lib/http";
import { companyRecord } from "../../../lib/serialize";

export const GET: APIRoute = () => jsonResponse(allCompanies().map(companyRecord));
