---
head:
  - - meta
    - property: og:title
      content: BEX SDK Swap
  - - meta
    - name: description
      content: BEX SDK Swap
  - - meta
    - property: og:description
      content: BEX SDK Swap
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Swap Guide

Using the [Berancer SDK](https://github.com/berachain/berancer-sdk), users can execute swaps using the Smart Order Router (SOR) to find optimal swap paths. The SDK supports two types of swaps (see [SwapKind](https://github.com/berachain/berancer-sdk/blob/main/src/entities/swap/types.ts)):

1. _GivenIn_ - specify the exact input amount
2. _GivenOut_ - specify the exact output amount

## Example: Exact Input Swap

In this example, we use the Berancer SDK and [Ethers.js](https://docs.ethers.org/v6/) to swap HONEY for USDC using the optimal swap path.

```js-vue
import { ethers } from "ethers";
import {
  BalancerApi,
  SwapKind,
  Token,
  TokenAmount,
  Swap,
  Slippage,
} from "@berachain-foundation/berancer-sdk";

// Initialize provider and wallet
const RPC_URL = "{{config.mainnet.rpcUrl}}";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const balancerApi = new BalancerApi("{{config.mainnet.dapps.bex.balancerApiUrl}}", {{config.mainnet.chainId}});

// Initialize tokens
const honeyToken = new Token(CHAIN_ID, HONEY_TOKEN, 18, 'HONEY');
const usdcToken = new Token(CHAIN_ID, USDC_TOKEN, 6, 'USDC');

// Create swap amount (e.g., 1 HONEY)
const swapAmount = TokenAmount.fromHumanAmount(honeyToken, '1');

// Fetch optimal swap paths
const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
  chainId: CHAIN_ID,
  tokenIn: honeyToken.address,
  tokenOut: usdcToken.address,
  swapKind: SwapKind.GivenIn,
  swapAmount,
});

const swap = new Swap({
  chainId: CHAIN_ID,
  paths: sorPaths,
  swapKind: SwapKind.GivenIn,
  userData: '0x',
});

// Query current rates
const queryOutput = await swap.query(RPC_URL);

// Build transaction with 1% slippage
const slippage = Slippage.fromPercentage("1");
const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);

const callData = swap.buildCall({
  slippage,
  deadline,
  queryOutput,
  sender: wallet.address,
  recipient: wallet.address,
  wethIsEth: false,
});

// Approve token spending
const tokenAbi = ["function approve(address spender, uint256 amount) public returns (bool)"];
const honeyContract = new ethers.Contract(honeyToken.address, tokenAbi, wallet);
await honeyContract.approve(callData.to, swapAmount.amount);

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

- `BalancerApi` - to query the Smart Order Router for optimized swap paths
- `Token` and `TokenAmount` - to represent tokens and their amounts
- `Swap` - to build swap queries and transactions
- `Slippage` - to simplify creating limits with user defined slippage

### Finding Optimal Swap Paths

The SDK uses the Smart Order Router (SOR) to find the best swap path for a given token pair:

```js-vue
const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
  chainId: CHAIN_ID,
  tokenIn: honeyToken.address,
  tokenOut: usdcToken.address,
  swapKind: SwapKind.GivenIn,
  swapAmount,
});
```

The SOR considers all available liquidity to find the path that provides the best execution price.

### Simulation and Price Quoting

The `Swap` class provides a `query` method to simulate the swap and get current rates:

```js
const swap = new Swap({
  chainId: CHAIN_ID,
  paths: sorPaths,
  swapKind: SwapKind.GivenIn
});

const queryOutput = await swap.query(RPC_URL);

const slippage = Slippage.fromPercentage('1');
```

This helps users understand the expected output amount before executing the trade.

### Building the Transaction

The `buildCall` method prepares the transaction with the defined slippage protection and deadline:

```js
const callData = swap.buildCall({
  slippage,
  deadline,
  queryOutput,
  sender: wallet.address,
  recipient: wallet.address,
  wethIsEth: false
});
```
