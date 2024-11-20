<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IBeraChef

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.berachef.address">{{config.contracts.berachef.address}}</a><span v-if="config.contracts.berachef.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.berachef.abi">ABI JSON</a></span></small>

Interface of the BeraChef module which decides where Validators are directing their `$BGT` emissions to different Reward Vaults.

## Functions

### getActiveCuttingBoard

Returns the active cutting board for validator with given coinbase address

```solidity
function getActiveCuttingBoard(address valCoinbase) external view returns (CuttingBoard memory);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |

**Returns**

| Name     | Type           | Description                            |
| -------- | -------------- | -------------------------------------- |
| `<none>` | `CuttingBoard` | cuttingBoard The active cutting board. |

### getQueuedCuttingBoard

Returns the queued cutting board for a validator with given coinbase address

```solidity
function getQueuedCuttingBoard(address valCoinbase) external view returns (CuttingBoard memory);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `valCoinbase` | `address` | The coinbase address of the validator. |

**Returns**

| Name     | Type           | Description                            |
| -------- | -------------- | -------------------------------------- |
| `<none>` | `CuttingBoard` | cuttingBoard The queued cutting board. |

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

Returns the default cutting board for validators that do not have a cutting board.

```solidity
function getDefaultCuttingBoard() external view returns (CuttingBoard memory);
```

**Returns**

| Name     | Type           | Description                             |
| -------- | -------------- | --------------------------------------- |
| `<none>` | `CuttingBoard` | cuttingBoard The default cutting board. |

### isQueuedCuttingBoardReady

Returns the status of whether a queued cutting board is ready to be activated.

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
| `<none>` | `bool` | isReady True if the queued cutting board is ready to be activated, false otherwise. |

### isReady

Returns the status of whether the BeraChef contract is ready to be used.

_This function should be used by all contracts that depend on a system call._

_This will return false if the governance module has not set a default cutting board yet._

```solidity
function isReady() external view returns (bool);
```

**Returns**

| Name     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| `<none>` | `bool` | isReady True if the BeraChef is ready to be used, false otherwise. |

### setMaxNumWeightsPerCuttingBoard

Sets the maximum number of weights per cutting board.

```solidity
function setMaxNumWeightsPerCuttingBoard(uint8 _maxNumWeightsPerCuttingBoard) external;
```

### setCuttingBoardBlockDelay

Sets the delay in blocks before a new cutting board can be queued.

```solidity
function setCuttingBoardBlockDelay(uint64 _cuttingBoardBlockDelay) external;
```

### updateFriendsOfTheChef

Updates the friends of the chef, the status of whether a receiver is whitelisted or not.

The caller of this function must be the governance module account.

```solidity
function updateFriendsOfTheChef(address receiver, bool isFriend) external;
```

**Parameters**

| Name       | Type      | Description                                                                       |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `receiver` | `address` | The address to remove or add as a friend of the chef.                             |
| `isFriend` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |

### setDefaultCuttingBoard

Sets the default cutting board for validators that do not have a cutting board.

_The caller of this function must be the governance module account._

```solidity
function setDefaultCuttingBoard(CuttingBoard calldata cuttingBoard) external;
```

**Parameters**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| `cuttingBoard` | `CuttingBoard` | The default cutting board. |

### queueNewCuttingBoard

Add a new cutting board to the queue for validator with given coinbase address.

_The weights of the cutting board must add up to 100% or 1e4. Only whitelisted pools may be used as well._

```solidity
function queueNewCuttingBoard(address valCoinbase, uint64 startBlock, Weight[] calldata weights) external;
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The coinbase address of the validator.             |
| `startBlock`  | `uint64`   | The block that the cutting board goes into effect. |
| `weights`     | `Weight[]` | The weights of the cutting board.                  |

### activateQueuedCuttingBoard

Activates the queued cutting board for a validator.

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

Sets an address that can set cutting boards on a validator's behalf.

```solidity
function setOperator(address operatorAddress) external;
```

**Parameters**

| Name              | Type      | Description                                                      |
| ----------------- | --------- | ---------------------------------------------------------------- |
| `operatorAddress` | `address` | The address that can set cutting boards on a validator's behalf. |

## Events

### MaxNumWeightsPerCuttingBoardSet

Emitted when the maximum number of weights per cutting board has been set.

```solidity
event MaxNumWeightsPerCuttingBoardSet(uint8 maxNumWeightsPerCuttingBoard);
```

**Parameters**

| Name                           | Type    | Description                                      |
| ------------------------------ | ------- | ------------------------------------------------ |
| `maxNumWeightsPerCuttingBoard` | `uint8` | The maximum number of weights per cutting board. |

### CuttingBoardBlockDelaySet

Emitted when the delay in blocks before a new cutting board can go into effect has been set.

```solidity
event CuttingBoardBlockDelaySet(uint64 cuttingBoardBlockDelay);
```

**Parameters**

| Name                     | Type     | Description                                                        |
| ------------------------ | -------- | ------------------------------------------------------------------ |
| `cuttingBoardBlockDelay` | `uint64` | The delay in blocks before a new cutting board can go into effect. |

### FriendsOfTheChefUpdated

Emitted when the friends of the chef have been updated.

```solidity
event FriendsOfTheChefUpdated(address indexed receiver, bool indexed isFriend);
```

**Parameters**

| Name       | Type      | Description                                                                       |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `receiver` | `address` | The address to remove or add as a friend of the chef.                             |
| `isFriend` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |

### QueueCuttingBoard

Emitted when a new cutting board has been queued.

```solidity
event QueueCuttingBoard(address indexed valCoinbase, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The validator's coinbase address.                  |
| `startBlock`  | `uint64`   | The block that the cutting board goes into effect. |
| `weights`     | `Weight[]` | The weights of the cutting board.                  |

### ActivateCuttingBoard

Emitted when a new cutting board has been activated.

```solidity
event ActivateCuttingBoard(address indexed valCoinbase, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name          | Type       | Description                                        |
| ------------- | ---------- | -------------------------------------------------- |
| `valCoinbase` | `address`  | The validator's coinbase address.                  |
| `startBlock`  | `uint64`   | The block that the cutting board goes into effect. |
| `weights`     | `Weight[]` | The weights of the cutting board.                  |

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

Emitted when the governance module has set a new default cutting board.

```solidity
event SetDefaultCuttingBoard(CuttingBoard cuttingBoard);
```

**Parameters**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| `cuttingBoard` | `CuttingBoard` | The default cutting board. |

## Structs

### CuttingBoard

Represents a CuttingBoard entry

```solidity
struct CuttingBoard {
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
