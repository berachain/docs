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

Staking Pools enable validators to offer liquid staking services to their communities, creating a more accessible and flexible way for users to participate in Berachain's network security. This system allows validators to build their own branded staking services while providing users with the benefits of liquid staking and automatic reward compounding.

## What Are Staking Pools?

Staking Pools are validator-operated services that allow users to stake BERA through smart contracts, receiving liquid shares that represent their stake and automatically grow in value as rewards accumulate. Unlike traditional staking where users must run their own validator or delegate to a centralized service, staking pools give users the flexibility to stake any amount while maintaining control over their funds.

For validators, staking pools provide a way to build and monetize their own community of stakers, earning commission on user rewards while providing professional staking services. For users, staking pools offer lower barriers to entry, automatic reward reinvestment, and the ability to withdraw funds when needed.

## Key Benefits

**For Users:**

- **Liquid Staking**: Receive shares representing your stake that can be tracked and managed
- **Automatic Compounding**: All rewards are automatically reinvested to maximize returns
- **Flexible Withdrawals**: Exit your position at any time with predictable processing times
- **Lower Barriers**: Stake any amount without validator minimums
- **Transparent Operations**: All activities are verifiable on-chain

**For Validators:**

- **Community Building**: Create and manage your own branded staking service
- **Revenue Generation**: Earn commission on user rewards (up to 100%)
- **Professional Services**: Offer liquid staking without the complexity of building from scratch
- **Competitive Advantage**: Differentiate through community engagement and reward allocation

## How It Works

The staking pool system uses smart contracts to automate the complex process of staking, reward distribution, and withdrawal management. When a validator creates a staking pool, the system deploys several interconnected contracts that handle different aspects of the operation.

**Core Components:**

- **Staking Pool Contract**: Manages user deposits, tracks shares, and handles withdrawals
- **Smart Operator**: Automatically manages validator operations and Proof of Liquidity integration
- **Withdrawal Vault**: Processes withdrawal requests and issues tracking NFTs
- **Rewards Vault**: Collects and automatically reinvests all rewards

The system is designed to be fully automated, requiring minimal manual intervention from validators while providing users with a seamless staking experience.

## User Experience

**For Users - Simple Staking Process:**

1. **Find a Pool**: Choose a validator-operated staking pool that fits your needs
2. **Deposit BERA**: Send BERA to the pool and receive shares representing your stake
3. **Earn Rewards**: Your shares automatically increase in value as the validator earns rewards
4. **Withdraw Anytime**: Request withdrawal and receive your BERA back (with processing time)

**Example User Flow:**

- Alice deposits 1,000 BERA into ValidatorBob's staking pool
- She receives 1,000 stBERA shares (assuming 1:1 ratio at deposit time)
- Over time, the pool earns rewards and her shares are now worth 1,050 BERA
- Alice can withdraw her 1,050 BERA at any time

**For Validators - Automated Operations:**

1. **Deploy Pool**: Use the factory contract to create your staking pool
2. **Configure Settings**: Set commission rates and reward allocation preferences
3. **Attract Users**: Build community and attract stakers to your pool
4. **Earn Revenue**: Collect commission on user rewards automatically

**Example Validator Flow:**

- ValidatorBob sets up a staking pool with 5% commission
- Users deposit 100,000 BERA total into his pool
- The pool earns 10,000 BERA in rewards over a year
- ValidatorBob automatically receives 500 BERA in commission
- Users receive 9,500 BERA in rewards (auto-compounded)

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
Off-chain components such as the Consensus Layer Oracle and Incentive Management Bot are required for full functionality but are not yet implemented.
:::
