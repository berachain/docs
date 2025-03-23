---
head:
  - - meta
    - property: og:title
      content: BGT Token
  - - meta
    - name: description
      content: What Is the BGT Token & How It Works
  - - meta
    - property: og:description
      content: What Is the BGT Token & How It Works
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $BGT

<a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bgt.address">{{config.mainnet.contracts.bgt.address}}</a>

<ClientOnly>
  <Token title="$BGT" image="/assets/BGT.png" />
</ClientOnly>

Proof-of-Stake blockchains typically have a single token that is used to secure the network through staking and is additionally used for gas, governance, and economic incentives. `$BGT` and the two-token model bifurcate the first two functions from the latter two.

Through Berachain's two-token Proof-of-Liquidity (PoL) model, the functions of governance and economic incentives (emissions & block rewards) are separated into their own token - `$BGT` (Bera Governance Token). `$BGT` is non-transferrable and can only be acquired by engaging in productive activities within the Berachain ecosystem.

## Earning `$BGT`

`$BGT` is earned by performing certain actions in dApps with whitelisted [Reward Vaults](/learn/pol/rewardvaults). Most of the time, this is related to providing liquidity, but it is not limited to this. Reward Vault deposits correspond to some form of productive activity on Berachain.

The typical flow is for users to supply liquidity and receive a receipt token for that activity, which they can then stake in reward vaults to earn `$BGT`. Some examples include:

- Depositing liquidity in the native BEX for an LP pair whitelisted to earn `$BGT` emissions
- Supplying assets to a lending market and staking the interest-bearing receipt tokens in a reward vault

Users can see available earning options at <a target="_blank" :href="config.mainnet.dapps.hub.url + 'pools'">{{config.mainnet.dapps.hub.url}}pools</a>.

Users can claim accumulated `$BGT` from Berahub.

## What can you do with $BGT?

### Governance

`$BGT` is used to vote on governance proposals. `$BGT` holders are responsible for a wide variety of ecosystem decisions (see [Governance](/learn/governance)).

`$BGT` holders can either vote on proposals themselves or delegate their voting power to another address. This governance delegation operates independently of boosting validators for controlling their `$BGT` emissions.

### Earn

#### Boost A Validator For Incentives

Users can select validators to "boost" with their `$BGT`, increasing the validator's [reward emission](/learn/pol/bgtmath). The amount of [Incentives](/learn/pol/incentives) earned is determined by validators' aggregate boost. These incentives are returned to the `$BGT` holders who boosted the validator.

#### dApp Fees

Users who are boosting validators with their `$BGT` earn a share of Berachain core dApp fees, namely fees from {{config.mainnet.dapps.bex.name}} and {{config.mainnet.dapps.honeySwap.name}}. This is done via the [`FeeCollector`](/developers/contracts/fee-collector) contract.

At a high level, `FeeCollector` auctions fees collected from dApps for `$WBERA` and then distributes them pro rata to `$BGT` holders who have boosted validators.

### Redeem $BGT For $BERA

`$BGT` can be redeemed (burned) 1:1 for `$BERA`. This is a one-way function, and `$BERA` cannot be converted into `$BGT`. This limits the ability to earn the chain's economic incentives solely to `$BGT` holders.
