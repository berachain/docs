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
      content: Berachain Is a High-Performance EVM-Identical blockchain built on Proof-of-Liquidity, and supported by the BeaconKit framework.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is Berachain? :bear::chains:

<a :href="config.websites.foundation.url">

![Berachain.com](/assets/berachaindotcom.png)

</a>

Berachain is a high-performance [EVM-Identical](#berachain-evm-identical-⟠) Layer 1 (L1) blockchain utilizing [Proof-of-Liquidity](#proof-of-liquidity-🤝) (PoL) as a consensus mechanism, and built on top of a modular evm-focused consensus client framework named [BeaconKit](#beaconkit-⛵✨).

## EVM Identical ⟠

Berachain's execution layer is identical to the Ethereum Virtual Machine (EVM) runtime environment seen on Ethereum Mainnet. This means that it uses existing unmodified [execution clients](/apps/core/content/learn/help/glossary.md#execution-client) like Geth, Reth, Erigon, Nethermind, and more to handle executing smart contracts, and supports all the tooling that comes native with the EVM.

Identical means that whenever the EVM is upgraded, Berachain can adopt the latest version—for example, Dencun—straight out of the box. This includes compatibility with all RPC namespaces and endpoints and any improvements made to execution clients would give immediate improvements to Berachain.

## Proof-of-Liquidity 🤝

Proof-of-Liquidity is a [consensus mechanism](/apps/core/content/learn/help/glossary.md#consensus-mechanism) that establishes a framework to reward ecosystem liquidity that contributes to efficient trading, price stability, securing the chain, and increasing the network/user growth.

This framework makes it possible to strongly align the incentives of key stakeholders / [PoL participants](/apps/core/content/learn/pol/participants.md) (validator, protocols, users) and contributes to the overall long-term health of the chain.

Beyond providing a great day-one dApp experience, the native dApps, such as [BEX](/apps/core/content/learn/dapps/bex.md), [Bend](/apps/core/content/learn/dapps/bend.md) and [Berps](/apps/core/content/learn/dapps/berps.md), serve as reference implementations of how developers can build on-top of Proof-of-Liquidity.

Read more in [What Is Proof-of-Liquidity](/apps/core/content/learn/what-is-proof-of-liquidity.md).

## BeaconKit ⛵✨

BeaconKit is a modular framework developed by Berachain for building EVM [consensus clients](/apps/core/content/learn/help/glossary.md#consensus-client). It integrates the benefits of CometBFT consensus, including increased composability, single slot finality (SSF), and more.

Read more in [What Is BeaconKit](/apps/core/content/learn/what-is-beaconkit.md).
