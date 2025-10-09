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

Berachain Bridge allows users to bridge select assets from many networks to Berachain, enabling seamless cross-chain asset transfers.

<a target="_blank" :href="config.mainnet.dapps.bridge.url">

![Berachain Bridge dApp](/assets/berachain-bridge.png)

</a>

> <a target="_blank" :href="config.mainnet.dapps.bridge.url">{{config.mainnet.dapps.bridge.url}}</a>

## Features

The Berachain Bridge supports:

- **Multi-network bridging**: Bridge assets from various supported networks to Berachain
- **Wrapper asset bridge**: Enables projects to migrate from Ethereum mainnet to Berachain
- **Secure cross-chain transfers**: Reliable and secure asset bridging infrastructure

## Project Migration

For projects looking to migrate tokens from other chains to Berachain, the bridge provides essential infrastructure. If you're interested in migrating a token from another chain, check out the [LayerZero OFT guide](/developers/guides/community-guides#bridging) in our community guides for detailed migration instructions.

## Supported Networks

The bridge supports bridging from multiple networks, providing flexibility for users and projects looking to access Berachain's ecosystem.
