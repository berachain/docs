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
      text: "Introduction to Berachain",
      items: [
        { text: "What Is Berachain?", link: "/learn/" },
        {
          text: "What Is Proof-of-Liquidity?",
          link: "/learn/what-is-proof-of-liquidity",
        },
        { text: "What Is BeaconKit?", link: "/learn/what-is-beaconkit" },
        { text: "Connect To Berachain", link: "/learn/connect-to-berachain" },
        { text: "How To Get $BERA", link: "/learn/how-to-get-bera" },
      ],
    },
    {
      text: "Berachain Testnet",
      items: [
        {
          text: "Berachain Testnet V1 vs V2",
          link: "/learn/testnet/berachain-testnet-v1-vs-v2",
        },
      ],
    },
    {
      text: "Proof-of-Liquidity",
      items: [
        { text: "PoL Overview", link: "/learn/pol/" },
        { text: "Participants", link: "/learn/pol/participants" },
        { text: "Reward Vaults", link: "/learn/pol/rewardvaults" },
        { text: "Incentives", link: "/learn/pol/incentives" },
        {
          text: "Tokens",
          items: [
            { text: "$BERA", link: "/learn/pol/tokens/bera" },
            { text: "$BGT", link: "/learn/pol/tokens/bgt" },
            { text: "$HONEY", link: "/learn/pol/tokens/honey" },
          ],
        },
        { text: "PoL FAQs", link: "/learn/pol/faqs" },
      ],
    },
    {
      text: "Native dApps",
      items: [
        { text: "BEX", link: "/learn/dapps/bex" },
        { text: "Bend", link: "/learn/dapps/bend" },
        { text: "Berps", link: "/learn/dapps/berps" },
        { text: "BGT Station", link: "/learn/dapps/bgt-station" },
        { text: "Faucet", link: "/learn/dapps/faucet" },
        { text: "Honey Swap", link: "/learn/dapps/honey-swap" },
        {
          text: `${constants.testnet.dapps.beratrail.name}`,
          link: `/learn/dapps/beratrail`,
        },
      ],
    },
    {
      text: "Help",
      items: [
        { text: "FAQs", link: "/learn/help/faqs" },
        { text: "Glossary", link: "/learn/help/glossary" },
      ],
    },
  ],
  /**
   * Main section for /developers
   */
  DEVELOPERS: [
    {
      text: "Berachain For Developers",
      items: [
        { text: "PoL Architecture Overview", link: "/developers/" },
        {
          text: "Network Configurations",
          link: "/developers/network-configurations",
        },
        { text: "Deployed Contracts", link: "/developers/deployed-contracts" },
        { text: "Developer Tools", link: "/developers/developer-tools" },
        {
          text: `${constants.testnet.dapps.beratrail.name}`,
          link: `${constants.testnet.dapps.beratrail.url}`,
          target: "_blank",
          rel: "no-referrer",
        },
        {
          text: `${constants.testnet.dapps.faucet.name}`,
          link: `${constants.testnet.dapps.faucet.url}`,
          target: "_blank",
          rel: "no-referrer",
        },
      ],
    },
    {
      text: "Developer Quickstart",
      items: [
        { text: "Build A Smart Contract", link: "/developers/quickstart/" },
        { text: "Build A Frontend", link: "/developers/quickstart/frontend" },
      ],
    },
    {
      text: "Developer Guides",
      items: [
        {
          text: "Create HelloWorld Contract Using Hardhat",
          link: "/developers/guides/create-helloworld-contract-using-hardhat",
        },
        {
          text: "Create ERC-20 Contract Using Foundry",
          link: "/developers/guides/create-erc20-contract-using-foundry",
        },
        {
          text: "Deploy Contract Using NextJS & WalletConnect",
          link: "/developers/guides/deploy-contract-using-nextjs-walletconnect",
        },
        {
          text: "Community Guides",
          link: "/developers/guides/community-guides",
        },
        {
          text: "Non-ERC20 PoL Integration",
          link: "/developers/guides/advanced-pol",
        },
      ],
    },
    {
      text: "Contract References",
      items: [
        { text: "Berachef", link: "/developers/contracts/berachef" },
        { text: "BGT Token", link: "/developers/contracts/bgt-token" },
        { text: "BGT Staker", link: "/developers/contracts/bgt-staker" },
        {
          text: "Block Rewards Controller",
          link: "/developers/contracts/block-rewards-controller",
        },
        { text: "CREATE2", link: "/developers/contracts/create2" },
        { text: "Distributor", link: "/developers/contracts/distributor" },
        { text: "Fee Collector", link: "/developers/contracts/fee-collector" },
        { text: "Governance", link: "/developers/contracts/governance" },
        { text: "Honey Factory", link: "/developers/contracts/honey-factory" },
        { text: "Honey Token", link: "/developers/contracts/honey-token" },
        { text: "Multicall3", link: "/developers/contracts/multicall3" },
        { text: "Permit2", link: "/developers/contracts/permit2" },
        {
          text: "Rewards Vault",
          link: "/developers/contracts/rewards-vault",
        },
        {
          text: "Rewards Vault Factory",
          link: "/developers/contracts/rewards-vault-factory",
        },
        { text: "TimeLock", link: "/developers/contracts/timelock" },
        { text: "USDC Token", link: "/developers/contracts/usdc-token" },
        { text: "WBERA Token", link: "/developers/contracts/wbera-token" },
        { text: "WBTC Token", link: "/developers/contracts/wbtc-token" },
        { text: "WETH Token", link: "/developers/contracts/weth-token" },
      ],
    },
  ],
  /**
   * Main section for Run a node /nodes
   */
  NODES: [
    {
      text: "Berachain Nodes",
      items: [
        { text: "Node Architecture Overview", link: "/nodes/" },
        {
          text: "BeaconKit Consensus Layer",
          link: "/nodes/beaconkit-consensus",
        },
        { text: "EVM Execution Layer", link: "/nodes/evm-execution" },
        { text: "Quickstart: Run A Node", link: "/nodes/quickstart" },
        {
          text: "BeaconKit GitHub Repo",
          link: "https://github.com/berachain/beacon-kit",
        },
      ],
    },
    {
      text: "Node Guides",
      items: [
        {
          text: "Run Local Devnet With Kurtosis",
          link: "/nodes/guides/kurtosis",
        },
        {
          text: "Restoring Nodes from Snapshots",
          link: "/nodes/guides/snapshots",
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
  "/nodes": SIDEBAR.NODES,
  // NOTE: This has to be the last in order to prevent it overriding all pages
  "/": SIDEBAR.LEARN,
};
