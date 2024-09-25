# Proof-of-Liquidity Overview 📓

One of the main [shortcomings](/learn/what-is-proof-of-liquidity#shortcomings-of-pos) of Proof-of-Stake is the lack of incentive for different ecosystem players to collaborate. Validators have little reason to interact with the protocols and end-users for whom they are ultimately running the infrastructure, yet they receive the majority of the economic incentives. On the other hand, projects launch on this infrastructure but retain the majority of the project tokens for themselves.

A healthier equilibrium can be achieved between projects, validators, and the chain when all actors share in the network's growth.

Proof-of-Liquidity (PoL) involves the participation and influence of all the chain's stakeholders. PoL requires different stakeholders to work in sync to maximize liquidity on the chain, ensuring they receive the greatest benefit.

The following sequence diagram represents the different steps that Proof-of-Liquidity (PoL) undergoes from the perspective of a validator and delegator.

![Berachain Proof-of-Liquidity Steps](/assets/proof-of-liquidity-steps.png)

1. A _Prospective Validator_ will provide an initial gas token bond (`$BERA`) to secure the network and gain eligibility to produce blocks. All active validators have an equal chance to be selected to propose a block.
2. An _Active Validator_ is chosen at random and proposes a new block.
3. For proposing a new block, the chain allots the _Active Validator_ with the governance token (`$BGT`) for distribution
4. With the rewarded governance token, the _Active Validator_ distributes to various _Reward Vaults_, decided by the validator in the Berachef contract (A list of addresses and distribution percentages to different Reward Vaults).
5. A _Liquidity Provider_ may perform a liquidity action like depositing a certain token with a BEX pool. Ex: Providing `$HONEY` and `$BERA` to a liquidity pool
6. For providing liquidity, the _Liquidity Provider_ receives a receipt token. Ex: `$HONEY-WBERA`.
7. The _Liquidity Provider_ stakes the receipt token with the _Reward Vault_ making them eligible to receive `$BGT` based on their contribution.
8. The `$BGT` that was distributed to the reward vault is now eligible to be claimed by the _Liquidity Provider_, making them a _BGT Holder_
9. A BGT Holder can now delegate their `$BGT` to an _Active Validator_, making that validator a _Boosted Validator_, and increases the rewards a validator is alloted to distribute when they propose a block

## Aligning Protocols and Validators 🤝

Because validators are given the responsibility of distributing governance tokens to Reward Vaults, when chosen to propose a block, it introduces a new dynamic where rewards are essentially shared with the ecosystem protocols.

Validators will share a stronger relationship with protocols, as their reward weight is determined by the governance tokens delegated to them, creating a symbiotic relationship.

Protocols can also convince Validators to start directing rewards to them by offering _Incentives_ in exchange for the `$BGT` rewards directed to their specific _Reward Vaults_.

## Existing Reward Vault Implementations 🐻

The following are implementations of existing Reward Vaults:

1. [BEX](/apps/core/content/learn/dapps/bex.md) - Specific BEX Pools
2. [Berps](/apps/core/content/learn/dapps/berps.md) - Depositing `$HONEY` into Berps Honey Vault
3. [Bend](/apps/core/content/learn/dapps/bend.md) - Borrow `$HONEY`
