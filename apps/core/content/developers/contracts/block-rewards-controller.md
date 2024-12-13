<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BlockRewardController

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.blockRewardsController.address">{{config.contracts.blockRewardsController.address}}</a><span v-if="config.contracts.blockRewardsController.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.blockRewardsController.abi">ABI JSON</a></span></small>

The BlockRewardController contract is responsible for managing the reward rate of BGT. Owned by the governance module, It is the only contract that can mint the BGT token.

## Functions

### baseRate

Returns the constant base rate for BGT.

```solidity
function baseRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                        |
| -------- | --------- | ------------------------------------------------------------------ |
| `<none>` | `uint256` | The constant base amount of BGT to be minted in the current block. |

### rewardRate

Returns the reward rate for BGT.

```solidity
function rewardRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| `<none>` | `uint256` | The unscaled amount of BGT to be minted in the current block. |

### minBoostedRewardRate

Returns the minimum boosted reward rate for BGT.

```solidity
function minBoostedRewardRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| `<none>` | `uint256` | The minimum amount of BGT to be minted in the current block. |

### boostMultiplier

Returns the boost mutliplier param in the reward function.

```solidity
function boostMultiplier() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | The parameter that determines the inflation cap. |

### rewardConvexity

Returns the reward convexity param in the reward function.

```solidity
function rewardConvexity() external view returns (int256);
```

**Returns**

| Name     | Type     | Description                                                               |
| -------- | -------- | ------------------------------------------------------------------------- |
| `<none>` | `int256` | The parameter that determines how fast the function converges to its max. |

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
)
    external
    pure
    returns (uint256);
```

**Parameters**

| Name               | Type      | Description                     |
| ------------------ | --------- | ------------------------------- |
| `boostPower`       | `uint256` | the normalized boost.           |
| `_rewardRate`      | `uint256` | the reward rate parameter.      |
| `_boostMultiplier` | `uint256` | the boost multiplier parameter. |
| `_rewardConvexity` | `int256`  | the reward convexity parameter. |

**Returns**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `<none>` | `uint256` | the reward amount. |

### processRewards

Processes the rewards for the specified block and mints BGT to validator's operator and distributor.

_This function can only be called by the distributor._

_If in genesis only base rate for validators is minted._

```solidity
function processRewards(bytes calldata pubkey, uint64 nextTimestamp, bool isReady) external returns (uint256);
```

**Parameters**

| Name            | Type     | Description                                                                     |
| --------------- | -------- | ------------------------------------------------------------------------------- |
| `pubkey`        | `bytes`  | The validator's pubkey.                                                         |
| `nextTimestamp` | `uint64` | The timestamp of the next beacon block that was processed.                      |
| `isReady`       | `bool`   | The flag to enable reward minting to distributor (true when BeraChef is ready). |

**Returns**

| Name     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| `<none>` | `uint256` | the amount of BGT minted to distributor. |

### setBaseRate

Sets the constant base reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setBaseRate(uint256 _baseRate) external;
```

**Parameters**

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `_baseRate` | `uint256` | The new base rate. |

### setRewardRate

Sets the reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setRewardRate(uint256 _rewardRate) external;
```

**Parameters**

| Name          | Type      | Description          |
| ------------- | --------- | -------------------- |
| `_rewardRate` | `uint256` | The new reward rate. |

### setMinBoostedRewardRate

Sets the min boosted reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setMinBoostedRewardRate(uint256 _minBoostedRewardRate) external;
```

**Parameters**

| Name                    | Type      | Description                      |
| ----------------------- | --------- | -------------------------------- |
| `_minBoostedRewardRate` | `uint256` | The new min boosted reward rate. |

### setBoostMultiplier

Sets the boost multiplier parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

```solidity
function setBoostMultiplier(uint256 _boostMultiplier) external;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_boostMultiplier` | `uint256` | The new boost multiplier. |

### setRewardConvexity

Sets the reward convexity parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

```solidity
function setRewardConvexity(uint256 _rewardConvexity) external;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_rewardConvexity` | `uint256` | The new reward convexity. |

### setDistributor

Sets the distributor contract that receives the minted BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setDistributor(address _distributor) external;
```

**Parameters**

| Name           | Type      | Description                   |
| -------------- | --------- | ----------------------------- |
| `_distributor` | `address` | The new distributor contract. |

## Events

### BaseRateChanged

Emitted when the constant base rate has changed.

```solidity
event BaseRateChanged(uint256 oldBaseRate, uint256 newBaseRate);
```

**Parameters**

| Name          | Type      | Description        |
| ------------- | --------- | ------------------ |
| `oldBaseRate` | `uint256` | The old base rate. |
| `newBaseRate` | `uint256` | The new base rate. |

### RewardRateChanged

Emitted when the reward rate has changed.

```solidity
event RewardRateChanged(uint256 oldRewardRate, uint256 newRewardRate);
```

**Parameters**

| Name            | Type      | Description          |
| --------------- | --------- | -------------------- |
| `oldRewardRate` | `uint256` | The old reward rate. |
| `newRewardRate` | `uint256` | The new reward rate. |

### MinBoostedRewardRateChanged

Emitted when the min boosted reward rate has changed.

```solidity
event MinBoostedRewardRateChanged(uint256 oldMinBoostedRewardRate, uint256 newMinBoostedRewardRate);
```

**Parameters**

| Name                      | Type      | Description                      |
| ------------------------- | --------- | -------------------------------- |
| `oldMinBoostedRewardRate` | `uint256` | The old min boosted reward rate. |
| `newMinBoostedRewardRate` | `uint256` | The new min boosted reward rate. |

### BoostMultiplierChanged

Emitted when the boostMultiplier parameter has changed.

```solidity
event BoostMultiplierChanged(uint256 oldBoostMultiplier, uint256 newBoostMultiplier);
```

**Parameters**

| Name                 | Type      | Description                         |
| -------------------- | --------- | ----------------------------------- |
| `oldBoostMultiplier` | `uint256` | The old boost multiplier parameter. |
| `newBoostMultiplier` | `uint256` | The new boost multiplier parameter. |

### RewardConvexityChanged

Emitted when the reward formula convexity parameter has changed.

```solidity
event RewardConvexityChanged(uint256 oldRewardConvexity, uint256 newRewardConvexity);
```

**Parameters**

| Name                 | Type      | Description                                 |
| -------------------- | --------- | ------------------------------------------- |
| `oldRewardConvexity` | `uint256` | The old reward formula convexity parameter. |
| `newRewardConvexity` | `uint256` | The new reward formula convexity parameter. |

### SetDistributor

Emitted when the distributor is set.

```solidity
event SetDistributor(address indexed rewardDistribution);
```

### BlockRewardProcessed

Emitted when the rewards for the specified block have been processed.

```solidity
event BlockRewardProcessed(bytes indexed pubkey, uint64 nextTimestamp, uint256 baseRate, uint256 rewardRate);
```

**Parameters**

| Name            | Type      | Description                                                |
| --------------- | --------- | ---------------------------------------------------------- |
| `pubkey`        | `bytes`   | The validator's pubkey.                                    |
| `nextTimestamp` | `uint64`  | The timestamp of the next beacon block that was processed. |
| `baseRate`      | `uint256` | The base amount of BGT minted to the validator's operator. |
| `rewardRate`    | `uint256` | The amount of BGT minted to the distributor.               |
