<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Reward Vaults

Reward Vaults are smart contracts in which users can stake their Proof-of-Liquidity (PoL) eligible assets to receive `$BGT` rewards. Reward Vaults are the only way anyone can earn `$BGT` rewards, and therefore serve the important function of gating entry into the PoL ecosystem.

Reward Vaults are key infrastructure that allows protocols to leverage PoL, enabling teams to incentivize users' actions in exchange for `$BGT`. A protocol can have multiple Reward Vaults, each with its own PoL-eligible asset to be staked. For example, BEX can have multiple pools earning `$BGT`, each with its own Reward Vault and respective PoL-eligible asset.

It should be noted that only Whitelisted Reward Vaults are elligible to receive `$BGT` emissions from Validators.

## User Interactions

### Staking With A Reward Vault

![Berachain Reward Vault Staking BEX](/assets/berachain-reward-vault-staking-bex.png)

To receive `$BGT`, a user must stake the PoL-eligible asset in its Reward Vault. The protocol that deployed the Reward Vault decides how users acquire the PoL-eligible asset to stake. The idea is that protocols would leverage this to attract liquidity or stimulate activity, and in return award users with the asset they can stake in their vault.

1. The user takes some action that results in receiving a PoL-eligible asset, generally referred to as a receipt token.
2. The user stakes the PoL-eligible asset in the corresponding vault.
3. The user earns a portion of all the BGT emitted to that vault.

### Earning BGT

The amount of `$BGT` rewards a user earns from a Reward Vault is a function of:

1. The user's share of total assets staked in the Reward Vault
2. The amount of `$BGT` rewards emitted to the Reward Vault

After staking assets in a Reward Vault, users are free to claim their earned rewards, add to their deposits, or withdraw their assets whenever they wish.

`$BGT` farming with Reward Vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry.

## $BGT Flow

When a validator is chosen to propose a block, they direct a portion of their `$BGT` emissions to specific Reward Vaults of their choice. To learn more about how `$BGT` is calculated in block production, check out the docs on [emissions](/learn/pol/bgtmath).

## Incentives

To understand why validators would choose to emit `$BGT` to one Reward Vault over another, refer to [Incentives](/learn/pol/incentives) in PoL, which discusses how protocols can influence validator behavior with economic incentives.

## Vault Creation

New Reward Vaults can be created permissionlessly at <a target="_blank" :href="config.mainnet.dapps.hub.url + 'vaults/create'">{{config.mainnet.dapps.hub.url}}vaults/create</a>.

Protocols creating Reward Vaults must additionally [whitelist their vaults](/learn/governance/rewardvault) through `$BGT` governance to be eligible to receive emissions from validators.
