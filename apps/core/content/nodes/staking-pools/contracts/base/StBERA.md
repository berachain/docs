# StBERA

[Git Source](https://github.com/berachain/contracts-staking-pools/blob/b7f6d4823d9636f498243ce334a1458550330535/src/base/StBERA.sol)

**Inherits:**
[IStBera](/src/interfaces/IStBera.sol/interface.IStBera.md)

Abstract base contract for the Staked BERA (stBERA) token implementation

_This contract provides the core functionality for a staking pool token that allows users
to deposit BERA tokens and receive stBERA shares representing their proportional ownership
of the staking pool's total assets._

## State Variables

## Functions

### name

Returns the name of the token.

```solidity
function name() public pure virtual returns (string memory);
```

### symbol

Returns the symbol of the token.

```solidity
function symbol() public pure virtual returns (string memory);
```

### decimals

Returns the decimals of the token.

```solidity
function decimals() public pure virtual returns (uint8);
```

### totalAssets

Returns the total amount of underlying assets (BERA) managed by the staking pool

```solidity
function totalAssets() public view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `<none>` | `uint256` | The total value of all assets in the staking pool |

### totalSupply

Returns the total supply of stBERA shares

```solidity
function totalSupply() public view virtual override returns (uint256);
```

**Returns**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `<none>` | `uint256` | The total number of shares currently in circulation |

### balanceOf

Returns the balance of stBERA shares for a given account

```solidity
function balanceOf(address account) public view virtual override returns (uint256);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The address to query the balance for |

### convertToShares

Converts a given amount of assets to the equivalent number of shares

_This function uses the current exchange rate between assets and shares_

```solidity
function convertToShares(uint256 assets) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `assets` | `uint256` |             |

**Returns**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `<none>` | `uint256` | The equivalent number of stBERA shares |

### convertToAssets

Converts a given number of shares to the equivalent amount of assets

_This function uses the current exchange rate between shares and assets_

```solidity
function convertToAssets(uint256 shares) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `shares` | `uint256` |             |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The equivalent amount of BERA tokens |

### previewDeposit

Calculates the number of shares that would be received for a given asset deposit

_This is a preview function that doesn't execute the actual deposit_

```solidity
function previewDeposit(uint256 assets) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `assets` | `uint256` |             |

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | The number of stBERA shares that would be minted |

### previewMint

Calculates the amount of assets required to mint a given number of shares

_This is a preview function that doesn't execute the actual minting_

```solidity
function previewMint(uint256 shares) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `shares` | `uint256` |             |

**Returns**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `<none>` | `uint256` | The amount of BERA tokens required for the specified shares |

### previewWithdraw

Calculates the number of shares required to withdraw a given amount of assets

_This is a preview function that doesn't execute the actual withdrawal_

```solidity
function previewWithdraw(uint256 assets) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `assets` | `uint256` |             |

**Returns**

| Name     | Type      | Description                                                        |
| -------- | --------- | ------------------------------------------------------------------ |
| `<none>` | `uint256` | The number of shares needed to withdraw the specified asset amount |

### previewRedeem

Calculates the amount of assets that would be received for redeeming shares

_This is a preview function that doesn't execute the actual redemption_

```solidity
function previewRedeem(uint256 shares) public view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `shares` | `uint256` |             |

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | The amount of BERA tokens that would be received |
