---
head:
  - - meta
    - property: og:title
      content: Berachain Bend
  - - meta
    - name: description
      content: Berachain Bend is a native lending protocol
  - - meta
    - property: og:description
      content: Berachain Bend is a native lending protocol
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Bend 🐻⛓️

<a :href="config.testnet.dapps.bend.url">

![Berachain Bend Native dApp](/assets/bend-dapp.png)

</a>

> <small><a :href="config.testnet.dapps.bend.url">{{config.testnet.dapps.bend.url}}</a></small>

Bend is Berachain's non-custodial lending protocol. Lenders participate by depositing stablecoins to earn transaction fees when users borrow their tokens. Meanwhile, borrowers can deposit crypto collateral (e.g. wBTC) to access these stablecoins whilst maintaining exposure to their collateral assets.

Berachain's native stablecoin [`$HONEY`](/learn/pol/tokens/honey), serves as the primary and exclusive token available for borrowing.

In addition, Bend is an implementation of [Proof-of-Liquidity Reward Vaults](/learn/pol/rewardvaults) which which allows borrowers to become eligible to receive [`$BGT`](/learn/pol/tokens/bgt) emissions. It also demonstrates how PoL can incentivize users to take different types of liquidity actions with dApps.

> To learn more, check out the <a :href="config.websites.docsBend.name">{{config.websites.docsBend.name}}</a>.
