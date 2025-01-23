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

BeaconKit is an innovative framework that makes the [CometBFT](https://docs.cometbft.com/v0.38/) consensus algorithm available to arbitrary EVM execution environments.
In other words, BeaconKit is a modular [consensus layer](/learn/help/glossary#consensus-client) adaptable for Ethereum-based blockchains.

BeaconKit packages the CometBFT consensus algorithm with a modular middleware layer capable of receiving blocks from any execution environment conforming to the [Engine API](/learn/help/glossary#engine-api) specification. This allows for those blocks to be processed through CometBFT consensus. In practice, this enables support for unmodified EVM [execution clients](/learn/help/glossary#execution-client), to run on top of BeaconKit, allowing chains to be [EVM identical](/learn/#berachain-evm-identical-⟠).

The framework is built with modularity in mind and can be extended with different layers that may include a custom block builder, a rollup layer, a data availability layer, among others. This modularity enables the building of not only Layer 1 blockchains but also serves as a framework for Layer 2 solutions.

## BeaconKit Advantages

Running a BeaconKit-based chain provides several advantages (assuming the default configuration of pairing with an EVM execution client):

- Single slot finality (compared to Ethereum's ~13 minutes)
- Optimistic payload building (executing block proposal in parallel with voting) reduces block times by up to 40%
- Conformity to Eth2 modularity
- Full EIP compatibility
