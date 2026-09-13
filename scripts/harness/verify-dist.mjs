#!/usr/bin/env node
import { join } from "node:path";
import { existsSync } from "node:fs";
import { check, contracts, distRoot, mustExist, read } from "./lib.mjs";

const dist = distRoot();
if (!existsSync(dist)) {
  console.error("dist/ is missing. Run npm run build first.");
  process.exit(1);
}

const file = (rel) => join(dist, rel);

mustExist(file("_worker.js"));
mustExist(file("zh/404/index.html"));
mustExist(file("zh-hant/404/index.html"));
mustExist(file("404.html"));
mustExist(file("api/v1/openapi.json"));
mustExist(file("companies.md"));
mustExist(file("zh/companies.md"));
mustExist(file("zh-hant/companies.md"));
mustExist(file("products.md"));
mustExist(file("zh/products.md"));
mustExist(file("zh-hant/products.md"));

const worker = read(file("_worker.js"));
check("worker serves zh 404 file", worker.includes("/zh/404/index.html"));
check("worker returns HTTP 404", worker.includes("status: 404") || worker.includes("status:404"));

const openapi = JSON.parse(read(file("api/v1/openapi.json")));
check("openapi path is versioned", openapi.info?.version?.startsWith("1."));
check("openapi is 1.5", openapi.info?.version === "1.5.0");
check("openapi has markdownZh", Boolean(openapi.components?.schemas?.CompanyRecord?.properties?.urls?.properties?.markdownZh));
check("openapi documents products", Boolean(openapi.paths?.["/api/v1/products.json"]));

contracts.home(read(file("index.html")));
contracts.nvidia(read(file("companies/nvidia/index.html")));
contracts.tsmc(read(file("companies/tsmc/index.html")));
contracts.zhNvidia(read(file("zh/companies/nvidia/index.html")));
contracts.zhtNvidia(read(file("zh-hant/companies/nvidia/index.html")));
contracts.search(read(file("search/index.html")));
contracts.zh404(read(file("zh/404/index.html")));
contracts.zht404(read(file("zh-hant/404/index.html")));
contracts.en404(read(file("404.html")));

const cuda = read(file("products/cuda-gpus/index.html"));
check("product page has GA4 entity id", cuda.includes("techco:product:cuda-gpus"));
check("product page type is entity", cuda.includes('data-page-type="entity"'));
check("product page locale is en", cuda.includes('data-site-locale="en"'));

console.log("\ndist harness passed");
