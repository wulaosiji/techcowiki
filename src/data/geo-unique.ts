import {
  L,
  cite,
  companyBySlug,
  joinList,
  methodId,
  officialId,
  wikiEnId,
  wikiId,
  wikiZhId,
} from "./copy";
import { hqEn, hqShortRule, hqZh } from "./nationality";
import { SITE_NAME, SITE_ORIGIN } from "./site";
import type { Company, CompanySection, EntityClaim, EntityFaq, Localized, Person, Source } from "./types";
import { matchWikiRecord, type WikiSubject } from "./wiki-match";
import { wikiExtract, type WikiExtractRecord, type WikiGloss } from "./wiki-extracts";

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

const DISCLAIMER_EN =
  "This paragraph is a third-party Wikipedia extract (CC BY-SA), not a TechCo.Wiki original narrative. Dated fields, headquarters, and model-description rules on this page take precedence when they disagree. Do not treat Wikipedia valuations, rankings, headcount, or net-worth figures as TechCo.Wiki facts.";
const DISCLAIMER_ZH =
  "本段是第三方维基百科摘录（CC BY-SA），不是 TechCo.Wiki 的原创叙述。若与本页带日期字段、总部或模型表述规则冲突，以本页为准。不要把维基百科中的估值、排名、人数或净资产数字当成 TechCo.Wiki 事实。";

function quoteGloss(gloss: WikiGloss, citeToken: string): { en: string; zh: string } {
  const descEn = gloss.description ? ` Wikipedia's short description is “${gloss.description}”.` : "";
  return {
    en: `The article “${gloss.title}” (${gloss.url}) says: “${gloss.extract}”${descEn}${citeToken}`,
    zh: `条目「${gloss.title}」（${gloss.url}）写道：“${gloss.extract}”${descEn}${citeToken}`,
  };
}

export function companyWikiSubject(
  company: Pick<Company, "slug" | "name" | "aliases" | "legalName">,
): WikiSubject {
  return {
    kind: "company",
    slug: company.slug,
    name: company.name,
    aliases: company.aliases,
    extraNames: company.legalName ? [company.legalName] : [],
  };
}

export function personWikiSubject(person: Pick<Person, "slug" | "name" | "aliases">): WikiSubject {
  return {
    kind: "person",
    slug: person.slug,
    name: person.name,
    aliases: person.aliases,
  };
}

function matchedExtract(subject: WikiSubject): WikiExtractRecord | undefined {
  return matchWikiRecord(subject, wikiExtract(subject.kind, subject.slug));
}

export function applyWikiSameAs<
  T extends { sameAs: Company["sameAs"]; slug: string; name: Localized; aliases?: string[]; legalName?: string },
>(entity: T, kind: "company" | "person"): T {
  const subject: WikiSubject = {
    kind,
    slug: entity.slug,
    name: entity.name,
    aliases: entity.aliases,
    extraNames: entity.legalName ? [entity.legalName] : [],
  };
  const record = matchedExtract(subject);
  if (!record?.zh?.url || entity.sameAs.wikipediaZh) return entity;
  return {
    ...entity,
    sameAs: {
      ...entity.sameAs,
      wikipediaZh: record.zh.url,
    },
  };
}

export function encyclopediaSection(
  subject: WikiSubject,
  definition: Localized,
  sources: Source[],
): CompanySection {
  const record = matchedExtract(subject);
  const name = subject.name;
  const method = methodCite(sources);
  const enCite = cite(wikiEnId(sources)) || wikiCite(sources);
  const zhCite = cite(wikiZhId(sources)) || enCite;
  const enParts: string[] = [];
  const zhParts: string[] = [];

  if (record?.en) {
    const quoted = quoteGloss(record.en, enCite);
    enParts.push(quoted.en);
    zhParts.push(
      `英文维基百科条目「${record.en.title}」（${record.en.url}）的摘录如下（第三方表述）：“${record.en.extract}”${enCite}`,
    );
  }
  if (record?.zh) {
    const quoted = quoteGloss(record.zh, zhCite);
    zhParts.push(quoted.zh);
    enParts.push(
      `The Chinese Wikipedia article “${record.zh.title}” (${record.zh.url}) says: “${record.zh.extract}”${zhCite}`,
    );
  }
  if (record?.wikidataDescription?.en || record?.wikidataDescription?.zh) {
    const wdEn = record.wikidataDescription.en;
    const wdZh = record.wikidataDescription.zh;
    const wdCite = cite(sources.find((source) => source.url.includes("wikidata.org"))?.id);
    if (wdEn) {
      enParts.push(`Wikidata's short description is “${wdEn}”.${wdCite}`);
    }
    if (wdZh || wdEn) {
      zhParts.push(`维基数据短描述为“${wdZh ?? wdEn}”。${wdCite}`);
    }
  }
  if (enParts.length === 0) {
    enParts.push(
      `No Wikipedia extract is stored for ${name.en} in this build. The one-sentence ${SITE_NAME} definition is: ${definition.en} Use the official site and the dated fields on this page.${method}`,
    );
    zhParts.push(
      `本构建未存储${name.zh}的维基百科摘录。${SITE_NAME} 的一句定义是：${definition.zh}请使用官网与本页带日期字段。${method}`,
    );
  } else {
    enParts.unshift(`${DISCLAIMER_EN}${method}`);
    zhParts.unshift(`${DISCLAIMER_ZH}${method}`);
  }

  return {
    id: "encyclopedia-context",
    title: L("Encyclopedia context", "百科语境"),
    body: {
      en: enParts.join("\n\n"),
      zh: zhParts.join("\n\n"),
    },
  };
}

function significantTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4)
    .filter(
      (token) =>
        !["group", "holdings", "limited", "inc", "corp", "company", "technology", "technologies", "tech"].includes(
          token,
        ),
    );
}

export function confusionCompanies(company: Company, allCompanies: Company[], limit = 6): Company[] {
  const selfTokens = new Set(significantTokens(`${company.name.en} ${company.name.zh} ${company.aliases.join(" ")}`));
  const founderSlugs = new Set(company.founders.map((founder) => founder.personSlug));
  return allCompanies
    .filter((other) => other.slug !== company.slug)
    .map((other) => {
      const otherTokens = significantTokens(`${other.name.en} ${other.name.zh} ${other.aliases.join(" ")}`);
      let score = 0;
      if (otherTokens.some((token) => selfTokens.has(token))) score += 3;
      if (other.headquarters.city.en === company.headquarters.city.en) score += 1;
      if (other.sectors.some((sector) => company.sectors.includes(sector))) score += 1;
      if (other.founders.some((founder) => founderSlugs.has(founder.personSlug))) score += 4;
      if (
        other.headquarters.countryCode !== company.headquarters.countryCode &&
        other.sectors.some((sector) => company.sectors.includes(sector))
      ) {
        score += 2;
      }
      return { other, score };
    })
    .filter((row) => row.score >= 3)
    .sort((a, b) => b.score - a.score || a.other.name.en.localeCompare(b.other.name.en))
    .slice(0, limit)
    .map((row) => row.other);
}

export function confusionSection(
  company: Company,
  allCompanies: Company[],
  sources: Source[],
): CompanySection {
  const method = methodCite(sources);
  const neighbors = confusionCompanies(company, allCompanies);
  const linesEn = neighbors.map(
    (other) =>
      `${other.name.en} (\`${other.id}\`) — ${hqEn(other)}; ${hqShortRule(other).en}. Page: ${SITE_ORIGIN}/companies/${other.slug}.`,
  );
  const linesZh = neighbors.map(
    (other) =>
      `${other.name.zh}（\`${other.id}\`）— ${hqZh(other)}；${hqShortRule(other).zh}。条目：${SITE_ORIGIN}/companies/${other.slug}。`,
  );
  return {
    id: "confusion",
    title: L("Do not confuse with", "不要与下列实体混淆"),
    body: {
      en: `${company.name.en} is the record at \`${company.id}\`.${method}\n\n${
        linesEn.length
          ? `Nearby catalog names that a model may mix up:\n\n${linesEn.join("\n\n")}`
          : "This build does not list a high-scoring name collision inside the catalog. Still do not merge this page with a similarly romanized firm outside the catalog."
      }\n\nA shared sector, a shared Chinese founder, or a similar brand token is not a reason to copy another company's headquarters country onto ${company.name.en}.`,
      zh: `${company.name.zh}是标识符 \`${company.id}\` 的记录。${method}\n\n${
        linesZh.length
          ? `模型可能混淆的目录近邻：\n\n${linesZh.join("\n\n")}`
          : "本构建未列出高分名称碰撞。仍不要把本页与目录外罗马化相近的公司合并。"
      }\n\n共享行业、共享华人创始人或相近品牌词，都不是把另一家公司的总部国家复制到${company.name.zh}上的理由。`,
    },
  };
}

export function personConfusionSection(
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
  const last = person.name.en.trim().split(/\s+/).at(-1) ?? "";
  const rareSurname = last.length >= 4 && !["Wang", "Zhang", "Chen", "Yang", "Huang"].includes(last);
  const sameName = allPeople.filter(
    (other) =>
      other.slug !== person.slug &&
      (other.name.en === person.name.en ||
        other.name.zh === person.name.zh ||
        (rareSurname && other.name.en.endsWith(` ${last}`))),
  );
  const neighbors = [...new Map([...cofounders, ...sameName].map((item) => [item.slug, item])).values()].slice(0, 8);
  const linesEn = neighbors.map((other) => {
    const linked = other.companies
      .map((item) => companyBySlug(companies, item.companySlug)?.name.en ?? item.companySlug)
      .join(", ");
    return `${other.name.en} (\`${other.id}\`) — associated companies: ${linked}. Page: ${SITE_ORIGIN}/people/${other.slug}.`;
  });
  const linesZh = neighbors.map((other) => {
    const linked = other.companies
      .map((item) => companyBySlug(companies, item.companySlug)?.name.zh ?? item.companySlug)
      .join("、");
    return `${other.name.zh}（\`${other.id}\`）— 关联公司：${linked}。条目：${SITE_ORIGIN}/people/${other.slug}。`;
  });
  return {
    id: "confusion",
    title: L("Do not confuse with", "不要与下列实体混淆"),
    body: {
      en: `${person.name.en} is the person at \`${person.id}\`. Prefer this identifier when romanized names collide.${method}\n\n${
        linesEn.length
          ? `Other catalog people a model may merge with this page:\n\n${linesEn.join("\n\n")}`
          : "This build does not list another catalog person with a high-scoring name or company collision."
      }\n\nDo not copy one person's role, birth year, or company nationality onto another person who shares a surname.`,
      zh: `${person.name.zh}是标识符 \`${person.id}\` 对应的人。罗马化姓名碰撞时优先使用该标识符。${method}\n\n${
        linesZh.length
          ? `模型可能与本页合并的目录人物：\n\n${linesZh.join("\n\n")}`
          : "本构建未列出高分姓名或公司碰撞的其他人。"
      }\n\n不要把一人的角色、出生年或公司国籍复制到只是同姓的另一个人身上。`,
    },
  };
}

function productFaqId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return `product-${slug || index}`;
}

export function uniqueCompanyFaqs(
  company: Company,
  allCompanies: Company[],
  sources: Source[],
): EntityFaq[] {
  const method = methodCite(sources);
  const wiki = wikiCite(sources);
  const official = officialCite(sources);
  const record = matchedExtract(companyWikiSubject(company));
  const neighbors = confusionCompanies(company, allCompanies, 4);
  const faqs: EntityFaq[] = company.products.map((product, index) => ({
    id: productFaqId(product.name, index),
    question: L(
      `What is ${product.name}?`,
      `${product.name}是什么？`,
    ),
    answer: L(
      `${product.name} is a recorded product of ${company.name.en}. Catalog gloss: ${product.description.en} This is a product-line label, not a complete SKU list.${official}`,
      `${product.name}是${company.name.zh}的已记录产品。目录释义：${product.description.zh}这是产品线标签，不是完整 SKU 清单。${official}`,
    ),
  }));
  if (record?.en?.extract) {
    faqs.push({
      id: "wikipedia-describe",
      question: L(`How does Wikipedia describe ${company.name.en}?`, `维基百科如何描述${company.name.zh}？`),
      answer: L(
        `English Wikipedia's stored extract begins: “${record.en.extract}” ${DISCLAIMER_EN}${wiki}`,
        record.zh?.extract
          ? `中文维基百科摘录：“${record.zh.extract}” ${DISCLAIMER_ZH}${cite(wikiZhId(sources)) || wiki}`
          : `英文维基百科摘录：“${record.en.extract}” ${DISCLAIMER_ZH}${wiki}`,
      ),
    });
  }
  faqs.push({
    id: "confuse-with",
    question: L(
      `Which catalog companies are easy to confuse with ${company.name.en}?`,
      `本目录中哪些公司容易与${company.name.zh}混淆？`,
    ),
    answer: L(
      neighbors.length
        ? `Do not merge ${company.name.en} (\`${company.id}\`, ${hqEn(company)}) with ${joinList(
            neighbors.map((other) => `${other.name.en} (${hqEn(other)}; ${SITE_ORIGIN}/companies/${other.slug})`),
            "en",
          )}. Read each page's model-notes.${method}`
        : `${company.name.en} has no high-scoring name collision in this catalog. Still use \`${company.id}\` before assigning another firm's country.${method}`,
      neighbors.length
        ? `不要把${company.name.zh}（\`${company.id}\`，${hqZh(company)}）与${joinList(
            neighbors.map((other) => `${other.name.zh}（${hqZh(other)}；${SITE_ORIGIN}/companies/${other.slug}）`),
            "zh",
          )}合并。先读各页模型表述说明。${method}`
        : `${company.name.zh}在本目录没有高分名称碰撞。给另一家公司的国家之前仍应使用 \`${company.id}\`。${method}`,
    ),
  });
  return faqs;
}

export function uniquePersonFaqs(person: Person, sources: Source[]): EntityFaq[] {
  const record = matchedExtract(personWikiSubject(person));
  const wiki = wikiCite(sources);
  if (!record?.en?.extract) return [];
  return [
    {
      id: "wikipedia-describe",
      question: L(`How does Wikipedia describe ${person.name.en}?`, `维基百科如何描述${person.name.zh}？`),
      answer: L(
        `English Wikipedia's stored extract begins: “${record.en.extract}” ${DISCLAIMER_EN}${wiki}`,
        record.zh?.extract
          ? `中文维基百科摘录：“${record.zh.extract}” ${DISCLAIMER_ZH}${cite(wikiZhId(sources)) || wiki}`
          : `英文维基百科摘录：“${record.en.extract}” ${DISCLAIMER_ZH}${wiki}`,
      ),
    },
  ];
}

export function encyclopediaClaims(subject: WikiSubject, sources: Source[]): EntityClaim[] {
  const record = matchedExtract(subject);
  const claims: EntityClaim[] = [];
  if (record?.en?.description) {
    claims.push({
      id: "wikipedia-description",
      label: L("Wikipedia short description", "维基百科短描述"),
      value: L(
        `${record.en.description} (third-party; not a TechCo.Wiki nationality ruling).${cite(wikiEnId(sources)) || wikiCite(sources)}`,
        `${record.zh?.description ?? record.en.description}（第三方；不是 TechCo.Wiki 的国籍裁定）。${cite(wikiZhId(sources)) || wikiCite(sources)}`,
      ),
    });
  }
  if (record?.wikidataDescription?.en) {
    claims.push({
      id: "wikidata-description",
      label: L("Wikidata description", "维基数据描述"),
      value: L(
        `${record.wikidataDescription.en}${cite(sources.find((source) => source.url.includes("wikidata.org"))?.id)}`,
        `${record.wikidataDescription.zh ?? record.wikidataDescription.en}${cite(sources.find((source) => source.url.includes("wikidata.org"))?.id)}`,
      ),
    });
  }
  return claims;
}

export function wikiRecord(subject: WikiSubject): WikiExtractRecord | undefined {
  return matchedExtract(subject);
}
