<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVault

This contract is the vault for the Berachain rewards, it handles the staking and rewards accounting of BGT.

_This contract is taken from the stable and tested:
https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol
We are using this model instead of 4626 because we want to incentivize staying in the vault for x period of time to
to be considered a 'miner' and not a 'trader'._

## State Variables

### MAX_INCENTIVE_RATE

```solidity
uint256 private constant MAX_INCENTIVE_RATE = 1e36;
```

### SAFE_GAS_LIMIT

```solidity
uint256 private constant SAFE_GAS_LIMIT = 500_000;
```

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

### beaconDepositContract

The BeaconDeposit contract.

```solidity
IBeaconDeposit public beaconDepositContract;
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
mapping(address token => Incentive) public incentives;
```

### whitelistedTokens

The list of whitelisted tokens.

```solidity
address[] public whitelistedTokens;
```

### MIN_REWARD_DURATION

The minimum reward distribution period when using duration-based rewards.

```solidity
uint256 public constant MIN_REWARD_DURATION = 3 days;
```

### MAX_REWARD_DURATION

The maximum reward distribution period when using duration-based rewards.

```solidity
uint256 public constant MAX_REWARD_DURATION = 7 days;
```

### rewardVaultManager

Address authorized to configure reward-distribution parameters (duration or target rate).

```solidity
address public rewardVaultManager;
```

### targetRewardsPerSecond

Target (and maximum) reward-emission rate, scaled by `PRECISION`. When non-zero, the vault automatically adjusts `rewardsDuration` so the realised rate never exceeds this value (but never drops below `MIN_REWARD_DURATION`).

```solidity
uint256 public targetRewardsPerSecond;
```

### pendingRewardsDuration

Duration that will take effect at the next `notifyRewardAmount` call when operating in duration-based mode.

```solidity
uint256 public pendingRewardsDuration;
```

### minRewardDurationForTargetRate

Minimum duration applied by the target-rate algorithm if the computed period would otherwise fall below this value.

```solidity
uint256 public minRewardDurationForTargetRate;
```

## Reward Mechanics: Duration vs Target Rate

RewardVaults support **two mutually-exclusive modes** for distributing incentives:

1. **Duration-based (legacy)** – the Reward Duration Manager picks a fixed `rewardsDuration`. Each call to `notifyRewardAmount` drips the supplied reward evenly over that period.
2. **Target rate** – enabled when `targetRewardsPerSecond` is set to a non-zero value. For every `notifyRewardAmount` call the vault computes a period so that the realised emission rate does not exceed the target while still respecting the hard limits:

   ```text
   period = max(MIN_REWARD_DURATION,
                min(totalReward / targetRate, MAX_REWARD_DURATION))
   ```

   This guarantees the duration is never shorter than 3 days and never longer than 7 days.

Switching back to duration mode is done by setting `targetRewardsPerSecond` to 0 and (optionally) queuing a new duration with `setRewardsDuration`.

---

## Functions

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

Allows the factory owner to set the contract that is allowed to distribute rewards.

```solidity
function setDistributor(address _rewardDistribution) external onlyFactoryOwner;
```

**Parameters**

| Name                  | Type      | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `_rewardDistribution` | `address` | The address that is allowed to distribute rewards. |

### notifyRewardAmount

Allows the distributor to notify the reward amount.

```solidity
function notifyRewardAmount(bytes calldata pubkey, uint256 reward) external onlyDistributor;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator.    |
| `reward` | `uint256` | The amount of reward to notify. |

### recoverERC20

Allows the factory owner to recover any ERC20 token from the vault.

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyFactoryOwner;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration

Updates the distribution duration **while the vault is in duration-based mode**.

Callable only by the `rewardDurationManager` address and subject to:

- Cool-down: at least 1 day since the previous change (`REWARD_DURATION_COOLDOWN_PERIOD`).
- Bounds: value must be between `MIN_REWARD_DURATION` (3 days) and `MAX_REWARD_DURATION` (7 days).

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external;
```

| Name               | Type      | Description              |
| ------------------ | --------- | ------------------------ |
| `_rewardsDuration` | `uint256` | New duration in seconds. |

### setRewardDurationManager

Transfers the role that controls reward-duration settings.

```solidity
function setRewardDurationManager(address _rewardDurationManager) external onlyFactoryVaultManager;
```

| Name                     | Type      | Description          |
| ------------------------ | --------- | -------------------- |
| `_rewardDurationManager` | `address` | New manager address. |

### whitelistIncentiveToken

Allows the factory owner to whitelist a token to incentivize with.

```solidity
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external onlyFactoryOwner;
```

**Parameters**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist.                           |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission. |
| `manager`          | `address` | The address of the manager that can addIncentive for this token. |

### removeIncentiveToken

Allows the factory vault manager to remove a whitelisted incentive token.

```solidity
function removeIncentiveToken(address token) external onlyFactoryVaultManager onlyWhitelistedToken(token);
```

**Parameters**

| Name    | Type      | Description                         |
| ------- | --------- | ----------------------------------- |
| `token` | `address` | The address of the token to remove. |

### updateIncentiveManager

Update the manager of an incentive token.

_Permissioned function, only allow factory owner to update the manager._

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

### setMaxIncentiveTokensCount

Allows the factory owner to update the maxIncentiveTokensCount.

```solidity
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external onlyFactoryOwner;
```

**Parameters**

| Name                       | Type    | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count. |

### pause

Allows the factory vault pauser to pause the vault.

```solidity
function pause() external onlyFactoryVaultPauser;
```

### unpause

Allows the factory vault manager to unpause the vault.

```solidity
function unpause() external onlyFactoryVaultManager;
```

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
| `account`   | `address` | The account to get the reward for. |
| `recipient` | `address` | The address to send the reward to. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The amount of the reward claimed. |

### exit

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

```solidity
function exit(address recipient) external nonReentrant;
```

**Parameters**

| Name        | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| `recipient` | `address` | The address to send the 'BGT' reward to. |

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

Add an incentive token to the vault.

_Permissioned function, only callable by incentive token manager._

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

### \_deleteWhitelistedTokenFromList

```solidity
function _deleteWhitelistedTokenFromList(address token) internal;
```

### onlyRewardVaultManager

```solidity
modifier onlyRewardVaultManager();
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

### TargetRewardsPerSecondUpdated

Emitted when the target reward rate is changed.

```solidity
event TargetRewardsPerSecondUpdated(uint256 newTargetRewardsPerSecond, uint256 oldTargetRewardsPerSecond);
```

### RewardVaultManagerSet

Emitted when a new reward-vault manager is assigned.

```solidity
event RewardVaultManagerSet(address indexed newRewardVaultManager, address indexed oldRewardVaultManager);
```

### MinRewardDurationForTargetRateUpdated

Emitted when the minimum reward duration used by the target-rate algorithm is updated.

```solidity
event MinRewardDurationForTargetRateUpdated(uint256 newMinRewardDurationForTargetRate, uint256 oldMinRewardDurationForTargetRate);
```

### setRewardsDuration

_Update:_ callable only by `rewardVaultManager` **and only when `targetRewardsPerSecond == 0`** (duration-based mode). The supplied value is stored in `pendingRewardsDuration` and applied on the next `notifyRewardAmount`.

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyRewardVaultManager;
```

### setTargetRewardsPerSecond

Switches the vault to rate-based mode (or back to duration mode when set to 0).

```solidity
function setTargetRewardsPerSecond(uint256 _targetRewardsPerSecond) external onlyRewardVaultManager;
```

### setMinRewardDurationForTargetRate

Sets the minimum duration used by the target-rate algorithm.

```solidity
function setMinRewardDurationForTargetRate(uint256 _minRewardDurationForTargetRate) external onlyRewardVaultManager;
```

### setRewardVaultManager

Assigns a new reward-vault manager.

```solidity
function setRewardVaultManager(address _rewardVaultManager) external onlyFactoryVaultManager;
```

> **Rate-based reward distribution**  
> When `targetRewardsPerSecond` is non-zero the vault operates in rate-based mode. Each `notifyRewardAmount` call chooses a `rewardsDuration` such that `reward / duration ≤ targetRewardsPerSecond`, while never dropping below `minRewardDurationForTargetRate`. See the [Rate-based distribution section](../../learn/pol/incentives#rate-based-reward-distribution-target-rate) for maths and examples.
