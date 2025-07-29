---
head:
  - - meta
    - property: og:title
      content: BeraChef Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BeraChef contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BeraChef contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BeraChef

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.berachef['mainnet-address']">{{config.contracts.pol.berachef['mainnet-address']}}</a><span v-if="config.contracts.pol.berachef.abi && config.contracts.pol.berachef.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.berachef.abi">ABI JSON</a></span></small>

The BeraChef contract is responsible for managing the reward allocations and the whitelisted vaults. Reward allocation is a list of weights that determine the percentage of rewards that goes to each reward vault. Each validator could have a custom reward allocation, if not, the default reward allocation is used.

**Inherits:**
[IBeraChef](/src/pol/interfaces/IBeraChef.sol/interface.IBeraChef.md), OwnableUpgradeable, UUPSUpgradeable

## Constants

### MAX_COMMISSION_RATE

Represents the maximum commission rate per validator, set to 20%.

```solidity
uint96 public constant MAX_COMMISSION_RATE = 0.2e4;
```

### MAX_REWARD_ALLOCATION_BLOCK_DELAY

With 2 second block time, this is ~30 days.

```solidity
uint64 public constant MAX_REWARD_ALLOCATION_BLOCK_DELAY = 1_315_000;
```

## Structs

### CommissionRate

The commission rate struct for validators.

```solidity
struct CommissionRate {
    uint32 activationBlock;
    uint96 commissionRate;
}
```

**Properties**

| Name              | Type     | Description                                                 |
| ----------------- | -------- | ----------------------------------------------------------- |
| `activationBlock` | `uint32` | The block number in which the commission rate was activated |
| `commissionRate`  | `uint96` | The commission rate to be used by the validator             |

### QueuedCommissionRateChange

The queued commission rate change struct for validators.

```solidity
struct QueuedCommissionRateChange {
    uint32 blockNumberLast;
    uint96 commissionRate;
}
```

**Properties**

| Name              | Type     | Description                                            |
| ----------------- | -------- | ------------------------------------------------------ |
| `blockNumberLast` | `uint32` | The last block number commission rate was queued       |
| `commissionRate`  | `uint96` | The queued commission rate to be used by the validator |

### RewardAllocation

The reward allocation struct containing start block and weights.

```solidity
struct RewardAllocation {
    uint64 startBlock;
    Weight[] weights;
}
```

**Properties**

| Name         | Type       | Description                                         |
| ------------ | ---------- | --------------------------------------------------- |
| `startBlock` | `uint64`   | The block number when the allocation becomes active |
| `weights`    | `Weight[]` | Array of weights for reward distribution            |

### Weight

The weight struct for reward allocation.

```solidity
struct Weight {
    address receiver;
    uint96 percentageNumerator;
}
```

**Properties**

| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `receiver`            | `address` | The address receiving the rewards       |
| `percentageNumerator` | `uint96`  | The percentage numerator for the weight |

## State Variables

### beaconDepositContract

```solidity
IBeaconDeposit public beaconDepositContract;
```

### commissionChangeDelay

The delay in blocks before a new commission rate can go into effect.

```solidity
uint64 public commissionChangeDelay;
```

### distributor

The address of the distributor contract.

```solidity
address public distributor;
```

### factory

The address of the reward vault factory contract.

```solidity
address public factory;
```

### isWhitelistedVault

Mapping of receiver address to whether they are white-listed or not.

```solidity
mapping(address receiver => bool) public isWhitelistedVault;
```

### maxNumWeightsPerRewardAllocation

The maximum number of weights per reward allocation.

```solidity
uint8 public maxNumWeightsPerRewardAllocation;
```

### maxWeightPerVault

The maximum weight a vault can assume in the reward allocation

```solidity
uint96 public maxWeightPerVault;
```

### rewardAllocationBlockDelay

The delay in blocks before a new reward allocation can go into effect.

```solidity
uint64 public rewardAllocationBlockDelay;
```

## View Functions

### getActiveRewardAllocation

Returns the active reward allocation for validator with given pubkey

_Returns the active reward allocation if validator has a reward allocation and the weights are still valid, otherwise the default reward allocation._

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

### getDefaultRewardAllocation

Returns the default reward allocation for validators that do not have a reward allocation.

```solidity
function getDefaultRewardAllocation() external view returns (RewardAllocation memory);
```

**Returns**

| Name     | Type               | Description                                     |
| -------- | ------------------ | ----------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The default reward allocation. |

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

### getValCommissionOnIncentiveTokens

Returns the commission rate of a validator on an incentive tokens.

_Default commission rate is 5% if the commission was never set._

```solidity
function getValCommissionOnIncentiveTokens(bytes calldata valPubkey) external view returns (uint96);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type     | Description                                                                  |
| -------- | -------- | ---------------------------------------------------------------------------- |
| `<none>` | `uint96` | commissionRate The commission rate of the validator on the incentive tokens. |

### getValQueuedCommissionOnIncentiveTokens

Returns the queued commission struct of a validator on an incentive tokens.

```solidity
function getValQueuedCommissionOnIncentiveTokens(bytes calldata valPubkey)
    external
    view
    returns (QueuedCommissionRateChange memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type                         | Description                                                                                 |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------- |
| `<none>` | `QueuedCommissionRateChange` | queuedCommissionRate The queued commission struct of the validator on the incentive tokens. |

### getValidatorIncentiveTokenShare

Returns the validator's share of the incentive tokens based on the validator's commission rate.

```solidity
function getValidatorIncentiveTokenShare(
    bytes calldata valPubkey,
    uint256 incentiveTokenAmount
)
    external
    view
    returns (uint256);
```

**Parameters**

| Name                   | Type      | Description                         |
| ---------------------- | --------- | ----------------------------------- |
| `valPubkey`            | `bytes`   | The validator's pubkey.             |
| `incentiveTokenAmount` | `uint256` | The amount of the incentive tokens. |

**Returns**

| Name     | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| `<none>` | `uint256` | validatorShare The validator's share of the incentive tokens. |

### isQueuedRewardAllocationReady

Returns the status of whether a queued reward allocation is ready to be activated.

```solidity
function isQueuedRewardAllocationReady(bytes calldata valPubkey, uint256 blockNumber) public view returns (bool);
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

```solidity
function isReady() external view returns (bool);
```

**Returns**

| Name     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| `<none>` | `bool` | isReady True if the BeraChef is ready to be used, false otherwise. |

## Functions

### activateQueuedValCommission

Activates the queued commission rate of a validator on incentive tokens.

**Emits:**

- [ValidatorCommissionActivated](#event-validatorcommissionactivated)

```solidity
function activateQueuedValCommission(bytes calldata valPubkey) external;
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

### activateReadyQueuedRewardAllocation

Activates the queued reward allocation for a validator if its ready for the current block.

_Should be called by the distribution contract._

**Emits:**

- [RewardAllocationActivated](#event-rewardallocationactivated)

```solidity
function activateReadyQueuedRewardAllocation(bytes calldata valPubkey) external onlyDistributor;
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

### initialize

```solidity
function initialize(
    address _distributor,
    address _factory,
    address _governance,
    address _beaconDepositContract,
    uint8 _maxNumWeightsPerRewardAllocation
)
    external
    initializer;
```

### queueNewRewardAllocation

Add a new reward allocation to the queue for validator with given pubkey. Does not allow overwriting of existing queued reward allocation.

_The weights of the reward allocation must add up to 100% or 1e4. Only whitelisted pools may be used as well._

**Emits:**

- [RewardAllocationQueued](#event-rewardallocationqueued)

```solidity
function queueNewRewardAllocation(
    bytes calldata valPubkey,
    uint64 startBlock,
    Weight[] calldata weights
)
    external
    onlyOperator(valPubkey);
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### queueValCommission

Queues a commission rate change for a validator on incentive tokens.

_The caller of this function must be the validator operator address._

**Emits:**

- [ValidatorCommissionQueued](#event-validatorcommissionqueued)

```solidity
function queueValCommission(bytes calldata valPubkey, uint96 commissionRate) external onlyOperator(valPubkey);
```

**Parameters**

| Name             | Type     | Description                                                   |
| ---------------- | -------- | ------------------------------------------------------------- |
| `valPubkey`      | `bytes`  | The validator's pubkey.                                       |
| `commissionRate` | `uint96` | The commission rate of the validator on the incentive tokens. |

### setCommissionChangeDelay

Sets the commission change delay.

_Only owner can call this function._

**Emits:**

- [CommissionChangeDelaySet](#event-commissionchangedelayset)

```solidity
function setCommissionChangeDelay(uint64 _commissionChangeDelay) external onlyOwner;
```

**Parameters**

| Name                     | Type     | Description                                                 |
| ------------------------ | -------- | ----------------------------------------------------------- |
| `_commissionChangeDelay` | `uint64` | The delay in blocks to activate a queued commission change. |

### setDefaultRewardAllocation

Sets the default reward allocation for validators that do not have a reward allocation.

_The caller of this function must be the governance module account._

**Emits:**

- [DefaultRewardAllocationSet](#event-defaultrewardallocationset)

```solidity
function setDefaultRewardAllocation(RewardAllocation calldata ra) external onlyOwner;
```

**Parameters**

| Name | Type               | Description |
| ---- | ------------------ | ----------- |
| `ra` | `RewardAllocation` |             |

### setMaxNumWeightsPerRewardAllocation

Sets the maximum number of weights per reward allocation.

**Emits:**

- [MaxNumWeightsPerRewardAllocationSet](#event-maxnumweightsperrewardallocationset)

```solidity
function setMaxNumWeightsPerRewardAllocation(uint8 _maxNumWeightsPerRewardAllocation) external onlyOwner;
```

### setMaxWeightPerVault

Sets the maximum weight a vault can assume in a reward allocation.

**Emits:**

- [MaxWeightPerVaultSet](#event-maxweightpervaultset)

```solidity
function setMaxWeightPerVault(uint96 _maxWeightPerVault) external onlyOwner;
```

### setRewardAllocationBlockDelay

Sets the delay in blocks before a new reward allocation can be queued.

**Emits:**

- [RewardAllocationBlockDelaySet](#event-rewardallocationblockdelayset)

```solidity
function setRewardAllocationBlockDelay(uint64 _rewardAllocationBlockDelay) external onlyOwner;
```

### setVaultWhitelistedStatus

Updates the vault's whitelisted status

**Emits:**

- [VaultWhitelistedStatusUpdated](#event-vaultwhitelistedstatusupdated)

```solidity
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external onlyOwner;
```

**Parameters**

| Name            | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| `receiver`      | `address` | The address to remove or add as whitelisted vault.                                |
| `isWhitelisted` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |
| `metadata`      | `string`  | The metadata of the vault.                                                        |

### updateWhitelistedVaultMetadata

Updates the metadata of a whitelisted vault, reverts if vault is not whitelisted.

**Emits:**

- [WhitelistedVaultMetadataUpdated](#event-whitelistedvaultmetadataupdated)

```solidity
function updateWhitelistedVaultMetadata(address vault, string memory metadata) external onlyOwner;
```

**Parameters**

| Name       | Type      | Description                                                                    |
| ---------- | --------- | ------------------------------------------------------------------------------ |
| `vault`    | `address` |                                                                                |
| `metadata` | `string`  | The metadata of the vault, to associate info with the vault in the events log. |

## Events

### CommissionChangeDelaySet {#event-commissionchangedelayset}

Emitted when the commission change delay is set.

```solidity
event CommissionChangeDelaySet(uint64 oldDelay, uint64 newDelay);
```

**Parameters**

| Name       | Type     | Description                          |
| ---------- | -------- | ------------------------------------ |
| `oldDelay` | `uint64` | The previous commission change delay |
| `newDelay` | `uint64` | The new commission change delay      |

### DefaultRewardAllocationSet {#event-defaultrewardallocationset}

Emitted when the default reward allocation is set.

```solidity
event DefaultRewardAllocationSet(RewardAllocation ra);
```

**Parameters**

| Name | Type               | Description                       |
| ---- | ------------------ | --------------------------------- |
| `ra` | `RewardAllocation` | The new default reward allocation |

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

| Name      | Type     | Description                |
| --------- | -------- | -------------------------- |
| `version` | `uint64` | The initialization version |

### MaxNumWeightsPerRewardAllocationSet {#event-maxnumweightsperrewardallocationset}

Emitted when the maximum number of weights per reward allocation is set.

```solidity
event MaxNumWeightsPerRewardAllocationSet(uint8 oldMaxNumWeights, uint8 newMaxNumWeights);
```

**Parameters**

| Name               | Type    | Description                            |
| ------------------ | ------- | -------------------------------------- |
| `oldMaxNumWeights` | `uint8` | The previous maximum number of weights |
| `newMaxNumWeights` | `uint8` | The new maximum number of weights      |

### MaxWeightPerVaultSet {#event-maxweightpervaultset}

Emitted when the maximum weight per vault is set.

```solidity
event MaxWeightPerVaultSet(uint96 oldMaxWeight, uint96 newMaxWeight);
```

**Parameters**

| Name           | Type     | Description                           |
| -------------- | -------- | ------------------------------------- |
| `oldMaxWeight` | `uint96` | The previous maximum weight per vault |
| `newMaxWeight` | `uint96` | The new maximum weight per vault      |

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

| Name            | Type      | Description        |
| --------------- | --------- | ------------------ |
| `previousOwner` | `address` | The previous owner |
| `newOwner`      | `address` | The new owner      |

### RewardAllocationActivated {#event-rewardallocationactivated}

Emitted when a reward allocation is activated.

```solidity
event RewardAllocationActivated(bytes indexed valPubkey, RewardAllocation ra);
```

**Parameters**

| Name        | Type               | Description                     |
| ----------- | ------------------ | ------------------------------- |
| `valPubkey` | `bytes`            | The validator's public key      |
| `ra`        | `RewardAllocation` | The activated reward allocation |

### RewardAllocationBlockDelaySet {#event-rewardallocationblockdelayset}

Emitted when the reward allocation block delay is set.

```solidity
event RewardAllocationBlockDelaySet(uint64 oldDelay, uint64 newDelay);
```

**Parameters**

| Name       | Type     | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `oldDelay` | `uint64` | The previous reward allocation block delay |
| `newDelay` | `uint64` | The new reward allocation block delay      |

### RewardAllocationQueued {#event-rewardallocationqueued}

Emitted when a reward allocation is queued.

```solidity
event RewardAllocationQueued(bytes indexed valPubkey, RewardAllocation ra);
```

**Parameters**

| Name        | Type               | Description                  |
| ----------- | ------------------ | ---------------------------- |
| `valPubkey` | `bytes`            | The validator's public key   |
| `ra`        | `RewardAllocation` | The queued reward allocation |

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

| Name             | Type      | Description                    |
| ---------------- | --------- | ------------------------------ |
| `implementation` | `address` | The new implementation address |

### ValidatorCommissionActivated {#event-validatorcommissionactivated}

Emitted when a validator commission is activated.

```solidity
event ValidatorCommissionActivated(bytes indexed valPubkey, uint96 commissionRate);
```

**Parameters**

| Name             | Type     | Description                   |
| ---------------- | -------- | ----------------------------- |
| `valPubkey`      | `bytes`  | The validator's public key    |
| `commissionRate` | `uint96` | The activated commission rate |

### ValidatorCommissionQueued {#event-validatorcommissionqueued}

Emitted when a validator commission is queued.

```solidity
event ValidatorCommissionQueued(bytes indexed valPubkey, uint96 commissionRate, uint64 blockNumber);
```

**Parameters**

| Name             | Type     | Description                  |
| ---------------- | -------- | ---------------------------- |
| `valPubkey`      | `bytes`  | The validator's public key   |
| `commissionRate` | `uint96` | The queued commission rate   |
| `blockNumber`    | `uint64` | The block number when queued |

### VaultWhitelistedStatusUpdated {#event-vaultwhitelistedstatusupdated}

Emitted when a vault's whitelisted status is updated.

```solidity
event VaultWhitelistedStatusUpdated(address indexed vault, bool isWhitelisted, string metadata);
```

**Parameters**

| Name            | Type      | Description                |
| --------------- | --------- | -------------------------- |
| `vault`         | `address` | The vault address          |
| `isWhitelisted` | `bool`    | The new whitelisted status |
| `metadata`      | `string`  | The vault metadata         |

### WhitelistedVaultMetadataUpdated {#event-whitelistedvaultmetadataupdated}

Emitted when whitelisted vault metadata is updated.

```solidity
event WhitelistedVaultMetadataUpdated(address indexed vault, string metadata);
```

**Parameters**

| Name       | Type      | Description          |
| ---------- | --------- | -------------------- |
| `vault`    | `address` | The vault address    |
| `metadata` | `string`  | The updated metadata |
