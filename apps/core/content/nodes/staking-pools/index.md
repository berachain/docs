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

### Contract Architecture

The staking pools system uses a factory pattern where the **StakingPoolContractsFactory** serves as the deployment mechanism, creating and managing the complete suite of contracts needed for each validator's staking pool.

The core functionality revolves around the **StakingPool** contract, which handles staker deposits, share management, and the fundamental operations of your staking pool. Stakers interact with this contract to stake their BERA tokens and receive stBERA shares in return. The StakingPool contract maintains the accounting for staker positions and manages the conversion between BERA and stBERA shares.

Validator operations are coordinated through the **SmartOperator** contract, which manages the integration with Berachain's Proof of Liquidity system. This contract handles BGT boosting, reward allocation, commission management, and other validator-specific operations that require coordination with the broader Berachain ecosystem.

The **StakingPool** contract inherits from the **StBERA** base contract, which provides the core token functionality for staked BERA shares, including share minting, burning, and conversion between assets and shares.

### Security Model

The staking pools system implements a security model designed to protect staker funds while maintaining operational flexibility for validators and administrators.

Access control is managed through a role-based system that provides granular permissions for different types of operations. The `DEFAULT_ADMIN_ROLE` provides governance control over contract upgrades and emergency actions, ensuring that the system can be maintained and updated as needed. Validators receive the `VALIDATOR_ADMIN_ROLE`, which grants them operational control over their specific staking pool while preventing interference with other validators' operations.

Specialized roles handle specific aspects of the system. The `REWARDS_ALLOCATION_MANAGER_ROLE` manages reward allocation to specific applications, while the `COMMISSION_MANAGER_ROLE` handles validator commission management. The `PROTOCOL_FEE_MANAGER_ROLE` controls protocol fee settings, and the `INCENTIVE_COLLECTOR_MANAGER_ROLE` manages incentive collector operations, ensuring that these critical functions are properly isolated and controlled.

Emergency controls provide additional protection. Contracts can be paused in emergency situations. The system includes automatic full exit triggers that activate if the minimum balance threshold is breached, protecting stakers from potential losses.

## Staker Experience

When stakers interact with your staking pool, they deposit BERA and immediately receive liquid stBERA shares. Rewards automatically compound as you earn rewards, increasing the value of shares over time without manual claiming or reinvestment. Stakers can withdraw at any time; withdrawals process through the consensus layer in approximately 3 days (129,600 blocks at ~2s block time). Stakers can stake any amount without validator minimums, with full transparency through on-chain verification.

## Validator Operations

You deploy a staking pool through the factory contract, which creates all necessary contracts and registers your validator with the consensus layer. You configure commission rates (up to 20% of staker rewards) and can direct Proof of Liquidity incentives to specific applications. Commission is collected automatically on staker rewards, allowing you to focus on community building rather than manual reward management.

## Integration with Proof of Liquidity

Staking pools integrate with Berachain's Proof of Liquidity system. Pool BGT rewards automatically boost your PoL performance, and smart contracts automatically claim and distribute PoL incentives. You can direct rewards to specific applications or ecosystem initiatives.

## Provided Tools

Berachain provides tools to help you operate your staking pool. A React-based **example frontend template** provides a starting point for building your staking interface. The template demonstrates how stakers can connect wallets, deposit BERA, view positions, and request withdrawals. See the [Building Your Front-End](/nodes/staking-pools/operators#building-your-front-end) section in the operator guide for requirements and template usage. Bash scripts automate deployment and management operations, generating ready-to-review `cast` commands for safe execution. An interactive Python CLI tool is available for managing SmartOperator contracts. These tools are available in the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools), with detailed documentation in the [install-helpers README](https://github.com/berachain/guides/blob/main/apps/staking-pools/install-helpers/README.md).

## Getting Started

Validators can set up staking pools using the [Installation Guide](/nodes/staking-pools/installation) and manage operations with the [Operator Guide](/nodes/staking-pools/operators).

## Smart Contract Reference

For detailed information about the smart contracts and their functions, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

## Support and Resources

If you don't have contact with Berachain Validator Relations, ask on our [Discord's](https://discord.gg/berachain) #node-support channel.
