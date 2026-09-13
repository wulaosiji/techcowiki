import type { Company } from "./types";

export function scorePeer(company: Company, other: Company): number {
  return (
    other.sectors.filter((sector) => company.sectors.includes(sector)).length * 2 +
    other.regions.filter((region) => company.regions.includes(region)).length +
    (other.headquarters.countryCode === company.headquarters.countryCode ? 1 : 0)
  );
}

export function pickPeers(company: Company, allCompanies: Company[], limit = 6): Company[] {
  return allCompanies
    .filter((other) => other.slug !== company.slug)
    .map((other) => ({ other, score: scorePeer(company, other) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.other.name.en.localeCompare(b.other.name.en))
    .slice(0, limit)
    .map((entry) => entry.other);
}
