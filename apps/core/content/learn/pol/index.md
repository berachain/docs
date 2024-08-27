# Proof-of-Liquidity Overview 📓

One of the main [shortcomings](/learn/what-is-proof-of-liquidity#shortcomings-of-pos) in Proof-of-Stake is that there is little incentive for different ecosystem players to collaborate. Validators have little reason to interact with protocols and end-users they are ultimately running infrastructure for, yet they receive the majority of economic incentives. On the opposite end, projects launch on the infrastructure but keep the majority of the project tokens to themselves.

A healthier equilibrium can come between projects, validators and chain when all actors are sharing in all growth of the network.

Proof-of-Liquidity (PoL), involves influence from all of the chain's participants. PoL requires different stakeholders to work in-sync to maximize liquidity on the chain in order and receive the greatest benefit.

The following sequence diagram represents the different steps that Proof-of-Liquidity (PoL) undergoes from the perspective of a validator and delegator.

![Berachain Proof-of-Liquidity Steps](/assets/proof-of-liquidity-steps.png)

1. A _Prospective Validator_ will provide an initial gas token bond (`$BERA`) to secure the network and gain eligibility to produce blocks. All active validators have an equal chance to be selected to propose a block.
2. An _Active Validator_ is chosen at random and proposes a new block.
3. For proposing a new block, the chain allots the _Active Validator_ with the governance token (`$BGT`) for distribution
4. With the rewarded governance token, the _Active Validator_ distributes to various _Reward Vaults_, decided by the validator in the Berachef contract (A list of addresses and distribution percentages to different Reward Vaults).
5. A _Liquidity Provider_ may perform a liquidity action like depositing a certain token with a BEX pool. Ex: Providing `$HONEY` and `$BERA` to a liquidity pool
6. For providing liquidity, the _Liquidity Provider_ receives a receipt token. Ex: `$HONEY-WBERA`.
7. The _Liquidity Provider_ stakes the receipt token with the _Reward Vault_ making them eligible to recieve `$BGT` based on their contribution.
8. The `$BGT` that was distributed to the reward vault is now eligible to be claimed by the _Liquidity Provider_, making them a _BGT Holder_
9. A BGT Holder can now delegate their `$BGT` to an _Active Validator_, making that validator a _Boosted Validator_, and increases the rewards a validator is alloted to distribute when they propose a block

## Aligning Protocols and Validators 🤝

Because validators are given the responsibility of distributing governance tokens to Reward Vaults, when chosen to propose a block, it introduces a new dynamic where rewards are essentially shared with the ecosystem protocols.

Validators will share a stronger relationship with protocols, as their reward weight is determined by the governance tokens delegated to them, creating a symbiotic relationship.

Protocols can also convince Validators to start directing rewards to them by offering _Incentives_ in exchange for the `$BGT` rewards directed to their specific _Reward Vaults_.

## Existing Reward Vault Implementations 🐻

The following are implementations of existing Reward Vaults:

1. [BEX](/learn/dapps/bex) - Specific BEX Pools
2. [Berps](/learn/dapps/berps) - Depositing `$HONEY` into Berps Honey Vault
3. [Bend](/learn/dapps/bend) - Borrow `$HONEY`
