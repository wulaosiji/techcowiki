import { companies as seedCompanies } from "./companies";
import { enrichCompany, enrichPerson } from "./enrich";
import { extendedCompanies } from "./extended-companies";
import { normalizeCompany } from "./normalize";
import { people as seedPeople } from "./people";
import { extendedPeople } from "./extended-people";
import { pickPeers } from "./peers";
import {
  cityHubs,
  companiesByCity as filterCompaniesByCity,
  companiesByCountry as filterCompaniesByCountry,
  countryHubs,
  peopleForCompanies,
  type CityHub,
  type CountryHub,
} from "./places";
import { listingTickers } from "./copy";
import { regions, sectors } from "./site";
import type { Company, Person, Region, Sector } from "./types";

const rawCompanies: Company[] = [...seedCompanies, ...extendedCompanies].map(normalizeCompany);
const rawPeople: Person[] = [...seedPeople, ...extendedPeople];

export const companies: Company[] = rawCompanies.map((company) =>
  enrichCompany(company, rawPeople, rawCompanies),
);
export const people: Person[] = rawPeople.map((person) =>
  enrichPerson(person, companies, rawPeople),
);

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

export function companyHaystack(company: Company): string {
  return [
    company.slug,
    company.id,
    company.name.en,
    company.name.zh,
    company.legalName ?? "",
    ...company.aliases,
    company.definition.en,
    company.definition.zh,
    company.lead.en,
    company.lead.zh,
    company.headquarters.city.en,
    company.headquarters.city.zh,
    company.headquarters.country.en,
    company.headquarters.country.zh,
    company.headquarters.countryCode,
    company.stock ? `${company.stock.exchange} ${company.stock.ticker}` : "",
    company.stock?.adr ? `${company.stock.adr.exchange} ${company.stock.adr.ticker}` : "",
    ...(company.stock?.secondary ?? []).map((item) => `${item.exchange} ${item.ticker}`),
    ...listingTickers(company),
    ...company.products.map((product) => `${product.name} ${product.description.en} ${product.description.zh}`),
    ...company.founders.map((founder) => founder.personSlug),
    ...(company.faq ?? []).flatMap((item) => [
      item.question.en,
      item.question.zh,
      item.answer.en,
      item.answer.zh,
    ]),
    ...(company.claims ?? []).flatMap((item) => [item.label.en, item.label.zh, item.value.en, item.value.zh]),
  ].join(" ");
}

export function personCompanyRecords(person: Person): Company[] {
  return person.companies
    .map((item) => companies.find((company) => company.slug === item.companySlug))
    .filter((company): company is Company => Boolean(company));
}

export function personSectors(person: Person): string[] {
  return [...new Set(personCompanyRecords(person).flatMap((company) => company.sectors))];
}

export function personRegions(person: Person): string[] {
  return [...new Set(personCompanyRecords(person).flatMap((company) => company.regions))];
}

export function personHaystack(person: Person): string {
  const linked = personCompanyRecords(person);
  return [
    person.slug,
    person.id,
    person.name.en,
    person.name.zh,
    ...person.aliases,
    person.definition.en,
    person.definition.zh,
    person.lead.en,
    person.lead.zh,
    ...person.companies.map((item) => item.companySlug),
    ...linked.flatMap((company) => [
      company.name.en,
      company.name.zh,
      company.headquarters.city.en,
      company.headquarters.country.en,
      ...company.sectors,
      ...company.regions,
    ]),
    ...(person.faq ?? []).flatMap((item) => [
      item.question.en,
      item.question.zh,
      item.answer.en,
      item.answer.zh,
    ]),
  ].join(" ");
}

export function searchEntities(query: string): { companies: Company[]; people: Person[] } {
  const needle = query.trim().toLowerCase();
  if (!needle) return { companies, people };
  return {
    companies: companies.filter((company) => companyHaystack(company).toLowerCase().includes(needle)),
    people: people.filter((person) => personHaystack(person).toLowerCase().includes(needle)),
  };
}

export function headquartersBreakdown(list: Company[]): {
  countryCode: string;
  country: { en: string; zh: string };
  count: number;
}[] {
  const map = new Map<string, { country: { en: string; zh: string }; count: number }>();
  for (const company of list) {
    const prev = map.get(company.headquarters.countryCode);
    if (prev) prev.count += 1;
    else {
      map.set(company.headquarters.countryCode, {
        country: company.headquarters.country,
        count: 1,
      });
    }
  }
  return [...map.entries()]
    .map(([countryCode, value]) => ({ countryCode, ...value }))
    .sort((a, b) => b.count - a.count || a.countryCode.localeCompare(b.countryCode));
}

export function catalogStats() {
  return {
    companies: companies.length,
    people: people.length,
    sectors: sectors.length,
    regions: regions.length,
    countries: countryHubs(companies).length,
    cities: cityHubs(companies).length,
    sources: new Set(
      [...companies, ...people].flatMap((entity) => entity.sources.map((source) => source.url)),
    ).size,
  };
}

export function allCountryHubs(): CountryHub[] {
  return countryHubs(companies);
}

export function allCityHubs(): CityHub[] {
  return cityHubs(companies);
}

export function getCountryHub(slug: string): CountryHub | undefined {
  return allCountryHubs().find((hub) => hub.slug === slug);
}

export function getCityHub(slug: string): CityHub | undefined {
  return allCityHubs().find((hub) => hub.slug === slug);
}

export function companiesInCountry(code: string): Company[] {
  return filterCompaniesByCountry(companies, code);
}

export function companiesInCity(slug: string): Company[] {
  return filterCompaniesByCity(companies, slug);
}

export function seeAlsoCompanies(company: Company, limit = 6): Company[] {
  return pickPeers(company, companies, limit);
}

export function relatedPeople(person: Person, limit = 6): Person[] {
  const companySlugs = new Set(person.companies.map((item) => item.companySlug));
  const scored = people
    .filter((other) => other.slug !== person.slug)
    .map((other) => {
      const shared = other.companies.filter((item) => companySlugs.has(item.companySlug)).length;
      return { other, shared };
    })
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.other.name.en.localeCompare(b.other.name.en));
  return scored.slice(0, limit).map((entry) => entry.other);
}

export function peopleForCompanyList(list: Company[]): Person[] {
  return peopleForCompanies(people, list);
}

export type { CityHub, CountryHub };
