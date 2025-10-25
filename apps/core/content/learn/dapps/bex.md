---
head:
  - - meta
    - property: og:title
      content: Berachain BEX
  - - meta
    - name: description
      content: Berachain BEX is a native decentralized exchange
  - - meta
    - property: og:description
      content: Berachain BEX is a native decentralized exchange
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain BEX 🐻⛓️

Berachain's native decentralized exchange (DEX), BEX, allows trading of any arbitrary pair of crypto assets via swapping and providing liquidity into [liquidity pools](/learn/help/glossary#liquidity-pool).

<a target="_blank" :href="config.websites.bex.url ">

![Berachain BEX Native dApp](/assets/bex-dapp.png)

</a>

> <a target="_blank" :href="config.websites.bex.url">{{config.websites.bex.url}}</a>

Pool deposits in BEX can become eligible for [$BGT](/learn/pol/tokens/bgt) emissions and incentivization by whitelisting associated [Reward Vaults](/learn/pol/rewardvaults) via governance.

> To learn more, check out the <a :href="config.websites.docsBex.url">{{config.websites.docsBex.name}}</a>.

## Default Reward Allocation

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, default allocations are used, benefitting key BEX liquidity pools. The default allocation is as follows:

| Pool assets           | Type     | Weights | Allocation  | Fee   | Amplification |
| --------------------- | -------- | ------- | ----------- | ----- | ------------- |
| BERA - HONEY          | Weighted | 50-50   | 35.00%      | 0.30% | n.a.          |
| BERA - WETH           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| BERA - WBTC           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| USDC - HONEY          | Stable   | 50-50   | 7.50%       | 0.01% | 2000          |
| BYUSD (pyUSD) - HONEY | Stable   | 50-50   | 7.50%       | 0.01% | 1000          |
| **Total**             |          |         | **100.00%** |       |               |
