---
head:
  - - meta
    - property: og:title
      content: BGT Token
  - - meta
    - name: description
      content: What Is BGT Token & How It Works
  - - meta
    - property: og:description
      content: What Is BGT Token & How It Works
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $BGT

> <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.bgt.address">{{config.contracts.bgt.address}}</a>

<ClientOnly>
  <Token title="$BGT" image="/assets/BGT.png" />
</ClientOnly>

Proof of Stake blockchains have a governance token that is used to secure the network through staking with validators. Oftentimes, this is the main network token and is used for gas, staking, governance and economic incentives.

However, because of Berachain's three-token Proof of Liquidity model, the functions of governance and economic incentives are separated into its own token. This token is `$BGT` (Bera Governance Token).

`$BGT` is non-transferrable and can only be acquired by providing liquidity in PoL-eligible assets (e.g. liquidity on Bex).

## Earning `$BGT`

`$BGT` can be accumulated by performing certain actions in dApps with whitelisted [Reward Vaults](../rewardvaults.md). Most of the time, this is related to providing liquidity, but it is not limited to this. Reward vaults correspond to some form of productive activity provided on Berachain, and are created after being whitelisted (by `$BGT` governance). Users can subsequently stake the indicated token in reward vaults to earn `$BGT`. Some examples include:

- Depositing liquidity in the native Bex for an LP pair that is earning `$BGT` emissions
- Borrowing `$HONEY` on Bend
- Providing `$HONEY` in the `bHONEY` vault for Berps

## What can you do with $BGT?

### Governance

`$BGT` is used to vote on governance proposals. `$BGT` holders are responsible for a wide variety of ecosystem decisions, discussed in Governance. `$BGT` holders can either vote on proposals themselves or delegate their voting power to any other address. This governance delegation operates independently of boosting validators for controlling their `$BGT` emissions.

### Earning Rewards

Protocols can provide [Incentives](/learn/pol/incentives) to attract `$BGT` emissions from validators. The amount that validators can earn in protocol incentives is determined by the amount of `$BGT` that is boosting them. Thus, validators that return the maximum value to those boosting them are likely to receive the most boost.

Furthermore users who are boosting validators with their `$BGT` collect a share of Berachain core dApp fees, namely fees from Bend, BEX and Berps.

### Burning for `$BERA`

`$BGT` can be burned 1:1 for `$BERA`. This is a one-way function, and `$BERA` cannot be converted into `$BGT`. This limits the ability to earn the chain's economic incentives solely to `$BGT` holders.
