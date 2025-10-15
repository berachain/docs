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

The following execution clients are recommended to go with our **required [Beacon Kit v1.3.3](https://github.com/berachain/beacon-kit/releases/tag/v1.3.3)**.

| Language | Required Version (Mainnet & Bepolia)                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| Golang   | [Bera-Geth v1.011602.5](https://github.com/berachain/bera-geth/releases/tag/v1.011602.5) |
| Rust     | [Bera-Reth v1.1.0](https://github.com/berachain/bera-reth/releases/tag/v1.1.0)           |

Installing a more recent patch version — the `z` in a version number `x.y.z` — is generally safe.
