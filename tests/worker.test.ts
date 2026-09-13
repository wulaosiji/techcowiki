import { describe, expect, test, vi } from "vitest";
import worker from "../public/_worker.js";

function assets(status = 404) {
  return { ASSETS: { fetch: vi.fn(async (input: Request) => {
    const url = new URL(input.url);
    if (url.pathname === "/zh/404/") return new Response(input.method === "HEAD" ? null : "未找到", {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" },
    });
    return new Response(input.method === "HEAD" ? null : "original", { status });
  }) } };
}

describe("Pages localized 404", () => {
  test("fetches the clean fallback URL and preserves a real 404", async () => {
    const env = assets();
    const response = await worker.fetch(new Request("https://example.com/zh/missing?q=test", {
      headers: { "If-None-Match": "old" },
    }), env);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("未找到");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    const fallback = env.ASSETS.fetch.mock.calls[1][0];
    expect(fallback.url).toBe("https://example.com/zh/404/");
    expect(fallback.headers.has("If-None-Match")).toBe(false);
  });
  test("HEAD responses have no body", async () => {
    const env = assets();
    const response = await worker.fetch(new Request("https://example.com/zh/missing", { method: "HEAD" }), env);
    expect(response.status).toBe(404);
    expect(response.body).toBeNull();
    expect(env.ASSETS.fetch.mock.calls[1][0].method).toBe("HEAD");
  });
  test.each(["/missing", "/zhang/missing"])("leaves other locales alone: %s", async (path) => {
    const env = assets();
    expect(await (await worker.fetch(new Request(`https://example.com${path}`), env)).text()).toBe("original");
    expect(env.ASSETS.fetch).toHaveBeenCalledTimes(1);
  });
  test("preserves successful assets and non-read requests", async () => {
    for (const [status, method] of [[200, "GET"], [404, "POST"]] as const) {
      const env = assets(status);
      const response = await worker.fetch(new Request("https://example.com/zh/missing", { method }), env);
      expect(response.status).toBe(status);
      expect(env.ASSETS.fetch).toHaveBeenCalledTimes(1);
    }
  });
  test("keeps the original response if the fallback is unavailable", async () => {
    const env = { ASSETS: { fetch: vi.fn(async () => new Response("original", { status: 404 })) } };
    expect(await (await worker.fetch(new Request("https://example.com/zh/missing"), env)).text()).toBe("original");
  });
});
