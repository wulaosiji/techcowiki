import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { markdownPath, markdownUrl } from "../src/lib/i18n";

const read = (path: string) => readFileSync(path, "utf8");

describe("development harness contracts", () => {
  test("markdown twins split same-origin UI from canonical URLs", () => {
    expect(markdownPath("en", "/companies/nvidia")).toBe("/companies/nvidia.md");
    expect(markdownPath("zh", "/companies/nvidia")).toBe("/zh/companies/nvidia.md");
    expect(markdownPath("zht", "/companies/nvidia")).toBe("/zh-hant/companies/nvidia.md");
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
    expect(home).toContain('href="/zh-hant/search.md"');
    expect(home).not.toContain("${SITE_ORIGIN}/llms.txt");
    expect(company).toContain("markdownPath");
    expect(company).toContain("`/api/v1/companies/${company.slug}.json`");
    expect(home).toContain('href="/api/v1/products.json"');
    expect(home).toContain('href="/products.md"');
    expect(read("src/views/ProductPage.astro")).toContain("markdownPath");
    expect(read("src/views/ProductPage.astro")).toContain("`/api/v1/products/${product.slug}.json`");
    expect(person).toContain("markdownPath");
    expect(layout).toContain('href="/llms.txt"');
    expect(nav).toContain('href: "/llms.txt"');
    expect(nav).toContain('href: "/api/v1/openapi.json"');
  });

  test("search language switch is patched after render", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    expect(layout).toContain("location.search");
    expect(layout).toContain("lang-switch");
    expect(layout).toContain('path === "/search" || path === "/zh/search" || path === "/zh-hant/search"');
  });

  test("Pages worker, not _redirects, owns Chinese 404s", () => {
    const worker = read("public/_worker.js");
    const redirects = read("public/_redirects");
    expect(worker).toContain("/zh/404/index.html");
    expect(worker).toContain("/zh-hant/404/index.html");
    expect(worker).toContain("status: 404");
    expect(worker).toContain("env.ASSETS.fetch");
    expect(redirects).not.toMatch(/\/zh\/\* \/zh\/404 404/);
  });

  test("pages.dev noindex is host-gated in the worker, not in shared HTML", () => {
    const worker = read("public/_worker.js");
    const layout = read("src/layouts/BaseLayout.astro");
    const robots = read("src/pages/robots.txt.ts");
    const headers = read("public/_headers");
    expect(worker).toContain(".pages.dev");
    expect(worker).toContain("noindex, nofollow");
    expect(worker).toContain("Disallow: /");
    expect(worker).not.toMatch(/WWW-Authenticate|Basic realm|123456/);
    expect(layout).toContain('robots ?? "index, follow, max-snippet:-1, max-image-preview:large"');
    expect(robots).toContain("Allow: /");
    expect(robots).not.toContain("Disallow: /");
    expect(headers).not.toMatch(/x-robots-tag/i);
  });


  test("project docs default to English", () => {
    const agents = read("AGENTS.md");
    const review = read("docs/review-2026-09-13.md");
    const rule = read(".cursor/rules/techcowiki-harness.mdc");
    expect(agents).toContain("The project defaults to English");
    expect(agents).not.toMatch(/这是本仓库的开发契约/);
    expect(review).toContain("Full-project technical review");
    expect(review).not.toMatch(/全项目技术审查/);
    expect(rule).toContain("The repository defaults to English");
  });

  test("GA4 is gated to production hosts and includes products", () => {
    const analytics = read("src/lib/analytics.ts");
    const layout = read("src/layouts/BaseLayout.astro");
    const client = read("src/lib/analytics-client.ts");
    expect(analytics).toContain("G-8RYHT0WLHE");
    expect(analytics).toContain('products: "product"');
    expect(analytics).toContain('host.endsWith(".pages.dev")');
    expect(analytics).toContain('host === "techco.wiki"');
    expect(analytics).not.toMatch(/from ["'].*catalog/);
    expect(layout).toContain("bootSiteAnalytics");
    expect(layout).not.toMatch(/src="https:\/\/www\.googletagmanager\.com/);
    expect(client).toContain("isPublicAnalyticsHost");
    expect(read("public/_headers")).toContain("https://www.googletagmanager.com");
  });

  test("OpenAPI is versioned under /api/v1", () => {
    const openapi = read("src/pages/api/v1/openapi.json.ts");
    expect(openapi).toContain("1.5.0");
    expect(read("src/views/HomePage.astro")).toContain("/api/v1/openapi.json");
  });
});
