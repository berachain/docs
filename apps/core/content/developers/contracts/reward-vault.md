<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVault

The RewardVault contract is the main Proof of Liquidity integration point for network incentives, handling the staking (of LP tokens) and rewards accounting of $BGT.

Rewards calculation is inspired by the battle-tested [Synthetix StakingRewards Contract](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).

## Functions

### distributor

Get the address that is allowed to distribute rewards.

```solidity
function distributor() external view returns (address);
```

**Returns**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `<none>` | `address` | The address that is allowed to distribute rewards. |

### operator

Get the operator for an account.

```solidity
function operator(address account) external view returns (address);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account to get the operator for. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The operator for the account. |

### getWhitelistedTokensCount

Get the count of active incentive tokens.

```solidity
function getWhitelistedTokensCount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The count of active incentive tokens. |

### getWhitelistedTokens

Get the list of whitelisted tokens.

```solidity
function getWhitelistedTokens() external view returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                     |
| -------- | ----------- | ------------------------------- |
| `<none>` | `address[]` | The list of whitelisted tokens. |

### getTotalDelegateStaked

Get the total amount staked by delegates.

```solidity
function getTotalDelegateStaked(address account) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The total amount staked by delegates. |

### getDelegateStake

Get the amount staked by a delegate on behalf of an account.

```solidity
function getDelegateStake(address account, address delegate) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `uint256` | The amount staked by a delegate. |

### initialize

Initialize the vault, this is only callable once and by the factory since its the deployer.

```solidity
function initialize(address _berachef, address _bgt, address _distributor, address _stakingToken) external;
```

**Parameters**

| Name            | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `_berachef`     | `address` | The address of the berachef.      |
| `_bgt`          | `address` | The address of the BGT token.     |
| `_distributor`  | `address` | The address of the distributor.   |
| `_stakingToken` | `address` | The address of the staking token. |

### setDistributor

Allows the owner to set the contract that is allowed to distribute rewards.

```solidity
function setDistributor(address _rewardDistribution) external;
```

**Parameters**

| Name                  | Type      | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `_rewardDistribution` | `address` | The address that is allowed to distribute rewards. |

### notifyRewardAmount

Allows the distributor to notify the reward amount.

```solidity
function notifyRewardAmount(bytes calldata pubkey, uint256 reward) external;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator.    |
| `reward` | `uint256` | The amount of reward to notify. |

### recoverERC20

Allows the owner to recover any ERC20 token from the vault.

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration

Allows the owner to update the duration of the rewards.

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external;
```

**Parameters**

| Name               | Type      | Description                      |
| ------------------ | --------- | -------------------------------- |
| `_rewardsDuration` | `uint256` | The new duration of the rewards. |

### whitelistIncentiveToken

Allows the owner to whitelist a token to incentivize with.

```solidity
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external;
```

**Parameters**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist.                           |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission. |
| `manager`          | `address` | The address of the manager that can addIncentive for this token. |

### removeIncentiveToken

Allows the owner to remove a whitelisted incentive token.

```solidity
function removeIncentiveToken(address token) external;
```

**Parameters**

| Name    | Type      | Description                         |
| ------- | --------- | ----------------------------------- |
| `token` | `address` | The address of the token to remove. |

### setMaxIncentiveTokensCount

Allows the owner to update the maxIncentiveTokensCount.

```solidity
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external;
```

**Parameters**

| Name                       | Type    | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count. |

### pause

Allows the owner to pause the vault.

```solidity
function pause() external;
```

### unpause

Allows the owner to unpause the vault.

```solidity
function unpause() external;
```

### exit

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

_Clears out the user self-staked balance and rewards._

```solidity
function exit(address recipient) external;
```

**Parameters**

| Name        | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| `recipient` | `address` | The address to send the 'BGT' reward to. |

### getReward

Claim the reward.

_The operator only handles BGT, not STAKING_TOKEN._

_Callable by the operator or the account holder._

```solidity
function getReward(address account, address recipient) external returns (uint256);
```

**Parameters**

| Name        | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| `account`   | `address` | The account to get the reward for. |
| `recipient` | `address` | The address to send the reward to. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The amount of the reward claimed. |

### stake

Stake tokens in the vault.

```solidity
function stake(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `amount` | `uint256` | The amount of tokens to stake. |

### delegateStake

Stake tokens on behalf of another account.

```solidity
function delegateStake(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to stake for.      |
| `amount`  | `uint256` | The amount of tokens to stake. |

### withdraw

Withdraw the staked tokens from the vault.

```solidity
function withdraw(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `amount` | `uint256` | The amount of tokens to withdraw. |

### delegateWithdraw

Withdraw tokens staked on behalf of another account by the delegate (msg.sender).

```solidity
function delegateWithdraw(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to withdraw for.      |
| `amount`  | `uint256` | The amount of tokens to withdraw. |

### setOperator

Allows msg.sender to set another address to claim and manage their rewards.

```solidity
function setOperator(address _operator) external;
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `_operator` | `address` | The address that will be allowed to claim and manage rewards. |

### updateIncentiveManager

Update the manager of an incentive token.

_Permissioned function, only allow factory owner to update the manager._

```solidity
function updateIncentiveManager(address token, address newManager) external;
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `token`      | `address` | The address of the incentive token.     |
| `newManager` | `address` | The new manager of the incentive token. |

### addIncentive

Add an incentive token to the vault.

The incentive token's transfer should not exceed a gas usage of 500k units.
In case the transfer exceeds 500k gas units, your incentive will fail to be transferred to the validator and
its delegates.

_Permissioned function, only callable by incentive token manager._

```solidity
function addIncentive(address token, uint256 amount, uint256 incentiveRate) external;
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The address of the token to add as an incentive.         |
| `amount`        | `uint256` | The amount of the token to add as an incentive.          |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

### balanceOf

Get the balance of the staked tokens for an account.

```solidity
function balanceOf(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `account` | `address` | The account to get the balance for. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The balance of the staked tokens. |

### rewards

Get the reward balance for a specific account.

```solidity
function rewards(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description                                     |
| --------- | --------- | ----------------------------------------------- |
| `account` | `address` | The account to retrieve the reward balance for. |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `uint256` | The current reward balance of the specified account. |

### userRewardPerTokenPaid

Get the user reward per token paid.

```solidity
function userRewardPerTokenPaid(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| `account` | `address` | The account to retrieve the reward for. |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `uint256` | The current reward balance of the specified account. |

### earned

Retrieves the amount of reward earned by a specific account.

```solidity
function earned(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| `account` | `address` | The account to calculate the reward for. |

**Returns**

| Name     | Type      | Description                                 |
| -------- | --------- | ------------------------------------------- |
| `<none>` | `uint256` | The amount of reward earned by the account. |

### getRewardForDuration

Retrieves the total reward vested over the specified duration.

```solidity
function getRewardForDuration() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `uint256` | The total reward vested over the duration. |

### lastTimeRewardApplicable

Returns the timestamp of the last reward distribution. This is either the current timestamp (if rewards
are still being actively distributed) or the timestamp when the reward duration ended (if all rewards have
already been distributed).

```solidity
function lastTimeRewardApplicable() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `<none>` | `uint256` | The timestamp of the last reward distribution. |

### rewardPerToken

Retrieves the current value of the global reward per token accumulator. This value is the sum of the
last checkpoint value and the accumulated value since the last checkpoint. It should increase monotonically
over time as more rewards are distributed.

```solidity
function rewardPerToken() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                                  |
| -------- | --------- | ---------------------------------------------------------------------------- |
| `<none>` | `uint256` | The current value of the global reward per token accumulator scaled by 1e18. |

### totalSupply

Get the total supply of the staked tokens in the vault.

```solidity
function totalSupply() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `<none>` | `uint256` | The total supply of the staked tokens in the vault. |

### periodFinish

Get the end of the current reward period.

```solidity
function periodFinish() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The end of the current reward period. |

### rewardRate

Get the reward rate for the current reward period.

```solidity
function rewardRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `<none>` | `uint256` | The reward rate. |

### rewardsDuration

Get the time over which the rewards will be distributed.

```solidity
function rewardsDuration() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `<none>` | `uint256` | The duration of the rewards cycle. |

### lastUpdateTime

Get the last time the rewards were updated.

```solidity
function lastUpdateTime() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` | The last time the rewards were updated. |

### undistributedRewards

Get the amount of undistributed rewards.

```solidity
function undistributedRewards() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of undistributed rewards. |

### rewardPerTokenStored

Get the last updated reward per token scaled.

```solidity
function rewardPerTokenStored() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `<none>` | `uint256` | The last updated reward per token. |

## Events

### DelegateStaked

Emitted when a delegate has staked on behalf of an account.

```solidity
event DelegateStaked(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `account`  | `address` | The account whose delegate has staked. |
| `delegate` | `address` | The delegate that has staked.          |
| `amount`   | `uint256` | The amount of staked tokens.           |

### DelegateWithdrawn

Emitted when a delegate has withdrawn on behalf of an account.

```solidity
event DelegateWithdrawn(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| `account`  | `address` | The account whose delegate has withdrawn. |
| `delegate` | `address` | The delegate that has withdrawn.          |
| `amount`   | `uint256` | The amount of withdrawn tokens.           |

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

### OperatorSet

Emitted when the msg.sender has set an operator to handle its rewards.

```solidity
event OperatorSet(address account, address operator);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `account`  | `address` | The account that has set the operator. |
| `operator` | `address` | The operator that has been set.        |

### DistributorSet

Emitted when the distributor is set.

```solidity
event DistributorSet(address indexed distributor);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `distributor` | `address` | The address of the distributor. |

### IncentiveManagerChanged

Emitted when the manager of an incentive token is changed.

```solidity
event IncentiveManagerChanged(address indexed token, address newManager, address oldManager);
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `token`      | `address` | The address of the incentive token.     |
| `newManager` | `address` | The new manager of the incentive token. |
| `oldManager` | `address` | The old manager of the incentive token. |

### IncentiveTokenWhitelisted

Emitted when an incentive token is whitelisted.

```solidity
event IncentiveTokenWhitelisted(address indexed token, uint256 minIncentiveRate, address manager);
```

**Parameters**

| Name               | Type      | Description                                                                |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `token`            | `address` | The address of the token that has been whitelisted.                        |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission.           |
| `manager`          | `address` | The address of the manager that can addIncentive for this incentive token. |

### IncentiveTokenRemoved

Emitted when an incentive token is removed.

```solidity
event IncentiveTokenRemoved(address indexed token);
```

**Parameters**

| Name    | Type      | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| `token` | `address` | The address of the token that has been removed. |

### MaxIncentiveTokensCountUpdated

Emitted when maxIncentiveTokensCount is updated.

```solidity
event MaxIncentiveTokensCountUpdated(uint8 maxIncentiveTokensCount);
```

**Parameters**

| Name                      | Type    | Description                        |
| ------------------------- | ------- | ---------------------------------- |
| `maxIncentiveTokensCount` | `uint8` | The max count of incentive tokens. |

### IncentivesProcessed

Emitted when incentives are processed for the operator of a validator.

```solidity
event IncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### IncentivesProcessFailed

Emitted when incentives fail to be processed for the operator of a validator.

```solidity
event IncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### IncentiveAdded

Emitted when incentives are added to the vault.

```solidity
event IncentiveAdded(address indexed token, address sender, uint256 amount, uint256 incentiveRate);
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The incentive token.                                     |
| `sender`        | `address` | The address that added the incentive.                    |
| `amount`        | `uint256` | The amount of the incentive.                             |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

### RewardAdded

Emitted when a reward has been added to the vault.

```solidity
event RewardAdded(uint256 reward);
```

**Parameters**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `reward` | `uint256` | The amount of reward added, scaled by PRECISION. |

### Staked

Emitted when the staking balance of an account has increased.

```solidity
event Staked(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `account` | `address` | The account that has staked. |
| `amount`  | `uint256` | The amount of staked tokens. |

### Withdrawn

Emitted when the staking balance of an account has decreased.

```solidity
event Withdrawn(address indexed account, uint256 amount);
```

**Parameters**

| Name      | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `account` | `address` | The account that has withdrawn. |
| `amount`  | `uint256` | The amount of withdrawn tokens. |

### RewardPaid

Emitted when a reward has been claimed.

```solidity
event RewardPaid(address indexed account, address to, uint256 reward);
```

**Parameters**

| Name      | Type      | Description                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `account` | `address` | The account whose reward has been claimed.                   |
| `to`      | `address` | The address that the reward was sent to. (user or operator). |
| `reward`  | `uint256` | The amount of reward claimed.                                |

### RewardsDurationUpdated

Emitted when the reward duration has been updated.

```solidity
event RewardsDurationUpdated(uint256 newDuration);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `newDuration` | `uint256` | The new duration of the reward. |
