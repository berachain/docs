---
head:
  - - meta
    - property: og:title
      content: CrocQuery Contracts
  - - meta
    - name: description
      content: View functions to query state of pool parameters and prices
  - - meta
    - property: og:description
      content: View functions to query state of pool parameters and prices
---

# CrocQuery Contract

The `CrocQuery` contract provides a set of view functions for querying various aspects of the DEX contract, including pool parameters, liquidity curves, user LP positions, and user surplus collateral positions.

The contract is deployed at

Testnet: `0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89`

## Pool Price Functions

The below functions are used to query a pool's instantenous price and prick tick respectively.

### queryPrice:

`queryPrice` returns the current price of the pool as a Q64.64 fixed point representation of the square-root of the current base to quote exchange rate.

```solidity
function queryPrice (
    address base,
    address quote,
    uint256 poolIdx
) public view returns (uint128)
```

**Parameters**
| Parameter | Type | Description |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| base | address | The address of the base-side token in the pool's pair (always the smaller address) |
| quote | address | The address of the quote-side token in the pool's pair |
| poolIdx | uint256 | The pool type index |

### queryCurveTick

Returns the current price tick of the pool, defined as the floor of the base 1.0001 logarithm of the pool price.

```solidity
function queryCurveTick (
    address base,
    address quote,
    uint256 poolIdx
) public view returns (int24)
```

**Parameters**;
| Parameter | Type | Description |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| base | address | The address of the base-side token in the pool's pair (always the smaller address) |
| quote | address | The address of the quote-side token in the pool's pair |
| poolIdx | uint256 | The pool type index |

## Pool Liquidity

The `queryLiquidity` function returns the liquidity in a pool at its current tick, represented as the square-root of the product of the base and quote virtual liquidity in the pool. This can be used to estimate a price impact for small swaps.

```solidity
function queryLiquidity (
    address base,
    address quote,
    uint256 poolIdx
) public view returns (uint128)
```

**Parameters**
| Parameter | Type | Description |
|-----------|---------|-----------------------------------------------------------------------------------|
| base | address | The address of the base-side token in the pool's pair (always the smaller address) |
| quote | address | The address of the quote-side token in the pool's pair |
| poolIdx | uint256 | The pool type index |

## Liquidity Positions

The `queryAmbientTokens` function returns information associated with a liquidity position

```solidity
function queryAmbientTokens (
    address owner,
    address base,
    address quote,
    uint256 poolIdx
) public view returns (uint128 liq, uint128 baseQty, uint128 quoteQty)
```

**Parameters**
| Parameter | Type | Description |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| owner | address | The address of the position's owner |
| base | address | The address of the base-side token in the pool's pair (always the smaller address) |
| quote | address | The address of the quote-side token in the pool's pair |
| poolIdx | uint256 | The pool type index |

**Returns**

| Name     | Type    | Description                                                                                             |
| -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| liq      | uint128 | The full range liquidity contribution of this position as the square root of the base and quote tokens. |
| baseQty  | uint128 | The total amount of base side tokens currently owned by this position.                                  |
| quoteQty | uint128 | The total amount of quote side tokens currently owned by this position.                                 |
