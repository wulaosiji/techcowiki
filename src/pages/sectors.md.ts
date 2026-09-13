import type { APIRoute } from "astro";
import { hubIndexMarkdown } from "../lib/hub-markdown";
import { textResponse } from "../lib/http";

export const GET: APIRoute = () => textResponse(hubIndexMarkdown("sectors", "en"), "text/markdown");
