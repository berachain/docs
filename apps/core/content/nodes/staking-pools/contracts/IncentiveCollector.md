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

> <small><span v-if="config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']"><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.incentiveCollectorImpl['mainnet-address']}}</a></span><span v-else>Mainnet address not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.incentiveCollectorImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.incentiveCollectorImpl.abi">ABI JSON</a></span></small>

The IncentiveCollector contract manages incentive token collection for validators. It allows users to claim incentive tokens by paying a required payout amount, with fees going to the smart operator and the remaining amount to the staking rewards vault.

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

Queues a payout amount change. Callable only by the smart operator.

```solidity
function queuePayoutAmountChange(uint256 newPayoutAmount) external;
```

**Parameters**

| Name              | Type      | Description                             |
| ----------------- | --------- | --------------------------------------- |
| `newPayoutAmount` | `uint256` | The new payout amount in native tokens. |

**Requirements**

- Must be called by the smart operator
- New payout amount must not be zero

### claim

Claims incentive tokens by paying the required payout amount. Transfers all balances of specified ERC20 tokens to the caller and forwards fees to the smart operator and the remaining payout amount to the staking rewards vault.

```solidity
function claim(address[] calldata tokens) external payable;
```

**Parameters**

| Name     | Type        | Description                                            |
| -------- | ----------- | ------------------------------------------------------ |
| `tokens` | `address[]` | Array of ERC20 token addresses to claim balances from. |

**Requirements**

- Must send exactly the required payout amount
- This function does NOT implement slippage protection - caller must check received amounts

### recoverERC20

Emergency function to recover ERC20 tokens from the incentive collector. Callable only by the admin.

```solidity
function recoverERC20(address[] calldata tokens, address receiver) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name       | Type        | Description                                |
| ---------- | ----------- | ------------------------------------------ |
| `tokens`   | `address[]` | Array of ERC20 token addresses to recover. |
| `receiver` | `address`   | The address to transfer the tokens to.     |

**Requirements**

- Must be called by DEFAULT_ADMIN_ROLE

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

Thrown by `_validateSender()` when the sender is not the expected address.

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
