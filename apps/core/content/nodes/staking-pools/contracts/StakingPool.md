# StakingPool

<script setup>
  import config from '@berachain/config/constants.json';
</script>

<template v-if="config.contracts.stakingPools.stakingPool['mainnet-address']">
> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.stakingPool['mainnet-address']">{{config.contracts.stakingPools.stakingPool['mainnet-address']}}</a><span v-if="config.contracts.stakingPools.stakingPool.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.stakingPool.abi">ABI JSON</a></span></small>
</template>

**Inherits:**
IStakingPool, StBERA, PausableUpgradeable, OwnableUpgradeable

## State Variables

### BEACON_DEPOSIT

_Reference to BeaconDepositContract on Berachain._

```solidity
IBeaconDeposit public constant BEACON_DEPOSIT = IBeaconDeposit(0x4242424242424242424242424242424242424242);
```

### MIN_CL_DEPOSIT_AMOUNT

_Minimum amount for deposit to CL (see BeaconDepositContract)._

```solidity
uint256 public constant MIN_CL_DEPOSIT_AMOUNT = 10_000 ether;
```

### MIN_EFFECTIVE_BALANCE

_Minimum amount to be deposited to become a validator on Berachain._

```solidity
uint256 public constant MIN_EFFECTIVE_BALANCE = 250_000 ether;
```

### MAX_EFFECTIVE_BALANCE

_Maximum amount to be deposited for a validator on Berachain._

```solidity
uint256 public constant MAX_EFFECTIVE_BALANCE = 10_000_000 ether;
```

### ENABLE_WITHDRAWAL_COOLDOWN_BLOCKS

_Once minEffectiveBalance is deposited, withdrawals are disabled for a cooldown period (~1 day)_

```solidity
uint64 public constant ENABLE_WITHDRAWAL_COOLDOWN_BLOCKS = 43_200;
```

### \_pubkey

```solidity
bytes internal _pubkey;
```

### \_factory

```solidity
address internal _factory;
```

### \_smartOperator

```solidity
address internal _smartOperator;
```

### \_stakingRewardsVault

```solidity
address internal _stakingRewardsVault;
```

### \_withdrawalVault

```solidity
address internal _withdrawalVault;
```

### \_accountingOracle

```solidity
address internal _accountingOracle;
```

### \_defaultSharesRecipient

```solidity
address internal _defaultSharesRecipient;
```

### \_validatorActivationBlock

```solidity
uint256 internal _validatorActivationBlock;
```

### \_frozenTotalAssets

```solidity
uint256 internal _frozenTotalAssets;
```

### \_minEffectiveBalance

```solidity
uint256 internal _minEffectiveBalance;
```

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

## Functions


### getValidatorPubkey

```solidity
function getValidatorPubkey() external view returns (bytes memory);
```

### activate

Activates the staking pool with an initial deposit.

_Can only be called once by the factory contract while the pool is paused._

**Note:**
throws: StakingPoolAlreadyActivated if the pool is already activated or has deposits.

```solidity
function activate(uint256 initialDepositAmount) external;
```

**Parameters**

| Name                   | Type      | Description                                            |
| ---------------------- | --------- | ------------------------------------------------------ |
| `initialDepositAmount` | `uint256` | The initial amount of assets to deposit into the pool. |

### receiveRewards

A payable function for execution layer rewards.

_Can only be called by the `StakingRewardsVault`._

```solidity
function receiveRewards() external payable;
```

### notifyWithdrawalRequest

Processes a withdrawal request from a user by burning their shares.

_Can only be called by the withdrawal request ERC721 contract.
If the pool has not reached the activation threshold yet, assets will be transferred to the withdrawal vault.
If the pool has reached the activation threshold, withdrawals are frozen for the cooldown period._

**Note:**
throws: InvalidSender if not called by withdrawalRequestERC721.

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

### updateTotalDeposits

Updates the total deposits of the staking pool.

_Meant to be called by the accounting oracle to align total deposits with CL data._

```solidity
function updateTotalDeposits(uint256 newTotalDeposits) external whenNotPaused;
```

**Parameters**

| Name               | Type      | Description                                 |
| ------------------ | --------- | ------------------------------------------- |
| `newTotalDeposits` | `uint256` | The new total deposits of the staking pool. |

### receive

_Default payable function redirects to deposit function._

```solidity
receive() external payable;
```

### submit

Submit BERA to the staking pool, mints StBERA shares.

\*This function handles the deposit logic including:

- compute effective deposit amounts and any refunds needed
- mint stBERA shares to the depositor
- collect rewards from the staking rewards vault if needed
- deposit to CL if minimum threshold is met
- pause deposits if maximum capacity is reached\*

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

Mints shares to the default shares recipient.

_Can only be called by the smart operator._

```solidity
function mintFeeShares(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint256` | The amount of assets to mint. |

### \_submit

```solidity
function _submit(address receiver) internal whenNotPaused returns (uint256 shares);
```

### \_depositToConsensusLayer

_Deposits the given amount to CL._

```solidity
function _depositToConsensusLayer(uint256 amount) internal;
```

### \_canDeposit

_Determines if the current buffered assets can be deposited to the consensus layer._

\*The function ensure that:

- Buffered assets are >= MIN_CL_DEPOSIT_AMOUNT.\*

_Then checks two scenarios:_

_1. For inactive validators (below minEffectiveBalance):
Checks if total deposits plus buffered assets meet the minEffectiveBalance requirement._

\*2. For active validators (above minEffectiveBalance):

- Ensures remaining capacity after deposit will be either 0 or >= MIN_CL_DEPOSIT_AMOUNT
  to avoid small unusable residual amounts.\*

```solidity
function _canDeposit() internal returns (bool);
```

**Returns**

| Name     | Type   | Description                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------ |
| `<none>` | `bool` | bool Returns true if deposits can be made to consensus layer, false otherwise. |

### \_computeDepositAmounts

\*Processes a user's deposit and determines how it should be handled:

- check if the pool has sufficient capacity
- compute optional refund amount (if capacity exceeded)
- determine reward amount to be collected\*

```solidity
function _computeDepositAmounts(uint256 userDepositAmount)
    internal
    view
    returns (
        uint256 updatedBufferedAssets,
        uint256 effectiveUserDeposit,
        uint256 refundAmount,
        uint256 rewardsToCollect
    );
```

**Parameters**

| Name                | Type      | Description                         |
| ------------------- | --------- | ----------------------------------- |
| `userDepositAmount` | `uint256` | How much the user wants to deposit. |

**Returns**

| Name                    | Type      | Description                                                         |
| ----------------------- | --------- | ------------------------------------------------------------------- |
| `updatedBufferedAssets` | `uint256` | Total amount that will be held in the buffer after this submission. |
| `effectiveUserDeposit`  | `uint256` | How much of the user's deposit will actually be accepted.           |
| `refundAmount`          | `uint256` | The amount to send back to the user if the deposit is too large.    |
| `rewardsToCollect`      | `uint256` | The amount of reward to collect alongside the deposit.              |

### \_getTotalAssets

\*Returns the total assets managed by this contract as the sum of:

- total deposits sent to consensus layer
- assets currently buffered in this contract
- staking rewards held in the associated vault
- BGT tokens held by the smart operator\*

```solidity
function _getTotalAssets() internal view virtual override returns (uint256);
```

### \_collectRewards

_Collects the given amount of staking rewards from the associated vault._

```solidity
function _collectRewards(uint256 rewardsToCollect) internal;
```

### \_triggerFullExit

\*Triggers a full exit of the staking pool when stake falls below minimum effective balance.

1. Queues a drop boost via the smart operator.
2. Freezes total assets at current value.
3. Transfers any buffered assets to the withdrawal vault.
4. Transfers any staking rewards to the withdrawal vault.
5. Sets the full exit flag and pauses the staking pool.\*

**Notes:**

- emits: FullExitTriggered when full exit is triggered

- throws: TransferFailed if transfer to withdrawal vault fails

```solidity
function _triggerFullExit() internal;
```

### \_validateSender

_Validates that the sender is the expected address. Used only for function not protected by RBAC._

```solidity
function _validateSender(address expected) internal view;
```
