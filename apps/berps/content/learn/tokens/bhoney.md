---
head:
  - - meta
    - property: og:title
      content: Berps & $bHONEY
  - - meta
    - name: description
      content: What the relationship between Berps & $bHONEY
  - - meta
    - property: og:description
      content: What the relationship between Berps & $bHONEY
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# Berps & $bHONEY

> <a target="_blank" :href="config.mainnet.dapps.berascan.url + '/address/' + config.contracts.bHoney.address">{{config.contracts.bHoney.address}}</a>

`$bHONEY` is a standard <a target="_blank" :href="config.mainnet.dapps.berascan.url + '/address/' + config.contracts.bHoney.address">ERC20 Token</a> that is minted at the time that `$HONEY` is deposited into the Berps `$bHONEY` Vault.

> **NOTE:** that `$bHONEY` is burned when `$HONEY` is withdrawn from the Berps Vault.

It represents ownership of `$HONEY` within the Vault as a vault token.

<ClientOnly>
  <Token title="$bHONEY" image="/assets/bHONEY.png" />
</ClientOnly>

## How Does Berps Use $bHONEY?

Berps use `$bHONEY` to represent a user's deposit in the Berps Vault and also allows users to stake it in order to qualify for `$BGT` rewards over time, whenever a validator directs `$BGT` emissions to the Berps Vault.

## Where Can I Get $bHONEY?

$bHONEY can either be received for depositing `$HONEY` into the Berps bHoney Vault or traded/transferred as an ERC20 token.
