---
head:
  - - meta
    - property: og:title
      content: BEX SDK Smart Order Router
  - - meta
    - name: description
      content: BEX SDK Smart Order Router
  - - meta
    - property: og:description
      content: BEX SDK Smart Order Router
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Smart Order Router (SOR) Guide

The [Berancer SDK](https://github.com/berachain/berancer-sdk) includes a Smart Order Router (SOR) that finds optimal paths for token swaps. This guide demonstrates how to:

1. Use the SOR to find the best swap routes
2. Convert SOR output to batch swap parameters
3. Execute multi-hop swaps using the Vault contract (via [batchSwap](/developers/contracts/swaps/batch_swap))

:::tip Example Code
For more comprehensive Smart Order Router examples, see the [SOR examples](https://github.com/berachain/bex-sdk/tree/main/examples/sor) in the BEX SDK repository.
:::

## Example: Multi-Hop Swap Using SOR

In this example, we use the Berancer SDK and [Ethers.js](https://docs.ethers.org/v6/) to perform a multi-hop swap from HONEY to WBTC using the optimal path.

Note that the SOR is access via `balancerApi.sorSwapPaths.fetchSorSwapPaths`:

```js-vue
import { ethers } from "ethers";
import {
  BalancerApi,
  SwapKind,
  TokenAmount,
  VAULT,
  vaultV2Abi
} from "@berachain-foundation/berancer-sdk";

// Initialize provider and wallet
const RPC_URL = "{{config.mainnet.rpcUrl}}";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const balancerApi = new BalancerApi("{{config.websites.bex.balancerApiUrl}}", {{config.mainnet.chainId}});

// Create swap amount (e.g., 1 HONEY)
const tokenAmount = TokenAmount.fromHumanAmount(honeyToken, '1');

// Fetch optimal swap paths
const { paths: sorPaths, routes } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
  chainId: CHAIN_ID,
  tokenIn: honeyToken.address,
  tokenOut: wbtcToken.address,
  swapKind: SwapKind.GivenIn,
  swapAmount: tokenAmount,
});

// Convert SOR paths to batchSwap parameters
const batchSwapParams = {
  kind: SwapKind.GivenIn,
  swaps: routes.flatMap(route =>
    route.hops.map((hop, index) => ({
      poolId: hop.poolId,
      assetInIndex: assets.indexOf(hop.tokenIn),
      assetOutIndex: assets.indexOf(hop.tokenOut),
      amount: index === 0 ? tokenAmount.amount : '0',
      userData: '0x'
    }))
  ),
  assets: Array.from(new Set(routes.flatMap(route =>
    route.hops.flatMap(hop => [hop.tokenIn, hop.tokenOut])
  ))),
  funds: {
    sender: wallet.address,
    recipient: wallet.address,
    fromInternalBalance: false,
    toInternalBalance: false
  },
  limits: assets.map((_, i) =>
    i === 0
      ? tokenAmount.amount.toString()  // Exact input amount for first token
      : ethers.MaxInt256.toString()    // Max int256 for all other tokens
  ),
  deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
};

// Execute batch swap via Vault contract
const vaultContract = new ethers.Contract(VAULT[CHAIN_ID], vaultV2Abi, wallet);
const tx = await vaultContract.batchSwap(
  batchSwapParams.kind,
  batchSwapParams.swaps,
  batchSwapParams.assets,
  batchSwapParams.funds,
  batchSwapParams.limits,
  batchSwapParams.deadline
);
```

### Understanding SOR Output

The SOR returns detailed routing information. For example, a HONEY to WBTC swap might route through multiple pools:

```js
{
  "share": 0.5,
  "tokenInAmount": "1",
  "tokenOutAmount": "0.00001024",
  "hops": [
    {
      "poolId": "0x3ad1699...",
      "pool": { "symbol": "50WBERA-50HONEY-WEIGHTED" },
      "tokenIn": "HONEY",
      "tokenOut": "WBERA",
      "tokenInAmount": "1",
      "tokenOutAmount": "0.98"
    },
    {
      "poolId": "0x4a782a6...",
      "pool": { "symbol": "50WBERA-50WBTC-WEIGHTED" },
      "tokenIn": "WBERA",
      "tokenOut": "WBTC",
      "tokenInAmount": "0.98",
      "tokenOutAmount": "0.00001024"
    }
  ]
}
```

### Converting SOR to Batch Swap

Other SDK examples have used `buildCall` (see the [Swap Guide](/developers/sdk/swap)) for crafting transactions, but SOR routes can also be converted to batch swap parameters for the Vault contract:

1. **Swaps Array**: Each hop of the SOR path (see [BatchSwapStep](/developers/contracts/swaps/batch_swap#batchswapstep))
2. **Assets Array**: Unique list of all tokens in the path
3. **Limits**: Token spending limits for each asset
4. **Funds**: Sender and recipient information (see [FundManagement](/developers/contracts/swaps/batch_swap#fundmanagement))

### Executing the Swap

The batch swap is executed directly through the Vault contract:

```js
// First approve token spending
const tokenContract = new ethers.Contract(tokenIn.address, tokenAbi, wallet);
await tokenContract.approve(VAULT[CHAIN_ID], tokenAmount.amount);

// Execute swap
const vaultContract = new ethers.Contract(VAULT[CHAIN_ID], vaultV2Abi, wallet);
const tx = await vaultContract.batchSwap(
  batchSwapParams.kind,
  batchSwapParams.swaps,
  batchSwapParams.assets,
  batchSwapParams.funds,
  batchSwapParams.limits,
  batchSwapParams.deadline
);
```
