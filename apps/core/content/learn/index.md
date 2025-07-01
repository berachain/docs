---
head:
  - - meta
    - property: og:title
      content: What is Berachain?
  - - meta
    - name: description
      content: Berachain Is a High-Performance EVM-Compatible Blockchain Built on Proof-of-Liquidity Consensus
  - - meta
    - property: og:description
      content: Berachain Is a High-Performance EVM-Identical Blockchain Built on Proof-of-Liquidity and Supported by the BeaconKit Framework.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is Berachain? :bear::chains:

<a :href="config.websites.foundation.url">

![Berachain.com](/assets/berachaindotcom.png)

</a>

Berachain is a high-performance [EVM-Identical](#berachain-evm-identical-⟠) Layer 1 blockchain utilizing [Proof-of-Liquidity](#proof-of-liquidity-🤝) (PoL) and built on top of the modular EVM-focused consensus client framework [BeaconKit](#beaconkit-⛵✨).

## EVM Identical ⟠

Berachain's execution environment is identical to the Ethereum Virtual Machine (EVM) runtime environment seen on Ethereum Mainnet. We use very lightly modified forks of popular [execution clients](/learn/help/glossary#execution-client) like Geth and Reth to handle executing smart contracts. We support all the [usual tooling](developers/developer-tools) that are familiar to EVM developers.

Identical means that whenever the EVM is upgraded, Berachain can adopt the latest version—for example, Dencun—straight out of the box. This includes compatibility with all RPC namespaces and endpoints, and any improvements made to execution clients can be applied immediately to Berachain.

## Proof-of-Liquidity 🤝

Proof-of-Liquidity radically changes the way L1 economics are structured, prioritizing users
and applications over validator rewards at baseline. Network incentives go towards enriching ecosystem liquidity, contributing to efficient trading, price stability, securing the chain, and increasing network/user growth.

PoL strongly aligns the incentives of [network participants](/learn/pol/participants) (validators, protocols, users) and contributes to the overall long-term health of the chain.

Beyond providing seamless day-one utility, the native dApps, such as [BEX](/learn/dapps/bex), serve as reference implementations of how developers can build on top of Proof-of-Liquidity.

Read more in [What Is Proof-of-Liquidity](/learn/what-is-proof-of-liquidity).

## BeaconKit ⛵✨

BeaconKit is a modular framework developed by Berachain for building EVM [consensus clients](/learn/help/glossary#consensus-client). It integrates the benefits of CometBFT consensus, including increased composability, [single slot finality (SSF)](https://ethereum.org/en/roadmap/single-slot-finality/), and more.

Read more in [What Is BeaconKit](/learn/what-is-beaconkit).
