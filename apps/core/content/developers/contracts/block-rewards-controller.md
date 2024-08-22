<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IBlockRewardController

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.blockRewardsController.address">{{config.contracts.blockRewardsController.address}}</a><span v-if="config.contracts.blockRewardsController.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.blockRewardsController.abi">ABI JSON</a></span></small>

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

### processRewards

processes the rewards for the specified block and mints the BGT to the distributor and commissions to
coinbase.

_This function can only be called by the distributor._

```solidity
function processRewards(address coinbase, uint256 blockNumber) external returns (uint256);
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `coinbase`    | `address` | The validator's coinbase address for the block. |
| `blockNumber` | `uint256` | The block number to process rewards for.        |

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

### SetDistributor

Emitted when the distributor is set.

```solidity
event SetDistributor(address indexed rewardDistribution);
```

### BlockRewardProcessed

Emitted when the rewards for the specified block have been processed.

```solidity
event BlockRewardProcessed(uint256 blockNumber, uint256 baseRate, uint256 commissionRate, uint256 rewardRate);
```

**Parameters**

| Name             | Type      | Description                                                                          |
| ---------------- | --------- | ------------------------------------------------------------------------------------ |
| `blockNumber`    | `uint256` | The block number that was processed.                                                 |
| `baseRate`       | `uint256` | The base amount of BGT minted to either the coinbase or the coinbase operator.       |
| `commissionRate` | `uint256` | The commission amount of BGT minted to either the coinbase or the coinbase operator. |
| `rewardRate`     | `uint256` | The amount of BGT minted to the distributor.                                         |
