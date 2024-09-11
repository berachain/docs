# Batch Swaps in BEX

## Batch Swap Overview

BEX allows powerful multi-hop swaps, or "batch swaps", which can optimize routes across multiple liquidity pools to find the best prices.

The BEX Vault contract exposes the `batchSwap` function to allow multi-hop swaps with the following interface:

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

Each struct and parameter is explained below.

## BatchSwapStep Struct

```solidity
struct BatchSwapStep {
    bytes32 poolId;
    uint256 assetInIndex;
    uint256 assetOutIndex;
    uint256 amount;
    bytes userData;
}
```

| Field | Type | Description |
|-------|------|-------------|
| poolId | bytes32 | The id of the pool to swap with |
| assetInIndex | uint256 | The index of the input token within the `assets` array |
| assetOutIndex | uint256 | The index of the output token within the `assets` array |
| amount | uint256 | The amount to swap, interpretation depends on `kind` |
| userData | bytes | Additional data required by the pool for the swap |

**Note:** When `amount` is set to 0 in a multi-hop swap, BEX will use the full output of the previous step as input.

## FundManagement Struct

```solidity
struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}
```

| Field | Type | Description |
|-------|------|-------------|
| sender | address | The address providing tokens for the swap |
| fromInternalBalance | bool | Whether to use tokens from internal balance |
| recipient | address payable | The address receiving tokens after the swap |
| toInternalBalance | bool | Whether to send tokens to internal balance |

## BatchSwap Function

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| kind | SwapKind | The type of swap (GIVEN_IN or GIVEN_OUT) |
| swaps | BatchSwapStep[] | Array of steps in the batch swap |
| assets | IAsset[] | Array of tokens used in the batch swap |
| funds | FundManagement | Specifies token sources and destinations |
| limits | int256[] | Maximum amounts of each asset to be transferred |
| deadline | uint256 | UNIX timestamp by which the swap must complete |

**Returns:** 
- `assetDeltas`: int256[] - Net token balances resulting from the swap

## QueryBatchSwap Function

BEX provides a `queryBatchSwap` function to simulate a batch swap and get expected amounts:

```solidity
queryBatchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds)
          returns (int256[] assetDeltas)
```

Use this function off-chain to estimate swap results and calculate appropriate limits.

### Adding Slippage Tolerance

After calling `queryBatchSwap`, apply a slippage tolerance to calculate `limits` for `batchSwap`:

- For GIVEN_IN: Multiply negative `assetDeltas` by (1 - slippage)
- For GIVEN_OUT: Multiply positive `assetDeltas` by (1 + slippage)

## Multi-hop Examples

### Example 1: GIVEN_IN (`$USDC` -> `$HONEY` -> `$DAI`)

Swap 1000 `$USDC` for `$DAI`:

| Step | Amount | Token In | Token Out |
|------|--------|----------|-----------|
| 1    | 1000   | `$USDC`  | `$HONEY`  |
| 2    | 995    | `$HONEY` | `$DAI`    |

### Example 2: GIVEN_OUT (`$USDC` -> `$HONEY` -> `$DAI`)

Get 500 `$DAI`:

| Step | Amount | Token Out | Token In |
|------|--------|-----------|----------|
| 1    | 500    | `$DAI`    | `$HONEY` |
| 2    | 505    | `$HONEY`  | `$USDC`  |

## Parallel Swap Examples

### Example 3: Parallel GIVEN_IN Swaps

Swap multiple tokens in parallel:

| Step | Amount | Token In | Token Out |
|------|--------|----------|-----------|
| 1    | 1000   | `$USDC`  | `$HONEY`  |
| 2    | 0.5    | `$WETH`  | `$DAI`    |
| 3    | 0.01   | `$WBTC`  | `$USDC`   |

### Example 4: Combined GIVEN_OUT Swaps

Perform multi-hop and single-hop swaps in parallel:

| Step | Amount | Token Out | Token In |
|------|--------|-----------|----------|
| 1    | 100    | `$DAI`    | `$HONEY` |
| 2    | 101    | `$HONEY`  | `$USDC`  |
| 3    | 0.05   | `$WETH`   | `$USDC`  |
| 4    | 0.005  | `$WBTC`   | `$USDC`  |