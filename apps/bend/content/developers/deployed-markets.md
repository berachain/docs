---
head:
  - - meta
    - property: og:title
      content: Bend Deployed Markets
  - - meta
    - name: description
      content: Bend Deployed Markets
  - - meta
    - property: og:description
      content: Bend Deployed Markets
---

<script setup>
  import config from '@berachain/config/constants.json';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Bend Deployed Markets

This is a list of market ids that have been deployed to Bend.

:::info
To see the most up to date deployed markets that have been whitelisted on {{config.mainnet.dapps.bend.name}}, pleaes see <a target="_blank" :href="config.mainnet.dapps.bend.url + 'borrow?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.url}}</a>
:::

## Market Ids

| Market                                                       | ID                                                                                                               |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **{{config.mainnet.dapps.bend.marketIds.wbtchoney.name}}**   | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.wbtchoney.address" /></ClientOnly>**   |
| **{{config.mainnet.dapps.bend.marketIds.susdehoney.name}}**  | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.susdehoney.address" /></ClientOnly>**  |
| **{{config.mainnet.dapps.bend.marketIds.wgberahoney.name}}** | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.wgberahoney.address" /></ClientOnly>** |
| **{{config.mainnet.dapps.bend.marketIds.wethhoney.name}}**   | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.wethhoney.address" /></ClientOnly>**   |
| **{{config.mainnet.dapps.bend.marketIds.wberahoney.name}}**  | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.wberahoney.address" /></ClientOnly>**  |
| **{{config.mainnet.dapps.bend.marketIds.iberahoney.name}}**  | **<ClientOnly><CopyToClipboard :text="config.mainnet.dapps.bend.marketIds.iberahoney.address" /></ClientOnly>**  |

## How To Find Market ID

To find the Market ID, go to <a target="_blank" :href="config.mainnet.dapps.bend.url + 'borrow?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.url}}borrow</a>, and see the Market ID in the URL.

![Bend - How To Find Market Id](/assets/developers-deployedmarkets-marketid.png)
