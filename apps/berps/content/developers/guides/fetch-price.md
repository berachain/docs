---
head:
  - - meta
    - property: og:title
      content: Developers Guide - Using Pyth Prices
  - - meta
    - name: description
      content: Guide for Using Pyth Prices.
  - - meta
    - property: og:description
      content: Guide for Using Pyth Prices.
---

# Berps Developer Guides: Using Pyth Prices

Pyth exposes a number of methods for retrieving pricing data. This page demonstrates a few options for doing so, but is not exhaustive. See [Pyth's documentation](https://docs.pyth.network/price-feeds/fetch-price-updates) for the full list.

## REST API

Hermes is a web service subscribed to the Pyth Network for price updates, and serves them via REST API. The following command retrieves the latest price updates for BTC/USD and ETH/USD:

```bash
curl -X 'GET' \
  'https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43&ids%5B%5D=0xc96458d393fe9deb7a7d63a0ac41e2898a67a7750dbd166673279e06c868df0a'
```

## TypeScript SDK

Pyth provides a TypeScript SDK for fetching price updates. More information on the SDK can be found [here](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/js).

First, install the Pyth SDK:

```bash
npm install @pythnetwork/pyth-evm-js
```

### Fetch Prices

Using the SDK, price updates can be fetched using `getLatestPriceFeeds` as follows:

```typescript
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

const pythConnection = new EvmPriceServiceConnection(
  "https://hermes.pyth.network",
);

const priceIds = [
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
];

const prices = await pythConnection.getLatestPriceFeeds(priceIds);
```

### Get Signed Price Update & Open Trade

Berps trading actions expect a signed price update to refresh its internal state. The following code snippet demonstrates how to fetch and submit a signed price update when opening a trade on Berps.

In order to prepare the necessary data for the trade, we first call the Pyth SDK's `getPriceFeedsUpdateData` to obtain the price update data. Next, `getUpdateFee` is called to obtain the fee required to update the price feed on-chain.

```typescript
import { ethers } from "ethers";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import PythAbi from "@pythnetwork/pyth-sdk-solidity/abis/IPyth.json" assert { type: "json" };

// Berachain Artio
const contractAddress = "0x8D254a21b3C86D32F7179855531CE99164721933";
const provider = ethers.getDefaultProvider("https://bartio.rpc.berachain.com/");
const pythContract = new ethers.Contract(contractAddress, PythAbi, provider);

const pythConnection = new EvmPriceServiceConnection(
  "https://hermes.pyth.network",
);

const priceIds = [
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
  "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a", // USDC/USD price id
];

const priceUpdateData = pythConnection.getPriceFeedsUpdateData(priceIds);
const updateFee = await pythContract.getUpdateFee(priceUpdateData);

// Use priceUpdates to `openTrade` in Berps:
const tx = await tradingContract.openTrade(
  trade,
  orderType,
  slippage,
  priceUpdateData,
  { value: updateFee },
);
```

#### Additional Resources

There is a small fee required to update Pyth's on-chain prices. Documentation on the `getUpdateFee` method is further described in [Pyth's docs](https://docs.pyth.network/price-feeds/api-reference/evm/get-update-fee).

The `openTrade` call here assumes that the user is opening a trade on the ETH/USD pair, and so price updates to both ETH and USDC price feeds are required (since collateral is denominated in USDC). See the [Open Trade guide](/developers/guides/open-trade) for more information on the required trading input parameters.
