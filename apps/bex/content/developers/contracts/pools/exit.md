# Pool Exits in BeraSwap

> **Important:** Calls to `exitPool()` must be made on the BeraSwap Vault contract! You cannot send this command directly to a pool.

## API

```solidity
exitPool(
    bytes32 poolId,
    address sender,
    address recipient,
    ExitPoolRequest request
)
```

### Arguments Explained

| Parameter | Type | Description |
|-----------|------|-------------|
| poolId | bytes32 | ID of the pool you're exiting |
| sender | address | Address sending LP tokens |
| recipient | address | Address receiving tokens (usually the same as sender) |
| request | ExitPoolRequest | Struct containing exit details (see below) |

### ExitPoolRequest Struct

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

### Token Ordering

When providing assets, tokens must be sorted numerically by address. The values in `minAmountsOut` correspond to the same index in `assets`, so these arrays must be created in parallel after sorting.

### Minimum Amounts

The `minAmountsOut` parameter sets lower limits for tokens to receive. This protects against price changes between transaction submission and execution.

Best practice:
1. Use `queryExit` to calculate current token amounts you'll receive
2. Apply a slippage tolerance (e.g., multiply by 0.99 for 1% slippage)
3. Use these adjusted amounts as `minAmountsOut`

### userData Encoding

The `userData` field encodes the exit type and parameters. Different pool types support different exit kinds.

> **Note:** When encoding `userData` for pools that include their own LP token as part of the pool's tokens, the LP tokens are not included in the `userData`.

## ExitKind Enum

```solidity
enum ExitKind {
    EXACT_LP_IN_FOR_ONE_TOKEN_OUT,
    EXACT_LP_IN_FOR_TOKENS_OUT,
    LP_IN_FOR_EXACT_TOKENS_OUT
}
```

### Exit Types Explained

| ExitKind | Description | Use Case |
|----------|-------------|-----------|
| EXACT_LP_IN_FOR_ONE_TOKEN_OUT | Send precise LP tokens, receive estimated single token | When you want to exit to a specific token |
| EXACT_LP_IN_FOR_TOKENS_OUT | Send precise LP tokens, receive estimated amounts of all tokens | When you want to exit proportionally |
| LP_IN_FOR_EXACT_TOKENS_OUT | Send estimated LP tokens, receive precise amounts of specified tokens | When you need exact output amounts |

### userData Encoding

| Exit Type | ABI | userData |
|-----------|-----|----------|
| Single Asset Exit | `['uint256', 'uint256', 'uint256']` | `[EXACT_LP_IN_FOR_ONE_TOKEN_OUT, lpAmountIn, exitTokenIndex]` |
| Proportional Exit | `['uint256', 'uint256']` | `[EXACT_LP_IN_FOR_TOKENS_OUT, lpAmountIn]` |
| Custom Exit | `['uint256', 'uint256[]', 'uint256']` | `[LP_IN_FOR_EXACT_TOKENS_OUT, amountsOut, maxLPAmountIn]` |

## Examples

### Example 1: Single Asset Exit (EXACT_LP_IN_FOR_ONE_TOKEN_OUT)

Exit a $BERA/$HONEY pool to receive only $BERA:

| Step | ExitKind | Assets | Parameters | Description |
|------|----------|--------|------------|-------------|
| 1 | EXACT_LP_IN_FOR_ONE_TOKEN_OUT | [BERA, HONEY] | lpAmountIn: 100 LP<br>exitTokenIndex: 0 | Send 100 LP tokens and receive estimated $BERA |

### Example 2: Proportional Exit (EXACT_LP_IN_FOR_TOKENS_OUT)

Exit a $BERA/$HONEY pool proportionally:

| Step | ExitKind | Assets | Parameters | Description |
|------|----------|--------|------------|-------------|
| 1 | EXACT_LP_IN_FOR_TOKENS_OUT | [BERA, HONEY] | lpAmountIn: 100 LP | Send 100 LP tokens and receive proportional amounts of both tokens |

### Example 3: Custom Exit (LP_IN_FOR_EXACT_TOKENS_OUT)

Exit a $BERA/$HONEY/$DAI pool for specific token amounts:

| Step | ExitKind | Assets | Parameters | Description |
|------|----------|--------|------------|-------------|
| 1 | LP_IN_FOR_EXACT_TOKENS_OUT | [BERA, HONEY, DAI] | amountsOut: [10 BERA, 100 HONEY, 50 DAI]<br>maxLPAmountIn: 200 LP | Receive exact token amounts, sending up to 200 LP |