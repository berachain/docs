---
head:
  - - meta
    - property: og:title
      content: Berachain Berps
  - - meta
    - name: description
      content: Berachain Berps is a native perpetual futures trading platform
  - - meta
    - property: og:description
      content: Berachain Berps is a native perpetual futures trading platform
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Berps 🐻⛓️

<a :href="config.testnet.dapps.berps.url">

![Berachain Berps Native dApp](/assets/berps-dapp.png)

</a>

> <small><a :href="config.testnet.dapps.berps.url">{{config.testnet.dapps.berps.url}}</a></small>

Berachain Berps is a decentralized leveraged trading platform which allows for perpetual futures contract trading.

Berachain's native stablecoin [`$HONEY`](/learn/pol/tokens/honey), serves as the base token for all trading collateral, payouts, and deposits. Users can passively earn by providing trading liquidity in the <a :href="config.websites.docsBerps.url + '/learn/vault/'">`$bHONEY` vault</a>. Vault depositors earn trading fees generated from Berps and serve as the counterparty to traders' positions.

In addition, the vault in Berps is an implementation of [Proof-of-Liquidity Reward Vaults](/learn/pol/rewardvaults) which allows stakers that deposit into the Reward Vault to become eligible to receive [`$BGT`](/learn/pol/tokens/bgt) emissions. This interaction demonstrates how PoL can incentivize users to take a variety of liquidity actions with dApps.

> To learn more, check out the <a :href="config.websites.docsBerps.name">{{config.websites.docsBerps.name}}</a>.
