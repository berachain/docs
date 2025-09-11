<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IncentiveCollector

The IncentiveCollector handles incentive token collection and conversion for staking pools.

## State Variables

### payoutAmount

```solidity
uint256 public payoutAmount;
```

The amount to be paid out for incentives.

## Functions

### collectIncentives

```solidity
function collectIncentives() external;
```

Collects incentives from the smart operator.

### updatePayoutAmount

```solidity
function updatePayoutAmount(uint256 newPayoutAmount) external;
```

Updates the payout amount for incentives.

**Parameters:**
- `newPayoutAmount`: The new payout amount

### distributeIncentives

```solidity
function distributeIncentives(address[] calldata recipients, uint256[] calldata amounts) external;
```

Distributes incentives to specified recipients.

**Parameters:**
- `recipients`: Array of recipient addresses
- `amounts`: Array of amounts to distribute

## View Functions

### getPayoutAmount

```solidity
function getPayoutAmount() external view returns (uint256);
```

Returns the current payout amount.

**Returns:**
- `uint256`: The current payout amount

### getIncentiveBalance

```solidity
function getIncentiveBalance() external view returns (uint256);
```

Returns the current incentive balance.

**Returns:**
- `uint256`: The current incentive balance

## Events

### IncentivesCollected

```solidity
event IncentivesCollected(uint256 amount);
```

Emitted when incentives are collected.

### PayoutAmountUpdated

```solidity
event PayoutAmountUpdated(uint256 newPayoutAmount);
```

Emitted when the payout amount is updated.

### IncentivesDistributed

```solidity
event IncentivesDistributed(address[] recipients, uint256[] amounts);
```

Emitted when incentives are distributed.

## Errors

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown when an invalid amount is provided.

### Unauthorized

```solidity
error Unauthorized();
```

Thrown when the caller is not authorized to perform the operation.

### InsufficientBalance

```solidity
error InsufficientBalance();
```

Thrown when there are insufficient funds for the operation.
