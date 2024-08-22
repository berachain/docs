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
  LEARN: [
    {
      text: "Introduction To BEX",
      items: [
        { text: "What is BEX?", link: "/learn/" },
        {
          text: "BEX dApp",
          link: `${constants.testnet.dapps.bex.url}`,
          target: "_blank",
          rel: "no-referrer",
        },
      ],
    },
    {
      text: "Core Concepts",
      items: [
        { text: "AMMs", link: "/learn/concepts/amm" },
        { text: "Governance", link: "/learn/concepts/governance" },
      ],
    },
    {
      text: "User Guides",
      items: [
        { text: "Swaps", link: "/learn/guides/swaps" },
        { text: "Fees", link: "/learn/guides/fees" },
        {
          text: "Liquidity Provision",
          link: "/learn/guides/liquidity/intro",
          items: [
            { text: "Intro", link: "/learn/guides/liquidity/intro" },
            { text: "Proof of Liquidity", link: "/learn/guides/liquidity/pol" },
          ],
        },
        { text: "Pool Creation", link: "/learn/guides/pool-creation" },
      ],
    },
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "Berachain BEX For Devs",
      items: [
        { text: "Deployed Contracts", link: "/developers/" },
        { text: "Type Conventions", link: "/developers/type-conventions" },
      ],
    },
    {
      text: "Advanced Concepts",
      items: [
        {
          text: "Surplus Collateral",
          link: "/developers/advanced-concepts/surplus-collateral",
        },
        {
          text: "Permissioned Pools",
          link: "/developers/advanced-concepts/permissioned-pools",
        },
        {
          text: "Account Abstraction",
          link: "/developers/advanced-concepts/aa",
        },
        {
          text: "External Routers",
          link: "/developers/advanced-concepts/external-routers",
        },
      ],
    },
    {
      text: "Contracts References",
      items: [
        {
          text: "DEX Contract",
          link: "/developers/contracts/dex",
          items: [
            {
              text: "DEX Interface",
              link: "/developers/contracts/dex",
            },
            {
              text: "Using userCmd",
              link: "/developers/contracts/usercmd",
              items: [
                { text: "Swaps", link: "/developers/contracts/swaps" },
                {
                  text: "LP Operations",
                  link: "/developers/contracts/lp-operations",
                },
                {
                  text: "Surplus Collateral",
                  link: "/developers/contracts/surplus-collateral",
                },
                {
                  text: "Relayer Calls",
                  link: "/developers/contracts/relayer-calls",
                },
                {
                  text: "MultiPath Calls",
                  link: "/developers/contracts/multipath",
                },
              ],
            },
          ],
        },

        {
          text: "Query Contracts",
          link: "/developers/query-contracts/",
          items: [
            { text: "CrocQuery", link: "/developers/query-contracts/query" },
            { text: "CrocImpact", link: "/developers/query-contracts/impact" },
          ],
        },
      ],
    },
    {
      text: "Developer Guides",
      items: [
        { text: "Multiswap Router", link: "/developers/guides/multiswap" },
        { text: "MultiPath", link: "/developers/guides/multipath-example" },
        {
          text: "CrocQuery",
          link: "/developers/guides/query-example",
        },
      ],
    },
  ],
};

// Main Sidebar Configuration
// ========================================================
export const sidebar: DefaultTheme.Sidebar = {
  "/learn": SIDEBAR.LEARN,
  "/developers": SIDEBAR.DEVELOPERS,
  "/": SIDEBAR.LEARN,
};
