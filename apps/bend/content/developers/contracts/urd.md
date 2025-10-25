---
head:
  - - meta
    - property: og:title
      content: Universal Reward Distributer Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Universal Reward Distributer contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Universal Reward Distributer contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# UniversalRewardsDistributor

> <small>[Git Source](https://github.com/morpho-org/universal-rewards-distributor/blob/main/src/UniversalRewardsDistributor.sol)</small>

**Inherits:** [IUniversalRewardsDistributorStaticTyping](https://github.com/morpho-org/universal-rewards-distributor/blob/main/src/interfaces/IUniversalRewardsDistributor.sol)

This contract enables the distribution of various reward tokens to multiple accounts using different
permissionless Merkle trees.

## State Variables

### root

The merkle root of this distribution.

```solidity
bytes32 public root
```

### ipfsHash

The optional ipfs hash containing metadata about the root (e.g. the merkle tree itself).

```solidity
bytes32 public ipfsHash
```

### claimed

The `amount` of `reward` token already claimed by `account`.

```solidity
mapping(address account => mapping(address reward => uint256 amount)) public claimed
```

### owner

The address that can update the distribution parameters, and freeze a root.

```solidity
address public owner
```

### isUpdater

The addresses that can update the merkle root.

```solidity
mapping(address => bool) public isUpdater
```

### timelock

The timelock related to root updates.

```solidity
uint256 public timelock
```

### pendingRoot

The pending root of the distribution.

If the pending root is set, the root can be updated after the timelock has expired.

The pending root is skipped if the timelock is set to 0.

```solidity
PendingRoot public pendingRoot
```

## Functions

### onlyOwner

Reverts if the caller is not the owner.

```solidity
modifier onlyOwner() ;
```

### onlyUpdaterRole

Reverts if the caller has not the updater role.

```solidity
modifier onlyUpdaterRole() ;
```

### constructor

Initializes the contract.

Warning: The `initialIpfsHash` might not correspond to the `initialRoot`.

```solidity
constructor(address initialOwner, uint256 initialTimelock, bytes32 initialRoot, bytes32 initialIpfsHash) ;
```

**Parameters**

| Name              | Type      | Description                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------- |
| `initialOwner`    | `address` | The initial owner of the contract.                                                       |
| `initialTimelock` | `uint256` | The initial timelock of the contract.                                                    |
| `initialRoot`     | `bytes32` | The initial merkle root.                                                                 |
| `initialIpfsHash` | `bytes32` | The optional ipfs hash containing metadata about the root (e.g. the merkle tree itself). |

### submitRoot

Submits a new merkle root.

Warning: The `newIpfsHash` might not correspond to the `newRoot`.

```solidity
function submitRoot(bytes32 newRoot, bytes32 newIpfsHash) external onlyUpdaterRole;
```

**Parameters**

| Name          | Type      | Description                                                                              |
| ------------- | --------- | ---------------------------------------------------------------------------------------- |
| `newRoot`     | `bytes32` | The new merkle root.                                                                     |
| `newIpfsHash` | `bytes32` | The optional ipfs hash containing metadata about the root (e.g. the merkle tree itself). |

### acceptRoot

Accepts and sets the current pending merkle root.

This function can only be called after the timelock has expired.

Anyone can call this function.

```solidity
function acceptRoot() external;
```

### revokePendingRoot

Revokes the pending root.

Can be frontrunned with `acceptRoot` in case the timelock has passed.

```solidity
function revokePendingRoot() external onlyUpdaterRole;
```

### claim

Claims rewards.

Anyone can claim rewards on behalf of an account.

```solidity
function claim(address account, address reward, uint256 claimable, bytes32[] calldata proof)
    external
    returns (uint256 amount);
```

**Parameters**

| Name        | Type        | Description                                    |
| ----------- | ----------- | ---------------------------------------------- |
| `account`   | `address`   | The address to claim rewards for.              |
| `reward`    | `address`   | The address of the reward token.               |
| `claimable` | `uint256`   | The overall claimable amount of token rewards. |
| `proof`     | `bytes32[]` | The merkle proof that validates this claim.    |

**Returns**

| Name     | Type      | Description                         |
| -------- | --------- | ----------------------------------- |
| `amount` | `uint256` | The amount of reward token claimed. |

### setRoot

Forces update the root of a given distribution (bypassing the timelock).

This function can only be called by the owner of the distribution or by updaters if there is no timelock.

Set to bytes32(0) to remove the root.

```solidity
function setRoot(bytes32 newRoot, bytes32 newIpfsHash) external onlyUpdaterRole;
```

**Parameters**

| Name          | Type      | Description                                                                              |
| ------------- | --------- | ---------------------------------------------------------------------------------------- |
| `newRoot`     | `bytes32` | The new merkle root.                                                                     |
| `newIpfsHash` | `bytes32` | The optional ipfs hash containing metadata about the root (e.g. the merkle tree itself). |

### setTimelock

Sets the timelock of a given distribution.

This function can only be called by the owner of the distribution.

The timelock modification are not applicable to the pending values.

```solidity
function setTimelock(uint256 newTimelock) external onlyOwner;
```

**Parameters**

| Name          | Type      | Description       |
| ------------- | --------- | ----------------- |
| `newTimelock` | `uint256` | The new timelock. |

### setRootUpdater

Sets the root updater of a given distribution.

```solidity
function setRootUpdater(address updater, bool active) external onlyOwner;
```

**Parameters**

| Name      | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| `updater` | `address` | The address of the root updater.                  |
| `active`  | `bool`    | Whether the root updater should be active or not. |

### setOwner

Sets the `owner` of the distribution to `newOwner`.

```solidity
function setOwner(address newOwner) external onlyOwner;
```

### \_setRoot

Sets the `root` and `ipfsHash` to `newRoot` and `newIpfsHash`.

Deletes the pending root.

Warning: The `newIpfsHash` might not correspond to the `newRoot`.

```solidity
function _setRoot(bytes32 newRoot, bytes32 newIpfsHash) internal;
```

### \_setOwner

Sets the `owner` of the distribution to `newOwner`.

```solidity
function _setOwner(address newOwner) internal;
```

### \_setTimelock

Sets the `timelock` to `newTimelock`.

```solidity
function _setTimelock(uint256 newTimelock) internal;
```
