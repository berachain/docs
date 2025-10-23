// Imports
// ========================================================
import { DefaultTheme } from "vitepress";
import { constants } from "@berachain/config/constants";

// Constants
// ========================================================
const SIDEBAR = {
  /**
   * Main section for both the root / and /learn
   */
  LEARN: []
};

// Main Sidebar Configuration
// ========================================================
export const sidebar: DefaultTheme.Sidebar = {
  // "/learn": SIDEBAR.LEARN,
  // "/developers": SIDEBAR.DEVELOPERS
  // NOTE: This has to be the last in order to prevent it overriding all pages
  // "/": SIDEBAR.LEARN,
};
