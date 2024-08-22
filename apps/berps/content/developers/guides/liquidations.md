---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Liquidate a Position
  - - meta
    - name: description
      content: Guide for liquidating a position on Berps.
  - - meta
    - property: og:description
      content: Guide for liquidating a position on Berps.
---

# Berps Developer Guides: Liquidate a Position

This guide walks through the process of liquidating positions on Berps, using TypeScript and Ethers.js.

On Berps, positions that have a PnL of -90% or greater are eligible for liquidation. From a smart contract call perspective, liquidations are a form of [executing limit orders](/developers/guides/limit-order#executing-a-limit-order). Similar to other limit orders, the execution criteria must be observed before the liquidation can be processed.

## Executing a Liquidation

To liquidate a position, a trader calls `executeLimitOrder` on the `Entrypoint` contract.

```typescript
import { ethers } from "ethers";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

const ENTRYPOINT_CONTRACT_ADDRESS = "0xb3395EeeA7701E0037bBC6Ab52953C6fB0c3326c";
const PYTH_ENDPOINT = "https://hermes.pyth.network";
const PRICE_ID =
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
const USDC_PRICE_ID =
  "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";

const EntrypointContractABI = ... // See below
const pythConnection = new EvmPriceServiceConnection(PYTH_ENDPOINT);

const signer = new ethers.Wallet(YOUR_PRIVATE_KEY, ETHERS_PROVIDER);

const tradingContract = new ethers.Contract(
  ENTRYPOINT_CONTRACT_ADDRESS,
  EntrypointContractABI,
  signer
);

const priceUpdateData = await pythConnection.getPriceFeedsUpdateData([PRICE_ID, USDC_PRICE_ID])

const tx = await tradingContract.executeLimitOrder(
  TRADE_INDEX, // Index of the trade to liquidate
  priceUpdateData,
  { value: 2 }
);
```

## ABI

The relevant part of the `TradingContractABI` containing the `executeLimitOrder` function is as follows:

```json
[
  {
    "type": "function",
    "name": "executeLimitOrder",
    "inputs": [
      {
        "name": "orderType",
        "type": "uint8",
        "internalType": "enum ITradingStorage.LimitOrder"
      },
      { "name": "trader", "type": "address", "internalType": "address" },
      { "name": "pairIndex", "type": "uint256", "internalType": "uint256" },
      { "name": "index", "type": "uint256", "internalType": "uint256" },
      {
        "name": "priceUpdateData",
        "type": "bytes[]",
        "internalType": "bytes[]"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  }
]
```
