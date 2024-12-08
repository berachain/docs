<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactory

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.honeyFactory.address">{{config.contracts.honeyFactory.address}}</a><span v-if="config.contracts.honeyFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honeyFactory.abi">ABI JSON</a></span></small>

This is the factory contract for minting and redeeming Honey.

## Constants

### ONE_HUNDRED_PERCENT_RATE

_The constant representing 100% for rate calculations, in 60.18-decimal fixed-point._

```solidity
uint256 private constant ONE_HUNDRED_PERCENT_RATE = 1e18;
```

### NINETY_EIGHT_PERCENT_RATE

_The constant representing 98% for minimum rate validation, in 60.18-decimal fixed-point._

```solidity
uint256 private constant NINETY_EIGHT_PERCENT_RATE = 98e16;
```

### DEFAULT_PEG_OFFSET

_The constant representing the default symmetrical offset (0.2%) for USD peg monitoring._

```solidity
uint256 private constant DEFAULT_PEG_OFFSET = 0.002e18;
```

### DEFAULT_MINT_REDEEM_RATE

_The constant representing the default mint/redeem rate (99.8%), in 60.18-decimal fixed-point._

```solidity
uint256 private constant DEFAULT_MINT_REDEEM_RATE = 0.998e18;
```

### MAX_PEG_OFFSET

_The maximum allowed peg offset (2 cents)._

```solidity
uint256 private constant MAX_PEG_OFFSET = 0.02e18;
```

### MAX_PRICE_FEED_DELAY

_The maximum allowed price feed staleness._

```solidity
uint256 private constant MAX_PRICE_FEED_DELAY = 60 seconds;
```

## State Variables

### Core Contracts

#### honey

The Honey token contract.

```solidity
Honey public honey;
```

#### pyth

The Pyth price oracle contract for monitoring asset pegs.

```solidity
IPyth public pyth;
```

### Fee Configuration

#### polFeeCollectorFeeRate

The rate of POL fee collection, in 60.18-decimal fixed-point. 1e18 means all fees go to POLFeeCollector, 0 means all go to feeReceiver.

```solidity
uint256 public polFeeCollectorFeeRate;
```

#### mintRates

Mint rate per asset, in 60.18-decimal fixed-point.

```solidity
mapping(address asset => uint256 rate) public mintRates;
```

#### redeemRates

Redemption rate per asset, in 60.18-decimal fixed-point.

```solidity
mapping(address asset => uint256 rate) public redeemRates;
```

### Price Monitoring

#### feeds

Mapping of collateral asset to Pyth price feed ID.

```solidity
mapping(address asset => bytes32 id) internal feeds;
```

#### priceFeedMaxDelay

Maximum staleness allowed for price feeds.

```solidity
uint256 public priceFeedMaxDelay;
```

#### lowerPegOffsets

Lower bound offset from $1 for peg monitoring.

```solidity
mapping(address asset => uint256 lowerPegOffset) internal lowerPegOffsets;
```

#### upperPegOffsets

Upper bound offset from $1 for peg monitoring.

```solidity
mapping(address asset => uint256 upperPegOffset) internal upperPegOffsets;
```

### Basket Mode & Liquidation

#### forcedBasketMode

Whether basket mode is forced regardless of price feeds.

```solidity
bool public forcedBasketMode;
```

#### liquidationEnabled

Whether liquidation functionality is enabled.

```solidity
bool public liquidationEnabled;
```

#### liquidationRates

Premium rate applied when liquidating bad collateral.

```solidity
mapping(address asset => uint256 rate) internal liquidationRates;
```

### Collateral Management

#### referenceCollateral

The reference collateral asset for relative caps.

```solidity
address public referenceCollateral;
```

#### relativeCap

Maximum ratio of an asset relative to reference collateral.

```solidity
mapping(address asset => uint256 limit) public relativeCap;
```

#### globalCap

Maximum percentage any single asset can be of total collateral.

```solidity
uint256 public globalCap;
```

### Recapitalization

#### recapitalizeBalanceThreshold

Target balance that must be reached during recapitalization.

```solidity
mapping(address asset => uint256 targetBalance) public recapitalizeBalanceThreshold;
```

#### minSharesToRecapitalize

Minimum amount of shares required for recapitalization.

```solidity
uint256 public minSharesToRecapitalize;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address _governance,
    address _honey,
    address _polFeeCollector,
    address _feeReceiver,
    address _pythOracle
) external initializer;
```

**Parameters**

| Name              | Type      | Description                                |
| ----------------- | --------- | ------------------------------------------ |
| `_governance`     | `address` | The governance address                     |
| `_honey`          | `address` | The Honey token address                    |
| `_polFeeCollector`| `address` | The POL fee collector address             |
| `_feeReceiver`    | `address` | The fee receiver address                   |
| `_pythOracle`     | `address` | The Pyth oracle address                   |

### User Functions

> Note: These functions can be called by any user interacting with the protocol.

### mint

_Mint Honey by depositing backing assets._

```solidity
function mint(
    address asset,
    uint256 amount,
    address receiver
) external returns (uint256);
```

**Parameters**

| Name       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `asset`    | `address` | The backing asset to deposit         |
| `amount`   | `uint256` | The amount of backing asset          |
| `receiver` | `address` | The address to receive Honey         |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of Honey minted           |

### redeem

_Redeem backing assets by burning Honey._

```solidity
function redeem(
    address asset,
    uint256 honeyAmount,
    address receiver
) external returns (uint256);
```

**Parameters**

| Name          | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `asset`       | `address` | The backing asset to receive          |
| `honeyAmount` | `uint256` | The amount of Honey to redeem         |
| `receiver`    | `address` | The address to receive backing assets |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of assets redeemed        |

### liquidate

_Swap good collateral for blacklisted/bad collateral at a premium rate._

```solidity
function liquidate(
    address goodAsset,
    uint256 amount,
    address badAsset
) external returns (uint256);
```

**Parameters**

| Name        | Type      | Description                           |
| ----------- | --------- | ------------------------------------- |
| `goodAsset` | `address` | The good asset to provide             |
| `amount`    | `uint256` | The amount of good asset to provide   |
| `badAsset`  | `address` | The bad asset to receive              |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of bad asset received     |

### Getter Functions

> Note: These view functions can be called by anyone to read protocol state.

### getMintRate

_Get the mint rate for an asset._

```solidity
function getMintRate(address asset) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to get mint rate for |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The mint rate for the asset         |

### getRedeemRate

_Get the redeem rate for an asset._

```solidity
function getRedeemRate(address asset) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description                      |
| ------- | --------- | -------------------------------- |
| `asset` | `address` | The asset to get redeem rate for |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The redeem rate for the asset       |

### isBasketMode

_Check if the system is currently in basket mode._

```solidity
function isBasketMode() public view returns (bool);
```

**Returns**

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `<none>` | `bool` | True if system is in basket mode              |

### previewMint

_Preview the amount of Honey that would be minted for given assets._

```solidity
function previewMint(address asset, uint256 amount) external view returns (uint256);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `asset`  | `address` | The backing asset to mint with    |
| `amount` | `uint256` | The amount of asset to mint with  |

**Returns**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` | The amount of Honey that would be minted|

### previewRedeem

_Preview the amount of assets that would be received for Honey._

```solidity
function previewRedeem(address asset, uint256 honeyAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `asset`       | `address` | The backing asset to redeem    |
| `honeyAmount` | `uint256` | The amount of Honey to redeem  |

**Returns**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `<none>` | `uint256` | The amount of backing asset to be received|

### setMaxFeedDelay

_Set the maximum tolerated staleness for price feeds._

```solidity
function setMaxFeedDelay(uint256 maxTolerance) external;
```

**Parameters**

| Name          | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| `maxTolerance`| `uint256` | Maximum seconds allowed for price feed staleness|

### setDepegOffsets

_Set the allowed deviation range from USD peg for an asset._

```solidity
function setDepegOffsets(
    address asset,
    uint256 lowerOffset,
    uint256 upperOffset
) external;
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `asset`       | `address` | The asset to set offsets for                    |
| `lowerOffset` | `uint256` | Lower bound offset from $1 (e.g., 0.002e18)    |
| `upperOffset` | `uint256` | Upper bound offset from $1 (e.g., 0.002e18)    |

### setReferenceCollateral

_Set the reference collateral for relative caps._

```solidity
function setReferenceCollateral(address asset) external;
```

**Parameters**

| Name    | Type      | Description                           |
| ------- | --------- | ------------------------------------- |
| `asset` | `address` | The asset to set as reference         |

### setGlobalCap

_Set the global cap limit for any single asset._

```solidity
function setGlobalCap(uint256 limit) external;
```

**Parameters**

| Name    | Type      | Description                                          |
| ------- | --------- | ---------------------------------------------------- |
| `limit` | `uint256` | Maximum percentage of total collateral (e.g., 1e18 = 100%) |

### setRelativeCap

_Set the relative cap limit for an asset against reference collateral._

```solidity
function setRelativeCap(address asset, uint256 limit) external;
```

**Parameters**

| Name    | Type      | Description                                          |
| ------- | --------- | ---------------------------------------------------- |
| `asset` | `address` | The asset to set cap for                             |
| `limit` | `uint256` | Maximum ratio relative to reference (e.g., 1.5e18 = 150%) |

### _isPegged

_Check if an asset is currently pegged to USD within allowed range._

```solidity
function _isPegged(address asset) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to check peg status  |

**Returns**

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `<none>` | `bool` | True if asset is within peg range, false otherwise |

### Internal Functions

#### _getSharesWithoutFees

_Get the amount of shares without considering fees._

```solidity
function _getSharesWithoutFees(address asset) internal view returns (uint256);
```

**Parameters**

| Name    | Type      | Description                           |
| ------- | --------- | ------------------------------------- |
| `asset` | `address` | The asset to get shares for           |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of shares without fees    |

#### _mint

_Internal mint function with basket mode handling._

```solidity
function _mint(
    address asset,
    uint256 amount,
    address receiver,
    bool checkCaps
) internal returns (uint256);
```

**Parameters**

| Name        | Type      | Description                                |
| ----------- | --------- | ------------------------------------------ |
| `asset`     | `address` | The asset to mint with                     |
| `amount`    | `uint256` | The amount of asset to mint               |
| `receiver`  | `address` | The address to receive Honey               |
| `checkCaps` | `bool`    | Whether to check collateral caps          |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of Honey minted           |

#### _redeem

_Internal redeem function with basket mode handling._

```solidity
function _redeem(
    address asset,
    uint256 amount,
    address receiver
) internal returns (uint256);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `asset`    | `address` | The asset to redeem for               |
| `amount`   | `uint256` | The amount of Honey to redeem         |
| `receiver` | `address` | The address to receive assets         |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of assets redeemed        |

#### _getCollateralWeights

_Calculate weights of collateral assets in the system._

```solidity
function _getCollateralWeights(bool filterBadCollaterals) internal view returns (uint256[] memory);
```

**Parameters**

| Name                 | Type    | Description                                    |
| ------------------- | ------- | ---------------------------------------------- |
| `filterBadCollaterals` | `bool` | Whether to exclude blacklisted collateral     |

**Returns**

| Name     | Type        | Description                                |
| -------- | ----------- | ------------------------------------------ |
| `<none>` | `uint256[]` | Array of weights for each collateral asset |

#### _checkCaps

_Check if an asset exceeds its caps._

```solidity
function _checkCaps(address asset) internal view;
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to check caps for    |

#### _isCappedGlobally

_Check if an asset would exceed its global cap._

```solidity
function _isCappedGlobally(address asset) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to check             |

**Returns**

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `<none>` | `bool` | True if asset would exceed global cap          |

#### _isCappedRelative

_Check if an asset would exceed its relative cap._

```solidity
function _isCappedRelative(address asset) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to check             |

**Returns**

| Name     | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `<none>` | `bool` | True if asset would exceed relative cap         |

#### _isPegged

_Check if an asset is within its allowed peg range._

```solidity
function _isPegged(address asset) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description                    |
| ------- | --------- | ------------------------------ |
| `asset` | `address` | The asset to check peg for     |

**Returns**

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `<none>` | `bool` | True if asset is within peg range              |

### Manager Functions

> Note: All functions in this section require MANAGER_ROLE to execute.

### setMintRate

_Set the mint rate for an asset. Must be between 98% and 100%._

```solidity
function setMintRate(address asset, uint256 mintRate) external;
```

**Parameters**

| Name      | Type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| `asset`   | `address` | The asset to set mint rate for                       |
| `mintRate`| `uint256` | New mint rate (0.98e18 to 1e18)                     |

### setRedeemRate

_Set the redeem rate for an asset. Must be between 98% and 100%._

```solidity
function setRedeemRate(address asset, uint256 redeemRate) external;
```

**Parameters**

| Name        | Type      | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `asset`     | `address` | The asset to set redeem rate for                     |
| `redeemRate`| `uint256` | New redeem rate (0.98e18 to 1e18)                   |

### setForcedBasketMode

_Force basket mode regardless of price feeds._

```solidity
function setForcedBasketMode(bool forced) external;
```

**Parameters**

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `forced` | `bool` | Whether to force basket mode                    |

### setMaxFeedDelay

_Set the maximum tolerated staleness for price feeds._

```solidity
function setMaxFeedDelay(uint256 maxTolerance) external;
```

**Parameters**

| Name          | Type      | Description                                          |
| ------------- | --------- | ---------------------------------------------------- |
| `maxTolerance`| `uint256` | Maximum seconds allowed for price feed staleness     |

### setDepegOffsets

_Set the allowed deviation range from USD peg for an asset._

```solidity
function setDepegOffsets(
    address asset,
    uint256 lowerOffset,
    uint256 upperOffset
) external;
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `asset`       | `address` | The asset to set offsets for                    |
| `lowerOffset` | `uint256` | Lower bound offset from $1 (e.g., 0.002e18)    |
| `upperOffset` | `uint256` | Upper bound offset from $1 (e.g., 0.002e18)    |

### setReferenceCollateral

_Set the reference collateral for relative caps._

```solidity
function setReferenceCollateral(address asset) external;
```

**Parameters**

| Name    | Type      | Description                           |
| ------- | --------- | ------------------------------------- |
| `asset` | `address` | The asset to set as reference         |

### setGlobalCap

_Set the global cap limit for any single asset._

```solidity
function setGlobalCap(uint256 limit) external;
```

**Parameters**

| Name    | Type      | Description                                          |
| ------- | --------- | ---------------------------------------------------- |
| `limit` | `uint256` | Maximum percentage of total collateral (e.g., 1e18 = 100%) |

### setRelativeCap

_Set the relative cap limit for an asset against reference collateral._

```solidity
function setRelativeCap(address asset, uint256 limit) external;
```

**Parameters**

| Name    | Type      | Description                                          |
| ------- | --------- | ---------------------------------------------------- |
| `asset` | `address` | The asset to set cap for                             |
| `limit` | `uint256` | Maximum ratio relative to reference (e.g., 1.5e18 = 150%) |

### Admin Functions

> Note: All functions in this section require DEFAULT_ADMIN_ROLE (governance) to execute.

### setPOLFeeCollectorFeeRate

_Set the POL fee collector rate for fee distribution._

```solidity
function setPOLFeeCollectorFeeRate(uint256 _polFeeCollectorFeeRate) external;
```

**Parameters**

| Name                     | Type      | Description                                          |
| ------------------------ | --------- | ---------------------------------------------------- |
| `_polFeeCollectorFeeRate`| `uint256` | New fee rate (1e18 = 100% to POL, 0 = 100% to fee receiver) |

### _authorizeUpgrade

_Authorize an upgrade to a new implementation._

```solidity
function _authorizeUpgrade(address) internal override;
```

**Parameters**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `address` | The new implementation address        |

### grantRole

_Grant a role to an account._

```solidity
function grantRole(bytes32 role, address account) public virtual override;
```

**Parameters**

| Name      | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `role`    | `bytes32` | The role to grant (e.g., MANAGER_ROLE)|
| `account` | `address` | The account to grant the role to      |

### revokeRole

_Revoke a role from an account._

```solidity
function revokeRole(bytes32 role, address account) public virtual override;
```

**Parameters**

| Name      | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `role`    | `bytes32` | The role to revoke                    |
| `account` | `address` | The account to revoke the role from   |

### renounceRole

_Renounce a role for the calling account._

```solidity
function renounceRole(bytes32 role, address account) public virtual override;
```

**Parameters**

| Name      | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `role`    | `bytes32` | The role to renounce                  |
| `account` | `address` | Must be the caller's address          |
