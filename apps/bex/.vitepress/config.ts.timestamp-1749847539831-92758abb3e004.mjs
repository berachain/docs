// .vitepress/config.ts
import { defineConfig } from "file:///Users/camembearbera/src/docs/node_modules/.pnpm/vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@20.14.14_markdown-it-mathjax3@4.3.2_jujxaquvxknp2yfo4fe2jn7a4y/node_modules/vitepress/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
import markdownItConditionalRender from "file:///Users/camembearbera/src/docs/node_modules/.pnpm/markdown-it-conditional-render@0.1.0/node_modules/markdown-it-conditional-render/dist/index.cjs.js";

// .vitepress/sidebar.ts
import { constants } from "file:///Users/camembearbera/src/docs/packages/config/constants.js";
var SIDEBAR = {
  /**
   * Main section for both the root / and /learn
   */
  LEARN: [
    {
      text: "Introduction To BEX",
      items: [
        { text: "What is BEX?", link: "/learn/" },
        {
          text: "BEX dApp",
          link: `${constants.mainnet.dapps.bex.url}`,
          target: "_blank",
          rel: "no-referrer"
        }
      ]
    },
    {
      text: "Core Concepts",
      items: [
        { text: "AMMs", link: "/learn/concepts/amm" },
        { text: "Governance", link: "/learn/concepts/governance" },
        { text: "Vault", link: "/learn/concepts/vault" },
        {
          text: "Pools",
          link: "/learn/concepts/pools",
          items: [
            {
              text: "Weighted Pools",
              link: "/learn/concepts/pools/weighted-pools"
            },
            {
              text: "Stable Pools",
              link: "/learn/concepts/pools/stable-pools"
            }
          ]
        },
        { text: "Flash Loans", link: "/learn/concepts/flash-loans" }
      ]
    },
    {
      text: "User Guides",
      items: [
        { text: "Add Token Metadata", link: "/learn/guides/add-token" },
        { text: "Swaps", link: "/learn/guides/swaps" },
        { text: "Fees", link: "/learn/guides/fees" },
        {
          text: "Liquidity Provision",
          link: "/learn/guides/liquidity/intro",
          items: [
            { text: "Intro", link: "/learn/guides/liquidity/intro" },
            { text: "Proof of Liquidity", link: "/learn/guides/liquidity/pol" }
          ]
        },
        { text: "Pool Creation", link: "/learn/guides/pool-creation" },
        {
          text: "Pool Configuration",
          link: "/learn/guides/pool-configuration"
        }
      ]
    }
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "BEX For Devs",
      items: [{ text: "Deployed Contracts", link: "/developers/" }]
    },
    {
      text: "Contract References",
      items: [
        {
          text: "Vault Contract",
          link: "/developers/contracts/vault"
        },
        {
          text: "Query Contract",
          link: "/developers/contracts/query"
        },
        {
          text: "Pool Factory Contracts",
          items: [
            {
              text: "WeightedPoolFactory",
              link: "/developers/contracts/factory/weighted-pool-factory"
            },
            {
              text: "StablePoolFactory",
              link: "/developers/contracts/factory/stable-pool-factory"
            },
            {
              text: "PoolCreationHelper",
              link: "/developers/contracts/factory/pool-creation-helper"
            }
          ]
        }
      ]
    },
    {
      text: "Concepts",
      items: [
        {
          text: "Swaps",
          items: [
            {
              text: "Single Swap",
              link: "/developers/contracts/swaps/single_swap"
            },
            {
              text: "Batch Swap",
              link: "/developers/contracts/swaps/batch_swap"
            }
          ]
        },
        {
          text: "Pools",
          items: [
            {
              text: "Pool Interfacing",
              link: "/developers/contracts/pools/pool-interfacing.md"
            },
            {
              text: "Pool Joins",
              link: "/developers/contracts/pools/joins.md"
            },
            {
              text: "Pool Exits",
              link: "/developers/contracts/pools/exit.md"
            }
          ]
        },
        {
          text: "LP Tokens",
          items: [
            {
              text: "Underlying Tokens",
              link: "/developers/contracts/lp_tokens/underlying"
            },
            {
              text: "Valuing",
              link: "/developers/contracts/lp_tokens/valuing"
            }
          ]
        },
        {
          text: "Relayers",
          link: "/developers/contracts/relayers"
        }
      ]
    },
    {
      text: "Developer Guides",
      items: [
        {
          text: "Pool Creation",
          link: "/developers/guides/pool-creation"
        }
      ]
    },
    {
      text: "SDK",
      items: [
        { text: "Introduction", link: "/developers/sdk" },
        {
          text: "SDK API Reference",
          link: "/developers/sdk/reference"
        },
        {
          text: "SDK Guides",
          items: [
            { text: "Add Liquidity", link: "/developers/sdk/add-liquidity" },
            {
              text: "Remove Liquidity",
              link: "/developers/sdk/remove-liquidity"
            },
            { text: "Swap", link: "/developers/sdk/swap" },
            { text: "Smart Order Router", link: "/developers/sdk/sor" }
          ]
        }
      ]
    },
    {
      text: "Help",
      items: [
        {
          text: "Error Codes",
          link: "/developers/help/error-codes"
        }
      ]
    }
  ]
};
var sidebar = {
  "/learn": SIDEBAR.LEARN,
  "/developers": SIDEBAR.DEVELOPERS
  // NOTE: This has to be the last in order to prevent it overriding all pages
  // "/": SIDEBAR.LEARN,
};

// .vitepress/config.ts
import { constants as constants2 } from "file:///Users/camembearbera/src/docs/packages/config/constants.js";
import { vercelToolbar } from "file:///Users/camembearbera/src/docs/node_modules/.pnpm/@vercel+toolbar@0.1.30_vite@5.4.0/node_modules/@vercel/toolbar/dist/plugins/vite.js";
var __vite_injected_original_import_meta_url = "file:///Users/camembearbera/src/docs/apps/bex/.vitepress/config.ts";
var ENABLED_FLAGS = ["testnet", "mainnet"];
var IS_PRODUCTION = process.env.NODE_ENV === "production";
var config_default = defineConfig({
  title: `${constants2.websites.docsBex.name}`,
  description: `${constants2.websites.docsBex.description}`,
  cleanUrls: true,
  srcDir: "content",
  ignoreDeadLinks: true,
  head: [
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    [
      "meta",
      { name: "og:site_name", content: `${constants2.websites.docsBex.name}` }
    ],
    [
      "meta",
      {
        name: "og:image",
        content: `${constants2.websites.docsBex.url}/previewDocs.jpg`
      }
    ],
    [
      "script",
      { id: "va" },
      `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`
    ],
    IS_PRODUCTION ? ["script", { src: "/_vercel/insights/script.js", defer: "true" }] : [
      "meta",
      {
        name: "environment",
        content: "development"
      }
    ],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/assets/icon.svg" }]
  ],
  sitemap: {
    hostname: `${constants2.websites.docsBex.url}`
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
            text: `${constants2.websites.docsCore.name}`,
            link: `${constants2.websites.docsCore.url}`
          }
        ]
      },
      { text: "Learn", link: "learn/index", activeMatch: "/learn/" },
      {
        text: "Developers",
        link: "developers/index",
        activeMatch: "/developers/"
      }
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
    siteTitle: `\u{1F43B}\u26D3\uFE0F ${constants2.websites.docsBex.name}`,
    socialLinks: [
      { icon: "twitter", link: `${constants2.socials.twitter}` },
      { icon: "discord", link: `${constants2.socials.discord}` },
      { icon: "github", link: `${constants2.socials.github}` },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>'
        },
        link: `${constants2.socials.telegram}`,
        ariaLabel: "Berachain Portal"
      }
    ]
  },
  markdown: {
    math: true,
    config: (md) => {
      md.use(markdownItConditionalRender, {
        // This is where we check if the flag is enabled / disabled
        evaluate: function(condition, value) {
          let flag = condition.trim().toLowerCase();
          return ENABLED_FLAGS.includes(flag);
        }
      });
    }
  },
  vite: {
    plugins: [vercelToolbar()],
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL("../node_modules/@berachain/ui/NavBar.vue", __vite_injected_original_import_meta_url)
          )
        },
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavBarMenu.vue",
              __vite_injected_original_import_meta_url
            )
          )
        },
        {
          find: /^.*\/VPNavBarMenuLink\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavBarMenuLink.vue",
              __vite_injected_original_import_meta_url
            )
          )
        },
        {
          find: /^.*\/VPFlyout\.vue$/,
          replacement: fileURLToPath(
            new URL("../node_modules/@berachain/ui/Flyout.vue", __vite_injected_original_import_meta_url)
          )
        },
        {
          find: /^.*\/VPNavScreenMenuGroup\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/NavScreenMenuGroup.vue",
              __vite_injected_original_import_meta_url
            )
          )
        },
        {
          find: /^.*\/VPFlyout\.vue$/,
          replacement: fileURLToPath(
            new URL("../node_modules/@berachain/ui/Flyout.vue", __vite_injected_original_import_meta_url)
          )
        },
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/@berachain/ui/Sidebar.vue",
              __vite_injected_original_import_meta_url
            )
          )
        }
      ]
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiLnZpdGVwcmVzcy9zaWRlYmFyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2NhbWVtYmVhcmJlcmEvc3JjL2RvY3MvYXBwcy9iZXgvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NhbWVtYmVhcmJlcmEvc3JjL2RvY3MvYXBwcy9iZXgvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NhbWVtYmVhcmJlcmEvc3JjL2RvY3MvYXBwcy9iZXgvLnZpdGVwcmVzcy9jb25maWcudHNcIjsvLyBJbXBvcnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgbWFya2Rvd25JdENvbmRpdGlvbmFsUmVuZGVyIGZyb20gXCJtYXJrZG93bi1pdC1jb25kaXRpb25hbC1yZW5kZXJcIjtcbmltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwiLi9zaWRlYmFyXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tIFwiQGJlcmFjaGFpbi9jb25maWcvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2ZXJjZWxUb29sYmFyIH0gZnJvbSBcIkB2ZXJjZWwvdG9vbGJhci9wbHVnaW5zL3ZpdGVcIjtcblxuLy8gQ29uZmlnXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSU1QT1JUQU5UOiBUaGVzZSBmbGFncyB3aWxsIGVuYWJsZSAvIGRpc2FibGUgY2VydGFpbiBjb250ZW50IHNlY3Rpb25zIHRocm91Z2hvdXQgdGhlIGRvY3Ncbi8vIFRvIGJsb2NrIG1hcmtkb3duIGNvbnRlbnQgYmVoaW5kIGEgZmxhZywgd3JhcCBpdCBsaWtlIHNvOlxuLy8gOjppZiB0ZXN0bmV0XG4vLyA8eW91ciBjb250ZW50PlxuLy8gOjplbmRpZlxuY29uc3QgRU5BQkxFRF9GTEFHUyA9IFtcInRlc3RuZXRcIiwgXCJtYWlubmV0XCJdO1xuLyoqXG4gKlxuICovXG5jb25zdCBJU19QUk9EVUNUSU9OID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xuXG4vLyBNYWluIENvbmZpZ3VyYXRpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogYCR7Y29uc3RhbnRzLndlYnNpdGVzLmRvY3NCZXgubmFtZX1gLFxuICBkZXNjcmlwdGlvbjogYCR7Y29uc3RhbnRzLndlYnNpdGVzLmRvY3NCZXguZGVzY3JpcHRpb259YCxcbiAgY2xlYW5VcmxzOiB0cnVlLFxuICBzcmNEaXI6IFwiY29udGVudFwiLFxuICBpZ25vcmVEZWFkTGlua3M6IHRydWUsXG4gIGhlYWQ6IFtcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJvZzp0eXBlXCIsIGNvbnRlbnQ6IFwid2Vic2l0ZVwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm9nOmxvY2FsZVwiLCBjb250ZW50OiBcImVuXCIgfV0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7IG5hbWU6IFwib2c6c2l0ZV9uYW1lXCIsIGNvbnRlbnQ6IGAke2NvbnN0YW50cy53ZWJzaXRlcy5kb2NzQmV4Lm5hbWV9YCB9LFxuICAgIF0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwib2c6aW1hZ2VcIixcbiAgICAgICAgY29udGVudDogYCR7Y29uc3RhbnRzLndlYnNpdGVzLmRvY3NCZXgudXJsfS9wcmV2aWV3RG9jcy5qcGdgLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtcbiAgICAgIFwic2NyaXB0XCIsXG4gICAgICB7IGlkOiBcInZhXCIgfSxcbiAgICAgIGB3aW5kb3cudmEgPSB3aW5kb3cudmEgfHwgZnVuY3Rpb24gKCkgeyAod2luZG93LnZhcSA9IHdpbmRvdy52YXEgfHwgW10pLnB1c2goYXJndW1lbnRzKTsgfTtgLFxuICAgIF0sXG4gICAgSVNfUFJPRFVDVElPTlxuICAgICAgPyBbXCJzY3JpcHRcIiwgeyBzcmM6IFwiL192ZXJjZWwvaW5zaWdodHMvc2NyaXB0LmpzXCIsIGRlZmVyOiBcInRydWVcIiB9XVxuICAgICAgOiBbXG4gICAgICAgICAgXCJtZXRhXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJlbnZpcm9ubWVudFwiLFxuICAgICAgICAgICAgY29udGVudDogXCJkZXZlbG9wbWVudFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIHR5cGU6IFwiaW1hZ2Uvc3ZnK3htbFwiLCBocmVmOiBcIi9hc3NldHMvaWNvbi5zdmdcIiB9XSxcbiAgXSxcbiAgc2l0ZW1hcDoge1xuICAgIGhvc3RuYW1lOiBgJHtjb25zdGFudHMud2Vic2l0ZXMuZG9jc0JleC51cmx9YCxcbiAgfSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogXCJVcCBPbmx5XCIsXG4gICAgbmF2OiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IGA8c3BhbiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogNnB4O1wiPlxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29ucy10YWJsZXItb3V0bGluZSBpY29uLXRhYmxlci1ib29rXCI+XG4gICAgICAgICAgICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPlxuICAgICAgICAgICAgICA8cGF0aCBzdHlsZT1cInN0cm9rZTogdmFyKC0tdnAtYy1icmFuZC0xKTtcIiBkPVwiTTMgMTlhOSA5IDAgMCAxIDkgMGE5IDkgMCAwIDEgOSAwXCIgLz5cbiAgICAgICAgICAgICAgPHBhdGggc3R5bGU9XCJzdHJva2U6IHZhcigtLXZwLWMtYnJhbmQtMSk7XCIgZD1cIk0zIDZhOSA5IDAgMCAxIDkgMGE5IDkgMCAwIDEgOSAwXCIgLz5cbiAgICAgICAgICAgICAgPHBhdGggc3R5bGU9XCJzdHJva2U6IHZhcigtLXZwLWMtYnJhbmQtMSk7XCIgZD1cIk0zIDZsMCAxM1wiIC8+XG4gICAgICAgICAgICAgIDxwYXRoIHN0eWxlPVwic3Ryb2tlOiB2YXIoLS12cC1jLWJyYW5kLTEpO1wiIGQ9XCJNMTIgNmwwIDEzXCIgLz5cbiAgICAgICAgICAgICAgPHBhdGggc3R5bGU9XCJzdHJva2U6IHZhcigtLXZwLWMtYnJhbmQtMSk7XCIgZD1cIk0yMSA2bDAgMTNcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBNb3JlIERvY3NcbiAgICAgICAgICA8L3NwYW4+YCxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgJHtjb25zdGFudHMud2Vic2l0ZXMuZG9jc0NvcmUubmFtZX1gLFxuICAgICAgICAgICAgbGluazogYCR7Y29uc3RhbnRzLndlYnNpdGVzLmRvY3NDb3JlLnVybH1gLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgeyB0ZXh0OiBcIkxlYXJuXCIsIGxpbms6IFwibGVhcm4vaW5kZXhcIiwgYWN0aXZlTWF0Y2g6IFwiL2xlYXJuL1wiIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRGV2ZWxvcGVyc1wiLFxuICAgICAgICBsaW5rOiBcImRldmVsb3BlcnMvaW5kZXhcIixcbiAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL2RldmVsb3BlcnMvXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgb3V0bGluZTogWzIsIDNdLFxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6IFwibG9jYWxcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbWluaVNlYXJjaDoge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEB0eXBlIHtQaWNrPGltcG9ydCgnbWluaXNlYXJjaCcpLk9wdGlvbnMsICdleHRyYWN0RmllbGQnIHwgJ3Rva2VuaXplJyB8ICdwcm9jZXNzVGVybSc+fVxuICAgICAgICAgICAqL1xuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8qIC4uLiAqL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQHR5cGUge2ltcG9ydCgnbWluaXNlYXJjaCcpLlNlYXJjaE9wdGlvbnN9XG4gICAgICAgICAgICogQGRlZmF1bHRcbiAgICAgICAgICAgKiB7IGZ1enp5OiAwLjIsIHByZWZpeDogdHJ1ZSwgYm9vc3Q6IHsgdGl0bGU6IDQsIHRleHQ6IDIsIHRpdGxlczogMSB9IH1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBzZWFyY2hPcHRpb25zOiB7XG4gICAgICAgICAgICAvKiAuLi4gKi9cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBkZXRhaWxlZFZpZXc6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2lkZWJhcixcbiAgICBzaXRlVGl0bGU6IGBcdUQ4M0RcdURDM0JcdTI2RDNcdUZFMEYgJHtjb25zdGFudHMud2Vic2l0ZXMuZG9jc0JleC5uYW1lfWAsXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJ0d2l0dGVyXCIsIGxpbms6IGAke2NvbnN0YW50cy5zb2NpYWxzLnR3aXR0ZXJ9YCB9LFxuICAgICAgeyBpY29uOiBcImRpc2NvcmRcIiwgbGluazogYCR7Y29uc3RhbnRzLnNvY2lhbHMuZGlzY29yZH1gIH0sXG4gICAgICB7IGljb246IFwiZ2l0aHViXCIsIGxpbms6IGAke2NvbnN0YW50cy5zb2NpYWxzLmdpdGh1Yn1gIH0sXG4gICAgICB7XG4gICAgICAgIGljb246IHtcbiAgICAgICAgICBzdmc6ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItYnJhbmQtdGVsZWdyYW1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk0xNSAxMGwtNCA0bDYgNmw0IC0xNmwtMTggN2w0IDJsMiA2bDMgLTRcIiAvPjwvc3ZnPicsXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGAke2NvbnN0YW50cy5zb2NpYWxzLnRlbGVncmFtfWAsXG4gICAgICAgIGFyaWFMYWJlbDogXCJCZXJhY2hhaW4gUG9ydGFsXCIsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgbWF0aDogdHJ1ZSxcbiAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbWQudXNlKG1hcmtkb3duSXRDb25kaXRpb25hbFJlbmRlciwge1xuICAgICAgICAvLyBUaGlzIGlzIHdoZXJlIHdlIGNoZWNrIGlmIHRoZSBmbGFnIGlzIGVuYWJsZWQgLyBkaXNhYmxlZFxuICAgICAgICBldmFsdWF0ZTogZnVuY3Rpb24gKGNvbmRpdGlvbjogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgbGV0IGZsYWcgPSBjb25kaXRpb24udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgcmV0dXJuIEVOQUJMRURfRkxBR1MuaW5jbHVkZXMoZmxhZyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICB2aXRlOiB7XG4gICAgcGx1Z2luczogW3ZlcmNlbFRvb2xiYXIoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9eLipcXC9WUE5hdkJhclxcLnZ1ZSQvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgICAgbmV3IFVSTChcIi4uL25vZGVfbW9kdWxlcy9AYmVyYWNoYWluL3VpL05hdkJhci52dWVcIiwgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXi4qXFwvVlBOYXZCYXJNZW51XFwudnVlJC8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgICAgICBuZXcgVVJMKFxuICAgICAgICAgICAgICBcIi4uL25vZGVfbW9kdWxlcy9AYmVyYWNoYWluL3VpL05hdkJhck1lbnUudnVlXCIsXG4gICAgICAgICAgICAgIGltcG9ydC5tZXRhLnVybFxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXi4qXFwvVlBOYXZCYXJNZW51TGlua1xcLnZ1ZSQvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgICAgbmV3IFVSTChcbiAgICAgICAgICAgICAgXCIuLi9ub2RlX21vZHVsZXMvQGJlcmFjaGFpbi91aS9OYXZCYXJNZW51TGluay52dWVcIixcbiAgICAgICAgICAgICAgaW1wb3J0Lm1ldGEudXJsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9eLipcXC9WUEZseW91dFxcLnZ1ZSQvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgICAgbmV3IFVSTChcIi4uL25vZGVfbW9kdWxlcy9AYmVyYWNoYWluL3VpL0ZseW91dC52dWVcIiwgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXi4qXFwvVlBOYXZTY3JlZW5NZW51R3JvdXBcXC52dWUkLyxcbiAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcbiAgICAgICAgICAgIG5ldyBVUkwoXG4gICAgICAgICAgICAgIFwiLi4vbm9kZV9tb2R1bGVzL0BiZXJhY2hhaW4vdWkvTmF2U2NyZWVuTWVudUdyb3VwLnZ1ZVwiLFxuICAgICAgICAgICAgICBpbXBvcnQubWV0YS51cmxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL14uKlxcL1ZQRmx5b3V0XFwudnVlJC8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgICAgICBuZXcgVVJMKFwiLi4vbm9kZV9tb2R1bGVzL0BiZXJhY2hhaW4vdWkvRmx5b3V0LnZ1ZVwiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9eLipcXC9WUFNpZGViYXJcXC52dWUkLyxcbiAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcbiAgICAgICAgICAgIG5ldyBVUkwoXG4gICAgICAgICAgICAgIFwiLi4vbm9kZV9tb2R1bGVzL0BiZXJhY2hhaW4vdWkvU2lkZWJhci52dWVcIixcbiAgICAgICAgICAgICAgaW1wb3J0Lm1ldGEudXJsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2FtZW1iZWFyYmVyYS9zcmMvZG9jcy9hcHBzL2JleC8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY2FtZW1iZWFyYmVyYS9zcmMvZG9jcy9hcHBzL2JleC8udml0ZXByZXNzL3NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NhbWVtYmVhcmJlcmEvc3JjL2RvY3MvYXBwcy9iZXgvLnZpdGVwcmVzcy9zaWRlYmFyLnRzXCI7Ly8gSW1wb3J0c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCB7IERlZmF1bHRUaGVtZSB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcbmltcG9ydCB7IGNvbnN0YW50cyB9IGZyb20gXCJAYmVyYWNoYWluL2NvbmZpZy9jb25zdGFudHNcIjtcblxuLy8gQ29uc3RhbnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY29uc3QgU0lERUJBUiA9IHtcbiAgLyoqXG4gICAqIE1haW4gc2VjdGlvbiBmb3IgYm90aCB0aGUgcm9vdCAvIGFuZCAvbGVhcm5cbiAgICovXG4gIExFQVJOOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJJbnRyb2R1Y3Rpb24gVG8gQkVYXCIsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IHRleHQ6IFwiV2hhdCBpcyBCRVg/XCIsIGxpbms6IFwiL2xlYXJuL1wiIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkJFWCBkQXBwXCIsXG4gICAgICAgICAgbGluazogYCR7Y29uc3RhbnRzLm1haW5uZXQuZGFwcHMuYmV4LnVybH1gLFxuICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICByZWw6IFwibm8tcmVmZXJyZXJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkNvcmUgQ29uY2VwdHNcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogXCJBTU1zXCIsIGxpbms6IFwiL2xlYXJuL2NvbmNlcHRzL2FtbVwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJHb3Zlcm5hbmNlXCIsIGxpbms6IFwiL2xlYXJuL2NvbmNlcHRzL2dvdmVybmFuY2VcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiVmF1bHRcIiwgbGluazogXCIvbGVhcm4vY29uY2VwdHMvdmF1bHRcIiB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJQb29sc1wiLFxuICAgICAgICAgIGxpbms6IFwiL2xlYXJuL2NvbmNlcHRzL3Bvb2xzXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJXZWlnaHRlZCBQb29sc1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9sZWFybi9jb25jZXB0cy9wb29scy93ZWlnaHRlZC1wb29sc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJTdGFibGUgUG9vbHNcIixcbiAgICAgICAgICAgICAgbGluazogXCIvbGVhcm4vY29uY2VwdHMvcG9vbHMvc3RhYmxlLXBvb2xzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgdGV4dDogXCJGbGFzaCBMb2Fuc1wiLCBsaW5rOiBcIi9sZWFybi9jb25jZXB0cy9mbGFzaC1sb2Fuc1wiIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJVc2VyIEd1aWRlc1wiLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIkFkZCBUb2tlbiBNZXRhZGF0YVwiLCBsaW5rOiBcIi9sZWFybi9ndWlkZXMvYWRkLXRva2VuXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlN3YXBzXCIsIGxpbms6IFwiL2xlYXJuL2d1aWRlcy9zd2Fwc1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJGZWVzXCIsIGxpbms6IFwiL2xlYXJuL2d1aWRlcy9mZWVzXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiTGlxdWlkaXR5IFByb3Zpc2lvblwiLFxuICAgICAgICAgIGxpbms6IFwiL2xlYXJuL2d1aWRlcy9saXF1aWRpdHkvaW50cm9cIixcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiBcIkludHJvXCIsIGxpbms6IFwiL2xlYXJuL2d1aWRlcy9saXF1aWRpdHkvaW50cm9cIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIlByb29mIG9mIExpcXVpZGl0eVwiLCBsaW5rOiBcIi9sZWFybi9ndWlkZXMvbGlxdWlkaXR5L3BvbFwiIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlBvb2wgQ3JlYXRpb25cIiwgbGluazogXCIvbGVhcm4vZ3VpZGVzL3Bvb2wtY3JlYXRpb25cIiB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJQb29sIENvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICBsaW5rOiBcIi9sZWFybi9ndWlkZXMvcG9vbC1jb25maWd1cmF0aW9uXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG4gIC8qKlxuICAgKiBNYWluIHNlY3Rpb24gZm9yIC9kZXZlbG9wZXJzXG4gICAqL1xuICBERVZFTE9QRVJTOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJCRVggRm9yIERldnNcIixcbiAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkRlcGxveWVkIENvbnRyYWN0c1wiLCBsaW5rOiBcIi9kZXZlbG9wZXJzL1wiIH1dLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJDb250cmFjdCBSZWZlcmVuY2VzXCIsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJWYXVsdCBDb250cmFjdFwiLFxuICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvY29udHJhY3RzL3ZhdWx0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlF1ZXJ5IENvbnRyYWN0XCIsXG4gICAgICAgICAgbGluazogXCIvZGV2ZWxvcGVycy9jb250cmFjdHMvcXVlcnlcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiUG9vbCBGYWN0b3J5IENvbnRyYWN0c1wiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiV2VpZ2h0ZWRQb29sRmFjdG9yeVwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2NvbnRyYWN0cy9mYWN0b3J5L3dlaWdodGVkLXBvb2wtZmFjdG9yeVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJTdGFibGVQb29sRmFjdG9yeVwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2NvbnRyYWN0cy9mYWN0b3J5L3N0YWJsZS1wb29sLWZhY3RvcnlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiUG9vbENyZWF0aW9uSGVscGVyXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvY29udHJhY3RzL2ZhY3RvcnkvcG9vbC1jcmVhdGlvbi1oZWxwZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkNvbmNlcHRzXCIsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTd2Fwc1wiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiU2luZ2xlIFN3YXBcIixcbiAgICAgICAgICAgICAgbGluazogXCIvZGV2ZWxvcGVycy9jb250cmFjdHMvc3dhcHMvc2luZ2xlX3N3YXBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiQmF0Y2ggU3dhcFwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2NvbnRyYWN0cy9zd2Fwcy9iYXRjaF9zd2FwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlBvb2xzXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJQb29sIEludGVyZmFjaW5nXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvY29udHJhY3RzL3Bvb2xzL3Bvb2wtaW50ZXJmYWNpbmcubWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiUG9vbCBKb2luc1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2NvbnRyYWN0cy9wb29scy9qb2lucy5tZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJQb29sIEV4aXRzXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvY29udHJhY3RzL3Bvb2xzL2V4aXQubWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiTFAgVG9rZW5zXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJVbmRlcmx5aW5nIFRva2Vuc1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2NvbnRyYWN0cy9scF90b2tlbnMvdW5kZXJseWluZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJWYWx1aW5nXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvY29udHJhY3RzL2xwX3Rva2Vucy92YWx1aW5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlJlbGF5ZXJzXCIsXG4gICAgICAgICAgbGluazogXCIvZGV2ZWxvcGVycy9jb250cmFjdHMvcmVsYXllcnNcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkRldmVsb3BlciBHdWlkZXNcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlBvb2wgQ3JlYXRpb25cIixcbiAgICAgICAgICBsaW5rOiBcIi9kZXZlbG9wZXJzL2d1aWRlcy9wb29sLWNyZWF0aW9uXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJTREtcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogXCJJbnRyb2R1Y3Rpb25cIiwgbGluazogXCIvZGV2ZWxvcGVycy9zZGtcIiB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTREsgQVBJIFJlZmVyZW5jZVwiLFxuICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvc2RrL3JlZmVyZW5jZVwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTREsgR3VpZGVzXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogXCJBZGQgTGlxdWlkaXR5XCIsIGxpbms6IFwiL2RldmVsb3BlcnMvc2RrL2FkZC1saXF1aWRpdHlcIiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIlJlbW92ZSBMaXF1aWRpdHlcIixcbiAgICAgICAgICAgICAgbGluazogXCIvZGV2ZWxvcGVycy9zZGsvcmVtb3ZlLWxpcXVpZGl0eVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJTd2FwXCIsIGxpbms6IFwiL2RldmVsb3BlcnMvc2RrL3N3YXBcIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIlNtYXJ0IE9yZGVyIFJvdXRlclwiLCBsaW5rOiBcIi9kZXZlbG9wZXJzL3Nkay9zb3JcIiB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJIZWxwXCIsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJFcnJvciBDb2Rlc1wiLFxuICAgICAgICAgIGxpbms6IFwiL2RldmVsb3BlcnMvaGVscC9lcnJvci1jb2Rlc1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufTtcblxuLy8gTWFpbiBTaWRlYmFyIENvbmZpZ3VyYXRpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5leHBvcnQgY29uc3Qgc2lkZWJhcjogRGVmYXVsdFRoZW1lLlNpZGViYXIgPSB7XG4gIFwiL2xlYXJuXCI6IFNJREVCQVIuTEVBUk4sXG4gIFwiL2RldmVsb3BlcnNcIjogU0lERUJBUi5ERVZFTE9QRVJTLFxuICAvLyBOT1RFOiBUaGlzIGhhcyB0byBiZSB0aGUgbGFzdCBpbiBvcmRlciB0byBwcmV2ZW50IGl0IG92ZXJyaWRpbmcgYWxsIHBhZ2VzXG4gIC8vIFwiL1wiOiBTSURFQkFSLkxFQVJOLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLGlDQUFpQzs7O0FDRHhDLFNBQVMsaUJBQWlCO0FBSTFCLElBQU0sVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSWQsT0FBTztBQUFBLElBQ0w7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxVQUFVO0FBQUEsUUFDeEM7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU0sR0FBRyxVQUFVLFFBQVEsTUFBTSxJQUFJLEdBQUc7QUFBQSxVQUN4QyxRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLFFBQVEsTUFBTSxzQkFBc0I7QUFBQSxRQUM1QyxFQUFFLE1BQU0sY0FBYyxNQUFNLDZCQUE2QjtBQUFBLFFBQ3pELEVBQUUsTUFBTSxTQUFTLE1BQU0sd0JBQXdCO0FBQUEsUUFDL0M7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEVBQUUsTUFBTSxlQUFlLE1BQU0sOEJBQThCO0FBQUEsTUFDN0Q7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLHNCQUFzQixNQUFNLDBCQUEwQjtBQUFBLFFBQzlELEVBQUUsTUFBTSxTQUFTLE1BQU0sc0JBQXNCO0FBQUEsUUFDN0MsRUFBRSxNQUFNLFFBQVEsTUFBTSxxQkFBcUI7QUFBQSxRQUMzQztBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0wsRUFBRSxNQUFNLFNBQVMsTUFBTSxnQ0FBZ0M7QUFBQSxZQUN2RCxFQUFFLE1BQU0sc0JBQXNCLE1BQU0sOEJBQThCO0FBQUEsVUFDcEU7QUFBQSxRQUNGO0FBQUEsUUFDQSxFQUFFLE1BQU0saUJBQWlCLE1BQU0sOEJBQThCO0FBQUEsUUFDN0Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxZQUFZO0FBQUEsSUFDVjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTyxDQUFDLEVBQUUsTUFBTSxzQkFBc0IsTUFBTSxlQUFlLENBQUM7QUFBQSxJQUM5RDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFD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UixNQUFNO0FBQUEsSUFDTixRQUFRLENBQUMsT0FBTztBQUVkLFNBQUcsSUFBSSw2QkFBNkI7QUFBQTtBQUFBLFFBRWxDLFVBQVUsU0FBVSxXQUFtQixPQUFZO0FBQ2pELGNBQUksT0FBTyxVQUFVLEtBQUssRUFBRSxZQUFZO0FBQ3hDLGlCQUFPLGNBQWMsU0FBUyxJQUFJO0FBQUEsUUFDcEM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUFBLElBQ3pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsWUFDWCxJQUFJLElBQUksNENBQTRDLHdDQUFlO0FBQUEsVUFDckU7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFlBQ1gsSUFBSTtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFlBQ1gsSUFBSTtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFlBQ1gsSUFBSSxJQUFJLDRDQUE0Qyx3Q0FBZTtBQUFBLFVBQ3JFO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxZQUNYLElBQUk7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxZQUNYLElBQUksSUFBSSw0Q0FBNEMsd0NBQWU7QUFBQSxVQUNyRTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsWUFDWCxJQUFJO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJjb25zdGFudHMiLCAiY29uc3RhbnRzIl0KfQo=
