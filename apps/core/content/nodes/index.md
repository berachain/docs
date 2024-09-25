---
head:
  - - meta
    - property: og:title
      content: Berachain Node Architecture
  - - meta
    - name: description
      content: Berachain nodes are a combination of an EVM execution client and BeaconKit consensus client.
  - - meta
    - property: og:description
      content: Berachain nodes are a combination of an EVM execution client and BeaconKit consensus client.
---

# Berachain Node Architecture Overview 📓

Berachain's network relies on validators nodes and rpc nodes. Each can be configured as a full node or archive node.

Each of these types of nodes are a combination (a pair) of both an [execution client](/apps/core/content/learn/help/glossary.md#execution-client) and a [consensus client](/apps/core/content/learn/help/glossary.md#consensus-client). Berachain is a Layer 1 EVM Identical chain, which means that from the execution layer it supports any EVM execution client, which is paired with a consensus client and framework built by Berachain called [BeaconKit](/nodes/beaconkit-consensus).

![Berachain Node Architecture](/assets/berachain-node-architecture.png)
