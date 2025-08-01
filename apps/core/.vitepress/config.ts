// Imports
// ========================================================
import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import markdownItConditionalRender from "markdown-it-conditional-render";
import { sidebar } from "./sidebar";
import { constants } from "@berachain/config/constants";
import { vercelToolbar } from "@vercel/toolbar/plugins/vite";
import { withMermaid } from "vitepress-plugin-mermaid";
import llmsTxt from "vitepress-plugin-llms";

// Config
// ========================================================
// IMPORTANT: These flags will enable / disable certain content sections throughout the docs
// To block markdown content behind a flag, wrap it like so:
// ::if testnet
// <your content>
// ::endif
const ENABLED_FLAGS = ["testnet", "mainnet"];
/**
 *
 */
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Main Configuration
// ========================================================
// https://vitepress.dev/reference/site-config
const config = withMermaid(
  defineConfig({
    title: `${constants.websites.docsCore.name}`,
    description: `${constants.websites.docsCore.description}`,
    cleanUrls: true,
    srcDir: "content",
    ignoreDeadLinks: true,
    head: [
      ["meta", { name: "og:type", content: "website" }],
      ["meta", { name: "og:locale", content: "en" }],
      [
        "meta",
        {
          name: "og:site_name",
          content: `${constants.websites.docsCore.name}`
        }
      ],
      [
        "meta",
        {
          name: "og:image",
          content: `${constants.websites.docsCore.url}/previewDocs.jpg`
        }
      ],
      [
        "script",
        { id: "va" },
        `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`
      ],
      IS_PRODUCTION
        ? ["script", { src: "/_vercel/insights/script.js", defer: "true" }]
        : [
            "meta",
            {
              name: "environment",
              content: "development"
            }
          ],
      ["link", { rel: "icon", type: "image/svg+xml", href: "/assets/icon.svg" }]
    ],
    sitemap: {
      hostname: `${constants.websites.docsCore.url}`
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
              text: `${constants.websites.docsBex.name}`,
              link: `${constants.websites.docsBex.url}`
            }
          ]
        },
        { text: "Learn", link: "learn/index", activeMatch: "/learn/" },
        {
          text: "Developers",
          link: "developers/index",
          activeMatch: "/developers/"
        },
        { text: "Run A Node", link: "nodes/index", activeMatch: "/nodes/" }
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
            }
          },
          detailedView: true
        }
      },
      sidebar,
      siteTitle: `🐻⛓️ ${constants.websites.docsCore.name}`,
      socialLinks: [
        { icon: "twitter", link: `${constants.socials.twitter}` },
        { icon: "discord", link: `${constants.socials.discord}` },
        { icon: "github", link: `${constants.socials.github}` },
        {
          icon: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>'
          },
          link: `${constants.socials.telegram}`,
          ariaLabel: "Berachain Portal"
        }
      ]
    },
    markdown: {
      math: true,
      config: (md) => {
        // @ts-ignore
        md.use(markdownItConditionalRender, {
          // This is where we check if the flag is enabled / disabled
          evaluate: function (condition: string, value: any) {
            let flag = condition.trim().toLowerCase();
            return ENABLED_FLAGS.includes(flag);
          }
        });
      }
    },
    vite: {
      plugins: [vercelToolbar(), llmsTxt()],
      resolve: {
        alias: [
          {
            find: /^.*\/VPNavBar\.vue$/,
            replacement: fileURLToPath(
              new URL("../node_modules/@berachain/ui/NavBar.vue", import.meta.url)
            )
          },
          {
            find: /^.*\/VPNavBarMenu\.vue$/,
            replacement: fileURLToPath(
              new URL("../node_modules/@berachain/ui/NavBarMenu.vue", import.meta.url)
            )
          },
          {
            find: /^.*\/VPNavBarMenuLink\.vue$/,
            replacement: fileURLToPath(
              new URL("../node_modules/@berachain/ui/NavBarMenuLink.vue", import.meta.url)
            )
          },
          {
            find: /^.*\/VPFlyout\.vue$/,
            replacement: fileURLToPath(
              new URL("../node_modules/@berachain/ui/Flyout.vue", import.meta.url)
            )
          },
          {
            find: /^.*\/VPNavScreenMenuGroup\.vue$/,
            replacement: fileURLToPath(
              new URL(
                "../node_modules/@berachain/ui/NavScreenMenuGroup.vue",
                import.meta.url
              )
            )
          },
          {
            find: /^.*\/VPSidebar\.vue$/,
            replacement: fileURLToPath(
              new URL("../node_modules/@berachain/ui/Sidebar.vue", import.meta.url)
            )
          }
        ]
      }
    }
  })
);

// Override optimizeDeps after withMermaid adds its dependencies
// Only include mermaid to avoid resolution issues with transitive deps
if (config.vite?.optimizeDeps) {
  config.vite.optimizeDeps.include = ["mermaid"];
}

export default config;
