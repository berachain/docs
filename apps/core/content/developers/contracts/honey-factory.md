<script setup>
  import config from '@berachain/config/constants.json';
</script>

# VaultRouter

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.honeyFactory.address">{{config.contracts.honeyFactory.address}}</a><span v-if="config.contracts.honeyFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honeyFactory.abi">ABI JSON</a></span></small>

This is the router contract for minting and redeeming Honey.

## State Variables

### ONE_HUNDRED_PERCENT_RATE

_The constant representing 100% of mint/redeem rate._

```solidity
uint256 private constant ONE_HUNDRED_PERCENT_RATE = 1e18;
```

### honey

The Honey token contract.

```solidity
Honey public honey;
```

### mintRates

Mint rate of Honey for each asset, 60.18-decimal fixed-point number representation

```solidity
mapping(ERC20 asset => uint256 rate) internal mintRates;
```

### redeemRates

Redemption rate of Honey for each asset, 60.18-decimal fixed-point number representation

```solidity
mapping(ERC20 asset => uint256 rate) internal redeemRates;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(address _governance, Honey _honey) external initializer;
```

### setMintRate

Set the mint rate of Honey for an asset.

```solidity
function setMintRate(ERC20 asset, uint256 mintRate) external onlyOwner;
```

### setRedeemRate

Set the redemption rate of Honey for an asset.

```solidity
function setRedeemRate(ERC20 asset, uint256 redeemRate) external onlyOwner;
```

### checkInvariants

_Check the invariant of the vault to ensure_

_that assets are always sufficient to redeem._

```solidity
modifier checkInvariants(ERC20 asset);
```

### mint

_Mint Honey by sending ERC20 to this contract._

```solidity
function mint(
    address asset,
    uint256 amount,
    address receiver
)
    external
    onlyRegisteredAsset(ERC20(asset))
    whenNotPaused
    checkInvariants(ERC20(asset))
    returns (uint256);
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

_Redeem assets by sending Honey in to burn._

```solidity
function redeem(
    address asset,
    uint256 honeyAmount,
    address receiver
)
    external
    onlyRegisteredAsset(ERC20(asset))
    whenNotPaused
    checkInvariants(ERC20(asset))
    returns (uint256);
```

**Parameters**

| Name          | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `asset`       | `address` |                                       |
| `honeyAmount` | `uint256` | The amount of Honey to redeem.        |
| `receiver`    | `address` | The address that will receive assets. |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | The amount of assets redeemed. |

### previewMint

_Get the amount of Honey that can be minted with the given ERC20._

```solidity
function previewMint(address asset, uint256 amount) external view returns (uint256 honeyAmount);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `asset`  | `address` | The ERC20 to mint with.           |
| `amount` | `uint256` | The amount of ERC20 to mint with. |

**Returns**

| Name          | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `honeyAmount` | `uint256` | The amount of Honey that can be minted. |

### previewRedeem

_Get the amount of ERC20 that can be redeemed with the given Honey._

```solidity
function previewRedeem(address asset, uint256 honeyAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `asset`       | `address` | The ERC20 to redeem.           |
| `honeyAmount` | `uint256` | The amount of Honey to redeem. |

**Returns**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `<none>` | `uint256` | The amount of ERC20 that can be redeemed. |

### previewRequiredCollateral

_Previews the amount of ERC20 required to mint an exact amount of honey._

```solidity
function previewRequiredCollateral(address asset, uint256 exactHoneyAmount) external view returns (uint256);
```

**Parameters**

| Name               | Type      | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `asset`            | `address` | The ERC20 asset to use.            |
| `exactHoneyAmount` | `uint256` | The exact amount of honey to mint. |

### previewHoneyToRedeem

_Previews the amount of honey required to redeem an exact amount of target ERC20 asset._

```solidity
function previewHoneyToRedeem(address asset, uint256 exactAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `asset`       | `address` | The ERC20 asset to receive.            |
| `exactAmount` | `uint256` | The exact amount of assets to receive. |

### getMintRate

_Get the mint rate of the asset._

```solidity
function getMintRate(address asset) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description                           |
| ------- | --------- | ------------------------------------- |
| `asset` | `address` | The ERC20 asset to get the mint rate. |

**Returns**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `<none>` | `uint256` | The mint rate of the asset. |

### getRedeemRate

_Get the redeem rate of the asset._

```solidity
function getRedeemRate(address asset) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description                             |
| ------- | --------- | --------------------------------------- |
| `asset` | `address` | The ERC20 asset to get the redeem rate. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `uint256` | The redeem rate of the asset. |

### \_getHoneyMintedFromShares

```solidity
function _getHoneyMintedFromShares(
    ERC20 asset,
    uint256 shares
)
    internal
    view
    returns (uint256 honeyAmount, uint256 feeShares);
```

### \_getSharesRedeemedFromHoney

```solidity
function _getSharesRedeemedFromHoney(
    ERC20 asset,
    uint256 honeyAmount
)
    internal
    view
    returns (uint256 shares, uint256 feeShares);
```

### \_getMintRate

```solidity
function _getMintRate(ERC20 asset) internal view returns (uint256);
```

### \_getRedeemRate

```solidity
function _getRedeemRate(ERC20 asset) internal view returns (uint256);
```
