---
head:
  - - meta
    - property: og:title
      content: Berachain Testnet V1 vs V2
  - - meta
    - name: description
      content: How does Berachain V2 bArtio differ from V1 Artio?
  - - meta
    - property: og:description
      content: How does Berachain V2 bArtio differ from V1 Artio?
---

# Berachain Testnet V1 vs V2 🆕

> On June 9, 2024, Berachain officially launched version 2 of its testnet called `bArtio`.

The Berachain `bArtio` network is a re-architecture of the chain to make it more modular and EVM-aligned. In order to achieve these goals, an entirely new framework was needed and [**BeaconKit**](/learn/what-is-beaconkit) was born.

V2 is an implementation of the `BeaconKit` framework, which separates the execution and consensus, and focuses on implementing an consensus client that can be paired with any EVM execution client (Ex: Geth, Reth, etc).

## Main Changes from V1 to V2 🐻

Berachain's V1 testnet (`Artio`) was built on top of [Polaris](https://github.com/berachain/polaris), which tightly coupled EVM execution with Cosmos consensus and introduced a monolithic framework for building highly optimized precompiles.

Despite this optimization, Cosmos could not handle the volume of transactions that Berachain received, alongside the compatibility challenges that came with precompiles and supporting a forked EVM execution client.

![Polaris vs BeaconKit](/assets/berachain-polaris-vs-beaconkit.png)

V2 introduced a modular architecture of separating the consensus and execution layer. Compared with V1, where validators would run a single [Polaris](https://github.com/berachain/polaris) client, V2 validators would need to run 2 clients, BeaconKit client (for consensus) alongside any EVM execution client (e.g. Geth, Erigon). This modular approach allows for specialization of concerns - for the execution layer to benefit from EVM innovations, and for BeaconKit to provide a highly customizable and performant consensus layer.

In addition to the technical changes with BeaconKit, the economic design of Berachain's native tokens has evolved. The following table highlights the main changes between V1 and V2:

![Berachain Testnet Comparison - V1 vs V2](/assets/v1-vs-v2.png)

Some significant points to note:

1. `$BERA` is staked for activating validators, rather than `$BGT`.
2. `$BGT` delegators no longer at risk of slashing.
3. The execution layer is now EVM identical.
