---
head:
  - - meta
    - property: og:title
      content: Universal Reward Distributer Factory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Universal Reward Distributer Factory contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Universal Reward Distributer Factory contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# UrdFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.urdFactory.address + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.contracts.bend.publicAllocator.address}}</a> | [Git Source](https://github.com/morpho-org/universal-rewards-distributor/blob/main/src/UrdFactory.sol)</small>

**Inherits:**
[IUrdFactory](https://github.com/morpho-org/universal-rewards-distributor/blob/main/src/interfaces/IUrdFactory.sol)

This contract allows to create UniversalRewardsDistributor (URD) contracts, and to index them easily.

## State Variables

### isUrd

```solidity
mapping(address => bool) public isUrd
```

## Functions

### createUrd

Creates a new URD contract using CREATE2 opcode.

```solidity
function createUrd(
    address initialOwner,
    uint256 initialTimelock,
    bytes32 initialRoot,
    bytes32 initialIpfsHash,
    bytes32 salt
) public returns (IUniversalRewardsDistributor urd);
```

**Parameters**

| Name              | Type      | Description                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------- |
| `initialOwner`    | `address` | The initial owner of the URD.                                                            |
| `initialTimelock` | `uint256` | The initial timelock of the URD.                                                         |
| `initialRoot`     | `bytes32` | The initial merkle root of the URD.                                                      |
| `initialIpfsHash` | `bytes32` | The optional ipfs hash containing metadata about the root (e.g. the merkle tree itself). |
| `salt`            | `bytes32` | The salt used for CREATE2 opcode.                                                        |

**Returns**

| Name  | Type                           | Description                           |
| ----- | ------------------------------ | ------------------------------------- |
| `urd` | `IUniversalRewardsDistributor` | The address of the newly created URD. |
