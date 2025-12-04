---
head:
  - - meta
    - property: og:title
      content: Staking Pools Overview
  - - meta
    - name: description
      content: Overview of Berachain Staking Pools system
  - - meta
    - property: og:description
      content: Overview of Berachain Staking Pools system
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Overview

Staking Pools enable validators to offer liquid staking services to their communities. Users stake BERA through smart contracts and receive liquid shares that automatically grow in value as rewards accumulate. Validators earn commission on user rewards while building their own branded staking services.

## What Are Staking Pools?

Staking Pools are validator-operated services that allow users to stake BERA through smart contracts, receiving liquid shares (stBERA) that represent their stake and automatically grow in value as rewards accumulate. Unlike traditional staking where users must run their own validator, staking pools allow users to stake any amount while maintaining control over their funds.

For validators, staking pools provide a way to build and monetize their own community of stakers, earning commission on user rewards. For users, staking pools offer lower barriers to entry, automatic reward reinvestment, and flexible withdrawals.

## How It Works

When a validator creates a staking pool, the system deploys several interconnected contracts. Each validator's pool includes a StakingPool contract that manages deposits and shares, a SmartOperator that handles validator operations and Proof of Liquidity integration, and a StakingRewardsVault that collects and reinvests rewards. Shared infrastructure includes a WithdrawalVault that processes withdrawal requests for all pools and an Accounting Oracle that provides consensus layer data updates.

The system automates staking, reward distribution, and withdrawal management, requiring minimal manual intervention from validators while providing users with a seamless staking experience.

## User Experience

### For Users

Users deposit BERA to a validator's staking pool and immediately receive liquid stBERA shares. Rewards automatically compound as the validator earns rewards, increasing the value of shares over time without manual claiming or reinvestment. Users can withdraw at any time; withdrawals process through the consensus layer in approximately 3 days (129,600 blocks). Users can stake any amount without validator minimums, with full transparency through on-chain verification.

### For Validators

Validators deploy a staking pool through the factory contract, which creates all necessary contracts and registers the validator with the consensus layer. Validators configure commission rates (up to 20% of user rewards) and can direct Proof of Liquidity incentives to specific applications. Commission is collected automatically on user rewards, allowing validators to focus on community building rather than manual reward management.

## Integration with Proof of Liquidity

Staking pools integrate with Berachain's Proof of Liquidity system. Pool BGT rewards automatically boost the validator's PoL performance, and smart contracts automatically claim and distribute PoL incentives. Validators can direct rewards to specific applications or ecosystem initiatives.

## Provided Tools

Berachain provides tools to help validators and users interact with staking pools. A React-based frontend interface allows users to connect wallets, deposit BERA, view positions, and request withdrawals. The Smart Operator Helper is an interactive Python CLI tool for validators to manage SmartOperator contracts, including BGT boosting, reward allocation, commission changes, and fee claims. Bash scripts automate deployment and management operations, generating ready-to-review `cast` commands for safe execution. These tools are available in the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools).

## Getting Started

Validators can set up staking pools using the [Installation Guide](/nodes/staking-pools/installation) and manage operations with the [Operator Guide](/nodes/staking-pools/operators). Users can get started by finding a validator's staking pool and depositing BERA; see the [User Guide](/nodes/staking-pools/users) for details.

## Contract Addresses

The staking pools system uses several deployed contracts across Berachain networks. These addresses are the primary interfaces for interacting with the staking pools system.

### Factory Contracts

Factory contracts are deployed instances that users and validators interact with directly:

**StakingPoolContractsFactory**: The main factory contract that deploys all staking pool contracts for validators.

<span v-if="config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']">{{config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPools.stakingPoolContractsFactory['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory['bepolia-address']">{{config.contracts.stakingPools.stakingPoolContractsFactory['bepolia-address']}}</a>
</span>

**WithdrawalVault**: The shared withdrawal vault that processes withdrawal requests for all staking pools.

<span v-if="config.contracts.stakingPools.withdrawalVault['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.withdrawalVault['mainnet-address']">{{config.contracts.stakingPools.withdrawalVault['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPools.withdrawalVault['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPools.withdrawalVault['bepolia-address']">{{config.contracts.stakingPools.withdrawalVault['bepolia-address']}}</a>
</span>

### Implementation Contracts

Implementation contracts contain the business logic used by all staking pools. These addresses are used internally by the factory and proxies, but users interact with proxy addresses (not these implementation addresses).

**StakingPool Implementation**: Core staking pool logic for managing deposits, shares, and user positions.

<span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']}}</a>
</span>

**SmartOperator Implementation**: Validator operations and Proof of Liquidity integration logic.

<span v-if="config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.smartOperatorImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.smartOperatorImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.smartOperatorImpl['bepolia-address']}}</a>
</span>

**StakingRewardsVault Implementation**: Reward collection and automatic reinvestment logic.

<span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['bepolia-address']}}</a>
</span>

**IncentiveCollector Implementation**: Incentive token collection and conversion logic.

<span v-if="config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.incentiveCollectorImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.incentiveCollectorImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.incentiveCollectorImpl['bepolia-address']}}</a>
</span>

**DelegationHandler Implementation**: Delegation handling logic for capital providers.

<span v-if="config.contracts.stakingPoolImplementations.delegationHandlerImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.delegationHandlerImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerImpl['bepolia-address']}}</a>
</span>
<span v-else>
  - **Bepolia**: Not yet deployed
</span>

**DelegationHandlerFactory Implementation**: Factory logic for deploying delegation handlers.

<span v-if="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']">
  - **Mainnet**: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']}}</a>
</span>
<span v-else>
  - **Mainnet**: Not yet deployed
</span>
<span v-if="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']">
  - **Bepolia**: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']}}</a>
</span>
<span v-else>
  - **Bepolia**: Not yet deployed
</span>

> **Note**: Individual validators have unique proxy addresses for their StakingPool, SmartOperator, StakingRewardsVault, and IncentiveCollector contracts. These proxy addresses are created when a validator deploys their staking pool through the factory. Users interact with these proxy addresses, not the implementation addresses listed above.

## Smart Contract Reference

For detailed information about the smart contracts and their functions, see the [Smart Contract Reference](/nodes/staking-pools/contracts). This reference provides comprehensive documentation of all contract interfaces, functions, and operational details that developers and advanced users may need.

## Support and Resources

If you don't have contact with Berachain Validator Relations, ask on our [Discord's](https://discord.gg/berachain) #node-support channel.
