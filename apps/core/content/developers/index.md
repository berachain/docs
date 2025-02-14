# Proof of Liquidity Overview

Berachain's Proof of Liquidity (PoL) mechanism can be broken down into two broad categories:

1. [**BGT Distribution**](./#_1-bgt-distribution): How $BGT is created from the block production process
2. [**Incentive Marketplace**](./#_2-incentive-marketplace): How protocols compete for validator $BGT allocations by issuing incentives

The below diagram shows the relationship between the main PoL contracts and how they interact.

![PoL Overview For Devs](/assets/pol-architecture.png)

## 1. BGT Distribution

As discussed in [Block Production](/learn/pol/bgtmath), $BGT emissions stem from the block production process. A variable component $BGT emissions per block is determined by the proposing validator's $BGT delegation (also referred to as "boost").

### Distributor

The [Distributor](/developers/contracts/distributor) contract is the entrypoint for BGT distribution. The `distributeFor()` function accepts a Merkle proof that a validator has proposed a certain beacon block. The Distributor then:

- Receives newly minted BGT from the `BlockRewardController`
- Processes rewards based on validator-specified allocations via `BeraChef`
- Distributes BGT to the validator's designated Reward Vaults

### BlockRewardController

The [BlockRewardController](/developers/contracts/block-reward-controller) contract is the only entity authorized to mint $BGT. It is entered through the `processRewards` function from the `Distributor` contract. The BlockRewardController then:

- Mints a base $BGT amount to the proposing validator's operator
- Mints a variable $BGT amount based on the validator's boost which is sent to the `Distributor`

### BeraChef

The [BeraChef](/developers/contracts/berachef) contract manages validator reward allocations. These preferences are set by the validator operator and can be updated following a short delay. The BeraChef contract then forwards these allocations to the `Distributor` contract for distribution to specified Reward Vaults.

## 2. Incentive Marketplace

The Incentive Marketplace creates a market-driven liquidity incentive system where protocols compete for validators' $BGT allocations.

### RewardVault

[RewardVaults](/developers/contracts/reward-vault) act as the core PoL integration point, they:

- Receive $BGT emissions from the `Distributor`
- Allow protocols to add incentive tokens with a minimum incentive rate per 1 $BGT emitted
- Manage token staking and $BGT distribution to liquidity providers/users

Validators are incentivized to allocate $BGT to vaults offering higher protocol incentives, as they receive these rewards proportional to the $BGT allocated. This creates the "marketplace" dynamic where protocols compete by offering better incentives to attract more $BGT allocations.

::: tip
RewardVault creation is permissionless, but vaults must be approved by [governance](/learn/governance/rewardvault) to be included in validators' reward allocations.
:::
The [RewardVaultFactory](/developers/contracts/reward-vault-factory) contract deploys standardized RewardVault contracts and maintains a registry of approved vaults.
