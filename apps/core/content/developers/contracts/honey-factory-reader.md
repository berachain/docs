<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactoryReader

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.honeyFactoryReader.address">{{config.contracts.honeyFactoryReader.address}}</a><span v-if="config.contracts.honeyFactoryReader.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honeyFactoryReader.abi">ABI JSON</a></span></small>

The Honey Factory Reader contract is responsible for providing previews of minting/redeeming HONEY.

## Functions

### previewMint

Get the amount of Honey that can be minted with the given ERC20.

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

Get the amount of ERC20 that can be redeemed with the given Honey.

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

Previews the amount of ERC20 required to mint an exact amount of honey.

```solidity
function previewRequiredCollateral(
    address asset,
    uint256 exactHoneyAmount
)
    external
    view
    returns (uint256[] memory res);
```

**Parameters**

| Name               | Type      | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `asset`            | `address` | The ERC20 asset to use.            |
| `exactHoneyAmount` | `uint256` | The exact amount of honey to mint. |

### previewRedeemBasketMode

Previews the amount of ERC20 assets that can be redeemed from honey.

```solidity
function previewRedeemBasketMode(uint256 honeyAmount) external view returns (uint256[] memory res);
```

**Parameters**

| Name          | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `honeyAmount` | `uint256` | The amount of honey to use for redeeming collaterals. |

**Returns**

| Name  | Type        | Description                                      |
| ----- | ----------- | ------------------------------------------------ |
| `res` | `uint256[]` | The amount of ERC20 assets that can be redeemed. |

### previewHoneyToRedeem

Previews the amount of honey required to redeem an exact amount of target ERC20 asset.

```solidity
function previewHoneyToRedeem(address asset, uint256 exactAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `asset`       | `address` | The ERC20 asset to receive.            |
| `exactAmount` | `uint256` | The exact amount of assets to receive. |
