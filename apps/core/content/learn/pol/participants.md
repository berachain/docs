# PoL Participants 👥

The following diagram shows a breakdown of the different participants in the PoL ecosystem.

![PoL Stakeholders](/assets/val-stakeholder-overview.png)

## Validators ✅

Validators coordinate with one another to reach consensus on the state of the blockchain. In exchange for earning network rewards, validators must stake `$BERA`, which can be penalized for misbehavior.

Validators earn through three primary means:

1. Gas fees and priority fees
2. A percentage of `$BGT` block emissions (fixed at the chain level across validators)
3. Commission on incentives from [Reward Vaults](/learn/pol/rewardvaults) (configurable by validators)

Points 1 & 2 are straightforward, and are similar to Ethereum PoS. Point 3 is where interesting PoL mechanics come into play.

### Validator Incentives 💎

Emissions are distributed per block based on the [$BGT](/learn/pol/tokens/bgt) delegation weight of the validator proposing that block. That validator has the right to distribute the block's `$BGT` rewards to any Reward Vault(s) they choose, and collect any associated incentives provided by protocols. There is an equal random chance for any validator to propose a block.

Validators, by demonstrating that they are seeking out the most profitable Reward Vaults to direct `$BGT` to, and by passing on received incentives to their delegators (from which validators take a commission), can attract a greater delegation.

### Ecosystem Alignment ⚖️

Validators in PoL are more than just "validating" the network, they have the opportunity to partner with protocols to promote their liquidity on Berachain. They must earn the favor of users (i.e. `$BGT` holders and farmers) in order to optimally distribute `$BGT` rewards to Reward Vaults and earn incentives (for both themselves and delegates).

### Validator Value Flow Example

This example examines the value flow from a validator's perspective. All numbers are for illustrative purposes only. In our example, 5% of emissions are given to validators (configured globally at the chain level), and a _Validator A_ takes a 7% commission on incentives (configured at the validator level)

1. _Validator A_ proposes a block, and 1000 `$BGT` is minted
2. _Validator A_ receives 5% of the 1000 `$BGT` (50 `$BGT`), according to the commission elected by the validator
3. _Validator A_ distributes the remainder (950 `$BGT`) to Reward Vaults according to their _Cutting Board_ distribution
4. _Validator A_ receives _incentives_ from protocols for directing `$BGT` to their Reward Vaults (e.g. 10,000 `$HONEY`)
5. _Validator A_ takes a 7% commission on the incentives (e.g. 700 `$HONEY`), and distributes the remainder (e.g. 9,300 `$HONEY`) to their `$BGT` delegators pro-rata

## `$BGT` Holders & Farmers 🥕

`$BGT` holders play a crucial role in the following:

1. Influencing ecosystem decisions through [Governance](/learn/governance/)
2. Influencing where Berachain's economic incentives are directed (by delegating to validators)

:::warning
**Note:** `$BGT` that is delegated to validators is not subject to slashing. Only validators' `$BERA` stakes can be slashed.
:::

### Earning `$BGT` ⬇️

A farmer seeking to earn `$BGT` may look for the most profitable Reward Vault(s) to farm, considering their risk profile. This could entail seeking Reward Vaults which receive the most `$BGT` emissions and which meet their asset exposure criteria. For example, if I only wanted stablecoin exposure, I may elect to earn `$BGT` by providing `$HONEY` liquidity to [Berps](/learn/dapps/berps).

### Delegating `$BGT` ⬆️

After earning `$BGT`, different factors may influence how holders choose to delegate it:

- Delegating `$BGT` to validators who are directing `$BGT` rewards to Reward Vaults in which they are deposited (to increase their earning rate).
- Delegating `$BGT` to validators who maximize reward vault incentive earning, and pass the maximum value back to their delegators.

## Bera Foundation 🏛️

The Foundation plays a role in operating default dApps (Bex, Bend, Berps) which produce fees that are distributed to `$BGT` holders (such that there is native demand for earning `$BGT`, independent of reward vault incentives). Liquidity in these default dApps also serve as default Reward Vaults for users to provide liquidity on and earn `$BGT`.

## Ecosystem Projects 🧸

PoL represents a novel way for protocols to bootstrap deposits, versus the traditional approach of incentivizing liquidity through liquidity mining. Protocols can opt to bootstrap deposits by incentivizing validators to direct `$BGT` to their Reward Vaults (for example with that protocol's governance tokens).

All of the chain's participants are aligned in increasing the overall value of the network, since all rewards coalesce around `$BGT`. If the value of `$BGT` incentives go up, projects' tokens (which are provided as incentives on Reward Vaults) may also corresponding increase in value with an increase in deposits.
