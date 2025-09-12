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

Staking Pools allow validators to offer liquid staking services to their communities, enabling users to stake BERA through a validator-operated pool while maintaining the benefits of Proof of Liquidity (PoL). This system represents a significant evolution in how validators can engage with their communities and how users can participate in network security.

## What Are Staking Pools?

Staking Pools are smart contract systems that enable validators to accept user deposits of BERA for staking, manage validator operations through smart contracts, distribute rewards automatically to pool participants, and handle withdrawals in a trustless manner. Each staking pool is tied to a single validator and operates as a Liquid Staking Token (LST) system, where users receive shares representing their stake in the pool.

The system transforms the traditional validator-user relationship by introducing a layer of smart contract automation that handles the complex mechanics of staking, reward distribution, and withdrawal processing. This allows validators to focus on their core responsibilities while providing users with a seamless staking experience.

## System Architecture

The staking pools system consists of several interconnected smart contracts that work together to create a robust and automated staking infrastructure. At the heart of the system is the **StakingPoolContractsFactory**, which serves as the deployment and management hub for all staking pool contracts. This factory contract handles the creation of new staking pools and ensures all contracts are properly configured and linked.

The core operational contract is the **StakingPool**, which manages user deposits, share management, and pool operations. It acts as the primary interface for users to interact with the pool, handling deposits, withdrawals, and share calculations. The **SmartOperator** contract manages validator operations and integrates with the Proof of Liquidity system, ensuring that the validator's operations are properly coordinated with the broader Berachain ecosystem.

Supporting these core contracts are specialized components like the **WithdrawalVault**, which handles withdrawal requests and processing through integrated NFT functionality, and the **StakingRewardsVault**, which manages rewards and implements auto-compounding functionality. The **IncentiveCollector** handles incentive token collection and conversion, while the **AccountingOracle** provides off-chain data validation to ensure the system operates with accurate consensus layer information.

## Key Features and Benefits

For validators, staking pools offer an easy setup process through the factory contract, automated operations that handle the complex mechanics of staking, comprehensive reward management that automatically collects and distributes rewards, and the ability to build and engage with their own community of stakers. This creates a more personal and branded experience compared to generic staking services.

Users benefit from liquid staking capabilities where they can stake BERA and receive shares representing their position, automatic reinvestment of all rewards through the auto-compounding system, flexible withdrawal options that allow them to exit their position at any time, and complete transparency since all operations are conducted on-chain and are fully verifiable.

## How It Works

The staking pool lifecycle begins with pool deployment, where validators use the factory contract to create all necessary contracts and configure their withdrawal credentials and operator addresses. This process establishes the foundation for the entire staking pool ecosystem.

Once deployed, users can begin depositing BERA into the pool. Deposits are immediately accounted for and represented by shares that reflect proportional ownership. Consensus-layer rewards begin only after the underlying validator enters the active validator set; until then, deposits are buffered and prepared for staking. The share system ensures that users maintain their relative position in the pool as rewards accumulate and new deposits are made.

When the pool accumulates at least 10,000 BERA, the system can register the validator on the consensus layer. However, the validator only comes online and begins producing consensus rewards once it enters the active set — a process that requires a minimum effective balance of 250,000 BERA and depends on the relative stakes of other validators. See the [Validator Lifecycle](/nodes/validator-lifecycle) for details.

Reward management is handled automatically by the system. Non-BGT rewards are converted to BERA and automatically staked back into the pool, while BGT rewards are used to boost the validator's Proof of Liquidity performance. All rewards contribute to the auto-compounding effect, increasing the value of user shares over time.

Withdrawal processing offers users flexibility through two main paths. The short circuit path allows immediate withdrawal if sufficient funds are available in the pool buffer, while the standard path processes withdrawals through the consensus layer with approximately a 27-hour delay for processing.

## Integration with Proof of Liquidity

Staking pools are fully integrated with Berachain's Proof of Liquidity system, creating a symbiotic relationship between the staking infrastructure and the broader ecosystem. Pool BGT rewards automatically boost the validator's PoL performance, enhancing their position in the network's incentive structure.

The smart contracts automatically claim and distribute Proof of Liquidity incentives, ensuring that validators and their stakers benefit from the full range of available rewards. Validators can set commission rates on user rewards, allowing them to monetize their staking pool operations while providing value to their community.

Additionally, validators have the flexibility to direct rewards to specific applications or use cases, enabling them to support particular ecosystem initiatives or community projects. This creates opportunities for validators to differentiate themselves and build stronger relationships with their staking communities.

## Key Parameters and Constraints

The system operates within well-defined parameters that ensure stability and security. A minimum deposit of 10,000 BERA is required to register a validator on the consensus layer; producing consensus rewards begins only once the validator enters the active set, which requires at least 250,000 BERA effective balance and is influenced by the relative stakes of other validators. Each validator is limited to a maximum pool size of 10,000,000 BERA, preventing any single validator from becoming too dominant in the system.

The minimum validator balance is set at 250,000 BERA, and if this threshold is breached, the system automatically triggers a full exit to protect user funds. Withdrawal processing through the consensus layer requires approximately 27 hours (256 epochs) to complete, providing users with predictable timing expectations.

## Security Model

The security model is built around the principle of trust minimization, where smart contracts manage all validator operations and all operations are verifiable on-chain. This approach eliminates the need for users to trust individual validators with their funds, as the smart contracts enforce all rules and procedures automatically.

Role-based access control provides granular permissions for different operations, ensuring that only authorized parties can perform specific functions. The integration with off-chain oracles provides additional validation of consensus layer state, creating multiple layers of verification and security.

Risk management is implemented through several mechanisms, including automatic full exit protection if minimum balance requirements are breached, pause mechanisms that can be activated in emergency situations, upgradeable contracts that allow governance to improve the system over time, and graceful handling of oracle data issues to ensure system resilience.

## Getting Started

For validators interested in setting up staking pools, the process begins with deploying a staking pool through the factory contract, followed by pool initialization and configuration of operational parameters. The system is designed to be straightforward for validators to implement while providing comprehensive functionality for their users. For a step‑by‑step setup, see the [Staking Pools Operator Guide](/nodes/staking-pools/operators) and the [Installation Guide](/nodes/staking-pools/installation).

Users can get started by finding a staking pool operated by a validator they trust, depositing BERA to begin earning rewards, and monitoring their position through the transparent on-chain system. The liquid nature of the shares means users can adjust their position or withdraw funds as their needs change. For a user‑focused walkthrough, see the [Staking Pools User Guide](/nodes/staking-pools/users).

## Smart Contract Reference

For detailed information about the smart contracts and their functions, see the [Smart Contract Reference](/nodes/staking-pools/contracts). This reference provides comprehensive documentation of all contract interfaces, functions, and operational details that developers and advanced users may need.

:::tip
Staking pools are designed to be validator-operated, meaning each validator creates and manages their own pool. This allows validators to build their own communities and branding while leveraging Berachain's PoL infrastructure.
:::

:::warning
Off-chain components such as the Consensus Layer Oracle and Incentive Management Bot are required for full functionality but are not yet implemented. These components will be developed and deployed separately.
:::
