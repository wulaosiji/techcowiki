import { describe, expect, test } from "vitest";
import { allCompanies, allPeople, getPerson } from "../src/data/catalog";
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
      expect(company.sources.length).toBeGreaterThan(0);
      expect(company.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const person of allPeople()) {
      expect(person.id.startsWith("techco:person:")).toBe(true);
      expect(person.definition.en.length).toBeGreaterThan(40);
      expect(person.definition.zh.length).toBeGreaterThan(16);
      expect(person.lead.en.length).toBeGreaterThan(80);
      expect(person.lead.zh.length).toBeGreaterThan(30);
      expect(person.sources.length).toBeGreaterThan(0);
      expect(person.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("citation tokens resolve to sources", () => {
    for (const entity of [...allCompanies(), ...allPeople()]) {
      const ids = new Set(entity.sources.map((source) => source.id));
      const used = [
        ...usedSourceIds(entity.definition.en),
        ...usedSourceIds(entity.lead.en),
        ...("sections" in entity
          ? entity.sections.flatMap((section) => usedSourceIds(section.body.en))
          : []),
      ];
      for (const id of used) {
        expect(ids.has(id), `${entity.slug} missing ${id}`).toBe(true);
      }
    }
  });

  test("every source has an https URL", () => {
    for (const entity of [...allCompanies(), ...allPeople()]) {
      for (const source of entity.sources) {
        expect(source.url.startsWith("https://"), source.url).toBe(true);
      }
    }
  });
});
