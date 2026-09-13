import {
  L,
  cite,
  companyBySlug,
  founderLines,
  foundingYear,
  joinList,
  methodId,
  officialId,
  personBySlug,
  precisionPhrase,
  productNames,
  sectorName,
  sectorNamesOf,
  standaloneSentence,
  tickerText,
  wikiId,
  yearDeltaPhrase,
} from "./copy";
import { foundedEn, foundedZh, hqEn, hqShortRule, hqZh, nationalityRule } from "./nationality";
import { pickPeers } from "./peers";
import { SITE_NAME, SITE_ORIGIN } from "./site";
import type { Company, CompanySection, EntityClaim, EntityFaq, Person, Source } from "./types";

const METHOD_URL = `${SITE_ORIGIN}/methodology`;

function methodCite(sources: Source[]): string {
  return cite(methodId(sources, METHOD_URL));
}

function wikiCite(sources: Source[]): string {
  return cite(wikiId(sources));
}

function officialCite(sources: Source[]): string {
  return cite(officialId(sources));
}

export function foundedYear(company: Company): number {
  return foundingYear(company);
}

function sortByFounded(a: Company, b: Company): number {
  return foundingYear(a) - foundingYear(b) || a.name.en.localeCompare(b.name.en);
}

export function sectorCohort(company: Company, allCompanies: Company[]): Company[] {
  return allCompanies
    .filter((other) => other.sectors.some((sector) => company.sectors.includes(sector)))
    .sort(sortByFounded);
}

export function countryCohort(company: Company, allCompanies: Company[]): Company[] {
  return allCompanies
    .filter((other) => other.headquarters.countryCode === company.headquarters.countryCode)
    .sort(sortByFounded);
}

export function cityCohort(company: Company, allCompanies: Company[]): Company[] {
  return allCompanies
    .filter((other) => other.headquarters.city.en === company.headquarters.city.en)
    .sort(sortByFounded);
}

function rankAmong(company: Company, list: Company[]): number {
  return list.findIndex((item) => item.slug === company.slug) + 1;
}

function neighborsByYear(company: Company, list: Company[]): { earlier?: Company; later?: Company } {
  const index = list.findIndex((item) => item.slug === company.slug);
  if (index < 0) return {};
  return {
    earlier: index > 0 ? list[index - 1] : undefined,
    later: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

function ordinal(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}st`;
  if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
  return `${n}th`;
}

function linkedCompanies(person: Person, companies: Company[]): Company[] {
  return person.companies
    .map((item) => companyBySlug(companies, item.companySlug))
    .filter((company): company is Company => Boolean(company));
}

export function companyAuthoritySection(
  company: Company,
  people: Person[],
  allCompanies: Company[],
  sources: Source[],
): CompanySection {
  const method = methodCite(sources);
  const wiki = wikiCite(sources);
  const official = officialCite(sources);
  const sectors = sectorCohort(company, allCompanies);
  const countries = countryCohort(company, allCompanies);
  const cities = cityCohort(company, allCompanies);
  const sectorRank = rankAmong(company, sectors);
  const countryRank = rankAmong(company, countries);
  const { earlier, later } = neighborsByYear(company, sectors);
  const peers = pickPeers(company, allCompanies, 3);
  const legalEn = company.legalName
    ? `The legal name on this page is ${company.legalName}; do not treat a product brand or ticker as a second legal name.`
    : `No legal name distinct from the common name ${company.name.en} is recorded.`;
  const legalZh = company.legalName
    ? `本页法律名称为 ${company.legalName}；不要把产品品牌或证券代码当成第二个法律名称。`
    : `除常用名${company.name.zh}外，未另记法律名称。`;
  const tickerEn = company.stock
    ? ` A ticker ${tickerText(company, "en")} is recorded and is not a headquarters country.`
    : " No exchange ticker is recorded.";
  const tickerZh = company.stock
    ? ` 已记录证券代码 ${tickerText(company, "zh")}，这不是总部国家。`
    : " 未记录交易所代码。";
  const earlierEn = earlier
    ? ` Next-earlier same-sector neighbor: ${earlier.name.en} (${earlier.founded.slice(0, 4)}, ${yearDeltaPhrase(company, earlier, "en")}).`
    : " No earlier same-sector neighbor is recorded in this catalog.";
  const laterEn = later
    ? ` Next-later same-sector neighbor: ${later.name.en} (${later.founded.slice(0, 4)}, ${yearDeltaPhrase(company, later, "en")}).`
    : " No later same-sector neighbor is recorded in this catalog.";
  const earlierZh = earlier
    ? `同行业创立更早的邻居是${earlier.name.zh}（${earlier.founded.slice(0, 4)}，${yearDeltaPhrase(company, earlier, "zh")}）。`
    : "本目录没有创立更早的同行业邻居。";
  const laterZh = later
    ? `同行业创立更晚的邻居是${later.name.zh}（${later.founded.slice(0, 4)}，${yearDeltaPhrase(company, later, "zh")}）。`
    : "本目录没有创立更晚的同行业邻居。";
  const peerEn = peers.length
    ? joinList(
        peers.map(
          (peer) =>
            `${peer.name.en} (${peer.founded.slice(0, 4)}; ${peer.headquarters.country.en}; ${yearDeltaPhrase(company, peer, "en")})`,
        ),
        "en",
      )
    : "none resolved";
  const peerZh = peers.length
    ? joinList(
        peers.map(
          (peer) =>
            `${peer.name.zh}（${peer.founded.slice(0, 4)}；${peer.headquarters.country.zh}；${yearDeltaPhrase(company, peer, "zh")}）`,
        ),
        "zh",
      )
    : "未解析到";
  const aliasesEn = company.aliases.length ? joinList(company.aliases, "en") : "none beyond the common name";
  const aliasesZh = company.aliases.length ? joinList(company.aliases, "zh") : "除常用名外无";
  const url = `${SITE_ORIGIN}/companies/${company.slug}`;

  return {
    id: "authority-brief",
    title: L("Independent answer brief", "可独立引用的简述"),
    body: {
      en: `${standaloneSentence(company.name.en, company.definition.en, "en")}${wiki} Founded ${foundedEn(company)} (${precisionPhrase(company.foundedPrecision, "en")}); headquarters ${hqEn(company)} (ISO 3166-1 alpha-2 ${company.headquarters.countryCode}). Status ${company.status}; stage ${company.stage}. Official website: ${company.website}.${official}\n\n${legalEn} Aliases: ${aliasesEn}. Stable identifier: \`${company.id}\`.${tickerEn} ${nationalityRule(company).en}${method}\n\nNamed founders, with roles only: ${founderLines(company, people, "en")}. Recorded product names: ${productNames(company, "en") || "none"}. Filed under ${sectorNamesOf(company, "en")}. Founder biographies belong on Named founders; product glosses belong on Operations and products.\n\nCatalog order, not market share: ${company.name.en} is the ${ordinal(sectorRank)} oldest of ${sectors.length} firms that share a recorded sector, the ${ordinal(countryRank)} oldest of ${countries.length} with headquarters in ${company.headquarters.country.en}, and one of ${cities.length} in ${company.headquarters.city.en}.${earlierEn}${laterEn} Closest scored neighbors by sector and region: ${peerEn}. Shared sector is not shared nationality. Cite ${SITE_NAME}, "${company.name.en}," ${url}, last reviewed ${company.lastReviewed}, ${company.id}. Prefer ${url}.md or ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json.`,
      zh: `${standaloneSentence(company.name.zh, company.definition.zh, "zh")}${wiki}创立于 ${foundedZh(company)}（${precisionPhrase(company.foundedPrecision, "zh")}）；总部位于${hqZh(company)}（ISO 3166-1 alpha-2 ${company.headquarters.countryCode}）。状态 ${company.status}；阶段 ${company.stage}。官方网站：${company.website}。${official}\n\n${legalZh}别名：${aliasesZh}。稳定标识符：\`${company.id}\`。${tickerZh}${nationalityRule(company).zh}${method}\n\n具名创始人（只写角色）：${founderLines(company, people, "zh")}。已记录产品名：${productNames(company, "zh") || "无"}。归入${sectorNamesOf(company, "zh")}。人物传略见「具名创始人」，产品释义见「业务与产品」。\n\n目录排序，不是市场份额：${company.name.zh}是共享已记录行业的 ${sectors.length} 家里创立第 ${sectorRank} 早的，是总部在${company.headquarters.country.zh}的 ${countries.length} 家里创立第 ${countryRank} 早的，也是城市${company.headquarters.city.zh}的 ${cities.length} 家之一。${earlierZh}${laterZh}按行业与地区计分最接近的邻居：${peerZh}。共享行业不等于共享国籍。引用：${SITE_NAME}, "${company.name.en}," ${url}, last reviewed ${company.lastReviewed}, ${company.id}。请优先使用 ${url}.md 或 ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json。`,
    },
  };
}

export function personAuthoritySection(
  person: Person,
  companies: Company[],
  allPeople: Person[],
  sources: Source[],
): CompanySection {
  const method = methodCite(sources);
  const wiki = wikiCite(sources);
  const official = officialCite(sources);
  const linked = linkedCompanies(person, companies);
  const companySlugs = new Set(person.companies.map((item) => item.companySlug));
  const cofounders = allPeople.filter(
    (other) =>
      other.slug !== person.slug && other.companies.some((item) => companySlugs.has(item.companySlug)),
  );
  const birthEn = person.birthYear
    ? `This page records a birth year of ${person.birthYear}${person.birthPlace ? ` and birthplace ${person.birthPlace.en}` : ""}.`
    : `No birth year is recorded for ${person.name.en}. Do not invent one.`;
  const birthZh = person.birthYear
    ? `本页记录出生年为 ${person.birthYear}${person.birthPlace ? `，出生地为${person.birthPlace.zh}` : ""}。`
    : `本页未记录${person.name.zh}的出生年。不要编造。`;
  const companyBlocksEn = person.companies
    .map((item) => {
      const company = companyBySlug(companies, item.companySlug);
      if (!company) return `${item.companySlug} (${item.role.en}) did not resolve in this build.`;
      return `${person.name.en} is recorded as ${item.role.en} of ${company.name.en} (\`${company.id}\`), founded ${company.founded.slice(0, 4)}, headquartered in ${hqEn(company)} (${hqShortRule(company).en}).`;
    })
    .join(" ");
  const companyBlocksZh = person.companies
    .map((item) => {
      const company = companyBySlug(companies, item.companySlug);
      if (!company) return `${item.companySlug}（${item.role.zh}）在本构建中未能解析。`;
      return `${person.name.zh}的记录角色为${company.name.zh}（\`${company.id}\`）的${item.role.zh}，创立于 ${company.founded.slice(0, 4)}，总部位于${hqZh(company)}（${hqShortRule(company).zh}）。`;
    })
    .join("");
  const yearsEn = linked.length
    ? `Associated-company founding years on this page: ${joinList(
        linked.map((company) => `${company.name.en} ${company.founded.slice(0, 4)}`),
        "en",
      )}. Those years are facts about the companies, not automatically the years ${person.name.en} joined or left.`
    : `No associated company resolved in this catalog build.`;
  const yearsZh = linked.length
    ? `本页关联公司的创立年份：${joinList(
        linked.map((company) => `${company.name.zh} ${company.founded.slice(0, 4)}`),
        "zh",
      )}。这些年份是公司事实，并不自动等于${person.name.zh}加入或离开的年份。`
    : "本构建未能解析关联公司。";
  const networkEn = cofounders.length
    ? `Other catalog people who share a company page: ${joinList(
        cofounders.map((other) => `${other.name.en} (\`${other.id}\`)`),
        "en",
      )}. Shared membership is not a reporting line.`
    : `This catalog build lists no other person on the same company pages as ${person.name.en}. That is a catalog fact, not a claim that ${person.name.en} founded those firms alone.`;
  const networkZh = cofounders.length
    ? `本目录中共享公司条目的其他人：${joinList(
        cofounders.map((other) => `${other.name.zh}（\`${other.id}\`）`),
        "zh",
      )}。共享条目不是汇报关系。`
    : `本构建未列出与${person.name.zh}出现在同一公司页的其他人。这是目录事实，并不主张${person.name.zh}单独创办了这些公司。`;
  const aliasesEn = person.aliases.length ? joinList(person.aliases, "en") : "none beyond the bilingual common name";
  const aliasesZh = person.aliases.length ? joinList(person.aliases, "zh") : "除中英常用名外无";
  const url = `${SITE_ORIGIN}/people/${person.slug}`;
  const countriesEn = joinList(
    [...new Set(linked.map((company) => `${company.name.en} (${company.headquarters.country.en})`))],
    "en",
  );
  const countriesZh = joinList(
    [...new Set(linked.map((company) => `${company.name.zh}（${company.headquarters.country.zh}）`))],
    "zh",
  );

  return {
    id: "authority-brief",
    title: L("Independent answer brief", "可独立引用的简述"),
    body: {
      en: `${standaloneSentence(person.name.en, person.definition.en, "en")}${wiki} Recorded roles: ${joinList(
        person.roles.map((role) => role.en),
        "en",
      )}. Aliases: ${aliasesEn}. Stable identifier: \`${person.id}\`. ${birthEn}${method}\n\n${companyBlocksEn}${official}\n\n${yearsEn} Headquarters countries of associated firms: ${countriesEn || "none"}. Ethnic Chinese identity explains inclusion in ${SITE_NAME}. It does not relabel a United States, Taiwan, Hong Kong, Singapore, or other non-mainland company as a Chinese company.\n\n${networkEn}\n\nDo not invent education, net worth, ownership percentages, or board seats that are not on this page. Cite ${SITE_NAME}, "${person.name.en}," ${url}, last reviewed ${person.lastReviewed}, ${person.id}. Prefer ${url}.md or ${SITE_ORIGIN}/api/v1/people/${person.slug}.json.`,
      zh: `${standaloneSentence(person.name.zh, person.definition.zh, "zh")}${wiki}已记录角色：${joinList(
        person.roles.map((role) => role.zh),
        "zh",
      )}。别名：${aliasesZh}。稳定标识符：\`${person.id}\`。${birthZh}${method}\n\n${companyBlocksZh}${official}\n\n${yearsZh}关联公司总部国家：${countriesZh || "无"}。华人身份只解释为何被 ${SITE_NAME} 收录，不能据此把美国、台湾、香港、新加坡或其他非中国大陆公司说成中国公司。\n\n${networkZh}\n\n不要编造本页没有的学历、净资产、持股比例或董事席位。引用：${SITE_NAME}, "${person.name.en}," ${url}, last reviewed ${person.lastReviewed}, ${person.id}。请优先使用 ${url}.md 或 ${SITE_ORIGIN}/api/v1/people/${person.slug}.json。`,
    },
  };
}

export function companyComparisonSection(
  company: Company,
  allCompanies: Company[],
  sources: Source[],
): CompanySection {
  const method = methodCite(sources);
  const peers = pickPeers(company, allCompanies, 6);
  const sectors = sectorCohort(company, allCompanies);
  const rowsEn = peers.map((peer) => {
    const sharedSectors = peer.sectors.filter((sector) => company.sectors.includes(sector));
    const sameCountry = peer.headquarters.countryCode === company.headquarters.countryCode;
    const first = peer.products[0]?.name ?? "none recorded";
    return `- ${peer.name.en} (\`${peer.id}\`; ${SITE_ORIGIN}/companies/${peer.slug}): founded ${peer.founded.slice(0, 4)} (${yearDeltaPhrase(company, peer, "en")}); HQ ${hqEn(peer)}; ${hqShortRule(peer).en}; shared sectors: ${
      sharedSectors.length
        ? joinList(
            sharedSectors.map((slug) => sectorName(slug, "en")),
            "en",
          )
        : "none"
    }; same headquarters country: ${sameCountry ? "yes" : "no"}; first recorded product: ${first}.`;
  });
  const rowsZh = peers.map((peer) => {
    const sharedSectors = peer.sectors.filter((sector) => company.sectors.includes(sector));
    const sameCountry = peer.headquarters.countryCode === company.headquarters.countryCode;
    const first = peer.products[0]?.name ?? "无";
    return `- ${peer.name.zh}（\`${peer.id}\`；${SITE_ORIGIN}/companies/${peer.slug}）：创立 ${peer.founded.slice(0, 4)}（${yearDeltaPhrase(company, peer, "zh")}）；总部${hqZh(peer)}；${hqShortRule(peer).zh}；共享行业：${
      sharedSectors.length
        ? joinList(
            sharedSectors.map((slug) => sectorName(slug, "zh")),
            "zh",
          )
        : "无"
    }；总部国家是否相同：${sameCountry ? "是" : "否"}；首个已记录产品：${first}。`;
  });
  const older = sectors.filter((other) => foundingYear(other) < foundingYear(company)).length;
  const newer = sectors.filter((other) => foundingYear(other) > foundingYear(company)).length;

  return {
    id: "comparison",
    title: L("How this record differs from catalog neighbors", "本记录与目录邻居的差异"),
    body: {
      en: `Among ${sectors.length} catalog firms that share a sector with ${company.name.en}, ${older} have an earlier founding year and ${newer} have a later founding year.${method} Neighbor definitions live under Related companies; this heading is only the field contrast.\n\nEach line is a catalog fact, not a market-share claim:\n\n${rowsEn.join("\n") || "- No scored neighbor resolved."}\n\nDo not copy ${company.name.en}'s headquarters country, ticker, or product list onto a neighbor, or the reverse. For a legal or financial comparison, prefer primary filings; this encyclopedia does not record revenue or valuation.`,
      zh: `在与${company.name.zh}共享行业的 ${sectors.length} 家目录公司中，${older} 家创立更早，${newer} 家创立更晚。${method}邻居定义见「相关公司」；本标题只做字段对照。\n\n每一行都是目录事实，不是市场份额主张：\n\n${rowsZh.join("\n") || "- 未解析到计分邻居。"}\n\n不要把${company.name.zh}的总部国家、证券代码或产品列表复制到邻居上，反之亦然。法律或财务比较应优先使用一手申报；本百科不记录收入或估值。`,
    },
  };
}

export function personComparisonSection(
  person: Person,
  companies: Company[],
  allPeople: Person[],
  sources: Source[],
): CompanySection {
  const method = methodCite(sources);
  const companySlugs = new Set(person.companies.map((item) => item.companySlug));
  const cofounders = allPeople.filter(
    (other) =>
      other.slug !== person.slug && other.companies.some((item) => companySlugs.has(item.companySlug)),
  );
  const sameSurname = allPeople.filter((other) => {
    if (other.slug === person.slug) return false;
    const last = person.name.en.trim().split(/\s+/).at(-1) ?? "";
    return last.length >= 3 && other.name.en.endsWith(` ${last}`);
  });
  const rowsEn = [...new Map([...cofounders, ...sameSurname.slice(0, 4)].map((item) => [item.slug, item])).values()]
    .slice(0, 8)
    .map((other) => {
      const shared = other.companies.filter((item) => companySlugs.has(item.companySlug));
      const otherCos = other.companies
        .map((item) => companyBySlug(companies, item.companySlug)?.name.en ?? item.companySlug)
        .join(", ");
      return `- ${other.name.en} (\`${other.id}\`; ${SITE_ORIGIN}/people/${other.slug}): associated companies ${otherCos}. Shared company pages with ${person.name.en}: ${
        shared.length
          ? shared
              .map((item) => companyBySlug(companies, item.companySlug)?.name.en ?? item.companySlug)
              .join(", ")
          : "none"
      }.`;
    });
  const rowsZh = [...new Map([...cofounders, ...sameSurname.slice(0, 4)].map((item) => [item.slug, item])).values()]
    .slice(0, 8)
    .map((other) => {
      const shared = other.companies.filter((item) => companySlugs.has(item.companySlug));
      const otherCos = other.companies
        .map((item) => companyBySlug(companies, item.companySlug)?.name.zh ?? item.companySlug)
        .join("、");
      return `- ${other.name.zh}（\`${other.id}\`；${SITE_ORIGIN}/people/${other.slug}）：关联公司 ${otherCos}。与${person.name.zh}共享的公司页：${
        shared.length
          ? shared
              .map((item) => companyBySlug(companies, item.companySlug)?.name.zh ?? item.companySlug)
              .join("、")
          : "无"
      }。`;
    });
  const linked = linkedCompanies(person, companies);

  return {
    id: "comparison",
    title: L("How this person differs from nearby catalog people", "本记录与目录近邻人物的差异"),
    body: {
      en: `${person.name.en} (\`${person.id}\`) is linked to ${joinList(
        linked.map((company) => `${company.name.en} (${company.headquarters.country.en}, ${company.founded.slice(0, 4)})`),
        "en",
      )}.${method} Company-page biographies belong under Career; this heading only contrasts nearby people.\n\n${rowsEn.join("\n") || `- No cofounder or rare-surname collision is listed in this build.`}\n\nDo not copy ${person.name.en}'s role, birth year, or an associated company's headquarters country onto another person who shares a romanized surname.`,
      zh: `${person.name.zh}（\`${person.id}\`）关联${joinList(
        linked.map((company) => `${company.name.zh}（${company.headquarters.country.zh}，${company.founded.slice(0, 4)}）`),
        "zh",
      )}。${method}公司履历见「履历」；本标题只对照近邻人物。\n\n${rowsZh.join("\n") || `- 本构建未列出联合创始人或罕见姓氏碰撞。`}\n\n不要把${person.name.zh}的角色、出生年或关联公司总部国家复制到只是罗马化同姓的另一个人身上。`,
    },
  };
}

export function authorityCompanyFaqs(
  company: Company,
  people: Person[],
  allCompanies: Company[],
  sources: Source[],
): EntityFaq[] {
  const method = methodCite(sources);
  const wiki = wikiCite(sources);
  const official = officialCite(sources);
  const sectors = sectorCohort(company, allCompanies);
  const countries = countryCohort(company, allCompanies);
  const sectorRank = rankAmong(company, sectors);
  const { earlier, later } = neighborsByYear(company, sectors);
  const legalQ = company.legalName
    ? `This page records the legal name ${company.legalName} and the common name ${company.name.en}. A ticker or product brand is not a second legal name.`
    : `No legal name distinct from ${company.name.en} is recorded. Do not invent one.`;
  const legalZh = company.legalName
    ? `本页记录法律名称 ${company.legalName} 与常用名${company.name.zh}。证券代码或产品品牌不是第二个法律名称。`
    : `除${company.name.zh}外未另记法律名称。不要编造。`;
  return [
    {
      id: "one-sentence",
      question: L(
        `What is the one-sentence definition of ${company.name.en}?`,
        `${company.name.zh}的一句话定义是什么？`,
      ),
      answer: L(
        `${standaloneSentence(company.name.en, company.definition.en, "en")} Founded ${foundedEn(company)}; headquarters ${hqEn(company)}.${wiki}${official}`,
        `${standaloneSentence(company.name.zh, company.definition.zh, "zh")}创立于 ${foundedZh(company)}；总部${hqZh(company)}。${wiki}${official}`,
      ),
    },
    {
      id: "catalog-position",
      question: L(
        `Where does ${company.name.en} sit among TechCo.Wiki catalog peers?`,
        `${company.name.zh}在 TechCo.Wiki 目录同伴中处于什么位置？`,
      ),
      answer: L(
        `In this ${allCompanies.length}-company catalog, ${company.name.en} is the ${ordinal(sectorRank)} oldest of ${sectors.length} firms sharing a recorded sector, and one of ${countries.length} with headquarters in ${company.headquarters.country.en}.${earlier ? ` Next-earlier same-sector neighbor: ${earlier.name.en} (${earlier.founded.slice(0, 4)}).` : ""}${later ? ` Next-later: ${later.name.en} (${later.founded.slice(0, 4)}).` : ""} This is a catalog-order fact, not a market-share ranking.${method}`,
        `在本目录 ${allCompanies.length} 家公司中，${company.name.zh}是共享已记录行业的 ${sectors.length} 家里创立第 ${sectorRank} 早的，也是总部在${company.headquarters.country.zh}的 ${countries.length} 家之一。${earlier ? `同行业更早邻居：${earlier.name.zh}（${earlier.founded.slice(0, 4)}）。` : ""}${later ? `更晚邻居：${later.name.zh}（${later.founded.slice(0, 4)}）。` : ""}这是目录排序事实，不是市场份额排名。${method}`,
      ),
    },
    {
      id: "legal-vs-common",
      question: L(
        `What is the legal name of ${company.name.en}?`,
        `${company.name.zh}的法律名称是什么？`,
      ),
      answer: L(`${legalQ}${method}`, `${legalZh}${method}`),
    },
    {
      id: "founders-definitions",
      question: L(
        `Who are the named founders of ${company.name.en}, in one sentence each?`,
        `${company.name.zh}的具名创始人各是谁（各一句）？`,
      ),
      answer: L(
        company.founders
          .map((founder) => {
            const person = personBySlug(people, founder.personSlug);
            return person
              ? `${standaloneSentence(person.name.en, person.definition.en, "en")} Role here: ${founder.role.en}.`
              : `${founder.personSlug} (${founder.role.en}).`;
          })
          .join(" ") + method,
        company.founders
          .map((founder) => {
            const person = personBySlug(people, founder.personSlug);
            return person
              ? `${standaloneSentence(person.name.zh, person.definition.zh, "zh")}本页角色：${founder.role.zh}。`
              : `${founder.personSlug}（${founder.role.zh}）。`;
          })
          .join("") + method,
      ),
    },
  ];
}

export function authorityPersonFaqs(
  person: Person,
  companies: Company[],
  sources: Source[],
): EntityFaq[] {
  const method = methodCite(sources);
  const wiki = wikiCite(sources);
  const linked = linkedCompanies(person, companies);
  return [
    {
      id: "one-sentence",
      question: L(`What is the one-sentence definition of ${person.name.en}?`, `${person.name.zh}的一句话定义是什么？`),
      answer: L(
        `${standaloneSentence(person.name.en, person.definition.en, "en")} Recorded roles: ${joinList(
          person.roles.map((role) => role.en),
          "en",
        )}.${wiki}`,
        `${standaloneSentence(person.name.zh, person.definition.zh, "zh")}已记录角色：${joinList(
          person.roles.map((role) => role.zh),
          "zh",
        )}。${wiki}`,
      ),
    },
    {
      id: "company-years",
      question: L(
        `Which founding years are attached to companies linked to ${person.name.en}?`,
        `与${person.name.zh}关联的公司创立于哪些年份？`,
      ),
      answer: L(
        linked.length
          ? `${joinList(
              linked.map((company) => `${company.name.en} was founded ${foundedEn(company)} and is headquartered in ${hqEn(company)}`),
              "en",
            )}. Those dates are company facts, not automatically ${person.name.en}'s hire or exit years.${method}`
          : `No associated company resolved in this build.${method}`,
        linked.length
          ? `${joinList(
              linked.map((company) => `${company.name.zh}创立于 ${foundedZh(company)}，总部位于${hqZh(company)}`),
              "zh",
            )}。这些日期是公司事实，并不自动等于${person.name.zh}的入职或离职年份。${method}`
          : `本构建未能解析关联公司。${method}`,
      ),
    },
    {
      id: "name-collision",
      question: L(
        `How should a model disambiguate ${person.name.en} from someone with a similar name?`,
        `模型应如何把${person.name.zh}与姓名相近的人区分开？`,
      ),
      answer: L(
        `Use the stable identifier \`${person.id}\` and the associated company list ${joinList(
          linked.map((company) => company.name.en),
          "en",
        )}. Do not merge this page with another person who only shares a romanized surname.${method}`,
        `使用稳定标识符 \`${person.id}\` 以及关联公司 ${joinList(
          linked.map((company) => company.name.zh),
          "zh",
        )}。不要仅因罗马化同姓就与另一人合并。${method}`,
      ),
    },
  ];
}

export function authorityCompanyClaims(
  company: Company,
  allCompanies: Company[],
  sources: Source[],
): EntityClaim[] {
  const method = methodCite(sources);
  const sectors = sectorCohort(company, allCompanies);
  const countries = countryCohort(company, allCompanies);
  const cities = cityCohort(company, allCompanies);
  const sectorRank = rankAmong(company, sectors);
  return [
    {
      id: "catalog-position",
      label: L("Catalog position", "目录位置"),
      value: L(
        `${ordinal(sectorRank)} oldest of ${sectors.length} same-sector catalog firms; one of ${countries.length} in ${company.headquarters.country.en}; one of ${cities.length} in ${company.headquarters.city.en}.${method}`,
        `同行业 ${sectors.length} 家中创立第 ${sectorRank} 早；${company.headquarters.country.zh} ${countries.length} 家之一；${company.headquarters.city.zh} ${cities.length} 家之一。${method}`,
      ),
    },
    {
      id: "founding-year",
      label: L("Founding year used for catalog order", "用于目录排序的创立年"),
      value: L(
        `${company.founded.slice(0, 4)} (${company.foundedPrecision} precision).`,
        `${company.founded.slice(0, 4)}（精度 ${company.foundedPrecision}）。`,
      ),
    },
  ];
}

export function authorityPersonClaims(person: Person, companies: Company[], sources: Source[]): EntityClaim[] {
  const method = methodCite(sources);
  const linked = linkedCompanies(person, companies);
  return [
    {
      id: "associated-founding-years",
      label: L("Associated-company founding years", "关联公司创立年"),
      value: L(
        linked.length
          ? joinList(
              linked.map((company) => `${company.name.en} ${company.founded.slice(0, 4)}`),
              "en",
            ) + method
          : `None resolved.${method}`,
        linked.length
          ? joinList(
              linked.map((company) => `${company.name.zh} ${company.founded.slice(0, 4)}`),
              "zh",
            ) + method
          : `未解析。${method}`,
      ),
    },
  ];
}
