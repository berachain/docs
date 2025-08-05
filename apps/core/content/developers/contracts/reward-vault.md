---
head:
  - - meta
    - property: og:title
      content: RewardVault Contract Reference
  - - meta
    - name: description
      content: Developer reference for the RewardVault contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the RewardVault contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVault

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.rewardVault['mainnet-address']">{{config.contracts.pol.rewardVault['mainnet-address']}}</a><span v-if="config.contracts.pol.rewardVault.abi && config.contracts.pol.rewardVault.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.rewardVault.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/rewards/RewardVault.sol)

This contract is the vault for the Berachain rewards, it handles the staking and rewards accounting of BGT.

**Inherits:** PausableUpgradeable, ReentrancyGuardUpgradeable, FactoryOwnable, StakingRewards, IRewardVault

## Constants

### MAX_REWARD_DURATION

The maximum reward duration.

```solidity
uint256 public constant MAX_REWARD_DURATION = 7 days;
```

### MIN_REWARD_DURATION

The minimum reward duration.

```solidity
uint256 public constant MIN_REWARD_DURATION = 3 days;
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

| Name                  | Type                                          | Description                                       |
| --------------------- | --------------------------------------------- | ------------------------------------------------- |
| `delegateTotalStaked` | `uint256`                                     | The total amount staked by delegates              |
| `stakedByDelegate`    | `mapping(address delegate => uint256 amount)` | The mapping of the amount staked by each delegate |

### Incentive

Struct to hold an incentive data.

```solidity
struct Incentive {
    uint256 minIncentiveRate;
    uint256 incentiveRate;
    uint256 amountRemaining;
    address manager;
}
```

**Properties**

| Name               | Type      | Description                                                               |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission           |
| `incentiveRate`    | `uint256` | The amount of the token to incentivize per BGT emission                   |
| `amountRemaining`  | `uint256` | The amount of the token remaining to incentivize                          |
| `manager`          | `address` | The address of the manager that can addIncentive for this incentive token |

## State Variables

### beaconDepositContract

The BeaconDeposit contract.

```solidity
IBeaconDeposit public beaconDepositContract;
```

### distributor

The address of the distributor contract.

```solidity
address public distributor;
```

### incentives

The mapping of incentive token to its incentive data.

```solidity
mapping(address token => Incentive) public incentives;
```

### maxIncentiveTokensCount

The maximum count of incentive tokens that can be stored.

```solidity
uint8 public maxIncentiveTokensCount;
```

### minRewardDurationForTargetRate

The reward duration in case targetRewardsPerSecond is not met.

_Must be between MIN_REWARD_DURATION and MAX_REWARD_DURATION and can be set only by reward vault manager._

```solidity
uint256 public minRewardDurationForTargetRate;
```

### pendingRewardsDuration

The pending rewards duration.

_Comes into effect during the next `notifyRewardAmount` call._

```solidity
uint256 public pendingRewardsDuration;
```

### rewardVaultManager

The address authorized to manage reward vault operations and configurations.

_This role is typically assigned to dApp teams to enable them to configure reward distribution parameters._

```solidity
address public rewardVaultManager;
```

### targetRewardsPerSecond

The target rewards per second, scaled by PRECISION.

_This acts as both a maximum and a target rate. When the calculated reward rate exceeds this value, the duration is dynamically adjusted to achieve this target rate, but never goes below MIN_REWARD_DURATION. This prevents the issue where a spike in rewards would permanently expand the duration, causing subsequent smaller rewards to be spread over longer periods with very low rates._

```solidity
uint256 public targetRewardsPerSecond;
```

### whitelistedTokens

The list of whitelisted tokens.

```solidity
address[] public whitelistedTokens;
```

## View Functions

### getDelegateStake

Get the amount staked by a delegate on behalf of an account.

```solidity
function getDelegateStake(address account, address delegate) external view returns (uint256);
```

**Parameters**

| Name       | Type      | Description           |
| ---------- | --------- | --------------------- |
| `account`  | `address` | The account to check  |
| `delegate` | `address` | The delegate to check |

**Returns**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `<none>` | `uint256` | The amount staked by a delegate |

### getTotalDelegateStaked

Get the total amount staked by delegates.

```solidity
function getTotalDelegateStaked(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description          |
| --------- | --------- | -------------------- |
| `account` | `address` | The account to check |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The total amount staked by delegates |

### getWhitelistedTokens

Get the list of whitelisted tokens.

```solidity
function getWhitelistedTokens() public view returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                    |
| -------- | ----------- | ------------------------------ |
| `<none>` | `address[]` | The list of whitelisted tokens |

### getWhitelistedTokensCount

Get the count of active incentive tokens.

```solidity
function getWhitelistedTokensCount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The count of active incentive tokens |

### operator

Get the operator for an account.

```solidity
function operator(address account) external view returns (address);
```

**Parameters**

| Name      | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `account` | `address` | The account to get the operator for |

**Returns**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `<none>` | `address` | The operator for the account |

## Functions

### accountIncentives

Process incentives added via IERC20.transfer, adding them to the incentive accounting.

_Allows permissionless incentive addition, without dossing the manager possibility to let the incentive accounting go to 0 in order to be able to decrease the incentive rate._

**Emits:**

- [IncentiveAdded](#event-incentiveadded)

```solidity
function accountIncentives(address token, uint256 amount) external nonReentrant onlyWhitelistedToken(token);
```

**Parameters**

| Name     | Type      | Description                                 |
| -------- | --------- | ------------------------------------------- |
| `token`  | `address` | The address of the token to process         |
| `amount` | `uint256` | The amount of token to account as incentive |

### addIncentive

Add an incentive token to the vault.

_The incentive token's transfer should not exceed a gas usage of 500k units. In case the transfer exceeds 500k gas units, your incentive will fail to be transferred to the validator and its delegates._

**Emits:**

- [IncentiveAdded](#event-incentiveadded)

```solidity
function addIncentive(
    address token,
    uint256 amount,
    uint256 incentiveRate
) external nonReentrant onlyWhitelistedToken(token);
```

**Parameters**

| Name            | Type      | Description                                             |
| --------------- | --------- | ------------------------------------------------------- |
| `token`         | `address` | The address of the token to add as an incentive         |
| `amount`        | `uint256` | The amount of the token to add as an incentive          |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission |

### delegateStake

Stake tokens on behalf of another account.

**Emits:**

- [DelegateStaked](#event-delegatestaked)

```solidity
function delegateStake(address account, uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | The account to stake for      |
| `amount`  | `uint256` | The amount of tokens to stake |

### delegateWithdraw

Withdraw tokens staked on behalf of another account by the delegate (msg.sender).

**Emits:**

- [DelegateWithdrawn](#event-delegatewithdrawn)

```solidity
function delegateWithdraw(address account, uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| `account` | `address` | The account to withdraw for      |
| `amount`  | `uint256` | The amount of tokens to withdraw |

### exit

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

**Emits:**

- [RewardPaid](#event-rewardpaid)

```solidity
function exit(address recipient) external nonReentrant whenNotPaused;
```

**Parameters**

| Name        | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| `recipient` | `address` | The address to send the 'BGT' reward to |

### getPartialReward

Claim a partial reward.

_Use `getReward` if you want to claim the full reward._

**Emits:**

- [RewardPaid](#event-rewardpaid)

```solidity
function getPartialReward(
    address account,
    address recipient,
    uint256 amount
) external nonReentrant whenNotPaused onlyOperatorOrUser(account);
```

**Parameters**

| Name        | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `account`   | `address` | The account to get the reward for |
| `recipient` | `address` | The address to send the reward to |
| `amount`    | `uint256` | The amount of the reward to claim |

### getReward

Claim the reward.

_The operator only handles BGT, not STAKING_TOKEN._

**Emits:**

- [RewardPaid](#event-rewardpaid)

```solidity
function getReward(
    address account,
    address recipient
) external nonReentrant whenNotPaused onlyOperatorOrUser(account) returns (uint256);
```

**Parameters**

| Name        | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `account`   | `address` | The account to get the reward for |
| `recipient` | `address` | The address to send the reward to |

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `uint256` | The amount of the reward claimed |

### initialize

Initialize the vault, this is only callable once and by the factory since its the deployer.

**Emits:**

- [DistributorSet](#event-distributorset)
- [MaxIncentiveTokensCountUpdated](#event-maxincentivetokenscountupdated)

```solidity
function initialize(
    address _beaconDepositContract,
    address _bgt,
    address _distributor,
    address _stakingToken
) external initializer;
```

**Parameters**

| Name                     | Type      | Description                        |
| ------------------------ | --------- | ---------------------------------- |
| `_beaconDepositContract` | `address` | The BeaconDeposit contract address |
| `_bgt`                   | `address` | The address of the BGT token       |
| `_distributor`           | `address` | The address of the distributor     |
| `_stakingToken`          | `address` | The address of the staking token   |

### notifyRewardAmount

Allows the distributor to notify the reward amount.

**Emits:**

- [IncentivesProcessed](#event-incentivesprocessed)
- [IncentivesProcessFailed](#event-incentivesprocessfailed)
- [BGTBoosterIncentivesProcessed](#event-bgtboosterincentivesprocessed)
- [BGTBoosterIncentivesProcessFailed](#event-bgtboosterincentivesprocessfailed)
- [IncentiveFeeCollected](#event-incentivefeecollected)
- [IncentiveFeeCollectionFailed](#event-incentivefeecollectionfailed)

```solidity
function notifyRewardAmount(bytes calldata pubkey, uint256 reward) external onlyDistributor;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `pubkey` | `bytes`   | The pubkey of the validator    |
| `reward` | `uint256` | The amount of reward to notify |

### pause

Allows the factory vault pauser to pause the vault.

```solidity
function pause() external onlyFactoryVaultPauser;
```

### recoverERC20

Allows the factory owner to recover any ERC20 token from the vault.

**Emits:**

- [Recovered](#event-recovered)

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyFactoryOwner;
```

**Parameters**

| Name           | Type      | Description                         |
| -------------- | --------- | ----------------------------------- |
| `tokenAddress` | `address` | The address of the token to recover |
| `tokenAmount`  | `uint256` | The amount of token to recover      |

### removeIncentiveToken

Allows the factory vault manager to remove a whitelisted incentive token.

**Emits:**

- [IncentiveTokenRemoved](#event-incentivetokenremoved)

```solidity
function removeIncentiveToken(address token) external onlyFactoryVaultManager onlyWhitelistedToken(token);
```

**Parameters**

| Name    | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `token` | `address` | The address of the token to remove |

### setDistributor

Allows the factory owner to set the contract that is allowed to distribute rewards.

**Emits:**

- [DistributorSet](#event-distributorset)

```solidity
function setDistributor(address _rewardDistribution) external onlyFactoryOwner;
```

**Parameters**

| Name                  | Type      | Description                                       |
| --------------------- | --------- | ------------------------------------------------- |
| `_rewardDistribution` | `address` | The address that is allowed to distribute rewards |

### setMaxIncentiveTokensCount

Allows the factory owner to update the maxIncentiveTokensCount.

**Emits:**

- [MaxIncentiveTokensCountUpdated](#event-maxincentivetokenscountupdated)

```solidity
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external onlyFactoryOwner;
```

**Parameters**

| Name                       | Type    | Description                      |
| -------------------------- | ------- | -------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count |

### setMinRewardDurationForTargetRate

Allows the reward vault manager to set the min reward duration for target rate.

_This duration is used in case target rewards per second is not met._

**Emits:**

- [MinRewardDurationForTargetRateUpdated](#event-minrewarddurationfortargetrateupdated)

```solidity
function setMinRewardDurationForTargetRate(uint256 _minRewardDurationForTargetRate) external onlyRewardVaultManager;
```

**Parameters**

| Name                              | Type      | Description                                 |
| --------------------------------- | --------- | ------------------------------------------- |
| `_minRewardDurationForTargetRate` | `uint256` | The new min reward duration for target rate |

### setOperator

Allows msg.sender to set another address to claim and manage their rewards.

**Emits:**

- [OperatorSet](#event-operatorset)

```solidity
function setOperator(address _operator) external;
```

**Parameters**

| Name        | Type      | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| `_operator` | `address` | The address that will be allowed to claim and manage rewards |

### setRewardVaultManager

Allows the factory vault manager to set the address responsible for managing the reward vault.

**Emits:**

- [RewardVaultManagerSet](#event-rewardvaultmanagerset)

```solidity
function setRewardVaultManager(address _rewardVaultManager) external onlyFactoryVaultManager;
```

**Parameters**

| Name                  | Type      | Description                             |
| --------------------- | --------- | --------------------------------------- |
| `_rewardVaultManager` | `address` | The address of the reward vault manager |

### setRewardsDuration

Allows the reward vault manager to update the duration of the rewards.

_Only allowed if targetRewardsPerSecond is not set._

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyRewardVaultManager;
```

**Parameters**

| Name               | Type      | Description                     |
| ------------------ | --------- | ------------------------------- |
| `_rewardsDuration` | `uint256` | The new duration of the rewards |

### setTargetRewardsPerSecond

Sets the target rewards per second rate.

_This rate acts as both a maximum and a target. When rewards exceed this rate, the duration is dynamically adjusted to achieve this target rate while respecting MIN_REWARD_DURATION constraints. This prevents permanent duration expansion from reward spikes that would cause subsequent smaller rewards to be distributed at very low rates._

**Emits:**

- [TargetRewardsPerSecondUpdated](#event-targetrewardsperwordupdated)

```solidity
function setTargetRewardsPerSecond(uint256 _targetRewardsPerSecond) external onlyRewardVaultManager;
```

**Parameters**

| Name                      | Type      | Description                                            |
| ------------------------- | --------- | ------------------------------------------------------ |
| `_targetRewardsPerSecond` | `uint256` | The new target rewards per second, scaled by PRECISION |

### stake

Stake tokens in the vault.

```solidity
function stake(uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint256` | The amount of tokens to stake |

### stakeOnBehalf

Stake tokens on behalf of another account.

```solidity
function stakeOnBehalf(address account, uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | The account to stake for      |
| `amount`  | `uint256` | The amount of tokens to stake |

### unpause

Allows the factory vault manager to unpause the vault.

```solidity
function unpause() external onlyFactoryVaultManager;
```

### updateIncentiveManager

Update the manager of an incentive token.

_Permissioned function, only allow factory owner to update the manager._

**Emits:**

- [IncentiveManagerChanged](#event-incentivemanagerchanged)

```solidity
function updateIncentiveManager(
    address token,
    address newManager
) external onlyFactoryOwner onlyWhitelistedToken(token);
```

**Parameters**

| Name         | Type      | Description                            |
| ------------ | --------- | -------------------------------------- |
| `token`      | `address` | The address of the incentive token     |
| `newManager` | `address` | The new manager of the incentive token |

### whitelistIncentiveToken

Allows the factory owner to whitelist a token to incentivize with.

**Emits:**

- [IncentiveTokenWhitelisted](#event-incentivetokenwhitelisted)

```solidity
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external onlyFactoryOwner;
```

**Parameters**

| Name               | Type      | Description                                                     |
| ------------------ | --------- | --------------------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist                           |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission |
| `manager`          | `address` | The address of the manager that can addIncentive for this token |

### withdraw

Withdraw the staked tokens from the vault.

```solidity
function withdraw(uint256 amount) external nonReentrant checkSelfStakedBalance(msg.sender, amount) whenNotPaused;
```

**Parameters**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `amount` | `uint256` | The amount of tokens to withdraw |

## Events

### BGTBoosterIncentivesProcessed {#event-bgtboosterincentivesprocessed}

Emitted when the BGT booster share of the incentive is processed.

```solidity
event BGTBoosterIncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `pubkey`     | `bytes`   | The pubkey of the validator                |
| `token`      | `address` | The address of the incentive token         |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator |
| `amount`     | `uint256` | The amount of the incentive                |

### BGTBoosterIncentivesProcessFailed {#event-bgtboosterincentivesprocessfailed}

Emitted when the BGT booster share of the incentive fails to be processed.

```solidity
event BGTBoosterIncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `pubkey`     | `bytes`   | The pubkey of the validator                |
| `token`      | `address` | The address of the incentive token         |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator |
| `amount`     | `uint256` | The amount of the incentive                |

### DelegateStaked {#event-delegatestaked}

Emitted when a delegate has staked on behalf of an account.

```solidity
event DelegateStaked(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `account`  | `address` | The account whose delegate has staked |
| `delegate` | `address` | The delegate that has staked          |
| `amount`   | `uint256` | The amount of staked tokens           |

### DelegateWithdrawn {#event-delegatewithdrawn}

Emitted when a delegate has withdrawn on behalf of an account.

```solidity
event DelegateWithdrawn(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `account`  | `address` | The account whose delegate has withdrawn |
| `delegate` | `address` | The delegate that has withdrawn          |
| `amount`   | `uint256` | The amount of withdrawn tokens           |

### DistributorSet {#event-distributorset}

Emitted when the distributor is set.

```solidity
event DistributorSet(address indexed distributor);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `distributor` | `address` | The address of the distributor |

### IncentiveAdded {#event-incentiveadded}

Emitted when incentives are added to the vault.

```solidity
event IncentiveAdded(address indexed token, address sender, uint256 amount, uint256 incentiveRate);
```

**Parameters**

| Name            | Type      | Description                                             |
| --------------- | --------- | ------------------------------------------------------- |
| `token`         | `address` | The incentive token                                     |
| `sender`        | `address` | The address that added the incentive                    |
| `amount`        | `uint256` | The amount of the incentive                             |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission |

### IncentiveFeeCollected {#event-incentivefeecollected}

Emitted when the incentive fee is sent to the collector.

```solidity
event IncentiveFeeCollected(address indexed token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The address of the incentive token |
| `amount` | `uint256` | The amount of the incentive fee    |

### IncentiveFeeCollectionFailed {#event-incentivefeecollectionfailed}

Emitted when the incentive fee is failed to be sent to the collector.

```solidity
event IncentiveFeeCollectionFailed(address indexed token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The address of the incentive token |
| `amount` | `uint256` | The amount of the incentive fee    |

### IncentiveManagerChanged {#event-incentivemanagerchanged}

Emitted when the manager of an incentive token is changed.

```solidity
event IncentiveManagerChanged(address indexed token, address newManager, address oldManager);
```

**Parameters**

| Name         | Type      | Description                            |
| ------------ | --------- | -------------------------------------- |
| `token`      | `address` | The address of the incentive token     |
| `newManager` | `address` | The new manager of the incentive token |
| `oldManager` | `address` | The old manager of the incentive token |

### IncentiveTokenRemoved {#event-incentivetokenremoved}

Emitted when an incentive token is removed.

```solidity
event IncentiveTokenRemoved(address indexed token);
```

**Parameters**

| Name    | Type      | Description                                    |
| ------- | --------- | ---------------------------------------------- |
| `token` | `address` | The address of the token that has been removed |

### IncentiveTokenWhitelisted {#event-incentivetokenwhitelisted}

Emitted when an incentive token is whitelisted.

```solidity
event IncentiveTokenWhitelisted(address indexed token, uint256 minIncentiveRate, address manager);
```

**Parameters**

| Name               | Type      | Description                                                     |
| ------------------ | --------- | --------------------------------------------------------------- |
| `token`            | `address` | The address of the token that has been whitelisted              |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission |
| `manager`          | `address` | The address of the manager that can addIncentive for this token |

### IncentivesProcessed {#event-incentivesprocessed}

Emitted when validator share of incentives are processed to the operator address of a validator.

```solidity
event IncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `pubkey`     | `bytes`   | The pubkey of the validator                |
| `token`      | `address` | The address of the incentive token         |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator |
| `amount`     | `uint256` | The amount of the incentive                |

### IncentivesProcessFailed {#event-incentivesprocessfailed}

Emitted when validator share of incentives fail to be processed to the operator address of a validator.

```solidity
event IncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `pubkey`     | `bytes`   | The pubkey of the validator                |
| `token`      | `address` | The address of the incentive token         |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator |
| `amount`     | `uint256` | The amount of the incentive                |

### MaxIncentiveTokensCountUpdated {#event-maxincentivetokenscountupdated}

Emitted when maxIncentiveTokensCount is updated.

```solidity
event MaxIncentiveTokensCountUpdated(uint8 maxIncentiveTokensCount);
```

**Parameters**

| Name                      | Type    | Description                       |
| ------------------------- | ------- | --------------------------------- |
| `maxIncentiveTokensCount` | `uint8` | The max count of incentive tokens |

### MinRewardDurationForTargetRateUpdated {#event-minrewarddurationfortargetrateupdated}

Emitted when the min reward duration for target rate is updated.

```solidity
event MinRewardDurationForTargetRateUpdated(uint256 newMinRewardDurationForTargetRate, uint256 oldMinRewardDurationForTargetRate);
```

**Parameters**

| Name                                | Type      | Description                                 |
| ----------------------------------- | --------- | ------------------------------------------- |
| `newMinRewardDurationForTargetRate` | `uint256` | The new min reward duration for target rate |
| `oldMinRewardDurationForTargetRate` | `uint256` | The old min reward duration for target rate |

### OperatorSet {#event-operatorset}

Emitted when the msg.sender has set an operator to handle its rewards.

```solidity
event OperatorSet(address account, address operator);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `account`  | `address` | The account that has set the operator |
| `operator` | `address` | The operator that has been set        |

### Recovered {#event-recovered}

Emitted when a token has been recovered.

```solidity
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `token`  | `address` | The token that has been recovered |
| `amount` | `uint256` | The amount of token recovered     |

### RewardPaid {#event-rewardpaid}

Emitted when a reward is paid to an account.

```solidity
event RewardPaid(address indexed account, address indexed recipient, uint256 amount);
```

**Parameters**

| Name        | Type      | Description                          |
| ----------- | --------- | ------------------------------------ |
| `account`   | `address` | The account that earned the reward   |
| `recipient` | `address` | The address that received the reward |
| `amount`    | `uint256` | The amount of reward paid            |

### RewardVaultManagerSet {#event-rewardvaultmanagerset}

Emitted when the reward vault manager is set.

```solidity
event RewardVaultManagerSet(address indexed newRewardVaultManager, address indexed oldRewardVaultManager);
```

**Parameters**

| Name                    | Type      | Description                                 |
| ----------------------- | --------- | ------------------------------------------- |
| `newRewardVaultManager` | `address` | The address of the new reward vault manager |
| `oldRewardVaultManager` | `address` | The address of the old reward vault manager |

### TargetRewardsPerSecondUpdated {#event-targetrewardsperwordupdated}

Emitted when the target rewards per second is updated.

```solidity
event TargetRewardsPerSecondUpdated(uint256 newTargetRewardsPerSecond, uint256 oldTargetRewardsPerSecond);
```

**Parameters**

| Name                        | Type      | Description                       |
| --------------------------- | --------- | --------------------------------- |
| `newTargetRewardsPerSecond` | `uint256` | The new target rewards per second |
| `oldTargetRewardsPerSecond` | `uint256` | The old target rewards per second |

## Errors

### AmountGreaterThanReward

Thrown when the amount to claim is greater than the available reward.

```solidity
error AmountGreaterThanReward();
```

### AmountLessThanMinIncentiveRate

Thrown when the incentive amount is less than the minimum incentive rate.

```solidity
error AmountLessThanMinIncentiveRate();
```

### CannotRecoverIncentiveToken

Thrown when attempting to recover an incentive token.

```solidity
error CannotRecoverIncentiveToken();
```

### DurationChangeNotAllowed

Thrown when duration change is not allowed.

```solidity
error DurationChangeNotAllowed();
```

### IncentiveRateTooHigh

Thrown when the incentive rate is too high.

```solidity
error IncentiveRateTooHigh();
```

### InsolventReward

Thrown when the reward is insolvent.

```solidity
error InsolventReward();
```

### InsufficientDelegateStake

Thrown when there is insufficient delegate stake.

```solidity
error InsufficientDelegateStake();
```

### InsufficientSelfStake

Thrown when there is insufficient self stake.

```solidity
error InsufficientSelfStake();
```

### InvalidIncentiveRate

Thrown when the incentive rate is invalid.

```solidity
error InvalidIncentiveRate();
```

### InvalidMaxIncentiveTokensCount

Thrown when the max incentive tokens count is invalid.

```solidity
error InvalidMaxIncentiveTokensCount();
```

### InvalidRewardDuration

Thrown when the reward duration is invalid.

```solidity
error InvalidRewardDuration();
```

### MinIncentiveRateIsZero

Thrown when the minimum incentive rate is zero.

```solidity
error MinIncentiveRateIsZero();
```

### NotDelegate

Thrown when the caller is not a delegate.

```solidity
error NotDelegate();
```

### NotDistributor

Thrown when the caller is not the distributor.

```solidity
error NotDistributor();
```

### NotEnoughBalance

Thrown when there is not enough balance.

```solidity
error NotEnoughBalance();
```

### NotIncentiveManager

Thrown when the caller is not the incentive manager.

```solidity
error NotIncentiveManager();
```

### NotOperator

Thrown when the caller is not the operator.

```solidity
error NotOperator();
```

### NotRewardVaultManager

Thrown when the caller is not the reward vault manager.

```solidity
error NotRewardVaultManager();
```

### TokenAlreadyWhitelistedOrLimitReached

Thrown when the token is already whitelisted or the limit is reached.

```solidity
error TokenAlreadyWhitelistedOrLimitReached();
```

### TokenNotWhitelisted

Thrown when the token is not whitelisted.

```solidity
error TokenNotWhitelisted();
```

### ZeroAddress

Thrown when a zero address is provided where a valid address is required.

```solidity
error ZeroAddress();
```
