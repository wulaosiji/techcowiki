import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("Cloudflare Pages locale 404", () => {
  test("zh splat points at the built Chinese 404 file", () => {
    const redirects = readFileSync("public/_redirects", "utf8");
    expect(redirects).toContain("/zh/* /zh/404/index.html 404");
  });
});
