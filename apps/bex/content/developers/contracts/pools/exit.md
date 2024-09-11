# Pool Exits in BEX

> Note: In this document, LP refers to the LP token of the pool, which represents a user's share of the liquidity pool.

In order to remove liquidity from a pool, you must call the `exitPool` function to the BEX Vault.

## ExitPool Function

```solidity
exitPool(
    bytes32 poolId,
    address sender,
    address recipient,
    ExitPoolRequest request
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| poolId | bytes32 | ID of the pool you're exiting |
| sender | address | Address sending LP tokens |
| recipient | address | Address receiving tokens (usually the same as sender) |
| request | ExitPoolRequest | Struct containing exit details (see below) |

## ExitPoolRequest Struct

```solidity
struct ExitPoolRequest {
    address[] assets,
    uint256[] minAmountsOut,
    bytes userData,
    bool toInternalBalance
}
```

| Field | Type | Description |
|-------|------|-------------|
| assets | address[] | Sorted list of all tokens in pool |
| minAmountsOut | uint256[] | Minimum token receive amounts |
| userData | bytes | Custom bytes field for exit parameters |
| toInternalBalance | bool | True if receiving tokens as internal balances, false if receiving as ERC20 |

## ExitKind Enum

```solidity
enum ExitKind {
    EXACT_LP_IN_FOR_ONE_TOKEN_OUT,
    EXACT_LP_IN_FOR_TOKENS_OUT,
    LP_IN_FOR_EXACT_TOKENS_OUT
}
```

| ExitKind | Description |
|----------|-------------|
| EXACT_LP_IN_FOR_ONE_TOKEN_OUT | Send precise LP tokens, receive estimated single token |
| EXACT_LP_IN_FOR_TOKENS_OUT | Send precise LP tokens, receive estimated amounts of all tokens |
| LP_IN_FOR_EXACT_TOKENS_OUT | Send estimated LP tokens, receive precise amounts of specified tokens |

## userData Encoding

| Exit Type | ABI | userData |
|-----------|-----|----------|
| Single Asset Exit | `['uint256', 'uint256', 'uint256']` | `[EXACT_LP_IN_FOR_ONE_TOKEN_OUT, lpAmountIn, exitTokenIndex]` |
| Proportional Exit | `['uint256', 'uint256']` | `[EXACT_LP_IN_FOR_TOKENS_OUT, lpAmountIn]` |
| Custom Exit | `['uint256', 'uint256[]', 'uint256']` | `[LP_IN_FOR_EXACT_TOKENS_OUT, amountsOut, maxLPAmountIn]` |

## Best Practices

1. Always use `queryExit` to estimate amounts before executing an `exitPool`.
2. Apply appropriate slippage tolerance to protect against price movements.
3. Ensure tokens are correctly sorted by address when providing `assets` and `minAmountsOut`.
4. Double-check the `ExitKind` and encoding for the specific pool type you're exiting.
5. Be mindful of gas costs, especially for complex exits or during high network congestion.

## Security Considerations

1. Verify that the `poolId` is correct before exiting a pool.
2. Always set appropriate `minAmountsOut` to protect against unexpected price movements or malicious activity.
3. Be cautious when approving LP tokens for pool exits, especially with unknown or untrusted contracts.
4. Verify that the `recipient` address is correct before executing high-value exits.

## Examples

### Example 1: Single Asset Exit (EXACT_LP_IN_FOR_ONE_TOKEN_OUT)

Exiting a `$BERA`/`$HONEY` pool for only `$BERA`:

| Step | ExitKind | Assets | LPAmountIn | ExitTokenIndex |
|------|----------|--------|------------|----------------|
| 1 | EXACT_LP_IN_FOR_ONE_TOKEN_OUT | [BERA, HONEY] | 100 LP | 0 |

### Example 2: Proportional Exit (EXACT_LP_IN_FOR_TOKENS_OUT)

Exiting a `$BERA/$HONEY` pool proportionally:

| Step | ExitKind | Assets | LPAmountIn |
|------|----------|--------|------------|
| 1 | EXACT_LP_IN_FOR_TOKENS_OUT | [BERA, HONEY] | 100 LP |

### Example 3: Custom Exit (LP_IN_FOR_EXACT_TOKENS_OUT)

Exiting a `$BERA/$HONEY/$DAI` pool for specific amounts:

| Step | ExitKind | Assets | AmountsOut | MaxLPAmountIn |
|------|----------|--------|------------|---------------|
| 1 | LP_IN_FOR_EXACT_TOKENS_OUT | [`$BERA`, `$HONEY`, `$DAI`] | [10 `$BERA`, 100 `$HONEY`, 50 `$DAI`] | 200 LP |