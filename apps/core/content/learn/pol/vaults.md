# Reward Vaults

Reward Vaults are smart contracts where users can stake their Proof-of-Liquidity (PoL) eligible assets to receive `$BGT` rewards. Reward Vaults are the only way to earn `$BGT` rewards, which serve as the basic building blocks of the PoL ecosystem.

![Reward Vaults](/assets/reward-vaults.png)

## User Interactions

The amount of `$BGT` rewards a user earns from Reward Vaults depends on:

1. The user's share of total assets staked in the vault
2. The amount of `$BGT` rewards emitted to the vault

After staking assets in a Reward Vault, users can claim earned rewards as soon as they are distributed, add to their existing deposits, or withdraw their assets at any time.

`$BGT` farming with Reward Vaults resembles familiar DeFi actions, providing a low barrier to entry for regular users.

## How $BGT Ends up in Reward Vaults

Validators direct portions of their `$BGT` emissions to specific Reward Vaults.

To understand why validators choose to emit `$BGT` to particular Reward Vaults, refer to [Incentives in PoL](/learn/pol/incentives), which explains how protocols can influence validator behavior with economic incentives.

## Creation of New Reward Vaults

New Reward Vaults are created through the _Reward Vault Whitelisting_ process, conducted through `$BGT` governance proposals. Developers or protocols can submit proposals to create new Reward Vaults for specific eligible assets. If a proposal passes, the new Reward Vault is created and added to the list of approved Reward Vaults where validators can direct `$BGT` emissions.
