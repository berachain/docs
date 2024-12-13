# Creating a Governance Proposal for Berachain Reward Vaults

> **NOTE:** For a detailed guide on how to create a reward vault, please see this blog post: [Creating a Governance Proposal for Berachain Reward Vaults](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults) where you can learn how to create your own Reward Vaults.

Berachain's Proof-of-Liquidity (PoL) consensus mechanism allows protocols to bootstrap their liquidity by receiving Berachain Governance Token (`$BGT`) emissions from validators. This process is facilitated through Reward Vaults, which play a crucial role in the governance and incentive structure of the Berachain ecosystem.

## Understanding Reward Vaults in PoL

Reward Vaults are smart contracts that enable validators to share their `$BGT` rewards with protocols. When validators build blocks, they earn `$BGT` proportional to their staked amount. Validators can then:

1. Use `$BGT` for governance participation
2. Exchange `$BGT` for `$BERA` (the native gas token)
3. Share `$BGT` rewards with protocols through Reward Vaults

This mechanism is central to Berachain's [Reward Vaults](/developers/contracts/reward-vault) system.

[More about Reward Vaults](/developers/contracts/reward-vault)

## Governance and Reward Vaults

While creating a Reward Vault is permissionless, for it to receive `$BGT` emissions from validators, it must be whitelisted through a governance proposal. This process ensures community oversight and alignment with the PoL system's goals.

### Governance Process for Whitelisting

1. **Meet `$BGT` Requirements**:
   - A minimum amount of `$BGT` is needed to create a proposal
   - `$BGT` can be acquired through participation in PoL on native dApps

2. **Create and Submit Proposal**:
   - Proposals are submitted on-chain
   - There's a waiting period before voting begins

3. **Voting Period**:
   - Active voting window
   - `$BGT` holders cast votes (quorum required)

4. **Proposal Outcome**:
   - If passed: Enters a timelock queue
   - If declined: Marked as defeated, allowing for a new proposal after addressing concerns

> **NOTE:** For specific testnet values such as required $BGT amounts, voting periods, and quorum requirements, please refer to the [Governance Overview](/learn/governance/) section.
![Governance Process](/assets/governance-process.png)

## Reward Vault Models

Different implementation patterns that protocols can use for their Reward Vaults:

| Model | Description | User Flow | Protocol Benefits | Example Applications |
|-------|-------------|-----------|-------------------|---------------------|
| **Liquidity Staking/Vesting** | Users deposit/stake assets and receive receipt tokens for BGT eligibility | 1. Deposit assets<br>2. Receive receipt tokens<br>3. Stake in Reward Vault | - Increased liquidity depth<br>- Locked value<br>- User retention | - BEX LP staking<br>- Supply & Borrow from a lending protocol |
| **Purchase Actions** | Incentivizes purchases in your application | 1. Purchase item in app<br>2. Recieve reciept tokens and stake into Reward Vault<br>3. Receive BGT rewards |- Reward users for more specific actions | - Purchasing assets in a game<br>- Participating in NFT mints |
| **Retroactive Actions** | Rewards historical participation and loyalty | 1. Track participation<br>2. Meet criteria<br>3. Claim BGT rewards |  Community loyalty<br>- Historical recognition<br>- Long-term engagement | - OG NFT holder rewards<br>- Early user benefits |
| **Self-Funding** | Community-driven initiatives | 1. Contribute to initiative<br>2. Receive reciept tokens representing your contribution<br>3. Stake for BGT rewards | Sustainable funding<br> Community alignment| - Public goods funding<br>- L2 bridge incentives |


### Implementation Details

Each model can be customized with:
- Time-based rewards
- Amount restrictions
- Usage velocity metrics
- Delegating mechanisms (`delegateStake`), ie stake reciept tokens into a vault for your users

For technical implementation guides, see our [Advanced PoL Guide](/developers/guides/advanced-pol).

## Impact on PoL

Whitelisting a Reward Vault through governance has significant implications:

1. **Incentivize Anything In Your App**: Approved vaults can receive `$BGT` emissions, incentivizing liquidity provision, taking our loans, purchasing assets in a video game, etc. [See an example application here](https://blog.berachain.com/blog/onlypaws-bearing-it-all-for-proof-of-liquidity)
2. **Protocol Growth**: Protocols can use accumulated `$BGT` to bootstrap liquidity or participate in governance.
3. **Ecosystem Alignment**: The governance process ensures that whitelisted vaults align with the community's interests.

You can read more about Reward Vaults in our [Reward Vaults](/learn/pol/rewardvaults) section.

For more information on Berachain's governance system, see the [Governance Overview](/learn/governance/).

[Learn more about creating a governance proposal for Berachain Reward Vaults](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults)
