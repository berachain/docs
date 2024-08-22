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

BeaconKit introduces an innovative framework that utilizes the Cosmos-SDK to
create a flexible, customizable [consensus layer](/learn/help/glossary#consensus-client) tailored for Ethereum-based blockchains.

By leveraging the [Engine API](/learn/help/glossary#engine-api), BeaconKit can be paired with any EVM [execution client](/learn/help/glossary#execution-client), allowing it to be [EVM identical](/learn/#berachain-evm-identical-⟠), fully supporting any EVM execution client without modifications.

The framework is also built with modularity in mind to easily integrate different layers that may include a custom block builder, a rollup layer, a data availability layer, among others. This modularity enables the building of not only Layer 1 blockchains but also serves as a framework for Layer 2 solutions.
