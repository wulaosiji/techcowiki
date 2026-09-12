import type { APIRoute } from "astro";
import { allCompanies, allPeople } from "../../../data/catalog";
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
  ];
  const edges = allCompanies().flatMap((company) =>
    company.founders.map((founder) => ({
      from: `techco:person:${founder.personSlug}`,
      to: company.id,
      type: "founded",
    })),
  );
  return jsonResponse({ nodes, edges });
};
