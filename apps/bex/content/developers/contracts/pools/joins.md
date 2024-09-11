# Pool Joins in BEX

> Note: In this document, LP refers to the LP token of the pool, which represents a user's share of the liquidity pool.

To add liquidity to a pool, you must call the `joinPool` function to the BEX Vault.

## JoinPool Function

```solidity
joinPool(
    bytes32 poolId,
    address sender,
    address recipient,
    JoinPoolRequest request
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| poolId | bytes32 | ID of the pool you're joining |
| sender | address | Address sending tokens to the pool |
| recipient | address | Address receiving LP tokens (usually the same as sender) |
| request | JoinPoolRequest | Struct containing join details (see below) |

## JoinPoolRequest Struct

```solidity
struct JoinPoolRequest {
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}
```

| Field | Type | Description |
|-------|------|-------------|
| assets | address[] | Sorted list of all tokens in pool |
| maxAmountsIn | uint256[] | Maximum token send amounts |
| userData | bytes | Custom bytes field for join parameters |
| fromInternalBalance | bool | True if sending from internal token balances, false if sending ERC20 |

## JoinKind Enum

```solidity
enum JoinKind {
    INIT,
    EXACT_TOKENS_IN_FOR_LP_OUT,
    TOKEN_IN_FOR_EXACT_LP_OUT,
    ALL_TOKENS_IN_FOR_EXACT_LP_OUT
}
```

| JoinKind | Description |
|----------|-------------|
| INIT | Initial join to seed a pool (can be done only once) |
| EXACT_TOKENS_IN_FOR_LP_OUT | Send precise token quantities, receive estimated LP tokens |
| TOKEN_IN_FOR_EXACT_LP_OUT | Send estimated single token quantity, receive precise LP tokens |
| ALL_TOKENS_IN_FOR_EXACT_LP_OUT | Send estimated token quantities proportionally, receive precise LP tokens |

## userData Encoding

| Join Type | ABI | userData |
|-----------|-----|----------|
| Initial Join | `['uint256', 'uint256[]']` | `[INIT, amountsIn]` |
| Exact Tokens Join | `['uint256', 'uint256[]', 'uint256']` | `[EXACT_TOKENS_IN_FOR_LP_OUT, amountsIn, minimumLP]` |
| Single Token Join | `['uint256', 'uint256', 'uint256']` | `[TOKEN_IN_FOR_EXACT_LP_OUT, lpAmountOut, enterTokenIndex]` |
| Proportional Join | `['uint256', 'uint256']` | `[ALL_TOKENS_IN_FOR_EXACT_LP_OUT, lpAmountOut]` |

## Examples

### Example 1: Initial Join (INIT)

Seeding a new pool with `$BERA` and `$HONEY`:

| Step | JoinKind | Assets | AmountsIn |
|------|----------|--------|-----------|
| 1 | INIT | [BERA, HONEY] | [100 `$BERA`, 1000 `$HONEY`] |

### Example 2: Exact Tokens Join (EXACT_TOKENS_IN_FOR_LP_OUT)

Joining an existing BERA/HONEY pool:

| Step | JoinKind | Assets | AmountsIn | MinimumLP |
|------|----------|--------|-----------|-----------|
| 1 | EXACT_TOKENS_IN_FOR_LP_OUT | [`$BERA`, `$HONEY`] | [10 BERA, 100 HONEY] | 95 LP |

### Example 3: Single Token Join (TOKEN_IN_FOR_EXACT_LP_OUT)

Joining a `$BERA`/`$HONEY`/`$DAI` pool with only `$BERA`:

| Step | JoinKind | Assets | LPAmountOut | EnterTokenIndex |
|------|----------|--------|-------------|-----------------|
| 1 | TOKEN_IN_FOR_EXACT_LP_OUT | [`$BERA`, `$HONEY`, `$DAI`] | 100 LP | 0 |