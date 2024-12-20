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

`$BERA` is the native gas token of Berachain's L1 and it serves multiple purposes:

- Used for paying transaction fees
- Initial validator staking token to secure the network
  - More BERA staked = more blocks proposed
  - Validators earn base emissions and transaction fees(ie MEV) for each block proposed
- Can be obtained by burning BGT (one-way conversion)

Read more in [Tokens - $BERA](/learn/pol/tokens/bera).

## BGT(Bera Governance Token)

`$BGT` is Berachain's staking and governance token, which is non-transferrable, can only be earned by
participating in [Proof of Liquidity](#proof-of-liquidity):

- Validator delegation and rewards
  - More BGT delegated = more reward emissions for reward vaults s
- Governance participation (proposals and voting
- Can be burned for `$BERA` (one-way conversion)
- Can only be earned through participating in [Proof of Liquidity](#proof-of-liquidity)

Read more in [Tokens - $BGT](/learn/pol/tokens/bgt).

## BeaconKit

BeaconKit is a modular and customizable consensus layer framework, leveraging the CometBFT consensus algorithm, for building Ethereum based blockchains.

## Block

A data unit containing a list of transactions, which is permanently added to the blockchain in a sequential manner.

## Bend

Berachain's native lending protocol, renamed from _lend_ to _bend_. Read more in [Native dApps - Bend](/learn/dapps/bend).

## BeraSwap

Berachain's native [decentralized exchange](#dex-decentralized-exchange), called _BeraSwap_. Read more in [Native dApps > BeraSwap](/learn/dapps/beraswap).

## Berps

Berachain's native perpetuals exchange, renamed from _perps_ to _berps_. Read more in [Native dApps - Berps](/learn/dapps/berps).

## Block Time

The time it takes to create a new block on the blockchain. Berachain has an average block time of < 3 seconds. Note that block time can increase depending on the network congestion.

## CometBFT

A general purpose blockchain consensus engine used by Berachain to achieve high throughput and fast finality in transactions. Read more at [Cometbft.com](https://cometbft.com).

## Consensus Client

The consensus client is a piece of software that is responsible for achieving agreement among the network nodes about the current state of the blockchain. It handles the process of validating transactions and blocks, ensuring they adhere to network rules, and deciding which blocks get added to the blockchain. The consensus client focuses on network-wide rules and the order of transactions. It is often paired with an [execution client](#execution-client).

## Consensus Mechanism

The protocol by which nodes in the Berachain network agree on the state of the blockchain. Berachain uses [Proof-of-Liquidity](#proof-of-liquidity) to select validators based on their provided liquidity.

## Delegation

The process by which a token holder grants voting or validation power to another participant in the network.

## DEX (Decentralized Exchange)

A platform that enables the buying and selling of tokens directly on the blockchain, without a centralized intermediary. All liquidity is verifiably owned by smart contracts.

## Engine API

The Engine API is the interface that allows communication between the [execution](#execution-client) and the [consensus](#consensus-client) layer of an EVM node. [BeaconKit](#beaconkit), as a consensus layer, leverages this to be easily paired with any execution client.

## Execution Client

An EVM (Ethereum Virtual Machine) execution client (sometimes referred to as the execution layer) is a software application that is responsible for the actual computation of transactions within blocks. It interprets and executes the code of smart contracts using the EVM, manages state changes, and executes the transaction logic. This client ensures that all actions are performed correctly according to the smart contract's code and EVM protocol.

EVM Execution Clients:

- **Geth:** Official Go implementation of the Ethereum protocol.
- **Erigon:** More performant, feature-rich client forked from go-ethereum.
- **Nethermind:** .NET based client with full support for Ethereum protocols.
- **Besu:** Enterprise-grade client, Apache 2.0 licensed, written in Java.
- **Reth:** Rust-based client focusing on performance and reliability.
- **Ethereumjs:** Javascript based client managed by the Ethereum Foundation.

## Finality

The assurance that once a transaction is confirmed on the blockchain, it cannot be altered or reversed. Berachain provides instant finality for transactions.

## Governance

The system by which decisions are made within the Berachain ecosystem. Governance involves proposals, voting, and the implementation of changes for PoL & Berachain's native dapps(BeraSwap,Berps,Bend, HoneySwap) using BGT tokens for participation. [Read more about Governance](/learn/governance/).

## HONEY

`$HONEY` is the native stablecoin of the Berachain ecosystem, pegged to 1 USDC. It is used throughout the Berachain ecosystem and involves minting and burning fees. Read more in [Tokens - $HONEY](/learn/pol/tokens/honey).

## IBC

Inter-Blockchain Communication protocol that handles transport of data between Cosmos blockchains.

## Liquidity

The availability of liquid assets to facilitate trading on the Berachain network. Liquidity is often provided by users through liquidity pools.

## Liquidity Pool

A collection of funds locked in a smart contract, used to provide liquidity for decentralized exchanges and other DeFi services. Liquidity pools on Berachain can contain 2 tokens.

## Liquidity Provider

A user who deposits tokens into a liquidity pool, earning a portion of the fees generated from swaps in the pool.

## Mainnet

The primary network where real transactions occur on the Berachain blockchain, as opposed to test networks used for development.

## Polaris EVM

A monolithic implementation of the Ethereum Virtual Machine used by the Berachain team to provide compatibility with Ethereum-based smart contracts, built on top of the Cosmos SDK. This implementation has been deprecated in favor of the modular BeaconKit architecture.

## Proof-of-Liquidity

A consensus mechanism utilized by Berachain, where validators have varying chances of selection based on their BERA staked and the amount of their block rewards, which are BGT emissions, change based on the amount of `$BGT` delegated, which we also call boosts they have from users.

## Single Slot Finality

A process where [finality](#finality) is achieved in the same block proposed. Sometimes also referred to as _Instant Finality_.

## Staking

The process of locking up tokens to support the operations of a blockchain network. In Berachain, staking is used to secure the network and participate in governance.

## Swap

The process of exchanging one token for another on a decentralized exchange. Swaps involve a fee, which varies depending on the pool's settings.
