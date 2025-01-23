---
head:
  - - meta
    - property: og:title
      content: Berachain's BeraHub
  - - meta
    - name: description
      content: Berachain's BeraHub is the place to manage all things $BGT
  - - meta
    - property: og:description
      content: Berachain's BeraHub is the place to manage all things $BGT
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain's BeraHub 🐻⛓️

BeraHub is the place to manage all things `$BGT` and access Berachain liquidity through BeraSwap.

<a :href="config.mainnet.dapps.hub.url">

![Berachain BeraHub dApp](/assets/berahub.png)

</a>

> <small><a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.url}}</a></small>

Users can expect to:

1. Review active <a target="_blank" :href="config.mainnet.dapps.hub.url + 'gauge'">Reward Vaults</a>
2. Review active <a target="_blank" :href="config.mainnet.dapps.hub.url + 'validators'">Validators</a>
3. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'delegate'">Boost </a> validators with `$BGT`
4. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'redeem'">Redeem `$BGT` for `$BERA`</a>
5. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'rewards'">Claim earned `$BGT` rewards</a>
6. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'swap'">Swap assets</a>
7. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'pools'">Provide BeraSwap liquidity</a>
8. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'governance'">Participate in Governance</a>
