---
head:
  - - meta
    - property: og:title
      content: What is BEX?
  - - meta
    - name: description
      content: BEX is a fork of Balancer V2, enabling efficient trading and liquidity provision on Berachain
  - - meta
    - property: og:description
      content: BEX is a fork of Balancer V2, enabling efficient trading and liquidity provision on Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is BEX?

BEX (Berachain Exchange) is the native decentralized exchange (DEX) protocol of Berachain, built as a fork of Balancer V2. BEX enables trading between any combination of tokens through weighted and stable pools.

![BEX All Pools](/assets/all_pools.png)

> <small>BEX can be accessed on {{config.testnet.chainName}} here: <a target="_blank" :href="config.testnet.dapps.bex.url">{{config.testnet.dapps.bex.url}}</a></small>

## How BEX Works

BEX uses an AMM model where traditional order book markets are replaced with liquidity pools. Users can create and provide liquidity to two types of pools:
- Weighted pools with up to 8 tokens and customizable weights
- Stable pools optimized for tokens of similar value

![Add Liquidity Interface](/assets/add_liquidity.png)

## Key Features

BEX's architecture choices provide several core advantages:

- Support for multi-token pools (up to 8 tokens)
- Flexible pool weights and configurations
- Smart Order Routing for optimal trade execution
- Integration with Berachain's Proof of Liquidity system
- Protocol fees that benefit BGT stakers
