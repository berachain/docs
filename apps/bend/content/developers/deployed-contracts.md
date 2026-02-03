---
head:
  - - meta
    - property: og:title
      content: Bend Deployed Contracts
  - - meta
    - name: description
      content: Bend Deployed Contracts
  - - meta
    - property: og:description
      content: Bend Deployed Contracts
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bend Deployed Contracts

This is a list of addresses where contracts can be read from or written to.

> **Contract ABIs:**
>
> - **Mainnet ABIs:** [berachain/abis/tree/main/mainnet/contracts](https://github.com/berachain/abis/tree/main/mainnet/contracts)
> - **Testnet ABIs:** [berachain/abis/tree/main/bepolia/contracts](https://github.com/berachain/abis/tree/main/bepolia/contracts)
> - **Documentation ABIs:** [berachain/doc-abis](https://github.com/berachain/doc-abis)

:::info
Deployed contracts have received several audits from various parties. All audit reports are publicly available on [Github](https://github.com/berachain/security-audits).
:::

## Morpho

| Name                                                                                                                                          | Mainnet Address                                                                                                                                                                                                                                                                                  | ABI |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| **<a :href="config.contracts.bend.morpho.docsUrl">{{config.contracts.bend.morpho.name}}</a>**                                                 | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.morpho.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.morpho.address.berachainMainnet}}</a>                                                 | N/A |
| **<a :href="config.contracts.bend.adaptiveCurveIrm.docsUrl">{{config.contracts.bend.adaptiveCurveIrm.name}}</a>**                             | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.adaptiveCurveIrm.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.adaptiveCurveIrm.address.berachainMainnet}}</a>                             | N/A |
| **<a :href="config.contracts.bend.bundler3.docsUrl">{{config.contracts.bend.bundler3.name}}</a>**                                             | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.bundler3.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.bundler3.address.berachainMainnet}}</a>                                             | N/A |
| **<a :href="config.contracts.bend.generalAdapter1.docsUrl">{{config.contracts.bend.generalAdapter1.name}}</a>**                               | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.generalAdapter1.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.generalAdapter1.address.berachainMainnet}}</a>                               | N/A |
| **<a :href="config.contracts.bend.metaMorphoV1_1.docsUrl">{{config.contracts.bend.metaMorphoV1_1.name}}</a>**                                 | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.metaMorphoV1_1.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.metaMorphoV1_1.address.berachainMainnet}}</a>                                 | N/A |
| **<a :href="config.contracts.bend.metaMorphoFactoryV1_1.docsUrl">{{config.contracts.bend.metaMorphoFactoryV1_1.name}}</a>**                   | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.metaMorphoFactoryV1_1.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.metaMorphoFactoryV1_1.address.berachainMainnet}}</a>                   | N/A |
| **<a :href="config.contracts.bend.metaFeePartitioner.docsUrl">{{config.contracts.bend.metaFeePartitioner.name}}</a>**                         | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.metaFeePartitioner.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.metaFeePartitioner.address.berachainMainnet}}</a>                         | N/A |
| **<a :href="config.contracts.bend.publicAllocator.docsUrl">{{config.contracts.bend.publicAllocator.name}}</a>**                               | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.publicAllocator.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.publicAllocator.address.berachainMainnet}}</a>                               | N/A |
| **<a :href="config.contracts.bend.morphoChainlinkOracleV2.docsUrl">{{config.contracts.bend.morphoChainlinkOracleV2.name}}</a>**               | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.morphoChainlinkOracleV2.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.morphoChainlinkOracleV2.address.berachainMainnet}}</a>               | N/A |
| **<a :href="config.contracts.bend.morphoChainlinkOracleV2Factory.docsUrl">{{config.contracts.bend.morphoChainlinkOracleV2Factory.name}}</a>** | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.morphoChainlinkOracleV2Factory.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.morphoChainlinkOracleV2Factory.address.berachainMainnet}}</a> | N/A |
| **<a :href="config.contracts.bend.urd.docsUrl">{{config.contracts.bend.urd.name}}</a>**                                                       | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.urd.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.urd.address.berachainMainnet}}</a>                                                       | N/A |
| **<a :href="config.contracts.bend.urdFactory.docsUrl">{{config.contracts.bend.urdFactory.name}}</a>**                                         | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.urdFactory.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.urdFactory.address.berachainMainnet}}</a>                                         | N/A |

## Vaults

:::info
More vaults may be deployed, please check <a target="_blank" :href="config.websites.bend.url + '?utm_source=' + config.websites.docsBend.utmSource">{{config.websites.bend.url}}lend</a> for the latest deployed vaults.
:::

| Name                                                                                          | Mainnet Address                                                                                                                                                                                                                                  | ABI |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| **<a :href="config.contracts.bend.morpho.docsUrl">{{config.contracts.bend.morpho.name}}</a>** | <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.morpho.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.morpho.address.berachainMainnet}}</a> | N/A |
