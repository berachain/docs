---
head:
  - - meta
    - property: og:title
      content: Berachain NFT Collections
  - - meta
    - name: description
      content: Overview of the official Berachain NFT collections
  - - meta
    - property: og:description
      content: Overview of the official Berachain NFT collections
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain NFTs

Berachain's journey began rather unconventionally. What started as a bear-themed NFT project in 2021 eventually evolved into a novel blockchain pioneering Proof-of-Liquidity, thanks in part to the strong builder community rallying around the NFTs.

## Official Collections

There are six NFT collections that form Berachain's official NFTs. Each collection builds upon previous ones through a rebasing mechanism whereby holders of all previous collections are rewarded NFTs from subsequent collections. For example, a **Bong Bear** (the original collection) holder would receive 1 **Bond Bear**, and subsequently 2 **Boo Bears** for holding the first two collections.

Following are OpenSea links to each collection, in the order they were released:

- [Bong Bears](https://opensea.io/collection/bongbears)
- [Bond Bears](https://opensea.io/collection/bond-bears)
- [Boo Bears](https://opensea.io/collection/boo-bears)
- [Baby Bears](https://opensea.io/collection/the-baby-bears)
- [Band Bears](https://opensea.io/collection/the-band-bears)
- [Bit Bears](https://opensea.io/collection/berachain-bit-bears)

See the [deployed contracts](/developers/deployed-contracts) for the relevant addresses on both Ethereum and Berachain.

## Bridge Your Bears

All six official collections can be bridged from Ethereum to Berachain using the Berachain NFT bridge.

<a target="_blank" :href="config.websites.nftBridge.url">

![Bera NFT Bridge](/assets/nft-bridge.png)

</a>

> <a target="_blank" :href="config.websites.nftBridge.url">{{config.websites.nftBridge.url}}</a>
