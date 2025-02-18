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

| Client                                                          | Language   | Sync Strategies                    | State Pruning   | Maintainer          |
| --------------------------------------------------------------- | ---------- | ---------------------------------- | --------------- | ------------------- |
| [Geth](https://github.com/ethereum/go-ethereum)                 | Golang     | Snap, Full                         | Archive, Pruned | Ethereum Foundation |
| [Nethermind](https://github.com/NethermindEth/nethermind)       | C#,.NET    | Snap (without serving), Fast, Full | Archive, Pruned | Nethermind          |
| [Besu](https://github.com/hyperledger/besu/)                    | Java       | Snap, Fast, Full                   | Archive, Pruned | Hyperledger         |
| [Erigon](https://github.com/ledgerwatch/erigon)                 | Golang     | Full                               | Archive, Pruned | Erigon              |
| [Reth](https://github.com/paradigmxyz/reth)                     | Rust       | Full                               | Archive, Pruned | Paradigm            |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) | TypeScript | Full                               | Pruned          | Ethereum Foundation |
