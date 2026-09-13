import type { APIRoute } from "astro";
import { allProducts, getProduct } from "../../../../data/catalog";
import { jsonResponse } from "../../../../lib/http";
import { productRecord } from "../../../../lib/serialize";

export function getStaticPaths() {
  return allProducts().map((product) => ({ params: { slug: product.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const product = getProduct(params.slug!);
  if (!product) return new Response("Not found", { status: 404 });
  return jsonResponse(productRecord(product));
};
