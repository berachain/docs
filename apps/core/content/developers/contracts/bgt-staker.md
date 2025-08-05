---
head:
  - - meta
    - property: og:title
      content: BGTStaker Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BGTStaker contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BGTStaker contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTStaker

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.bgtStaker['mainnet-address']">{{config.contracts.pol.bgtStaker['mainnet-address']}}</a><span v-if="config.contracts.pol.bgtStaker.abi && config.contracts.pol.bgtStaker.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.bgtStaker.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/BGTStaker.sol)

A contract that enables BGT token holders to stake their tokens and earn dApp fees without transferring their tokens. This contract acts as a non-custodial staking solution where BGT tokens remain in the holder's wallet while still allowing them to participate in fee distribution. The contract integrates with the FeeCollector to distribute protocol fees to BGT delegators.

**Inherits:** IBGTStaker, OwnableUpgradeable, UUPSUpgradeable, StakingRewards

## Constants

### FEE_COLLECTOR

The fee collector contract that is allowed to notify rewards.

```solidity
address public FEE_COLLECTOR;
```

## State Variables

### lastUpdateTime

The last time the rewards were updated.

```solidity
uint256 public lastUpdateTime;
```

### periodFinish

The end of the current reward period.

```solidity
uint256 public periodFinish;
```

### rewardPerTokenStored

The last updated reward per token scaled by PRECISION.

```solidity
uint256 public rewardPerTokenStored;
```

### rewardRate

The reward rate for the current reward period scaled by PRECISION.

```solidity
uint256 public rewardRate;
```

### rewardToken

The ERC20 token in which rewards are denominated and distributed.

```solidity
IERC20 public rewardToken;
```

### rewardsDuration

The time over which the rewards will be distributed.

```solidity
uint256 public rewardsDuration;
```

### stakeToken

The ERC20 token which users stake to earn rewards.

```solidity
IERC20 public stakeToken;
```

### totalSupply

The total supply of the staked tokens.

```solidity
uint256 public totalSupply;
```

### undistributedRewards

The amount of undistributed rewards scaled by PRECISION.

```solidity
uint256 public undistributedRewards;
```

## View Functions

### balanceOf

Get the balance of the staked tokens for an account.

```solidity
function balanceOf(address account) public view virtual returns (uint256);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to get the balance for |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The balance of the staked tokens |

### earned

Retrieves the amount of reward earned by a specific account.

```solidity
function earned(address account) public view virtual returns (uint256);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to calculate the reward for |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The amount of reward earned by the account |

### getRewardForDuration

Retrieves the total reward vested over the specified duration.

```solidity
function getRewardForDuration() public view virtual returns (uint256);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The total reward vested over the duration |

### lastTimeRewardApplicable

Returns the timestamp of the last reward distribution. This is either the current timestamp (if rewards are still being actively distributed) or the timestamp when the reward duration ended (if all rewards have already been distributed).

```solidity
function lastTimeRewardApplicable() public view virtual returns (uint256);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The timestamp of the last reward distribution |

### rewardPerToken

Retrieves the current value of the global reward per token accumulator. This value is the sum of the last checkpoint value and the accumulated value since the last checkpoint. It should increase monotonically over time as more rewards are distributed.

```solidity
function rewardPerToken() public view virtual returns (uint256);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The current value of the global reward per token accumulator scaled by 1e18 |

### rewards

Get the reward balance for a specific account.

```solidity
function rewards(address account) public view virtual returns (uint256);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to retrieve the reward balance for |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The current reward balance of the specified account |

### userRewardPerTokenPaid

Get the user reward per token paid.

```solidity
function userRewardPerTokenPaid(address account) public view virtual returns (uint256);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to retrieve the reward for |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The current reward balance of the specified account |

## Functions

### initialize

Initializes the contract.

**Emits:**

- [Initialized](#event-initialized)

```solidity
function initialize(
    address _bgt,
    address _feeCollector,
    address _governance,
    address _rewardToken
) external initializer;
```

**Parameters**

| Name            | Type      | Description                |
| --------------- | --------- | -------------------------- |
| `_bgt`          | `address` | The BGT token address      |
| `_feeCollector` | `address` | The fee collector address  |
| `_governance`   | `address` | The governance address     |
| `_rewardToken`  | `address` | The reward token address   |

### notifyRewardAmount

Notify the staker of a new reward amount.

_Can only be called by the fee collector._

**Emits:**

- [RewardAdded](#event-rewardadded)

```solidity
function notifyRewardAmount(uint256 reward) external onlyFeeCollector;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `reward` | `uint256` | The amount of reward to notify |

### recoverERC20

Recover ERC20 tokens.

_Revert if the tokenAddress is the reward token._

_Can only be called by the owner._

**Emits:**

- [Recovered](#event-recovered)

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner;
```

**Parameters**

| Name           | Type      | Description                    |
| -------------- | --------- | ------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover |
| `tokenAmount`  | `uint256` | The amount of token to recover |

### setRewardsDuration

Set the rewards duration.

_Revert if the reward cycle has started._

_Can only be called by the owner._

**Emits:**

- [RewardsDurationUpdated](#event-rewardsdurationupdated)

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description                    |
| ------------------ | --------- | ------------------------------ |
| `_rewardsDuration` | `uint256` | The rewards duration           |

### stake

Stake BGT tokens.

_Can only be called by the BGT contract._

**Emits:**

- [Staked](#event-staked)

```solidity
function stake(address account, uint256 amount) external onlyBGT;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to stake for        |
| `amount`  | `uint256` | The amount of BGT to stake      |

### withdraw

Withdraw BGT tokens.

_Can only be called by the BGT contract._

**Emits:**

- [Withdrawn](#event-withdrawn)

```solidity
function withdraw(address account, uint256 amount) external onlyBGT;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to withdraw for     |
| `amount`  | `uint256` | The amount of BGT to withdraw   |

### getReward

Get the reward.

_Get the reward for the caller._

**Emits:**

- [RewardPaid](#event-rewardpaid)

```solidity
function getReward() external returns (uint256);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The reward amount               |

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data) public payable virtual override onlyOwner;
```

## Events

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

| Name      | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `version` | `uint64` | The initialization version      |

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

| Name            | Type      | Description                    |
| --------------- | --------- | ------------------------------ |
| `previousOwner` | `address` | The previous owner              |
| `newOwner`      | `address` | The new owner                   |

### Recovered {#event-recovered}

Emitted when a token has been recovered.

```solidity
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `token`  | `address` | The token that has been recovered |
| `amount` | `uint256` | The amount of token recovered   |

### RewardAdded {#event-rewardadded}

Emitted when a reward has been added to the vault.

```solidity
event RewardAdded(uint256 reward);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `reward` | `uint256` | The amount of reward added, scaled by PRECISION |

### RewardPaid {#event-rewardpaid}

Emitted when a reward has been claimed.

```solidity
event RewardPaid(address indexed account, address to, uint256 reward);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account whose reward has been claimed |
| `to`      | `address` | The address that the reward was sent to (user or operator) |
| `reward`  | `uint256` | The amount of reward claimed    |

### RewardsDurationUpdated {#event-rewardsdurationupdated}

Emitted when the reward duration has been updated.

```solidity
event RewardsDurationUpdated(uint256 newDuration);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `newDuration` | `uint256` | The new duration of the reward  |

### Staked {#event-staked}

Emitted when the staking balance of an account has increased.

```solidity
event Staked(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account that has staked     |
| `amount`  | `uint256` | The amount of staked tokens     |

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

| Name             | Type      | Description                    |
| ---------------- | --------- | ------------------------------ |
| `implementation` | `address` | The new implementation address  |

### Withdrawn {#event-withdrawn}

Emitted when the staking balance of an account has decreased.

```solidity
event Withdrawn(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account that has withdrawn  |
| `amount`  | `uint256` | The amount of withdrawn tokens  |
