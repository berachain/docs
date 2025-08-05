---
head:
  - - meta
    - property: og:title
      content: HoneyFactory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the HoneyFactory contract
  - - meta
    - property: og:description
      content: Developer reference for the HoneyFactory contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.honeyFactory['mainnet-address']">{{config.contracts.tokens.honeyFactory['mainnet-address']}}</a><span v-if="config.contracts.tokens.honeyFactory.abi && config.contracts.tokens.honeyFactory.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.honeyFactory.abi">ABI JSON</a></span></small>

This is the factory contract for minting and redeeming Honey. It manages collateral vaults, handles basket mode operations, and provides liquidation functionality.

**Inherits:**
IHoneyFactory, VaultAdmin

## State Variables

### honey
The Honey token contract.
```solidity
Honey public honey;
```

### forcedBasketMode
Whether basket mode is forced regardless of price oracle.
```solidity
bool public forcedBasketMode;
```

### liquidationEnabled
Whether liquidation is enabled.
```solidity
bool public liquidationEnabled;
```

### priceOracle
The price oracle contract.
```solidity
IPriceOracle public priceOracle;
```

### priceFeedMaxDelay
Maximum number of seconds of tolerated staleness for price feeds.
```solidity
uint256 public priceFeedMaxDelay;
```

## View Functions

### getWeights
Returns weights of all registered assets except for paused ones.
```solidity
function getWeights() external view returns (uint256[] memory weights);
```

### isPegged
Checks if an asset is pegged within its allowed range.
```solidity
function isPegged(address asset) public view returns (bool);
```

### isBasketModeEnabled
Gets the status of basket mode. For minting, enabled if all collaterals are depegged or bad. For redeeming, enabled if at least one non-liquidated asset is depegged.
```solidity
function isBasketModeEnabled(bool isMint) public view returns (bool basketMode);
```

## Functions

### mint
Mints Honey by depositing collateral assets.

**Parameters:**
- `asset`: The collateral asset to deposit
- `amount`: Amount of collateral to deposit
- `receiver`: Address to receive minted Honey
- `expectBasketMode`: Expected basket mode status

**Errors:**
- `NotPegged`: If asset is not pegged and basket mode is disabled
- `UnexpectedBasketModeStatus`: If basket mode status doesn't match expectation
- `ExceedGlobalCap`: If mint would exceed global cap
- `ExceedRelativeCap`: If mint would exceed relative cap
- `ZeroWeight`: If asset has zero weight in basket mode

```solidity
function mint(
    address asset,
    uint256 amount,
    address receiver,
    bool expectBasketMode
) external returns (uint256);
```

### redeem
Redeems Honey for collateral assets.

**Parameters:**
- `asset`: The collateral asset to receive
- `honeyAmount`: Amount of Honey to redeem
- `receiver`: Address to receive collateral
- `expectBasketMode`: Expected basket mode status

**Errors:**
- `UnexpectedBasketModeStatus`: If basket mode status doesn't match expectation
- `ExceedGlobalCap`: If redeem would exceed global cap
- `ExceedRelativeCap`: If redeem would exceed relative cap

```solidity
function redeem(
    address asset,
    uint256 honeyAmount,
    address receiver,
    bool expectBasketMode
) external returns (uint256[] memory);
```

### liquidate
Liquidates a bad collateral asset for a good one.

**Parameters:**
- `badCollateral`: The asset to liquidate
- `goodCollateral`: The asset to receive
- `goodAmount`: Amount of good collateral to provide

**Errors:**
- `LiquidationDisabled`: If liquidation is not enabled
- `AssetIsNotBadCollateral`: If bad collateral is not marked as bad
- `LiquidationWithReferenceCollateral`: If trying to liquidate reference collateral
- `ExceedRelativeCap`: If liquidation would exceed relative cap
- `ExceedGlobalCap`: If liquidation would exceed global cap
- `ZeroAmount`: If liquidation amount is zero

```solidity
function liquidate(
    address badCollateral,
    address goodCollateral,
    uint256 goodAmount
) external returns (uint256 badAmount);
```

### recapitalize
Recapitalizes a collateral vault.

**Parameters:**
- `asset`: The asset to recapitalize
- `amount`: Amount to provide

**Errors:**
- `RecapitalizeNotNeeded`: If vault doesn't need recapitalization
- `NotPegged`: If asset is not pegged
- `InsufficientRecapitalizeAmount`: If amount is below minimum
- `ExceedRelativeCap`: If recapitalization would exceed relative cap
- `ExceedGlobalCap`: If recapitalization would exceed global cap

```solidity
function recapitalize(address asset, uint256 amount) external;
```

## Events

### HoneyMinted
```solidity
event HoneyMinted(
    address indexed from,
    address indexed to,
    address indexed asset,
    uint256 assetAmount,
    uint256 mintAmount
);
```
Emitted when Honey is minted.

### HoneyRedeemed
```solidity
event HoneyRedeemed(
    address indexed from,
    address indexed to,
    address indexed asset,
    uint256 assetAmount,
    uint256 redeemAmount
);
```
Emitted when Honey is redeemed.

### Liquidated
```solidity
event Liquidated(
    address badAsset,
    address goodAsset,
    uint256 amount,
    address sender
);
```
Emitted when liquidation is performed.

### Recapitalized
```solidity
event Recapitalized(address asset, uint256 amount, address sender);
```
Emitted when vault is recapitalized.