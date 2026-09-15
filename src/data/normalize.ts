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
  alibaba: [
    {
      name: "Tmall",
      description: {
        en: "Branded marketplace in the Alibaba group, launched after Taobao.",
        zh: "阿里巴巴集团旗下的品牌电商市场，在淘宝之后推出。",
      },
    },
    {
      name: "Alibaba Cloud",
      description: {
        en: "Cloud-computing and data-center services operated by Alibaba.",
        zh: "阿里巴巴运营的云计算与数据中心服务。",
      },
    },
    {
      name: "AliExpress",
      description: {
        en: "Cross-border retail marketplace for shoppers outside mainland China.",
        zh: "面向中国大陆以外买家的跨境零售市场。",
      },
    },
    {
      name: "DingTalk",
      description: {
        en: "Workplace messaging and collaboration app in the Alibaba group.",
        zh: "阿里巴巴集团旗下的企业即时通信与协作应用。",
      },
    },
  ],
  anker: [
    {
      name: "Soundcore",
      description: {
        en: "Consumer audio brand for headphones, earbuds, and speakers.",
        zh: "面向耳机、耳塞与音箱的消费音频品牌。",
      },
    },
  ],
  asus: [
    {
      name: "Asus motherboards",
      description: {
        en: "Desktop motherboard lines that preceded the company's notebook brands.",
        zh: "早于笔记本品牌的台式电脑主板产品线。",
      },
    },
  ],
  baidu: [
    {
      name: "Baidu Maps",
      description: {
        en: "Maps and navigation service expanded from Baidu's search business.",
        zh: "由百度搜索业务扩展出的地图与导航服务。",
      },
    },
    {
      name: "Ernie Bot",
      description: {
        en: "Generative-AI chatbot also known as Wenxin Yiyan.",
        zh: "生成式人工智能对话产品，亦称文心一言。",
      },
    },
  ],
  byd: [
    {
      name: "BYD batteries",
      description: {
        en: "Rechargeable batteries that preceded BYD's vehicle business.",
        zh: "早于比亚迪整车业务的充电电池产品。",
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
    {
      name: "Lark / Feishu",
      description: {
        en: "Workplace suite sold internationally as Lark and in China as Feishu.",
        zh: "办公套件，国际市场称 Lark，中国市场称飞书。",
      },
    },
    {
      name: "Doubao",
      description: {
        en: "Consumer chatbot from ByteDance's generative-AI work.",
        zh: "字节跳动生成式人工智能业务下的消费级对话应用。",
      },
    },
  ],
  dji: [
    {
      name: "Osmo / Ronin",
      description: {
        en: "Handheld and professional camera gimbals sold alongside DJI drones.",
        zh: "与大疆无人机并行销售的手持及专业相机云台。",
      },
    },
  ],
  doordash: [
    {
      name: "Wolt",
      description: {
        en: "European local-delivery brand acquired by DoorDash.",
        zh: "DoorDash 收购的欧洲本地配送品牌。",
      },
    },
    {
      name: "Deliveroo",
      description: {
        en: "U.K. food-delivery brand later acquired by DoorDash.",
        zh: "后来被 DoorDash 收购的英国外卖品牌。",
      },
    },
  ],
  garmin: [
    {
      name: "Garmin aviation",
      description: {
        en: "Aviation GPS and cockpit electronics from Garmin's original market.",
        zh: "佳明起步市场中的航空 GPS 与座舱电子设备。",
      },
    },
  ],
  huawei: [
    {
      name: "HarmonyOS",
      description: {
        en: "Huawei's consumer operating system for phones and other devices.",
        zh: "华为面向手机及其他设备的消费级操作系统。",
      },
    },
    {
      name: "Huawei Cloud",
      description: {
        en: "Public-cloud and enterprise infrastructure services from Huawei.",
        zh: "华为的公有云与企业基础设施服务。",
      },
    },
    {
      name: "Huawei networks",
      description: {
        en: "Carrier wireless and optical network equipment.",
        zh: "运营商无线与光网络设备。",
      },
    },
  ],
  iflytek: [
    {
      name: "iFlytek Input",
      description: {
        en: "Speech-to-text keyboard and input software for Chinese language use.",
        zh: "面向中文使用场景的语音输入法与输入软件。",
      },
    },
  ],
  "jd-com": [
    {
      name: "JD Logistics",
      description: {
        en: "Warehousing and delivery network that supports JD's retail operations.",
        zh: "支撑京东零售业务的仓储与配送网络。",
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
    {
      name: "Kwai",
      description: {
        en: "International short-video brand used alongside the Kuaishou app.",
        zh: "与快手应用并行的国际短视频品牌。",
      },
    },
  ],
  lenovo: [
    {
      name: "Motorola phones",
      description: {
        en: "Android handset line from Motorola Mobility after Lenovo acquired it.",
        zh: "联想收购摩托罗拉移动后保留的 Android 手机产品线。",
      },
    },
  ],
  mediatek: [
    {
      name: "Helio",
      description: {
        en: "Earlier MediaTek smartphone system-on-chip family alongside Dimensity.",
        zh: "联发科较早的智能手机系统级芯片系列，与天玑并行。",
      },
    },
  ],
  meituan: [
    {
      name: "Dianping",
      description: {
        en: "Local reviews and in-store deals brand merged into Meituan.",
        zh: "并入美团的本地点评与到店团购品牌。",
      },
    },
  ],
  mihoyo: [
    {
      name: "Zenless Zone Zero",
      description: {
        en: "Urban action game published after Genshin Impact.",
        zh: "在《原神》之后发行的都市动作游戏。",
      },
    },
  ],
  netease: [
    {
      name: "NetEase Mail",
      description: {
        en: "Consumer email franchise associated with the 163.com portal.",
        zh: "与 163.com 门户相关的消费级电子邮箱业务。",
      },
    },
    {
      name: "NetEase Cloud Music",
      description: {
        en: "Streaming-music app operated by NetEase.",
        zh: "网易运营的流媒体音乐应用。",
      },
    },
  ],
  nio: [
    {
      name: "NIO Power",
      description: {
        en: "Battery-swap and charging service used with NIO vehicles.",
        zh: "配合蔚来车辆使用的换电与充电服务。",
      },
    },
  ],
  nvidia: [
    {
      name: "GeForce",
      description: {
        en: "Consumer graphics-card family from NVIDIA.",
        zh: "英伟达的消费级显卡系列。",
      },
    },
  ],
  "qihoo-360": [
    {
      name: "360 Browser",
      description: {
        en: "Consumer web browser distributed with Qihoo 360's security suite.",
        zh: "随奇虎 360 安全套件分发的消费级浏览器。",
      },
    },
  ],
  sea: [
    {
      name: "Garena",
      description: {
        en: "Game publishing and online-game brand that preceded the Sea holding name.",
        zh: "早于 Sea 控股名称的游戏发行与在线游戏品牌。",
      },
    },
    {
      name: "Monee",
      description: {
        en: "Digital-finance brand in the Sea group alongside Shopee.",
        zh: "Sea 集团中与 Shopee 并列的数字金融品牌。",
      },
    },
  ],
  tencent: [
    {
      name: "Tencent QQ",
      description: {
        en: "Instant-messaging client that was Tencent's first mass-market product.",
        zh: "腾讯首个大众市场产品，即时通信客户端。",
      },
    },
    {
      name: "Tencent Games",
      description: {
        en: "Video-game publishing and investment studio inside Tencent.",
        zh: "腾讯内部的电子游戏发行与投资业务。",
      },
    },
    {
      name: "Tencent Cloud",
      description: {
        en: "Cloud-computing services operated by Tencent.",
        zh: "腾讯运营的云计算服务。",
      },
    },
  ],
  transsion: [
    {
      name: "Infinix",
      description: {
        en: "Transsion smartphone brand sold in Africa and other emerging markets.",
        zh: "传音在非洲及其他新兴市场销售的智能手机品牌。",
      },
    },
    {
      name: "itel",
      description: {
        en: "Entry-level Transsion phone brand sold mainly in emerging markets.",
        zh: "传音面向新兴市场的入门手机品牌。",
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
  xiaomi: [
    {
      name: "POCO phones",
      description: {
        en: "Performance-oriented Xiaomi smartphone brand sold alongside Redmi.",
        zh: "与红米并行销售的小米性能向智能手机品牌。",
      },
    },
  ],
  yahoo: [
    {
      name: "Yahoo Search",
      description: {
        en: "Web-search service on the Yahoo portal.",
        zh: "雅虎门户上的网络搜索服务。",
      },
    },
    {
      name: "Yahoo Finance",
      description: {
        en: "Market-news and quotes site in the Yahoo portal.",
        zh: "雅虎门户中的市场新闻与行情网站。",
      },
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
