<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVault

This contract is the vault for the Berachain rewards, it handles the staking and rewards accounting of BGT.

_This contract is taken from the stable and tested:
https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol
We are using this model instead of 4626 because we want to incentivize staying in the vault for x period of time to
to be considered a 'miner' and not a 'trader'._

## Incentive Emission Mechanics: Duration vs Target Rate

RewardVaults support **two mutually-exclusive modes** for **BGT reward distribution timing**:

1. **Duration-based (legacy)** – the `rewardDurationManager` picks a fixed `rewardsDuration`. Each `notifyRewardAmount` call distributes the supplied **BGT reward** amount evenly over that period.
2. **Target rate** – enabled when `targetRewardsPerSecond` is set to a non-zero value. For every `notifyRewardAmount` call the vault computes a period so that the realised BGT emission rate does not exceed the target while still respecting the hard limits:

   ```text
   period = max(MIN_REWARD_DURATION,
                min(totalReward / targetRate, MAX_REWARD_DURATION))
   ```

   This guarantees the duration is never shorter than 3 days and never longer than 7 days.

**Important Distinction**: These modes control **BGT emission timing only**. They do not affect incentive token exchange rates, which are controlled separately by protocol token managers through `addIncentive()` calls. For details on how incentive tokens work, see the [Incentive Marketplace documentation](/learn/pol/incentives).

Switching back to duration mode is done by setting `targetRewardsPerSecond` to 0 and (optionally) queuing a new duration with `setRewardsDuration`.

---

## State Variables

### \_delegateStake

```solidity
mapping(address account => DelegateStake) internal _delegateStake;
```

### \_operators

The mapping of accounts to their operators.

```solidity
mapping(address account => address operator) internal _operators;
```

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

the mapping of incentive token to its incentive data.

```solidity
mapping(address token => Incentive) public incentives;
```

### MAX_INCENTIVE_RATE

```solidity
uint256 private constant MAX_INCENTIVE_RATE = 1e36;
```

### MAX_REWARD_DURATION

The maximum incentive distribution period when using duration-based rewards.

```solidity
uint256 public constant MAX_REWARD_DURATION = 7 days;
```

### maxIncentiveTokensCount

The maximum count of incentive tokens that can be stored.

```solidity
uint8 public maxIncentiveTokensCount;
```

### MIN_REWARD_DURATION

The minimum incentive distribution period when using duration-based rewards.

```solidity
uint256 public constant MIN_REWARD_DURATION = 3 days;
```

### minRewardDurationForTargetRate

Minimum duration applied by the target-rate algorithm if the computed period would otherwise fall below this value.

```solidity
uint256 public minRewardDurationForTargetRate;
```

### pendingRewardsDuration

Duration that will take effect at the next `notifyRewardAmount` call when operating in duration-based mode.

```solidity
uint256 public pendingRewardsDuration;
```

### rewardVaultManager

Address authorized to configure incentive parameters (duration or target rate).

```solidity
address public rewardVaultManager;
```

### SAFE_GAS_LIMIT

```solidity
uint256 private constant SAFE_GAS_LIMIT = 500_000;
```

### targetRewardsPerSecond

Target (and maximum) reward-emission rate, scaled by `PRECISION`. When non-zero, the vault automatically adjusts `rewardsDuration` so the realised rate never exceeds this value (but never drops below `MIN_REWARD_DURATION`).

```solidity
uint256 public targetRewardsPerSecond;
```

### whitelistedTokens

The list of whitelisted tokens.

```solidity
address[] public whitelistedTokens;
```

## Functions

### Function Groups

| Group | Description |
|-------|-------------|
| [Initialization](#initialization) | Contract setup and initialization |
| [Governance Functions](#governance-functions) | Functions controlled by Berachain governance |
| [Administrative Functions](#administrative-functions) | Management and configuration functions |
| [Incentive Management](#incentive-management) | Token incentive operations |
| [Staking & Delegation](#staking--delegation) | Core staking functionality |
| [View Functions](#view-functions) | Read-only state queries |
| [Internal Functions](#internal-functions) | Internal helper functions |
| [Modifiers](#modifiers) | Function modifiers |

---

## Initialization

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor();
```

### initialize

Initialize the vault, this is only callable once and by the factory since its the deployer.

```solidity
function initialize(
    address _beaconDepositContract,
    address _bgt,
    address _distributor,
    address _stakingToken
)
    external
    initializer;
```

**Parameters**

| Name                     | Type      | Description                       |
| ------------------------ | --------- | --------------------------------- |
| `_beaconDepositContract` | `address` |                                   |
| `_bgt`                   | `address` | The address of the BGT token.     |
| `_distributor`           | `address` | The address of the distributor.   |
| `_stakingToken`          | `address` | The address of the staking token. |

## Governance Functions

These functions can only be invoked by Berachain's governance mechanisms through the factory owner role.

### recoverERC20

Recover ERC20 tokens from the vault. Cannot recover incentive tokens or more staking tokens than the recoverable amount.

**Emits:** [`Recovered`](#recovered)

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyFactoryOwner;
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of tokens to recover.  |

### setDistributor

Set the address of the distributor contract.

**Emits:** [`DistributorSet`](#distributorset)

```solidity
function setDistributor(address _rewardDistribution) external onlyFactoryOwner;
```

**Parameters**

| Name                   | Type      | Description                           |
| ---------------------- | --------- | ------------------------------------- |
| `_rewardDistribution`  | `address` | The new distributor contract address. |

### setMaxIncentiveTokensCount

Allows the factory owner to update the maxIncentiveTokensCount.

**Emits:** [`MaxIncentiveTokensCountUpdated`](#maxincentivetokenscountupdated)

```solidity
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external onlyFactoryOwner;
```

**Parameters**

| Name                       | Type    | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count. |

### updateIncentiveManager

Update the manager of an incentive token.

**Emits:** [`IncentiveManagerChanged`](#incentivemanagerchanged)

```solidity
function updateIncentiveManager(
    address token,
    address newManager
)
    external
    onlyFactoryOwner
    onlyWhitelistedToken(token);
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `token`      | `address` | The address of the incentive token.     |
| `newManager` | `address` | The new manager of the incentive token. |

### whitelistIncentiveToken

Whitelist a new incentive token with its minimum rate and manager.

**Emits:** [`IncentiveTokenWhitelisted`](#incentivetokenwhitelisted)

```solidity
function whitelistIncentiveToken(
    address token,
    uint256 minIncentiveRate,
    address manager
)
    external
    onlyFactoryOwner;
```

**Parameters**

| Name               | Type      | Description                                           |
| ------------------ | --------- | ----------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist.               |
| `minIncentiveRate` | `uint256` | The minimum incentive rate for this token.           |
| `manager`          | `address` | The address that can manage incentives for this token. |

## Administrative Functions

### pause

Allows the factory vault pauser to pause the vault.

```solidity
function pause() external onlyFactoryVaultPauser;
```

### setMinRewardDurationForTargetRate

Sets the minimum duration used by the target-rate algorithm.

**Emits:** [`MinRewardDurationForTargetRateUpdated`](#minrewarddurationfortargetrateupdated)

```solidity
function setMinRewardDurationForTargetRate(uint256 _minRewardDurationForTargetRate) external onlyRewardVaultManager;
```

### setRewardVaultManager

Assigns a new reward-vault manager.

**Emits:** [`RewardVaultManagerSet`](#rewardvaultmanagerset)

```solidity
function setRewardVaultManager(address _rewardVaultManager) external onlyFactoryVaultManager;
```

### setRewardsDuration

Update the rewards duration. Callable only by `rewardVaultManager` **and only when `targetRewardsPerSecond == 0`** (duration-based mode). The supplied value is stored in `pendingRewardsDuration` and applied on the next `notifyRewardAmount`.

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyRewardVaultManager;
```

### setTargetRewardsPerSecond

Switches the vault to rate-based mode (or back to duration mode when set to 0).

**Emits:** [`TargetRewardsPerSecondUpdated`](#targetrewardspersecondupdate)

```solidity
function setTargetRewardsPerSecond(uint256 _targetRewardsPerSecond) external onlyRewardVaultManager;
```

### unpause

Allows the factory vault manager to unpause the vault.

```solidity
function unpause() external onlyFactoryVaultManager;
```

## Incentive Management

These functions control **incentive token exchange rates** and deposits. The exchange rates set here (tokens per BGT) operate independently of the BGT emission timing modes described above. For comprehensive information about incentive mechanics, see the [Incentive Marketplace documentation](/learn/pol/incentives).

### addIncentive

Add an incentive token to the vault.

_Permissioned function, only callable by incentive token manager._

**Emits:** [`IncentiveAdded`](#incentiveadded)

```solidity
function addIncentive(
    address token,
    uint256 amount,
    uint256 incentiveRate
)
    external
    nonReentrant
    onlyWhitelistedToken(token);
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The address of the token to add as an incentive.         |
| `amount`        | `uint256` | The amount of the token to add as an incentive.          |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

### removeIncentiveToken

Allows the factory vault manager to remove a whitelisted incentive token.

**Emits:** [`IncentiveTokenRemoved`](#incentivetokenremoved)

```solidity
function removeIncentiveToken(address token) external onlyFactoryVaultManager onlyWhitelistedToken(token);
```

**Parameters**

| Name    | Type      | Description                         |
| ------- | --------- | ----------------------------------- |
| `token` | `address` | The address of the token to remove. |

## Staking & Delegation

The RewardVault supports **delegation**, which allows one address (the delegate) to stake tokens on behalf of another address (the account holder). This enables use cases such as:

- **Custodial staking**: Exchanges or custodians staking on behalf of users
- **Smart contract integration**: Protocols automatically staking user funds
- **Managed staking services**: Third-party services handling staking operations

**Key delegation concepts**:
- **Delegate**: The address that deposits/withdraws tokens (msg.sender)
- **Account**: The address that owns the staked position and receives rewards
- **Self-staked balance**: Tokens staked directly by the account holder
- **Delegated balance**: Tokens staked by delegates on behalf of the account

**Important**: Only the account holder can withdraw their self-staked tokens. Delegates can only withdraw tokens they deposited on behalf of the account.

### delegateStake

Stake tokens on behalf of another account.

**Emits:** [`DelegateStaked`](#delegatestaked)

```solidity
function delegateStake(address account, uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to stake for.      |
| `amount`  | `uint256` | The amount of tokens to stake. |

### delegateWithdraw

Withdraw tokens staked on behalf of another account by the delegate (msg.sender).

**Emits:** [`DelegateWithdrawn`](#delegatewithdrawn)

```solidity
function delegateWithdraw(address account, uint256 amount) external nonReentrant;
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to withdraw for.      |
| `amount`  | `uint256` | The amount of tokens to withdraw. |

### exit

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

```solidity
function exit(address recipient) external nonReentrant;
```

**Parameters**

| Name        | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| `recipient` | `address` | The address that will receive the BGT incentive. |

### getReward

Claim the reward.

_The operator only handles BGT, not STAKING_TOKEN._

```solidity
function getReward(
    address account,
    address recipient
)
    external
    nonReentrant
    onlyOperatorOrUser(account)
    returns (uint256);
```

**Parameters**

| Name        | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| `account`   | `address` | The account to claim the BGT incentive for. |
| `recipient` | `address` | The address that will receive the BGT incentive. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The amount of BGT claimed. |

### setOperator

Allows msg.sender to set another address to claim and manage their rewards.

**Emits:** [`OperatorSet`](#operatorset)

```solidity
function setOperator(address _operator) external;
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `_operator` | `address` | The address that will be allowed to claim and manage rewards. |

### stake

Stake tokens in the vault.

```solidity
function stake(uint256 amount) external nonReentrant whenNotPaused;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `amount` | `uint256` | The amount of tokens to stake. |

### withdraw

Withdraw the staked tokens from the vault.

```solidity
function withdraw(uint256 amount) external nonReentrant checkSelfStakedBalance(msg.sender, amount);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `amount` | `uint256` | The amount of tokens to withdraw. |

## View Functions

### getDelegateStake

Get the amount staked by a delegate on behalf of an account.

```solidity
function getDelegateStake(address account, address delegate) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `uint256` | The amount staked by a delegate. |

### getTotalDelegateStaked

Get the total amount staked by delegates.

```solidity
function getTotalDelegateStaked(address account) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The total amount staked by delegates. |

### getWhitelistedTokens

Get the list of whitelisted tokens.

```solidity
function getWhitelistedTokens() public view returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                     |
| -------- | ----------- | ------------------------------- |
| `<none>` | `address[]` | The list of whitelisted tokens. |

### getWhitelistedTokensCount

Get the count of active incentive tokens.

```solidity
function getWhitelistedTokensCount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The count of active incentive tokens. |

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

## Internal Functions

### \_checkRewardSolvency

```solidity
function _checkRewardSolvency() internal view override;
```

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

### \_deleteWhitelistedTokenFromList

```solidity
function _deleteWhitelistedTokenFromList(address token) internal;
```

### \_processIncentives

process the incentives for a validator.

If a token transfer consumes more than 500k gas units, the transfer alone will fail.

```solidity
function _processIncentives(bytes calldata pubkey, uint256 bgtEmitted) internal;
```

**Parameters**

| Name         | Type      | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| `pubkey`     | `bytes`   | The pubkey of the validator to process the incentives for. |
| `bgtEmitted` | `uint256` | The amount of BGT emitted by the validator.                |

### \_safeTransferRewardToken

_The Distributor grants this contract the allowance to transfer the BGT in its balance._

```solidity
function _safeTransferRewardToken(address to, uint256 amount) internal override;
```

## Modifiers

### checkSelfStakedBalance

```solidity
modifier checkSelfStakedBalance(address account, uint256 amount);
```

### onlyOperatorOrUser

```solidity
modifier onlyOperatorOrUser(address account);
```

### onlyRewardVaultManager

```solidity
modifier onlyRewardVaultManager();
```

### onlyWhitelistedToken

```solidity
modifier onlyWhitelistedToken(address token);
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
    address manager;
}
```

**Properties**

| Name               | Type      | Description                                                                |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission.           |
| `incentiveRate`    | `uint256` | The amount of the token to incentivize per BGT emission.                   |
| `amountRemaining`  | `uint256` | The amount of the token remaining to incentivize.                          |
| `manager`          | `address` | The address of the manager that can addIncentive for this incentive token. |

## Events

### BGTBoosterIncentivesProcessed

Emitted when BGT booster incentives are successfully processed.

```solidity
event BGTBoosterIncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### BGTBoosterIncentivesProcessFailed

Emitted when BGT booster incentives processing fails.

```solidity
event BGTBoosterIncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### DelegateStaked

Emitted when tokens are staked on behalf of another account.

```solidity
event DelegateStaked(address indexed account, address indexed delegate, uint256 amount);
```

### DelegateWithdrawn

Emitted when delegated tokens are withdrawn.

```solidity
event DelegateWithdrawn(address indexed account, address indexed delegate, uint256 amount);
```

### DistributorSet

Emitted when the distributor address is updated.

```solidity
event DistributorSet(address indexed newDistributor);
```

### IncentiveAdded

Emitted when an incentive is added to the vault.

```solidity
event IncentiveAdded(address indexed token, address indexed manager, uint256 amount, uint256 incentiveRate);
```

### IncentiveManagerChanged

Emitted when an incentive token's manager is updated.

```solidity
event IncentiveManagerChanged(address indexed token, address indexed newManager, address indexed oldManager);
```

### IncentiveTokenRemoved

Emitted when an incentive token is removed from the whitelist.

```solidity
event IncentiveTokenRemoved(address indexed token);
```

### IncentiveTokenWhitelisted

Emitted when a new incentive token is whitelisted.

```solidity
event IncentiveTokenWhitelisted(address indexed token, uint256 minIncentiveRate, address indexed manager);
```

### IncentivesProcessed

Emitted when validator incentives are successfully processed.

```solidity
event IncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### IncentivesProcessFailed

Emitted when validator incentive processing fails.

```solidity
event IncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### MaxIncentiveTokensCountUpdated

Emitted when the maximum incentive tokens count is updated.

```solidity
event MaxIncentiveTokensCountUpdated(uint8 newMaxIncentiveTokensCount);
```

### MinRewardDurationForTargetRateUpdated

Emitted when the minimum incentive duration used by the target-rate algorithm is updated.

```solidity
event MinRewardDurationForTargetRateUpdated(uint256 newMinRewardDurationForTargetRate, uint256 oldMinRewardDurationForTargetRate);
```

### OperatorSet

Emitted when an operator is set for an account.

```solidity
event OperatorSet(address indexed account, address indexed operator);
```

### Recovered

Emitted when ERC20 tokens are recovered from the vault.

```solidity
event Recovered(address indexed token, uint256 amount);
```

### RewardDurationManagerSet

Emitted when the reward duration manager is updated.

```solidity
event RewardDurationManagerSet(address indexed newRewardDurationManager, address indexed oldRewardDurationManager);
```

### RewardVaultManagerSet

Emitted when a new reward-vault manager is assigned.

```solidity
event RewardVaultManagerSet(address indexed newRewardVaultManager, address indexed oldRewardVaultManager);
```

### TargetRewardsPerSecondUpdated

Emitted when the target **incentive** emission rate is changed.

```solidity
event TargetRewardsPerSecondUpdated(uint256 newTargetRewardsPerSecond, uint256 oldTargetRewardsPerSecond);
```

> **Rate-based BGT emission timing**  
When `targetRewardsPerSecond` is non-zero the vault operates in rate-based mode. Each `notifyRewardAmount` call chooses a `rewardsDuration` such that `reward / duration ≤ targetRewardsPerSecond`, while never dropping below `minRewardDurationForTargetRate`. This affects **BGT emission timing only** and does not change incentive token exchange rates. See the [BGT Emission Timing Modes section](../../learn/pol/incentives#bgt-emission-timing-modes) for details and examples.
