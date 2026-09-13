import { describe, expect, test } from "vitest";
import { compactSearchText, matchesSearch } from "../src/lib/search";

const entity = {
  text: compactSearchText("NVIDIA [Jensen Huang](/people/jensen-huang) NVIDIA 台积电 TSM 美国 Santa Clara"),
  sectors: ["semiconductors"],
  regions: ["north-america"],
};
const filters = { query: "", sector: "", region: "" };

describe("search", () => {
  test.each([" TSM ", "ＴＳＭ", "Huang NVIDIA", "美国 NVIDIA", "   ", "Santa  Clara"])(
    "normalizes and finds all query terms: %s", (query) => {
      expect(matchesSearch(entity, { ...filters, query })).toBe(true);
    },
  );
  test("removes duplicate prose and Markdown destinations from the index", () => {
    expect(entity.text).toBe("nvidia jensen huang 台积电 tsm 美国 santa clara");
  });
  test("matches whole filter values, not slug substrings", () => {
    expect(matchesSearch(entity, { ...filters, sector: "semi" })).toBe(false);
    expect(matchesSearch(entity, { ...filters, region: "america" })).toBe(false);
    expect(matchesSearch(entity, { query: "NVIDIA", sector: "semiconductors", region: "north-america" })).toBe(true);
    expect(matchesSearch(entity, { ...filters, query: "NVIDIA missing" })).toBe(false);
  });
});
