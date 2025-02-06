<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BeraChef

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.berachef.address">{{config.mainnet.contracts.berachef.address}}</a><span v-if="config.mainnet.contracts.berachef.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.berachef.abi">ABI JSON</a></span></small>

Interface of the BeraChef module for configuring where Validators are directing their `$BGT` emissions to different Reward Vaults.

## Functions

### getActiveRewardAllocation

Returns the active reward allocation for validator with given pubkey

```solidity
function getActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                                    |
| -------- | ------------------ | ---------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The active reward allocation. |

### getQueuedRewardAllocation

Returns the queued reward allocation for a validator with given pubkey

```solidity
function getQueuedRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                                    |
| -------- | ------------------ | ---------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The queued reward allocation. |

### getSetActiveRewardAllocation

Returns the active reward allocation set by the validator with given pubkey.

_This will return active reward allocation set by validators even if its not valid._

```solidity
function getSetActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                             |
| -------- | ------------------ | --------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The reward allocation. |

### getDefaultRewardAllocation

Returns the default reward allocation for validators that do not have a reward allocation.

```solidity
function getDefaultRewardAllocation() external view returns (RewardAllocation memory);
```

**Returns**

| Name     | Type               | Description                                     |
| -------- | ------------------ | ----------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The default reward allocation. |

### isQueuedRewardAllocationReady

Returns the status of whether a queued reward allocation is ready to be activated.

```solidity
function isQueuedRewardAllocationReady(bytes calldata valPubkey, uint256 blockNumber) external view returns (bool);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `valPubkey`   | `bytes`   | The validator's pubkey.         |
| `blockNumber` | `uint256` | The block number to be queried. |

**Returns**

| Name     | Type   | Description                                                                             |
| -------- | ------ | --------------------------------------------------------------------------------------- |
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

### setMaxNumWeightsPerRewardAllocation

Sets the maximum number of weights per reward allocation.

```solidity
function setMaxNumWeightsPerRewardAllocation(uint8 _maxNumWeightsPerRewardAllocation) external;
```

### setRewardAllocationBlockDelay

Sets the delay in blocks before a new reward allocation can be queued.

```solidity
function setRewardAllocationBlockDelay(uint64 _rewardAllocationBlockDelay) external;
```

### setVaultWhitelistedStatus

Updates the vault's whitelisted status

The caller of this function must be the governance module account.

```solidity
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external;
```

**Parameters**

| Name            | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| `receiver`      | `address` | The address to remove or add as whitelisted vault.                                |
| `isWhitelisted` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |
| `metadata`      | `string`  | The metadata of the vault.                                                        |

### updateWhitelistedVaultMetadata

Updates the metadata of a whitelisted vault, reverts if vault is not whitelisted.

The caller of this function must be the governance module account.

```solidity
function updateWhitelistedVaultMetadata(address receiver, string memory metadata) external;
```

**Parameters**

| Name       | Type      | Description                                                                    |
| ---------- | --------- | ------------------------------------------------------------------------------ |
| `receiver` | `address` | The address of the whitelisted vault.                                          |
| `metadata` | `string`  | The metadata of the vault, to associate info with the vault in the events log. |

### setDefaultRewardAllocation

Sets the default reward allocation for validators that do not have a reward allocation.

_The caller of this function must be the governance module account._

```solidity
function setDefaultRewardAllocation(RewardAllocation calldata rewardAllocation) external;
```

**Parameters**

| Name               | Type               | Description                    |
| ------------------ | ------------------ | ------------------------------ |
| `rewardAllocation` | `RewardAllocation` | The default reward allocation. |

### queueNewRewardAllocation

Add a new reward allocation to the queue for validator with given pubkey. Does not allow overwriting of existing queued reward allocation.

_The weights of the reward allocation must add up to 100% or 1e4.
Only whitelisted pools may be used as well._

```solidity
function queueNewRewardAllocation(bytes calldata valPubkey, uint64 startBlock, Weight[] calldata weights) external;
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### activateReadyQueuedRewardAllocation

Activates the queued reward allocation for a validator if its ready for the current block.

_Should be called by the distribution contract._

```solidity
function activateReadyQueuedRewardAllocation(bytes calldata valPubkey) external;
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

## Events

### MaxNumWeightsPerRewardAllocationSet

Emitted when the maximum number of weights per reward allocation has been set.

```solidity
event MaxNumWeightsPerRewardAllocationSet(uint8 maxNumWeightsPerRewardAllocation);
```

**Parameters**

| Name                               | Type    | Description                                          |
| ---------------------------------- | ------- | ---------------------------------------------------- |
| `maxNumWeightsPerRewardAllocation` | `uint8` | The maximum number of weights per reward allocation. |

### RewardAllocationBlockDelaySet

Emitted when the delay in blocks before a new reward allocation can go into effect has been set.

```solidity
event RewardAllocationBlockDelaySet(uint64 rewardAllocationBlockDelay);
```

**Parameters**

| Name                         | Type     | Description                                                            |
| ---------------------------- | -------- | ---------------------------------------------------------------------- |
| `rewardAllocationBlockDelay` | `uint64` | The delay in blocks before a new reward allocation can go into effect. |

### VaultWhitelistedStatusUpdated

Emitted when the vault's whitelisted status have been updated.

```solidity
event VaultWhitelistedStatusUpdated(address indexed receiver, bool indexed isWhitelisted, string metadata);
```

**Parameters**

| Name            | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| `receiver`      | `address` | The address to remove or add as whitelisted vault.                                |
| `isWhitelisted` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |
| `metadata`      | `string`  | The metadata of the vault.                                                        |

### WhitelistedVaultMetadataUpdated

Emitted when the metadata of a whitelisted vault has been updated.

```solidity
event WhitelistedVaultMetadataUpdated(address indexed receiver, string metadata);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `receiver` | `address` | The address of the whitelisted vault. |
| `metadata` | `string`  | The metadata of the vault.            |

### QueueRewardAllocation

Emitted when a new reward allocation has been queued.

```solidity
event QueueRewardAllocation(bytes indexed valPubkey, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### ActivateRewardAllocation

Emitted when a new reward allocation has been activated.

```solidity
event ActivateRewardAllocation(bytes indexed valPubkey, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### SetDefaultRewardAllocation

Emitted when the governance module has set a new default reward allocation.

```solidity
event SetDefaultRewardAllocation(RewardAllocation rewardAllocation);
```

**Parameters**

| Name               | Type               | Description                    |
| ------------------ | ------------------ | ------------------------------ |
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
