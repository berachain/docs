// Imports
// ========================================================
import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import markdownItConditionalRender from "markdown-it-conditional-render";
import { sidebar } from "./sidebar";
import { constants } from "@berachain/config/constants";

// Config
// ========================================================
// IMPORTANT: These flags will enable / disable certain content sections throughout the docs
// To block markdown content behind a flag, wrap it like so:
// ::if testnet
// <your content>
// ::endif
const ENABLED_FLAGS = ["testnet" /*"mainnet"*/];
/**
 *
 */
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Main Configuration
// ========================================================
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: `${constants.websites.docsBex.name}`,
  description: `${constants.websites.docsBex.description}`,
  cleanUrls: true,
  srcDir: "content",
  markdown: {
    math: true,
  },
  head: [
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    [
      "meta",
      { name: "og:site_name", content: `${constants.websites.docsBex.name}` },
    ],
    [
      "meta",
      {
        name: "og:image",
        content: `${constants.websites.docsBex.url}/previewDocs.jpg`,
      },
    ],
    [
      "script",
      { id: "va" },
      `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`,
    ],
    IS_PRODUCTION
      ? ["script", { src: "/_vercel/insights/script.js", defer: "true" }]
      : [
          "meta",
          {
            name: "environment",
            content: "development",
          },
        ],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/assets/icon.svg" }],
  ],
  sitemap: {
    hostname: `${constants.websites.docsBex.url}`,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    returnToTopLabel: "Up Only",
    nav: [
      {
        text: `<span style="display: flex; align-items: center; gap: 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-book">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path style="stroke: var(--vp-c-brand-1);" d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path style="stroke: var(--vp-c-brand-1);" d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path style="stroke: var(--vp-c-brand-1);" d="M3 6l0 13" />
              <path style="stroke: var(--vp-c-brand-1);" d="M12 6l0 13" />
              <path style="stroke: var(--vp-c-brand-1);" d="M21 6l0 13" />
            </svg>
            More Docs
          </span>`,
        items: [
          {
            text: `${constants.websites.docsCore.name}`,
            link: `${constants.websites.docsCore.url}`,
          },
          {
            text: `${constants.websites.docsBend.name}`,
            link: `${constants.websites.docsBend.url}`,
          },
          {
            text: `${constants.websites.docsBerps.name}`,
            link: `${constants.websites.docsBerps.url}`,
          },
        ],
      },
      { text: "Learn", link: "learn/index", activeMatch: "/learn/" },
      {
        text: "Developers",
        link: "developers/index",
        activeMatch: "/developers/",
      },
    ],
    outline: [2, 3],
    search: {
      provider: "local",
      options: {
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            /* ... */
          },
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            /* ... */
          },
        },
        detailedView: true,
      },
    },
    sidebar,
    siteTitle: `🐻⛓️ ${constants.websites.docsBex.name}`,
    socialLinks: [
      { icon: "twitter", link: `${constants.socials.twitter}` },
      { icon: "discord", link: `${constants.socials.discord}` },
      { icon: "github", link: `${constants.socials.github}` },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>',
        },
        link: `${constants.socials.telegram}`,
        ariaLabel: "Berachain Portal",
      },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL("../node_modules/@berachain/ui/NavBar.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavBarMenu.vue",
              import.meta.url
            )
          ),
        },
        {
          find: /^.*\/VPNavBarMenuLink\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavBarMenuLink.vue",
              import.meta.url
            )
          ),
        },
        {
          find: /^.*\/VPNavScreenMenuGroup\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavScreenMenuGroup.vue",
              import.meta.url
            )
          ),
        },
        {
          find: /^.*\/VPFlyout\.vue$/,
          replacement: fileURLToPath(
            new URL("../node_modules/@berachain/ui/Flyout.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/Sidebar.vue",
              import.meta.url
            )
          ),
        },
      ],
    },
  },
});
