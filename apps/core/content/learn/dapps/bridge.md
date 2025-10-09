---
head:
  - - meta
    - property: og:title
      content: Berachain Bridge
  - - meta
    - name: description
      content: Berachain Bridge allows users to bridge select assets from many networks to Berachain
  - - meta
    - property: og:description
      content: Berachain Bridge allows users to bridge select assets from many networks to Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Bridge 🐻⛓️

Berachain Bridge allows users to bridge select assets from many networks to Berachain, enabling seamless cross-chain asset transfers. The bridge also supports wrapper asset bridging, which enables projects to migrate from Ethereum mainnet to Berachain.

<a target="_blank" :href="config.mainnet.dapps.bridge.url">

![Berachain Bridge dApp](/assets/berachain-bridge.png)

</a>

> <a target="_blank" :href="config.mainnet.dapps.bridge.url">{{config.mainnet.dapps.bridge.url}}</a>

This is the official Berachain Bridge. It can be used to bridge select assets from a variety of chains into Berachain.

## Wrapped Asset Bridge

The wrapper asset bridge enables projects to migrate from Ethereum mainnet to Berachain. If you're interested in migrating a token from another chain to Berachain, check out the [LayerZero OFT guide](/developers/guides/community-guides#bridging) in our community guides for detailed migration instructions.
