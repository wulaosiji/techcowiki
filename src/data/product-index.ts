import { localizedProductName } from "./product-names";
import type { Company, Localized, Product } from "./types";

export interface ProductStub {
  slug: string;
  name: string;
  nameZh: string;
  description: Localized;
  companySlug: string;
}

export function slugifyProductName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function productAliases(name: string): string[] {
  const parts = name
    .split(/\s*[/|,·]\s*|\s+and\s+/i)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
  const seen = new Set<string>();
  const aliases: string[] = [];
  for (const part of [name, ...parts]) {
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    aliases.push(part);
  }
  return aliases;
}

export function indexCompanyProducts(companies: Company[]): ProductStub[] {
  const used = new Set<string>();
  const stubs: ProductStub[] = [];
  for (const company of companies) {
    for (const product of company.products) {
      stubs.push(stubFromLine(company.slug, product, used));
    }
  }
  return stubs;
}

export function stubFromLine(companySlug: string, product: Product, used: Set<string>): ProductStub {
  let slug = slugifyProductName(product.name);
  if (!slug) slug = `${companySlug}-product`;
  if (used.has(slug)) slug = `${slug}-${companySlug}`;
  used.add(slug);
  return {
    slug,
    name: product.name,
    nameZh: localizedProductName(product.name).zh,
    description: product.description,
    companySlug,
  };
}

export function findProductStub(
  stubs: ProductStub[],
  companySlug: string,
  name: string,
): ProductStub | undefined {
  return stubs.find((stub) => stub.companySlug === companySlug && stub.name === name);
}
