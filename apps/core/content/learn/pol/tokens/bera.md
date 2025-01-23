---
head:
  - - meta
    - property: og:title
      content: BERA Token
  - - meta
    - name: description
      content: What Is BERA Token & How It Works
  - - meta
    - property: og:description
      content: What Is BERA Token & How It Works
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $BERA

<!--`$WBERA`: <a target="_blank" :href="config.mainnet.dapps.berascan.url + '/address/' + config.contracts.wbera.address">{{config.contracts.wbera.address}}</a> -->

<ClientOnly>
  <Token title="$BERA" image="/assets/BERA.png" />
</ClientOnly>

The `$BERA` token serves two main purposes on the Berachain network:

1. Paying for transactions on the blockchain (`$BERA` also referred to as the "gas token")
2. Staking for activating validator nodes

   Validators have to stake `$BERA` to operate a validator. Within the active set, the more `$BERA` a validator has staked, the more frequently they are chosen to propose blocks. The economic value of all `$BERA` tokens staked forms the economic security of the chain, with [`$BGT`](/learn/pol/tokens/bgt) dynamics controlling its inflation.

To learn more about how `$BERA` staking affects block production and emissions, see [Block Production](/learn/pol/bgtmath.md).
