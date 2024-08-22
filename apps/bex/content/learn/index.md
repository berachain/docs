---
head:
  - - meta
    - property: og:title
      content: What is BEX?
  - - meta
    - name: description
      content: BEX is the native decentralized exchange (DEX) protocol of Berachain, allowing users to trade between pairs of crypto assets
  - - meta
    - property: og:description
      content: BEX is the native decentralized exchange (DEX) protocol of Berachain, allowing users to trade between pairs of crypto assets
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is BEX? 🐻 ⛓️

BEX (Berachain Exchange) is the native decentralized exchange (DEX) protocol of Berachain, enabling trading of any arbitrary pair of crypto assets without the need for intermediaries.

<a target="_blank" :href="config.testnet.dapps.bex.url">

![BEX Splash](/assets/bex-splash.png)

</a>

> <small>BEX can be accessed on {{config.testnet.chainName}} here: <a target="_blank" :href="config.testnet.dapps.bex.url">{{config.testnet.dapps.bex.url}}</a></small>

## How BEX Works ⚙️

BEX is powered by an AMM. Buy and sell orders in traditional order book markets are instead replaced with liquidity pools of different pairs of assets. As one asset is traded for the other, the relative prices of the two assets shift, and a new market rate for both is determined.

BEX is run entirely within a single smart contract, making BEX extremely efficient and lightweight. The design of BEX is inspired by the innovations pioneered by [Ambient Finance](https://ambient.finance/).

## Key Features

BEX's architecture choices confer a number of core advantages over other DEXs:

- Significant gas savings
- Utilizes full-range (i.e., "Uniswap V2 style") liquidity within each pool, providing a simple and efficient trading experience
- Allows users to pre-fund tokens as "surplus collateral", increasing efficiency for active traders by deferring token transfers until settlement
- Supports "gasless" transactions through EIP-712 off-chain standard, where users can pay in the swapped token instead of gas
- Implements account abstraction, allowing users to submit off-chain orders and set up custom logic for fulfillment by relayers
- Offers unique "permissioned pool" primitive, enabling the ability to govern and restrict a pool using general purpose smart contract oracles
