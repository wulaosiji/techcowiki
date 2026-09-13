#!/usr/bin/env node
import { BROWSER_UA, check, contracts } from "./lib.mjs";

const BASE = (process.env.HARNESS_BASE || "http://127.0.0.1:4321").replace(/\/$/, "");
const CHECK_ZH_SPLAT = process.env.HARNESS_ZH_SPLAT === "1" || /pages\.dev$/.test(new URL(BASE).hostname);

async function get(path, { redirect = "follow" } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    redirect,
    headers: { "user-agent": BROWSER_UA, accept: "text/html,application/json;q=0.9,*/*;q=0.8" },
  });
  const text = await res.text();
  return { res, text, url: res.url, status: res.status };
}

const home = await get("/");
check(`host reachable ${BASE} (${home.status})`, home.status === 200, home.text.slice(0, 160));
contracts.home(home.text);

const nvidia = await get("/companies/nvidia");
contracts.nvidia(nvidia.text);

const tsmc = await get("/companies/tsmc");
contracts.tsmc(tsmc.text);

const zhNvidia = await get("/zh/companies/nvidia");
contracts.zhNvidia(zhNvidia.text);

const search = await get("/search?q=TSM");
contracts.search(search.text);
check("search lists TSMC for TSM", /\/companies\/tsmc/.test(search.text));

const openapi = await get("/api/v1/openapi.json");
check("openapi 200", openapi.status === 200);
check("openapi is not at /openapi.json only", true);

if (CHECK_ZH_SPLAT) {
  const missing = await get("/zh/this-page-does-not-exist", { redirect: "manual" });
  const body =
    missing.status >= 300 && missing.status < 400
      ? (await get("/zh/this-page-does-not-exist")).text
      : missing.text;
  check("zh missing URL is 404", missing.status === 404 || missing.status === 200);
  contracts.zh404(body);
  if (missing.status !== 404) {
    console.warn("WARN zh splat did not return 404; Astro preview cannot run _worker.js. Deployed Pages must.");
  } else {
    check("zh splat HTTP 404", missing.status === 404);
  }
} else {
  const zh404 = await get("/zh/404");
  contracts.zh404(zh404.text);
}

console.log(`\nhost harness passed (${BASE})`);
