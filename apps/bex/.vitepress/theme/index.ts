// Imports
// ========================================================
import { h, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Fidget from '@berachain/ui/Fidget';
import '@berachain/ui/style';
import { mountVercelToolbar } from '@vercel/toolbar/vite';

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
      'sidebar-nav-after': () => h(Fidget)
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Extended here
  }
};
