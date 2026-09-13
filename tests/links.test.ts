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
import { citySlug, countrySlug } from "../src/data/places";
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
    const personMd = personMarkdown(getPerson("jensen-huang")!, "zh");
    expect(personMd).toContain("/zh/companies/nvidia");
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
});
