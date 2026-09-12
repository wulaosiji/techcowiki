import type { APIRoute } from "astro";
import { allPeople } from "../../../data/catalog";
import { jsonResponse } from "../../../lib/http";
import { personRecord } from "../../../lib/serialize";

export const GET: APIRoute = () => jsonResponse(allPeople().map(personRecord));
