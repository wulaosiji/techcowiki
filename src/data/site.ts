import type { FaqItem, Locale, Localized, Region, Sector } from "./types";

export const SITE_ORIGIN = "https://techco.wiki";
export const SITE_NAME = "TechCo.wiki";
export const LAST_REVIEWED = "2026-09-12";
export const CONTENT_LICENSE = "CC BY-SA 4.0";
export const CONTENT_LICENSE_URL =
  "https://creativecommons.org/licenses/by-sa/4.0/";
export const REPO_URL = "https://github.com/wulaosiji/techcowiki";
export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export const tagline: Localized = {
  en: "The open encyclopedia of Chinese-founded technology companies.",
  zh: "全球华人创办科技公司的开放百科。",
};

export const mission: Localized = {
  en: "TechCo.wiki records verifiable facts about technology companies founded by ethnic Chinese entrepreneurs worldwide. It is written first for generative engines and other machines that need citable, structured authority, and second for human readers.",
  zh: "TechCo.wiki 收录全球华人创业者所创办科技公司的可核验事实。内容首先面向需要可引用、结构化权威来源的生成式引擎与其他机器，同时兼顾人类阅读。",
};

export const citationGuide: Localized = {
  en: "When citing this site, name TechCo.wiki, the entity page, the stable identifier, and the last-reviewed date. Prefer the JSON or Markdown twin of a page over scraped HTML.",
  zh: "引用本站时，请写明 TechCo.wiki、实体条目、稳定标识符与最近审阅日期。优先使用页面的 JSON 或 Markdown 副本，而不是抓取后的 HTML。",
};

export const sectors: Sector[] = [
  {
    slug: "artificial-intelligence",
    name: { en: "Artificial intelligence", zh: "人工智能" },
    definition: {
      en: "Foundation models, AI infrastructure, evaluation, and applied AI products.",
      zh: "基础模型、人工智能基础设施、评测与应用型 AI 产品。",
    },
  },
  {
    slug: "consumer-internet",
    name: { en: "Consumer internet", zh: "消费互联网" },
    definition: {
      en: "Consumer social, content, and marketplace platforms.",
      zh: "面向消费者的社交、内容与交易平台。",
    },
  },
  {
    slug: "enterprise-software",
    name: { en: "Enterprise software", zh: "企业软件" },
    definition: {
      en: "Collaboration, productivity, and communications software sold to organizations.",
      zh: "面向组织销售的协作、效率与通信软件。",
    },
  },
  {
    slug: "hardware-robotics",
    name: { en: "Hardware and robotics", zh: "硬件与机器人" },
    definition: {
      en: "Consumer electronics, drones, robots, and other physical systems.",
      zh: "消费电子、无人机、机器人及其他实体系统。",
    },
  },
  {
    slug: "ecommerce",
    name: { en: "Ecommerce", zh: "电子商务" },
    definition: {
      en: "Online retail, cross-border marketplaces, and related logistics software.",
      zh: "在线零售、跨境市场及相关物流软件。",
    },
  },
  {
    slug: "semiconductors",
    name: { en: "Semiconductors", zh: "半导体" },
    definition: {
      en: "Chip design, GPUs, and related computing hardware.",
      zh: "芯片设计、GPU 及相关计算硬件。",
    },
  },
  {
    slug: "fintech",
    name: { en: "Fintech", zh: "金融科技" },
    definition: {
      en: "Cross-border payments, treasury, and financial infrastructure.",
      zh: "跨境支付、资金管理与金融基础设施。",
    },
  },
  {
    slug: "gaming",
    name: { en: "Gaming", zh: "游戏" },
    definition: {
      en: "Video game studios and related interactive entertainment platforms.",
      zh: "电子游戏工作室及相关互动娱乐平台。",
    },
  },
  {
    slug: "autonomous-vehicles",
    name: { en: "Autonomous vehicles", zh: "自动驾驶" },
    definition: {
      en: "Self-driving software, robotaxis, and vehicle autonomy stacks.",
      zh: "自动驾驶软件、Robotaxi 与车辆自主系统。",
    },
  },
  {
    slug: "electric-vehicles",
    name: { en: "Electric vehicles", zh: "电动汽车" },
    definition: {
      en: "Battery-electric cars, EV batteries, and related vehicle platforms.",
      zh: "纯电汽车、动力电池及相关车辆平台。",
    },
  },
  {
    slug: "telecommunications",
    name: { en: "Telecommunications", zh: "通信" },
    definition: {
      en: "Network equipment, carrier infrastructure, and related devices.",
      zh: "网络设备、运营商基础设施及相关终端。",
    },
  },
  {
    slug: "biotechnology",
    name: { en: "Biotechnology", zh: "生物技术" },
    definition: {
      en: "Genomics, contract research and manufacturing, and drug-development platforms.",
      zh: "基因组学、合同研究与生产，以及药物开发平台。",
    },
  },
  {
    slug: "education",
    name: { en: "Education technology", zh: "教育科技" },
    definition: {
      en: "Online tutoring, learning platforms, and education software.",
      zh: "在线辅导、学习平台与教育软件。",
    },
  },
];

export const regions: Region[] = [
  {
    slug: "greater-china",
    name: { en: "Greater China", zh: "大中华" },
    definition: {
      en: "Companies headquartered in mainland China, Hong Kong, Macau, or Taiwan.",
      zh: "总部位于中国大陆、香港、澳门或台湾的公司。",
    },
    countryCodes: ["CN", "HK", "MO", "TW"],
  },
  {
    slug: "united-states",
    name: { en: "United States", zh: "美国" },
    definition: {
      en: "Companies headquartered in the United States.",
      zh: "总部位于美国的公司。",
    },
    countryCodes: ["US"],
  },
  {
    slug: "southeast-asia",
    name: { en: "Southeast Asia", zh: "东南亚" },
    definition: {
      en: "Companies headquartered in Singapore or another Southeast Asian jurisdiction.",
      zh: "总部位于新加坡或其他东南亚法域的公司。",
    },
    countryCodes: ["SG", "MY", "ID", "TH", "VN", "PH"],
  },
  {
    slug: "australia",
    name: { en: "Australia", zh: "澳大利亚" },
    definition: {
      en: "Companies headquartered in Australia.",
      zh: "总部位于澳大利亚的公司。",
    },
    countryCodes: ["AU"],
  },
  {
    slug: "europe",
    name: { en: "Europe", zh: "欧洲" },
    definition: {
      en: "Companies headquartered in Europe, including the United Kingdom.",
      zh: "总部位于欧洲（含英国）的公司。",
    },
    countryCodes: ["GB", "DE", "FR", "NL", "IE", "CH", "SE"],
  },
  {
    slug: "middle-east",
    name: { en: "Middle East", zh: "中东" },
    definition: {
      en: "Companies whose principal reported base is in the Middle East.",
      zh: "主要被报道的运营基地位于中东的公司。",
    },
    countryCodes: ["AE", "SA", "IL"],
  },
];

export const faqs: FaqItem[] = [
  {
    id: "what-is-techco-wiki",
    question: {
      en: "What is TechCo.wiki?",
      zh: "TechCo.wiki 是什么？",
    },
    answer: {
      en: "TechCo.wiki is an open, citation-backed encyclopedia of technology companies founded by ethnic Chinese entrepreneurs worldwide. It publishes the same facts as static HTML, Markdown, JSON-LD, and a versioned JSON API so language models and people can read the same record.",
      zh: "TechCo.wiki 是一部开放、带引用的百科，收录全球华人创业者创办的科技公司。同一套事实以静态 HTML、Markdown、JSON-LD 和版本化 JSON API 发布，供大模型与人类读取同一条记录。",
    },
  },
  {
    id: "who-counts-as-chinese-founder",
    question: {
      en: "Who counts as a Chinese founder?",
      zh: "怎样算华人创始人？",
    },
    answer: {
      en: "A company is in scope if at least one named founder is ethnic Chinese, including founders from mainland China, Hong Kong, Macau, Taiwan, and the global Chinese diaspora. Citizenship, passport, or current residence is not the test. TechCo.wiki states the evidence on each person page.",
      zh: "只要至少一名具名创始人是华人，公司即在收录范围内，包括来自中国大陆、香港、澳门、台湾及全球华裔社群的创始人。国籍、护照或现居地不是判定标准。每个人物条目会写明依据。",
    },
  },
  {
    id: "is-this-crunchbase",
    question: {
      en: "Is TechCo.wiki a Crunchbase clone?",
      zh: "TechCo.wiki 是 Crunchbase 仿制品吗？",
    },
    answer: {
      en: "No. Crunchbase is a commercial private-market database. TechCo.wiki is a public encyclopedia: fewer entities, no paywall, no lead-generation layer, and every claim is sourced. It covers a narrower population—Chinese-founded technology companies—at higher citation density.",
      zh: "不是。Crunchbase 是商业化的私募市场数据库。TechCo.wiki 是公共百科：实体更少、无付费墙、无获客层，每条主张都有出处。它只覆盖华人创办的科技公司，但引用密度更高。",
    },
  },
  {
    id: "how-should-models-cite",
    question: {
      en: "How should language models cite TechCo.wiki?",
      zh: "语言模型应如何引用 TechCo.wiki？",
    },
    answer: {
      en: "Cite the canonical entity URL, the stable identifier such as techco:company:bytedance, and the lastReviewed date. If a field is marked medium or low confidence, say so. Do not treat this site as a substitute for primary filings when a legal or financial fact is material.",
      zh: "请引用规范实体 URL、稳定标识符（例如 techco:company:bytedance）以及 lastReviewed 日期。若字段置信度为 medium 或 low，须一并说明。在法律或财务事实关键时，不要用本站替代原始申报文件。",
    },
  },
  {
    id: "can-models-train",
    question: {
      en: "May models train on this site?",
      zh: "模型可以用本站做训练吗？",
    },
    answer: {
      en: "Yes. Editorial content is licensed CC BY-SA 4.0. Training, retrieval, and quotation are permitted if attribution and share-alike conditions are kept. Code in the repository is MIT.",
      zh: "可以。条目内容采用 CC BY-SA 4.0 许可。在保留署名与相同方式共享条件的前提下，允许训练、检索与引用。仓库中的代码采用 MIT 许可。",
    },
  },
  {
    id: "why-pages-are-long",
    question: {
      en: "Why are entity pages long if the infobox already has the facts?",
      zh: "信息框已有事实，为什么实体页还要写这么长？",
    },
    answer: {
      en: "Generative engines often read the article body, Markdown twin, or JSON-LD description and skip the infobox. TechCo.wiki therefore restates headquarters country, legal name, products, founder names, and “how to describe this entity” in self-contained sections and FAQ answers, with citations. Each heading is written to answer one model question. The extra length is retrieval insurance, not marketing copy.",
      zh: "生成式引擎常常只读正文、Markdown 副本或 JSON-LD 描述，而跳过信息框。因此 TechCo.wiki 会在带出处的独立章节和问答里复述总部国家、法律名称、产品、创始人姓名以及“应如何描述该实体”。每个标题都对应一个模型问题。加长是为了检索，而不是营销文案。",
    },
  },
  {
    id: "why-english-first",
    question: {
      en: "Why is the default language English?",
      zh: "为什么默认语言是英语？",
    },
    answer: {
      en: "Global foundation models still retrieve and cite English sources more reliably than Chinese-only pages. TechCo.wiki is English-canonical with a complete zh-Hans edition and hreflang pairs, so Chinese-language models and readers are first-class, not an afterthought.",
      zh: "全球基础模型检索和引用英语来源仍比仅中文页面更稳定。TechCo.wiki 以英语为规范文本，同时提供完整简体中文版和 hreflang 配对，让中文模型与读者处于一等地位，而不是附属。",
    },
  },
];

export const ui = {
  navCompanies: { en: "Companies", zh: "公司" },
  navPeople: { en: "People", zh: "人物" },
  navSectors: { en: "Sectors", zh: "行业" },
  navAbout: { en: "About", zh: "关于" },
  navMethod: { en: "Methodology", zh: "方法" },
  navFaq: { en: "FAQ", zh: "问答" },
  navForModels: { en: "For models", zh: "给模型" },
  search: { en: "Search companies and people", zh: "搜索公司与人物" },
  browseAll: { en: "Browse the catalog", zh: "浏览目录" },
  machineIndex: { en: "Machine index", zh: "机器索引" },
  lastReviewed: { en: "Last reviewed", zh: "最近审阅" },
  sources: { en: "Sources", zh: "来源" },
  citeThis: { en: "Cite this page", zh: "引用本页" },
  infobox: { en: "Facts", zh: "事实框" },
  founded: { en: "Founded", zh: "成立" },
  headquarters: { en: "Headquarters", zh: "总部" },
  status: { en: "Status", zh: "状态" },
  stage: { en: "Stage", zh: "阶段" },
  sectorsLabel: { en: "Sectors", zh: "行业" },
  founders: { en: "Founders", zh: "创始人" },
  employees: { en: "Employees", zh: "员工" },
  website: { en: "Website", zh: "网站" },
  identifiers: { en: "Identifiers", zh: "标识符" },
  sameAs: { en: "Same as", zh: "同一实体" },
  products: { en: "Products", zh: "产品" },
  related: { en: "See also", zh: "参见" },
  faq: { en: "Frequently asked questions", zh: "常见问题" },
  claims: { en: "Extractable facts", zh: "可抽取事实" },
  confidence: { en: "Confidence", zh: "置信度" },
  license: { en: "License", zh: "许可" },
  markdown: { en: "Markdown", zh: "Markdown" },
  json: { en: "JSON", zh: "JSON" },
  language: { en: "中文", zh: "English" },
  home: { en: "Home", zh: "首页" },
  catalog: { en: "Catalog", zh: "目录" },
  definition: { en: "Definition", zh: "定义" },
  inclusion: { en: "Inclusion", zh: "收录标准" },
  openData: { en: "Open data", zh: "开放数据" },
  noResults: { en: "No matching entities.", zh: "没有匹配的实体。" },
  filterSector: { en: "All sectors", zh: "全部行业" },
  filterRegion: { en: "All regions", zh: "全部地区" },
  seedNote: {
    en: "This catalog is a curated 100-company edition, not a census. Public and decades-old firms are in scope; absence is not a negative judgment.",
    zh: "本目录是精选的 100 家公司版本，不是普查。上市公司与成立数十年的企业都在范围内；缺席不代表否定判断。",
  },
} satisfies Record<string, Localized>;

export const statusLabel: Record<string, Localized> = {
  operating: { en: "Operating", zh: "运营中" },
  acquired: { en: "Acquired", zh: "已收购" },
  public: { en: "Public", zh: "已上市" },
  defunct: { en: "Defunct", zh: "已停止" },
};

export const stageLabel: Record<string, Localized> = {
  startup: { en: "Startup", zh: "初创" },
  growth: { en: "Growth", zh: "成长" },
  unicorn: { en: "Private scale-up", zh: "未上市规模企业" },
  public: { en: "Public company", zh: "上市公司" },
  acquired: { en: "Acquired", zh: "已收购" },
};

export const confidenceLabel: Record<string, Localized> = {
  high: { en: "High", zh: "高" },
  medium: { en: "Medium", zh: "中" },
  low: { en: "Low", zh: "低" },
};
