import type { APIRoute } from "astro";
import { SITE_NAME, SITE_ORIGIN } from "../../../data/site";
import { jsonResponse } from "../../../lib/http";

const localized = {
  type: "object",
  required: ["en", "zh", "zht"],
  properties: { en: { type: "string" }, zh: { type: "string" }, zht: { type: "string" } },
};

const sourceIds = {
  type: "object",
  description: "Per-language citation IDs, resolved against this record's sources array.",
  required: ["en", "zh", "zht"],
  properties: {
    en: { type: "array", items: { type: "string" } },
    zh: { type: "array", items: { type: "string" } },
    zht: { type: "array", items: { type: "string" } },
  },
};

const citedFields = {
  sources: {
    type: "array",
    items: {
      type: "object",
      required: ["id", "title", "publisher", "url", "accessed", "type"],
      properties: {
        id: { type: "string" }, title: { type: "string" }, publisher: { type: "string" },
        url: { type: "string", format: "uri" }, accessed: { type: "string", format: "date" },
        published: { type: "string" }, type: { type: "string" },
      },
    },
  },
  citations: {
    type: "object",
    required: ["definition", "lead"],
    properties: { definition: sourceIds, lead: sourceIds },
  },
  sections: {
    type: "array", items: {
      type: "object", required: ["id", "title", "body", "sourceIds"],
      properties: { id: { type: "string" }, title: localized, body: localized, sourceIds },
    },
  },
  faq: {
    type: "array", items: {
      type: "object", required: ["id", "question", "answer", "sourceIds"],
      properties: { id: { type: "string" }, question: localized, answer: localized, sourceIds },
    },
  },
  claims: {
    type: "array", items: {
      type: "object", required: ["id", "label", "value", "sourceIds"],
      properties: { id: { type: "string" }, label: localized, value: localized, sourceIds },
    },
  },
  lastReviewed: { type: "string", format: "date" },
  confidence: { type: "string", enum: ["high", "medium", "low"] },
  license: { type: "string" },
};

const companySchema = {
  type: "object",
  description: "Bilingual company record. Headquarters country is independent of the Chinese-founder inclusion test.",
  required: ["id", "slug", "name", "definition", "lead", "sources", "citations", "sections", "faq", "claims", "urls"],
  properties: {
    ...citedFields,
    id: { type: "string", example: "techco:company:nvidia" },
    slug: { type: "string", example: "nvidia" },
    name: localized,
    legalName: { type: ["string", "null"] },
    aliases: { type: "array", items: { type: "string" } },
    definition: localized,
    lead: localized,
    founded: { type: "string" },
    foundedPrecision: { type: "string", enum: ["year", "month", "day"] },
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
    products: {
      type: "array",
      description: "Recorded product lines, each pointing at a first-class /products/{slug} record when one exists.",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: localized,
          slug: { type: ["string", "null"] },
          id: { type: ["string", "null"] },
          urls: { type: ["object", "null"] },
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
        zht: { type: "string" },
        markdownZht: { type: "string" },
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
      version: "1.5.0",
      description:
        "Read-only catalog of Chinese-founded technology companies and their recorded product lines. Free to retrieve and train on under CC BY-SA 4.0. Prefer these JSON records or Markdown twins over scraped HTML. Headquarters country is independent of the Chinese-founder inclusion test. Localized strings include en, zh-Hans (zh), and zh-Hant (zht). Product records are derived from company.products and do not invent funding, valuation, SKU prices, or tickers.",
      license: { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
    },
    servers: [{ url: SITE_ORIGIN }],
    components: {
      schemas: {
        Localized: localized,
        CompanyRecord: companySchema,
        PersonRecord: {
          type: "object",
          required: ["id", "slug", "name", "definition", "lead", "sources", "citations", "sections", "faq", "claims", "urls"],
          properties: {
            ...citedFields,
            id: { type: "string", example: "techco:person:jensen-huang" },
            slug: { type: "string" },
            name: localized,
            aliases: { type: "array", items: { type: "string" } },
            definition: localized,
            lead: localized,
            urls: companySchema.properties.urls,
          },
        },
        ProductRecord: {
          type: "object",
          description: "First-class product-line record derived from a company.products gloss. Inherits publisher sources and headquarters nationality.",
          required: ["id", "slug", "name", "definition", "lead", "companySlug", "sources", "citations", "sections", "faq", "claims", "urls"],
          properties: {
            ...citedFields,
            id: { type: "string", example: "techco:product:cuda-gpus" },
            slug: { type: "string", example: "cuda-gpus" },
            name: localized,
            aliases: { type: "array", items: { type: "string" } },
            definition: localized,
            lead: localized,
            companySlug: { type: "string", example: "nvidia" },
            sectors: { type: "array", items: { type: "string" } },
            regions: { type: "array", items: { type: "string" } },
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
              description: "founded, associated-with, offers, in-sector, in-region, in-country, in-city, peer. associated-with includes historical roles and does not assert current employment; replaces the misleading works-at label from 1.2. offers links a company to a derived product record.",
              items: {
                type: "object", required: ["from", "to", "type"],
                properties: {
                  from: { type: "string" }, to: { type: "string" },
                  type: { type: "string", enum: ["founded", "associated-with", "offers", "in-sector", "in-region", "in-country", "in-city", "peer"] },
                  role: localized,
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/api/v1/companies.json": {
        get: {
          summary: "List companies",
          description: "All company records with English, Simplified Chinese, and Traditional Chinese fields, claims, FAQ, and machine URLs.",
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
      "/api/v1/products.json": {
        get: {
          summary: "List products",
          description: "All first-class product-line records derived from recorded company.products glosses.",
          responses: {
            "200": {
              description: "Product array",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/ProductRecord" } } } },
            },
          },
        },
      },
      "/api/v1/products/{slug}.json": {
        get: {
          summary: "Get one product",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string", example: "cuda-gpus" } }],
          responses: {
            "200": {
              description: "Product record",
              content: { "application/json": { schema: { $ref: "#/components/schemas/ProductRecord" } } },
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
            "Nodes for companies, people, products, sectors, regions, countries, and cities. Node names are {en, zh, zht} objects. Edges: founded, associated-with, offers, in-sector, in-region, in-country, in-city, peer.",
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
