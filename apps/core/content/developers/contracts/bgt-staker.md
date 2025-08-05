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

**Inherits:**
IBGTStaker, OwnableUpgradeable, UUPSUpgradeable, StakingRewards

## Constants

### FEE_COLLECTOR

The fee collector contract that is allowed to notify rewards.

```solidity
address public FEE_COLLECTOR;
```

## State Variables

### balanceOf

The staked balance of an account.

```solidity
function balanceOf(address account) public view virtual returns (uint256);
```

### earned

The earned rewards of an account.

```solidity
function earned(address account) public view virtual returns (uint256);
```

### lastTimeRewardApplicable

The last time reward was applicable.

```solidity
function lastTimeRewardApplicable() public view virtual returns (uint256);
```

### lastUpdateTime

The last update time.

```solidity
uint256 public lastUpdateTime;
```

### owner

```solidity
function owner() public view virtual override returns (address);
```

### periodFinish

The period finish time.

```solidity
uint256 public periodFinish;
```

### proxiableUUID

```solidity
function proxiableUUID() external view virtual override notDelegated returns (bytes32);
```

### rewardPerToken

The reward per token.

```solidity
function rewardPerToken() public view virtual returns (uint256);
```

### rewardPerTokenStored

The stored reward per token.

```solidity
uint256 public rewardPerTokenStored;
```

### rewardRate

The reward rate.

```solidity
uint256 public rewardRate;
```

### rewardToken

The reward token address.

```solidity
address public rewardToken;
```

### rewards

The rewards of an account.

```solidity
function rewards(address account) public view virtual returns (uint256);
```

### rewardsDuration

The rewards duration.

```solidity
uint256 public rewardsDuration;
```

### stakeToken

The stake token address.

```solidity
address public stakeToken;
```

### totalSupply

The total supply of staked tokens.

```solidity
function totalSupply() public view virtual returns (uint256);
```

### undistributedRewards

The undistributed rewards.

```solidity
function undistributedRewards() public view returns (uint256);
```

### userRewardPerTokenPaid

The user reward per token paid.

```solidity
function userRewardPerTokenPaid(address account) public view virtual returns (uint256);
```

## View Functions

### getRewardForDuration

Get the reward for duration.

```solidity
function getRewardForDuration() public view virtual returns (uint256);
```

## Functions

### initialize

Initializes the contract.

**Emits:**

- [Initialized](#event-initialized)

```solidity
function initialize(address _bgt, address _feeCollector, address _governance, address _rewardToken) external initializer;
```

**Parameters**

| Name            | Type      | Description                |
| --------------- | --------- | -------------------------- |
| `_bgt`          | `address` | The BGT token address.     |
| `_feeCollector` | `address` | The fee collector address. |
| `_governance`   | `address` | The governance address.    |
| `_rewardToken`  | `address` | The reward token address.  |

### notifyRewardAmount

Notify the staker of a new reward amount.

_Can only be called by the fee collector._

**Emits:**

- [RewardAdded](#event-rewardadded)

```solidity
function notifyRewardAmount(uint256 reward) external;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `reward` | `uint256` | The amount of reward to notify. |

### recoverERC20

Recover ERC20 tokens.

_Revert if the tokenAddress is the reward token._

_Can only be called by the owner._

**Emits:**

- [Recovered](#event-recovered)

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration

Set the rewards duration.

_Revert if the reward cycle has started._

_Can only be called by the owner._

**Emits:**

- [RewardsDurationUpdated](#event-rewardsdurationupdated)

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external;
```

**Parameters**

| Name               | Type      | Description           |
| ------------------ | --------- | --------------------- |
| `_rewardsDuration` | `uint256` | The rewards duration. |

### stake

Stake BGT tokens.

_Can only be called by the BGT contract._

**Emits:**

- [Staked](#event-staked)

```solidity
function stake(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | The account to stake for.   |
| `amount`  | `uint256` | The amount of BGT to stake. |

### withdraw

Withdraw BGT tokens.

_Can only be called by the BGT contract._

**Emits:**

- [Withdrawn](#event-withdrawn)

```solidity
function withdraw(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to withdraw for.   |
| `amount`  | `uint256` | The amount of BGT to withdraw. |

### getReward

Get the reward.

_Get the reward for the caller._

**Emits:**

- [RewardPaid](#event-rewardpaid)

```solidity
function getReward() external returns (uint256);
```

**Returns**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `<none>` | `uint256` | The reward amount. |

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

| Name      | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `version` | `uint64` | The initialization version. |

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

| Name            | Type      | Description         |
| --------------- | --------- | ------------------- |
| `previousOwner` | `address` | The previous owner. |
| `newOwner`      | `address` | The new owner.      |

### Recovered {#event-recovered}

Emitted when a token has been recovered.

```solidity
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The token that has been recovered. |
| `amount` | `uint256` | The amount of token recovered.     |

### RewardAdded {#event-rewardadded}

Emitted when a reward is added.

```solidity
event RewardAdded(uint256 reward);
```

**Parameters**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `reward` | `uint256` | The reward amount. |

### RewardPaid {#event-rewardpaid}

Emitted when a reward is paid.

```solidity
event RewardPaid(address indexed account, address to, uint256 reward);
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account that earned reward.   |
| `to`      | `address` | The address that received reward. |
| `reward`  | `uint256` | The reward amount.                |

### RewardsDurationUpdated {#event-rewardsdurationupdated}

Emitted when the rewards duration is updated.

```solidity
event RewardsDurationUpdated(uint256 newDuration);
```

**Parameters**

| Name          | Type      | Description               |
| ------------- | --------- | ------------------------- |
| `newDuration` | `uint256` | The new rewards duration. |

### Staked {#event-staked}

Emitted when tokens are staked.

```solidity
event Staked(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | The account that staked.    |
| `amount`  | `uint256` | The amount that was staked. |

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

| Name             | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `implementation` | `address` | The new implementation address. |

### Withdrawn {#event-withdrawn}

Emitted when tokens are withdrawn.

```solidity
event Withdrawn(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account that withdrew.     |
| `amount`  | `uint256` | The amount that was withdrawn. |
