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

:::warning ⚠️ Security Notice

On January 21st, 2025, Balancer disclosed a long-standing vulnerability in their V2 Vault implementation. BEX incorporates contract logic from Balancer V2 and shares the same vulnerability. We advise users creating new pools to assess the vulnerability and exercise additional caution, particularly when including **untrusted or newly-created tokens**.

**Funds currently deposited in BEX are safe, and no action from LPs is needed.** The issue only (potentially) affects tokens that are not live on-chain today. Frontend warnings are displayed on BEX for potentially vulnerable tokens.

For more information, see the [Balancer disclosure](https://forum.balancer.fi/t/balancer-v2-token-frontrun-vulnerability-disclosure/6309).
:::

BEX is the native decentralized exchange (DEX) protocol of Berachain, built as a fork of Balancer V2. BEX enables trading between any combination of tokens through weighted and stable pools.

![BEX All Pools](/assets/all_pools.png)

> <small>BEX can be accessed on {{config.mainnet.chainName}} here: <a target="_blank" :href="config.mainnet.dapps.bex.url">{{config.mainnet.dapps.bex.url}}</a></small>

## How BEX Works

BEX uses an AMM model where traditional order book markets are replaced with liquidity pools. Users can create and provide liquidity to two types of pools:

- Weighted pools with up to 8 tokens and customizable weights
- Stable pools optimized for tokens of similar value

BEX is run entirely within a single smart contract, making BEX extremely efficient and lightweight. The design of BEX is inspired by the innovations pioneered by [Balancer](https://balancer.fi/).
![Add Liquidity Interface](/assets/add_liquidity.png)

## Key Features

BEX's architecture choices provide several core advantages:

- Accommodates traditional full-range liquidity pools (i.e., "Uniswap V2 style"), providing a simple and efficient trading experience
- Supports custom weights such as 80/20 for customized exposure
- Supports stable swap curves for trading pegged assets
- Unified vault architecture increases capital efficiency and gas costs
