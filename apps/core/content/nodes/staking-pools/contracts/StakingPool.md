---
head:
  - - meta
    - property: og:title
      content: StakingPool Contract Reference
  - - meta
    - name: description
      content: Developer reference for the StakingPool contract
  - - meta
    - property: og:description
      content: Developer reference for the StakingPool contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingPool

The StakingPool contract is the main liquid staking contract that allows stakers to deposit BERA and receive StBERA shares. It manages your validator's stake, processes deposits and withdrawals, and handles the transition between inactive and active validator states.

## State Variables

### isActive

```solidity
bool public isActive;
```

### isFullyExited

```solidity
bool public isFullyExited;
```

### bufferedAssets

```solidity
uint256 public bufferedAssets;
```

### totalDeposits

```solidity
uint256 public totalDeposits;
```

### activeThresholdReached

```solidity
bool public activeThresholdReached;
```

## View Functions

### getValidatorPubkey

```solidity
function getValidatorPubkey() external view returns (bytes memory);
```

### minEffectiveBalance

Returns the minimum effective balance for the staking pool. If not set, returns the default minimum effective balance.

```solidity
function minEffectiveBalance() public view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `<none>` | `uint256` | The minimum effective balance for the staking pool. |

## Functions

### activate

Activates the staking pool with an initial deposit. Can only be called once by the factory contract while the pool is paused.

```solidity
function activate(uint256 initialDepositAmount) external;
```

**Parameters**

| Name                   | Type      | Description                         |
| ---------------------- | --------- | ----------------------------------- |
| `initialDepositAmount` | `uint256` | Initial amount of assets to deposit |

**Errors**

- `StakingPoolAlreadyActivated` — Pool already activated or has deposits
- `InvalidSender` — Not called by factory contract

### submit

Submit BERA to the staking pool, mints StBERA shares. This function handles the deposit logic including: compute effective deposit amounts and any refunds needed, mint stBERA shares to the depositor, collect rewards from the staking rewards vault if needed, deposit to CL if minimum threshold is met, pause deposits if maximum capacity is reached.

```solidity
function submit(address receiver) external payable returns (uint256 shares);
```

**Parameters**

| Name       | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| `receiver` | `address` | The address to mint the shares to. |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `shares` | `uint256` | The amount of stBERA shares minted to the depositor. |

### processRewards

Processes rewards from the staking rewards vault. Compound rewards from the staking rewards vault to the staking pool.

```solidity
function processRewards() external;
```

### receiveRewards

Receives execution layer rewards. Can only be called by the StakingRewardsVault.

```solidity
function receiveRewards() external payable;
```

### notifyWithdrawalRequest

Processes a withdrawal request by burning user shares. Called by the withdrawal request ERC721 contract.

```solidity
function notifyWithdrawalRequest(
    address user,
    uint256 assets
) external returns (uint256 sharesToBurn, bool isFullyExited, bool isShortCircuit);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `user`   | `address` | Address requesting withdrawal |
| `assets` | `uint256` | Amount of BERA to withdraw    |

**Returns**

| Name             | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `sharesToBurn`   | `uint256` | Amount of shares burned                                     |
| `isFullyExited`  | `bool`    | Whether the pool has fully exited                           |
| `isShortCircuit` | `bool`    | Whether withdrawal was short-circuited (immediate transfer) |

**Behavior**

- Short-circuit: If validator not activated and sufficient buffered assets exist, funds transfer immediately
- After activation: Withdrawals require consensus layer exit process with cooldown

### setMinEffectiveBalance

Sets the minimum effective balance for the staking pool. Can only be called by the smart operator.

```solidity
function setMinEffectiveBalance(uint256 minEffectiveBalance) external;
```

**Parameters**

| Name                  | Type      | Description                          |
| --------------------- | --------- | ------------------------------------ |
| `minEffectiveBalance` | `uint256` | The minimum effective balance to set |

**Errors**

- `InvalidSender` — Not called by smart operator
- `InvalidMinEffectiveBalance` — New min effective balance is not valid

### updateTotalDeposits

Updates the total deposits of the staking pool. Meant to be called by the accounting oracle to align total deposits with CL data.

```solidity
function updateTotalDeposits(uint256 newTotalDeposits) external;
```

**Parameters**

| Name               | Type      | Description            |
| ------------------ | --------- | ---------------------- |
| `newTotalDeposits` | `uint256` | The new total deposits |

### mintFeeShares

Mints shares to the default shares recipient. Can only be called by the smart operator. Used to mint shares to the validator instead of accruing fees.

```solidity
function mintFeeShares(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `amount` | `uint256` | Amount of assets to mint |

### pause

Pauses deposits. Admin function.

```solidity
function pause() external;
```

### unpause

Unpauses deposits. Admin function. Can only be called if the pool is not fully exited.

```solidity
function unpause() external;
```

**Errors**

- `StakingPoolFullExited` — Pool has fully exited

## Events

### StakingPoolActivated

```solidity
event StakingPoolActivated();
```

Emitted when the pool is activated via `activate()`.

### StakingRewardsReceived

```solidity
event StakingRewardsReceived(uint256 amount);
```

Emitted when execution layer rewards are received via `receiveRewards()`.

### MaxCapacityReached

```solidity
event MaxCapacityReached(bytes pubkey);
```

Emitted when the staking pool reaches maximum capacity during `_processDeposit()`.

### FullExitTriggered

```solidity
event FullExitTriggered();
```

Emitted when a full exit is triggered via `triggerFullExit()`.

### TotalDepositsUpdated

```solidity
event TotalDepositsUpdated(uint256 newTotalDeposits);
```

Emitted when total deposits are updated during `_processDeposit()` or via `updateTotalDeposits()`.

### ActiveThresholdReached

```solidity
event ActiveThresholdReached();
```

Emitted when the active threshold is reached during `_processDeposit()`.

### MinEffectiveBalanceUpdated

```solidity
event MinEffectiveBalanceUpdated(uint256 newMinEffectiveBalance);
```

Emitted when the minimum effective balance is updated via `setMinEffectiveBalance()`.

### DepositSubmitted

```solidity
event DepositSubmitted(
    address indexed receiver,
    uint256 userDepositAmount,
    uint256 shares,
    uint256 rewardsCollected,
    uint256 bufferedAssets,
    uint256 totalDeposits
);
```

Emitted when a deposit is submitted via `submit()`. Includes details about the deposit amount, shares minted, rewards collected, and updated pool state.

## Errors

### StakingPoolAlreadyActivated

```solidity
error StakingPoolAlreadyActivated();
```

Thrown by `activate()` when the pool is already activated or has deposits.

### StakingPoolFullExited

```solidity
error StakingPoolFullExited();
```

Thrown by various functions when the staking pool has been fully exited.

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

Thrown by `_validateSender()` when the sender is not the expected address.

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown by `_submit()` when the deposit amount is zero.

### WithdrawalNotAllowed

```solidity
error WithdrawalNotAllowed();
```

Thrown by withdrawal functions when the withdrawal cooldown period has not elapsed.

### InvalidMinEffectiveBalance

```solidity
error InvalidMinEffectiveBalance();
```

Thrown by `setMinEffectiveBalance()` when the new minimum effective balance is not valid (must be between MIN_EFFECTIVE_BALANCE and MAX_EFFECTIVE_BALANCE).
