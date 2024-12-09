---
head:
  - - meta
    - property: og:title
      content: Berachain Bera Hub
  - - meta
    - name: description
      content: Berachain Bera Hub is the place to manage all things $BGT
  - - meta
    - property: og:description
      content: Berachain Bera Hub is the place to manage all things $BGT
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Bera Hub 🐻⛓️

<a :href="config.testnet.dapps.berahub.url">

![Berachain Bera Hub dApp](/assets/dapp-berahub.png)

</a>

> <small><a :href="config.testnet.dapps.berahub.url">{{config.testnet.dapps.berahub.url}}</a></small>

Bera Hub is the place to manage all things `$BGT`.

Users can expect to:

1. Review active <a :href="config.testnet.dapps.berahub.url + 'vaults'">reward vaults</a>
2. Review active <a :href="config.testnet.dapps.berahub.url + 'validators'">validator</a> set
3. <a :href="config.testnet.dapps.berahub.url + 'redeem'">Redeem `$BGT` for `$BERA`</a>
4. <a :href="config.testnet.dapps.berahub.url + 'swap'">Swap tokens</a> on BEX
5. <a :href="config.testnet.dapps.berahub.url + 'pools'">Add liquidity</a> to various token pools on BEX
