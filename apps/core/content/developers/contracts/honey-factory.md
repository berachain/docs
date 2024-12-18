<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.honeyFactory.address">{{config.contracts.honeyFactory.address}}</a><span v-if="config.contracts.honeyFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honeyFactory.abi">ABI JSON</a></span></small>

This is the router contract for minting and redeeming Honey.

## Functions

### mint

Mint Honey by sending ERC20 to this contract.

_Assest must be registered and must be a good collateral._

```solidity
function mint(address asset, uint256 amount, address receiver) external returns (uint256);
```

**Parameters**

| Name       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `asset`    | `address` |                                      |
| `amount`   | `uint256` | The amount of ERC20 to mint with.    |
| `receiver` | `address` | The address that will receive Honey. |

**Returns**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `<none>` | `uint256` | The amount of Honey minted. |

### redeem

Redeem assets by sending Honey in to burn.

```solidity
function redeem(address asset, uint256 honeyAmount, address receiver) external returns (uint256[] memory);
```

**Parameters**

| Name          | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `asset`       | `address` |                                       |
| `honeyAmount` | `uint256` | The amount of Honey to redeem.        |
| `receiver`    | `address` | The address that will receive assets. |

**Returns**

| Name     | Type        | Description                    |
| -------- | ----------- | ------------------------------ |
| `<none>` | `uint256[]` | The amount of assets redeemed. |

### liquidate

Liquidate a bad collateral asset.

```solidity
function liquidate(
    address badCollateral,
    address goodCollateral,
    uint256 goodAmount
)
    external
    returns (uint256 badAmount);
```

**Parameters**

| Name             | Type      | Description                          |
| ---------------- | --------- | ------------------------------------ |
| `badCollateral`  | `address` | The ERC20 asset to liquidate.        |
| `goodCollateral` | `address` | The ERC20 asset to provide in place. |
| `goodAmount`     | `uint256` | The amount provided.                 |

**Returns**

| Name        | Type      | Description          |
| ----------- | --------- | -------------------- |
| `badAmount` | `uint256` | The amount obtained. |

### recapitalize

Recapitalize a collateral vault.

```solidity
function recapitalize(address asset, uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `asset`  | `address` | The ERC20 asset to recapitalize. |
| `amount` | `uint256` | The amount provided.             |

### isBasketModeEnabled

Get the status of the basket mode.

_On mint, basket mode is enabled if all collaterals are either depegged or bad._

_On redeem, basket mode is enabled if at least one asset is deppegged
except for the collateral assets that have been fully liquidated._

```solidity
function isBasketModeEnabled(bool isMint) public view returns (bool basketMode);
```

## Events

### MintRateSet

Emitted when a mint rate is set for an asset.

```solidity
event MintRateSet(address indexed asset, uint256 rate);
```

### RedeemRateSet

Emitted when a redemption rate is set for an asset.

```solidity
event RedeemRateSet(address indexed asset, uint256 rate);
```

### POLFeeCollectorFeeRateSet

Emitted when the POLFeeCollector fee rate is set.

```solidity
event POLFeeCollectorFeeRateSet(uint256 rate);
```

### HoneyMinted

Emitted when honey is minted

```solidity
event HoneyMinted(
    address indexed from, address indexed to, address indexed asset, uint256 assetAmount, uint256 mintAmount
);
```

**Parameters**

| Name          | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| `from`        | `address` | The account that supplied assets for the minted honey. |
| `to`          | `address` | The account that received the honey.                   |
| `asset`       | `address` | The asset used to mint the honey.                      |
| `assetAmount` | `uint256` | The amount of assets supplied for minting the honey.   |
| `mintAmount`  | `uint256` | The amount of honey that was minted.                   |

### HoneyRedeemed

Emitted when honey is redeemed

```solidity
event HoneyRedeemed(
    address indexed from, address indexed to, address indexed asset, uint256 assetAmount, uint256 redeemAmount
);
```

**Parameters**

| Name           | Type      | Description                                            |
| -------------- | --------- | ------------------------------------------------------ |
| `from`         | `address` | The account that redeemed the honey.                   |
| `to`           | `address` | The account that received the assets.                  |
| `asset`        | `address` | The asset for redeeming the honey.                     |
| `assetAmount`  | `uint256` | The amount of assets received for redeeming the honey. |
| `redeemAmount` | `uint256` | The amount of honey that was redeemed.                 |

### BasketModeForced

Emitted when the basked mode is forced.

```solidity
event BasketModeForced(bool forced);
```

**Parameters**

| Name     | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `forced` | `bool` | The flag that represent the forced basket mode. |

### DepegOffsetsSet

Emitted when the depeg offsets are changed.

```solidity
event DepegOffsetsSet(address asset, uint256 lower, uint256 upper);
```

**Parameters**

| Name    | Type      | Description                                   |
| ------- | --------- | --------------------------------------------- |
| `asset` | `address` | The asset that the depeg offsets are changed. |
| `lower` | `uint256` | The lower depeg offset.                       |
| `upper` | `uint256` | The upper depeg offset.                       |

### LiquidationStatusSet

Emitted when the liquidation is enabled or disabled.

```solidity
event LiquidationStatusSet(bool enabled);
```

**Parameters**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `enabled` | `bool` | The flag that represent the liquidation status. |

### ReferenceCollateralSet

Emitted when the reference collateral is set.

```solidity
event ReferenceCollateralSet(address old, address asset);
```

**Parameters**

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| `old`   | `address` | The old reference collateral. |
| `asset` | `address` | The new reference collateral. |

### RecapitalizeBalanceThresholdSet

Emitted when the recapitalize balance threshold is set.

```solidity
event RecapitalizeBalanceThresholdSet(address asset, uint256 target);
```

**Parameters**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `asset`  | `address` | The asset that the recapitalize balance threshold is set. |
| `target` | `uint256` | The target balance threshold.                             |

### MinSharesToRecapitalizeSet

Emitted when the min shares to recapitalize is set.

```solidity
event MinSharesToRecapitalizeSet(uint256 minShareAmount);
```

**Parameters**

| Name             | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `minShareAmount` | `uint256` | The min shares to recapitalize. |

### MaxFeedDelaySet

Emitted when the max feed delay is set.

```solidity
event MaxFeedDelaySet(uint256 maxFeedDelay);
```

**Parameters**

| Name           | Type      | Description         |
| -------------- | --------- | ------------------- |
| `maxFeedDelay` | `uint256` | The max feed delay. |

### LiquidationRateSet

Emitted when the liquidation rate is set.

```solidity
event LiquidationRateSet(address asset, uint256 rate);
```

**Parameters**

| Name    | Type      | Description                                 |
| ------- | --------- | ------------------------------------------- |
| `asset` | `address` | The asset that the liquidation rate is set. |
| `rate`  | `uint256` | The liquidation rate.                       |

### GlobalCapSet

Emitted when the global cap is set.

```solidity
event GlobalCapSet(uint256 globalCap);
```

**Parameters**

| Name        | Type      | Description     |
| ----------- | --------- | --------------- |
| `globalCap` | `uint256` | The global cap. |

### RelativeCapSet

Emitted when the relative cap is set.

```solidity
event RelativeCapSet(address asset, uint256 relativeCap);
```

**Parameters**

| Name          | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `asset`       | `address` | The asset that the relative cap is set. |
| `relativeCap` | `uint256` | The relative cap.                       |

### Liquidated

Emitted when the liquidate is performed.

```solidity
event Liquidated(address badAsset, address goodAsset, uint256 amount, address sender);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `badAsset`  | `address` | The bad asset that is liquidated.           |
| `goodAsset` | `address` | The good asset that is provided.            |
| `amount`    | `uint256` | The amount of good asset provided.          |
| `sender`    | `address` | The account that performed the liquidation. |

### Recapitalized

Emitted when the collateral vault is recapitalized.

```solidity
event Recapitalized(address asset, uint256 amount, address sender);
```

**Parameters**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `asset`  | `address` | The asset that is recapitalized.                 |
| `amount` | `uint256` | The amount of asset provided.                    |
| `sender` | `address` | The account that performed the recapitalization. |
