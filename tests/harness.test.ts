import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { markdownPath, markdownUrl } from "../src/lib/i18n";

const read = (path: string) => readFileSync(path, "utf8");

describe("development harness contracts", () => {
  test("markdown twins split same-origin UI from canonical URLs", () => {
    expect(markdownPath("en", "/companies/nvidia")).toBe("/companies/nvidia.md");
    expect(markdownPath("zh", "/companies/nvidia")).toBe("/zh/companies/nvidia.md");
    expect(markdownUrl("zh", "/companies/nvidia")).toBe("https://techco.wiki/zh/companies/nvidia.md");
  });

  test("clickable machine surfaces stay on the current host", () => {
    const home = read("src/views/HomePage.astro");
    const company = read("src/views/CompanyPage.astro");
    const person = read("src/views/PersonPage.astro");
    const layout = read("src/layouts/BaseLayout.astro");
    const nav = read("src/lib/nav.ts");

    expect(home).toContain('href="/llms.txt"');
    expect(home).toContain('href="/zh/search.md"');
    expect(home).not.toContain("${SITE_ORIGIN}/llms.txt");
    expect(company).toContain("markdownPath");
    expect(company).toContain("`/api/v1/companies/${company.slug}.json`");
    expect(person).toContain("markdownPath");
    expect(layout).toContain('href="/llms.txt"');
    expect(nav).toContain('href: "/llms.txt"');
    expect(nav).toContain('href: "/api/v1/openapi.json"');
  });

  test("search language switch is patched after render", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    expect(layout).toContain("location.search");
    expect(layout).toContain("lang-switch");
    expect(layout).toContain('path === "/search" || path === "/zh/search"');
  });

  test("Pages worker, not _redirects, owns Chinese 404s", () => {
    const worker = read("public/_worker.js");
    const redirects = read("public/_redirects");
    expect(worker).toContain("/zh/404/index.html");
    expect(worker).toContain("status: 404");
    expect(worker).toContain("env.ASSETS.fetch");
    expect(redirects).not.toMatch(/\/zh\/\* \/zh\/404 404/);
  });

  test("OpenAPI is versioned under /api/v1", () => {
    const openapi = read("src/pages/api/v1/openapi.json.ts");
    expect(openapi).toContain("1.2.0");
    expect(read("src/views/HomePage.astro")).toContain("/api/v1/openapi.json");
  });
});
