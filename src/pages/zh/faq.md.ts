import type { APIRoute } from "astro";
import { faqMarkdown } from "../../lib/editorial-md";
import { textResponse } from "../../lib/http";

export const GET: APIRoute = () => textResponse(faqMarkdown("zh"), "text/markdown");
