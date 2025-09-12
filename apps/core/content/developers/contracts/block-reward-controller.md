---
head:
  - - meta
    - property: og:title
      content: BlockRewardController Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BlockRewardController contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BlockRewardController contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BlockRewardController

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.blockRewardController['mainnet-address']">{{config.contracts.pol.blockRewardController['mainnet-address']}}</a><span v-if="config.contracts.pol.blockRewardController.abi && config.contracts.pol.blockRewardController.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.blockRewardController.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/rewards/BlockRewardController.sol)

The BlockRewardController contract is responsible for managing the reward rate of BGT. It computes and distributes block rewards to validators based on their voting power.

**Inherits:** IBlockRewardController, OwnableUpgradeable, UUPSUpgradeable

## Constants

### MAX_BASE_RATE

The maximum value for base rate.

```solidity
uint256 public constant MAX_BASE_RATE = 5 * FixedPointMathLib.WAD;
```

### MAX_BOOST_MULTIPLIER

The maximum value for boost multiplier.

```solidity
uint256 public constant MAX_BOOST_MULTIPLIER = 5 * FixedPointMathLib.WAD;
```

### MAX_MIN_BOOSTED_REWARD_RATE

The maximum value for the minimum reward rate after boosts accounting.

```solidity
uint256 public constant MAX_MIN_BOOSTED_REWARD_RATE = 10 * FixedPointMathLib.WAD;
```

### MAX_REWARD_CONVEXITY

The maximum value for reward convexity parameter.

```solidity
uint256 public constant MAX_REWARD_CONVEXITY = FixedPointMathLib.WAD;
```

### MAX_REWARD_RATE

The maximum value for reward rate.

```solidity
uint256 public constant MAX_REWARD_RATE = 5 * FixedPointMathLib.WAD;
```

## State Variables

### baseRate

The constant base rate for BGT.

```solidity
uint256 public baseRate;
```

### beaconDepositContract

The Beacon deposit contract to check the pubkey -> operator relationship.

```solidity
IBeaconDeposit public beaconDepositContract;
```

### boostMultiplier

The boost multiplier parameter in the function, determines the inflation cap, 18 decimals.

```solidity
uint256 public boostMultiplier;
```

### bgt

The BGT token contract that we are minting to the distributor.

```solidity
BGT public bgt;
```

### distributor

The distributor contract that receives the minted BGT.

```solidity
address public distributor;
```

### minBoostedRewardRate

The minimum reward rate for BGT after accounting for validator boosts.

```solidity
uint256 public minBoostedRewardRate;
```

### rewardConvexity

The reward convexity parameter in the function, determines how fast it converges to its max, 18 decimals.

```solidity
int256 public rewardConvexity;
```

### rewardRate

The reward rate for BGT.

```solidity
uint256 public rewardRate;
```

## View Functions

### getMaxBGTPerBlock

Returns the current max BGT production per block.

_Exposed for BGT contract to calculate the max burnable native token amount._

```solidity
function getMaxBGTPerBlock() public view returns (uint256 amount);
```

**Returns**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `amount` | `uint256` | The maximum amount of BGT that can be minted in one block |

## Functions

### computeReward

Computes the reward given specified parameters, according to the formula.
r := (1 + mul) _ (1 - 1 / (1 + mul _ boost^conv)) _ rewardRate ∈ [0, mul _ rewardRate]

_Returns 0 for boost == 0 even if conv == 0, since contract enforces conv > 0._

```solidity
function computeReward(
    uint256 boostPower,
    uint256 _rewardRate,
    uint256 _boostMultiplier,
    int256 _rewardConvexity
) public pure returns (uint256 reward);
```

**Parameters**

| Name               | Type      | Description                    |
| ------------------ | --------- | ------------------------------ |
| `boostPower`       | `uint256` | The normalized boost           |
| `_rewardRate`      | `uint256` | The reward rate parameter      |
| `_boostMultiplier` | `uint256` | The boost multiplier parameter |
| `_rewardConvexity` | `int256`  | The reward convexity parameter |

**Returns**

| Name     | Type      | Description       |
| -------- | --------- | ----------------- |
| `reward` | `uint256` | The reward amount |

### initialize

Initializes the BlockRewardController contract.

```solidity
function initialize(
    address _bgt,
    address _distributor,
    address _beaconDepositContract,
    address _governance
) external initializer;
```

**Parameters**

| Name                     | Type      | Description                         |
| ------------------------ | --------- | ----------------------------------- |
| `_bgt`                   | `address` | The BGT token contract address      |
| `_distributor`           | `address` | The distributor contract address    |
| `_beaconDepositContract` | `address` | The Beacon deposit contract address |
| `_governance`            | `address` | The governance address              |

### processRewards

Processes the rewards for the specified block and mints BGT to validator's operator and distributor.

_This function can only be called by the distributor._

**Emits:**

- [BlockRewardProcessed](#event-blockrewardprocessed)

```solidity
function processRewards(
    bytes calldata pubkey,
    uint64 nextTimestamp,
    bool isReady
) external onlyDistributor returns (uint256);
```

**Parameters**

| Name            | Type     | Description                                                                    |
| --------------- | -------- | ------------------------------------------------------------------------------ |
| `pubkey`        | `bytes`  | The validator's pubkey                                                         |
| `nextTimestamp` | `uint64` | The timestamp of the next beacon block that was processed                      |
| `isReady`       | `bool`   | The flag to enable reward minting to distributor (true when BeraChef is ready) |

**Returns**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` | The amount of BGT minted to distributor |

### setBaseRate

Sets the constant base reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [BaseRateChanged](#event-baseratechanged)

```solidity
function setBaseRate(uint256 _baseRate) external onlyOwner;
```

**Parameters**

| Name        | Type      | Description       |
| ----------- | --------- | ----------------- |
| `_baseRate` | `uint256` | The new base rate |

### setBoostMultiplier

Sets the boost multiplier parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [BoostMultiplierChanged](#event-boostmultiplierchanged)

```solidity
function setBoostMultiplier(uint256 _boostMultiplier) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description              |
| ------------------ | --------- | ------------------------ |
| `_boostMultiplier` | `uint256` | The new boost multiplier |

### setDistributor

Sets the distributor contract that receives the minted BGT.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [SetDistributor](#event-setdistributor)

```solidity
function setDistributor(address _distributor) external onlyOwner;
```

**Parameters**

| Name           | Type      | Description                  |
| -------------- | --------- | ---------------------------- |
| `_distributor` | `address` | The new distributor contract |

### setMinBoostedRewardRate

Sets the min boosted reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [MinBoostedRewardRateChanged](#event-minboostedrewardratechanged)

```solidity
function setMinBoostedRewardRate(uint256 _minBoostedRewardRate) external onlyOwner;
```

**Parameters**

| Name                    | Type      | Description                     |
| ----------------------- | --------- | ------------------------------- |
| `_minBoostedRewardRate` | `uint256` | The new min boosted reward rate |

### setRewardConvexity

Sets the reward convexity parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [RewardConvexityChanged](#event-rewardconvexitychanged)

```solidity
function setRewardConvexity(uint256 _rewardConvexity) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description              |
| ------------------ | --------- | ------------------------ |
| `_rewardConvexity` | `uint256` | The new reward convexity |

### setRewardRate

Sets the reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

**Emits:**

- [RewardRateChanged](#event-rewardratechanged)

```solidity
function setRewardRate(uint256 _rewardRate) external onlyOwner;
```

**Parameters**

| Name          | Type      | Description         |
| ------------- | --------- | ------------------- |
| `_rewardRate` | `uint256` | The new reward rate |

## Events

### BaseRateChanged {#event-baseratechanged}

Emitted when the constant base rate has changed.

```solidity
event BaseRateChanged(uint256 oldBaseRate, uint256 newBaseRate);
```

**Parameters**

| Name          | Type      | Description       |
| ------------- | --------- | ----------------- |
| `oldBaseRate` | `uint256` | The old base rate |
| `newBaseRate` | `uint256` | The new base rate |

### BlockRewardProcessed {#event-blockrewardprocessed}

Emitted when the rewards for the specified block have been processed.

```solidity
event BlockRewardProcessed(bytes indexed pubkey, uint64 nextTimestamp, uint256 baseRate, uint256 rewardRate);
```

**Parameters**

| Name            | Type      | Description                                               |
| --------------- | --------- | --------------------------------------------------------- |
| `pubkey`        | `bytes`   | The validator's pubkey                                    |
| `nextTimestamp` | `uint64`  | The timestamp of the next beacon block that was processed |
| `baseRate`      | `uint256` | The base amount of BGT minted to the validator's operator |
| `rewardRate`    | `uint256` | The amount of BGT minted to the distributor               |

### BoostMultiplierChanged {#event-boostmultiplierchanged}

Emitted when the boostMultiplier parameter has changed.

```solidity
event BoostMultiplierChanged(uint256 oldBoostMultiplier, uint256 newBoostMultiplier);
```

**Parameters**

| Name                 | Type      | Description                        |
| -------------------- | --------- | ---------------------------------- |
| `oldBoostMultiplier` | `uint256` | The old boost multiplier parameter |
| `newBoostMultiplier` | `uint256` | The new boost multiplier parameter |

### MinBoostedRewardRateChanged {#event-minboostedrewardratechanged}

Emitted when the min boosted reward rate has changed.

```solidity
event MinBoostedRewardRateChanged(uint256 oldMinBoostedRewardRate, uint256 newMinBoostedRewardRate);
```

**Parameters**

| Name                      | Type      | Description                     |
| ------------------------- | --------- | ------------------------------- |
| `oldMinBoostedRewardRate` | `uint256` | The old min boosted reward rate |
| `newMinBoostedRewardRate` | `uint256` | The new min boosted reward rate |

### RewardConvexityChanged {#event-rewardconvexitychanged}

Emitted when the reward formula convexity parameter has changed.

```solidity
event RewardConvexityChanged(uint256 oldRewardConvexity, uint256 newRewardConvexity);
```

**Parameters**

| Name                 | Type      | Description                                |
| -------------------- | --------- | ------------------------------------------ |
| `oldRewardConvexity` | `uint256` | The old reward formula convexity parameter |
| `newRewardConvexity` | `uint256` | The new reward formula convexity parameter |

### RewardRateChanged {#event-rewardratechanged}

Emitted when the reward rate has changed.

```solidity
event RewardRateChanged(uint256 oldRewardRate, uint256 newRewardRate);
```

**Parameters**

| Name            | Type      | Description         |
| --------------- | --------- | ------------------- |
| `oldRewardRate` | `uint256` | The old reward rate |
| `newRewardRate` | `uint256` | The new reward rate |

### SetDistributor {#event-setdistributor}

Emitted when the distributor is set.

```solidity
event SetDistributor(address indexed rewardDistribution);
```

**Parameters**

| Name                 | Type      | Description                 |
| -------------------- | --------- | --------------------------- |
| `rewardDistribution` | `address` | The new distributor address |

## Errors

### InvalidBaseRate

Thrown when the base rate exceeds the maximum allowed value.

```solidity
error InvalidBaseRate();
```

### InvalidBoostMultiplier

Thrown when the boost multiplier exceeds the maximum allowed value.

```solidity
error InvalidBoostMultiplier();
```

### InvalidMinBoostedRewardRate

Thrown when the minimum boosted reward rate exceeds the maximum allowed value.

```solidity
error InvalidMinBoostedRewardRate();
```

### InvalidRewardConvexity

Thrown when the reward convexity is zero or exceeds the maximum allowed value.

```solidity
error InvalidRewardConvexity();
```

### InvalidRewardRate

Thrown when the reward rate exceeds the maximum allowed value.

```solidity
error InvalidRewardRate();
```

### NotDistributor

Thrown when the caller is not the distributor.

```solidity
error NotDistributor();
```

### ZeroAddress

Thrown when a zero address is provided where a valid address is required.

```solidity
error ZeroAddress();
```
