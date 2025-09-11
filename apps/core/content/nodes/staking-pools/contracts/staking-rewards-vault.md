<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingRewardsVault

The StakingRewardsVault manages rewards and implements auto-compounding functionality for staking pools.

## Functions

### withdrawRewards

```solidity
function withdrawRewards(uint256 amount) external;
```

Withdraws the specified amount of rewards from the vault.

**Parameters:**
- `amount`: The amount of rewards to withdraw

## View Functions

### balance

```solidity
function balance() external view returns (uint256);
```

Returns the current balance of the vault.

**Returns:**
- `uint256`: The current balance of the vault

## Events

### RewardsWithdrawn

```solidity
event RewardsWithdrawn(uint256 amount);
```

Emitted when rewards are withdrawn from the vault.

## Errors

### InsufficientBalance

```solidity
error InsufficientBalance();
```

Thrown when there are insufficient funds for the operation.

### Unauthorized

```solidity
error Unauthorized();
```

Thrown when the caller is not authorized to perform the operation.
