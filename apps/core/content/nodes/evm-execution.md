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

| Language | Required Version (Bepolia)                                                                       | Required Version (mainnet)                                       |
| -------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Golang   | [Bera-Geth v1.011602.1-rc2](https://github.com/berachain/bera-geth/releases/tag/v1.011602.1-rc2) | [Geth](https://github.com/ethereum/go-ethereum/releases) v1.15.x |
| Rust     | [Bera-Reth v1.0.0-rc.10](https://github.com/berachain/bera-reth/releases/tag/v1.0.0-rc.10)       | [Reth](https://github.com/paradigmxyz/reth/releases) v1.3.x      |

Installing a more recent patch version — the `z` in a version number `x.y.z` — is generally safe.
