---
head:
  - - meta
    - property: og:title
      content: Berps & $BGT
  - - meta
    - name: description
      content: What the relationship between Berps & $BGT
  - - meta
    - property: og:description
      content: What the relationship between Berps & $BGT
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# Berps & $BGT

> <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.bgt.address">{{config.contracts.bgt.address}}</a>

Berachain Governance Token (`$BGT`) is a soulbound <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.bgt.address">ERC20 Token</a>, that is used for validator delegation, governance proposals and voting, and can be exchanged for `$BERA` by burning it.

<ClientOnly>
  <Token title="$BGT" image="/assets/BGT.png" />
</ClientOnly>

## How Does Berps Use $BGT

Berps is a native Berachain dApp that is an eligible reward vault for validators to distribute `$BGT` emissions to.

## How Do I Get $BGT?

To qualify to receive `$BGT` individually, a user would need to deposit `$HONEY` into the Berps Vault, receive `$bHONEY` in exchange, and stake that `$bHONEY`. Over time the user will receive a portion of `$BGT` directed to the vault.

`$BGT` cannot be bought or traded, and can only be earned by effectively putting liquidity to work.
