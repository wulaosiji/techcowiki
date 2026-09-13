import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://techco.wiki",
  trailingSlash: "never",
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  build: {
    inlineStylesheets: "never",
  },
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
});
