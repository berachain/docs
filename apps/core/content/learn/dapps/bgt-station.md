---
head:
  - - meta
    - property: og:title
      content: Berachain BGT Station
  - - meta
    - name: description
      content: Berachain BGT Station is the place to manage all things $BGT
  - - meta
    - property: og:description
      content: Berachain BGT Station is the place to manage all things $BGT
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain BGT Station 🐻⛓️

<a :href="config.testnet.dapps.bgtStation.url">

![Berachain BGT Station dApp](/assets/dapp-bgtstation.png)

</a>

> <small><a :href="config.testnet.dapps.bgtStation.url">{{config.testnet.dapps.bgtStation.url}}</a></small>

BGT Station is the place to manage all things `$BGT`.

Users can expect to:

1. Review active <a :href="config.testnet.dapps.bgtStation.url + '/gauge'">reward vaults</a>
2. Review active <a :href="config.testnet.dapps.bgtStation.url + '/validators'">validator</a> set
3. <a :href="config.testnet.dapps.bgtStation.url + '/delegate'">Delegate or unbond</a> `$BGT` with validators
4. <a :href="config.testnet.dapps.bgtStation.url + '/redeem'">Redeem `$BGT` for `$BERA`</a>
5. <a :href="config.testnet.dapps.bgtStation.url + '/rewards'">Claim earned `$BGT` rewards</a>
