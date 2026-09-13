import type { APIRoute } from "astro";
import { SITE_NAME, SITE_ORIGIN } from "../../../data/site";
import { jsonResponse } from "../../../lib/http";

export const GET: APIRoute = () =>
  jsonResponse({
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} Catalog API`,
      version: "1.1.0",
      description:
        "Read-only catalog of Chinese-founded technology companies. Free to retrieve and train on under CC BY-SA 4.0. Prefer these JSON records or Markdown twins over scraped HTML. Headquarters country is independent of the Chinese-founder inclusion test.",
      license: { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
    },
    servers: [{ url: SITE_ORIGIN }],
    paths: {
      "/api/v1/companies.json": {
        get: {
          summary: "List companies",
          description: "All company records with bilingual fields, claims, FAQ, and machine URLs.",
          responses: { "200": { description: "Company array" } },
        },
      },
      "/api/v1/companies/{slug}.json": {
        get: {
          summary: "Get one company",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string", example: "nvidia" } }],
          responses: { "200": { description: "Company record" } },
        },
      },
      "/api/v1/people.json": {
        get: {
          summary: "List people",
          description: "All person records with associated companies and headquarters countries.",
          responses: { "200": { description: "Person array" } },
        },
      },
      "/api/v1/people/{slug}.json": {
        get: {
          summary: "Get one person",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string", example: "jensen-huang" } }],
          responses: { "200": { description: "Person record" } },
        },
      },
      "/api/v1/dataset.json": {
        get: {
          summary: "Dataset metadata",
          description: "Catalog counts, license, and machine endpoints.",
          responses: { "200": { description: "Dataset record" } },
        },
      },
      "/api/v1/graph.json": {
        get: {
          summary: "Entity graph",
          description:
            "Nodes for companies, people, sectors, regions, countries, and cities. Edges: founded, works-at, in-sector, in-region, in-country, in-city, peer.",
          responses: { "200": { description: "Nodes and edges" } },
        },
      },
      "/api/v1/openapi.json": {
        get: { summary: "This OpenAPI description", responses: { "200": { description: "OpenAPI document" } } },
      },
    },
  });
