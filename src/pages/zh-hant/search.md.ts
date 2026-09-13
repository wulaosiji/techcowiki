import type { APIRoute } from "astro";
import { textResponse } from "../../lib/http";
import { searchMarkdown } from "../../lib/markdown";

export const GET: APIRoute = () => textResponse(searchMarkdown("zht"), "text/markdown");
