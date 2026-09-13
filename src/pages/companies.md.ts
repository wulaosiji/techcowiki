import type { APIRoute } from "astro";
import { catalogIndexMarkdown } from "../lib/hub-markdown";
import { textResponse } from "../lib/http";

export const GET: APIRoute = () => textResponse(catalogIndexMarkdown("companies", "en"), "text/markdown");
