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

> <small><span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']"><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']}}</a></span><span v-else>Mainnet address not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.stakingPoolImpl.abi">ABI JSON</a></span></small>

The StakingPool contract is the main liquid staking contract that allows users to deposit BERA and receive StBERA shares. It manages the validator's stake, processes deposits and withdrawals, and handles the transition between inactive and active validator states.

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

| Name                   | Type      | Description                                            |
| ---------------------- | --------- | ------------------------------------------------------ |
| `initialDepositAmount` | `uint256` | The initial amount of assets to deposit into the pool. |

**Requirements**

- Can only be called by the factory contract
- Pool must be paused
- Pool must not already be activated or have deposits

### setMinEffectiveBalance

Sets the minimum effective balance for the staking pool.

```solidity
function setMinEffectiveBalance(uint256 newMinEffectiveBalance) external;
```

**Parameters**

| Name                     | Type      | Description                       |
| ------------------------ | --------- | --------------------------------- |
| `newMinEffectiveBalance` | `uint256` | The new minimum effective balance |

**Requirements**

- Must be called by the smart operator

### receiveRewards

A payable function for execution layer rewards. Can only be called by the StakingRewardsVault.

```solidity
function receiveRewards() external payable;
```

### notifyWithdrawalRequest

Processes a withdrawal request from a user by burning their shares. Can only be called by the withdrawal request ERC721 contract. If the pool has not reached the activation threshold yet, assets will be transferred to the withdrawal vault. If the pool has reached the activation threshold, withdrawals are frozen for the cooldown period.

```solidity
function notifyWithdrawalRequest(address user, uint256 assets) external returns (uint256, bool, bool);
```

**Parameters**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `user`   | `address` | The address of the user requesting withdrawal. |
| `assets` | `uint256` | The amount of BERA to withdraw.                |

**Returns**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `<none>` | `uint256` | sharesToBurn The amount of shares that were burned.               |
| `<none>` | `bool`    | isFullyExited Whether the pool has fully exited.                  |
| `<none>` | `bool`    | isShortCircuit Whether the withdrawal request is short-circuited. |

**Requirements**

- Must be called by withdrawalVault

### updateTotalDeposits

Updates the total deposits of the staking pool. Meant to be called by the accounting oracle to align total deposits with CL data.

```solidity
function updateTotalDeposits(uint256 newTotalDeposits) external whenNotPaused;
```

**Parameters**

| Name               | Type      | Description                                 |
| ------------------ | --------- | ------------------------------------------- |
| `newTotalDeposits` | `uint256` | The new total deposits of the staking pool. |

### submit

Submit BERA to the staking pool, mints StBERA shares. This function handles the deposit logic including: compute effective deposit amounts and any refunds needed, mint stBERA shares to the depositor, collect rewards from the staking rewards vault if needed, deposit to CL if minimum threshold is met, pause deposits if maximum capacity is reached.

```solidity
function submit(address receiver) external payable returns (uint256);
```

**Parameters**

| Name       | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| `receiver` | `address` | The address to mint the shares to. |

**Returns**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `<none>` | `uint256` | shares The amount of stBERA shares minted to the depositor. |

### mintFeeShares

Mints shares to the default shares recipient. Can only be called by the smart operator.

```solidity
function mintFeeShares(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint256` | The amount of assets to mint. |

### processRewards

Processes rewards from the staking rewards vault. Compound rewards from the staking rewards vault to the staking pool.

```solidity
function processRewards() external whenNotPaused;
```

### pause

Pauses deposits. Admin function.

```solidity
function pause() external onlyOwner;
```

### unpause

Unpauses deposits. Admin function.

```solidity
function unpause() external onlyOwner;
```

## Events

### StakingPoolActivated

```solidity
event StakingPoolActivated();
```

Emitted when the staking pool is activated via `activate()`.

### StakingRewardsReceived

```solidity
event StakingRewardsReceived(uint256 amount);
```

Emitted when staking rewards are received via `receiveRewards()`.

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

Emitted when total deposits are updated during `_processDeposit()`.

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

## Errors

### StakingPoolAlreadyActivated

```solidity
error StakingPoolAlreadyActivated();
```

Thrown by `activate()` when the staking pool has already been activated.

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

Thrown by `setMinEffectiveBalance()` when the new minimum effective balance is invalid.
