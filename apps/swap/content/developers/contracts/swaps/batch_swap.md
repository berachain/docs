# Batch Swaps in BeraSwap

BeraSwap allows multi-hop swaps, or "batch swaps", which can optimize routes across multiple liquidity pools to find the best prices.

The BeraSwap Vault contract exposes the `batchSwap` function to allow multi-hop swaps.

## Functions

### BatchSwap

```solidity
function batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

| Parameter | Type            | Description                                     |
| --------- | --------------- | ----------------------------------------------- |
| kind      | SwapKind        | The type of swap (GIVEN_IN or GIVEN_OUT)        |
| swaps     | BatchSwapStep[] | Array of steps in the batch swap                |
| assets    | IAsset[]        | Array of tokens used in the batch swap          |
| funds     | FundManagement  | Specifies token sources and destinations        |
| limits    | int256[]        | Maximum amounts of each asset to be transferred |
| deadline  | uint256         | UNIX timestamp by which the swap must complete  |

| Returns     | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| assetDeltas | int256[] | Net token balances resulting from the swap |

### QueryBatchSwap

```solidity
function queryBatchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds)
          returns (int256[] assetDeltas)
```

| Returns     | Type     | Description                                          |
| ----------- | -------- | ---------------------------------------------------- |
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

| Field         | Type    | Description                                             |
| ------------- | ------- | ------------------------------------------------------- |
| poolId        | bytes32 | The id of the pool to swap with                         |
| assetInIndex  | uint256 | The index of the input token within the `assets` array  |
| assetOutIndex | uint256 | The index of the output token within the `assets` array |
| amount        | uint256 | The amount to swap, interpretation depends on `kind`    |
| userData      | bytes   | Additional data required by the pool for the swap       |

**Important:** When `amount` is set to 0 in a multi-hop swap, BeraSwap will use the full output of the previous step as input.

### FundManagement

```solidity
struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}
```

| Field               | Type            | Description                                 |
| ------------------- | --------------- | ------------------------------------------- |
| sender              | address         | The address providing tokens for the swap   |
| fromInternalBalance | bool            | Whether to use tokens from internal balance |
| recipient           | address payable | The address receiving tokens after the swap |
| toInternalBalance   | bool            | Whether to send tokens to internal balance  |

> **Note:** The `SwapKind` parameter in the `batchSwap` function determines how swap amounts are interpreted:
>
> - **GIVEN_IN**: Specify the exact amount of tokens to swap in. The function calculates and returns the amount of tokens you'll receive.
>   Example: "Swap exactly 100 USDC for as much ETH as possible."
>
> - **GIVEN_OUT**: Specify the exact amount of tokens to receive. The function calculates and returns the amount of tokens you need to swap in.
>   Example: "Receive exactly 1 ETH, how much USDC do I need to swap?"
>
> The choice between GIVEN_IN and GIVEN_OUT affects how the `amount` field in the `BatchSwapStep` struct is interpreted and how swap calculations are performed.

## Examples

The following examples demonstrate different ways to use batch swaps in BeraSwap. These patterns can help developers optimize their trading strategies and reduce gas costs by combining multiple operations into single transactions.

### Multi-hop Examples

Multi-hop swaps allow trading between tokens that don't have direct liquidity pools by routing through intermediate tokens. This can often result in better pricing than direct swaps.

#### Example 1: GIVEN_IN ($USDC -> $HONEY -> $DAI)

In this example, we want to swap 1000 $USDC through $HONEY to get $DAI. The swap is executed in two steps:

| Step | Amount | Token In | Token Out | Description                       |
| ---- | ------ | -------- | --------- | --------------------------------- |
| 0    | 1000   | $USDC    | $HONEY    | Swap exact 1000 $USDC for $HONEY  |
| 1    | 0      | $HONEY   | $DAI      | Swap all received $HONEY for $DAI |

By setting the second step's amount to 0, we ensure all $HONEY received from step 0 is used in step 1.

#### Example 2: GIVEN_OUT ($USDC -> $HONEY -> $DAI)

Here we want exactly 500 $DAI, and BeraSwap will calculate backwards how much $USDC we need:

| Step | Amount | Token Out | Token In | Description                    |
| ---- | ------ | --------- | -------- | ------------------------------ |
| 0    | 500    | $DAI      | $HONEY   | Request exact 500 $DAI output  |
| 1    | 0      | $HONEY    | $USDC    | Calculate required $USDC input |

The swap calculates first how much $HONEY is needed for 500 $DAI, then how much $USDC is needed for that amount of $HONEY.

### Parallel Swap Examples

Parallel swaps are batch swaps where multiple unrelated swaps are executed in parallel within a single transaction. This allows for efficient execution of multiple trades by batching them together, reducing overall gas costs compared to executing them separately.

#### Example 3: Parallel GIVEN_IN Swaps

Execute multiple independent swaps in a single transaction:

| Step | Amount | Token In | Token Out | Description                |
| ---- | ------ | -------- | --------- | -------------------------- |
| 0    | 1000   | $USDC    | $HONEY    | Swap 1000 $USDC for $HONEY |
| 1    | 0.5    | $WETH    | $DAI      | Swap 0.5 $WETH for $DAI    |
| 2    | 0.01   | $WBTC    | $USDC     | Swap 0.01 $WBTC for $USDC  |

Each swap is independent and executes in parallel, optimizing gas usage.

#### Example 4: Combined GIVEN_OUT Swaps

This example demonstrates how to combine a multi-hop swap with a single-hop swap in parallel, all using GIVEN_OUT mode. It performs two independent swaps:
1. A multi-hop swap A→B→C→D to get exactly 100 D
2. A single swap E→F to get exactly 50 F

| Step | Amount | Token Out | Token In | Description                       |
| ---- | ------ | --------- | -------- | --------------------------------- |
| 0    | 100    | D         | C        | First step: Request exactly 100 D |
| 1    | 0      | C         | B        | Second step: Use all C from previous step |
| 2    | 0      | B         | A        | Third step: Calculate required A input |
| 3    | 50     | F         | E        | Independent parallel swap: Get exactly 50 F |

In this example:
- Steps 0-2 form one multi-hop path (A→B→C→D) where we want exactly 100 D
- Step 3 is a completely independent swap (E→F) where we want exactly 50 F
- BeraSwap will calculate the required amounts of tokens A and E needed as inputs
- The two swaps execute in parallel in a single transaction

This pattern is useful when you need exact output amounts from completely independent swap paths.
