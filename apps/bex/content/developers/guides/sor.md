---
head:
  - - meta
    - property: og:title
      content: Smart Order Router Guide
  - - meta
    - name: description
      content: How to use the Smart Order Router (SOR) to find optimal swaps
  - - meta
    - property: og:description
      content: How to use the Smart Order Router (SOR) to find optimal swaps
---

# Smart Order Router (SOR)

The Smart Order Router (SOR) is a library for order routing optimization across BEX pools for best price execution. It is available as part of the SDK [TODO: link] and as a standalone package for integrators who only need swap routing logic. This documentation covers both the API and SDK usage of the SOR.

## API Usage

The SOR can be called using a GraphQL query. A single swap query in JavaScript might look like this [TODO: change from Balancer]:

```javascript
const ENDPOINT_URL = "https://api-v3.balancer.fi/graphql";

const query = `query GetSorSwaps($tokenIn: String!, $tokenOut: String!, $swapType: GqlSorSwapType!, $swapAmount: AmountHumanReadable!, $chain: GqlChain!, $queryBatchSwap: Boolean!) {
  swaps: sorGetSwapPaths(
    tokenIn: $tokenIn
    tokenOut: $tokenOut
    swapType: $swapType
    swapAmount: $swapAmount
    chain: $chain
    queryBatchSwap: $queryBatchSwap
  ) {
    effectivePrice
    effectivePriceReversed
    swapType
    paths {
      inputAmountRaw
      outputAmountRaw
      pools
      tokens {
        address
        decimals
      }
    }
    priceImpact {
      priceImpact
      error
    }
    returnAmount
    routes {
      hops {
        pool {
          symbol
        }
        poolId
        tokenIn
        tokenInAmount
        tokenOut
        tokenOutAmount
      }
      share
      tokenInAmount
      tokenOut
      tokenOutAmount
    }
    swapAmount
    swaps {
      amount
      assetInIndex
      assetOutIndex
      poolId
      userData
    }
    tokenIn
    tokenInAmount
    tokenOut
    tokenOutAmount
  }
}`;

async function runQuery() {
  try {
    const payload = {
      operationName: "GetSorSwaps",
      variables: {
        swapAmount: "100",
        swapType: "EXACT_IN",
        tokenIn: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        tokenOut: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chain: "MAINNET",
        queryBatchSwap: false,
      },
      query: query,
    };

    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log(JSON.stringify(data.data.swaps, null, 2));
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
}

runQuery();
```

This returns a list of swaps with the best price execution paths, including the price impact and the pools involved. Significantly, encoded [BatchSwapSteps](/developers/contracts/vault#batchswapstep) are returned, which can be used to execute a [batchSwap](/developers/contracts/vault#batchswap), for example:

```json
  "swaps": [
    {
      "amount": "100000000",
      "assetInIndex": 0,
      "assetOutIndex": 1,
      "poolId": "0x79c58f70905f734641735bc61e45c19dd9ad60bc0000000000000000000004e7",
      "userData": "0x"
    },
    {
      "amount": "0",
      "assetInIndex": 1,
      "assetOutIndex": 2,
      "poolId": "0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a",
      "userData": "0x"
    }
  ]
```

## SDK Usage

### Step 1: Fetch Pool Data

After importing the SDK and initializing, the SOR must be updated with the latest pool data using `fetchPools`:

```javascript
import { BalancerSDK } from "@balancer-labs/sdk";

const balancer = new BalancerSDK({
  network: 1, // Mainnet
  rpcUrl: "https://rpc.ankr.com/eth", // rpc endpoint
});

const { swaps } = balancer; // Swaps module

await swaps.fetchPools();
```

### Step 2: Obtain Route

There are two types of swaps developers can choose between:

- `findRouteGivenIn` - the amount of tokens sent is known, or
- `findRouteGivenOut` - the amount of tokens received is known

```javascript
const swapInfo = await swaps.findRouteGivenIn({
  tokenIn: "0xstring", // address of tokenIn
  tokenOut: "0xstring", // address of tokenOut
  amount: parseEther("1"), // BigNumber with a swap amount
  gasPrice: parseFixed("1", 9), // BigNumber current gas price
  maxPools, // number of pools included in path, above 4 is usually a high gas prices
});
```

### Step 3: Encode and Broadcast Transaction

`swapInfo` can be used to build a swap transaction:

```javascript
const tx = swaps.buildSwap({
  userAddress: "0xstring", // user address
  swapInfo, // result from the previous step
  kind: SwapType.SwapExactIn, // or SwapExactOut
  deadline, // BigNumber block timestamp
  maxSlippage, // [bps], eg: 1 == 0.01%, 100 == 1%
});

const signer = balancer.provider.getSigner();
await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  value: tx.value,
});
```
