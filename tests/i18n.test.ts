import { describe, expect, test } from "vitest";
import { GET as sitemapGet } from "../src/pages/sitemap.xml";
import { GET as openapiGet } from "../src/pages/api/v1/openapi.json";
import { GET as graphGet } from "../src/pages/api/v1/graph.json";
import { appendSearch, markdownPath, markdownUrl, switchLocale, switchToLocale } from "../src/lib/i18n";
import { toTraditional } from "../src/lib/traditional";
import { llmsFullTxt } from "../src/lib/llms";

describe("locale and machine contracts", () => {
  test("language switch keeps search query and filters", () => {
    expect(switchLocale("en", "/search", "?q=TSM&sector=semiconductors")).toBe(
      "/zh/search?q=TSM&sector=semiconductors",
    );
    expect(switchLocale("zh", "/search", "?q=台积电")).toBe("/search?q=台积电");
    expect(switchLocale("en", "/companies/nvidia")).toBe("/zh/companies/nvidia");
    expect(switchToLocale("zht", "/search", "?q=TSM")).toBe("/zh-hant/search?q=TSM");
    expect(switchToLocale("en", "/zh-hant/companies/nvidia")).toBe("/companies/nvidia");
    expect(appendSearch("/zh/search", "?q=TSM")).toBe("/zh/search?q=TSM");
    expect(appendSearch("/zh/search?q=TSM", "?q=TSM")).toBe("/zh/search?q=TSM");
    expect(appendSearch("/zh/search", "")).toBe("/zh/search");
  });

  test("markdown twins keep a same-origin path and a canonical URL", () => {
    expect(markdownPath("en", "/companies/nvidia")).toBe("/companies/nvidia.md");
    expect(markdownPath("zh", "/companies/nvidia")).toBe("/zh/companies/nvidia.md");
    expect(markdownPath("zht", "/companies/nvidia")).toBe("/zh-hant/companies/nvidia.md");
    expect(markdownPath("zh", "/")).toBe("/zh/index.md");
    expect(markdownPath("zht", "/")).toBe("/zh-hant/index.md");
    expect(markdownUrl("zh", "/companies/nvidia")).toBe("https://techco.wiki/zh/companies/nvidia.md");
    expect(markdownUrl("zht", "/companies/nvidia")).toBe("https://techco.wiki/zh-hant/companies/nvidia.md");
  });

  test("Chinese llms-full dump is a complete parallel text", () => {
    const text = llmsFullTxt("zh");
    expect(text).toContain("字节跳动");
    expect(text).toContain("techco:company:deepseek");
    expect(text.length).toBeGreaterThan(8000);
  });

  test("Traditional Chinese llms-full dump converts source Simplified text", () => {
    expect(toTraditional("英伟达")).toBe("英偉達");
    expect(toTraditional("台积电")).toBe("臺積電");
    const text = llmsFullTxt("zht");
    expect(text).toContain("字節跳動");
    expect(text).toContain("techco:company:deepseek");
    expect(text.length).toBeGreaterThan(8000);
  });

  test("sitemap lists entity JSON and Chinese full dump", async () => {
    const text = await (await sitemapGet({} as never)).text();
    expect(text).toContain("https://techco.wiki/api/v1/companies/nvidia.json");
    expect(text).toContain("https://techco.wiki/api/v1/people/jensen-huang.json");
    expect(text).toContain("https://techco.wiki/zh/llms-full.txt");
    expect(text).toContain("https://techco.wiki/zh-hant/llms-full.txt");
    expect(text).toContain("https://techco.wiki/search.md");
  });

  test("OpenAPI 1.2 documents bilingual markdown and secondary listings", async () => {
    const spec = (await (await openapiGet({} as never)).json()) as {
      info: { version: string };
      components: { schemas: { CompanyRecord: { properties: { urls: { properties: Record<string, unknown> } } } } };
    };
    expect(spec.info.version).toBe("1.4.0");
    expect(spec.components.schemas.CompanyRecord.properties.urls.properties.markdownZh).toBeTruthy();
    expect(spec.components.schemas.CompanyRecord.properties.urls.properties.markdownZht).toBeTruthy();
  });

  test("graph nodes expose English, Simplified, and Traditional names", async () => {
    const graph = (await (await graphGet({} as never)).json()) as {
      nodes: { type: string; name: { en?: string; zh?: string; zht?: string } }[];
    };
    const nvidia = graph.nodes.find((node) => node.type === "company" && node.name.en === "NVIDIA");
    expect(nvidia?.name.zh).toBeTruthy();
    expect(nvidia?.name.zht).toBe("英偉達");
  });
});
