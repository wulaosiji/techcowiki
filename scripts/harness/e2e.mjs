#!/usr/bin/env node
/** Browser gate: missing dependencies fail instead of silently passing. */
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { access } from "node:fs/promises";

const BASE = (process.env.E2E_BASE || "http://127.0.0.1:4321").replace(/\/$/, "");
const OUT = process.env.E2E_OUT || "/tmp/techcowiki-e2e.json";
const SCREEN_DIR = process.env.E2E_SCREEN_DIR || "/tmp/techcowiki-e2e";
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}/Google/Chrome/Application/chrome.exe`,
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

async function loadPuppeteer() {
  try {
    return await import("puppeteer-core");
  } catch {
    try {
      const require = createRequire(import.meta.url);
      return { default: require("puppeteer-core") };
    } catch {
      return null;
    }
  }
}

async function findChrome() {
  for (const bin of CHROME_CANDIDATES) {
    try {
      await access(bin);
      return bin;
    } catch {
      /* next */
    }
  }
  return null;
}

const puppeteerMod = await loadPuppeteer();
const executablePath = await findChrome();
if (!puppeteerMod?.default || !executablePath) {
  console.error("Chrome and puppeteer-core are required. Run npm ci and set CHROME_PATH to your browser executable.");
  process.exit(1);
}

mkdirSync(SCREEN_DIR, { recursive: true });
const puppeteer = puppeteerMod.default;
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,1100"],
  defaultViewport: { width: 1440, height: 1100 },
});

const results = [];

async function check(name, fn) {
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  // Third-party fonts must not determine whether local behavior is correct.
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(BASE).origin) request.abort();
    else request.continue();
  });
  const item = { name, ok: false };
  try {
    Object.assign(item, await fn(page));
    if (item.ok === undefined) item.ok = true;
    if (pageErrors.length) { item.ok = false; item.pageErrors = pageErrors; }
  } catch (error) {
    item.ok = false;
    item.error = error.message;
  } finally {
    await page.close().catch(() => {});
    results.push(item);
    console.log(`${item.ok ? "PASS" : "FAIL"} ${name}${item.error ? ` — ${item.error}` : ""}`);
  }
}

await check("home-branding-and-machine-box", async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => {
    const nav = [...document.querySelectorAll("nav a, .nav a")].map((a) => a.textContent.trim());
    const html = document.documentElement.outerHTML;
    return {
      title: document.title,
      hasRegions: nav.some((t) => /regions|地区/i.test(t)),
      hasCities: nav.some((t) => /cities|城市/i.test(t)),
      hasZhLlms: html.includes("/zh/llms-full.txt"),
      hasGraph: html.includes("graph.json"),
      hasSearchMd: html.includes("/search.md"),
    };
  });
  await page.screenshot({ path: `${SCREEN_DIR}/home.png` });
  return {
    ok: data.title.includes("TechCo.Wiki") && data.hasRegions && data.hasCities && data.hasZhLlms && data.hasGraph && data.hasSearchMd,
    ...data,
  };
});

await check("nvidia-identity-and-links", async (page) => {
  await page.goto(`${BASE}/companies/nvidia`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => {
    const html = document.body.innerText;
    const hrefs = [...document.querySelectorAll("a")].map((a) => a.getAttribute("href") || "");
    return {
      legal: html.includes("Legal name") && /NVIDIA Corporation/i.test(html),
      jensen: hrefs.some((h) => h.includes("/people/jensen-huang")),
      city: hrefs.some((h) => /\/cities\/santa-clara/.test(h)),
      country: hrefs.some((h) => /\/countries\/us/.test(h)),
      md: hrefs.includes("/companies/nvidia.md"),
      chinaHq: /China-headquartered/.test(html),
    };
  });
  await page.screenshot({ path: `${SCREEN_DIR}/nvidia.png` });
  return { ok: data.legal && data.jensen && data.city && data.country && data.md && !data.chinaHq, ...data };
});

await check("tsmc-listing-and-taiwan", async (page) => {
  await page.goto(`${BASE}/companies/tsmc`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasTwse: /TWSE:\s*2330/.test(text) && /NYSE:\s*TSM|ADR NYSE:TSM/.test(text),
      taiwan: /Taiwan/i.test(text),
      chinaHq: /China-headquartered/.test(text),
    };
  });
  await page.screenshot({ path: `${SCREEN_DIR}/tsmc.png` });
  return { ok: data.hasTwse && data.taiwan && !data.chinaHq, ...data };
});

await check("header-search-tsm-then-zh-keeps-query", async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const input = await page.waitForSelector('form.nav-search input[name="q"], .nav-search input[name="q"]');
  await input.click({ clickCount: 3 });
  await input.type("TSM", { delay: 20 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.$eval("form.nav-search", (f) => (f.requestSubmit ? f.requestSubmit() : f.submit())),
  ]);
  const afterSearch = page.url();
  const searchPage = await page.evaluate(() => ({
    hasTsmc: /TSMC|台积电|Taiwan Semiconductor/i.test(document.body.innerText),
  }));
  const zh = await page.$("a.lang-switch");
  if (!zh) throw new Error("zh switch not found");
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), zh.click()]);
  const afterZh = page.url();
  const zhPage = await page.evaluate(() => ({
    hasTsmc: /台积电|TSMC|台湾积体电路/i.test(document.body.innerText),
  }));
  await page.screenshot({ path: `${SCREEN_DIR}/search-zh-tsm.png` });
  return {
    ok: /[?&]q=TSM/i.test(afterSearch) && searchPage.hasTsmc && /[?&]q=TSM/i.test(afterZh) && zhPage.hasTsmc,
    afterSearch,
    afterZh,
    searchPage,
    zhPage,
  };
});

await check("zh-nvidia-markdown-twin", async (page) => {
  await page.goto(`${BASE}/zh/companies/nvidia`, { waitUntil: "domcontentloaded" });
  const md = await page.evaluate(() =>
    [...document.querySelectorAll("a")].some((a) => (a.getAttribute("href") || "") === "/zh/companies/nvidia.md"),
  );
  return { ok: md };
});

await check("search-tiktok-bytedance", async (page) => {
  await page.goto(`${BASE}/search?q=TikTok`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => ({
    hasByte: /ByteDance|字节跳动/.test(document.body.innerText),
    href: [...document.querySelectorAll("a")].some((a) => (a.getAttribute("href") || "").includes("/companies/bytedance")),
  }));
  return { ok: data.hasByte && data.href, ...data };
});

await check("inclusion-rules", async (page) => {
  await page.goto(`${BASE}/inclusion`, { waitUntil: "domcontentloaded" });
  const h1 = await page.$eval("h1", (el) => el.textContent.trim());
  return { ok: /Inclusion rules/i.test(h1), h1 };
});

await check("jensen-breadcrumb-geo", async (page) => {
  await page.goto(`${BASE}/people/jensen-huang`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => {
    const crumbs = [...document.querySelectorAll(".breadcrumbs a, nav.breadcrumbs a")].map((a) => `${a.textContent} ${a.getAttribute("href")}`);
    return {
      hasUs: crumbs.some((c) => /United States|\/countries\/us/.test(c)),
      hasCity: crumbs.some((c) => /Santa Clara|\/cities\/santa-clara/.test(c)),
    };
  });
  return { ok: data.hasUs && data.hasCity, ...data };
});

await check("404-en-and-zh", async (page) => {
  const en = await page.goto(`${BASE}/this-page-does-not-exist`, { waitUntil: "domcontentloaded" });
  const enTitle = await page.title();
  const zh = await page.goto(`${BASE}/zh/404`, { waitUntil: "domcontentloaded" });
  const zhTitle = await page.title();
  await page.goto(`${BASE}/zh-hant/404`, { waitUntil: "domcontentloaded" });
  const zhtTitle = await page.title();
  const zhtLang = await page.$eval("html", (el) => el.lang);
  return {
    ok: en.status() === 404 && /not found/i.test(enTitle) && /未找到/.test(zhTitle) && /未找到/.test(zhtTitle) && zhtLang === "zh-Hant",
    enStatus: en.status(),
    zhStatus: zh.status(),
    enTitle,
    zhTitle,
    zhtTitle,
    zhtLang,
  };
});

await check("search-whitespace-exact-filters-and-empty-state", async (page) => {
  await page.goto(`${BASE}/search`, { waitUntil: "domcontentloaded" });
  await page.type("#q", " ＴＳＭ ");
  await page.select("#sector", "semiconductors");
  await page.select("#region", "greater-china");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("form.search-form button[type=submit]"),
  ]);
  await page.waitForFunction(() => document.querySelector("#result-count")?.textContent);
  const matched = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".entity:not([hidden])")];
    return {
      tsmc: cards.some((node) => node.querySelector('.card-main[href="/companies/tsmc"]')),
      exact: cards.every((node) => node.dataset.sector.split(" ").includes("semiconductors") && node.dataset.region.split(" ").includes("greater-china")),
    };
  });
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("a.lang-switch")]);
  const switched = new URL(page.url());
  await page.goto(`${BASE}/search?q=no-such-entity-9z4x`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#result-count")?.textContent);
  const empty = await page.evaluate(() => !document.querySelector("#empty").hidden && document.querySelectorAll(".entity:not([hidden])").length === 0);
  await page.goto(`${BASE}/search?sector=semi&region=america`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#result-count")?.textContent);
  const invalid = await page.evaluate(() => document.querySelectorAll(".entity:not([hidden])").length === 200 && document.querySelector("#sector").value === "");
  return { ok: matched.tsmc && matched.exact && empty && invalid && switched.pathname.startsWith("/zh/search") && switched.searchParams.get("sector") === "semiconductors" && switched.searchParams.get("region") === "greater-china", matched, empty, invalid };
});

await check("traditional-chinese-page-and-search", async (page) => {
  await page.goto(`${BASE}/zh-hant/companies/nvidia`, { waitUntil: "domcontentloaded" });
  const heading = await page.$eval("h1", (el) => el.textContent ?? "");
  const markdown = await page.$('a[href="/zh-hant/companies/nvidia.md"]');
  await page.goto(`${BASE}/zh-hant/search?q=${encodeURIComponent("台積電")}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#result-count")?.textContent);
  const tsmc = await page.evaluate(() =>
    [...document.querySelectorAll(".entity:not([hidden])")].some((node) =>
      node.querySelector('.card-main[href="/zh-hant/companies/tsmc"]'),
    ),
  );
  return { ok: heading.includes("英偉達") && Boolean(markdown) && tsmc, heading, tsmc };
});

await check("machine-links-are-clickable-on-preview", async (page) => {
  await page.goto(`${BASE}/companies/nvidia`, { waitUntil: "domcontentloaded" });
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('a[href="/companies/nvidia.md"]')]);
  const markdown = new URL(page.url()).origin === new URL(BASE).origin && (await page.$eval("body", (el) => el.textContent)).includes("# NVIDIA");
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('a[href="/llms.txt"]')]);
  return { ok: markdown && new URL(page.url()).origin === new URL(BASE).origin && (await page.$eval("body", (el) => el.textContent)).includes("# TechCo.Wiki") };
});

await check("mobile-layout-and-control-labels", async (page) => {
  await page.setViewport({ width: 320, height: 740 });
  const failures = [];
  for (const path of ["/", "/companies", "/companies/nvidia", "/people/jensen-huang", "/search?q=TSM", "/zh/search", "/zh/countries/tw", "/zh-hant/search"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    const issues = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      unnamed: [...document.querySelectorAll("input, select")].some((el) => !el.getAttribute("aria-label") && !el.labels?.length),
    }));
    if (issues.overflow || issues.unnamed) failures.push({ path, ...issues });
  }
  await page.screenshot({ path: `${SCREEN_DIR}/mobile.png` });
  return { ok: failures.length === 0, failures };
});

await check("catalog-remains-readable-without-javascript", async (page) => {
  await page.setJavaScriptEnabled(false);
  await page.goto(`${BASE}/search?q=TSM`, { waitUntil: "domcontentloaded" });
  return { ok: await page.$$eval(".entity:not([hidden])", (nodes) => nodes.length === 200) };
});

await browser.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exitCode = 1;
