#!/usr/bin/env node
/** Inspect every built page and machine record, without enriching the catalog again. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { parse } from "parse5";
import { check, distRoot } from "./lib.mjs";

const root = resolve(distRoot());
const origin = "https://techco.wiki";
const files = new Set();
function walk(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.add(full);
  }
}
walk(root);
const read = (path) => readFileSync(path, "utf8");
const json = (path) => JSON.parse(read(join(root, path)));
const errors = [];
const demand = (ok, message) => { if (!ok) errors.push(message); };
const pages = new Map();

for (const file of files) {
  if (!file.endsWith(".html")) continue;
  const name = relative(root, file);
  const page = { ids: new Set(), links: [], headings: 0, canonicals: [] };
  function inspect(node) {
    const attrs = Object.fromEntries((node.attrs ?? []).map((a) => [a.name, a.value]));
    if (attrs.id) {
      demand(!page.ids.has(attrs.id), `${name}: duplicate #${attrs.id}`);
      page.ids.add(attrs.id);
    }
    if (node.tagName === "h1") page.headings++;
    if (attrs.href && ["a", "link"].includes(node.tagName)) page.links.push({ href: attrs.href, anchor: node.tagName === "a" });
    if (attrs.src && ["script", "img"].includes(node.tagName)) page.links.push({ href: attrs.src });
    if (node.tagName === "link" && attrs.rel === "canonical") page.canonicals.push(attrs.href);
    if (node.tagName === "script" && attrs.type === "application/ld+json") {
      const text = (node.childNodes ?? []).map((n) => n.value ?? "").join("");
      try { JSON.parse(text); } catch { errors.push(`${name}: invalid JSON-LD`); }
      demand(!text.includes("<"), `${name}: unsafe JSON-LD script content`);
    }
    for (const child of node.childNodes ?? []) inspect(child);
  }
  inspect(parse(read(file)));
  demand(page.headings === 1, `${name}: expected one h1, found ${page.headings}`);
  demand(page.canonicals.length === 1 && page.canonicals[0].startsWith(origin), `${name}: invalid canonical`);
  pages.set(file, page);
}

function targetFile(path) {
  return [path, `${path}.html`, join(path, "index.html")].find((file) => files.has(file));
}
for (const [file, page] of pages) {
  for (const { href, anchor } of page.links) {
    const base = `${origin}/${relative(root, file).replaceAll("\\", "/")}`;
    const url = new URL(href, base);
    if (url.origin !== origin) continue;
    const target = targetFile(resolve(root, `.${decodeURIComponent(url.pathname)}`));
    demand(Boolean(target), `${relative(root, file)}: missing ${href}`);
    if (anchor && url.hash && target && pages.has(target)) {
      demand(pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1))), `${relative(root, file)}: missing fragment ${href}`);
    }
  }
}

const companies = json("api/v1/companies.json");
const people = json("api/v1/people.json");
const products = json("api/v1/products.json");
demand(companies.length === 100 && people.length === 100, "catalog must contain 100 companies and 100 people");
demand(products.length > 0, "catalog must derive at least one product");
const expectedProducts = companies.reduce((sum, company) => sum + (company.products?.length ?? 0), 0);
demand(products.length === expectedProducts, `product count ${products.length} must match recorded company lines ${expectedProducts}`);
for (const [kind, records] of [["companies", companies], ["people", people], ["products", products]]) {
  for (const record of records) {
    demand(JSON.stringify(json(`api/v1/${kind}/${record.slug}.json`)) === JSON.stringify(record), `${record.id}: list/detail API mismatch`);
    const sourceIds = new Set(record.sources.map((source) => source.id));
    const citations = [record.citations.definition, record.citations.lead, ...[...record.claims, ...record.faq, ...record.sections].map((item) => item.sourceIds)];
    for (const cited of citations) {
      for (const id of [...cited.en, ...cited.zh, ...(cited.zht ?? [])]) demand(sourceIds.has(id), `${record.id}: unresolved source ${id}`);
    }
    for (const url of Object.values(record.urls)) demand(Boolean(targetFile(join(root, new URL(url).pathname))), `${record.id}: missing twin ${url}`);
  }
}

const graph = json("api/v1/graph.json");
const ids = new Set(graph.nodes.map((node) => node.id));
demand(ids.size === graph.nodes.length, "graph has duplicate nodes");
for (const edge of graph.edges) {
  demand(ids.has(edge.from) && ids.has(edge.to), `graph has dangling ${edge.from} -> ${edge.to}`);
  demand(edge.type !== "works-at", "graph asserts employment for a historical association");
}
const urls = [...read(join(root, "sitemap.xml")).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
demand(urls.length === new Set(urls).size, "sitemap has duplicate URLs");
for (const url of urls) demand(Boolean(targetFile(join(root, new URL(url).pathname))), `sitemap points to missing ${url}`);

for (const path of ["search/index.html", "zh/search/index.html", "zh-hant/search/index.html"]) {
  demand(statSync(join(root, path)).size < 2_000_000, `${path}: search payload exceeds 2 MB`);
}
if (errors.length) throw new Error(`${errors.length} site contracts failed:\n${errors.slice(0, 40).join("\n")}`);
check(`${pages.size} HTML pages: links, anchors, headings, canonicals and JSON-LD`, true);
check(`${companies.length + people.length + products.length} records: API twins and per-field citations`, true);
check(`${graph.nodes.length} graph nodes and ${urls.length} sitemap URLs`, true);
check("search payload budget", true);
