<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What Is Berachain Berps 🐻⛓️

Berachain Berps is a native Berchain dApp that is a decentralized leveraged trading platform which allows for perpetual futures contract trading.

Berps allows for low trading fees on a vartiery of pairs (e.g. ETH-USDC) with leverages of up to 100x. This means with 10 `$HONEY` you can place a trade up to 100x which would equate to a position size of 1000 `$HONEY` (excluding fees).

The base token for Berps is Berachain's native ERC20 stablecoin called [$HONEY](/learn/tokens/honey) for all trades, payouts, and deposits. It is the main and only token used to open any positions. If you'd like to get `$HONEY`, you can do so by getting it at the main <a target="_blank" :href="config.testnet.dapps.honeySwap.url">{{config.testnet.dapps.honeySwap.name}}</a>

![Berachain Perps](/assets/berachain-berps.png)

> {{config.testnet.dapps.berps.name}} can be found at <a target="_blank" :href="config.testnet.dapps.honeySwap.url">{{config.testnet.dapps.berps.url}}</a>

## What Are Perpetual Futures Contracts?

Perpetual futures contracts, similar to traditional futures contracts, allow traders to speculate on the future price of an asset and borrow a native asset (use leverage) to amplify potential returns larger than their actual holding.

The slight difference between traditional future contracts, is that perpetuals do not have an expiration and can hold position as long as they maintain adequate margin levels.

You can read more about it in [Leveraged Trading](/learn/leveraged-trading/).

## Why Does Berps Exist?

Berps exists as a native dApp to contribute to Berachain's [Proof-of-Liquidity](#todo) and allow liquidity to be put to work to secure the chain.

The Berps dApp contributes to Proof-of-Liquidity by allowing users to deposit their `$HONEY` (Liquidity Providers) in the [Berps Vault](/learn/vault/) and for that contribution be rewarded in the form of [Berachain Governance Token](/learn/tokens/bgt) (`$BGT`).

## Who Should Use Berps?

Berps is designed for both speculative trading and strategic hedging. While it offers the potential for high rewards, it also serves as a valuable tool for those looking to manage and mitigate risk in their portfolios. With the right knowledge and risk management strategies, users can effectively utilize Berps to hedge against market volatility and protect their investments, while still understanding that the risk of liquidation remains a possibility..

:::warning
The information provided here is intended for general informational purposes only and should not be considered legal advice. Users are advised to comply with all applicable local, state, and federal laws and regulations. It is the user's responsibility to ensure that their actions are lawful in their respective jurisdictions. The provider of this information is not liable for any actions taken by users based on the content provided. Users should consult with a qualified legal professional for specific legal guidance related to their circumstances.
:::
