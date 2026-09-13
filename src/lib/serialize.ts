import { CONTENT_LICENSE, CONTENT_LICENSE_URL, LAST_REVIEWED, SITE_NAME, SITE_ORIGIN } from "../data/site";
import type { Company, EntityClaim, EntityFaq, Person } from "../data/types";
import { localizedTriple, markdownUrl, pageUrl } from "./i18n";
import { toTraditional } from "./traditional";
import { stripCitations, usedSourceIds } from "./citations";

function sourceIds(value: { en: string; zh: string }) {
  const zh = [...new Set(usedSourceIds(value.zh))];
  return {
    en: [...new Set(usedSourceIds(value.en))],
    zh,
    zht: zh,
  };
}

function faqRecord(faq: EntityFaq[] | undefined) {
  return (faq ?? []).map((item) => ({
    id: item.id,
    question: localizedTriple(item.question),
    answer: {
      en: stripCitations(item.answer.en),
      zh: stripCitations(item.answer.zh),
      zht: stripCitations(toTraditional(item.answer.zh)),
    },
    sourceIds: sourceIds(item.answer),
  }));
}

function claimsRecord(claims: EntityClaim[] | undefined) {
  return (claims ?? []).map((item) => ({
    id: item.id,
    label: localizedTriple(item.label),
    value: {
      en: stripCitations(item.value.en),
      zh: stripCitations(item.value.zh),
      zht: stripCitations(toTraditional(item.value.zh)),
    },
    sourceIds: sourceIds(item.value),
  }));
}

export function companyRecord(company: Company) {
  return {
    id: company.id,
    slug: company.slug,
    name: localizedTriple(company.name),
    legalName: company.legalName ?? null,
    aliases: company.aliases,
    definition: {
      en: stripCitations(company.definition.en),
      zh: stripCitations(company.definition.zh),
      zht: stripCitations(toTraditional(company.definition.zh)),
    },
    lead: {
      en: stripCitations(company.lead.en),
      zh: stripCitations(company.lead.zh),
      zht: stripCitations(toTraditional(company.lead.zh)),
    },
    founded: company.founded,
    foundedPrecision: company.foundedPrecision,
    headquarters: company.headquarters,
    status: company.status,
    stage: company.stage,
    sectors: company.sectors,
    regions: company.regions,
    products: company.products,
    founders: company.founders,
    employees: company.employees ?? null,
    stock: company.stock ?? null,
    website: company.website,
    sameAs: company.sameAs,
    confidence: company.confidence,
    lastReviewed: company.lastReviewed,
    license: CONTENT_LICENSE,
    urls: {
      en: pageUrl("en", `/companies/${company.slug}`),
      zh: pageUrl("zh", `/companies/${company.slug}`),
      zht: pageUrl("zht", `/companies/${company.slug}`),
      markdown: `${SITE_ORIGIN}/companies/${company.slug}.md`,
      markdownZh: `${SITE_ORIGIN}/zh/companies/${company.slug}.md`,
      markdownZht: markdownUrl("zht", `/companies/${company.slug}`),
      json: `${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
    },
    sources: company.sources,
    citations: { definition: sourceIds(company.definition), lead: sourceIds(company.lead) },
    faq: faqRecord(company.faq),
    claims: claimsRecord(company.claims),
    sections: company.sections.map((section) => ({
      id: section.id,
      title: localizedTriple(section.title),
      body: {
        en: stripCitations(section.body.en),
        zh: stripCitations(section.body.zh),
        zht: stripCitations(toTraditional(section.body.zh)),
      },
      sourceIds: sourceIds(section.body),
    })),
  };
}

export function personRecord(person: Person) {
  return {
    id: person.id,
    slug: person.slug,
    name: localizedTriple(person.name),
    aliases: person.aliases,
    definition: {
      en: stripCitations(person.definition.en),
      zh: stripCitations(person.definition.zh),
      zht: stripCitations(toTraditional(person.definition.zh)),
    },
    lead: {
      en: stripCitations(person.lead.en),
      zh: stripCitations(person.lead.zh),
      zht: stripCitations(toTraditional(person.lead.zh)),
    },
    birthYear: person.birthYear ?? null,
    birthPlace: person.birthPlace ?? null,
    roles: person.roles,
    companies: person.companies,
    sameAs: person.sameAs,
    confidence: person.confidence,
    lastReviewed: person.lastReviewed,
    license: CONTENT_LICENSE,
    urls: {
      en: pageUrl("en", `/people/${person.slug}`),
      zh: pageUrl("zh", `/people/${person.slug}`),
      zht: pageUrl("zht", `/people/${person.slug}`),
      markdown: `${SITE_ORIGIN}/people/${person.slug}.md`,
      markdownZh: `${SITE_ORIGIN}/zh/people/${person.slug}.md`,
      markdownZht: markdownUrl("zht", `/people/${person.slug}`),
      json: `${SITE_ORIGIN}/api/v1/people/${person.slug}.json`,
    },
    sources: person.sources,
    citations: { definition: sourceIds(person.definition), lead: sourceIds(person.lead) },
    faq: faqRecord(person.faq),
    claims: claimsRecord(person.claims),
    sections: (person.sections ?? []).map((section) => ({
      id: section.id,
      title: localizedTriple(section.title),
      body: {
        en: stripCitations(section.body.en),
        zh: stripCitations(section.body.zh),
        zht: stripCitations(toTraditional(section.body.zh)),
      },
      sourceIds: sourceIds(section.body),
    })),
  };
}

export function datasetRecord(stats: {
  companies: number;
  people: number;
  sectors: number;
  regions: number;
  countries?: number;
  cities?: number;
  sources: number;
}) {
  return {
    id: "techco:dataset",
    name: `${SITE_NAME} catalog`,
    license: CONTENT_LICENSE,
    licenseUrl: CONTENT_LICENSE_URL,
    lastReviewed: LAST_REVIEWED,
    publisher: SITE_NAME,
    homepage: SITE_ORIGIN,
    counts: stats,
    endpoints: {
      llmsTxt: `${SITE_ORIGIN}/llms.txt`,
      llmsFull: `${SITE_ORIGIN}/llms-full.txt`,
      llmsFullZh: `${SITE_ORIGIN}/zh/llms-full.txt`,
      llmsFullZht: `${SITE_ORIGIN}/zh-hant/llms-full.txt`,
      openapi: `${SITE_ORIGIN}/api/v1/openapi.json`,
      companies: `${SITE_ORIGIN}/api/v1/companies.json`,
      people: `${SITE_ORIGIN}/api/v1/people.json`,
      graph: `${SITE_ORIGIN}/api/v1/graph.json`,
      feed: `${SITE_ORIGIN}/feed.xml`,
      companiesMarkdown: `${SITE_ORIGIN}/companies.md`,
      peopleMarkdown: `${SITE_ORIGIN}/people.md`,
      companiesMarkdownZh: `${SITE_ORIGIN}/zh/companies.md`,
      peopleMarkdownZh: `${SITE_ORIGIN}/zh/people.md`,
      companiesMarkdownZht: `${SITE_ORIGIN}/zh-hant/companies.md`,
      peopleMarkdownZht: `${SITE_ORIGIN}/zh-hant/people.md`,
      sectorsMarkdown: `${SITE_ORIGIN}/sectors.md`,
      regionsMarkdown: `${SITE_ORIGIN}/regions.md`,
      countriesMarkdown: `${SITE_ORIGIN}/countries.md`,
      citiesMarkdown: `${SITE_ORIGIN}/cities.md`,
    },
  };
}
