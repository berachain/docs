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

| Client                                                            | Language | Sync Strategies                      | Recommended Version |
|-------------------------------------------------------------------|----------|--------------------------------------|----------------------|
| [Geth](https://github.com/ethereum/go-ethereum) by Eth Foundation | Golang   | Snap, Full                           | v1.14.x           
| [Nethermind](https://github.com/NethermindEth/nethermind)         | C#,.NET  | Snap (without serving), Fast, Full   | v1.31.x           
| [Besu](https://github.com/hyperledger/besu/) by Hyperledger       | Java     | Snap, Fast, Full                     | v25.2.x     
| [Erigon](https://github.com/ledgerwatch/erigon)                   | Golang   | Full                                 | v2.61.x           
| [Reth](https://github.com/paradigmxyz/reth) by Paradigm           | Rust     | Full                                 | v1.1.x    
