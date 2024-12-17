// Imports
// ========================================================
import { DefaultTheme } from "vitepress";
import { constants } from "@berachain/config/constants";

// Constants
// ========================================================
const SIDEBAR = {
  LEARN: [
    {
      text: "Introduction",
      items: [
        { text: "Coming Soon", link: "/" },
      ],
    },
  ],
};

// Main Sidebar Configuration
// ========================================================
export const sidebar: DefaultTheme.Sidebar = {
  "/": SIDEBAR.LEARN,
};
