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

## Mainnet Contracts

### Proof-of-Liquidity

| Name                                                                                                                              | Address                                                                                                                                                                                               | ABI                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a :href="config.mainnet.contracts.beaconDeposit.docsUrl">{{config.mainnet.contracts.beaconDeposit.name}}</a>                     | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.beaconDeposit.address">{{config.mainnet.contracts.beaconDeposit.address}}</a>                     | <a target="_blank" v-if=config.mainnet.contracts.beaconDeposit.abi :href="config.mainnet.contracts.beaconDeposit.abi">ABI</a>                     |
| <a :href="config.mainnet.contracts.berachef.docsUrl">{{config.mainnet.contracts.berachef.name}}</a>                               | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.berachef.address">{{config.mainnet.contracts.berachef.address}}</a>                               | <a target="_blank" v-if=config.mainnet.contracts.berachef.abi :href="config.mainnet.contracts.berachef.abi">ABI</a>                               |
| <a :href="config.mainnet.contracts.blockRewardsController.docsUrl">{{config.mainnet.contracts.blockRewardsController.name}}</a>   | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.blockRewardsController.address">{{config.mainnet.contracts.blockRewardsController.address}}</a>   | <a target="_blank" v-if=config.mainnet.contracts.blockRewardsController.abi :href="config.mainnet.contracts.blockRewardsController.abi">ABI</a>   |
| <a :href="config.mainnet.contracts.distributor.docsUrl">{{config.mainnet.contracts.distributor.name}}</a>                         | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.distributor.address">{{config.mainnet.contracts.distributor.address}}</a>                         | <a target="_blank" v-if=config.mainnet.contracts.distributor.abi :href="config.mainnet.contracts.distributor.abi">ABI</a>                         |
| <a :href="config.mainnet.contracts.rewardVault.docsUrl">{{config.mainnet.contracts.rewardVault.name}}</a>                         | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.rewardVault.address">{{config.mainnet.contracts.rewardVault.address}}</a>                         | <a target="_blank" v-if=config.mainnet.contracts.rewardVault.abi :href="config.mainnet.contracts.rewardVault.abi">ABI</a>                         |
| <a :href="config.mainnet.contracts.rewardVaultFactory.docsUrl">{{config.mainnet.contracts.rewardVaultFactory.name}}</a>           | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.rewardVaultFactory.address">{{config.mainnet.contracts.rewardVaultFactory.address}}</a>           | <a target="_blank" v-if=config.mainnet.contracts.rewardVaultFactory.abi :href="config.mainnet.contracts.rewardVaultFactory.abi">ABI</a>           |
| <a :href="config.mainnet.contracts.bgtStaker.docsUrl">{{config.mainnet.contracts.bgtStaker.name}}</a>                             | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bgtStaker.address">{{config.mainnet.contracts.bgtStaker.address}}</a>                             | <a target="_blank" v-if=config.mainnet.contracts.bgtStaker.abi :href="config.mainnet.contracts.bgtStaker.abi">ABI</a>                             |
| <a :href="config.mainnet.contracts.feeCollector.docsUrl">{{config.mainnet.contracts.feeCollector.name}}</a>                       | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.feeCollector.address">{{config.mainnet.contracts.feeCollector.address}}</a>                       | <a target="_blank" v-if=config.mainnet.contracts.feeCollector.abi :href="config.mainnet.contracts.feeCollector.abi">ABI</a>                       |
| <a :href="config.mainnet.contracts.governance.docsUrl">{{config.mainnet.contracts.governance.name}}</a>                           | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.governance.address">{{config.mainnet.contracts.governance.address}}</a>                           | <a target="_blank" v-if=config.mainnet.contracts.governance.abi :href="config.mainnet.contracts.governance.abi">ABI</a>                           |
| <a :href="config.mainnet.contracts.timelock.docsUrl">{{config.mainnet.contracts.timelock.name}}</a>                               | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.timelock.address">{{config.mainnet.contracts.timelock.address}}</a>                               | <a target="_blank" v-if=config.mainnet.contracts.timelock.abi :href="config.mainnet.contracts.timelock.abi">ABI</a>                               |
| <a :href="config.mainnet.contracts.bgtIncentiveDistributor.docsUrl">{{config.mainnet.contracts.bgtIncentiveDistributor.name}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bgtIncentiveDistributor.address">{{config.mainnet.contracts.bgtIncentiveDistributor.address}}</a> | <a target="_blank" v-if=config.mainnet.contracts.bgtIncentiveDistributor.abi :href="config.mainnet.contracts.bgtIncentiveDistributor.abi">ABI</a> |

### Tokens

| Name                                                                                                        | Address                                                                                                                                                                         | ABI                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <a :href="config.mainnet.contracts.bgt.docsUrl">{{config.mainnet.contracts.bgt.name}}</a>                   | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bgt.address">{{config.mainnet.contracts.bgt.address}}</a>                   | <a target="_blank" v-if=config.mainnet.contracts.bgt.abi :href="config.mainnet.contracts.bgt.abi">ABI</a>                   |
| <a :href="config.mainnet.contracts.honeyFactory.docsUrl">{{config.mainnet.contracts.honeyFactory.name}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.honeyFactory.address">{{config.mainnet.contracts.honeyFactory.address}}</a> | <a target="_blank" v-if=config.mainnet.contracts.honeyFactory.abi :href="config.mainnet.contracts.honeyFactory.abi">ABI</a> |
| <a :href="config.mainnet.contracts.honey.docsUrl">{{config.mainnet.contracts.honey.name}}</a>               | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.honey.address">{{config.mainnet.contracts.honey.address}}</a>               | <a target="_blank" v-if=config.mainnet.contracts.honey.abi :href="config.mainnet.contracts.honey.abi">ABI</a>               |
| <a :href="config.mainnet.contracts.usdc.docsUrl">{{config.mainnet.contracts.usdc.name}}</a>                 | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.usdc.address">{{config.mainnet.contracts.usdc.address}}</a>                 | <a target="_blank" v-if=config.mainnet.contracts.usdc.abi :href="config.mainnet.contracts.usdc.abi">ABI</a>                 |
| <a :href="config.mainnet.contracts.wbera.docsUrl">{{config.mainnet.contracts.wbera.name}}</a>               | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.wbera.address">{{config.mainnet.contracts.wbera.address}}</a>               | <a target="_blank" v-if=config.mainnet.contracts.wbera.abi :href="config.mainnet.contracts.wbera.abi">ABI</a>               |
| <a :href="config.mainnet.contracts.wbtc.docsUrl">{{config.mainnet.contracts.wbtc.name}}</a>                 | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.wbtc.address">{{config.mainnet.contracts.wbtc.address}}</a>                 | <a target="_blank" v-if=config.mainnet.contracts.wbtc.abi :href="config.mainnet.contracts.wbtc.abi">ABI</a>                 |
| <a :href="config.mainnet.contracts.weth.docsUrl">{{config.mainnet.contracts.weth.name}}</a>                 | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.weth.address">{{config.mainnet.contracts.weth.address}}</a>                 | <a target="_blank" v-if=config.mainnet.contracts.weth.abi :href="config.mainnet.contracts.weth.abi">ABI</a>                 |

### Miscellaneous

| Name                                                                                                    | Address                                                                                                                                                                     | ABI                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <a :href="config.mainnet.contracts.create2.docsUrl">{{config.mainnet.contracts.create2.name}}</a>       | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.create2.address">{{config.mainnet.contracts.create2.address}}</a>       | <a target="_blank" v-if=config.mainnet.contracts.create2.abi :href="config.mainnet.contracts.create2.abi">ABI</a>       |
| <a :href="config.mainnet.contracts.multicall3.docsUrl">{{config.mainnet.contracts.multicall3.name}}</a> | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.multicall3.address">{{config.mainnet.contracts.multicall3.address}}</a> | <a target="_blank" v-if=config.mainnet.contracts.multicall3.abi :href="config.mainnet.contracts.multicall3.abi">ABI</a> |
| <a :href="config.mainnet.contracts.permit2.docsUrl">{{config.mainnet.contracts.permit2.name}}</a>       | <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.permit2.address">{{config.mainnet.contracts.permit2.address}}</a>       | <a target="_blank" v-if=config.mainnet.contracts.permit2.abi :href="config.mainnet.contracts.permit2.abi">ABI</a>       |

## Bepolia Testnet Contracts

<script>
const render_groups = {
  "Proof of Liquidity": config.contracts.pol,
  "Tokens": config.contracts.tokens,
  "Other": config.contracts.other
}
</script>

<template v-for="(contracts, title) in render_groups">
  <h3>{{ title }}</h3>

  <table>
    <thead><tr><th>Name</th><th>Bepolia</th><th>ABI</th></tr></thead>
    <tbody>
      <template v-for="(sc, key) in contracts">
        <template v-if="sc['bepolia-address']">
          <tr>
            <td><template v-if="sc['docsUrl']"><a :href="sc.docsUrl">{{ sc.name }}</a></template><template v-else><b>{{ sc.name }}</b></template></td>
            <td>
              <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + sc['bepolia-address']">{{sc['bepolia-address']}}</a>
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
