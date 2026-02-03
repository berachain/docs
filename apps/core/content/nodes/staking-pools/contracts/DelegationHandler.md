---
head:
  - - meta
    - property: og:title
      content: DelegationHandler Contract Reference
  - - meta
    - name: description
      content: Developer reference for the DelegationHandler contract used in staking pools
  - - meta
    - property: og:description
      content: Developer reference for the DelegationHandler contract used in staking pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# DelegationHandler

The DelegationHandler contract manages delegated funds for validators, allowing third parties to provide capital for staking pool operations while maintaining clear separation between fund providers and validator operators.

## State Variables

### FIRST_DEPOSIT_AMOUNT

```solidity
uint256 public constant FIRST_DEPOSIT_AMOUNT = 10_000 ether;
```

### stakingPool

```solidity
address public stakingPool;
```

### pubkey

```solidity
bytes public pubkey;
```

### delegatedAmount

```solidity
uint256 public delegatedAmount;
```

### delegatedAmountAvailable

```solidity
uint256 public delegatedAmountAvailable;
```

### isYieldRedeemRequest

```solidity
mapping(uint256 => bool) public isYieldRedeemRequest;
```

Tracks which withdrawal requests are for yield redemption (validator admin) versus principal withdrawal (delegator). When a validator admin calls `requestYieldWithdrawal()`, the resulting request ID is marked as a yield redeem request in this mapping. This allows the `completeWithdrawal()` function to determine the correct access control and fund handling based on the request type.

## Functions

### createStakingPoolWithDelegatedFunds

Creates a new staking pool with delegated funds.

**Required Role**: `VALIDATOR_ADMIN_ROLE`

```solidity
function createStakingPoolWithDelegatedFunds(
    bytes memory _pubkey,
    bytes memory withdrawalCredentials,
    bytes memory signature
)
    external
    onlyRole(VALIDATOR_ADMIN_ROLE);
```

**Parameters**

| Name                    | Type    | Description                                  |
| ----------------------- | ------- | -------------------------------------------- |
| `_pubkey`               | `bytes` | The validator's public key.                  |
| `withdrawalCredentials` | `bytes` | The withdrawal credentials of the validator. |
| `signature`             | `bytes` | The signature of the validator.              |

### depositDelegatedFunds

Deposits delegated funds into a staking pool.

**Required Role**: `VALIDATOR_ADMIN_ROLE`

```solidity
function depositDelegatedFunds(uint256 amount) external onlyRole(VALIDATOR_ADMIN_ROLE);
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `amount` | `uint256` | The amount of funds to deposit. |

### requestYieldWithdrawal

Requests a yield withdrawal for delegated funds.

**Required Role**: `VALIDATOR_ADMIN_ROLE`

```solidity
function requestYieldWithdrawal() external payable onlyRole(VALIDATOR_ADMIN_ROLE) whenNotPaused;
```

### completeWithdrawal

Completes a withdrawal request. Access control varies by request type: VALIDATOR_ADMIN_ROLE for yield withdrawals, DEFAULT_ADMIN_ROLE for principal withdrawals.

**Required Role**: `VALIDATOR_ADMIN_ROLE` (for yield withdrawals) or `DEFAULT_ADMIN_ROLE` (for principal withdrawals)

```solidity
function completeWithdrawal(uint256 requestId) external whenNotPaused auth(requestId);
```

**Parameters**

| Name        | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| `requestId` | `uint256` | The unique identifier of the withdrawal request. |

## Events

### DelegatedStakingPoolCreated

```solidity
event DelegatedStakingPoolCreated(address stakingPool);
```

Emitted when a validator admin successfully creates a staking pool using delegated funds via `createStakingPoolWithDelegatedFunds()`. The event includes the address of the newly created staking pool.

### DelegatedFundsDeposited

```solidity
event DelegatedFundsDeposited(uint256 amount);
```

Emitted when a validator admin deposits additional delegated funds into the staking pool via `depositDelegatedFunds()`. The event includes the amount of funds deposited.

### YieldRedeemRequested

```solidity
event YieldRedeemRequested(uint256 requestId, uint256 redeemableShares);
```

Emitted when a validator admin requests a yield withdrawal via `requestYieldWithdrawal()`. The event includes the withdrawal request ID and the amount of shares that can be redeemed for yield.

### WithdrawalCompleted

```solidity
event WithdrawalCompleted(uint256 requestId, uint256 assetsRequested, address receiver);
```

Emitted when any withdrawal request is completed via `completeWithdrawal()`. The event includes the request ID, the amount of assets withdrawn, and the address that received the funds (either the validator admin for yield withdrawals or the delegation handler for principal withdrawals).

## Errors

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown by `delegate()`, `withdraw()`, `depositDelegatedFunds()`, `requestDelegatedFundsWithdrawal()`, and `requestYieldWithdrawal()` when the amount is zero or exceeds available balance.

### InvalidPubkey

```solidity
error InvalidPubkey();
```

Thrown by `createStakingPoolWithDelegatedFunds()` when the provided pubkey doesn't match the validator's pubkey.

### InvalidDelegatedAmount

```solidity
error InvalidDelegatedAmount();
```

Thrown by `createStakingPoolWithDelegatedFunds()` when there are insufficient delegated funds available for the initial deposit.
