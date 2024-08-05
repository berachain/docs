# Creating a Governance Proposal for Berachain Reward Vaults

One of the biggest perks of Berachain's 'Proof of Liquidity' consensus mechanism is the ability for protocols to bootstrap their liquidity by getting BGT emissions. This is done through Reward Vaults, represented by the RewardsVaults smart contract.

> **Note:** You can see the [Berps Reward Vault Smart Contract](https://bartio.beratrail.io/address/0xC5Cb3459723B828B3974f7E58899249C2be3B33d) in action on our testnet as an example.

## Understanding Reward Vaults

When validators build blocks, they are awarded an amount of BGT that is proportional to the amount of BGT that they have staked with them. Validators have three options for their BGT rewards:
1. Use that BGT to participate in governance
2. Exchange their BGT for Bera
3. Share some of their BGT rewards with protocols who would like to be given BGT in exchange for incentive tokens

This mechanism happens through Berachain's [**Reward Vaults**](https://docs.berachain.com/developers/contracts/rewards-vault).

![Berachain Testnet Faucet](/assets/gauges-incentives.png)

## Example: BeraSwap Rewards System

Let's consider an example protocol, BeraSwap (an Automated Market Maker), and how it would use Reward Vaults:

1. **Vault Creation**: A rewards vault is created for eligible assets (e.g., Bera tokens, which are the native gas token of Berachain).
2. **User Deposits**: Users deposit Bera tokens into the vault.
3. **Token Distribution**: Users receive BGT (Bera Governance Tokens) and vBera tokens (BeraSwap's liquidity provider tokens) in return.
4. **Validator Contributions**: Validators contribute some earned BGT to the Reward Vault.
5. **Validator Rewards**: Validators receive vBera tokens in exchange for their BGT.
6. **Protocol Benefits**: BeraSwap accumulates BGT through this process.
7. **BGT Utilization**: The protocol can use accumulated BGT for governance or to bootstrap liquidity in its AMM pools.

This system allows BeraSwap, as an AMM, to incentivize liquidity provision (through vBera tokens) while leveraging the Berachain ecosystem's native tokens (Bera for gas and BGT for governance).

## Creating a Reward Vault

Reward Vaults are created by the [RewardsVault Factory](https://bartio.beratrail.io/address/0x2B6e40f65D82A0cB98795bC7587a71bfa49fBB2B), which is a smart contract on Berachain that creates a vault by calling the function `createRewardsVault(stakingToken)`.

While it's permissionless to create your own Reward Vault, for Validators to emit their BGT to you, you must submit a governance proposal to have your Reward Vault added to [BGT Station](https://bartio.station.berachain.com/gauge) to participate in PoL.

![Rewards Factory](/assets/rewards-vault-creation.png)

## Governance Process for Whitelisting

To have your Reward Vault officially recognized in Berachain's PoL system, you need to go through the governance process to be whitelisted as a "friend of the chef" for Validators.

### Governance Steps

1. **Meet BGT Requirements**: 
   - At least 1000 BGT needed to create a proposal
   - Can be acquired directly or delegated by community members
   - Acquire BGT by participating in PoL on native dapps at [BGT Station](https://bartio.station.berachain.com/gauge)

2. **Delegate BGT**:
   - Delegate BGT to yourself to vote and create proposals
   - Voting power can be delegated from others if you lack sufficient BGT
   - Delegation transfers voting rights, not the actual BGT tokens

3. **Create and Vote on Proposal**:
   - Creation: Submit proposal on-chain
   - Waiting Period: 3 hours before becoming active for voting
   - Active Voting: 3 hours for BGT holders to cast votes (quorum: 2B BGT)

4. **Proposal Outcome**:
   - If passed: Enters queue with 2-day timelock delay
   - If declined: Marked as defeated, new proposal can be created after addressing concerns

![Governance Process](/assets/governance-process.png)

For a detailed guide on creating a governance proposal programmatically, including code examples and step-by-step instructions, please refer to our [full tutorial](https://github.com/berachain/rewards-vault-tutorial).

For more information on the governance process, see the [Governance Overview](/learn/governance/).