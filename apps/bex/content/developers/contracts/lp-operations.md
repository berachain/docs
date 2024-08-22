---
head:
  - - meta
    - property: og:title
      content: LP Operations
  - - meta
    - name: description
      content: Learn how to perform different LP operations.
  - - meta
    - property: og:description
      content: Learn how to perform different LP operations.
---

# LP Operations

:::tip
ERC20 LP tokens are minted and burned during LP operations. The quantity is based on the incremental liquidity deposited to or withdrawn from the pool.
:::

Supported LP operations include:

- Minting liquidity
- Burning liquidity

LP operations use callpath index 2:

```solidity
userCmd(2, abi.encode(
    code,         // uint8
    base,         // address
    quote,        // address
    poolIdx,      // uint256
    bidTick,      // int24
    askTick,      // int24
    qty,          // uint128
    limitLower,   // uint128
    limitHigher,  // uint128
    settleFlags,  // uint8
    lpConduit     // address
))
```

The `code` specifies the type of LP action according to the following codes:

#### Mint liquidity

- 3 - Fixed in liquidity units
- 31 - Fixed in base tokens
- 32 - Fixed in quote tokens

#### Burn liquidity

- 4 - Fixed in liquidity units
- 41 - Fixed in base tokens
- 42 - Fixed in quote tokens

The remaining parameters are:

| Name        | Type    | Description                                                                                                                    |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| base        | address | The address of the base token                                                                                                  |
| quote       | address | The address of the quote token                                                                                                 |
| poolIdx     | uint256 | The index of the pool                                                                                                          |
| bidTick     | int24   | Will be 0 for full-range liquidity                                                                                             |
| askTick     | int24   | Will be 0 for full-range liquidity                                                                                             |
| qty         | uint128 | The size of the liquidity being added or removed. Fixed in terms of liquidity units, base token deposit or quote token deposit |
| limitLower  | uint128 | The minimum acceptable curve price. If the price of the pool is below this threshold the transaction will revert               |
| limitHigher | uint128 | The maximum acceptable curve price. If the price of the pool is above this threshold the transaction will revert               |
| settleFlags | uint8   | Flag indicating how user wants to settle the tokens (see [Type Conventions](/developers/type-conventions))                     |
| lpConduit   | address | The address of LP token                                                                                                        |
