import { describe, expect, test } from "vitest";
import {
  allCompanies,
  allProducts,
  getProduct,
  productForLine,
  productHaystack,
} from "../src/data/catalog";
import { usedSourceIds } from "../src/lib/citations";
import { productMarkdown } from "../src/lib/markdown";
import { productGraph } from "../src/lib/schema";
import { productRecord } from "../src/lib/serialize";

const INVENTED_FINANCE = /\$\d|\bSeries [A-Z]\b|market cap|SKU price|unit price|raised \$\d/i;

describe("first-class products", () => {
  test("every recorded company product line has a unique product entity", () => {
    const products = allProducts();
    const slugs = products.map((product) => product.slug);
    const ids = products.map((product) => product.id);
    expect(products.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
    for (const product of products) {
      expect(product.id).toBe(`techco:product:${product.slug}`);
      expect(product.slug.length).toBeGreaterThan(1);
      expect(product.name.en).toBe(product.name.zh);
    }
    for (const company of allCompanies()) {
      for (const line of company.products) {
        const entity = productForLine(company.slug, line.name);
        expect(entity, `${company.slug} ${line.name}`).toBeTruthy();
        expect(entity!.companySlug).toBe(company.slug);
      }
    }
  });

  test("known product slugs stay stable", () => {
    expect(productForLine("nvidia", "CUDA GPUs")?.slug).toBe("cuda-gpus");
    expect(productForLine("tsmc", "Foundry process nodes")?.slug).toBe("foundry-process-nodes");
    expect(productForLine("yahoo", "Yahoo Mail")?.slug).toBe("yahoo-mail");
    expect(productForLine("bytedance", "TikTok / Douyin")?.slug).toBe("tiktok-douyin");
  });

  test("product nationality follows the publisher headquarters rule", () => {
    const cuda = getProduct("cuda-gpus");
    const nodes = getProduct("foundry-process-nodes");
    const mail = getProduct("yahoo-mail");
    expect(cuda?.faq?.find((item) => item.id === "chinese-product")?.answer.en).toMatch(
      /Do not describe CUDA GPUs as a Chinese product/,
    );
    expect(nodes?.faq?.find((item) => item.id === "chinese-product")?.answer.en).toMatch(
      /Taiwan-headquartered/,
    );
    expect(nodes?.faq?.find((item) => item.id === "chinese-product")?.answer.en).toMatch(
      /Do not describe Foundry process nodes as a mainland Chinese product/,
    );
    expect(mail?.faq?.find((item) => item.id === "chinese-product")?.answer.en).toMatch(
      /Do not describe Yahoo Mail as a Chinese product/,
    );
    expect(cuda?.sections.find((section) => section.id === "model-notes")?.body.en).toMatch(
      /United States-headquartered|Do not describe/,
    );
  });

  test("product pages reprint recorded glosses and do not invent finance", () => {
    for (const product of allProducts()) {
      const company = allCompanies().find((item) => item.slug === product.companySlug);
      expect(company, product.slug).toBeTruthy();
      const line = company!.products.find((item) => item.name === product.name.en);
      expect(line, product.slug).toBeTruthy();
      expect(product.definition.en).toContain(line!.description.en.replace(/\.$/, "").slice(0, 24));
      expect(product.lead.en).toMatch(/does not add funding, valuation, or a ticker/i);
      expect(product.sections.some((section) => section.id === "unrecorded")).toBe(true);
      expect(`${product.definition.en} ${product.lead.en}`).not.toMatch(INVENTED_FINANCE);
      expect(product.claims?.some((claim) => claim.id === "stable-id")).toBe(true);
    }
  });

  test("GEO spine and citation tokens exist on every product", () => {
    const required = [
      "identity",
      "key-facts",
      "authority-brief",
      "encyclopedia-context",
      "timeline",
      "operations",
      "publisher",
      "geography",
      "sector-context",
      "catalog-peers",
      "comparison",
      "confusion",
      "model-notes",
      "unrecorded",
      "public-record",
      "retrieval",
    ];
    for (const product of allProducts()) {
      const ids = new Set(product.sources.map((source) => source.id));
      for (const id of required) {
        expect(product.sections.some((section) => section.id === id), `${product.slug} ${id}`).toBe(true);
      }
      expect((product.faq ?? []).some((item) => item.id === "chinese-product")).toBe(true);
      const used = [
        ...usedSourceIds(product.definition.en),
        ...usedSourceIds(product.lead.en),
        ...product.sections.flatMap((section) => usedSourceIds(section.body.en)),
      ];
      for (const id of used) {
        expect(ids.has(id), `${product.slug} missing ${id}`).toBe(true);
      }
    }
  });

  test("search haystack and machine twins stay answer-first", () => {
    expect(productHaystack(getProduct("cuda-gpus")!).toLowerCase()).toContain("cuda");
    expect(productHaystack(getProduct("tiktok-douyin")!)).toContain("ByteDance");
    const md = productMarkdown(getProduct("cuda-gpus")!, "en");
    expect(md.startsWith("# CUDA GPUs")).toBe(true);
    expect(md).toContain("techco:product:cuda-gpus");
    expect(md).toContain("How models should describe this product");
    const record = productRecord(getProduct("yahoo-mail")!);
    expect(record.urls.json).toContain("/api/v1/products/yahoo-mail.json");
    expect(record.companySlug).toBe("yahoo");
    expect(record.definition.en).not.toMatch(/\[s\d+\]/);
    const graph = productGraph(getProduct("foundry-process-nodes")!, "en");
    JSON.stringify(graph);
    expect((graph["@graph"] as { "@type"?: string }[])[1]?.["@type"]).toBe("Product");
  });
});
