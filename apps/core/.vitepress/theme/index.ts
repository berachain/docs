// Imports
// ========================================================
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import Fidget from "@berachain/ui/Fidget";
import "@berachain/ui/style";

// Theme Configuration
// ========================================================
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "sidebar-nav-after": () => h(Fidget),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Extended here
  },
};
