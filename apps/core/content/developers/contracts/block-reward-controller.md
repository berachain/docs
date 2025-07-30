<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BlockRewardController

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.blockRewardController['mainnet-address']">{{config.contracts.pol.blockRewardController['mainnet-address']}}</a><span v-if="config.contracts.pol.blockRewardController.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.blockRewardController.abi">ABI JSON</a></span></small>

The BlockRewardController contract is responsible for managing the reward rate of BGT.

_It should be owned by the governance module._

_It should also be the only contract that can mint the BGT token._

\*The invariant(s) that should hold true are:

- processRewards() is only called at most once per block timestamp.\*

## State Variables

### MAX_BASE_RATE

The maximum value for base rate.

```solidity
uint256 public constant MAX_BASE_RATE = 5 * FixedPointMathLib.WAD;
```

### MAX_REWARD_RATE

The maximum value for reward rate.

```solidity
uint256 public constant MAX_REWARD_RATE = 5 * FixedPointMathLib.WAD;
```

### MAX_MIN_BOOSTED_REWARD_RATE

The maximum value for the minimum reward rate after boosts accounting.

```solidity
uint256 public constant MAX_MIN_BOOSTED_REWARD_RATE = 10 * FixedPointMathLib.WAD;
```

### MAX_BOOST_MULTIPLIER

The maximum value for boost multiplier.

```solidity
uint256 public constant MAX_BOOST_MULTIPLIER = 5 * FixedPointMathLib.WAD;
```

### MAX_REWARD_CONVEXITY

The maximum value for reward convexity parameter.

```solidity
uint256 public constant MAX_REWARD_CONVEXITY = FixedPointMathLib.WAD;
```

### bgt

The BGT token contract that we are minting to the distributor.

```solidity
BGT public bgt;
```

### beaconDepositContract

The Beacon deposit contract to check the pubkey -> operator relationship.

```solidity
IBeaconDeposit public beaconDepositContract;
```

### distributor

The distributor contract that receives the minted BGT.

```solidity
address public distributor;
```

### baseRate

The constant base rate for BGT.

```solidity
uint256 public baseRate;
```

### rewardRate

The reward rate for BGT.

```solidity
uint256 public rewardRate;
```

### minBoostedRewardRate

The minimum reward rate for BGT after accounting for validator boosts.

```solidity
uint256 public minBoostedRewardRate;
```

### boostMultiplier

The boost mutliplier param in the function, determines the inflation cap, 18 dec.

```solidity
uint256 public boostMultiplier;
```

### rewardConvexity

The reward convexity param in the function, determines how fast it converges to its max, 18 dec.

```solidity
int256 public rewardConvexity;
```

## Functions

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address _bgt,
    address _distributor,
    address _beaconDepositContract,
    address _governance
)
    external
    initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### onlyDistributor

```solidity
modifier onlyDistributor();
```

### setBaseRate

Sets the constant base reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setBaseRate(uint256 _baseRate) external onlyOwner;
```

**Parameters**

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `_baseRate` | `uint256` | The new base rate. |

### setRewardRate

Sets the reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setRewardRate(uint256 _rewardRate) external onlyOwner;
```

**Parameters**

| Name          | Type      | Description          |
| ------------- | --------- | -------------------- |
| `_rewardRate` | `uint256` | The new reward rate. |

### setMinBoostedRewardRate

Sets the min boosted reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setMinBoostedRewardRate(uint256 _minBoostedRewardRate) external onlyOwner;
```

**Parameters**

| Name                    | Type      | Description                      |
| ----------------------- | --------- | -------------------------------- |
| `_minBoostedRewardRate` | `uint256` | The new min boosted reward rate. |

### setBoostMultiplier

Sets the boost multiplier parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

```solidity
function setBoostMultiplier(uint256 _boostMultiplier) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_boostMultiplier` | `uint256` | The new boost multiplier. |

### setRewardConvexity

Sets the reward convexity parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

```solidity
function setRewardConvexity(uint256 _rewardConvexity) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_rewardConvexity` | `uint256` | The new reward convexity. |

### setDistributor

Sets the distributor contract that receives the minted BGT.

_This function can only be called by the owner, which is the governance address._

```solidity
function setDistributor(address _distributor) external onlyOwner;
```

**Parameters**

| Name           | Type      | Description                   |
| -------------- | --------- | ----------------------------- |
| `_distributor` | `address` | The new distributor contract. |

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
    public
    pure
    returns (uint256 reward);
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
| `reward` | `uint256` | the reward amount. |

### getMaxBGTPerBlock

Returns the current max BGT production per block.

_Exposed for BGT contract to calculate the max burnable native token amount._

```solidity
function getMaxBGTPerBlock() public view returns (uint256 amount);
```

**Returns**

| Name     | Type      | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `amount` | `uint256` | The maximum amount of BGT that can be minted in one block. |

### processRewards

Processes the rewards for the specified block and mints BGT to validator's operator and distributor.

_This function can only be called by the distributor._

```solidity
function processRewards(
    bytes calldata pubkey,
    uint64 nextTimestamp,
    bool isReady
)
    external
    onlyDistributor
    returns (uint256);
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
