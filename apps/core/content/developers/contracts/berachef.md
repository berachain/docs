<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IBeraChef

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.berachef.address">{{config.contracts.berachef.address}}</a><span v-if="config.contracts.berachef.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.berachef.abi">ABI JSON</a></span></small>

Interface of the BeraChef module which decides where Validators are directing their `$BGT` emissions to different Reward Vaults.

## Functions

### getActiveCuttingBoard

Returns the active reward allocation for validator with given coinbase address

```solidity
function getActiveCuttingBoard(address valCoinbase) external view returns (RewardAllocation memory);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valPubkey` | `bytes` | The validator's public key. |

**Returns**

| Name     | Type           | Description                            |
| -------- | -------------- | -------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The active reward allocation. |

### getQueuedCuttingBoard

Returns the queued reward allocation for a validator with given coinbase address

```solidity
function getQueuedCuttingBoard(address valCoinbase) external view returns (RewardAllocation memory);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |

**Returns**

| Name     | Type           | Description                            |
| -------- | -------------- | -------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The queued reward allocation. |

### getOperator

Returns the operator address for a validator.

```solidity
function getOperator(address valCoinbase) external view returns (address);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `address` | operatorAddress the operator address. |

### getDefaultCuttingBoard

Returns the default reward allocation for validators that do not have a customized reward allocation.

```solidity
function getDefaultCuttingBoard() external view returns (RewardAllocation memory);
```

**Returns**

| Name     | Type           | Description                             |
| -------- | -------------- | --------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The default reward allocation. |

### isQueuedCuttingBoardReady

Returns the status of whether a queued reward allocation is ready to be activated.

```solidity
function isQueuedCuttingBoardReady(address valCoinbase, uint256 blockNumber) external view returns (bool);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |
| `blockNumber` | `uint256` | The block number to be queried.        |

**Returns**

| Name     | Type   | Description                                                                         |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| `<none>` | `bool` | isReady True if the queued reward allocation is ready to be activated, false otherwise. |

### isReady

Returns the status of whether the BeraChef contract is ready to be used.

_This function should be used by all contracts that depend on a system call._

_This will return false if the governance module has not set a default reward allocation yet._

```solidity
function isReady() external view returns (bool);
```

**Returns**

| Name     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| `<none>` | `bool` | isReady True if the BeraChef is ready to be used, false otherwise. |

### setMaxNumWeightsPerCuttingBoard

Sets the maximum number of weights per reward allocation.

```solidity
function setMaxNumWeightsPerCuttingBoard(uint8 _maxNumWeightsPerCuttingBoard) external;
```

### setCuttingBoardBlockDelay

Sets the delay in blocks before a new reward allocation can be queued.

```solidity
function setCuttingBoardBlockDelay(uint64 _cuttingBoardBlockDelay) external;
```

### updateWhitelistedVaults

Updates the isWhitelistedVaults mapping, the status of whether a receiver is whitelisted or not.

The caller of this function must be the governance module account.

```solidity
function updateWhitelistedVaults(address receiver, bool isFriend) external;
```

**Parameters**

| Name       | Type      | Description                                                                       |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `receiver` | `address` | The address to remove or add as a friend of the chef.                             |
| `isFriend` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |

### setDefaultCuttingBoard

Sets the default reward allocation for validators that do not have a reward allocation.

_The caller of this function must be the governance module account._

```solidity
function setDefaultCuttingBoard(RewardAllocation calldata rewardAllocation) external;
```

**Parameters**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| `rewardAllocation` | `RewardAllocation` | The default reward allocation. |

### queueNewCuttingBoard

Add a new reward allocation to the queue for validator with given coinbase address.

_The weights of the reward allocation must add up to 100% or 1e4. Only whitelisted reward vaults may be used as well._

```solidity
function queueNewCuttingBoard(address valCoinbase, uint64 startBlock, Weight[] calldata weights) external;
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The coinbase address of the validator.             |
| `startBlock`  | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`     | `Weight[]` | The weights of the reward allocation.                  |

### activateQueuedCuttingBoard

Activates the queued reward allocation for a validator.

_Should be called by the distribution contract._

```solidity
function activateQueuedCuttingBoard(address valCoinbase, uint256 blockNumber) external;
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |
| `blockNumber` | `uint256` | The block number being processed.      |

### setOperator

Sets an address that can set reward allocations on a validator's behalf.

```solidity
function setOperator(address operatorAddress) external;
```

**Parameters**

| Name              | Type      | Description                                                      |
| ----------------- | --------- | ---------------------------------------------------------------- |
| `operatorAddress` | `address` | The address that can set reward allocations on a validator's behalf. |

## Events

### MaxNumWeightsPerCuttingBoardSet

Emitted when the maximum number of weights per reward allocation has been set.

```solidity
event MaxNumWeightsPerCuttingBoardSet(uint8 maxNumWeightsPerCuttingBoard);
```

**Parameters**

| Name                           | Type    | Description                                      |
| ------------------------------ | ------- | ------------------------------------------------ |
| `maxNumWeightsPerCuttingBoard` | `uint8` | The maximum number of weights per reward allocation. |

### CuttingBoardBlockDelaySet

Emitted when the delay in blocks before a new reward allocation can go into effect has been set.

```solidity
event CuttingBoardBlockDelaySet(uint64 cuttingBoardBlockDelay);
```

**Parameters**

| Name                     | Type     | Description                                                        |
| ------------------------ | -------- | ------------------------------------------------------------------ |
| `cuttingBoardBlockDelay` | `uint64` | The delay in blocks before a new reward allocation can go into effect. |

### WhitelistedVaultsUpdated

Emitted when the whitelisted vaults have been updated.

```solidity
event WhitelistedVaultsUpdated(address indexed receiver, bool indexed isFriend);
```

**Parameters**

| Name       | Type      | Description                                                                       |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `receiver` | `address` | The address to remove or add as a friend of the chef.                             |
| `isFriend` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |

### QueueCuttingBoard

Emitted when a new reward allocation has been queued.

```solidity
event QueueCuttingBoard(address indexed valCoinbase, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The validator's coinbase address.                  |
| `startBlock`  | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`     | `Weight[]` | The weights of the reward allocation.                  |

### ActivateCuttingBoard

Emitted when a new reward allocation has been activated.

```solidity
event ActivateCuttingBoard(address indexed valCoinbase, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The validator's coinbase address.                  |
| `startBlock`  | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`     | `Weight[]` | The weights of the reward allocation.                  |

### SetOperator

Emitted when a operator address has been set for a validator.

```solidity
event SetOperator(address indexed valCoinbase, address indexed operatorAddress);
```

**Parameters**

| Name              | Type      | Description                       |
| ----------------- | --------- | --------------------------------- |
| `valCoinbase`     | `address` | The validator's coinbase address. |
| `operatorAddress` | `address` | The operator address.             |

### SetDefaultCuttingBoard

Emitted when the governance module has set a new default reward allocation.

```solidity
event SetDefaultCuttingBoard(RewardAllocation rewardAllocation);
```

**Parameters**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| `rewardAllocation` | `RewardAllocation` | The default reward allocation. |

## Structs

### RewardAllocation

Represents a RewardAllocation entry

```solidity
struct RewardAllocation {
    uint64 startBlock;
    Weight[] weights;
}
```

### Weight

Represents a Weight entry

```solidity
struct Weight {
    address receiver;
    uint96 percentageNumerator;
}
```
