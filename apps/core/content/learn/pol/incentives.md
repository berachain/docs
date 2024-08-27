# Incentives 💎

Incentives in PoL can be defined as a creative and customizable marketplace for Validator's `$BGT` emissions.

A simplified way to look at the whole incentive system where validators can pick and choose which incentives from _Reward Vaults_ are worthy of their `$BGT` emissions, acquired via proposing a block.

## Incentives For Validators 💰

`$BGT` emissions are distributed to liquidity providers via [Reward Vaults](/learn/pol/rewardvaults). Below is an expanded view of the diagram in the Reward Vaults section, which additionally shows protocols providing incentives to Reward Vaults.

![Reward Vault Incentives](/assets/reward-vault-incentives.png)

Once an active validator produces a block and emits `$BGT`, it gets to decide which reward vaults to emit their rewards to. Protocols' incentives provided to reward vaults are then rewarded to the validator proportional for the amount of `$BGT` emitted to the reward vault.

:::tip
The above diagram only conceptually illustrates the flow of assets to and from reward vaults. It is not a contract-based overview.
:::

In summary, the asset & user flow in reward vaults can be described as follows:

1. Users stake the pre-selected asset into a given Reward Vault
2. Protocols offer Incentives in exchange for directing BGT to their Reward Vault
3. Validators direct `$BGT` emissions to Reward Vaults
4. Reward Vaults allow `$BGT` to be claimed by users staking the asset
5. Reward Vaults distribute Incentives to validators for emitting `$BGT`

## Incentive Assets 🏦

Each Reward Vault can have a maximum of 3 assets that can be used as Incentives in exchange for `$BGT`. This also means that each Reward Vault can have up to 3 active Incentives at a time, meaning that if there is an active `$USDC` Incentive, this can be the only Incentive for this asset until it has been fulfilled.

### Reward Vault Incentive Example 💡

Using `$USDC` as an example for an Incentive:

```
- User X creates Incentive: 100 `$USDC` for 1 `$BGT` (100:1 Ratio)
- User Y adds 10 `$USDC` Incentive: 110 `$USDC` (100 + 10) for 1.1 `$BGT` (100:1 Ratio)
- Validator Z distributes 1.1 `$BGT` to Reward Vault to fulfill Incentive and receives 110 `$USDC`
- User N create new Incentive: 300 `$USDC` for 1 `$BGT` (300:1 Ratio)
```

## How To Whitelist Incentive Assets 📝

Incentives can only be created via successful governance proposals. Ecosystem, users and foundation decide on proposals based on their own due-diligence.

Incentives assets can either be proposed at the same time as a new Reward Vault or modified as a separate governance proposal.
