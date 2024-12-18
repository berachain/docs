---
head:
  - - meta
    - property: og:title
      content: BEX SDK Add Liquidity
  - - meta
    - name: description
      content: BEX SDK Add Liquidity
  - - meta
    - property: og:description
      content: BEX SDK Add Liquidity
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Add Liquidity Guide

Using the [Berancer SDK](https://github.com/berachain-foundation/berancer-sdk), users can add liquidity using two primary methods (see [AddLiquidityKind](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L12)):

1. _Unbalanced_ - add liquidity with arbitrary amounts of each token
2. _Proportional_ - add liquidity with proportional amount of both tokens

## Example: Adding Unbalanced Liquidity

In this example, we use the Berancer SDK and [Ethers.js](https://docs.ethers.org/v6/) to add single-token `BERA` liquidity to a given pool.

```js-vue
import { ethers } from "ethers";
import {
  BalancerApi,
  AddLiquidity,
  AddLiquidityKind,
  Slippage,
} from "@berachain-foundation/berancer-sdk";

// Initialize provider and wallet
const RPC_URL = "{{config.mainnet.rpcUrl}}";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const balancerApi = new BalancerApi("{{config.mainnet.dapps.swap.balancerApiUrl}}", {{config.mainnet.chainId}});

// Get pool data
const poolId =
  "{{config.mainnet.dapps.swap.examplePoolId}}";
const poolState = await balancerApi.pools.fetchPoolState(poolId);

// Prepare add liquidity input - note we're only adding one token for unbalanced
const addLiquidityInput = {
  chainId: CHAIN_ID,
  kind: AddLiquidityKind.Unbalanced,
  rpcUrl: RPC_URL,
  amountsIn: [
    {
      address: WBERA_TOKEN,
      decimals: 18,
      rawAmount: ethers.parseUnits("0.1", 18), // 0.1 BERA
    },
  ],
};

const addLiquidity = new AddLiquidity();

// Query expected BPT out
const queryOutput = await addLiquidity.query(addLiquidityInput, poolState);

console.log(
  "Expected BPT Out:",
  ethers.formatUnits(queryOutput.bptOut.amount, 18)
);

// Build transaction with 1% slippage
const slippage = Slippage.fromPercentage("1");
const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);

const callData = addLiquidity.buildCall({
  ...queryOutput,
  chainId: CHAIN_ID,
  sender: wallet.address,
  poolId: poolState.id,
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

The three main helper classes we use from the SDK are:

- `BalancerApi` - to simplify retrieving pool data from the Pools API
- `AddLiquidity` - to build addLiquidity queries and transactions
- `Slippage` - to simplify creating limits with user defined slippage

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

The `AddLiquidity` class has a `query` method that allows us to simulate the add liquidity transaction. This is useful for estimating the expected output and slippage. It takes in the [`addLiquidityInput`](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L42) and `poolState` as arguments.

We also set the slippage to 1% meaning the transaction reverts if we receive less than 99% of the expected output.

```js
// Query expected BPT out
const queryOutput = await addLiquidity.query(addLiquidityInput, poolState);
// Build transaction with 1% slippage
const slippage = Slippage.fromPercentage("1");
```

### Building the Transaction

The `AddLiquidity` class has a `buildCall` method that allows us to build the transaction. This method takes in the `queryOutput` and address parameters.

```js
const callData = addLiquidity.buildCall({
  ...queryOutput,
  sender: wallet.address,
  recipient: wallet.address,
  wethIsEth: true,
  slippage,
  deadline,
});
```

## Adding Proportional Liquidity

Adding proportional liquidity is similar to adding unbalanced liquidity, but instead of specifying the amount of each token, we specify a `referenceAmount` for one of the tokens. (see [AddLiquidityProportionalInput](https://github.com/berachain/berancer-sdk/blob/main/src/entities/addLiquidity/types.ts#L37)) The SDK will then calculate the amount of the other token to add based on the current pool composition.

```js-vue
addLiquidityInput = {
    chainId,
    kind: AddLiquidityKind.Proportional,
    rpcUrl: RPC_URL,
    referenceAmount: {
        rawAmount: parseUnits(tokenAmount, tokenDecimals),
        decimals: tokenDecimals,
        address: tokenAddress,
    },
};
```
