import { writeFileSync } from "node:fs";
import { companies as seedCompanies } from "../src/data/companies.ts";
import { extendedCompanies } from "../src/data/extended-companies.ts";
import { people as seedPeople } from "../src/data/people.ts";
import { extendedPeople } from "../src/data/extended-people.ts";
import type { WikiExtractRecord, WikiGloss } from "../src/data/wiki-extracts.ts";

const UA = "TechCoWikiBot/1.0 (https://techco.wiki; zhuhe1983@gmail.com)";

interface Target {
  key: string;
  enUrl?: string;
  zhUrl?: string;
  wikidataId?: string;
}

function titleFromWikiUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const match = url.match(/wikipedia\.org\/wiki\/(.+)$/);
  if (!match) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function qidFromUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const match = url.match(/\/wiki\/(Q\d+)$/);
  return match?.[1];
}

function wikiUrl(lang: "en" | "zh", title: string): string {
  return `https://${lang}.wikipedia.org/wiki/${title.replaceAll(" ", "_")}`;
}

function clean(text: string, max = 1200): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url: string, attempts = 6): Promise<unknown> {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": UA,
          "Api-User-Agent": UA,
          Accept: "application/json",
        },
      });
      if (response.status === 404) return null;
      if (response.status === 429 || response.status >= 500) {
        await sleep(400 * attempt * attempt);
        continue;
      }
      if (!response.ok) {
        console.warn(`skip ${response.status} ${url}`);
        return null;
      }
      return await response.json();
    } catch (error) {
      await sleep(300 * attempt);
      if (attempt === attempts) {
        console.warn(`skip ${url}: ${error}`);
        return null;
      }
    }
  }
  return null;
}

async function summary(lang: "en" | "zh", title: string): Promise<WikiGloss | undefined> {
  const encoded = encodeURIComponent(title.replaceAll(" ", "_"));
  const data = (await fetchJson(
    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
  )) as {
    type?: string;
    title?: string;
    description?: string;
    extract?: string;
    content_urls?: { desktop?: { page?: string } };
  } | null;
  if (!data?.extract || data.type === "disambiguation") return undefined;
  return {
    title: data.title ?? title.replaceAll("_", " "),
    description: data.description ? clean(data.description, 240) : undefined,
    extract: clean(data.extract),
    url: data.content_urls?.desktop?.page ?? wikiUrl(lang, title),
  };
}

async function mapPool<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current]);
      await sleep(120);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

const companies = [...seedCompanies, ...extendedCompanies];
const people = [...seedPeople, ...extendedPeople];

const targets: Target[] = [
  ...companies.map((company) => ({
    key: `company:${company.slug}`,
    enUrl: company.sameAs.wikipedia,
    zhUrl: company.sameAs.wikipediaZh,
    wikidataId: qidFromUrl(company.sameAs.wikidata),
  })),
  ...people.map((person) => ({
    key: `person:${person.slug}`,
    enUrl: person.sameAs.wikipedia,
    zhUrl: person.sameAs.wikipediaZh,
    wikidataId: qidFromUrl(person.sameAs.wikidata),
  })),
];

const qids = [...new Set(targets.map((target) => target.wikidataId).filter(Boolean))] as string[];
const wikidata = new Map<
  string,
  { en?: string; zh?: string; zhTitle?: string; enTitle?: string }
>();

async function loadWikidata() {
  for (let i = 0; i < qids.length; i += 40) {
    const batch = qids.slice(i, i + 40);
    const url =
      "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=sitelinks|descriptions&languages=en|zh|zh-cn|zh-hans&sitefilter=enwiki|zhwiki&ids=" +
      batch.join("|");
    const data = (await fetchJson(url)) as {
      entities?: Record<
        string,
        {
          descriptions?: Record<string, { value: string }>;
          sitelinks?: Record<string, { title: string }>;
        }
      >;
    };
    for (const [id, entity] of Object.entries(data.entities ?? {})) {
      const descriptions = entity.descriptions ?? {};
      wikidata.set(id, {
        en: descriptions.en?.value,
        zh: descriptions["zh-hans"]?.value ?? descriptions["zh-cn"]?.value ?? descriptions.zh?.value,
        zhTitle: entity.sitelinks?.zhwiki?.title,
        enTitle: entity.sitelinks?.enwiki?.title,
      });
    }
    await sleep(80);
  }
}

await loadWikidata();
console.log(`Wikidata entities: ${wikidata.size}`);

const records: Record<string, WikiExtractRecord> = {};

await mapPool(targets, 2, async (target) => {
  const wd = target.wikidataId ? wikidata.get(target.wikidataId) : undefined;
  const enTitle = titleFromWikiUrl(target.enUrl) ?? wd?.enTitle;
  const zhTitle = titleFromWikiUrl(target.zhUrl) ?? wd?.zhTitle;
  const record: WikiExtractRecord = {};
  if (enTitle) record.en = await summary("en", enTitle);
  if (zhTitle) record.zh = await summary("zh", zhTitle);
  if (wd?.en || wd?.zh) {
    record.wikidataDescription = {
      en: wd.en ? clean(wd.en, 240) : undefined,
      zh: wd.zh ? clean(wd.zh, 240) : undefined,
    };
  }
  if (record.en || record.zh || record.wikidataDescription) {
    records[target.key] = record;
  }
  process.stdout.write(".");
});

const withEn = Object.values(records).filter((record) => record.en).length;
const withZh = Object.values(records).filter((record) => record.zh).length;
console.log(`\nExtracts: ${Object.keys(records).length} keys, ${withEn} en, ${withZh} zh`);

const file = `export interface WikiGloss {
  title: string;
  description?: string;
  extract: string;
  url: string;
}

export interface WikiExtractRecord {
  en?: WikiGloss;
  zh?: WikiGloss;
  wikidataDescription?: { en?: string; zh?: string };
}

export const wikiExtracts: Record<string, WikiExtractRecord> = ${JSON.stringify(records, null, 2)};

export function wikiExtractKey(kind: "company" | "person", slug: string): string {
  return \`\${kind}:\${slug}\`;
}

export function wikiExtract(kind: "company" | "person", slug: string): WikiExtractRecord | undefined {
  return wikiExtracts[wikiExtractKey(kind, slug)];
}
`;

writeFileSync(new URL("../src/data/wiki-extracts.ts", import.meta.url), file);
console.log("Wrote src/data/wiki-extracts.ts");
