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
        { text: "Claim $BERA Airdrop", link: "/learn/claim-bera-airdrop" },
      ],
    },
    {
      text: "Proof-of-Liquidity",
      items: [
        { text: "Overview", link: "/learn/pol/" },
        { text: "Participants", link: "/learn/pol/participants" },
        { text: "Block Production/Emissions", link: "/learn/pol/bgtmath" },
        { text: "Reward Vaults", link: "/learn/pol/rewardvaults" },
        { text: "Incentives", link: "/learn/pol/incentives" },
        {
          text: "Tokens",
          items: [
            { text: "Tokenomics", link: "/learn/pol/tokens/tokenomics" },
            { text: "BERA", link: "/learn/pol/tokens/bera" },
            { text: "BGT", link: "/learn/pol/tokens/bgt" },
            { text: "HONEY", link: "/learn/pol/tokens/honey" },
          ],
        },
        { text: "PoL FAQs", link: "/learn/pol/faqs" },
      ],
    },
    {
      text: "Governance",
      items: [
        { text: "Governance Overview", link: "/learn/governance/" },
        { text: "Reward Vaults", link: "/learn/governance/rewardvault" },
      ],
    },
    {
      text: "Native dApps",
      items: [
        { text: "BeraHub", link: "/learn/dapps/berahub" },
        { text: "BeraSwap", link: "/learn/dapps/beraswap" },
        { text: "Honey Swap", link: "/learn/dapps/honey-swap" },
        {
          text: `${constants.mainnet.dapps.berascan.name}`,
          link: `${constants.mainnet.dapps.berascan.url}`,
          target: "_blank",
          rel: "no-referrer",
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
        { text: "Proof of Liquidity Overview", link: "/developers/" },
        {
          text: "Network Configurations",
          link: "/developers/network-configurations",
        },
        { text: "Deployed Contracts", link: "/developers/deployed-contracts" },
        { text: "Developer Tools", link: "/developers/developer-tools" },
        {
          text: `${constants.mainnet.dapps.berascan.name}`,
          link: `${constants.mainnet.dapps.berascan.url}`,
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
        {
          text: "Integrating with PoL",
          link: "/developers/quickstart/pol-integration",
        },
      ],
    },
    {
      text: "Developer Guides",
      items: [
        { text: "Migration Guide", link: "/developers/guides/migration-guide" },
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
        { text: "BeaconDeposit", link: "/developers/contracts/beacondeposit" },
        { text: "Berachef", link: "/developers/contracts/berachef" },
        { text: "BGT Token", link: "/developers/contracts/bgt-token" },
        { text: "BGT Staker", link: "/developers/contracts/bgt-staker" },
        {
          text: "Block Reward Controller",
          link: "/developers/contracts/block-reward-controller",
        },
        { text: "CREATE2", link: "/developers/contracts/create2" },
        { text: "Distributor", link: "/developers/contracts/distributor" },
        { text: "Fee Collector", link: "/developers/contracts/fee-collector" },
        { text: "Governance", link: "/developers/contracts/governance" },
        { text: "Honey Factory", link: "/developers/contracts/honey-factory" },
        {
          text: "Honey Factory Reader",
          link: "/developers/contracts/honey-factory-reader",
        },
        { text: "Honey Token", link: "/developers/contracts/honey-token" },
        { text: "Multicall3", link: "/developers/contracts/multicall3" },
        { text: "Permit2", link: "/developers/contracts/permit2" },
        {
          text: "Reward Vault",
          link: "/developers/contracts/reward-vault",
        },
        {
          text: "Reward Vault Factory",
          link: "/developers/contracts/reward-vault-factory",
        },
        { text: "TimeLock", link: "/developers/contracts/timelock" },
        { text: "WBERA Token", link: "/developers/contracts/wbera-token" },
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
          text: "Run A Validator Node",
          link: "/nodes/guides/validator",
        },
        {
          text: "Restoring Nodes from Snapshots",
          link: "/nodes/guides/snapshots",
        },
        {
          text: "Change Operator Address",
          link: "/nodes/guides/operator-address",
        },
        {
          text: "Manage Reward Allocations",
          link: "/nodes/guides/reward-allocation",
        },
        {
          text: "Distribute Block Rewards",
          link: "/nodes/guides/distribute-block-rewards",
        },
        {
          text: "Increase Validator $BERA Stake",
          link: "/nodes/guides/increase-validator-bera-stake",
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
  // "/": SIDEBAR.LEARN,
};
