---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Limit Orders
  - - meta
    - name: description
      content: Guide for creating and executing limit orders on Berps.
  - - meta
    - property: og:description
      content: Guide for creating and executing limit orders on Berps.
---

# Berps Developer Guides: Limit Orders

Limit orders are a type of order that allows traders to set a specific price at which they would like to buy or sell an asset. [Bots](/developers/bots/) are responsible for executing limit order when the market price reaches the limit price.

## Creating a Limit Order

To create a limit order, a trader calls `openTrade` on the `Entrypoint` contract with the `orderType = 1`. A TypeScript example is shown below:

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

const limitPrice = ... // The price you would like your trade to execute (10 decimals)

// Prepare the trade parameters
const trade = {
    trader: signer.address,
    pairIndex: 1, // Corresponds to trading pair (ETH-USD)
    index: 0, // Contract will determine
    initialPosToken: 0, // Contract will determine
    positionSizeHoney: ethers.utils.parseEther('10'),
    openPrice: limitPrice,
    buy: true,
    leverage: 2n,
    tp: 0n,
    sl: 0n,
};

const orderType = 1; // 1 for LIMIT

const tx = await tradingContract.openTrade(
    trade,
    orderType,
    0, // 0 slippage for limit orders
    priceUpdateData,
    { value: '2' },
);
```

## Executing a Limit Order

To execute a limit order, a trader calls `executeLimitOrder` on the `Entrypoint` contract. There are several different types of limit orders, which are defined in the `LimitOrder` enum.

```solidity
enum LimitOrder {
    TP, // Take profit
    SL, // Stop loss
    LIQ, // Liquidation
    OPEN // Open position
}
```

If the conditions have been met for the limit order to execute, the `executeLimitOrder` function will execute the order on behalf of the trader. Following is a example of executing the limit order created in the previous section:

```typescript
const tx = await tradingContract.executeLimitOrder(
  TRADE_INDEX, // Index of the trade to execute
  priceUpdateData,
  { value: 2 }
);
```

Traders and bot operators are incentivized to execute limit orders to collect fees, described in the [Fees section](/learn/leveraged-trading/fees-spread).

### Trade Index

Every trade and open limit order has a unique identifier, called the "trade index". Executing a limit order on an open trade requires knowing the index of the trade to execute. That is - take profit, stop loss, and liquidation orders are executed on the same trade index. The price will dictate which type of order is executed.

Presently, the list of trade indexes can be queried by iterating over [`Orders.getOpenTrades()`](/developers/contracts/orders#getopentrades), or indexed off-chain by monitoring for the events emitted through opened trades:

- `Settlement.MarketOpened` (for market orders)
- `Entrypoint.OpenLimitPlaced` (for limit orders)

In the future, an API endpoint to query open trades may be made available.

## ABI

The relevant part of the `EntrypointContractABI` containing the `openTrade` and `executeLimitOrder` functions is as follows:

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
  },
  {
    "type": "function",
    "name": "executeLimitOrder",
    "inputs": [
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
