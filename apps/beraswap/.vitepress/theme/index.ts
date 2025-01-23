// Imports
// ========================================================
import { h, onMounted } from "vue";
import DefaultTheme from "vitepress/theme";
import Fidget from "@berachain/ui/Fidget";
import "@berachain/ui/style";
import { mountVercelToolbar } from "@vercel/toolbar/vite";

// Theme Configuration
// ========================================================
export default {
  extends: DefaultTheme,
  Layout: () => {
    // Mount the Vercel toolbar when the component is mounted
    onMounted(() => {
      mountVercelToolbar();
    });

    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // TODO: remove at mainnet launch
      "doc-before": () =>
        h(
          "div",
          {
            class: "custom-block warning",
            style: "margin-bottom: 10px;",
          },
          [
            h(
              "p",
              {
                class: "custom-block-title",
              },
              "🚧 Under Construction"
            ),
            h(
              "p",
              {
                class: "",
              },
              "Documentation is currently under development. Some pages/links may be incomplete or subject to change."
            ),
          ]
        ),
      "sidebar-nav-after": () => h(Fidget),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Extended here
  },
};
