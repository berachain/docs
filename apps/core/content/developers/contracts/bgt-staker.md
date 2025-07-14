<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTStaker

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.bgtStaker['mainnet-address']">{{config.contracts.pol.bgtStaker['mainnet-address']}}</a><span v-if="config.contracts.pol.bgtStaker.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.bgtStaker.abi">ABI JSON</a></span></small>

A contract for staking BGT tokens without transferring them. BGT delegators stake in this contract and receive dApp fees.

## Functions

### notifyRewardAmount

Notify the staker of a new reward amount.

_Can only be called by the fee collector._

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

```solidity
function getReward() external returns (uint256);
```

**Returns**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `<none>` | `uint256` | The reward amount. |

## Events

### Recovered

Emitted when a token has been recovered.

```solidity
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The token that has been recovered. |
| `amount` | `uint256` | The amount of token recovered.     |
