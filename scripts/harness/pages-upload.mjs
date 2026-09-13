#!/usr/bin/env node
/**
 * Upload hashed static assets to Cloudflare Pages Direct Upload.
 * Does not create a deployment — JWT cannot call that API.
 *
 *   CF_PAGES_UPLOAD_JWT=... node scripts/harness/pages-upload.mjs
 *
 * Then POST a multipart deployment with manifest + _headers + _redirects + _worker.js.
 * See AGENTS.md.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const DIST = process.argv[2] || join(process.cwd(), "dist");
const JWT = process.env.CF_PAGES_UPLOAD_JWT;
const API = "https://api.cloudflare.com/client/v4";
const IGNORE = new Set(["_headers", "_redirects", "_routes.json", "_worker.js"]);

if (!JWT) {
  console.error("CF_PAGES_UPLOAD_JWT is required. Do not commit or print the token.");
  process.exit(1);
}

let blake3;
let bytesToHex;
let mimeLookup;
try {
  ({ blake3 } = await import("@noble/hashes/blake3.js"));
  ({ bytesToHex } = await import("@noble/hashes/utils.js"));
  ({ lookup: mimeLookup } = await import("mime-types"));
} catch {
  console.error("Install upload extras once: npm i -D @noble/hashes mime-types");
  process.exit(1);
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(DIST, full).split("\\").join("/");
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "functions" && dir === DIST) continue;
      walk(full, files);
    } else if (!IGNORE.has(rel) && !name.startsWith(".DS_Store")) {
      files.push({ full, rel });
    }
  }
  return files;
}

function hashFile(filepath) {
  const base64Contents = readFileSync(filepath).toString("base64");
  const extension = extname(filepath).substring(1);
  return bytesToHex(blake3(new TextEncoder().encode(base64Contents + extension))).slice(0, 32);
}

async function cf(path, { method = "POST", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${JWT}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(`${path} ${res.status}: ${JSON.stringify(json.errors || json)}`);
  }
  return json.result;
}

const files = walk(DIST).map((f) => ({
  ...f,
  hash: hashFile(f.full),
  contentType: mimeLookup(f.rel) || "application/octet-stream",
}));
const hashes = files.map((f) => f.hash);
const missing = await cf("/pages/assets/check-missing", { body: { hashes } });
const missingSet = new Set(missing);
const toUpload = files.filter((f) => missingSet.has(f.hash));
console.log(JSON.stringify({ total: files.length, missing: toUpload.length }));

const BATCH = 20;
for (let i = 0; i < toUpload.length; i += BATCH) {
  const batch = toUpload.slice(i, i + BATCH);
  await cf("/pages/assets/upload", {
    body: batch.map((f) => ({
      key: f.hash,
      value: readFileSync(f.full).toString("base64"),
      metadata: { contentType: f.contentType },
      base64: true,
    })),
  });
  console.log(`uploaded ${Math.min(i + BATCH, toUpload.length)}/${toUpload.length}`);
}

await cf("/pages/assets/upsert-hashes", { body: { hashes } });
const manifest = Object.fromEntries(files.map((f) => [`/${f.rel}`, f.hash]));
writeFileSync("/tmp/pages-manifest.json", JSON.stringify(manifest));
console.log("wrote /tmp/pages-manifest.json", Object.keys(manifest).length);
console.log("Next: create a Pages deployment with manifest, _headers, _redirects, _worker.js. JWT cannot do that.");
