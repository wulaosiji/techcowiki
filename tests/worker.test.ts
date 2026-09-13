import { describe, expect, test, vi } from "vitest";
import worker from "../public/_worker.js";

function assets(status = 404) {
  return { ASSETS: { fetch: vi.fn(async (input: Request) => {
    const url = new URL(input.url);
    if (url.pathname === "/zh/404/" || url.pathname === "/zh-hant/404/") return new Response(input.method === "HEAD" ? null : "未找到", {
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
  test("serves Traditional Chinese 404 for /zh-hant missing URLs", async () => {
    const env = assets();
    const response = await worker.fetch(new Request("https://example.com/zh-hant/missing"), env);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("未找到");
    expect(env.ASSETS.fetch.mock.calls[1][0].url).toBe("https://example.com/zh-hant/404/");
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

describe("pages.dev host-gated noindex", () => {
  test("does not add a demo noindex header on production or other hosts", async () => {
    for (const host of ["techco.wiki", "www.techco.wiki", "example.com", "127.0.0.1"]) {
      const env = assets(200);
      const response = await worker.fetch(new Request(`https://${host}/`), env);
      expect(response.status).toBe(200);
      expect(response.headers.get("x-robots-tag")).toBeNull();
      expect(await response.text()).toBe("original");
    }
  });

  test("adds X-Robots-Tag on pages.dev and preview aliases", async () => {
    for (const host of ["techcowiki.pages.dev", "abc.techcowiki.pages.dev"]) {
      const env = assets(200);
      const response = await worker.fetch(new Request(`https://${host}/companies/nvidia/`), env);
      expect(response.status).toBe(200);
      expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
      expect(await response.text()).toBe("original");
    }
  });

  test("does not treat lookalike hosts as pages.dev", async () => {
    const env = assets(200);
    const response = await worker.fetch(new Request("https://notpages.dev/"), env);
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });

  test("serves a Disallow robots.txt on pages.dev without touching the built file", async () => {
    const env = {
      ASSETS: { fetch: vi.fn(async () => new Response("User-agent: *\nAllow: /\n", { status: 200 })) },
    };
    const response = await worker.fetch(new Request("https://techcowiki.pages.dev/robots.txt"), env);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("User-agent: *\nDisallow: /\n");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(response.headers.get("content-type")).toMatch(/text\/plain/);
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });

  test("HEAD robots.txt on pages.dev has no body", async () => {
    const env = assets(200);
    const response = await worker.fetch(new Request("https://preview.techcowiki.pages.dev/robots.txt", { method: "HEAD" }), env);
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });

  test("passes production robots.txt through to the built Allow file", async () => {
    const env = {
      ASSETS: { fetch: vi.fn(async () => new Response("User-agent: *\nAllow: /\n", { status: 200 })) },
    };
    const response = await worker.fetch(new Request("https://techco.wiki/robots.txt"), env);
    expect(await response.text()).toBe("User-agent: *\nAllow: /\n");
    expect(response.headers.get("x-robots-tag")).toBeNull();
    expect(env.ASSETS.fetch).toHaveBeenCalledTimes(1);
  });

  test("keeps localized 404s on pages.dev and upgrades the robots tag", async () => {
    const env = assets();
    const response = await worker.fetch(new Request("https://techcowiki.pages.dev/zh/missing"), env);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("未找到");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(env.ASSETS.fetch.mock.calls[1][0].url).toBe("https://techcowiki.pages.dev/zh/404/");
  });

  test("does not require a password on pages.dev", async () => {
    const env = assets(200);
    const response = await worker.fetch(new Request("https://techcowiki.pages.dev/"), env);
    expect(response.status).toBe(200);
    expect(response.headers.get("www-authenticate")).toBeNull();
  });
});

