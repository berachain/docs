---
head:
  - - meta
    - property: og:title
      content: Swaps
  - - meta
    - name: description
      content: Learn how to perform swaps on BEX, including hot path and cold path swaps.
  - - meta
    - property: og:description
      content: Learn how to perform swaps on BEX, including hot path and cold path swaps.
---

# Swaps

## Hot Path

:::warning
Note: Hot path swaps are not guaranteed to be available. Any integrations using the hot path swap should include a fallback to a cold path swap call or use the cold path swap exclusively.
:::

The most common operation on a DEX is a vanilla swap. Therefore, BEX contains the entire logic for a full swap inside the core contract. This avoids the gas overhead of `DELEGATECALL` to another proxy contract.

For more information on how to perform a hot path swap, refer to the [DEX Contract Interface](/developers/contracts/dex#swap).

## Cold Path

The same swap functionality is available using the standard `userCmd()` method call rather than the `swap()` call. The behavior is identical, except the swap code is called on a proxy contract, which imposes an overhead of approximately 5000 gas.

The swap path is called with callpath index 1. The bytestring command is the standard ABI packing of the swap parameters:

```solidity
userCmd(1, abi.encode(
   base,
   quote,
   poolIdx,
   isBuy,
   inBaseQty,
   qty,
   tip,
   limitPrice,
   minOut,
   settleFlags
))
```

**Parameters**

| Name         | Type    | Description                                                                                                                                                  |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| base         | address | The base token in the swap pair                                                                                                                              |
| quote        | address | The quote token in the swap pair                                                                                                                             |
| poolIdx      | uint256 | The index of the pool to swap in                                                                                                                             |
| isBuy        | bool    | True if the user wants to pay base token and receive quote token. False if the user wants to receive base token and pay quote token                          |
| inBaseQty    | bool    | If true, the qty parameter is denominated in base tokens. If false, it's denominated in quote tokens                                                         |
| qty          | uint128 | The quantity of tokens to swap                                                                                                                               |
| tip          | uint16  | The tip amount for the relayer executing the swap                                                                                                            |
| limitPrice   | uint128 | Represents the worst possible price the user is willing to accept. If buying this represents an upper bound.                                                 |
| minOut       | uint128 | The minimum amount of output tokens the user is willing to receive                                                                                           |
| reserveFlags | uint8   | Flags indicating whether to use the user's surplus collateral balance for the base and/or quote token (see [Type Conventions](/developers/type-conventions)) |

### Note on limitPrice

Limit price is based on the price of the curve, not the fill price of the swap. If the swap pushes the price of the curve to the limit price, then the swap will stop and leave the remaining quantity unfilled (rather than reverting the transaction). Traditional slippage limits should be set with the `minOut` parameter.

Price value is based on a specific encoding of the square root of the pool price in Q64.64 fixed point format

If the caller is uninterested in partial fills and slippage is set with minOut parameter value, this value can be set to "max values" below based on the direction of the swap:

```
isBuy=false : 65538

isBuy=true : 21267430153580247136652501917186561137
```
