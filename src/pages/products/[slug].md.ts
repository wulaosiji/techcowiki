import type { APIRoute } from "astro";
import { allProducts, getProduct } from "../../data/catalog";
import { textResponse } from "../../lib/http";
import { productMarkdown } from "../../lib/markdown";

export function getStaticPaths() {
  return allProducts().map((product) => ({ params: { slug: product.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const product = getProduct(params.slug!);
  if (!product) return new Response("Not found", { status: 404 });
  return textResponse(productMarkdown(product, "en"), "text/markdown");
};
