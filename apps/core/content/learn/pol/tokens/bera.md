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

`$WBERA`: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.wbera.address">{{config.mainnet.contracts.wbera.address}}</a>

<ClientOnly>
  <Token title="$BERA" image="/assets/BERA.png" />
</ClientOnly>

`$BERA` serves as the native gas and staking token of Berachain, the first blockchain powered by Proof-of-Liquidity.

## Role of BERA

The `$BERA` token serves two main purposes on the Berachain network.

### Transaction Fees

Paying for transactions on the Berachain network (`$BERA` is also referred to as the "gas token" for this reason). Tokens utilized for transaction fees are burned, removing them from the circulating supply.

### Validator Staking

Validators stake `$BERA` to operate a validator. Within the active set, the more `$BERA` a validator has staked, the more frequently they are chosen to propose blocks. The ratio of a validator's `$BERA` to the total stake is linear with their chances of block production. The economic value of all `$BERA` tokens staked forms the economic security of the chain, with [$BGT](/learn/pol/tokens/bgt) dynamics controlling its inflation.

To learn more about how `$BERA` staking affects block production and emissions, see [Block Production](/learn/pol/bgtmath.md).
