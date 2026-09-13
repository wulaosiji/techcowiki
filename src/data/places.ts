import { regions } from "./site";
import type { Company, Localized, Person, Region } from "./types";

export interface CountryHub {
  code: string;
  slug: string;
  name: Localized;
  count: number;
  region?: Region;
}

export interface CityHub {
  slug: string;
  name: Localized;
  countryCode: string;
  country: Localized;
  count: number;
}

export function countrySlug(code: string): string {
  return code.toLowerCase();
}

export function citySlug(cityEn: string): string {
  return (
    cityEn
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "city"
  );
}

export function regionForCountry(code: string): Region | undefined {
  return regions.find((region) => region.countryCodes.includes(code));
}

export function countryHubs(companies: Company[]): CountryHub[] {
  const map = new Map<string, CountryHub>();
  for (const company of companies) {
    const code = company.headquarters.countryCode;
    const prev = map.get(code);
    if (prev) prev.count += 1;
    else {
      map.set(code, {
        code,
        slug: countrySlug(code),
        name: company.headquarters.country,
        count: 1,
        region: regionForCountry(code),
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
}

export function cityHubs(companies: Company[]): CityHub[] {
  const map = new Map<string, CityHub>();
  for (const company of companies) {
    const slug = citySlug(company.headquarters.city.en);
    const prev = map.get(slug);
    if (prev) prev.count += 1;
    else {
      map.set(slug, {
        slug,
        name: company.headquarters.city,
        countryCode: company.headquarters.countryCode,
        country: company.headquarters.country,
        count: 1,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

export function companiesByCountry(companies: Company[], code: string): Company[] {
  return companies.filter((company) => company.headquarters.countryCode.toLowerCase() === code.toLowerCase());
}

export function companiesByCity(companies: Company[], slug: string): Company[] {
  return companies.filter((company) => citySlug(company.headquarters.city.en) === slug);
}

export function peopleForCompanies(people: Person[], companies: Company[]): Person[] {
  const slugs = new Set(companies.map((company) => company.slug));
  return people.filter((person) => person.companies.some((item) => slugs.has(item.companySlug)));
}
