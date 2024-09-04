# Creating a Governance Proposal for Berachain Reward Vaults


> **Note:** For a detailed guide on how to create a reward vault, please see this blog post: [Creating a Governance Proposal for Berachain Reward Vaults](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults) where you can learn how to create your own Reward Vaults.



Berachain's Proof of Liquidity (PoL) consensus mechanism allows protocols to bootstrap their liquidity by receiving Berachain Governance Token (`$BGT`) emissions from validators. This process is facilitated through Reward Vaults, which play a crucial role in the governance and incentive structure of the Berachain ecosystem.

## Understanding Reward Vaults in PoL

Reward Vaults are smart contracts that enable validators to share their `$BGT` rewards with protocols. When validators build blocks, they earn `$BGT` proportional to their staked amount. Validators can then:

1. Use `$BGT` for governance participation
2. Exchange `$BGT` for `$BERA` (the native gas token)
3. Share `$BGT` rewards with protocols through Reward Vaults

This mechanism is central to Berachain's [Reward Vaults](https://docs.berachain.com/developers/contracts/rewards-vault) system.

## Governance and Reward Vaults

While creating a Reward Vault is permissionless, for it to receive `$BGT` emissions from validators, it must be whitelisted through a governance proposal. This process ensures community oversight and alignment with the PoL system's goals.

### Governance Process for Whitelisting

1. **Meet `$BGT` Requirements**:
   - Minimum 1000 `$BGT` needed to create a proposal
   - `$BGT` can be acquired through participation in PoL on native dApps

2. **Create and Submit Proposal**:
   - Proposals are submitted on-chain
   - 3-hour waiting period before voting begins

3. **Voting Period**:
   - 3-hour active voting window
   - `$BGT` holders cast votes (quorum: 2B `$BGT`)

4. **Proposal Outcome**:
   - If passed: Enters a 2-day timelock queue
   - If declined: Marked as defeated, allowing for a new proposal after addressing concerns

![Governance Process](/assets/governance-process.png)

## Impact on the PoL Ecosystem

Whitelisting a Reward Vault through governance has significant implications:

1. **Liquidity Incentives**: Approved vaults can receive `$BGT` emissions, incentivizing liquidity provision.
2. **Protocol Growth**: Protocols can use accumulated `$BGT` to bootstrap liquidity or participate in governance.
3. **Ecosystem Alignment**: The governance process ensures that whitelisted vaults align with the community's interests.

You can read more about Reward Vaults in our [Reward Vaults](/learn/pol/rewardvaults) section.

For more information on Berachain's governance system, see the [Governance Overview](/learn/governance/).

[Learn more about creating a governance proposal for Berachain Reward Vaults](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults)
