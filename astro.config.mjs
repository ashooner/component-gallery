import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import remarkCaptions from "remark-captions";
import tailwind from "@astrojs/tailwind";
import { pagefind } from "vite-plugin-pagefind";
import generateRedirects from "./src/integrations/generateRedirects";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  contentLayer: true,
  integrations: [
    tailwind(),
    mdx(),
    preact(),
    icon(),
    generateRedirects(),
    sitemap({
      filter: (page) =>
        !page.includes("/open-graph/") &&
        !page.endsWith("/404/"),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "nord",
      },
    },
    remarkPlugins: [remarkCaptions],
  },
  prefetch: true,
  vite: {
    ssr: {
      external: ["canvaskit-wasm"],
    },
    plugins: [
      pagefind({
        site: "dist",
        outputDirectory: "dist",
        assetsDirectory: "public",
        bundleDirectory: "pagefind",
        buildScript: "build",
        developStrategy: "lazy",
      }),
    ],
    build: {
      // Assets below this size will be loaded inline in the HTML
      assetsInlineLimit: 16384, // 16kb
    },
  },
  svg: true,
});
