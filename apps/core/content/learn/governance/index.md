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

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Governance

Berachain's Governance system uses `$BGT` to allow token holders to make important decisions about core functions of Proof of Liquidity & our core dApps. Here are a few examples of what governance can be used for:

- Proof-of-Liquidity asset whitelisting (e.g., new staking assets, whitelisting incentive assets)
- Native dApp governance (e.g., changes to BEX's protocol fees)

## Governance Process

![Governance Process](/assets/governance-process.png)

The governance process on Berachain follows several stages:

1. **Proposal Creation**: Any user with sufficient voting power can create a governance proposal.

2. **Pending State**: Once created, the proposal enters a waiting period before becoming active for voting.

3. **Active Voting**: During the voting period, `$BGT` holders can cast their votes.

4. **Proposal Outcome**: After the voting period, the proposal is either marked as Succeeded or Defeated. A quorum of `$BGT` is required for a proposal to pass.

5. **Timelock**: If the proposal succeeds, it enters a queue with a timelock delay.

6. **Execution**: After the timelock period, the proposal can be executed, implementing the proposed changes.

## Guardian Oversight

During the **Timelock** period, Berachain's guardian system provides an additional layer of security. Guardians can veto malicious proposals (e.g., hostile takeover, unauthorized code changes) to protect the Berachain ecosystem.

Guardians act through a 5-of-9 multisig with elected signers. Their veto power is enacted as a cancellation of a proposal during the timelock period, serving as a last line of defense against potentially harmful changes.

## Creating a Governance Proposal

Governance proposals can be discussed and created on <a :href="config.mainnet.dapps.hub.url + 'governance/general/'">
BeraHub
</a>.

Creating a governance proposal on Berachain Governance requires adhering to the following:

1. **Ensure Sufficient Voting Power**: You need sufficient `$BGT`, either owned directly or delegated to you by other token holders.

2. **Delegate `$BGT`**: Even if you own the required `$BGT`, you must delegate it to yourself (or have it delegated by others) to gain voting power.

3. **Prepare Your Proposal**: Clearly define the changes you want to implement. For example, to whitelist a Reward Vault to the BeraChef contract, you would need to specify the vault address and encode the correct function signature.

4. **Submit the Proposal**: Use the governance contract to submit your proposal on-chain. This typically involves calling a `propose` function with the necessary parameters.

5. **Monitor and Participate**: Once submitted, monitor your proposal's progress through the various stages. Encourage other `$BGT` holders to vote and participate in discussions about your proposal.

6. **Execute if Passed**: If your proposal passes and completes the timelock period, you or another user can execute it to implement the changes.

For a detailed walkthrough of creating a governance proposal, including code examples and step-by-step instructions, please refer to our [full tutorial](https://github.com/berachain/guides/tree/main/apps/berachain-governance-proposal).

## Governance Parameters

| State             | Criteria                                            |
| ----------------- | --------------------------------------------------- |
| Proposal Creation | 10000 `$BGT` Required                               |
| Pending State     | 1-hour waiting period                               |
| Voting Period     | 5-days                                              |
| Proposal Outcome  | 20% of total `$BGT` supply required to reach quorum |
| Timelock          | 2 days delay                                        |
