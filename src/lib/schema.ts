import { getCompany, getPerson, seeAlsoCompanies } from "../data/catalog";
import { citySlug, countrySlug } from "../data/places";
import {
  CONTENT_LICENSE,
  CONTENT_LICENSE_URL,
  LAST_REVIEWED,
  SITE_NAME,
  SITE_ORIGIN,
  mission,
  sectors,
  tagline,
} from "../data/site";
import type { Company, EntityFaq, FaqItem, Locale, Person } from "../data/types";
import { htmlLang, pageUrl, pick, t, tOpt } from "./i18n";
import { clipPlain, stripCitations } from "./citations";

function richDescription(text: string, limit = 480): string {
  return clipPlain(text, limit);
}

function entityFaqGraph(url: string, faq: EntityFaq[] | undefined, locale: Locale) {
  const items = faq ?? [];
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: t(item.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripCitations(t(item.answer, locale)),
      },
    })),
  };
}

export function websiteGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: pageUrl(locale, "/"),
        name: SITE_NAME,
        description: t(tagline, locale),
        inLanguage: htmlLang(locale),
        publisher: { "@id": `${SITE_ORIGIN}/#org` },
        license: CONTENT_LICENSE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${pageUrl(locale, "/search")}?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Dataset",
        "@id": `${SITE_ORIGIN}/#dataset`,
        name: `${SITE_NAME} entity catalog`,
        description: t(mission, locale),
        url: `${SITE_ORIGIN}/api/v1/dataset.json`,
        license: CONTENT_LICENSE_URL,
        creator: { "@id": `${SITE_ORIGIN}/#org` },
        dateModified: LAST_REVIEWED,
        isAccessibleForFree: true,
        encodingFormat: ["application/json", "text/markdown", "text/html"],
      },
    ],
  };
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#org`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: mission.en,
    foundingDate: "2026",
    license: CONTENT_LICENSE_URL,
    sameAs: ["https://github.com/wulaosiji/techcowiki"],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "techco",
      value: "techco:publisher",
    },
  };
}

export function companyGraph(company: Company, locale: Locale) {
  const url = pageUrl(locale, `/companies/${company.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Organization",
        "@id": `${url}#org`,
        name: t(company.name, locale),
        alternateName: [company.name.en, company.name.zh, ...company.aliases].filter(
          (value, index, list) => list.indexOf(value) === index && value !== t(company.name, locale),
        ),
        legalName: company.legalName,
        description: richDescription(t(company.definition, locale), 320),
        url: company.website,
        foundingDate: company.founded,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "techco",
          value: company.id,
        },
        sameAs: Object.values(company.sameAs).filter(Boolean),
        numberOfEmployees: company.employees ? { "@type": "QuantitativeValue", value: company.employees.value } : undefined,
        knowsAbout: company.sectors.map(
          (slug) => {
            const sector = sectors.find((item) => item.slug === slug);
            return sector ? t(sector.name, locale) : slug;
          },
        ),
        location: {
          "@type": "Place",
          name: `${t(company.headquarters.city, locale)}, ${t(company.headquarters.country, locale)}`,
          url: pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`),
          address: {
            "@type": "PostalAddress",
            addressLocality: t(company.headquarters.city, locale),
            addressRegion: tOpt(company.headquarters.region, locale),
            addressCountry: company.headquarters.countryCode,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: t(company.headquarters.city, locale),
          addressRegion: tOpt(company.headquarters.region, locale),
          addressCountry: company.headquarters.countryCode,
        },
        founder: company.founders.map((founder) => {
          const person = getPerson(founder.personSlug);
          return {
            "@type": "Person",
            name: person ? t(person.name, locale) : founder.personSlug,
            url: pageUrl(locale, `/people/${founder.personSlug}`),
            identifier: person?.id,
          };
        }),
        brand: company.products.map((product) => ({
          "@type": "Brand",
          name: product.name,
          description: t(product.description, locale),
        })),
        tickerSymbol: company.stock
          ? [
              `${company.stock.exchange}:${company.stock.ticker}`,
              company.stock.adr
                ? `${company.stock.adr.exchange}:${company.stock.adr.ticker}`
                : undefined,
              ...(company.stock.secondary ?? []).map((item) => `${item.exchange}:${item.ticker}`),
            ]
              .filter(Boolean)
              .join(" / ")
          : undefined,
        additionalProperty: (company.claims ?? []).map((claim) => ({
          "@type": "PropertyValue",
          name: t(claim.label, locale),
          value: stripCitations(t(claim.value, locale)),
        })),
        mentions: seeAlsoCompanies(company, 6).map((other) => ({
          "@type": "Organization",
          name: t(other.name, locale),
          url: pageUrl(locale, `/companies/${other.slug}`),
          identifier: other.id,
        })),
      },
      webPageNode({
        url,
        name: t(company.name, locale),
        description: richDescription(t(company.lead, locale)),
        locale,
        dateModified: company.lastReviewed,
        about: `${url}#org`,
        parts: company.sections.map((section) => ({
          "@type": "WebPageElement",
          name: t(section.title, locale),
          cssSelector: `#${section.id}`,
        })),
      }),
      entityFaqGraph(url, company.faq, locale),
      breadcrumb([
        { name: SITE_NAME, url: pageUrl(locale, "/") },
        { name: pick(locale, "Companies", "公司"), url: pageUrl(locale, "/companies") },
        {
          name: t(company.headquarters.country, locale),
          url: pageUrl(locale, `/countries/${countrySlug(company.headquarters.countryCode)}`),
        },
        {
          name: t(company.headquarters.city, locale),
          url: pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`),
        },
        { name: t(company.name, locale), url },
      ]),
    ],
  };
}

export function personGraph(person: Person, locale: Locale) {
  const url = pageUrl(locale, `/people/${person.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: t(person.name, locale),
        alternateName: person.aliases,
        description: richDescription(t(person.definition, locale), 320),
        jobTitle: person.roles.map((role) => t(role, locale)),
        identifier: {
          "@type": "PropertyValue",
          propertyID: "techco",
          value: person.id,
        },
        sameAs: Object.values(person.sameAs).filter(Boolean),
        birthPlace: tOpt(person.birthPlace, locale),
        additionalProperty: (person.claims ?? []).map((claim) => ({
          "@type": "PropertyValue",
          name: t(claim.label, locale),
          value: stripCitations(t(claim.value, locale)),
        })),
        // The catalog records historical associations as well as current roles.
        // A founder relationship alone does not establish present employment.
        affiliation: person.companies.map((item) => {
          const company = getCompany(item.companySlug);
          return {
            "@type": "Role",
            roleName: t(item.role, locale),
            affiliation: {
              "@type": "Organization",
              name: company ? t(company.name, locale) : item.companySlug,
              url: pageUrl(locale, `/companies/${item.companySlug}`),
              identifier: company?.id,
            },
          };
        }),
      },
      webPageNode({
        url,
        name: t(person.name, locale),
        description: richDescription(t(person.lead, locale)),
        locale,
        dateModified: person.lastReviewed,
        about: `${url}#person`,
        parts: (person.sections ?? []).map((section) => ({
          "@type": "WebPageElement",
          name: t(section.title, locale),
          cssSelector: `#${section.id}`,
        })),
      }),
      entityFaqGraph(url, person.faq, locale),
      breadcrumb([
        { name: SITE_NAME, url: pageUrl(locale, "/") },
        { name: pick(locale, "People", "人物"), url: pageUrl(locale, "/people") },
        ...(() => {
          const company = getCompany(person.companies[0]?.companySlug ?? "");
          if (!company) return [];
          return [
            {
              name: t(company.headquarters.country, locale),
              url: pageUrl(locale, `/countries/${countrySlug(company.headquarters.countryCode)}`),
            },
            {
              name: t(company.headquarters.city, locale),
              url: pageUrl(locale, `/cities/${citySlug(company.headquarters.city.en)}`),
            },
          ];
        })(),
        { name: t(person.name, locale), url },
      ]),
    ],
  };
}

export function faqGraph(items: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl(locale, "/faq"),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: t(item.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripCitations(t(item.answer, locale)),
      },
    })),
  };
}

function webPageNode(input: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  dateModified: string;
  about: string;
  parts?: { "@type": string; name: string; cssSelector: string }[];
}) {
  return {
    "@type": "WebPage",
    "@id": `${input.url}#page`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: htmlLang(input.locale),
    dateModified: input.dateModified,
    license: CONTENT_LICENSE_URL,
    isAccessibleForFree: true,
    about: { "@id": input.about },
    publisher: { "@id": `${SITE_ORIGIN}/#org` },
    hasPart: input.parts,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".lead",
        ".definition",
        "#authority-brief",
        "#comparison",
        "article section",
        ".faq-item",
        ".claims",
        "#recorded-facts",
      ],
    },
    copyrightNotice: CONTENT_LICENSE,
  };
}

export function editorialGraph(locale: Locale, path: string, name: string, description: string) {
  const url = pageUrl(locale, path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name,
        description,
        inLanguage: htmlLang(locale),
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        publisher: { "@id": `${SITE_ORIGIN}/#org` },
        license: CONTENT_LICENSE_URL,
        isAccessibleForFree: true,
      },
      breadcrumb([
        { name: SITE_NAME, url: pageUrl(locale, "/") },
        { name, url },
      ]),
    ],
  };
}

export function searchGraph(locale: Locale) {
  const url = pageUrl(locale, "/search");
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    url,
    name: pick(locale, "Search", "搜索"),
    inLanguage: htmlLang(locale),
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    publisher: { "@id": `${SITE_ORIGIN}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
