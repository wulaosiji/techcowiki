import { describe, expect, test } from "vitest";
import { allCompanies, allPeople } from "../src/data/catalog";
import { llmsFullTxt, llmsTxt } from "../src/lib/llms";
import { companyMarkdown, homeMarkdown, personMarkdown } from "../src/lib/markdown";
import { companyGraph, personGraph, websiteGraph } from "../src/lib/schema";
import { companyRecord, datasetRecord, personRecord } from "../src/lib/serialize";
import { catalogStats } from "../src/data/catalog";
import { matchWikiRecord } from "../src/data/wiki-match";

describe("GEO surfaces", () => {
  test("llms.txt lists every company and person markdown twin", () => {
    const text = llmsTxt();
    expect(text.startsWith("# TechCo.wiki")).toBe(true);
    expect(text).toContain("https://techco.wiki/for-models.md");
    for (const company of allCompanies()) {
      expect(text).toContain(`/companies/${company.slug}.md`);
    }
    for (const person of allPeople()) {
      expect(text).toContain(`/people/${person.slug}.md`);
    }
  });

  test("llms-full.txt concatenates English records", () => {
    const text = llmsFullTxt();
    expect(text).toContain("ByteDance");
    expect(text).toContain("techco:company:deepseek");
    expect(text.length).toBeGreaterThan(8000);
  });

  test("markdown twins are answer-first", () => {
    const company = allCompanies()[0];
    const md = companyMarkdown(company, "en");
    expect(md.startsWith(`# ${company.name.en}`)).toBe(true);
    expect(md).toContain("Stable ID");
    expect(md).toContain("How to cite");
    expect(md).toContain("How models should describe this company");
    expect(md).toContain("Operations and products");
    expect(md).toContain("Frequently asked questions");
    expect(md).toContain("Identity and disambiguation");
    expect(md).toContain("What this page does not claim");
    expect(md).toContain("Extractable facts");
    expect(md).toContain("Encyclopedia context");
    expect(md).toContain("Do not confuse with");
    expect(md).toContain("Dated facts on this page");
    expect(md).toContain("Geography and jurisdiction");
    expect(homeMarkdown("en")).toContain("Machine entry points");
    const personMd = personMarkdown(allPeople()[0], "zh");
    expect(personMd).toContain("techco:person:");
    expect(personMd).toContain("模型应如何描述该人");
    expect(personMd).toContain("常见问题");
  });

  test("JSON-LD graphs are serializable", () => {
    JSON.stringify(websiteGraph("en"));
    const companyLd = companyGraph(allCompanies()[0], "zh");
    const personLd = personGraph(allPeople()[0], "en");
    JSON.stringify(companyLd);
    JSON.stringify(personLd);
    const founder = (companyLd["@graph"] as { founder?: { name: string }[] }[])[1];
    expect(founder.founder?.[0]?.name).not.toMatch(/^[a-z0-9-]+$/);
    const personNode = (personLd["@graph"] as { worksFor?: unknown[] }[])[1];
    expect(personNode.worksFor?.length).toBeGreaterThan(0);
    const companyFaq = (companyLd["@graph"] as { "@type"?: string; mainEntity?: unknown[] }[]).find(
      (node) => node["@type"] === "FAQPage",
    );
    expect(companyFaq?.mainEntity?.length).toBeGreaterThanOrEqual(8);
  });

  test("JSON records expose both locales and machine URLs", () => {
    const record = companyRecord(allCompanies().find((company) => company.slug === "bytedance")!);
    expect(record.urls.json).toContain("/api/v1/companies/bytedance.json");
    expect(record.definition.zh).toContain("字节跳动");
    expect(record.license).toBe("CC BY-SA 4.0");
    expect(record.sections.length).toBeGreaterThanOrEqual(12);
    expect(record.faq.length).toBeGreaterThanOrEqual(16);
    expect(record.claims.length).toBeGreaterThanOrEqual(12);
    const person = personRecord(allPeople().find((item) => item.slug === "zhang-yiming")!);
    expect(person.sections.length).toBeGreaterThanOrEqual(10);
    expect(person.faq.length).toBeGreaterThanOrEqual(10);
    expect(person.claims.length).toBeGreaterThanOrEqual(6);
    expect(person.sections.some((section) => section.id === "model-notes")).toBe(true);
    expect(datasetRecord(catalogStats()).endpoints.llmsTxt).toBe("https://techco.wiki/llms.txt");
  });

  test("wiki matching keeps attributed extracts and drops crossed Wikidata labels", () => {
    const jensen = {
      kind: "person" as const,
      slug: "jensen-huang",
      name: { en: "Jensen Huang", zh: "黄仁勋" },
      aliases: ["Jen-Hsun Huang", "黄仁勋"],
    };
    const kept = matchWikiRecord(jensen, {
      en: {
        title: "Jensen Huang",
        description: "Taiwanese and American businessman (born 1963)",
        extract: "Jen-Hsun Jensen Huang is the founder, president, and CEO of Nvidia.",
        url: "https://en.wikipedia.org/wiki/Jensen_Huang",
      },
      wikidataDescription: { en: "punishment In Uzbekistan" },
    });
    expect(kept?.en?.title).toBe("Jensen Huang");
    expect(kept?.wikidataDescription).toBeUndefined();

    const borrowed = matchWikiRecord(
      {
        kind: "person",
        slug: "liang-rubo",
        name: { en: "Liang Rubo", zh: "梁汝波" },
        aliases: ["梁汝波"],
      },
      {
        en: {
          title: "ByteDance",
          extract: "ByteDance is a Chinese internet technology company based in Haidian, Beijing.",
          url: "https://en.wikipedia.org/wiki/ByteDance",
        },
      },
    );
    expect(borrowed).toBeUndefined();
  });
});
