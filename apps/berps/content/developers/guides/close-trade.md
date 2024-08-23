---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Close a Trade
  - - meta
    - name: description
      content: Guide for programatically closing a trade on Berps.
  - - meta
    - property: og:description
      content: Guide for programatically closing a trade on Berps.
---

# Berps Developer Guides: Close a Trade

This guide walks through the process of programatically closing trades on Berps, using TypeScript and Ethers.js. This article assumes usage on the Berachain V2 Testnet - please adapt contract addresses and providers to your specific environment.

## Step 1: Import Dependencies & Define Constants

First, import the necessary dependencies and define constants, including the relevant trading contract address, Pyth endpoint and the [price feeds IDs](https://pyth.network/developers/price-feed-ids) for the relevant assets. Here, `ETH/USD` and `USDC/USD` feeds are used.

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
```

## Step 2: Set up Providers

Create an instance of an Ethers.js signer and connect to the Berps trading contract and Pyth price provider:

```typescript
const signer = new ethers.Wallet(YOUR_PRIVATE_KEY, ETHERS_PROVIDER);

const tradingContract = new ethers.Contract(
  ENTRYPOINT_CONTRACT_ADDRESS,
  EntrypointContractABI,
  signer,
);
const pythConnection = new EvmPriceServiceConnection(PYTH_ENDPOINT);
```

## Step 4: Fetch Price Updates and Execute Transaction

The `closeTradeMarket` function requires the index of the trade, which can be obtained through the means described [here](/developers/guides/limit-order#trade-index). We additionally require a signed price update from Pyth to update Berp's internal price oracle.

Pyth requires an [update fee](https://docs.pyth.network/price-feeds/api-reference/evm/get-update-fee) for each price update, which is passed in as the `value` argument (set at 2 wei currently).

```typescript
const priceUpdateData = await pythConnection.getPriceFeedsUpdateData([
  PRICE_ID,
  USDC_PRICE_ID,
]);

const tx = await tradingContract.closeTradeMarket(
  TRADE_INDEX, // Index of the trade to close
  priceUpdateData,
  { value: 2 },
);
```

## ABI

The relevant part of the `EntrypointContractABI` containing the `closeTradeMarket` function is as follows:

```json
[
  {
    "type": "function",
    "name": "closeTradeMarket",
    "inputs": [
      { "name": "tradeIndex", "type": "uint256", "internalType": "uint256" },
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
