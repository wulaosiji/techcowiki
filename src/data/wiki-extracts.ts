export interface WikiGloss {
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

export const wikiExtracts: Record<string, WikiExtractRecord> = {
  "company:deepseek": {
    "en": {
      "title": "DeepSeek",
      "description": "Chinese artificial intelligence company",
      "extract": "Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd., doing business as DeepSeek, is a Chinese artificial intelligence (AI) company that develops open weights large language models (LLMs). Based in Hangzhou, Zhejiang, DeepSeek is owned and funded by High-Flyer, a Chinese hedge fund.",
      "url": "https://en.wikipedia.org/wiki/DeepSeek"
    },
    "zh": {
      "title": "深度求索",
      "description": "中国大陆浙江杭州的人工智能公司",
      "extract": "深度求索（DeepSeek），全称杭州深度求索人工智能基础技术研究有限公司，是中国一家人工智能与大型语言模型公司。该公司的总部位于浙江省杭州市（注册地位于拱墅区），由中資对冲基金幻方量化创立，创始人和首席执行官为梁文锋。",
      "url": "https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E6%B1%82%E7%B4%A2"
    }
  },
  "company:bytedance": {
    "en": {
      "title": "ByteDance",
      "description": "Chinese Internet technology company",
      "extract": "ByteDance is a Chinese internet technology company based in Haidian, Beijing. Its associated variable interest entity, ByteDance Ltd, is incorporated in the Cayman Islands.",
      "url": "https://en.wikipedia.org/wiki/ByteDance"
    },
    "zh": {
      "title": "字节跳动",
      "description": "总部位于中国北京的互联网公司",
      "extract": "字节跳动有限公司，简称字节跳动，是在开曼群岛注册登记的一家跨国互联网技术公司，其前身最早始创于中国北京市海淀区，也是Tiktok有限公司（开曼群岛）和抖音集团（香港）有限公司的母公司。字节跳动有限公司经由抖音集团（香港）有限公司通过协议控制模式实际控制下列公司实体： 抖音有限公司，通称抖音集团，是在中华人民共和国注册登记的一家有限责任公司，总部位于北京市，系社交软件抖音、今日头条的运营公司。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8"
    },
    "wikidataDescription": {
      "en": "chess player (1949-2015)"
    }
  },
  "company:doordash": {
    "en": {
      "title": "DoorDash",
      "description": "American food delivery company",
      "extract": "DoorDash, Inc. is an American company operating online food ordering and food delivery. It trades under the symbol DASH. With a 56% market share, DoorDash is the largest food delivery platform in the United States. It also has a 60% market share in the convenience delivery category. As of December 31, 2020, the platform was used by 450,000 merchants, 20 million consumers, and had over one million delivery couriers.",
      "url": "https://en.wikipedia.org/wiki/DoorDash"
    },
    "zh": {
      "title": "DoorDash",
      "description": "美国网上订餐公司",
      "extract": "DoorDash, Inc.是一家美国网上订餐和外送公司，也是美国最大的外送平台，拥有56%的市场份额，在便利店快遞领域也占有60%的市场份额。 截至2020年12月31日，有45万家商户上線该平台、消费者數量達2000万，此外還有超过100万名外送員和快遞員。",
      "url": "https://zh.wikipedia.org/wiki/DoorDash"
    },
    "wikidataDescription": {
      "en": "BAS/HVAC controls manufacturer"
    }
  },
  "company:zoom": {
    "en": {
      "title": "Zoom Communications",
      "description": "American video communications company",
      "extract": "Zoom Communications, Inc. is an American communications technology company headquartered in San Jose, California, United States. It is primarily known for the videoconferencing platform Zoom.",
      "url": "https://en.wikipedia.org/wiki/Zoom_Communications"
    },
    "wikidataDescription": {
      "en": "scientific article published on October 1, 2017",
      "zh": "2017年学术文章"
    }
  },
  "company:notion": {
    "en": {
      "title": "Notion (productivity software)",
      "description": "Productivity web application",
      "extract": "Notion is a productivity and note-taking application developed by Notion Labs, Inc. It serves as a workspace for notetaking, knowledge management, data organization, and project and task tracking. It was first released in 2016 and is available on the web and as desktop and mobile apps. It is headquartered in San Francisco.",
      "url": "https://en.wikipedia.org/wiki/Notion_(productivity_software)"
    }
  },
  "company:scale-ai": {
    "en": {
      "title": "Scale AI",
      "description": "American data annotation company",
      "extract": "Scale AI, Inc. is an American artificial intelligence infrastructure and software company based in San Francisco, California. Originally focused on data annotation, the company also offers RLHF services, large language model (LLM) evaluation, and enterprise software suites to build and deploy AI applications.",
      "url": "https://en.wikipedia.org/wiki/Scale_AI"
    },
    "wikidataDescription": {
      "en": "Arab tribe"
    }
  },
  "company:dji": {
    "en": {
      "title": "DJI",
      "description": "Chinese technology company",
      "extract": "DJI is a Chinese technology company headquartered in Shenzhen, Guangdong. DJI manufactures commercial unmanned aerial vehicles (drones) for aerial photography and videography. It also designs and manufactures camera systems, gimbal stabilizers, propulsion systems, enterprise software, aerial agriculture equipment, and flight control systems.",
      "url": "https://en.wikipedia.org/wiki/DJI"
    },
    "zh": {
      "title": "大疆创新",
      "description": "中国跨国科技公司",
      "extract": "深圳大疆創新科技有限公司，簡稱大疆（英語簡稱DJI），是中華人民共和國一家主要從事民用無人機、航拍設備、攝影光學系統及相關車載零組件研發與生產的科技公司。公司於2006年由汪滔創立，總部位於深圳市南山區的天空之城大廈，該建築於2022年落成啟用，為兩座超高層塔樓。 公司在美國、德國、荷蘭、日本、南韓、北京、上海及香港設有辦事處。",
      "url": "https://zh.wikipedia.org/wiki/%E5%A4%A7%E7%96%86%E5%88%9B%E6%96%B0"
    },
    "wikidataDescription": {
      "en": "Ukrainian magazine"
    }
  },
  "company:xiaomi": {
    "en": {
      "title": "Xiaomi",
      "description": "Chinese multinational electronics company",
      "extract": "Xiaomi is a Chinese multinational corporation and technology company headquartered in Beijing, China. It is best known for its consumer electronics, software, and electric vehicles. It is the third-largest smartphone seller in the world as of 2025, behind Apple and Samsung, most of which run on the Xiaomi HyperOS operating system. It has 754.1 million global monthly active users, as of December 2025. The company is ranked 232nd and is the youngest company on the Fortune Global 500. It has been called the \"Apple of China\".",
      "url": "https://en.wikipedia.org/wiki/Xiaomi"
    },
    "zh": {
      "title": "小米集團",
      "description": "中國科技企業",
      "extract": "小米集團 成立於2010年4月6日，2018年7月9日於香港交易所主板掛牌上市，是一家以智能手机、智能硬件和IoT平台为核心的消費電子及智能製造公司。",
      "url": "https://zh.wikipedia.org/wiki/%E5%B0%8F%E7%B1%B3%E9%9B%86%E5%9C%98"
    },
    "wikidataDescription": {
      "en": "Observation tower in Stuttgart"
    }
  },
  "company:pdd-holdings": {
    "en": {
      "title": "Pinduoduo",
      "description": "Chinese e-commerce company",
      "extract": "Pinduoduo is a Chinese online retailer, with a focus on the traditional agriculture industry. The business is the largest asset of PDD Holdings, a company domiciled in the Cayman Islands and headquartered in Ireland that also owns the online marketplace Temu.",
      "url": "https://en.wikipedia.org/wiki/Pinduoduo"
    },
    "zh": {
      "title": "拼多多",
      "description": "中国大陆网络购物平台",
      "extract": "拼多多 是成立于上海的手机电商购物平台，由上海寻梦信息技术有限公司于2015年9月创办，該平台正如其名允许用户通过团购的方式，向賣家或廠家下單來获得大幅折扣。拼多多以APP为主要运营方式，创始人为黄峥，法定代表人为朱健翀，注册时间为2014年1月9日。为了进一步提升产品在全球市场的份额，2022年9月拼多多在中国大陆以外地区推出Temu電商平台，在2年不到的时间内，收获全球 4.67 亿用户，排名全球第二。",
      "url": "https://zh.wikipedia.org/wiki/%E6%8B%BC%E5%A4%9A%E5%A4%9A"
    }
  },
  "company:shein": {
    "en": {
      "title": "Shein",
      "description": "Multinational online clothing retailer",
      "extract": "Shein is a global e-commerce platform specializing in fast fashion. While the company primarily focuses on women's clothing, it also offers men's apparel, children's wear, accessories, cosmetics, shoes, bags, and other fashion items. Shein mainly focuses on Europe, Americas, Australia, and the Middle East along with other consumer markets worldwide.",
      "url": "https://en.wikipedia.org/wiki/Shein"
    },
    "zh": {
      "title": "希音",
      "description": "中国快时尚跨境电商公司",
      "extract": "希音國際控股有限公司 是一家總部設在新加坡的在線快時尚零售商。该企业前身可追溯至许仰天於2008年在中國南京創立的跨境婚紗電商SheInside。Shein在全球超過150個國家地區開拓市場，並經過2022年4月的一輪融資令其市值達到1,000億美金，截至2021年其網絡平臺月活躍用戶達到700万。",
      "url": "https://zh.wikipedia.org/wiki/%E5%B8%8C%E9%9F%B3"
    }
  },
  "company:moonshot-ai": {
    "en": {
      "title": "Moonshot AI",
      "description": "Chinese artificial intelligence company",
      "extract": "Moonshot AI is an artificial intelligence (AI) company based in Beijing, China. It is one of China's six \"AI Tigers\". Its Kimi K3, released July 2026, is the largest open weights model ever, at 2.8 trillion parameters. Founded in Beijing by Yang Zhilin, Zhou Xinyu, and Wu Yuxin in March 2023 at the outset of the AI boom, the company achieved a valuation of US$35 billion by July 2026, the second most valuable privately held AI company in China, after DeepSeek. Major investors include Alibaba Group and Tencent.",
      "url": "https://en.wikipedia.org/wiki/Moonshot_AI"
    }
  },
  "company:unitree": {
    "en": {
      "title": "Unitree Robotics",
      "description": "Chinese robotics company",
      "extract": "Hangzhou Yushu Technology Co., Ltd., doing business as Unitree Robotics, is a robotics company based in Hangzhou, China. Founded by Wang Xingxing in August 2016, Unitree initially specialized in quadruped robots for the consumer market. In 2024, the company began producing humanoid robots, with the second iteration priced around US$16,000.",
      "url": "https://en.wikipedia.org/wiki/Unitree_Robotics"
    }
  },
  "company:airwallex": {
    "en": {
      "title": "Airwallex",
      "description": "Financial services company",
      "extract": "Airwallex is a multinational financial technology company providing financial services. Founded in 2015 in Melbourne, Australia, and dual headquartered in Singapore and San Francisco, the company's platform provides global payments through its application programming interface (API), web app, and proprietary financial infrastructure. Services and products include business accounts, expense cards, and payroll, among others. It expanded into investment products in 2023. Airwallex is Australia's third technology unicorn company overall. With a valuation of US$8 billion in December 2025, it has raised $1.5 billion in total funding.",
      "url": "https://en.wikipedia.org/wiki/Airwallex"
    }
  },
  "company:nvidia": {
    "en": {
      "title": "Nvidia",
      "description": "American multinational technology company",
      "extract": "Nvidia Corporation is an American multinational technology company headquartered in Santa Clara, California. The company develops graphics processing units (GPUs), systems on chips (SoCs), and application programming interfaces (APIs) for data science, high-performance computing, artificial intelligence (AI), and mobile and automotive applications. Founded in 1993 by Jensen Huang, Chris Malachowsky, and Curtis Priem, Nvidia has been widely described as a Big Tech company.",
      "url": "https://en.wikipedia.org/wiki/Nvidia"
    },
    "zh": {
      "title": "英伟达",
      "description": "美國半導體公司",
      "extract": "英伟达（港台作辉达），创立于1993年1月，是美国一家以設計和銷售圖形處理器（GPU）为主的無廠半導體公司，總部设在加利福尼亞州的圣克拉拉，位於硅谷的中心位置。NVIDIA亦會設計遊戲機圖形處理器，例如第一代Xbox、PlayStation 3及任天堂Switch和任天堂Switch 2。",
      "url": "https://zh.wikipedia.org/wiki/%E8%8B%B1%E4%BC%9F%E8%BE%BE"
    },
    "wikidataDescription": {
      "en": "American multinational technology company",
      "zh": "美国电子公司"
    }
  },
  "company:mihoyo": {
    "en": {
      "title": "MiHoYo",
      "description": "Chinese video game developer",
      "extract": "miHoYo Co., Ltd. is a Chinese video game developer founded in 2012 and headquartered in Shanghai. The company is best known for developing popular gacha games, including the Honkai series, Tears of Themis, Genshin Impact, and Zenless Zone Zero. Beyond video games, miHoYo has diversified its output, creating various products such as animated series, novels, comics, music, and merchandise.",
      "url": "https://en.wikipedia.org/wiki/MiHoYo"
    },
    "zh": {
      "title": "米哈游",
      "description": "中國遊戲開發商和發行商",
      "extract": "上海米哈游网络科技股份有限公司（简称米哈游或miHoYo）是一家成立于2012年2月13日，总部位于中華人民共和國上海市的電子遊戲公司。除遊戲外，米哈游的文化產品還有動畫系列、小說、漫畫、音樂等。",
      "url": "https://zh.wikipedia.org/wiki/%E7%B1%B3%E5%93%88%E6%B8%B8"
    }
  },
  "company:pony-ai": {
    "en": {
      "title": "Pony.ai",
      "description": "Autonomous vehicle technology company",
      "extract": "Pony AI Inc. is a Chinese autonomous vehicle technology company co-located in Silicon Valley, Beijing, and Guangzhou.",
      "url": "https://en.wikipedia.org/wiki/Pony.ai"
    },
    "zh": {
      "title": "小马智行",
      "extract": "小马智行 是一家自动驾驶初创公司，于2016年12月由彭军和楼天城在美国加州湾区创办，研发L4/L5级别的自动驾驶技术。小马智行于2017年在中国北京和广州成立研发中心，并将中国总部迁至广州南沙区。该公司聘请图灵奖得主姚期智作为首席顾问。",
      "url": "https://zh.wikipedia.org/wiki/%E5%B0%8F%E9%A9%AC%E6%99%BA%E8%A1%8C"
    }
  },
  "company:alibaba": {
    "en": {
      "title": "Alibaba Group",
      "description": "Chinese multinational technology company",
      "extract": "Alibaba Group Holding Limited, branded as Alibaba, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology. Founded on 28 June 1999 in Hangzhou, Zhejiang, the company provides consumer-to-consumer (C2C), business-to-consumer (B2C), and business-to-business (B2B) sales services via Chinese and global marketplaces, as well as local consumer, digital media and entertainment, logistics, and cloud computing services. It owns and operates a diverse portfolio of companies around the world in numerous business sectors.",
      "url": "https://en.wikipedia.org/wiki/Alibaba_Group"
    },
    "zh": {
      "title": "阿里巴巴集团",
      "description": "电子商务集团",
      "extract": "阿里巴巴集团控股有限公司，简称阿里巴巴集团，是一家创立于中国杭州的全球化互联网企业。该集团由马云牵头，联合其余十七名创始人于1999年创建，目前由蔡崇信担任董事局主席。",
      "url": "https://zh.wikipedia.org/wiki/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese multinational technology company",
      "zh": "位于杭州与北京的互联网电子商务企业集团"
    }
  },
  "company:tencent": {
    "en": {
      "title": "Tencent",
      "description": "Chinese conglomerate and holding company",
      "extract": "Tencent is a Chinese multinational technology conglomerate and holding company headquartered in Shenzhen. It is one of the highest grossing multimedia companies in the world based on revenue. It is also the world's largest company in the video game industry based on its equity investments. Its associated stock-market-listed variable interest entity Tencent Holdings Ltd is incorporated in the Cayman Islands.",
      "url": "https://en.wikipedia.org/wiki/Tencent"
    },
    "zh": {
      "title": "腾讯",
      "description": "中国跨国投资控股集团",
      "extract": "腾讯控股有限公司，简称腾讯公司，通称腾讯，是中国一家跨国企业控股公司。1998年11月由马化腾、张志东、陈一丹、许晨晔、曾李青5位创始人共同创立，總部位於深圳南山区騰訊濱海大廈。腾讯业务拓展至社交、金融、投資、资讯、工具和平台等不同领域，其子公司专门从事各种全球互联网相关服务和产品、娱乐、人工智能和技术。目前，腾讯拥有中国大陸使用人数最多的社交软件腾讯QQ和微信，以及最大的网络游戏社区騰訊遊戲。在電子書領域，旗下有閱文集團，運營有QQ閱讀和微信讀書等。",
      "url": "https://zh.wikipedia.org/wiki/%E8%85%BE%E8%AE%AF"
    },
    "wikidataDescription": {
      "en": "Chinese multinational investment holding conglomerate",
      "zh": "总部位于中国广东深圳的私有IT企业"
    }
  },
  "company:baidu": {
    "en": {
      "title": "Baidu",
      "description": "Chinese internet services company",
      "extract": "Baidu, Inc. is a Chinese multinational technology company specializing in Internet services and artificial intelligence. It holds a dominant position in China's search engine market, and provides a wide variety of other internet services such as Baidu App, Baidu Baike, iQIYI, Baidu Tieba, and ES File Explorer.",
      "url": "https://en.wikipedia.org/wiki/Baidu"
    },
    "zh": {
      "title": "百度",
      "description": "總部位於中國北京的互聯網公司",
      "extract": "百度公司 是一家主要經營互联网搜索引擎、人工智能与相关技术服務的中国北京市互联网的跨国科技企业，于2000年1月1日由李彦宏、徐勇两人创立于北京中关村。",
      "url": "https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6"
    },
    "wikidataDescription": {
      "en": "Chinese web services company",
      "zh": "中国互联网公司"
    }
  },
  "company:huawei": {
    "en": {
      "title": "Huawei",
      "description": "Chinese multinational technology company",
      "extract": "Huawei Technologies Co., Ltd. is a Chinese multinational technology conglomerate company headquartered in Longgang, Shenzhen, Guangdong. Its main product lines include telecommunications equipment, consumer electronics, electric vehicle autonomous driving systems, and rooftop solar power products. The company was founded in Shenzhen in 1987 by Ren Zhengfei, a veteran officer of the People's Liberation Army (PLA).",
      "url": "https://en.wikipedia.org/wiki/Huawei"
    },
    "zh": {
      "title": "华为",
      "description": "中国大陆跨国科技公司",
      "extract": "华为技术有限公司，通称“华为”，是1987年由任正非创立的科技企业，总部位于中华人民共和国广东省深圳市。华为初期专注于制造电话交换机，现在的业务以研发和制造通訊裝置、消費電子產品为主，华为还涉足软件开发、设计生产集成电路、光伏和电动汽车等领域。",
      "url": "https://zh.wikipedia.org/wiki/%E5%8D%8E%E4%B8%BA"
    },
    "wikidataDescription": {
      "en": "Chinese multinational technology company",
      "zh": "中国跨国技术公司"
    }
  },
  "company:lenovo": {
    "en": {
      "title": "Lenovo",
      "description": "Chinese multinational technology company",
      "extract": "Lenovo Group Limited, trading as Lenovo, is a Hong Kong–based Chinese multinational corporation and technology company specializing in designing, manufacturing, and marketing consumer electronics, personal computers, software, servers, converged and hyperconverged infrastructure solutions, and related services. Its smartphone brand is Motorola. Its global headquarters are in Beijing, China, and Morrisville, North Carolina, in the United States; it has research centers at these locations, elsewhere in mainland China, Hong Kong and Taiwan, in Stuttgart, Germany, and in Yamato, Kanagawa, Japan.",
      "url": "https://en.wikipedia.org/wiki/Lenovo"
    },
    "zh": {
      "title": "联想集团",
      "description": "1984年建立的中國跨國科技公司",
      "extract": "联想集团有限責任公司 是中国的一家跨国科技公司，成立于1984年，由中国科学院计算技术研究所投资20万元人民币、11名科學人员创立，当时的名称为“中国科学院计算所新技术发展公司”。1989年，更改为「联想计算机集团有限責任公司」。",
      "url": "https://zh.wikipedia.org/wiki/%E8%81%94%E6%83%B3%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese multinational technology company established in 1984",
      "zh": "中国科技公司"
    }
  },
  "company:jd-com": {
    "en": {
      "title": "JD.com",
      "description": "Chinese e-commerce company",
      "extract": "JD.com, Inc., also known as Jingdong Group, formerly called 360buy, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology. The company headquartered in Beijing. With revenues more than US194 billion in 2025, JD.com is China's largest retailer by revenue, and ranks 47 on Fortune Global 500. It is one of the two massive B2C online retailers in China by transaction volume and revenue, and is a major competitor to Alibaba-run Tmall. JD.com's portfolio spans across retail, technology, logistics, health care, industrials, property management, private label, insurance, and international business.",
      "url": "https://en.wikipedia.org/wiki/JD.com"
    },
    "zh": {
      "title": "京东集团",
      "description": "中國購物網站",
      "extract": "京东集团，前稱360buy和京東商城，由刘强东于1998年6月18日创立，是一家总部位于北京的中国电子商务公司，主要為B2C模式的購物網站。2014年，京东集团在美国纳斯达克证券交易所上市。",
      "url": "https://zh.wikipedia.org/wiki/%E4%BA%AC%E4%B8%9C%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese e-commerce company",
      "zh": "中国电子商务公司"
    }
  },
  "company:meituan": {
    "en": {
      "title": "Meituan",
      "description": "Chinese technology company",
      "extract": "Meituan is a Chinese technology company that operates a platform for local services including on‑demand food delivery, in‑store services and consumer reviews under the Dazhong Dianping brand, hotel and travel bookings, and instant retail. The company is headquartered in Beijing and was founded in 2010 by Wang Xing. The company launched an initial public offering on the Hong Kong Stock Exchange in September 2018.",
      "url": "https://en.wikipedia.org/wiki/Meituan"
    },
    "zh": {
      "title": "美团",
      "description": "互联网公司",
      "extract": "美团 是中国一家以提供生活服务为主的电子商务公司，其自我定位为“科技零售公司”，与大众点评网合并后曾称美团点评，2020年9月起复称美团。美团由经营中国内地团购网站美团网起家，旗下拥有美团网、美团外卖、美团闪购、美团优选、大众点评网、美团单车（原摩拜單車）等互联网平台，业务涉及衣食住行各领域，包括餐饮、外卖、家政、商品配送、出行、住宿、旅游等服务。",
      "url": "https://zh.wikipedia.org/wiki/%E7%BE%8E%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese group buying website",
      "zh": "中国公司"
    }
  },
  "company:netease": {
    "en": {
      "title": "NetEase",
      "description": "Chinese Internet technology company",
      "extract": "NetEase, Inc. is a Chinese Internet technology company. Its businesses include video games, news aggregation, music streaming, advertising, email, and e-commerce. It was founded by Ding Lei in June 1997.",
      "url": "https://en.wikipedia.org/wiki/NetEase"
    },
    "zh": {
      "title": "网易",
      "description": "中國門戶網站和網絡遊戲公司",
      "extract": "网易是一家中国大陸大型互联网技术公司、网络媒体公司。目前提供网络游戏、门户网站、移动新闻客户端、移动财经客户端、电子邮件、电子商务、搜索引擎、博客、相册、社交平台、互联网教育等服务。截至2020年1月16日，网易公司的市值为442亿美元，其收入中大约79%来自于在线游戏服务（2019年第三季度）。",
      "url": "https://zh.wikipedia.org/wiki/%E7%BD%91%E6%98%93"
    },
    "wikidataDescription": {
      "en": "Chinese Internet technology company",
      "zh": "中国门户网站和网络游戏公司"
    }
  },
  "company:kuaishou": {
    "en": {
      "title": "Kuaishou",
      "description": "Chinese video application company",
      "extract": "Kuaishou Technology is a Chinese publicly traded partly state-owned holding company based in Haidian District, Beijing, that was founded in 2011 by Hua Su and Cheng Yixiao. The company, listed on the Hong Kong Stock Exchange, is known for developing a mobile app for sharing users' short videos, a social network, and video special effects editor. The app is known as Kwai in many countries outside of China. It is also known as Snack Video in India, Pakistan and Indonesia.",
      "url": "https://en.wikipedia.org/wiki/Kuaishou"
    },
    "zh": {
      "title": "快手 (軟體)",
      "description": "短视频社交软件",
      "extract": "快手（中國版）或Kwai（國際版） 是中国北京快手科技有限公司開發的短视频流动应用程序。前身為2011年面世的一款製作、分享GIF圖片的應用「GIF快手」，2012年轉型為短視頻社區，並於2014年改名为快手。截至2024年，快手的中国应用程序及小程序的平均日活跃用户数突破9亿。其主要竞争对手是抖音直播。",
      "url": "https://zh.wikipedia.org/wiki/%E5%BF%AB%E6%89%8B_(%E8%BB%9F%E9%AB%94)"
    },
    "wikidataDescription": {
      "en": "short-video platform",
      "zh": "短视频社交软件"
    }
  },
  "company:bilibili": {
    "en": {
      "title": "Bilibili",
      "description": "Chinese video sharing website",
      "extract": "Bilibili, nicknamed BSite, is a Chinese online video sharing platform based in Shanghai. Users can upload, view, and comment on videos, including through danmu, a system of overlaid on-screen comments. The platform originally focused on animation, comics, and games, but later expanded into documentaries, variety shows, and original programming.",
      "url": "https://en.wikipedia.org/wiki/Bilibili"
    },
    "zh": {
      "title": "哔哩哔哩",
      "description": "中国大陆弹幕视频网站",
      "extract": "哔哩哔哩 是一个以ACG相关內容起家的弹幕视频分享网站，通称B站或b站。bilibili的前身为徐逸于2009年6月26日创建的视频分享网站Mikufans，后于2010年1月24日更名“bilibili”。",
      "url": "https://zh.wikipedia.org/wiki/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9"
    },
    "wikidataDescription": {
      "en": "Chinese video sharing website",
      "zh": "中国大陆弹幕视频网站"
    }
  },
  "company:weibo": {
    "en": {
      "title": "Weibo",
      "description": "Chinese microblogging website",
      "extract": "Weibo, or Sina Weibo, is a Chinese microblogging (weibo) website. Launched by Sina Corporation on 14 August 2009, it is one of the biggest social media platforms in China, with over 582 million monthly active users as of Q1 2022. The platform has been highly successful but has faced criticism for heavy censorship.",
      "url": "https://en.wikipedia.org/wiki/Weibo"
    },
    "zh": {
      "title": "新浪微博",
      "description": "微博客网站",
      "extract": "新浪微博，是一个由新浪网推出，提供微博客的社交媒体网站。用户可以通过网页、WAP页面、手机移动程序等发布动态，并可上传图片和视频或视频直播，实现即时分享，传播互动。目前，它被称为中国版的Twitter。",
      "url": "https://zh.wikipedia.org/wiki/%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A"
    },
    "wikidataDescription": {
      "en": "Chinese microblogging website",
      "zh": "中国大陆的微博客网站"
    }
  },
  "company:sohu": {
    "en": {
      "title": "Sohu",
      "description": "Chinese Internet company founded in 1996",
      "extract": "Sohu, Inc. is a Chinese Internet company headquartered in the Sohu Internet Plaza in Haidian District, Beijing. Sohu and its subsidiaries offer advertising, a search engine (Sogou.com), on-line multiplayer gaming (ChangYou.com) and other services.",
      "url": "https://en.wikipedia.org/wiki/Sohu"
    },
    "zh": {
      "title": "搜狐",
      "description": "中国大陆互联网公司",
      "extract": "搜狐，是一家互联网中文门户网站。1995年，搜狐创始人张朝阳利用风险投资创建了爱特信信息技术有限公司，1998年正式推出搜狐网。2000年，搜狐在美国纳斯达克证券市场上市。",
      "url": "https://zh.wikipedia.org/wiki/%E6%90%9C%E7%8B%90"
    },
    "wikidataDescription": {
      "en": "Chinese Internet company",
      "zh": "中国大陆互联网公司"
    }
  },
  "company:sina": {
    "en": {
      "title": "Sina Corporation",
      "description": "Chinese online media company",
      "extract": "Sina Corporation is a Chinese internet and online media company best known for operating the Sina.com portal and for its controlling interest in Weibo Corporation, which runs the microblogging platform Weibo. Sina was formed in March 1999 through the merger of Beijing SINA Information Technology and California‑based SINANET.com. It listed on Nasdaq in April 2000 and became a private company again when a go‑private transaction led by chairman Charles Chao closed on March 22, 2021. The company is incorporated in the Cayman Islands and is headquartered in Beijing.",
      "url": "https://en.wikipedia.org/wiki/Sina_Corporation"
    },
    "zh": {
      "title": "新浪",
      "description": "中国互联网公司",
      "extract": "新浪是中国的门户网站公司，服务于中国大陆及全球华人社群的中文网络内容服务提供商。新浪與腾讯、搜狐和网易並稱中国四大门户网站，在全球范围内注册用户超过6亿。新浪通过旗下的门户网站「新浪网」、「新浪移动」（移动门户及移动应用）和社交媒体微博客服務網站「新浪微博」组成的数字媒体网络，让用户通过电脑和移动设备获得媒体和用户自生成的多媒体内容并与友人进行兴趣分享。",
      "url": "https://zh.wikipedia.org/wiki/%E6%96%B0%E6%B5%AA"
    },
    "wikidataDescription": {
      "en": "Chinese online media company",
      "zh": "中国互联网公司"
    }
  },
  "company:qihoo-360": {
    "en": {
      "title": "Qihoo 360",
      "description": "Chinese computer security software company",
      "extract": "360 Security Technology Inc., also branded as Qihoo 360, is a Chinese internet security company that has developed the antivirus software programs 360 Safeguard and 360 Mobile Safe, the Web browser 360 Secure Browser, and the mobile application store 360 Mobile Assistant. It was founded by Zhou Hongyi and Qi Xiangdong in June 2005. The company's head office is in Chaoyang, Beijing.",
      "url": "https://en.wikipedia.org/wiki/Qihoo_360"
    },
    "zh": {
      "title": "奇虎360",
      "description": "中國大陸軟件公司",
      "extract": "360（全称“三六零安全科技股份有限公司”） 是中国大陸的一家主营安全相关的互联网公司，由周鸿祎于2005年9月成立。公司口号是「引领中国互联网开放潮流」，旗下的產品有360安全卫士、360杀毒、360搜索、360安全浏览器、360手机助手、360手机卫士、魯大師等多项业务。",
      "url": "https://zh.wikipedia.org/wiki/%E5%A5%87%E8%99%8E360"
    },
    "wikidataDescription": {
      "en": "Chinese software company",
      "zh": "中国大陆的主营安全相关的互联网公司"
    }
  },
  "company:trip-com": {
    "en": {
      "title": "Trip.com Group",
      "description": "Chinese online travel service conglomerate",
      "extract": "Trip.com Group Limited is a multinational travel agency headquartered in Shanghai, China. It was the largest online travel service in the world in 2017.",
      "url": "https://en.wikipedia.org/wiki/Trip.com_Group"
    },
    "zh": {
      "title": "携程集团",
      "description": "中国公司",
      "extract": "携程集团有限公司，是一家总部设立在上海的中国大型旅游网站，1999年创办。2003年12月，该公司在美国纳斯达克 上市。目前携程已在中国大陆的北京、广州等17个城市设立分支机构，在南通设立服务联络中心，並在香港及台灣皆有旗下事業，占中国在线旅游市场份额一半以上，是中国最大的在线旅行社，也是全球最大的在线旅行社之一。携程旗下拥有携程网、去哪儿网、Skyscanner、Trip.com四个主要品牌，以及驴评网、鸿鹄逸游、永安、易游等多个支线品牌。",
      "url": "https://zh.wikipedia.org/wiki/%E6%90%BA%E7%A8%8B%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese provider of travel services",
      "zh": "中国公司"
    }
  },
  "company:didi": {
    "en": {
      "title": "DiDi",
      "description": "Chinese vehicle for hire company",
      "extract": "Didi Chuxing Technology Company is a Chinese mobility technology company headquartered in Beijing. The company offers app-based transportation and related services, including ride-hailing, taxi services, bike sharing and vehicle leasing. It also operates in areas such as food delivery, automobile services, and electric vehicle development. DiDi was founded in 2012 by Cheng Wei and initially launched as a taxi-hailing app under the name Didi Dache.",
      "url": "https://en.wikipedia.org/wiki/DiDi"
    },
    "zh": {
      "title": "滴滴出行",
      "description": "總部位於北京的交通网络公司",
      "extract": "滴滴出行，曾用名滴滴打车、嘀嘀打车，是中華人民共和國一款基於分享經濟而能在智能手机上预约未來某一時點使用或共乘交通工具的手機應用程式，由北京小桔科技有限公司所設計开发。起初只能预约出租车，后来逐步擴展至快车、礼橙专车、順風車（后曾下架）、代駕、試駕、拼车等多元業務。其与多个第三方支付提供商合作，使用户可以在手机上实现打车并付款。截至2021年，滴滴出行用户达5.8亿人，是世界上最大的出行服务平台。",
      "url": "https://zh.wikipedia.org/wiki/%E6%BB%B4%E6%BB%B4%E5%87%BA%E8%A1%8C"
    },
    "wikidataDescription": {
      "en": "Chinese transportation network company headquartered in Beijing",
      "zh": "總部位於北京的交通网络公司"
    }
  },
  "company:ke-holdings": {
    "en": {
      "title": "Beike",
      "description": "Chinese real estate platform",
      "extract": "KE Holdings Inc. is a publicly listed Chinese real estate holding company that engages in the provision of an integrated online and offline platform for housing transactions and services through its subsidiaries. It is the largest online real estate transaction platform in China.",
      "url": "https://en.wikipedia.org/wiki/Beike"
    },
    "zh": {
      "title": "贝壳找房",
      "description": "中国房屋信息平台",
      "extract": "贝壳找房 又稱贝壳集团，是中華人民共和國一個二手房、新房和房屋出租資訊網站，成立于2017年11月21日。該網站通過抽取成交雙方的佣金來獲利。2020年8月13日，贝壳集团在纽交所挂牌上市。",
      "url": "https://zh.wikipedia.org/wiki/%E8%B4%9D%E5%A3%B3%E6%89%BE%E6%88%BF"
    },
    "wikidataDescription": {
      "en": "company operating an integrated online and offline platform for housing transactions and services in China",
      "zh": "中国房屋信息平台"
    }
  },
  "company:ant-group": {
    "en": {
      "title": "Ant Group",
      "description": "Chinese financial services company",
      "extract": "Ant Group, formerly known as Ant Financial, is an affiliate company of the Chinese conglomerate Alibaba Group. Ant Group was initially the financial transaction arm of Alibaba, Alipay, when it was set up in 2004.",
      "url": "https://en.wikipedia.org/wiki/Ant_Group"
    },
    "zh": {
      "title": "蚂蚁集团",
      "description": "中國互聯網金融服務公司",
      "extract": "蚂蚁科技集团股份有限公司，简称蚂蚁集团，是中国的互联网金融服务公司。蚂蚁集团起步于网络购物网站淘宝网的第三方支付平台“支付宝”。",
      "url": "https://zh.wikipedia.org/wiki/%E8%9A%82%E8%9A%81%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese company",
      "zh": "中国金融公司"
    }
  },
  "company:tsmc": {
    "en": {
      "title": "TSMC",
      "description": "Taiwanese semiconductor foundry company",
      "extract": "Taiwan Semiconductor Manufacturing Company Limited is a Taiwanese multinational semiconductor contract manufacturing and design company. Headquartered in Hsinchu Science Park, it is one of the world's largest non-US companies by market capitalisation. It holds a commanding majority in the semiconductor foundry market, accounting for approximately 70% of the global market share. As the leading dedicated contract chipmaker, it serves as the main supplier for Nvidia, Apple, Broadcom, and Qualcomm. The company has grown rapidly due to the artificial intelligence boom and its importance in the creation of advanced chips needed for AI. Its role as a supply chain bottleneck raises concerns that a disruption could cause another worldwide chip shortage.",
      "url": "https://en.wikipedia.org/wiki/TSMC"
    },
    "zh": {
      "title": "台積電",
      "description": "知名高科技企業、台灣的半導體晶片製造公司",
      "extract": "台灣積體電路製造，簡稱台積電、TSMC，與旗下子公司合稱台積電集團，是臺灣一家專注於半导体晶片製造的高科技跨國企業，總部位於新竹科學園區，是全球市值最高的企業之一，也是全球最領先的半導體晶片製造商。台積電開創了專業積體電路製造服務 商業模式，只為客戶製造晶片，不設計、生產或銷售自有品牌的半導體產品，以確保不與客戶競爭；此一模式也促成了全球無廠IC設計產業的興起。",
      "url": "https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%A9%8D%E9%9B%BB"
    },
    "wikidataDescription": {
      "en": "semiconductor foundry company headquartered in Taiwan",
      "zh": "知名高科技企业、台湾的半导体晶片制造公司"
    }
  },
  "company:foxconn": {
    "en": {
      "title": "Foxconn",
      "description": "Taiwanese multinational electronics contract manufacturer",
      "extract": "Hon Hai Precision Industry Co., Ltd. (鴻海精密工業股份有限公司), doing business as Hon Hai Technology Group (鴻海科技集團) in Taiwan, Foxconn Technology Group (富士康科技集团) in China, and Foxconn (富士康) internationally, is a Taiwanese multinational electronics contract manufacturer established in 1974 with headquarters in Tucheng District, New Taipei City, Taiwan. In 2023, the company's annual revenue reached 6.16 trillion New Taiwan dollars and was ranked 20th in the 2023 Fortune Global 500. It is the world's largest contract manufacturer of electronics. While headquartered in Taiwan, the company earns the majority of its revenue from assets in China and is one of the largest employers worldwide. Terry Gou is the company founder and former chairman.",
      "url": "https://en.wikipedia.org/wiki/Foxconn"
    },
    "zh": {
      "title": "鴻海精密",
      "description": "台灣電子產品硬體代工企業",
      "extract": "鴻海精密工業（簡稱鴻海精密、鴻海）是臺灣電子製造公司，也是鴻海科技集團的核心企業。其以製造黑白電視機旋鈕起家，創立之時主要從事模具製造，日後跨入電子機械代工領域，從製造連接器、電線電纜、電腦機殼、電源供應器等零件，到電腦組裝準系統與行動電話等產品均開展業務，現今其事業版圖已經涉及所有的資訊科技產品組裝代工。",
      "url": "https://zh.wikipedia.org/wiki/%E9%B4%BB%E6%B5%B7%E7%B2%BE%E5%AF%86"
    },
    "wikidataDescription": {
      "en": "Taiwanese multinational electronics contract manufacturer",
      "zh": "台灣電子產品硬體代工企業"
    }
  },
  "company:mediatek": {
    "en": {
      "title": "MediaTek",
      "description": "Taiwanese fabless semiconductor company",
      "extract": "MediaTek Inc., sometimes informally abbreviated as MTK, is a Taiwanese fabless semiconductor company that designs and markets a range of semiconductor products, providing chips for wireless communications, high-definition television, handheld mobile devices like smartphones and tablet computers, navigation systems, consumer multimedia products and digital subscriber line services as well as optical disc drives.",
      "url": "https://en.wikipedia.org/wiki/MediaTek"
    },
    "zh": {
      "title": "聯發科技",
      "description": "行動裝置晶片設計市占率全球前二的知名高科技企業、台灣科技公司",
      "extract": "聯發科技股份有限公司 是一家總部位於臺灣新竹科學園區的集成电路设计公司，專注於無線通訊、行動運算、人工智慧與多媒體等領域的晶片設計。聯發科屬於無廠半導體公司，自身僅負責晶片設計，製造則委由台積電等晶圓代工廠生產。以智慧型手機晶片的出貨數量計，聯發科是全球最大的系統單晶片供應商之一。聯發科同時是全球最大的智慧型電視晶片供應商，市占率約七成。",
      "url": "https://zh.wikipedia.org/wiki/%E8%81%AF%E7%99%BC%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Taiwanese semiconductor company",
      "zh": "行动装置晶片设计市占率全球前二的知名高科技企业、台湾科技公司"
    }
  },
  "company:smic": {
    "en": {
      "title": "Semiconductor Manufacturing International Corporation",
      "description": "Chinese semiconductor foundry",
      "extract": "Semiconductor Manufacturing International Corporation (SMIC) is a partially state-owned publicly listed Chinese pure-play semiconductor foundry company. It is the largest contract chip maker in mainland China.",
      "url": "https://en.wikipedia.org/wiki/Semiconductor_Manufacturing_International_Corporation"
    },
    "zh": {
      "title": "中芯国际",
      "description": "晶圓代工企業",
      "extract": "中芯国际集成电路制造有限公司 于2000年4月3日在开曼群岛注册成立，总部位于中国大陆上海。公司的创立者之一为曾在台积电任职过的张汝京，目前公司联合首席执行官为梁孟松、赵海军。是世界领先的集成电路晶圆代工企业之一，也是中国大陆规模最大、技术最先进的集成电路芯片制造企业。中芯国际向全球客户提供0.35微米到14纳米晶圆代工与技术服务，包括逻辑芯片，混合信号/射频收发芯片，耐高压芯片，系统芯片，闪存芯片，EEPROM芯片，图像传感器芯片及LCoS微型显示器芯片，电源管理，微型机电系统等。同时7纳米已经进入到客户风险量产阶段。2024年，中芯成為世界第三大晶圓廠。",
      "url": "https://zh.wikipedia.org/wiki/%E4%B8%AD%E8%8A%AF%E5%9B%BD%E9%99%85"
    },
    "wikidataDescription": {
      "en": "Chinese state-owned semiconductor manufacturer",
      "zh": "中国半导体公司"
    }
  },
  "company:umc": {
    "en": {
      "title": "United Microelectronics Corporation",
      "description": "Taiwanese semiconductor foundry",
      "extract": "United Microelectronics Corporation is a Taiwanese company based in Hsinchu, Taiwan. It was founded as Taiwan's first semiconductor company in 1980 as a spin-off of the government-sponsored Industrial Technology Research Institute (ITRI).",
      "url": "https://en.wikipedia.org/wiki/United_Microelectronics_Corporation"
    },
    "zh": {
      "title": "聯華電子",
      "description": "台灣半導體製造商",
      "extract": "聯華電子股份有限公司，簡稱聯電，是臺灣一家從事晶圓代工的公司，為跨越電子行業的各項主要應用產品生產晶片。聯電完整的製程技術及製造解決方案包括邏輯/混合信號、嵌入式高壓解決方案、嵌入式非揮發性記憶體、RFSOI及BCD。",
      "url": "https://zh.wikipedia.org/wiki/%E8%81%AF%E8%8F%AF%E9%9B%BB%E5%AD%90"
    },
    "wikidataDescription": {
      "en": "semiconductor foundry company headquartered in Taiwan",
      "zh": "台湾科技公司"
    }
  },
  "company:asus": {
    "en": {
      "title": "Asus",
      "description": "Taiwanese computer and electronics company",
      "extract": "ASUSTeK Computer Inc., doing business as Asus, is a Taiwanese multinational computer, phone hardware and electronics manufacturer headquartered in Beitou District, Taipei, Taiwan. Its products include desktop computers, laptops, netbooks, mobile phones, networking equipment, monitors, Wi-Fi routers, projectors, motherboards, graphics cards, optical storage, multimedia products, peripherals, wearables, servers, workstations and tablet PCs. The company is also an original equipment manufacturer (OEM).",
      "url": "https://en.wikipedia.org/wiki/Asus"
    },
    "zh": {
      "title": "華碩",
      "description": "ASUS，顯卡、主機板、電競筆電市佔均全球前二的知名科技企業，台灣的跨國科技公司",
      "extract": "華碩電腦，簡稱華碩，是源自臺灣的跨國科技公司，成立於1989年，總部位於臺北市關渡。其產品主要為家用與商務用桌上型電腦、筆記型電腦、平板電腦、主機板、顯示卡、顯示器、儲存裝置、外圍設備、行動電話、可穿戴設備、投影機、網路通信設備、工作站、服務器。根據高德納公司在2024年第4季度的統計，其為全球第5大個人電腦供應商。",
      "url": "https://zh.wikipedia.org/wiki/%E8%8F%AF%E7%A2%A9"
    },
    "wikidataDescription": {
      "en": "Taiwanese computers and electronics company",
      "zh": "ASUS，显卡、主机板、电竞笔电市占均全球前二的知名科技企业，台湾的跨国科技公司"
    }
  },
  "company:acer": {
    "en": {
      "title": "Acer Inc.",
      "description": "Taiwanese multinational electronics corporation",
      "extract": "Acer Inc. is a New Taipei City-based Taiwanese multinational company that produces computer hardware and electronics, headquartered in Xizhi District. Its products include desktop PCs, laptop PCs, tablets, servers, storage devices, virtual reality devices, displays, smartphones, televisions and peripherals, as well as gaming PCs and accessories under its Predator brand. As of 2024, Acer is the world's sixth-largest personal computer vendor by unit sales.",
      "url": "https://en.wikipedia.org/wiki/Acer_Inc."
    },
    "zh": {
      "title": "宏碁",
      "description": "台灣跨國科技公司",
      "extract": "宏碁 是一家源自臺灣的跨國科技公司，成立於1976年，產品包括個人電腦、電競產品和虛擬實境裝置等。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AE%8F%E7%A2%81"
    },
    "wikidataDescription": {
      "en": "Taiwanese multinational hardware and electronics corporation",
      "zh": "台湾的电脑制造公司"
    }
  },
  "company:supermicro": {
    "en": {
      "title": "Supermicro",
      "description": "American supplier of servers and other information technology products",
      "extract": "Super Micro Computer, Inc., doing business as Supermicro, is an American information technology company based in San Jose, California. The company is one of the largest producers of high-performance and high-efficiency servers, while also providing server management software, and storage systems for various markets, including enterprise data centers, cloud computing, artificial intelligence, 5G, and edge computing. Supermicro was founded in 1993, and has manufacturing operations in Silicon Valley, the Netherlands, and in Taiwan at its Science and Technology Park.",
      "url": "https://en.wikipedia.org/wiki/Supermicro"
    },
    "zh": {
      "title": "美超微電腦",
      "description": "美國公司・SMCI",
      "extract": "超微电脑，是1993年於加州的聖荷西創辦的一間資訊科技企業，美國的跨國伺服器大廠，生產用於人工智慧資料中心的伺服器。總部座落在矽谷，全球營運中心和廠區位於荷蘭，台灣分部位於新北市中和區，桃園八德區設有科技園區。",
      "url": "https://zh.wikipedia.org/wiki/%E7%BE%8E%E8%B6%85%E5%BE%AE%E9%9B%BB%E8%85%A6"
    },
    "wikidataDescription": {
      "en": "American manufacturer of computer servers and enterprise equipment",
      "zh": "美國公司・SMCI"
    }
  },
  "company:garmin": {
    "en": {
      "title": "Garmin",
      "description": "Multinational technology company",
      "extract": "Garmin Ltd. is an American multinational technology company based in Olathe, Kansas. The company designs, develops, manufactures, markets, and distributes GPS-enabled products and other navigation, communication, sensor-based, and information products to the automotive, aviation, marine, outdoors, and sport markets.",
      "url": "https://en.wikipedia.org/wiki/Garmin"
    },
    "zh": {
      "title": "Garmin",
      "description": "GPS軟體與硬體公司",
      "extract": "佳明，由蓋瑞·貝瑞爾與高民環於1989年10月成立，總部座落於美國堪薩斯州堪薩斯市近郊的奧拉西。航空電子外，也發展全球定位系統、智能手表與其他消費性產品。",
      "url": "https://zh.wikipedia.org/wiki/Garmin"
    },
    "wikidataDescription": {
      "en": "US hardware subsidiary of GPS devices",
      "zh": "GPS軟體與硬體公司"
    }
  },
  "company:byd": {
    "en": {
      "title": "BYD Company",
      "description": "Chinese manufacturing company",
      "extract": "BYD Company Limited or BYD is a Chinese multinational manufacturing conglomerate headquartered in Shenzhen, Guangdong, China. It is a vertically integrated company with several major subsidiaries, including BYD Auto which produces automobiles, BYD Electronics which produces electronic parts and assembly, and FinDreams, a brand name of multiple companies that produce automotive components and electric vehicle batteries.",
      "url": "https://en.wikipedia.org/wiki/BYD_Company"
    },
    "zh": {
      "title": "比亚迪",
      "description": "中国企业",
      "extract": "比亚迪股份有限公司 是一家总部位于中国广东省深圳市的上市跨国制造企业。它是一家垂直整合的公司，且拥有多个子公司，主要包括生产汽车的比亚迪汽车、从事电子零部件生产与组装的比亞迪電子，以及生产电动车电池的弗迪公司。",
      "url": "https://zh.wikipedia.org/wiki/%E6%AF%94%E4%BA%9A%E8%BF%AA"
    },
    "wikidataDescription": {
      "en": "Chinese battery and electric vehicles manufacturer",
      "zh": "中国知名企业"
    }
  },
  "company:nio": {
    "en": {
      "title": "Nio Inc.",
      "description": "Chinese electric vehicle manufacturer",
      "extract": "Nio Inc. is a Chinese electric vehicle manufacturer headquartered in Shanghai. Founded in 2014, it adopted its current name in 2016. The company primarily designs and sells electric vehicles, including sedans and SUVs, but has expanded into other products and services, such as chip development, Smartphones, and power solutions.",
      "url": "https://en.wikipedia.org/wiki/Nio_Inc."
    },
    "zh": {
      "title": "蔚来汽车",
      "description": "中国電動汽车公司",
      "extract": "蔚来汽车，是2014年成立的中国电动汽车公司，創始人李斌担任董事长兼CEO。",
      "url": "https://zh.wikipedia.org/wiki/%E8%94%9A%E6%9D%A5%E6%B1%BD%E8%BD%A6"
    },
    "wikidataDescription": {
      "en": "Chinese car company",
      "zh": "中国電動汽车公司"
    }
  },
  "company:xpeng": {
    "en": {
      "title": "XPeng",
      "description": "Chinese car company",
      "extract": "Guangzhou Xiaopeng Motors Technology Co., Ltd., trading as XPeng Motors, commonly known as XPeng, is a Chinese electric vehicle manufacturer. The company is headquartered in Guangzhou, Guangdong, with offices in Mountain View, California, United States and Munich, Germany. XPeng stock is publicly traded on the New York Stock Exchange and the Hong Kong Stock Exchange. The company describes itself as a global AI mobility technology company and develops in-house technologies including full-stack advanced driver-assistance systems, an in-car intelligent operating system, powertrain systems and vehicle electronic/electrical architecture.",
      "url": "https://en.wikipedia.org/wiki/XPeng"
    },
    "zh": {
      "title": "小鹏汽车",
      "description": "中国汽车公司",
      "extract": "小鹏汽车，是总部设于中国广东省广州市的电动汽车公司，于2014年创立，首席执行官为前UC浏览器创始人何小鹏，其车型特点为支持第3级自动驾驶技术和互联网应用，如车内软件可通过OTA形式更新。",
      "url": "https://zh.wikipedia.org/wiki/%E5%B0%8F%E9%B9%8F%E6%B1%BD%E8%BD%A6"
    },
    "wikidataDescription": {
      "en": "Chinese automobile manufacturer",
      "zh": "中国汽车公司"
    }
  },
  "company:li-auto": {
    "en": {
      "title": "Li Auto",
      "description": "Chinese car company",
      "extract": "Li Auto Inc. is a Chinese electric vehicle manufacturer headquartered in Beijing, with manufacturing facilities in Changzhou. Founded by Li Xiang in 2015, the company is best known for producing electric vehicles equipped with range extender petrol engines.",
      "url": "https://en.wikipedia.org/wiki/Li_Auto"
    },
    "zh": {
      "title": "理想汽车",
      "description": "中國新能源汽車公司",
      "extract": "理想汽车，是一家汽车公司，首席执行官为创始人李想，总部设于北京市，在常州设有生产基地。该公司以生产配备增程式汽油发动机的电动汽车而闻名。",
      "url": "https://zh.wikipedia.org/wiki/%E7%90%86%E6%83%B3%E6%B1%BD%E8%BD%A6"
    },
    "wikidataDescription": {
      "en": "Chinese car company",
      "zh": "中國新能源汽車公司"
    }
  },
  "company:catl": {
    "en": {
      "title": "CATL",
      "description": "Chinese battery manufacturer",
      "extract": "Contemporary Amperex Technology Co., Limited, (CATL) is a Chinese battery manufacturer and technology company founded in 2011 that specializes in the manufacturing of lithium-ion batteries for electric vehicles and energy storage systems, as well as battery management systems (BMS). CATL is the biggest EV and energy storage battery manufacturer in the world, with a global market share of around 37% and 36.8% in 2022 and 2023, respectively. It is headquartered in Ningde, Fujian province, where it maintains its flagship manufacturing hub.",
      "url": "https://en.wikipedia.org/wiki/CATL"
    },
    "zh": {
      "title": "宁德时代",
      "description": "中國電池公司",
      "extract": "宁德时代新能源科技股份有限公司 是一家中国电池制造商和技术公司， 成立于2011年，专门从事制造用于电动汽车和储能系统以及电池管理系统的锂离子电池。其电动汽车电池的全球市占率连续多年位居第一，因而有“宁王”的昵称。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AE%81%E5%BE%B7%E6%97%B6%E4%BB%A3"
    },
    "wikidataDescription": {
      "en": "Chinese battery company",
      "zh": "中国电池公司"
    }
  },
  "company:zte": {
    "en": {
      "title": "ZTE",
      "description": "Chinese telecommunications company",
      "extract": "ZTE Corporation is a Chinese partially state-owned technology company that specializes in telecommunication. Founded in 1985, ZTE is listed on both the Hong Kong and Shenzhen Stock Exchanges.",
      "url": "https://en.wikipedia.org/wiki/ZTE"
    },
    "zh": {
      "title": "中兴通讯",
      "description": "中国通讯公司",
      "extract": "中興通訊股份有限公司，是一家中國大陸跨國科技公司，於1985年成立。总部在广东深圳。",
      "url": "https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%85%B4%E9%80%9A%E8%AE%AF"
    },
    "wikidataDescription": {
      "en": "Chinese telecommunication company",
      "zh": "中国通讯公司"
    }
  },
  "company:oppo": {
    "en": {
      "title": "Oppo",
      "description": "Chinese consumer electronics manufacturer",
      "extract": "Oppo is a private Chinese consumer electronics manufacturer and technology company headquartered in Shenzhen, Guangdong.",
      "url": "https://en.wikipedia.org/wiki/Oppo"
    },
    "zh": {
      "title": "OPPO",
      "description": "中国电子设备及智能终端制造公司",
      "extract": "OPPO广东移动通信有限公司，品牌名称的標識是小寫的oppo，是中國大陸的电子设备及智能终端制造公司，总部位于广东省东莞市，成立初期以生产MP3、MP4、DVD等影音播放设备为主，后进军手机市场，推出以快速充电及影像处理为主要卖点的拍照智能手机。",
      "url": "https://zh.wikipedia.org/wiki/OPPO"
    },
    "wikidataDescription": {
      "en": "Chinese consumer electronics manufacturer",
      "zh": "中国电子设备及智能终端制造公司"
    }
  },
  "company:vivo": {
    "en": {
      "title": "Vivo (technology company)",
      "description": "Chinese technology company",
      "extract": "Vivo Mobile Communication Co., Ltd., d/b/a vivo, is a Chinese multinational technology company headquartered in Dongguan, Guangdong, that designs and develops smartphones, smartphone accessories, software, and online services. The company develops software for its phones, distributed through its V-Appstore, with iManager included in their proprietary, Android-based operating system, Origin OS in mainland China, and currently discontinued Funtouch OS elsewhere. It has 40,000 employees, with 10 R&D centers in Shenzhen, Dongguan, Nanjing, Beijing, Hangzhou, Shanghai, Xi'an, Taipei, Tokyo, and San Diego.",
      "url": "https://en.wikipedia.org/wiki/Vivo_(technology_company)"
    },
    "zh": {
      "title": "Vivo",
      "description": "中國科技公司",
      "extract": "維沃移動通信有限公司，通稱vivo，是一家總部位於中國廣東省東莞市的科技公司，主要從事智能手機、無線耳機、智能手錶及平板電腦等消費電子產品的研發、生產與銷售。公司成立於2009年，前身為步步高電子旗下的通訊業務部門，現為全球主要智能手機製造商之一，產品銷往全球60多個國家和地區，截至2022年全球用戶超過4億。",
      "url": "https://zh.wikipedia.org/wiki/Vivo"
    },
    "wikidataDescription": {
      "en": "Chinese consumer electronics manufacturer",
      "zh": "中國科技公司"
    }
  },
  "company:transsion": {
    "en": {
      "title": "Transsion",
      "description": "Chinese smartphone company",
      "extract": "Transsion is a Chinese manufacturer of mobile phones based in Shenzhen. It was the largest smartphone manufacturer by sales in Africa in 2017, and also sells mobile phones in the Middle East, Southeast Asia, South Asia, and Latin America. Its brands include phone brands such as itel, TECNO, Infinix; after-sales service brand Carlcare and accessories brand Oraimo and Syinix. It manufactures phones in China, Indonesia, Pakistan, Ethiopia, Bangladesh and recently in India.",
      "url": "https://en.wikipedia.org/wiki/Transsion"
    },
    "zh": {
      "title": "传音控股",
      "description": "中国手机制造公司",
      "extract": "深圳传音控股有限公司 是一家中国智能手机制造商，总部位于中国深圳。",
      "url": "https://zh.wikipedia.org/wiki/%E4%BC%A0%E9%9F%B3%E6%8E%A7%E8%82%A1"
    },
    "wikidataDescription": {
      "en": "Chinese consumer electronics manufacturer",
      "zh": "中国手机制造公司"
    }
  },
  "company:hikvision": {
    "en": {
      "title": "Hikvision",
      "description": "Chinese video surveillance equipment company",
      "extract": "Hangzhou Hikvision Digital Technology Co., Ltd., often shortened to Hikvision, is a Chinese partly state-owned manufacturer and supplier of video surveillance equipment for civilian and military purposes, headquartered in Hangzhou, Zhejiang.",
      "url": "https://en.wikipedia.org/wiki/Hikvision"
    },
    "zh": {
      "title": "海康威视",
      "description": "中国公司",
      "extract": "杭州海康威视数字技术股份有限公司，簡稱海康威視，是一家位于中国杭州市的视频监控、記錄器、存儲设备、測速桿、交通號誌等的供应商，其主要控股方為央企中国电子科技集团。",
      "url": "https://zh.wikipedia.org/wiki/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86"
    },
    "wikidataDescription": {
      "en": "Chinese video surveillance equipment company",
      "zh": "中国公司"
    }
  },
  "company:iflytek": {
    "en": {
      "title": "IFlytek",
      "description": "Chinese technology company",
      "extract": "iFlytek, styled as iFLYTEK, is a partially state-owned Chinese information technology company established in 1999. It creates voice recognition software and 10+ voice-based internet/mobile products covering education, communication, music, intelligent toys industries. State-owned enterprise China Mobile is the company's largest shareholder. The company is listed in the Shenzhen Stock Exchange and it is backed by several state-owned investment funds.",
      "url": "https://en.wikipedia.org/wiki/IFlytek"
    },
    "zh": {
      "title": "科大讯飞",
      "description": "中国科技公司",
      "extract": "科大讯飞股份有限公司，是中国深圳证券交易所的一家上市公司，公司主营业务范围包括语音支撑软件、行业应用产品/系统、信息工程和运维服务。",
      "url": "https://zh.wikipedia.org/wiki/%E7%A7%91%E5%A4%A7%E8%AE%AF%E9%A3%9E"
    },
    "wikidataDescription": {
      "en": "Chinese technology company",
      "zh": "中国科技公司"
    }
  },
  "company:sensetime": {
    "en": {
      "title": "SenseTime",
      "description": "Chinese artificial intelligence company",
      "extract": "SenseTime is a partly state-owned publicly traded artificial intelligence company headquartered in Hong Kong. The company develops technologies including facial recognition, image recognition, object detection, optical character recognition, medical image analysis, video analysis, autonomous driving, and remote sensing. Since 2019, SenseTime has been repeatedly sanctioned by the U.S. government due to allegations that its facial recognition technology has been deployed in the surveillance and internment of the Uyghurs and other ethnic and religious minorities. SenseTime denies the allegations.",
      "url": "https://en.wikipedia.org/wiki/SenseTime"
    },
    "zh": {
      "title": "商汤科技",
      "description": "中國人工智能企業",
      "extract": "商湯科技，是一家總部位於香港的人工智能企業，於2014年底成立，其研发总部位于中国大陆。由中國大陆科學家汤晓鸥創辦，徐立任該公司的董事长兼首席执行官。商湯集團於2021年12月30日在香港交易所上市。",
      "url": "https://zh.wikipedia.org/wiki/%E5%95%86%E6%B1%A4%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Chinese AI company",
      "zh": "中國人工智能企業"
    }
  },
  "company:megvii": {
    "en": {
      "title": "Megvii",
      "description": "Chinese technology company",
      "extract": "Megvii is a Chinese technology company that designs image recognition and deep-learning software. Based in Beijing, the company develops artificial intelligence (AI) technology for businesses and for the public sector.",
      "url": "https://en.wikipedia.org/wiki/Megvii"
    },
    "zh": {
      "title": "旷视科技",
      "extract": "旷视科技是一家于2011年10月在北京中关村成立的人工智能公司，专注于图像识别和深度学习领域。",
      "url": "https://zh.wikipedia.org/wiki/%E6%97%B7%E8%A7%86%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Chinese technology company"
    }
  },
  "company:zhipu-ai": {
    "en": {
      "title": "Z.ai",
      "description": "Chinese artificial intelligence company",
      "extract": "Z.AI Co., Ltd., branded internationally as Z.ai, is a Chinese artificial intelligence company; their flagship product is the GLM family of open weights large language models (LLMs). Formerly known as Zhipu AI outside China until 2025, it is China's first major LLM company to make initial public offering, on the Hong Kong Stock Exchange in January 2026. With a market capitalization of US$62 billion as of August 2026, it is the most valuable public AI pure play in China.",
      "url": "https://en.wikipedia.org/wiki/Z.ai"
    },
    "zh": {
      "title": "智谱",
      "extract": "北京智谱华章科技有限公司 是中国一家开发用于人工智能的大型語言模型的高新技术企业。",
      "url": "https://zh.wikipedia.org/wiki/%E6%99%BA%E8%B0%B1"
    },
    "wikidataDescription": {
      "en": "Chinese technology company based in Beijing"
    }
  },
  "company:01-ai": {
    "en": {
      "title": "01.AI",
      "description": "Chinese artificial intelligence company",
      "extract": "01.AI is an artificial intelligence (AI) company based in Beijing, China. It focuses on developing open source products. It is one of China's 6 \"AI Tigers\".",
      "url": "https://en.wikipedia.org/wiki/01.AI"
    },
    "wikidataDescription": {
      "en": "artificial intelligence company"
    }
  },
  "company:baichuan": {
    "en": {
      "title": "Baichuan",
      "description": "Chinese artificial intelligence company",
      "extract": "Baichuan AI is an artificial intelligence (AI) company based in Beijing, China. As of 2024, it has been dubbed one of China's 6 \"AI Tiger\" companies by investors.",
      "url": "https://en.wikipedia.org/wiki/Baichuan"
    },
    "wikidataDescription": {
      "en": "artificial intelligence company"
    }
  },
  "company:cambricon": {
    "en": {
      "title": "Cambricon Technologies",
      "description": "Chinese artificial intelligence chip manufacturer",
      "extract": "Cambricon Technologies is a partially state-owned publicly listed Chinese technology company headquartered in Beijing.",
      "url": "https://en.wikipedia.org/wiki/Cambricon_Technologies"
    },
    "zh": {
      "title": "寒武紀科技",
      "description": "中国大陆人工智能芯片公司",
      "extract": "寒武紀科技，是北京市一家專注於人工智慧晶片設計與銷售的民營企業。公司成立於2016年，名稱寓意「寒武紀生命大爆發」，冀望人工智慧技術能為世界帶來劃時代的革新。其創辦人陳天石與兄長陳云霁均出身中國科學院，公司技術亦脫胎於此。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AF%92%E6%AD%A6%E7%B4%80%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Chinese artificial intelligence chip manufacturer",
      "zh": "中国大陆人工智能芯片公司"
    }
  },
  "company:horizon-robotics": {
    "en": {
      "title": "Horizon Robotics",
      "description": "Chinese AI chip company",
      "extract": "Horizon Robotics, Inc. is a Chinese technology company headquartered in Beijing. The company develops artificial intelligence (AI) chips used in self-driving cars and advanced driver assistance systems (ADAS).",
      "url": "https://en.wikipedia.org/wiki/Horizon_Robotics"
    },
    "zh": {
      "title": "地平线机器人",
      "extract": "地平線機械人 是一家在中華人民共和國從事汽车智能芯片的企業集團。",
      "url": "https://zh.wikipedia.org/wiki/%E5%9C%B0%E5%B9%B3%E7%BA%BF%E6%9C%BA%E5%99%A8%E4%BA%BA"
    },
    "wikidataDescription": {
      "en": "Chinese AI chip company"
    }
  },
  "company:weride": {
    "en": {
      "title": "WeRide",
      "description": "Autonomous driving technology company",
      "extract": "WeRide Inc. is an autonomous driving technology company. It holds driverless permits in 9 countries including China, the US, the UAE, Saudi Arabia, Belgium, Switzerland, Singapore, Spain and France. Its autonomous vehicles have been deployed across more than 60 cities in 13 countries.",
      "url": "https://en.wikipedia.org/wiki/WeRide"
    },
    "wikidataDescription": {
      "en": "autonomous driving technology company",
      "zh": "自动驾驶技术公司"
    }
  },
  "company:yahoo": {
    "en": {
      "title": "Yahoo",
      "description": "American web portal",
      "extract": "Yahoo is an American web portal based in Sunnyvale, California. It provides the search engine Yahoo Search and related services including My Yahoo, Yahoo Mail, Yahoo News, Yahoo Finance, Yahoo Sports, y!entertainment, yahoo!life, and its advertising platform, Yahoo Native. It is operated by the namesake company Yahoo! Inc., which is 90% owned by Apollo Global Management and 10% by Verizon.",
      "url": "https://en.wikipedia.org/wiki/Yahoo"
    },
    "zh": {
      "title": "雅虎",
      "description": "Web服務提供商，其Web門戶和搜索引擎",
      "extract": "雅虎 是一家美國網際網路服務提供商，品牌旗下知名服務有入口網站、電子信箱、體育以及新聞等服務。目前總部位於加州的森尼韋爾市。由阿波羅全球管理公司管理的投資基金持有90%的股份，威訊通訊持有10%的股份。",
      "url": "https://zh.wikipedia.org/wiki/%E9%9B%85%E8%99%8E"
    },
    "wikidataDescription": {
      "en": "web portal and search engine",
      "zh": "Web服務提供商，其Web門戶和搜索引擎"
    }
  },
  "company:youtube": {
    "en": {
      "title": "YouTube",
      "description": "Video-sharing platform",
      "extract": "YouTube is an American online video-sharing platform owned by Google. YouTube was founded on February 14, 2005, by Chad Hurley, Jawed Karim, and Steve Chen who were all former employees at PayPal. Headquartered in San Bruno, California, it is the second-most-visited website in the world, after Google itself. In January 2024, YouTube had reached more than 2.7 billion monthly active users, who collectively watched more than one billion hours of video every day. As of May 2019, videos were being uploaded to the platform at a rate of more than 500 hours of video per minute, and as of mid-2024, there were approximately 14.8 billion videos in total.",
      "url": "https://en.wikipedia.org/wiki/YouTube"
    },
    "zh": {
      "title": "YouTube",
      "description": "Google旗下的影片分享平台",
      "extract": "YouTube是源自美国的影片分享網站，也是目前世界最大的線上影片平台，由前PayPal员工查德·赫利、陈士骏和贾韦德·卡里姆于2005年2月14日创立，总部位于美国加州的圣布鲁诺。其名稱由「你」（you）與「映像管」（tube）組合而成。最初其被制作为可上传影片的婚恋交友平台，后改为影片分享网站并得到大众欢迎。2006年11月，Google公司（现Alphabet公司旗下子公司）以16.5亿美元收购YouTube；由於日後Google在數位內容產業的巨大影響力，使其成为全球最大的用户生成内容平台之一。",
      "url": "https://zh.wikipedia.org/wiki/YouTube"
    },
    "wikidataDescription": {
      "en": "American video-sharing platform owned by Alphabet Inc.",
      "zh": "视频分享网站"
    }
  },
  "company:databricks": {
    "en": {
      "title": "Databricks",
      "description": "San Francisco-based software company",
      "extract": "Databricks, Inc. is an American data and artificial intelligence software company headquartered in San Francisco, California. It was founded in 2013 by the original creators of Apache Spark at the University of California, Berkeley. It offers a cloud-based platform for data analytics and artificial intelligence. It operates natively across Amazon Web Services, Microsoft Azure, and Google Cloud Platform. The platform includes an open data marketplace built on the Delta Sharing protocol, and functions as a managed AI infrastructure provider by providing proprietary foundation models—including those from OpenAI, Anthropic, and Google Gemini—directly within its secure perimeter.",
      "url": "https://en.wikipedia.org/wiki/Databricks"
    },
    "wikidataDescription": {
      "en": "American technology company"
    }
  },
  "company:binance": {
    "en": {
      "title": "Binance",
      "description": "International, multi-language cryptocurrency exchange",
      "extract": "Binance Holdings Ltd., branded Binance, is the largest cryptocurrency exchange in terms of daily trading volume of cryptocurrencies. Binance was founded in 2017 by Changpeng Zhao. It was initially based in China, then moved to Japan, subsequently left Japan for Malta, and currently has no official company headquarters.",
      "url": "https://en.wikipedia.org/wiki/Binance"
    },
    "zh": {
      "title": "幣安",
      "description": "虛擬貨幣交易所",
      "extract": "币安，是一家全球性的加密貨幣交易所，提供超100种加密货币交易服务，包括期权、现货、u本位合约、币本位合约等交易产品。",
      "url": "https://zh.wikipedia.org/wiki/%E5%B9%A3%E5%AE%89"
    },
    "wikidataDescription": {
      "en": "cryptocurrency exchange",
      "zh": "加密货币交易所"
    }
  },
  "company:bitmain": {
    "en": {
      "title": "Bitmain",
      "description": "Chinese software and hardware company",
      "extract": "Bitmain Technologies Ltd., is a privately owned company headquartered in Beijing, China, that designs application-specific integrated circuit (ASIC) chips for bitcoin mining.",
      "url": "https://en.wikipedia.org/wiki/Bitmain"
    },
    "zh": {
      "title": "比特大陆",
      "extract": "比特大陆科技有限公司 是2013年在中華人民共和國北京市建立的半導體設計公司，主要为加密货币设计挖矿特殊應用積體電路(ASIC)。",
      "url": "https://zh.wikipedia.org/wiki/%E6%AF%94%E7%89%B9%E5%A4%A7%E9%99%86"
    },
    "wikidataDescription": {
      "en": "Chinese software company"
    }
  },
  "company:sea": {
    "en": {
      "title": "Sea Ltd",
      "description": "Singaporean technology company",
      "extract": "Sea Limited is a tech conglomerate headquartered in Singapore. It is listed on the New York Stock Exchange, with revenue of US$16.8 billion (2024). Sea currently functions as a holding company for Garena, Monee and Shopee, the largest e-commerce platform in Southeast Asia.",
      "url": "https://en.wikipedia.org/wiki/Sea_Ltd"
    },
    "zh": {
      "title": "冬海集团",
      "description": "新加坡企业",
      "extract": "冬海集团 由李小冬于2009年创立，总部位于新加坡。冬海集团市值在2020年8月23日达到720亿美元。 腾讯2022年2月降低冬海集團持股至18%，並於2022年9月6日公告騰訊在Sea董事會中的代表任宇昕已辭任，騰訊並永久放棄對Sea集團的全部投票權，退出Sea集團董事會。",
      "url": "https://zh.wikipedia.org/wiki/%E5%86%AC%E6%B5%B7%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Singaporean company",
      "zh": "新加坡企业"
    }
  },
  "company:grab": {
    "en": {
      "title": "Grab Holdings",
      "description": "Singaporean technology company",
      "extract": "Grab Holdings Inc. is a Singaporean multinational technology company headquartered in one-north, Singapore. It is the developer of a super-app for ride-hailing, food delivery, and digital payment services on mobile devices. It operates in Singapore, Malaysia, Cambodia, Indonesia, Myanmar, the Philippines, Thailand, and Vietnam.",
      "url": "https://en.wikipedia.org/wiki/Grab_Holdings"
    },
    "zh": {
      "title": "Grab",
      "description": "東南亞科技公司，總部位於新加坡與印尼",
      "extract": "Grab（前身为MyTeksi）是一間在東南亞地區由馬來西亞華裔成立的提供服務的技術公司和交通網路公司，總部置於新加坡，由陳炳耀和陳慧玲于2012年在馬來西亞雪蘭莪州八打靈再也創立的行動應用程式。該應用連結乘客和司機，提供載客車輛租賃及即時共乘的分享型經濟服務。乘客可以透過傳送簡訊或是使用流動應用程式來預約這些載客的車輛，利用行動應用程式時還可以追蹤車輛的位置。2019冠状病毒病疫情後開始經營外賣、送貨、電子商務等等，成為全方面的生活平台。",
      "url": "https://zh.wikipedia.org/wiki/Grab"
    },
    "wikidataDescription": {
      "en": "Southeast Asian technology company headquartered in Singapore",
      "zh": "東南亞科技公司，總部位於新加坡與印尼"
    }
  },
  "company:razer": {
    "en": {
      "title": "Razer Inc.",
      "description": "Singaporean-American technology company",
      "extract": "Razer Inc. is a Singaporean-American multinational corporation and technology company that manufactures, develops, and markets gaming-focused computer hardware and other consumer electronics as well as financial services.",
      "url": "https://en.wikipedia.org/wiki/Razer_Inc."
    },
    "zh": {
      "title": "雷蛇公司",
      "description": "科技產品公司",
      "extract": "雷蛇 是一家在新加坡創立的遊戲周邊設備公司，又被戲稱為「綠光燈廠」，後開始進軍電子消費業務。雷蛇的兩個總部分別設立在新加坡及美国聖地牙哥。2017年11月在香港交易所上市，直至2022年5月13日撤銷上市止，产品面向游戏玩家，其产品大多数都以肉食动物命名。2018年推出電子錢包Razer Pay。2020年，開始生產外科口罩。",
      "url": "https://zh.wikipedia.org/wiki/%E9%9B%B7%E8%9B%87%E5%85%AC%E5%8F%B8"
    },
    "wikidataDescription": {
      "en": "Singaporean-American technological company which specializes in products marketed to gamers",
      "zh": "科技產品公司"
    }
  },
  "company:tokopedia": {
    "en": {
      "title": "Tokopedia",
      "description": "Indonesian e-commerce company",
      "extract": "PT Tokopedia is an Indonesian e-commerce company. Tokopedia is a subsidiary of GoTo, following a merger with Gojek on 17 May 2021. It is one of the most visited e-commerce platforms in Indonesia.",
      "url": "https://en.wikipedia.org/wiki/Tokopedia"
    },
    "wikidataDescription": {
      "en": "Indonesian e-commerce company"
    }
  },
  "company:coursera": {
    "en": {
      "title": "Coursera",
      "description": "Online education technology company",
      "extract": "Coursera Inc. is an American for-profit online learning platform, originally known for offering massive open online courses (MOOCs). It was founded in 2012 by Stanford University computer science professors Andrew Ng and Daphne Koller. Coursera works with universities and other organizations to offer online courses, certifications, and degrees in a variety of subjects.",
      "url": "https://en.wikipedia.org/wiki/Coursera"
    },
    "zh": {
      "title": "Coursera",
      "description": "線上教育科技公司",
      "extract": "Coursera 是由斯坦福大学的计算机科学教授吴恩达和达芙妮·科勒联合创建的一个營利性的教育科技公司。 Coursera与多家大学合作，给大众带来一些在线免费课堂。在Knowledge@Wharton座谈会上，Daphne Koller在采访中说道，截至到2012年11月，Coursera上有来自196国家的超过190万人。他们至少注册过一门课堂，尽管有数百万人注册过课堂，但完成率仅是7-9%。",
      "url": "https://zh.wikipedia.org/wiki/Coursera"
    },
    "wikidataDescription": {
      "en": "online education technology company",
      "zh": "在线教育科技公司"
    }
  },
  "company:llamaindex": {
    "en": {
      "title": "LlamaIndex",
      "description": "American artificial intelligence company",
      "extract": "LlamaIndex is an American artificial intelligence company headquartered in San Francisco, California. LlamaIndex specializes in agentic optical character recognition (OCR) and document intelligence infrastructure, developing tools and frameworks that enable large language models (LLMs) to ingest, index, and query structured and unstructured data sources.",
      "url": "https://en.wikipedia.org/wiki/LlamaIndex"
    }
  },
  "company:vipkid": {
    "en": {
      "title": "VIPKid",
      "description": "Global EdTech company",
      "extract": "VIPKid, also known as VIPKID, is an online teaching and education company.",
      "url": "https://en.wikipedia.org/wiki/VIPKid"
    },
    "zh": {
      "title": "VIPKid",
      "extract": "VIPKid也称为VIPKID，是一家在线教学和教育公司。总部位于新加坡。",
      "url": "https://zh.wikipedia.org/wiki/VIPKid"
    },
    "wikidataDescription": {
      "en": "educational technology company"
    }
  },
  "company:tal-education": {
    "en": {
      "title": "TAL Education Group",
      "description": "Education institution of China",
      "extract": "TAL Education Group, which stands for \"Tomorrow Advancing Life\", is a Chinese holding company that offers after-school education and tutoring for students in primary and secondary school. It is headquartered in Beijing, China. The company was founded in August 2003 by Zhang Bangxin and Cao Yundong, as \"Xueersi\".",
      "url": "https://en.wikipedia.org/wiki/TAL_Education_Group"
    },
    "zh": {
      "title": "好未来",
      "description": "中國課外輔導教育機構",
      "extract": "北京世纪好未来教育科技有限公司，是中國大陸的一間專為中小学生提供课外輔導的教育機構，公司总部位于中华人民共和国北京市，該公司由张邦鑫和曹允东于2003年8月創辦。成立最初的公司名稱是學而思；於2013年8月19日時，學而思更名為好未来。",
      "url": "https://zh.wikipedia.org/wiki/%E5%A5%BD%E6%9C%AA%E6%9D%A5"
    },
    "wikidataDescription": {
      "en": "after-school education institution of China",
      "zh": "中國課外輔導教育機構"
    }
  },
  "company:futu": {
    "en": {
      "title": "Futu",
      "description": "Hong Kong financial technology company",
      "extract": "Futu Holdings Limited is a Cayman Islands-incorporated financial technology holding company headquartered in Hong Kong. Through its subsidiaries, it provides online securities brokerage, margin financing and securities lending, wealth management, and corporate and institutional services. Its main digital platforms are Futubull, used primarily in Hong Kong, and Moomoo, its international platform. Its ADR have traded on the Nasdaq since March 2019.",
      "url": "https://en.wikipedia.org/wiki/Futu"
    },
    "zh": {
      "title": "富途",
      "description": "数字经纪和财富管理平台的控股公司。",
      "extract": "富途证券国际（香港）有限公司，简称富途证券或富途牛牛，是一家總部位於香港的中國证券公司，受香港证监会监管，中央编号为AZT137。富途证劵国际有限公司也是香港交易所参与者，代号为01955。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AF%8C%E9%80%94"
    },
    "wikidataDescription": {
      "en": "Hong Kong online brokerage",
      "zh": "数字经纪和财富管理平台的控股公司。"
    }
  },
  "company:anker": {
    "en": {
      "title": "Anker",
      "description": "Chinese electronics brand",
      "extract": "Anker Innovations Co., Ltd, commonly known as Anker, is a Chinese electronics manufacturer based in Changsha, Hunan, China. The company's products are phone chargers, car chargers, power banks, earbuds, headphones, speakers, data hubs, 3D printers, charging cables, torches (flashlights), screen protectors, portable power stations, home solar batteries, and smart home devices.",
      "url": "https://en.wikipedia.org/wiki/Anker"
    },
    "zh": {
      "title": "安克创新",
      "description": "湖南省电子公司",
      "extract": "安克创新科技股份有限公司，简称安克创新或安克（Anker），是一家消费电子企业，总部位于中国湖南省长沙市。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AE%89%E5%85%8B%E5%88%9B%E6%96%B0"
    },
    "wikidataDescription": {
      "en": "brand of electronics and accessories",
      "zh": "中国电子公司"
    }
  },
  "company:insta360": {
    "en": {
      "title": "Insta360",
      "description": "Chinese camera company",
      "extract": "Arashi Vision Inc., doing business as Insta360, is a Chinese camera and imaging technology company headquartered in Shenzhen, China with offices in Los Angeles, Tokyo and Berlin. It produces action cameras, 360-degree cameras, and stereoscopic 180-degree cameras, as well as video editing software for mobile and desktop platforms. Its products are used in action sports, travel recording, and other outdoor video applications. It has collaborated with Leica Camera on imaging technology, including action cameras such as the Insta360 Ace Pro series.",
      "url": "https://en.wikipedia.org/wiki/Insta360"
    },
    "zh": {
      "title": "影石科技",
      "description": "中國相機研發公司",
      "extract": "影石科技，全名影石创新科技股份有限公司，又稱Insta360影石，或Insta360，是中华人民共和国一家銷售攝、錄用器材與配件的企業，以生产、研发全景相机为主，兼顾运动相机的科技廠商。该公司总部位于广东省深圳市，在深圳、香港、洛杉矶、东京、柏林有設計办公室。",
      "url": "https://zh.wikipedia.org/wiki/%E5%BD%B1%E7%9F%B3%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Chinese action camera manufacturer",
      "zh": "Insta360致力于成为全景影像技术研发的专业智能科技公司，由刘靖康及其团队创办于2014年。在Insta360官网，你可以了解到Insta360 ONE、Insta360 Nano、Insta360 Air等消费级全景相机以及Insta360 Pro专业级全景相机。"
    }
  },
  "company:ecovacs": {
    "en": {
      "title": "Ecovacs Robotics",
      "description": "Chinese in-home robotics appliances company",
      "extract": "Ecovacs Robotics is a Chinese technology company. It is best known for developing in-home robotic appliances. The company was founded in 1998 by Qian Dongqi and is headquartered in Suzhou, China. According to Global Asia, Ecovacs Robotics had more than 60% of the Chinese market for robots by 2013. In 2023, Nikkei Asia had reported that the market capitalisation of Ecovacs Robotics has grown to near $6.38 billion, which is \"roughly 5 times\" that of the market capitalisation of rivalling US based iRobot, who manufactures the Roomba.",
      "url": "https://en.wikipedia.org/wiki/Ecovacs_Robotics"
    },
    "zh": {
      "title": "科沃斯機器人",
      "description": "家用机器人公司",
      "extract": "科沃斯机器人 是一家中国主要生產家用機器人的公司。",
      "url": "https://zh.wikipedia.org/wiki/%E7%A7%91%E6%B2%83%E6%96%AF%E6%A9%9F%E5%99%A8%E4%BA%BA"
    },
    "wikidataDescription": {
      "en": "Chinese in-home robotics appliances company",
      "zh": "家用机器人公司"
    }
  },
  "company:nothing": {
    "en": {
      "title": "Nothing (company)",
      "description": "London-based consumer electronics manufacturer",
      "extract": "Nothing Technology Limited is a British consumer electronics company headquartered in London. It was co-founded in 2020 by Carl Pei, alongside Akis Evangelidis, David Sanmartín García, Steven Gao, and Levi Li, among others The company develops smartphones, audio products, and related software, positioning itself as a design-focused challenger brand.",
      "url": "https://en.wikipedia.org/wiki/Nothing_(company)"
    },
    "zh": {
      "title": "Nothing",
      "extract": "Nothing是一家總部位於英國倫敦的消費電子產品製造商。由中國智慧手機製造商OnePlus的聯合創始人裴宇創立。",
      "url": "https://zh.wikipedia.org/wiki/Nothing"
    },
    "wikidataDescription": {
      "en": "English technology company based in London, England"
    }
  },
  "company:perfect-world": {
    "en": {
      "title": "Perfect World (company)",
      "description": "Chinese video game company",
      "extract": "Perfect World Co., Ltd. is a Chinese mass media company based in Beijing. It was founded in 2004 by Chi Yufeng. The company consists of two business segments: Perfect World Games, a video game publisher, and Perfect World Pictures, a film production company.",
      "url": "https://en.wikipedia.org/wiki/Perfect_World_(company)"
    },
    "zh": {
      "title": "完美世界 (公司)",
      "description": "中國電子遊戲公司",
      "extract": "完美世界股份有限公司（原完美時空）（简称“完美世界”）为大众媒体旗下上市公司，涵盖完美世界影视和完美世界游戏两大业务板块。",
      "url": "https://zh.wikipedia.org/wiki/%E5%AE%8C%E7%BE%8E%E4%B8%96%E7%95%8C_(%E5%85%AC%E5%8F%B8)"
    },
    "wikidataDescription": {
      "en": "Chinese video game company",
      "zh": "中国电子游戏公司"
    }
  },
  "company:shanda": {
    "en": {
      "title": "Shanda",
      "description": "Chinese video game developer",
      "extract": "The Shanda Group is a privately owned multinational investment firm. With offices in Shanghai, Singapore, Hong Kong, New York and Redwood City, the firm invests in public markets, real estate and venture capital, focusing on companies in the fields of healthcare, financial services, media, and technology.",
      "url": "https://en.wikipedia.org/wiki/Shanda"
    },
    "zh": {
      "title": "盛大网络",
      "description": "中國電子遊戲開發商",
      "extract": "上海盛大网络发展有限公司 是中国的网络游戏运营商。",
      "url": "https://zh.wikipedia.org/wiki/%E7%9B%9B%E5%A4%A7%E7%BD%91%E7%BB%9C"
    },
    "wikidataDescription": {
      "en": "Chinese video game developer",
      "zh": "中國電子遊戲開發商"
    }
  },
  "company:pingcap": {
    "en": {
      "title": "PingCAP",
      "description": "Database software company",
      "extract": "PingCAP is an enterprise software company that develops TiDB, an open-source distributed SQL database, and TiKV, its underlying distributed key-value storage engine. Founded in Beijing in 2015, the company later established its headquarters in Sunnyvale, California, and also has offices in Singapore, Kuala Lumpur, and Tokyo.",
      "url": "https://en.wikipedia.org/wiki/PingCAP"
    }
  },
  "company:yonyou": {
    "en": {
      "title": "Yonyou",
      "description": "Enterprise management software company",
      "extract": "Yonyou is a Chinese company, principally engaged in the development and distribution of enterprise management software and cloud services.",
      "url": "https://en.wikipedia.org/wiki/Yonyou"
    },
    "zh": {
      "title": "用友",
      "description": "中国IT企业",
      "extract": "用友网络科技股份有限公司 是中國企业云服务与软件供应商，在财务、人力、供应链、营销、采购、制造、研发、项目、资产、协同等10大领域为客户提供企业云服务产品与解决方案。到2023年，用友已在全球拥有230多个分支机构和10,000多家生态伙伴。",
      "url": "https://zh.wikipedia.org/wiki/%E7%94%A8%E5%8F%8B"
    },
    "wikidataDescription": {
      "en": "Enterprise management software and cloud services company",
      "zh": "中国IT企业"
    }
  },
  "company:bgi": {
    "en": {
      "title": "BGI Group",
      "description": "Chinese genome sequencing company",
      "extract": "BGI Group, formerly Beijing Genomics Institute, is a Chinese genomics company with headquarters in Yantian, Shenzhen. The company was originally formed in 1999 as a genetics research center to participate in the Human Genome Project. It also sequences the genomes of other animals, plants and microorganisms.",
      "url": "https://en.wikipedia.org/wiki/BGI_Group"
    },
    "zh": {
      "title": "华大集团",
      "extract": "华大集团是一个于1999年在北京成立的公司。其子公司包括华大基因、华大智造等。2007年，公司总部搬遷至中国广东深圳。該公司因被指與中國人民解放軍有過合作而被美国政府列入1260H清单。",
      "url": "https://zh.wikipedia.org/wiki/%E5%8D%8E%E5%A4%A7%E9%9B%86%E5%9B%A2"
    },
    "wikidataDescription": {
      "en": "Chinese life science group that operates multiple research labs and entities in the field of genomics, healthcare, precision medicine, and more"
    }
  },
  "company:wuxi-apptec": {
    "en": {
      "title": "WuXi AppTec",
      "description": "Chinese pharmaceutical and medical device company",
      "extract": "WuXi AppTec Co., Ltd. is a Chinese provider of contract research, development, and manufacturing, services for the pharmaceutical and life-sciences industry, headquartered in Shanghai, China. The company operates research and manufacturing facilities in Asia, North America, and Europe.",
      "url": "https://en.wikipedia.org/wiki/WuXi_AppTec"
    },
    "zh": {
      "title": "药明康德",
      "extract": "无锡药明康德新药开发股份有限公司，是一家制药、生物技术以及医疗器械研发开放式能力和技术平台公司。公司总部位于中国上海，工厂或服务中心分布在天津、武汉、苏州、无锡、常州、南京、北京、上海、广州。另外国际领域在美国、冰岛、德国、以色列、韩国均有其分公司。",
      "url": "https://zh.wikipedia.org/wiki/%E8%8D%AF%E6%98%8E%E5%BA%B7%E5%BE%B7"
    },
    "wikidataDescription": {
      "en": "Chinese public (bio)pharmaceutical, medical device and pharmaceutical services company",
      "zh": "制药公司"
    }
  },
  "company:beigene": {
    "en": {
      "title": "BeOne Medicines",
      "description": "Global biotechnology company",
      "extract": "BeOne Medicines, formerly known as BeiGene, Ltd. is a multinational oncology company. It specializes in the development of drugs for cancer treatment.",
      "url": "https://en.wikipedia.org/wiki/BeOne_Medicines"
    },
    "zh": {
      "title": "百济神州",
      "extract": "百济神州有限公司 是一家全球生物技术公司。",
      "url": "https://zh.wikipedia.org/wiki/%E7%99%BE%E6%B5%8E%E7%A5%9E%E5%B7%9E"
    },
    "wikidataDescription": {
      "en": "company in Cambridge, Massachusetts, USA."
    }
  },
  "company:kanzhun": {
    "en": {
      "title": "Boss Zhipin",
      "description": "Chinese recruitment company",
      "extract": "Kanzhun Limited is a publicly listed Chinese human resources company that focuses on providing online recruitment services through its mobile app, Boss Zhipin.",
      "url": "https://en.wikipedia.org/wiki/Boss_Zhipin"
    },
    "zh": {
      "title": "BOSS直聘",
      "description": "中国招聘网站",
      "extract": "BOSS直聘 是中國的一個招聘網站和手機應用程序，由看准科技有限公司持有。BOSS直聘自稱能讓公司人力資源管理者和部門經理与求职者在线聊天。",
      "url": "https://zh.wikipedia.org/wiki/BOSS%E7%9B%B4%E8%81%98"
    },
    "wikidataDescription": {
      "en": "Chinese recruitment company",
      "zh": "中国招聘网站"
    }
  },
  "company:oneplus": {
    "en": {
      "title": "OnePlus",
      "description": "Chinese consumer electronics manufacturer",
      "extract": "OnePlus Technology (Shenzhen) Co., Ltd., doing business as OnePlus, is a Chinese consumer electronics manufacturer backed by Oppo headquartered in Shenzhen, Guangdong, China.",
      "url": "https://en.wikipedia.org/wiki/OnePlus"
    },
    "zh": {
      "title": "一加",
      "description": "中国手机制造商",
      "extract": "一加 是中國一家行動通訊終端裝置研製與軟件開發的企業，於2012年10月14日由OPPO前员工劉作虎和裴宇主導成立，其產品於全球多國市場銷售，口号为“不将就 ”。",
      "url": "https://zh.wikipedia.org/wiki/%E4%B8%80%E5%8A%A0"
    },
    "wikidataDescription": {
      "en": "Chinese consumer electronics manufacturer, a subsidiary of Oppo",
      "zh": "中国手机制造商"
    }
  },
  "company:realme": {
    "en": {
      "title": "Realme",
      "description": "Chinese consumer electronics manufacturer, a subsidiary of Oppo",
      "extract": "realme is a multinational Chinese consumer electronics manufacturer backed by Oppo based in Shenzhen, Guangdong. In 2021, realme had risen to become the sixth‑largest smartphone vendor worldwide in terms of shipments in the overall global smartphone market. In 2026 it was being reintegrated into Oppo as a sub-brand.",
      "url": "https://en.wikipedia.org/wiki/Realme"
    },
    "wikidataDescription": {
      "en": "Chinese consumer electronics manufacturer, a sub-brand of Oppo",
      "zh": "中国大陆手机制造商"
    }
  },
  "company:tcl": {
    "en": {
      "title": "TCL Technology",
      "description": "Chinese multinational electronics company",
      "extract": "TCL Technology Group Corp., claimed to be an abbreviation for The Creative Life, is a Chinese partially state-owned electronics company headquartered in Huizhou, Guangdong province. TCL develops, manufactures, and sells consumer electronics like television sets, mobile phones, air conditioners, washing machines, refrigerators, and small electrical appliances. In 2010, it was the world's 25th-largest consumer electronics producer. On 7 February 2020, TCL Corporation changed its name to TCL Technology. It was the second-largest television manufacturer by market share in 2022 and 2023.",
      "url": "https://en.wikipedia.org/wiki/TCL_Technology"
    },
    "zh": {
      "title": "TCL科技",
      "description": "中國跨國科技公司",
      "extract": "TCL科技集团 是一家总部位于中華人民共和國广东省惠州的电子、电器制造企业。TCL集团生产移动电话、个人电脑、家用电器、电气照明和数位媒體 、平板電視并在中国大陸内外销售。TCL是在深圳证券交易所和香港交易所上市的公司。TCL的品牌形象一直围绕“T”“C”“L”三个字母组成，品牌解释为“創意感動生活”。",
      "url": "https://zh.wikipedia.org/wiki/TCL%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Chinese multinational technology company",
      "zh": "中国跨国科技公司"
    }
  },
  "company:kingdee": {
    "en": {
      "title": "Kingdee",
      "description": "Hong Kong Stock Exchange main board listed company",
      "extract": "Kingdee International Software Group is a Chinese cloud computing and software company based in Shenzhen. It is listed on the Hong Kong Stock Exchange main board and is leader in the Chinese software industry.",
      "url": "https://en.wikipedia.org/wiki/Kingdee"
    },
    "zh": {
      "title": "金蝶國際",
      "description": "中国的一家软件公司",
      "extract": "金蝶国际软件集团有限公司 是一家中国软件開發企业和香港证交所主板上市公司，总部位于中国深圳，始创于1993年8月8日。創辦人為徐少春。",
      "url": "https://zh.wikipedia.org/wiki/%E9%87%91%E8%9D%B6%E5%9C%8B%E9%9A%9B"
    },
    "wikidataDescription": {
      "en": "Hong Kong Stock Exchange main board listed company",
      "zh": "中国的一家软件公司"
    }
  },
  "company:marvell": {
    "en": {
      "title": "Marvell Technology",
      "description": "American semiconductor company",
      "extract": "Marvell Technology, Inc. is an American company, headquartered in Santa Clara, California, which develops and produces semiconductors and related technology. Founded in 1995, the company had close to 7,500 employees as of 2026, with over 10,000 patents worldwide, and an annual revenue of $8.2 billion for fiscal 2026.",
      "url": "https://en.wikipedia.org/wiki/Marvell_Technology"
    },
    "zh": {
      "title": "美滿電子科技",
      "description": "美国半导体公司",
      "extract": "邁威爾科技有限公司 是一家美國晶片製造商，主要生產用於存儲、通訊和消費性電子產品的晶片。公司由周秀文 博士及其妻戴伟立 、其弟周秀武三人於1995年共同創立，總部位於美國加州聖塔克拉拉。該公司2010年在全球二十大半導體廠商中排名第十八。",
      "url": "https://zh.wikipedia.org/wiki/%E7%BE%8E%E6%BB%BF%E9%9B%BB%E5%AD%90%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "American fabless semiconductor company",
      "zh": "美国半导体公司"
    }
  },
  "company:creative-technology": {
    "en": {
      "title": "Creative Technology",
      "description": "Singaporean technology company",
      "extract": "Creative Technology Ltd., or Creative Labs Pte Ltd., is a Singaporean multinational electronics company mainly dealing with audio technologies and products such as speakers, headphones, sound cards and other digital media. Founded by Sim Wong Hoo, Creative was highly influential in the advancement of PC audio in the 1990s following the introduction of its Sound Blaster card and technologies; the company continues to develop Sound Blaster products including embedding them within partnered mainboard manufacturers and laptops.",
      "url": "https://en.wikipedia.org/wiki/Creative_Technology"
    },
    "zh": {
      "title": "创新科技",
      "extract": "創新科技有限公司，是新加坡電腦多媒體製造商，1981年7月1日由新加坡企業家沈望傅創立。創新科技在世界其他地區的分部稱為Creative Labs, Inc.；在台灣曾用中文譯名「創巨科技」，之後改成「創新未來」。創新科技自成立以來陸續併購了Ensoniq、E-MU Systems、Cambridge SoundWorks、Aureal、3DLABS、Ectiva、Share Vision、Digicom與Silicon Engineering等公司。",
      "url": "https://zh.wikipedia.org/wiki/%E5%88%9B%E6%96%B0%E7%A7%91%E6%8A%80"
    },
    "wikidataDescription": {
      "en": "Singaporean technological company"
    }
  },
  "company:kingsoft": {
    "en": {
      "title": "Kingsoft",
      "description": "Chinese software company",
      "extract": "Kingsoft Corporation is a Chinese software company based in Beijing. Kingsoft operates four subsidiaries: Seasun for video game development, Cheetah Mobile for mobile internet apps, Kingsoft Cloud for cloud storage platforms, and Kingsoft Office Software for office software, including WPS Office. It also produced security software known as Kingsoft Security. The most popular game developed by Kingsoft is JX Online 3, launched in 2009.",
      "url": "https://en.wikipedia.org/wiki/Kingsoft"
    },
    "zh": {
      "title": "金山软件",
      "description": "软件企业",
      "extract": "金山软件有限公司，简称金山软件公司或金山公司，是中国大陸软件企业。总部位于北京市。公司机构分别设立在广东珠海、成都、大连、深圳，并在日本设有分公司。金山软件是中国大陸国内最大的个人桌面软件开发商之一，以WPS（文字处理系统）、金山词霸、金山快译、金山毒霸、剑侠情缘等而闻名。日前（截止2026年7月）金山软件股份有限公司旗下拥有5家子公司：猎豹移动、金山办公、西山居、金山云、金山世游。",
      "url": "https://zh.wikipedia.org/wiki/%E9%87%91%E5%B1%B1%E8%BD%AF%E4%BB%B6"
    },
    "wikidataDescription": {
      "en": "Chinese software company",
      "zh": "中国软件公司"
    }
  },
  "company:gigadevice": {
    "en": {
      "title": "GigaDevice",
      "description": "Chinese semiconductor company",
      "extract": "GigaDevice Semiconductor Inc. is a Chinese fabless semiconductor company that develops flash memory, microcontrollers (MCUs), sensor, analog products and solutions. Its flash memory portfolio includes SPI NOR Flash, SPI NAND Flash, and Parallel NAND Flash. Its microcontrollers are based on the ARM architecture, and RISC-V architecture.",
      "url": "https://en.wikipedia.org/wiki/GigaDevice"
    },
    "zh": {
      "title": "兆易创新",
      "extract": "兆易创新 是一家中国半导体公司。",
      "url": "https://zh.wikipedia.org/wiki/%E5%85%86%E6%98%93%E5%88%9B%E6%96%B0"
    },
    "wikidataDescription": {
      "en": "Chinese semiconductor company"
    }
  },
  "company:vipshop": {
    "en": {
      "title": "Vipshop",
      "description": "Chinese e-commerce company",
      "extract": "Vipshop is a Chinese company that operates the e-commerce website VIP.com specializing in online discount sales. Vipshop is based out of Guangzhou, Guangdong, China, and was listed on New York Stock Exchange (NYSE) on March 23, 2012.",
      "url": "https://en.wikipedia.org/wiki/Vipshop"
    },
    "zh": {
      "title": "唯品会",
      "description": "位于中华人民共和国的一个电商平台",
      "extract": "唯品会 是广州唯品会信息科技有限公司&唯品会（中国）有限公司运营的一家中文网络购物网站，以销售服装、化妆品为主，兼具发展小家电、玩具和日用品等其他多种商品的销售。总部设在中國广州，分別在上海、天津、成都、肇庆與武汉等地设立有分公司或者物流仓库。",
      "url": "https://zh.wikipedia.org/wiki/%E5%94%AF%E5%93%81%E4%BC%9A"
    },
    "wikidataDescription": {
      "en": "Chinese company",
      "zh": "位于中华人民共和国的一个电商平台"
    }
  },
  "company:dahua": {
    "en": {
      "title": "Dahua Technology",
      "description": "Chinese video surveillance products company",
      "extract": "Zhejiang Dahua Technology Co., Ltd. is a publicly traded company based in Binjiang District, Hangzhou, which manufactures video surveillance equipment. A minority of Dahua is state-owned.",
      "url": "https://en.wikipedia.org/wiki/Dahua_Technology"
    },
    "zh": {
      "title": "大华股份",
      "extract": "浙江大华技术股份有限公司，简称大华股份、大华科技，是一家位于中国杭州的视频监控设备和服务供应商，其市场份额2015年为世界第二。",
      "url": "https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%8D%8E%E8%82%A1%E4%BB%BD"
    },
    "wikidataDescription": {
      "en": "Chinese video surveillance products company"
    }
  },
  "company:webull": {
    "en": {
      "title": "Webull",
      "description": "Online brokerage and financial services company",
      "extract": "Webull Corporation, commonly known as Webull, is a financial services holding company incorporated in the Cayman Islands and headquartered in St. Petersburg, Florida. It owns and operates the Webull electronic trading platform for self-directed retail investors.",
      "url": "https://en.wikipedia.org/wiki/Webull"
    },
    "zh": {
      "title": "微牛證券",
      "extract": "微牛證券 是一家在開曼群島登記，總部設在紐約的控股公司。該公司由福米科技所有。2020年10月時，微牛證券的日活躍用戶數達到75萬人。",
      "url": "https://zh.wikipedia.org/wiki/%E5%BE%AE%E7%89%9B%E8%AD%89%E5%88%B8"
    },
    "wikidataDescription": {
      "en": "u.S.-based financial services company"
    }
  },
  "person:zhang-yiming": {
    "en": {
      "title": "Zhang Yiming",
      "description": "Chinese internet entrepreneur (born 1983)",
      "extract": "Zhang Yiming is a Chinese Internet entrepreneur. He founded ByteDance in 2012, developed the news aggregator Toutiao and the video sharing platform Douyin. Zhang is one of the richest individuals in the world, with an estimated net worth of US$92.8 billion as of June 2026, according to Bloomberg. On 4 November 2021, Zhang stepped down as CEO of ByteDance, completing a leadership handover announced in May 2021. According to Reuters, Zhang maintains over 50 percent of ByteDance's voting rights. The surging global popularity of TikTok made Zhang the richest man in China in 2024.",
      "url": "https://en.wikipedia.org/wiki/Zhang_Yiming"
    },
    "zh": {
      "title": "张一鸣",
      "description": "中國互聯網企業家",
      "extract": "张一鸣（1983年4月10日—），男，福建龙岩市永定區客家人，中国互联网企业家，原字节跳动董事长兼首席执行官。于2012年创建了字节跳动公司。旗下有产品今日头条、抖音和火山小视频等。在2026年福布斯中国富豪榜上，张一鸣以1008亿美元位列榜单第1名。",
      "url": "https://zh.wikipedia.org/wiki/%E5%BC%A0%E4%B8%80%E9%B8%A3"
    }
  },
  "person:liang-rubo": {
    "en": {
      "title": "ByteDance",
      "description": "Chinese Internet technology company",
      "extract": "ByteDance is a Chinese internet technology company based in Haidian, Beijing. Its associated variable interest entity, ByteDance Ltd, is incorporated in the Cayman Islands.",
      "url": "https://en.wikipedia.org/wiki/ByteDance"
    }
  },
  "person:liang-wenfeng": {
    "en": {
      "title": "Liang Wenfeng",
      "description": "Chinese businessman (born 1985)",
      "extract": "Liang Wenfeng is a Chinese entrepreneur and businessman who is the co-founder of the quantitative hedge fund High-Flyer, as well as the founder and CEO of its artificial intelligence company DeepSeek.",
      "url": "https://en.wikipedia.org/wiki/Liang_Wenfeng"
    },
    "zh": {
      "title": "梁文锋",
      "description": "中國商人、人工智能研究者",
      "extract": "梁文锋（1985年—），广东吴川人，中国工程师、企业家，对冲基金幻方量化的联合创始人，人工智能公司深度求索（Deepseek）的创始人兼首席执行官。截至2026年7月，梁文锋净资产达到360亿美元，在全球AI创业公司创始人中位列第一。",
      "url": "https://zh.wikipedia.org/wiki/%E6%A2%81%E6%96%87%E9%94%8B"
    }
  },
  "person:eric-yuan": {
    "en": {
      "title": "Eric Yuan",
      "description": "Chinese-American billionaire businessman",
      "extract": "Eric S Yuan is a Chinese-American billionaire businessman, engineer, and the chief executive officer and founder of Zoom Communications, of which he owns 22%.",
      "url": "https://en.wikipedia.org/wiki/Eric_Yuan"
    }
  },
  "person:tony-xu": {
    "en": {
      "title": "Tony Xu",
      "description": "CEO of DoorDash",
      "extract": "Tony Xu is a Chinese-born American billionaire businessman and the co-founder and CEO of DoorDash.",
      "url": "https://en.wikipedia.org/wiki/Tony_Xu"
    }
  },
  "person:alexandr-wang": {
    "en": {
      "title": "Alexandr Wang",
      "description": "American entrepreneur (born 1997)",
      "extract": "Alexandr Wang is an American entrepreneur. He has been the chief AI officer of Meta Platforms since 2025 and leads its Superintelligence Labs. He is the co-founder and former CEO of Scale AI, an artificial intelligence company that provides data labeling and large language model evaluation services to develop AI applications. In 2021, Wang became the world's youngest \"self-made billionaire\" at age 24. Forbes estimated his net worth at $3.6 billion as of April 2025.",
      "url": "https://en.wikipedia.org/wiki/Alexandr_Wang"
    }
  },
  "person:lei-jun": {
    "en": {
      "title": "Lei Jun",
      "description": "Chinese billionaire entrepreneur (born 1969)",
      "extract": "Lei Jun is a Chinese billionaire entrepreneur and computer engineer. He is known for being the founder, chairman, and CEO of the consumer electronics company Xiaomi. He also is the chairman of Kingsoft and Shunwei Capital. Lei has been a deputy to the National People's Congress of the People's Republic of China since 2013.",
      "url": "https://en.wikipedia.org/wiki/Lei_Jun"
    },
    "zh": {
      "title": "雷军",
      "description": "中国大陆企业家、天使投资人",
      "extract": "雷军（1969年12月16日—），湖北仙桃人，无党派人士，中国大陆企业家、天使投资人，正高级工程师职称。小米集團执行董事、董事長、首席执行官，曾任金山雲董事长，一度同時兼任金山、YY、猎豹移动等三家上市公司董事长。在2025年福布斯全球亿万富豪榜中排名第32位，财富值435亿美元。",
      "url": "https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%86%9B"
    },
    "wikidataDescription": {
      "en": "American baseball player (1925-1989)"
    }
  },
  "person:colin-huang": {
    "en": {
      "title": "Colin Huang",
      "description": "Chinese entrepreneur (born 1980)",
      "extract": "Colin Huang Zheng is a Chinese businessman, investor, and philanthropist. He is the founder and former CEO of the e-commerce company Pinduoduo, which is now the largest agriculture platform in China. Huang is also the owner of at least three other limited liability Cayman companies, including Pinduoduo.",
      "url": "https://en.wikipedia.org/wiki/Colin_Huang"
    },
    "zh": {
      "title": "黄峥",
      "description": "中国企业家",
      "extract": "黄峥（1980年4月16日—），中国大陆企业家，拼多多创始人、前董事长与CEO。",
      "url": "https://zh.wikipedia.org/wiki/%E9%BB%84%E5%B3%A5"
    }
  },
  "person:frank-wang": {
    "en": {
      "title": "Frank Wang",
      "description": "Founder of DJI (born 1980)",
      "extract": "Wang Tao, better known as Frank Wang, is a Chinese aerospace engineer and businessman. He is the founder and CEO of the Shenzhen-based technology company DJI, the world's largest manufacturer of commercial drones. As of December 2020, he has a net worth of US$4.8 billion.",
      "url": "https://en.wikipedia.org/wiki/Frank_Wang"
    }
  },
  "person:chris-xu": {
    "en": {
      "title": "Shein",
      "description": "Multinational online clothing retailer",
      "extract": "Shein is a global e-commerce platform specializing in fast fashion. While the company primarily focuses on women's clothing, it also offers men's apparel, children's wear, accessories, cosmetics, shoes, bags, and other fashion items. Shein mainly focuses on Europe, Americas, Australia, and the Middle East along with other consumer markets worldwide.",
      "url": "https://en.wikipedia.org/wiki/Shein"
    }
  },
  "person:yang-zhilin": {
    "en": {
      "title": "Moonshot AI",
      "description": "Chinese artificial intelligence company",
      "extract": "Moonshot AI is an artificial intelligence (AI) company based in Beijing, China. It is one of China's six \"AI Tigers\". Its Kimi K3, released July 2026, is the largest open weights model ever, at 2.8 trillion parameters. Founded in Beijing by Yang Zhilin, Zhou Xinyu, and Wu Yuxin in March 2023 at the outset of the AI boom, the company achieved a valuation of US$35 billion by July 2026, the second most valuable privately held AI company in China, after DeepSeek. Major investors include Alibaba Group and Tencent.",
      "url": "https://en.wikipedia.org/wiki/Moonshot_AI"
    }
  },
  "person:wang-xingxing": {
    "en": {
      "title": "Unitree Robotics",
      "description": "Chinese robotics company",
      "extract": "Hangzhou Yushu Technology Co., Ltd., doing business as Unitree Robotics, is a robotics company based in Hangzhou, China. Founded by Wang Xingxing in August 2016, Unitree initially specialized in quadruped robots for the consumer market. In 2024, the company began producing humanoid robots, with the second iteration priced around US$16,000.",
      "url": "https://en.wikipedia.org/wiki/Unitree_Robotics"
    }
  },
  "person:jensen-huang": {
    "en": {
      "title": "Jensen Huang",
      "description": "Taiwanese and American businessman (born 1963)",
      "extract": "Jen-Hsun \"Jensen\" Huang is a Taiwanese and American business executive and electrical engineer who is the founder, president, and CEO of Nvidia, the world's most valuable company. As of 2026, Forbes estimates his net worth at over US$200 billion, making him the seventh-wealthiest individual in the world.",
      "url": "https://en.wikipedia.org/wiki/Jensen_Huang"
    },
    "zh": {
      "title": "黃仁勳",
      "description": "台裔美籍企業家、輝達（NVIDIA）執行長",
      "extract": "黃仁勳 是臺灣裔美國籍企業家、電機工程師，為圖形晶片公司NVIDIA（輝達）的共同創辦人暨執行長。",
      "url": "https://zh.wikipedia.org/wiki/%E9%BB%83%E4%BB%81%E5%8B%B3"
    },
    "wikidataDescription": {
      "en": "punishment In Uzbekistan"
    }
  },
  "person:jack-zhang": {
    "en": {
      "title": "Airwallex",
      "description": "Financial services company",
      "extract": "Airwallex is a multinational financial technology company providing financial services. Founded in 2015 in Melbourne, Australia, and dual headquartered in Singapore and San Francisco, the company's platform provides global payments through its application programming interface (API), web app, and proprietary financial infrastructure. Services and products include business accounts, expense cards, and payroll, among others. It expanded into investment products in 2023. Airwallex is Australia's third technology unicorn company overall. With a valuation of US$8 billion in December 2025, it has raised $1.5 billion in total funding.",
      "url": "https://en.wikipedia.org/wiki/Airwallex"
    }
  },
  "person:cai-haoyu": {
    "en": {
      "title": "MiHoYo",
      "description": "Chinese video game developer",
      "extract": "miHoYo Co., Ltd. is a Chinese video game developer founded in 2012 and headquartered in Shanghai. The company is best known for developing popular gacha games, including the Honkai series, Tears of Themis, Genshin Impact, and Zenless Zone Zero. Beyond video games, miHoYo has diversified its output, creating various products such as animated series, novels, comics, music, and merchandise.",
      "url": "https://en.wikipedia.org/wiki/MiHoYo"
    }
  },
  "person:james-peng": {
    "en": {
      "title": "Pony.ai",
      "description": "Autonomous vehicle technology company",
      "extract": "Pony AI Inc. is a Chinese autonomous vehicle technology company co-located in Silicon Valley, Beijing, and Guangzhou.",
      "url": "https://en.wikipedia.org/wiki/Pony.ai"
    }
  },
  "person:jack-ma": {
    "en": {
      "title": "Jack Ma",
      "description": "Chinese business magnate and investor (born 1964)",
      "extract": "Ma Yun, also known as Jack Ma, is a Chinese businessman and philanthropist. He is the founder of the Jack Ma Foundation, and co-founder of Alibaba Group and Yunfeng Capital. He is one of the richest men in China with a net worth of approx US$27.5 billion.",
      "url": "https://en.wikipedia.org/wiki/Jack_Ma"
    }
  },
  "person:ma-huateng": {
    "en": {
      "title": "Pony Ma",
      "description": "Chinese businessman (born 1971)",
      "extract": "Ma Huateng, also known as Pony Ma, is a Chinese businessman. He is the co-founder, chairman and chief executive officer (CEO) of Tencent, a Shenzhen-based conglomerate in technology, gaming, entertainment, and financial services. In 2007, 2014, and 2018, Time magazine named him one of the world's most influential people, while in 2015, Forbes credited him as one of the world's most powerful people. In 2017, Fortune ranked him as among the top businessmen of the year. Ma was a deputy to the Shenzhen Municipal People's Congress and a delegate in the 12th National People's Congress. As of November 2025, Ma has a net worth of US$63 billion according to Forbes.",
      "url": "https://en.wikipedia.org/wiki/Pony_Ma"
    }
  },
  "person:robin-li": {
    "en": {
      "title": "Robin Li",
      "description": "Chinese software engineer and billionaire internet entrepreneur (born 1968)",
      "extract": "Robin Li Yanhong is a Chinese software engineer and billionaire internet entrepreneur who is the co-founder and chief executive officer of Chinese multinational technology company Baidu. As of May 2025, his net worth was estimated at US$5.5 billion by Forbes.",
      "url": "https://en.wikipedia.org/wiki/Robin_Li"
    }
  },
  "person:ren-zhengfei": {
    "en": {
      "title": "Ren Zhengfei",
      "description": "Chinese entrepreneur and engineer (born 1944)",
      "extract": "Ren Zhengfei is a Chinese entrepreneur and engineer who is the founder and CEO of Huawei Technologies, which is located in Shenzhen, China, and is the world's largest manufacturer of telecommunications equipment and second largest manufacturer of smartphones and Huawei Chinese Electric Cars.",
      "url": "https://en.wikipedia.org/wiki/Ren_Zhengfei"
    }
  },
  "person:liu-chuanzhi": {
    "en": {
      "title": "Liu Chuanzhi",
      "description": "Chinese businessman and entrepreneur (born 1944)",
      "extract": "Liu Chuanzhi is a Chinese entrepreneur. Liu is the founder of Lenovo, the world's largest personal computer vendor by unit sales. He remains one of the leaders of the company.",
      "url": "https://en.wikipedia.org/wiki/Liu_Chuanzhi"
    }
  },
  "person:liu-qiangdong": {
    "en": {
      "title": "Liu Qiangdong",
      "description": "Chinese Internet entrepreneur (born 1973)",
      "extract": "Liu Qiangdong (Richard) (Chinese: 刘强东; born March 10, 1973) is a Chinese Internet entrepreneur. Liu founded JD Multimedia as a business-to-consumer single retail store for magneto-optical products in June 1998 and later moved the company into an e-commerce website known as JD.com (also known as Jingdong) in 2013.",
      "url": "https://en.wikipedia.org/wiki/Liu_Qiangdong"
    }
  },
  "person:wang-xing": {
    "en": {
      "title": "Wang Xing",
      "description": "Chinese businessman",
      "extract": "Wang Xing is a Chinese businessman, who co-founded Meituan and has been its CEO since January 2010. He was CEO of Fanfou from 2007 to 2010.",
      "url": "https://en.wikipedia.org/wiki/Wang_Xing"
    }
  },
  "person:ding-lei": {
    "en": {
      "title": "Ding Lei",
      "description": "Chinese billionaire businessman",
      "extract": "Ding Lei is a Chinese billionaire businessman, and the founder and CEO of NetEase.",
      "url": "https://en.wikipedia.org/wiki/Ding_Lei"
    }
  },
  "person:su-hua": {
    "en": {
      "title": "Kuaishou",
      "description": "Chinese video application company",
      "extract": "Kuaishou Technology is a Chinese publicly traded partly state-owned holding company based in Haidian District, Beijing, that was founded in 2011 by Hua Su and Cheng Yixiao. The company, listed on the Hong Kong Stock Exchange, is known for developing a mobile app for sharing users' short videos, a social network, and video special effects editor. The app is known as Kwai in many countries outside of China. It is also known as Snack Video in India, Pakistan and Indonesia.",
      "url": "https://en.wikipedia.org/wiki/Kuaishou"
    }
  },
  "person:xu-yi": {
    "en": {
      "title": "Bilibili",
      "description": "Chinese video sharing website",
      "extract": "Bilibili, nicknamed BSite, is a Chinese online video sharing platform based in Shanghai. Users can upload, view, and comment on videos, including through danmu, a system of overlaid on-screen comments. The platform originally focused on animation, comics, and games, but later expanded into documentaries, variety shows, and original programming.",
      "url": "https://en.wikipedia.org/wiki/Bilibili"
    }
  },
  "person:charles-chao": {
    "en": {
      "title": "Charles Chao",
      "description": "Chairman of the board of directors of Weibo Corporation",
      "extract": "Charles Chao or Guowei Chao has served as the chairman of the board of directors since the inception of Weibo Corporation. He has served as the chairman of the board of directors of Weibo's parent company, Sina, since August 2012, and has been Sina's Chief Executive Officer since May 2006. He served as Sina's president from September 2005 to February 2013, Chief Financial Officer from February 2001 to May 2006, and Co-Chief Operating Officer from July 2004 to September 2005. He also served as Sina's Executive Vice President from April 2002 to June 2003 and Vice President, Finance from September 1999 to January 2001.",
      "url": "https://en.wikipedia.org/wiki/Charles_Chao"
    }
  },
  "person:charles-zhang": {
    "en": {
      "title": "Charles Zhang",
      "description": "Chinese businessman",
      "extract": "Charles Zhang or Zhang Chaoyang is a Chinese businessman and founder of Sohu Inc, which was listed on NASDAQ in 2000. Zhang was ranked 37th on Forbes China’s 100 Richest list in 2000 and 20th in 2003.",
      "url": "https://en.wikipedia.org/wiki/Charles_Zhang"
    }
  },
  "person:wang-zhidong": {
    "en": {
      "title": "Sina Corporation",
      "description": "Chinese online media company",
      "extract": "Sina Corporation is a Chinese internet and online media company best known for operating the Sina.com portal and for its controlling interest in Weibo Corporation, which runs the microblogging platform Weibo. Sina was formed in March 1999 through the merger of Beijing SINA Information Technology and California‑based SINANET.com. It listed on Nasdaq in April 2000 and became a private company again when a go‑private transaction led by chairman Charles Chao closed on March 22, 2021. The company is incorporated in the Cayman Islands and is headquartered in Beijing.",
      "url": "https://en.wikipedia.org/wiki/Sina_Corporation"
    }
  },
  "person:james-liang": {
    "en": {
      "title": "James Liang",
      "description": "Chinese American social scientist and businessman",
      "extract": "James Jianzhang Liang is a Chinese American social scientist and businessman who has been the chairman of Trip.com Group since 2003. He also is a professor at the Guanghua School of Management at Peking University, conducting research on demographics and social sciences.",
      "url": "https://en.wikipedia.org/wiki/James_Liang"
    }
  },
  "person:cheng-wei": {
    "en": {
      "title": "DiDi",
      "description": "Chinese vehicle for hire company",
      "extract": "Didi Chuxing Technology Company is a Chinese mobility technology company headquartered in Beijing. The company offers app-based transportation and related services, including ride-hailing, taxi services, bike sharing and vehicle leasing. It also operates in areas such as food delivery, automobile services, and electric vehicle development. DiDi was founded in 2012 by Cheng Wei and initially launched as a taxi-hailing app under the name Didi Dache.",
      "url": "https://en.wikipedia.org/wiki/DiDi"
    }
  },
  "person:zuo-hui": {
    "en": {
      "title": "Beike",
      "description": "Chinese real estate platform",
      "extract": "KE Holdings Inc. is a publicly listed Chinese real estate holding company that engages in the provision of an integrated online and offline platform for housing transactions and services through its subsidiaries. It is the largest online real estate transaction platform in China.",
      "url": "https://en.wikipedia.org/wiki/Beike"
    }
  },
  "person:morris-chang": {
    "en": {
      "title": "Morris Chang",
      "description": "Taiwanese businessman and electrical engineer (born 1931)",
      "extract": "Morris Chang Chung-mou is a Taiwanese billionaire business executive and electrical engineer. He is the founder of Taiwan Semiconductor Manufacturing Company (TSMC) and was the company's chief executive officer (CEO) from 1987 to 2005, and its chairman until 2018. As of April 2026, Forbes estimates his net worth at US$8.5 billion.",
      "url": "https://en.wikipedia.org/wiki/Morris_Chang"
    }
  },
  "person:zhou-hongyi": {
    "en": {
      "title": "Zhou Hongyi",
      "description": "Chinese billionaire entrepreneur (born 1970)",
      "extract": "Zhou Hongyi is a Chinese billionaire entrepreneur. He is the co-founder, chairman and CEO of the Internet security company Qihoo 360. As of November 2018, he is ranked #45 on Forbes China Rich List 2018 and #135 on Forbes Billionaires 2018, with an estimated net worth of $4.7 billion.",
      "url": "https://en.wikipedia.org/wiki/Zhou_Hongyi"
    }
  },
  "person:terry-gou": {
    "en": {
      "title": "Terry Gou",
      "description": "Founder and former Chief Executive Officer of Foxconn",
      "extract": "Terry Guo is a Taiwanese billionaire businessman and politician. Guo is the founder and former chairman and chief executive officer (CEO) of Foxconn, the world's largest contract manufacturer of electronics. Foxconn's English web site renders his surname as Gou. Founded in 1974, Foxconn grew to become an international business empire, becoming the largest private employer and exporter in Taiwan with a workforce of 1.2 million. As of 2024, Guo has a net worth of US$10.4 billion.",
      "url": "https://en.wikipedia.org/wiki/Terry_Gou"
    }
  },
  "person:tsai-ming-kai": {
    "en": {
      "title": "MediaTek",
      "description": "Taiwanese fabless semiconductor company",
      "extract": "MediaTek Inc., sometimes informally abbreviated as MTK, is a Taiwanese fabless semiconductor company that designs and markets a range of semiconductor products, providing chips for wireless communications, high-definition television, handheld mobile devices like smartphones and tablet computers, navigation systems, consumer multimedia products and digital subscriber line services as well as optical disc drives.",
      "url": "https://en.wikipedia.org/wiki/MediaTek"
    }
  },
  "person:richard-chang": {
    "en": {
      "title": "Semiconductor Manufacturing International Corporation",
      "description": "Chinese semiconductor foundry",
      "extract": "Semiconductor Manufacturing International Corporation (SMIC) is a partially state-owned publicly listed Chinese pure-play semiconductor foundry company. It is the largest contract chip maker in mainland China.",
      "url": "https://en.wikipedia.org/wiki/Semiconductor_Manufacturing_International_Corporation"
    }
  },
  "person:robert-tsao": {
    "en": {
      "title": "United Microelectronics Corporation",
      "description": "Taiwanese semiconductor foundry",
      "extract": "United Microelectronics Corporation is a Taiwanese company based in Hsinchu, Taiwan. It was founded as Taiwan's first semiconductor company in 1980 as a spin-off of the government-sponsored Industrial Technology Research Institute (ITRI).",
      "url": "https://en.wikipedia.org/wiki/United_Microelectronics_Corporation"
    }
  },
  "person:ted-hsu": {
    "en": {
      "title": "Asus",
      "description": "Taiwanese computer and electronics company",
      "extract": "ASUSTeK Computer Inc., doing business as Asus, is a Taiwanese multinational computer, phone hardware and electronics manufacturer headquartered in Beitou District, Taipei, Taiwan. Its products include desktop computers, laptops, netbooks, mobile phones, networking equipment, monitors, Wi-Fi routers, projectors, motherboards, graphics cards, optical storage, multimedia products, peripherals, wearables, servers, workstations and tablet PCs. The company is also an original equipment manufacturer (OEM).",
      "url": "https://en.wikipedia.org/wiki/Asus"
    }
  },
  "person:stan-shih": {
    "en": {
      "title": "Stan Shih",
      "description": "Taiwanese businessman (born 1944)",
      "extract": "Stan Chen-Jung Shih is a Taiwanese businessman and engineer who is the co-founder and honorary chairman of Acer Inc.",
      "url": "https://en.wikipedia.org/wiki/Stan_Shih"
    }
  },
  "person:charles-liang": {
    "en": {
      "title": "Supermicro",
      "description": "American supplier of servers and other information technology products",
      "extract": "Super Micro Computer, Inc., doing business as Supermicro, is an American information technology company based in San Jose, California. The company is one of the largest producers of high-performance and high-efficiency servers, while also providing server management software, and storage systems for various markets, including enterprise data centers, cloud computing, artificial intelligence, 5G, and edge computing. Supermicro was founded in 1993, and has manufacturing operations in Silicon Valley, the Netherlands, and in Taiwan at its Science and Technology Park.",
      "url": "https://en.wikipedia.org/wiki/Supermicro"
    }
  },
  "person:min-kao": {
    "en": {
      "title": "Garmin",
      "description": "Multinational technology company",
      "extract": "Garmin Ltd. is an American multinational technology company based in Olathe, Kansas. The company designs, develops, manufactures, markets, and distributes GPS-enabled products and other navigation, communication, sensor-based, and information products to the automotive, aviation, marine, outdoors, and sport markets.",
      "url": "https://en.wikipedia.org/wiki/Garmin"
    }
  },
  "person:wang-chuanfu": {
    "en": {
      "title": "Wang Chuanfu",
      "description": "Chinese chemist and businessman (born 1966)",
      "extract": "Wang Chuanfu is a Chinese chemist, billionaire entrepreneur, and the founder, chairman and CEO of the BYD Company.",
      "url": "https://en.wikipedia.org/wiki/Wang_Chuanfu"
    }
  },
  "person:william-li": {
    "en": {
      "title": "Nio Inc.",
      "description": "Chinese electric vehicle manufacturer",
      "extract": "Nio Inc. is a Chinese electric vehicle manufacturer headquartered in Shanghai. Founded in 2014, it adopted its current name in 2016. The company primarily designs and sells electric vehicles, including sedans and SUVs, but has expanded into other products and services, such as chip development, Smartphones, and power solutions.",
      "url": "https://en.wikipedia.org/wiki/Nio_Inc."
    }
  },
  "person:he-xiaopeng": {
    "en": {
      "title": "XPeng",
      "description": "Chinese car company",
      "extract": "Guangzhou Xiaopeng Motors Technology Co., Ltd., trading as XPeng Motors, commonly known as XPeng, is a Chinese electric vehicle manufacturer. The company is headquartered in Guangzhou, Guangdong, with offices in Mountain View, California, United States and Munich, Germany. XPeng stock is publicly traded on the New York Stock Exchange and the Hong Kong Stock Exchange. The company describes itself as a global AI mobility technology company and develops in-house technologies including full-stack advanced driver-assistance systems, an in-car intelligent operating system, powertrain systems and vehicle electronic/electrical architecture.",
      "url": "https://en.wikipedia.org/wiki/XPeng"
    }
  },
  "person:li-xiang": {
    "en": {
      "title": "Li Auto",
      "description": "Chinese car company",
      "extract": "Li Auto Inc. is a Chinese electric vehicle manufacturer headquartered in Beijing, with manufacturing facilities in Changzhou. Founded by Li Xiang in 2015, the company is best known for producing electric vehicles equipped with range extender petrol engines.",
      "url": "https://en.wikipedia.org/wiki/Li_Auto"
    }
  },
  "person:robin-zeng": {
    "en": {
      "title": "CATL",
      "description": "Chinese battery manufacturer",
      "extract": "Contemporary Amperex Technology Co., Limited, (CATL) is a Chinese battery manufacturer and technology company founded in 2011 that specializes in the manufacturing of lithium-ion batteries for electric vehicles and energy storage systems, as well as battery management systems (BMS). CATL is the biggest EV and energy storage battery manufacturer in the world, with a global market share of around 37% and 36.8% in 2022 and 2023, respectively. It is headquartered in Ningde, Fujian province, where it maintains its flagship manufacturing hub.",
      "url": "https://en.wikipedia.org/wiki/CATL"
    }
  },
  "person:hou-weigui": {
    "en": {
      "title": "ZTE",
      "description": "Chinese telecommunications company",
      "extract": "ZTE Corporation is a Chinese partially state-owned technology company that specializes in telecommunication. Founded in 1985, ZTE is listed on both the Hong Kong and Shenzhen Stock Exchanges.",
      "url": "https://en.wikipedia.org/wiki/ZTE"
    }
  },
  "person:chen-mingyong": {
    "en": {
      "title": "Oppo",
      "description": "Chinese consumer electronics manufacturer",
      "extract": "Oppo is a private Chinese consumer electronics manufacturer and technology company headquartered in Shenzhen, Guangdong.",
      "url": "https://en.wikipedia.org/wiki/Oppo"
    }
  },
  "person:shen-wei": {
    "en": {
      "title": "Vivo (technology company)",
      "description": "Chinese technology company",
      "extract": "Vivo Mobile Communication Co., Ltd., d/b/a vivo, is a Chinese multinational technology company headquartered in Dongguan, Guangdong, that designs and develops smartphones, smartphone accessories, software, and online services. The company develops software for its phones, distributed through its V-Appstore, with iManager included in their proprietary, Android-based operating system, Origin OS in mainland China, and currently discontinued Funtouch OS elsewhere. It has 40,000 employees, with 10 R&D centers in Shenzhen, Dongguan, Nanjing, Beijing, Hangzhou, Shanghai, Xi'an, Taipei, Tokyo, and San Diego.",
      "url": "https://en.wikipedia.org/wiki/Vivo_(technology_company)"
    }
  },
  "person:zhu-zhaojiang": {
    "en": {
      "title": "Transsion",
      "description": "Chinese smartphone company",
      "extract": "Transsion is a Chinese manufacturer of mobile phones based in Shenzhen. It was the largest smartphone manufacturer by sales in Africa in 2017, and also sells mobile phones in the Middle East, Southeast Asia, South Asia, and Latin America. Its brands include phone brands such as itel, TECNO, Infinix; after-sales service brand Carlcare and accessories brand Oraimo and Syinix. It manufactures phones in China, Indonesia, Pakistan, Ethiopia, Bangladesh and recently in India.",
      "url": "https://en.wikipedia.org/wiki/Transsion"
    }
  },
  "person:gong-hongjia": {
    "en": {
      "title": "Hikvision",
      "description": "Chinese video surveillance equipment company",
      "extract": "Hangzhou Hikvision Digital Technology Co., Ltd., often shortened to Hikvision, is a Chinese partly state-owned manufacturer and supplier of video surveillance equipment for civilian and military purposes, headquartered in Hangzhou, Zhejiang.",
      "url": "https://en.wikipedia.org/wiki/Hikvision"
    }
  },
  "person:liu-qingfeng": {
    "en": {
      "title": "IFlytek",
      "description": "Chinese technology company",
      "extract": "iFlytek, styled as iFLYTEK, is a partially state-owned Chinese information technology company established in 1999. It creates voice recognition software and 10+ voice-based internet/mobile products covering education, communication, music, intelligent toys industries. State-owned enterprise China Mobile is the company's largest shareholder. The company is listed in the Shenzhen Stock Exchange and it is backed by several state-owned investment funds.",
      "url": "https://en.wikipedia.org/wiki/IFlytek"
    }
  },
  "person:tang-xiaoou": {
    "en": {
      "title": "SenseTime",
      "description": "Chinese artificial intelligence company",
      "extract": "SenseTime is a partly state-owned publicly traded artificial intelligence company headquartered in Hong Kong. The company develops technologies including facial recognition, image recognition, object detection, optical character recognition, medical image analysis, video analysis, autonomous driving, and remote sensing. Since 2019, SenseTime has been repeatedly sanctioned by the U.S. government due to allegations that its facial recognition technology has been deployed in the surveillance and internment of the Uyghurs and other ethnic and religious minorities. SenseTime denies the allegations.",
      "url": "https://en.wikipedia.org/wiki/SenseTime"
    }
  },
  "person:yin-qi": {
    "en": {
      "title": "Megvii",
      "description": "Chinese technology company",
      "extract": "Megvii is a Chinese technology company that designs image recognition and deep-learning software. Based in Beijing, the company develops artificial intelligence (AI) technology for businesses and for the public sector.",
      "url": "https://en.wikipedia.org/wiki/Megvii"
    }
  },
  "person:tang-jie": {
    "en": {
      "title": "Z.ai",
      "description": "Chinese artificial intelligence company",
      "extract": "Z.AI Co., Ltd., branded internationally as Z.ai, is a Chinese artificial intelligence company; their flagship product is the GLM family of open weights large language models (LLMs). Formerly known as Zhipu AI outside China until 2025, it is China's first major LLM company to make initial public offering, on the Hong Kong Stock Exchange in January 2026. With a market capitalization of US$62 billion as of August 2026, it is the most valuable public AI pure play in China.",
      "url": "https://en.wikipedia.org/wiki/Z.ai"
    }
  },
  "person:kai-fu-lee": {
    "en": {
      "title": "Kai-Fu Lee",
      "description": "Taiwanese computer scientist and investor",
      "extract": "Kai-Fu Lee is a Taiwanese computer scientist, investor, and author. He was the founding director of Microsoft Research China, later Microsoft Research Asia, serving from 1998 to 2000, and served as president of Google China 2005 to 2009.",
      "url": "https://en.wikipedia.org/wiki/Kai-Fu_Lee"
    }
  },
  "person:wang-xiaochuan": {
    "en": {
      "title": "Baichuan",
      "description": "Chinese artificial intelligence company",
      "extract": "Baichuan AI is an artificial intelligence (AI) company based in Beijing, China. As of 2024, it has been dubbed one of China's 6 \"AI Tiger\" companies by investors.",
      "url": "https://en.wikipedia.org/wiki/Baichuan"
    }
  },
  "person:chen-tianshi": {
    "en": {
      "title": "Cambricon Technologies",
      "description": "Chinese artificial intelligence chip manufacturer",
      "extract": "Cambricon Technologies is a partially state-owned publicly listed Chinese technology company headquartered in Beijing.",
      "url": "https://en.wikipedia.org/wiki/Cambricon_Technologies"
    }
  },
  "person:yu-kai": {
    "en": {
      "title": "Horizon Robotics",
      "description": "Chinese AI chip company",
      "extract": "Horizon Robotics, Inc. is a Chinese technology company headquartered in Beijing. The company develops artificial intelligence (AI) chips used in self-driving cars and advanced driver assistance systems (ADAS).",
      "url": "https://en.wikipedia.org/wiki/Horizon_Robotics"
    }
  },
  "person:tony-han": {
    "en": {
      "title": "WeRide",
      "description": "Autonomous driving technology company",
      "extract": "WeRide Inc. is an autonomous driving technology company. It holds driverless permits in 9 countries including China, the US, the UAE, Saudi Arabia, Belgium, Switzerland, Singapore, Spain and France. Its autonomous vehicles have been deployed across more than 60 cities in 13 countries.",
      "url": "https://en.wikipedia.org/wiki/WeRide"
    }
  },
  "person:jerry-yang": {
    "en": {
      "title": "Jerry Yang",
      "description": "American programmer and entrepreneur (born 1968)",
      "extract": "Jerry Chih-Yuan Yang is a Taiwanese-born American billionaire computer programmer, internet entrepreneur, and venture capitalist. He is the co-founder and former CEO of Yahoo! Inc. and founding partner of AME Cloud Ventures. As of May 2025, Yang has a net worth of $3.1 billion.",
      "url": "https://en.wikipedia.org/wiki/Jerry_Yang"
    }
  },
  "person:steve-chen": {
    "en": {
      "title": "Steve Chen",
      "description": "Taiwanese-American Internet entrepreneur (born 1978)",
      "extract": "Steve Chen is a Taiwanese-American software engineer and Internet entrepreneur who is a co-founder and ex-CTO of YouTube. After he co-founded AVOS Systems, Inc. and built MixBit, he joined Google Ventures in 2014.",
      "url": "https://en.wikipedia.org/wiki/Steve_Chen"
    }
  },
  "person:reynold-xin": {
    "en": {
      "title": "Databricks",
      "description": "San Francisco-based software company",
      "extract": "Databricks, Inc. is an American data and artificial intelligence software company headquartered in San Francisco, California. It was founded in 2013 by the original creators of Apache Spark at the University of California, Berkeley. It offers a cloud-based platform for data analytics and artificial intelligence. It operates natively across Amazon Web Services, Microsoft Azure, and Google Cloud Platform. The platform includes an open data marketplace built on the Delta Sharing protocol, and functions as a managed AI infrastructure provider by providing proprietary foundation models—including those from OpenAI, Anthropic, and Google Gemini—directly within its secure perimeter.",
      "url": "https://en.wikipedia.org/wiki/Databricks"
    }
  },
  "person:changpeng-zhao": {
    "en": {
      "title": "Changpeng Zhao",
      "description": "Canadian businessman (born 1977)",
      "extract": "Changpeng Zhao, commonly known as CZ, is a Canadian businessman who is known for co-founding the cryptocurrency company Binance. He has also served as CTO of OKCoin and CEO of Binance. According to Forbes, Zhao is the richest Canadian and the 17th-richest person in the world, with a net worth estimated at $111.1 billion as of April 2026.",
      "url": "https://en.wikipedia.org/wiki/Changpeng_Zhao"
    }
  },
  "person:jihan-wu": {
    "en": {
      "title": "Bitmain",
      "description": "Chinese software and hardware company",
      "extract": "Bitmain Technologies Ltd., is a privately owned company headquartered in Beijing, China, that designs application-specific integrated circuit (ASIC) chips for bitcoin mining.",
      "url": "https://en.wikipedia.org/wiki/Bitmain"
    }
  },
  "person:forrest-li": {
    "en": {
      "title": "Sea Ltd",
      "description": "Singaporean technology company",
      "extract": "Sea Limited is a tech conglomerate headquartered in Singapore. It is listed on the New York Stock Exchange, with revenue of US$16.8 billion (2024). Sea currently functions as a holding company for Garena, Monee and Shopee, the largest e-commerce platform in Southeast Asia.",
      "url": "https://en.wikipedia.org/wiki/Sea_Ltd"
    }
  },
  "person:anthony-tan": {
    "en": {
      "title": "Grab Holdings",
      "description": "Singaporean technology company",
      "extract": "Grab Holdings Inc. is a Singaporean multinational technology company headquartered in one-north, Singapore. It is the developer of a super-app for ride-hailing, food delivery, and digital payment services on mobile devices. It operates in Singapore, Malaysia, Cambodia, Indonesia, Myanmar, the Philippines, Thailand, and Vietnam.",
      "url": "https://en.wikipedia.org/wiki/Grab_Holdings"
    }
  },
  "person:min-liang-tan": {
    "en": {
      "title": "Razer Inc.",
      "description": "Singaporean-American technology company",
      "extract": "Razer Inc. is a Singaporean-American multinational corporation and technology company that manufactures, develops, and markets gaming-focused computer hardware and other consumer electronics as well as financial services.",
      "url": "https://en.wikipedia.org/wiki/Razer_Inc."
    }
  },
  "person:william-tanuwijaya": {
    "en": {
      "title": "Tokopedia",
      "description": "Indonesian e-commerce company",
      "extract": "PT Tokopedia is an Indonesian e-commerce company. Tokopedia is a subsidiary of GoTo, following a merger with Gojek on 17 May 2021. It is one of the most visited e-commerce platforms in Indonesia.",
      "url": "https://en.wikipedia.org/wiki/Tokopedia"
    }
  },
  "person:andrew-ng": {
    "en": {
      "title": "Andrew Ng",
      "description": "American artificial intelligence researcher",
      "extract": "Andrew Yan-Tak Ng is a British-American computer scientist and technology entrepreneur focusing on machine learning and artificial intelligence (AI). Ng was a cofounder and head of Google Brain and was the former Chief Scientist at Baidu.",
      "url": "https://en.wikipedia.org/wiki/Andrew_Ng"
    }
  },
  "person:jerry-liu": {
    "en": {
      "title": "LlamaIndex",
      "description": "American artificial intelligence company",
      "extract": "LlamaIndex is an American artificial intelligence company headquartered in San Francisco, California. LlamaIndex specializes in agentic optical character recognition (OCR) and document intelligence infrastructure, developing tools and frameworks that enable large language models (LLMs) to ingest, index, and query structured and unstructured data sources.",
      "url": "https://en.wikipedia.org/wiki/LlamaIndex"
    }
  },
  "person:cindy-mi": {
    "en": {
      "title": "VIPKid",
      "description": "Global EdTech company",
      "extract": "VIPKid, also known as VIPKID, is an online teaching and education company.",
      "url": "https://en.wikipedia.org/wiki/VIPKid"
    }
  },
  "person:zhang-bangxin": {
    "en": {
      "title": "TAL Education Group",
      "description": "Education institution of China",
      "extract": "TAL Education Group, which stands for \"Tomorrow Advancing Life\", is a Chinese holding company that offers after-school education and tutoring for students in primary and secondary school. It is headquartered in Beijing, China. The company was founded in August 2003 by Zhang Bangxin and Cao Yundong, as \"Xueersi\".",
      "url": "https://en.wikipedia.org/wiki/TAL_Education_Group"
    }
  },
  "person:leaf-li": {
    "en": {
      "title": "Futu",
      "description": "Hong Kong financial technology company",
      "extract": "Futu Holdings Limited is a Cayman Islands-incorporated financial technology holding company headquartered in Hong Kong. Through its subsidiaries, it provides online securities brokerage, margin financing and securities lending, wealth management, and corporate and institutional services. Its main digital platforms are Futubull, used primarily in Hong Kong, and Moomoo, its international platform. Its ADR have traded on the Nasdaq since March 2019.",
      "url": "https://en.wikipedia.org/wiki/Futu"
    }
  },
  "person:steven-yang": {
    "en": {
      "title": "Anker",
      "description": "Chinese electronics brand",
      "extract": "Anker Innovations Co., Ltd, commonly known as Anker, is a Chinese electronics manufacturer based in Changsha, Hunan, China. The company's products are phone chargers, car chargers, power banks, earbuds, headphones, speakers, data hubs, 3D printers, charging cables, torches (flashlights), screen protectors, portable power stations, home solar batteries, and smart home devices.",
      "url": "https://en.wikipedia.org/wiki/Anker"
    }
  },
  "person:liu-jingkang": {
    "en": {
      "title": "Insta360",
      "description": "Chinese camera company",
      "extract": "Arashi Vision Inc., doing business as Insta360, is a Chinese camera and imaging technology company headquartered in Shenzhen, China with offices in Los Angeles, Tokyo and Berlin. It produces action cameras, 360-degree cameras, and stereoscopic 180-degree cameras, as well as video editing software for mobile and desktop platforms. Its products are used in action sports, travel recording, and other outdoor video applications. It has collaborated with Leica Camera on imaging technology, including action cameras such as the Insta360 Ace Pro series.",
      "url": "https://en.wikipedia.org/wiki/Insta360"
    }
  },
  "person:qian-dongqi": {
    "en": {
      "title": "Ecovacs Robotics",
      "description": "Chinese in-home robotics appliances company",
      "extract": "Ecovacs Robotics is a Chinese technology company. It is best known for developing in-home robotic appliances. The company was founded in 1998 by Qian Dongqi and is headquartered in Suzhou, China. According to Global Asia, Ecovacs Robotics had more than 60% of the Chinese market for robots by 2013. In 2023, Nikkei Asia had reported that the market capitalisation of Ecovacs Robotics has grown to near $6.38 billion, which is \"roughly 5 times\" that of the market capitalisation of rivalling US based iRobot, who manufactures the Roomba.",
      "url": "https://en.wikipedia.org/wiki/Ecovacs_Robotics"
    }
  },
  "person:carl-pei": {
    "en": {
      "title": "Carl Pei",
      "description": "Swedish entrepreneur (born 1989)",
      "extract": "Carl Pei Yu is a Swedish entrepreneur. He co-founded OnePlus along with Pete Lau in 2013 and was the director of OnePlus Global. He left the firm in October 2020 and founded Nothing, where he is CEO.",
      "url": "https://en.wikipedia.org/wiki/Carl_Pei"
    }
  },
  "person:chen-tianqiao": {
    "en": {
      "title": "Shanda",
      "description": "Chinese video game developer",
      "extract": "The Shanda Group is a privately owned multinational investment firm. With offices in Shanghai, Singapore, Hong Kong, New York and Redwood City, the firm invests in public markets, real estate and venture capital, focusing on companies in the fields of healthcare, financial services, media, and technology.",
      "url": "https://en.wikipedia.org/wiki/Shanda"
    }
  },
  "person:chi-yufeng": {
    "en": {
      "title": "Perfect World (company)",
      "description": "Chinese video game company",
      "extract": "Perfect World Co., Ltd. is a Chinese mass media company based in Beijing. It was founded in 2004 by Chi Yufeng. The company consists of two business segments: Perfect World Games, a video game publisher, and Perfect World Pictures, a film production company.",
      "url": "https://en.wikipedia.org/wiki/Perfect_World_(company)"
    }
  },
  "person:ed-huang": {
    "en": {
      "title": "PingCAP",
      "description": "Database software company",
      "extract": "PingCAP is an enterprise software company that develops TiDB, an open-source distributed SQL database, and TiKV, its underlying distributed key-value storage engine. Founded in Beijing in 2015, the company later established its headquarters in Sunnyvale, California, and also has offices in Singapore, Kuala Lumpur, and Tokyo.",
      "url": "https://en.wikipedia.org/wiki/PingCAP"
    }
  },
  "person:xu-shaochun": {
    "en": {
      "title": "Kingdee",
      "description": "Hong Kong Stock Exchange main board listed company",
      "extract": "Kingdee International Software Group is a Chinese cloud computing and software company based in Shenzhen. It is listed on the Hong Kong Stock Exchange main board and is leader in the Chinese software industry.",
      "url": "https://en.wikipedia.org/wiki/Kingdee"
    }
  },
  "person:wang-wenjing": {
    "en": {
      "title": "Yonyou",
      "description": "Enterprise management software company",
      "extract": "Yonyou is a Chinese company, principally engaged in the development and distribution of enterprise management software and cloud services.",
      "url": "https://en.wikipedia.org/wiki/Yonyou"
    }
  },
  "person:wang-jian": {
    "en": {
      "title": "BGI Group",
      "description": "Chinese genome sequencing company",
      "extract": "BGI Group, formerly Beijing Genomics Institute, is a Chinese genomics company with headquarters in Yantian, Shenzhen. The company was originally formed in 1999 as a genetics research center to participate in the Human Genome Project. It also sequences the genomes of other animals, plants and microorganisms.",
      "url": "https://en.wikipedia.org/wiki/BGI_Group"
    }
  },
  "person:xiaodong-wang": {
    "en": {
      "title": "BeOne Medicines",
      "description": "Global biotechnology company",
      "extract": "BeOne Medicines, formerly known as BeiGene, Ltd. is a multinational oncology company. It specializes in the development of drugs for cancer treatment.",
      "url": "https://en.wikipedia.org/wiki/BeOne_Medicines"
    }
  },
  "person:ge-li": {
    "en": {
      "title": "WuXi AppTec",
      "description": "Chinese pharmaceutical and medical device company",
      "extract": "WuXi AppTec Co., Ltd. is a Chinese provider of contract research, development, and manufacturing, services for the pharmaceutical and life-sciences industry, headquartered in Shanghai, China. The company operates research and manufacturing facilities in Asia, North America, and Europe.",
      "url": "https://en.wikipedia.org/wiki/WuXi_AppTec"
    }
  },
  "person:zhao-peng": {
    "en": {
      "title": "Boss Zhipin",
      "description": "Chinese recruitment company",
      "extract": "Kanzhun Limited is a publicly listed Chinese human resources company that focuses on providing online recruitment services through its mobile app, Boss Zhipin.",
      "url": "https://en.wikipedia.org/wiki/Boss_Zhipin"
    }
  },
  "person:pete-lau": {
    "en": {
      "title": "OnePlus",
      "description": "Chinese consumer electronics manufacturer",
      "extract": "OnePlus Technology (Shenzhen) Co., Ltd., doing business as OnePlus, is a Chinese consumer electronics manufacturer backed by Oppo headquartered in Shenzhen, Guangdong, China.",
      "url": "https://en.wikipedia.org/wiki/OnePlus"
    }
  },
  "person:sky-li": {
    "en": {
      "title": "Realme",
      "description": "Chinese consumer electronics manufacturer, a subsidiary of Oppo",
      "extract": "realme is a multinational Chinese consumer electronics manufacturer backed by Oppo based in Shenzhen, Guangdong. In 2021, realme had risen to become the sixth‑largest smartphone vendor worldwide in terms of shipments in the overall global smartphone market. In 2026 it was being reintegrated into Oppo as a sub-brand.",
      "url": "https://en.wikipedia.org/wiki/Realme"
    }
  },
  "person:li-dongsheng": {
    "en": {
      "title": "TCL Technology",
      "description": "Chinese multinational electronics company",
      "extract": "TCL Technology Group Corp., claimed to be an abbreviation for The Creative Life, is a Chinese partially state-owned electronics company headquartered in Huizhou, Guangdong province. TCL develops, manufactures, and sells consumer electronics like television sets, mobile phones, air conditioners, washing machines, refrigerators, and small electrical appliances. In 2010, it was the world's 25th-largest consumer electronics producer. On 7 February 2020, TCL Corporation changed its name to TCL Technology. It was the second-largest television manufacturer by market share in 2022 and 2023.",
      "url": "https://en.wikipedia.org/wiki/TCL_Technology"
    }
  },
  "person:sehat-sutardja": {
    "en": {
      "title": "Marvell Technology",
      "description": "American semiconductor company",
      "extract": "Marvell Technology, Inc. is an American company, headquartered in Santa Clara, California, which develops and produces semiconductors and related technology. Founded in 1995, the company had close to 7,500 employees as of 2026, with over 10,000 patents worldwide, and an annual revenue of $8.2 billion for fiscal 2026.",
      "url": "https://en.wikipedia.org/wiki/Marvell_Technology"
    }
  },
  "person:sim-wong-hoo": {
    "en": {
      "title": "Sim Wong Hoo",
      "description": "Singaporean businessman (1955–2023)",
      "extract": "Sim Wong Hoo was a Singaporean inventor and billionaire entrepreneur known for founding Creative Technology, a designer and manufacturer of products for personal computers and personal digital entertainment devices. He was the chairman and chief executive officer of Creative Technology from 1981 until his death in 2023. Creative Technology is notable for its products such as the Sound Blaster audio card and the Creative ZEN range of audio and media products.",
      "url": "https://en.wikipedia.org/wiki/Sim_Wong_Hoo"
    }
  },
  "person:qiu-bojun": {
    "en": {
      "title": "Kingsoft",
      "description": "Chinese software company",
      "extract": "Kingsoft Corporation is a Chinese software company based in Beijing. Kingsoft operates four subsidiaries: Seasun for video game development, Cheetah Mobile for mobile internet apps, Kingsoft Cloud for cloud storage platforms, and Kingsoft Office Software for office software, including WPS Office. It also produced security software known as Kingsoft Security. The most popular game developed by Kingsoft is JX Online 3, launched in 2009.",
      "url": "https://en.wikipedia.org/wiki/Kingsoft"
    }
  },
  "person:zhu-yiming": {
    "en": {
      "title": "GigaDevice",
      "description": "Chinese semiconductor company",
      "extract": "GigaDevice Semiconductor Inc. is a Chinese fabless semiconductor company that develops flash memory, microcontrollers (MCUs), sensor, analog products and solutions. Its flash memory portfolio includes SPI NOR Flash, SPI NAND Flash, and Parallel NAND Flash. Its microcontrollers are based on the ARM architecture, and RISC-V architecture.",
      "url": "https://en.wikipedia.org/wiki/GigaDevice"
    }
  },
  "person:wang-anquan": {
    "en": {
      "title": "Webull",
      "description": "Online brokerage and financial services company",
      "extract": "Webull Corporation, commonly known as Webull, is a financial services holding company incorporated in the Cayman Islands and headquartered in St. Petersburg, Florida. It owns and operates the Webull electronic trading platform for self-directed retail investors.",
      "url": "https://en.wikipedia.org/wiki/Webull"
    }
  },
  "person:shen-ya": {
    "en": {
      "title": "Vipshop",
      "description": "Chinese e-commerce company",
      "extract": "Vipshop is a Chinese company that operates the e-commerce website VIP.com specializing in online discount sales. Vipshop is based out of Guangzhou, Guangdong, China, and was listed on New York Stock Exchange (NYSE) on March 23, 2012.",
      "url": "https://en.wikipedia.org/wiki/Vipshop"
    }
  },
  "person:fu-liquan": {
    "en": {
      "title": "Dahua Technology",
      "description": "Chinese video surveillance products company",
      "extract": "Zhejiang Dahua Technology Co., Ltd. is a publicly traded company based in Binjiang District, Hangzhou, which manufactures video surveillance equipment. A minority of Dahua is state-owned.",
      "url": "https://en.wikipedia.org/wiki/Dahua_Technology"
    }
  }
};

export function wikiExtractKey(kind: "company" | "person", slug: string): string {
  return `${kind}:${slug}`;
}

export function wikiExtract(kind: "company" | "person", slug: string): WikiExtractRecord | undefined {
  return wikiExtracts[wikiExtractKey(kind, slug)];
}
