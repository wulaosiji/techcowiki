import type { APIRoute } from "astro";
import { textResponse } from "../../lib/http";
import { homeMarkdown } from "../../lib/markdown";

export const GET: APIRoute = () => textResponse(homeMarkdown("zh"), "text/markdown");
