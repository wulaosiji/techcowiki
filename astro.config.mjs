import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://techco.wiki",
  trailingSlash: "never",
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
});
