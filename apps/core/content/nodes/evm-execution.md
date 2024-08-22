---
head:
  - - meta
    - property: og:title
      content: Berachain EVM Execution Layer
  - - meta
    - name: description
      content: Berachain supports any EVM execution client that follows Engine API
  - - meta
    - property: og:description
      content: Berachain supports any EVM execution client that follows Engine API
---

# EVM Execution Layer ⟠

The execution layer has multiple implementation in the form of EVM execution clients that handle transactions, transaction gossiping, state management, and supporting the Ethereum Virtual Machine-not responsible for block building.

The following are Execution Clients that BeaconKit has tested and verified support for:

| Client                                                          | Language   | Sync Strategies                    | State Pruning   | Maintainer          |
| --------------------------------------------------------------- | ---------- | ---------------------------------- | --------------- | ------------------- |
| [Geth](https://github.com/ethereum/go-ethereum)                 | Golang     | Snap, Full                         | Archive, Pruned | Ethereum Foundation |
| [Nethermind](https://github.com/NethermindEth/nethermind)       | C#,.NET    | Snap (without serving), Fast, Full | Archive, Pruned | Nethermind          |
| [Besu](https://github.com/hyperledger/besu/)                    | Java       | Snap, Fast, Full                   | Archive, Pruned | Hyperledger         |
| [Erigon](https://github.com/ledgerwatch/erigon)                 | Golang     | Full                               | Archive, Pruned | Erigon              |
| [Reth](https://github.com/paradigmxyz/reth)                     | Rust       | Full                               | Archive, Pruned | Paradigm            |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) | TypeScript | Full                               | Pruned          | Ethereum Foundation |
