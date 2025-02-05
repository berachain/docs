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

<a target="_blank" :href="config.mainnet.dapps.swap.url + '/swap'">

![Berachain BeraSwap Native dApp](/assets/beraswap.png)

</a>

> <small><a :href="config.mainnet.dapps.swap.url">{{config.mainnet.dapps.swap.url}}</a></small>

Pools deposits in BeraSwap can become eligible for [$BGT](https://docs.berachain.com/learn/pol/tokens/bgt) emissions & incentivization by whitelisting associated [Reward Vaults](/learn/pol/rewardvaults) via governance.

> To learn more, check out the <a :href="config.websites.docsSwap.url">{{config.websites.docsSwap.name}}</a>.

## Default Reward Allocation

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, the following default allocation is used:

| Pool assets | Type | Weights | Cutting board weight | Fee | Amplification |
|-------------|------|---------|---------------------|-----|---------------|
| Bera - Honey | Weighted | 50-50 | 35.00% | 0.30% | n.a. |
| Bera - wETH | Weighted | 50-50 | 25.00% | 0.30% | n.a. |
| Bera - wBTC | Weighted | 50-50 | 25.00% | 0.30% | n.a. |
| USDC - HONEY | Stable | 50-50 | 7.50% | 0.01% | 2000 |
| BYUSD (pyUSD) - Honey | Stable | 50-50 | 7.50% | 0.01% | 1000 |
| **Total** | | | **100.00%** | | |
