---
head:
  - - meta
    - property: og:title
      content: Berps Oracle Overview
  - - meta
    - name: description
      content: Explanation of how Berps leverages Pyth Network for on-chain price feeds.
  - - meta
    - property: og:description
      content: Explanation of how Berps leverages Pyth Network for on-chain price feeds.
---

# Berps Oracle Overview 🔮

Berps relies on spot oracle price feeds for computing execution prices for trades. This contrasts with perpetual futures exchange that rely on limit order books to determine execution price (e.g. dYdX). Prices on Berps are provided by [Pyth Network](https://pyth.network/), a decentralized oracle network that provides real-time on-chain price feeds for various assets.

## What are Supported Listed Assets

You can refer to the [Listed Assets](/learn/leveraged-trading/listed-assets) for a list of supported trading pairs and their specific parameters. All of these assets are supported by underlying Pyth price feeds. See the [full list](https://pyth.network/developers/price-feed-ids) of Pyth's available price feeds.

## Pyth On-Demand Pricing in Berps

Pyth differs the traditional paradigm of "push" oracles, whereby off-chain relayers are responsible for pushing data on-chain, and consumers are able to read this data from a contract (e.g. Chainlink).

Pyth instead leverages a "pull" model where anyone can permissionlessly update the on-chain price with the following:

1. receive a signed update from a web service subscribing to the Pyth Network for price updates
2. submit that price update on-chain (as part of a Berps action, such as opening a trade) to interact with latest prices

## Fetching Price Updates

See our [guide](/developers/guides/fetch-price) for fetching price updates with Pyth and using them on Berps.

For more information, review [Pyth's guide](https://docs.pyth.network/price-feeds/fetch-price-updates) on different ways to fetch price updates.
