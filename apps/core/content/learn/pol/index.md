<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Proof-of-Liquidity Overview 📓

Proof-of-Liquidity (PoL) is an extension of Proof-of-Stake (PoS) that realigns economic incentives among validators, applications, and users. This is enabled through a two-token model - a token responsible for chain security (`$BERA`) and a token responsible for governance and rewards (`$BGT`). Further information about our design goals for Proof of Liquidity are in the [Honeypaper](https://honeypaper.berachain.com/)

## Core Components

### Security Layer ($BERA)

Berachain's Active Set of validators (validators participating in consensus) is determined by validators' `$BERA` stake, with a minimum of `{{ config.mainnet.minEffectiveBalance }} $BERA` and a maximum cap of `{{ config.mainnet.maxEffectiveBalance }} $BERA`. The top {{ config.mainnet.validatorActiveSetSize }} validators ranked by stake are in the Active Set. Within the Active Set, a validator's probability of proposing a block is proportional to their staked `$BERA` — more `$BERA` staked increases the likelihood of proposing a block.

### Reward Layer ($BGT)

The size of a validator's `$BGT` block reward is determined by their Boost, which is a percentage calculated from the validator's `$BGT` boost divided by the total `$BGT` boosted to all validators. Boosts are obtained when `$BGT` holders delegate to validators.

Learn more about how emissions are calculated on the [emissions page](./blockrewards.md).

### Reward Allocation Management (BeraChef)

[BeraChef](/learn/pol/blockrewards#berachef-reward-allocation-management) manages the configuration layer of PoL, controlling how validators direct their BGT rewards across different Reward Vaults. It handles validator reward allocation preferences, vault whitelisting, and commission management, ensuring that only governance-approved protocols can participate in the ecosystem.

## PoL Lifecycle

![Berachain Proof-of-Liquidity Steps](/assets/proof-of-liquidity-steps.png)

### 1. Validator Lifecycle

The journey begins when a Prospective Validator stakes their `$BERA` as a security bond (①). Validators are chosen to propose blocks with a probability proportional to their staked amount (②). For each block proposed, the validator receives both a base emission and a variable reward emission based on their boost percentage (③) (see [emissions](./blockrewards.md)).

**For Validators**: Learn about the [validator lifecycle](/nodes/validator-lifecycle).

### 2. Block Reward Distribution

After collecting the base `$BGT` rewards for themselves, validators direct the remaining variable `$BGT` rewards to whitelisted [Reward Vaults](/learn/pol/rewardvaults) of their choosing (④). In exchange for directing their emissions, validators receive protocol-provided [Incentives](/learn/pol/incentives) from Reward Vaults (the `$BGT` is earned by users supplying liquidity to the protocol).

**For Validators**: Learn about managing your [reward allocations](/nodes/guides/reward-allocation) and [setting commission rates](/nodes/guides/manage-incentives-commission).

### 3. Liquidity Provider Flow

The ecosystem's liquidity providers (i.e., users) play a crucial role in PoL. Users can provide liquidity to protocols like BEX (⑤) and receive receipt tokens as proof of their contribution (⑥). These receipt tokens are then staked in Reward Vaults (⑦), where users earn `$BGT` proportional to their share of the vault (⑧).

Learn about [integrating with Berachain's incentive system](/learn/pol/incentives) and [Reward Vault design](/learn/pol/rewardvaults).

### 4. Delegation Cycle

As `$BGT` Holders accumulate tokens, they can delegate them to validators (⑨), directly influencing the validator's boost. This creates a virtuous cycle where higher delegation leads to increased validator boost, resulting in larger `$BGT` emissions when that validator proposes blocks. Validators are incentivized to share their received protocol Incentives with delegators to attract more boosts, fostering a collaborative ecosystem.

**For BGT Holders**: Learn how to [boost a validator with BGT](/learn/guides/boost-a-validator) to participate in the delegation cycle.
