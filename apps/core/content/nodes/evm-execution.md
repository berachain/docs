---
head:
  - - meta
    - property: og:title
      content: Berachain EVM Execution Layer
  - - meta
    - name: description
      content: Berachain supports any EVM execution client that follows the Engine API
  - - meta
    - property: og:description
      content: Berachain supports any EVM execution client that follows the Engine API
---

# EVM Execution Layer ⟠

The execution layer consists of multiple implementations in the form of EVM execution clients. These clients handle transactions, transaction gossiping, state management, and support for the Ethereum Virtual Machine - they are not responsible for block building.

The following execution clients are supported by BeaconKit:

| Client                                                       | Language | Required Version (Bepolia) | Required Version (Mainnet) |
| ------------------------------------------------------------ | -------- | -------------------------- | -------------------------- |
| [Bera-Geth](https://github.com/berachain/bera-geth/releases) | Golang   | v1.011602.1 TODO           | v1.011602.1 TODO           |
| [Bera-Reth](https://github.com/berachain/bera-reth/releases) | Rust     | v1.0.0 TODO                | v1.0.0 TODO                |

Installing a more recent patch version — the `z` in a version number `x.y.z` — is generally safe.
