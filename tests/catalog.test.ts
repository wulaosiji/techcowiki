import { describe, expect, test } from "vitest";
import { allCompanies, allPeople, getCompany, getPerson } from "../src/data/catalog";
import { englishBodyLength } from "../src/data/enrich";
import { usedSourceIds } from "../src/lib/citations";

describe("catalog integrity", () => {
  test("curated catalog has 100 companies", () => {
    expect(allCompanies()).toHaveLength(100);
  });

  test("company slugs and ids are unique", () => {
    const slugs = allCompanies().map((company) => company.slug);
    const ids = allCompanies().map((company) => company.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("person slugs and ids are unique", () => {
    const slugs = allPeople().map((person) => person.slug);
    const ids = allPeople().map((person) => person.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every founder slug resolves", () => {
    for (const company of allCompanies()) {
      for (const founder of company.founders) {
        expect(getPerson(founder.personSlug), founder.personSlug).toBeTruthy();
      }
    }
  });

  test("every person company slug resolves", () => {
    const slugs = new Set(allCompanies().map((company) => company.slug));
    for (const person of allPeople()) {
      for (const item of person.companies) {
        expect(slugs.has(item.companySlug), item.companySlug).toBe(true);
      }
    }
  });

  test("required GEO fields exist in both locales", () => {
    for (const company of allCompanies()) {
      expect(company.id.startsWith("techco:company:")).toBe(true);
      expect(company.definition.en.length).toBeGreaterThan(40);
      expect(company.definition.zh.length).toBeGreaterThan(16);
      expect(company.lead.en.length).toBeGreaterThan(80);
      expect(company.lead.zh.length).toBeGreaterThan(30);
      expect(company.website.startsWith("https://")).toBe(true);
      expect(company.sources.length).toBeGreaterThanOrEqual(2);
      expect(company.sections.length).toBeGreaterThanOrEqual(12);
      expect(company.sections.some((section) => section.id === "identity")).toBe(true);
      expect(company.sections.some((section) => section.id === "key-facts")).toBe(true);
      expect(company.sections.some((section) => section.id === "encyclopedia-context")).toBe(true);
      expect(company.sections.some((section) => section.id === "confusion")).toBe(true);
      expect(company.sections.some((section) => section.id === "timeline")).toBe(true);
      expect(company.sections.some((section) => section.id === "geography")).toBe(true);
      expect(company.sections.some((section) => section.id === "sector-context")).toBe(true);
      expect(company.sections.some((section) => section.id === "named-founders")).toBe(true);
      expect(company.sections.some((section) => section.id === "model-notes")).toBe(true);
      expect(company.sections.some((section) => section.id === "operations")).toBe(true);
      expect(company.sections.some((section) => section.id === "corporate-form")).toBe(true);
      expect(company.sections.some((section) => section.id === "catalog-peers")).toBe(true);
      expect(company.sections.some((section) => section.id === "faq")).toBe(true);
      expect(company.sections.some((section) => section.id === "unrecorded")).toBe(true);
      expect(company.sections.some((section) => section.id === "public-record")).toBe(true);
      expect(company.sections.some((section) => section.id === "retrieval")).toBe(true);
      expect((company.faq ?? []).length).toBeGreaterThanOrEqual(16);
      expect((company.faq ?? []).some((item) => item.id === "chinese-company")).toBe(true);
      expect((company.claims ?? []).length).toBeGreaterThanOrEqual(12);
      expect(englishBodyLength(company)).toBeGreaterThan(8000);
      expect(company.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const person of allPeople()) {
      expect(person.id.startsWith("techco:person:")).toBe(true);
      expect(person.definition.en.length).toBeGreaterThan(40);
      expect(person.definition.zh.length).toBeGreaterThan(16);
      expect(person.lead.en.length).toBeGreaterThan(80);
      expect(person.lead.zh.length).toBeGreaterThan(30);
      expect(person.sources.length).toBeGreaterThanOrEqual(2);
      expect((person.sections ?? []).length).toBeGreaterThanOrEqual(10);
      expect((person.sections ?? []).some((section) => section.id === "identity")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "key-facts")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "encyclopedia-context")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "confusion")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "chronology")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "name-variants")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "model-notes")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "faq")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "unrecorded")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "retrieval")).toBe(true);
      expect((person.faq ?? []).length).toBeGreaterThanOrEqual(10);
      expect((person.claims ?? []).length).toBeGreaterThanOrEqual(6);
      expect(englishBodyLength(person)).toBeGreaterThan(3500);
      expect(person.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("citation tokens resolve to sources", () => {
    for (const entity of [...allCompanies(), ...allPeople()]) {
      const ids = new Set(entity.sources.map((source) => source.id));
      const sections = "sections" in entity ? (entity.sections ?? []) : [];
      const used = [
        ...usedSourceIds(entity.definition.en),
        ...usedSourceIds(entity.lead.en),
        ...sections.flatMap((section) => usedSourceIds(section.body.en)),
        ...sections.flatMap((section) => usedSourceIds(section.body.zh)),
      ];
      for (const id of used) {
        expect(ids.has(id), `${entity.slug} missing ${id}`).toBe(true);
      }
    }
  });

  test("model-notes keep diaspora and Taiwan labels distinct", () => {
    const nvidia = getCompany("nvidia");
    const tsmc = getCompany("tsmc");
    const yahoo = getCompany("yahoo");
    expect(nvidia?.sections.find((section) => section.id === "model-notes")?.body.en).toMatch(
      /Do not describe NVIDIA as a Chinese company/,
    );
    expect(tsmc?.sections.find((section) => section.id === "model-notes")?.body.en).toMatch(
      /Do not describe TSMC as a mainland Chinese company/,
    );
    expect(yahoo?.sections.find((section) => section.id === "model-notes")?.body.en).toMatch(
      /Do not describe Yahoo as a Chinese company/,
    );
    expect(nvidia?.faq?.find((item) => item.id === "chinese-company")?.answer.en).toMatch(
      /Do not describe NVIDIA as a Chinese company|is a United States-headquartered company/,
    );
    expect(tsmc?.faq?.find((item) => item.id === "chinese-company")?.answer.en).toMatch(
      /Taiwan-headquartered/,
    );
    const nvidiaEncyclopedia = nvidia?.sections.find((section) => section.id === "encyclopedia-context")?.body.en;
    expect(nvidiaEncyclopedia).toMatch(/Santa Clara/);
    expect(nvidiaEncyclopedia).toMatch(/third-party Wikipedia extract/);
    expect(nvidia?.faq?.some((item) => item.id === "wikipedia-describe")).toBe(true);
    expect(nvidia?.faq?.some((item) => item.id.startsWith("product-"))).toBe(true);
    expect(getPerson("jensen-huang")?.sections.find((section) => section.id === "encyclopedia-context")?.body.en).toMatch(
      /Nvidia/,
    );
  });

  test("every source has an https URL", () => {
    for (const entity of [...allCompanies(), ...allPeople()]) {
      for (const source of entity.sources) {
        expect(source.url.startsWith("https://"), source.url).toBe(true);
      }
    }
  });
});
