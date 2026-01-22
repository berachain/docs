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

1. _GivenIn_ - specify the exact input amount (you know how much you want to send)
2. _GivenOut_ - specify the exact output amount (you know how much you want to receive)

:::tip Example Code
For more comprehensive swap examples, see the [swap examples](https://github.com/berachain/bex-sdk/tree/main/examples/swaps) in the BEX SDK repository.
:::

## Understanding SwapKind

The `SwapKind` enum determines how your swap amount is interpreted:

- **GivenIn** (`SwapKind.GivenIn`): You specify the exact amount of input tokens to swap. Use this when you know how much you want to spend, and the SDK will calculate how much output tokens you'll receive. Example: "Swap exactly 100 USDC for as much BERA as possible."

- **GivenOut** (`SwapKind.GivenOut`): You specify the exact amount of output tokens you want to receive. Use this when you have a target amount, and the SDK will calculate how much input tokens you need to provide. Example: "Receive exactly 1 BERA, how much USDC do I need to swap?"

## Requirements

Before executing swaps, ensure you have:

- A wallet initialized with [Ethers.js](https://docs.ethers.org/v6/)
- Sufficient token balance for the swap (input token for GivenIn, calculated amount for GivenOut)
- An approved spending allowance for the token (if required)
- Access to an RPC endpoint

## Example: Exact Input Swap (GivenIn)

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
const balancerApi = new BalancerApi("{{config.websites.bex.balancerApiUrl}}", {{config.mainnet.chainId}});

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

const slippage = Slippage.fromPercentage("1");
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

The `buildCall` method returns an object containing:

- `to`: The contract address to send the transaction to
- `callData`: The encoded transaction data
- `value`: Any native token value (usually 0 for token swaps)

## Example: Exact Output Swap (GivenOut)

When you need to receive an exact amount of output tokens, use `SwapKind.GivenOut`. The SOR will calculate the required input amount:

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
const balancerApi = new BalancerApi("{{config.websites.bex.balancerApiUrl}}", {{config.mainnet.chainId}});

// Initialize tokens
const usdcToken = new Token(CHAIN_ID, USDC_TOKEN, 6, 'USDC');
const honeyToken = new Token(CHAIN_ID, HONEY_TOKEN, 18, 'HONEY');

// Create desired output amount (e.g., want to receive exactly 1000 USDC)
const desiredOutput = TokenAmount.fromHumanAmount(usdcToken, '1000');

// Fetch optimal swap paths for exact output
const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
  chainId: CHAIN_ID,
  tokenIn: honeyToken.address,
  tokenOut: usdcToken.address,
  swapKind: SwapKind.GivenOut,
  swapAmount: desiredOutput, // This is the desired OUTPUT amount
});

const swap = new Swap({
  chainId: CHAIN_ID,
  paths: sorPaths,
  swapKind: SwapKind.GivenOut,
  userData: '0x',
});

// Query to get the required input amount
const queryOutput = await swap.query(RPC_URL);

// Build transaction with slippage protection
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

// Approve the calculated input amount (or maximum expected)
const tokenAbi = ["function approve(address spender, uint256 amount) public returns (bool)"];
const honeyContract = new ethers.Contract(honeyToken.address, tokenAbi, wallet);
// Approve a slightly higher amount to account for slippage
await honeyContract.approve(callData.to, queryOutput.inputAmount.amount * BigInt(110) / BigInt(100));

// Send transaction
const tx = await wallet.sendTransaction({
  to: callData.to,
  data: callData.callData,
  value: callData.value,
});

console.log("Transaction sent:", tx.hash);
const receipt = await tx.wait();
```

### Key Differences for GivenOut

- The `swapAmount` parameter represents the desired **output** amount, not input
- The `queryOutput` will contain the calculated **input amount** needed
- You should approve slightly more than the calculated input amount to account for price movements

## Multi-Hop Swaps

The Smart Order Router automatically finds multi-hop swap paths when direct pools don't offer the best price. The SDK handles routing through intermediate tokens transparently. For advanced multi-hop swap configurations and batch swaps, see the [Smart Order Router Guide](/developers/sdk/sor) and [Batch Swap documentation](/developers/contracts/swaps/batch_swap).

## Best Practices

### Slippage Protection

Always set appropriate slippage limits based on:

- Token pair volatility
- Current market conditions
- Expected trade size (larger trades may need higher slippage)

```js
// Conservative slippage for stable pairs
const slippage = Slippage.fromPercentage("0.5");

// Standard slippage for volatile pairs
const slippage = Slippage.fromPercentage("1");

// Higher slippage for large trades
const slippage = Slippage.fromPercentage("3");
```

### Deadline Management

Set deadlines that account for network congestion:

```js
// Short deadline (1 minute) - risky in congested networks
const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);

// Standard deadline (5 minutes) - recommended
const deadline = BigInt(Math.floor(Date.now() / 1000) + 300);

// Extended deadline (20 minutes) - for high-value trades
const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);
```

### Query Before Execution

Always query the swap before executing to:

- Validate the swap is possible
- Check expected output amounts
- Estimate price impact
- Identify any errors before sending a transaction

```js
const queryOutput = await swap.query(RPC_URL);

if (!queryOutput.isValid) {
  throw new Error("Swap query failed: " + queryOutput.error);
}

console.log("Expected output:", queryOutput.outputAmount.toHuman());
```

## Error Handling

Common errors and how to handle them:

### Insufficient Liquidity

```js
try {
  const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
    // ... swap parameters
  });

  if (!sorPaths || sorPaths.length === 0) {
    throw new Error("No swap path found - insufficient liquidity");
  }
} catch (error) {
  if (error.message.includes("liquidity") || error.message.includes("path")) {
    console.error(
      "Insufficient liquidity for this swap. Try a smaller amount or different token pair."
    );
  }
}
```

### Slippage Exceeded

If the transaction reverts due to slippage:

```js
try {
  const receipt = await tx.wait();
} catch (error) {
  if (error.message.includes("Slippage") || error.reason?.includes("Slippage")) {
    console.error(
      "Slippage tolerance exceeded. Consider increasing slippage or reducing trade size."
    );
    // Retry with higher slippage or smaller amount
  }
}
```

### Token Approval Issues

Ensure sufficient approval before swapping:

```js
// Check current allowance
const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);
const currentAllowance = await tokenContract.allowance(wallet.address, callData.to);

if (currentAllowance < swapAmount.amount) {
  await tokenContract.approve(callData.to, swapAmount.amount);
  // Wait for confirmation before proceeding
}
```
