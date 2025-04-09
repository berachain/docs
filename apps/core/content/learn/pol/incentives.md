<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's Reward Vault using whitelisted Incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

## How Incentives Work

Validators can capture Incentives offered by Whitelisted Reward Vaults by directing their $BGT emissions towards those Reward Vaults, defined by a validator's Reward Allocation - the list of Reward Vaults a validator directs percentages of its $BGT emissions to.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

### Incentive Distribution Flow

The distribution of Incentives follows this process:

1. A **User** Boosts (by associating their $BGT with a validator) to increase a validator's $BGT emissions they receive when proposing a block.
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and directs emissions toward Whitelisted Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to two different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - The validator's operator address receives a commission (percentage of all the Incentive Tokens captured).
   - The remaining Incentives, for users who boosted the validator, are sent to a contract and backend service that manages the distribution and claiming of these tokens. The backend API updates proofs of the user's entitlement to Incentive tokens every 24 hours. This eligibility never expires.
5. A user (Booster) wanting to claim their Incentive token rewards retrieves this proof and claims their incentive token rewards through the [BGTIncentiveDistributor](/developers/contracts/bgtincentivedistributor) contract. All proof handling is done by interacting with <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>.

### Incentives & Users

As an overview, Incentives involve 3 different parties:

| User      | Description & Motivation                                                                                                                                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Booster   | Any user that boosts a validator with $BGT. This increases a validator's $BGT emissions, allowing them to capture more Incentives from Reward Vaults. Boosters receive a portion of these Incentives.                                         |
| Validator | A node in the Active Set that directs $BGT emissions to different Reward Vaults defined by their Reward Allocation distribution, captures Incentives from Reward Vaults, and takes a percentage (Commission Rate) of the Incentives captured. |
| Protocol  | An entity, group, or organization that offers Incentive tokens for their respective Reward Vault with the goal of capturing $BGT emissions for their protocol and/or users.                                                                   |

## Incentive Mechanics

Behind Incentives, there are additional mechanics to consider beyond the high-level overview of how distribution works.

### Whitelisting Incentive Tokens

Only Whitelisted Reward Vaults can offer Incentives. A governance process must whitelist each Incentive Token, where the proposer needs to specify both the Token and a [Token Manager](#incentive-token-managers).

A Reward Vault can have up to two unique Incentive Tokens whitelisted. Adding or replacing a token requires passing a governance proposal.

### Incentive Token Managers

Only Incentive Token Managers of a Reward Vault can offer Incentives. One wallet address is responsible for offering an Incentive Token. The same wallet address can be set as a Token Manager for multiple Incentive Tokens.

A Governance proposal will specify Token Managers when proposing an Incentive Token.
Changing a Token or Token Manager requires passing a governance proposal.

### Offering Incentives

A Reward Vault can offer up to two Incentive Tokens simultaneously. The offered amount cannot be withdrawn or revoked.

The Incentive Token Manager must define an Incentive Rate when initially offering the Incentive Token and cannot decrease or reset it until the supply of the Incentive Token offered has been exhausted by validators directing $BGT emissions. While defining an Incentive Rate, a Token Manager can increase that rate. When the supply of the Incentive Token offered is exhausted, a Token Manager can set a new Incentive Rate.

Incentives can be calculated with the following formulas:

$$ rateDelta = (newIncentiveRatePerBGT - existingIncentiveRatePerBGT) $$

$$ newIncentiveAmount = {(existingIncentiveAmount \times rateDelta) \over existingIncentiveRatePerBGT} $$

Key takeaways are that Token Managers:

- ✅ Can increase the Incentive Amount by any number, keeping the same Incentive Rate.
- ✅ Can increase the Incentive Rate provided that the Incentive Amount increases based on the formulas below.
- ✅ Can set a new Incentive Rate (including lower) when the Incentive Amount has been fully captured.
- ❌ Cannot decrease the Incentive Rate while an existing Incentive is active.
- ❌ Cannot have the Incentive Amount returned.

#### Example 1 - Increase Incentive Rate:

In this scenario, the Reward Vault has an active Incentive and the Token Manager wants to increase the Incentive Rate from `20` to `30`/$BGT:

| Current Incentive Amount | Current Incentive Rate |
| ------------------------ | ---------------------- |
| 1,000 $USDC              | 20/$BGT                |

Using the formulas:

$$ 10 rateDelta = 30 newIncentiveRatePerBGT - 20 existingIncentiveRatePerBGT $$

$$ 500newIncentiveAmount = {(1000existingIncentiveAmount \times 10 rateDelta) \over 20 existingIncentiveRatePerBGT} $$

An Incentive Manager would need to add the following to change their Incentive Rate:

:::warning
If the Incentive Amount added is lower than the required amount, the Incentive Rate will default to the `existingIncentiveRatePerBGT` (20/$BGT).
:::

| Type                                  | Value     |
| ------------------------------------- | --------- |
| Required Incentive Amount To Increase | 500 $USDC |
| New Incentive Rate                    | 30/$BGT   |

#### Example 2 - Increase Incentive Amount:

In this scenario, the Reward Vault has an active Incentive and the Token Manager wants to add a certain Incentive Amount, but would like to know the minimum and maximum Incentive Rates they could set with `5,000` $USDC.

| Existing Incentive Amount | Existing Incentive Rate |
| ------------------------- | ----------------------- |
| 2,000 $USDC               | 10 /$BGT                |

To calculate the highest Incentive Rate using the formulas:

$$ 5000 newIncentiveAmount = {(2000 existingIncentiveAmount \times (newIncentiveRatePerBGT - 10 existingIncentiveRatePerBGT)) \over 10 existingIncentiveRatePerBGT} $$

$$ 50000 = {2000 existingIncentiveAmount \times (newIncentiveRatePerBGT - 10 existingIncentiveRatePerBGT)} $$

$$ 25 = {newIncentiveRatePerBGT - 10 existingIncentiveRatePerBGT} $$

$$ 35 = {newIncentiveRatePerBGT} $$

:::warning
If the Incentive rate is set lower than the Lowest Incentive Rate or higher than the Highest Incentive Rate, it will default to the `existingIncentiveRatePerBGT` (10/$BGT).
:::

With an additional `5,000 $USDC`, a Token Manager can choose any Incentive Rate between `10-35`.

| Option                 | Incentive Amount To Add | Incentive Rate Option |
| ---------------------- | ----------------------- | --------------------- |
| Lowest Incentive Rate  | 5,000 $USDC             | 10/$BGT               |
| Highest Incentive Rate | 5,000 $USDC             | 35/$BGT               |

### Incentive Commission and Distribution

Each validator can set a percentage that they take as a commission of all Incentive Tokens received for directing $BGT emissions to different Reward Vaults offering Incentives. Every time $BGT block rewards are distributed, the validator will receive their commission rate of Incentive Tokens.

_Example:_

| Supply    | Incentive Rate Per $BGT |
| --------- | ----------------------- |
| 100 $USDC | 100 /$BGT               |

Validator A has an Incentive Commission of `5%` and directs 1 $BGT of emissions towards the Reward Vault.

From `100 $USDC`, the validator would get `5 $USDC`, based on their commission, leaving `95 $USDC` for anyone who boosted the validator, which can include themselves. The amount of Incentive Tokens distributed to each booster is based on their proportion of the total $BGT boosting that validator.

| Party       | $BGT Boost To Val A | % of Total Boost |    Total Incentive Token Rewards |
| ----------- | ------------------: | ---------------: | -------------------------------: |
| Validator A |             20 $BGT |              25% | .05 ⨉100 + .25 ⨉95 = 28.75 $USDC |
| Manny       |             40 $BGT |              50% |            .5 ⨉ 95 = 47.50 $USDC |
| Cami        |             10 $BGT |            12.5% |         .125 ⨉ 95 = 11.875 $USDC |
| Jintao      |             10 $BGT |            12.5% |         .125 ⨉ 95 = 11.875 $USDC |

A validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,382` blocks, and then anyone may activate the new rate for the validator.
