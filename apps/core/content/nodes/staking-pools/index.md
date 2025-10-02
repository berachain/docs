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

## How It Works

The staking pool system uses smart contracts to automate the complex process of staking, reward distribution, and withdrawal management. When a validator creates a staking pool, the system deploys several interconnected contracts that handle different aspects of the operation.

The system operates through a combination of core components deployed per validator and shared infrastructure used by all staking pools. Each validator's staking pool consists of a Staking Pool Contract that manages user deposits and tracks shares, a Smart Operator that automatically handles validator operations and Proof of Liquidity integration, and a Rewards Vault that collects and automatically reinvests all rewards. The shared infrastructure includes a centralized Withdrawal Vault that processes withdrawal requests, issues tracking NFTs, and manages withdrawal finalization for all staking pools, along with a permissionless Accounting Oracle that provides consensus layer data updates and validation.

The system is designed to be fully automated, requiring minimal manual intervention from validators while providing users with a seamless staking experience. This automation eliminates the complexity of traditional staking while maintaining the security and transparency that users expect from decentralized systems.

## User Experience

### For Users

The user experience with staking pools is designed to be straightforward and accessible. Users begin by finding a validator-operated staking pool that aligns with their preferences, whether that's based on commission rates, community reputation, or specific reward allocation strategies. Once they've selected a pool, the process is remarkably simple: they deposit BERA directly to the pool and immediately receive liquid shares that represent their stake.

The key advantage for users is the automatic compounding of rewards. As the validator earns rewards through their operations, these rewards are automatically reinvested into the pool, causing the value of each user's shares to increase over time. This means users don't need to manually claim or reinvest rewards - the system handles this automatically, maximizing their returns without any additional effort.

Withdrawal flexibility is another significant benefit. Users can exit their position at any time by requesting a withdrawal, which will be processed through the consensus layer with predictable timing of approximately 27 hours. The system also supports lower barriers to entry, allowing users to stake any amount without being constrained by validator minimums, while maintaining full transparency through on-chain verification of all operations.

### For Validators

Validators operating staking pools benefit from a comprehensive system that handles the technical complexity while providing opportunities for community building and revenue generation. The setup process begins with deploying a staking pool through the factory contract, which creates all necessary smart contracts and automatically registers the validator with the consensus layer. Once deployed, validators configure their operational parameters, including commission rates that can be set up to 100% of user rewards.

The system provides validators with professional-grade staking services without requiring them to build the infrastructure from scratch. Validators can differentiate themselves through community engagement and strategic reward allocation, directing Proof of Liquidity incentives to specific applications or ecosystem initiatives. This creates opportunities to build stronger relationships with their staking communities while supporting particular projects or causes.

Revenue generation happens automatically as the system collects commission on user rewards. For example, a validator operating a pool with 5% commission and 100,000 BERA in total deposits would automatically receive 500 BERA in commission from 10,000 BERA in annual rewards, while users receive the remaining 9,500 BERA in auto-compounded rewards. This automated revenue model allows validators to focus on community building and operational excellence rather than manual reward management.

## Integration with Proof of Liquidity

Staking pools are fully integrated with Berachain's Proof of Liquidity system, creating a symbiotic relationship between the staking infrastructure and the broader ecosystem. Pool BGT rewards automatically boost the validator's PoL performance, enhancing their position in the network's incentive structure.

The smart contracts automatically claim and distribute Proof of Liquidity incentives, ensuring that validators and their stakers benefit from the full range of available rewards. Validators can set commission rates on user rewards, allowing them to monetize their staking pool operations while providing value to their community.

Additionally, validators have the flexibility to direct rewards to specific applications or use cases, enabling them to support particular ecosystem initiatives or community projects. This creates opportunities for validators to differentiate themselves and build stronger relationships with their staking communities.

## Getting Started

For validators interested in setting up staking pools, the process begins with deploying a staking pool through the factory contract, followed by pool initialization and configuration of operational parameters. The system is designed to be straightforward for validators to implement while providing comprehensive functionality for their users. For a step‑by‑step setup, see the [Staking Pools Operator Guide](/nodes/staking-pools/operators) and the [Installation Guide](/nodes/staking-pools/installation).

Users can get started by finding a staking pool operated by a validator they trust, depositing BERA to begin earning rewards, and monitoring their position through the transparent on-chain system. The liquid nature of the shares means users can adjust their position or withdraw funds as their needs change. For a user‑focused walkthrough, see the [Staking Pools User Guide](/nodes/staking-pools/users).

## Smart Contract Reference

For detailed information about the smart contracts and their functions, see the [Smart Contract Reference](/nodes/staking-pools/contracts). This reference provides comprehensive documentation of all contract interfaces, functions, and operational details that developers and advanced users may need.

## Support and Resources

If you don't have contact with Berachain Validator Relations, ask on our [Discord's](https://discord.gg/berachain) #node-support channel.
