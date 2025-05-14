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

The following execution clients have been tested and verified by BeaconKit:

| Client                                                    | Language | Sync Strategies                    | Recommended Version |
| --------------------------------------------------------- | -------- | ---------------------------------- | ------------------- |
| [Geth](https://github.com/ethereum/go-ethereum)           | Golang   | Snap, Full                         | v1.15.10            |
| [Reth](https://github.com/paradigmxyz/reth)               | Rust     | Full                               | v1.3.12             |
| [Nethermind](https://github.com/NethermindEth/nethermind) | C#       | Snap (without serving), Fast, Full | v1.31.10            |
| [Erigon](https://github.com/ledgerwatch/erigon)           | Golang   | Full                               | v3.0.x              |
| [Besu](https://github.com/hyperledger/besu/)              | Java     | Snap, Fast, Full                   | v25.4.x             |

Installing a more recent patch version — the `z` in a version number `x.y.z` — is generally safe.
We do not recommend upgrading to new major or minor versions — `x.y.0` — until we have tested them.
