export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    const path = url.pathname;
    const isZh = path === "/zh" || path.startsWith("/zh/");
    if (!isZh) {
      return assetResponse;
    }

    const notFound = await env.ASSETS.fetch(new URL("/zh/404/index.html", url.origin));
    if (!notFound.ok) {
      return assetResponse;
    }

    const headers = new Headers(notFound.headers);
    headers.set("cache-control", "no-store");
    return new Response(notFound.body, {
      status: 404,
      statusText: "Not Found",
      headers,
    });
  },
};
