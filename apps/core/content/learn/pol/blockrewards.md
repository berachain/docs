<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Block Production & Rewards

Proof-of-Liquidity governs block rewards and token emissions on Berachain using the `$BGT` token. This page explains the mathematical principles behind validator selection, block rewards, and emissions calculations.

## Validator Selection

The network maintains an active set of **{{ config.mainnet.validatorActiveSetSize }} validators** who are eligible for block production. Selection criteria include:

- Only top **{{ config.mainnet.validatorActiveSetSize }} validators** by `$BERA` stake are included in active set
- Block proposal probability is proportional to staked `$BERA` and does not affect reward amounts
- Stake limitations per validator:
  - Minimum: {{ config.mainnet.minEffectiveBalance }} `$BERA`
  - Maximum: {{ config.mainnet.maxEffectiveBalance }} `$BERA`

A given Validator's probability of being selected to produce a block is the proportion of its stake's weight to the total stakes of the active set.

## $BGT Emissions Structure

When a validator produces a block, `$BGT` tokens are emitted through two emission components:

1. Base Emission
   - **Fixed amount** equal to a `base rate` parameter (B)
   - Paid directly to block-producing validator

2. Reward Vault Emission
   - **Variable amount** dependent on validator's boost (x)
     - i.e. percentage of total `$BGT` delegated to the validator
   - Distributed to [Reward Vaults](/learn/pol/rewardvaults) selected by validator
     - Proportional to weights configured in the validator's [Reward Allocation](/nodes/guides/reward-allocation)
     - Validators receive [Incentives](/learn/pol/incentives) from projects based on amounts directed to their Reward Vaults

## Validator Boosts

Boost is a crucial metric that determines a validator's reward emissions:

- Calculated as the percentage of `$BGT` delegation a validator has compared to the total `$BGT` delegated in the network
- Expressed as a decimal between 0 and 1
- Example: If a validator has 1000 `$BGT` delegated and the network has 10000 total `$BGT` delegated, their boost would be 0.1 (10%).
  Higher boost leads to higher reward emissions, subject to the emission formula.

## BeraChef: Reward Allocation Management

BeraChef is the core contract that manages how validators direct their BGT rewards across different Reward Vaults. It serves as the configuration layer that determines reward distribution based on validator preferences.

### Core Responsibilities

BeraChef manages three key aspects of the reward system:

1. **Reward Allocations** - Maintains lists of weights that determine the percentage of rewards going to each Reward Vault
2. **Vault Whitelisting** - Controls which vaults are eligible to receive BGT rewards
3. **Validator Commission** - Manages commission rates that validators can charge on incentive tokens

### How Reward Allocations Work

Each validator can set a custom reward allocation that specifies how their BGT rewards should be distributed across different Reward Vaults. If a validator doesn't set a custom allocation, a default allocation is used.

**Reward Allocation Structure:**

- **Weights**: Percentage allocations to different vaults (must sum to 100%)
- **Start Block**: When the allocation becomes effective
- **Delay Period**: Time buffer before allocations can be changed

**Validator Control:**

- Queue new reward allocations with a specified delay
- Modify commission rates on incentive tokens (capped at 20%)
- Change allocations following governance-imposed delay periods

### Commission Management

BeraChef manages validator commission rates on incentive tokens with the following constraints:

- **Default Commission**: 5% if not explicitly set
- **Maximum Commission**: 20% hard cap enforced by the contract
- **Change Delay**: Required waiting period before commission changes take effect

### Integration with Block Rewards

When a validator produces a block, BeraChef determines:

1. Which Reward Vaults receive the variable BGT emission
2. The proportion each vault receives based on the validator's allocation weights
3. The commission the validator earns on any incentive tokens from those vaults

For detailed validator operations, see:

- [Managing Validator Reward Allocations](/nodes/guides/reward-allocation)
- [Setting Commission Rates](/nodes/guides/manage-incentives-commission)

## $BGT Emissions Per Block

The total `$BGT` emitted per block is calculated using the following formula:

$$emission = \left[B + \max\left(m, (a + 1)\left(1 - \frac{1}{1 + ax^b}\right)R\right)\right]$$

### Parameters

| Parameter                       | Description                                                    | Impact                                         |
| ------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| x (boost)                       | Fraction of total `$BGT` delegated to validator (range: [0,1]) | Determines `$BGT` emissions to Reward Vaults   |
| B (base rate)                   | Fixed amount of `$BGT` for block production                    | Determines baseline validator rewards          |
| R (reward rate)                 | Base `$BGT` amount for reward vaults                           | Sets foundation for reward emissions           |
| a (boost multiplier)            | Boost impact coefficient                                       | Higher values increase boost importance        |
| b (convexity parameter)         | Boost impact curve steepness                                   | Higher values penalize low boost more severely |
| m (minimum boosted reward rate) | Floor for reward vault emissions                               | Higher values benefit low-boost validators     |

### Sample Emissions Chart

Using the following sample parameters, we can visualize how emissions scale with `$BGT` delegation:
$$B = 0.4, R = 1.1, a = 3.5, b = 0.4, m = 0$$

<p align="center">
  <img src="/public/assets/updatedemission.png" alt="chart showing how emissions scale with `$BGT` delegation">
</p>

## Max Block Inflation

`$BGT` emissions grow with the amount of boost a validator has, up to a cap. The maximum theoretical block emission occurs at 100% boost:

$$\max \mathbb{E}[\text{emission}] = \left[B + \max(m, aR)\right]$$

## `$BGT` Distribution

`$BGT` is emitted to reward vaults on a per-block basis via the [Distributor](../../developers/contracts/distributor.md#distributefor) by invoking the `distributeFor` function.
This invocation creates `$BGT` that is then claimable by [Reward Vault](../pol/rewardvaults.md) stakers.

:::tip
Rewards are created on a per-block basis; however, the distribution of rewards is done **over a three-day period.**
:::

Rewards are streamed linearly over this period to depositors proportionally to their deposit amounts.
The reward window is reset each time new rewards are added.

## Incentive Fee Collection (PoL V2) 🐻

With PoL V2, a portion of protocol incentives goes to BERA stakers through an incentive tax mechanism. This gives `$BERA` holders direct yield opportunities while keeping the existing PoL ecosystem intact.

### How Incentive Fees Work

When protocols pay incentives to validators for directing BGT emissions:

1. **Incentive Payment**: Protocols transfer incentive tokens to Reward Vaults
2. **Fee Collection**: 33% of the incentive amount gets collected as a fee
3. **Fee Distribution**: Collected fees go to the BGTIncentiveFeeCollector
4. **WBERA Conversion**: Fees get auctioned for WBERA
5. **BERA Staker Distribution**: WBERA gets distributed to WBERAStakerVault stakers

### Fee Collection Process

The incentive fee collection happens automatically when protocols add incentives to Reward Vaults:

```solidity
// Simplified flow in RewardVault.addIncentive()
uint256 feeAmount = _collectIncentiveFee(token, amount);
incentive.amountRemaining = amountRemainingBefore + amount - feeAmount;
```

The fee amount is calculated as:

```
feeAmount = (incentiveAmount * bgtIncentiveFeeRate) / 10000
```

Where `bgtIncentiveFeeRate` is currently set to 3300 (33%) and can be adjusted by governance.

### Impact on Stakeholders

| Stakeholder      | Impact                                             |
| ---------------- | -------------------------------------------------- |
| **BGT Holders**  | Receive ~67% of previous incentive amounts         |
| **BERA Stakers** | Earn yield from redirected 33% of incentives       |
| **Protocols**    | Pay the same total incentives, with 33% redirected |
| **Validators**   | No change to operations or earnings                |

### Fee Collection Architecture

The incentive fee system consists of three main contracts:

1. **RewardVaultFactory**: Manages the fee rate and collector address
2. **BGTIncentiveFeeCollector**: Collects and auctions incentive fees for WBERA
3. **WBERAStakerVault**: Distributes WBERA to BERA stakers

This architecture ensures that BERA stakers receive a direct share of PoL incentives while maintaining the competitive incentive marketplace for protocols.
