---
head:
  - - meta
    - property: og:title
      content: Berachain BeaconKit Consensus Layer
  - - meta
    - name: description
      content: Berachain BeaconKit is a modular consensus layer for EVM chains
  - - meta
    - property: og:description
      content: Berachain BeaconKit is a modular consensus layer for EVM chains
---

# BeaconKit Consensus Layer ⛵✨

![Berachain BeaconKit](/assets/beaconkit-banner.png)

[BeaconKit](/learn/what-is-beaconkit) is both a consensus client and framework for building EVM chains.

BeaconKit leverages CometBFT for its consensus algorithm, wrapped to interface with any EVM-compatible execution environment. As a consensus client, it allows the network (an EVM blockchain like Berachain) to come to an agreement based on the data provided by the execution client.

By conforming to Eth2 modularity, which separates consensus and execution, BeaconKit is able to leverage all the benefits that come with EVM execution clients. It achieves this by adhering to the [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), which is a JSON-RPC API that enables communication between consensus and execution clients.

## BeaconKit Benefits ✅

Some of the benefits that come with BeaconKit are:

1. **Eth2 Modularity** - Adheres to separation of execution and consensus with communication via Engine API
2. **Promotes Execution Client Diversity** - Any EVM execution upgrades can be supported out of the box, avoiding the need to run and maintain a custom forked EVM execution client to work with the chain
3. **CometBFT** - Leverages a trusted consensus algorithm
4. **Instant Finality** - Achieves [Single Slot Finality / Instant Finality](/learn/help/glossary#single-slot-finality), compared to Ethereum's finality of ~13 minutes
5. **Leverages EVM Tooling** - All existing EVM tooling is supported; if a tool is supported by Ethereum, it is supported by BeaconKit
6. **Modular** - BeaconKit is also a modular framework that can allow for the potential implementation of a custom block builder, rollup, data availability layer, and more

![Berachain BeaconKit vs Ethereum](/assets/berachain-ethereum-vs-beaconkit.png)
