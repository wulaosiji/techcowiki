import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("Cloudflare Pages locale 404", () => {
  test("a Pages worker serves the Chinese 404 for missing /zh URLs", () => {
    const worker = readFileSync("public/_worker.js", "utf8");
    expect(worker).toContain("/zh/404/index.html");
    expect(worker).toContain("status: 404");
  });
});
