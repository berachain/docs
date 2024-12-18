---
head:
  - - meta
    - property: og:title
      content: Berps Deployed Contracts
  - - meta
    - name: description
      content: Berps Deployed contract addresses.
  - - meta
    - property: og:description
      content: Berps Deployed contract addresses.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berps Deployed Contracts

The following is a list of contract address in order to interact with Berachain Berps.

> A full list of Contract ABIs can be found at https://github.com/berachain/doc-abis

| Name                                                                                                                                                                                                                   | Address                                                                                                                                                                   | ABI                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| <a v-if="config.contracts.entrypoint.docsUrl" :href="config.contracts.entrypoint.docsUrl">{{config.contracts.entrypoint.name}}</a><span v-else>{{config.contracts.entrypoint.name}}</span>                             | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.entrypoint.address">{{config.contracts.entrypoint.address}}</a>               | <a target="_blank" v-if=config.contracts.entrypoint.abi :href="config.contracts.entrypoint.abi">ABI File</a>               |
| <a v-if="config.contracts.feesAccrued.docsUrl" :href="config.contracts.feesAccrued.docsUrl">{{config.contracts.feesAccrued.name}}</a><span v-else>{{config.contracts.feesAccrued.name}}</span>                         | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.feesAccrued.address">{{config.contracts.feesAccrued.address}}</a>             | <a target="_blank" v-if=config.contracts.feesAccrued.abi :href="config.contracts.feesAccrued.abi">ABI File</a>             |
| <a v-if="config.contracts.feesMarkets.docsUrl" :href="config.contracts.feesMarkets.docsUrl">{{config.contracts.feesMarkets.name}}</a><span v-else>{{config.contracts.feesMarkets.name}}</span>                         | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.feesMarkets.address">{{config.contracts.feesMarkets.address}}</a>             | <a target="_blank" v-if=config.contracts.feesMarkets.abi :href="config.contracts.feesMarkets.abi">ABI File</a>             |
| <a v-if="config.contracts.markets.docsUrl" :href="config.contracts.markets.docsUrl">{{config.contracts.markets.name}}</a><span v-else>{{config.contracts.markets.name}}</span>                                         | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.markets.address">{{config.contracts.markets.address}}</a>                     | <a target="_blank" v-if=config.contracts.markets.abi :href="config.contracts.markets.abi">ABI File</a>                     |
| <a v-if="config.contracts.orders.docsUrl" :href="config.contracts.orders.docsUrl">{{config.contracts.orders.name}}</a><span v-else>{{config.contracts.orders.name}}</span>                                             | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.orders.address">{{config.contracts.orders.address}}</a>                       | <a target="_blank" v-if=config.contracts.orders.abi :href="config.contracts.orders.abi">ABI File</a>                       |
| <a v-if="config.contracts.referrals.docsUrl" :href="config.contracts.referrals.docsUrl">{{config.contracts.referrals.name}}</a><span v-else>{{config.contracts.referrals.name}}</span>                                 | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.referrals.address">{{config.contracts.referrals.address}}</a>                 | <a target="_blank" v-if=config.contracts.referrals.abi :href="config.contracts.referrals.abi">ABI File</a>                 |
| <a v-if="config.contracts.settlement.docsUrl" :href="config.contracts.settlement.docsUrl">{{config.contracts.settlement.name}}</a><span v-else>{{config.contracts.settlement.name}}</span>                             | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.settlement.address">{{config.contracts.settlement.address}}</a>               | <a target="_blank" v-if=config.contracts.settlement.abi :href="config.contracts.settlement.abi">ABI File</a>               |
| <a v-if="config.contracts.vault.docsUrl" :href="config.contracts.vault.docsUrl">{{config.contracts.vault.name}}</a><span v-else>{{config.contracts.vault.name}}</span>                                                 | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.vault.address">{{config.contracts.vault.address}}</a>                         | <a target="_blank" v-if=config.contracts.vault.abi :href="config.contracts.vault.abi">ABI File</a>                         |
| <a v-if="config.contracts.vaultSafetyModule.docsUrl" :href="config.contracts.vaultSafetyModule.docsUrl">{{config.contracts.vaultSafetyModule.name}}</a><span v-else>{{config.contracts.vaultSafetyModule.name}}</span> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.vaultSafetyModule.address">{{config.contracts.vaultSafetyModule.address}}</a> | <a target="_blank" v-if=config.contracts.vaultSafetyModule.abi :href="config.contracts.vaultSafetyModule.abi">ABI File</a> |

## Trading Pair Indices

| Trading Pair | Index |
| ------------ | ----- |
| BTC-USDC     | 0     |
| ETH-USDC     | 1     |
| ATOM-USDC    | 2     |
