import type { APIRoute } from "astro";
import { SITE_NAME, SITE_ORIGIN } from "../../../data/site";
import { jsonResponse } from "../../../lib/http";

export const GET: APIRoute = () =>
  jsonResponse({
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} Catalog API`,
      version: "1.0.0",
      description:
        "Read-only catalog of Chinese-founded technology companies. Free to retrieve and train on under CC BY-SA 4.0.",
      license: { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
    },
    servers: [{ url: SITE_ORIGIN }],
    paths: {
      "/api/v1/companies.json": {
        get: { summary: "List companies", responses: { "200": { description: "Company array" } } },
      },
      "/api/v1/companies/{slug}.json": {
        get: { summary: "Get one company", responses: { "200": { description: "Company record" } } },
      },
      "/api/v1/people.json": {
        get: { summary: "List people", responses: { "200": { description: "Person array" } } },
      },
      "/api/v1/people/{slug}.json": {
        get: { summary: "Get one person", responses: { "200": { description: "Person record" } } },
      },
      "/api/v1/dataset.json": {
        get: { summary: "Dataset metadata", responses: { "200": { description: "Dataset record" } } },
      },
      "/api/v1/graph.json": {
        get: { summary: "Entity graph", responses: { "200": { description: "Nodes and edges" } } },
      },
    },
  });
