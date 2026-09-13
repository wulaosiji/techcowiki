import { afterEach, describe, expect, test, vi } from "vitest";
import { fetchJson } from "../scripts/lib/fetch-json";

afterEach(() => vi.unstubAllGlobals());
const url = "https://example.com/record.json";

describe("source refresh failures", () => {
  test("keeps a real missing record distinct from an outage", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("missing", { status: 404 })));
    expect(await fetchJson(url)).toBeNull();
  });
  test.each([429, 500, 503])("aborts on HTTP %i instead of deleting cached content", async (status) => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response("outage", { status })));
    await expect(fetchJson(url, { attempts: 2, retryDelayMs: 0 })).rejects.toThrow("refresh aborted");
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  test("retries a transient failure and includes a timeout signal", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("connection reset")).mockResolvedValueOnce(Response.json({ title: "NVIDIA" })));
    expect(await fetchJson(url, { retryDelayMs: 0 })).toEqual({ title: "NVIDIA" });
    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });
  test("does not retry permanent authorization errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("denied", { status: 403 })));
    await expect(fetchJson(url)).rejects.toThrow("HTTP 403");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test("rejects malformed JSON rather than treating it as missing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json")));
    await expect(fetchJson(url, { attempts: 1 })).rejects.toThrow("refresh aborted");
  });
});
