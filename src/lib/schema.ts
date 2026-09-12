import { getCompany, getPerson } from "../data/catalog";
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
import type { Company, FaqItem, Locale, Person } from "../data/types";
import { pageUrl } from "./i18n";
import { stripCitations } from "./citations";

function richDescription(text: string, limit = 480): string {
  const clean = stripCitations(text);
  return clean.length > limit ? `${clean.slice(0, limit - 1).trimEnd()}…` : clean;
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
        description: tagline[locale],
        inLanguage: locale === "zh" ? "zh-Hans" : "en",
        publisher: { "@id": `${SITE_ORIGIN}/#org` },
        license: CONTENT_LICENSE_URL,
      },
      {
        "@type": "Dataset",
        "@id": `${SITE_ORIGIN}/#dataset`,
        name: `${SITE_NAME} entity catalog`,
        description: mission[locale],
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
        name: company.name[locale],
        alternateName: [company.name.en, company.name.zh, ...company.aliases].filter(
          (value, index, list) => list.indexOf(value) === index && value !== company.name[locale],
        ),
        legalName: company.legalName,
        description: richDescription(company.lead[locale]),
        url: company.website,
        foundingDate: company.founded,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "techco",
          value: company.id,
        },
        sameAs: Object.values(company.sameAs).filter(Boolean),
        numberOfEmployees: company.employees?.value,
        knowsAbout: company.sectors.map(
          (slug) => sectors.find((sector) => sector.slug === slug)?.name[locale] ?? slug,
        ),
        foundingLocation: {
          "@type": "Place",
          name: `${company.headquarters.city[locale]}, ${company.headquarters.country[locale]}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: company.headquarters.city[locale],
            addressRegion: company.headquarters.region?.[locale],
            addressCountry: company.headquarters.countryCode,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: company.headquarters.city[locale],
          addressRegion: company.headquarters.region?.[locale],
          addressCountry: company.headquarters.countryCode,
        },
        founder: company.founders.map((founder) => {
          const person = getPerson(founder.personSlug);
          return {
            "@type": "Person",
            name: person ? person.name[locale] : founder.personSlug,
            url: pageUrl(locale, `/people/${founder.personSlug}`),
            identifier: person?.id,
          };
        }),
        brand: company.products.map((product) => ({
          "@type": "Brand",
          name: product.name,
          description: product.description[locale],
        })),
        tickerSymbol: company.stock ? `${company.stock.exchange}:${company.stock.ticker}` : undefined,
      },
      webPageNode({
        url,
        name: company.name[locale],
        description: richDescription(company.lead[locale]),
        locale,
        dateModified: company.lastReviewed,
        about: `${url}#org`,
      }),
      breadcrumb([
        { name: SITE_NAME, url: pageUrl(locale, "/") },
        { name: locale === "zh" ? "公司" : "Companies", url: pageUrl(locale, "/companies") },
        { name: company.name[locale], url },
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
        name: person.name[locale],
        alternateName: person.aliases,
        description: richDescription(person.lead[locale]),
        jobTitle: person.roles.map((role) => role[locale]),
        identifier: {
          "@type": "PropertyValue",
          propertyID: "techco",
          value: person.id,
        },
        sameAs: Object.values(person.sameAs).filter(Boolean),
        birthPlace: person.birthPlace?.[locale],
        worksFor: person.companies.map((item) => {
          const company = getCompany(item.companySlug);
          return {
            "@type": "Organization",
            name: company ? company.name[locale] : item.companySlug,
            url: pageUrl(locale, `/companies/${item.companySlug}`),
            identifier: company?.id,
            jobTitle: item.role[locale],
          };
        }),
      },
      webPageNode({
        url,
        name: person.name[locale],
        description: richDescription(person.lead[locale]),
        locale,
        dateModified: person.lastReviewed,
        about: `${url}#person`,
      }),
      breadcrumb([
        { name: SITE_NAME, url: pageUrl(locale, "/") },
        { name: locale === "zh" ? "人物" : "People", url: pageUrl(locale, "/people") },
        { name: person.name[locale], url },
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
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
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
}) {
  return {
    "@type": "WebPage",
    "@id": `${input.url}#page`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: input.locale === "zh" ? "zh-Hans" : "en",
    dateModified: input.dateModified,
    license: CONTENT_LICENSE_URL,
    isAccessibleForFree: true,
    about: { "@id": input.about },
    publisher: { "@id": `${SITE_ORIGIN}/#org` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead", ".definition", "article section"],
    },
    copyrightNotice: CONTENT_LICENSE,
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
