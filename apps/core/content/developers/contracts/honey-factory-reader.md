---
head:
  - - meta
    - property: og:title
      content: HoneyFactoryReader Contract Reference
  - - meta
    - name: description
      content: Developer reference for the HoneyFactoryReader contract
  - - meta
    - property: og:description
      content: Developer reference for the HoneyFactoryReader contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactoryReader

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.honeyFactoryReader['mainnet-address']">{{config.contracts.tokens.honeyFactoryReader['mainnet-address']}}</a><span v-if="config.contracts.tokens.honeyFactoryReader.abi && config.contracts.tokens.honeyFactoryReader.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.honeyFactoryReader.abi">ABI JSON</a></span></small>

The HoneyFactoryReader contract provides view functions for previewing minting and redeeming operations in the Honey stablecoin system. It enables efficient querying of HoneyFactory state without modifying it.

**Inherits:**
AccessControlUpgradeable, UUPSUpgradeable, IHoneyFactoryReader, IHoneyErrors

## State Variables

### honeyFactory

The HoneyFactory contract that this reader interacts with.

```solidity
HoneyFactory public honeyFactory;
```

## View Functions

### previewMintCollaterals

Computes the amount of collateral(s) needed to obtain a given amount of Honey.

**Note:** The `asset` parameter is ignored if running in basket mode.

```solidity
function previewMintCollaterals(address asset, uint256 honey) external view returns (uint256[] memory amounts);
```

### previewMintCollateralsWithPrices

Same as `previewMintCollaterals` but uses provided prices instead of oracle prices.

**Note:** Prices must be sorted like HoneyFactory.registeredAssets and use WAD (18 decimals) representation.

```solidity
function previewMintCollateralsWithPrices(
    address asset,
    uint256 honey,
    uint256[] memory prices
) external view returns (uint256[] memory amounts);
```

### previewMintHoney

Given one collateral, computes the obtainable Honey amount and required collateral amounts if basket mode is enabled.

```solidity
function previewMintHoney(
    address asset,
    uint256 amount
) external view returns (uint256[] memory collaterals, uint256 honey);
```

### previewMintHoneyWithPrices

Same as `previewMintHoney` but uses provided prices instead of oracle prices.

```solidity
function previewMintHoneyWithPrices(
    address asset,
    uint256 amount,
    uint256[] memory prices
) external view returns (uint256[] memory collaterals, uint256 honey);
```

### previewRedeemCollaterals

Computes the obtainable amount of collateral(s) for a given amount of Honey.

**Note:** The `asset` parameter is ignored if running in basket mode.

```solidity
function previewRedeemCollaterals(
    address asset,
    uint256 honey
) external view returns (uint256[] memory collaterals);
```

### previewRedeemCollateralsWithPrices

Same as `previewRedeemCollaterals` but uses provided prices instead of oracle prices.

```solidity
function previewRedeemCollateralsWithPrices(
    address asset,
    uint256 honey,
    uint256[] memory prices
) external view returns (uint256[] memory collaterals);
```

### previewRedeemHoney

Given one desired collateral amount, computes the required Honey amount and obtainable collateral amounts.

**Note:** If basket mode is enabled, the required Honey amount will provide other collaterals besides the requested amount.

```solidity
function previewRedeemHoney(
    address asset,
    uint256 amount
) external view returns (uint256[] memory collaterals, uint256 honey);
```

### previewRedeemHoneyWithPrices

Same as `previewRedeemHoney` but uses provided prices instead of oracle prices.

```solidity
function previewRedeemHoneyWithPrices(
    address asset,
    uint256 amount,
    uint256[] memory prices
) external view returns (uint256[] memory collaterals, uint256 honey);
```

### isBasketModeEnabledWithPrices

Checks if basket mode would be enabled with the provided prices.

```solidity
function isBasketModeEnabledWithPrices(
    bool isMint,
    uint256[] memory prices
) external view returns (bool basketMode);
```

### isPeggedWithPrice

Checks if an asset would be considered pegged at the provided price.

```solidity
function isPeggedWithPrice(
    address asset,
    uint256 price
) external view returns (bool);
```

## Functions

### initialize

Initializes the contract with admin and HoneyFactory addresses. Can only be called once.

**Errors:**
- `ZeroAddress`: If `honeyFactory_` is the zero address

```solidity
function initialize(address admin, address honeyFactory_) external initializer;
```

## Errors

### ZeroAddress
```solidity
error ZeroAddress();
```
Thrown when attempting to initialize with a zero address.

### Other Errors
The contract inherits additional errors from IHoneyErrors that may be relevant in the broader system context.