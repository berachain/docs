# Reward Vaults

Reward Vaults are smart contracts in which users can stake their Proof-of-Liquidity (PoL) eligible assets in order to receive `$BGT` rewards. Reward Vaults are the only way in which anyone can earn `$BGT` rewards, which are the basic building blocks of the PoL ecosystem.

![Reward Vaults](/assets/reward-vaults.png)

## User Interactions

The amount of `$BGT` rewards a user earns from Reward Vaults is a function of:

1. The user's share of total assets staked in the vault
2. The amount of `$BGT` rewards emitted to the vault

After staking assets in a Reward Vault, users are free to claim the earned rewards as soon as they are distributed to the vault, add to their existing deposits, or withdraw their assets whenever they wish.

`$BGT` farming with Reward Vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry for regular users.

## How $BGT Ends up in Reward Vaults

Validators choose to direct some portion of their `$BGT` emissions to specific Reward Vaults.

To understand why validators would choose to emit `$BGT` to a particular Reward Vault over another, refer to [Incentives in PoL](/learn/pol/incentives), which discusses how protocols can influence validator behaviour with economic incentives.

## Creation of New Reward Vaults

New Reward Vaults are created through the _Reward Vault Whitelisting_ process, conducted with `$BGT` via governance proposals. Developers or protocols can submit a proposal to create a new Reward Vault for a specific eligible asset. If the proposal passes, the new Reward Vault is created and added to the list of approved Reward Vaults that validators can direct `$BGT` emissions to.
