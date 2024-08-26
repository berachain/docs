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
      text: "Introduction",
      items: [
        { text: "What Is Bend?", link: "/learn/" },
        {
          text: "How Does Bend Work?",
          link: "/learn/how-does-bend-work",
        },
        {
          text: "Bend & Proof Of Liquidity",
          link: "/learn/bend-and-pol",
        },
        {
          text: `${constants.testnet.dapps.bend.name}`,
          link: `${constants.testnet.dapps.bend.url}`,
          target: "_blank",
          rel: "no-referrer",
        },
      ],
    },
    {
      text: "Bend (Lending Protocol)",
      items: [
        {
          text: "Bend Overview",
          link: "/learn/lending-protocol/overview",
        },
        {
          text: "Tokens",
          link: "/learn/lending-protocol/tokens",
        },

        {
          text: "Interest Rates",
          link: "/learn/lending-protocol/interest-rates",
        },
        { text: "Liquidations", link: "/learn/lending-protocol/liquidations" },
        {
          text: "Bend Rewards",
          link: "/learn/lending-protocol/bend-rewards",
        },
        { text: "Bend FAQs", link: "/learn/lending-protocol/bend-faqs" },
      ],
    },

    {
      text: "User Guides",
      items: [
        {
          text: "Borrowing",
          items: [
            {
              text: "Deposit Collateral",
              link: "/learn/guides/depositing-collateral",
            },
            {
              text: "Borrow & Repay",
              link: "/learn/guides/borrowing-and-repaying-honey",
            },
            {
              text: "Withdraw Collateral",
              link: "/learn/guides/withdraw-collateral",
            },
            {
              text: "Claim $BGT",
              link: "/learn/guides/claim-bgt",
            },
          ],
        },
        {
          text: "Supplying $HONEY",
          items: [
            {
              text: "Supplying",
              link: "/learn/guides/supply-honey",
            },
            {
              text: "Withdrawing",
              link: "/learn/guides/withdraw-honey",
            },
          ],
        },
      ],
    },

    {
      text: "Help",
      items: [
        {
          text: "Glossary",
          link: "/learn/help/glossary",
        },
      ],
    },
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "Bend For Developers",

      items: [
        {
          text: "Overview",
          link: "/developers/",
        },
        {
          text: "Pool Contract",
          link: "/developers/pool-logic",
        },
        {
          text: "Governance",
          link: "/developers/governance",
        },
        {
          text: "Deployed Contracts",
          link: "/developers/deployed-contracts",
        },
      ],
    },
    {
      text: "Contracts References",
      items: [
        { text: "AToken", link: "/developers/contracts/atoken" },
        { text: "VariableDebtToken", link: "/developers/contracts/debttoken" },
        {
          text: "PoolDataProvider",
          link: "/developers/contracts/pooldataprovider",
        },
        { text: "Oracle", link: "/developers/contracts/oracle" },
        { text: "Pool", link: "/developers/contracts/pool" },
        {
          text: "PoolAddressesProvider",
          link: "/developers/contracts/pooladdressesprovider",
        },
      ],
    },

    {
      text: "Developer Guides",
      items: [
        {
          text: "Delegate Credit",
          link: "/developers/guides/delegate-credits",
        },

        {
          text: "Liquidations",
          link: "/developers/guides/liquidate-loan",
        },

        {
          text: "Interest Rates",
          link: "/developers/guides/retrieve-interest-rates",
        },

        {
          text: "Repay Loan",
          link: "/developers/guides/repay-loan",
        },

        {
          text: "Retrieve Loan Health",
          link: "/developers/guides/retrieve-loan-health",
        },
      ],
    },

    {
      text: "Help",
      items: [
        {
          text: "Error Codes",
          link: "/developers/help/",
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
  "/": SIDEBAR.LEARN,
};
