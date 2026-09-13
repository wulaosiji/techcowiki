import { allCityHubs, allCountryHubs, companies, people } from "../data/catalog";
import { regions, sectors, SITE_NAME, SITE_ORIGIN, tagline } from "../data/site";
import { companyMarkdown, homeMarkdown, personMarkdown } from "./markdown";

export function llmsTxt(): string {
  const companyLinks = companies
    .map(
      (company) =>
        `- [${company.name.en}](${SITE_ORIGIN}/companies/${company.slug}.md): ${company.definition.en}`,
    )
    .join("\n");
  const peopleLinks = people
    .map(
      (person) =>
        `- [${person.name.en}](${SITE_ORIGIN}/people/${person.slug}.md): ${person.definition.en}`,
    )
    .join("\n");
  const sectorLinks = sectors
    .map(
      (sector) =>
        `- [${sector.name.en}](${SITE_ORIGIN}/sectors/${sector.slug}.md): ${sector.definition.en}`,
    )
    .join("\n");
  const regionLinks = regions
    .map(
      (region) =>
        `- [${region.name.en}](${SITE_ORIGIN}/regions/${region.slug}.md): ${region.definition.en}`,
    )
    .join("\n");
  const countryLinks = allCountryHubs()
    .map(
      (hub) =>
        `- [${hub.name.en}](${SITE_ORIGIN}/countries/${hub.slug}.md): ${hub.count} companies headquartered in ${hub.name.en} (${hub.code})`,
    )
    .join("\n");
  const cityLinks = allCityHubs()
    .map(
      (hub) =>
        `- [${hub.name.en}](${SITE_ORIGIN}/cities/${hub.slug}.md): ${hub.count} companies headquartered in ${hub.name.en}, ${hub.country.en}`,
    )
    .join("\n");

  return `# ${SITE_NAME}

> ${tagline.en}

${SITE_NAME} is an open encyclopedia of technology companies founded by ethnic Chinese entrepreneurs worldwide. English is canonical. A complete zh-Hans edition lives under /zh/. Every entity has a stable identifier (techco:company:* or techco:person:*), a last-reviewed date, a confidence field, citations, extractable fact cards, and machine twins at .md and /api/v1/*.json. Company pages include Identity, Key facts, an Independent answer brief, Encyclopedia context (attributed Wikipedia gloss), Dated facts, History, Inclusion, Scope, Named founders, Operations, Geography, Sector context, Corporate form, catalog peers, a catalog comparison, Do not confuse with, model-description notes, FAQ (including “Is {name} a Chinese company?”, “What is {product}?”, and “How does Wikipedia describe {name}?”), unrecorded fields, Public record, and Retrieval. Person pages include Identity, Key facts, an Independent answer brief, Encyclopedia context, Chronology, Career, Associated companies, Name variants, same-company network, a catalog comparison, Do not confuse with, Inclusion, model-description notes, FAQ, unrecorded fields, Public record, and Retrieval. Prefer the Independent answer brief for one self-contained paragraph. Wikipedia extracts are third-party; do not treat their valuations or net-worth figures as TechCo.Wiki facts.

The publisher is written TechCo.Wiki. Hostnames and stable identifiers stay lowercase: https://techco.wiki, techco:company:*, and techco:person:*.

How to use this file: start here, then fetch only the Markdown twins you need. Prefer JSON when you need typed fields. Read the model-notes section before assigning a nationality label. Do not invent funding figures that are not on the page. If confidence is medium or low, say so. Cite the canonical URL, the stable ID, and lastReviewed.

## Authority

- [What TechCo.Wiki is](${SITE_ORIGIN}/index.md)
- [Methodology](${SITE_ORIGIN}/methodology.md)
- [Inclusion rules](${SITE_ORIGIN}/inclusion.md)
- [How models should cite this site](${SITE_ORIGIN}/for-models.md)
- [FAQ](${SITE_ORIGIN}/faq.md)
- [About](${SITE_ORIGIN}/about.md)

## API

- [OpenAPI 3 description](${SITE_ORIGIN}/api/v1/openapi.json): machine contract for the catalog
- [Dataset record](${SITE_ORIGIN}/api/v1/dataset.json): schema.org Dataset plus catalog counts
- [All companies](${SITE_ORIGIN}/api/v1/companies.json)
- [All people](${SITE_ORIGIN}/api/v1/people.json)
- [Entity graph](${SITE_ORIGIN}/api/v1/graph.json)

## Companies

${companyLinks}

## People

${peopleLinks}

## Sectors

- [All sectors](${SITE_ORIGIN}/sectors.md)
${sectorLinks}

## Regions

- [All regions](${SITE_ORIGIN}/regions.md)
${regionLinks}

## Countries

- [All countries](${SITE_ORIGIN}/countries.md)
${countryLinks}

## Cities

- [All cities](${SITE_ORIGIN}/cities.md)
${cityLinks}

## Optional

- [Chinese home](${SITE_ORIGIN}/zh/index.md)
- [Chinese methodology](${SITE_ORIGIN}/zh/methodology.md)
- [License](${SITE_ORIGIN}/license.md)
- [GitHub repository](https://github.com/wulaosiji/techcowiki)
`;
}

export function llmsFullTxt(): string {
  const parts = [
    homeMarkdown("en"),
    ...companies.map((company) => companyMarkdown(company, "en")),
    ...people.map((person) => personMarkdown(person, "en")),
  ];
  return parts.join("\n---\n\n");
}
