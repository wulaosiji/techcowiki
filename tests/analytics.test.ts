import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import {
  GA_MEASUREMENT_ID,
  analyticsContentSecurityPolicy,
  analyticsPageConfig,
  classifyHref,
  clipParam,
  entityIdFor,
  isPublicAnalyticsHost,
  pageContextFromPath,
  publicLocale,
  publicLocaleFromPathname,
} from "../src/lib/analytics";

const read = (path: string) => readFileSync(path, "utf8");

describe("GA4 page classification", () => {
  test("maps locales to public en / zh / zh-hant values", () => {
    expect(publicLocale("en")).toBe("en");
    expect(publicLocale("zh")).toBe("zh");
    expect(publicLocale("zht")).toBe("zh-hant");
    expect(publicLocaleFromPathname("/zh-hant/products/cuda-gpus")).toBe("zh-hant");
    expect(publicLocaleFromPathname("/zh/search")).toBe("zh");
    expect(publicLocaleFromPathname("/companies/nvidia")).toBe("en");
  });

  test("classifies live site surfaces including products", () => {
    expect(pageContextFromPath("/")).toEqual({ pageType: "home" });
    expect(pageContextFromPath("/search")).toEqual({ pageType: "search", catalogKind: "search" });
    expect(pageContextFromPath("/404")).toEqual({ pageType: "not_found" });
    expect(pageContextFromPath("/faq")).toEqual({ pageType: "faq" });
    expect(pageContextFromPath("/about")).toEqual({ pageType: "editorial", editorialSlug: "about" });
    expect(pageContextFromPath("/for-models")).toEqual({ pageType: "editorial", editorialSlug: "for-models" });
    expect(pageContextFromPath("/companies")).toEqual({ pageType: "catalog", catalogKind: "companies" });
    expect(pageContextFromPath("/people")).toEqual({ pageType: "catalog", catalogKind: "people" });
    expect(pageContextFromPath("/products")).toEqual({ pageType: "catalog", catalogKind: "products" });
    expect(pageContextFromPath("/sectors")).toEqual({ pageType: "hub_index", catalogKind: "sectors" });
    expect(pageContextFromPath("/zh/sectors/semiconductors")).toEqual({
      pageType: "hub",
      hubKind: "sector",
      hubSlug: "semiconductors",
    });
    expect(pageContextFromPath("/companies/nvidia")).toEqual({
      pageType: "entity",
      entityType: "company",
      entitySlug: "nvidia",
      entityId: "techco:company:nvidia",
    });
    expect(pageContextFromPath("/zh-hant/people/jensen-huang")).toEqual({
      pageType: "entity",
      entityType: "person",
      entitySlug: "jensen-huang",
      entityId: "techco:person:jensen-huang",
    });
    expect(pageContextFromPath("/products/cuda-gpus")).toEqual({
      pageType: "entity",
      entityType: "product",
      entitySlug: "cuda-gpus",
      entityId: "techco:product:cuda-gpus",
    });
    expect(pageContextFromPath("/zh/products/cuda-gpus")).toMatchObject({
      entityType: "product",
      entityId: "techco:product:cuda-gpus",
    });
  });

  test("builds a page config with measurement id and html lang", () => {
    const product = analyticsPageConfig("zht", "/products/cuda-gpus");
    expect(product.measurementId).toBe(GA_MEASUREMENT_ID);
    expect(product.publicLocale).toBe("zh-hant");
    expect(product.htmlLang).toBe("zh-Hant");
    expect(product.entityType).toBe("product");
    expect(entityIdFor("product", "cuda-gpus")).toBe("techco:product:cuda-gpus");
  });
});

describe("href classification", () => {
  test("detects machine surfaces and catalog links", () => {
    expect(classifyHref("/companies/nvidia.md")).toMatchObject({
      kind: "machine",
      surface: "markdown",
      fileExtension: "md",
    });
    expect(classifyHref("/zh/products/cuda-gpus.md")).toMatchObject({ surface: "markdown" });
    expect(classifyHref("/api/v1/products/cuda-gpus.json")).toMatchObject({
      kind: "machine",
      surface: "api",
      fileExtension: "json",
    });
    expect(classifyHref("/api/v1/openapi.json")).toMatchObject({ surface: "openapi" });
    expect(classifyHref("/llms.txt")).toMatchObject({ surface: "llms" });
    expect(classifyHref("/zh-hant/llms-full.txt")).toMatchObject({ surface: "llms" });
    expect(classifyHref("/feed.xml")).toMatchObject({ surface: "feed" });
    expect(classifyHref("https://github.com/wulaosiji/techcowiki")).toMatchObject({
      kind: "machine",
      surface: "github",
      outbound: true,
    });
    expect(classifyHref("/products/cuda-gpus")).toEqual({
      kind: "catalog_entity",
      outbound: false,
      entityType: "product",
      entitySlug: "cuda-gpus",
      entityId: "techco:product:cuda-gpus",
    });
    expect(classifyHref("/zh/companies/nvidia")).toMatchObject({
      kind: "catalog_entity",
      entityType: "company",
      entitySlug: "nvidia",
    });
    expect(classifyHref("/people/jensen-huang")).toMatchObject({
      entityType: "person",
      entityId: "techco:person:jensen-huang",
    });
    expect(classifyHref("/sectors/semiconductors")).toMatchObject({
      kind: "catalog_hub",
      hubKind: "sector",
      hubSlug: "semiconductors",
    });
    expect(classifyHref("/products")).toMatchObject({ kind: "catalog_index", catalogKind: "products" });
    expect(classifyHref("https://en.wikipedia.org/wiki/NVIDIA")).toMatchObject({
      kind: "outbound",
      outbound: true,
      outboundKind: "source",
    });
  });

  test("treats same-host preview links as on-site", () => {
    const href = classifyHref("/api/v1/companies/nvidia.json", "https://techcowiki.pages.dev");
    expect(href.outbound).toBe(false);
    expect(href.surface).toBe("api");
  });
});

describe("public-host gate and CSP", () => {
  test("loads only on the public site hosts", () => {
    expect(isPublicAnalyticsHost("techco.wiki")).toBe(true);
    expect(isPublicAnalyticsHost("www.techco.wiki")).toBe(true);
    expect(isPublicAnalyticsHost("techcowiki.pages.dev")).toBe(true);
    expect(isPublicAnalyticsHost("abc.techcowiki.pages.dev")).toBe(true);
    expect(isPublicAnalyticsHost("localhost")).toBe(false);
    expect(isPublicAnalyticsHost("127.0.0.1")).toBe(false);
    expect(isPublicAnalyticsHost("example.com")).toBe(false);
  });

  test("CSP lists gtag hosts and keeps fonts", () => {
    const csp = analyticsContentSecurityPolicy();
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://*.google-analytics.com");
    expect(csp).toContain("https://fonts.googleapis.com");
    expect(read("public/_headers")).toContain("Content-Security-Policy:");
    expect(read("public/_headers")).toContain("https://www.googletagmanager.com");
  });

  test("clips long search terms", () => {
    expect(clipParam("TSM")).toBe("TSM");
    expect(clipParam("x".repeat(120)).length).toBe(100);
  });
});

describe("source contracts stay file-based", () => {
  test("layout boots analytics without a static gtag src", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    const client = read("src/lib/analytics-client.ts");
    const search = read("src/views/SearchPage.astro");
    const card = read("src/components/EntityCard.astro");
    const lib = read("src/lib/analytics.ts");
    expect(lib).not.toMatch(/from ["'].*catalog/);
    expect(lib).toContain(GA_MEASUREMENT_ID);
    expect(layout).toContain("bootSiteAnalytics");
    expect(layout).toContain("ANALYTICS_CONFIG_ELEMENT_ID");
    expect(layout).not.toMatch(/src="https:\/\/www\.googletagmanager\.com/);
    expect(client).toContain("isPublicAnalyticsHost");
    expect(client).toContain("AnalyticsEvent.entityView");
    expect(client).toContain("AnalyticsEvent.viewSearchResults");
    expect(search).toContain("SEARCH_RESULTS_EVENT");
    expect(search).toContain("product_count");
    expect(card).toContain("data-entity-type");
    expect(card).toContain("data-entity-id");
  });
});
