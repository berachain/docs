---
head:
  - - meta
    - property: og:title
      content: What is BeaconKit
  - - meta
    - name: description
      content: BeaconKit is a modular and customizable consensus layer for Ethereum-based blockchains.
  - - meta
    - property: og:description
      content: BeaconKit is a modular and customizable consensus layer for Ethereum-based blockchains.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What Is BeaconKit ⛵✨

BeaconKit is a modular and customizable consensus layer for Ethereum based blockchains.

<a :href="config.websites.beaconkit.url">

![BeaconKit GitHub Repository](/assets/beacon-kit-github-repository.png)

</a>

> <small>Check out the official <a :href="config.websites.beaconkit.url">BeaconKit GitHub Repository</a>.</small>

BeaconKit is an innovative framework that makes the [CometBFT](https://docs.cometbft.com/v0.38/) consensus algorithm available to any EVM execution environment.
In other words, BeaconKit is a modular [consensus layer](/apps/core/content/learn/help/glossary.md#consensus-client) adaptable for Ethereum-based blockchains.

By leveraging the [Engine API](/apps/core/content/learn/help/glossary.md#engine-api), BeaconKit can be paired with any EVM [execution client](/apps/core/content/learn/help/glossary.md#execution-client), allowing it to be [EVM identical](/learn/#berachain-evm-identical-⟠), fully supporting any EVM execution client without modifications.

The framework is built with modularity in mind to easily integrate different layers that may include a custom block builder, a rollup layer, a data availability layer, among others. This modularity enables the building of not only Layer 1 blockchains but also serves as a framework for Layer 2 solutions.

## BeaconKit Advantages

- Single slot finality (compared to Ethereum's ~13 minutes)
- Optimistic payload building (executing block proposal in parallel with voting) reduces block times by up to 40%
- Conformity to Eth2 modularity
- Full EIP compatibility
