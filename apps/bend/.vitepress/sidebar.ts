// Imports
// ========================================================
import { DefaultTheme } from "vitepress";
import { constants } from "@berachain/config/constants";

// Constants
// ========================================================
/**
 * UTM Source for Bend
 */
const UTMSOURCE = `?utm_source=${constants.websites.docsBend.utmSource}`;

/**
 * Sidebar Configuration
 */
const SIDEBAR = {
  /**
   * Main section for both the root / and /learn
   */
  LEARN: [
    {
      text: "Introduction To Bend",
      items: [
        { text: "What is Bend?", link: "/learn/" },
        {
          text: "Bend dApp",
          link: `${constants.websites.bend.url}${UTMSOURCE}`,
          target: "_blank",
          rel: "no-referrer"
        }
      ]
    },
    {
      text: "Concepts",
      items: [
        {
          text: "Market",
          items: [
            { text: "Overview", link: "/learn/concepts/market/" },
            { text: "Collateral, LTV & Health", link: "/learn/concepts/market/ltv" },
            { text: "Interest Rates", link: "/learn/concepts/market/interest-rates" },
            { text: "Public Allocator", link: "/learn/concepts/market/public-allocator" },
            { text: "Liquidation", link: "/learn/concepts/market/liquidation" }
          ]
        },
        {
          text: "Vault",
          items: [
            { text: "Overview", link: "/learn/concepts/vault/" },
            { text: "Yield & Fees", link: "/learn/concepts/vault/yield-fees" },
            {
              text: "Rewards For Lenders",
              link: "/learn/concepts/vault/rewards-for-lenders"
            }
          ]
        },
        { text: "Curator", link: "/learn/concepts/curator" },
        { text: "Oracle", link: "/learn/concepts/oracle" },
        { text: "Interest Rate Model", link: "/learn/concepts/irm" },
        { text: "Bundlers", link: "/learn/concepts/bundlers" },
        { text: "Flash Loans", link: "/learn/concepts/flashloans" }
      ]
    },
    {
      text: "Guides",
      items: [
        { text: "Deposit & Withdraw", link: "/learn/guides/deposit-withdraw" },
        { text: "Borrow & Repay", link: "/learn/guides/borrow-repay" }
      ]
    }
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "Bend For Developers",
      items: [
        { text: "Overview", link: "/developers/" },
        { text: "Deployed Contracts", link: "/developers/deployed-contracts" },
        { text: "Deployed Markets", link: "/developers/deployed-markets" },
        {
          text: `${constants.websites.bend.repositories.contracts.name}`,
          link: `${constants.websites.bend.repositories.contracts.url}${UTMSOURCE}`,
          target: "_blank",
          rel: "no-referrer"
        },
        {
          text: "BeraScan Block Explorer",
          link: `${constants.websites.berascan.url}${UTMSOURCE}`,
          target: "_blank",
          rel: "no-referrer"
        }
      ]
    },
    {
      text: "Onchain Tools",
      items: [
        { text: "Bundlers", link: "/developers/onchain/bundlers" },
        { text: "Public Allocator", link: "/developers/onchain/public-allocator" }
      ]
    },
    {
      text: "Contract References",
      items: [
        {
          text: "Morpho",
          link: "/developers/contracts/morpho"
        },
        {
          text: "Adaptive Curve IRM",
          link: "/developers/contracts/adaptive-curve-irm"
        },
        {
          text: "Bundler3",
          link: "/developers/contracts/bundler3"
        },
        {
          text: "General Adapter 1",
          link: "/developers/contracts/general-adapter-1"
        },
        {
          text: "Meta Morpho V1.1",
          link: "/developers/contracts/meta-morpho-v1_1"
        },
        {
          text: "Meta Morpho Factory V1.1",
          link: "/developers/contracts/meta-morpho-factory-v1_1"
        },
        {
          text: "Meta Fee Partitioner",
          link: "/developers/contracts/meta-fee-partitioner"
        },
        {
          text: "Public Allocator",
          link: "/developers/contracts/public-allocator"
        },
        {
          text: "Morpho Chainlink Oracle V2",
          link: "/developers/contracts/morpho-chainlink-oracle-v2"
        },
        {
          text: "Morpho Chainlink Oracle V2 Factory",
          link: "/developers/contracts/morpho-chainlink-oracle-v2-factory"
        },
        {
          text: "Universal Reward Distributer (URD)",
          link: "/developers/contracts/urd"
        },
        {
          text: "Universal Reward Distributer (URD) Factory",
          link: "/developers/contracts/urd-factory"
        }
      ]
    }
  ]
  /**
   * Main section for /curators
   */
  // CURATORS: [
  // ]
};

// Main Sidebar Configuration
// ========================================================
export const sidebar: DefaultTheme.Sidebar = {
  "/learn": SIDEBAR.LEARN,
  "/developers": SIDEBAR.DEVELOPERS
  // "/curators": SIDEBAR.CURATORS,
  // NOTE: This has to be the last in order to prevent it overriding all pages
  // "/": SIDEBAR.LEARN,
};
