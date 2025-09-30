# SmartOperator

<script setup>
  import config from '@berachain/config/constants.json';
</script>

<template v-if="config.contracts.stakingPools.smartOperator['mainnet-address']">
> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.smartOperator['mainnet-address']">{{config.contracts.stakingPools.smartOperator['mainnet-address']}}</a><span v-if="config.contracts.stakingPools.smartOperator.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.smartOperator.abi">ABI JSON</a></span></small>
</template>

**Inherits:**
ISmartOperator, AccessControlUpgradeable

:::tip
For guidance on managing roles and configuring your staking pool operations, see the [Staking Pools Operator Guide](/nodes/staking-pools/operators#role-management-and-access-control).
:::

## State Variables

### BGT

```solidity
IBGT public constant BGT = IBGT(0x656b95E550C07a9ffe548bd4085c72418Ceb1dba);
```

### BERA_CHEF

```solidity
IBeraChef public constant BERA_CHEF = IBeraChef(0xdf960E8F3F19C481dDE769edEDD439ea1a63426a);
```

### BGT_STAKER

```solidity
IBGTStaker public constant BGT_STAKER = IBGTStaker(0x44F07Ce5AfeCbCC406e6beFD40cc2998eEb8c7C6);
```

### BGT_INCENTIVE_DISTRIBUTOR

```solidity
IBGTIncentiveDistributor public constant BGT_INCENTIVE_DISTRIBUTOR =
    IBGTIncentiveDistributor(0x77DA09bC82652f9A14d1b170a001e759640298e6);
```

### HONEY_TOKEN

```solidity
address public constant HONEY_TOKEN = 0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce;
```

### VALIDATOR_ADMIN_ROLE

_Validator admin manages other roles and is managed by the contract owner._

```solidity
bytes32 public constant VALIDATOR_ADMIN_ROLE = keccak256("VALIDATOR_ADMIN_ROLE");
```


### PROTOCOL_FEE_MANAGER_ROLE

_Can set the fee percentage and claim fees._

```solidity
bytes32 public constant PROTOCOL_FEE_MANAGER_ROLE = keccak256("PROTOCOL_FEE_MANAGER_ROLE");
```

### REWARDS_ALLOCATION_MANAGER_ROLE

_Can queue new reward allocations._

```solidity
bytes32 public constant REWARDS_ALLOCATION_MANAGER_ROLE = keccak256("REWARDS_ALLOCATION_MANAGER_ROLE");
```

### COMMISSION_MANAGER_ROLE

_Can queue validator commission changes._

```solidity
bytes32 public constant COMMISSION_MANAGER_ROLE = keccak256("COMMISSION_MANAGER_ROLE");
```

### INCENTIVE_COLLECTOR_MANAGER_ROLE

_Can set the payout amount for the incentive collector._

```solidity
bytes32 public constant INCENTIVE_COLLECTOR_MANAGER_ROLE = keccak256("INCENTIVE_COLLECTOR_MANAGER_ROLE");
```

### MAX_PROTOCOL_FEE

_Maximum protocol fee set to 20% (2000 basis points)._

```solidity
uint96 public constant MAX_PROTOCOL_FEE = 2000;
```

### ONE_HUNDRED_PERCENT

_100% in basis points._

```solidity
uint96 public constant ONE_HUNDRED_PERCENT = 1e4;
```

### \_pubkey

```solidity
bytes internal _pubkey;
```

### \_stakingPool

```solidity
address internal _stakingPool;
```

### \_incentiveCollector

```solidity
address internal _incentiveCollector;
```

### \_withdrawalVault

```solidity
address internal _withdrawalVault;
```

### \_stakingRewardsVault

```solidity
address internal _stakingRewardsVault;
```

### \_bgtBalanceAlreadyCharged

```solidity
uint256 internal _bgtBalanceAlreadyCharged;
```

### protocolFeePercentage

```solidity
uint96 public protocolFeePercentage;
```

## Functions

### whenNotFullyExited

```solidity
modifier whenNotFullyExited();
```

### queueBoost

This function is used to auto-boost the validator key for the current unboosted amount of BGT.

_Only enqueues boost if not already queued to avoid spamming the queue._

```solidity
function queueBoost() external whenNotFullyExited returns (bool);
```

**Returns**

| Name     | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| `<none>` | `bool` | True if the boost was successfully queued. |

### activateBoost

Simple relayer to BGT.activateBoost() function for this operator.

```solidity
function activateBoost() external;
```


### fullExitQueueDropBoost

Enqueues a drop boost request for the whole boosted amount.

_Can only be called by the staking pool when making a full withdraw._

```solidity
function fullExitQueueDropBoost() external;
```

### dropBoost

Executes the drop boost for this operator.

```solidity
function dropBoost() external;
```


### fullExitRedeemBGT

Redeems all BGT tokens owned by this contract for BERA.

_The protocol fee is deducted from the amount._

```solidity
function fullExitRedeemBGT(address receiver) external;
```

**Parameters**

| Name       | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| `receiver` | `address` | The address to send the BERA to. |

### queueRewardsAllocation

Queues a new rewards allocation for the validator key.

_Can only be called by the rewards allocation manager role._

```solidity
function queueRewardsAllocation(
    uint64 startBlock,
    IBeraChef.Weight[] calldata weights
)
    external
    onlyRole(REWARDS_ALLOCATION_MANAGER_ROLE);
```

**Parameters**

| Name         | Type                 | Description                                              |
| ------------ | -------------------- | -------------------------------------------------------- |
| `startBlock` | `uint64`             | The block number when the new rewards allocation starts. |
| `weights`    | `IBeraChef.Weight[]` | The weights for the new rewards allocation.              |

### queueValCommission

Queues a new validator commission for the validator key.

_Can only be called by the commission manager role._

```solidity
function queueValCommission(uint96 commission) external onlyRole(COMMISSION_MANAGER_ROLE);
```

**Parameters**

| Name         | Type     | Description                                   |
| ------------ | -------- | --------------------------------------------- |
| `commission` | `uint96` | The new validator commission in basis points. |

### rebaseableBgtAmount

Returns BGT balance of the smart operator minus the protocol fee.

_This function is used to calculate the rebased value of staking pool's shares._

```solidity
function rebaseableBgtAmount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `<none>` | `uint256` | The amount of BGT available for rebasing. |

### unboostedBalance

Get the unboosted BGT balance of the smart operator.

```solidity
function unboostedBalance() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | The unboosted BGT balance of the smart operator. |

### getEarnedBGTFeeState

Returns the current base rate fee state information.

_Useful for monitoring and debugging fee calculations._

```solidity
function getEarnedBGTFeeState()
    external
    view
    returns (uint256 currentBalance, uint256 bgtBalanceAlreadyCharged, uint256 chargeableBalance, uint96);
```

**Returns**

| Name                       | Type      | Description                                               |
| -------------------------- | --------- | --------------------------------------------------------- |
| `currentBalance`           | `uint256` | The current BGT balance of the smart operator             |
| `bgtBalanceAlreadyCharged` | `uint256` | The amount of BGT that has already been charged fees      |
| `chargeableBalance`        | `uint256` | The amount of BGT that can still be charged fees          |
| `<none>`                   | `uint96`  | protocolFeePercentage The current protocol fee percentage |

### queueIncentiveCollectorPayoutAmountChange

Queues a payout amount change for the incentive collector.

_Can only be called by INCENTIVE_COLLECTOR_MANAGER_ROLE._

```solidity
function queueIncentiveCollectorPayoutAmountChange(uint256 newPayoutAmount)
    external
    onlyRole(INCENTIVE_COLLECTOR_MANAGER_ROLE);
```

**Parameters**

| Name              | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| `newPayoutAmount` | `uint256` | The new payout amount for the incentive collector. |

### claimBgtStakerReward

Claims BGTStaker rewards and send them to the incentive collector.

```solidity
function claimBgtStakerReward() external returns (uint256);
```

### claimBoostRewards

Claims BGTStaker and incentive program rewards and send them to the incentive collector.

```solidity
function claimBoostRewards(IBGTIncentiveDistributor.Claim[] calldata claims, address[] memory tokens) external;
```

### setProtocolFeePercentage

Sets the protocol fee percentage for the smart operator.

```solidity
function setProtocolFeePercentage(uint96 protocolFeePercentage_) external onlyRole(PROTOCOL_FEE_MANAGER_ROLE);
```

**Parameters**

| Name                     | Type     | Description                                                |
| ------------------------ | -------- | ---------------------------------------------------------- |
| `protocolFeePercentage_` | `uint96` | The protocol fee percentage to set for the smart operator. |

### accrueEarnedBGTFees

Accrues the base rate fees.

_Fees are accrued only on balance not yet charged._

```solidity
function accrueEarnedBGTFees() external;
```

### accrueIncentivesFees

Accrues the protocol fee for a given amount (payout amount).

_Can only be called by the incentive collector._

```solidity
function accrueIncentivesFees(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `amount` | `uint256` | The amount to accrue the protocol fee for. |

### \_claimBgtStakerReward

_Claims BGTStaker rewards_

```solidity
function _claimBgtStakerReward() internal returns (uint256);
```

### \_cancelQueueBoost

_Cancels any queued boost for the smart operator._

_Used to cancel any queued boost for the smart operator if unboosting during a full exit._

```solidity
function _cancelQueueBoost() internal;
```

### \_validateSender

_Validates that the sender is the expected address. Used only for function not protected by RBAC._

```solidity
function _validateSender(address expected) internal view;
```

### \_computeFee

```solidity
function _computeFee(uint256 amount) internal view returns (uint256);
```

### \_updateEarnedBGTFees

_Updates and charges base rate fees on the chargeable BGT balance._

_Only charges fees on the difference between current balance and previously charged amount._

_Updates the base rate charged tracker to prevent double fee charging._

```solidity
function _updateEarnedBGTFees() internal;
```

### \_accountFees

_Mints shares to the validator instead of accruing fees._

```solidity
function _accountFees(uint256 amount) internal;
```
