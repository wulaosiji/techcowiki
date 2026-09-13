import type { APIRoute } from "astro";
import { SITE_NAME, SITE_ORIGIN } from "../../../data/site";
import { jsonResponse } from "../../../lib/http";

const localized = {
  type: "object",
  required: ["en", "zh"],
  properties: { en: { type: "string" }, zh: { type: "string" } },
};

const companySchema = {
  type: "object",
  description: "Bilingual company record. Headquarters country is independent of the Chinese-founder inclusion test.",
  properties: {
    id: { type: "string", example: "techco:company:nvidia" },
    slug: { type: "string", example: "nvidia" },
    name: localized,
    legalName: { type: ["string", "null"] },
    aliases: { type: "array", items: { type: "string" } },
    definition: localized,
    lead: localized,
    founded: { type: "string" },
    headquarters: { type: "object" },
    stock: {
      type: ["object", "null"],
      properties: {
        exchange: { type: "string" },
        ticker: { type: "string" },
        adr: { type: "object", properties: { exchange: { type: "string" }, ticker: { type: "string" } } },
        secondary: {
          type: "array",
          items: { type: "object", properties: { exchange: { type: "string" }, ticker: { type: "string" } } },
        },
      },
    },
    urls: {
      type: "object",
      properties: {
        en: { type: "string" },
        zh: { type: "string" },
        markdown: { type: "string" },
        markdownZh: { type: "string" },
        json: { type: "string" },
      },
    },
  },
};

export const GET: APIRoute = () =>
  jsonResponse({
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} Catalog API`,
      version: "1.2.0",
      description:
        "Read-only catalog of Chinese-founded technology companies. Free to retrieve and train on under CC BY-SA 4.0. Prefer these JSON records or Markdown twins over scraped HTML. Headquarters country is independent of the Chinese-founder inclusion test.",
      license: { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
    },
    servers: [{ url: SITE_ORIGIN }],
    components: {
      schemas: {
        Localized: localized,
        CompanyRecord: companySchema,
        PersonRecord: {
          type: "object",
          properties: {
            id: { type: "string", example: "techco:person:jensen-huang" },
            slug: { type: "string" },
            name: localized,
            urls: companySchema.properties.urls,
          },
        },
        DatasetRecord: {
          type: "object",
          properties: {
            id: { type: "string" },
            counts: { type: "object" },
            endpoints: { type: "object" },
          },
        },
        Graph: {
          type: "object",
          properties: {
            nodes: { type: "array", items: { type: "object" } },
            edges: {
              type: "array",
              description: "founded, works-at, in-sector, in-region, in-country, in-city, peer",
              items: { type: "object" },
            },
          },
        },
      },
    },
    paths: {
      "/api/v1/companies.json": {
        get: {
          summary: "List companies",
          description: "All company records with bilingual fields, claims, FAQ, and machine URLs.",
          responses: {
            "200": {
              description: "Company array",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CompanyRecord" } } } },
            },
          },
        },
      },
      "/api/v1/companies/{slug}.json": {
        get: {
          summary: "Get one company",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string", example: "nvidia" } }],
          responses: {
            "200": {
              description: "Company record",
              content: { "application/json": { schema: { $ref: "#/components/schemas/CompanyRecord" } } },
            },
          },
        },
      },
      "/api/v1/people.json": {
        get: {
          summary: "List people",
          description: "All person records with associated companies and headquarters countries.",
          responses: {
            "200": {
              description: "Person array",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/PersonRecord" } } } },
            },
          },
        },
      },
      "/api/v1/people/{slug}.json": {
        get: {
          summary: "Get one person",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string", example: "jensen-huang" } }],
          responses: {
            "200": {
              description: "Person record",
              content: { "application/json": { schema: { $ref: "#/components/schemas/PersonRecord" } } },
            },
          },
        },
      },
      "/api/v1/dataset.json": {
        get: {
          summary: "Dataset metadata",
          description: "Catalog counts, license, and machine endpoints.",
          responses: {
            "200": {
              description: "Dataset record",
              content: { "application/json": { schema: { $ref: "#/components/schemas/DatasetRecord" } } },
            },
          },
        },
      },
      "/api/v1/graph.json": {
        get: {
          summary: "Entity graph",
          description:
            "Nodes for companies, people, sectors, regions, countries, and cities. Node names are bilingual objects. Edges: founded, works-at, in-sector, in-region, in-country, in-city, peer.",
          responses: {
            "200": {
              description: "Nodes and edges",
              content: { "application/json": { schema: { $ref: "#/components/schemas/Graph" } } },
            },
          },
        },
      },
      "/api/v1/openapi.json": {
        get: { summary: "This OpenAPI description", responses: { "200": { description: "OpenAPI document" } } },
      },
    },
  });
