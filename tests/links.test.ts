import { describe, expect, test } from "vitest";
import {
  allCityHubs,
  allCompanies,
  allCountryHubs,
  allPeople,
  companiesByRegion,
  companiesBySector,
  companiesInCity,
  companiesInCountry,
  getCompany,
  getPerson,
} from "../src/data/catalog";
import { catalogIndexMarkdown } from "../src/lib/hub-markdown";
import { citySlug, countrySlug } from "../src/data/places";
import { editorialDocs, getEditorial } from "../src/data/pages";
import { faqs } from "../src/data/site";
import { linkCatalogCopy } from "../src/lib/autolink";
import { companyMarkdown, personMarkdown } from "../src/lib/markdown";
import { GET as sitemapGet } from "../src/pages/sitemap.xml";

describe("internal linking", () => {
  test("NVIDIA prose links the founder and Santa Clara hubs", () => {
    const nvidia = getCompany("nvidia");
    expect(nvidia).toBeTruthy();
    const hay = [
      nvidia!.definition.en,
      nvidia!.lead.en,
      ...nvidia!.sections.map((section) => section.body.en),
    ].join("\n");
    expect(hay).toContain("/people/jensen-huang");
    expect(hay).toContain("/cities/santa-clara");
    expect(hay).toContain("/countries/us");
    expect(hay).not.toMatch(/\[\[[^\]]+\]\(/);
    expect(hay).not.toContain("[about](/about)");
    expect(hay).toContain("United States-headquartered");
  });

  test("Jensen Huang prose links NVIDIA", () => {
    const person = getPerson("jensen-huang");
    expect(person).toBeTruthy();
    const hay = [
      person!.definition.en,
      person!.lead.en,
      ...(person!.sections ?? []).map((section) => section.body.en),
    ].join("\n");
    expect(hay).toContain("/companies/nvidia");
    expect(hay).not.toMatch(/\[\[[^\]]+\]\(/);
    expect(hay).not.toContain("[about](/about)");
  });

  test("every company appears on its sector, region, country, and city hubs", () => {
    for (const company of allCompanies()) {
      for (const slug of company.sectors) {
        expect(
          companiesBySector(slug).some((item) => item.slug === company.slug),
          `${company.slug} missing from sector ${slug}`,
        ).toBe(true);
      }
      for (const slug of company.regions) {
        expect(
          companiesByRegion(slug).some((item) => item.slug === company.slug),
          `${company.slug} missing from region ${slug}`,
        ).toBe(true);
      }
      expect(
        companiesInCountry(countrySlug(company.headquarters.countryCode)).some(
          (item) => item.slug === company.slug,
        ),
        `${company.slug} missing from country hub`,
      ).toBe(true);
      expect(
        companiesInCity(citySlug(company.headquarters.city.en)).some((item) => item.slug === company.slug),
        `${company.slug} missing from city hub`,
      ).toBe(true);
    }
    expect(allCountryHubs().length).toBeGreaterThanOrEqual(8);
    expect(allCityHubs().length).toBeGreaterThanOrEqual(20);
    expect(allPeople().length).toBe(100);
  });

  test("sitemap lists hub indexes and place pages", async () => {
    const text = await (await sitemapGet({} as never)).text();
    expect(text).toContain("https://techco.wiki/sectors");
    expect(text).toContain("https://techco.wiki/regions");
    expect(text).toContain("https://techco.wiki/countries");
    expect(text).toContain("https://techco.wiki/cities");
    expect(text).toContain("https://techco.wiki/countries/us");
    expect(text).toContain("https://techco.wiki/cities/beijing");
    expect(text).toContain("https://techco.wiki/zh/countries/cn");
    expect(text).toContain("https://techco.wiki/zh/cities/santa-clara");
  });

  test("markdown twins keep in-body links and add hub see-also", () => {
    const nvidia = getCompany("nvidia")!;
    const md = companyMarkdown(nvidia, "en");
    expect(md).toContain("/people/jensen-huang");
    expect(md).toContain("/countries/us");
    expect(md).toContain("/cities/santa-clara");
    expect(md).toContain("## See also");
    expect(md).toContain("[Semiconductors](https://techco.wiki/sectors/semiconductors)");
    const personMd = personMarkdown(getPerson("jensen-huang")!, "zh");
    expect(personMd).toContain("/zh/companies/nvidia");
    expect(personMd).toContain("## 参见");
  });

  test("autolink converts catalog URLs and skips generic words", () => {
    const companies = allCompanies();
    const people = allPeople();
    const linked = linkCatalogCopy(
      "Person page: https://techco.wiki/people/jensen-huang.md founded NVIDIA. Do not grab nothing from an empty record.",
      "en",
      companies,
      people,
    );
    expect(linked).toContain("[Jensen Huang](/people/jensen-huang)");
    expect(linked).not.toContain("Person page:");
    expect(linked).not.toContain("[grab](");
    expect(linked).not.toContain("[nothing](");
    expect(
      linkCatalogCopy("Grab and Nothing are catalog companies.", "en", companies, people),
    ).toMatch(/\[Grab\]\(\/companies\/grab\)/);
    expect(faqs[0].answer.en).toContain("](/companies)");
  });

  test("autolink covers legal names, products, and tickers without grabbing verbs", () => {
    const companies = allCompanies();
    const people = allPeople();
    expect(linkCatalogCopy("NVIDIA Corporation makes GPUs.", "en", companies, people)).toContain(
      "[NVIDIA Corporation](/companies/nvidia)",
    );
    expect(linkCatalogCopy("TikTok is a ByteDance product.", "en", companies, people)).toContain(
      "[TikTok](/companies/bytedance)",
    );
    expect(linkCatalogCopy("The ADR trades as TSM.", "en", companies, people)).toContain(
      "[TSM](/companies/tsmc)",
    );
    expect(linkCatalogCopy("Please zoom in on the chart.", "en", companies, people)).not.toContain("[zoom](");
    expect(linkCatalogCopy("Zoom is in the catalog.", "en", companies, people)).toContain(
      "[Zoom](/companies/zoom)",
    );
    expect(linkCatalogCopy("Foundry process nodes are generic.", "en", companies, people)).not.toContain(
      "[Foundry process nodes](",
    );
    expect(
      linkCatalogCopy("Shares trade on the New York Stock Exchange as TSM.", "en", companies, people),
    ).not.toContain("[the](");
  });

  test("catalog markdown twins list every company and person", () => {
    const companiesMd = catalogIndexMarkdown("companies", "en");
    const peopleMd = catalogIndexMarkdown("people", "zh");
    expect(companiesMd).toContain("# Companies");
    expect(companiesMd).toContain("/companies/nvidia");
    expect(peopleMd).toContain("# 人物");
    expect(peopleMd).toContain("/zh/people/jensen-huang");
  });

  test("sitemap lists markdown twins, hreflang, and machine files", async () => {
    const text = await (await sitemapGet({} as never)).text();
    expect(text).toContain("https://techco.wiki/companies.md");
    expect(text).toContain("https://techco.wiki/zh/people.md");
    expect(text).toContain("https://techco.wiki/llms-full.txt");
    expect(text).toContain("https://techco.wiki/api/v1/graph.json");
    expect(text).toContain('hreflang="zh-Hans"');
    expect(text).toContain("xmlns:xhtml");
  });

  test("inclusion editorial title is Inclusion rules", () => {
    expect(getEditorial("inclusion")?.title.en).toBe("Inclusion rules");
    expect(editorialDocs.some((doc) => doc.slug === "inclusion")).toBe(true);
  });

  test("autolink does not rewrite Wikipedia URLs", () => {
    const linked = linkCatalogCopy(
      "See https://en.wikipedia.org/wiki/ByteDance for the encyclopedia article.",
      "en",
      allCompanies(),
      allPeople(),
    );
    expect(linked).toContain("https://en.wikipedia.org/wiki/ByteDance");
    expect(linked).not.toContain("wiki/[ByteDance]");
  });

  test("product brands and secondary listings become company links", () => {
    const companies = allCompanies();
    const people = allPeople();
    expect(linkCatalogCopy("HarmonyOS ships on Huawei phones.", "en", companies, people)).toContain(
      "[HarmonyOS](/companies/huawei)",
    );
    expect(linkCatalogCopy("Snack Video is an overseas brand.", "en", companies, people)).toContain(
      "[Snack Video](/companies/kuaishou)",
    );
    expect(linkCatalogCopy("The Hong Kong line is 9988.", "en", companies, people)).toContain(
      "[9988](/companies/alibaba)",
    );
    expect(linkCatalogCopy("Dianping merged into the group.", "en", companies, people)).toContain(
      "[Dianping](/companies/meituan)",
    );
  });
});
