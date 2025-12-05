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

> <small><span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']">Mainnet: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.stakingPoolImpl['mainnet-address']}}</a></span><span v-else>Mainnet: Not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']">&nbsp;|&nbsp;Bepolia: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.stakingPoolImpl['bepolia-address']}}</a></span><span v-if="config.contracts.stakingPoolImplementations.stakingPoolImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.stakingPoolImpl.abi">ABI JSON</a></span></small>

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

### minActivationBalance

Returns the minimum effective balance for the staking pool. If not set, returns the default minimum effective balance.

```solidity
function minActivationBalance() public view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `<none>` | `uint256` | The minimum effective balance for the staking pool. |

## Functions

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

### processRewards

Processes rewards from the staking rewards vault. Compound rewards from the staking rewards vault to the staking pool.

```solidity
function processRewards() external whenNotPaused;
```

## Events

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

## Errors

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
