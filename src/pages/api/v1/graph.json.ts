import type { APIRoute } from "astro";
import {
  allCityHubs,
  allCompanies,
  allCountryHubs,
  allPeople,
  seeAlsoCompanies,
} from "../../../data/catalog";
import { citySlug, countrySlug } from "../../../data/places";
import { regions, sectors } from "../../../data/site";
import { jsonResponse } from "../../../lib/http";

export const GET: APIRoute = () => {
  const nodes = [
    ...allCompanies().map((company) => ({
      id: company.id,
      type: "company",
      slug: company.slug,
      name: company.name.en,
    })),
    ...allPeople().map((person) => ({
      id: person.id,
      type: "person",
      slug: person.slug,
      name: person.name.en,
    })),
    ...sectors.map((sector) => ({
      id: `techco:sector:${sector.slug}`,
      type: "sector",
      slug: sector.slug,
      name: sector.name.en,
    })),
    ...regions.map((region) => ({
      id: `techco:region:${region.slug}`,
      type: "region",
      slug: region.slug,
      name: region.name.en,
    })),
    ...allCountryHubs().map((hub) => ({
      id: `techco:country:${hub.slug}`,
      type: "country",
      slug: hub.slug,
      name: hub.name.en,
    })),
    ...allCityHubs().map((hub) => ({
      id: `techco:city:${hub.slug}`,
      type: "city",
      slug: hub.slug,
      name: hub.name.en,
    })),
  ];
  const founded = allCompanies().flatMap((company) =>
    company.founders.map((founder) => ({
      from: `techco:person:${founder.personSlug}`,
      to: company.id,
      type: "founded",
    })),
  );
  const worksAt = allPeople().flatMap((person) =>
    person.companies.map((item) => ({
      from: person.id,
      to: `techco:company:${item.companySlug}`,
      type: "works-at",
    })),
  );
  const memberships = allCompanies().flatMap((company) => [
    ...company.sectors.map((slug) => ({
      from: company.id,
      to: `techco:sector:${slug}`,
      type: "in-sector",
    })),
    ...company.regions.map((slug) => ({
      from: company.id,
      to: `techco:region:${slug}`,
      type: "in-region",
    })),
    {
      from: company.id,
      to: `techco:country:${countrySlug(company.headquarters.countryCode)}`,
      type: "in-country",
    },
    {
      from: company.id,
      to: `techco:city:${citySlug(company.headquarters.city.en)}`,
      type: "in-city",
    },
  ]);
  const peers = allCompanies().flatMap((company) =>
    seeAlsoCompanies(company, 6).map((other) => ({
      from: company.id,
      to: other.id,
      type: "peer",
    })),
  );
  return jsonResponse({ nodes, edges: [...founded, ...worksAt, ...memberships, ...peers] });
};
