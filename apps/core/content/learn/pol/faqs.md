---
head:
  - - meta
    - property: og:title
      content: Proof-of-Liquidity Frequently Asked Questions
  - - meta
    - name: description
      content: PoL FAQs
  - - meta
    - property: og:description
      content: PoL FAQs
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Proof-of-Liquidity Frequently Asked Questions ❓

## Validator Requirements & Operations

### Can anyone stake $BERA to become a validator?

While anyone can stake $BERA to try to become a validator in the active set, there are specific staking requirements:

There is a minimum floor of **{{ config.mainnet.minEffectiveBalance }} $BERA** required to be a validator. There is a maximum cap of **{{ config.mainnet.maxEffectiveBalance }} $BERA** for any validator's stake. Only the **top {{ config.mainnet.validatorActiveSetSize }} validators** (ordered by $BERA staked) can be in the active validator set. Even if someone stakes above the minimum **{{ config.mainnet.minEffectiveBalance }} $BERA**, they would still need to have enough stake to be within the **top {{ config.mainnet.validatorActiveSetSize }} validators** to be part of the active validator set that can produce blocks.

### Can validators with no $BGT boosted to them build blocks and earn rewards?

The ability to build blocks is determined by `$BERA` stake, not `$BGT` boost. As long as a validator has enough `$BERA` staked and is in the active set, they can produce blocks regardless of how much `$BGT` is boosted to them. For every block a validator proposes, that validator receives a reward.

### Is there a cap for the number of active validators?

There will be a mechanism for capping validators to a safe level. The validators within this cap are known as the 'active set.'

## dApps & Reward Vaults

### Can dApps that don't have a token still participate in PoL?

Yes, a fundamental aspect of Proof-of-Liquidity (PoL) is the use of whitelisted Reward Vaults. A protocol only needs to issue a receipt token that can be staked in the protocol's respective whitelisted Reward Vault. The receipt token is different from a native token and can be thought of as a form of bookkeeping token. For example, when a user provides liquidity to a BEX pool, they receive a receipt token in the form of an LP token. That LP token can be staked in a Reward Vault to earn $BGT from emissions directed by validators.

### Are there restrictions on what kinds of dApps can have whitelisted Reward Vaults?

No, any dApp can deploy a Reward Vault and submit it as a governance proposal to have it whitelisted.

### Are rewards vaults created only by whitelisting governance proposals?

Technically, the creation of rewards vaults is permissionless, but for validators to direct $BGT emissions to those rewards vaults, a governance proposal for whitelisting the rewards vault must pass.

### Do native dApps have an advantage over non-native dApps that participate in PoL?

All Reward Vaults are treated equally and their status is determined solely by validators distributing rewards to Reward Vaults. The only exception is that if a Validator does not specify their Reward Allocation, native dApps are set as default Reward Vaults for Reward Allocation for validators.

## Rewards and Emissions

### How much $BGT could any given Reward Vault earn?

The amount of $BGT a given Reward Vault can earn is a function of the following:

1. How many validators are directing emissions to those vaults
2. How much $BGT is boosted to the validators directing emissions to those vaults

### Is the size of the `$BGT` emission linear to the amount of `$BGT` boosted to a validator?

No, the `$BGT` emission is not linear to the amount of `$BGT` boosted to a validator. The emission formula is:
$$emission = [B + max(m, (a+1)(1-1/(1+ax^b))R)]$$
where `B` is the base rate, representing the basic BGT amount that a validator gets for producing a block;
`R` is the reward rate, which is the base BGT amount allocated for reward vaults before any boost is applied;
`a` is the boost multiplier that determines how much impact boost has on emissions toward reward vaults;
`b` is the convexity parameter that controls how quickly boost affects emissions - with high values, validators with low boost get more heavily penalized;
`m` is the minimum reward, acting as a floor for emissions to reward vaults - when this is higher, even validators with low boost are guaranteed more emissions.

### How does Berachain manage hyperinflation of $BGT?

The inflation of $BGT is equivalent to traditional PoS systems having some percentage of inflation per year. Berachain just takes that PoS inflation and distributes it between a validator and reward vaults.

The end result is that the inflation cadence should effectively mirror an equivalent PoS platform; it's just allocated in a manner that better aligns the interests of validators, protocols, and users.

### Why are Incentive emissions defined per $BGT instead of being pool-based?

Incentives are denominated in $BGT – ultimately users, validators, and protocols want to be able to calculate what they're earning per $BGT, so it's more of a UI choice to facilitate understanding the value $BGT drives.

### Can only validators vote on or create governance proposals?

Anyone who holds enough $BGT can vote on proposals. Anyone who meets the threshold of 10,000 $BGT can create a proposal.
