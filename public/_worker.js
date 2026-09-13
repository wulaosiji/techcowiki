const PAGES_DEV_ROBOTS = "User-agent: *\nDisallow: /\n";
const PAGES_DEV_ROBOTS_TAG = "noindex, nofollow";

function isPagesDevHost(hostname) {
  return hostname === "pages.dev" || hostname.endsWith(".pages.dev");
}

function isRobotsTxt(pathname) {
  return pathname === "/robots.txt" || pathname === "/robots.txt/";
}

function withPagesDevNoindex(response) {
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", PAGES_DEV_ROBOTS_TAG);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function pagesDevRobotsTxt(method) {
  return new Response(method === "HEAD" ? null : PAGES_DEV_ROBOTS, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": PAGES_DEV_ROBOTS_TAG,
    },
  });
}

async function assetOrLocalized404(request, env, url) {
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
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pagesDev = isPagesDevHost(url.hostname);

    // Host-gated demo robots.txt. Production/custom hosts keep the built Allow: / file.
    if (pagesDev && isRobotsTxt(url.pathname) && ["GET", "HEAD"].includes(request.method)) {
      return pagesDevRobotsTxt(request.method);
    }

    const response = await assetOrLocalized404(request, env, url);
    return pagesDev ? withPagesDevNoindex(response) : response;
  },
};
