import { htmlLang, stripLocalePrefix } from "./i18n";
import type { Locale } from "../data/types";

export const GA_MEASUREMENT_ID = "G-8RYHT0WLHE";
export const ANALYTICS_CONFIG_ELEMENT_ID = "techco-analytics-config";
export const SEARCH_RESULTS_EVENT = "techco:search-results";

export type PublicLocale = "en" | "zh" | "zh-hant";
export type PageType =
  | "home"
  | "search"
  | "entity"
  | "catalog"
  | "hub"
  | "hub_index"
  | "editorial"
  | "faq"
  | "not_found"
  | "other";
export type EntityType = "company" | "person" | "product";
export type HubKind = "sector" | "region" | "country" | "city";
export type CatalogKind =
  | "companies"
  | "people"
  | "products"
  | "sectors"
  | "regions"
  | "countries"
  | "cities"
  | "search";
export type MachineSurface =
  | "markdown"
  | "json"
  | "api"
  | "openapi"
  | "llms"
  | "feed"
  | "sitemap"
  | "github";

export const AnalyticsEvent = {
  pageView: "page_view",
  search: "search",
  viewSearchResults: "view_search_results",
  viewItem: "view_item",
  viewItemList: "view_item_list",
  selectItem: "select_item",
  click: "click",
  fileDownload: "file_download",
  languageSwitch: "language_switch",
  navClick: "nav_click",
  entityView: "entity_view",
  hubView: "hub_view",
  machineSurfaceClick: "machine_surface_click",
  internalCatalogClick: "internal_catalog_click",
  pageNotFound: "page_not_found",
  searchSubmit: "search_submit",
} as const;

export interface PageContext {
  pageType: PageType;
  entityType?: EntityType;
  entityId?: string;
  entitySlug?: string;
  hubKind?: HubKind;
  hubSlug?: string;
  catalogKind?: CatalogKind;
  editorialSlug?: string;
}

export interface AnalyticsPageConfig extends PageContext {
  measurementId: string;
  locale: Locale;
  publicLocale: PublicLocale;
  htmlLang: string;
  path: string;
}

export interface ClassifiedHref {
  kind:
    | "machine"
    | "outbound"
    | "catalog_entity"
    | "catalog_hub"
    | "catalog_index"
    | "internal"
    | "invalid";
  outbound: boolean;
  surface?: MachineSurface;
  outboundKind?: "github" | "source" | "other";
  entityType?: EntityType;
  entitySlug?: string;
  entityId?: string;
  hubKind?: HubKind;
  hubSlug?: string;
  catalogKind?: CatalogKind;
  fileExtension?: string;
  fileName?: string;
}

export interface SearchResultsDetail {
  search_term: string;
  sector: string;
  region: string;
  results_count: number;
  company_count: number;
  person_count: number;
  product_count: number;
}

const EDITORIAL = new Set(["about", "methodology", "inclusion", "for-models", "license"]);
const FILE_DOWNLOAD_EXT = new Set(["md", "json", "txt", "xml"]);
const ENTITY_COLLECTION: Record<string, EntityType> = {
  companies: "company",
  people: "person",
  products: "product",
};
const HUB_COLLECTION: Record<string, HubKind> = {
  sectors: "sector",
  regions: "region",
  countries: "country",
  cities: "city",
};
const CATALOG_INDEX = new Set<CatalogKind>([
  "companies",
  "people",
  "products",
  "sectors",
  "regions",
  "countries",
  "cities",
  "search",
]);

export function publicLocale(locale: Locale): PublicLocale {
  return locale === "zht" ? "zh-hant" : locale;
}

export function publicLocaleFromPathname(pathname: string): PublicLocale {
  if (pathname === "/zh-hant" || pathname.startsWith("/zh-hant/")) return "zh-hant";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

export function normalizeAnalyticsPath(path: string): string {
  const bare = (path.split("?")[0] ?? path).split("#")[0] ?? path;
  return (stripLocalePrefix(bare).replace(/\/$/, "") || "/");
}

export function isPublicAnalyticsHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host || host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1") {
    return false;
  }
  return (
    host === "techco.wiki" ||
    host === "www.techco.wiki" ||
    host === "techcowiki.pages.dev" ||
    (host.endsWith(".techcowiki.pages.dev") && host !== ".techcowiki.pages.dev")
  );
}

export function isSiteHostname(hostname: string): boolean {
  return isPublicAnalyticsHost(hostname);
}

export function isSameSiteHost(hostname: string, pageHostname?: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (pageHostname && host === pageHostname.toLowerCase().replace(/\.$/, "")) return true;
  return isSiteHostname(host);
}

export function entityIdFor(type: EntityType, slug: string): string {
  return `techco:${type}:${slug}`;
}

export function clipParam(value: string, max = 100): string {
  return value.length <= max ? value : value.slice(0, max);
}

export function pageContextFromPath(path: string): PageContext {
  const clean = normalizeAnalyticsPath(path);
  if (clean === "/") return { pageType: "home" };
  if (clean === "/search") return { pageType: "search", catalogKind: "search" };
  if (clean === "/404") return { pageType: "not_found" };
  if (clean === "/faq") return { pageType: "faq" };

  const segments = clean.slice(1).split("/");
  const [head, slug] = segments;
  if (!head) return { pageType: "other" };

  if (segments.length === 2 && slug && ENTITY_COLLECTION[head]) {
    const entityType = ENTITY_COLLECTION[head];
    return {
      pageType: "entity",
      entityType,
      entitySlug: slug,
      entityId: entityIdFor(entityType, slug),
    };
  }
  if (segments.length === 2 && slug && HUB_COLLECTION[head]) {
    return { pageType: "hub", hubKind: HUB_COLLECTION[head], hubSlug: slug };
  }
  if (segments.length === 1 && CATALOG_INDEX.has(head as CatalogKind)) {
    const catalogKind = head as CatalogKind;
    if (catalogKind === "companies" || catalogKind === "people" || catalogKind === "products") {
      return { pageType: "catalog", catalogKind };
    }
    return { pageType: "hub_index", catalogKind };
  }
  if (segments.length === 1 && EDITORIAL.has(head)) {
    return { pageType: "editorial", editorialSlug: head };
  }
  return { pageType: "other" };
}

export function analyticsPageConfig(locale: Locale, path: string): AnalyticsPageConfig {
  return {
    measurementId: GA_MEASUREMENT_ID,
    locale,
    publicLocale: publicLocale(locale),
    htmlLang: htmlLang(locale),
    path: normalizeAnalyticsPath(path),
    ...pageContextFromPath(path),
  };
}

export function analyticsSharedParams(config: Pick<AnalyticsPageConfig, keyof PageContext | "publicLocale" | "locale" | "htmlLang" | "path">): Record<string, string | undefined> {
  return {
    site_locale: config.publicLocale,
    locale_code: config.locale,
    html_lang: config.htmlLang,
    page_type: config.pageType,
    page_path: config.path,
    entity_type: config.entityType,
    entity_id: config.entityId,
    entity_slug: config.entitySlug,
    hub_kind: config.hubKind,
    hub_slug: config.hubSlug,
    catalog_kind: config.catalogKind,
    editorial_slug: config.editorialSlug,
  };
}

function fileMeta(pathname: string): Pick<ClassifiedHref, "fileExtension" | "fileName"> {
  const fileName = pathname.split("/").pop();
  const ext = fileName?.includes(".") ? fileName.split(".").pop()?.toLowerCase() : undefined;
  if (!ext || !FILE_DOWNLOAD_EXT.has(ext) || !fileName) return {};
  return { fileExtension: ext, fileName };
}

export function classifyHref(href: string, pageOrigin = "https://techco.wiki"): ClassifiedHref {
  if (!href || href.startsWith("javascript:")) return { kind: "invalid", outbound: false };
  let url: URL;
  try {
    url = new URL(href, pageOrigin);
  } catch {
    return { kind: "invalid", outbound: false };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { kind: "outbound", outbound: true, outboundKind: "other" };
  }

  const pageHost = new URL(pageOrigin).hostname;
  const host = url.hostname.toLowerCase();
  const files = fileMeta(url.pathname);
  const outbound = !isSameSiteHost(host, pageHost);

  if (host === "github.com" || host === "www.github.com") {
    return { kind: "machine", outbound: true, surface: "github", outboundKind: "github", ...files };
  }
  if (host.includes("wikipedia.org") || host.includes("wikidata.org")) {
    return { kind: "outbound", outbound: true, outboundKind: "source", ...files };
  }

  if (outbound) {
    return { kind: "outbound", outbound: true, outboundKind: "other", ...files };
  }

  const path = url.pathname;
  if (/\/llms(-full)?\.txt$/.test(path)) {
    return { kind: "machine", outbound: false, surface: "llms", ...files };
  }
  if (path.endsWith("/api/v1/openapi.json") || path === "/api/v1/openapi.json") {
    return { kind: "machine", outbound: false, surface: "openapi", ...files };
  }
  if (path.includes("/api/v1/")) {
    return { kind: "machine", outbound: false, surface: "api", ...files };
  }
  if (path.endsWith("feed.xml")) {
    return { kind: "machine", outbound: false, surface: "feed", ...files };
  }
  if (path.endsWith("sitemap.xml")) {
    return { kind: "machine", outbound: false, surface: "sitemap", ...files };
  }
  if (path.endsWith(".md")) {
    return { kind: "machine", outbound: false, surface: "markdown", ...files };
  }
  if (path.endsWith(".json")) {
    return { kind: "machine", outbound: false, surface: "json", ...files };
  }

  const stripped = normalizeAnalyticsPath(path);
  const segments = stripped === "/" ? [] : stripped.slice(1).split("/");
  const [head, slug] = segments;
  if (head && slug && ENTITY_COLLECTION[head] && segments.length === 2) {
    const entityType = ENTITY_COLLECTION[head];
    return {
      kind: "catalog_entity",
      outbound: false,
      entityType,
      entitySlug: slug,
      entityId: entityIdFor(entityType, slug),
    };
  }
  if (head && slug && HUB_COLLECTION[head] && segments.length === 2) {
    return {
      kind: "catalog_hub",
      outbound: false,
      hubKind: HUB_COLLECTION[head],
      hubSlug: slug,
    };
  }
  if (head && segments.length === 1 && CATALOG_INDEX.has(head as CatalogKind)) {
    return { kind: "catalog_index", outbound: false, catalogKind: head as CatalogKind };
  }
  return { kind: "internal", outbound: false, ...files };
}

export const GA_CSP_HOSTS = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
] as const;

declare global {
  interface Window {
    __TECHCO_SEARCH_RESULTS?: SearchResultsDetail;
  }
}

export function analyticsContentSecurityPolicy(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
    "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "frame-src https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}
