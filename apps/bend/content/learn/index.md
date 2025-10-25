---
head:
  - - meta
    - property: og:title
      content: What is Bend?
  - - meta
    - name: description
      content: Bend is a fork of Morpho, enabling efficient lending and borrowing with native PoL on Berachain
  - - meta
    - property: og:description
      content: Bend is a fork of Morpho, enabling efficient lending and borrowing with native PoL on Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is Bend?

**Bend** is a decentralized lending protocol forked from Morpho, designed to enable efficient lending and borrowing with native Proof-of-Liquidity (PoL) on Berachain. As a lending primitive layer, Bend allows the creation of immutable and efficient lending markets in a permissionless way.

Bend inherits the core architecture from **Morpho v1** vaults and markets, providing a familiar and battle-tested lending infrastructure while leveraging Berachain's unique Proof-of-Liquidity consensus mechanism.

<a :href="config.mainnet.dapps.bend.url + '?utm_source=' + config.websites.docsBend.utmSource">

![Bend - What is bend](/assets/learn-whatisbend.png)

</a>

> <a :href="config.mainnet.dapps.bend.url + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.url}}</a>

## How it Works

Bend operates as a simple lending primitive layer that creates immutable and efficient lending markets through smart contracts. The protocol facilitates:

- **Lending**: Users can deposit assets to earn interest and $BGT
- **Borrowing**: Users can borrow assets by providing collateral
- **Market Creation**: Permissionless creation of new lending markets
- **Interest Rate Dynamics**: Market-driven interest rates based on supply and demand

## Key Features

- **Collateralization**: Users provide collateral to borrow assets
- **Risk Protection**: Liquidation mechanisms protect the protocol through loan-to-value ratios
- **Interest Accrual**: Dynamic interest rates based on market conditions
- **Open Participation**: Anyone can lend or borrow through the protocol
- **Non-custodial Design**: Users maintain ownership of their assets at all times
- **Vault System**: Inherited from Morpho v1 vault architecture
- **Native PoL Support**: Leverages Berachain's Proof-of-Liquidity by incentivizing users who lend their assets to borrowers

## Use Cases

Bend serves various use cases including:

- **Lending**: Earning interest on deposited assets
- **Borrowing**: Accessing liquidity while maintaining asset exposure
- **DeFi Integration**: Building lending features into other applications
- **Looping**: Taking leveraged exposure on yields and assets by employing looping strategies

## Getting Started

To start using Bend, users can:

1. Connect their wallet to <a :href="config.mainnet.dapps.bend.url + '?utm_source=' + config.websites.docsBend.utmSource" target="_blank">{{config.mainnet.dapps.bend.name}}</a>
2. Browse available lending markets
3. Deposit assets to start earning interest
4. Borrow assets by providing sufficient collateral
5. Monitor positions and manage risk

Bend provides a familiar lending experience for users familiar with Morpho, while offering the benefits of Berachain's unique Proof-of-Liquidity and ecosystem.

See our **Guides** section for more and start with the [Borrow & Repay Guide](/learn/guides/borrow-repay).
