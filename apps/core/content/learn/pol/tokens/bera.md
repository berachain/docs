---
head:
  - - meta
    - property: og:title
      content: BERA Token
  - - meta
    - name: description
      content: What Is the BERA Token & How Does It Work
  - - meta
    - property: og:description
      content: What Is the BERA Token & How Does It Work
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $BERA

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.tokens.wbera.address.berachainMainnet">{{config.contracts.tokens.wbera.address.berachainMainnet}}</a></small>

<ClientOnly>
  <Token title="$BERA" image="/assets/BERA.png" />
</ClientOnly>

`$BERA` serves as the native gas and staking token of Berachain, the first blockchain powered by Proof-of-Liquidity.

## Role of $BERA

The `$BERA` token serves two main purposes on the Berachain network:

### Transaction Fees

`$BERA` is used to pay for transactions on the Berachain network (hence its designation as the "gas token"). Tokens used for transaction fees are burned, removing them from the circulating supply. [Check out the hundreds of projects and dapps in the Berachain Ecosystem](https://ecosystem.berachain.com/).

### Staking $BERA

`$BERA` can be staked a number of ways.

1. To provide liquidity in $BERA-denominated pools. The [complete list of pools approved by governance](https://hub.berachain.com/pools/) is shown on the hub. When you stake to pools, you earn a portion of the fees paid by users of that pool.
2. Staking directly into the [$BERA POL Yield Vault](https://docs.berachain.com/learn/guides/bera-staking), where the yield is a share of all PoL incentives.

### Validator Staking

Validators stake `$BERA` to operate a validator. Within the active set, the more `$BERA` a validator has staked, the more frequently they are chosen to propose blocks. A validator's probability of block production is directly proportional to their share of the total staked `$BERA`. The economic value of all staked `$BERA` tokens forms the economic security of the chain, with [$BGT](/learn/pol/tokens/bgt) dynamics controlling its inflation.

To learn more about how `$BERA` staking affects block production and emissions, see [Block Rewards](/learn/pol/blockrewards.md).
