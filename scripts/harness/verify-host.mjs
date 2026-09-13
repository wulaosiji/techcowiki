#!/usr/bin/env node
import { BROWSER_UA, check, contracts } from "./lib.mjs";

const BASE = (process.env.HARNESS_BASE || "http://127.0.0.1:4321").replace(/\/$/, "");
const local = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(BASE).hostname);
const CHECK_ZH_SPLAT = process.env.HARNESS_ZH_SPLAT === "1" || !local;

async function get(path, { redirect = "follow" } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    redirect,
    signal: AbortSignal.timeout(15000),
    headers: { "user-agent": BROWSER_UA, accept: "text/html,application/json;q=0.9,*/*;q=0.8" },
  });
  const text = await res.text();
  return { res, text, url: res.url, status: res.status };
}

const home = await get("/");
check(`host reachable ${BASE} (${home.status})`, home.status === 200, home.text.slice(0, 160));
contracts.home(home.text);

const nvidia = await get("/companies/nvidia");
check("nvidia 200", nvidia.status === 200);
contracts.nvidia(nvidia.text);

const tsmc = await get("/companies/tsmc");
check("tsmc 200", tsmc.status === 200);
contracts.tsmc(tsmc.text);

const zhNvidia = await get("/zh/companies/nvidia");
check("zh nvidia 200", zhNvidia.status === 200);
contracts.zhNvidia(zhNvidia.text);

const zhtNvidia = await get("/zh-hant/companies/nvidia");
check("zht nvidia 200", zhtNvidia.status === 200);
contracts.zhtNvidia(zhtNvidia.text);

const search = await get("/search?q=TSM");
check("search 200", search.status === 200);
contracts.search(search.text);
check("search lists TSMC for TSM", /\/companies\/tsmc/.test(search.text));

const openapi = await get("/api/v1/openapi.json");
check("openapi 200", openapi.status === 200);
check("openapi content type", /application\/json/.test(openapi.res.headers.get("content-type") ?? ""));
check("openapi document", JSON.parse(openapi.text).openapi === "3.1.0");

const enMissing = await get("/this-page-does-not-exist");
check("en missing URL is 404", enMissing.status === 404);
contracts.en404(enMissing.text);

if (CHECK_ZH_SPLAT) {
  const missing = await get("/zh/this-page-does-not-exist");
  check("zh missing URL is 404", missing.status === 404);
  contracts.zh404(missing.text);
  const head = await fetch(`${BASE}/zh/this-page-does-not-exist`, {
    method: "HEAD", signal: AbortSignal.timeout(15000), headers: { "user-agent": BROWSER_UA },
  });
  check("zh missing HEAD is 404 without a body", head.status === 404 && head.body === null);
  const zhtMissing = await get("/zh-hant/this-page-does-not-exist");
  check("zht missing URL is 404", zhtMissing.status === 404);
  contracts.zht404(zhtMissing.text);
} else {
  const zh404 = await get("/zh/404");
  contracts.zh404(zh404.text);
  const zht404 = await get("/zh-hant/404");
  contracts.zht404(zht404.text);
}

console.log(`\nhost harness passed (${BASE})`);
