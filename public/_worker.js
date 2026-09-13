export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      return assetResponse;
    }

    const path = url.pathname;
    const prefix =
      path === "/zh-hant" || path.startsWith("/zh-hant/")
        ? "/zh-hant"
        : path === "/zh" || path.startsWith("/zh/")
          ? "/zh"
          : null;
    if (!prefix) {
      return assetResponse;
    }

    // Pages redirects *.html to their clean URL; request that URL directly so
    // redirects or conditional request headers cannot prevent the fallback.
    // Source artifacts: /zh/404/index.html and /zh-hant/404/index.html.
    const notFound = await env.ASSETS.fetch(new Request(new URL(`${prefix}/404/`, url.origin), {
      method: request.method,
    }));
    if (!notFound.ok) {
      return assetResponse;
    }

    const headers = new Headers(notFound.headers);
    headers.set("cache-control", "no-store");
    headers.set("x-robots-tag", "noindex");
    return new Response(request.method === "HEAD" ? null : notFound.body, {
      status: 404,
      statusText: "Not Found",
      headers,
    });
  },
};
