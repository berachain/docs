---
head:
  - - meta
    - property: og:title
      content: BeraSwap SDK API Reference
  - - meta
    - name: description
      content: BeraSwap SDK API Reference
  - - meta
    - property: og:description
      content: BeraSwap SDK API Reference
---

# SDK API Reference

The SDK API Reference is a comprehensive guide to the Berancer SDK's API. It includes all the functions and classes available in the SDK, as well as their parameters and return values.

## API Initialization

The `BalancerApi` class provides helper functions for interacting with the Berancer API.

### Constructor

```typescript
const balancerApi = new BalancerApi(apiUrl: string, chainId: ChainId);
```

| Name    | Type   | Description                |
| ------- | ------ | -------------------------- |
| apiUrl  | string | Url of API                 |
| chainId | string | Chain that will be queried |

### Properties

The `BalancerApi` class initializes the following properties:

- [Pools](#pools) - Methods for interacting with individual pools
- [NestedPools](#nested-pools) - Methods for working with nested pools
- [SorSwapPaths](#sorswappaths) - Methods for optimizing swap paths

## Pools

### pools.fetchPoolState

Finds state of given pool.

```typescript
pools.fetchPoolState(id: string): Promise<PoolState>
```

**Parameters**

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | string | ID of pool, v2=poolId, v3=address |

**Returns**

```typescript
Promise<PoolState>;
```

[PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5) - State of given pool.

### pools.fetchPoolStateWithBalances

Finds state of given pool including token balances and pool shares.

```typescript
fetchPoolStateWithBalances(
  id: string,
): Promise<PoolStateWithBalances>
```

**Parameters**

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | poolId      |

**Returns**

```typescript
Promise<PoolStateWithBalances>;
```

[PoolStateWithBalances](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L13) - State of given pool including token balances and pool shares.

## Nested Pools

### nestedPools.fetchPoolState

Finds state of a set of nested pools.

```typescript
fetchNestedPoolState(id: string): Promise<NestedPoolState>
```

**Parameters**

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | string | ID of pool, v2=poolId, v3=address |

**Returns**

```typescript
Promise<NestedPoolState>;
```

[NestedPoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L101) - state of a set of nested pools.

## SorSwapPaths

### sorSwapPaths.fetchSorSwapPaths

Finds optimized swap paths for a given swap config.

```typescript
fetchSorSwapPaths(sorInput: SorInput): Promise<Path[]>
```

**Parameters**

| Name     | Type                                                                                                                             | Description  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| sorInput | [SorInput](https://github.com/berachain/berancer-sdk/blob/main/src/data/providers/balancer-api/modules/sorSwapPaths/index.ts#L9) | Swap configs |

**Returns**

```typescript
Promise<Path[]>;
```

[Path[]](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/paths/types.ts#L6) - optimized swap paths for the given swap.

## AddLiquidity

This class provides functionality to:

- Perform on-chain queries to see the result of an addLiquidity operation
- Build an addLiquidity transaction, with slippage, for a consumer to submit
- Supported add types: SingleToken, Unbalanced, Proportional

### Constructor

```typescript
const addLiquidity = new AddLiquidity();
```

### Methods

### query

Simulate addLiquidity operation by using an onchain call.

```typescript
query(
  input: AddLiquidityInput,
  poolState: PoolState
): Promise<AddLiquidityQueryOutput>
```

**Parameters**

| Name      | Type                                                                                                            | Description                                            |
| --------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| input     | [AddLiquidityInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L42) | User defined inputs                                    |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5)                       | Current state of pool that liquidity is being added to |

**Returns**

```typescript
Promise<AddLiquidityQueryOutput>;
```

[AddLiquidityQueryOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L59) - Data that can be passed to `buildCall`. Includes updated `bptOut` amount.

---

### buildCall

Builds the addLiquidity transaction using user defined slippage.

```typescript
buildCall(input: AddLiquidityBuildCallInput): AddLiquidityBuildCallOutput
```

**Parameters**

| Name  | Type                                                                                                                     | Description                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| input | [AddLiquidityBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L63) | Parameters required to build the call including user defined slippage |

**Returns**

```typescript
AddLiquidityBuildCallOutput;
```

[AddLiquidityBuildCallOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L84) - Encoded call data for addLiquidity that user can submit.

---

### buildCallWithPermit2

Builds the addLiquidity transaction using user defined slippage and Permit2 signature for token approval.

:::info Permit2 Signature
Check out [Permit2 Helper section](#permit2-helper) on how to generate a Permit2 signature.
:::

```typescript
buildCallWithPermit2(input: AddLiquidityBuildCallInput, permit2: Permit2): AddLiquidityBuildCallOutput
```

**Parameters**

| Name    | Type                                                                                                                     | Description                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| input   | [AddLiquidityBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L68) | Parameters required to build the call including user defined slippage |
| permit2 | [Permit2](https://github.com/berachain/berancer-sdk/blob/main/src/entities/permit2Helper/index.ts#L35)                   | Permit2 object with metadata and encoded signature                    |

**Returns**

```typescript
AddLiquidityBuildCallOutput;
```

[AddLiquidityBuildCallOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L84) - Encoded call data for addLiquidity that user can submit.

---

## RemoveLiquidity

This class provides functionality to:

- Perform on-chain queries to see the result of an removeLiquidity operation
- Build a removeLiquidity transaction, with slippage, for a consumer to submit
- Supported remove types: Unbalanced, SingleTokenExactOutInput, SingleTokenExactInInput, Proportional

### Constructor

```typescript
const removeLiquidity = new RemoveLiquidity();
```

### Methods

### query

Simulate removeLiquidity operation by using an onchain call.

```typescript
query(
  input: RemoveLiquidityInput,
  poolState: PoolState,
): Promise<RemoveLiquidityQueryOutput>
```

**Parameters**

| Name      | Type                                                                                                                  | Description                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| input     | [RemoveLiquidityInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L58) | User defined inputs                                        |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5)                             | Current state of pool that liquidity is being removed from |

**Returns**

```typescript
Promise<RemoveLiquidityQueryOutput>;
```

[RemoveLiquidityQueryOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L78) - Data that can be passed to `buildCall`. Includes updated `amountsOut` amount.

---

### queryRemoveLiquidityRecovery

Calculates proportional exit using pool state. Note - this does not do an onchain query.

```typescript
queryRemoveLiquidityRecovery(
  input: RemoveLiquidityRecoveryInput,
  poolState: PoolState,
): Promise<RemoveLiquidityQueryOutput>
```

**Parameters**

| Name      | Type                                                                                                                          | Description                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| input     | [RemoveLiquidityRecoveryInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L53) | User defined inputs                                        |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5)                                     | Current state of pool that liquidity is being removed from |

**Returns**

```typescript
Promise<RemoveLiquidityQueryOutput>;
```

[RemoveLiquidityQueryOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L78) - Data that can be passed to `buildCall`. Includes updated `amountsOut` amount.

---

### buildCall

Builds the removeLiquidity transaction using user defined slippage.

```typescript
buildCall(
  input: RemoveLiquidityBuildCallInput,
): RemoveLiquidityBuildCallOutput
```

**Parameters**

| Name  | Type                                                                                                                           | Description                      |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| input | [RemoveLiquidityBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L87) | Input with user defined slippage |

**Returns**

```typescript
RemoveLiquidityBuildCallOutput;
```

[RemoveLiquidityBuildCallOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L92) - Encoded call data for addLiquidity that user can submit.

---

### buildCallWithPermit

Builds the removeLiquidity transaction using user defined slippage and Permit signature for token approval.

:::info Permit Signature
Check out [Permit Helper section](#permit-helper) on how to generate a Permit signature.
:::

```typescript
buildCallWithPermit(
  input: RemoveLiquidityBuildCallInput,
  permit: Permit,
): RemoveLiquidityBuildCallOutput
```

**Parameters**

| Name   | Type                                                                                                                           | Description                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| input  | [RemoveLiquidityBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L87) | Input with user defined slippage                  |
| permit | [Permit](https://github.com/berachain/berancer-sdk/blob/main/src/entities/permitHelper/index.ts#L30)                           | Permit object with metadata and encoded signature |

**Returns**

```typescript
RemoveLiquidityBuildCallOutput;
```

[RemoveLiquidityBuildCallOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L92) - Encoded call data for addLiquidity that user can submit.

## Swap

This class provides functionality to:

- Perform on-chain queries to see the result of a Swap operation
- Build a Swap transaction, with slippage, for a consumer to submit

### Constructor

```typescript
const swap = new Swap(swapInput: SwapInput);
```

| Name      | Type                                                                                           | Description                            |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| swapInput | [SwapInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L8) | Swap input including path information. |

Note: `SwapInput` data is normally returned from an API SOR query but may be constructed manually.

### Methods

### query

Gets up to date swap result by querying onchain.

```typescript
query(
  rpcUrl?: string,
  block?: bigint,
): Promise<ExactInQueryOutput | ExactOutQueryOutput>
```

**Parameters**

| Name              | Type   | Description                   |
| ----------------- | ------ | ----------------------------- |
| rpcUrl (optional) | string | RPC URL, e.g. Infura/Alchemy  |
| block (optional)  | bigint | Block no to perform the query |

**Returns**

```typescript
Promise<ExactInQueryOutput | ExactOutQueryOutput>;
```

[ExactInQueryOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L46) |
[ExactOutQueryOutput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L52)

The updated return for the given swap, either `expectedAmountOut` or `expectedAmountIn` depending on swap kind.

---

### buildCall

Builds the swap transaction using user defined slippage.

```typescript
buildCall(
  input: SwapBuildCallInput,
): SwapBuildOutputExactIn | SwapBuildOutputExactOut
```

**Parameters**

| Name  | Type                                                                                                     | Description                      |
| ----- | -------------------------------------------------------------------------------------------------------- | -------------------------------- |
| input | [SwapBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L22) | Input with user defined slippage |

**Returns**

```typescript
SwapBuildOutputExactIn | SwapBuildOutputExactOut;
```

[SwapBuildOutputExactIn](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L32) | [SwapBuildOutputExactOut](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L36) - Encoded call data for swap that user can submit. Includes `minAmountOut` or `maxAmountIn` depending on swap kind.

---

### buildCallWithPermit2

Builds the swap transaction using user defined slippage and Permit2 signature for token approval.

:::info Permit2 Signature
Check out [Permit2 Helper section](#permit2-helper) on how to generate a Permit2 signature.
:::

```typescript
buildCallWithPermit2(
  input: SwapBuildCallInput,
  permit2: Permit2,
): SwapBuildOutputExactIn | SwapBuildOutputExactOut
```

**Parameters**

| Name    | Type                                                                                                     | Description                                        |
| ------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| input   | [SwapBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L22) | Input with user defined slippage                   |
| permit2 | [Permit2](https://github.com/berachain/berancer-sdk/blob/main/src/entities/permit2Helper/index.ts#L36)   | Permit2 object with metadata and encoded signature |

**Returns**

```typescript
SwapBuildOutputExactIn | SwapBuildOutputExactOut;
```

[SwapBuildOutputExactIn](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L32) | [SwapBuildOutputExactOut](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L36) - Encoded call data for swap that user can submit. Includes `minAmountOut` or `maxAmountIn` depending on swap kind.

---

### quote

Gives the combined return amount for all paths. Note - this always uses the original path amounts provided in constructor and does not get updated.

```typescript
public get quote(): TokenAmount
```

**Returns**

```typescript
TokenAmount;
```

[TokenAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/tokenAmount.ts) - Gives the combined return amount for all paths (output amount for givenIn, input amount for givenOut).

---

### inputAmount

```typescript
public get inputAmount(): TokenAmount
```

**Returns**

```typescript
TokenAmount;
```

[TokenAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/tokenAmount.ts) - Gives the combined input amount for all paths.

---

### outputAmount

```typescript
public get outputAmount(): TokenAmount
```

**Returns**

```typescript
TokenAmount;
```

[TokenAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/tokenAmount.ts) - Gives the combined output amount for all paths.

---

### queryCallData

```typescript
public queryCallData(): string
```

**Returns**

```typescript
string;
```

Encoded query data for swap that a user can call to get an updated amount.

---

## PriceImpact

This class provides helper functions to calculate Price Impact for add/remove/swap actions.

### Methods

### addLiquiditySingleToken

Calculate price impact on add liquidity single token operations.

```typescript
addLiquiditySingleToken(
  input: AddLiquiditySingleTokenInput,
  poolState: PoolState,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name      | Type                                                                                                                       | Description                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| input     | [AddLiquiditySingleTokenInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L31) | Same input used in the corresponding add liquidity operation |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5)                                  | Current state of pool that liquidity is being added to       |

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

---

### addLiquidityUnbalanced

Calculate price impact on add liquidity unbalanced operations.

```typescript
addLiquidityUnbalanced = async (
    input: AddLiquidityUnbalancedInput,
    poolState: PoolState,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name      | Type                                                                                      | Description                                                  |
| --------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| input     | AddLiquidityUnbalancedInput                                                               | Same input used in the corresponding add liquidity operation |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5) | Current state of pool that liquidity is being added to       |

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

---

### addLiquidityNested

Calculate price impact on add liquidity nested token operations.

```typescript
addLiquidityNested = async (
  input: AddLiquidityNestedInput,
  nestedPoolState: NestedPoolState,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name            | Type                                                                                                                  | Description                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| input           | [AddLiquidityNestedInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L26) | Same input used in the corresponding add liquidity operation |
| nestedPoolState | [NestedPoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L101)                     | Current state of nested pools                                |

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

---

### removeLiquidity

Calculate price impact on remove liquidity operations.

```typescript
removeLiquidity = async (
  input:
      | RemoveLiquiditySingleTokenExactInInput
      | RemoveLiquidityUnbalancedInput,
  poolState: PoolState,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name      | Type                                                                                                                                    | Description                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| input     | [RemoveLiquiditySingleTokenExactInInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L35) | Same input used in the corresponding remove liquidity operation |
| input     | [RemoveLiquidityUnbalancedInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L30)         | Same input used in the corresponding remove liquidity operation |
| poolState | [PoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L5)                                               | Current state of pool that liquidity is being removed from      |

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

---

### removeLiquidityNested

Calculate price impact on remove liquidity single token nested operations.

```typescript
removeLiquidityNested = async (
  input: RemoveLiquidityNestedSingleTokenInput,
  nestedPoolState: NestedPoolState,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name            | Type                                                                                                                                         | Description                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| input           | [RemoveLiquidityNestedSingleTokenInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidityNested/types.ts#L15) | Same input used in the corresponding remove liquidity operation |
| nestedPoolState | [NestedPoolState](https://github.com/berachain/berancer-sdk/blob/main/src/entities/types.ts#L101)                                            | Current state of nested pools                                   |

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

---

### swap

Calculate price impact on swap operations.

```typescript
swap = async (
  swapInput: SwapInput,
  rpcUrl?: string,
  block?: bigint,
): Promise<PriceImpactAmount>
```

**Parameters**

| Name              | Type                                                                                           | Description                            |
| ----------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| swapInput         | [SwapInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts#L8) | Swap input including path information. |
| rpcUrl (optional) | string                                                                                         | RPC URL, e.g. Infura/Alchemy           |
| block (optional)  | bigint                                                                                         | Block no to perform the query          |

Note: `SwapInput` data is normally returned from an API SOR query but may be constructed manually.

**Returns**

```typescript
Promise<PriceImpactAmount>;
```

[PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts) - Price impact for operation.

## Utils

Helper functions.

### calculateProportionalAmounts

Given pool balances (including BPT) and a reference token amount, it calculates all other amounts proportional to the reference amount.

```typescript
calculateProportionalAmounts(
  pool: {
    address: Address;
    totalShares: HumanAmount;
    tokens: {
      address: Address;
      balance: HumanAmount;
      decimals: number
    }[];
  },
  referenceAmount: InputAmount,
): {
  tokenAmounts: InputAmount[];
  bptAmount: InputAmount;
}
```

**Parameters**

| Name            | Type                                                                                | Description      |
| --------------- | ----------------------------------------------------------------------------------- | ---------------- |
| pool            | See above                                                                           | Pool state       |
| referenceAmount | [InputAmount](https://github.com/berachain/berancer-sdk/blob/main/src/types.ts#L45) | Ref token amount |

**Returns**

```typescript
{
  tokenAmounts: InputAmount[];
  bptAmount: InputAmount;
}
```

Amounts proportional to the reference amount.

---

### Permit2 Helper

Balancer v3 handles token approval through Pemit2 and this helper facilitates Permit2 signature generation.

Each operation (i.e. `addLiquidity`, `addLiquidityNested`, `addLiquidityBoosted` and `swap`) has its own method that leverages the same input type of the operation itself in order to simplify signature generation.

**Function**

```typescript
static async signAddLiquidityApproval(
    input: AddLiquidityBaseBuildCallInput & {
        client: PublicWalletClient;
        owner: Address;
        nonces?: number[];
        expirations?: number[];
    },
): Promise<Permit2>
```

**Parameters**

| Name                   | Type                                                                                                                         | Description                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| input                  | [AddLiquidityBaseBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L63) | Add Liquidity Input                      |
| client                 | [PublicWalletClient](https://github.com/berachain/berancer-sdk/blob/main/src/utils/types.ts#L3)                              | Viem's wallet client with public actions |
| owner                  | Address                                                                                                                      | User address                             |
| nonces (optional)      | number[]                                                                                                                     | Nonces for each token                    |
| expirations (optional) | number[]                                                                                                                     | Expirations for each token               |

**Returns**

```typescript
Promise<Permit2>;
```

[Permit2](https://github.com/berachain/berancer-sdk/blob/main/src/entities/permit2Helper/index.ts#L35) - Permit2 object with metadata and encoded signature

---

### Permit Helper

Balancer v3 conforms with EIP-2612 and this helper facilitates Permit signature generation.

Each operation (i.e. `removeLiquidity`, `removeLiquidityNested` and `removeLiquidityBoosted`) has its own method that leverages the same input type of the operation itself in order to simplify signature generation.

**Function**

```typescript
static signRemoveLiquidityApproval = async (
    input: RemoveLiquidityBaseBuildCallInput & {
        client: PublicWalletClient;
        owner: Hex;
        nonce?: bigint;
        deadline?: bigint;
    },
): Promise<Permit>
```

**Parameters**

| Name                   | Type                                                                                                                               | Description                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| input                  | [RemoveLiquidityBaseBuildCallInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts#L82) | Remove Liquidity Input                   |
| client                 | [PublicWalletClient](https://github.com/berachain/berancer-sdk/blob/main/src/utils/types.ts#L3)                                    | Viem's wallet client with public actions |
| owner                  | Address                                                                                                                            | User address                             |
| nonces (optional)      | number[]                                                                                                                           | Nonces for each token                    |
| expirations (optional) | number[]                                                                                                                           | Expirations for each token               |

**Returns**

```typescript
Promise<Permit>;
```

[Permit](https://github.com/berachain/berancer-sdk/blob/main/src/entities/permitHelper/index.ts#L30) - Permit object with metadata and encoded signature
