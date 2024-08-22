---
head:
  - - meta
    - property: og:title
      content: Multicall
  - - meta
    - name: description
      content: Explanation of multicall on Berps.
  - - meta
    - property: og:description
      content: Explanation of multicall on Berps.
---

# Multicall

Berps' main `Entrypoint` contract extends the `PayableMulticallable` contract. Its primary purpose is to aggregate results from multiple function calls in a single transaction, which can help reduce gas costs and improve efficiency when batching multiple Berps trading actions, particularly in the context of a trading bot.

The `PayableMulticallable` contract is derived from the `Multicallable` contract from [vectorized.eth](https://x.com/optimizoor) and is part of the [solady](https://github.com/Vectorized/solady/blob/main/src/utils/Multicallable.sol) library, which provides a suite of gas optimized Solidity tools.

## Functions

```solidity
function multicall(
    bool requireSuccess,
    bytes[] calldata data
) external payable returns (bytes[] memory)
```

**Parameters**

| Name           | Type    | Description                                                            |
| -------------- | ------- | ---------------------------------------------------------------------- |
| requireSuccess | bool    | Whether to revert the transaction if any of the calls are unsuccessful |
| data           | bytes[] | an array of calldata                                                   |

**Returns**

| Type  | Description                                |
| ----- | ------------------------------------------ |
| bytes | An array of bytes containing the responses |
