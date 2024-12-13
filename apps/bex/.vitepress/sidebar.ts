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
        { text: "Vault", link: "/learn/concepts/vault" },
        {
          text: "Pools",
          link: "/learn/concepts/pools",
          items: [
            {
              text: "Weighted Pools",
              link: "/learn/concepts/pools/weighted-pools",
            },
            {
              text: "Stable Pools",
              link: "/learn/concepts/pools/stable-pools",
            },
          ],
        },
        { text: "Flash Loans", link: "/learn/concepts/flash-loans" },
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
        {
          text: "Pool Configuration",
          link: "/learn/guides/pool-configuration",
        },
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
        { text: "Migration Guide", link: "/developers/migration-guide" },
      ],
    },
    {
      text: "Contract References",
      items: [
        {
          text: "Vault Contract",
          link: "/developers/contracts/vault",
        },
        {
          text: "Query Contract",
          link: "/developers/contracts/query",
        },
        {
          text: "Pool Factory Contracts",
          items: [
            {
              text: "WeightedPoolFactory",
              link: "/developers/contracts/factory/weighted-pool-factory",
            },
            {
              text: "StablePoolFactory",
              link: "/developers/contracts/factory/stable-pool-factory",
            },
            {
              text: "PoolCreationHelper",
              link: "/developers/contracts/factory/pool-creation-helper",
            },
          ],
        },
      ],
    },
    {
      text: "Concepts",
      items: [
        {
          text: "Swaps",
          items: [
            {
              text: "Single Swap",
              link: "/developers/contracts/swaps/single_swap",
            },
            {
              text: "Batch Swap",
              link: "/developers/contracts/swaps/batch_swap",
            },
          ],
        },
        {
          text: "Pools",
          items: [
            {
              text: "Pool Interfacing",
              link: "/developers/contracts/pools/pool-interfacing.md",
            },
            {
              text: "Pool Joins",
              link: "/developers/contracts/pools/joins.md",
            },
            {
              text: "Pool Exits",
              link: "/developers/contracts/pools/exit.md",
            },
          ],
        },
        {
          text: "LP Tokens",
          items: [
            {
              text: "Underlying Tokens",
              link: "/developers/contracts/lp_tokens/underlying",
            },
            {
              text: "Valuing",
              link: "/developers/contracts/lp_tokens/valuing",
            },
          ],
        },
        {
          text: "Relayers",
          link: "/developers/contracts/relayers",
        },
      ],
    },
    {
      text: "Developer Guides",
      items: [
        {
          text: "Pool Creation",
          link: "/developers/guides/pool-creation",
        },
      ],
    },
    {
      text: "SDK",
      items: [
        { text: "Introduction", link: "/developers/sdk" },
        {
          text: "SDK API Reference",
          link: "/developers/sdk/reference",
        },
        {
          text: "SDK Guides",
          items: [
            { text: "Add Liquidity", link: "/developers/sdk/add-liquidity" },
            {
              text: "Remove Liquidity",
              link: "/developers/sdk/remove-liquidity",
            },
            { text: "Swap", link: "/developers/sdk/swap" },
            { text: "Smart Order Router", link: "/developers/sdk/sor" },
          ],
        },
      ],
    },
    {
      text: "Help",
      items: [
        {
          text: "Error Codes",
          link: "/developers/help/error-codes",
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
  // NOTE: This has to be the last in order to prevent it overriding all pages
  // "/": SIDEBAR.LEARN,
};
