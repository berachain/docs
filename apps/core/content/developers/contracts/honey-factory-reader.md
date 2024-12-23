<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactoryReader

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.honeyFactoryReader.address">{{config.contracts.honeyFactoryReader.address}}</a><span v-if="config.contracts.honeyFactoryReader.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honeyFactoryReader.abi">ABI JSON</a></span></small>

# HoneyFactoryReader

This is a helper contract that provides view functions for previewing mint and redeem operations for the Honey Factory.

## State Variables

### honeyFactory

The HoneyFactory contract reference.

```solidity
HoneyFactory public honeyFactory;
```

## Functions

### constructor

Initializes the contract with the HoneyFactory address.
Reverts with `ZeroAddress` if the address is zero.

```solidity
constructor(address honeyFactory_);
```

**Parameters**

| Name           | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| `honeyFactory_`| `address` | The HoneyFactory contract address |

### previewMint

Get the amount of Honey that can be minted with a given stablecoin collateral.

```solidity
function previewMint(
    address asset,
    uint256 amount
) external view returns (uint256 honeyAmount);
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `asset`  | `address` | The stablecoin collateral to mint with     |
| `amount` | `uint256` | The amount of stablecoin to mint with      |

**Returns**

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `honeyAmount` | `uint256` | The amount of Honey that can be minted |

### previewRedeem

Get the amount of stablecoin collateral that can be redeemed with a given amount of Honey.

```solidity
function previewRedeem(
    address asset,
    uint256 honeyAmount
) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `asset`       | `address` | The stablecoin collateral to redeem  |
| `honeyAmount` | `uint256` | The amount of Honey to redeem        |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of stablecoin collateral that can be redeemed |

### previewRequiredCollateral

Preview the amount of stablecoin collateral required to mint an exact amount of Honey.

```solidity
function previewRequiredCollateral(
    address asset,
    uint256 exactHoneyAmount
) external view returns (uint256[] memory);
```

**Parameters**

| Name              | Type      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| `asset`           | `address` | The stablecoin collateral asset to use              |
| `exactHoneyAmount`| `uint256` | The exact amount of Honey to mint   |

**Returns**

| Name     | Type        | Description                                |
| -------- | ----------- | ------------------------------------------ |
| `<none>` | `uint256[]` | Array of required collateral amounts       |

### previewHoneyToRedeem

Preview the amount of Honey required to redeem an exact amount of the target stablecoin collateral asset.

```solidity
function previewHoneyToRedeem(
    address asset,
    uint256 exactAmount
) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `asset`       | `address` | The stablecoin collateral asset to receive            |
| `exactAmount` | `uint256` | The exact amount of assets to receive |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The amount of Honey needed to redeem |

## Internal Functions

### _getCollaterals

Get the list of registered collateral assets.

```solidity
function _getCollaterals() internal view returns (address[] memory collaterals, uint256 num);
```

**Returns**

| Name          | Type        | Description                           |
| ------------- | ----------- | ------------------------------------- |
| `collaterals` | `address[]` | Array of registered collateral addresses |
| `num`         | `uint256`   | Number of registered collaterals      |

### _getHoneyMintedFromShares

Calculate the amount of Honey minted from shares.

```solidity
function _getHoneyMintedFromShares(
    address asset,
    uint256 shares
) internal view returns (uint256 honeyAmount);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset`  | `address` | The collateral asset           |
| `shares` | `uint256` | The amount of shares           |

**Returns**

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `honeyAmount` | `uint256` | The amount of Honey to be minted     |

### _getSharesRedeemedFromHoney

Calculate the amount of shares redeemed from Honey.

```solidity
function _getSharesRedeemedFromHoney(
    address asset,
    uint256 honeyAmount
) internal view returns (uint256 shares);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `asset`       | `address` | The collateral asset           |
| `honeyAmount` | `uint256` | The amount of Honey            |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `shares` | `uint256` | The amount of shares to be redeemed  |