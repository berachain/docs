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
          link: "/learn/what-is-proof-of-liquidity"
        },
        { text: "What Is BeaconKit?", link: "/learn/what-is-beaconkit" },
        { text: "Connect To Berachain", link: "/learn/connect-to-berachain" },
        { text: "How To Get $BERA", link: "/learn/how-to-get-bera" },
        { text: "Claim $BERA Airdrop", link: "/learn/claim-bera-airdrop" },
        { text: "Berachain NFTs", link: "/learn/berachain-nfts" },
        { text: "Docs Changelog", link: "/learn/changelog" }
      ]
    },
    {
      text: "Proof-of-Liquidity",
      items: [
        { text: "Overview", link: "/learn/pol/" },
        { text: "Participants", link: "/learn/pol/participants" },
        { text: "Block Rewards", link: "/learn/pol/blockrewards" },
        { text: "Reward Vaults", link: "/learn/pol/rewardvaults" },
        { text: "Incentives", link: "/learn/pol/incentives" },
        {
          text: "Tokens",
          items: [
            { text: "Tokenomics", link: "/learn/pol/tokens/tokenomics" },
            { text: "BERA", link: "/learn/pol/tokens/bera" },
            { text: "BGT", link: "/learn/pol/tokens/bgt" },
            { text: "HONEY", link: "/learn/pol/tokens/honey" }
          ]
        },
        { text: "PoL FAQs", link: "/learn/pol/faqs" }
      ]
    },
    {
      text: "Governance",
      items: [
        { text: "Governance Overview", link: "/learn/governance/" },
        { text: "Reward Vaults", link: "/learn/governance/rewardvault" }
      ]
    },
    {
      text: "Guides",
      items: [
        { text: "Boost A Validator", link: "/learn/guides/boost-a-validator" },
        { text: "BERA Staking", link: "/learn/guides/bera-staking" },
        { text: "Claim Incentives", link: "/learn/guides/claim-incentives" },
        {
          text: "Setup Reward Vault",
          link: "/learn/guides/setup-reward-vault"
        },
        {
          text: "Offer Incentives",
          items: [
            {
              text: "Add Incentives via HUB",
              link: "/learn/guides/add-incentives-for-reward-vault"
            },
            {
              text: "Add Incentives via SAFE",
              link: "/learn/guides/safe-add-incentives-for-reward-vault"
            }
          ]
        }
      ]
    },
    {
      text: "Native dApps",
      items: [
        { text: "BeraHub", link: "/learn/dapps/berahub" },
        { text: "BEX", link: "/learn/dapps/bex" },
        { text: "Honey Swap", link: "/learn/dapps/honey-swap" },
        {
          text: `${constants.mainnet.dapps.berascan.name}`,
          link: `${constants.mainnet.dapps.berascan.url}`,
          target: "_blank",
          rel: "no-referrer"
        }
      ]
    },
    {
      text: "Help",
      items: [
        { text: "FAQs", link: "/learn/help/faqs" },
        { text: "Glossary", link: "/learn/help/glossary" },
        {
          text: "Reward Vault Guidelines",
          link: "/learn/help/reward-vault-guidelines"
        }
      ]
    }
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
          link: "/developers/network-configurations"
        },
        { text: "Deployed Contracts", link: "/developers/deployed-contracts" },
        { text: "Developer Tools", link: "/developers/developer-tools" },
        {
          text: "Claim API",
          link: "/developers/claim-api"
        },

        {
          text: `${constants.bepolia.dapps.faucet.name}`,
          link: `${constants.bepolia.dapps.faucet.url}`,
          target: "_blank",
          rel: "no-referrer"
        },
        {
          text: `${constants.mainnet.dapps.berascan.name}`,
          link: `${constants.mainnet.dapps.berascan.url}`,
          target: "_blank",
          rel: "no-referrer"
        }
      ]
    },
    {
      text: "Developer Quickstart",
      items: [
        { text: "Build A Smart Contract", link: "/developers/quickstart/" },
        { text: "Build A Frontend", link: "/developers/quickstart/frontend" },
        {
          text: "Integrating with PoL",
          link: "/developers/quickstart/pol-integration"
        }
      ]
    },
    {
      text: "Developer Guides",
      items: [
        {
          text: "Mainnet Migration Guide",
          link: "/developers/guides/migration-guide"
        },
        {
          text: "Create HelloWorld Contract Using Hardhat",
          link: "/developers/guides/create-helloworld-contract-using-hardhat"
        },
        {
          text: "Create ERC-20 Contract Using Foundry",
          link: "/developers/guides/create-erc20-contract-using-foundry"
        },
        {
          text: "Deploy Contract Using NextJS & WalletConnect",
          link: "/developers/guides/deploy-contract-using-nextjs-walletconnect"
        },
        {
          text: "Non-ERC20 PoL Integration",
          link: "/developers/guides/advanced-pol"
        },
        {
          text: "EIP-7702",
          items: [
            {
              text: "Basics",
              link: "/developers/guides/eip7702-basics"
            },
            {
              text: "Batch Transactions",
              link: "/developers/guides/eip7702-batch-transactions"
            },
            {
              text: "Gas Sponsorship",
              link: "/developers/guides/eip7702-gas-sponsorship"
            }
          ]
        },
        {
          text: "EIP-5792",
          items: [
            {
              text: "Overview",
              link: "/developers/guides/eip-5792-overview",
            },
            {
              text: "MetaMask Guide",
              link: "/developers/guides/eip-5792-metamask-guide",
            },
          ],
        },
        {
          text: "Community Guides",
          link: "/developers/guides/community-guides"
        }
      ]
    },
    {
      text: "Contract References",
      items: [
        {
          text: "BGTIncentiveDistributor",
          link: "/developers/contracts/bgtincentivedistributor"
        },
        { text: "BeaconDeposit", link: "/developers/contracts/beacondeposit" },
        { text: "BeraChef", link: "/developers/contracts/berachef" },
        { text: "BGT Token", link: "/developers/contracts/bgt-token" },
        { text: "BGT Staker", link: "/developers/contracts/bgt-staker" },
        {
          text: "Block Reward Controller",
          link: "/developers/contracts/block-reward-controller"
        },
        { text: "CREATE2", link: "/developers/contracts/create2" },
        { text: "Distributor", link: "/developers/contracts/distributor" },
        { text: "Fee Collector", link: "/developers/contracts/fee-collector" },
        { text: "Governance", link: "/developers/contracts/governance" },
        { text: "Honey Factory", link: "/developers/contracts/honey-factory" },
        {
          text: "Honey Factory Reader",
          link: "/developers/contracts/honey-factory-reader"
        },
        { text: "Honey Token", link: "/developers/contracts/honey-token" },
        { text: "Multicall3", link: "/developers/contracts/multicall3" },
        { text: "Permit2", link: "/developers/contracts/permit2" },
        {
          text: "Reward Vault",
          link: "/developers/contracts/reward-vault"
        },
        {
          text: "Reward Vault Factory",
          link: "/developers/contracts/reward-vault-factory"
        },
        {
          text: "WBERAStakerVault",
          link: "/developers/contracts/wbera-staker-vault",
        },
        {
          text: "BGTIncentiveFeeCollector",
          link: "/developers/contracts/bgt-incentive-fee-collector",
        },
        { text: "TimeLock", link: "/developers/contracts/timelock" },
        { text: "WBERA Token", link: "/developers/contracts/wbera-token" }
      ]
    }
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
          text: "Validator Lifecycle Overview",
          link: "/nodes/validator-lifecycle"
        },
        {
          text: "BeaconKit Consensus Layer",
          link: "/nodes/beaconkit-consensus"
        },
        { text: "EVM Execution Layer", link: "/nodes/evm-execution" },
        { text: "Quickstart: Run A Node", link: "/nodes/quickstart" },
        { text: "Production Checklist", link: "/nodes/production-checklist" },
        { text: "Monitoring", link: "/nodes/monitoring" },
        {
          text: "BeaconKit GitHub Repo",
          link: "https://github.com/berachain/beacon-kit"
        }
      ]
    },
    {
      text: "Beacon Kit",
      items: [
        { text: "CLI Reference", link: "/beacon-kit/cli" },
        { text: "Configuration Reference", link: "/beacon-kit/configuration" },
        { text: "API Reference", link: "/beacon-kit/api" },
        { text: "Bectra Hardfork", link: "/nodes/guides/bectra" }
      ]
    },
    {
      text: "Node Guides",
      items: [
        {
          text: "Become A Validator Node",
          link: "/nodes/guides/validator"
        },
        {
          text: "Change Operator Address",
          link: "/nodes/guides/operator-address"
        },
        {
          text: "Manage Reward Allocations",
          link: "/nodes/guides/reward-allocation"
        },
        {
          text: "Distribute Block Rewards",
          link: "/nodes/guides/distribute-block-rewards"
        },
        {
          text: "Increase Validator Stake",
          link: "/nodes/guides/increase-validator-bera-stake"
        },
        {
          text: "Withdraw Validator Stake",
          link: "/nodes/guides/withdraw-stake"
        },
        {
          text: "Local Devnet with Docker",
          link: "/nodes/guides/docker-devnet"
        },
        {
          text: "Local Devnet with Kurtosis",
          link: "/nodes/guides/kurtosis"
        },
        {
          text: "Manage Validator Incentives Commission Rate",
          link: "/nodes/guides/manage-incentives-commission"
        },
        {
          text: "Awesome Validator Tools",
          link: "https://github.com/chuck-bear/awesome-berachain-validators"
        }
      ]
    },
    {
      text: "Help",
      items: [{ text: "Validator Support FAQ", link: "/nodes/faq" }]
    }
  ]
};

// Main Sidebar Configuration
// ========================================================
export const sidebar: DefaultTheme.Sidebar = {
  "/learn": SIDEBAR.LEARN,
  "/developers": SIDEBAR.DEVELOPERS,
  "/nodes": SIDEBAR.NODES,
  "/beacon-kit": SIDEBAR.NODES
  // NOTE: This has to be the last in order to prevent it overriding all pages
  // "/": SIDEBAR.LEARN,
};
