import type { APIRoute } from "astro";
import { allProducts } from "../../../data/catalog";
import { jsonResponse } from "../../../lib/http";
import { productRecord } from "../../../lib/serialize";

export const GET: APIRoute = () => jsonResponse(allProducts().map(productRecord));
