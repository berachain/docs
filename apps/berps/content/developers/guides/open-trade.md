---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Open a Trade
  - - meta
    - name: description
      content: Guide for programatically executing a trade on Berps.
  - - meta
    - property: og:description
      content: Guide for programatically executing a trade on Berps.
---

# Berps Developer Guides: Open a Trade

This guide walks through the process of programmatically executing trades on Berps, using TypeScript and Ethers.js. This article assumes usage on the Berachain V2 Testnet - please adapt contract addresses and providers to your specific environment.

## Step 1: Import Dependencies & Define Constants

First, import the necessary dependencies and define constants, including the relevant trading contract address, Pyth endpoint and the [Price Feed IDs](https://pyth.network/developers/price-feed-ids) for the relevant assets. Here, `ETH/USD` and `USDC/USD` feeds are used.

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

Create an instance of an Ethers.js signer and connect to the Berps trading contract and the Pyth price provider:

```typescript
const signer = new ethers.Wallet(YOUR_PRIVATE_KEY, ETHERS_PROVIDER);

const tradingContract = new ethers.Contract(
  ENTRYPOINT_CONTRACT_ADDRESS,
  EntrypointContractABI,
  signer
);
const pythConnection = new EvmPriceServiceConnection(PYTH_ENDPOINT);
```

## Step 3: Fetch Price Updates and Execute Trade

We require two things from Pyth oracles in order to execute a trade:

1. The current asset price (to inform our trade execution price, converted to 10 decimal places)
2. A signed price update (to update Berp's internal price oracle)

The `openTrade` function takes the arguments below, explained in further detail [here](/developers/contracts/entrypoint##opentrade). Pyth requires an [update fee](https://docs.pyth.network/price-feeds/api-reference/evm/get-update-fee) for each price update, which is passed in as the `value` argument (set at 2 wei in this example).

```typescript
const [priceUpdateData, priceFeeds] = await Promise.all([
  pythConnection.getPriceFeedsUpdateData([PRICE_ID, USDC_PRICE_ID]),
  pythConnection.getLatestPriceFeeds(PRICE_ID),
]);

const { price, expo } = priceFeeds[0].getPriceUnchecked();
const priceInTenDec = parseFloat(price) * Math.pow(10, 10 + expo);

const trade = {
  trader: signer.address,
  pairIndex: 1, // Corresponds to trading pair (ETH-USD)
  index: 0, // Contract will determine
  initialPosToken: 0, // Contract will determine
  positionSizeHoney: ethers.parseEther("10"),
  openPrice: priceInTenDec,
  buy: true,
  leverage: 2n,
  tp: 0n,
  sl: 0n,
};

const orderType = 0; // 0 for MARKET, 1 for LIMIT
const slippage = ethers.parseUnits("3", 10); // 3% slippage

const tx = await tradingContract.openTrade(
  trade,
  orderType,
  slippage,
  priceUpdateData,
  { value: "2" }
);
```

## ABI

The relevant part of the `EntrypointContractABI` containing the `openTrade` function is as follows:

```json
[
  {
    "type": "function",
    "name": "openTrade",
    "inputs": [
      {
        "name": "t",
        "type": "tuple",
        "internalType": "struct IOrders.Trade",
        "components": [
          { "name": "trader", "type": "address", "internalType": "address" },
          { "name": "pairIndex", "type": "uint256", "internalType": "uint256" },
          { "name": "index", "type": "uint256", "internalType": "uint256" },
          {
            "name": "initialPosToken",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "positionSizeHoney",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "openPrice", "type": "int64", "internalType": "int64" },
          { "name": "buy", "type": "bool", "internalType": "bool" },
          { "name": "leverage", "type": "uint256", "internalType": "uint256" },
          { "name": "tp", "type": "int64", "internalType": "int64" },
          { "name": "sl", "type": "int64", "internalType": "int64" }
        ]
      },
      {
        "name": "orderType",
        "type": "uint8",
        "internalType": "enum ISettlement.TradeType"
      },
      { "name": "slippageP", "type": "int64", "internalType": "int64" },
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
