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

> `$WBERA`: <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.wbera.address">{{config.contracts.wbera.address}}</a>

<ClientOnly>
  <Token title="$BERA" image="/assets/BERA.png" />
</ClientOnly>

The `$BERA` token serves two main purposes on the Berachain network:

1. Paying for transactions on the blockchain ($BERA also referred to as the "gas token")
2. Staking for activating validator nodes. Validators have to stake 250K to 2.5M BERA to spin up a validator. Within the active set, the more `$BERA` a validator has staked, the more frequently they are chosen to propose blocks. The economic value of all `$BERA` tokens staked adds up to form the base layer the security of the chain with [`$BGT`](/learn/pol/tokens/bgt) building on-top of it for enhanced security.

To learn more about how `$BERA` staking affects block production, check out the docs on [block production](../bgtmath.md).
