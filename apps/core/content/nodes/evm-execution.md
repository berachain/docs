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

Below are our required versions of EVM clients and the genesis files required for our chains.

| Chain             | Github release page                                                                      | Release date |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------ |
| Mainnet & Bepolia | [Bera-Geth v1.011602.4](https://github.com/berachain/bera-geth/releases/tag/v1.011602.4) | Sep 17       |
| Mainnet & Bepolia | [Bera-Reth v1.1.0](https://github.com/berachain/bera-reth/releases/tag/v1.1.0)           | Sep 17       |
| Mainnet & Bepolia | [Beacon-Kit v1.3.1](https://github.com/berachain/beacon-kit/releases/tag/v1.3.1)           | August 14       |

| Bera-Reth/Geth Genesis File | Updated | Download link & md5 hash                                                                                               |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Bepolia                     | Sep 17  | [c27c1162af33f7f5401bcef974a64454](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json) |
| Mainnet                     | Sep 17  | [a401a53f380e3ce49ef358fead5d3b16](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json) |


Installing a more recent patch version — the `z` in a version number `x.y.z` — is generally safe.
