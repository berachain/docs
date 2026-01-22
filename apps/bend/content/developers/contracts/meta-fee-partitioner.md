---
head:
  - - meta
    - property: og:title
      content: Meta Fee Partitioner Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Meta Fee Partitioner contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Meta Fee Partitioner contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Meta Fee Partitioner

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.metaFeePartitioner.address.berachainMainnet+ '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.metaFeePartitioner.address.berachainMainnet}}</a> | [Git Source](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/MetaFeePartitioner.sol)</small>

**Inherits:** [IMetaFeePartitioner](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/interfaces/IMetaFeePartitioner.sol), Initializable, OwnableUpgradeable, UUPSUpgradeable

An utility contract the signals to each vault how to partition the fee between its recipient and the morpho
one.

The morpho fee recipient is named as "platform fee recipient" in order to avoid confusion.

## State Variables

### ONE_HUNDRED_PERCENT

```solidity
uint256 private constant ONE_HUNDRED_PERCENT = 10000
```

### INIT_FEE_PERCENTAGE

The init fee percentage value.

```solidity
uint256 public constant INIT_FEE_PERCENTAGE = 1500
```

### defaultPlatformFeePercentage

The default platform fee percentage each vault has if no specific fee is set.

```solidity
uint256 public defaultPlatformFeePercentage
```

### \_vaultFeePercentages

Percentage of fees collected by the platform.

The percentage is represented as a value between 0 and ONE_HUNDRED_PERCENT

The remaining percentage (ONE_HUNDRED_PERCENT - platformPercentage) is collected by the vault
feeRecipient.

```solidity
mapping(address => FeePercentage) internal _vaultFeePercentages
```

## Functions

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor() ;
```

### initialize

Initializes the contract.

```solidity
function initialize(address governance) external initializer;
```

**Parameters**

| Name         | Type      | Description                    |
| ------------ | --------- | ------------------------------ |
| `governance` | `address` | The address of the governance. |

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address) internal override onlyOwner;
```

### setFeePercentage

Sets the fee percentage for a vault that is taken by the platform.

```solidity
function setFeePercentage(address vault, uint256 newFee) external onlyOwner;
```

**Parameters**

| Name     | Type      | Description                                            |
| -------- | --------- | ------------------------------------------------------ |
| `vault`  | `address` | The address of the vault.                              |
| `newFee` | `uint256` | The fee percentage to set, represented in basis points |

### setDefaultPlatformFeePercentage

Sets the default platform fee percentage.

```solidity
function setDefaultPlatformFeePercentage(uint256 newFee) external onlyOwner;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `newFee` | `uint256` | The new default fee percentage |

### getShares

Get the vault fee splitted between the platform and the vault recipient.

```solidity
function getShares(address vault, uint256 fee)
    external
    view
    returns (uint256 platformShare, uint256 recipientShare);
```

**Parameters**

| Name    | Type      | Description               |
| ------- | --------- | ------------------------- |
| `vault` | `address` | The address of the vault. |
| `fee`   | `uint256` | The fee amount.           |

**Returns**

| Name             | Type      | Description                             |
| ---------------- | --------- | --------------------------------------- |
| `platformShare`  | `uint256` | The fee amount for the platform.        |
| `recipientShare` | `uint256` | The fee amount for the vault recipient. |

### getPlatformPercentage

The percentage of fees collected by the platform for a specific vault.

```solidity
function getPlatformPercentage(address vault) public view returns (uint256 percentage);
```

**Parameters**

| Name    | Type      | Description               |
| ------- | --------- | ------------------------- |
| `vault` | `address` | The address of the vault. |

**Returns**

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `percentage` | `uint256` | The fee percentage in basis points (10000 = 100%). |

## Structs

### FeePercentage

```solidity
struct FeePercentage {
    // Share for the platform in basis points:
    uint256 platformPercentage;
    // Whether the fee percentage has been set:
    bool isSet;
}
```
