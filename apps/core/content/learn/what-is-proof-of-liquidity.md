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

Proof-of-Liquidity (PoL) is a novel consensus mechanism that uses chain-incentives to simultaneously scale the liquidity and economic security of Berachain.

PoL borrows from the Proof-of-Stake (PoS) concept of securing a chain by providing an initial stake with the native gas token ([BERA](/learn/pol/tokens/bera)). PoL builds upon PoS by introducing an additional soulbound governance ([BGT](/learn/pol/tokens/bgt)) token that both determines the rewards influence of validators (through delegation by users), and which is rewarded to users that have provided liquidity on Berachain (and subsequently staked in "Reward Vaults").

![Proof-of-Liquidity Flywheel](/assets/proof-of-liquidity-flywheel.png)

This separates tokens responsible for gas and security ([`BERA`](/learn/pol/tokens/bera)) from tokens used to incentive productive activity and govern the ecosystem ([`BGT`](/learn/pol/tokens/bgt)).

The role these various tokens play in comparison to Ethereum's PoS is illustrated below:
![Proof-of-Stake vs Proof-of-Liquidity](/assets/berachain-pos-vs-pol.png)

## Aligning Protocols, Users and Validators 🤝

PoL creates networks of symbiotic relationships where the network's incentives are shared amongst ecosystem stakeholders, which validators play a key role in orchestrating:

- Validators partner with everyday Berachain users, as validators' ability to allocate rewards is determined by the `$BGT` delegated to them (obtained exclusively through supplying liquidity to PoL-enabled protocols).
- Protocols offer _Incentives_ to validators, in exchange for directing `$BGT` emissions to their specific _Reward Vaults_, which increases deposits in the protocol.

> Read more in [Proof-of-Liquidity Overview](/learn/pol/)
