import { LAST_REVIEWED } from "./site";
import type {
  Company,
  CompanyStage,
  CompanyStatus,
  Confidence,
  Localized,
  Person,
} from "./types";

const accessed = LAST_REVIEWED;

const COUNTRIES: Record<string, Localized> = {
  CN: { en: "China", zh: "中国" },
  US: { en: "United States", zh: "美国" },
  TW: { en: "Taiwan", zh: "台湾" },
  HK: { en: "Hong Kong", zh: "香港" },
  SG: { en: "Singapore", zh: "新加坡" },
  GB: { en: "United Kingdom", zh: "英国" },
  ID: { en: "Indonesia", zh: "印度尼西亚" },
  MY: { en: "Malaysia", zh: "马来西亚" },
  AE: { en: "United Arab Emirates", zh: "阿拉伯联合酋长国" },
  AU: { en: "Australia", zh: "澳大利亚" },
  FR: { en: "France", zh: "法国" },
  IL: { en: "Israel", zh: "以色列" },
  NL: { en: "Netherlands", zh: "荷兰" },
};

function wikiUrl(title: string): string {
  return `https://en.wikipedia.org/wiki/${title.replaceAll(" ", "_")}`;
}

export interface CompactCompany {
  slug: string;
  name: Localized;
  legalName?: string;
  aliases?: string[];
  definition: Localized;
  lead: Localized;
  founded: string;
  foundedPrecision?: Company["foundedPrecision"];
  city: Localized;
  region?: Localized;
  countryCode: string;
  status: CompanyStatus;
  stage: CompanyStage;
  sectors: string[];
  regions: string[];
  products: { name: string; en: string; zh: string }[];
  founders: { slug: string; en: string; zh: string }[];
  employees?: { value: number; asOf: string };
  stock?: { exchange: string; ticker: string };
  website: string;
  wiki: string;
  wikiZh?: string;
  wikidata?: string;
  history: Localized;
  note?: Localized;
  confidence?: Confidence;
}

export interface CompactPerson {
  slug: string;
  name: Localized;
  aliases?: string[];
  definition: Localized;
  lead: Localized;
  companies: { slug: string; en: string; zh: string }[];
  wiki?: string;
  confidence?: Confidence;
}

export function expandCompany(row: CompactCompany): Company {
  const wiki = wikiUrl(row.wiki);
  return {
    id: `techco:company:${row.slug}`,
    slug: row.slug,
    name: row.name,
    legalName: row.legalName,
    aliases: row.aliases ?? [row.name.zh],
    definition: row.definition,
    lead: row.lead,
    founded: row.founded,
    foundedPrecision: row.foundedPrecision ?? "year",
    headquarters: {
      city: row.city,
      region: row.region,
      countryCode: row.countryCode,
      country: COUNTRIES[row.countryCode] ?? { en: row.countryCode, zh: row.countryCode },
    },
    status: row.status,
    stage: row.stage,
    sectors: row.sectors,
    regions: row.regions,
    products: row.products.map((product) => ({
      name: product.name,
      description: { en: product.en, zh: product.zh },
    })),
    founders: row.founders.map((founder) => ({
      personSlug: founder.slug,
      role: { en: founder.en, zh: founder.zh },
    })),
    employees: row.employees
      ? { value: row.employees.value, asOf: row.employees.asOf, sourceIds: ["s1"] }
      : undefined,
    stock: row.stock
      ? {
          ...row.stock,
          exchange: row.stock.exchange === "NASDAQ" ? "Nasdaq" : row.stock.exchange,
        }
      : undefined,
    website: row.website,
    sameAs: {
      wikipedia: wiki,
      wikipediaZh: row.wikiZh,
      wikidata: row.wikidata ? `https://www.wikidata.org/wiki/${row.wikidata}` : undefined,
      official: row.website,
    },
    sections: [
      {
        id: "history",
        title: { en: "History", zh: "历史" },
        body: row.history,
      },
      ...(row.note
        ? [
            {
              id: "inclusion",
              title: { en: "Inclusion", zh: "收录说明" },
              body: row.note,
            },
          ]
        : []),
    ],
    sources: [
      {
        id: "s1",
        title: row.wiki,
        publisher: "Wikipedia",
        url: wiki,
        accessed,
        type: "encyclopedia",
      },
      {
        id: "s2",
        title: `${row.name.en} official website`,
        publisher: row.name.en,
        url: row.website,
        accessed,
        type: "official",
      },
    ],
    lastReviewed: accessed,
    confidence: row.confidence ?? "high",
  };
}

export function expandPerson(row: CompactPerson): Person {
  const wiki = row.wiki ? wikiUrl(row.wiki) : undefined;
  return {
    id: `techco:person:${row.slug}`,
    slug: row.slug,
    name: row.name,
    aliases: row.aliases ?? [row.name.zh],
    definition: row.definition,
    lead: row.lead,
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: row.companies.map((item) => ({
      companySlug: item.slug,
      role: { en: item.en, zh: item.zh },
    })),
    sameAs: wiki ? { wikipedia: wiki } : {},
    sources: [
      {
        id: "s1",
        title: row.wiki ?? row.name.en,
        publisher: wiki ? "Wikipedia" : "TechCo.Wiki",
        url: wiki ?? `https://en.wikipedia.org/wiki/${row.name.en.replaceAll(" ", "_")}`,
        accessed,
        type: wiki ? "encyclopedia" : "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: row.confidence ?? "high",
  };
}
