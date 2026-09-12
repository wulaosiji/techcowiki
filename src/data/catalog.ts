import { companies as seedCompanies } from "./companies";
import { enrichCompany, enrichPerson } from "./enrich";
import { extendedCompanies } from "./extended-companies";
import { people as seedPeople } from "./people";
import { extendedPeople } from "./extended-people";
import { regions, sectors } from "./site";
import type { Company, Person, Region, Sector } from "./types";

const rawCompanies: Company[] = [...seedCompanies, ...extendedCompanies];
const rawPeople: Person[] = [...seedPeople, ...extendedPeople];

export const companies: Company[] = rawCompanies.map((company) =>
  enrichCompany(company, rawPeople),
);
export const people: Person[] = rawPeople.map((person) => enrichPerson(person, companies));

export function allCompanies(): Company[] {
  return companies;
}

export function allPeople(): Person[] {
  return people;
}

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

export function getPerson(slug: string): Person | undefined {
  return people.find((person) => person.slug === slug);
}

export function getSector(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}

export function getRegion(slug: string): Region | undefined {
  return regions.find((region) => region.slug === slug);
}

export function companiesBySector(slug: string): Company[] {
  return companies.filter((company) => company.sectors.includes(slug));
}

export function companiesByRegion(slug: string): Company[] {
  return companies.filter((company) => company.regions.includes(slug));
}

export function relatedCompanies(company: Company, limit = 4): Company[] {
  return companies
    .filter((other) => other.slug !== company.slug)
    .map((other) => ({
      other,
      score:
        other.sectors.filter((sector) => company.sectors.includes(sector)).length * 2 +
        other.regions.filter((region) => company.regions.includes(region)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.other.name.en.localeCompare(b.other.name.en))
    .slice(0, limit)
    .map((entry) => entry.other);
}

export function searchEntities(query: string): { companies: Company[]; people: Person[] } {
  const needle = query.trim().toLowerCase();
  if (!needle) return { companies, people };
  const match = (values: string[]) => values.some((value) => value.toLowerCase().includes(needle));
  return {
    companies: companies.filter((company) =>
      match([
        company.slug,
        company.id,
        company.name.en,
        company.name.zh,
        company.legalName ?? "",
        ...company.aliases,
        company.definition.en,
        company.definition.zh,
      ]),
    ),
    people: people.filter((person) =>
      match([
        person.slug,
        person.id,
        person.name.en,
        person.name.zh,
        ...person.aliases,
        person.definition.en,
        person.definition.zh,
      ]),
    ),
  };
}

export function catalogStats() {
  return {
    companies: companies.length,
    people: people.length,
    sectors: sectors.length,
    regions: regions.length,
    sources: new Set(
      [...companies, ...people].flatMap((entity) => entity.sources.map((source) => source.url)),
    ).size,
  };
}
