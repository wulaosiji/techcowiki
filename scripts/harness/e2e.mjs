#!/usr/bin/env node
/**
 * Browser gate. Requires a local Chrome and puppeteer-core
 * (`npm i -D puppeteer-core` or a sibling install). Exits 0 with a skip
 * message when the browser stack is missing — CI stays green; humans/agents
 * must still run this before claiming a UI/i18n change works.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { access } from "node:fs/promises";

const BASE = process.env.E2E_BASE || "http://127.0.0.1:4321";
const OUT = process.env.E2E_OUT || "/tmp/techcowiki-e2e.json";
const SCREEN_DIR = process.env.E2E_SCREEN_DIR || "/tmp/techcowiki-e2e";
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
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
  console.log("SKIP e2e: install puppeteer-core and Chrome, then rerun `npm run e2e`.");
  process.exit(0);
}

mkdirSync(SCREEN_DIR, { recursive: true });
const puppeteer = puppeteerMod.default;
const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,1100"],
  defaultViewport: { width: 1440, height: 1100 },
});

const results = [];

async function check(name, fn) {
  const page = await browser.newPage();
  const item = { name, ok: false };
  try {
    Object.assign(item, await fn(page));
    if (item.ok === undefined) item.ok = true;
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
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
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
  await page.goto(`${BASE}/companies/nvidia`, { waitUntil: "networkidle0" });
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
  await page.goto(`${BASE}/companies/tsmc`, { waitUntil: "networkidle0" });
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
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  const input = await page.waitForSelector('form.nav-search input[name="q"], .nav-search input[name="q"]');
  await input.click({ clickCount: 3 });
  await input.type("TSM", { delay: 20 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.$eval("form.nav-search", (f) => (f.requestSubmit ? f.requestSubmit() : f.submit())),
  ]).catch(async () => {
    await input.press("Enter");
    await page.waitForNavigation({ waitUntil: "networkidle0" }).catch(() => {});
  });
  const afterSearch = page.url();
  const searchPage = await page.evaluate(() => ({
    hasTsmc: /TSMC|台积电|Taiwan Semiconductor/i.test(document.body.innerText),
  }));
  const zh = await page.$("a.lang-switch");
  if (!zh) throw new Error("zh switch not found");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), zh.click()]);
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
  await page.goto(`${BASE}/zh/companies/nvidia`, { waitUntil: "networkidle0" });
  const md = await page.evaluate(() =>
    [...document.querySelectorAll("a")].some((a) => (a.getAttribute("href") || "") === "/zh/companies/nvidia.md"),
  );
  return { ok: md };
});

await check("search-tiktok-bytedance", async (page) => {
  await page.goto(`${BASE}/search?q=TikTok`, { waitUntil: "networkidle0" });
  const data = await page.evaluate(() => ({
    hasByte: /ByteDance|字节跳动/.test(document.body.innerText),
    href: [...document.querySelectorAll("a")].some((a) => (a.getAttribute("href") || "").includes("/companies/bytedance")),
  }));
  return { ok: data.hasByte && data.href, ...data };
});

await check("inclusion-rules", async (page) => {
  await page.goto(`${BASE}/inclusion`, { waitUntil: "networkidle0" });
  const h1 = await page.$eval("h1", (el) => el.textContent.trim());
  return { ok: /Inclusion rules/i.test(h1), h1 };
});

await check("jensen-breadcrumb-geo", async (page) => {
  await page.goto(`${BASE}/people/jensen-huang`, { waitUntil: "networkidle0" });
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
  const en = await page.goto(`${BASE}/this-page-does-not-exist`, { waitUntil: "networkidle0" });
  const enTitle = await page.title();
  const zh = await page.goto(`${BASE}/zh/404`, { waitUntil: "networkidle0" });
  const zhTitle = await page.title();
  return {
    ok: /not found/i.test(enTitle) && /未找到/.test(zhTitle),
    enStatus: en.status(),
    zhStatus: zh.status(),
    enTitle,
    zhTitle,
  };
});

await browser.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exitCode = 1;
