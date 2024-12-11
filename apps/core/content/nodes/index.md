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

Berachain's network relies on validator nodes and RPC nodes. Each can be configured as either a full node or an archive node.

Each of these node types consists of a combination (a pair) of both an [execution client](/learn/help/glossary#execution-client) and a [consensus client](/learn/help/glossary#consensus-client). Berachain is a Layer 1 EVM Identical chain, meaning that its execution layer supports any EVM execution client paired with BeaconKit - a consensus client and framework built by Berachain. Learn more about [BeaconKit here](/nodes/beaconkit-consensus).

![Berachain Node Architecture](/assets/berachain-node-architecture.png)

## Validator Nodes

A validator node is a full node or archive node that is responsible for participating in consensus, validating transactions, and proposing blocks.

In order for a node to become a validator node, it must make a deposit of minimum $BERA stake to enter into the Active Set. It may need to increase that amount to remain in the Active Set, which has a limit of N Active Validators. The stake must be greater than that of the Nth validator in the Active Set to be included in the Active Set.

![Berachain Active Set](/assets/berachain-active-set.png)

## RPC Nodes

An RPC node is a full node or archive node that is responsible for serving remote procedure call (RPC) requests to the network.
