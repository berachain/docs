---
head:
  - - meta
    - property: og:title
      content: SmartOperator Contract Reference
  - - meta
    - name: description
      content: Developer reference for the SmartOperator contract
  - - meta
    - property: og:description
      content: Developer reference for the SmartOperator contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# SmartOperator

The SmartOperator contract manages validator operations including BGT boosting, fee management, and reward allocation. It serves as the central controller for validator-related activities within the staking pool ecosystem.

## State Variables

### protocolFeePercentage

```solidity
uint96 public protocolFeePercentage;
```

## View Functions

### rebaseableBgtAmount

Returns BGT balance of the smart operator minus the protocol fee. This function is used to calculate the rebased value of staking pool's shares.

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

Returns the current base rate fee state information. Useful for monitoring and debugging fee calculations.

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

## Functions

### setRewardAllocator

Sets the reward allocator for the validator key on the BeraChef contract.

**Required Role**: `VALIDATOR_ADMIN_ROLE`

```solidity
function setRewardAllocator(address rewardAllocator) external;
```

**Parameters**

| Name              | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `rewardAllocator` | `address` | The address of the reward allocator. |

### queueBoost

This function is used to auto-boost the validator key for the current unboosted amount of BGT. Only enqueues boost if not already queued to avoid spamming the queue.

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

### queueDropBoost

Enqueues a drop boost request for a given amount.

**Required Role**: `BGT_MANAGER_ROLE`

```solidity
function queueDropBoost(uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint128` | The amount of BGT to unboost. |

### dropBoost

Executes the drop boost for this operator.

```solidity
function dropBoost() external;
```

### redeemBGT

Redeems a given amount of BGT for BERA. The protocol fee is deducted from the amount.

**Required Role**: `BGT_MANAGER_ROLE`

```solidity
function redeemBGT(uint256 amount) external whenNotFullyExited;
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `amount` | `uint256` | The amount of BGT to redeem. |

### fullExitRedeemBGT

Redeems all BGT tokens owned by this contract for BERA. The protocol fee is deducted from the amount.

```solidity
function fullExitRedeemBGT(address receiver) external;
```

**Parameters**

| Name       | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| `receiver` | `address` | The address to send the BERA to. |

### queueRewardsAllocation

Queues a new rewards allocation for the validator key.

**Required Role**: `REWARDS_ALLOCATION_MANAGER_ROLE`

```solidity
function queueRewardsAllocation(
    uint64 startBlock,
    IBeraChef.Weight[] calldata weights
)
    external
    ;
```

**Parameters**

| Name         | Type                 | Description                                              |
| ------------ | -------------------- | -------------------------------------------------------- |
| `startBlock` | `uint64`             | The block number when the new rewards allocation starts. |
| `weights`    | `IBeraChef.Weight[]` | The weights for the new rewards allocation.              |

### queueValCommission

Queues a new validator commission for the validator key.

**Required Role**: `COMMISSION_MANAGER_ROLE`

```solidity
function queueValCommission(uint96 commission) external;
```

**Parameters**

| Name         | Type     | Description                                   |
| ------------ | -------- | --------------------------------------------- |
| `commission` | `uint96` | The new validator commission in basis points. |

### setMinEffectiveBalance

Sets the minimum effective balance for the staking pool.

**Required Role**: `VALIDATOR_ADMIN_ROLE`

```solidity
function setMinEffectiveBalance(uint256 newMinEffectiveBalance) external;
```

**Parameters**

| Name                     | Type      | Description                                                |
| ------------------------ | --------- | ---------------------------------------------------------- |
| `newMinEffectiveBalance` | `uint256` | The minimum effective balance to set for the staking pool. |

### queueIncentiveCollectorPayoutAmountChange

Queues a payout amount change for the incentive collector.

**Required Role**: `INCENTIVE_COLLECTOR_MANAGER_ROLE`

```solidity
function queueIncentiveCollectorPayoutAmountChange(uint256 newPayoutAmount)
    external
    ;
```

**Parameters**

| Name              | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| `newPayoutAmount` | `uint256` | The new payout amount for the incentive collector. |

### setProtocolFeePercentage

Sets the protocol fee percentage for the smart operator.

**Required Role**: `PROTOCOL_FEE_MANAGER_ROLE`

```solidity
function setProtocolFeePercentage(uint96 protocolFeePercentage_)
    external
    whenNotFullyExited
    ;
```

**Parameters**

| Name                     | Type     | Description                                                |
| ------------------------ | -------- | ---------------------------------------------------------- |
| `protocolFeePercentage_` | `uint96` | The protocol fee percentage to set for the smart operator. |

### accrueEarnedBGTFees

Accrues the base rate fees. Fees are accrued only on balance not yet charged.

```solidity
function accrueEarnedBGTFees() external whenNotFullyExited;
```

### claimBgtStakerReward

Claims accumulated HONEY token rewards from BGT staking and forwards them to the IncentiveCollector. HONEY rewards accumulate from protocol fees distributed to BGT stakers. Once forwarded to IncentiveCollector, these tokens become available for anyone to claim via the incentive auction mechanism.

**Note:** This function does not need to be called manually. It is called internally by `claimBoostRewards()`, which handles both HONEY rewards and incentive tokens. Use `claimBoostRewards()` instead. See [claimBoostRewards](#claimboostrewards) for details.

```solidity
function claimBgtStakerReward() external returns (uint256);
```

**Returns**

| Name     | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `<none>` | `uint256` | The amount of HONEY rewards claimed and sent. |

### claimBoostRewards

Claims both HONEY rewards from BGT staking and incentive tokens from the boost program, then forwards all accumulated tokens to the IncentiveCollector. Once tokens are in IncentiveCollector, they become available for anyone to claim via the permissionless auction mechanism by paying the required payout amount.

This function internally calls `claimBgtStakerReward()` to handle HONEY rewards, so calling this function alone is sufficient to forward both HONEY rewards and incentive tokens.

```solidity
function claimBoostRewards(IBGTIncentiveDistributor.Claim[] calldata claims, address[] memory tokens) external;
```

**Parameters**

| Name     | Type                               | Description                                                                                                                                  |
| -------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `claims` | `IBGTIncentiveDistributor.Claim[]` | Array of merkle claims for incentive program rewards. Each claim includes an identifier, account, amount, and merkle proof for verification. |
| `tokens` | `address[]`                        | Array of token addresses to forward to IncentiveCollector. All balances of these tokens held by SmartOperator will be transferred.           |

**What Happens**

- Claims any accumulated HONEY rewards from BGT staking
- Claims incentive tokens from the boost program using the provided merkle claims
- Transfers all balances of the specified tokens (including any HONEY claimed) from SmartOperator to IncentiveCollector
- Tokens become available for anyone to claim via IncentiveCollector's incentive auction mechanism

**Token Sources**

Tokens accumulate in SmartOperator from:

- **Commission share**: Your validator's commission share of incentive tokens (sent automatically when RewardVault processes incentives)
- **BGT staking rewards**: HONEY tokens from protocol fee distribution

**Important**: Tokens must be manually forwarded to IncentiveCollector using this function before they can be claimed. They do not automatically flow to IncentiveCollector.

## Events

### ProtocolFeePercentageSet

```solidity
event ProtocolFeePercentageSet(uint96 protocolFeePercentage);
```

Emitted when the protocol fee percentage is updated via `setProtocolFeePercentage()`.

### BGTRedeemed

```solidity
event BGTRedeemed(address receiver, uint256 amount);
```

Emitted when BGT tokens are redeemed via `redeemBGT()` or `redeemBGTTo()`.

### RewardAllocatorSet

```solidity
event RewardAllocatorSet(address rewardAllocator);
```

Emitted when the reward allocator is set via `setRewardAllocator()`.

## Errors

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

Thrown by `_validateSender()` when the sender is not the expected address.

### InvalidProtocolFeePercentage

```solidity
error InvalidProtocolFeePercentage();
```

Thrown by `setProtocolFeePercentage()` when the protocol fee percentage is invalid.

### StakingPoolIsFullyExited

```solidity
error StakingPoolIsFullyExited();
```

Thrown by various functions when the staking pool has been fully exited.

### ZeroAddress

```solidity
error ZeroAddress();
```

Thrown by functions when a zero address is provided where a valid address is required.
