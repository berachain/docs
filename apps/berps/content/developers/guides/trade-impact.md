---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Evaluate Trade Impact.
  - - meta
    - name: description
      content: Guide for evaluating price impact of a trade on Berps.
  - - meta
    - property: og:description
      content: Guide for evaluating price impact of a trade on Berps.
---

# Berps Developer Guides: Evaluate Trade Impact

As with trading on an AMM, large trades can result in a different execution prices compared to the market price. This price impact is explained in the [Dynamic Spread](/learn/leveraged-trading/fees-spread#dynamic-spread) section. In summary, the price impact of a trade is based on the following factors:

1. The size of the proposed trade
2. The open interest in the direction of the proposed trade
3. The 'depth' of the particular market (simulating orderbook liquidity)

## Querying Price Impact

Price impact for proposed trades is obtained using the [`FeesMarkets`](/developers/contracts/fees-markets) contract, which is responsible for managing fees related to trading pairs. A TypeScript example showing how to query the price impact of a trade is shown below:

```typescript
const { ethers } = require('ethers');

const FeesMarketsABI = ... // See below

const FEES_MARKETS_ADDRESS = "0xd8c63AA3B1dCBA8a8781bf9C4E3F8F06305a459d";

const signer = new ethers.Wallet(YOUR_PRIVATE_KEY, ETHERS_PROVIDER);

const feesMarketsContract = new ethers.Contract(FEES_MARKETS_ADDRESS, FeesMarketsABI, signer);

const { priceImpactP, priceAfterImpact } =
    await feesMarketsContract.getTradePriceImpact(
    openPrice, // Current market price (with 10 decimals precision)
    pairIndex, // Index of trading pair
    long, // True for long, false for short
    tradeOpenInterest, // Trade position size in HONEY (1e18)
    );

console.log(
    'Price Impact (%):',
    ethers.utils.formatUnits(priceImpactP, 10),
);
console.log(
    'Price After Impact:',
    ethers.utils.formatUnits(priceAfterImpact, 10),
);
```

## ABI

The relevant part of the `FeesMarketsABI` containing the `getTradePriceImpact` function is as follows:

```json
[
  {
    "type": "function",
    "name": "getTradePriceImpact",
    "inputs": [
      { "name": "openPrice", "type": "uint256", "internalType": "uint256" },
      { "name": "pairIndex", "type": "uint256", "internalType": "uint256" },
      { "name": "long", "type": "bool", "internalType": "bool" },
      {
        "name": "tradeOpenInterest",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      { "name": "priceImpactP", "type": "uint256", "internalType": "uint256" },
      {
        "name": "priceAfterImpact",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  }
]
```
