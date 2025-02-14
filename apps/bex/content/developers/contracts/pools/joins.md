# Pool Joins in BEX

> **Important:** Calls to `joinPool()` must be made on the BEX Vault contract! You cannot send this command directly to a pool.

To add liquidity to a pool, you must call the `joinPool` function on the BEX Vault.

## JoinPool Function

```solidity
joinPool(
    bytes32 poolId,
    address sender,
    address recipient,
    JoinPoolRequest request
)
```

### Arguments Explained

| Parameter | Type            | Description                                              |
| --------- | --------------- | -------------------------------------------------------- |
| poolId    | bytes32         | ID of the pool you're joining                            |
| sender    | address         | Address sending tokens to the pool                       |
| recipient | address         | Address receiving LP tokens (usually the same as sender) |
| request   | JoinPoolRequest | Struct containing join details (see below)               |

### JoinPoolRequest Struct

```solidity
struct JoinPoolRequest {
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}
```

| Field               | Type      | Description                                                                                                  |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| assets              | address[] | Sorted list of all tokens in pool                                                                            |
| maxAmountsIn        | uint256[] | Maximum token amounts to send                                                                                |
| userData            | bytes     | Custom bytes field for join parameters                                                                       |
| fromInternalBalance | bool      | If `fromInternalBalance` is true, the caller's Internal Balance will be preferred: ERC20 transfers will only |

### Token Ordering

When providing assets, tokens must be sorted numerically by address. The values in `maxAmountsIn` correspond to the same index in `assets`, so these arrays must be created in parallel after sorting.

### Maximum Amounts

The `maxAmountsIn` parameter sets upper limits for tokens to send. This protects against price changes between transaction submission and execution.

Best practice:

1. Use `queryJoin` to calculate current token amounts needed
2. Add slippage tolerance (e.g., multiply by 1.01 for 1% slippage)
3. Use these adjusted amounts as `maxAmountsIn`

### userData Encoding

The `userData` field encodes the join type and parameters. Different pool types support different join kinds.

## JoinKind Enum

```solidity
enum JoinKind {
    INIT,
    EXACT_TOKENS_IN_FOR_LP_OUT,
    TOKEN_IN_FOR_EXACT_LP_OUT,
    ALL_TOKENS_IN_FOR_EXACT_LP_OUT
}
```

| JoinKind                       | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| INIT                           | Initial join to seed a pool (can be done only once)                       |
| EXACT_TOKENS_IN_FOR_LP_OUT     | Send precise token quantities, receive estimated LP tokens                |
| TOKEN_IN_FOR_EXACT_LP_OUT      | Send estimated single token quantity, receive precise LP tokens           |
| ALL_TOKENS_IN_FOR_EXACT_LP_OUT | Send estimated token quantities proportionally, receive precise LP tokens |

> **Note:** When encoding `userData` for pools that include their own LP token, the LP tokens are not included except for `INIT` joins.

## userData Encoding

| Join Type         | ABI                                   | userData                                                    |
| ----------------- | ------------------------------------- | ----------------------------------------------------------- |
| Initial Join      | `['uint256', 'uint256[]']`            | `[INIT, amountsIn]`                                         |
| Exact Tokens Join | `['uint256', 'uint256[]', 'uint256']` | `[EXACT_TOKENS_IN_FOR_LP_OUT, amountsIn, minimumLP]`        |
| Single Token Join | `['uint256', 'uint256', 'uint256']`   | `[TOKEN_IN_FOR_EXACT_LP_OUT, lpAmountOut, enterTokenIndex]` |
| Proportional Join | `['uint256', 'uint256']`              | `[ALL_TOKENS_IN_FOR_EXACT_LP_OUT, lpAmountOut]`             |

## Examples

### Example 1: Initial Join (INIT)

Seeding a new pool with `$BERA` and `$HONEY`:

| Step | JoinKind | Assets        | AmountsIn                    |
| ---- | -------- | ------------- | ---------------------------- |
| 1    | INIT     | [BERA, HONEY] | [100 `$BERA`, 1000 `$HONEY`] |

### Example 2: Exact Tokens Join (EXACT_TOKENS_IN_FOR_LP_OUT)

Joining an existing BERA/HONEY pool:

| Step | JoinKind                   | Assets              | AmountsIn            | MinimumLP |
| ---- | -------------------------- | ------------------- | -------------------- | --------- |
| 1    | EXACT_TOKENS_IN_FOR_LP_OUT | [`$BERA`, `$HONEY`] | [10 BERA, 100 HONEY] | 95 LP     |

### Example 3: Single Token Join (TOKEN_IN_FOR_EXACT_LP_OUT)

Joining a `$BERA`/`$HONEY`/`$DAI` pool with only `$BERA`:

| Step | JoinKind                  | Assets                      | LPAmountOut | EnterTokenIndex |
| ---- | ------------------------- | --------------------------- | ----------- | --------------- |
| 1    | TOKEN_IN_FOR_EXACT_LP_OUT | [`$BERA`, `$HONEY`, `$DAI`] | 100 LP      | 0               |
