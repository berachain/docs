---
head:
  - - meta
    - property: og:title
      content: What is BEX?
  - - meta
    - name: description
      content: BEX is the native decentralized exchange (DEX) protocol of Berachain, enabling efficient trading and liquidity provision
  - - meta
    - property: og:description
      content: BEX is the native decentralized exchange (DEX) protocol of Berachain, enabling efficient trading and liquidity provision
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# What is BEX?

BEX is the native decentralized exchange (DEX) protocol of Berachain. BEX enables trading between any combination of tokens through weighted and stable pools.

![BEX All Pools](https://i.imgur.com/q3b8eXa.jpeg)

> <small>BEX can be accessed on {{config.mainnet.chainName}} here: <a target="_blank" :href="config.websites.bex.url">{{config.websites.bex.url}}</a></small>

:::warning ⚠️ Security Notice

On January 21st, 2025, Balancer disclosed a vulnerability in their V2 Vault implementation. BEX shares this vulnerability. **Funds currently deposited in BEX are safe and no action is needed.** When creating new pools, exercise caution with untrusted or newly-created tokens. Frontend warnings are displayed for potentially vulnerable tokens. Future plans include integrating Balancer V3, which mitigates this issue. See the [Balancer disclosure](https://forum.balancer.fi/t/balancer-v2-token-frontrun-vulnerability-disclosure/6309) for details.
:::
