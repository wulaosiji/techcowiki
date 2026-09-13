import type { Company, Localized, Product } from "./types";

type Listing = { exchange: string; ticker: string };

const ROLE_LEAD = /\bassociated with (Co-founder|Founder|Founding chairman|Executive chairman)\b/g;

/** Dual listings mentioned in leads but not stored on the primary `stock` field. */
const EXTRA_LISTINGS: Record<string, Listing[]> = {
  alibaba: [{ exchange: "SEHK", ticker: "9988" }],
  baidu: [{ exchange: "SEHK", ticker: "9888" }],
  "jd-com": [{ exchange: "SEHK", ticker: "9618" }],
  netease: [{ exchange: "SEHK", ticker: "9999" }],
  bilibili: [{ exchange: "SEHK", ticker: "9626" }],
  "trip-com": [{ exchange: "SEHK", ticker: "9961" }],
  "ke-holdings": [{ exchange: "SEHK", ticker: "2423" }],
  smic: [{ exchange: "SSE", ticker: "688981" }],
  byd: [{ exchange: "SZSE", ticker: "002594" }],
  zte: [{ exchange: "SZSE", ticker: "000063" }],
  weride: [{ exchange: "SEHK", ticker: "0800" }],
  beigene: [
    { exchange: "SEHK", ticker: "6160" },
    { exchange: "SSE", ticker: "688235" },
  ],
  kanzhun: [{ exchange: "SEHK", ticker: "2076" }],
  "wuxi-apptec": [{ exchange: "SSE", ticker: "603259" }],
};

const EXTRA_ALIASES: Record<string, string[]> = {
  bytedance: ["Lemon8", "musical.ly", "Musical.ly"],
  huawei: ["HarmonyOS", "鸿蒙"],
  kuaishou: ["Snack Video", "Kwai"],
  "trip-com": ["Qunar", "Skyscanner", "去哪儿", "Ctrip"],
  meituan: ["Dianping", "大众点评"],
  umc: ["UMC"],
  shanda: ["The Legend of Mir"],
};

const EXTRA_PRODUCTS: Record<string, Product[]> = {
  huawei: [
    {
      name: "HarmonyOS",
      description: {
        en: "Huawei's consumer operating system for phones and other devices.",
        zh: "华为面向手机及其他设备的消费级操作系统。",
      },
    },
  ],
  bytedance: [
    {
      name: "Lemon8",
      description: {
        en: "Lifestyle content app distributed in selected markets.",
        zh: "在部分市场分发的生活方式内容应用。",
      },
    },
  ],
  kuaishou: [
    {
      name: "Snack Video",
      description: {
        en: "Short-video brand used in some international markets.",
        zh: "在部分国际市场使用的短视频品牌。",
      },
    },
  ],
  "trip-com": [
    {
      name: "Qunar",
      description: { en: "Chinese online travel brand in the Trip.com group.", zh: "携程集团旗下的中文在线旅行品牌。" },
    },
    {
      name: "Skyscanner",
      description: { en: "Flight and travel search brand in the Trip.com group.", zh: "携程集团旗下的机票与旅行搜索品牌。" },
    },
  ],
};

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

function uniqueListings(values: Listing[]): Listing[] {
  const seen = new Set<string>();
  const out: Listing[] = [];
  for (const item of values) {
    const key = `${item.exchange}:${item.ticker}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function listingTickers(stock: Company["stock"]): string[] {
  if (!stock) return [];
  return uniqueStrings([
    stock.ticker,
    stock.adr?.ticker ?? "",
    ...(stock.secondary ?? []).map((item) => item.ticker),
  ]);
}

export function proseLead(lead: Localized): Localized {
  return {
    en: lead.en.replace(ROLE_LEAD, (_match, role: string) => `associated with ${String(role).toLowerCase()}`),
    zh: lead.zh,
  };
}

export function normalizeCompany(company: Company): Company {
  const extras = EXTRA_LISTINGS[company.slug] ?? [];
  const secondary = uniqueListings([...(company.stock?.secondary ?? []), ...extras]).filter((item) => {
    if (!company.stock) return true;
    if (item.ticker === company.stock.ticker && item.exchange === company.stock.exchange) return false;
    if (company.stock.adr && item.ticker === company.stock.adr.ticker) return false;
    return true;
  });
  const stock = company.stock
    ? {
        ...company.stock,
        exchange: company.stock.exchange === "NASDAQ" ? "Nasdaq" : company.stock.exchange,
        ...(secondary.length ? { secondary } : {}),
      }
    : undefined;
  const extraProducts = (EXTRA_PRODUCTS[company.slug] ?? []).filter(
    (product) => !company.products.some((item) => item.name.toLowerCase() === product.name.toLowerCase()),
  );
  return {
    ...company,
    lead: proseLead(company.lead),
    stock,
    aliases: uniqueStrings([
      ...company.aliases,
      ...listingTickers(stock),
      ...(EXTRA_ALIASES[company.slug] ?? []),
    ]),
    products: [...company.products, ...extraProducts],
  };
}
