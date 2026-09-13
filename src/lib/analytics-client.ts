import {
  ANALYTICS_CONFIG_ELEMENT_ID,
  AnalyticsEvent,
  SEARCH_RESULTS_EVENT,
  analyticsPageConfig,
  analyticsSharedParams,
  classifyHref,
  clipParam,
  isPublicAnalyticsHost,
  publicLocaleFromPathname,
  type AnalyticsPageConfig,
  type SearchResultsDetail,
} from "./analytics";

const NAV_CONTEXTS = new Set([
  "brand",
  "primary_nav",
  "footer",
  "footer_catalog",
  "footer_docs",
  "breadcrumb",
  "skip",
]);

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFn;
    __TECHCO_SEARCH_RESULTS?: SearchResultsDetail;
  }
}

function readConfig(): AnalyticsPageConfig {
  const node = document.getElementById(ANALYTICS_CONFIG_ELEMENT_ID);
  if (node?.textContent) {
    return JSON.parse(node.textContent) as AnalyticsPageConfig;
  }
  const html = document.documentElement;
  const locale =
    html.dataset.localeCode === "zht" || html.dataset.localeCode === "zh" || html.dataset.localeCode === "en"
      ? html.dataset.localeCode
      : "en";
  const fallback = analyticsPageConfig(locale, location.pathname);
  return {
    ...fallback,
    publicLocale:
      html.dataset.siteLocale === "zh" || html.dataset.siteLocale === "zh-hant"
        ? html.dataset.siteLocale
        : fallback.publicLocale,
    pageType: (html.dataset.pageType as AnalyticsPageConfig["pageType"]) || fallback.pageType,
    entityType: html.dataset.entityType as AnalyticsPageConfig["entityType"],
    entityId: html.dataset.entityId,
    entitySlug: html.dataset.entitySlug,
  };
}

function installGtag(id: string): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function send(name: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, compact(params));
  } catch {
    /* never break browsing */
  }
}

function compact(params?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!params) return params;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") next[key] = value;
  }
  return next;
}

function shared(config: AnalyticsPageConfig): Record<string, unknown> {
  return analyticsSharedParams(config);
}

function linkContext(anchor: HTMLAnchorElement): string {
  if (anchor.classList.contains("lang-switch") || anchor.closest("a.lang-switch")) return "language_switch";
  if (anchor.classList.contains("skip")) return "skip";
  if (anchor.closest(".brand")) return "brand";
  if (anchor.closest("nav.nav")) return "primary_nav";
  if (anchor.closest('[data-nav="footer-catalog"]')) return "footer_catalog";
  if (anchor.closest('[data-nav="footer-docs"]')) return "footer_docs";
  if (anchor.closest(".footer-nav")) return "footer";
  if (anchor.closest(".breadcrumbs")) return "breadcrumb";
  if (anchor.closest(".machine-box")) return "machine_box";
  if (anchor.closest(".toolbar")) return "toolbar";
  if (anchor.closest(".card")) return "entity_card";
  if (anchor.closest(".see-also")) return "see_also";
  if (anchor.closest(".sources")) return "source_list";
  if (anchor.closest(".infobox")) return "infobox";
  if (anchor.closest(".chips")) return "chip";
  if (anchor.closest("main")) return "content";
  return "other";
}

function trackPage(config: AnalyticsPageConfig): void {
  const base = shared(config);
  window.gtag("config", config.measurementId, {
    send_page_view: false,
    anonymize_ip: true,
    language: config.htmlLang,
    content_group: config.pageType,
    cookie_flags: "SameSite=Lax;Secure",
  });
  window.gtag("set", "user_properties", { site_locale: config.publicLocale });
  send(AnalyticsEvent.pageView, {
    ...base,
    page_title: document.title,
    page_location: location.href,
    page_path: `${location.pathname}${location.search}`,
  });

  if (config.pageType === "entity" && config.entityType && config.entityId) {
    const itemName = clipParam(document.title.replace(/\s·\sTechCo\.Wiki$/, ""));
    const item = {
      item_id: config.entityId,
      item_name: itemName,
      item_category: config.entityType,
    };
    send(AnalyticsEvent.viewItem, {
      ...base,
      item_id: config.entityId,
      item_name: itemName,
      item_category: config.entityType,
      items: [item],
    });
    send(AnalyticsEvent.entityView, {
      ...base,
      entity_type: config.entityType,
      entity_id: config.entityId,
      entity_slug: config.entitySlug,
    });
  }

  if (config.pageType === "hub") {
    send(AnalyticsEvent.hubView, {
      ...base,
      hub_kind: config.hubKind,
      hub_slug: config.hubSlug,
    });
  }

  if (config.pageType === "not_found") {
    send(AnalyticsEvent.pageNotFound, {
      ...base,
      page_location: location.href,
      page_referrer: document.referrer || undefined,
    });
  }
}

function trackSearchResults(detail: SearchResultsDetail, config: AnalyticsPageConfig): void {
  const searchTerm = clipParam((detail.search_term ?? "").trim());
  const params = {
    ...shared(config),
    search_term: searchTerm,
    search_sector: detail.sector || undefined,
    search_region: detail.region || undefined,
    results_count: Number(detail.results_count) || 0,
    company_results: Number(detail.company_count) || 0,
    person_results: Number(detail.person_count) || 0,
    product_results: Number(detail.product_count) || 0,
  };
  if (searchTerm) send(AnalyticsEvent.search, params);
  if (searchTerm || detail.sector || detail.region) {
    send(AnalyticsEvent.viewSearchResults, params);
    return;
  }
  send(AnalyticsEvent.viewItemList, {
    ...params,
    item_list_id: "search_catalog",
    item_list_name: "Search catalog",
  });
}

function trackClick(anchor: HTMLAnchorElement, config: AnalyticsPageConfig): void {
  const href = anchor.getAttribute("href") || anchor.href;
  const classified = classifyHref(href, location.origin);
  const context = linkContext(anchor);
  const linkUrl = clipParam(anchor.href, 500);
  const linkText = clipParam((anchor.textContent ?? "").replace(/\s+/g, " ").trim());
  const base = {
    ...shared(config),
    link_url: linkUrl,
    link_text: linkText,
    link_context: context,
  };

  if (context === "language_switch") {
    let to = anchor.getAttribute("data-to-locale") || "";
    try {
      to = to || publicLocaleFromPathname(new URL(anchor.href, location.origin).pathname);
    } catch {
      to = to || config.publicLocale;
    }
    send(AnalyticsEvent.languageSwitch, {
      ...base,
      from_locale: config.publicLocale,
      to_locale: to,
      method: "lang_switch",
    });
    return;
  }

  if (NAV_CONTEXTS.has(context)) {
    send(AnalyticsEvent.navClick, {
      ...base,
      nav_id: context,
    });
  }

  if (classified.kind === "catalog_entity") {
    const entityType = anchor.dataset.entityType || classified.entityType;
    const entityId = anchor.dataset.entityId || classified.entityId;
    const entitySlug = anchor.dataset.entitySlug || classified.entitySlug;
    send(AnalyticsEvent.selectItem, {
      ...base,
      item_list_id: context,
      item_id: entityId,
      item_name: linkText || entitySlug,
      item_category: entityType,
      items: [
        {
          item_id: entityId,
          item_name: linkText || entitySlug,
          item_category: entityType,
        },
      ],
    });
    send(AnalyticsEvent.internalCatalogClick, {
      ...base,
      entity_type: entityType,
      entity_id: entityId,
      entity_slug: entitySlug,
    });
    return;
  }

  if (classified.kind === "catalog_hub" || classified.kind === "catalog_index") {
    send(AnalyticsEvent.internalCatalogClick, {
      ...base,
      catalog_target: classified.kind,
      hub_kind: classified.hubKind,
      hub_slug: classified.hubSlug,
      catalog_kind: classified.catalogKind,
    });
    return;
  }

  if (classified.kind === "machine") {
    send(AnalyticsEvent.machineSurfaceClick, {
      ...base,
      machine_surface: classified.surface,
      outbound: classified.outbound,
    });
    if (classified.fileExtension && classified.fileName) {
      send(AnalyticsEvent.fileDownload, {
        ...base,
        file_name: classified.fileName,
        file_extension: classified.fileExtension,
      });
    }
    if (classified.outbound) {
      send(AnalyticsEvent.click, {
        ...base,
        outbound: true,
        link_domain: new URL(anchor.href).hostname,
        outbound_kind: classified.outboundKind ?? "github",
      });
    }
    return;
  }

  if (classified.outbound) {
    send(AnalyticsEvent.click, {
      ...base,
      outbound: true,
      link_domain: new URL(anchor.href).hostname,
      outbound_kind: classified.outboundKind ?? "other",
    });
  }
}

function formContext(form: HTMLFormElement, config: AnalyticsPageConfig): string {
  if (form.classList.contains("nav-search")) return "header";
  if (form.classList.contains("filters")) return "catalog_filter";
  if (form.closest(".hero")) return "home";
  if (config.pageType === "not_found") return "not_found";
  return "search";
}

function trackSubmit(form: HTMLFormElement, config: AnalyticsPageConfig): void {
  const query = form.querySelector<HTMLInputElement>('input[name="q"]');
  if (!query) return;
  const sector = form.querySelector<HTMLSelectElement>('select[name="sector"]');
  const region = form.querySelector<HTMLSelectElement>('select[name="region"]');
  const searchTerm = clipParam(query.value.trim());
  const params = {
    ...shared(config),
    search_term: searchTerm,
    search_sector: sector?.value || undefined,
    search_region: region?.value || undefined,
    form_context: formContext(form, config),
  };
  send(AnalyticsEvent.searchSubmit, params);
  if (searchTerm) send(AnalyticsEvent.search, params);
}

function bind(config: AnalyticsPageConfig): void {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor?.href) return;
      try {
        trackClick(anchor, config);
      } catch {
        /* never prevent navigation */
      }
    },
    true,
  );
  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      try {
        trackSubmit(form, config);
      } catch {
        /* never block submit */
      }
    },
    true,
  );
  window.addEventListener(SEARCH_RESULTS_EVENT, (event) => {
    const detail = (event as CustomEvent<SearchResultsDetail>).detail;
    if (detail) trackSearchResults(detail, config);
  });
  if (window.__TECHCO_SEARCH_RESULTS) {
    trackSearchResults(window.__TECHCO_SEARCH_RESULTS, config);
    window.__TECHCO_SEARCH_RESULTS = undefined;
  }
}

export function bootSiteAnalytics(): void {
  try {
    const config = readConfig();
    if (!isPublicAnalyticsHost(location.hostname)) return;
    installGtag(config.measurementId);
    trackPage(config);
    bind(config);
  } catch {
    /* public pages still render if analytics fails */
  }
}
