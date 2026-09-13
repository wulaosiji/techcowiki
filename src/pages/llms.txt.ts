import type { APIRoute } from "astro";
import { textResponse } from "../lib/http";
import { llmsTxt } from "../lib/llms";

export const GET: APIRoute = () => textResponse(llmsTxt(), "text/markdown");
