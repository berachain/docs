# Proof-of-Liquidity Overview 📓

Proof-of-Liquidity (PoL) is an extension of delegated Proof-of-Stake (dPoS) that realigns economic incentives between validators, applications, and users. The key innovation is separating the chain's security ($BERA) from its governance and rewards ($BGT).

Berachain's Validator Active Set is determined by each validator's $BERA stake, with a minimum of 250,000 $BERA and a maximum cap of 2,500,000 $BERA. Within the Active Set, a validator's probability of winning a block is proportional to their staked $BERA—more $BERA staked increases the likelihood of proposing a block. The size of a validator's block reward in $BGT is determined by their Boost, which is a percentage of a capped amount of $BGT where the percentage is determined by a validator's $BGT delegation out of the total $BGT delegated to all validators. Learn more about how emissions are calculated on the [emissions page](./bgtmath.md)

![Berachain Proof-of-Liquidity Steps](/assets/proof-of-liquidity-steps.png)

Here's how PoL works from the perspective of a validator:

1. A _Prospective Validator_ stakes a minimum of 250K $BERA (with a maximum cap of 2.5M) to secure the network. Only the top N validators by $BERA staked become part of the Active Set, which would eligible to receive block rewards.

2. An _Active Validator_ is chosen to propose a block with probability proportional to their staked BERA amount.

3. For proposing a block, the validator receives BGT emissions determined by two components:

   - Base emission: A fixed amount for building the block
   - Reward emission: A variable amount based on the validator's boost (percentage of BGT delegated to them)

4. The validator can direct their BGT emissions to whitelisted _Reward Vaults_ in exchange for protocol Incentives. The amount they can direct is determined by the amount of BGT delegated to them.

5. A _Liquidity Provider_ performs an action that generates a receipt token (e.g., providing liquidity to a BEX pool and receiving LP tokens)

6. The _Liquidity Provider_ stakes their receipt token in a whitelisted _Reward Vault_

7. When validators direct BGT emissions to this vault, stakers receive BGT proportional to their share of staked receipt tokens

8. By earning BGT, the _Liquidity Provider_ becomes a _BGT Holder_

9. BGT Holders can delegate their BGT to validators, increasing that validator's boost. Higher boost means larger BGT emissions when that validator proposes blocks. Validators are expected to share received protocol Incentives with their delegators.

## Incentive Alignment 🤝

PoL creates alignment between:

- **Validators**: Need BGT delegation to maximize their block rewards and must efficiently direct emissions to reward vaults to earn Incentives
- **Protocols**: Compete for BGT emissions by offering attractive Incentive rates in their reward vaults
- **Users**: Earn BGT by providing liquidity, then delegate to validators who maximize returns

Protocols can attract BGT emissions by:

1. Creating a reward vault
2. Getting it whitelisted through governance
3. Setting competitive Incentive rates
4. Maintaining sufficient Incentive token liquidity

## Reward Vaults 🏦

Reward vaults are smart contracts where:

- Users stake receipt tokens to earn BGT
- Validators direct BGT emissions in exchange for protocol Incentives
- Protocols manage Incentive rates (defined as a ratio of Incentive tokens per BGT emitted to the vault)

Key points:

- Vault creation is permissionless but requires governance approval to receive BGT emissions
- Each vault can accept multiple whitelisted Incentive tokens
- Incentive rates can only be increased while tokens remain in the vault

This system ensures that chain growth benefits all participants while maintaining security through BERA staking.
