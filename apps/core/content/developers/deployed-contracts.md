---
head:
  - - meta
    - property: og:title
      content: Berachain Deployed Contracts
  - - meta
    - name: description
      content: List of Berachain core deployed contracts
  - - meta
    - property: og:description
      content: List of Berachain core deployed contracts
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Deployed Contract Addresses

This is a list of addresses where contracts can be read from or written to.

> **Contract ABIs:**
>
> - **Mainnet ABIs:** [berachain/abis/tree/main/mainnet/contracts](https://github.com/berachain/abis/tree/main/mainnet/contracts)
> - **Testnet ABIs:** [berachain/abis/tree/main/bepolia/contracts](https://github.com/berachain/abis/tree/main/bepolia/contracts)
> - **Staking Pools ABIs:** [berachain/abis/tree/main/mainnet/contracts-staking-pools](https://github.com/berachain/abis/tree/main/mainnet/contracts-staking-pools)

:::info
Deployed contracts have received several audits from various parties.
All audit reports are publicly available on [Github](https://github.com/berachain/security-audits).
:::

## Mainnet Contracts

<script>
const mainnet_render_groups = {
  "Proof of Liquidity": config.contracts.pol,
  "Staking Pools": config.contracts.stakingPools,
  "Tokens": config.contracts.tokens,
  "Safe": config.contracts.safe,
  "Other": config.contracts.other
}

const testnet_render_groups = {
  "Proof of Liquidity": config.contracts.pol,
  "Staking Pools": config.contracts.stakingPools,
  "Tokens": config.contracts.tokens,
  "Safe": config.contracts.safe,
  "Other": config.contracts.other
}
</script>

<template v-for="(contracts, title) in mainnet_render_groups">
  <h3>{{ title }}</h3>

  <table>
    <thead><tr><th>Name</th><th>Mainnet</th><th>ABI</th></tr></thead>
    <tbody>
      <template v-for="(sc, key) in contracts">
        <template v-if="sc['address']['berachainMainnet']">
          <tr>
            <td><template v-if="sc['docsUrl']"><a :href="sc.docsUrl">{{ sc.name }}</a></template><template v-else><b>{{ sc.name }}</b></template></td>
            <td>
              <a target="_blank" :href="config.websites.berascan.url + 'address/' + sc['address']['berachainMainnet']">{{sc['address']['berachainMainnet']}}</a>
            </td> 
            <td><template v-if="sc?.abi"><a :href="sc.abi">ABI</a></template><template v-else-if="sc?.abiNote">{{ sc.abiNote }}</template></td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

## Bepolia Testnet Contracts

<template v-for="(contracts, title) in testnet_render_groups">
  <h3>{{ title }}</h3>

  <table>
    <thead><tr><th>Name</th><th>Bepolia</th><th>ABI</th></tr></thead>
    <tbody>
      <template v-for="(sc, key) in contracts">
        <template v-if="sc['address']['berachainBepolia']">
          <tr>
            <td><template v-if="sc['docsUrl']"><a :href="sc.docsUrl">{{ sc.name }}</a></template><template v-else><b>{{ sc.name }}</b></template></td>
            <td>
              <a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + sc['address']['berachainBepolia']">{{sc['address']['berachainBepolia']}}</a>
            </td> 
            <td><template v-if="sc?.abi"><a :href="sc.abi">ABI</a></template><template v-else-if="sc?.abiNote">{{ sc.abiNote }}</template></td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

## NFT Contracts

Berachain NFT contract addresses on both Ethereum (via LayerZero adapters) and Berachain.

| Collection                               | Ethereum Adapter                                                                                                                                                                     | Berachain Address                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| {{config.contracts.nfts.bongBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.bongBears.address.ethereumMainnet">{{config.contracts.nfts.bongBears.address.ethereumMainnet}}</a> | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.bongBears.address.berachainMainnet">{{config.contracts.nfts.bongBears.address.berachainMainnet}}</a> |
| {{config.contracts.nfts.bondBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.bondBears.address.ethereumMainnet">{{config.contracts.nfts.bondBears.address.ethereumMainnet}}</a> | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.bondBears.address.berachainMainnet">{{config.contracts.nfts.bondBears.address.berachainMainnet}}</a> |
| {{config.contracts.nfts.booBears.name}}  | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.booBears.address.ethereumMainnet">{{config.contracts.nfts.booBears.address.ethereumMainnet}}</a>   | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.booBears.address.berachainMainnet">{{config.contracts.nfts.booBears.address.berachainMainnet}}</a>   |
| {{config.contracts.nfts.babyBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.babyBears.address.ethereumMainnet">{{config.contracts.nfts.babyBears.address.ethereumMainnet}}</a> | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.babyBears.address.berachainMainnet">{{config.contracts.nfts.babyBears.address.berachainMainnet}}</a> |
| {{config.contracts.nfts.bandBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.bandBears.address.ethereumMainnet">{{config.contracts.nfts.bandBears.address.ethereumMainnet}}</a> | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.bandBears.address.berachainMainnet">{{config.contracts.nfts.bandBears.address.berachainMainnet}}</a> |
| {{config.contracts.nfts.bitBears.name}}  | <a target="_blank" :href="'https://etherscan.io/address/' + config.contracts.nfts.bitBears.address.ethereumMainnet">{{config.contracts.nfts.bitBears.address.ethereumMainnet}}</a>   | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.nfts.bitBears.address.berachainMainnet">{{config.contracts.nfts.bitBears.address.berachainMainnet}}</a>   |
