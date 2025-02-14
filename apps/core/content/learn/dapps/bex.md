---
head:
  - - meta
    - property: og:title
      content: Berachain BeraSwap
  - - meta
    - name: description
      content: Berachain BeraSwap is a native decentralize exchange
  - - meta
    - property: og:description
      content: Berachain BeraSwap is a native decentralize exchange
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain BeraSwap 🐻⛓️

Berachain's native decentralized exchange (DEX) is called BeraSwap, which allows for trading of any arbitrary pair of crypto assets via swapping and providing liquidity into [liquidity pools](/learn/help/glossary#liquidity-pool).

<a target="_blank" :href="config.mainnet.dapps.bex.url ">

![Berachain BeraSwap Native dApp](/assets/beraswap.png)

</a>

> <a target="_blank" :href="config.mainnet.dapps.bex.url">{{config.mainnet.dapps.bex.url}}</a>

Pools deposits in BeraSwap can become eligible for [$BGT](/learn/pol/tokens/bgt) emissions & incentivization by whitelisting associated [Reward Vaults](/learn/pol/rewardvaults) via governance.

> To learn more, check out the <a :href="config.websites.docsBex.url">{{config.websites.docsBex.name}}</a>.

## Default Reward Allocation

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, default allocations are used, benefitting key BeraSwap liquidity pools. The default allocation is as follows:

| Pool assets           | Type     | Weights | Allocation  | Fee   | Amplification |
| --------------------- | -------- | ------- | ----------- | ----- | ------------- |
| BERA - HONEY          | Weighted | 50-50   | 35.00%      | 0.30% | n.a.          |
| BERA - WETH           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| BERA - WBTC           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| USDC - HONEY          | Stable   | 50-50   | 7.50%       | 0.01% | 2000          |
| BYUSD (pyUSD) - HONEY | Stable   | 50-50   | 7.50%       | 0.01% | 1000          |
| **Total**             |          |         | **100.00%** |       |               |
