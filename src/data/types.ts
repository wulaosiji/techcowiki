export type Locale = "en" | "zh";

export type Localized = Record<Locale, string>;

export type SourceType =
  | "encyclopedia"
  | "official"
  | "news"
  | "filing"
  | "academic";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  published?: string;
  accessed: string;
  type: SourceType;
}

export interface Headquarters {
  city: Localized;
  region?: Localized;
  countryCode: string;
  country: Localized;
}

export interface Product {
  name: string;
  description: Localized;
}

export interface FounderRef {
  personSlug: string;
  role: Localized;
}

export interface CompanySection {
  id: string;
  title: Localized;
  body: Localized;
}

export interface SameAs {
  wikipedia?: string;
  wikipediaZh?: string;
  wikidata?: string;
  official?: string;
  crunchbase?: string;
  linkedin?: string;
}

export type CompanyStatus = "operating" | "acquired" | "public" | "defunct";
export type CompanyStage = "startup" | "growth" | "unicorn" | "public" | "acquired";
export type Confidence = "high" | "medium" | "low";

export interface Company {
  id: string;
  slug: string;
  name: Localized;
  legalName?: string;
  aliases: string[];
  definition: Localized;
  lead: Localized;
  founded: string;
  foundedPrecision: "year" | "month" | "day";
  headquarters: Headquarters;
  status: CompanyStatus;
  stage: CompanyStage;
  sectors: string[];
  regions: string[];
  products: Product[];
  founders: FounderRef[];
  employees?: { value: number; asOf: string; sourceIds: string[] };
  stock?: { exchange: string; ticker: string };
  website: string;
  sameAs: SameAs;
  sections: CompanySection[];
  sources: Source[];
  lastReviewed: string;
  confidence: Confidence;
}

export interface Person {
  id: string;
  slug: string;
  name: Localized;
  aliases: string[];
  definition: Localized;
  lead: Localized;
  birthYear?: number;
  birthPlace?: Localized;
  roles: Localized[];
  companies: { companySlug: string; role: Localized }[];
  sameAs: SameAs;
  sources: Source[];
  lastReviewed: string;
  confidence: Confidence;
}

export interface Sector {
  slug: string;
  name: Localized;
  definition: Localized;
}

export interface Region {
  slug: string;
  name: Localized;
  definition: Localized;
  countryCodes: string[];
}

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}
