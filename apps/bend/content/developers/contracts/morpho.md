---
head:
  - - meta
    - property: og:title
      content: Morpho Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Morpho contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Morpho contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Morpho

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.morpho.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.morpho.address.berachainMainnet}}</a> | [Git Source](https://github.com/berachain/morpho-blue/blob/main/src/Morpho.sol)</small>

**Inherits:** [IMorphoStaticTyping](https://github.com/berachain/morpho-blue/blob/main/src/interfaces/IMorpho.sol#L299)

## State Variables

### DOMAIN_SEPARATOR

The EIP-712 domain separator.

Warning: Every EIP-712 signed message based on this domain separator can be reused on chains sharing the
same chain id and on forks because the domain separator would be the same.

```solidity
bytes32 public immutable DOMAIN_SEPARATOR
```

### owner

The owner of the contract.

It has the power to change the owner.

```solidity
address public owner
```

### feeRecipient

The fee recipient of all markets.

The recipient receives the fees of a given market through a supply position on that market.

```solidity
address public feeRecipient
```

### position

```solidity
mapping(Id => mapping(address => Position)) public position
```

### market

```solidity
mapping(Id => Market) public market
```

### isIrmEnabled

```solidity
mapping(address => bool) public isIrmEnabled
```

### isLltvEnabled

```solidity
mapping(uint256 => bool) public isLltvEnabled
```

### isAuthorized

```solidity
mapping(address => mapping(address => bool)) public isAuthorized
```

### nonce

```solidity
mapping(address => uint256) public nonce
```

### idToMarketParams

```solidity
mapping(Id => MarketParams) public idToMarketParams
```

### defaultMarketFee

The default market fee

```solidity
uint256 public defaultMarketFee
```

## Functions

### constructor

```solidity
constructor(address newOwner) ;
```

**Parameters**

| Name       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `newOwner` | `address` | The new owner of the contract. |

### onlyOwner

Reverts if the caller is not the owner.

```solidity
modifier onlyOwner() ;
```

### setOwner

Sets `newOwner` as `owner` of the contract.

Warning: No two-step transfer ownership.

```solidity
function setOwner(address newOwner) external onlyOwner;
```

### enableIrm

Enables `irm` as a possible IRM for market creation.

Warning: It is not possible to disable an IRM.

```solidity
function enableIrm(address irm) external onlyOwner;
```

### enableLltv

Enables `lltv` as a possible LLTV for market creation.

Warning: It is not possible to disable a LLTV.

```solidity
function enableLltv(uint256 lltv) external onlyOwner;
```

### setFee

Sets the `newFee` for the given market `marketParams`.

Warning: The recipient can be the zero address.

```solidity
function setFee(MarketParams memory marketParams, uint256 newFee) external onlyOwner;
```

**Parameters**

| Name           | Type           | Description                 |
| -------------- | -------------- | --------------------------- |
| `marketParams` | `MarketParams` |                             |
| `newFee`       | `uint256`      | The new fee, scaled by WAD. |

### setFeeRecipient

Sets `newFeeRecipient` as `feeRecipient` of the fee.

Warning: If the fee recipient is set to the zero address, fees will accrue there and will be lost.

```solidity
function setFeeRecipient(address newFeeRecipient) external onlyOwner;
```

### setDefaultMarketFee

Sets the new default market fee for all the future markets.

This won't affect the markets already created with the previous value.

```solidity
function setDefaultMarketFee(uint256 newFee) external onlyOwner;
```

### createMarket

Creates the market `marketParams`.

Here is the list of assumptions on the market's dependencies (tokens, IRM and oracle) that guarantees
Morpho behaves as expected:

- The token should be ERC-20 compliant, except that it can omit return values on `transfer` and `transferFrom`.
- The token balance of Morpho should only decrease on `transfer` and `transferFrom`. In particular, tokens with
  burn functions are not supported.
- The token should not re-enter Morpho on `transfer` nor `transferFrom`.
- The token balance of the sender (resp. receiver) should decrease (resp. increase) by exactly the given amount
  on `transfer` and `transferFrom`. In particular, tokens with fees on transfer are not supported.
- The IRM should not re-enter Morpho.
- The oracle should return a price with the correct scaling.
- The oracle price should not be able to change instantly such that the new price is less than the old price
  multiplied by LLTV\*LIF. In particular, if the loan asset is a vault that can receive donations, the oracle
  should not price its shares using the AUM.

```solidity
function createMarket(MarketParams memory marketParams) external;
```

### supply

Supplies `assets` or `shares` on behalf of `onBehalf`, optionally calling back the caller's
`onMorphoSupply` function with the given `data`.

Either `assets` or `shares` should be zero. Most use cases should rely on `assets` as an input so the
caller is guaranteed to have `assets` tokens pulled from their balance, but the possibility to mint a specific
amount of shares is given for full compatibility and precision.

```solidity
function supply(
    MarketParams memory marketParams,
    uint256 assets,
    uint256 shares,
    address onBehalf,
    bytes calldata data
) external returns (uint256, uint256);
```

**Parameters**

| Name           | Type           | Description                                                                             |
| -------------- | -------------- | --------------------------------------------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to supply assets to.                                                         |
| `assets`       | `uint256`      | The amount of assets to supply.                                                         |
| `shares`       | `uint256`      | The amount of shares to mint.                                                           |
| `onBehalf`     | `address`      | The address that will own the increased supply position.                                |
| `data`         | `bytes`        | Arbitrary data to pass to the `onMorphoSupply` callback. Pass empty data if not needed. |

**Returns**

| Name     | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `<none>` | `uint256` | assetsSupplied The amount of assets supplied. |
| `<none>` | `uint256` | sharesSupplied The amount of shares minted.   |

### withdraw

Withdraws `assets` or `shares` on behalf of `onBehalf` and sends the assets to `receiver`.

Either `assets` or `shares` should be zero. To withdraw max, pass the `shares`'s balance of `onBehalf`.

```solidity
function withdraw(
    MarketParams memory marketParams,
    uint256 assets,
    uint256 shares,
    address onBehalf,
    address receiver
) external returns (uint256, uint256);
```

**Parameters**

| Name           | Type           | Description                                         |
| -------------- | -------------- | --------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to withdraw assets from.                 |
| `assets`       | `uint256`      | The amount of assets to withdraw.                   |
| `shares`       | `uint256`      | The amount of shares to burn.                       |
| `onBehalf`     | `address`      | The address of the owner of the supply position.    |
| `receiver`     | `address`      | The address that will receive the withdrawn assets. |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | assetsWithdrawn The amount of assets withdrawn. |
| `<none>` | `uint256` | sharesWithdrawn The amount of shares burned.    |

### borrow

Borrows `assets` or `shares` on behalf of `onBehalf` and sends the assets to `receiver`.

Either `assets` or `shares` should be zero. Most use cases should rely on `assets` as an input so the
caller is guaranteed to borrow `assets` of tokens, but the possibility to mint a specific amount of shares is
given for full compatibility and precision.

```solidity
function borrow(
    MarketParams memory marketParams,
    uint256 assets,
    uint256 shares,
    address onBehalf,
    address receiver
) external returns (uint256, uint256);
```

**Parameters**

| Name           | Type           | Description                                              |
| -------------- | -------------- | -------------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to borrow assets from.                        |
| `assets`       | `uint256`      | The amount of assets to borrow.                          |
| `shares`       | `uint256`      | The amount of shares to mint.                            |
| `onBehalf`     | `address`      | The address that will own the increased borrow position. |
| `receiver`     | `address`      | The address that will receive the borrowed assets.       |

**Returns**

| Name     | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `<none>` | `uint256` | assetsBorrowed The amount of assets borrowed. |
| `<none>` | `uint256` | sharesBorrowed The amount of shares minted.   |

### repay

Repays `assets` or `shares` on behalf of `onBehalf`, optionally calling back the caller's
`onMorphoRepay` function with the given `data`.

Either `assets` or `shares` should be zero. To repay max, pass the `shares`'s balance of `onBehalf`.

```solidity
function repay(
    MarketParams memory marketParams,
    uint256 assets,
    uint256 shares,
    address onBehalf,
    bytes calldata data
) external returns (uint256, uint256);
```

**Parameters**

| Name           | Type           | Description                                                                            |
| -------------- | -------------- | -------------------------------------------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to repay assets to.                                                         |
| `assets`       | `uint256`      | The amount of assets to repay.                                                         |
| `shares`       | `uint256`      | The amount of shares to burn.                                                          |
| `onBehalf`     | `address`      | The address of the owner of the debt position.                                         |
| `data`         | `bytes`        | Arbitrary data to pass to the `onMorphoRepay` callback. Pass empty data if not needed. |

**Returns**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `<none>` | `uint256` | assetsRepaid The amount of assets repaid. |
| `<none>` | `uint256` | sharesRepaid The amount of shares burned. |

### supplyCollateral

Supplies `assets` of collateral on behalf of `onBehalf`, optionally calling back the caller's
`onMorphoSupplyCollateral` function with the given `data`.

Interest are not accrued since it's not required and it saves gas.

```solidity
function supplyCollateral(MarketParams memory marketParams, uint256 assets, address onBehalf, bytes calldata data)
    external;
```

**Parameters**

| Name           | Type           | Description                                                                                       |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to supply collateral to.                                                               |
| `assets`       | `uint256`      | The amount of collateral to supply.                                                               |
| `onBehalf`     | `address`      | The address that will own the increased collateral position.                                      |
| `data`         | `bytes`        | Arbitrary data to pass to the `onMorphoSupplyCollateral` callback. Pass empty data if not needed. |

### withdrawCollateral

Withdraws `assets` of collateral on behalf of `onBehalf` and sends the assets to `receiver`.

`msg.sender` must be authorized to manage `onBehalf`'s positions.

```solidity
function withdrawCollateral(MarketParams memory marketParams, uint256 assets, address onBehalf, address receiver)
    external;
```

**Parameters**

| Name           | Type           | Description                                          |
| -------------- | -------------- | ---------------------------------------------------- |
| `marketParams` | `MarketParams` | The market to withdraw collateral from.              |
| `assets`       | `uint256`      | The amount of collateral to withdraw.                |
| `onBehalf`     | `address`      | The address of the owner of the collateral position. |
| `receiver`     | `address`      | The address that will receive the collateral assets. |

### liquidate

Liquidates the given `repaidShares` of debt asset or seize the given `seizedAssets` of collateral on the
given market `marketParams` of the given `borrower`'s position, optionally calling back the caller's
`onMorphoLiquidate` function with the given `data`.

Either `seizedAssets` or `repaidShares` should be zero.

```solidity
function liquidate(
    MarketParams memory marketParams,
    address borrower,
    uint256 seizedAssets,
    uint256 repaidShares,
    bytes calldata data
) external returns (uint256, uint256);
```

**Parameters**

| Name           | Type           | Description                                                                                |
| -------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `marketParams` | `MarketParams` | The market of the position.                                                                |
| `borrower`     | `address`      | The owner of the position.                                                                 |
| `seizedAssets` | `uint256`      | The amount of collateral to seize.                                                         |
| `repaidShares` | `uint256`      | The amount of shares to repay.                                                             |
| `data`         | `bytes`        | Arbitrary data to pass to the `onMorphoLiquidate` callback. Pass empty data if not needed. |

**Returns**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `<none>` | `uint256` | The amount of assets seized. |
| `<none>` | `uint256` |                              |

### flashLoan

Executes a flash loan.

Flash loans have access to the whole balance of the contract (the liquidity and deposited collateral of all
markets combined, plus donations).

```solidity
function flashLoan(address token, uint256 assets, bytes calldata data) external;
```

**Parameters**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `token`  | `address` | The token to flash loan.                                    |
| `assets` | `uint256` | The amount of assets to flash loan.                         |
| `data`   | `bytes`   | Arbitrary data to pass to the `onMorphoFlashLoan` callback. |

### setAuthorization

Sets the authorization for `authorized` to manage `msg.sender`'s positions.

```solidity
function setAuthorization(address authorized, bool newIsAuthorized) external;
```

**Parameters**

| Name              | Type      | Description                   |
| ----------------- | --------- | ----------------------------- |
| `authorized`      | `address` | The authorized address.       |
| `newIsAuthorized` | `bool`    | The new authorization status. |

### setAuthorizationWithSig

Sets the authorization for `authorization.authorized` to manage `authorization.authorizer`'s positions.

Warning: Reverts if the signature has already been submitted.

```solidity
function setAuthorizationWithSig(Authorization memory authorization, Signature calldata signature) external;
```

**Parameters**

| Name            | Type            | Description                 |
| --------------- | --------------- | --------------------------- |
| `authorization` | `Authorization` | The `Authorization` struct. |
| `signature`     | `Signature`     | The signature.              |

### \_isSenderAuthorized

Returns whether the sender is authorized to manage `onBehalf`'s positions.

```solidity
function _isSenderAuthorized(address onBehalf) internal view returns (bool);
```

### accrueInterest

Accrues interest for the given market `marketParams`.

```solidity
function accrueInterest(MarketParams memory marketParams) external;
```

### \_accrueInterest

Accrues interest for the given market `marketParams`.

Assumes that the inputs `marketParams` and `id` match.

```solidity
function _accrueInterest(MarketParams memory marketParams, Id id) internal;
```

### \_isHealthy

Returns whether the position of `borrower` in the given market `marketParams` is healthy.

Assumes that the inputs `marketParams` and `id` match.

```solidity
function _isHealthy(MarketParams memory marketParams, Id id, address borrower) internal view returns (bool);
```

### \_isHealthy

Returns whether the position of `borrower` in the given market `marketParams` with the given
`collateralPrice` is healthy.

Assumes that the inputs `marketParams` and `id` match.

Rounds in favor of the protocol, so one might not be able to borrow exactly `maxBorrow` but one unit less.

```solidity
function _isHealthy(MarketParams memory marketParams, Id id, address borrower, uint256 collateralPrice)
    internal
    view
    returns (bool);
```

### extSloads

Returns the data stored on the different `slots`.

```solidity
function extSloads(bytes32[] calldata slots) external view returns (bytes32[] memory res);
```
