---
head:
  - - meta
    - property: og:title
      content: What is Proof-of-Liquidity
  - - meta
    - name: description
      content: What is Berachain's Proof-of-Liquidity & How Does it Work?
  - - meta
    - property: og:description
      content: What is Berachain's Proof-of-Liquidity & How Does it Work?
---

# What is Proof-of-Liquidity? 🤝

Proof-of-Liquidity (PoL) is a novel economic mechanism that uses network incentives to align the interests of ecosystem participants and bolster both the application-layer and chain security.

## Two Token Model

Berachain's consensus borrows from the Proof-of-Stake (PoS) model and contains two key components:

1. [`$BERA`](/learn/pol/tokens/bera) - Validators secure the chain by staking the native gas token
2. [`$BGT`](/learn/pol/tokens/bgt) - A soulbound governance token distributed by validators for proposing new blocks, which is ultimately rewarded to users who provide ecosystem liquidity (see [Reward Vaults](./pol/rewardvaults.md))

A validator's `$BGT` emissions increase with the amount of `$BGT` delegated to them. Protocol-provided [Incentives](/learn/pol/incentives) are received for these emissions, and validators pass these to their delegators after collecting a commission.

This model creates meaningful economic alignment between previously isolated groups. Validators who return the maximum value to their `$BGT` delegators are likely to receive more delegations.

![Proof-of-Liquidity Flywheel](/assets/proof-of-liquidity-flywheel.png)

### Separation of Concerns

Significantly, Proof-of-Liquidity separates the token responsible for gas and security from the token used to govern chain rewards and economic incentives.

The following diagram illustrates the roles of tokens in Berachain's PoL compared to Ethereum's PoS:

![Proof-of-Stake vs Proof-of-Liquidity](/assets/berachain-pos-vs-pol.png)

> Read more in [Proof-of-Liquidity Overview](/learn/pol/)
