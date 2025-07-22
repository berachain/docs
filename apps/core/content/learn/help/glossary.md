---
head:
  - - meta
    - property: og:title
      content: Berachain Core Glossary
  - - meta
    - name: description
      content: A full glossary of technical terms
  - - meta
    - property: og:description
      content: A full glossary of technical terms
---

# Glossary 📖

## BERA Token

`$BERA` is the native gas token of Berachain's L1 and serves multiple purposes:

- Used for paying transaction fees
- Initial validator staking token to secure the network
  - More BERA staked = more blocks proposed
  - Validators earn base emissions and transaction fees (i.e. MEV) for each block proposed
- Can be obtained by burning BGT (one-way conversion)

Read more in [Tokens - $BERA](/learn/pol/tokens/bera).

## BGT (Bera Governance Token)

`$BGT` is Berachain's staking and governance token, which is non-transferrable and can only be earned by
participating in [Proof of Liquidity](#proof-of-liquidity) (PoL):

- Validator delegation and rewards
  - More BGT delegated = more reward emissions for reward vaults
- Governance participation (proposals and voting)
- Can be burned for `$BERA` (one-way conversion)
- Can only be earned through participating in [Proof of Liquidity](#proof-of-liquidity)

Read more in [Tokens - $BGT](/learn/pol/tokens/bgt).

## BeaconKit

BeaconKit is a modular and customizable consensus layer framework that leverages the CometBFT consensus algorithm for building Ethereum-based blockchains.

## Block

A data unit containing a list of transactions that is permanently added to the blockchain in a sequential manner.

## BEX

Berachain's native [decentralized exchange](#dex-decentralized-exchange), called _BEX_. Read more in [Native dApps > BEX](/learn/dapps/bex).

## Block Time

The time it takes to create a new block on the blockchain. Berachain has an average block time of < 3 seconds. Note that block time can increase depending on network congestion.

## CometBFT

A general-purpose blockchain consensus engine used by Berachain to achieve high throughput and fast finality in transactions. Read more at [Cometbft.com](https://cometbft.com).

## Consensus Client

The consensus client is a piece of software responsible for achieving agreement among network nodes about the current state of the blockchain. It handles the process of validating transactions and blocks, ensuring they adhere to network rules, and deciding which blocks get added to the blockchain. The consensus client focuses on network-wide rules and the order of transactions. It is often paired with an [execution client](#execution-client).

## Consensus Mechanism

The protocol by which nodes in the Berachain network agree on the state of the blockchain. Berachain uses [Proof-of-Liquidity](#proof-of-liquidity) to select validators based on their provided liquidity.

## Delegation

The process by which a token holder grants voting or validation power to another participant in the network.

## DEX (Decentralized Exchange)

A platform that enables the buying and selling of tokens directly on the blockchain without a centralized intermediary. All liquidity is verifiably owned by smart contracts.

## Engine API

The Engine API is the interface that allows communication between the [execution](#execution-client) and [consensus](#consensus-client) layers of an EVM node. [BeaconKit](#beaconkit), as a consensus layer, leverages this to be easily paired with any execution client.

## Execution Client

An EVM (Ethereum Virtual Machine) execution client (sometimes referred to as the execution layer) is a software application responsible for the actual computation of transactions within blocks. It interprets and executes the code of smart contracts using the EVM, manages state changes, and executes the transaction logic. This client ensures that all actions are performed correctly according to the smart contract's code and EVM protocol.

EVM Execution Clients:

- **Geth:** Official Go implementation of the Ethereum protocol
- **Erigon:** More performant, feature-rich client forked from go-ethereum
- **Nethermind:** .NET based client with full support for Ethereum protocols
- **Besu:** Enterprise-grade client, Apache 2.0 licensed, written in Java
- **Reth:** Rust-based client focusing on performance and reliability

## Finality

The assurance that once a transaction is confirmed on the blockchain, it cannot be altered or reversed. Berachain provides instant finality for transactions.

## Governance

The system by which decisions are made within the Berachain ecosystem. Governance involves proposals, voting, and the implementation of changes for PoL & Berachain's native dapps (BEX, HoneySwap) using BGT tokens for participation. [Read more about Governance](/learn/governance/).

## Incentive Fee Collection (PoL)

A mechanism in PoL where 33% of protocol incentives are automatically collected as fees when added to Reward Vaults. These fees are auctioned for WBERA and distributed to BERA stakers in the WBERAStakerVault, providing direct yield opportunities for BERA holders.

## WBERAStakerVault

An ERC4626-compliant vault that allows users to stake BERA and earn yield from redirected PoL incentives. The vault accepts both native BERA and WBERA deposits, has a 7-day unbonding period, and automatically compounds rewards. [Read more about BERA Staking](/learn/guides/bera-staking).

## BGTIncentiveFeeCollector

A contract that collects incentive fees from PoL protocols and auctions them for WBERA tokens, which are then distributed to BERA stakers in the WBERAStakerVault. This contract is a key component of the PoL incentive tax mechanism.

## HONEY

`$HONEY` is the native stablecoin of the Berachain ecosystem, soft-pegged to 1 USDC. It is used throughout the Berachain ecosystem and involves minting and burning fees. Read more in [Tokens - $HONEY](/learn/pol/tokens/honey).

## IBC

Inter-Blockchain Communication protocol that handles the transport of data between Cosmos blockchains.

## Liquidity

The availability of liquid assets to facilitate trading on the Berachain network. Liquidity is often provided by users through liquidity pools.

## Liquidity Pool

A collection of funds locked in smart contracts, used to facilitate trading on decentralized exchanges and other DeFi services.

## Liquidity Provider

A user who deposits tokens into a liquidity pool, earning a portion of fees generated from swaps in the pool, as well as other potential rewards (from PoL or otherwise).

## Mainnet

The primary network where transactions comprising real value occur on the Berachain blockchain, as opposed to test networks used for development.

## Proof-of-Liquidity

A consensus mechanism that aligns economic incentives between validators, applications, and users. Premised on a two-token model, validators have varying probabilities of being selected based on the amount of `$BERA` they have staked. Block rewards are distributed as `$BGT` tokens, the amount of which is influenced by the amount of `$BGT` delegated to them by users. This `$BGT` is deployed towards liquidity incentives to ecosystem protocols, for which validators receive incentives from the protocols in return.

## Single Slot Finality

A process where [finality](#finality) is achieved in the same block proposed. Sometimes also referred to as _Instant Finality_.

## Staking

The process of locking up tokens to support the operations of a blockchain network. In Berachain, staking is used to secure the network and participate in governance.

## Swap

The process of exchanging one token for another on a decentralized exchange. Swaps involve a fee, which varies depending on the pool's settings.
