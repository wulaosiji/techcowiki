import { describe, expect, test } from "vitest";
import { clipPlain, renderCitedBlocks, stripCitations } from "../src/lib/citations";
import { headingId } from "../src/lib/i18n";

const sources = [
  {
    id: "s1",
    title: "About NVIDIA",
    publisher: "NVIDIA",
    url: "https://www.nvidia.com/en-us/about-nvidia/",
    accessed: "2026-09-12",
    type: "official" as const,
  },
  {
    id: "s2",
    title: "TSMC",
    publisher: "TSMC",
    url: "https://www.tsmc.com/",
    accessed: "2026-09-12",
    type: "official" as const,
  },
];

describe("citation rendering", () => {
  test("renderCitedBlocks turns markdown lists into HTML lists", () => {
    const html = renderCitedBlocks(
      "Neighbors in this catalog:\n- NVIDIA is a United States-headquartered company [s1]\n- TSMC is Taiwan-headquartered [s2]",
      sources,
    );
    expect(html).toContain('<ul class="prose-list">');
    expect(html).toContain("<li>");
    expect(html).toContain('href="#source-s1"');
    expect(html).not.toContain("- NVIDIA");
  });

  test("renderCitedBlocks keeps ordinary paragraphs", () => {
    const html = renderCitedBlocks("NVIDIA is a computing company.[s1]", sources);
    expect(html).toBe('<p>NVIDIA is a computing company.<sup class="cite"><a href="#source-s1" data-source="s1">1</a></sup></p>');
  });

  test("clipPlain breaks on a word or Chinese punctuation", () => {
    expect(clipPlain("Short fact [s1]", 80)).toBe("Short fact");
    expect(clipPlain("Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel", 28)).toBe("Alpha Bravo Charlie Delta…");
    expect(clipPlain("这是一句很长的中文定义，用来测试截断是否落在标点上。", 18)).toMatch(/…$/);
    expect(stripCitations("ByteDance [s1]  [s2]")).toBe("ByteDance");
  });

  test("headingId is stable across locales", () => {
    expect(headingId("Page anatomy")).toBe("page-anatomy");
    expect(headingId("How models should cite this site")).toBe("how-models-should-cite-this-site");
  });
});
