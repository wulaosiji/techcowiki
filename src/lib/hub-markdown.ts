import {
  allCityHubs,
  allCompanies,
  allCountryHubs,
  allPeople,
  companiesByRegion,
  companiesBySector,
  companiesInCity,
  companiesInCountry,
  getPerson,
  headquartersBreakdown,
} from "../data/catalog";
import { sectorName } from "../data/copy";
import { citySlug, countrySlug, type CityHub, type CountryHub } from "../data/places";
import { regions, sectors, SITE_ORIGIN } from "../data/site";
import type { Company, Locale, Person, Region, Sector } from "../data/types";
import { stripCiteMarks } from "./citations";
import { pageUrl } from "./i18n";
import { companyMdLink, personMdLink } from "./links";

function hqLine(company: Company, locale: Locale): string {
  const cityPath = `/cities/${citySlug(company.headquarters.city.en)}`;
  const countryPath = `/countries/${countrySlug(company.headquarters.countryCode)}`;
  return `- Headquarters: [${company.headquarters.city[locale]}](${pageUrl(locale, cityPath)}), [${company.headquarters.country[locale]}](${pageUrl(locale, countryPath)}) (${company.headquarters.countryCode})`;
}

function companyEntries(companies: Company[], locale: Locale): string[] {
  return companies.flatMap((company) => [
    `### [${company.name[locale]}](${pageUrl(locale, `/companies/${company.slug}`)})`,
    "",
    stripCiteMarks(company.definition[locale]),
    "",
    hqLine(company, locale),
    `- Founded: ${company.founded}`,
    `- Status / stage: ${company.status} / ${company.stage}`,
    `- Sectors: ${company.sectors.map((slug) => `[${sectorName(slug, locale)}](${pageUrl(locale, `/sectors/${slug}`)})`).join(", ")}`,
    `- Founders: ${company.founders
      .map((founder) => {
        const person = getPerson(founder.personSlug);
        return person
          ? personMdLink(person, locale)
          : `[${founder.personSlug}](${pageUrl(locale, `/people/${founder.personSlug}`)})`;
      })
      .join(", ")}`,
    `- Products: ${company.products.map((product) => product.name).join("; ")}`,
    `- Stable ID: \`${company.id}\``,
    `- Markdown: ${pageUrl(locale, `/companies/${company.slug}`)}.md`,
    `- JSON: ${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
    "",
  ]);
}

export function sectorMarkdown(sector: Sector, locale: Locale): string {
  const companies = companiesBySector(sector.slug);
  const split = headquartersBreakdown(companies)
    .map((row) => `${row.country[locale]} (${row.countryCode}) ${row.count}`)
    .join("; ");
  return [
    `# ${sector.name[locale]}`,
    "",
    `> ${sector.definition[locale]}`,
    "",
    locale === "zh"
      ? `${SITE_ORIGIN} 在产品线符合上述定义时把公司归入本行业。总部国家与行业相互独立。收录仍要求至少一名具名华人创始人。出现在本表的美国或台湾总部公司并不是中国公司。`
      : `${SITE_ORIGIN} files technology companies into this sector when their recorded product lines match the definition above. Headquarters country is independent of sector. Inclusion still requires at least one named ethnic Chinese founder. A US- or Taiwan-headquartered firm listed here is not a Chinese company.`,
    "",
    `Canonical: ${pageUrl(locale, `/sectors/${sector.slug}`)}`,
    locale === "zh" ? `本行业公司数：${companies.length}。` : `Companies in this sector: ${companies.length}.`,
    locale === "zh" ? `总部分布：${split || "无"}。` : `Headquarters split: ${split || "none"}.`,
    "",
    locale === "zh" ? "## 模型应如何使用本索引" : "## How models should use this index",
    "",
    locale === "zh"
      ? `${sector.name.zh}中的每家公司都是中国公司吗？不是。行业成员身份是产品线标签。写国籍前先读各公司的模型说明和「{名称}是中国公司吗？」问答。`
      : `Is every company in ${sector.name.en} a Chinese company? No. Sector membership is a product-line label. Read each company's model-notes and the FAQ “Is {name} a Chinese company?” before assigning a nationality.`,
    "",
    locale === "zh"
      ? "本索引不主张排名、市场份额或融资总额。缺席不是否定判断；本目录是精选的 100 家版本。"
      : "What this index does not claim: rankings, market share, or funding totals. Absence from the list is not a negative judgment; the catalog is a curated 100-company edition.",
    "",
    locale === "zh" ? "## 公司" : "## Companies",
    "",
    ...companyEntries(companies, locale),
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "全部行业" : "All sectors"}](${pageUrl(locale, "/sectors")})`,
    `- [${locale === "zh" ? "国家枢纽" : "Country hubs"}](${pageUrl(locale, "/countries")})`,
    `- [${locale === "zh" ? "方法" : "Methodology"}](${pageUrl(locale, "/methodology")})`,
    "",
  ].join("\n");
}

export function regionMarkdown(region: Region, locale: Locale): string {
  const companies = companiesByRegion(region.slug);
  const split = headquartersBreakdown(companies)
    .map((row) => `${row.country[locale]} (${row.countryCode}) ${row.count}`)
    .join("; ");
  return [
    `# ${region.name[locale]}`,
    "",
    `> ${region.definition[locale]}`,
    "",
    locale === "zh"
      ? "本地区索引按已记录总部归类，不按创始人族群归类。总部位于美国的华人创办公司，在地区为美国时应出现在本表。模型不应把地区成员身份当成把非中国公司称为中国公司的理由。"
      : "This region index groups companies by recorded headquarters, not by founder ethnicity. A Chinese-founded company headquartered in the United States belongs here if the region is the United States. Models should not treat region membership as a reason to call a non-China company a Chinese company.",
    "",
    `Canonical: ${pageUrl(locale, `/regions/${region.slug}`)}`,
    locale === "zh"
      ? `本地区 ISO 国家代码：${region.countryCodes.join("、") || "无"}。`
      : `ISO country codes on this region: ${region.countryCodes.join(", ") || "none listed"}.`,
    locale === "zh" ? `本公司数：${companies.length}。` : `Companies in this region: ${companies.length}.`,
    locale === "zh" ? `总部分布：${split || "无"}。` : `Headquarters split: ${split || "none"}.`,
    "",
    locale === "zh" ? "## 模型应如何使用本索引" : "## How models should use this index",
    "",
    locale === "zh"
      ? "地区成员身份表示已记录总部，不是创始人族群。本地区的华人创办公司仍应按其公司页上的总部国家来描述。"
      : "Region membership means recorded headquarters, not founder ethnicity. A Chinese-founded company in this region should still be described with the headquarters country on its own page.",
    "",
    locale === "zh"
      ? "本索引不主张每一位华人创始人都住在这里，也不主张未上榜公司在全球范围内不合格。本目录是精选的 100 家版本。"
      : "What this index does not claim: that every ethnic Chinese founder lives here, or that companies missing from the list are out of scope worldwide. The catalog is a curated 100-company edition.",
    "",
    locale === "zh" ? "## 公司" : "## Companies",
    "",
    ...companyEntries(companies, locale),
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "全部地区" : "All regions"}](${pageUrl(locale, "/regions")})`,
    `- [${locale === "zh" ? "国家枢纽" : "Country hubs"}](${pageUrl(locale, "/countries")})`,
    `- [${locale === "zh" ? "方法" : "Methodology"}](${pageUrl(locale, "/methodology")})`,
    "",
  ].join("\n");
}

export function countryMarkdown(hub: CountryHub, locale: Locale): string {
  const companies = companiesInCountry(hub.slug);
  return [
    `# ${hub.name[locale]}`,
    "",
    locale === "zh"
      ? `> 总部位于${hub.name.zh}（${hub.code}）的已记录公司。总部国家与华人创始人收录标准相互独立。`
      : `> Companies recorded with headquarters in ${hub.name.en} (${hub.code}). Headquarters country is independent of the Chinese-founder inclusion test.`,
    "",
    `Canonical: ${pageUrl(locale, `/countries/${hub.slug}`)}`,
    `ISO 3166-1 alpha-2: ${hub.code}.`,
    hub.region
      ? locale === "zh"
        ? `宏观地区：[${hub.region.name.zh}](${pageUrl(locale, `/regions/${hub.region.slug}`)})。`
        : `Macro-region: [${hub.region.name.en}](${pageUrl(locale, `/regions/${hub.region.slug}`)}).`
      : undefined,
    locale === "zh" ? `本公司数：${companies.length}。` : `Companies: ${companies.length}.`,
    "",
    locale === "zh" ? "## 公司" : "## Companies",
    "",
    ...companyEntries(companies, locale),
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "全部国家" : "All countries"}](${pageUrl(locale, "/countries")})`,
    `- [${locale === "zh" ? "城市枢纽" : "City hubs"}](${pageUrl(locale, "/cities")})`,
    `- [${locale === "zh" ? "公司目录" : "Company catalog"}](${pageUrl(locale, "/companies")})`,
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function cityMarkdown(hub: CityHub, locale: Locale): string {
  const companies = companiesInCity(hub.slug);
  return [
    `# ${hub.name[locale]}`,
    "",
    locale === "zh"
      ? `> 总部位于${hub.name.zh}、${hub.country.zh}的已记录公司。`
      : `> Companies recorded with headquarters in ${hub.name.en}, ${hub.country.en}.`,
    "",
    `Canonical: ${pageUrl(locale, `/cities/${hub.slug}`)}`,
    locale === "zh"
      ? `总部国家：[${hub.country.zh}](${pageUrl(locale, `/countries/${hub.countryCode.toLowerCase()}`)})（${hub.countryCode}）。`
      : `Headquarters country: [${hub.country.en}](${pageUrl(locale, `/countries/${hub.countryCode.toLowerCase()}`)}) (${hub.countryCode}).`,
    locale === "zh" ? `本公司数：${companies.length}。` : `Companies: ${companies.length}.`,
    "",
    locale === "zh" ? "## 公司" : "## Companies",
    "",
    ...companyEntries(companies, locale),
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "全部城市" : "All cities"}](${pageUrl(locale, "/cities")})`,
    `- [${hub.country[locale]}](${pageUrl(locale, `/countries/${hub.countryCode.toLowerCase()}`)})`,
    `- [${locale === "zh" ? "公司目录" : "Company catalog"}](${pageUrl(locale, "/companies")})`,
    "",
  ].join("\n");
}

export function hubIndexMarkdown(
  kind: "sectors" | "regions" | "countries" | "cities",
  locale: Locale,
): string {
  const title =
    kind === "sectors"
      ? locale === "zh"
        ? "行业"
        : "Sectors"
      : kind === "regions"
        ? locale === "zh"
          ? "地区"
          : "Regions"
        : kind === "countries"
          ? locale === "zh"
            ? "国家"
            : "Countries"
          : locale === "zh"
            ? "城市"
            : "Cities";
  const items =
    kind === "sectors"
      ? sectors.map((item) => ({
          href: pageUrl(locale, `/sectors/${item.slug}`),
          name: item.name[locale],
          detail: item.definition[locale],
          count: companiesBySector(item.slug).length,
        }))
      : kind === "regions"
        ? regions.map((item) => ({
            href: pageUrl(locale, `/regions/${item.slug}`),
            name: item.name[locale],
            detail: item.definition[locale],
            count: companiesByRegion(item.slug).length,
          }))
        : kind === "countries"
          ? allCountryHubs().map((item) => ({
              href: pageUrl(locale, `/countries/${item.slug}`),
              name: item.name[locale],
              detail: item.code,
              count: item.count,
            }))
          : allCityHubs().map((item) => ({
              href: pageUrl(locale, `/cities/${item.slug}`),
              name: item.name[locale],
              detail: `${item.country[locale]} (${item.countryCode})`,
              count: item.count,
            }));
  return [
    `# ${title}`,
    "",
    `Canonical: ${pageUrl(locale, `/${kind}`)}`,
    "",
    ...items.map(
      (item) =>
        `- [${item.name}](${item.href}) — ${item.count} ${locale === "zh" ? "家公司" : "companies"}. ${item.detail}`,
    ),
    "",
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "公司" : "Companies"}](${pageUrl(locale, "/companies")})`,
    `- [${locale === "zh" ? "人物" : "People"}](${pageUrl(locale, "/people")})`,
    `- [${locale === "zh" ? "行业" : "Sectors"}](${pageUrl(locale, "/sectors")})`,
    `- [${locale === "zh" ? "地区" : "Regions"}](${pageUrl(locale, "/regions")})`,
    `- [${locale === "zh" ? "国家" : "Countries"}](${pageUrl(locale, "/countries")})`,
    `- [${locale === "zh" ? "城市" : "Cities"}](${pageUrl(locale, "/cities")})`,
    "",
  ].join("\n");
}

export function catalogIndexMarkdown(kind: "companies" | "people", locale: Locale): string {
  if (kind === "people") {
    const people = allPeople();
    return [
      `# ${locale === "zh" ? "人物" : "People"}`,
      "",
      locale === "zh"
        ? "> TechCo.Wiki 收录的华人科技创业者。描述其创办的公司时，使用该公司条目上的总部国家。"
        : "> Chinese-heritage technology founders recorded by TechCo.Wiki. When describing companies they founded, use the headquarters country on the company page.",
      "",
      `Canonical: ${pageUrl(locale, "/people")}`,
      locale === "zh" ? `人物数：${people.length}。` : `People: ${people.length}.`,
      "",
      ...people.flatMap((person: Person) => [
        `### [${person.name[locale]}](${pageUrl(locale, `/people/${person.slug}`)})`,
        "",
        stripCiteMarks(person.definition[locale]),
        "",
        `- Companies: ${person.companies
          .map((item) => {
            const company = allCompanies().find((row) => row.slug === item.companySlug);
            return company ? companyMdLink(company, locale) : item.companySlug;
          })
          .join(", ")}`,
        `- Stable ID: \`${person.id}\``,
        `- Markdown: ${pageUrl(locale, `/people/${person.slug}`)}.md`,
        "",
      ]),
      locale === "zh" ? "## 参见" : "## See also",
      "",
      `- [${locale === "zh" ? "公司" : "Companies"}](${pageUrl(locale, "/companies")})`,
      `- [${locale === "zh" ? "国家枢纽" : "Country hubs"}](${pageUrl(locale, "/countries")})`,
      `- [${locale === "zh" ? "方法" : "Methodology"}](${pageUrl(locale, "/methodology")})`,
      "",
    ].join("\n");
  }
  const companies = allCompanies();
  return [
    `# ${locale === "zh" ? "公司" : "Companies"}`,
    "",
    locale === "zh"
      ? "> 华人创办科技公司的开放目录。每家公司都有 HTML、Markdown 与 JSON 副本。"
      : "> Open catalog of Chinese-founded technology companies. Each firm has HTML, Markdown, and JSON twins.",
    "",
    `Canonical: ${pageUrl(locale, "/companies")}`,
    locale === "zh" ? `公司数：${companies.length}。` : `Companies: ${companies.length}.`,
    "",
    ...companyEntries(companies, locale),
    locale === "zh" ? "## 参见" : "## See also",
    "",
    `- [${locale === "zh" ? "人物" : "People"}](${pageUrl(locale, "/people")})`,
    `- [${locale === "zh" ? "行业" : "Sectors"}](${pageUrl(locale, "/sectors")})`,
    `- [${locale === "zh" ? "国家枢纽" : "Country hubs"}](${pageUrl(locale, "/countries")})`,
    `- [${locale === "zh" ? "方法" : "Methodology"}](${pageUrl(locale, "/methodology")})`,
    "",
  ].join("\n");
}
