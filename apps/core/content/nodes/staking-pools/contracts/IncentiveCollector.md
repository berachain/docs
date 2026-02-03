---
head:
  - - meta
    - property: og:title
      content: IncentiveCollector Contract Reference
  - - meta
    - name: description
      content: Developer reference for the IncentiveCollector contract
  - - meta
    - property: og:description
      content: Developer reference for the IncentiveCollector contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IncentiveCollector

The IncentiveCollector contract manages incentive token collection for validators. It allows anyone (operator, arbitrageur, or other addresses) to claim accumulated incentive tokens by paying a required payout amount, with fees going to the smart operator and the remaining amount to the staking rewards vault.

## State Variables

### payoutAmount

```solidity
uint256 public payoutAmount;
```

### queuedPayoutAmount

```solidity
uint256 public queuedPayoutAmount;
```

### feePercentage

```solidity
uint96 public feePercentage;
```

## Functions

### queuePayoutAmountChange

Queues a payout amount change. The change takes effect on the next `claim()` call. This function can only be called by the SmartOperator contract, which requires the caller to have the `INCENTIVE_COLLECTOR_MANAGER_ROLE` on SmartOperator.

```solidity
function queuePayoutAmountChange(uint256 newPayoutAmount) external;
```

**Parameters**

| Name              | Type      | Description                             |
| ----------------- | --------- | --------------------------------------- |
| `newPayoutAmount` | `uint256` | The new payout amount in native tokens. |

**Requirements**

- Must be called by the SmartOperator contract
- New payout amount must not be zero

**How to Update:**

To update the payout amount, call `queueIncentiveCollectorPayoutAmountChange()` on your SmartOperator contract (requires `INCENTIVE_COLLECTOR_MANAGER_ROLE`). The change is queued and will take effect automatically on the next `claim()` call.

### claim

Claims all accumulated incentive tokens by paying the required payout amount. This function implements a permissionless incentive auction mechanism where **anyone** can pay the `payoutAmount` (initially 100 BERA) to claim **all** accumulated tokens for the specified token addresses. The buyer may be the validator operator, an arbitrageur monitoring the network, or any other address that finds the pool profitable.

**Important**: This is a winner-takes-all incentive auction. The first buyer to pay the payout amount receives all accumulated tokens. There is no partial claiming or proportional distribution. The incentive auction is completely permissionless—anyone can call this function.

**What Happens:**

- The buyer receives all balances of the specified ERC20 tokens held by the contract
- Protocol fee (based on `feePercentage`) is deducted from the payout amount and minted as shares to the validator's `defaultShareRecipient`
- Net payout amount (payoutAmount - fee) is sent to StakingRewardsVault for distribution to shareholders and auto-compounded
- Any queued payout amount or fee percentage changes are applied

**Checking Current Payout Available:**

To determine the current value of tokens available for claim, check the balance of each token in the IncentiveCollector contract:

```solidity
// For each token address you want to check
uint256 balance = IERC20(tokenAddress).balanceOf(address(incentiveCollector));
```

The buyer should verify that the total value of all token balances exceeds the `payoutAmount` before calling `claim()`. Validators should develop a scheme to sample payouts by monitoring token balances in their IncentiveCollector contract to ensure the `payoutAmount` remains appropriate relative to accumulated token values.

```solidity
function claim(address[] calldata tokens) external payable;
```

**Parameters**

| Name     | Type        | Description                                                                                                                                |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens` | `address[]` | Array of ERC20 token addresses to claim balances from. All balances of these tokens held by the contract will be transferred to the buyer. |

**Requirements**

- Must send exactly `payoutAmount` in native tokens (msg.value must equal `payoutAmount`)
- Validator must not be fully exited
- This function does NOT implement slippage protection - the buyer must verify that the value of tokens received exceeds the payout cost

**Token Sources**

Tokens accumulate in IncentiveCollector when you forward them from SmartOperator using `claimBoostRewards()`. Tokens may also accumulate from direct transfers if anyone sends tokens directly to the contract.

**Example Flow:**

1. Your validator earns commission on incentive tokens (automatically sent to SmartOperator)
2. You call `claimBoostRewards()` to forward tokens to IncentiveCollector
3. Tokens accumulate in IncentiveCollector
4. A buyer (operator, arbitrageur, or any address) checks token balances and determines the value exceeds the `payoutAmount`
5. The buyer calls `claim()` with the payout amount (default 100 BERA) to receive all accumulated tokens
6. The payout amount (minus protocol fee) goes to StakingRewardsVault and is distributed to stakers

## Events

### Donated

```solidity
event Donated(address indexed donor, uint256 amount);
```

Emitted when native tokens are sent directly to the contract via the `receive()` function. The tokens are automatically forwarded to the staking rewards vault.

**Parameters**

| Name     | Type      | Description               |
| -------- | --------- | ------------------------- |
| `donor`  | `address` | The address of the donor. |
| `amount` | `uint256` | The amount donated.       |

### PayoutAmountSet

Emitted when payout amount is set by admin.

```solidity
event PayoutAmountSet(uint256 oldValue, uint256 newValue);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `oldValue` | `uint256` | The previous value for payout amount. |
| `newValue` | `uint256` | The new value for payout amount.      |

### QueuedPayoutAmount

Emitted when payout amount is queued by admin.

```solidity
event QueuedPayoutAmount(uint256 newPayoutAmount, uint256 oldPayoutAmount);
```

**Parameters**

| Name              | Type      | Description                           |
| ----------------- | --------- | ------------------------------------- |
| `newPayoutAmount` | `uint256` | The new value for payout amount.      |
| `oldPayoutAmount` | `uint256` | The previous value for payout amount. |

### FeePercentageSet

Emitted when fee percentage is set by admin.

```solidity
event FeePercentageSet(uint96 oldValue, uint96 newValue);
```

**Parameters**

| Name       | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| `oldValue` | `uint96` | The previous value for fee percentage. |
| `newValue` | `uint96` | The new value for fee percentage.      |

### IncentiveTokenClaimed

Emitted when one token is claimed.

```solidity
event IncentiveTokenClaimed(address indexed from, address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `from`   | `address` | The address of the claimer.  |
| `token`  | `address` | The address of the token.    |
| `amount` | `uint256` | The amount of token claimed. |

### IncentiveTokensClaimed

Emitted when all incentive tokens are claimed.

```solidity
event IncentiveTokensClaimed(address indexed from, uint256 payoutAmount, uint256 fee);
```

**Parameters**

| Name           | Type      | Description                                                       |
| -------------- | --------- | ----------------------------------------------------------------- |
| `from`         | `address` | The address of the claimer.                                       |
| `payoutAmount` | `uint256` | The amount paid to claim.                                         |
| `fee`          | `uint256` | The fee paid to the validator on the payoutAmount for this claim. |

## Errors

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

Thrown when a function is called by an unauthorized address.

### IncorrectPayoutAmount

```solidity
error IncorrectPayoutAmount();
```

Thrown by `claim()` when the msg.value does not match the required payout amount.

### NodeIsFullyExited

```solidity
error NodeIsFullyExited();
```

Thrown by functions when the validator node has been fully exited.

### PayoutAmountIsZero

```solidity
error PayoutAmountIsZero();
```

Thrown by `claim()` when the payout amount is zero.
