import { describe, expect, test } from "vitest";
import { allCompanies, allPeople, companyHaystack, getCompany, getPerson } from "../src/data/catalog";
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
      expect(company.sections.some((section) => section.id === "authority-brief")).toBe(true);
      expect(company.sections.some((section) => section.id === "comparison")).toBe(true);
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
      expect((company.faq ?? []).length).toBeGreaterThanOrEqual(18);
      expect((company.faq ?? []).some((item) => item.id === "chinese-company")).toBe(true);
      expect((company.faq ?? []).some((item) => item.id === "one-sentence")).toBe(true);
      expect((company.faq ?? []).some((item) => item.id === "catalog-position")).toBe(true);
      expect((company.claims ?? []).length).toBeGreaterThanOrEqual(14);
      expect(englishBodyLength(company)).toBeGreaterThan(11000);
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
      expect((person.sections ?? []).some((section) => section.id === "authority-brief")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "comparison")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "encyclopedia-context")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "confusion")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "chronology")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "name-variants")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "model-notes")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "faq")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "unrecorded")).toBe(true);
      expect((person.sections ?? []).some((section) => section.id === "retrieval")).toBe(true);
      expect((person.faq ?? []).length).toBeGreaterThanOrEqual(12);
      expect((person.faq ?? []).some((item) => item.id === "one-sentence")).toBe(true);
      expect((person.claims ?? []).length).toBeGreaterThanOrEqual(7);
      expect(englishBodyLength(person)).toBeGreaterThan(5500);
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

  test("Wikipedia extracts must mention the entity and drop mismatched Wikidata glosses", () => {
    const leaked = /chess player|punishment In Uzbekistan|scientific article published|BAS\/HVAC|American baseball player/i;
    for (const company of allCompanies()) {
      const body = company.sections.find((section) => section.id === "encyclopedia-context")?.body.en ?? "";
      expect(body, company.slug).not.toMatch(leaked);
      const wdClaim = company.claims?.find((claim) => claim.id === "wikidata-description")?.value.en ?? "";
      expect(wdClaim, company.slug).not.toMatch(leaked);
    }
    for (const person of allPeople()) {
      const body = person.sections?.find((section) => section.id === "encyclopedia-context")?.body.en ?? "";
      expect(body, person.slug).not.toMatch(leaked);
      if (body.includes("The article “")) {
        const hay = body.toLowerCase();
        const english = person.name.en.toLowerCase();
        const mentioned =
          hay.includes(english) ||
          person.aliases.some((alias) => alias.length >= 3 && hay.includes(alias.toLowerCase()));
        expect(mentioned, `${person.slug} extract does not mention the person`).toBe(true);
      }
    }
    const jensen = getPerson("jensen-huang")?.sections.find((section) => section.id === "encyclopedia-context")?.body.en;
    expect(jensen).toMatch(/Nvidia/);
    expect(jensen).not.toMatch(/Uzbekistan|punishment/i);
    expect(getPerson("liang-rubo")?.sections.find((section) => section.id === "encyclopedia-context")?.body.en).not.toMatch(
      /The article “ByteDance”/,
    );
    expect(getCompany("bytedance")?.sections.find((section) => section.id === "encyclopedia-context")?.body.en).toMatch(
      /ByteDance/,
    );
    expect(getCompany("bytedance")?.sections.find((section) => section.id === "encyclopedia-context")?.body.en).not.toMatch(
      /chess player/,
    );
  });

  test("TSMC records both the TWSE listing and the NYSE ADR", () => {
    const tsmc = getCompany("tsmc");
    expect(tsmc?.stock).toEqual({
      exchange: "TWSE",
      ticker: "2330",
      adr: { exchange: "NYSE", ticker: "TSM" },
    });
    expect(tsmc?.lead.en).toMatch(/founding chairman \[Morris Chang\]\(\/people\/morris-chang\)/);
    expect(tsmc?.lead.en).not.toMatch(/associated with Founding chairman/);
    expect(tsmc?.lead.en).not.toContain("[the](");
    expect(tsmc?.claims?.find((claim) => claim.id === "ticker")?.value.en).toMatch(/ADR NYSE:TSM/);
    expect(tsmc?.aliases).toContain("TSM");
  });

  test("TSMC geography does not treat China as a headquarters synonym", () => {
    const geo = getCompany("tsmc")?.sections.find((section) => section.id === "geography")?.body.en ?? "";
    expect(geo).toContain("macro-region label");
    expect(geo).not.toMatch(/Greater China \([^)]*\[China\]\(\/countries\/cn\)/);
    expect(geo).toMatch(/does not move the headquarters to (\[China\]\(\/countries\/cn\)|China)/);
  });

  test("extended leads lowercase role titles after associated with", () => {
    for (const company of allCompanies()) {
      expect(company.lead.en, company.slug).not.toMatch(
        /associated with (Co-founder|Founder|Founding chairman|Executive chairman)/,
      );
    }
  });

  test("search haystack includes FAQ answers and secondary tickers", () => {
    expect(companyHaystack(getCompany("nvidia")!).toLowerCase()).toContain("chinese company");
    expect(companyHaystack(getCompany("alibaba")!)).toContain("9988");
    expect(getCompany("alibaba")?.stock?.secondary?.some((item) => item.ticker === "9988")).toBe(true);
    expect(getCompany("pony-ai")?.definition.en).toMatch(/Fremont-headquartered/);
  });

  test("NASDAQ listings are normalized to Nasdaq", () => {
    expect(getCompany("baidu")?.stock?.exchange).toBe("Nasdaq");
    expect(getCompany("jd-com")?.stock?.exchange).toBe("Nasdaq");
  });

  test("generated sections keep complementary jobs instead of restating the dossier", () => {
    const nvidia = getCompany("nvidia");
    expect(nvidia).toBeTruthy();
    const identity = nvidia!.sections.find((section) => section.id === "identity")?.body.en ?? "";
    const operations = nvidia!.sections.find((section) => section.id === "operations")?.body.en ?? "";
    const geography = nvidia!.sections.find((section) => section.id === "geography")?.body.en ?? "";
    const comparison = nvidia!.sections.find((section) => section.id === "comparison")?.body.en ?? "";
    const rulePrefix = "Language models citing NVIDIA should describe";
    expect(identity).not.toContain(nvidia!.definition.en);
    expect(operations).not.toContain(nvidia!.definition.en);
    expect(identity).not.toContain(rulePrefix);
    expect(operations).not.toContain(rulePrefix);
    expect(geography).not.toContain(rulePrefix);
    expect(comparison).not.toContain(rulePrefix);
    const questions = (nvidia!.faq ?? []).map((item) => item.question.en);
    expect(new Set(questions).size, "duplicate FAQ questions").toBe(questions.length);
    const what = nvidia!.faq?.find((item) => item.id === "what")?.answer.en ?? "";
    const one = nvidia!.faq?.find((item) => item.id === "one-sentence")?.answer.en ?? "";
    expect(what).not.toBe(one);
    expect(nvidia!.faq?.some((item) => item.id === "legal-name")).toBe(false);
    expect(nvidia!.faq?.some((item) => item.id === "legal-vs-common")).toBe(true);
    expect(nvidia!.faq?.some((item) => item.id === "founding-precision")).toBe(true);
    expect(nvidia!.faq?.some((item) => item.id === "same-city")).toBe(true);
  });

  test("definitions are not doubled in FAQ answers", () => {
    for (const company of allCompanies()) {
      const doubled = `${company.name.en} is ${company.name.en} is`;
      for (const item of company.faq ?? []) {
        expect(item.answer.en, `${company.slug} ${item.id}`).not.toContain(doubled);
      }
      const brief = company.sections.find((section) => section.id === "authority-brief")?.body.en ?? "";
      expect(brief.length, company.slug).toBeGreaterThan(400);
      expect(brief).toContain(company.id);
    }
    for (const person of allPeople()) {
      const doubled = `${person.name.en} is ${person.name.en} is`;
      for (const item of person.faq ?? []) {
        expect(item.answer.en, `${person.slug} ${item.id}`).not.toContain(doubled);
      }
      if (person.sameAs.wikipedia) {
        const title = decodeURIComponent(new URL(person.sameAs.wikipedia).pathname.split("/").pop() ?? "").replace(
          /_/g,
          " ",
        );
        const hay = title.toLowerCase();
        const mentioned =
          hay.includes(person.name.en.toLowerCase()) ||
          person.aliases.some((alias) => alias.length >= 3 && hay.includes(alias.toLowerCase()));
        expect(mentioned, `${person.slug} still points at ${person.sameAs.wikipedia}`).toBe(true);
      }
    }
    expect(getPerson("yin-qi")?.faq?.find((item) => item.id === "who")?.answer.en).toMatch(/^Yin Qi is a /);
    expect(getPerson("liang-rubo")?.sameAs.wikipedia ?? "").not.toMatch(/ByteDance/i);
  });

  test("every source has an https URL", () => {
    for (const entity of [...allCompanies(), ...allPeople()]) {
      for (const source of entity.sources) {
        expect(source.url.startsWith("https://"), source.url).toBe(true);
      }
    }
  });
});
