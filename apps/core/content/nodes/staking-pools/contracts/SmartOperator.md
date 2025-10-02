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

> <small><span v-if="config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']"><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.smartOperatorImpl['mainnet-address']}}</a></span><span v-else>Mainnet address not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.smartOperatorImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.smartOperatorImpl.abi">ABI JSON</a></span></small>

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

Sets the reward allocator for the validator key on the BeraChef contract. Can only be called by the validator admin role.

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

Enqueues a drop boost request for a given amount. Can only be called by the BGT manager role.

```solidity
function queueDropBoost(uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint128` | The amount of BGT to unboost. |

### fullExitQueueDropBoost

Enqueues a drop boost request for the whole boosted amount. Can only be called by the staking pool when making a full withdraw.

```solidity
function fullExitQueueDropBoost() external;
```

### dropBoost

Executes the drop boost for this operator.

```solidity
function dropBoost() external;
```

### redeemBGT

Redeems a given amount of BGT for BERA. The protocol fee is deducted from the amount.

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

Queues a new rewards allocation for the validator key. Can only be called by the rewards allocation manager role.

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

Queues a new validator commission for the validator key. Can only be called by the commission manager role.

```solidity
function queueValCommission(uint96 commission) external;
```

**Parameters**

| Name         | Type     | Description                                   |
| ------------ | -------- | --------------------------------------------- |
| `commission` | `uint96` | The new validator commission in basis points. |

### setMinEffectiveBalance

Sets the minimum effective balance for the staking pool. Can only be called by the validator admin role.

```solidity
function setMinEffectiveBalance(uint256 minEffectiveBalance) external;
```

**Parameters**

| Name                  | Type      | Description                                                |
| --------------------- | --------- | ---------------------------------------------------------- |
| `minEffectiveBalance` | `uint256` | The minimum effective balance to set for the staking pool. |

### queueIncentiveCollectorPayoutAmountChange

Queues a payout amount change for the incentive collector. Can only be called by the incentive collector manager role.

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

### accrueIncentivesFees

Accrues the protocol fee for a given amount (payout amount). Can only be called by the incentive collector.

```solidity
function accrueIncentivesFees(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `amount` | `uint256` | The amount to accrue the protocol fee for. |

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

**Parameters**

| Name     | Type                               | Description                                       |
| -------- | ---------------------------------- | ------------------------------------------------- |
| `claims` | `IBGTIncentiveDistributor.Claim[]` | The claims for the incentive program rewards.     |
| `tokens` | `address[]`                        | The tokens to be sent to the incentive collector. |

## Events

### ProtocolFeePercentageSet

```solidity
event ProtocolFeePercentageSet(uint96 protocolFeePercentage);
```

### BGTRedeemed

```solidity
event BGTRedeemed(address receiver, uint256 amount);
```

### RewardAllocatorSet

```solidity
event RewardAllocatorSet(address rewardAllocator);
```

## Errors

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

### InvalidProtocolFeePercentage

```solidity
error InvalidProtocolFeePercentage();
```

### StakingPoolIsFullyExited

```solidity
error StakingPoolIsFullyExited();
```

### ZeroAddress

```solidity
error ZeroAddress();
```
