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

<a :href="config.mainnet.dapps.hub.url">

![Berachain BeraHub dApp](/assets/berahub.png)

</a>

> <small><a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.url}}</a></small>

BeraHub is the place to manage all things `$BGT`.

Users can expect to:

1. Review active <a :href="config.mainnet.dapps.hub.url + '/gauge'">reward vaults</a>
2. Review active <a :href="config.mainnet.dapps.hub.url + '/validators'">validator</a> set
3. <a :href="config.mainnet.dapps.hub.url + '/delegate'">Boost </a> validators with `$BGT`
4. <a :href="config.mainnet.dapps.hub.url + '/redeem'">Redeem `$BGT` for `$BERA`</a>
5. <a :href="config.mainnet.dapps.hub.url + '/rewards'">Claim earned `$BGT` rewards</a>
6. <a :href="config.mainnet.dapps.hub.url + '/swap'">Swap assets</a>
7. <a :href="config.mainnet.dapps.hub.url + '/governance'">Participate in Governance</a>
