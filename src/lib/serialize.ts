import { CONTENT_LICENSE, CONTENT_LICENSE_URL, LAST_REVIEWED, SITE_NAME, SITE_ORIGIN } from "../data/site";
import type { Company, EntityClaim, EntityFaq, Person } from "../data/types";
import { pageUrl } from "./i18n";
import { stripCitations } from "./citations";

function faqRecord(faq: EntityFaq[] | undefined) {
  return (faq ?? []).map((item) => ({
    id: item.id,
    question: item.question,
    answer: {
      en: stripCitations(item.answer.en),
      zh: stripCitations(item.answer.zh),
    },
  }));
}

function claimsRecord(claims: EntityClaim[] | undefined) {
  return (claims ?? []).map((item) => ({
    id: item.id,
    label: item.label,
    value: {
      en: stripCitations(item.value.en),
      zh: stripCitations(item.value.zh),
    },
  }));
}

export function companyRecord(company: Company) {
  return {
    id: company.id,
    slug: company.slug,
    name: company.name,
    legalName: company.legalName ?? null,
    aliases: company.aliases,
    definition: {
      en: stripCitations(company.definition.en),
      zh: stripCitations(company.definition.zh),
    },
    lead: {
      en: stripCitations(company.lead.en),
      zh: stripCitations(company.lead.zh),
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
      markdown: `${SITE_ORIGIN}/companies/${company.slug}.md`,
      json: `${SITE_ORIGIN}/api/v1/companies/${company.slug}.json`,
    },
    sources: company.sources,
    faq: faqRecord(company.faq),
    claims: claimsRecord(company.claims),
    sections: company.sections.map((section) => ({
      id: section.id,
      title: section.title,
      body: {
        en: stripCitations(section.body.en),
        zh: stripCitations(section.body.zh),
      },
    })),
  };
}

export function personRecord(person: Person) {
  return {
    id: person.id,
    slug: person.slug,
    name: person.name,
    aliases: person.aliases,
    definition: {
      en: stripCitations(person.definition.en),
      zh: stripCitations(person.definition.zh),
    },
    lead: {
      en: stripCitations(person.lead.en),
      zh: stripCitations(person.lead.zh),
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
      markdown: `${SITE_ORIGIN}/people/${person.slug}.md`,
      json: `${SITE_ORIGIN}/api/v1/people/${person.slug}.json`,
    },
    sources: person.sources,
    faq: faqRecord(person.faq),
    claims: claimsRecord(person.claims),
    sections: (person.sections ?? []).map((section) => ({
      id: section.id,
      title: section.title,
      body: {
        en: stripCitations(section.body.en),
        zh: stripCitations(section.body.zh),
      },
    })),
  };
}

export function datasetRecord(stats: {
  companies: number;
  people: number;
  sectors: number;
  regions: number;
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
      openapi: `${SITE_ORIGIN}/api/v1/openapi.json`,
      companies: `${SITE_ORIGIN}/api/v1/companies.json`,
      people: `${SITE_ORIGIN}/api/v1/people.json`,
      graph: `${SITE_ORIGIN}/api/v1/graph.json`,
    },
  };
}
