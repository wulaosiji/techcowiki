import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36";

export function distRoot(cwd = process.cwd()) {
  return process.env.DIST ? process.env.DIST : join(cwd, "dist");
}

export function read(path) {
  return readFileSync(path, "utf8");
}

export function mustExist(path) {
  if (!existsSync(path)) throw new Error(`missing file: ${path}`);
}

export function check(name, ok, detail = "") {
  if (!ok) {
    const suffix = detail ? ` — ${detail}` : "";
    throw new Error(`${name}${suffix}`);
  }
  console.log(`PASS ${name}`);
}

export function htmlHas(html, needle) {
  return html.includes(needle);
}

export const contracts = {
  home(html) {
    check("home title TechCo.Wiki", /<title>TechCo\.Wiki/.test(html));
    check("home machine /search.md", htmlHas(html, "/search.md"));
    check("home machine /zh/search.md", htmlHas(html, "/zh/search.md"));
    check("home machine /zh/llms-full.txt", htmlHas(html, "/zh/llms-full.txt"));
    check("home machine graph.json", htmlHas(html, "graph.json"));
    check("home clickable llms is same-origin", htmlHas(html, '<a href="/llms.txt">') || htmlHas(html, '<a class="btn" href="/llms.txt">'));
    check(
      "home does not click-out llms to SITE_ORIGIN",
      !htmlHas(html, '<a href="https://techco.wiki/llms.txt">') &&
        !htmlHas(html, '<a class="btn" href="https://techco.wiki/llms.txt">'),
    );
  },
  nvidia(html) {
    check("nvidia legal name", /NVIDIA Corporation/.test(html));
    check("nvidia founder link", htmlHas(html, "/people/jensen-huang"));
    check("nvidia city link", /\/cities\/santa-clara/.test(html));
    check("nvidia country link", /\/countries\/us/.test(html));
    check("nvidia markdown is same-origin", htmlHas(html, 'href="/companies/nvidia.md"'));
    check("nvidia is not filed as China HQ", !/China-headquartered/.test(html));
  },
  tsmc(html) {
    check("tsmc TWSE", /TWSE:\s*2330/.test(html));
    check("tsmc ADR", /ADR NYSE:TSM|NYSE:\s*TSM/.test(html));
    check("tsmc Taiwan", /Taiwan/i.test(html));
    check("tsmc not China-headquartered", !/China-headquartered/.test(html));
  },
  zhNvidia(html) {
    check("zh nvidia title", /英伟达/.test(html));
    check("zh nvidia markdown same-origin", htmlHas(html, 'href="/zh/companies/nvidia.md"'));
  },
  search(html) {
    check("search persist script", htmlHas(html, "location.search") && htmlHas(html, "lang-switch"));
  },
  zh404(html) {
    check("zh 404 title", /未找到/.test(html));
    check("zh 404 lang", /lang="zh-Hans"/.test(html));
  },
  en404(html) {
    check("en 404 title", /Not found/.test(html));
    check("en 404 robots", /noindex/.test(html));
  },
};
