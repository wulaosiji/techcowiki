import type { APIRoute } from "astro";
import { catalogStats } from "../../../data/catalog";
import { jsonResponse } from "../../../lib/http";
import { datasetRecord } from "../../../lib/serialize";

export const GET: APIRoute = () => jsonResponse(datasetRecord(catalogStats()));
