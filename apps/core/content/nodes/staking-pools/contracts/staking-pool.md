<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingPool

The StakingPool is the core contract for user deposits, share management, and pool operations. It acts as the primary interface for users to interact with the pool, handling deposits, withdrawals, and share calculations.

## State Variables

### MIN_CL_DEPOSIT_AMOUNT

```solidity
uint256 public constant MIN_CL_DEPOSIT_AMOUNT = 10_000 ether;
```

Minimum amount for deposit to consensus layer.

### MIN_EFFECTIVE_BALANCE

```solidity
uint256 public constant MIN_EFFECTIVE_BALANCE = 250_000 ether;
```

Minimum amount to be deposited to become a validator on Berachain.

### MAX_EFFECTIVE_BALANCE

```solidity
uint256 public constant MAX_EFFECTIVE_BALANCE = 10_000_000 ether;
```

Maximum amount to be deposited for a validator on Berachain.

### ENABLE_WITHDRAWAL_COOLDOWN_BLOCKS

```solidity
uint64 public constant ENABLE_WITHDRAWAL_COOLDOWN_BLOCKS = 43_200;
```

Cooldown period before withdrawals are enabled after reaching minimum effective balance.

## Functions

### submit

```solidity
function submit(address receiver) external payable returns (uint256 shares);
```

Submit BERA to the staking pool and receive shares in return.

**Parameters:**
- `receiver`: Address to receive the minted shares

**Returns:**
- `shares`: Amount of shares minted to the receiver

### activate

```solidity
function activate(uint256 initialDepositAmount) external;
```

Activates the staking pool with an initial deposit amount.

**Parameters:**
- `initialDepositAmount`: The initial amount of assets to deposit into the pool

### notifyWithdrawalRequest

```solidity
function notifyWithdrawalRequest(
    address user,
    uint256 assets
) external returns (uint256 sharesToBurn, bool isFullyExited, bool isShortCircuit);
```

Processes a withdrawal request from a user by burning their shares.

**Parameters:**
- `user`: Address of the user requesting withdrawal
- `assets`: Amount of BERA to withdraw

**Returns:**
- `sharesToBurn`: Amount of shares that were burned
- `isFullyExited`: Whether the pool has fully exited
- `isShortCircuit`: Whether the withdrawal request is short-circuited

### updateTotalDeposits

```solidity
function updateTotalDeposits(uint256 newTotalDeposits) external;
```

Updates the total deposits of the staking pool.

**Parameters:**
- `newTotalDeposits`: The new total deposits amount

### setMinEffectiveBalance

```solidity
function setMinEffectiveBalance(uint256 minEffectiveBalance) external;
```

Sets the minimum effective balance for the staking pool.

**Parameters:**
- `minEffectiveBalance`: The minimum effective balance to set

### mintFeeShares

```solidity
function mintFeeShares(uint256 amount) external;
```

Mints shares to the default shares recipient.

**Parameters:**
- `amount`: The amount of assets to mint

### receiveRewards

```solidity
function receiveRewards() external payable;
```

Receives execution layer rewards.

## View Functions

### getValidatorPubkey

```solidity
function getValidatorPubkey() external view returns (bytes memory);
```

Returns the validator's public key.

### minEffectiveBalance

```solidity
function minEffectiveBalance() public view returns (uint256);
```

Returns the minimum effective balance for the staking pool.

### isActive

```solidity
function isActive() external view returns (bool);
```

Returns true if the staking pool is active.

### isFullyExited

```solidity
function isFullyExited() external view returns (bool);
```

Returns true if the staking pool has fully exited.

### totalAssets

```solidity
function totalAssets() external view returns (uint256);
```

Returns the total assets managed by this contract.

### bufferedAssets

```solidity
function bufferedAssets() external view returns (uint256);
```

Returns the amount of assets currently buffered (not yet staked).

## Events

### StakingPoolActivated

```solidity
event StakingPoolActivated();
```

Emitted when the staking pool is activated.

### StakingRewardsReceived

```solidity
event StakingRewardsReceived(uint256 amount);
```

Emitted when staking rewards are received.

### MaxCapacityReached

```solidity
event MaxCapacityReached(bytes pubkey);
```

Emitted when the pool reaches maximum capacity.

### FullExitTriggered

```solidity
event FullExitTriggered();
```

Emitted when a full exit is triggered.

### TotalDepositsUpdated

```solidity
event TotalDepositsUpdated(uint256 newTotalDeposits);
```

Emitted when total deposits are updated.

### ActiveThresholdReached

```solidity
event ActiveThresholdReached();
```

Emitted when the active threshold is reached.

### MinEffectiveBalanceUpdated

```solidity
event MinEffectiveBalanceUpdated(uint256 newMinEffectiveBalance);
```

Emitted when the minimum effective balance is updated.

## Errors

### StakingPoolAlreadyActivated

```solidity
error StakingPoolAlreadyActivated();
```

Thrown when attempting to activate an already activated pool.

### StakingPoolFullExited

```solidity
error StakingPoolFullExited();
```

Thrown when attempting to unpause a fully exited pool.

### InvalidSender

```solidity
error InvalidSender(address sender, address expected);
```

Thrown when the sender is not the expected address.

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown when an invalid amount is provided.

### WithdrawalNotAllowed

```solidity
error WithdrawalNotAllowed();
```

Thrown when withdrawal is not allowed due to cooldown period.

### InvalidMinEffectiveBalance

```solidity
error InvalidMinEffectiveBalance();
```

Thrown when the minimum effective balance is invalid.
