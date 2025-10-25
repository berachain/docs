---
head:
  - - meta
    - property: og:title
      content: Meta Morpho Factory V1.1 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Meta Morpho Factory V1.1 contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Meta Morpho Factory V1.1 contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# MetaMorphoFactoryV1_1

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.metaMorphoFactoryV1_1.address.berachainMainnet+ '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.metaMorphoFactoryV1_1.address.berachainMainnet}}</a> | [Git Source](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/MetaMorphoV1_1Factory.sol)</small>

**Inherits:** [IMetaMorphoV1_1Factory](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/interfaces/IMetaMorphoV1_1Factory.sol)

This contract allows to create MetaMorphoV1_1 vaults, and to index them easily.

## State Variables

### MORPHO

The address of the Morpho contract.

```solidity
address public immutable MORPHO
```

### FEE_PARTITIONER

The fee partitioner.

Internal due to contract size limit.

```solidity
address internal immutable FEE_PARTITIONER
```

### isMetaMorpho

```solidity
mapping(address => bool) public isMetaMorpho
```

## Functions

### constructor

Initializes the contract.

```solidity
constructor(address morpho, address feePartitioner) ;
```

**Parameters**

| Name             | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| `morpho`         | `address` | The address of the Morpho contract. |
| `feePartitioner` | `address` |                                     |

### createMetaMorpho

Creates a new MetaMorphoV1_1 vault.

```solidity
function createMetaMorpho(
    address initialOwner,
    uint256 initialTimelock,
    address asset,
    string memory name,
    string memory symbol,
    bytes32 salt
) external returns (IMetaMorphoV1_1 metaMorpho);
```

**Parameters**

| Name              | Type      | Description                                                     |
| ----------------- | --------- | --------------------------------------------------------------- |
| `initialOwner`    | `address` | The owner of the vault.                                         |
| `initialTimelock` | `uint256` | The initial timelock of the vault.                              |
| `asset`           | `address` | The address of the underlying asset.                            |
| `name`            | `string`  | The name of the vault.                                          |
| `symbol`          | `string`  | The symbol of the vault.                                        |
| `salt`            | `bytes32` | The salt to use for the MetaMorphoV1_1 vault's CREATE2 address. |
