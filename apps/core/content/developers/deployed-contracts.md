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

> A full list of Contract ABIs can be found at https://github.com/berachain/doc-abis

:::info
Deployed contracts have received several audits from various parties.
All audit reports are publicly available on [Github](https://github.com/berachain/security-audits).
:::

## Mainnet Contracts

<script>
const mainnet_render_groups = {
  "Proof of Liquidity": config.contracts.pol,
  "Tokens": config.contracts.tokens,
  "Safe": config.contracts.safe,
  "Other": config.contracts.other
}

const testnet_render_groups = {
  "Proof of Liquidity": config.contracts.pol,
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
        <template v-if="sc['mainnet-address']">
          <tr>
            <td><template v-if="sc['docsUrl']"><a :href="sc.docsUrl">{{ sc.name }}</a></template><template v-else><b>{{ sc.name }}</b></template></td>
            <td>
              <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + sc['mainnet-address']">{{sc['mainnet-address']}}</a>
            </td> 
            <td><template v-if="sc?.abi"><a :href="sc.abi">ABI</a></template></td>
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
        <template v-if="sc['bepolia-address']">
          <tr>
            <td><template v-if="sc['docsUrl']"><a :href="sc.docsUrl">{{ sc.name }}</a></template><template v-else><b>{{ sc.name }}</b></template></td>
            <td>
              <a target="_blank" :href="config.bepolia.dapps.beratrail.url + 'address/' + sc['bepolia-address']">{{sc['bepolia-address']}}</a>
            </td> 
            <td><template v-if="sc?.abi"><a :href="sc.abi">ABI</a></template></td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

## NFT Contracts

Berachain NFT contract addresses on both Ethereum (via LayerZero adapters) and Berachain.

| Collection                                       | Ethereum Adapter                                                                                                                                                                     | Berachain Address                                                                                                                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {{config.mainnet.contracts.nfts.bongBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.bongBears.ethereumAddress">{{config.mainnet.contracts.nfts.bongBears.ethereumAddress}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.bongBears.berachainAddress">{{config.mainnet.contracts.nfts.bongBears.berachainAddress}}</a> |
| {{config.mainnet.contracts.nfts.bondBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.bondBears.ethereumAddress">{{config.mainnet.contracts.nfts.bondBears.ethereumAddress}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.bondBears.berachainAddress">{{config.mainnet.contracts.nfts.bondBears.berachainAddress}}</a> |
| {{config.mainnet.contracts.nfts.booBears.name}}  | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.booBears.ethereumAddress">{{config.mainnet.contracts.nfts.booBears.ethereumAddress}}</a>   | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.booBears.berachainAddress">{{config.mainnet.contracts.nfts.booBears.berachainAddress}}</a>   |
| {{config.mainnet.contracts.nfts.babyBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.babyBears.ethereumAddress">{{config.mainnet.contracts.nfts.babyBears.ethereumAddress}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.babyBears.berachainAddress">{{config.mainnet.contracts.nfts.babyBears.berachainAddress}}</a> |
| {{config.mainnet.contracts.nfts.bandBears.name}} | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.bandBears.ethereumAddress">{{config.mainnet.contracts.nfts.bandBears.ethereumAddress}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.bandBears.berachainAddress">{{config.mainnet.contracts.nfts.bandBears.berachainAddress}}</a> |
| {{config.mainnet.contracts.nfts.bitBears.name}}  | <a target="_blank" :href="'https://etherscan.io/address/' + config.mainnet.contracts.nfts.bitBears.ethereumAddress">{{config.mainnet.contracts.nfts.bitBears.ethereumAddress}}</a>   | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.nfts.bitBears.berachainAddress">{{config.mainnet.contracts.nfts.bitBears.berachainAddress}}</a>   |
