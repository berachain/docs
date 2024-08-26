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
      text: "Intro To Berachain Berps",
      items: [
        { text: "What Is Berachain Berps?", link: "/learn/" },
        { text: "How Does Berps Work?", link: "/learn/how-berps-works" },
        {
          text: "Berps & Proof Of Liquidity",
          link: "/learn/berps-proof-of-liquidity",
        },
        {
          text: `${constants.testnet.dapps.berps.name}`,
          link: `${constants.testnet.dapps.berps.url}`,
          target: "_blank",
          rel: "no-referrer",
        },
      ],
    },
    {
      text: "Berps (Leverage Trading)",
      items: [
        { text: "Berps Overview", link: "/learn/leveraged-trading/" },
        { text: "Trades", link: "/learn/leveraged-trading/trades" },
        {
          text: "One-Click Trading",
          link: "/learn/leveraged-trading/one-click-trading",
        },
        {
          text: "Listed Assets",
          link: "/learn/leveraged-trading/listed-assets",
        },
        { text: "Fees & Spread", link: "/learn/leveraged-trading/fees-spread" },
      ],
    },
    {
      text: "Berps Portfolio",
      items: [{ text: "Portfolio Overview", link: "/learn/portfolio/" }],
    },
    {
      text: "Berps Vault",
      items: [
        { text: "Berps Vault Overview", link: "/learn/vault/" },
        {
          text: "Tokens",
          items: [
            { text: "$HONEY", link: "/learn/tokens/honey" },
            { text: "$bHONEY", link: "/learn/tokens/bhoney" },
            { text: "$BGT", link: "/learn/tokens/bgt" },
          ],
        },
        {
          text: "Depositing & Withdrawing $HONEY",
          link: "/learn/vault/depositing-withdrawing-honey",
        },
        { text: "Vault Rewards", link: "/learn/vault/rewards" },
      ],
    },
    {
      text: "Berps Leaderboard",
      items: [
        {
          text: "Leaderboard Overview",
          link: "/learn/leaderboard/",
        },
      ],
    },
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "Berachain Berps For Devs",
      items: [
        { text: "Berps Architecture Overview", link: "/developers/" },
        { text: "Deployed Contracts", link: "/developers/deployed-contracts" },
      ],
    },
    {
      text: "Berachain Oracle",
      items: [
        {
          text: "Berps Pricing Oracle",
          link: "/developers/oracle/",
        },
      ],
    },
    {
      text: "Bots",
      items: [
        { text: "Bots Overview", link: "/developers/bots/" },
        { text: "Bot Rewards", link: "/developers/bots/rewards" },
        { text: "Delegation", link: "/developers/bots/delegation" },
        { text: "Multicall", link: "/developers/bots/multicall" },
        {
          text: "Simple Trading Bot Guide",
          link: "/developers/guides/trading-bot",
        },
      ],
    },
    {
      text: "Developer Guides",
      items: [
        { text: "Price Updates", link: "/developers/guides/fetch-price" },
        { text: "Open Trade", link: "/developers/guides/open-trade" },
        { text: "Limit Orders", link: "/developers/guides/limit-order" },
        { text: "Close Trade", link: "/developers/guides/close-trade" },
        {
          text: "Evaluate Trade Impact",
          link: "/developers/guides/trade-impact",
        },
        { text: "Liquidations", link: "/developers/guides/liquidations" },
      ],
    },
    {
      text: "Contracts References",
      items: [
        { text: "Entrypoint", link: "/developers/contracts/entrypoint" },
        { text: "Vault", link: "/developers/contracts/vault" },
        { text: "FeesMarkets", link: "/developers/contracts/fees-markets" },
        { text: "FeesAccrued", link: "/developers/contracts/fees-accrued" },
        { text: "Orders", link: "/developers/contracts/orders" },
        { text: "Markets", link: "/developers/contracts/markets" },
      ],
    },
    {
      text: "Developer Help",
      items: [
        {
          text: "Error Codes",
          link: "/developers/errors/",
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
