import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "../data/site";
import { textResponse } from "../lib/http";

const agents = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "Anthropic-AI",
  "Google-Extended",
  "Googlebot",
  "GoogleOther",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "PerplexityBot",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
];

export const GET: APIRoute = () => {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    ...agents.flatMap((agent) => [`User-agent: ${agent}`, "Allow: /", ""]),
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `Llms-txt: ${SITE_ORIGIN}/llms.txt`,
    "",
  ];
  return textResponse(lines.join("\n"), "text/plain");
};
