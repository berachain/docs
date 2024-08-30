---
head:
  - - meta
    - property: og:title
      content: Berachain Governance
  - - meta
    - name: description
      content: How Berachain's Governance Works
  - - meta
    - property: og:description
      content: How Berachain's Governance Works
---

# Berachain Governance

Berachain's Governance system uses BGT to allow token holders to make important decisions about core functions of Proof of Liquidity & our core dapps. Here's a few examples of what governance can be used for:

- PoL asset whitelisting (e.g., new staking assets, whitelisting incentive assets)
- $HONEY minting parameters (e.g., eligible collateral assets, minting rates)
- Native dApp governance (e.g., changes to Bend's interest rate model)
  - Berps
  - Bend
  - Bex
- Whitelisting Rewards Vaults for BGT emissions

## Governance Process

The governance process on Berachain follows several stages:

1. **Proposal Creation**: Any user with sufficient voting power (at least 1000 $BGT) can create a governance proposal.

2. **Pending State**: Once created, the proposal enters a 3-hour waiting period before becoming active for voting.

3. **Active Voting**: The voting period lasts for 3 hours. During this time, $BGT holders can cast their votes.

4. **Proposal Outcome**: After the voting period, the proposal is either marked as Succeeded or Defeated. A quorum of 2 billion $BGT is required for a proposal to pass.

5. **Timelock**: If the proposal succeeds, it enters a queue with a 3-hour timelock delay.

6. **Execution**: After the timelock period, the proposal can be executed, implementing the proposed changes.

![Governance Process](/assets/governance-process.png)

## Creating a Governance Proposal

To create a governance proposal on Berachain:

1. **Ensure Sufficient Voting Power**: You need at least 1000 $BGT, either owned directly or delegated to you by other token holders.

2. **Delegate $BGT**: Even if you own the required $BGT, you must delegate it to yourself (or have it delegated by others) to gain voting power.

3. **Prepare Your Proposal**: Clearly define the changes you want to implement. For example, to add a Reward Vault to the BeraChef contract, you would need to specify the vault address and the function call to update the "friends of the chef."

4. **Submit the Proposal**: Use the governance contract to submit your proposal on-chain. This typically involves calling a `propose` function with the necessary parameters.

5. **Monitor and Participate**: Once submitted, monitor your proposal's progress through the various stages. Encourage other $BGT holders to vote and participate in discussions about your proposal.

6. **Execute if Passed**: If your proposal passes and completes the timelock period, you or another user can execute it to implement the changes.

For a detailed walkthrough of creating a governance proposal, including code examples and step-by-step instructions, please refer to our [full tutorial](https://github.com/berachain/rewards-vault-tutorial).
