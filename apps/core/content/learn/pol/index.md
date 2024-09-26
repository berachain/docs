# Proof-of-Liquidity Overview 📓

One of the main [shortcomings](/learn/what-is-proof-of-liquidity#shortcomings-of-pos) of Proof-of-Stake is the lack of incentive for different ecosystem players to collaborate. Validators have little reason to interact with the protocols and end-users for whom they are ultimately running the infrastructure, yet they receive the majority of the economic incentives. On the other hand, projects launch on this infrastructure but retain the majority of the project tokens for themselves.

A healthier equilibrium can be achieved between projects, validators, and the chain when all actors share in the network's growth.

Proof-of-Liquidity (PoL) involves the participation and influence of all the chain's stakeholders. PoL requires different stakeholders to work in sync to maximize liquidity on the chain, ensuring they receive the greatest benefit.

## User Flow

The following sequence diagram represents the different steps that Proof-of-Liquidity (PoL) undergoes from the perspective of how Berachain users are able to earn `$BGT` rewards by supplying liquidity.

![Berachain Proof-of-Liquidity Steps](/assets/proof-of-liquidity-steps.png)

1. A _Prospective Validator_ stakes an initial bond (`$BERA`) to secure the network and gain eligibility to produce blocks, becoming an _Active Validator_.
2. An _Active Validator_ is chosen at random and proposes a new block. All validators have an equal chance of being chosen.
3. For proposing a new block, the chain allots the _Active Validator_ with the governance token (`$BGT`) for distribution
4. The _Active Validator_ distributes `$BGT` to its choice of _Reward Vaults_, defined by the validator in a _Cutting Board_ (a list of addresses and distribution percentages to different Reward Vaults).
5. A _Liquidity Provider_ may supply liquidity, such as depositing in a BEX pool. Ex: Providing `$HONEY` and `$BERA` liquidity, for which they receive a receipt token (`$HONEY-WBERA LP`).
6. The _Liquidity Provider_ stakes the receipt token with the _Reward Vault_ making them eligible to receive `$BGT` based on their contribution.
7. The `$BGT` that was distributed to the Reward Vault is claimable by the _Liquidity Provider_, making them a _BGT Holder_.
8. A _BGT Holder_ can now delegate their `$BGT` to an _Active Validator_, making that validator a _Boosted Validator_, and increases the `$BGT` a validator distribute when they propose a block.
