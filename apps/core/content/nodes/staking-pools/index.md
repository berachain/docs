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

Staking Pools enable validators to offer liquid staking services to their communities. As a validator, you can build and monetize your own community of stakers, earning commission on rewards. Your stakers deposit BERA through smart contracts and receive liquid shares (stBERA) that automatically grow in value as rewards accumulate.

## What Are Staking Pools?

Staking Pools are validator-operated services that allow your community members to stake BERA through smart contracts, receiving liquid shares (stBERA) that represent their stake and automatically grow in value as rewards accumulate. Stakers can stake any amount without running their own validator.

As a validator, staking pools provide you with a way to build and monetize your own community of stakers, earning commission on rewards. Your stakers benefit from lower barriers to entry, automatic reward reinvestment, and flexible withdrawals.

## How It Works

When you create a staking pool, the system deploys several interconnected contracts. Your pool includes a StakingPool contract that manages deposits and shares, a SmartOperator that handles validator operations and Proof of Liquidity integration, and a StakingRewardsVault that collects and reinvests rewards. Shared infrastructure includes a WithdrawalVault that processes withdrawal requests for all pools and an Accounting Oracle that provides consensus layer data updates.

The system automates staking, reward distribution, and withdrawal management, requiring minimal manual intervention from you while providing your stakers with a seamless staking experience.

## Staker Experience

When stakers interact with your staking pool, they deposit BERA and immediately receive liquid stBERA shares. Rewards automatically compound as you earn rewards, increasing the value of shares over time without manual claiming or reinvestment. Stakers can withdraw at any time; withdrawals process through the consensus layer in approximately 3 days (129,600 blocks). Stakers can stake any amount without validator minimums, with full transparency through on-chain verification.

## Validator Operations

You deploy a staking pool through the factory contract, which creates all necessary contracts and registers your validator with the consensus layer. You configure commission rates (up to 20% of staker rewards) and can direct Proof of Liquidity incentives to specific applications. Commission is collected automatically on staker rewards, allowing you to focus on community building rather than manual reward management.

## Integration with Proof of Liquidity

Staking pools integrate with Berachain's Proof of Liquidity system. Pool BGT rewards automatically boost your PoL performance, and smart contracts automatically claim and distribute PoL incentives. You can direct rewards to specific applications or ecosystem initiatives.

## Provided Tools

Berachain provides tools to help you operate your staking pool. A React-based frontend template lets you build an interface where stakers can connect wallets, deposit BERA, view positions, and request withdrawals. The Smart Operator Helper is an interactive Python CLI tool for managing SmartOperator contracts, including BGT boosting, reward allocation, commission changes, and fee claims. Bash scripts automate deployment and management operations, generating ready-to-review `cast` commands for safe execution. These tools are available in the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools).

## Getting Started

Validators can set up staking pools using the [Installation Guide](/nodes/staking-pools/installation) and manage operations with the [Operator Guide](/nodes/staking-pools/operators).

## Contract Addresses

The staking pools system uses several deployed contracts across Berachain networks. These addresses are the primary interfaces for interacting with the staking pools system.

### Factory Contracts

Factory contracts are deployed instances that you interact with directly:

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

Implementation contracts contain the business logic used by all staking pools. These addresses are used internally by the factory and proxies. Your stakers interact with your pool's proxy addresses (not these implementation addresses).

**StakingPool Implementation**: Core staking pool logic for managing deposits, shares, and staker positions.

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

> **Note**: You have unique proxy addresses for your StakingPool, SmartOperator, StakingRewardsVault, and IncentiveCollector contracts. These proxy addresses are created when you deploy your staking pool through the factory. Your stakers interact with these proxy addresses, not the implementation addresses listed above.

## Smart Contract Reference

For detailed information about the smart contracts and their functions, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

## Support and Resources

If you don't have contact with Berachain Validator Relations, ask on our [Discord's](https://discord.gg/berachain) #node-support channel.
