import { describe, expect, test } from "vitest";
import { GET as sitemapGet } from "../src/pages/sitemap.xml";
import { GET as openapiGet } from "../src/pages/api/v1/openapi.json";
import { GET as graphGet } from "../src/pages/api/v1/graph.json";
import { appendSearch, markdownPath, markdownUrl, switchLocale } from "../src/lib/i18n";
import { llmsFullTxt } from "../src/lib/llms";

describe("locale and machine contracts", () => {
  test("language switch keeps search query and filters", () => {
    expect(switchLocale("en", "/search", "?q=TSM&sector=semiconductors")).toBe(
      "/zh/search?q=TSM&sector=semiconductors",
    );
    expect(switchLocale("zh", "/search", "?q=台积电")).toBe("/search?q=台积电");
    expect(switchLocale("en", "/companies/nvidia")).toBe("/zh/companies/nvidia");
    expect(appendSearch("/zh/search", "?q=TSM")).toBe("/zh/search?q=TSM");
    expect(appendSearch("/zh/search?q=TSM", "?q=TSM")).toBe("/zh/search?q=TSM");
    expect(appendSearch("/zh/search", "")).toBe("/zh/search");
  });

  test("markdown twins keep a same-origin path and a canonical URL", () => {
    expect(markdownPath("en", "/companies/nvidia")).toBe("/companies/nvidia.md");
    expect(markdownPath("zh", "/companies/nvidia")).toBe("/zh/companies/nvidia.md");
    expect(markdownPath("zh", "/")).toBe("/zh/index.md");
    expect(markdownUrl("zh", "/companies/nvidia")).toBe("https://techco.wiki/zh/companies/nvidia.md");
  });

  test("Chinese llms-full dump is a complete parallel text", () => {
    const text = llmsFullTxt("zh");
    expect(text).toContain("字节跳动");
    expect(text).toContain("techco:company:deepseek");
    expect(text.length).toBeGreaterThan(8000);
  });

  test("sitemap lists entity JSON and Chinese full dump", async () => {
    const text = await (await sitemapGet({} as never)).text();
    expect(text).toContain("https://techco.wiki/api/v1/companies/nvidia.json");
    expect(text).toContain("https://techco.wiki/api/v1/people/jensen-huang.json");
    expect(text).toContain("https://techco.wiki/zh/llms-full.txt");
    expect(text).toContain("https://techco.wiki/search.md");
  });

  test("OpenAPI 1.2 documents bilingual markdown and secondary listings", async () => {
    const spec = (await (await openapiGet({} as never)).json()) as {
      info: { version: string };
      components: { schemas: { CompanyRecord: { properties: { urls: { properties: Record<string, unknown> } } } } };
    };
    expect(spec.info.version).toBe("1.2.0");
    expect(spec.components.schemas.CompanyRecord.properties.urls.properties.markdownZh).toBeTruthy();
  });

  test("graph nodes expose bilingual names", async () => {
    const graph = (await (await graphGet({} as never)).json()) as {
      nodes: { type: string; name: { en?: string; zh?: string } }[];
    };
    const nvidia = graph.nodes.find((node) => node.type === "company" && node.name.en === "NVIDIA");
    expect(nvidia?.name.zh).toBeTruthy();
  });
});
