import { describe, expect, test } from "vitest";
import { allCompanies, allPeople } from "../src/data/catalog";
import { llmsFullTxt, llmsTxt } from "../src/lib/llms";
import { companyMarkdown, homeMarkdown, personMarkdown } from "../src/lib/markdown";
import { companyGraph, personGraph, websiteGraph } from "../src/lib/schema";
import { companyRecord, datasetRecord } from "../src/lib/serialize";
import { catalogStats } from "../src/data/catalog";

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
    expect(homeMarkdown("en")).toContain("Machine entry points");
    expect(personMarkdown(allPeople()[0], "zh")).toContain("techco:person:");
  });

  test("JSON-LD graphs are serializable", () => {
    JSON.stringify(websiteGraph("en"));
    JSON.stringify(companyGraph(allCompanies()[0], "zh"));
    JSON.stringify(personGraph(allPeople()[0], "en"));
  });

  test("JSON records expose both locales and machine URLs", () => {
    const record = companyRecord(allCompanies().find((company) => company.slug === "bytedance")!);
    expect(record.urls.json).toContain("/api/v1/companies/bytedance.json");
    expect(record.definition.zh).toContain("字节跳动");
    expect(record.license).toBe("CC BY-SA 4.0");
    expect(datasetRecord(catalogStats()).endpoints.llmsTxt).toBe("https://techco.wiki/llms.txt");
  });
});
