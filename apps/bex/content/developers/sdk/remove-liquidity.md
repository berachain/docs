---
head:
  - - meta
    - property: og:title
      content: BEX SDK Remove Liquidity
  - - meta
    - name: description
      content: BEX SDK Remove Liquidity
  - - meta
    - property: og:description
      content: BEX SDK Remove Liquidity
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Remove Liquidity Guide

Using the [Berancer SDK](https://github.com/berachain-foundation/berancer-sdk), users can remove liquidity using two primary methods (see [RemoveLiquidityKind](https://github.com/berachain/berancer-sdk/blob/main/src/entities/removeLiquidity/types.ts)):

1. _Proportional_ - remove liquidity proportionally across all tokens
2. _SingleTokenExactIn_ - remove liquidity and receive a single token

## Example: Single Token Exit

In this example, we'll demonstrate how to remove liquidity and receive a single token (BERA) while calculating the price impact of the transaction.

```js-vue
import { ethers } from "ethers";
import {
  BalancerApi,
  RemoveLiquidity,
  RemoveLiquidityKind,
  Slippage,
  PriceImpact,
} from "@berachain-foundation/berancer-sdk";

// Initialize provider and wallet
const RPC_URL = "{{config.mainnet.rpcUrl}}";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const balancerApi = new BalancerApi("{{config.mainnet.dapps.swap.balancerApiUrl}}", {{config.mainnet.chainId}});

// Get pool data
const poolId = "{{config.mainnet.dapps.swap.examplePoolId}}";
const poolState = await balancerApi.pools.fetchPoolState(poolId);

// Prepare remove liquidity input for single token exit
const removeLiquidityInput = {
  chainId: CHAIN_ID,
  kind: RemoveLiquidityKind.SingleTokenExactIn,
  rpcUrl: RPC_URL,
  bptIn: {
    address: poolState.address,
    decimals: 18,
    rawAmount: ethers.parseUnits("0.1", 18), // 0.1 BPT
  },
  tokenOut: WBERA_TOKEN
};

const removeLiquidity = new RemoveLiquidity();

// Query expected outputs and calculate price impact in parallel
const [queryOutput, priceImpact] = await Promise.all([
  removeLiquidity.query(removeLiquidityInput, poolState),
  PriceImpact.removeLiquidity(removeLiquidityInput, poolState)
]);

console.log(
  "Expected Token Out:",
  ethers.formatUnits(queryOutput.amountsOut[0].amount, queryOutput.amountsOut[0].token.decimals),
  queryOutput.amountsOut[0].token.symbol
);
console.log("Price Impact:", priceImpact.percentage, "%");

// Build transaction with 1% slippage
const slippage = Slippage.fromPercentage("1");
const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);

const callData = removeLiquidity.buildCall({
  ...queryOutput,
  sender: wallet.address,
  recipient: wallet.address,
  wethIsEth: true,
  slippage,
  deadline,
});

// Send transaction
const tx = await wallet.sendTransaction({
  to: callData.to,
  data: callData.callData,
  value: callData.value,
});

console.log("Transaction sent:", tx.hash);

const receipt = await tx.wait();
```

Below we breakdown the code example above.

### Helper Classes

The main helper classes we use from the SDK are:

- `BalancerApi` - to simplify retrieving pool data from the Pools API
- `RemoveLiquidity` - to build removeLiquidity queries and transactions
- `Slippage` - to simplify creating limits with user defined slippage
- `PriceImpact` - to calculate the price impact of single token exits

### Fetching Pool Data

After initializing the `BalancerApi` class, we can fetch current pool data using `fetchPoolState`.

```js-vue
const balancerApi = new BalancerApi("{{config.mainnet.dapps.swap.balancerApiUrl}}", {{config.mainnet.chainId}});

// Get pool data
const poolId =
  "{{config.mainnet.dapps.swap.examplePoolId}}";
const poolState = await balancerApi.pools.fetchPoolState(poolId);
```

### Simulation and Slippage Setting

The `PriceImpact` class calculates the price impact of unbalanced liquidity operations. A [PriceImpactAmount](https://github.com/berachain/berancer-sdk/blob/main/src/entities/priceImpactAmount.ts#L4) is returned, with the price impact expressed in a number of different units.

Its use in the above example is informational, but can be used to provide detailed slippage information.

```js
const [queryOutput, priceImpact] = await Promise.all([
  removeLiquidity.query(removeLiquidityInput, poolState),
  PriceImpact.removeLiquidity(removeLiquidityInput, poolState),
]);

const slippage = Slippage.fromPercentage("1");
```

### Building the Transaction

The `RemoveLiquidity` class has a `buildCall` method that allows us to build the transaction. This method takes in the `queryOutput` and address parameters.

```js
const slippage = Slippage.fromPercentage("1");
const callData = removeLiquidity.buildCall({
  ...queryOutput,
  sender: wallet.address,
  recipient: wallet.address,
  wethIsEth: true,
  slippage,
  deadline,
});
```
