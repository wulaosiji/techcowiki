import { LAST_REVIEWED } from "./site";
import type { Person } from "./types";

const accessed = LAST_REVIEWED;

export const people: Person[] = [
  {
    id: "techco:person:zhang-yiming",
    slug: "zhang-yiming",
    name: { en: "Zhang Yiming", zh: "张一鸣" },
    aliases: ["张一鸣"],
    definition: {
      en: "Zhang Yiming is a Chinese entrepreneur who co-founded ByteDance and remains its chairman.",
      zh: "张一鸣是中国创业者，联合创办字节跳动并担任董事长。",
    },
    lead: {
      en: "Zhang Yiming is a Chinese internet entrepreneur who co-founded ByteDance in Beijing in 2012 with Liang Rubo.[s1] He previously worked on the real-estate search site 99fang.com.[s1] Public reporting describes him as holding more than half of ByteDance's voting control.[s1]",
      zh: "张一鸣是中国互联网创业者，2012 年与梁汝波在北京联合创办字节跳动。[s1] 此前他参与房地产搜索网站 99fang.com。[s1] 公开报道称其掌握字节跳动过半投票权。[s1]",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "bytedance", role: { en: "Co-founder and chairman", zh: "联合创始人兼董事长" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Zhang_Yiming",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E5%BC%A0%E4%B8%80%E9%B8%A3",
      wikidata: "https://www.wikidata.org/wiki/Q28413312",
    },
    sources: [
      {
        id: "s1",
        title: "Zhang Yiming",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Zhang_Yiming",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:liang-rubo",
    slug: "liang-rubo",
    name: { en: "Liang Rubo", zh: "梁汝波" },
    aliases: ["梁汝波"],
    definition: {
      en: "Liang Rubo is a Chinese entrepreneur who co-founded ByteDance and later became its chief executive.",
      zh: "梁汝波是中国创业者，联合创办字节跳动并随后担任首席执行官。",
    },
    lead: {
      en: "Liang Rubo co-founded ByteDance with Zhang Yiming in 2012 and later succeeded Zhang as chief executive.[s1] He is part of the original Zhongguancun founding group.",
      zh: "梁汝波于 2012 年与张一鸣联合创办字节跳动，并随后接任首席执行官。[s1] 他属于中关村创始团队的原班成员。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "bytedance", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/ByteDance",
    },
    sources: [
      {
        id: "s1",
        title: "ByteDance",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/ByteDance",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:liang-wenfeng",
    slug: "liang-wenfeng",
    name: { en: "Liang Wenfeng", zh: "梁文锋" },
    aliases: ["梁文锋"],
    definition: {
      en: "Liang Wenfeng is a Chinese investor and engineer who co-founded High-Flyer and founded DeepSeek.",
      zh: "梁文锋是中国投资人与工程师，参与创立幻方量化并创办深度求索。",
    },
    lead: {
      en: "Liang Wenfeng is a Chinese entrepreneur who co-founded the quantitative hedge fund High-Flyer in 2015 and founded DeepSeek in 2023.[s1] He studied at Zhejiang University and has said DeepSeek focuses on research rather than immediate commercialization.[s1]",
      zh: "梁文锋是中国创业者，2015 年参与创立量化基金幻方量化，并于 2023 年创办深度求索。[s1] 他曾就读浙江大学，并表示深度求索侧重研究而非立即商业化。[s1]",
    },
    roles: [{ en: "Entrepreneur and investor", zh: "创业者与投资人" }],
    companies: [{ companySlug: "deepseek", role: { en: "Founder and CEO", zh: "创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Liang_Wenfeng",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E6%A2%81%E6%96%87%E9%94%8B",
    },
    sources: [
      {
        id: "s1",
        title: "DeepSeek",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/DeepSeek",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:eric-yuan",
    slug: "eric-yuan",
    name: { en: "Eric Yuan", zh: "袁征" },
    aliases: ["袁征", "Yuan Zheng"],
    definition: {
      en: "Eric Yuan is a Chinese-born American engineer who founded Zoom after leaving Cisco Webex.",
      zh: "袁征是出生于中国的美国工程师，离开思科 Webex 后创办 Zoom。",
    },
    lead: {
      en: "Eric Yuan (Yuan Zheng) is a Chinese-born American entrepreneur who founded Zoom in 2011 after serving as a corporate vice president at Cisco Webex.[s1] He remains chairman and chief executive.[s1]",
      zh: "袁征是出生于中国的美国创业者，曾担任思科 Webex 公司副总裁，并于 2011 年创办 Zoom。[s1] 他仍担任董事长兼首席执行官。[s1]",
    },
    roles: [{ en: "Entrepreneur and engineer", zh: "创业者与工程师" }],
    companies: [{ companySlug: "zoom", role: { en: "Founder, chairman and CEO", zh: "创始人、董事长兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Eric_Yuan",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E8%A2%81%E5%BE%81",
      wikidata: "https://www.wikidata.org/wiki/Q63088722",
    },
    sources: [
      {
        id: "s1",
        title: "Eric Yuan",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Eric_Yuan",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:tony-xu",
    slug: "tony-xu",
    name: { en: "Tony Xu", zh: "许晓维" },
    aliases: ["许晓维"],
    definition: {
      en: "Tony Xu is a Chinese-American entrepreneur who co-founded DoorDash and serves as its chief executive.",
      zh: "许晓维（Tony Xu）是华裔美国创业者，联合创办 DoorDash 并担任首席执行官。",
    },
    lead: {
      en: "Tony Xu is a Chinese-American entrepreneur who co-founded DoorDash in 2013 with Stanford classmates and remains chairman and CEO.[s1] The company began as PaloAltoDelivery.com.",
      zh: "许晓维是华裔美国创业者，2013 年与斯坦福同学联合创办 DoorDash，并仍担任董事长兼首席执行官。[s1] 公司起步于 PaloAltoDelivery.com。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "doordash", role: { en: "Co-founder, chairman and CEO", zh: "联合创始人、董事长兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Tony_Xu",
    },
    sources: [
      {
        id: "s1",
        title: "DoorDash",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/DoorDash",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:ivan-zhao",
    slug: "ivan-zhao",
    name: { en: "Ivan Zhao", zh: "赵伊凡" },
    aliases: ["Zhao Yifan"],
    definition: {
      en: "Ivan Zhao is a Chinese-Canadian designer and engineer who co-founded Notion and serves as its chief executive.",
      zh: "赵伊凡（Ivan Zhao）是华裔加拿大设计师与工程师，联合创办 Notion 并担任首席执行官。",
    },
    lead: {
      en: "Ivan Zhao is a Chinese-Canadian entrepreneur who co-founded Notion Labs in 2013 with Simon Last.[s1] He has described Notion as an attempt to make software construction accessible to non-programmers.",
      zh: "赵伊凡是华裔加拿大创业者，2013 年与 Simon Last 联合创办 Notion Labs。[s1] 他曾把 Notion 描述为让非程序员也能进行软件构建的尝试。",
    },
    roles: [{ en: "Designer and entrepreneur", zh: "设计师与创业者" }],
    companies: [{ companySlug: "notion", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      official: "https://www.notion.com/about",
    },
    sources: [
      {
        id: "s1",
        title: "About Notion",
        publisher: "Notion",
        url: "https://www.notion.com/about",
        accessed,
        type: "official",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:alexandr-wang",
    slug: "alexandr-wang",
    name: { en: "Alexandr Wang", zh: "王嘉禄" },
    aliases: ["Alex Wang"],
    definition: {
      en: "Alexandr Wang is an American entrepreneur of Chinese descent who co-founded Scale AI and later joined Meta.",
      zh: "王嘉禄（Alexandr Wang）是华裔美国创业者，联合创办 Scale AI，后加入 Meta。",
    },
    lead: {
      en: "Alexandr Wang co-founded Scale AI in 2016 and served as its chief executive until Meta's 2025 investment, after which he joined Meta.[s1] He is an American of Chinese immigrant parentage.",
      zh: "王嘉禄于 2016 年联合创办 Scale AI，并担任首席执行官，直至 Meta 2025 年投资后加入 Meta。[s1] 他是华裔移民家庭出身的美国人。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "scale-ai", role: { en: "Co-founder; former CEO", zh: "联合创始人；前首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Alexandr_Wang",
    },
    sources: [
      {
        id: "s1",
        title: "Scale AI",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Scale_AI",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:frank-wang",
    slug: "frank-wang",
    name: { en: "Frank Wang", zh: "汪滔" },
    aliases: ["汪滔", "Wang Tao"],
    definition: {
      en: "Frank Wang is a Chinese engineer who founded DJI while studying at the Hong Kong University of Science and Technology.",
      zh: "汪滔是中国工程师，在香港科技大学求学期间创办大疆创新。",
    },
    lead: {
      en: "Frank Wang (Wang Tao) founded DJI in 2006 after building flight-control prototypes at HKUST.[s1] He is from Hangzhou and later moved the company to Shenzhen.[s1]",
      zh: "汪滔于 2006 年创办大疆，此前在香港科技大学制作飞控原型。[s1] 他来自杭州，随后将公司迁至深圳。[s1]",
    },
    birthPlace: { en: "Hangzhou, Zhejiang", zh: "浙江杭州" },
    roles: [{ en: "Engineer and entrepreneur", zh: "工程师与创业者" }],
    companies: [{ companySlug: "dji", role: { en: "Founder", zh: "创始人" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Frank_Wang_(entrepreneur)",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E6%B1%AA%E6%BB%94",
    },
    sources: [
      {
        id: "s1",
        title: "DJI",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/DJI",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:lei-jun",
    slug: "lei-jun",
    name: { en: "Lei Jun", zh: "雷军" },
    aliases: ["雷军"],
    definition: {
      en: "Lei Jun is a Chinese entrepreneur who co-founded Xiaomi and serves as its chairman and chief executive.",
      zh: "雷军是中国创业者，联合创办小米并担任董事长兼首席执行官。",
    },
    lead: {
      en: "Lei Jun co-founded Xiaomi in Beijing in 2010 and remains chairman and CEO.[s1] He previously led Kingsoft and is one of China's best-known consumer-hardware founders.",
      zh: "雷军于 2010 年在北京联合创办小米，并仍担任董事长兼首席执行官。[s1] 他此前执掌金山软件，是中国最知名的消费硬件创始人之一。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "xiaomi", role: { en: "Co-founder, chairman and CEO", zh: "联合创始人、董事长兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Lei_Jun",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%86%9B",
      wikidata: "https://www.wikidata.org/wiki/Q5361663",
    },
    sources: [
      {
        id: "s1",
        title: "Lei Jun",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lei_Jun",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:colin-huang",
    slug: "colin-huang",
    name: { en: "Colin Huang", zh: "黄峥" },
    aliases: ["黄峥", "Huang Zheng"],
    definition: {
      en: "Colin Huang is a Chinese entrepreneur who founded Pinduoduo, later reorganized under PDD Holdings.",
      zh: "黄峥是中国创业者，创办拼多多，后将其重组于 PDD Holdings 之下。",
    },
    lead: {
      en: "Colin Huang (Huang Zheng) founded Pinduoduo in 2015 and took the group public in the United States.[s1] He later stepped back from day-to-day management while remaining a controlling shareholder in public descriptions.",
      zh: "黄峥于 2015 年创办拼多多，并带领集团在美国上市。[s1] 他后来退出日常管理，但在公开描述中仍为控股股东。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "pdd-holdings", role: { en: "Founder", zh: "创始人" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Colin_Huang",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E9%BB%84%E5%B3%A5",
    },
    sources: [
      {
        id: "s1",
        title: "PDD Holdings",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/PDD_Holdings",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:chris-xu",
    slug: "chris-xu",
    name: { en: "Chris Xu", zh: "许仰天" },
    aliases: ["许仰天", "Xu Yangtian"],
    definition: {
      en: "Chris Xu is a Chinese entrepreneur who founded Shein in Nanjing and remains its chief executive.",
      zh: "许仰天是中国创业者，在南京创办希音并担任首席执行官。",
    },
    lead: {
      en: "Chris Xu (Xu Yangtian) founded Shein, originally ZZKKO, in Nanjing in 2008 and is described as its CEO.[s1] He keeps a low public profile relative to the company's scale.",
      zh: "许仰天于 2008 年在南京创办希音（原名 ZZKKO），公开资料称其担任首席执行官。[s1] 相对公司规模，他保持较低的公开曝光。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "shein", role: { en: "Founder and CEO", zh: "创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Shein",
    },
    sources: [
      {
        id: "s1",
        title: "Shein",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Shein",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:yang-zhilin",
    slug: "yang-zhilin",
    name: { en: "Yang Zhilin", zh: "杨植麟" },
    aliases: ["杨植麟", "Kimi"],
    definition: {
      en: "Yang Zhilin is a Chinese researcher and entrepreneur who co-founded Moonshot AI and leads its Kimi models.",
      zh: "杨植麟是中国研究者与创业者，联合创办月之暗面并主导 Kimi 模型。",
    },
    lead: {
      en: "Yang Zhilin co-founded Moonshot AI in March 2023 with Tsinghua classmates after working at Google Brain, Meta, and Huawei.[s1] The Kimi product takes its name from his English nickname.[s1]",
      zh: "杨植麟在 Google Brain、Meta 与华为工作后，于 2023 年 3 月与清华大学同学联合创办月之暗面。[s1] Kimi 产品名来自他的英文昵称。[s1]",
    },
    roles: [{ en: "Researcher and entrepreneur", zh: "研究者与创业者" }],
    companies: [{ companySlug: "moonshot-ai", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Moonshot_AI",
    },
    sources: [
      {
        id: "s1",
        title: "Moonshot AI",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Moonshot_AI",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:wang-xingxing",
    slug: "wang-xingxing",
    name: { en: "Wang Xingxing", zh: "王兴兴" },
    aliases: ["王兴兴"],
    definition: {
      en: "Wang Xingxing is a Chinese robotics engineer who founded Unitree Robotics in Hangzhou.",
      zh: "王兴兴是中国机器人工程师，在杭州创办宇树科技。",
    },
    lead: {
      en: "Wang Xingxing founded Unitree Robotics in 2016 and is its chief executive.[s1] He is associated with the company's quadruped and humanoid product lines.",
      zh: "王兴兴于 2016 年创办宇树科技并担任首席执行官。[s1] 他与公司的四足及人形产品线相关。",
    },
    roles: [{ en: "Robotics engineer", zh: "机器人工程师" }],
    companies: [{ companySlug: "unitree", role: { en: "Founder and CEO", zh: "创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Unitree_Robotics",
    },
    sources: [
      {
        id: "s1",
        title: "Unitree Robotics",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Unitree_Robotics",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:jensen-huang",
    slug: "jensen-huang",
    name: { en: "Jensen Huang", zh: "黄仁勋" },
    aliases: ["黄仁勋", "Jen-Hsun Huang"],
    definition: {
      en: "Jensen Huang is a Taiwanese-American engineer who co-founded NVIDIA and serves as its president and chief executive.",
      zh: "黄仁勋是台裔美国工程师，联合创办英伟达并担任总裁兼首席执行官。",
    },
    lead: {
      en: "Jensen Huang (Jen-Hsun Huang) was born in Tainan, Taiwan, and co-founded NVIDIA in 1993.[s1] He has been the company's only chief executive. TechCo.wiki includes him as a Chinese-heritage founder of a U.S. semiconductor company, not as the founder of a Chinese firm.",
      zh: "黄仁勋出生于台湾台南，1993 年联合创办英伟达。[s1] 他一直是公司唯一的首席执行官。TechCo.wiki 将其列为美国半导体公司的华裔创始人，而不是中国公司创始人。",
    },
    birthPlace: { en: "Tainan, Taiwan", zh: "台湾台南" },
    roles: [{ en: "Engineer and chief executive", zh: "工程师与首席执行官" }],
    companies: [{ companySlug: "nvidia", role: { en: "Co-founder, president and CEO", zh: "联合创始人、总裁兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Jensen_Huang",
      wikipediaZh: "https://zh.wikipedia.org/wiki/%E9%BB%83%E4%BB%81%E5%8B%B3",
      wikidata: "https://www.wikidata.org/wiki/Q16999218",
    },
    sources: [
      {
        id: "s1",
        title: "Jensen Huang",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Jensen_Huang",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "high",
  },
  {
    id: "techco:person:jack-zhang",
    slug: "jack-zhang",
    name: { en: "Jack Zhang", zh: "张逸凡" },
    aliases: ["张逸凡"],
    definition: {
      en: "Jack Zhang is a Chinese-Australian entrepreneur who co-founded Airwallex and serves as its chief executive.",
      zh: "张逸凡（Jack Zhang）是华裔澳大利亚创业者，联合创办空中云汇并担任首席执行官。",
    },
    lead: {
      en: "Jack Zhang co-founded Airwallex in Melbourne in 2015 and is its CEO.[s1] The company grew from Australia–Asia payment friction into a multi-currency business platform.",
      zh: "张逸凡于 2015 年在墨尔本联合创办空中云汇并担任首席执行官。[s1] 公司从澳亚支付摩擦起步，成长为多币种企业平台。",
    },
    roles: [{ en: "Entrepreneur", zh: "创业者" }],
    companies: [{ companySlug: "airwallex", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Airwallex",
    },
    sources: [
      {
        id: "s1",
        title: "Airwallex",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Airwallex",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:cai-haoyu",
    slug: "cai-haoyu",
    name: { en: "Cai Haoyu", zh: "蔡浩宇" },
    aliases: ["蔡浩宇"],
    definition: {
      en: "Cai Haoyu is a Chinese game designer who co-founded miHoYo in Shanghai.",
      zh: "蔡浩宇是中国游戏设计师，在上海联合创办米哈游。",
    },
    lead: {
      en: "Cai Haoyu co-founded miHoYo in 2011 with Liu Wei and Luo Yuhao after they met at Shanghai Jiao Tong University.[s1] He is associated with the studio's long-running Honkai and Genshin projects.",
      zh: "蔡浩宇于 2011 年与刘伟、罗宇皓联合创办米哈游，三人相识于上海交通大学。[s1] 他与工作室长期的崩坏与原神项目相关。",
    },
    roles: [{ en: "Game designer", zh: "游戏设计师" }],
    companies: [{ companySlug: "mihoyo", role: { en: "Co-founder", zh: "联合创始人" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/MiHoYo",
    },
    sources: [
      {
        id: "s1",
        title: "miHoYo",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/MiHoYo",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:lin-qiao",
    slug: "lin-qiao",
    name: { en: "Lin Qiao", zh: "乔林" },
    aliases: ["乔林"],
    definition: {
      en: "Lin Qiao is a Chinese-born engineer who led PyTorch production at Meta and co-founded Fireworks AI.",
      zh: "乔林是出生于中国的工程师，曾负责 Meta 的 PyTorch 生产，并联合创办 Fireworks AI。",
    },
    lead: {
      en: "Lin Qiao is a Chinese-born engineer who worked on PyTorch at Meta and co-founded Fireworks AI in 2022.[s1] She is the company's chief executive.",
      zh: "乔林是出生于中国的工程师，曾在 Meta 从事 PyTorch，并于 2022 年联合创办 Fireworks AI。[s1] 她担任公司首席执行官。",
    },
    roles: [{ en: "Engineer and entrepreneur", zh: "工程师与创业者" }],
    companies: [{ companySlug: "fireworks-ai", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      official: "https://fireworks.ai",
    },
    sources: [
      {
        id: "s1",
        title: "Fireworks AI",
        publisher: "Fireworks AI",
        url: "https://fireworks.ai",
        accessed,
        type: "official",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
  {
    id: "techco:person:james-peng",
    slug: "james-peng",
    name: { en: "James Peng", zh: "彭军" },
    aliases: ["彭军", "Peng Jun"],
    definition: {
      en: "James Peng is a Chinese engineer who co-founded Pony.ai after working on autonomous driving at Baidu.",
      zh: "彭军是中国工程师，在百度从事自动驾驶工作后联合创办小马智行。",
    },
    lead: {
      en: "James Peng (Peng Jun) co-founded Pony.ai in 2016 and serves as chief executive.[s1] He previously worked on Baidu's autonomous-driving program.",
      zh: "彭军于 2016 年联合创办小马智行并担任首席执行官。[s1] 他此前参与百度自动驾驶项目。",
    },
    roles: [{ en: "Engineer and entrepreneur", zh: "工程师与创业者" }],
    companies: [{ companySlug: "pony-ai", role: { en: "Co-founder and CEO", zh: "联合创始人兼首席执行官" } }],
    sameAs: {
      wikipedia: "https://en.wikipedia.org/wiki/Pony.ai",
    },
    sources: [
      {
        id: "s1",
        title: "Pony.ai",
        publisher: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Pony.ai",
        accessed,
        type: "encyclopedia",
      },
    ],
    lastReviewed: accessed,
    confidence: "medium",
  },
];
