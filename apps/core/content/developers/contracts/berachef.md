# BeraChef
[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/rewards/BeraChef.sol)

**Inherits:**
[IBeraChef](/src/pol/interfaces/IBeraChef.sol/interface.IBeraChef.md), OwnableUpgradeable, UUPSUpgradeable

**Author:**
Berachain Team

The BeraChef contract is responsible for managing the reward allocations and the whitelisted vaults.
Reward allocation is a list of weights that determine the percentage of rewards that goes to each reward vault.
Each validator could have a custom reward allocation, if not, the default reward allocation is used.

*It should be owned by the governance module.*


## State Variables
### ONE_HUNDRED_PERCENT
*Represents 100%. Chosen to be less granular.*


```solidity
uint96 internal constant ONE_HUNDRED_PERCENT = 1e4;
```


### DEFAULT_COMMISSION_RATE
*Represents default commission rate, set to 5%.*


```solidity
uint96 internal constant DEFAULT_COMMISSION_RATE = 0.05e4;
```


### MAX_COMMISSION_CHANGE_DELAY
*The maximum delay in block for a validator to change its commission rate.*

*taken as sum of max boost delay and max drop boost delay from BGT.sol*


```solidity
uint64 internal constant MAX_COMMISSION_CHANGE_DELAY = 2 * 8191;
```


### MAX_REWARD_ALLOCATION_BLOCK_DELAY
*With 2 second block time, this is ~30 days.*


```solidity
uint64 public constant MAX_REWARD_ALLOCATION_BLOCK_DELAY = 1_315_000;
```


### MAX_COMMISSION_RATE
*Represents the maximum commission rate per validator, set to 20%.*


```solidity
uint96 public constant MAX_COMMISSION_RATE = 0.2e4;
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


### beaconDepositContract

```solidity
IBeaconDeposit public beaconDepositContract;
```


### rewardAllocationBlockDelay
The delay in blocks before a new reward allocation can go into effect.


```solidity
uint64 public rewardAllocationBlockDelay;
```


### maxNumWeightsPerRewardAllocation
*The maximum number of weights per reward allocation.*


```solidity
uint8 public maxNumWeightsPerRewardAllocation;
```


### activeRewardAllocations
*Mapping of validator public key to active reward allocation.*


```solidity
mapping(bytes valPubkey => RewardAllocation) internal activeRewardAllocations;
```


### queuedRewardAllocations
*Mapping of validator public key address to queued reward allocation.*


```solidity
mapping(bytes valPubkey => RewardAllocation) internal queuedRewardAllocations;
```


### isWhitelistedVault
Mapping of receiver address to whether they are white-listed or not.


```solidity
mapping(address receiver => bool) public isWhitelistedVault;
```


### defaultRewardAllocation
The Default reward allocation is used when a validator does not have a reward allocation.


```solidity
RewardAllocation internal defaultRewardAllocation;
```


### commissionChangeDelay
The delay in blocks before a new commission rate can go into effect.


```solidity
uint64 public commissionChangeDelay;
```


### valQueuedCommission
Mapping of validator pubkey to its queued commission struct.


```solidity
mapping(bytes valPubkey => QueuedCommissionRateChange) internal valQueuedCommission;
```


### valCommission
Mapping of validator pubkey to its commission rate on incentive tokens


```solidity
mapping(bytes valPubkey => CommissionRate) internal valCommission;
```


### maxWeightPerVault
The maximum weight a vault can assume in the reward allocation


```solidity
uint96 public maxWeightPerVault;
```


## Functions
### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor


```solidity
constructor();
```

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

### _authorizeUpgrade


```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### onlyDistributor


```solidity
modifier onlyDistributor();
```

### onlyOperator


```solidity
modifier onlyOperator(bytes calldata valPubkey);
```

### setMaxNumWeightsPerRewardAllocation

Sets the maximum number of weights per reward allocation.


```solidity
function setMaxNumWeightsPerRewardAllocation(uint8 _maxNumWeightsPerRewardAllocation) external onlyOwner;
```

### setMaxWeightPerVault

Sets the maximum weight a vault can assume in a reward allocation.


```solidity
function setMaxWeightPerVault(uint96 _maxWeightPerVault) external onlyOwner;
```

### setRewardAllocationBlockDelay

Sets the delay in blocks before a new reward allocation can be queued.


```solidity
function setRewardAllocationBlockDelay(uint64 _rewardAllocationBlockDelay) external onlyOwner;
```

### setVaultWhitelistedStatus

Updates the vault's whitelisted status


```solidity
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address to remove or add as whitelisted vault.|
|`isWhitelisted`|`bool`|The whitelist status; true if the receiver is being whitelisted, false otherwise.|
|`metadata`|`string`|The metadata of the vault.|


### updateWhitelistedVaultMetadata

Updates the metadata of a whitelisted vault, reverts if vault is not whitelisted.


```solidity
function updateWhitelistedVaultMetadata(address vault, string memory metadata) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`||
|`metadata`|`string`|The metadata of the vault, to associate info with the vault in the events log.|


### setDefaultRewardAllocation

Sets the default reward allocation for validators that do not have a reward allocation.

*The caller of this function must be the governance module account.*


```solidity
function setDefaultRewardAllocation(RewardAllocation calldata ra) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ra`|`RewardAllocation`||


### setCommissionChangeDelay

Sets the commission change delay.

*Only owner can call this function.*


```solidity
function setCommissionChangeDelay(uint64 _commissionChangeDelay) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_commissionChangeDelay`|`uint64`|The delay in blocks to activate a queued commission change.|


### queueNewRewardAllocation

Add a new reward allocation to the queue for validator with given pubkey. Does not allow overwriting of
existing queued reward allocation.

*The weights of the reward allocation must add up to 100% or 1e4.
Only whitelisted pools may be used as well.*


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

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|
|`startBlock`|`uint64`|The block that the reward allocation goes into effect.|
|`weights`|`Weight[]`|The weights of the reward allocation.|


### queueValCommission

Queues a commission rate change for a validator on incentive tokens.

*The caller of this function must be the validator operator address.*


```solidity
function queueValCommission(bytes calldata valPubkey, uint96 commissionRate) external onlyOperator(valPubkey);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|
|`commissionRate`|`uint96`|The commission rate of the validator on the incentive tokens.|


### activateQueuedValCommission

Activates the queued commission rate of a validator on incentive tokens.


```solidity
function activateQueuedValCommission(bytes calldata valPubkey) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|


### activateReadyQueuedRewardAllocation

Activates the queued reward allocation for a validator if its ready for the current block.

*Should be called by the distribution contract.*


```solidity
function activateReadyQueuedRewardAllocation(bytes calldata valPubkey) external onlyDistributor;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|


### getActiveRewardAllocation

Returns the active reward allocation for validator with given pubkey

*Returns the active reward allocation if validator has a reward allocation and the weights are still valid,
otherwise the default reward allocation.*


```solidity
function getActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardAllocation`|rewardAllocation The active reward allocation.|


### getQueuedRewardAllocation

Returns the queued reward allocation for a validator with given pubkey


```solidity
function getQueuedRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardAllocation`|rewardAllocation The queued reward allocation.|


### getSetActiveRewardAllocation

Returns the active reward allocation set by the validator with given pubkey.

*This will return active reward allocation set by validators even if its not valid.*


```solidity
function getSetActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardAllocation`|rewardAllocation The reward allocation.|


### getDefaultRewardAllocation

Returns the default reward allocation for validators that do not have a reward allocation.


```solidity
function getDefaultRewardAllocation() external view returns (RewardAllocation memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardAllocation`|rewardAllocation The default reward allocation.|


### isQueuedRewardAllocationReady

Returns the status of whether a queued reward allocation is ready to be activated.


```solidity
function isQueuedRewardAllocationReady(bytes calldata valPubkey, uint256 blockNumber) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|
|`blockNumber`|`uint256`|The block number to be queried.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isReady True if the queued reward allocation is ready to be activated, false otherwise.|


### isReady

Returns the status of whether the BeraChef contract is ready to be used.

*This function should be used by all contracts that depend on a system call.*


```solidity
function isReady() external view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isReady True if the BeraChef is ready to be used, false otherwise.|


### getValCommissionOnIncentiveTokens

Returns the commission rate of a validator on an incentive tokens.

*Default commission rate is 5% if the commission was never set.*


```solidity
function getValCommissionOnIncentiveTokens(bytes calldata valPubkey) external view returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|commissionRate The commission rate of the validator on the incentive tokens.|


### getValQueuedCommissionOnIncentiveTokens

Returns the queued commission struct of a validator on an incentive tokens.


```solidity
function getValQueuedCommissionOnIncentiveTokens(bytes calldata valPubkey)
    external
    view
    returns (QueuedCommissionRateChange memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`QueuedCommissionRateChange`|queuedCommissionRate The queued commission struct of the validator on the incentive tokens.|


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

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The validator's pubkey.|
|`incentiveTokenAmount`|`uint256`|The amount of the incentive tokens.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|validatorShare The validator's share of the incentive tokens.|


### _validateWeights

Validates the weights of a reward allocation.


```solidity
function _validateWeights(bytes memory valPubkey, Weight[] calldata weights) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`||
|`weights`|`Weight[]`|The weights of the reward allocation.|


### _checkForDuplicateReceivers


```solidity
function _checkForDuplicateReceivers(bytes memory valPubkey, Weight[] calldata weights) internal;
```

### _checkIfStillValid

Checks if the weights of a reward allocation are still valid.

This method is used to check if the weights of a reward allocation are still valid in flight.


```solidity
function _checkIfStillValid(Weight[] memory weights) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`weights`|`Weight[]`|The weights of the reward allocation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the weights are still valid, otherwise false.|


### _getOperatorCommission

Gets the operator commission for a validator.

*If the operator commission was never set, default is 5%.*


```solidity
function _getOperatorCommission(bytes calldata valPubkey) internal view returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`valPubkey`|`bytes`|The public key of the validator.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|The operator commission for the validator.|


