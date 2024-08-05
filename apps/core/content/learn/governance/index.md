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

Governance on Berachain is dictated by BGT (Bera Governance Token) voting. Berachain's governance mechanism is styled after OpenZeppelin's [Governance](https://docs.openzeppelin.com/contracts/5.x/governance) module and is a crucial part of the 'Proof of Liquidity' consensus mechanism.

The Berachain governance module has a wide scope of powers, including control over:

- PoL asset whitelisting (e.g., new staking assets, whitelisting incentive assets)
- $HONEY minting parameters (e.g., eligible collateral assets, minting rates)
- Native dApp governance (e.g., changes to Bend's interest rate model)
  - Berps
  - Bend
  - Bex
- Whitelisting Rewards Vaults as "friends of the chef"

## Rewards Vaults and BGT Emissions

One of the biggest perks of Berachain's 'Proof of Liquidity' consensus mechanism is the ability for protocols to bootstrap their liquidity by getting BGT emissions. This is done through Reward Vaults, represented by the RewardsVaults smart contract.

When validators build blocks, they are awarded BGT proportional to their staked amount. Validators have three options for their BGT rewards:
1. Use BGT to participate in governance
2. Exchange BGT for Bera
3. Share BGT rewards with protocols in exchange for incentive tokens

![Berachain Testnet Faucet](/assets/gauges-incentives.png)

## Proposal Lifecycle

The lifecycle of a governance proposal follows these steps:

1. **Creation**: A proposal is created (requires at least 1000 BGT)
2. **Waiting Period**: 3 hours before becoming active for voting
3. **Active Voting**: 3 hours for BGT holders to cast votes
4. **Execution**: If passed, enters a queue with a 2-day timelock delay before execution

![Governance Process](/assets/governance-process.png)

## BGT Voting

BGT token balances in users' wallets determine voting power:
`1 BGT = 1 vote`

Key points about BGT voting:
- BGT holders can delegate their voting power to arbitrary addresses
- Delegation transfers voting rights, not the actual BGT tokens (which are non-transferrable)
- A quorum of 2B BGT votes is required for a proposal to pass

## Creating a Governance Proposal

To create a governance proposal:

1. Ensure you have at least 1000 BGT. This can be achieved through:
   - Acquiring BGT by participating in PoL on native dapps at [BGT Station](https://bartio.station.berachain.com/gauge)
   - Requesting BGT delegation from the Berachain team (for testnet purposes)

2. Once you have sufficient BGT (either owned or delegated):
   - Delegate BGT to yourself if you own it
   - If delegated by the Berachain team, it's already set up for voting

3. Submit the proposal on-chain

4. Wait for the voting period and participate in voting. As well, ask the

For a detailed guide on creating a governance proposal programmatically, including code examples and step-by-step instructions, please refer to our [full tutorial](https://github.com/berachain/rewards-vault-tutorial).

> Note: The ability to request BGT delegation from the Berachain team is primarily for testnet purposes. On mainnet, acquiring sufficient BGT will be through active participation in the ecosystem.
