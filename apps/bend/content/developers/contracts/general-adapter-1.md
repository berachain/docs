---
head:
  - - meta
    - property: og:title
      content: General Adapter 1 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the General Adapter 1 contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the General Adapter 1 contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# General Adapter 1

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.generalAdapter1.address + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.contracts.bend.generalAdapter1.address}}</a> | [Git Source](https://github.com/morpho-org/bundler3/blob/main/src/adapters/GeneralAdapter1.sol)</small>

**Inherits:** [CoreAdapter](https://github.com/morpho-org/bundler3/blob/main/src/adapters/CoreAdapter.sol)

## State Variables

### MORPHO

The address of the Morpho contract.

```solidity
IMorpho public immutable MORPHO
```

### WRAPPED_NATIVE

The address of the wrapped native token.

```solidity
IWNative public immutable WRAPPED_NATIVE
```

## Functions

### constructor

```solidity
constructor(address bundler3, address morpho, address wNative) CoreAdapter(bundler3);
```

**Parameters**

| Name       | Type      | Description                                        |
| ---------- | --------- | -------------------------------------------------- |
| `bundler3` | `address` | The address of the Bundler3 contract.              |
| `morpho`   | `address` | The address of the Morpho protocol.                |
| `wNative`  | `address` | The address of the canonical native token wrapper. |

### erc4626Mint

Mints shares of an ERC4626 vault.

Underlying tokens must have been previously sent to the adapter.

Assumes the given vault implements EIP-4626.

```solidity
function erc4626Mint(address vault, uint256 shares, uint256 maxSharePriceE27, address receiver)
    external
    onlyBundler3;
```

**Parameters**

| Name               | Type      | Description                                                         |
| ------------------ | --------- | ------------------------------------------------------------------- |
| `vault`            | `address` | The address of the vault.                                           |
| `shares`           | `uint256` | The amount of vault shares to mint.                                 |
| `maxSharePriceE27` | `uint256` | The maximum amount of assets to pay to get 1 share, scaled by 1e27. |
| `receiver`         | `address` | The address to which shares will be minted.                         |

### erc4626Deposit

Deposits underlying token in an ERC4626 vault.

Underlying tokens must have been previously sent to the adapter.

Assumes the given vault implements EIP-4626.

```solidity
function erc4626Deposit(address vault, uint256 assets, uint256 maxSharePriceE27, address receiver)
    external
    onlyBundler3;
```

**Parameters**

| Name               | Type      | Description                                                                                        |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| `vault`            | `address` | The address of the vault.                                                                          |
| `assets`           | `uint256` | The amount of underlying token to deposit. Pass `type(uint).max` to deposit the adapter's balance. |
| `maxSharePriceE27` | `uint256` | The maximum amount of assets to pay to get 1 share, scaled by 1e27.                                |
| `receiver`         | `address` | The address to which shares will be minted.                                                        |

### erc4626Withdraw

Withdraws underlying token from an ERC4626 vault.

Assumes the given `vault` implements EIP-4626.

If `owner` is the initiator, they must have previously approved the adapter to spend their vault shares.
Otherwise, vault shares must have been previously sent to the adapter.

```solidity
function erc4626Withdraw(address vault, uint256 assets, uint256 minSharePriceE27, address receiver, address owner)
    external
    onlyBundler3;
```

**Parameters**

| Name               | Type      | Description                                                                                        |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| `vault`            | `address` | The address of the vault.                                                                          |
| `assets`           | `uint256` | The amount of underlying token to withdraw.                                                        |
| `minSharePriceE27` | `uint256` | The minimum number of assets to receive per share, scaled by 1e27.                                 |
| `receiver`         | `address` | The address that will receive the withdrawn assets.                                                |
| `owner`            | `address` | The address on behalf of which the assets are withdrawn. Can only be the adapter or the initiator. |

### erc4626Redeem

Redeems shares of an ERC4626 vault.

Assumes the given `vault` implements EIP-4626.

If `owner` is the initiator, they must have previously approved the adapter to spend their vault shares.
Otherwise, vault shares must have been previously sent to the adapter.

```solidity
function erc4626Redeem(address vault, uint256 shares, uint256 minSharePriceE27, address receiver, address owner)
    external
    onlyBundler3;
```

**Parameters**

| Name               | Type      | Description                                                                                       |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------- |
| `vault`            | `address` | The address of the vault.                                                                         |
| `shares`           | `uint256` | The amount of vault shares to redeem. Pass `type(uint).max` to redeem the owner's shares.         |
| `minSharePriceE27` | `uint256` | The minimum number of assets to receive per share, scaled by 1e27.                                |
| `receiver`         | `address` | The address that will receive the withdrawn assets.                                               |
| `owner`            | `address` | The address on behalf of which the shares are redeemed. Can only be the adapter or the initiator. |

### onMorphoSupply

Receives supply callback from the Morpho contract.

```solidity
function onMorphoSupply(uint256, bytes calldata data) external;
```

**Parameters**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` |                                         |
| `data`   | `bytes`   | Bytes containing an abi-encoded Call[]. |

### onMorphoSupplyCollateral

Receives supply collateral callback from the Morpho contract.

```solidity
function onMorphoSupplyCollateral(uint256, bytes calldata data) external;
```

**Parameters**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` |                                         |
| `data`   | `bytes`   | Bytes containing an abi-encoded Call[]. |

### onMorphoRepay

Receives repay callback from the Morpho contract.

```solidity
function onMorphoRepay(uint256, bytes calldata data) external;
```

**Parameters**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` |                                         |
| `data`   | `bytes`   | Bytes containing an abi-encoded Call[]. |

### onMorphoFlashLoan

Receives flashloan callback from the Morpho contract.

```solidity
function onMorphoFlashLoan(uint256, bytes calldata data) external;
```

**Parameters**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `uint256` |                                         |
| `data`   | `bytes`   | Bytes containing an abi-encoded Call[]. |

### morphoSupply

Supplies loan asset on Morpho.

Either `assets` or `shares` should be zero. Most usecases should rely on `assets` as an input so the
adapter is guaranteed to have `assets` tokens pulled from its balance, but the possibility to mint a specific
amount of shares is given for full compatibility and precision.

Loan tokens must have been previously sent to the adapter.

```solidity
function morphoSupply(
    MarketParams calldata marketParams,
    uint256 assets,
    uint256 shares,
    uint256 maxSharePriceE27,
    address onBehalf,
    bytes calldata data
) external onlyBundler3;
```

**Parameters**

| Name               | Type           | Description                                                                                       |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------- |
| `marketParams`     | `MarketParams` | The Morpho market to supply assets to.                                                            |
| `assets`           | `uint256`      | The amount of assets to supply. Pass `type(uint).max` to supply the adapter's loan asset balance. |
| `shares`           | `uint256`      | The amount of shares to mint.                                                                     |
| `maxSharePriceE27` | `uint256`      | The maximum amount of assets supplied per minted share, scaled by 1e27.                           |
| `onBehalf`         | `address`      | The address that will own the increased supply position.                                          |
| `data`             | `bytes`        | Arbitrary data to pass to the `onMorphoSupply` callback. Pass empty data if not needed.           |

### morphoSupplyCollateral

Supplies collateral on Morpho.

Collateral tokens must have been previously sent to the adapter.

```solidity
function morphoSupplyCollateral(
    MarketParams calldata marketParams,
    uint256 assets,
    address onBehalf,
    bytes calldata data
) external onlyBundler3;
```

**Parameters**

| Name           | Type           | Description                                                                                           |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `marketParams` | `MarketParams` | The Morpho market to supply collateral to.                                                            |
| `assets`       | `uint256`      | The amount of collateral to supply. Pass `type(uint).max` to supply the adapter's collateral balance. |
| `onBehalf`     | `address`      | The address that will own the increased collateral position.                                          |
| `data`         | `bytes`        | Arbitrary data to pass to the `onMorphoSupplyCollateral` callback. Pass empty data if not needed.     |

### morphoBorrow

Borrows assets on Morpho.

Either `assets` or `shares` should be zero. Most usecases should rely on `assets` as an input so the
initiator is guaranteed to borrow `assets` tokens, but the possibility to mint a specific amount of shares is
given for full compatibility and precision.

Initiator must have previously authorized the adapter to act on their behalf on Morpho.

```solidity
function morphoBorrow(
    MarketParams calldata marketParams,
    uint256 assets,
    uint256 shares,
    uint256 minSharePriceE27,
    address receiver
) external onlyBundler3;
```

**Parameters**

| Name               | Type           | Description                                                                    |
| ------------------ | -------------- | ------------------------------------------------------------------------------ |
| `marketParams`     | `MarketParams` | The Morpho market to borrow assets from.                                       |
| `assets`           | `uint256`      | The amount of assets to borrow.                                                |
| `shares`           | `uint256`      | The amount of shares to mint.                                                  |
| `minSharePriceE27` | `uint256`      | The minimum amount of assets borrowed per borrow share minted, scaled by 1e27. |
| `receiver`         | `address`      | The address that will receive the borrowed assets.                             |

### morphoRepay

Repays assets on Morpho.

Either `assets` or `shares` should be zero. Most usecases should rely on `assets` as an input so the
adapter is guaranteed to have `assets` tokens pulled from its balance, but the possibility to burn a specific
amount of shares is given for full compatibility and precision.

Loan tokens must have been previously sent to the adapter.

```solidity
function morphoRepay(
    MarketParams calldata marketParams,
    uint256 assets,
    uint256 shares,
    uint256 maxSharePriceE27,
    address onBehalf,
    bytes calldata data
) external onlyBundler3;
```

**Parameters**

| Name               | Type           | Description                                                                                     |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------- |
| `marketParams`     | `MarketParams` | The Morpho market to repay assets to.                                                           |
| `assets`           | `uint256`      | The amount of assets to repay. Pass `type(uint).max` to repay the adapter's loan asset balance. |
| `shares`           | `uint256`      | The amount of shares to burn. Pass `type(uint).max` to repay the initiator's entire debt.       |
| `maxSharePriceE27` | `uint256`      | The maximum amount of assets repaid per borrow share burned, scaled by 1e27.                    |
| `onBehalf`         | `address`      | The address of the owner of the debt position.                                                  |
| `data`             | `bytes`        | Arbitrary data to pass to the `onMorphoRepay` callback. Pass empty data if not needed.          |

### morphoWithdraw

Withdraws assets on Morpho.

Either `assets` or `shares` should be zero. Most usecases should rely on `assets` as an input so the
initiator is guaranteed to withdraw `assets` tokens, but the possibility to burn a specific amount of shares is
given for full compatibility and precision.

Initiator must have previously authorized the module to act on their behalf on Morpho.

```solidity
function morphoWithdraw(
    MarketParams calldata marketParams,
    uint256 assets,
    uint256 shares,
    uint256 minSharePriceE27,
    address receiver
) external onlyBundler3;
```

**Parameters**

| Name               | Type           | Description                                                                                    |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------- |
| `marketParams`     | `MarketParams` | The Morpho market to withdraw assets from.                                                     |
| `assets`           | `uint256`      | The amount of assets to withdraw.                                                              |
| `shares`           | `uint256`      | The amount of shares to burn. Pass `type(uint).max` to burn all the initiator's supply shares. |
| `minSharePriceE27` | `uint256`      | The minimum amount of assets withdraw per burn share, scaled by 1e27.                          |
| `receiver`         | `address`      | The address that will receive the withdrawn assets.                                            |

### morphoWithdrawCollateral

Withdraws collateral from Morpho.

Initiator must have previously authorized the adapter to act on their behalf on Morpho.

```solidity
function morphoWithdrawCollateral(MarketParams calldata marketParams, uint256 assets, address receiver)
    external
    onlyBundler3;
```

**Parameters**

| Name           | Type           | Description                                                                                                 |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| `marketParams` | `MarketParams` | The Morpho market to withdraw collateral from.                                                              |
| `assets`       | `uint256`      | The amount of collateral to withdraw. Pass `type(uint).max` to withdraw the initiator's collateral balance. |
| `receiver`     | `address`      | The address that will receive the collateral assets.                                                        |

### morphoFlashLoan

Triggers a flash loan on Morpho.

```solidity
function morphoFlashLoan(address token, uint256 assets, bytes calldata data) external onlyBundler3;
```

**Parameters**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `token`  | `address` | The address of the token to flash loan.                     |
| `assets` | `uint256` | The amount of assets to flash loan.                         |
| `data`   | `bytes`   | Arbitrary data to pass to the `onMorphoFlashLoan` callback. |

### permit2TransferFrom

Transfers with Permit2.

```solidity
function permit2TransferFrom(address token, address receiver, uint256 amount) external onlyBundler3;
```

**Parameters**

| Name       | Type      | Description                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------------- |
| `token`    | `address` | The address of the ERC20 token to transfer.                                                 |
| `receiver` | `address` | The address that will receive the tokens.                                                   |
| `amount`   | `uint256` | The amount of token to transfer. Pass `type(uint).max` to transfer the initiator's balance. |

### erc20TransferFrom

Transfers ERC20 tokens from the initiator.

Initiator must have given sufficient allowance to the Adapter to spend their tokens.

```solidity
function erc20TransferFrom(address token, address receiver, uint256 amount) external onlyBundler3;
```

**Parameters**

| Name       | Type      | Description                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------------- |
| `token`    | `address` | The address of the ERC20 token to transfer.                                                 |
| `receiver` | `address` | The address that will receive the tokens.                                                   |
| `amount`   | `uint256` | The amount of token to transfer. Pass `type(uint).max` to transfer the initiator's balance. |

### wrapNative

Wraps native tokens to wNative.

Native tokens must have been previously sent to the adapter.

```solidity
function wrapNative(uint256 amount, address receiver) external onlyBundler3;
```

**Parameters**

| Name       | Type      | Description                                                                              |
| ---------- | --------- | ---------------------------------------------------------------------------------------- |
| `amount`   | `uint256` | The amount of native token to wrap. Pass `type(uint).max` to wrap the adapter's balance. |
| `receiver` | `address` | The account receiving the wrapped native tokens.                                         |

### unwrapNative

Unwraps wNative tokens to the native token.

Wrapped native tokens must have been previously sent to the adapter.

```solidity
function unwrapNative(uint256 amount, address receiver) external onlyBundler3;
```

**Parameters**

| Name       | Type      | Description                                                                                          |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `amount`   | `uint256` | The amount of wrapped native token to unwrap. Pass `type(uint).max` to unwrap the adapter's balance. |
| `receiver` | `address` | The account receiving the native tokens.                                                             |

### morphoCallback

Triggers `_multicall` logic during a callback.

```solidity
function morphoCallback(bytes calldata data) internal;
```
