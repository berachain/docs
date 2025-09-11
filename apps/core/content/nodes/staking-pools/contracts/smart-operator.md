<script setup>
  import config from '@berachain/config/constants.json';
</script>

# SmartOperator

The SmartOperator manages validator operations and integrates with the Proof of Liquidity system, ensuring that the validator's operations are properly coordinated with the broader Berachain ecosystem.

## Functions

### queueBoost

```solidity
function queueBoost() external returns (bool);
```

Auto-boosts the validator key for the current unboosted amount of BGT.

**Returns:**
- `bool`: True if the boost was successfully queued

### activateBoost

```solidity
function activateBoost() external;
```

Simple relayer to BGT.activateBoost() function for this operator.

### queueDropBoost

```solidity
function queueDropBoost(uint128 amount) external;
```

Enqueues a drop boost request for a given amount.

**Parameters:**
- `amount`: The amount of BGT to unboost

### fullExitQueueDropBoost

```solidity
function fullExitQueueDropBoost() external;
```

Enqueues a drop boost request for the whole boosted amount. Also pauses the contract.

### dropBoost

```solidity
function dropBoost() external;
```

Executes the drop boost for this operator.

### fullExitRedeemBGT

```solidity
function fullExitRedeemBGT(address receiver) external;
```

Redeems all BGT tokens owned by this contract for BERA.

**Parameters:**
- `receiver`: The address to send the BERA to

### queueRewardsAllocation

```solidity
function queueRewardsAllocation(uint64 startBlock, IBeraChef.Weight[] calldata weights) external;
```

Queues a new rewards allocation for the validator key.

**Parameters:**
- `startBlock`: The block number when the new rewards allocation starts
- `weights`: The weights for the new rewards allocation

### queueValCommission

```solidity
function queueValCommission(uint96 commission) external;
```

Queues a new validator commission for the validator key.

**Parameters:**
- `commission`: The new validator commission in basis points

### setMinEffectiveBalance

```solidity
function setMinEffectiveBalance(uint256 minEffectiveBalance) external;
```

Sets the minimum effective balance for the staking pool.

**Parameters:**
- `minEffectiveBalance`: The minimum effective balance to set

### queueIncentiveCollectorPayoutAmountChange

```solidity
function queueIncentiveCollectorPayoutAmountChange(uint256 newPayoutAmount) external;
```

Queues a payout amount change for the incentive collector.

**Parameters:**
- `newPayoutAmount`: The new payout amount for the incentive collector

### setProtocolFeePercentage

```solidity
function setProtocolFeePercentage(uint96 protocolFeePercentage_) external;
```

Sets the protocol fee percentage for the smart operator.

**Parameters:**
- `protocolFeePercentage_`: The new fee percentage value

### accrueEarnedBGTFees

```solidity
function accrueEarnedBGTFees() external;
```

Accrues the base rate fees.

### accrueIncentivesFees

```solidity
function accrueIncentivesFees(uint256 amount) external;
```

Accrues the protocol fee for a given amount.

**Parameters:**
- `amount`: The amount to accrue the protocol fee for

### claimBgtStakerReward

```solidity
function claimBgtStakerReward() external returns (uint256);
```

Claims BGTStaker rewards and sends them to the incentive collector.

**Returns:**
- `uint256`: The amount of rewards claimed

### claimBoostRewards

```solidity
function claimBoostRewards(IBGTIncentiveDistributor.Claim[] calldata claims, address[] memory tokens) external;
```

Claims BGTStaker and incentive program rewards and sends them to the incentive collector.

**Parameters:**
- `claims`: Array of claims to process
- `tokens`: Array of token addresses

## View Functions

### rebaseableBgtAmount

```solidity
function rebaseableBgtAmount() external view returns (uint256);
```

Returns BGT balance of the smart operator minus the protocol fee.

**Returns:**
- `uint256`: The amount of BGT available for rebasing

### getEarnedBGTFeeState

```solidity
function getEarnedBGTFeeState() external view returns (
    uint256 currentBalance,
    uint256 bgtBalanceAlreadyCharged,
    uint256 chargeableBalance,
    uint96 protocolFeePercentage
);
```

Returns the current base rate fee state information.

**Returns:**
- `currentBalance`: The current BGT balance of the smart operator
- `bgtBalanceAlreadyCharged`: The amount of BGT that has already been charged fees
- `chargeableBalance`: The amount of BGT that can still be charged fees
- `protocolFeePercentage`: The current protocol fee percentage

### unboostedBalance

```solidity
function unboostedBalance() external view returns (uint256);
```

Get the unboosted BGT balance of the smart operator.

**Returns:**
- `uint256`: The unboosted BGT balance of the smart operator

## Events

### ProtocolFeePercentageSet

```solidity
event ProtocolFeePercentageSet(uint96 protocolFeePercentage);
```

Emitted when the protocol fee percentage is set.

### ProtocolFeeCollected

```solidity
event ProtocolFeeCollected(address receiver, uint256 amount);
```

Emitted when protocol fees are collected.

### BGTRedeemed

```solidity
event BGTRedeemed(address receiver, uint256 amount);
```

Emitted when BGT tokens are redeemed.

## Errors

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

Thrown when the sender is not the expected address.

### InvalidProtocolFeePercentage

```solidity
error InvalidProtocolFeePercentage();
```

Thrown when the protocol fee percentage is invalid.

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown when an invalid amount is provided.

### StakingPoolIsFullyExited

```solidity
error StakingPoolIsFullyExited();
```

Thrown when the staking pool is fully exited.
