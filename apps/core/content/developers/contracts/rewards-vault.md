<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainRewardsVault

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.rewardsVault.address">{{config.contracts.rewardsVault.address}}</a><span v-if="config.contracts.rewardsVault.abi"><a target="_blank" :href="config.contracts.rewardsVault.abi">ABI JSON</a></span></small>

This contract is the vault for the Berachain rewards, it handles the staking and rewards accounting of BGT.

This contract is taken from the stable and tested [Synthetix StakingRewards Contract](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).
We are using this model instead of 4626 because we want to incentivize staying in the vault for x period of time to be considered a `miner` and not a `trader`.

## State Variables

### maxIncentiveTokensCount

The maximum count of incentive tokens that can be stored.

```solidity
uint8 public maxIncentiveTokensCount;
```

### distributor

The address of the distributor contract.

```solidity
address public distributor;
```

### beraChef

The Berachef contract.

```solidity
IBeraChef public beraChef;
```

### \_delegateStake

```solidity
mapping(address account => DelegateStake) internal _delegateStake;
```

### \_operators

The mapping of accounts to their operators.

```solidity
mapping(address account => address operator) internal _operators;
```

### incentives

the mapping of incentive token to its incentive data.

```solidity
mapping(address token => Incentive incentives) public incentives;
```

### whitelistedTokens

The list of whitelisted tokens.

```solidity
address[] public whitelistedTokens;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

Initialize the vault, this is only callable once and by the factory since its the deployer.

```solidity
function initialize(
    address _bgt,
    address _distributor,
    address _berachef,
    address _governance,
    address _stakingToken
)
    external
    initializer;
```

**Parameters**

| Name            | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `_bgt`          | `address` | The address of the BGT token.     |
| `_distributor`  | `address` | The address of the distributor.   |
| `_berachef`     | `address` | The address of the berachef.      |
| `_governance`   | `address` | The address of the governance.    |
| `_stakingToken` | `address` | The address of the staking token. |

### onlyDistributor

```solidity
modifier onlyDistributor();
```

### onlyOperatorOrUser

```solidity
modifier onlyOperatorOrUser(address account);
```

### checkSelfStakedBalance

```solidity
modifier checkSelfStakedBalance(address account, uint256 amount);
```

### onlyWhitelistedToken

```solidity
modifier onlyWhitelistedToken(address token);
```

### setDistributor

Allows the owner to set the contract that is allowed to distribute rewards.

```solidity
function setDistributor(address _rewardDistribution) external onlyOwner;
```

**Parameters**

| Name                  | Type      | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `_rewardDistribution` | `address` | The address that is allowed to distribute rewards. |

### notifyRewardAmount

Allows the distributor to notify the reward amount.

```solidity
function notifyRewardAmount(address coinbase, uint256 reward) external onlyDistributor;
```

**Parameters**

| Name       | Type      | Description                     |
| ---------- | --------- | ------------------------------- |
| `coinbase` | `address` | The address of the coinbase.    |
| `reward`   | `uint256` | The amount of reward to notify. |

### recoverERC20

Allows the owner to recover any ERC20 token from the vault.

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration

Allows the owner to update the duration of the rewards.

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description                      |
| ------------------ | --------- | -------------------------------- |
| `_rewardsDuration` | `uint256` | The new duration of the rewards. |

### whitelistIncentiveToken

Allows the owner to whitelist a token to incentivize with.

```solidity
function whitelistIncentiveToken(address token, uint256 minIncentiveRate) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist.                           |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission. |

### removeIncentiveToken

Allows the owner to remove a whitelisted incentive token.

```solidity
function removeIncentiveToken(address token) external onlyOwner onlyWhitelistedToken(token);
```

**Parameters**

| Name    | Type      | Description                         |
| ------- | --------- | ----------------------------------- |
| `token` | `address` | The address of the token to remove. |

### setMaxIncentiveTokensCount

Allows the owner to update the maxIncentiveTokensCount.

```solidity
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external onlyOwner;
```

**Parameters**

| Name                       | Type    | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count. |

### pause

Allows the owner to update the pause state of the vault.

```solidity
function pause(bool _paused) external onlyOwner;
```

**Parameters**

| Name      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `_paused` | `bool` | The new pause state of the vault. |

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
function getWhitelistedTokens() public view returns (address[] memory);
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

### stake

Stake tokens in the vault.

```solidity
function stake(uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `amount` | `uint256` | The amount of tokens to stake. |

### delegateStake

Stake tokens on behalf of another account.

```solidity
function delegateStake(address account, uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to stake for.      |
| `amount`  | `uint256` | The amount of tokens to stake. |

### withdraw

Withdraw the staked tokens from the vault.

```solidity
function withdraw(uint256 amount) external nonReentrant checkSelfStakedBalance(msg.sender, amount);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `amount` | `uint256` | The amount of tokens to withdraw. |

### delegateWithdraw

Withdraw tokens staked on behalf of another account by the delegate (msg.sender).

```solidity
function delegateWithdraw(address account, uint256 amount) external nonReentrant;
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to withdraw for.      |
| `amount`  | `uint256` | The amount of tokens to withdraw. |

### getReward

Claim the reward.

_The operator only handles BGT, not STAKING_TOKEN._

_If the operator is the one calling this method, the reward will be credited to their address._

```solidity
function getReward(address account) external nonReentrant onlyOperatorOrUser(account) returns (uint256);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account to claim the reward for. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The amount of the reward claimed. |

### exit

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

```solidity
function exit() external nonReentrant;
```

### setOperator

Allows msg.sender to set another address to claim and manage their rewards.

```solidity
function setOperator(address _operator) external;
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `_operator` | `address` | The address that will be allowed to claim and manage rewards. |

### addIncentive

Add an incentive to the vault.

```solidity
function addIncentive(address token, uint256 amount, uint256 incentiveRate) external onlyWhitelistedToken(token);
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The address of the token to add as an incentive.         |
| `amount`        | `uint256` | The amount of the token to add as an incentive.          |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

### \_checkSelfStakedBalance

_Check if the account has enough self-staked balance._

```solidity
function _checkSelfStakedBalance(address account, uint256 amount) internal view;
```

**Parameters**

| Name      | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| `account` | `address` | The account to check the self-staked balance for. |
| `amount`  | `uint256` | The amount being withdrawn.                       |

### \_safeTransferRewardToken

_The Distributor grants this contract the allowance to transfer the BGT in its balance._

```solidity
function _safeTransferRewardToken(address to, uint256 amount) internal override;
```

### \_checkRewardSolvency

```solidity
function _checkRewardSolvency() internal view override;
```

### \_processIncentives

process the incentives for a coinbase.

```solidity
function _processIncentives(address coinbase, uint256 bgtEmitted) internal;
```

**Parameters**

| Name         | Type      | Description                                 |
| ------------ | --------- | ------------------------------------------- |
| `coinbase`   | `address` | The coinbase to process the incentives for. |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator. |

### \_deleteWhitelistedTokenFromList

```solidity
function _deleteWhitelistedTokenFromList(address token) internal;
```

## Structs

### DelegateStake

Struct to hold delegate stake data.

```solidity
struct DelegateStake {
    uint256 delegateTotalStaked;
    mapping(address delegate => uint256 amount) stakedByDelegate;
}
```

**Properties**

| Name                  | Type                                          | Description                                        |
| --------------------- | --------------------------------------------- | -------------------------------------------------- |
| `delegateTotalStaked` | `uint256`                                     | The total amount staked by delegates.              |
| `stakedByDelegate`    | `mapping(address delegate => uint256 amount)` | The mapping of the amount staked by each delegate. |

### Incentive

Struct to hold an incentive data.

```solidity
struct Incentive {
    uint256 minIncentiveRate;
    uint256 incentiveRate;
    uint256 amountRemaining;
}
```

**Properties**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission. |
| `incentiveRate`    | `uint256` | The amount of the token to incentivize per BGT emission.         |
| `amountRemaining`  | `uint256` | The amount of the token remaining to incentivize.                |
