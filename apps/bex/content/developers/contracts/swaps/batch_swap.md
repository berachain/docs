# Batch Swaps in BEX
BEX allows multi-hop swaps, or "batch swaps", which can optimize routes across multiple liquidity pools to find the best prices.

The BEX Vault contract exposes the `batchSwap` function to allow multi-hop swaps.

## Functions

### BatchSwap Function

```solidity
function batchSwap(SwapKind kind,
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

| Returns | Type | Description |
|---------|------|-------------|
| assetDeltas | int256[] | Net token balances resulting from the swap |

### QueryBatchSwap Function

```solidity
function queryBatchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds)
          returns (int256[] assetDeltas)
```

| Returns | Type | Description |
|---------|------|-------------|
| assetDeltas | int256[] | Simulated net token balances resulting from the swap |

Use this function off-chain to estimate swap results and calculate appropriate limits.

## Structs

### BatchSwapStep

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

**Important:** When `amount` is set to 0 in a multi-hop swap, BEX will use the full output of the previous step as input.

> **Note:** The `SwapKind` parameter in the `batchSwap` function determines how swap amounts are interpreted:
> 
> - **GIVEN_IN**: Specify the exact amount of tokens to swap in. The function calculates and returns the amount of tokens you'll receive.
>   Example: "Swap exactly 100 USDC for as much ETH as possible."
> 
> - **GIVEN_OUT**: Specify the exact amount of tokens to receive. The function calculates and returns the amount of tokens you need to swap in.
>   Example: "Receive exactly 1 ETH, how much USDC do I need to swap?"
> 
> The choice between GIVEN_IN and GIVEN_OUT affects how the `amount` field in the `BatchSwapStep` struct is interpreted and how swap calculations are performed.

### FundManagement

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


## Multi-hop Examples

In these examples, we're swapping between `$USDC`, `$HONEY`, and `$DAI`. These tokens could be in different pools or the same pool.

### Example 1: GIVEN_IN (`$USDC` -> `$HONEY` -> `$DAI`)

In this "Given In" Batch Swap, a user wants to swap 1000 `$USDC` and find out how much `$DAI` they'll receive.

| Swap # | Amount | Token In | Token Out |
|--------|--------|----------|-----------|
| 0      | 1000   | `$USDC`  | `$HONEY`  |
| 1      | 0      | `$HONEY` | `$DAI`    |

The swap kind is `GIVEN_IN`, and the amount for the first swap is 1000. This will produce some amount of `$HONEY`, but we don't know exactly how much in advance.

The amount in the second swap is set to 0, which tells the multi-hop logic to use all of the `$HONEY` received from the first swap as input to the second swap.

### Example 2: GIVEN_OUT (`$USDC` -> `$HONEY` -> `$DAI`)

In this "Given Out" Batch Swap, a user wants to receive exactly 500 `$DAI` and find out how much `$USDC` they need to provide.

| Swap # | Amount | Token Out | Token In |
|--------|--------|-----------|----------|
| 0      | 500    | `$DAI`    | `$HONEY` |
| 1      | 0      | `$HONEY`  | `$USDC`  |

The swap kind is `GIVEN_OUT`, and the amount for the first swap is 500 `$DAI`. This will calculate how much `$HONEY` is needed, but we don't know the exact amount in advance.

The amount in the second swap is set to 0, which tells the multi-hop logic to use the calculated amount of `$HONEY` from the first swap to determine how much `$USDC` is needed.

## Parallel Swap Examples

Parallel swaps are batch swaps with unrelated swaps being performed in parallel. This allows for executing multiple swaps in a single transaction, which can be more gas-efficient and convenient for users.

### Example 3: Parallel GIVEN_IN Swaps

Multiple unrelated swaps performed in parallel with known input amounts:

| Swap # | Amount | Token In | Token Out |
|--------|--------|----------|-----------|
| 0      | 1000   | `$USDC`  | `$HONEY`  |
| 1      | 0.5    | `$WETH`  | `$DAI`    |
| 2      | 0.01   | `$WBTC`  | `$USDC`   |

User provides specified amounts of input tokens and receives computed amounts of output tokens.

### Example 4: Combined GIVEN_OUT Swaps

Combination of multi-hop and single-hop swaps with specified output amounts:

| Swap # | Amount | Token Out | Token In |
|--------|--------|-----------|----------|
| 0      | 100    | `$DAI`    | `$HONEY` |
| 1      | 0      | `$HONEY`  | `$USDC`  |
| 2      | 0.05   | `$WETH`   | `$USDC`  |
| 3      | 0.005  | `$WBTC`   | `$USDC`  |

Swaps 0-1: Multi-hop ($USDC -> $HONEY -> $DAI)
Swaps 2-3: Single-hop ($USDC -> $WETH, $USDC -> $WBTC)

User specifies desired output amounts; protocol computes required $USDC input.