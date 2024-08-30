# PoL Participants 👥

The following diagram shows a breakdown of the different participants in the PoL ecosystem.

![PoL Stakeholders](/assets/val-stakeholder-overview.png)

## Validators ✅

Validators coordinate with one another to reach consensus on the state of the blockchain. In exchange for earning network rewards, validators must put assets at stake and can be penalized for misbehavior. Staking `$BERA` tokens is required for becoming an active validator.
Validators earn through three primary means:

1. Gas fees and priority fees
2. Collecting incentives provided by protocols for directing `$BGT` rewards to their [Reward Vaults](/learn/pol/rewardvaults)
3. Taking a commission on the total `$BGT` earned from building a block

Point 1 is straightforward, and is the same as in Ethereum PoS. Point 2 is where interesting PoL mechanics come into play.

### Validator Incentives 💎

As discussed in [$BGT](/learn/pol/tokens/bgt), emissions are distributed per block based on the `$BGT` delegation weight of the validator selected to propose the block. Each block's proposing validator has the right to distribute the block's `$BGT` rewards to any Reward Vault(s) they choose, and collect any associated incentives provided by protocols. There is an equal chance for any validator to propose a block.

Validators' `$BGT` delegation weight initially starts at 0, such that validators do not distribute `$BGT` to Reward Vaults when proposing blocks. However, by demonstrating that they are seeking out the most profitable Reward Vaults to direct `$BGT` to, and by passing on a portion of these rewards to `$BGT` delegators, they can attract a greater delegation.

### Ecosystem Alignment ⚖️

Validators in PoL are more than just "validating" the network, they have the opportunity to partner with protocols to promote their liquidity on Berachain. Lastly, they must earn the favor of users (i.e. `$BGT` holders and farmers) in order to effectively distribute `$BGT` rewards to Reward Vaults and earn incentives.

## `$BGT` Holders & Farmers 🥕

`$BGT` holders play a crucial role in the following:

1. Influencing ecosystem decisions through Governance
2. Influencing where Berachain's economic incentives are directed (by delegating to validators)

:::warning
**Note:** `$BGT` that is delegated to validators is not subject to slashing. Only validators' `$BERA` stakes can be slashed.
:::

### Earning `$BGT` ⬇️

As a farmer seeking to earn `$BGT`, I would look for the most profitable Reward Vaults to farm, given my risk and asset exposure profile. This means that I would look for the Reward Vaults that are receiving the most `$BGT` emissions from validators meeting my criteria. For example, if I only wanted stablecoin exposure, I may elect to earn `$BGT` by providing `$HONEY` liquidity to the Berps protocol.

### Delegating `$BGT` ⬆️

Now that I have `$BGT`, different factors may influence how I choose to delegate it:

- I may delegate `$BGT` to validators who are directing `$BGT` rewards to the Reward Vaults I am farming (to increase my earning rate).
- I may delegate `$BGT` to validators who maximize reward vault incentive earning, and pass the maximum value back to their delegators.

## Bera Foundation 🏛️

The Foundation plays a role in operating default dApps (Bex, Bend, Berps) which produce fees that are distributed to `$BGT` holders (such that there is native demand for earning `$BGT`, independent of reward vault incentives).

Liquidity in these default dApps also serve as default Reward Vaults for users to provide liquidity on and earn `$BGT`, until other protocols' Reward Vaults are plugged into PoL through governance.

## Ecosystem Projects 🧸

PoL represents a novel way for protocols to bootstrap deposits, versus the traditional approach of incentivizing liquidity through liquidity mining. By plugging into PoL, protocols can promote liquidity by incentivizing `$BGT` rewards (from validators) to be directed to their Reward Vaults.

All of the chain's participants are aligned in increasing the overall value of the network, since all rewards coalesce around `$BGT`. If the value of `$BGT` incentives go up, projects' tokens (which are provided as incentives on Reward Vaults) may also corresponding increase in value with an increase in deposits.

Lastly, new ecosystem projects will have to become active participants and earn the favor of `$BGT` holders and delegates, in order to have their Reward Vaults be whitelisted into the PoL system.
