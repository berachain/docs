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

Berachain's network relies on validator nodes and RPC nodes. Each can be configured as a full node or archive node.

Each of these types of nodes are a a pair of both an [execution client](/learn/help/glossary#execution-client) and a [consensus client](/learn/help/glossary#consensus-client). Berachain is a Layer 1 EVM Identical chain, which means that for the execution layer it supports any EVM execution client, which is paired with a consensus client and framework built by Berachain called [BeaconKit](/nodes/beaconkit-consensus).

![Berachain Node Architecture](/assets/berachain-node-architecture.png)
