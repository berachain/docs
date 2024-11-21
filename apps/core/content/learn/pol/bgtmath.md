# Block Production Math

## Overview
The Proof of Liquidity governs block production and token emissions on Berachain. This page explains the mathematical principles behind validator selection, block rewards, and emissions calculations.

## Validator Selection
The network maintains an active set of N validators who are eligible for block production. Selection criteria include:

- Only top N validators by BERA stake are included in active set
- Block proposal probability is proportional to staked BERA and does not affect rewards
- Stake limitations per validator:
  - Minimum: 250,000 BERA
  - Maximum: 2,500,000 BERA

## Emissions Structure
When a validator proposes a block, they receive BGT tokens through two emission components:

1. **Base Emission**
   - Fixed amount equal to base rate parameter of 1 BGT (B)
   - Paid directly to block-proposing validator

2. **Reward Emission**
   - Variable amount dependent on validator's boost (x)
   - Distributed to vaults selected by validator
   - Proportional to vault weights in reward allocation

## Validator Boosts
Boost (x) is a crucial metric that determines a validator's reward emissions:

- Calculated as the percentage of BGT delegation a validator has compared to the total BGT delegated in the network
- Expressed as a decimal between 0 and 1
- Example: If a validator has 1000 BGT delegated and the network has 10000 total BGT delegated, their boost would be 0.1 (10%)
H- igher boost leads to higher reward emissions, subject to the emission formula

## Emissions Structure
When a validator produces a block, they receive BGT tokens through two emission components:

1. Base Emission
- Fixed amount equal to base rate parameter (B)
- Paid directly to block-producing validator

2. Reward Emission

- Variable amount dependent on validator's boost (x)
- Distributed to (reward vaults)[/learn/pol/rewardvaults] selected by validator
- Proportional to reward vault weights in reward allocation

## Emission Formula
The total BGT emitted per block is calculated using the following formula:

```
emission = B + max(m, (a + 1)/(1 + ax^b) - 1)R
```

Where:
- x = validator's boost (range: [0,1])
- boost = percentage of BGT delegation relative to total BGT delegated

### Parameters

| Parameter | Description | Impact |
|-----------|-------------|---------|
| B (base rate) | Fixed amount of 1 BGT for block production | Determines baseline validator rewards |
| R (reward rate) | Base BGT amount for reward vaults | Sets foundation for reward emissions |
| a (boost multiplier) | Boost impact coefficient | Higher values increase boost importance |
| b (convexity parameter) | Boost impact curve steepness | Higher values penalize low boost more severely |
| m (minimum reward) | Floor for reward vault emissions | Higher values benefit low-boost validators |

## Inflation Mechanics
- Maximum theoretical block emission occurs at 100% boost:
  ```
  max E[emission] = B + max(m, (a + 1)/(1 + a) - 1)R
  ```
