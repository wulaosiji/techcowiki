import { stripCitations } from "./citations";

export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
}

/** Search terms can span fields; repeated prose adds no searchable information. */
export function compactSearchText(value: string): string {
  return [...new Set(normalizeSearchText(stripCitations(value)).split(" "))].join(" ");
}

export function matchesSearch(
  entity: { text: string; sectors: string[]; regions: string[] },
  filters: { query: string; sector: string; region: string },
): boolean {
  const terms = normalizeSearchText(filters.query).split(" ").filter(Boolean);
  const text = normalizeSearchText(entity.text);
  return terms.every((term) => text.includes(term)) &&
    (!filters.sector || entity.sectors.includes(filters.sector)) &&
    (!filters.region || entity.regions.includes(filters.region));
}
