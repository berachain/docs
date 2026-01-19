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
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/blockrewards#bgt-emissions-per-block)), and directs emissions toward Whitelisted Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to two different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - The validator's operator address receives a commission (percentage of all the Incentive Tokens captured).
   - The remaining Incentives, for users who boosted the validator, are sent to a contract and backend service that manages the distribution and claiming of these tokens. The backend API updates proofs of the user's entitlement to Incentive tokens every 24 hours. This eligibility never expires.
5. A user (Booster) wanting to claim their Incentive token rewards retrieves this proof and claims their incentive token rewards through the [BGTIncentiveDistributor](/developers/contracts/bgtincentivedistributor) contract. All proof handling is done by interacting with <a :href="config.websites.hub.url">{{config.websites.hub.name}}</a>.

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

The Incentive Token Manager must define an **Incentive Rate** (the exchange rate of incentive tokens per individual BGT), which must be greater than the minimum approved in the Governance proposal. This rate determines how many incentive tokens are distributed for each BGT received by the vault, regardless of BGT emission timing.

Key aspects of incentive rates:

- **Exchange Rate Formula**: `incentiveTokens = bgtReceived × incentiveRate`
- **Rate Constraints**: Cannot decrease the rate until the supply of Incentive Tokens has been exhausted
- **Rate Updates**: Can increase the rate when depositing additional tokens
- **Independent of BGT Timing**: The exchange rate operates the same whether BGT is distributed over 3 days or 7 days

The Token Manager can deposit additional Incentive Tokens anytime, with an option to increase the rate at the same time.

Additionally, any user can contribute an Incentive Token amount to the Reward Vault, but the Token Manager will decide when to apply that amount and at a rate of their choosing.

$$ BGT = \frac{tokenAmount}{ratePerBGT} $$

| Incentive Amount | Incentive Rate | Incentivized $BGT |
| ---------------- | -------------- | ----------------- |
| 2,000 $USDC      | 10 /$BGT       | 200 $BGT          |

Scenario: increase incentive rate 10% + deposit additional tokens (500 $USDC)

| New Incentive Amount | New Incentive Rate | New Incentivized $BGT |
| -------------------- | ------------------ | --------------------- |
| 2,500 $USDC          | 11 /$BGT           | 227 $BGT              |

Key takeaways are that Token Managers:

- Can increase the Incentive Tokens by any number, keeping the same Incentive Rate.
- Can increase the Incentive Rate when they deposit additional Incentive Tokens.
- Can set a lower Incentive Rate only when the Incentive Tokens have been fully exhausted.
- ❌ Cannot decrease the Incentive Rate while an existing Incentive is active.
- ❌ Cannot reclaim or return the Incentive Tokens once they are added.

### Incentive Commission and Distribution

Each validator can set a percentage that they take as a commission of all Incentive Tokens received for directing $BGT emissions to different Reward Vaults offering Incentives. Every time $BGT block rewards are distributed, the validator will receive their commission rate of Incentive Tokens.

Validator commission cannot exceed **20 %** (`MAX_COMMISSION_RATE = 0.2e4`). Any attempt to queue a higher value will revert, and stored values above the cap are clamped when read.

_Example:_

| Incentive Tokens | Incentive Rate |
| ---------------- | -------------- |
| 100 $USDC        | 100 /$BGT      |

Validator A has an Incentive Commission of `5%` and directs 1 $BGT of emissions toward the Reward Vault.

From `100 $USDC`, the validator would get `5 $USDC`, based on their commission, leaving `95 $USDC` for anyone who boosted the validator, which can include themselves. The amount of Incentive Tokens distributed to each booster is based on their proportion of the total $BGT boosting that validator:

| Party       | $BGT Boost To Val A | % of Total Boost |    Total Incentive Token Rewards |
| ----------- | ------------------: | ---------------: | -------------------------------: |
| Validator A |             20 $BGT |              25% | .05 ⨉100 + .25 ⨉95 = 28.75 $USDC |
| Manny       |             40 $BGT |              50% |            .5 ⨉ 95 = 47.50 $USDC |
| Cami        |             10 $BGT |            12.5% |         .125 ⨉ 95 = 11.875 $USDC |
| Jintao      |             10 $BGT |            12.5% |         .125 ⨉ 95 = 11.875 $USDC |

A validator can change their commission percentage by first queueing the rate to notify users of the upcoming change, waiting `16,382` blocks, and then anyone may activate the new rate for the validator.

:::tip Commission cap
Validator commission cannot exceed **20 %** (`MAX_COMMISSION_RATE = 0.2e4`). Any attempt to queue a higher value will revert, and stored values above the cap are clamped when read.
:::

:::info BGT Emission Timing
The **timing** of BGT emissions (which triggers incentive distribution) is controlled by the Reward Vault's emission mode. While incentive token exchange rates are set by protocol token managers, the distribution timing is managed separately. See [BGT Emission Modes](/learn/pol/rewardvaults#bgt-emission-modes) for complete details on duration-based and target rate modes.
:::

## Incentive Redirection

A portion of protocol incentives is automatically redirected during the incentive distribution process for BERA stakers:

- **Redirection Rate**: 33% of the incentive amount
- **Collection Process**: Automatically deducted when incentives are distributed
- **Distribution**: Redirected incentives are auctioned for WBERA and distributed to BERA stakers
- **Remaining Amount**: Validators receive the remaining 67% of incentives

This mechanism ensures that BERA stakers receive direct yield from PoL incentives while maintaining the competitive incentive marketplace.
